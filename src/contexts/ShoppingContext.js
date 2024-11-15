import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo context
const ShoppingContext = createContext();

// Tạo hook để sử dụng context
export const useShoppingContext = () => {
  return useContext(ShoppingContext);
};

// Tạo ShoppingContextProvider để bao bọc các component
export const ShoppingContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const jsonCartData = localStorage.getItem("shopping_cart");
    return jsonCartData ? JSON.parse(jsonCartData) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Hàm để thêm sản phẩm vào giỏ hàng
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prevItems, { ...item, qty: 1 }];
    });
  };

  // Hàm để xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Hàm để tăng số lượng sản phẩm trong giỏ hàng
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Hàm để giảm số lượng sản phẩm trong giỏ hàng
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };
  const clearCart = () => {
    console.log("clearCart => ");
    setCartItems([]);
  };

  const total = cartItems.reduce((total, item) => {
    return total + item.qty * item.gia;
  }, 0);

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};