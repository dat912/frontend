import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import { Link, useLocation, useNavigate } from "react-router-dom";
import numeral from "numeral";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("Chờ xác nhận");
  const [hoaDonModal, setHoaDonModal] = useState(false); // Trạng thái modal hóa đơn
  const [hoaDon, setHoaDon] = useState(null); // Dữ liệu hóa đơn
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings(currentStatus);
  }, [currentStatus]);

  const loadBookings = (status) => {
    axios
      .get(`http://localhost:8080/getBookingsByStatus/${status}`)
      .then((result) => {
        if (result.data) {
          setBookings(result.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleStatusUpdate = (bookingId, newStatus) => {
    if (window.confirm("Bạn có đồng ý thực hiện không?")) {
      axios
        .put("http://localhost:8080/updateBookingStatus", {
          bookingId,
          newStatus,
        })
        .then(() => {
          loadBookings(currentStatus);
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const tongTienResponse = await axios.get(
        `http://localhost:8080/getTongTien/${bookingId}`
      );
      const tongTien = tongTienResponse.data.tongTien;

      const response = await axios.post("http://localhost:8080/momo", {
        amount: tongTien,
        bookingId: bookingId,
      });

      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        alert("Không thể khởi tạo thanh toán");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Có lỗi xảy ra khi thanh toán");
    }
  };

  const handleShowInvoice = async (bookingId) => {
    try {
      // Gọi API để lấy thông tin hóa đơn
      const response = await axios.get(
        `http://localhost:8080/getHoaDonBooking/${bookingId}`
      );
      console.log(response.data);
      setHoaDon(response.data); // Lưu thông tin hóa đơn vào state
      setHoaDonModal(true); // Hiện modal
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      alert("Không thể lấy thông tin hóa đơn");
    }
  };

  const renderActionButtons = (booking) => {
    switch (currentStatus) {
      case "Chờ xác nhận":
        return (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => handleStatusUpdate(booking.ID, "Đã xác nhận")}
            >
              Xác nhận
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleStatusUpdate(booking.ID, "Đã hủy")}
            >
              Hủy
            </button>
          </>
        );
      case "Đã xác nhận":
        return (
          <>
            <button
              className="btn btn-primary btn-sm me-2 m-1"
              onClick={() => handleStatusUpdate(booking.ID, "Đã hoàn thành")}
            >
              Thanh toán tiền mặt
            </button>
            <button
              className="btn btn-info btn-sm m-1"
              onClick={() => handlePayment(booking.ID)}
            >
              Thanh toán Momo
            </button>
          </>
        );
      case "Đã hoàn thành":
        return (
          <>
            <button
              className="btn btn-primary btn-sm me-2 m-1"
              onClick={() => handleShowInvoice(booking.ID)} // Mở modal hóa đơn
            >
              Hiện thông tin hóa đơn
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-5 mt-3 font-monospace ">
      <div className="d-flex justify-content-center">
        <h3>Booking List</h3>
      </div>
      <div className="mb-3">
        <button
          className={`btn ${
            currentStatus === "Chờ xác nhận" ? "btn-primary" : "btn-success"
          } m-1`}
          onClick={() => setCurrentStatus("Chờ xác nhận")}
        >
          Chờ xác nhận
        </button>
        <button
          className={`btn ${
            currentStatus === "Đã xác nhận" ? "btn-primary" : "btn-success"
          } m-1`}
          onClick={() => setCurrentStatus("Đã xác nhận")}
        >
          Đã xác nhận
        </button>
        <button
          className={`btn ${
            currentStatus === "Đã hủy" ? "btn-primary" : "btn-success"
          } m-1`}
          onClick={() => setCurrentStatus("Đã hủy")}
        >
          Đã hủy
        </button>
        <button
          className={`btn ${
            currentStatus === "Đã hoàn thành" ? "btn-primary" : "btn-success"
          } m-1`}
          onClick={() => setCurrentStatus("Đã hoàn thành")}
        >
          Đã hoàn thành
        </button>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Tên chi nhánh</th>
              <th>Tên dịch vụ</th>
              <th>Tên Nhân Viên</th>
              <th>Tên khách hàng</th>
              <th>Giá tiền</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {new Date(booking.Ngay).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </td>
                <td>{booking.Gio}</td>
                <td>{booking.TenChiNhanh}</td>
                <td>{booking.TenDichVu}</td>
                <td>{booking.TenNhanVien}</td>
                <td>{booking.TenUser}</td>
                <td>
                  {numeral(booking.TongTien).format("0,0").replace(/,/g, ".")}{" "}
                  VNĐ
                </td>

                <td>{booking.TenTrangThai}</td>
                <td>{renderActionButtons(booking)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị hóa đơn */}
      <Modal show={hoaDonModal} onHide={() => setHoaDonModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="font-monospace fw-bolder ">
            Thông tin hóa đơn
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="font-monospace fw-bolder ">
          {hoaDon ? (
            <div>
              {hoaDon.map((e, index) => (
                <tr key={index}>
                  <p>
                    <strong>Tên khách hàng:</strong> {e.TenUser}
                  </p>
                  <p>
                    <strong>Tên chi nhánh:</strong> {e.TenChiNhanh}
                  </p>
                  <p>
                    <strong>Tên dịch vụ:</strong> {e.TenDichVu}
                  </p>
                  <p>
                    <strong>Tên nhân viên:</strong> {e.TenNhanVien}
                  </p>
                  <p>
                    <strong>Ngày:</strong>{" "}
                    {new Date(e.Ngay).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </p>
                  <p>
                    <strong>Giờ:</strong> {e.Gio}
                  </p>
                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {numeral(e.TongTien).format("0,0").replace(/,/g, ".")} VNĐ
                  </p>
                </tr>
              ))}
            </div>
          ) : (
            <p>Đang tải thông tin hóa đơn...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setHoaDonModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;
