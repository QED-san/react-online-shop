import Cookies from "cookies-js";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../state management/store";

const AdminRoutes = () => {
  const isAuthenticated = Cookies.get("user_access_token");
  const user = useSelector((state: RootState) => state.User);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/login" />;
  return <Outlet />;
};

export default AdminRoutes;
