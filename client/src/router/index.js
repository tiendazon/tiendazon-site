import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

import AdminCategories from "../pages/AdminCategories";
import AdminProducts from "../pages/AdminProducts";
import Catalog from "../pages/Catalog";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Logout from "../pages/Logout";

import ProtectedRoute from "../utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,

    children: [
      {
        index: true,
        element: <Catalog />,
      },
      {
        path: "/categorias",
        element: (
          <ProtectedRoute isAllowed={"isAdmin"}>
            <AdminCategories />
          </ProtectedRoute>
        ),
      },

      {
        path: "/categorias/:categoryId",
        element: (
          <ProtectedRoute isAllowed={"isAdmin"}>
            <AdminCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/productos",
        element: (
          <ProtectedRoute isAllowed={"isAdmin"}>
            <AdminProducts />
          </ProtectedRoute>
        ),
      },

      {
        path: "/productos/:productId",
        element: (
          <ProtectedRoute isAllowed={"isAdmin"}>
            <AdminProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute isAllowed={"isNotAuth"}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/registro",
        element: (
          <ProtectedRoute isAllowed={"isNotAuth"}>
            <SignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logout",
        element: (
          <ProtectedRoute isAllowed={"isAuth"}>
            <Logout />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
