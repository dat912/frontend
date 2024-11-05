import React from "react";
import style from "./Cart.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import product from "../../assets/product-4.jpg";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export default function Cart() {
    const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <h3>GIỎ HÀNG</h3>
      <div className={cx("content")}>
        <div className={cx("left")}>
          <table>
            <tr className={cx("header")}>
              <th>San pham</th>
              <th>Gia</th>
              <th>So luong</th>
            </tr>
            <tr className={cx("data")}>
              <td>
                <div className={cx("infor")}>
                  <FontAwesomeIcon icon={faX} className={cx("icon")} />
                  <div className={cx("form-img")}>
                    <img src={product} alt="" />
                  </div>
                  <p className={cx("name")}>Combo chai xịt</p>
                </div>
              </td>
              <td>
                <p className={cx("price")}>500.000d</p>
              </td>
              <td>
                <div className={cx("action")}>
                  <button className={cx("prev")}>-</button>
                  <p className={cx("number")}>0</p>
                  <button className={cx("prev")}>+</button>
                </div>
              </td>
            </tr>
            <tr className={cx("data")}>
              <td>
                <div className={cx("infor")}>
                  <FontAwesomeIcon icon={faX} className={cx("icon")} />
                  <div className={cx("form-img")}>
                    <img src={product} alt="" />
                  </div>
                  <p className={cx("name")}>Combo chai xịt</p>
                </div>
              </td>
              <td>
                <p className={cx("price")}>500.000d</p>
              </td>
              <td>
                <div className={cx("action")}>
                  <button className={cx("prev")}>-</button>
                  <p className={cx("number")}>0</p>
                  <button className={cx("prev")}>+</button>
                </div>
              </td>
            </tr>
            <tr className={cx("data")}>
              <td>
                <div className={cx("infor")}>
                  <FontAwesomeIcon icon={faX} className={cx("icon")} />
                  <div className={cx("form-img")}>
                    <img src={product} alt="" />
                  </div>
                  <p className={cx("name")}>Combo chai xịt</p>
                </div>
              </td>
              <td>
                <p className={cx("price")}>500.000d</p>
              </td>
              <td>
                <div className={cx("action")}>
                  <button className={cx("prev")}>-</button>
                  <p className={cx("number")}>0</p>
                  <button className={cx("prev")}>+</button>
                </div>
              </td>
            </tr>
            <tr className={cx("data")}>
              <td>
                <div className={cx("infor")}>
                  <FontAwesomeIcon icon={faX} className={cx("icon")} />
                  <div className={cx("form-img")}>
                    <img src={product} alt="" />
                  </div>
                  <p className={cx("name")}>Combo chai xịt</p>
                </div>
              </td>
              <td>
                <p className={cx("price")}>500.000d</p>
              </td>
              <td>
                <div className={cx("action")}>
                  <button className={cx("prev")}>-</button>
                  <p className={cx("number")}>0</p>
                  <button className={cx("prev")}>+</button>
                </div>
              </td>
            </tr>
          </table>
          <button
            className={cx("back")}
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Tiếp tục mua sắm
          </button>
        </div>
        <div className={cx("right")}>
          <h4>Thành tiền</h4>
          <div className={cx("sum")}>
            <div className={cx("temp")}>
              <p className={cx("title")}>Tạm tính</p>
              <p className={cx("temp-price")}>400.000d</p>
            </div>
            <div className={cx("temp")}>
              <p className={cx("title")}>Tổng tiền</p>
              <p className={cx("sum-price")}>400.000d</p>
            </div>
          </div>
          <button
            className={cx("payment")}
            onClick={() => navigate("/chi-tiet-don-hang")}
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
}
