import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useProvider } from '../../ProviderContext';

function ListStatusComponent({smsList, totalMessages, handleScroll}) {
  const { currentBrand } = useProvider();
  const [animatingItems, setAnimatingItems] = useState(new Set());
  
  useEffect(() => {
    // Start animation for new messages
    const timer = setInterval(() => {
      if (smsList.length > 0) {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          // Find the first non-animating item
          const nextItem = smsList.find(item => !newSet.has(item._id));
          if (nextItem) {
            newSet.add(nextItem._id);
          }
          return newSet;
        });
      }
    }, 2000); // Start a new animation every 2 seconds

    return () => clearInterval(timer);
  }, [smsList]);

  const handleAnimationEnd = (id) => {
    setAnimatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return (
    <div className="w-full lg:max-w-5xl mx-auto bg-white rounded-xl shadow-sm">
      <div className="bg-zinc-800 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Tracking sms ({totalMessages})
        </h3>
        <span 
          className="px-3 py-1 rounded-full text-sm"
          style={{ backgroundColor: `${currentBrand.color}30` }}
        >
          Active
        </span>
      </div>
      
      <div 
        onScroll={handleScroll}
        className="h-[600px] overflow-auto bg-slate-50 rounded-b-xl" 
        id="journal-scroll"
      >
        <table className="w-full">
          <tbody>
            <TransitionGroup component={null}>
              {smsList.map(item => (
                <CSSTransition 
                  key={item._id}
                  timeout={2000}
                  classNames={{
                    enter: 'transition-all duration-500 ease-in-out',
                    enterActive: 'opacity-100 scale-100',
                    exit: 'transition-all duration-2000 ease-in-out',
                    exitActive: 'opacity-0 scale-110'
                  }}
                  onExited={() => handleAnimationEnd(item._id)}
                >
                  <tr 
                    className={`relative transition-all duration-2000 ease-in-out
                      ${animatingItems.has(item._id) ? 'animate-fade-scale-out' : ''}`}
                  >
                    <td className="p-4 border-b border-slate-100">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {item.sender_sms}
                          </p>
                          <p className="text-sm text-slate-500">
                            {item.text_message}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            {new Date(item.datetime).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-slate-400">
                            {item.phone_number}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListStatusComponent;
