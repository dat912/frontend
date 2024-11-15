import axios from "axios";
import React, { useState } from "react";
import style from "./Signin.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignInValidatiton";

const cx = classNames.bind(style);

export default function Signin() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSwitch = () => {
    setShow(!show);
  };

  const [values, setValues] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn việc gửi form mặc định
    console.log(values);
    axios
      .post("http://localhost:8080/login", values)
      .then((res) => {
        if (res.data.success) {
          // Nếu đăng nhập thành công
          // Lưu thông tin vào localStorage
          localStorage.setItem("phone", values.phone);
          localStorage.setItem("ten", res.data.ten);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("id", res.data.id);
          // Điều hướng đến trang /dat-lich
          navigate("/dat-lich");
          window.location.reload();
          alert("Đăng nhập thành công");
        } else {
          // Nếu thất bại, hiển thị thông báo lỗi từ server
          alert(res.data.message || "Có lỗi xảy ra khi đăng nhập");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi đăng nhập"); // Thông báo lỗi chung
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(values);

  //   axios.post('http://localhost:8080/login', values)
  //     .then(res => {
  //       // Kiểm tra phản hồi của API
  //       if (res.result === "success") { // Giả sử server trả về { success: true, ten: 'Tên Người Dùng', ... }

  //         // Lưu thông tin vào localStorage
  //         localStorage.setItem("phone", values.phone);
  //         localStorage.setItem("ten", res.data.ten);  // Lưu tên từ phản hồi của API

  //         // Điều hướng đến trang /dat-lich
  //         navigate('/dat-lich');

  //         // Thông báo đăng nhập thành công
  //         alert("Đăng nhập thành công");
  //         window.location.reload(); // Làm mới trang
  //       } else {
  //         // Thông báo nếu tài khoản không tồn tại
  //         alert("Tài khoản không tồn tại");
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       alert("Có lỗi xảy ra khi đăng nhập");
  //     });
  // };

  if (!localStorage.getItem("phone")) {
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
          <h3>ĐĂNG NHẬP</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className={cx("form-input")}>
              <label htmlFor="phone">Số điện thoại </label>
              <input
                type="phone"
                placeholder="Số điện thoại "
                name="phone"
                id=""
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
              />
            </div>
            <div className={cx("form-input")}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                type={show === false ? "password" : "text"}
                name="password"
                placeholder="Mật khẩu"
                id=""
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {error.password && <span>{error.password}</span>}
              <div className={cx("action")}>
                <div className={cx("checkbox")}>
                  <p onClick={handleSwitch}>
                    {show === false ? "Hiển thị mật khẩu" : "Ẩn mật khẩu"}
                  </p>
                </div>
                <Link className={cx("link")} to="/quen-mat-khau">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div className={cx("form-btn")}>
              <button className={cx("btn-signin")}>ĐĂNG NHẬP</button>
              <button
                className={cx("btn-signup")}
                onClick={() => navigate("/dang-ky-tai-khoan")}
              >
                ĐĂNG KÝ TÀI KHOẢN
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    navigate("/dat-lich");
  }
}
