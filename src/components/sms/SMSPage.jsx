import React, { useEffect, useState } from 'react'
import zlib from "react-zlib-js"

import styles from "./smspage.module.css"
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Button, Tooltip } from '@mui/material';
import DialogShow from '../dialog/DialogShow';
import RadioGroups from '../groupRadioButton/RadioGroup';
import FilterRadioGroup from '../groupRadioButton/FilterRadioGroup';
import PickShablon from '../pickShablon/PickShablon';
import LoaderData from '../loaderData/LoaderData';
import ListComponent from '../listComponent/ListComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import InfoBars from '../info/InfoBars';
export default function SMSPage() {
  const [shablon,setShablon]=useState('')
  const [numbers,setNumbers]=useState('') 
  const [tarNumbers,setTarNumbers]=useState('')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('bot');
  const [filter, setFilter] = useState('tariff');
  const [ipAddress, setIpAddress] = useState('');
  const [ipAddressOLT, setIpAddressOLT] = useState('');
  const [sfpSelect, setSfpSelect] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [listOfUser,setListOfUser]=useState([])
  const [listOfSMS,setListOfSms]=useState([])
  const [listOfTariff,setListOfTariff]=useState([])
  const [infoBars,setInfoBars]=useState(false)
  const [textResp,setTextResp]=useState("")
  const [user,setUser]=useState("")
  
  const navigate=useNavigate()

  
  function showInfo(text){
    setTextResp(text)
    setInfoBars(true)
  }
  useEffect( ()=>{
    
   
    const cookieData = Cookies.get('login');
        if (!cookieData) {
          navigate("/login")
        }
        setUser(cookieData)
    async function fetchData(){
      try{
        const response = await axios.get('http://194.8.147.150:3001/getTariff');
        setListOfTariff(response.data)
        console.log(response.data);
        }
        catch(e){
          console.log(e);
        }
    }
    fetchData()
    
  },[])

    function handleSendSms(e){
      e.preventDefault()
      

    function replaceLogText(inputText, log) {
     let  sms=inputText
      if (sms.includes('[log]')) {
       return  sms.replace(/\[log\]/g, log);
      } 
      return sms;
  }
  function replaceTarText(inputText, tar) {
   let sms=inputText
   let tariff=listOfTariff.find(e=>e.tp_id==tar)
    if (sms.includes('[tar]')) {
      return    sms.replace(/\[tar\]/g, tariff?.name);
    } 
    return sms;
}

    let smsList= listOfUser.map(e=>{
       let sms=replaceLogText(shablon,e.id)
      if(tarNumbers!=""){
        sms=replaceTarText(sms,tarNumbers)
      }
      console.log( {
        id:e.id,
        tel:e.contacts.value,
        sms:sms,
        type:value,
        sender_sms:user
      });
      return {
        id:e.id,
        tel:e.contacts.value,
        sms:sms,
        type:value,
        sender_sms:user
      }
    })
   

    setListOfSms(smsList)

  }
  const handleShablon = (event) => {
    setShablon(event.target.value);
  };
  const handleNumbers = (event) => {
    setNumbers(event.target.value);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleWriteDbSMS=()=>{
    setLoading(true)

    zlib.deflate(JSON.stringify(listOfSMS), (err, compressedArray) => {
      if (err) {
        console.error('Error compressing array:', err);
        return;
      }

      axios.post('http://194.8.147.150:3001/save-sms',  compressedArray,{
        headers: {
          'Content-Type': 'application/octet-stream', // або 'application/x-binary'
        },
      })
  .then(response => {
   
    setListOfSms([])
    showInfo("Повідомлення записані в базу даних та поставлені в чергу на відправлення")
    setLoading(fasle)

    
    
  })
  .catch(error => {
    console.error(error);

  })
  .finally(e=>{

    setLoading(false)
  })
    });





  


    //зробити api отримання 
  }

  return (
    <div className={styles.container}>
      {
        loading&& <LoaderData/>
      }
     <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
      <h2 className={styles.title}>Відправлення смс клієнтам <span className={styles.title_strong}>TurboSMS/Telegram Bot</span></h2>
      <Box className={styles.content}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      
      <div className='flex flex-col items-start ml-3'>
      <RadioGroups value={value} setValue={setValue} listOfSMS={listOfSMS} setListOfSms={setListOfSms} />
      <div className='relative'>
      <TextField
          id="standard-multiline-flexible"
          label="Шаблон sms"
          
          multiline
          maxRows={40}
          width="500px"
          variant="standard"
          className='focus:bg-slate-800'
          style={{ width: '450px' }}
          value={shablon}
          onChange={handleShablon}
        />
     <IconButton  onClick={handleClickOpen}>
          <InfoOutlinedIcon/>
      </IconButton>
      
      </div>
      
      <PickShablon  setShablon={setShablon}/>
      <div  className='flex flex-col items-start gap-4 ml-[-15px] '>
      <ListComponent  smsList={listOfSMS}/>
      {listOfSMS.length>0? <Button onClick={handleWriteDbSMS} variant="outlined"  className=''>Відправити sms</Button>: <Button  variant="outlined"  disabled  className=''>Відправити sms</Button>}
     
      </div>
        </div >
         <div className=' mr-[200px]'>
          <FilterRadioGroup ipAddressOLT={ipAddressOLT} setIpAddressOLT={setIpAddressOLT} sfpSelect={sfpSelect} setSfpSelect={setSfpSelect} setListOfSms={setListOfSms} setListOfUser={setListOfUser} setLoading={setLoading}  value={filter} setValue={setFilter} tarNumbers={tarNumbers} setTarNumbers={setTarNumbers} ipAddress={ipAddress} setIpAddress={setIpAddress} setNumbers={setNumbers}/>
          <div className='flex flex-col justify-center items-start' >
          <TextField
          id="filled-multiline-static"
          label="Номери телефонів"
          multiline
          rows={10}
          
          value={numbers}
          onChange={handleNumbers}
        />
        <Tooltip title={shablon==="" || numbers===""?"Введіть текст повідомлення, та номери телефонів":""} placement="top-end">
          <div>
          {(shablon==="") || (numbers==="")?<Button  className='animate-pulse' variant="outlined"   disabled  >Згенерувати шаблон</Button>:<Button variant="outlined" onClick={handleSendSms} className='animate-pulse' >Згенерувати шаблон</Button>}
        
        </div>
        </Tooltip>
        
        </div>
        
         </div>

      
      </Box>
      
     <DialogShow open={open} setOpen={setOpen} text={`За допомогою цього поля ви можете 
     сформувати шаблон sms повідомлення:\nу квадратні дужки ви можете
      вставити наступні дані [tar],[log],[pas] приклад:\n
      Шановний абонент ваш логін [log] пароль від особистого кабінету[pas].
      Ваш тарифний план [tar] буде зміненно!.
      `}/>
    </div>
    
  )
}
