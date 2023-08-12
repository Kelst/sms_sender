import React, { useState, useEffect } from 'react';
import axios from "axios"
import Radio from '@mui/material/Radio'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import { Input, TextField } from '@mui/material';
import InfoBars from '../info/InfoBars';


function FilterRadioGroup({setListOfSms,setListOfUser, value,setValue,tarNumbers,setTarNumbers,ipAddress,setIpAddress,setLoading,setNumbers}) {

  const [infoBars,setInfoBars]=useState(false)
  const [textResp,setTextResp]=useState("")
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
    }if (event.key === 'Enter'&&value=="switches"){
      setTarNumbers("")
      alert("SwitcheS")
    }
  };
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
      <FormControlLabel value="switches" control={<Radio />} label="По ip обладання" />
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
          onKeyDown={handleKeyDown}

        />}
    
  </FormControl>
  )
}

export default FilterRadioGroup