const express=require("express");
const { addBook,getAllBooks, getById, updateById, deleteById, getByUserId, searchBook }=require( "../controllers/bookController");
const bookrouter=express.Router();
bookrouter.get("/",getAllBooks);
bookrouter.post("/add",addBook);
bookrouter.post("/search",searchBook);
bookrouter.get("/:id",getById);
bookrouter.put("/:id",updateById);
bookrouter.delete("/:id",deleteById);
bookrouter.get("/user/:id",getByUserId);


module.exports=bookrouter;