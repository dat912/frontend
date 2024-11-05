import React from "react";
import style from "./Error.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
export default function Error() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-image")}>
        <img
          src="https://www.semtek.com.vn/wp-content/uploads/2021/01/loi-404-not-found-2.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
