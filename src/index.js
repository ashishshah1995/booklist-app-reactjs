import React, { useState } from "react";
import ReactDom from "react-dom";
import "./index.css";

import { books } from "./books";
import Book from "./Book";

function BookList() {
  const fetchBookUrl = "https://api.itbook.store/1.0/new";
  const [booksData, setBooksData] = useState(books);

  // Removes all books
  const clearBooks = () => {
    setBooksData([]);
    setMoreBooks([]);
  };

  // Shows all Book
  const handleShowBook = () => {
    setBooksData(books);
    setShow(true);
  };

  // Removes Individual book
  const removeIndividualBook = (id) => {
    const updatedBookData = booksData.filter((book) => {
      return book.id !== id;
    });
    setBooksData(updatedBookData);
  };

  // Display more books
  const [morebook, setMoreBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await fetch(fetchBookUrl);
    const data = await response.json();
    setMoreBooks(data.books);
  };

  // Hide Show More button when Hide Books button is clicked
  const [show, setShow] = useState(true);
  const hideButton = () => {
    setShow(false);
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
            onClick={() => {
              clearBooks();
              hideButton();
            }}
          >
            Hide Books
          </button>
        </div>
      )}
      {show && (
        <button
          className="button button1"
          style={{ marginLeft: "190px", width: "115px", height: "50px" }}
          onClick={fetchBooks}
        >
          Show more
        </button>
      )}
      <div className="booklist">
        {morebook.map((book, index) => {
          const { title, subtitle, price, image } = book;
          return (
            <Book
              key={index}
              img={image}
              title={title}
              description={subtitle}
              price={price}
              removeIndividualBook={removeIndividualBook}
            ></Book>
          );
        })}
      </div>
    </section>
  );
}

ReactDom.render(<BookList />, document.getElementById("root"));
