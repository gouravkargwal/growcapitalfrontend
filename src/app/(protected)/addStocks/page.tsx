"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAppDispatch } from "@/hook/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";
import { fetchUserStocks } from "@/Feature/Stock/stockSlice";

interface Stock {
  id: number;
  name: string;
}

interface FormData {
  selectedStocks: Stock[];
}

const StockSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: trackedStocks } = useSelector(
    (state: RootState) => state.stock
  );
  useEffect(() => {
    dispatch(fetchUserStocks());
  }, [dispatch]);
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: { selectedStocks: [] },
  });
  const [stocks, setStocks] = useState<Stock[]>([
    { name: "PNB", id: 58668 },
    { name: "SBI", id: 58667 },
  ]);
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  const [sectors, setSectors] = useState<string[]>([
    "Technology",
    "Finance",
    "Healthcare",
  ]); // Example sectors

  // Fetch tracked stocks from API
  useEffect(() => {}, []);

  const onSubmit = (data: FormData) => {
    // Send selected stocks to backend
    axios.post("/api/submit", data).then((response) => {
      console.log("Submitted successfully:", response.data);
    });
  };

  const handleAddStock = (stock: Stock) => {
    if (!selectedStocks.find((s) => s.id === stock.id)) {
      const newSelectedStocks = [...selectedStocks, stock];
      setSelectedStocks(newSelectedStocks);
      setValue("selectedStocks", newSelectedStocks);
    }
  };

  const handleRemoveStock = (stock: Stock) => {
    const newSelectedStocks = selectedStocks.filter((s) => s.id !== stock.id);
    setSelectedStocks(newSelectedStocks);
    setValue("selectedStocks", newSelectedStocks);
  };

  const handleAddSectorStocks = (sector: string) => {
    const sectorStocks = stocks.filter((stock) => stock.sector === sector); // Assuming stocks have a sector field
    sectorStocks.forEach((stock) => handleAddStock(stock));
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h1 className="text-xl font-bold text-gray-800">Stock Tracker</h1>

        {/* Tracked Stocks */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">Tracked Stocks</h3>
          {trackedStocks.length > 0 ? (
            <div className="border border-gray-300 rounded p-2 max-h-40 overflow-y-auto">
              {trackedStocks.map((stock) => (
                <div
                  key={stock.id}
                  className="flex justify-between items-center p-1"
                >
                  <span>{stock.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStock(stock)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No tracked stocks yet.</p>
          )}
        </div>

        {/* Stock Selection */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="stock"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Select Stock
            </label>
            <Controller
              name="selectedStocks"
              control={control}
              render={({ field }) => (
                <select
                  id="stock"
                  className="block w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => {
                    const selectedStock = stocks.find(
                      (stock) => stock.id == e.target.value
                    );
                    if (selectedStock) handleAddStock(selectedStock);
                  }}
                >
                  <option value="" disabled>
                    Select a stock
                  </option>
                  {stocks.map((stock) => (
                    <option key={stock.id} value={stock.id}>
                      {stock.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-700">
              Selected Stocks
            </h3>
            <div className="border border-gray-300 rounded p-2 max-h-40 overflow-y-auto">
              {selectedStocks.map((stock) => (
                <div
                  key={stock.id}
                  className="flex justify-between items-center p-1"
                >
                  <span>{stock.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStock(stock)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Stocks by Sector */}
        <div className="flex space-x-2 justify-center">
          {sectors.map((sector) => (
            <button
              key={sector}
              type="button"
              onClick={() => handleAddSectorStocks(sector)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add {sector} Stocks
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Done
        </button>
      </form>
    </div>
  );
};

export default StockSelector;
