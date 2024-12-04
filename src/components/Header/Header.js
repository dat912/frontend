import React, { useState } from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../../contexts/ShoppingContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
// import { faShoppingCart, faUserAlt } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);

export default function Header() {
  const navigate = useNavigate();
  const [id] = useState(localStorage.getItem("phone"));
  const { clearCart } = useShoppingContext();
  console.log(id);

  const handleLogout = () => {
    // localStorage.removeItem("id");
    // localStorage.removeItem("phone");
    // localStorage.removeItem("ten");
    // localStorage.removeItem("email");
    localStorage.clear();
    clearCart();
    navigate("/dang-nhap");
    window.location.reload();
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("left")}>
        <Link className={cx("link")} to="/san-pham">
          Sản phẩm
        </Link>
        <Link className={cx("link")} to="/dat-lich">
          Đặt lịch
        </Link>
      </div>

      {!id ? (
        <div className={cx("dangnhap")}>
          {/* <FontAwesomeIcon className={cx("link")} icon={faUserAlt} /> */}
          <button
            onClick={() => navigate("/dang-nhap")}
            type="button"
            class="btn btn-success btn-sm "
          >
            Đăng nhập
          </button>
          <button
            onClick={() => navigate("/dang-ky-tai-khoan")}
            type="button"
            class="btn btn-light btn-sm "
          >
            Đăng ký
          </button>

          {/* <FontAwesomeIcon className={cx("link")} icon={faShoppingCart} /> */}
        </div>
      ) : (
        <div className={cx("right")}>
          <input
            disabled
            type="text"
            value={localStorage.getItem("phone")}
            className={cx("form-input")}
          />
          <button
            onClick={() => navigate("/thong-tin")}
            type="button"
            class="btn btn-secondary btn-sm "
          >
            Thông tin
          </button>
          <button
            onClick={() => navigate("/gio-hang")}
            type="button"
            class="btn btn-secondary btn-sm "
          >
            Giỏ hàng
          </button>
          <button
            type="button"
            class="btn btn-warning btn-sm"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
