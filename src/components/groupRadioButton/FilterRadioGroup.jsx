import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import { Input, TextField } from '@mui/material';

function FilterRadioGroup({value,setValue,tarNumbers,setTarNumbers,ipAddress,setIpAddress,setLoading}) {

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleNumbers = (event) => {
    setTarNumbers(event.target.value);
  };
  const handleIp = (event) => {
    setIpAddress(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      
      event.preventDefault();
      setLoading(true)
    }
  };
  return (
    <FormControl>
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