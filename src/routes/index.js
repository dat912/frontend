import Booking from "../pages/Booking/Booking";
import Cart from "../pages/Cart/Cart";
// import Detail from "../pages/Detail/Detail";

import Forgot from "../pages/Forgot/Forgot";
import Products from "../pages/Products/Products";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import Submit from "../pages/Submit/Submit";
import Success from "../pages/Success/Success";
import Infor from "../pages/Infor/Infor";

// import ProductAdmin from "../pages/Admin/Product/Product";
import Home from "../pages/Admin/Home/Home";
import Category from "../pages/Admin/Category/Category";
import Product from "../pages/Admin/Product/Product";
import AddCategory from "../pages/Admin/Category/AddCategory";
import EditCategory from "../pages/Admin/Category/EditCategory";
import Employee from "../pages/Admin/Employee/Employee";
import ChiNhanh from "../pages/Admin/ChiNhanh/ChiNhanh";
import DichVu from "../pages/Admin/DichVu/DichVu";
import Bookings from "../pages/Admin/Bookings/Bookings";
import HoaDon from "../pages/Admin/HoaDon/HoaDon";
import Khachhang from "../pages/Admin/Khachhang/Khachhang";
import LoginAdmin from "../pages/Admin/Login/Login";
import VaiTro from "../pages/Admin/VaiTro/VaiTro";

const WebRoutes = [
  { path: "/san-pham", component: Products },
  // { path: "/chi-tiet-san-pham", component: Detail },
  { path: "/dang-nhap", component: Signin },
  { path: "/dang-ky-tai-khoan", component: Signup },
  { path: "/quen-mat-khau", component: Forgot },
  { path: "/thanh-cong", component: Success },
  { path: "/dat-lich", component: Booking },
  { path: "/gio-hang", component: Cart },
  { path: "/chi-tiet-don-hang", component: Submit },
  { path: "/thong-tin", component: Infor },

  // { path: "*", component: Error },
];

const AdminRoutes = [
  // { path: "/home", component: ProductAdmin },
  { path: "/vaitro", component: VaiTro },
  { path: "/admin", component: LoginAdmin },
  { path: "/product", component: Product },
  { path: "/category", component: Category },
  { path: "/addcategory", component: AddCategory },
  { path: "/editcategory", component: EditCategory },
  { path: "/employee", component: Employee },
  { path: "/chinhanh", component: ChiNhanh },
  { path: "/dichvu", component: DichVu },
  { path: "/booking", component: Bookings },
  { path: "/hoadon", component: HoaDon },
  { path: "/khachhang", component: Khachhang },
  { path: "/home", component: Home },
];

export { WebRoutes, AdminRoutes };
