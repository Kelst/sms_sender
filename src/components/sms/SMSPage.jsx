import React, { useState } from 'react'
import styles from "./smspage.module.css"
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import DialogShow from '../dialog/DialogShow';
import RadioGroups from '../groupRadioButton/RadioGroup';
import FilterRadioGroup from '../groupRadioButton/FilterRadioGroup';
export default function SMSPage() {
  const [shablon,setShablon]=useState('')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('bot');
  const [filter, setFilter] = useState('tariff');
 
  const handleShablon = (event) => {
    setShablon(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>Відправлення смс клієнтам <span className={styles.title_strong}>TurboSMS/Telegram Bot</span></h2>
      <Box className={styles.content}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      
      <div className='flex flex-col'>
      <RadioGroups value={value} setValue={setValue}/>
      <div>
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
     <IconButton className='pt-2' onClick={handleClickOpen}>
          <InfoOutlinedIcon/>
      </IconButton>
      
      </div>
      dsadsadsad
        </div>
         <div>
          <FilterRadioGroup value={filter} setValue={setFilter}/>
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
