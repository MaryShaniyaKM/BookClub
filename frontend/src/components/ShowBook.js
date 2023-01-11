import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Book from './Book';

function ShowBook( ) {
  const {id}=useParams();
  console.log(id);
  const [books, setBooks] = useState([]);
  
 
  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`http://localhost:2000/api/book/${id}`)
      console.log("data",res.data.books);
      setBooks(res.data.books)
      
    }
    sendRequest()

    
  }, [id]);
  console.log("books",books);
  return (
   
           <div className="card" style={{maxWidth:"450px",marginTop:"30px"}}>
            <img src={books.image} alt={books.name} style={{width:"200px",height:"250px"}}/>
            <h3>{books.name}</h3>
            <article>By {books.author}</article>
            <p>{books.description}</p>
            <h3>Rs {books.price}</h3>
          </div>
        
  )
}

export default ShowBook