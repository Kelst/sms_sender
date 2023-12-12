import React, { useState, useEffect } from 'react';
import axios from "axios"
import Radio from '@mui/material/Radio'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import { Autocomplete, Button, Input, Switch, TextField, Typography } from '@mui/material';
import InfoBars from '../info/InfoBars';
import options from './options';
import AntSwitch from './AntSwitch';
import DialogShow from '../dialog/DialogShow';
import InfoIcon from '@mui/icons-material/Info';
// const options = ['Option 1', 'Option 2'];

function FilterRadioGroup({ group, setGroup,countFindNumbers,setCountFindNumvers,checkedLog,setCheckedLog,setListOfSms,setListOfUser, value,setValue,tarNumbers,setTarNumbers,ipAddress,setIpAddress,setLoading,setNumbers,ipAddressOLT,setIpAddressOLT,sfpSelect,setSfpSelect}) {

  const [infoBars,setInfoBars]=useState(false)
  const [open,setOpen]=useState(false)
  const [textResp,setTextResp]=useState("")
  const [valueAddress, setValueAddress] = useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [budId,setBudId]=useState('')
  const [checked, setChecked] = React.useState(false);
  const [loginText,setLoginText]=useState('')
  function showInfo(text){
    setTextResp(text)
    setInfoBars(true)
  }
  function keepOnlyNumbers(inputString) {
    return inputString.replace(/[^0-9]/g, '');
}

  const getDataById = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader

      const response = await axios.post('http://194.8.147.150:3001/getById', {
        id: tarNumbers
      });
      if(response.data.length>0){
      let resp=response.data.map(e=>{
        if (e.contacts.value.startsWith('0'))
            {e.tel=keepOnlyNumbers('38'+e.contacts.value)
           return keepOnlyNumbers('38'+e.contacts.value)}
         else  if (e.contacts.value.startsWith('8'))
              {
                e.tel=keepOnlyNumbers('3'+e.contacts.value)
                return keepOnlyNumbers('3'+e.contacts.value)
              }
          e.tel=keepOnlyNumbers(e.contacts.value)
          return  keepOnlyNumbers(e.contacts.value)
      })
      setCountFindNumvers(resp.length)
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      // console.log(response.data);
      setListOfUser(response.data)
      setNumbers(resp.join('\n'));
    
    }
    else{
      showInfo('За вказаним номером тарифного плану немає жодного користувача')
      setListOfUser([])
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const getDataByIPSwitches = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader

      const response = await axios.get('http://194.8.147.150:3001/switchNumbers', {
        params: {
          ip: ipAddress,
        }
      });
      if(response.data.length>0){
      let resp=response.data.map(e=>{
        if (e.contacts.value.startsWith('0'))
            {e.tel=keepOnlyNumbers('38'+e.contacts.value)
           return keepOnlyNumbers('38'+e.contacts.value)}
         else  if (e.contacts.value.startsWith('8'))
              {
                e.tel=keepOnlyNumbers('3'+e.contacts.value)
                return keepOnlyNumbers('3'+e.contacts.value)
              }
          e.tel=keepOnlyNumbers(e.contacts.value)
          return  keepOnlyNumbers(e.contacts.value)
      })
      setCountFindNumvers(resp.length)
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      // console.log(response.data);
      setListOfUser(response.data)
      setNumbers(resp.join('\n'));
    
    }
    else{
      showInfo('За вказаною ip свіча немає жодного користувача')
      setListOfUser([])
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByGroup = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader

      const response = await axios.post('http://194.8.147.150:3001/getByGroup', {
        group: group
      });
      if(response.data.length>0){
      let resp=response.data.map(e=>{
        if (e.contacts.value.startsWith('0'))
            {e.tel=keepOnlyNumbers('38'+e.contacts.value)
           return keepOnlyNumbers('38'+e.contacts.value)}
         else  if (e.contacts.value.startsWith('8'))
              {
                e.tel=keepOnlyNumbers('3'+e.contacts.value)
                return keepOnlyNumbers('3'+e.contacts.value)
              }
          e.tel=keepOnlyNumbers(e.contacts.value)
          return  keepOnlyNumbers(e.contacts.value)
      })
      setCountFindNumvers(resp.length)
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      // console.log(response.data);
      setListOfUser(response.data)
      setNumbers(resp.join('\n'));
    
    }
    else{
      showInfo('За вказаним номером тарифного плану немає жодного користувача')
      setListOfUser([])
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const getDataByIPOLTAll= async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader
      function isDateFormatValid(dateString) {
        const datePattern = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;
        return datePattern.test(dateString);
    }
  let response 
  
  if(!isDateFormatValid(loginText))
 {  response = await axios.get('http://194.8.147.150:3001/oltNumbersAll', {
    params: {
      ip: ipAddressOLT,
      sfp:sfpSelect,
      login:loginText,
      
    }
  });}
  else {
    response = await axios.get('http://194.8.147.150:3001/oltNumbersAll', {
    params: {
      ip: ipAddressOLT,
      sfp:sfpSelect,
     
      last_date:loginText
    }
  });
  }
      if(response.data.length>0){
      let resp=response.data.map(e=>{
        if (e.contacts.value.startsWith('0'))
            {e.tel=keepOnlyNumbers('38'+e.contacts.value)
           return keepOnlyNumbers('38'+e.contacts.value)}
         else  if (e.contacts.value.startsWith('8'))
              {
                e.tel=keepOnlyNumbers('3'+e.contacts.value)
                return keepOnlyNumbers('3'+e.contacts.value)
              }
          e.tel=keepOnlyNumbers(e.contacts.value)
          return  keepOnlyNumbers(e.contacts.value)
      })
      setCountFindNumvers(resp.length)
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      // console.log(response.data);
      setListOfUser(response.data)
      setNumbers(resp.join('\n'));
    
    }
    else{
      showInfo('За ip немає жодного абонента')
      setListOfUser([])
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByIPOLTSFP= async () => {
    function isDateFormatValid(dateString) {
      const datePattern = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;
      return datePattern.test(dateString);
  }
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader
      let response ;
      if(!isDateFormatValid(loginText))
     {  response = await axios.get('http://194.8.147.150:3001/oltNumbers', {
        params: {
          ip: ipAddressOLT,
          sfp:sfpSelect,
          login:loginText,
          
        }
      });}
      else {
        response = await axios.get('http://194.8.147.150:3001/oltNumbers', {
        params: {
          ip: ipAddressOLT,
          sfp:sfpSelect,
         
          last_date:loginText
        }
      });
      }
      if(response.data.length>0){
      let resp=response.data.map(e=>{
        if (e.contacts.value.startsWith('0'))
            {e.tel=keepOnlyNumbers('38'+e.contacts.value)
           return keepOnlyNumbers('38'+e.contacts.value)}
         else  if (e.contacts.value.startsWith('8'))
              {
                e.tel=keepOnlyNumbers('3'+e.contacts.value)
                return keepOnlyNumbers('3'+e.contacts.value)
              }
          e.tel=keepOnlyNumbers(e.contacts.value)
          return  keepOnlyNumbers(e.contacts.value)
      })
      setCountFindNumvers(resp.length)
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      // console.log(response.data);
      setListOfUser(response.data)
      setNumbers(resp.join('\n'));
    
    }
    else{
      showInfo('За ip немає жодного абонента')
      setListOfUser([])
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByAddress= async () => {
    try {

      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader

      const response = await axios.get('http://194.8.147.150:3001/addressNumbers', {
        params: {
          budId: budId,
          address:valueAddress
        }
      });
      if(response.data.length>0){
      let resp=response.data.map(e=>{
        if (e.contacts.value.startsWith('0'))
            {e.tel=keepOnlyNumbers('38'+e.contacts.value)
           return keepOnlyNumbers('38'+e.contacts.value)}
         else  if (e.contacts.value.startsWith('8'))
              {
                e.tel=keepOnlyNumbers('3'+e.contacts.value)
                return keepOnlyNumbers('3'+e.contacts.value)
              }
          e.tel=keepOnlyNumbers(e.contacts.value)
          return  keepOnlyNumbers(e.contacts.value)
      })
      setCountFindNumvers(resp.length)
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      setListOfUser(response.data)
      setNumbers(resp.join('\n'));
    
    }
    else{
      showInfo('За ip немає жодного абонента')
      setListOfUser([])
    }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


const handleIpOLT=(event)=>{
  setIpAddressOLT(event.target.value);
}
const handleSFP=(event)=>{
  setSfpSelect(event.target.value)
}
  const handleChange = (event) => {
    setCountFindNumvers(0)
    setValue(event.target.value);
    setCheckedLog(false)
    setNumbers('')
    setListOfSms([])
  };
  const handleNumbers = (event) => {
    setTarNumbers(event.target.value);
  };
  const handleIp = (event) => {
    setIpAddress(event.target.value);
  };
  const handleGroup = (event) => {
    setGroup(event.target.value);
  };
  
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter'&&value=="tariff") {
      event.preventDefault();
      setLoading(true)
      await getDataById(tarNumbers)
    }
  };
  const handleKeyDownSwitches = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLoading(true)
      await getDataByIPSwitches(ipAddress)
    }
  };
  const handleKeyDownOLT=async(event)=>{

    if (event.key === 'Enter' && ipAddressOLT!='') {
     
      event.preventDefault();
      setSfpSelect("")
      setLoading(true)
      await getDataByIPOLTAll(ipAddressOLT)
    }

  }
  const handleKeyDownOLTSFP=async(event)=>{

    
    if (event.key === 'Enter') {
          event.preventDefault();
          if(sfpSelect==""){
            showInfo("Введіть сфп, приклад: 1-16")
            return
          }

      setLoading(true)
      await getDataByIPOLTSFP(ipAddressOLT,sfpSelect)
    }
  }


  const handleKeyDownAdressBudId=async (event)=>{
      
    if (event.key === 'Enter') {
      event.preventDefault();
      if(budId==""){
        showInfo("Введіть номер будинку")
        return
      }

  setLoading(true)
  await getDataByAddress(valueAddress,budId)
}

  }

  const handleKeyDownAdressBudId1=async (event)=>{
      
    if (event.key === 'Enter') {
      event.preventDefault();
  

  setLoading(true)
  await getDataByAddress(valueAddress,budId)
}

  }
  const handleGetNumbersByAddress=async (event)=> {
      event.preventDefault();
      setLoading(true)
      await getDataByAddress(valueAddress,budId)
  }
  const handleGetNumbersByTariff=async(event)=>{
    event.preventDefault();
    setLoading(true)
    await getDataById(tarNumbers)
  }
  const handleGetNumbersBySwitch=async(event)=>{
    event.preventDefault();
      setLoading(true)
      await getDataByIPSwitches(ipAddress)
  }
  
  const handleGetNumbersByGroup=async(event)=>{
    event.preventDefault();
      setLoading(true)
     
      await getDataByGroup(group.trim())
  }
  const handleChangeCheck = (event) => {
    event.preventDefault();
    setChecked(event.target.checked);
  };
  const handleChangeCheckLog = (event) => {
    event.preventDefault();
    setNumbers('')
    setListOfSms([])
    setCheckedLog(event.target.checked);
  };
  const handleGetNumbersByOLT=async (event)=>{
    event.preventDefault();
    if(sfpSelect==""&&checked==true){
      showInfo("Введіть сфп, приклад: 1-16")
      return
    }
    if (checked==true){
setLoading(true)
await getDataByIPOLTSFP(ipAddressOLT,sfpSelect)
    }else{
      
      setSfpSelect("")
      setLoading(true)
      await getDataByIPOLTAll(ipAddressOLT)
    }

  }
  return (
    <FormControl className='flex  justify-center'>
      <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
    <FormLabel id="demo-controlled-radio-buttons-group">Вибрати номери телефонів</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      row
      onChange={handleChange}
      className='flex '
    >
      <FormControlLabel className='text' value="none" control={<Radio />} label="Вручну" />
      <FormControlLabel className='text' value="tariff" control={<Radio />} label="Тариф" />
      <FormControlLabel value="olt" control={<Radio />} label="ОЛТ" />
      <FormControlLabel value="switches" control={<Radio />} label="Комутатор" />
      <FormControlLabel value="adress" control={<Radio />} label="Адреса" />
      <FormControlLabel value="group" control={<Radio />} label="Група" />
      
    </RadioGroup>
    <div className='flex '>
    {value=='none'&& <div className=''>
      <div className='flex items-center '>
        <div className='mr-2'><Typography>Номери телефонів</Typography></div>
    
        <AntSwitch        
         onChange={handleChangeCheckLog}
  checked={checkedLog} size='xl' />
        <div className='ml-2'><Typography>Логіни</Typography></div>
        </div>
        </div>}
    {value=='tariff'&& <div className=''><TextField
          id="filled-multiline-static"
          label="Введіть номер тарифного плану"
          type='number'
          style={{width:'260px;'}}
          value={tarNumbers}
          onChange={handleNumbers}
          onKeyDown={handleKeyDown}

        />
        <div className='ml-2 mb-2'> <Button  onClick={handleGetNumbersByTariff}  variant="outlined">Витягнути номера телефонів</Button></div>
       
        </div>}
        {
          value=="group"&& <div> <TextField
          id="filled-multiline-static"
          label="Введіть номер групи"
          type='text'
          style={{width:'260px;'}}
          value={group}
          onChange={handleGroup}
         

        />
                <div className='ml-2 mb-2'> <Button  onClick={handleGetNumbersByGroup}  variant="outlined">Витягнути номера телефонів</Button></div>

        </div>
        }
        {value=='switches'&& <div> <TextField
          id="filled-multiline-static"
          label="Введіть ip обладнання"
          type='text'
          style={{width:'260px;'}}
          value={ipAddress}
          onChange={handleIp}
          onKeyDown={handleKeyDownSwitches}

        />
                <div className='ml-2 mb-2'> <Button  onClick={handleGetNumbersBySwitch}  variant="outlined">Витягнути номера телефонів</Button></div>

        </div>
        
        
        }
         {value=='olt'&& <div className='flex flex-col'>
          <div>
          <TextField
          id="filled-multiline-static"
          label="Введіть ip обладнання"
          type='text'
          style={{width:'260px;'}}
          value={ipAddressOLT}
          onChange={handleIpOLT}
           onKeyDown={handleKeyDownOLT}

        />
        
         <Switch
        checked={checked}
        onChange={handleChangeCheck}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <DialogShow open={open} setOpen={setOpen} text={`
        За потреби можна просписати логін абонента, тоді з сфп витягнуться абоненти які одночасно перестали працювати разом з ним,
        корисно коли відпала не вся сфп, також можна записати Дата оновлення з юзера формат дати 11.12.2023 07:25, це поле може бути і пустим.
      `}/> 
        </div>
        
             
      {checked&& <> 
    
      <TextField
          id="filled-multiline-static"
          label="Введіть sfp"
          type='number'
          style={{width:'260px;'}}
          value={sfpSelect}
          onChange={handleSFP}
          onKeyDown={handleKeyDownOLTSFP}

        />
      
        
        
         </>}
         <TextField
          id="filled-multiline-static"
          label="Відфільтрувати по логіну / даті оновлення, необов'язкове поле"
          type='text'
          style={{width:'260px;'}}
          value={loginText}
          onChange={(e)=>setLoginText(e.target.value)}
         
        />
          <div className='ml-2 mb-2'> <Button  onClick={handleGetNumbersByOLT}  variant="outlined">Витягнути номера телефонів</Button>
        <Button startIcon={<InfoIcon/>}  onClick={()=>setOpen(true)}  variant="outlined">Інф.</Button>
          
          </div>
        </div> 
        } 

         {value=='adress'&& 
         <div>
         <Autocomplete
         value={valueAddress}
         onChange={(event, newValue) => {
           setValueAddress(newValue);
         }}
         inputValue={inputValue}
         onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
         }}
         id="controllable-states-demo"
         options={options}
         sx={{ width: 400 }}
         renderInput={(params) => <TextField {...params} label="Введіть адресу" />}
         onKeyDown={handleKeyDownAdressBudId1}
       />
       
       <TextField
          id="filled-multiline-static"
          label="Введіть номер будинку якщо потрібно"
          type='text'
          style={{width:'50;'}}
          value={budId}
          onChange={(e)=>setBudId(e.target.value)}
           onKeyDown={handleKeyDownAdressBudId}

        />
        <div className='ml-2 mb-2'>
        <Button  onClick={handleGetNumbersByAddress}  variant="outlined">Витягнути номера телефонів</Button>
        </div>
       </div>
        }
    </div>
  </FormControl>
  )
}

export default FilterRadioGroup