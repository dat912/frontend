import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "react-bootstrap";

function Login() {
  const [showToast, setShowToast] = useState(false);
  const [value, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!value.email || !value.password) {
      setError({ message: "Vui lòng điền đầy đủ email và mật khẩu" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/loginAdmin",
        value
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        console.log(response.data.token);
        console.log(response.data.role);
        setShowToast(true);
        setTimeout(() => {
          navigate("/home");
        }, 800);
      } else {
        setError({ message: "Đăng nhập không thành công. Vui lòng thử lại." });
      }
    } catch (err) {
      setError({ message: "Sai mật khẩu." });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark font-monospace fw-bolder">
      <div className="bg-white p-3 rounded w-25 border border-primary">
        <h2 className="d-flex justify-content-center align-items-center ">
          LOGIN ADMIN
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong> Password </strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100">
            <strong> Log in </strong>
          </button>
        </form>

        {error.message && (
          <div className="alert alert-danger mt-3" role="alert">
            {error.message}
          </div>
        )}
      </div>

      {/* Toast thông báo đăng nhập thành công */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Đăng nhập thành công!</Toast.Body>
      </Toast>
    </div>
  );
}

export default Login;
