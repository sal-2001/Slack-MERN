import React, { useEffect } from "react";
import useStateValue from "../context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/register";
import { getUser } from "../services/user";
import { addUser } from "../context/actions/register";

export default function PrivateRoute() {
  const navigate = useNavigate();
  const [_, dispatch] = useStateValue();
  useEffect(() => {
    let token = getAuthToken();
    if (token) {
      getUser(token).then((data) => {
        console.log("data of user : ", data);
        addUser(dispatch, data);
      });
    } else {
      navigate("/");
    }
  }, []);
  return <Outlet />;
}
