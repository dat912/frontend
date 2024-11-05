import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [currentStatus, setCurrentStatus] = useState("Chờ xác nhận");
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

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/getTongTien/${bookings.id}`)
  //     .then((result) => {
  //       if (result.data) {
  //         setTongTien(result.data);
  //       } else {
  //         alert(result.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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

  // const handlePayment = async (bookingId, newStatus) => {
  //   const tongTienResponse = await axios.get(
  //     `http://localhost:8080/getTongTien/${bookingId}`
  //   );
  //   const tongTien = tongTienResponse.data.tongTien;
  //   console.log(bookingId);
  //   console.log(tongTien);

  //   axios
  //     .put("http://localhost:8080/updateBookingStatus", {
  //       bookingId,
  //       newStatus,
  //     })
  //     .then(() => {
  //       loadBookings(currentStatus);
  //     })
  //     .catch((err) => console.log("Lỗi cập nhật trạng thái:", err));
  //   //xử lý thông tin nếu thành công

  //   try {
  //     if (bookingId) {
  //       const response = await axios.post("http://localhost:8080/momo", {
  //         amount: tongTien,
  //       });
  //       //alert(response.status);
  //       if (response) {
  //         // alert(response.data.resultCode);
  //         window.location.href = response.data.payUrl;
  //         console.log(response);

  //         // alert(response);
  //         if (response.status === 200) {
  //         }
  //       }
  //     } else {
  //       alert("thanh toán");
  //     }
  //   } catch (error) {
  //     console.error("Error during the payment process:", error);
  //   }
  // };

  // const handlePayment = async (bookingId) => {
  //   try {
  //     console.log("Starting payment process for booking:", bookingId); // Debug log

  //     // Kiểm tra bookingId
  //     if (!bookingId) {
  //       throw new Error("Booking ID is required");
  //     }

  //     // Lấy tổng tiền
  //     const tongTienResponse = await axios.get(
  //       `http://localhost:8080/getTongTien/${bookingId}`
  //     );
  //     const tongTien = tongTienResponse.data.tongTien;

  //     console.log("Got total amount:", tongTien); // Debug log

  //     if (!tongTien || tongTien <= 0) {
  //       throw new Error("Invalid payment amount");
  //     }

  //     // Cấu hình thanh toán MoMo
  //     const paymentConfig = {
  //       partnerCode: "MOMO",
  //       accessKey: "F8BBA842ECF85",
  //       secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  //       orderId: `${bookingId}_${Date.now()}`,
  //       orderInfo: `Thanh toán đơn hàng #${bookingId}`,
  //       amount: tongTien,
  //       ipnUrl: "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b",
  //       redirectUrl:
  //         "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b",
  //       extraData: bookingId.toString(),
  //     };

  //     console.log("Payment config:", paymentConfig); // Debug log

  //     // Gọi API thanh toán
  //     const response = await axios.post(
  //       "http://localhost:8080/payment",
  //       paymentConfig
  //     );

  //     console.log("Payment response:", response.data); // Debug log

  //     if (!response.data.payUrl) {
  //       throw new Error("Payment URL not found in the response");
  //     }

  //     // Lưu bookingId vào localStorage
  //     localStorage.setItem("pendingBookingId", bookingId);

  //     // Chuyển hướng đến trang thanh toán MoMo
  //     window.location.href = response.data.payUrl;
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     alert(`Có lỗi xảy ra trong quá trình thanh toán: ${error.message}`);
  //   }
  // };

  // const handlePayment = async (bookingId, newStatus) => {
  //   const tongTienResponse = await axios.get(
  //     `http://localhost:8080/getTongTien/${bookingId}`
  //   );
  //   const tongTien = tongTienResponse.data.tongTien;

  //   try {
  //     if (bookingId) {
  //       const response = await axios.post("http://localhost:8080/momo", {
  //         amount: tongTien,
  //         extraData: bookingId, // Gửi bookingId đến backend để sử dụng trong callback
  //       });

  //       if (response && response.data.payUrl) {
  //         window.location.href = response.data.payUrl;
  //         console.log(response);
  //       } else {
  //         alert("Không thể khởi tạo thanh toán. Vui lòng thử lại.");
  //       }
  //     } else {
  //       alert("Không tìm thấy thông tin đặt lịch.");
  //     }
  //   } catch (error) {
  //     console.error("Error during the payment process:", error);
  //     alert("Có lỗi xảy ra trong quá trình thanh toán.");
  //   }
  // };

  const handlePayment = async (bookingId) => {
    try {
      const tongTienResponse = await axios.get(
        `http://localhost:8080/getTongTien/${bookingId}`
      );
      const tongTien = tongTienResponse.data.tongTien;

      const response = await axios.post("http://localhost:8080/momo", {
        amount: tongTien,
        bookingId: bookingId, // Thêm bookingId vào request
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
              onClick={() => handlePayment(booking.ID, "Đã hoàn thành")}
            >
              Thanh toán Momo
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-5 mt-3 font-monospace fw-bolder">
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
                <td>{booking.TongTien}</td>
                <td>{booking.TenTrangThai}</td>
                <td>{renderActionButtons(booking)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
