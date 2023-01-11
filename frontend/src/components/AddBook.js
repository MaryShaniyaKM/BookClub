import { Box, Button, FormLabel, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddBook = () => {

  const navigate = useNavigate();
  const id=useParams()
  const [inputs, setInputs] = useState({
    name:"",
    author:"",
    description:"",
    price:"",
    image:""
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:2000/api/book/add", {
        name: inputs.name,
        author:inputs.author,
        description: inputs.description,
        price:inputs.price,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/books"));
  };
  return (
    <form onSubmit={handleSubmit}>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      maxWidth={450}
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
  );
};
export default AddBook;