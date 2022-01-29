import React, { useState } from "react";
import ReactDom from "react-dom";
import "./index.css";

import { books } from "./books";
import Book from "./Book";

function BookList() {
  const [booksData, setBooksData] = useState(books);

  // Removes all books
  const clearBooks = () => {
    setBooksData([]);
  };

  // Shows all Book
  const handleShowBook = () => {
    setBooksData(books);
  };

  // Removes Individual book
  const removeIndividualBook = (id) => {
    const updatedBookData = booksData.filter((book) => {
      return book.id !== id;
    });
    setBooksData(updatedBookData);
  };

  return (
    <section className="wrapper">
      <h1 className="booktitle">Booklist</h1>

      <div className="booklist">
        {booksData.map((book, index) => {
          return (
            <Book
              key={index}
              {...book}
              removeIndividualBook={removeIndividualBook}
            ></Book>
          );
        })}
      </div>
      {booksData.length === 0 ? (
        <div>
          <h1 style={{ marginTop: "-68px", marginLeft: "388px" }}>
            No books left!
          </h1>
          <button
            style={{
              width: "122px",
              height: "49px",
              marginLeft: "391px",
              marginTop: "20px",
            }}
            className="button button1"
            onClick={handleShowBook}
          >
            Show Books
          </button>
        </div>
      ) : (
        <div>
          <button
            style={{ marginLeft: "190px" }}
            className="button button1"
            onClick={clearBooks}
          >
            Hide Books
          </button>
        </div>
      )}
    </section>
  );
}

ReactDom.render(<BookList />, document.getElementById("root"));
