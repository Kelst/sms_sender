import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';

function RadioGroups({value,setValue,listOfSMS,setListOfSms}) {

  const handleChange = (event) => {
    setValue(event.target.value);
    if(listOfSMS.length>0){
      let sms=listOfSMS.map(e=>{
        return {...e,type:event.target.value}
      })
      setListOfSms(sms)
    }
  };
  return (
    <FormControl>
    <FormLabel id="demo-controlled-radio-buttons-group"> Відправити sms за допомогою:</FormLabel>

    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      row
      onChange={handleChange}>
      <FormControlLabel className='text' value="bot" control={<Radio />} label="Telegram Bot" />
      <FormControlLabel value="sms" control={<Radio />} label="Turbo SMS" />
      <Tooltip  title="SMS відправляються ботом для номерів в яких є intelekt bot, інші номери відправляються через turbo sms " placement="top-end" arrow>
      <FormControlLabel value="telegram_sms" control={<Radio />} label="Telegram/TURBO" />
           </Tooltip>

    </RadioGroup>
  </FormControl>
  )
}

export default RadioGroups