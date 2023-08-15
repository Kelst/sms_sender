import React, { useEffect,useRef } from 'react'
import styles from "./status.module.css"
import { useState } from 'react'
import InfoBars from '../info/InfoBars'
import axios from 'axios'
import ListComponent from '../listComponent/ListComponent'
import ListStatusComponent from '../listComponent/ListStatusComponent'
import LoaderData from '../loaderData/LoaderData'

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
const [totalMessages, setTotalMessages] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const listRef = useRef(null); // Посилання на елемент списку

const loadMoreMessages = () => {
console.log("NEW REAUST");
  axios.get(`http://194.8.147.150:3001/messages?page=${currentPage + 1}`)
    .then(response => {
      const newMessages = response.data.messages;
      
      setSmsLists(prevMessages => [...prevMessages, ...newMessages]);
      setCurrentPage(prevPage => prevPage + 1);
    })
    .catch(error => {
      console.error('Error loading more messages:', error);
    });
};

function showInfo(text){
  setTextResp(text)
  setInfoBars(true)
}
const handleScroll = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
console.log("scrollTop ",scrollTop);
console.log("clientHeight ",clientHeight);
console.log("scrollHeight ",scrollHeight);
  if (scrollHeight - scrollTop === clientHeight) {
    loadMoreMessages();
  }
};
useEffect(() => {
     const cookieData = Cookies.get('login');
         if (!cookieData) {         navigate("/login")
        }
        setUser(cookieData)
  if (listRef.current) {
    listRef.current.addEventListener('scroll', handleScroll);
  }

  axios.get(`http://194.8.147.150:3001/messages?page=1`)
    .then(response => {
      const initialMessages = response.data.messages;
      const total = response.data.totalMessages;
      console.log(initialMessages);
      setSmsLists(initialMessages);
      setTotalMessages(total);
    })
    .catch(error => {
      console.error('Error loading initial messages:', error);
    });

async function getTotal() {
  const total= await axios.get(`http://194.8.147.150:3001/totalSMS`)
  setTotalMessages(total.data.total)
}
const interval1=setInterval(async()=>{
  axios.get(`http://194.8.147.150:3001/messages?page=1`)
  .then(response => {
    const initialMessages = response.data.messages;
    const total = response.data.totalMessages;
    console.log(initialMessages);
    setSmsLists(initialMessages);
    setTotalMessages(total);
  })
  .catch(error => {
    console.error('Error loading initial messages:', error);
  });
},4000)
const interval=setInterval(async ()=>{
     getTotal()
},1000)


return (()=>{
  if (listRef.current) {
    listRef.current.removeEventListener('scroll', handleScroll);
  }
  clearInterval(interval)
  clearInterval(interval1)
})
}, []);

// useEffect(() => {
  
//   const cookieData = Cookies.get('login');
//         if (!cookieData) {
//           navigate("/login")
//         }
//         setUser(cookieData)
//   async function reloadDate() {
//     axios.get('http://194.8.147.150:3001/pending_sms')
//     .then(response => {
//    console.log(response.data);
//      setSmsLists(response.data)
//     })
//     .catch(error => {
//       console.error('Помилка при отриманні даних:', error);
//     });
    
//   }
//   let interval
//   setLoading(true)
//   axios.get('http://194.8.147.150:3001/pending_sms')
//   .then(response => {
//     setSmsLists(response.data)
//   })
//   .catch(error => {
//     console.error('Помилка при отриманні даних:', error);
//   }).finally(()=>{
    
//     setLoading(false)
//      interval= setInterval(()=>{
//       reloadDate()
//     },9000)
//   })
 

//   return (()=>{
//     clearInterval(interval);}
//   )
// }, []);

  return (
    <div className={styles.container}>
       {
        loading&& <LoaderData/>
      }
      <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
      <div><h2 className={styles.title}>Перегляд відправки смс абонентам ({totalMessages}) </h2></div>
    <div  className="grid place-items-center ">
      <div >
        <TransitionGroup>
        <ListStatusComponent  handleScroll={handleScroll}  totalMessages={totalMessages} smsList={smsLists}/>
        </TransitionGroup>
        
      </div>
    
    </div>
            
    
      </div>
  )
}
