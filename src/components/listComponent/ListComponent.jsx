import React from 'react';
import ListItem from './ListItem';
import { useProvider } from '../../ProviderContext';

function ListComponent({smsList}) {
  const { currentBrand } = useProvider();

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-medium text-gray-700">
          Tracking sms ({smsList.length})
        </h3>
        {smsList.length > 0 && (
          <span 
            className="px-2 py-1 text-sm rounded-full" 
            style={{ 
              backgroundColor: `${currentBrand.color}15`,
              color: currentBrand.color 
            }}
          >
            Active
          </span>
        )}
      </div>

      <div className="h-[240px] overflow-auto bg-slate-50 rounded-b-xl" id="journal-scroll">
        <table className="w-full">
          <tbody>
            {smsList.length > 0 ? 
              smsList.map((e, i) => (
                <ListItem 
                  key={i}
                  login={e.id}
                  textMessage={e.sms}
                  typeSender={e.type}
                  num={e.tel}
                  // provider={currentBrand}
                  
                />
              )) 
              : null
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListComponent;