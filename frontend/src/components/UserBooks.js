import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import "./Book.css"
const UserBooks = () => {
  const [books, setBooks] = useState()
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:2000/api/book/user/${id}`)
      .catch((err) => console.log(err));
    console.log( res.data.books.books);
    const data = res.data.books.books;
    return data;
  };
  useEffect(() => {

    sendRequest()
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);
  // console.log("boks",books);
  return (
    <div>
      <ul>
        {books && books.map((book, index) => {
          return (
            <li>
              <Book
               book={book}
              />
            </li>
          )
        }  
        )}
        
      </ul>
    </div>
  );
};

export default UserBooks;