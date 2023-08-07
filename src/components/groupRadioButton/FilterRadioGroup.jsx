import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';

function FilterRadioGroup({value,setValue}) {

  const handleChange = (event) => {
    setValue(event.target.value);
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
  </FormControl>
  )
}

export default FilterRadioGroup