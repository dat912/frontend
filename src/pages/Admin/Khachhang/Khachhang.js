import axios from "axios";
import React, { useEffect, useState } from "react";

const Khachhang = () => {
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [user, setUser] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

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

  const handleCreateOrder = (user) => {
    setShowModalCreate(true);
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
    // setOrder((prevOrder) => ({
    //   ...prevOrder,
    //   items: [], // Reset items khi đóng modal
    // }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="font-monospace fw-bolder">Khách hàng</h2>
      </div>

      <div className="table-responsive font-monospace ">
        <button
          className="btn btn-success btn-sm me-2"
          onClick={() => {
            setModalMode("add");
            resetForm();
            setShowModal(true);
          }}
        >
          Add Khách hàng
        </button>
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
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleCreateOrder(user)}
                  >
                    Tạo đơn hàng
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    // onClick={() => handleDelete(e.id)}
                  >
                    Tạo lịch
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
                    onChange={(e) => {
                      const email = e.target.value;
                      const emailRegex =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                      if (!emailRegex.test(email)) {
                        setEmailError("Email không hợp lệ");
                      } else {
                        setEmailError("");
                      }

                      setCurrentUser({
                        ...currentUser,
                        email,
                      });
                    }}
                    placeholder="Enter Email"
                  />
                  {emailError && (
                    <span style={{ color: "red" }}>{emailError}</span>
                  )}
                </div>

                {modalMode === "add" && (
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentUser.password}
                      onChange={(e) => {
                        const password = e.target.value;
                        const passwordRegex =
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;

                        if (!passwordRegex.test(password)) {
                          setPassError(
                            "Password  gồm 1 chữ cái thường 1 chữ cái in hoa 1 chữ số và có 6 ký tự"
                          );
                        } else {
                          setPassError("");
                        }

                        setCurrentUser({
                          ...currentUser,
                          password,
                        });
                      }}
                      placeholder="Enter Password"
                    />
                    {passError && (
                      <span style={{ color: "red" }}>{passError}</span>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Số điện thoại </label>
                  <input
                    type="text"
                    name="phone"
                    pattern="[0-9]*"
                    maxLength={10}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      if (!e.target.value.startsWith("0")) {
                        e.target.value = "0" + e.target.value;
                      }
                      e.target.value = e.target.value.slice(0, 10);
                    }}
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

      {showModalCreate && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-monospace fw-bolder">
                  Create Order for
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleCloseModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={user.ten}
                      // onChange={(e) =>
                      //   setOrder({ ...order, name: e.target.value })
                      // }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      // value={selectedUser.phone}
                      // onChange={(e) =>
                      //   setOrder({ ...order, phone: e.target.value })
                      // }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      // value={selectedUser.email}
                      // onChange={(e) =>
                      //   setOrder({ ...order, email: e.target.value })
                      // }
                    />
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      value={selectedUser.address}
                      onChange={(e) =>
                        setOrder({ ...order, address: e.target.value })
                      }
                    ></textarea>
                  </div> */}
                  <h3 className="pt-3 font-monospace fw-bolder">Sản phẩm</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleAddToOrder(product)}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                  <h3>Order Summary</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price * item.quantity}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleRemoveFromOrder(item.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => handleCloseModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={handleSubmitOrder}
                >
                  Submit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Khachhang;
