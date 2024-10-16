"use client";

import "./globals.css";

import { Provider } from "react-redux";
import store from "@/Store/store";
import Snackbar from "@/Components/UI/Snackbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <main>{children}</main>
          <Snackbar />
        </body>
      </html>
    </Provider>
  );
}
