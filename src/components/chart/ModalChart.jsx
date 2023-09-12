import * as React from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { log } from 'react-zlib-js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function createData(date, sms, telegram) {
  return { date, sms, telegram };
}
export default function ModalChart({open,setOpen,dataForChart,countSMS}) {
 
   
  
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
  

  return  (
    <div >
   
      <Modal
     className=' z-[-10]'
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
    <div className='flex flex-col  items-center justify-center'>
     
    <LineChart
   className=' z-auto'
     
   legend={{
    direction: "column",
    position: {
      vertical: "top",
      horizontal: "middle"
    }
  }}
    xAxis={[
       {
        position:"top",
         id: 'Years',
         data: dataForChart.map(e=>{
          
           return e.datetime
         }),
         scaleType: 'band',
         
         tickNumber:10
          
       },
     
     ]}
  
 series={[
   { label:`SMS (${countSMS.sms})`,
     data: dataForChart.map(e=>{
       return e.sms
     }),
     area:true,
    
     
   },
   {
    label:`TelegramBot (${countSMS.bot})`,
       data: dataForChart.map(e=>{
         return e.telegram
       }),
       area:true,
     
     },

 ]}
width={500}
 height={400}
/>

<div className=' h-[300px] overflow-auto  scroll-y-5'>
      <Table sx={{ minWidth: 650 ,height:100}} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">SMS TURBO</TableCell>
            <TableCell align="right">Telegram</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataForChart.map((row) => (
            <TableRow
              key={row.datetime}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
          
              <TableCell align="right">{row.datetime}</TableCell>
              <TableCell align="right">{row.sms}</TableCell>
              <TableCell align="right">{row.telegram}</TableCell>
    
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
  
    </div>

    :<h1>No data</h1>
}
       
          </Box>
        </Fade>
      </Modal>
    </div>

  );
}