const User=require("../models/User");
const bcrypt=require("bcryptjs");
 const getAllUser = async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
  };

  const signup=async(req,res,next)=>{
    const {firstname,secondname,email,password}=req.body;
    let existinguser;
    try{
 existinguser=await User.findOne({email})
    }
    catch(err){
        console.log(err)
    }
    if(existinguser){
        return res.status(400).json({message:"user already exists"})
    }
    const hashedPassword=bcrypt.hashSync(password)
    const user=new User({
        firstname,
        secondname,
        email,
        password:hashedPassword,
        books:[]
    });
   
    try{
   await user.save()
    }
    catch(err){
        console.log(err)
    }
    return res.json({user})
  }

 const login=async (req,res,next)=>{
const{email,password}=req.body;
let existinguser;
    try{
 existinguser=await User.findOne({email})
    }
    catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(404).json({message:"couldn't find user"})
    }
    const isPassword=bcrypt.compareSync(password,existinguser.password)
    if(!isPassword){
        return res.status(400).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"successfully loggedin",user:existinguser})
  }
  module.exports={getAllUser,signup,login}