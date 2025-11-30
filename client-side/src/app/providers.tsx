"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />

          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
