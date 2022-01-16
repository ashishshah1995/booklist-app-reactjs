import React from "react";

const Book = ({ img, title, author, description }) => {
  const clickHandler = () => {
    alert(description);
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
      <button type="button" onClick={clickHandler}>
        Description
      </button>
    </article>
  );
};

export default Book;
