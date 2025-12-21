import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

import AppLayout from "./ui/AppLayout";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsListPage from "./pages/ProductsListPage/ProductsListPage";

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: "/", index: true, element: <Navigate replace to="home" /> },
      { path: "home", element: <HomePage /> },
      { path: "products", element: <ProductsListPage /> },
      { path: "product/:slug", element: <ProductPage /> },
    ],
  },
  /* { path: "*", element: <PageNotFound /> }, */
];
