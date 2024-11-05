import React from "react";
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";

// const cx = classNames.bind(style);
export default function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <HeaderAdmin />
      <div className="p-1" style={{ flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
}
