const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
firstname:{
    type:String,
    required:true
},
secondname:{
    type:String,
    required:true
},

    email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    minlength:5
},
books:
[{type:mongoose.Types.ObjectId,ref:"Book",required:true}]

})
module.exports=mongoose.model("User",userSchema);
