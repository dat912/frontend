import axios from "axios";
import React, { useEffect, useState } from "react";

const VaiTro = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentVaiTro, setCurrentVaiTro] = useState({
    tenVaiTro: "",
  });

  const [VaiTro, setVaiTro] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getVaiTroAll")
      .then((result) => {
        if (result.data) {
          setVaiTro(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentVaiTro);

    try {
      if (modalMode === "add") {
        const response = await axios.post(
          "http://localhost:8080/addVaiTro",
          currentVaiTro
        );
        if (response.data === "Tên Vai Tro đã tồn tại") {
          alert("Tên Vai Trò đã tồn tại.");
        } else {
          alert("Thêm Vai Trò thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        // Gửi yêu cầu PUT để cập nhật
        axios
          .put(
            `http://localhost:8080/editVaiTro/${currentVaiTro.id}`,
            currentVaiTro
          )
          .then((result) => {
            if (result.data === "Tên VaiTro đã tồn tại") {
              alert("Tên VaiTro đã tồn tại.");
            } else {
              alert("Cập nhật thành công!");

              setShowModal(false);
              resetForm();
              window.location.reload();
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
        // Chú ý: Trước đây bạn đang dùng employees.id thay vì id được truyền vào
        const response = await axios.delete(
          `http://localhost:8080/deleteVaiTro/${id}`
        );

        if (response.data) {
          alert("Xoá Vai Trò thành công!");
          // Cập nhật state để remove nhân viên đã xóa
          setVaiTro(VaiTro.filter((emp) => emp.id !== id));
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

  const handleEdit = (VaiTro) => {
    setCurrentVaiTro(VaiTro);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentVaiTro({
      tenVaiTro: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder ">Quản lý ROLE</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setModalMode("add");
            resetForm();
            setShowModal(true);
          }}
        >
          Add Role
        </button>
      </div>

      <div className="table-responsive font-monospace ">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên Vai Trò</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {VaiTro.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.tenVaiTro}</td>

                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
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

      {/* Bootstrap Modal for Add/Edit Employee */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered font-monospace fw-bolder">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-monospace fw-bolder">
                {modalMode === "add" ? "Add ROLE" : "Edit ROLE"}
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
                  <label className="form-label">Tên Vai Trò</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentVaiTro.tenVaiTro}
                    onChange={(e) =>
                      setCurrentVaiTro({
                        ...currentVaiTro,
                        tenVaiTro: e.target.value,
                      })
                    }
                    placeholder="Enter tên Vai trò"
                  />
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
                    {modalMode === "add" ? "Add ROLE" : "Update ROLE"}
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

export default VaiTro;
