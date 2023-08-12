import React from 'react'
import ListItem from './ListItem'
import ListItemStatus from './ListItemStatus'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
function ListStatusComponent({smsList,width=600}) {

  return (
	 <div className="w-[1200px]  mt-20 pl-4  h-full flex flex-col rounded-xl" >
                    <div class="bg-zinc-700 text-sm text-white text-center font-bold text-2xl px-5 py-2 shadow rounded-md border-gray-300">
                        Tracking sms ( {smsList.length} )
                    </div>
                    <div className="w-full h-[400px]  overflow-auto shadow  bg-slate-200" id="journal-scroll">
                    <table class="w-full ">
                        <tbody >
                            {smsList.length>0?
                            smsList.map(e=>{
                                return( 
                                    <CSSTransition key={e._id} timeout={500} classNames="fade">
                                    <ListItemStatus key={e._id} login={e.login} sender={e.sender_sms}  chat_id={e.chat_id} text_message={e.text_message} datetime={e.datetime} type_send={e.type_send=='sms'?false:true} phone_number={e.phone_number} />
                                   </CSSTransition>
                                )
                            })
                            :""}
                        
                         </tbody>
                    </table>
                    </div>
                    
                    
                </div>

  )
}

export default ListStatusComponent