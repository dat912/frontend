import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import { Link, useLocation, useNavigate } from "react-router-dom";
import numeral from "numeral";
const HoaDon = () => {
  const [hoadon, setHoadon] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("Đang xử lý");
  // const [hoaDonModal, setHoaDonModal] = useState(false); // Trạng thái modal hóa đơn

  const location = useLocation();
  const navigate = useNavigate();

  const groupedHoaDon = hoadon.reduce((acc, item) => {
    if (!acc[item.madonhang]) {
      acc[item.madonhang] = {
        ...item,
        products: [],
      };
    }
    acc[item.madonhang].products.push({
      tensanpham: item.tensanpham,
      soluong: item.soluong,
      gia: item.gia,
      tongtien: item.tongtien,
    });
    return acc;
  }, {});

  const hoadonList = Object.values(groupedHoaDon);

  useEffect(() => {
    loadHoaDon(currentStatus);
  }, [currentStatus]);

  const loadHoaDon = (status) => {
    axios
      .get(`http://localhost:8080/getHoaDonByStatus/${status}`)
      .then((result) => {
        if (result.data) {
          setHoadon(result.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleStatusUpdate = (hoadonId, newStatus) => {
    console.log("Cập nhật trạng thái:", hoadonId, newStatus);
    if (window.confirm("Bạn có đồng ý thực hiện không?")) {
      axios
        .put("http://localhost:8080/updateHoaDonStatus", {
          hoadonId,
          newStatus,
        })
        .then((response) => {
          console.log("Phản hồi từ server:", response.data);
          loadHoaDon(currentStatus);
        })
        .catch((err) => console.log(err));
    }
  };

  // const handlePayment = async (bookingId) => {
  //   try {
  //     const tongTienResponse = await axios.get(
  //       `http://localhost:8080/getTongTien/${bookingId}`
  //     );
  //     const tongTien = tongTienResponse.data.tongTien;

  //     const response = await axios.post("http://localhost:8080/momo", {
  //       amount: tongTien,
  //       bookingId: bookingId,
  //     });

  //     if (response.data.payUrl) {
  //       window.location.href = response.data.payUrl;
  //     } else {
  //       alert("Không thể khởi tạo thanh toán");
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     alert("Có lỗi xảy ra khi thanh toán");
  //   }
  // };

  // const handleShowInvoice = async (bookingId) => {
  //   try {
  //     // Gọi API để lấy thông tin hóa đơn
  //     const response = await axios.get(
  //       `http://localhost:8080/getHoaDonBooking/${bookingId}`
  //     );
  //     console.log(response.data);
  //     setHoaDon(response.data); // Lưu thông tin hóa đơn vào state
  //     setHoaDonModal(true); // Hiện modal
  //   } catch (error) {
  //     console.error("Error fetching invoice details:", error);
  //     alert("Không thể lấy thông tin hóa đơn");
  //   }
  // };

  const renderActionButtons = (hoadon) => {
    console.log(hoadon);
    switch (currentStatus) {
      case "Đang xử lý":
        return (
          <>
            <button
              className="btn btn-success btn-sm me-2 mb-1"
              onClick={() => handleStatusUpdate(hoadon.madonhang, "Hoàn thành")}
            >
              Xác nhận
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleStatusUpdate(hoadon.madonhang, "Đã hủy")}
            >
              Hủy
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
        <h3>Thông tin hóa đơn</h3>
      </div>
      <div className="mb-3">
        <button
          className={`btn ${
            currentStatus === "Đang xử lý" ? "btn-primary" : "btn-success"
          } m-1`}
          onClick={() => setCurrentStatus("Đang xử lý")}
        >
          Đang xử lý
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
            currentStatus === "Hoàn thành" ? "btn-primary" : "btn-success"
          } m-1`}
          onClick={() => setCurrentStatus("Hoàn thành")}
        >
          Hoàn thành
        </button>
      </div>

      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Mã hóa đơn</th>
              <th>Thông tin sản phẩm</th>
              <th>Tên khách hàng</th>
              <th>Địa chỉ</th>
              <th>Ngày lập hóa đơn</th>
              <th>Tổng tiền của hóa đơn</th>
              <th>Trạng thái</th>
              <th>Phương thức thanh toán</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hoadonList.map((hoadon, index) => (
              <tr key={index}>
                <td>{hoadon.madonhang}</td>
                <td>
                  {hoadon.products.map((product, i) => (
                    <div key={i}>
                      <strong>Tên sản phẩm:</strong> {product.tensanpham} <br />
                      <strong>Số lượng:</strong> {product.soluong} <br />
                      <strong>Giá:</strong>{" "}
                      {numeral(product.gia).format("0,0").replace(/,/g, ".")}{" "}
                      VNĐ <br />
                      <strong>Tổng tiền sản phẩm:</strong>{" "}
                      {numeral(product.tongtien)
                        .format("0,0")
                        .replace(/,/g, ".")}{" "}
                      VNĐ
                      <br />
                      {i < hoadon.products.length - 1 && <hr />}{" "}
                    </div>
                  ))}
                </td>
                <td>{hoadon.tenuser}</td>
                <td>{hoadon.diachi}</td>
                <td>
                  {new Date(hoadon.created_at).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>
                  {numeral(hoadon.tongtienhoadon)
                    .format("0,0")
                    .replace(/,/g, ".")}{" "}
                  VNĐ
                </td>
                <td>{hoadon.tentrangthai}</td>
                <td>{hoadon.tenphuongthuc}</td>
                <td>{renderActionButtons(hoadon)}</td> {/* Action buttons */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị hóa đơn */}
      {/* <Modal show={hoaDonModal} onHide={() => setHoaDonModal(false)}>
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
                    <strong>Tổng tiền:</strong> {e.TongTien}đ
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
      </Modal> */}
    </div>
  );
};

export default HoaDon;
