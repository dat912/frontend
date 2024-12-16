import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import numeral from "numeral";
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
  ///

  const navigate = useNavigate();
  const [selectedGio, setSelectedGio] = useState(null);
  const [listChiNhanh, setListChiNhanh] = useState([]);
  const [listNhanVien, setListNhanVien] = useState([]);
  const [listDichVu, setListDichVu] = useState([]);
  const [tongtien, setTongTien] = useState(0);
  const [selectedChiNhanh, setSelectedChiNhanh] = useState("");
  const [gioDaDat, setGioDaDat] = useState([]);

  const gios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const [values, setValues] = useState({
    gio: "",
    ngay: "",
    idchinhanh: "",
    iddichvu: "",
    idnhanvien: "",
    iduser: localStorage.getItem("id"),
    idtrangthai: 1,
    tongtien: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/getChiNhanhAll").then((response) => {
      setListChiNhanh(response.data);
    });
    axios.get("http://localhost:8080/getDichvuAll").then((response) => {
      setListDichVu(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedChiNhanh) {
      axios
        .get(`http://localhost:8080/getNhanVienAll/${selectedChiNhanh}`)
        .then((response) => {
          setListNhanVien(response.data);
        });
    }
  }, [selectedChiNhanh]);

  // const handleInputChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });

  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "iddichvu") {
      const selectedService = listDichVu.find(
        (dichvu) => dichvu.id === parseInt(value)
      );
      if (selectedService) {
        const newTongTien = selectedService.gia;
        setTongTien(newTongTien);
        setValues((prevValues) => ({ ...prevValues, tongtien: newTongTien }));
      }
    }
  };

  const handleSubmitDatLich = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/datlich",
        values
      );
      alert("Đặt lịch thành công");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(
        "Lỗi khi đặt lịch:",
        error.response ? error.response.data : error.message
      );
      alert("Đặt lịch thất bại. Vui lòng thử lại.");
    }
  };

  ///

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
    setCurrentUser(user);
    setShowModalCreate(true);
  };

  const handleCloseModal = () => {
    setShowModalCreate(false);
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
                    onClick={() => handleCreateOrder(e)}
                  >
                    Tạo lịch cắt
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
            <div className="modal-content font-monospace fw-bolder">
              <div className="modal-header">
                <h5 className="modal-title font-monospace fw-bolder">
                  Tạo lịch đặt
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
                <form onSubmit={handleSubmitDatLich}>
                  <div class="mb-3">
                    <label for="ten" class="form-label">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="ten"
                      class="form-control"
                      value={currentUser.ten}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          ten: e.target.value,
                        })
                      }
                      readOnly
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="phone" class="form-label">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      class="form-control"
                      value={currentUser.phone}
                      onChange={(e) =>
                        setCurrentUser({
                          ...currentUser,
                          phone: e.target.value,
                        })
                      }
                      readOnly
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label for="idchinhanh" class="form-label">
                      Chọn chi nhánh
                    </label>
                    <select
                      name="idchinhanh"
                      class="form-select"
                      value={selectedChiNhanh}
                      onChange={(e) => {
                        setSelectedChiNhanh(e.target.value);
                        handleInputChange(e);
                      }}
                      required
                    >
                      <option value="">Chọn chi nhánh</option>
                      {listChiNhanh.map((chinhanh) => (
                        <option key={chinhanh.id} value={chinhanh.id}>
                          {chinhanh.tenchinhanh}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="idnhanvien" class="form-label">
                      Chọn nhân viên
                    </label>
                    <select
                      name="idnhanvien"
                      class="form-select"
                      onChange={handleInputChange}
                      disabled={!selectedChiNhanh}
                      required
                    >
                      <option value="">Chọn nhân viên</option>
                      {listNhanVien.map((nhanvien) => (
                        <option key={nhanvien.id} value={nhanvien.id}>
                          {nhanvien.ten}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="iddichvu" class="form-label">
                      Chọn dịch vụ
                    </label>
                    <select
                      name="iddichvu"
                      class="form-select"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn dịch vụ</option>
                      {listDichVu.map((dichvu) => (
                        <option key={dichvu.id} value={dichvu.id}>
                          {dichvu.tendichvu}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Tổng tiền</label>
                    <input
                      type="text"
                      class="form-control"
                      value={`${numeral(tongtien)
                        .format("0,0")
                        .replace(/,/g, ".")} VNĐ`}
                      readOnly
                    />
                  </div>

                  <div class="mb-3">
                    <label for="ngay" class="form-label">
                      Chọn ngày
                    </label>
                    <input
                      type="date"
                      name="ngay"
                      class="form-control"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <label class="fw-bold">Chọn giờ</label>
                    <div
                      class="btn-group btn-group-toggle d-flex flex-wrap"
                      data-toggle="buttons"
                    >
                      {gios.map((gio) => (
                        <label
                          key={gio}
                          class={`btn btn-outline-dark m-1 col-3 mb-2 ${
                            selectedGio === gio ? "active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="gio"
                            value={gio}
                            checked={selectedGio === gio}
                            onChange={(e) => {
                              setSelectedGio(gio);
                              handleInputChange(e);
                            }}
                            class="d-none"
                            required
                          />
                          {gio}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg">
                      ĐẶT LỊCH
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Khachhang;
