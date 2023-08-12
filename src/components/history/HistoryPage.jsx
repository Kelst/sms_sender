import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import ListStatusComponent from '../listComponent/ListStatusComponent'
import styles from "./history.module.css"
import { Button, TextField } from '@mui/material';
import FilterHistory from '../groupRadioButton/FilterHistory';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InfoBars from '../info/InfoBars';
import LoaderData from '../loaderData/LoaderData';
import ListHistoryComponent from '../listComponent/ListHistoryComponent';

export default function HistoryPage() {
  const [user,setUser]=useState("")
  const [smsList,setSmsList]=useState("")
  const [filteredValue,setFilteredValue]=useState("all")
  const navigate=useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [adminSearch,setAdminSearch]=useState("")
  const [abonSearch,setAbonSearch]=useState("")
  const [telSearch,setTelSearch]=useState("")
  const [infoBars,setInfoBars]=useState(false)
  const [textResp,setTextResp]=useState("")
  const [loading, setLoading] = React.useState(false);

  function showInfo(text){
    setTextResp(text)
    setInfoBars(true)
  }
  async function handleDateChange(e){
    if(filteredValue=="all")
    {
      setSmsList([])

      setLoading(true)
      const data=await axios.post("http://194.8.147.150:3001/getHistoryByDates",{startDate:selectedDate,endDate:selectedDateEnd})
      setLoading(false)
      showInfo(`Знайдено ${data.data.length} записів`)
      setSmsList(data.data)
    }
    if(filteredValue=="admin"){
      setSmsList([])
      setLoading(true)
      const data=await axios.post("http://194.8.147.150:3001/getHistoryByAdmin",{startDate:selectedDate,endDate:selectedDateEnd,admin:adminSearch})
      setLoading(false)
      showInfo(`Знайдено ${data.data.length} записів`)
      setSmsList(data.data)
    }
    if(filteredValue=="abon"){
      setSmsList([])
      setLoading(true)
      const data=await axios.post("http://194.8.147.150:3001/getHistoryByAbon",{abonName:abonSearch,abonNumber:telSearch})
      setLoading(false)
      showInfo(`Знайдено ${data.data.length} записів`)
      setSmsList(data.data)

    }
    if(filteredValue=="telegram"){
      setSmsList([])
      setLoading(true)
      const data=await axios.post("http://194.8.147.150:3001/getHistoryByTelegram",{startDate:selectedDate,endDate:selectedDateEnd})
      setLoading(false)
      showInfo(`Знайдено ${data.data.length} записів`)
      setSmsList(data.data)

    }
    if(filteredValue=="sms"){
      setSmsList([])
      setLoading(true)
      const data=await axios.post("http://194.8.147.150:3001/getHistoryByTurbo",{startDate:selectedDate,endDate:selectedDateEnd})
      setLoading(false)
      showInfo(`Знайдено ${data.data.length} записів`)
      setSmsList(data.data)

    }
  }
  useState(()=>{

    const cookieData = Cookies.get('login');
        if (!cookieData) {
          navigate("/login")
        }
        setUser(cookieData)
  },[])
  return (
    <div className={styles.container}>
       {
        loading&& <LoaderData/>
      }
           <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />

        <div >
          <h2 className={styles.title}>Історія відправлених смс  </h2>
       
        <div className='flex flex-col '> 
          <FilterHistory value={filteredValue} setValue={setFilteredValue} />
          <div className='flex  mt-5 mb-7'>
            <div>
            <label>Початкова дата </label>
       <DatePicker className="text-white p-1 pl-3 rounded-xl "
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="HH:mm" 
      />
         </div>
         <div className='ml-20'>
       <label >Кінцева  дата </label>
       <DatePicker className="text-white p-1  pl-3  rounded-xl   "
        selected={selectedDateEnd}
        onChange={date => setSelectedDateEnd(date)}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="HH:mm" 
        
      /></div>
          </div>
          {
            filteredValue=="admin"&&
            <TextField
          id="standard-multiline-flexible"
          label="Введіть логін адміністратора"
          value={adminSearch}
          onChange={(e)=>{setAdminSearch(e.currentTarget.value)}}
          multiline
          maxRows={40}
          width="500px"
          variant="standard"
          className='focus:bg-slate-800'
          style={{ width: '450px' }}
      
        />
          }

{
            filteredValue=="abon"&&
            ( <div>
            <TextField
          id="standard-multiline-flexible"
          label="Введіть логін абонента"
          value={abonSearch}
          onChange={(e)=>{setAbonSearch(e.currentTarget.value)}}
          multiline
          maxRows={40}
          width="500px"
          variant="standard"
          className='focus:bg-slate-800'
          style={{ width: '450px' }}
      
        />
        <div> </div>
          <TextField
          id="standard-multiline-flexible"
          label="Введіть номер телефону"
          value={telSearch}
          onChange={(e)=>{setTelSearch(e.currentTarget.value)}}
          multiline
          maxRows={40}
          width="500px"
          variant="standard"
          className='focus:bg-slate-800 '
          style={{ width: '450px' }}/>
        </div>
        )
          }
          
          <div className='mt-5'>
            <Button variant='outlined' onClick={handleDateChange}>GET</Button>
          </div>
         
      
        
        </div>
       

     
        </div>
 
        
    <div  className="grid place-items-center ">
      <div >
        <ListHistoryComponent  smsList={smsList}/> 
      </div>
    
    </div>
            
    
      </div>
  )
}
