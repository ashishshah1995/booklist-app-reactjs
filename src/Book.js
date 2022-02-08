import React, { useState, useEffect } from "react";
import Quantity from "./Quantity";
import "./index.css";

const Book = ({
  img,
  title,
  author,
  description,
  id,
  removeIndividualBook,
}) => {
  // Read More/ Read Less Description
  const [readMore, setReadMore] = useState(false);
  const readMoreDescription = () => {
    setReadMore(!readMore);
  };

  //useEffect hook
  useEffect(() => {
    document.title = "Booklist Website";
  }, []);

  // Hide Description button when clicked
  const [displaydescription, setDisplayDescription] = useState(false);
  const clickHandler = () => {
    setDisplayDescription(true);
  };

  // Description Component
  const Desciption = () => {
    return (
      <button
        type="button"
        className="button button1"
        onClick={() => {
          clickHandler();
        }}
      >
        {"Desciption"}
      </button>
    );
  };

  return (
    <article
      className="book"
      onMouseOver={() => {
        console.log(title);
      }}
    >
      <img className="bookImage" src={img} alt="" />
      <h1>{title}</h1>
      <h4>{author || "Jane Doe"}</h4>
      {!displaydescription && <Desciption />}

      <div>
        <p>
          {displaydescription && !readMore
            ? `${description.substring(0, 200)}....`
            : ""}
        </p>
        <p>{displaydescription && readMore ? description : ""}</p>
        <button
          onClick={() => {
            readMoreDescription();
          }}
        >
          {!displaydescription ? "" : readMore ? "show less" : "read more"}
        </button>
      </div>

      <Quantity id={id} removeIndividualBook={removeIndividualBook} />
    </article>
  );
};

export default Book;
