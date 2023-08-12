import React from 'react'

export default function ListItem({login="testlogin",textMessage="default sms",date="7:25",typeSender=false,success=true,num}) {
    function formatTime(hours, minutes) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

   const typeSms=typeSender==true? <div class="leading-1 text-blue-900 font-bold">TELEGRAM BOT</div>: <div class="leading-1 text-blue-600 font-bold">TURBO SMS</div>
  return (
    <tr class="relative  transform scale-100 text-xs py-1 border-b-2 border-blue-100 cursor-default ">
    <td class="pl-5 pr-3 whitespace-no-wrap">
        <div class="text-gray-400">Today</div>
        <div>{formatTime(currentHour, currentMinute)}</div>
    </td>
      <td class="px-2 py-2 whitespace-no-wrap">
         <div class="leading-5 text-gray-500 font-medium">{login} ({num})</div>
         {typeSms}
         <div class="leading-4 text-gray-800">{textMessage}</div>
      </td>
      
   </tr> 
  )
}
