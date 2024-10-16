"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchStockSuggestion,
  fetchUserStocks,
  updateStockSubscription,
} from "@/Feature/Stock/stockSlice";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { RootState } from "@/Store/store";
import _ from "lodash";
import { fetchUserPlan } from "@/Feature/User/userSlice";

const StocksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stockSuggestion, stockSuggestionLoading } = useSelector(
    (state: RootState) => state.stock
  );
  const { data: userPlan } = useSelector((state: RootState) => state.user);
  const { data: trackedStocks } = useSelector(
    (state: RootState) => state.stock
  );

  const [stocks, setStocks] = useState<any[]>([]); // Start with an empty array
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const planLimit = userPlan?.plan?.stocksLimit;

  useEffect(() => {
    // Fetch user stocks and user plan on initial render
    dispatch(fetchUserStocks());
    dispatch(fetchUserPlan());
  }, [dispatch]);

  useEffect(() => {
    // Update stocks state only if it's empty or not set yet
    if (stocks.length === 0 && trackedStocks.length > 0) {
      setStocks(trackedStocks);
    }
  }, [trackedStocks, stocks.length]);

  // Handle input change and API call for suggestions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFetchSuggestions(value);
  };

  const debouncedFetchSuggestions = _.debounce(async (value: string) => {
    if (value) {
      dispatch(fetchStockSuggestion({ query: value }));
    }
  }, 300);

  // Handle adding a new stock
  const handleAddStock = (stock: {
    ticker_symbol: string;
    company_name: string;
    scrip_code: string;
    isin_number: string;
    industry: string;
  }) => {
    if (!stocks.some((s) => s.ticker_symbol === stock.ticker_symbol)) {
      setStocks([...stocks, stock]);
    }
    setInputValue("");
  };

  // Handle deletion of a stock chip
  const handleDelete = (stockToDelete: string) => {
    setStocks(stocks.filter((stock) => stock.ticker_symbol !== stockToDelete));
  };

  // Toggle between edit mode and view mode
  const handleEditToggle = () => {
    if (editMode) {
      const addedStocks = stocks
        .filter(
          (stock) =>
            !trackedStocks.some((s) => s.ticker_symbol === stock.ticker_symbol)
        )
        .map((stock) => stock.ticker_symbol); // Extract ticker_symbol for dispatch

      const deletedStocks = trackedStocks
        .filter(
          (stock) =>
            !stocks.some((s) => s.ticker_symbol === stock.ticker_symbol)
        )
        .map((stock) => stock.ticker_symbol); // Extract ticker_symbol for dispatch

      // Check if adding more stocks exceeds the plan limit
      if (
        addedStocks.length + trackedStocks.length - deletedStocks.length >
        planLimit
      ) {
        alert(`You can only subscribe to ${planLimit} stocks.`);
        return;
      }

      // Send update to backend
      dispatch(updateStockSubscription({ addedStocks, deletedStocks }));
    }
    setEditMode(!editMode);
  };

  return (
    <div className="mx-3 mt-5 text-black">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold sm:mb-2">Stocks Tracked</h2>
          <p className="text-gray-500 mb-2">
            You will receive updates on the below stocks
          </p>
        </div>
        <div className="mx-2">
          <button
            onClick={handleEditToggle}
            className="flex items-center text-blue-400 hover:text-blue-500 border border-blue-500 px-4 py-2 rounded-lg"
          >
            {editMode ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      <div className="border border-black-400 rounded-lg p-2">
        <div className="flex flex-wrap gap-2">
          {stocks.map((stock, index) => (
            <div
              key={index}
              className="bg-blue-300 text-black text-sm font-semibold py-2 px-4 rounded-md flex items-center justify-center"
            >
              <p>{stock?.ticker_symbol}</p>
              {editMode && (
                <button
                  onClick={() => handleDelete(stock.ticker_symbol)}
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <div className="mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border p-2 rounded-lg w-full"
              placeholder="Add new stock..."
            />
            {stockSuggestion.length > 0 && (
              <div className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                {stockSuggestion.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleAddStock(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    <p>
                      {suggestion?.company_name} ({suggestion?.ticker_symbol})
                    </p>
                    <span>{suggestion?.scrip_code}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StocksList;
