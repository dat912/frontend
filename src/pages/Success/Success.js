import React from "react";
import style from "./Success.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/logo-barber.png";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);
export default function Success() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-logo")}>
        <img src={logo} alt="" />
      </div>
      <p>ĐẶT THÀNH CÔNG</p>
      <Link className={cx("back")} to="/">
        TRỞ VỀ TRANG CHỦ
      </Link>
    </div>
  );
}
