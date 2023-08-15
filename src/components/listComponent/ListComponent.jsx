import React from 'react'
import ListItem from './ListItem'

function ListComponent({smsList,width=600}) {
    // {
    //     login,
    //     message,
    //     Date
    //     typeSender=false,success=true
    // }
  return (
	 <div className="w-[600px]  mt-20 pl-4  h-full flex flex-col rounded-xl" >
                    <div class="bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300">
                        Tracking sms ( {smsList.length} )
                    </div>
                    <div class="w-full h-60 overflow-auto shadow bg-slate-200" id="journal-scroll">
                    <table class="w-full">
                        <tbody class="">
                            {smsList.length>0?
                            smsList.map(e=>{
                                return <ListItem  key={e.login} login={e.id} textMessage={e.sms} typeSender={e.type=='sms'?false:true} num={e.tel} />
                            })
                            :""}
                        
                         </tbody>
                    </table>
                    </div>
                    
                    
                </div>

  )
}

export default ListComponent