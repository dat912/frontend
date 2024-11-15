import React, { useEffect } from "react";
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";
// const cx = classNames.bind(style);

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="d-flex">
      <HeaderAdmin />
      <div className="p-1" style={{ flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
}
