import React, { useState } from "react";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap"; // Import Modal and Form from React Bootstrap

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    total,
    clearCart,
  } = useShoppingContext();
  const navigate = useNavigate();

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "address" && value.trim()) {
      setError("");
    }
  };

  const handlePlaceOrder = async () => {
    if (!formData.address.trim()) {
      setError("Vui lòng nhập địa chỉ.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          address: formData.address,
          items: cartItems,
          totalPrice: total,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order placed successfully:", result);
        alert("Đặt hàng thành công");
        clearCart();
        navigate("/san-pham"); // Chuyển hướng tới trang thành công
      } else {
        console.error("Failed to place order:", response);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  return (
    <div className="container vh-100 font-monospace fw-bolder">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="font-monospace fw-bolder">
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.img} alt={item.ten} width="50" />
                </td>
                <td>{item.ten}</td>
                <td>
                  {item.qty}{" "}
                  <button
                    className="btn btn-sm btn-primary ms-3 me-1"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>
                </td>
                <td>{item.gia} đ</td>
                <td>{item.gia * item.qty} đ</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger btn-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="col-md-12">
        <span className="float-end me-2">
          <strong>Tổng tiền hóa đơn {total} đ</strong>
        </span>
      </div>

      <div className="col-md-12 mt-5">
        <Link to="/san-pham" className="btn btn-sm btn-primary float-start">
          Tiếp tục mua
        </Link>
        <button
          className="btn btn-sm btn-success float-end me-2 d-block"
          onClick={handleShowModal} // Mở modal khi nhấn nút "Place Order"
        >
          Place Order
        </button>
      </div>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="font-monospace fw-bolder">
            Thông tin thanh toán
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={localStorage.getItem("ten")}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={localStorage.getItem("phone")}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={localStorage.getItem("email")}
                onChange={handleFormChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Nhập địa chỉ của bạn"
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="m-3 d-flex justify-content-end">
              <strong>Tổng tiền: {total} đ</strong>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={handlePlaceOrder}
                className="ms-2"
              >
                Thanh toán momo
              </Button>
              <Button
                variant="primary"
                onClick={handlePlaceOrder}
                className="ms-2"
              >
                Tiền mặt
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;
