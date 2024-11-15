import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Products.module.scss";
import classNames from "classnames/bind";
import banner from "../../assets/banner-barber.png";
import { Modal, Button, Toast } from "react-bootstrap";
import { useShoppingContext } from "../../contexts/ShoppingContext";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useShoppingContext();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllProduct");
      if (response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    if (!localStorage.getItem("id")) {
      alert("Vui lòng đăng nhập mua sản phẩm");
      navigate("/dang-nhap");
    }
    if (!product) return;
    addToCart(product);
    setShowToast(true);

    // Nếu đang trong modal thì đóng modal
    if (showModal) {
      handleCloseModal();
    }
  };

  return (
    <div className="font-monospace fw-bolder">
      <div className={cx("wrapper")}>
        <div className={cx("left")}>
          <p className={cx("title")}>SẢN PHẨM</p>
          <div className={cx("list")}>
            <h3>DANH MỤC SẢN PHẨM</h3>
            <ul className={cx("ul")}>
              <li>Sáp vuốt tóc</li>
              <li>Tinh dầu dưỡng tóc</li>
            </ul>
          </div>
          <div className={cx("banner-1")}>
            <img src={banner} alt="Banner" />
          </div>
        </div>

        <div className={cx("right")}>
          <div className="row">
            <h3>Sản phẩm</h3>
            {products.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card bg-white h-100">
                  <img
                    src={product.img}
                    className="card-img-top"
                    alt={product.ten}
                    onClick={() => handleImageClick(product)}
                    style={{
                      cursor: "pointer",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{product.ten}</h5>
                    <p className="card-text">
                      {product.gia.toLocaleString()} đ
                    </p>
                    <div className="mt-auto">
                      <Button
                        variant="success"
                        onClick={() => handleAddToCart(product)}
                        className="w-100"
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal chi tiết sản phẩm */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="font-monospace fw-bolder">
            Chi tiết sản phẩm
          </Modal.Title>
        </Modal.Header>
        {selectedProduct && (
          <Modal.Body className="text-center font-monospace">
            <img
              src={selectedProduct.img}
              alt={selectedProduct.ten}
              className="img-fluid mb-3"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
            <h5 className="fw-bolder">Tên sản phẩm: {selectedProduct.ten}</h5>
            <p className="fw-bold">
              Giá: {selectedProduct.gia.toLocaleString()} đ
            </p>
            <p>{selectedProduct.chitiet}</p>
            <Button
              variant="success"
              onClick={() => handleAddToCart(selectedProduct)}
              className="w-100"
            >
              Thêm vào giỏ hàng
            </Button>
          </Modal.Body>
        )}
      </Modal>

      {/* Toast thông báo */}
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
        <Toast.Body>Đã thêm sản phẩm vào giỏ hàng!</Toast.Body>
      </Toast>
    </div>
  );
}
