import {
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Infor() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    ten: "",
    email: "",
    phone: "",
  });

  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${userId}`
        );

        setUser(response.data);
        const response2 = await axios.get(
          `http://localhost:8080/api/bookings/${userId}`
        );
        setBookings(response2.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/userUpdate/${userId}`, user)
      .then((result) => {
        if (result.data.Status) {
          alert("Cập nhật thành công!");
          setIsEditing(false);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-vh-100 bg-light">
      <main className="container py-4">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card shadow-sm bg-white">
              <div className="card-body p-3 ">
                <div className="d-flex flex-column gap-2  ">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`btn w-100  text-start d-flex align-items-center gap-2 ${
                      activeTab === "profile"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                  >
                    <User size={20} />
                    <span>Thông tin cá nhân</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`btn w-100 text-start d-flex align-items-center gap-2 ${
                      activeTab === "bookings"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                  >
                    <Calendar size={20} />
                    <span>Lịch đặt của tôi</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("donhang")}
                    className={`btn w-100 text-start d-flex align-items-center gap-2 ${
                      activeTab === "donhang"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                  >
                    <Calendar size={20} />
                    <span>Đơn hàng của tôi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-md-9">
            {activeTab === "profile" ? (
              <div className="card shadow-sm bg-white">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="card-title mb-0">Thông tin cá nhân</h5>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary"
                      >
                        Chỉnh sửa
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label className="form-label">Họ tên</label>
                        <input
                          type="text"
                          value={user.ten}
                          onChange={(e) =>
                            setUser({ ...user, ten: e.target.value })
                          }
                          className="form-control bg-light"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Số điện thoại</label>
                        <input
                          type="tel"
                          value={user.phone}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                          className="form-control bg-light"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                          className="form-control bg-light"
                        />
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          // onClick={handleUpdate}
                          className="btn btn-success me-2"
                        >
                          Lưu thay đổi
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            //setUser(userData);
                          }}
                          className="btn btn-secondary"
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <User className="text-primary" />
                        <span className="fw-bold text-secondary">Họ tên:</span>
                        <span>{user.ten}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Phone className="text-primary" />
                        <span className="fw-bold text-secondary">
                          Số điện thoại:
                        </span>
                        <span>{user.phone}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Mail className="text-primary" />
                        <span className="fw-bold text-secondary">Email:</span>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card shadow-sm bg-white ">
                <div className="card-header py-3">
                  <h5 className="card-title mb-0">Lịch đặt của tôi</h5>
                </div>
                <div className="card-body">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="card border bg-light mb-3">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col">
                            <div className="d-flex flex-column gap-2">
                              <div className="d-flex align-items-center gap-2">
                                <MapPin className="text-primary" />
                                <span className="text-dark">
                                  {booking.TenChiNhanh}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <Package className="text-primary" />
                                <span className="text-dark">
                                  {booking.TenDichVu}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <User className="text-primary" />
                                <span className="text-dark">
                                  {booking.TenNhanVien}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <Calendar className="text-primary" />
                                <span className="text-dark">
                                  {new Date(booking.Ngay).toLocaleDateString(
                                    "vi-VN",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "2-digit",
                                    }
                                  )}{" "}
                                  - {booking.Gio}
                                </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <DollarSign className="text-success" />
                                <span className="fw-bold text-success">
                                  {booking.TongTien.toLocaleString("vi-VN")} đ
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className="d-flex align-items-center gap-2">
                              <AlertCircle
                                className={
                                  booking.TenTrangThai === "Đã xác nhận"
                                    ? "text-primary"
                                    : booking.TenTrangThai === "Chờ xác nhận"
                                    ? "text-warning"
                                    : booking.TenTrangThai === "Đã Hoàn Thành"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              />
                              <span
                                className={`fw-bold ${
                                  booking.TenTrangThai === "Đã xác nhận"
                                    ? "text-primary"
                                    : booking.TenTrangThai === "Chờ xác nhận"
                                    ? "text-warning"
                                    : booking.TenTrangThai === "Đã Hoàn Thành"
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {booking.TenTrangThai}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
