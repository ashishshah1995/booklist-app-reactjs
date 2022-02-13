import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import "./index.css";

import { books } from "./books";
import Book from "./Book";

function BookList() {
  const fetchBookUrl = "https://api.itbook.store/1.0/new";
  const [booksData, setBooksData] = useState(books);

  // Unique value (Categories)- Set data structure
  // Set returns object, desctructure to get array
  const allCategories = ["all", ...new Set(books.map((item) => item.category))];

  //Filter Books based on Category type
  const [categories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === "all") {
      setBooksData(books);
      return;
    }
    const newItems = books.filter((item) => category === item.category);
    setBooksData(newItems);
  };

  // Removes all books
  const clearBooks = () => {
    setBooksData([]);
    setDisplayBook([]);
  };

  // Shows all Book
  const handleShowBook = () => {
    setBooksData(books);
    setShow(true);
  };

  // Remove Individual book
  const removeIndividualBook = (id) => {
    const updatedBookData = booksData.filter((book) => {
      return book.id !== id;
    });
    setBooksData(updatedBookData);
  };

  // Display more books
  const [displaybook, setDisplayBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(fetchBookUrl);
      const data = await response.json();
      setDisplayBook(data.books);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (displaybook && displaybook.length !== 0) {
      setIsLoading(false);
    }
  }, [displaybook]);

  // Hide Show More button when Hide Books button is clicked
  const [show, setShow] = useState(true);
  const hideButton = () => {
    setShow(false);
  };

  return (
    <section className="wrapper">
      <h1 className="booktitle">Booklist</h1>
      <div className="underline"></div>

      {/* Display books based on Category Type */}
      <div className="btn-container">
        {categories.map((item, index) => {
          return (
            <button
              className="filter-btn"
              type="button"
              key={index}
              onClick={() => {
                filterItems(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
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
      {/* Alternate - displaybook.length === 0 , > 0 condition */}
      {isLoading && (
        <h1 style={{ marginLeft: "160px", padding: "30px" }}>Loading...</h1>
      )}
      {!isLoading && (
        <div className="booklist">
          {displaybook.map((book, index) => {
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
      )}
    </section>
  );
}

ReactDom.render(<BookList />, document.getElementById("root"));
