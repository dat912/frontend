import React from "react";
import style from "./OtherProduct.module.scss";
import classNames from "classnames/bind";
import product from "../../assets/product-4.jpg";
const cx = classNames.bind(style);
export default function OtherProduct({
  img,
  name,
  oldprice,
  newprice,
  sale,
  viewInside,
}) {
  return (
    <div className={cx("other-product")} onClick={viewInside}>
      <div className={cx("form-img")}>
        <img src={img ? img : product} alt="" />
      </div>
      <div className={cx("content")}>
        <div className={cx("name")}>{name ? name : "Tong do"}</div>
        <div className={cx("price")}>
          <p className={cx("old-price")}>{oldprice ? oldprice : "400.000"}d</p>
          <p className={cx("new-price")}>{newprice ? newprice : "300.000"}d</p>
        </div>
        <div className={cx("sales")}>
          <p>{sale ? sale : "-15%"}</p>
        </div>
      </div>
    </div>
  );
}
