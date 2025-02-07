import React from 'react';
import ListItemStatus from './ListItemStatus';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function ListHistoryComponent({smsList}) {
  return (
    <div className="w-full lg:max-w-5xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="bg-zinc-800 text-white px-4 py-3 rounded-t-xl">
        <h3 className="text-lg font-medium">
          Tracking sms ({smsList.length})
        </h3>
      </div>
      
      <div className="h-[600px] overflow-auto bg-slate-50" id="journal-scroll">
        <table className="w-full">
          <tbody>
            <TransitionGroup component={null}>
              {smsList.length > 0 ? (
                smsList.map(e => (
                  <CSSTransition 
                    key={e._id} 
                    timeout={500} 
                    classNames="fade"
                  >
                    <ListItemStatus 
                      login={e.login}
                      sender={e.sender_sms}
                      chat_id={e.chat_id}
                      text_message={e.text_message}
                      datetime={e.datetime}
                      type_send={e.type_send === 'sms' ? false : true}
                      phone_number={e.phone_number}
                      provider={e.provider}
                    />
                  </CSSTransition>
                ))
              ) : null}
            </TransitionGroup>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListHistoryComponent;