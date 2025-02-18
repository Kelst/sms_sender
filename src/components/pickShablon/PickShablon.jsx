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
import axios from 'axios';
import { TextField } from '@mui/material';
import InfoBars from '../info/InfoBars';
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { log } from 'react-zlib-js';

export default function PickShablon({setShablon}) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');
  const [labelsData, setLabelsData] = React.useState({});
  const [flagShablon,setFlagShablon]=useState(false)
  const [textShablon,setTextShablon]=useState("")
  const [infoBars,setInfoBars]=useState(false)
  const [textResp,setTextResp]=useState("")
  const [dataForDelete,setDataForDelete]=useState([])
  const [user,setUser]=useState('')
  // const labelsData = {
  //   sh0:'None',
  //   sh1: "Шановний абонент! Зв*язок по лінії відновлено, у разі виникнення запитань звертайтесь за нашими номерами: 0997043200, 0977043200",
  //   sh2: "Шановний абонент! Наразі у Вашому напрямку сталось аварійне відключення. Ведуться аварійно-відновлювальні роботи, постараємось відновити зв’язок по лінії в найкоротші терміни. Перепрошуємо, за тимчасові незручності.",
  //   sh3: "Шановний абонент! У зв*язку з великим навантаженням не вдалось прийняти Ваш дзвінок, наразі лінію відновлено, якщо Ваше питання/проблема не вирішена зателефонуйте будь ласка ще раз або напишіть нам на месенджери. Деталі: 0997043200",
  //   sh4: "Шановний абонент! Ваш рахунок відкореговано, послуга доступна до кінця ххх Деталі: 0997043200 ",
  //   sh5: "Шановний абонент! За Вашим зверненням рахунок відкореговано, для користування у ххх потрібно доплатити ххх грн. В подальшому будьте обачні при оплаті, Ваш логін: [log]",
  //   sh6: "Шановний абонент! За Вашим зверненням рахунок відкореговано, для користування у ххх потрібно доплатити ххх грн. В подальшому якщо не користуєтесь послугою звертайтесь до нас для призупинення (мінімальний термін від 30 днів)",
  //   sh7: "Шановний абонент!По Вашій адресі протягом тижня буде проводитись модернізація лінії та заміна абонентського кабелю. Деталі 0997043200",
  //   sh8: "Тех підтримка: 0997043200 0977043200. Або напишіть нам на месенджери: telegram - t.me/Intelektisp_bot viber - 0997043200",

  // };

  

  async function fetchData() {
    try {
    
      const resp = await axios.get('https://sms.multiprovider.info/api/getShablons');
      const respCreator = await axios.get(`https://sms.multiprovider.info/api/getShabCreator?creator=${user}`);
      console.log(respCreator.data);
      const lData = {};
      
      resp.data.forEach((e, i) => {
        lData[`sh${i}`] = e.text;
      });
    
      lData[`sh0`] = 'None';
      setLabelsData(lData);
      setDataForDelete(respCreator.data)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
  let    cookieData = Cookies.get('login');
  setUser(cookieData)
    fetchData()
  },[open])
function checkDelete(date) {
 
  let flag=false
  if(user=="kam"||user=="vlad_b"|| user=="sasha_v") return true
  dataForDelete.forEach(e=>{
    console.log(e.text);
    if(e.text==date) flag=true
  })  
  return flag
}

  function showInfo(text){
    setTextResp(text)
    setInfoBars(true)
  }
const handleAdd= async(e)=>{
  e.preventDefault()
  let res=await axios.get(`https://sms.multiprovider.info/api/addShablon?shablon=${textShablon}&creator=${user}`)
  if(res.data==true){
 setFlagShablon(false)
 setTextShablon("")
 await fetchData()
 showInfo("Шаблон успішно доданий")
  }

}
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if(event.target.value!='sh0')
    setShablon(labelsData[event.target.value])
    else setShablon('')
    
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
const handleDelete =async (e)=>{
  let id=e.currentTarget.id
  let res=await axios.get(`https://sms.multiprovider.info/api/deleteShablon?text=${id}&creator=${user}`)
  if(res.data==true){
 setFlagShablon(false)
 setTextShablon("")
 await fetchData()
 showInfo("Шаблон успішно видалений")
  }else {
    showInfo("шаблон не  видалений")

  }
}
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
       <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
      <Button variant="outlined" onClick={handleClickOpen}>
        Шаблони sms
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Шаблони sms   <Button onClick={()=>setFlagShablon(!flagShablon)} variant='outlined'>Додати власний шаблон</Button></DialogTitle>
      
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
          {flagShablon&& <div className='flex justify-between'>
            <TextField
                      multiline
                      maxRows={40}
            // onKeyDown={(e)=> {  if (event.key === 'Enter') e.preventDefault()}}
            className='w-[700px]'           
            variant="standard"
            label="Введіть текст шаблону"
            value={textShablon}
            onChange={(e)=>setTextShablon(e.currentTarget.value)}
           />
           {
            textShablon.length==0? <Button disabled  >Add</Button>: <Button onClick={handleAdd} >Add</Button>
           }
          
           </div>

           }
          
          {Object.keys(labelsData).map((value,i) => (
            <div className='flex items-center  border-b' key={i}>
              <div className=' mt-2 p-2'>
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={labelsData[value]}
              className='mt-2 shadow-slate-600	'
            /> </div>
            {/* {console.log(labelsData[value])} */}
            {
          
            checkDelete(labelsData[value])&&
              <IconButton onClick={handleDelete} id={labelsData[value]} aria-label="delete" size="large">
              <DeleteIcon />
            </IconButton>
            }
      
           </div>
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