import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { log } from 'react-zlib-js';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalChart({open,setOpen,dataForChart}) {
 
   
  
// React.useEffect(()=>{
  
//      function fetchData() {
//         try {
//           const response =  axios.post('http://194.8.147.150:3001/getDateForChart', {
//             startDate:"2023-08-23T13:09:09.000Z",
//             endDate:"2023-09-25T13:09:09.000Z"
//         }).then(response=>{
//             const responseData = response.data;
//             console.log(responseData);
//           setDataForChart(responseData);
//         })
  
//           // Отримані дані з сервера
        


//         } catch (error) {
//           console.error('Помилка під час запиту до сервера:', error);
//         }
//       }
//        fetchData()
// },[])
  const handleClose = () => setOpen(false);

  return (
    <div >
     
      <Modal
     className=''
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        
        slotProps={{
          backdrop: {
            timeout: 500,
           
          },
        }}
      >
        <Fade in={open} className=' border-none '>
          <Box sx={style}>
{
    dataForChart.length!=0?
    <LineChart
     
       
    xAxis={[
       {
         id: 'Years',
         data: dataForChart.map(e=>{
          
           return e.datetime
         }),
         scaleType: 'band',
         
         tickNumber:1
          
       },
     
     ]}
 series={[
   {
     data: dataForChart.map(e=>{
       return e.sms
     }),
   },
   {
       data: dataForChart.map(e=>{
         return e.telegram
       }),
     },

 ]}
width={500}
 height={400}
/>
    :<h1>No data</h1>
}
       
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}