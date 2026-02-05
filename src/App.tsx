import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { Provider } from "react-redux";
import store, { persistor } from "../store";
import StyledToaster from "./ui/StyledToaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import ProjectDisclaimer from "./ui/ProjectDisclaimer";

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ProjectDisclaimer />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StyledToaster />
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
