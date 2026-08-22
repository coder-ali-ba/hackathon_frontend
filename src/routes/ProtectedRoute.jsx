

import Cookies from "js-cookie";
import {  Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  return <Outlet />;
}

export default ProtectedRoute;