import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { Download, BarChart2 } from 'lucide-react';
import { useProvider } from '../../ProviderContext';
import { createPortal } from 'react-dom';
import DownloadIcon from '@mui/icons-material/Download';
import FilterHistory from '../groupRadioButton/FilterHistory';
import InfoBars from '../info/InfoBars';
import LoaderData from '../loaderData/LoaderData';
import ListHistoryComponent from '../listComponent/ListHistoryComponent';
import ModalChart from '../chart/ModalChart';
import "react-datepicker/dist/react-datepicker.css";

export default function HistoryPage() {
  const { currentBrand } = useProvider();
  const [user, setUser] = useState("");
  const [dataForChart, setDataForChart] = useState([]);
  const [smsList, setSmsList] = useState("");
  const [filteredValue, setFilteredValue] = useState("all");
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [adminSearch, setAdminSearch] = useState("");
  const [abonSearch, setAbonSearch] = useState("");
  const [telSearch, setTelSearch] = useState("");
  const [infoBars, setInfoBars] = useState(false);
  const [textResp, setTextResp] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countSMS, setCountSms] = useState({ sms: 0, bot: 0 });

  function showInfo(text) {
    setTextResp(text);
    setInfoBars(true);
  }

  const handleGraphOpen = async () => {
    try {
      const response = await axios.post('http://194.8.147.138:3001/getDateForChart', {
        startDate: selectedDate,
        endDate: selectedDateEnd
      });
      const responseData = response.data;
      setDataForChart(responseData);
      
      let countSmss = 0;
      let countBot = 0;
      responseData.forEach(element => {
        countSmss += element.sms;
        countBot += element.telegram;
      });
      
      setCountSms({ sms: countSmss, bot: countBot });
      setShowChart(!showChart);
    } catch (error) {
      console.error('Помилка під час запиту до сервера:', error);
    }
  };

  async function handleDownloadDate() {
    setLoading(true);
    try {
      const response = await axios.get('http://194.8.147.138:3001/download', {
        responseType: 'blob',
      });
      setLoading(false);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'messages.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  async function handleDateChange() {
    if (filteredValue === "all") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByDates", {
        startDate: selectedDate,
        endDate: selectedDateEnd
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
    if (filteredValue === "opticom") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByOpticom", {
        startDate: selectedDate,
        endDate: selectedDateEnd
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
    if (filteredValue === "opensvit") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByOpensvit", {
        startDate: selectedDate,
        endDate: selectedDateEnd
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
    if (filteredValue === "admin") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByAdmin", {
        startDate: selectedDate,
        endDate: selectedDateEnd,
        admin: adminSearch
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
    if (filteredValue === "abon") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByAbon", {
        abonName: abonSearch,
        abonNumber: telSearch
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
    if (filteredValue === "telegram") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByTelegram", {
        startDate: selectedDate,
        endDate: selectedDateEnd
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
    if (filteredValue === "sms") {
      setSmsList([]);
      setLoading(true);
      const data = await axios.post("http://194.8.147.138:3001/getHistoryByTurbo", {
        startDate: selectedDate,
        endDate: selectedDateEnd
      });
      setLoading(false);
      showInfo(`Знайдено ${data.data.length} записів`);
      setSmsList(data.data);
    }
  }

  useEffect(() => {
    const cookieData = Cookies.get('login');
    if (!cookieData) {
      navigate("/login");
    }
    setUser(cookieData);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {loading && <LoaderData />}
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
          Історія відправлених смс
        
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Filters */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <FilterHistory 
                value={filteredValue} 
                setValue={setFilteredValue}
                brandColor={currentBrand.color}
              />
              
              <Button 
                onClick={handleGraphOpen}
                variant="contained"
                fullWidth
                style={{ 
                  backgroundColor: currentBrand.color,
                  marginTop: '1rem'
                }}
              >
                <BarChart2 size={20} className="mr-2" />
                Подивитись графік
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Початкова дата</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat="dd.MM.yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="w-full p-3 rounded-lg border bg-white text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Кінцева дата</label>
                  <DatePicker
                    selected={selectedDateEnd}
                    onChange={date => setSelectedDateEnd(date)}
                    showTimeSelect
                    dateFormat="dd.MM.yyyy HH:mm"
                    timeFormat="HH:mm"
                    className="w-full p-3 rounded-lg border bg-white text-lg"
                  />
                </div>
              </div>

              {filteredValue === "admin" && (
                <TextField
                  fullWidth
                  label="Введіть логін адміністратора"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  variant="outlined"
                />
              )}

              {filteredValue === "abon" && (
                <div className="space-y-4">
                  <TextField
                    fullWidth
                    label="Введіть логін абонента"
                    value={abonSearch}
                    onChange={(e) => setAbonSearch(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Введіть номер телефону"
                    value={telSearch}
                    onChange={(e) => setTelSearch(e.target.value)}
                    variant="outlined"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  variant="outlined"
                  onClick={handleDateChange}
                  style={{ 
                    borderColor: currentBrand.color,
                    color: currentBrand.color
                  }}
                >
                  Пошук
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDownloadDate}
                  endIcon={<DownloadIcon />}
                  style={{ 
                    borderColor: currentBrand.color,
                    color: currentBrand.color
                  }}
                >
                  Завантажити
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow">
              <ListHistoryComponent smsList={smsList} />
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <ModalChart 
          open={showChart} 
          setOpen={setShowChart} 
          dataForChart={dataForChart} 
          countSMS={countSMS}
          brandColor={currentBrand.color}
        />,
        document.body
      )}

      <InfoBars 
        open={infoBars} 
        setOpen={setInfoBars} 
        text={textResp} 
      />
    </div>
  );
}