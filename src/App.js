import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./Components/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import UserProfile from "./Components/UserProfile";
import { GoogleLogin } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/user-details/:id",
    element: <UserProfile />,
  },
  {
    path: "*",
    element: <h1>404 Not found</h1>,
  },
]);

export default function App() {
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <>
      <RouterProvider router={router} />{" "}
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
    </>
  );
}
