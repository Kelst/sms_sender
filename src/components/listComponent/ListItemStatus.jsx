import React from 'react';

const ListItemStatus = ({
  login = "testlogin",
  chat_id = "",
  text_message = "default sms",
  datetime = "7:25",
  type_send,
  status,
  phone_number,
  sender,
  provider
}) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const formattedDateTime = formatDateTime(datetime);
  
  const MessageType = ({ isBot }) => (
    <div className={`
      px-3 py-1 rounded-full text-sm font-semibold
      ${isBot 
        ? 'bg-blue-100 text-blue-800' 
        : 'bg-purple-100 text-purple-800'
      }
      transition-all duration-300 hover:scale-105
    `}>
      {isBot ? 'TELEGRAM BOT' : 'TURBO SMS'}
    </div>
  );

  return (
    <div className="my-4 mx-2 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="p-6 space-y-4">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{formattedDateTime}</span>
              <span className="font-medium text-gray-700">від: {sender}</span>
            </div>
            <div className="text-sm text-gray-600">
              Провайдер: <span className="font-medium">{provider}</span>
            </div>
          </div>
          <MessageType isBot={type_send} />
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-800">{login}</span>
            <span className="text-gray-500">({phone_number})</span>
            {chat_id && (
              <span className="bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-600">
                telegram_id: {chat_id}
              </span>
            )}
          </div>

          {/* Message Text */}
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
            {text_message}
          </div>

          {/* Status Indicator - можна додати різні стани */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Доставлено</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemStatus;