import React from "react";
import style from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
const cx = classNames.bind(style);
export default function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>{children}</div>
      <Footer />
    </div>
  );
}
