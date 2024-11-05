import React from "react";
import style from "./Products.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../assets/banner-barber.png";
import Product from "../../components/Product/Product";
import imageProduct from "../../assets/product.png";
const cx = classNames.bind(style);
export default function Products() {
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("left")}>
        <p className={cx("title")}>SẢN PHẨM</p>
        <p className={cx("navigate")}>
          sản phẩm / <strong style={{ color: "black" }}> Sap vuot toc </strong>
        </p>
        <div className={cx("list")}>
          <h3>DANH MỤC SẢN PHẨM</h3>
          <ul className={cx("ul")}>
            <li>
              <Link className={cx("li")}>Sap vuot toc</Link>
            </li>
            <li>
              <Link className={cx("li")}>Keo cat toc</Link>
            </li>
            <li>
              <Link className={cx("li")}>Luoc</Link>
            </li>
          </ul>
        </div>
        <div className={cx("banner-1")}>
          <img src={banner} alt="" />
        </div>
        <div className={cx("banner-1")}>
          <img src={banner} alt="" />
        </div>
      </div>
      <div className={cx("right")}>
        <div className={cx("filter")}>
          <h3>Sắp xếp hiển thị theo</h3>
          <select name="" id="">
            <option value="">Chọn sắp xếp</option>
            <option value="">Giá tăng dần</option>
            <option value="">Giá giảm dần</option>
            <option value="">Aa-Zz</option>
            <option value="">Zz-Aa</option>
          </select>
        </div>
        <div className={cx("list-product")}>
          {/* <Product
            oldPrice={"400.000"}
            newPrice={"300.000"}
            percent={"-10%"}
            image={imageProduct}
          /> */}
          <Product viewInside={() => navigate("/chi-tiet-san-pham")} />
          <Product viewInside={() => navigate("/chi-tiet-san-pham")} />
          <Product viewInside={() => navigate("/chi-tiet-san-pham")} />
          <Product viewInside={() => navigate("/chi-tiet-san-pham")} />
          {/* <Product viewInside={() => navigate("/chi-tiet-san-pham")} />
          <Product viewInside={() => navigate("/chi-tiet-san-pham")} />
          <Product /> */}
          
        </div>
      </div>
    </div>
  );
}
