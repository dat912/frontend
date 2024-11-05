import React from "react";
import style from "./Submit.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function Submit() {
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <h3>THÔNG TIN GIAO HÀNG</h3>
      <div className={cx("content")}>
        <div className={cx("left")}>
          <div className={cx("form")}>
            <div className={cx("form-input")}>
              <label htmlFor="">
                Tên <strong style={{ color: "red", fontWeight: 800 }}>*</strong>
              </label>
              <input type="text" placeholder="Nhập tên" />
            </div>
            <div className={cx("form-input")}>
              <label htmlFor="">
                Số điện thoại{" "}
                <strong style={{ color: "red", fontWeight: 800 }}>*</strong>
              </label>
              <input type="text" placeholder="Nhập số điện thoại" />
            </div>
            <div className={cx("form-input")}>
              <label htmlFor="">
                Email{" "}
                <strong style={{ color: "red", fontWeight: 800 }}>*</strong>
              </label>
              <input type="email" placeholder="Email" />
            </div>
            <div className={cx("form-input")}>
              <label htmlFor="">
                Địa chỉ{" "}
                <strong style={{ color: "red", fontWeight: 800 }}>*</strong>
              </label>
              <input type="text" placeholder="Nhập địa chỉ" />
            </div>
          </div>
          <div className={cx("descipt")}>
            <h3>THÔNG TIN BỔ SUNG</h3>
            <textarea
              name=""
              id=""
              placeholder="Nhập thông tin bổ sung khi giao hàng"
            ></textarea>
          </div>
        </div>
        <div className={cx("right")}>
          <h3>ĐƠN HÀNG THANH TOÁN</h3>
          <div className={cx("price")}>
            <p className={cx("title")}>Tạm tính:</p>
            <p className={cx("temp")}>100.000d</p>
          </div>
          <div className={cx("price")}>
            <p className={cx("title")}>Tổng tiền:</p>
            <p className={cx("sum")}>100.000d</p>
          </div>
          <div className={cx("list-method")}>
            <div className={cx("radio-btn")}>
              <input type="radio" name="radio" id="radio1" value={1} />
              <label htmlFor="radio1">Trả tiền khi nhận hàng</label>
            </div>
            <div className={cx("radio-btn")}>
              <input type="radio" name="radio" id="radio2" value={2} />
              <label htmlFor="radio2">Chuyển khoản ngân hàng</label>
            </div>
            <div className={cx("radio-btn")}>
              <input type="radio" name="radio" id="radio3" value={3} />
              <label htmlFor="radio3">Zalo</label>
            </div>
            <div className={cx("radio-btn")}>
              <input type="radio" name="radio" id="radio4" value={4} />
              <label htmlFor="radio4">Momo</label>
            </div>
          </div>
          <div className={cx("infor-transfer")}>
            <p>Chuyển khoản qua tài khoản Teckcombank</p>
            <p>
              Số tài khoản: 
              <strong style={{ color: "#a08150", fontWeight: 800 }}>
                19035270052000
              </strong>
            </p>
            <p>
              Chủ tài khoản: 
              <strong style={{ color: "#a08150", fontWeight: 800 }}>
                Nguyễn Văn A
              </strong>
            </p>
          </div>
          <div className={cx("btn")}>
            <button
              className={cx("payment")}
              onClick={() => navigate("/thanh-cong")}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
