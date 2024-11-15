import React from "react";
import style from "./Footer.module.scss";
import classNames from "classnames/bind";
import logo from "../../assets/logo-barber.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faFacebookMessenger,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(style);
export default function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("footer")}>
        <div className={cx("left")}>
          <div className={cx("image-logo")}>
            <img src={logo} alt="" />
          </div>
          <ul className={cx("ul")}>
            <li className={cx("li")}>
              <FontAwesomeIcon icon={faEnvelope} />
              :letrandat@gmail.com
            </li>
            <li className={cx("li")}>
              <FontAwesomeIcon icon={faPhone} />: 0988888888
            </li>

            <li className={cx("li-social")}>
              <FontAwesomeIcon className={cx("social")} icon={faFacebook} />
              <FontAwesomeIcon
                className={cx("social")}
                icon={faFacebookMessenger}
              />
              <FontAwesomeIcon className={cx("social")} icon={faInstagram} />
            </li>
          </ul>
        </div>
        <div className={cx("mid")}></div>
        <div className={cx("right")}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15678.588015957772!2d106.6977036!3d10.7616648!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f92a4562461%3A0xa6370716a3cf5cfb!2sThe%20Men%20Barber%20Shop!5e0!3m2!1svi!2s!4v1727100996163!5m2!1svi!2s"
            className={cx("map")}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className={cx("copy-right")}>DATDAT2024</div>
    </div>
  );
}
