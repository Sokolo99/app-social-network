import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@/index.css";
import { Provider } from "react-redux";

import Auth from "./pages/auth/auth.tsx";

import { store } from "@/app/store";
import Layout from "@/components/layout/layout.tsx";
import Posts from "@/pages/posts/posts.tsx";
import CurrentPost from "@/pages/current-post/current-post.tsx";
import UserProfile from "@/pages/user-profile/user-profile.tsx";
import Followers from "@/pages/followers/followers.tsx";
import Following from "@/pages/following/following.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthGuard } from "@/features/user/authGuard.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
