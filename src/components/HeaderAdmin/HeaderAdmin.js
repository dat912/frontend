import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Offcanvas } from "react-bootstrap";
export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="m-3 font-monospace ">
        <h2 className=" fw-bolder ">DASHBOARD</h2>
        <Button className="btn btn-info " onClick={handleShow}>
          MENU
        </Button>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        scroll={true} // Enables body scrolling when offcanvas is open
        backdrop={false} // Disables backdrop
        placement="start" // Sets offcanvas to appear from the left side
        className="w-auto justify-content-center  "
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className=" font-monospace r">
            DASHBOARD
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar expand="lg" className=" font-monospace flex-column">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className="me-auto fw-bolder  flex-column ">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/category">Category</Nav.Link>
                  <Nav.Link href="#">Product</Nav.Link>
                  <Nav.Link href="chinhanh">Chi nhánh</Nav.Link>
                  <Nav.Link href="dichvu">Dịch vụ</Nav.Link>
                  <Nav.Link href="/employee">Nhân viên</Nav.Link>
                  <Nav.Link href="booking">Thông tin lịch</Nav.Link>
                  <Nav.Link href="#">Thông tin khách hàng</Nav.Link>
                  <button class="btn btn-dark lg">Logout</button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
