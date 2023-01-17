import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Book.css"
import axios from 'axios';

function Book(props) {
 const navigate= useNavigate();
  console.log("path",window.location.pathname)
  const path=window.location.pathname
  console.log(props);
  const {_id,isUser,name,author,description,price,image}=props.book;
  const history = useNavigate();
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:2000/api/book/${_id}`)
      .then((res) => console.log(res))
      .then(() => history("/"))
      .then(() => history("/books"));
  };
  return (
    <>     
                         
     <div className="card" >
      <Button sx={{marginLeft:20}}
      onClick={()=>navigate(`/books/${_id}`)}>view</Button>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <article>By {author}</article>
      {/* <p>{description}</p> */}
      <h5>Rs {price}</h5>

   { path==='/myBooks'?
      <>
      <Button LinkComponent={Link} to={`/myBooks/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
      </>
      :
      null
  
}
  </div>  
  </>
  )
}

export default Book;