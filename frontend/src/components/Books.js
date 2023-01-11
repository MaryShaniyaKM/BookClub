import React, { useEffect, useState } from 'react'
import axios from "axios";
import Book from './Book';

const Books = () => {
  const [books, setBooks] = useState();
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:2000/api/book")
    .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then((data) => setBooks(data.books));
  }, []);
  console.log("books",books);
  return (
    <div>
     <ul>
      
        {books &&
          books.map((book, index) => (
           <li>
              <Book 
              book={book}
              id={book._id}
              // isUser={localStorage.getItem("userId") === book.user.id}
              // name={book.name}
              // description={book.description}
              // image={book.image}
             
              />
            </li>
          ))}
      </ul>
             </div>
  );
};

export default Books