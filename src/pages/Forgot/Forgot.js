import React, { useState } from "react";
import style from "./Forgot.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function Forgot() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSwitch = () => {
    setShow(!show);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-img")}>
        <img
          src={
            "https://t4.ftcdn.net/jpg/03/78/83/15/360_F_378831540_10ShB9tnvs2quli24qe53ljhvsL07gjz.jpg"
          }
          alt=""
        />
      </div>
      <div className={cx("form")}>
        <h3>QUÊN MẬT KHẨU</h3>
        <div className={cx("form-input")}>
          <label htmlFor="">Tên tài khoản</label>
          <input
            type="text"
            placeholder="Email hoặc số điện thoại"
            name=""
            id=""
          />
        </div>

        <div className={cx("form-btn")}>
          <button className={cx("btn-signin")}>XÁC NHẬN</button>
          <button
            className={cx("btn-signup")}
            onClick={() => navigate("/dang-nhap")}
          >
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
    </div>
  );
}
