"use client";

import axiosInstance from "@/lib/axiosInstance";
import useAuthGuard from "@/hook/useAuthGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";

type providerData = {
  providerId: number;
  providerName: string;
  isActive: boolean;
  isConfigured: boolean;
};

const Providers = () => {
  const router = useRouter();
  const { user, loading } = useAuthGuard();
  const [providers, setProviders] = useState([]);
  const [activeProvider, setActiveProvider] = useState<providerData>();

  useEffect(() => {
    const getPlanProvider = async () => {
      try {
        const response = await axiosInstance.get("/user-provider/eligible");
        setProviders(response.data); // Assuming this returns an array of provider objects
        // Find the active provider from the response data or user data
        const active = response.data.find(
          (provider: providerData) => provider.isActive
        ); // Example logic to find active provider
        setActiveProvider(active);
      } catch (error) {
        console.error("Error fetching plan providers", error);
      }
    };

    getPlanProvider();
  }, []);

  const handleSetupClick = (provider: providerData) => {
    router.push(
      `providers/setup/${provider.providerName}?providerId=${provider.providerId}`
    );
  };

  const handleEditClick = (provider: providerData) => {
    router.push(
      `providers/config/${provider.providerName}?providerId=${provider.providerName}`
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h2 className="text-xl mb-4">Communication Channels</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <ul className="space-y-4">
          {providers.map((provider: providerData) => (
            <li
              key={provider.providerName}
              className={`flex justify-between items-center p-4 rounded-lg ${
                activeProvider?.providerName === provider.providerName
                  ? "bg-blue-100 border border-blue-500"
                  : "bg-gray-100"
              }`}
            >
              <span className="font-semibold">
                {_.capitalize(provider.providerName)}
              </span>
              <span
                className={`text-sm ${
                  provider.isConfigured ? "text-green-500" : "text-red-500"
                }`}
              >
                {provider.isConfigured ? "Configured" : "Not Configured"}
              </span>
              <div className="flex space-x-2">
                {provider.isConfigured ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleSetupClick(provider)}
                    className={`px-3 py-1 rounded-md ${
                      provider.isConfigured
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                  >
                    {provider.isConfigured ? "Edit" : "Setup"}
                  </button>
                )}

                {/* {provider.isConfigured && (
                  <button
                    onClick={() => handleEditClick(provider)}
                    className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
                  >
                    Change Configuration
                  </button>
                )} */}
              </div>
            </li>
          ))}
        </ul>
        {activeProvider && (
          <div className="mt-6">
            <h3 className="font-bold text-lg">Active Channel:</h3>
            <p className="text-blue-600">
              {_.capitalize(activeProvider.providerName)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Providers;
