import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin");
  };

  const handleNavigation = (path) => {
    handleClose();
    navigate(path);
  };

  const adminLinks = [
    { path: "/home", label: "Home" },
    { path: "/category", label: "Category" },
    { path: "/product", label: "Product" },
    { path: "/chinhanh", label: "Chi nhánh" },
    { path: "/dichvu", label: "Dịch vụ" },
    { path: "/employee", label: "Nhân viên" },
    { path: "/booking", label: "Thông tin lịch" },
    { path: "/hoadon", label: "Thông tin hóa đơn" },
    { path: "/khachhang", label: "Thông tin khách hàng" },
    { path: "/vaitro", label: "Quản lý Role" },
  ];

  const quanlyLinks = [
    { path: "/home", label: "Home" },
    { path: "/category", label: "Category" },
    { path: "/product", label: "Product" },
    { path: "/chinhanh", label: "Chi nhánh" },
    { path: "/dichvu", label: "Dịch vụ" },
    { path: "/booking", label: "Thông tin lịch" },
    { path: "/hoadon", label: "Thông tin hóa đơn" },
    { path: "/khachhang", label: "Thông tin khách hàng" },
  ];

  const links = role === "admin" ? adminLinks : quanlyLinks;

  return (
    <>
      <div className="m-3 font-monospace">
        <h2 className="fw-bolder">DASHBOARD</h2>

        <Button className="btn btn-info" onClick={handleShow}>
          MENU
        </Button>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        placement="start"
        className="w-auto justify-content-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="font-monospace">
            DASHBOARD {localStorage.getItem("role")}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar expand="lg" className="font-monospace flex-column">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto fw-bolder flex-column">
                  {links.map((link, index) => (
                    <Nav.Link
                      key={index}
                      onClick={() => handleNavigation(link.path)}
                      className={
                        location.pathname === link.path ? "active" : ""
                      }
                    >
                      {link.label}
                    </Nav.Link>
                  ))}
                  <button className="btn btn-dark lg" onClick={handleLogout}>
                    Logout
                  </button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
