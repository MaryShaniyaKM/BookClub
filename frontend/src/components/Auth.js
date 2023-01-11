import { TextField,Box, Button, Typography } from '@mui/material'
import React ,{useState} from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isSignup, setisSignup] = useState(false);
  const [inputs, setinputs] = useState({
    firstname:"",
    secondname:"",
    email:"",
    password:""
} );

const handleChange=(e)=>{
  setinputs((prevState)=>({
...prevState,
[e.target.name]:e.target.value
  })
  )}
  const sendRequest=async(type="login")=>{
   const res=await axios.post(`http://localhost:2000/api/user/${type}`,{
    firstname:inputs.firstname,
    secondname:inputs.secondname,
   email:inputs.email,
   password:inputs.password
   }).catch((err)=>console.log(err));
   const data=await res.data;
   return data

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    if(isSignup){
    sendRequest("signup")
    .then((data) => localStorage.setItem("userId", data.user._id))
    .then(()=>dispatch(authActions.login()))
    .then(()=>navigate("/books"))
    .then(data=>console.log(data))
    }
    else{
    sendRequest()
    .then((data) => localStorage.setItem("userId", data.user._id))
    .then(()=>dispatch(authActions.login()))
    .then(()=>navigate("/books"))
    .then(data=>console.log(data))
    }
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box
            maxWidth={300}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            boxShadow="10px 10px 20px #ccc"
            padding={5}
            margin="auto"
            marginTop={5}
            borderRadius={5}>
              <Typography variant="h5">{isSignup?"Signup":"Login"}</Typography>
                {isSignup && 
                <>
                <TextField label="firstname" onChange={handleChange} name="firstname"value={inputs.firstname}margin="normal"/>
                <TextField label="secondname" onChange={handleChange} name="secondname"value={inputs.secondname} margin="normal"/></>
                }
                <TextField type="email"  onChange={handleChange} name="email" label="email" value={inputs.email} margin="normal"/>
                <TextField type="password"  onChange={handleChange} name="password" label="password" value={inputs.password} margin="normal"/>
                <Button color="warning" type="submit" variant="contained" sx={{ borderRadius: '15px' }}>submit</Button>
                <Button onClick={()=>{setisSignup(!isSignup)}}>change to {!isSignup?"Signup":"Login"}</Button>
            </Box>
        </form>
    </div>
  )
}

export default Auth
