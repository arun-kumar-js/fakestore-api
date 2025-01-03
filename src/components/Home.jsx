import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]); // API data
  const [clicked, setClicked] = useState([]); // For cart click tracking
  const [count, setCount] = useState(0); // Cart item count
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // Start loading
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Stop loading even if there is an error
      });
  }, []);

  const handleClick = (cart) => {
    const newId = parseInt(cart.target.id);
    if (!clicked.includes(newId)) {
      setClicked([...clicked, newId]);
      setCount(count + 1);
    }
  };

  const cartItems = data.filter((item) => clicked.includes(item.id));

  const goToCart = () => {
    navigate("/cart", { state: { cartItems } }); // Passing only the cart items
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        <div>
          {/* Floating Go to Cart Button */}
          <div className="fixed top-5 right-5">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
              onClick={goToCart}
            >
              Cart ({count})
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 gap-10 pt-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="border-y-1 bg-slate-50 rounded-xl text-center items-center border-lime-950 ml-8 mr-8 shadow-custom pl-1 pr-1"
              >
                <h1 className="pt-10 pb-5">{item.title}</h1>
                <div className="flex pb-10">
                  <img className="w-48 h-52 mx-auto" src={item.image} alt="" />
                </div>
                <div className="flex justify-evenly items-center pb-4">
                  <h3>Rs:{item.price}</h3>
                  <button
                    className="border rounded-lg px-5 bg-lime-200"
                    id={item.id}
                    onClick={handleClick}
                  >
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
