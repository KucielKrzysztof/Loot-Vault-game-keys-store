import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { Provider } from "react-redux";
import store from "../store";
import StyledToaster from "./ui/StyledToaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Provider store={store}>
        <StyledToaster />
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
