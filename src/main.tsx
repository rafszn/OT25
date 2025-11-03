import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <Router>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Toaster />
          <App />
        </AuthContextProvider>
      </QueryClientProvider>
    </StrictMode>
  </Router>
);
