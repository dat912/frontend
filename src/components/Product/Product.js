import React from "react";
import style from "./Product.module.scss";
import classNames from "classnames/bind";
import product from "../../assets/product.png";
const cx = classNames.bind(style);
export default function Product({
  percent,
  image,
  oldPrice,
  newPrice,
  addToCart,
  viewInside,
}) {
  return (
    <div className={cx("wrapper")}>
      {/* <p className={cx("sale")}>{percent ? percent : "-15%"}</p> */}
      <div className={cx("image-product")}>
        <img src={image ? image : product} alt="" />
      </div>
      <h3 onClick={viewInside}>Tong do</h3>
      <div className={cx("price")}>
        {/* <p className={cx("old")}>{oldPrice ? oldPrice : "600.000"}d</p> */}
        <p className={cx("new")}>{newPrice ? newPrice : "600.000"}d</p>
      </div>
      <button className={cx("add-to-cart")} onClick={addToCart}>
        THÊM VÀO GIỎ HÀNG
      </button>
    </div>
  );
}
