import axios from "axios";
import React, { useEffect, useState } from "react";
import numeral from "numeral";
import * as XLSX from "xlsx";

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [Product, setProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState({
    ten: "",
    img: "",
    gia: "",
    chitiet: "",
    category_id: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/getProductAll")
      .then((result) => {
        if (result.data) {
          setProduct(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/getCategoryAll").then((response) => {
      setListCategory(response.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentProduct);

    try {
      if (modalMode === "add") {
        const response = await axios.post(
          "http://localhost:8080/addProduct",
          currentProduct
        );
        if (response.data === "Tên Product đã tồn tại") {
          alert("Tên Product đã tồn tại.");
        } else {
          alert("Thêm Product thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        // Gửi yêu cầu PUT để cập nhật
        axios
          .put(
            `http://localhost:8080/editProduct/${currentProduct.id}`,
            currentProduct
          )
          .then((result) => {
            if (result.data.Status) {
              alert("Cập nhật thành công!");

              setShowModal(false);
              resetForm();
              window.location.reload();
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/deleteProduct/${id}`
        );
        if (response.data) {
          alert("Xoá Product thành công!");
          setProduct(Product.filter((emp) => emp.id !== id));
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            alert("Lỗi hệ thống. Vui lòng thử lại sau!");
          } else {
            alert(error.response.data.message || "Có lỗi xảy ra khi xóa");
          }
        } else {
          alert("Không thể kết nối đến server");
        }
        console.error("Error deleting:", error);
      }
    }
  };

  const handleEdit = (Product) => {
    setCurrentProduct(Product);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentProduct({
      ten: "",
      img: "",
      gia: "",
      chitiet: "",
      category_id: "",
    });
  };

  // Xuất EXCEL
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(Product);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "ProductList.xlsx");
  };
  //NHẬP EXCEL
  const fileInputRef = React.createRef();

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const binaryStr = evt.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Loại bỏ khoảng trắng và chuẩn hóa tên
        const formattedData = data.map((row) => ({
          ...row,
          ten: row.ten.trim().toLowerCase(),
        }));

        // Kiểm tra trùng tên với sản phẩm hiện tại trong frontend
        const validData = formattedData.filter(
          (row) =>
            row.ten &&
            row.img &&
            row.gia &&
            row.soluong &&
            row.chitiet &&
            row.category_id &&
            !Product.some((p) => p.ten.trim().toLowerCase() === row.ten)
        );

        // Nếu có sản phẩm bị loại bỏ do trùng tên, thông báo cho người dùng
        if (formattedData.length !== validData.length) {
          alert(
            "Một số sản phẩm trong file Excel trùng với sản phẩm hiện có và đã bị loại bỏ!"
          );
          window.location.reload();
        }

        // Gửi dữ liệu hợp lệ lên server
        if (validData.length > 0) {
          fetch("http://localhost:8080/api/products/import", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(validData),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Nhập Excel thành công:", result);
              alert("Nhập Excel thành công!");
              window.location.reload();
            })
            .catch((error) => {
              console.error("Lỗi khi nhập Excel:", error);
              alert("Đã xảy ra lỗi khi nhập file Excel.");
            });
        } else {
          alert("Tất cả các sản phẩm trong file Excel đều trùng tên!");
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder">Quản lý Product</h2>
        <div className="d-flex ms-auto">
          {/* EXCEL */}
          <button className="btn btn-primary me-2" onClick={handleExportExcel}>
            Xuất Excel
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => fileInputRef.current.click()}
          >
            Nhập Excel
          </button>
          <input
            type="file"
            accept=".xlsx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImportExcel}
          />
          {/* END EXCEL */}

          <button
            className="btn btn-success"
            onClick={() => {
              setModalMode("add");
              resetForm();
              setShowModal(true);
            }}
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="table-responsive font-monospace fw-bolder">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên Product</th>
              <th>Hình</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Chi tiết</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Product.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.ten}</td>
                <td>
                  <img src={e.img} alt={e.ten} width="70" />
                </td>
                <td>{e.soluong}</td>
                <td> {numeral(e.gia).format("0,0").replace(/,/g, ".")} VNĐ</td>

                <td>{e.chitiet}</td>
                <td>{e.category_name}</td>

                <td>
                  <button
                    className="btn btn-info btn-sm mb-2"
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered font-monospace fw-bolder">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title ">
                {modalMode === "add" ? "Add Product" : "Edit Product"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên Product</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentProduct.ten}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        ten: e.target.value,
                      })
                    }
                    placeholder="Enter tên Product"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Img</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentProduct.img}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        img: e.target.value,
                      })
                    }
                    placeholder="Enter img Product"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Số lượng</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentProduct.soluong}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        soluong: e.target.value,
                      })
                    }
                    placeholder="Enter số lượng Product"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Giá</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentProduct.gia}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        gia: e.target.value,
                      })
                    }
                    placeholder="Enter giá Product"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Chi tiết</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={currentProduct.chitiet}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        chitiet: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category_id"
                    value={currentProduct.category_id}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentProduct({
                        ...currentProduct,
                        category_id: e.target.value,
                      });
                    }}
                    required
                  >
                    <option value="" disabled>
                      Chọn Category
                    </option>
                    {listCategory.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.ten}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-footer px-0 pb-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === "add" ? "Add Product" : "Update Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showModal && <div className="modal fade show"></div>}
      </div>
    </div>
  );
};

export default Product;
