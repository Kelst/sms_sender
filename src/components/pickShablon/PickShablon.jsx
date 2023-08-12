import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function PickShablon({setShablon}) {

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const labelsData = {
    sh0:'None',
    sh1: "Шановний абонент! Зв*язок по лінії відновлено, у разі виникнення запитань звертайтесь за нашими номерами: 0997043200, 0977043200",
    sh2: "Шановний абонент! Наразі у Вашому напрямку сталось аварійне відключення. Ведуться аварійно-відновлювальні роботи, постараємось відновити зв’язок по лінії в найкоротші терміни. Перепрошуємо, за тимчасові незручності.",
    sh3: "Шановний абонент! У зв*язку з великим навантаженням не вдалось прийняти Ваш дзвінок, наразі лінію відновлено, якщо Ваше питання/проблема не вирішена зателефонуйте будь ласка ще раз або напишіть нам на месенджери. Деталі: 0997043200",
    sh4: "Шановний абонент! Ваш рахунок відкореговано, послуга доступна до кінця ххх Деталі: 0997043200 ",
    sh5: "Шановний абонент! За Вашим зверненням рахунок відкореговано, для користування у ххх потрібно доплатити ххх грн. В подальшому будьте обачні при оплаті, Ваш логін: [log]",
    sh6: "Шановний абонент! За Вашим зверненням рахунок відкореговано, для користування у ххх потрібно доплатити ххх грн. В подальшому якщо не користуєтесь послугою звертайтесь до нас для призупинення (мінімальний термін від 30 днів)",
    sh7: "Шановний абонент!По Вашій адресі протягом тижня буде проводитись модернізація лінії та заміна абонентського кабелю. Деталі 0997043200",
    sh8: "Тех підтримка: 0997043200 0977043200. Або напишіть нам на месенджери: telegram - t.me/Intelektisp_bot viber - 0997043200",

  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if(event.target.value!='sh0')
    setShablon(labelsData[event.target.value])
    else setShablon('')
    
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Шаблони sms
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Шаблони sms</DialogTitle>
        <DialogContent>
          
          <Box
            noValidate
            component="form"

          >
  <FormControl>
  
  <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={selectedValue}
          onChange={handleChange}
        >
          {Object.keys(labelsData).map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={labelsData[value]}
              className='mt-2 shadow-slate-600	'
            />
          ))}
          
        
        </RadioGroup>
    </FormControl>
          
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}