import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import AppLayout from "./ui/AppLayout";

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: "/", index: true, element: <Navigate replace to="home" /> },
      { path: "home", element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
    ],
  },
  /* { path: "*", element: <PageNotFound /> }, */
];
