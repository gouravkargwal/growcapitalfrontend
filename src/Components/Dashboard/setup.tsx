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
  const { loading } = useAuthGuard();
  const [providers, setProviders] = useState([]);
  const [activeProvider, setActiveProvider] = useState<providerData>();

  useEffect(() => {
    const getPlanProvider = async () => {
      try {
        const response = await axiosInstance.get("/user-provider/eligible");
        setProviders(response.data);
        const active = response.data.find(
          (provider: providerData) => provider.isActive
        );
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-start">
      <h2 className="text-lg font-bold text-gray-900">
        Communication Channels
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Select your preferred channel for stock updates:
      </p>
      <div className="bg-white max-w-md w-full">
        <ul className="space-y-4">
          {providers.length == 0 && <p className="text-sm text-red-400 mb-4">
            Please purchase a plan to unlock channel configuration and start receiving updates.
          </p>}
          {providers.map((provider: providerData) => (
            <li
              key={provider.providerName}
              className={`flex justify-between items-center p-4 rounded-lg ${activeProvider?.providerName === provider.providerName
                ? "bg-[#FDF8F1] border border-primary"
                : "bg-gray-100"
                }`}
            >
              <span className="font-semibold">
                {_.capitalize(provider.providerName)}
              </span>
              <span
                className={`text-sm ${activeProvider?.providerName === provider.providerName &&
                  activeProvider.isConfigured &&
                  activeProvider.isActive
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              >
                {activeProvider?.providerName === provider.providerName &&
                  activeProvider.isConfigured &&
                  activeProvider.isActive
                  ? "Configured (Active)"
                  : "Not Configured"}
              </span>
              <div className="flex space-x-2">
                {activeProvider?.providerName === provider.providerName &&
                  activeProvider.isConfigured === true ? (
                  ""
                ) : (
                  <button
                    onClick={() => handleSetupClick(provider)}
                    className={`px-3 py-1 rounded-md bg-primary hover:bg-accent text-white`}
                  >
                    Setup
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Providers;
