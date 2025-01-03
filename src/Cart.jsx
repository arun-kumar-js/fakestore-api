import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = location.state || {}; // Get initial cart items from props

  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    // Initialize cart list with quantity for each item
    const initializedCart = cartItems.map((item) => ({
      ...item,
      quantity: 1, // Default quantity
    }));
    setCartList(initializedCart);
  }, [cartItems]);

  // Handle remove item
  const handleRemove = (id) => {
    const newCartList = cartList.filter((item) => item.id !== id);
    setCartList(newCartList);
  };

  // Handle quantity change
  const updateQuantity = (id, change) => {
    const updatedCartList = cartList.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) } // Ensure quantity stays >= 1
        : item
    );
    setCartList(updatedCartList);
  };

  // Calculate total price
  const totalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div id="cartlist" className="bg-red-200 pt-20 pb-10">
      <h1 className="text-3xl font-bold text-center">Cart List</h1>
      {cartList.length > 0 ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">
              Total Price: Rs {totalPrice.toFixed(2)}
            </h2>
            <h2 className="text-2xl font-bold">
              Discount Price: Rs {(totalPrice * 0.9).toFixed(2)}{" "}
              {/* 10% discount */}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 px-8">
            {cartList.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg h-28"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div className="pl-4">
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <p className="text-gray-600">
                      Price: Rs {item.price * item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      🔼
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      🔽
                    </button>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">Your cart is empty.</p>
      )}
      <div className="text-center mt-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Cart;
