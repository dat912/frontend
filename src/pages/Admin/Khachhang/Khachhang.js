import axios from "axios";
import React, { useEffect, useState } from "react";

const Khachhang = () => {
  const [user, setUser] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentUser, setCurrentUser] = useState({
    ten: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/getKhachHangAll")
      .then((result) => {
        if (result.data) {
          setUser(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(currentUser);
    try {
      if (modalMode === "add") {
        // Gửi yêu cầu POST để thêm mới
        const response = await axios.post(
          "http://localhost:8080/addUser",
          currentUser
        );
        if (response.data === "Email hoặc phone đã tồn tại") {
          alert("Email hoặc số điện thoại đã tồn tại, vui lòng kiểm tra lại.");
        } else {
          // Nếu thêm thành công, hiển thị thông báo và xử lý tiếp
          alert("Thêm thành công");
          console.log(response.data);
          setShowModal(false);
          resetForm();
          window.location.reload();
        }
      } else {
        // Gửi yêu cầu PUT để cập nhật
        axios
          .put(`http://localhost:8080/editUser/${currentUser.id}`, currentUser)
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
          `http://localhost:8080/deleteUser/${id}`
        );

        if (response.data) {
          alert("Xoá  thành công!");
          // Cập nhật state để remove nhân viên đã xóa
          setUser(user.filter((emp) => emp.id !== id));
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
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalMode("edit");
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentUser({
      ten: "",
      email: "",
      password: "",
      phone: "",
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder">Khách hàng</h2>
      </div>

      <div className="table-responsive font-monospace ">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((e, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.ten}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => {
                      setModalMode("add");
                      resetForm();
                      setShowModal(true);
                    }}
                  >
                    Add
                  </button>
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

      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered font-monospace fw-bolder">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-monospace fw-bolder">
                {modalMode === "add" ? "Add User" : "Edit User"}
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
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentUser.ten}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        ten: e.target.value,
                      })
                    }
                    placeholder="Enter Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={currentUser.email}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter Email"
                  />
                </div>

                {modalMode === "add" && (
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentUser.password}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter Password"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Số điện thoại </label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentUser.phone}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currentUser,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Enter Số điện thoại"
                  />
                </div>

                <div className="modal-footer px-0 pb-0">
                  <button type="submit" className="btn btn-primary">
                    {modalMode === "add" ? "Add User" : "Update User"}
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

export default Khachhang;
