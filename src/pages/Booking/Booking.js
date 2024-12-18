import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Booking.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import numeral from "numeral";

const cx = classNames.bind(style);

export default function Booking() {
  const navigate = useNavigate();
  const [selectedGio, setSelectedGio] = useState(null);
  const [listChiNhanh, setListChiNhanh] = useState([]);
  const [listNhanVien, setListNhanVien] = useState([]);
  const [listDichVu, setListDichVu] = useState([]);
  const [gioDaDat, setGioDaDat] = useState([]);
  const [tongtien, setTongTien] = useState(0);
  const [selectedChiNhanh, setSelectedChiNhanh] = useState("");

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

  useEffect(() => {
    if (values.ngay && values.idchinhanh && values.idnhanvien) {
      axios
        .post("http://localhost:8080/kiemtragio", {
          idchinhanh: values.idchinhanh,
          ngay: values.ngay,
          idnhanvien: values.idnhanvien,
        })
        .then((response) => {
          console.log(response.data.gioDaDat);
          setGioDaDat(response.data.gioDaDat);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy giờ đã đặt:", error);
        });
    }
  }, [values.ngay, values.idchinhanh, values.idnhanvien]);

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
  ///
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("id")) {
      alert("Vui lòng đăng nhập trước khi đặt lịch");
      navigate("/dang-nhap");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/datlich",
          values
        );
        alert("Đặt lịch thành công");
        console.log(response.data);
        navigate("/dat-lich");
        window.location.reload();
      } catch (error) {
        console.error(
          "Lỗi khi đặt lịch:",
          error.response ? error.response.data : error.message
        );
        alert("Đặt lịch thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h1>ĐẶT LỊCH CẮT TÓC</h1>
      <form onSubmit={handleSubmit}>
        {localStorage.getItem("id") && (
          <>
            <div className={cx("form-input")}>
              <label htmlFor="ten">Tên</label>
              <input
                type="text"
                name="ten"
                value={localStorage.getItem("ten")}
                readOnly
                required
              />
            </div>

            <div className={cx("form-input")}>
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={localStorage.getItem("phone")}
                readOnly
                required
              />
            </div>
          </>
        )}

        <div className={cx("form-input")}>
          <label htmlFor="idchinhanh">Chọn chi nhánh</label>
          <select
            name="idchinhanh"
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

        <div className={cx("form-input")}>
          <label htmlFor="idnhanvien">Chọn nhân viên</label>
          <select
            name="idnhanvien"
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

        <div className={cx("form-input")}>
          <label htmlFor="iddichvu">Chọn dịch vụ</label>
          <select name="iddichvu" onChange={handleInputChange} required>
            <option value="">Chọn dịch vụ</option>
            {listDichVu.map((dichvu) => (
              <option key={dichvu.id} value={dichvu.id}>
                {dichvu.tendichvu}
              </option>
            ))}
          </select>
        </div>

        <div className={cx("form-input")}>
          <label>Tổng tiền</label>
          <input
            type="text"
            value={`${numeral(tongtien).format("0,0").replace(/,/g, ".")} VNĐ`}
            readOnly
          />
        </div>

        <div className={cx("form-input")}>
          <label htmlFor="ngay">Chọn ngày</label>
          <input
            type="date"
            name="ngay"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="container mt-3">
          <label className="fw-bold text-dark">Chọn giờ</label>
          <div
            className="btn-group btn-group-toggle d-flex flex-wrap"
            data-toggle="buttons"
          >
            {gios.map((gio) => (
              <label
                key={gio}
                className={`btn btn-outline-dark m-1 col-3 mb-2 ${
                  selectedGio === gio ? "active" : ""
                } ${gioDaDat.includes(gio) ? "disabled" : ""}`}
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
                  className="d-none"
                  disabled={gioDaDat.includes(gio)}
                  required
                />
                {gio}
              </label>
            ))}
          </div>
        </div>

        <div className={cx("list-address")}>
          <button type="submit" className={cx("booking")}>
            ĐẶT LỊCH
          </button>
        </div>
      </form>
    </div>
  );
}
