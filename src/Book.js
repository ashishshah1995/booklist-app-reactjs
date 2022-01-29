import React, { useState } from "react";
import "./index.css";

const Book = ({
  img,
  title,
  author,
  description,
  id,
  removeIndividualBook,
}) => {
  const clickHandler = () => {
    alert(description);
  };

  // Displays Price
  const [price, setPrice] = useState(0);
  const viewPrice = () => {
    if (price === 0) {
      setPrice(Math.floor(Math.random() * 100));
    } else {
      setPrice(0);
    }
  };

  // Incease Quantity
  const [quantity, setQuantity] = useState(0);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease Quantity
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Reset Quantity
  const resetQuantity = () => {
    setQuantity(0);
  };

  return (
    <article
      className="book"
      onMouseOver={() => {
        console.log(title);
      }}
    >
      <img src={img} alt="" />
      <h1 onClick={() => console.log(description)}>{title}</h1>
      <h4>{author}</h4>
      <button type="button" className="button button1" onClick={clickHandler}>
        Description
      </button>
      <div className="price">
        <button type="button" className="button button1" onClick={viewPrice}>
          {price === 0 ? "View Price" : "Hide Price"}
        </button>
        <h4>{price > 0 ? <h2 className="priceValue">= ${price}</h2> : null}</h4>
      </div>
      <button
        className="button"
        style={{ height: "20px", width: "131" }}
        onClick={() => removeIndividualBook(id)}
      >
        Remove book
      </button>
      <div className="quantity">
        <h3>Quantity</h3>
        <button className="button button1" onClick={increaseQuantity}>
          {"+"}
        </button>
        <button
          className="button button1"
          id="decreaseQuantity"
          onClick={decreaseQuantity}
        >
          {"--"}
        </button>
        <button
          className="button button1"
          style={{ width: "70px", height: "50px" }}
          onClick={resetQuantity}
        >
          Reset
        </button>
        <h3 className="quanityValue">{quantity}</h3>
      </div>
    </article>
  );
};

export default Book;
