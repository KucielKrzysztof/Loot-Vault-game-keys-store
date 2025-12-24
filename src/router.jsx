import { Navigate } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const ProductsListPage = lazy(
  () => import("./pages/ProductsListPage/ProductsListPage"),
);

export const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: "/", index: true, element: <Navigate replace to="home" /> },
      { path: "home", element: <HomePage /> },
      { path: "products", element: <ProductsListPage /> },
      { path: "product/:slug", element: <ProductPage /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];
