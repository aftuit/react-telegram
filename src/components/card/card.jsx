import "./card.css";
import Button from "../button/button";
import { useState } from "react";
export const Card = (props) => {
  const [count, setCount] = useState(0);
  const { course, onAddItem, onRemoveItem } = props;

  const handlerIncrement = () => {
    setCount((prev) => prev + 1);
    onAddItem(course);
  };

  const handlerDecrement = () => {
    setCount((prev) => prev - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      <span className={`card__badge ${count !== 0 ? "card__badge" : "card__badge-hidden"}`}>{count}</span>

      <div className="image__container">
        <img src={course.Image} alt={course.title} width={"100%"} height={"230px"} />
      </div>

      <div className="card__body">
        <h2 className="card__title">{course.title}</h2>
        <div className="card__price">
          {course.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>

      <div className="hr"></div>

      <div className="btn__container">
        <Button title="+" type="add" onClick={handlerIncrement}>
          +
        </Button>
        {count !== 0 ? (
          <Button title="-" type="remove" onClick={handlerDecrement}>
            -
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
