import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function RoleProtectedRoute({ allowedRoles }) {
  const token = Cookies.get("token");
  const userType = Cookies.get("userType");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;