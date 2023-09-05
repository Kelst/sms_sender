import React, { useState } from 'react';
import styles from "./login.module.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import InfoBars from '../info/InfoBars';
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [open,setOpen]=useState(false)
  const navigate=useNavigate()
  function showInfo(text){
    setText(text)
    setOpen(true)
  }
  async function  logIn(login,pass) {
   return  axios.post("http://194.8.147.150:3001/login",{login:login.trim(),password:pass.trim()})
  
  }
  const handleUsername=(e)=>{
    setUsername(e.currentTarget.value)
}
const handlePassword=(e)=>{
  setPassword(e.currentTarget.value)
}
  const handleLogin = async (e) => {
      e.preventDefault()
      let data=await logIn(username,password)
      console.log(data.data.flag);
      if(data.data.flag==true){
        Cookies.set('login',username, { expires: 0.02083 });
        navigate("/sms")

      }else
      showInfo("Невірний логін або пароль")
  };

  return (

    <Container component="main" maxWidth="xs">
     
      <CssBaseline />
      <Box
        sx={{
          position:'absolute',
          top:0,
          bottom:0,
          left:0,
          right:0,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'rgb(255, 103, 71)' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
            value={username}
            onChange={handleUsername}
          />
          <TextField
          value={password}
          onChange={handlePassword}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            
          >
            Sign In
          </Button>
      
        </Box>
      </Box>
      <InfoBars open={open} setOpen={setOpen} text={text}/> 
    </Container>

);
}

export default LoginPage;