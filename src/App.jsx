import { useState, useEffect } from "react";
import { End } from "./components/End";

function App() {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [count, setCount] = useState(0);

  // Fetch product data
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  // Handle product click
  const handleClick = (cart) => {
    const newId = parseInt(cart.target.id); // Parse ID as a number

    if (clicked.includes(newId)) {
      alert("Item already in the cart!");
    } else {
      setClicked((prevClicked) => [...prevClicked, newId]);
      setCount((prevCount) => prevCount + 1);
    }
  };

  // Show cart alert
  const carthandle = () => {
    if (count === 0) {
      alert("Your cart is empty");
    } else {
      alert(`Your cart items are ${count}`);
    }
  };

  // Filter clicked items
  const cartItems = data.filter((item) => clicked.includes(item.id));

  
    
  return (
    <>
      <nav className="fixed w-full">
        <div className="flex justify-between bg-lime-200 p-5">
          <h1 className="text-3xl font-bold">AK Store</h1>
          <div className="flex justify-evenly gap-20 items-center">
            <h2 className="hover:underline hover:text-fuchsia-600">Home</h2>
            <h2 className="hover:underline hover:text-fuchsia-600">About</h2>
            <h2 className="hover:underline hover:text-fuchsia-600">Contact</h2>
            <a href="#cartlist">Cart</a>
            <button onClick={carthandle}>
              <h1 className="text-3xl hover:underline hover:text-fuchsia-600">
                {count}🛒
              </h1>
            </button>
          </div>
        </div>
      </nav>

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
                onClick={handleClick}
                className="border rounded-lg px-5 bg-lime-200"
                id={item.id}
              >
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <div id="cartlist" className="bg-red-200 pt-20 pb-10  ">
        <h1 className="text-3xl font-bold text-center">Cart List</h1>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 pl-5"
            >
              <div className="flex items-center  ">
                <img src={item.image} alt="Product" className="w-16 h-16" />
                <div className="flex  gap-20 pl-10  ">
                  <h2 className="font-bold items-center">{item.title}</h2>
                  <p>Price: Rs {item.price}</p>
                </div>
              </div>
              <button
                className="bg-lime-500 border  p-4 rounded-lg"
                onClick={() => {
                  setClicked((prevClicked) =>
                    prevClicked.filter((id) => id !== item.id)
                  );
                  setCount((prevCount) => Math.max(prevCount - 1, 0));
                }}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </div>
      <End/>
    </>
  );
}

export default App;
