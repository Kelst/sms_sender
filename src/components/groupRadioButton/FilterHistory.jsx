import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Tooltip } from '@mui/material';

function FilterHistory({value,setValue}) {

  const handleChange = (event) => {
    setValue(event.target.value);
    if(listOfSMS.length>0){
      let sms=listOfSMS.map(e=>{
        return {...e,type:event.target.value}
      })
    }
  };
  return ( 
    <FormControl>
    <FormLabel id="demo-controlled-radio-buttons-group"> Фільтр  історії </FormLabel>
    <RadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      row
      onChange={handleChange} > 
      <FormControlLabel className='text' value="all" control={<Radio />} label="Всі  повідомлення" />
      <FormControlLabel value="admin" control={<Radio />} label="Адміністратор" />
      <Tooltip  title="Введіть логін абонента або номер телефону" placement="top-end" arrow>
      <FormControlLabel value="abon" control={<Radio />} label="Абонент" />
      </Tooltip>
      <FormControlLabel value="telegram" control={<Radio />} label="Телеграм"/>
      <FormControlLabel value="sms" control={<Radio />} label="Turbo SMS"/>
      <FormControlLabel value="opticom" control={<Radio />} label="Opticom"/>
      <FormControlLabel value="opensvit" control={<Radio />} label="Opensvit"/>


    </RadioGroup>
  </FormControl>
  )
}

export default FilterHistory