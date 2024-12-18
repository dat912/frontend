import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  // Định nghĩa các route được phép cho từng role
  const allowedRoutes = {
    admin: [
      "/home",
      "/category",
      "/product",
      "/addcategory",
      "/editcategory",
      "/employee",
      "/chinhanh",
      "/dichvu",
      "/booking",
      "/hoadon",
      "/khachhang",
      "/vaitro",
    ],
    quanly: [
      "/home",
      "/category",
      "/product",
      "/chinhanh",
      "/dichvu",
      "/booking",
      "/khachhang",
      "/hoadon",
    ],
  };

  // Kiểm tra xem route hiện tại có được phép với role của user không
  const currentPath = location.pathname;
  if (!allowedRoutes[userRole]?.includes(currentPath)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
