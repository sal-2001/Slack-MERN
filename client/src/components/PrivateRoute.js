import React from "react";
import useStateValue from "../context/AppContext";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import { Outlet,Navigate } from "react-router-dom";
export default function PrivateRoute() {
  const [{ isLoggedIn}, _] = useStateValue();
  return !isLoggedIn ? <Navigate to='/' /> : <Outlet />;
}
