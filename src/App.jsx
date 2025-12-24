import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { Provider } from "react-redux";
import store from "../store";
import StyledToaster from "./ui/StyledToaster";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <StyledToaster />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
