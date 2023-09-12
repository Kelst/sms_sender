import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from "./history.module.css"
import { Button, TextField } from '@mui/material';
import FilterHistory from '../groupRadioButton/FilterHistory';
import DownloadIcon from '@mui/icons-material/Download';
import { createPortal } from 'react-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InfoBars from '../info/InfoBars';
import LoaderData from '../loaderData/LoaderData';
import ListHistoryComponent from '../listComponent/ListHistoryComponent';
import ModalChart from '../chart/ModalChart';

export default function HistoryPage() {
  const [user,setUser]=useState("")
  const [dataForChart,setDataForChart]=useState([])
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
  const [showChart,setShowChart]=useState(false)
  const [loading, setLoading] = React.useState(false);
  const [countSMS,setCountSms]=useState({sms:0,bot:0})
const handleGraphOpen=()=>{


try {
           axios.post('http://194.8.147.150:3001/getDateForChart',{startDate:selectedDate,endDate:selectedDateEnd})
            .then(response=>{
              const responseData = response.data;
              console.log(responseData);
              
            setDataForChart(responseData);
            
            let countSmss=0
            let countBot=0
            responseData.forEach(element => {
              countSmss+=element.sms
              countBot+=element.telegram
            });
          
            setCountSms({sms:countSmss,bot:countBot})
            setShowChart(!showChart)
          })
    
            // Отримані дані з сервера
          
  
  
          } catch (error) {
            console.error('Помилка під час запиту до сервера:', error);
          }


}
  function showInfo(text){
    setTextResp(text)
    setInfoBars(true)
  }
 async function handleDownloadDate() {
  setLoading(true)
    try {
      const response = await axios.get('http://194.8.147.150:3001/download', {
        responseType: 'blob',
      });
      setLoading(false)

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'messages.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Видалити елемент після завантаження
    } catch (error) {
      console.error('Error downloading file:', error);
    }
    
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
      
      {createPortal(
      <ModalChart open={showChart} setOpen={setShowChart} dataForChart={dataForChart} countSMS={countSMS}/>
      ,
        document.body
      )}
       {
        loading&& <LoaderData/>
      }
           <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />

        <div >
          <h2 className={styles.title}>Історія відправлених смс  </h2>
       
        <div className='flex flex-col '> 
          <FilterHistory value={filteredValue} setValue={setFilteredValue} />
          <Button className='bg-gradient-to-r  from-cyan-500 to-blue-500' onClick={handleGraphOpen}><div className="text-white font-bold">Подивитись графік</div></Button>
          <div className='flex  mt-5 mb-7'>
            <div>
            <label>Початкова дата </label>
       <DatePicker className="p-1 pl-3 rounded-xl text-white "
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="Pp"
        timeFormat="HH:mm" 
      />
         </div>
         <div className='ml-20'>
       <label >Кінцева  дата </label>
       <DatePicker className=" p-1  pl-3  rounded-xl text-white  "
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
          
          <div className='mt-5 flex gap-5'>
            <Button variant='outlined' onClick={handleDateChange}>GET</Button>
            <Button variant='outlined' endIcon={<DownloadIcon/>} onClick={handleDownloadDate}>Download</Button>
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
