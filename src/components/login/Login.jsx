import React, { useState } from 'react';
import styles from "./login.module.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

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
   return  axios.post("http://194.8.147.150:3001/login",{login:login,password:pass})
  
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
    <div> <InfoBars open={open} setOpen={setOpen} text={text}/>
     <div className={styles.container}>
     
      <div className={styles.form}>
      <TextField value={username}  onChange={(e)=>setUsername(e.currentTarget.value)}    name='login' label="Login" variant="standard" />
      <TextField value={password} onChange={(e)=>setPassword(e.currentTarget.value)} name='password' label="Password" type='password' variant="standard" />
         <Button onClick={handleLogin} size='large' style={{color:"white", border:"1px solid gray"}} variant='outlined' >Log In</Button>
      </div>
      
     </div></div>
  );
}

export default LoginPage;