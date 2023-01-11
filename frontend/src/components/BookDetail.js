import { Button, FormLabel, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetail = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:2000/api/book/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBook(data.book);
      setInputs({
        name: data.book.name,
        author:data.book.author,
        description: data.book.description,
        price:data.book.price,
        image:data.book.image
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:2000/api/book/${id}`, {
        name: inputs.name,
        author:inputs.author,
        description: inputs.description,
        price:inputs.price,
        image:inputs.image
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(book);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBooks/"));
  };

  return (
    <div>
      {inputs && (
      <form onSubmit={handleSubmit}>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      maxWidth={480}
      alignContent={"center"}
      alignSelf="center"
      marginLeft={"auto"}
      marginRight="auto"
      marginTop={10}
    >
      <FormLabel>Name</FormLabel>
      <TextField
        value={inputs.name}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        name="name"
      />
      <FormLabel>Author</FormLabel>
      <TextField
        value={inputs.author}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        name="author"
      />
      <FormLabel>Description</FormLabel>
      <TextField
        value={inputs.description}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        name="description"
      />
      <FormLabel>Price</FormLabel>
      <TextField
        value={inputs.price}
        onChange={handleChange}
        type="number"
        margin="normal"
        fullWidth
        variant="outlined"
        name="price"
      />
      <FormLabel>Image</FormLabel>
      <TextField
        value={inputs.image}
        onChange={handleChange}
        margin="normal"
        fullWidth
        variant="outlined"
        name="image"
      />
      <Button variant="contained" type="submit">
        Add Book
      </Button>
    </Box>
  </form>
      )}
    </div>
    
  );
};

export default BookDetail;