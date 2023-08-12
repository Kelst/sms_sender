import React, { useEffect } from 'react'
import styles from "./status.module.css"
import { useState } from 'react'
import InfoBars from '../info/InfoBars'
import axios from 'axios'
import ListComponent from '../listComponent/ListComponent'
import ListStatusComponent from '../listComponent/ListStatusComponent'
import LoaderData from '../loaderData/LoaderData'
import io from 'socket.io-client';
import { log } from 'react-zlib-js'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
export default function StatusPage() {

const [smsLists,setSmsLists]=useState([])
const [infoBars,setInfoBars]=useState(false)
const [textResp,setTextResp]=useState("")
const [loading, setLoading] = React.useState(false);
const navigate=useNavigate()
const [user,setUser]=useState("")


function showInfo(text){
  setTextResp(text)
  setInfoBars(true)
}

useEffect(() => {
  
  const cookieData = Cookies.get('login');
        if (!cookieData) {
          navigate("/login")
        }
        setUser(cookieData)
  async function reloadDate() {
    axios.get('http://194.8.147.150:3001/pending_sms')
    .then(response => {
   console.log(response.data);
     setSmsLists(response.data)
    })
    .catch(error => {
      console.error('Помилка при отриманні даних:', error);
    });
    
  }
  let interval
  setLoading(true)
  axios.get('http://194.8.147.150:3001/pending_sms')
  .then(response => {
    console.log('Отримані дані:', response.data);
    setSmsLists(response.data)
  })
  .catch(error => {
    console.error('Помилка при отриманні даних:', error);
  }).finally(()=>{
    
    setLoading(false)
     interval= setInterval(()=>{
      reloadDate()
    },9000)
  })
 

  return (()=>{
    clearInterval(interval);}
  )
}, []);

  return (
    <div className={styles.container}>
       {
        loading&& <LoaderData/>
      }
      <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
      <div><h2 className={styles.title}>Перегляд відправки смс абонентам ({smsLists.length}) </h2></div>
    <div  className="grid place-items-center ">
      <div >
        <TransitionGroup>
        <ListStatusComponent  smsList={smsLists}/>
        </TransitionGroup>
        
      </div>
    
    </div>
            
    
      </div>
  )
}
