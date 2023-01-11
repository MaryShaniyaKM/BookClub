const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const bookrouter=require("../backend/routes/bookRouter");
const userrouter = require("./routes/userRouter");
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/book",bookrouter);
app.use("/api/user",userrouter);
mongoose.connect(process.env.URI)
.then(()=>console.log("mongo db connected"))
.then(()=>app.listen(2000))
.then(()=>console.log('server is running'))
.catch((err)=>console.log(err))
