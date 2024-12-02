import React, { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";
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
  // Vừa Thêm
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [selectedCategory, setSelectedCategory] = useState(null); // ID danh mục được chọn

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  // Lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  // Lấy danh sách sản phẩm theo danh mục
  const fetchProducts = async () => {
    try {
      const url = selectedCategory
        ? `http://localhost:8080/products?category_id=${selectedCategory}`
        : "http://localhost:8080/products";

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Cập nhật danh mục được chọn
  };

  return (
    <div className="font-monospace fw-bolder">
      <div className={cx("wrapper")}>
        <div className={cx("left")}>
          <p className={cx("title")}>SẢN PHẨM</p>
          <div className={cx("list")}>
            <h3>DANH MỤC SẢN PHẨM</h3>
            {/* Vừa thêm vào  */}
            <ul className={cx("ul")}>
              <li
                onClick={() => setSelectedCategory(null)}
                style={{ cursor: "pointer" }}
              >
                Tất cả
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  style={{
                    cursor: "pointer",
                    fontWeight:
                      category.id === selectedCategory ? "bold" : "normal",
                  }}
                >
                  {category.ten}
                </li>
              ))}
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
                      {numeral(product.gia).format("0,0").replace(/,/g, ".")}{" "}
                      VNĐ
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
              Giá:{" "}
              {numeral(selectedProduct.gia).format("0,0").replace(/,/g, ".")}{" "}
              VNĐ
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
