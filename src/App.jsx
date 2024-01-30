import { getData } from "./constants/db";
import { Card } from "./components/card/card";
import "./App.css";
import Cart from "./components/cart/cart";
import { useEffect, useState } from "react";

const courses = getData();

const telegram = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => telegram.ready(), []);

  const onAddItem = (item) => {
    const existItem = cartItems.find((e) => e.id == item.id);
    if (existItem) {
      const data = cartItems.map((e) => (e.id == item.id ? { ...existItem, quantity: existItem.quantity + 1 } : e));
      setCartItems(data);
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItems.find((e) => e.id == item.id);
    if (existItem.quantity == 1) {
      const newData = cartItems.filter((e) => e.id !== existItem.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((e) => (e.id == existItem.id ? { ...existItem, quantity: existItem.quantity - 1 } : e));
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
  };

  return (
    <>
      <h1>Sammi Courses</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="card__container">
        {courses.map((course) => (
          <Card key={course.id} course={course} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
        ))}
      </div>
    </>
  );
}

export default App;
