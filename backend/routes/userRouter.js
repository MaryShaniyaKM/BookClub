const express=require("express");
const { getAllUser, login, signup }= require("../controllers/userController");
const userrouter=express.Router();
userrouter.get('/',getAllUser);
userrouter.post('/signup',signup)
userrouter.post("/login",login)
module.exports=userrouter;