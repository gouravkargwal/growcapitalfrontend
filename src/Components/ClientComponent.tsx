"use client";
import { Provider } from "react-redux";
import store from "@/Store/store";
import Snackbar from "@/Components/UI/Snackbar";
import { useEffect } from "react";
import { initProviders } from "@/events/analytics";

export default function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        initProviders();
    }, []);
    return (
        <Provider store={store}>
            <main>{children}</main>
            <Snackbar />
        </Provider>
    );
}
