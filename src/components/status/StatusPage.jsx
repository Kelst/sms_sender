import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useProvider } from '../../ProviderContext';
import ListStatusComponent from '../listComponent/ListStatusComponent';
import LoaderData from '../loaderData/LoaderData';
import InfoBars from '../info/InfoBars';

export default function StatusPage() {
  const { currentBrand } = useProvider();
  const [smsLists, setSmsLists] = useState([]);
  const [infoBars, setInfoBars] = useState(false);
  const [textResp, setTextResp] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalMessages, setTotalMessages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const listRef = useRef(null);

  const handleResend = async () => {
    try {
      const resp = await axios.get("http://sms.multiprovider.info/api/sendSms-api-to-user-again");
      showInfo(resp.data ? "Повторно передано на відправку" : "Помилка при повторному відправленні смс");
    } catch (error) {
      showInfo("Помилка при відправленні");
    }
  };

  const loadMoreMessages = () => {
    axios.get(`http://sms.multiprovider.info/api/messages?page=${currentPage + 1}`)
      .then(response => {
        setSmsLists(prev => [...prev, ...response.data.messages]);
        setCurrentPage(prev => prev + 1);
      })
      .catch(error => console.error('Error loading more messages:', error));
  };

  const showInfo = (text) => {
    setTextResp(text);
    setInfoBars(true);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreMessages();
    }
  };

  useEffect(() => {
    const cookieData = Cookies.get('login');
    if (!cookieData) {
      navigate("/login");
      return;
    }
    setUser(cookieData);

    const fetchInitialMessages = () => {
      axios.get(`http://sms.multiprovider.info/api/messages?page=1`)
        .then(response => {
          setSmsLists(response.data.messages);
          setTotalMessages(response.data.totalMessages);
        })
        .catch(error => console.error('Error loading initial messages:', error));
    };

    const fetchTotal = async () => {
      try {
        const total = await axios.get(`http://sms.multiprovider.info/api/totalSMS`);
        setTotalMessages(total.data.total);
      } catch (error) {
        console.error('Error fetching total:', error);
      }
    };

    fetchInitialMessages();
    
    const messageInterval = setInterval(fetchInitialMessages, 4000);
    const totalInterval = setInterval(fetchTotal, 1000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(totalInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {loading && <LoaderData />}
      
      <InfoBars 
        open={infoBars} 
        setOpen={setInfoBars} 
        text={textResp} 
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Перегляд відправки смс абонентам{' '}
            <span 
              className="px-3 py-1 rounded-full text-lg"
              style={{ 
                backgroundColor: `${currentBrand.color}15`,
                color: currentBrand.color 
              }}
            >
              {totalMessages}
            </span>
          </h1>

          {user === "vlad_b" && (
            <Button
              variant="outlined"
              onClick={handleResend}
              style={{ 
                borderColor: currentBrand.color,
                color: currentBrand.color
              }}
            >
              Resend
            </Button>
          )}
        </div>

        <div className="flex justify-center">
          <ListStatusComponent
            handleScroll={handleScroll}
            totalMessages={totalMessages}
            smsList={smsLists}
          />
        </div>
      </div>

      {infoBars && (
        <div 
          className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md animate-slide-up"
          style={{ borderLeft: `4px solid ${currentBrand.color}` }}
        >
          <p className="text-gray-700">{textResp}</p>
        </div>
      )}
    </div>
  );
}