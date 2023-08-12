import React, { useState } from 'react'

export default function ListItemStatus({login="testlogin",chat_id,text_message="default sms",datetime="7:25",type_send,status,phone_number,sender}) {

   useState(()=>{

    

   },[])
    
//     "_id": "64d398abd45f48a94e4d5c33",
//     "datetime": "2023-09-08T13:46:00.000Z",
//     "type_send": "sms",
//     "phone_number": "380504382998",
//     "chat_id": "",
//     "login": "dims",
//     "text_message": "Шановний абонент! За Вашим зверненням рахунок відкореговано, для користування у ххх потрібно доплатити ххх грн. В подальшому будьте обачні при оплаті, Ваш логін: dims",
//     "status": "pending",
//     "sender_sms": "test",
//     "__v": 0
//   },
const date = new Date(datetime);
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear();
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');

const formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

   const typeSms=type_send==true? <div class="leading-1 text-blue-900 font-bold">TELEGRAM BOT</div>: <div class="leading-1 text-blue-600 font-bold">TURBO SMS</div>
  return (
    <div className='mt-5 border-b-2 shadow-md pb-6  animate-pulse'>
    <tr class="relative  transform scale-100 text-xs  border-b-2 border-blue-100 cursor-default ">
    <td class="pl-5 pr-3 whitespace-no-wrap">
        <div className='font-bold text-xl'>{formattedDateTime} надіслав : {sender}</div>
    </td>
    
      <td class="px-2 py-2 whitespace-no-wrap">
         <div class="leading-5 text-gray-500 font-medium text-xl">{login} ({phone_number}) {chat_id!=""?`telegram_id: ${chat_id}`:''}  </div>
         {typeSms}
         <div class="leading-4 text-gray-800  text-lg h-6">{text_message}   </div>
         
      </td>
      
   </tr> 
   </div>
  )
}
