import React, { useState } from "react";
import style from "./Detail.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import product from "../../assets/product.png";
import product2 from "../../assets/product-2.jpg";
import product3 from "../../assets/product-3.jpg";
import banner from "../../assets/banner-barber.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import OtherProduct from "../../components/OtherProduct/OtherProduct";
import Product from "../../components/Product/Product";
const cx = classNames.bind(style);
export default function Detail() {
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  const imgs = [
    { id: 1, src: product },
    // { id: 2, src: product2 },
    // { id: 3, src: product3 },
  ];
  const [image, setImage] = useState(imgs[0].src);
  const handleImageClick = (src) => {
    setImage(src);
  };
  const handleDecrease = () => {
    if (number <= 0) {
      setNumber(0);
    } else {
      setNumber(number - 1);
    }
  };
  const handleIncrease = () => {
    setNumber(number + 1);
  };
  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("navigate")}>
        <Link className={cx("link")}>Sản phẩm</Link>/
        <Link className={cx("link")}> Tông đơ </Link>/<p> Bộ Tông đơ</p>
      </div> */}
      <div className={cx("product")}>
        <div className={cx("images")}>
          <div className={cx("big-img")}>
            <img src={image} alt="" />
          </div>
        </div>
        <div className={cx("action")}>
          <h3>Tong do</h3>

          <p className={cx("new-price")}>600.000d</p>
          <p className={cx("inventory")}>Số lượng hàng còn: 10</p>
          <div className={cx("quality")}>
            <button className={cx("prev")} onClick={handleDecrease}>
              -
            </button>
            <p className={cx("number")}>{number}</p>
            <button className={cx("next")} onClick={handleIncrease}>
              +
            </button>
          </div>
          <button className={cx("add-to-cart")}>THÊM VÀO GIỎ HÀNG</button>
          <button
            className={cx("booking")}
            onClick={() => navigate("/dat-lich")}
          >
            ĐẶT LỊCH CẮT TÓC
          </button>
          <div className={cx("list-address")}>
            <div className={cx("address-icon")}>
              <p className={cx("icon")}>
                <FontAwesomeIcon icon={faLocationDot} /> Chi nhanh 1
              </p>
              <p className={cx("address")}>19 Cao Lo</p>
              <p className={cx("phone")}>099999999</p>
            </div>

            <div className={cx("address-icon")}>
              <p className={cx("icon")}>
                <FontAwesomeIcon icon={faLocationDot} /> Chi nhanh 2
              </p>
              <p className={cx("address")}>18 Cao Lo</p>
              <p className={cx("phone")}>099999999</p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("description")}>
        <h3>MÔ TẢ SẢN PHẨM</h3>
        <div className={cx("descrip")}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
        </div>
      </div>
    </div>
  );
}
