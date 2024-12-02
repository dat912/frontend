import axios from "axios";
import React, { useEffect, useState } from "react";

const ChiNhanh = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentChiNhanh, setCurrentChiNhanh] = useState({
    tenchinhanh: "",
    diachi: "",
  });

  const [chinhanhs, setChiNhanhs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getCountNhanVien")
      .then((result) => {
        if (result.data) {
          setChiNhanhs(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentChiNhanh);

    try {
      if (modalMode === "add") {
        const response = await axios.post(
          "http://localhost:8080/addChiNhanh",
          currentChiNhanh
        );
        if (response.data === "Tên chi nhánh đã tồn tại") {
          alert("Tên chi nhánh đã tồn tại.");
        } else {
          alert("Thêm chi nhánh thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        axios
          .put(
            `http://localhost:8080/editChiNhanh/${currentChiNhanh.id}`,
            currentChiNhanh
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
    if (window.confirm("Bạn có chắc chắn muốn xoá chi nhánh này không?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/deleteChiNhanh/${id}`
        );

        if (response.data) {
          alert("Xoá chi nhánh thành công!");
          // Cập nhật state để remove nhân viên đã xóa
          setChiNhanhs(chinhanhs.filter((emp) => emp.id !== id));
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            alert("Đã có nhân viên trên chi nhánh không thể xóa! ");
          } else {
            alert(
              error.response.data.message || "Có lỗi xảy ra khi xóa chi nhánh"
            );
          }
        } else {
          alert("Không thể kết nối đến server");
        }
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (chinhanhs) => {
    setCurrentChiNhanh(chinhanhs);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentChiNhanh({
      tenchinhanh: "",
      diachi: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder">Quản lý chi nhánh</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setModalMode("add");
            resetForm();
            setShowModal(true);
          }}
        >
          Add Chi Nhánh
        </button>
      </div>

      {/* Employee List */}
      <div className="table-responsive font-monospace ">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên Chi Nhánh</th>
              <th>Địa Chỉ</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {chinhanhs.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {e.tenchinhanh} ({e.soluong || 0} nhân viên)
                </td>
                <td>{e.diachi}</td>

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
                {modalMode === "add" ? "Add Chi Nhánh" : "Edit Chi Nhánh"}
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
                  <label className="form-label">Tên chi nhánh</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentChiNhanh.tenchinhanh}
                    onChange={(e) =>
                      setCurrentChiNhanh({
                        ...currentChiNhanh,
                        tenchinhanh: e.target.value,
                      })
                    }
                    placeholder="Enter tên chi nhánh"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentChiNhanh.diachi}
                    onChange={(e) =>
                      setCurrentChiNhanh({
                        ...currentChiNhanh,
                        diachi: e.target.value,
                      })
                    }
                    placeholder="Enter địa chỉ"
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
                    {modalMode === "add" ? "Add Chi Nhánh" : "Update Chi Nhánh"}
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

export default ChiNhanh;
