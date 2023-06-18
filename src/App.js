import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./Components/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import UserProfile from "./Components/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />
  },
  {
    path: "/user-details/:id",
    element: <UserProfile />
  },
  {
    path: "*",
    element: <h1>404 Not found</h1>
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
