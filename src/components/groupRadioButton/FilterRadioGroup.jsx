import React, { useState, useEffect } from 'react';
import axios from "axios"
import Radio from '@mui/material/Radio'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import { Autocomplete, Button, Input, TextField } from '@mui/material';
import InfoBars from '../info/InfoBars';
import options from './options';
// const options = ['Option 1', 'Option 2'];

function FilterRadioGroup({setListOfSms,setListOfUser, value,setValue,tarNumbers,setTarNumbers,ipAddress,setIpAddress,setLoading,setNumbers,ipAddressOLT,setIpAddressOLT,sfpSelect,setSfpSelect}) {

  const [infoBars,setInfoBars]=useState(false)
  const [textResp,setTextResp]=useState("")
  const [valueAddress, setValueAddress] = useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [budId,setBudId]=useState('')
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
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      console.log(response.data);
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
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      console.log(response.data);
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

      const response = await axios.get('http://194.8.147.150:3001/oltNumbersAll', {
        params: {
          ip: ipAddressOLT,
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
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      console.log(response.data);
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
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true); // Показываем loader

      const response = await axios.get('http://194.8.147.150:3001/oltNumbers', {
        params: {
          ip: ipAddressOLT,
          sfp:sfpSelect
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
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      console.log(response.data);
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
      showInfo(`Знайдено ${resp.length} номерів телефонів`)
      console.log(response.data);
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
    setValue(event.target.value);
  };
  const handleNumbers = (event) => {
    setTarNumbers(event.target.value);
  };
  const handleIp = (event) => {
    setIpAddress(event.target.value);
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
  return (
    <FormControl>
      <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
    <FormLabel id="demo-controlled-radio-buttons-group">Вибрати номери телефонів</FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      row
      onChange={handleChange}
    >
      <FormControlLabel className='text' value="tariff" control={<Radio />} label="Тариф" />
      <FormControlLabel value="olt" control={<Radio />} label="ОЛТ" />
      <FormControlLabel value="switches" control={<Radio />} label="Комутатор" />
      <FormControlLabel value="adress" control={<Radio />} label="За адресою" />
      
    </RadioGroup>
    {value=='tariff'&& <TextField
          id="filled-multiline-static"
          label="Введіть номер тарифного плану"
          type='number'
          style={{width:'260px;'}}
          value={tarNumbers}
          onChange={handleNumbers}
          onKeyDown={handleKeyDown}

        />}
        {value=='switches'&& <TextField
          id="filled-multiline-static"
          label="Введіть ip обладнання"
          type='text'
          style={{width:'260px;'}}
          value={ipAddress}
          onChange={handleIp}
          onKeyDown={handleKeyDownSwitches}

        />}
         {value=='olt'&& <div className='flex flex-col'>
          <TextField
          id="filled-multiline-static"
          label="Введіть ip обладнання"
          type='text'
          style={{width:'260px;'}}
          value={ipAddressOLT}
          onChange={handleIpOLT}
           onKeyDown={handleKeyDownOLT}

        />
                  <TextField
          id="filled-multiline-static"
          label="Введіть sfp"
          type='number'
          style={{width:'260px;'}}
          value={sfpSelect}
          onChange={handleSFP}
          onKeyDown={handleKeyDownOLTSFP}

        />
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
       </div>
        }
    
  </FormControl>
  )
}

export default FilterRadioGroup