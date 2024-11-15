import React, { useState } from "react";

const UserInfoPage = () => {
  const [users, setUsers] = useState([
    { name: "John Doe", phone: "123-456-7890", email: "john.doe@example.com" },
    { name: "Jane Doe", phone: "987-654-3210", email: "jane.doe@example.com" },
    {
      name: "Bob Smith",
      phone: "555-555-5555",
      email: "bob.smith@example.com",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ]);
  const [order, setOrder] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    items: [],
    status: "Pending",
  });

  const handleCreateOrder = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Kiểm tra và tăng quantity nếu sản phẩm đã tồn tại
  const handleAddToOrder = (product) => {
    setOrder((prevOrder) => {
      const existingItemIndex = prevOrder.items.findIndex(
        (item) => item.id === product.id
      );

      // Nếu sản phẩm đã tồn tại, chỉ cập nhật số lượng mà không thêm lại vào danh sách
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevOrder.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return { ...prevOrder, items: updatedItems };
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào danh sách với quantity là 1
        return {
          ...prevOrder,
          items: [
            ...prevOrder.items,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          ],
        };
      }
    });
  };

  // Xóa sản phẩm khỏi danh sách Order
  const handleRemoveFromOrder = (productId) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: prevOrder.items.filter((item) => item.id !== productId),
    }));
  };

  const handleSubmitOrder = () => {
    console.log("Order submitted:", order);
    setOrder({
      name: "",
      phone: "",
      email: "",
      address: "",
      items: [],
      status: "Paid",
    });
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: [], // Reset items khi đóng modal
    }));
  };

  return (
    <div className="container my-5">
      <h1>User Information</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleCreateOrder(user)}
                >
                  Tạo hóa đơn
                </button>{" "}
                <button className="btn btn-success">Tạo lịch cắt</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-monospace fw-bolder">
                  Create Order for {selectedUser.name}
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
                      value={selectedUser.name}
                      onChange={(e) =>
                        setOrder({ ...order, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={selectedUser.phone}
                      onChange={(e) =>
                        setOrder({ ...order, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setOrder({ ...order, email: e.target.value })
                      }
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
                      {products.map((product, index) => (
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
                      ))}
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
                      {order.items.map((item, index) => (
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
                      ))}
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
                  onClick={handleSubmitOrder}
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

export default UserInfoPage;
