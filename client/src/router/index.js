import { createBrowserRouter, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

import Posts from "../pages/Posts";
import CreatePost from "../pages/createPost";
import UpdatePost from "../pages/updatePost";
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
        path: "/posts",
        element: (
          <ProtectedRoute isAllowed={"isAdmin"}>
            <Posts />
          </ProtectedRoute>
        ),
      },

      {
        path: "/posts/:postId",
        element: <UpdatePost />,
      },
      {
        path: "/new-post",
        element: <CreatePost />,
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
