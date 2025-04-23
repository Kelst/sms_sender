import React, { useEffect, useState } from 'react'
import zlib from "react-zlib-js"
import styles from "./smspage.module.css"
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { InfoIcon, Phone, Send, AlertCircle } from 'lucide-react';

import { Badge, Button, Tooltip } from '@mui/material';
import DialogShow from '../dialog/DialogShow';
import RadioGroups from '../groupRadioButton/RadioGroup';
import FilterRadioGroup from '../groupRadioButton/FilterRadioGroup';
import PickShablon from '../pickShablon/PickShablon';
import LoaderData from '../loaderData/LoaderData';
import ListComponent from '../listComponent/ListComponent';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InfoBars from '../info/InfoBars';
import { useProvider } from '../../ProviderContext';

export default function SMSPage() {
  const { currentBrand } = useProvider();
  const [shablon,setShablon]=useState('')
  const [numbers,setNumbers]=useState('') 
  const [tarNumbers,setTarNumbers]=useState('')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('telegram_sms');
  const [filter, setFilter] = useState('none');
  const [ipAddress, setIpAddress] = useState('');
  const [group, setGroup] = useState('');
  const [ipAddressOLT, setIpAddressOLT] = useState('');
  const [sfpSelect, setSfpSelect] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [listOfUser,setListOfUser]=useState([])
  const [listOfSMS,setListOfSms]=useState([])
  const [infoBars,setInfoBars]=useState(false)
  const [textResp,setTextResp]=useState("")
  const [checkedLog, setCheckedLog] = React.useState(false);
  const [countFindNumbers,setCountFindNumvers]=useState(0) 
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
    
  },[])
  function parseNumberStrings(inputString) {
    const numberGroups = inputString.split(/\s|,/); 
    const numberStrings = [];
  
    for (const group of numberGroups) {
      if (group.trim() !== '') {
        numberStrings.push(group.trim()); 
      }
    }
  
    return numberStrings;
  }
  function removePunctuation(inputString) {
    const punctuationRegex = /[,;?]/g;
    return inputString.replace(punctuationRegex, '');
  }
    async function handleSendSms(e){
      setLoading(true)

      e.preventDefault()

      let lists=[]
      if(filter==='none' && checkedLog==false){
       
        let numbersplit=numbers.split("\n")
        let forRequest=[]
        numbersplit.forEach(e=>{
          forRequest=[...forRequest,...parseNumberStrings(e)]
        })
        

        let numCheck=forRequest.map(e=>{
          if(e.startsWith('0')){
            return '38'+e
          }
          if (e.startsWith('8')) {
            return '3'+e
          }
          return e
        }).join(',')
        // numCheck=numCheck.slice(0, -1)
        setNumbers(forRequest.join('\n'))
        const response = await axios.get(`https://sms.multiprovider.info/api/infoByUser?numbers=${numCheck}`);
        let data=response.data
         lists=data.map(e=>{
          return {
            id:e.id,
            uid:e.uid,
            contacts:{
              value:e.tel
            }
          }
        })
        setCountFindNumvers(lists.length)
        setListOfUser(lists)
        
       
      }
      if(filter==='none' && checkedLog==true){
       
        let numbersplit=numbers.split("\n")
        let forRequest=[]
        numbersplit.forEach(e=>{
          forRequest=[...forRequest,removePunctuation(e)]
        })
        

        let numCheck=forRequest.join(',')
        // numCheck=numCheck.slice(0, -1)
        const response = await axios.post('https://sms.multiprovider.info/api/infoByUserLogins', {
          logins: numCheck
        });
        
                let data=response.data
         lists=data.map(e=>{
          return {
            id:e.id,
            uid:e.uid,
            contacts:{
              value:e.tel
            }
          }
        })
        setListOfUser(lists)
        setLoading(false)
       
      }

    function replaceLogText(inputText, log) {
     let  sms=inputText
      if (sms.includes('[log]')) {
       return  sms.replace(/\[log\]/g, log);
      } 
      return sms;
  }
  function replaceBalText(inputText, bal) {
    let  sms=inputText
     if (sms.includes('[bal]')) {
      return  sms.replace(/\[bal\]/g, bal);
     } 
     return sms;
 }
  function replaceTarText(inputText, tar) {
    let  sms=inputText
    if (sms.includes('[tar]')) {
      if(tar=='немає тарифного плану абонент'){
        return  sms.replace(/\[tar\]/g, '');
      }
     return  sms.replace(/\[tar\]/g, tar);
    } 
    return sms;
}  
const getProviderName = () => {
  switch (currentBrand.name.toLowerCase()) {
    case 'intelekt':
      return 'Intelekt';
    case 'opensvit':
      return 'Opensvit';
    case 'opticom':
      return 'Opticom';
      case 'veles':
        return 'Veles';
    default:
      return currentBrand.name;
  }
};

let smsList=[]
    if(filter=='none'){
       smsList= lists.map(e=>{
        let sms=replaceLogText(shablon,e.id)
       if(tarNumbers!=""){
         sms=replaceTarText(sms,tarNumbers)
       }
       return {
        id: e.id,
        uid: e.uid,
        tel: e.contacts.value,
        sms: sms,
        type: value,
        sender_sms: user,
        provider: getProviderName() // Add provider information
      }
     })
    
    }else{
setLoading(true)
  let resp= await axios.post(`https://sms.multiprovider.info/api/tariff-balans`,{
      listOfUser:listOfUser,
      shablon:shablon,
      value:value,
      user:user,
      provider: getProviderName() 
     })
     smsList = resp.data.map(sms => ({
      ...sms,
      provider: getProviderName()
    }));      
  }
 
   console.log(smsList);
    setListOfSms(smsList)
    setLoading(false)

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
    setCountFindNumvers(0)
    zlib.deflate(JSON.stringify(listOfSMS), (err, compressedArray) => {
      if (err) {
        console.error('Error compressing array:', err);
        return;
      }

      axios.post('https://sms.multiprovider.info/api/save-sms',  compressedArray,{
        headers: {
          'Content-Type': 'application/octet-stream', // або 'application/x-binary'
        },
      })
  .then(response => {
   
    setListOfSms([])
    showInfo("Повідомлення записані в базу даних та поставлені в чергу на відправлення")
    setLoading(false)

    
    
  })
  .catch(error => {
    console.error(error);

  })
  .finally(e=>{

    setLoading(false)
  })
    });
  }

  const brandStyles = {
    button: `bg-[${currentBrand.color}] hover:bg-[${currentBrand.color}]/90`,
    text: `text-[${currentBrand.color}]`,
    border: `border-[${currentBrand.color}]`,
    badge: `bg-[${currentBrand.color}]/10 text-[${currentBrand.color}]`,
  };
  
  return (<>
    {loading && <LoaderData />}
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          Відправлення смс клієнтам{' '}
          <span style={{ color: currentBrand.color }}>
            TurboSMS/Telegram Bot
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <RadioGroups 
                value={value} 
                setValue={setValue} 
                listOfSMS={listOfSMS}
                setListOfSms={setListOfSms}
                brandColor={currentBrand.color}
              />
            </div>

            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': currentBrand.color }}
                placeholder="Введіть шаблон SMS..."
                value={shablon}
                onChange={(e) => setShablon(e.target.value)}
              />
              <PickShablon setShablon={setShablon} brandColor={currentBrand.color} />
            </div>

            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <ListComponent smsList={listOfSMS} />
              <button
                onClick={handleWriteDbSMS}
                disabled={listOfSMS.length === 0}
                className="mt-4 flex items-center justify-center w-full gap-2 px-6 py-3 rounded-lg transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                style={listOfSMS.length > 0 ? { 
                  backgroundColor: currentBrand.color,
                  color: 'white'
                } : {}}
              >
                <Send size={18} />
                Відправити SMS
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <FilterRadioGroup 
                {...{
                  group, setGroup, countFindNumbers, setCountFindNumvers,
                  checkedLog, setCheckedLog, ipAddressOLT, setIpAddressOLT,
                  sfpSelect, setSfpSelect, setListOfSms, setListOfUser,
                  setLoading, value: filter, setValue: setFilter, tarNumbers,
                  setTarNumbers, ipAddress, setIpAddress, setNumbers,
                  brandColor: currentBrand.color
                }}
              />
            </div>

            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">
                  {!checkedLog ? 'Номери телефонів' : 'Список логінів'}
                </h3>
                <div 
                  className="flex items-center gap-2 px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${currentBrand.color}10`,
                    color: currentBrand.color 
                  }}
                >
                  <Phone size={16} />
                  <span className="text-sm font-medium">{countFindNumbers}</span>
                </div>
              </div>

              <textarea
                className="w-full min-h-[200px] p-3 border rounded-lg bg-slate-900 text-white placeholder-slate-400 focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': currentBrand.color }}
                placeholder={!checkedLog ? 'Введіть номери телефонів' : 'Введіть список логінів'}
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
              />

              <button
                onClick={handleSendSms}
                disabled={!shablon || !numbers}
                className="mt-4 flex items-center justify-center w-full gap-2 px-6 py-3 rounded-lg transition-colors disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                style={shablon && numbers ? { 
                  backgroundColor: currentBrand.color,
                  color: 'white'
                } : {}}
              >
                <AlertCircle size={18} />
                Згенерувати шаблон
              </button>
            </div>
          </div>
        </div>
      </div>

      <DialogShow open={open} setOpen={setOpen} brandColor={currentBrand.color} />
      
      {infoBars && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md animate-slide-up">
          <p className="text-slate-700">{textResp}</p>
        </div>
      )}
    </div>
    </>
  );
}
