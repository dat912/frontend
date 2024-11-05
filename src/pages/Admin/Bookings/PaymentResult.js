import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePaymentResult = async () => {
      const urlParams = new URLSearchParams(location.search);
      const resultCode = urlParams.get("resultCode");
      const bookingId = localStorage.getItem("pendingBookingId");

      if (resultCode === "0" && bookingId) {
        // Thanh toán thành công
        try {
          // Cập nhật trạng thái booking
          await axios.put("http://localhost:8080/updateBookingStatus", {
            bookingId,
            newStatus: "Đã hoàn thành",
          });

          // Xóa bookingId khỏi localStorage
          localStorage.removeItem("pendingBookingId");

          alert("Thanh toán thành công!");
          navigate("/booking"); // Chuyển về trang bookings
        } catch (error) {
          console.error("Error updating booking status:", error);
          alert("Thanh toán thành công nhưng có lỗi khi cập nhật trạng thái");
        }
      } else {
        alert("Thanh toán không thành công hoặc đã bị hủy");
        navigate("/booking");
      }
    };

    handlePaymentResult();
  }, [navigate, location]);

  return (
    <div className="text-center mt-5">
      <h2>Đang xử lý kết quả thanh toán...</h2>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default PaymentResult;
