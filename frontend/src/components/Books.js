import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import Carousel from "react-bootstrap/Carousel";
const Books = () => {
  const [books, setBooks] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:2000/api/book")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBooks(data.books));
  }, []);
  console.log("books", books);
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            width={"100%"}
            height={500}
            src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/81_inr.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={800}>
          <img
            width={"100%"}
            height={500}
            src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/84_inr.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            width={"100%"}
            height={500}
            src="https://d2g9wbak88g7ch.cloudfront.net/bannerimages/82_inr.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <ul>
        {books &&
          books.map((book, index) => (
            <li>
              <Book book={book} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;
