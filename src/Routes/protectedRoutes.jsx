import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, hasToken } from "../utils/auth";
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const ErrorPage = React.lazy(() => import("./ErrorPage"));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const MainLayout = React.lazy(() =>
  import("../components/common/Layouts/mainLayout/MainLayout")
);
const SignupLayout = React.lazy(() =>
  import("../components/common/Layouts/signuplayout/SignupLayout")
);

const role = getUserRole();
const isLoggedIn = hasToken();

const routes = {
  DEFAULT: [
    {
      path: "/",
      element: <SignupLayout />,
      children: [
        {
          path: "/",
          element: !isLoggedIn ? <Login /> : <Navigate to="/home" />,
        },
        {
          path: "/signup",
          element: !isLoggedIn ? <Signup /> : <Navigate to="/home" />,
        },
        { path: "*", element: <ErrorPage /> },
      ],
    },
    {
      path: "/home",
      element: <MainLayout />,
      children: [
        { path: "/home", element: <HomePage /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ],

  CUSTOMER: [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Navigate to="/home" /> },
        { path: "/home", element: <HomePage /> },
      ],
    },
  ],
};

export const currentRoute =
  role && isLoggedIn ? routes["DEFAULT"] : routes["DEFAULT"];
