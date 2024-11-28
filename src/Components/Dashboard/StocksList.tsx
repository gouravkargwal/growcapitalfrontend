"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Stock,
  StockSuggestion,
  fetchStockSuggestion,
  fetchUserStocks,
  getImportPortfolioTxnId,
  resetStockSuggestion,
  updateStockSubscription,
} from "@/Feature/Stock/stockSlice";
import { UserState, fetchUserPlan } from "@/Feature/User/userSlice";

import { RootState } from "@/Store/store";
import _ from "lodash";
import { openSnackbar } from "@/Feature/Snackbar/snackbarSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import Script from "next/script";

// Skeleton loader for stocks
const StockSkeleton: React.FC = () => (
  <div className="flex flex-wrap gap-2">
    {Array(4)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className="w-24 h-8 bg-gray-300 rounded-md animate-pulse"
        />
      ))}
  </div>
);

// Skeleton loader for stock suggestions
const SuggestionSkeleton: React.FC = () => (
  <div className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto shadow-sm">
    {Array(5)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          className="cursor-pointer p-2 flex flex-col gap-1 animate-pulse"
        >
          <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
        </div>
      ))}
  </div>
);

const StocksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stockSuggestion, stockSuggestionLoading } = useSelector(
    (state: RootState) => state.stock
  );
  const { data: userPlan } = useSelector<RootState, UserState>(
    (state) => state.user
  );
  const { data: trackedStocks, loading: stockLoading } = useSelector(
    (state: RootState) => state.stock
  );

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [gatewayInstance, setGatewayInstance] = useState<any>(null);

  const planLimit = userPlan?.plan?.stocksLimit || 0;

  useEffect(() => {
    // Fetch user stocks and plan on initial render
    dispatch(fetchUserStocks());
    dispatch(fetchUserPlan());
  }, [dispatch]);

  useEffect(() => {
    // Update local stocks state if tracked stocks are available
    if (!stocks.length && trackedStocks.length) {
      setStocks(trackedStocks);
    }
  }, [trackedStocks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  // Use useCallback to memoize the debounced function
  const debouncedFetchSuggestions = useCallback(
    _.debounce((value: string) => {
      if (value) {
        dispatch(fetchStockSuggestion({ query: value }));
      }
    }, 500),
    [] // Only create the function once
  );

  const handleAddStock = (suggestion: StockSuggestion) => {
    const newStock: Stock = { ...suggestion, isin_number: "", industry: "" };
    if (
      !stocks.some((stock) => stock.ticker_symbol === newStock.ticker_symbol)
    ) {
      setStocks([...stocks, newStock]);
    }
    setInputValue("");
  };

  const handleDelete = (ticker_symbol: string) => {
    const updatedStocks = stocks.filter(
      (stock) => stock.ticker_symbol !== ticker_symbol
    );
    setStocks(updatedStocks);
  };

  const handleEditToggle = () => {
    if (editMode) {
      const addedStocks = stocks
        .filter(
          (stock) =>
            !trackedStocks.some((s) => s.ticker_symbol === stock.ticker_symbol)
        )
        .map((stock) => stock.ticker_symbol);

      const deletedStocks = trackedStocks
        .filter(
          (stock) =>
            !stocks.some((s) => s.ticker_symbol === stock.ticker_symbol)
        )
        .map((stock) => stock.ticker_symbol);

      if (
        addedStocks.length + trackedStocks.length - deletedStocks.length >
        planLimit
      ) {
        dispatch(
          openSnackbar({
            message: `You can only subscribe to ${planLimit} stocks.`,
            type: "error",
          })
        );
        return;
      }

      dispatch(updateStockSubscription({ addedStocks, deletedStocks }));
    } else {
      dispatch(resetStockSuggestion());
    }
    setEditMode(!editMode);
  };

  const handleImportPortfolio = async () => {
    try {
      const result = await dispatch(getImportPortfolioTxnId());
      if (getImportPortfolioTxnId.fulfilled.match(result)) {
        const txnId = result.payload;
        if (gatewayInstance) {
          const txnResponse = await gatewayInstance.triggerTransaction({
            transactionId: txnId,
          });
        } else {
          console.error("Gateway instance is not initialized");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Script
        id="smallcase-js"
        src="https://gateway.smallcase.com/scdk/2.0.0/scdk.js"
        onLoad={() => {
          if (window.scDK) {
            const instance = new window.scDK({
              gateway: "gatewaydemo",
              smallcaseAuthToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbWFsbGNhc2VBdXRoSWQiOiI1ZjAzMjFiNWYzNzQzYzMxZDk1YWJkMzUiLCJleHAiOjI1NTYxMjQxOTl9.EC6B435Xsw02dDy_LCmHqKmEmJOqhq3f2MuSOjUmxYs",
            });
            setGatewayInstance(instance);
          } else {
            console.error("scDK is not available on window");
          }
        }}
      />
      <div className="mt-5 text-black">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-gray-900">Stocks Tracked</h2>
            <p className="text-gray-500">
              You will receive updates on the below stocks
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={handleImportPortfolio}
              className="text-primary border border-secondary rounded-2xl px-3 lg:px-4 py-1 hover:text-white hover:bg-secondary whitespace-nowrap min-w-max transition-all duration-500 ease-in-out"
            >
              Import Portfolio
            </button>
            <button
              onClick={handleEditToggle}
              className="text-primary border border-secondary rounded-2xl px-3 lg:px-4 py-1 hover:text-white hover:bg-secondary transition-all whitespace-nowrap min-w-max duration-500 ease-in-out"
            >
              {editMode ? "Done" : "Edit"}
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
          {/* Display a skeleton loader while stocks are loading */}
          {stockLoading ? (
            <StockSkeleton />
          ) : stocks.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stocks.map((stock, index) => (
                <div
                  key={index}
                  className="bg-tertiary text-primary text-sm font-semibold py-2 px-4 rounded-md flex items-center justify-center shadow-md"
                >
                  <p>{stock?.ticker_symbol}</p>
                  {editMode && (
                    <button
                      onClick={() => handleDelete(stock.ticker_symbol)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have not added any stocks yet.</p> // Feedback message for empty state
          )}

          {editMode && (
            <div className="mt-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border p-2 rounded-lg w-full focus:outline-none focus:border-primary"
                placeholder="Add new stock..."
              />
              {stockSuggestionLoading ? (
                <SuggestionSkeleton />
              ) : (
                stockSuggestion.length > 0 && (
                  <div className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto shadow-sm">
                    {stockSuggestion.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleAddStock(suggestion)}
                        className="cursor-pointer p-2 hover:bg-gray-100"
                      >
                        <p className="text-sm text-gray-900">
                          {suggestion?.company_name} (
                          {suggestion?.ticker_symbol})
                        </p>
                        <span className="text-xs text-gray-500">
                          {suggestion?.scrip_code}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StocksList;
