import axios from "axios";
import React, { useState } from "react";
import style from "./Signup.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
const cx = classNames.bind(style);
export default function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleSwitch = () => {
    setShow(!show);
  };
  
  const [error, setError]=useState({})
  const [values, setValues] =useState({
    email: '',
    ten: '',
    password: '',
    phone: ''
  })
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    setError(Validation(values));
    if(error.email ==="" && error.phone ==="" && error.password ==="" ){
    axios.post('http://localhost:8080/signup', values)
    .then(res=> {
        console.log(res);
        navigate('/dang-nhap')
        alert("Dang ky thanh cong");
    })
    .catch(err => console.log(err))
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = Validation(values);
  //   setError(validationErrors);
  
  //   if (Object.keys(validationErrors).length === 0) {
  //     try {
  //       const response = await axios.post('http://localhost:8080/signup', values);
  //       if (response.data.message === "Đăng ký thành công") {
  //         alert("Đăng ký thành công");
  //         navigate('/dang-nhap');
  //       } else {
  //         alert("Đăng ký thất bại: " + response.data.message);
  //       }
  //     } catch (error) {
  //       if (error.response) {
  //         alert("Lỗi: " + error.response.data.message);
  //       } else {
  //         alert("Đã xảy ra lỗi khi đăng ký");
  //       }
  //       console.error(error);
  //     }
  //   }
  // };

 


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
        <h3>ĐĂNG KÝ TÀI KHOẢN</h3>

        <form action="" onSubmit={handleSubmit}>
        <div className={cx("form-input")}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" name="email" id="" onChange={e=>setValues({...values,email:e.target.value})} />
          {error.email && <span>{error.email}</span>}
        </div>
        <div className={cx("form-input")}>
          <label htmlFor="ten">Tên</label>
          <input type="text" placeholder="Tên" name="ten" id="" onChange={e=>setValues({...values,ten:e.target.value})} />
          
        </div>

        <div className={cx("form-input")}>
          <label htmlFor="phone">Số điện thoại</label>
          <input type="phone" placeholder="Số điện thoại" name="phone" id="" onChange={e=>setValues({...values,phone:e.target.value})} />
          {error.phone && <span>{error.phone}</span>}
        </div>
        <div className={cx("form-input")}>
          <label htmlFor="password">Mật khẩu</label>
          <input
            type={show === false ? "password" : "text"}
            name="password"
            placeholder="Mật khẩu"
            id=""
            onChange={e=>setValues({...values,password:e.target.value})}
          />
          {error.password && <span>{error.password}</span>}
          <div className={cx("action")}>
            <div className={cx("checkbox")}>
              <p onClick={handleSwitch}>
                {show === false ? "Hiển thị mật khẩu" : "Ẩn mật khẩu"}
              </p>
            </div>
          </div>
        </div>
        
        <div className={cx("form-btn")}>
          <button  className={cx("btn-signin")}>ĐĂNG KÝ TÀI KHOẢN</button>
          <button
            className={cx("btn-signup")}
            onClick={() => navigate("/dang-nhap")}
          >
            ĐĂNG NHẬP
          </button>
         
        </div>
        </form>
        
      </div>
      
    </div>
  );
}
