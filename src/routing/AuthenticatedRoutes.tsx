import Cookies from "cookies-js";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const isAuthenticated = Cookies.get("user_access_token");
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
};

export default AuthenticatedRoutes;
