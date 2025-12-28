import { Navigate } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import LoginForm from "./Features/auth/components/LoginForm";
import ProtectedRoute from "./Features/auth/components/ProtectedRoute";
import SignupForm from "./Features/auth/components/SignupForm";
import PublicRoute from "./Features/auth/components/PublicRoute";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <SignupForm />
          </PublicRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

      { path: "*", element: <PageNotFound /> },
    ],
  },
];
