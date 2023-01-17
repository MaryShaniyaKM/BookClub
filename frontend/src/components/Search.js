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
  const [flag, setFlag] = useState(false);


  const [display, setdisplay] = useState([]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  console.log("search", search);
  
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    setFlag(true)
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
          style={{ marginLeft: "400px", width: "280px", height: "30px", marginTop: "30px", borderRadius: "10px" }}
          name="search"

          value={search}
          onChange={handleChangeSearch}
          placeholder="search here"
        />
        <button  style={{ borderRadius: '10px' }}>search</button>
      </form>
      {display.length!=0 && search.length!=0?<>
      {display.map((result) => 
         ( 
          <div className="card" style={{ maxWidth: "300px", marginTop: "30px" }}>
            <img src={result.image} alt={result.name} />
            <h3>{result.name}</h3>
            <article>By {result.author}</article>
            <h3>Rs {result.price}</h3>
          </div> ))}</>:flag&&search?(<center><h2>Try searching for another books,author,price or title</h2></center>):''}
        
    </div>
  )
};

export default Search;