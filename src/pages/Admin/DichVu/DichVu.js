import axios from "axios";
import React, { useEffect, useState } from "react";
import numeral from "numeral";
const DichVu = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentDichVu, setCurrentDichVu] = useState({
    tendichvu: "",
    gia: "",
  });

  const [dichvus, setDichVus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getDichVuAll")
      .then((result) => {
        if (result.data) {
          setDichVus(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currentDichVu);

    try {
      if (modalMode === "add") {
        // Gửi yêu cầu POST để thêm mới
        const response = await axios.post(
          "http://localhost:8080/addDichVu",
          currentDichVu
        );
        if (response.data === "Tên dịch vụ đã tồn tại") {
          // Hiển thị thông báo lỗi nếu email hoặc phone đã tồn tại
          alert("Tên dịch vụ đã tồn tại. ");
        } else {
          alert("Thêm thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        // Gửi yêu cầu PUT để cập nhật
        axios
          .put(
            `http://localhost:8080/editDichVu/${currentDichVu.id}`,
            currentDichVu
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
        // Chú ý: Trước đây bạn đang dùng employees.id thay vì id được truyền vào
        const response = await axios.delete(
          `http://localhost:8080/deleteDichVu/${id}`
        );

        if (response.data) {
          alert("Xoá thành công!");
          // Cập nhật state để remove nhân viên đã xóa
          setDichVus(dichvus.filter((emp) => emp.id !== id));
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status >= 500) {
            alert("Lỗi hệ thống. Vui lòng thử lại sau!");
          } else {
            alert(error.response.data.message || "Có lỗi xảy ra khi xóa ");
          }
        } else {
          alert("Không thể kết nối đến server");
        }
        console.error("Error deleting :", error);
      }
    }
  };

  const handleEdit = (dichvus) => {
    setCurrentDichVu(dichvus);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentDichVu({
      tendichvu: "",
      gia: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder">Dịch vụ Management</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setModalMode("add");
            resetForm();
            setShowModal(true);
          }}
        >
          Add Dịch Vụ
        </button>
      </div>

      {/* Employee List */}
      <div className="table-responsive font-monospace ">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Tên Dịch Vụ</th>
              <th>Giá</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dichvus.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.tendichvu}</td>
                <td>{numeral(e.gia).format("0,0").replace(/,/g, ".")} VNĐ</td>

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
                {modalMode === "add" ? "Add Dịch Vụ" : "Edit  Dịch Vụ"}
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
                  <label className="form-label">Tên Dịch Vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentDichVu.tendichvu}
                    onChange={(e) =>
                      setCurrentDichVu({
                        ...currentDichVu,
                        tendichvu: e.target.value,
                      })
                    }
                    placeholder="Enter tên Dịch Vụ"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Giá</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentDichVu.gia}
                    onChange={(e) =>
                      setCurrentDichVu({
                        ...currentDichVu,
                        gia: e.target.value,
                      })
                    }
                    placeholder="Enter Giá"
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
                    {modalMode === "add" ? "Add Dịch vụ" : "Update Dịch vụ"}
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

export default DichVu;
