"use client";

import "./globals.css";

import { Provider } from "react-redux";
import store from "@/Store/store";
import Snackbar from "@/Components/UI/Snackbar";
import { ThemeProvider } from "@/Context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <ThemeProvider>
            <main>{children}</main>
            <Snackbar />
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
