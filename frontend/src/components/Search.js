import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Search() {
  const [search, setSearch] = useState("");
  const [display, setdisplay] = useState([]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  console.log("search", search);
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    const result = await axios
      .post("http://localhost:2000/api/book/search", { key: search })
    try {
      console.log('testing');
      console.log(result.data.data);
      console.log('testing 3',display.length);

      setdisplay(result.data.data);
      
    }
    catch (error) {
      console.log(error);
    };
  };
  
  return (
    <div>
      <form onSubmit={onSubmitHandle}>
        <input
          style={{ marginLeft: "400px", width: "280px", height: "20px", marginTop: "30px", borderRadius: "8px" }}
          name="search"

          value={search}
          onChange={handleChangeSearch}
          placeholder="search here"
        />
        <button style={{ borderRadius: '6px' }}>search</button>
      </form>
      {display.length!=0?<>
      {display.map((result) => 
         ( 
          <div className="card" style={{ maxWidth: "300px", marginTop: "30px" }}>
            <img src={result.image} alt={result.name} />
            <h3>{result.name}</h3>
            <article>By {result.author}</article>
            <h3>Rs {result.price}</h3>
          </div> ))}</>:(<center><h2>sorry,no results found...</h2></center>)}
       
    </div>
  );
};

export default Search;