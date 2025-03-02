import React, { useState, useEffect } from 'react';
import axios from "axios"
import Radio from '@mui/material/Radio'; 
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';
import { Autocomplete, Button, Input, Switch, TextField, Typography } from '@mui/material';
import InfoBars from '../info/InfoBars';
import options from './options';
import AntSwitch from './AntSwitch';
import DialogShow from '../dialog/DialogShow';
import InfoIcon from '@mui/icons-material/Info';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from "copy-to-clipboard";
import { useProvider } from '../../ProviderContext';

function FilterRadioGroup({ group, setGroup, countFindNumbers, setCountFindNumvers, checkedLog, setCheckedLog, setListOfSms, setListOfUser, value, setValue, tarNumbers, setTarNumbers, ipAddress, setIpAddress, setLoading, setNumbers, ipAddressOLT, setIpAddressOLT, sfpSelect, setSfpSelect}) {
  const { currentBrand } = useProvider(); // Отримуємо поточного провайдера з контексту

  const [infoBars, setInfoBars] = useState(false)
  const [open, setOpen] = useState(false)
  const [textResp, setTextResp] = useState("")
  const [valueAddress, setValueAddress] = useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [budId, setBudId] = useState('')
  const [checked, setChecked] = React.useState(false);
  const [loginText, setLoginText] = useState('')
  const [listTariffLogin, setListTariffLogin] = useState("")
  const [listGroupLogin, setListGroupLogin] = useState("")

  function showInfo(text) {
    setTextResp(text)
    setInfoBars(true)
  }

  function keepOnlyNumbers(inputString) {
    return inputString.replace(/[^0-9]/g, '');
  }

  const getDataById = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true);

      const response = await axios.post('https://sms.multiprovider.info/api/getById', {
        id: tarNumbers,
        provider:currentBrand?.name
      });
      if(response.data.length>0) {
        let resp = response.data.map(e => {
          if (e.contacts.value.startsWith('0')) {
            e.tel = keepOnlyNumbers('38'+e.contacts.value)
            return keepOnlyNumbers('38'+e.contacts.value)
          } else if (e.contacts.value.startsWith('8')) {
            e.tel = keepOnlyNumbers('3'+e.contacts.value)
            return keepOnlyNumbers('3'+e.contacts.value)
          }
          e.tel = keepOnlyNumbers(e.contacts.value)
          return keepOnlyNumbers(e.contacts.value)
        })
        let respLog = response.data.map(e => {
          return e.id
        })
        setCountFindNumvers(resp.length)
        showInfo(`Знайдено ${resp.length} номерів телефонів`)
        setListOfUser(response.data)
        setListTariffLogin(respLog.join('\n'))
        setNumbers(resp.join('\n'));
      } else {
        showInfo('За вказаним номером тарифного плану немає жодного користувача')
        setListOfUser([])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByIPSwitches = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true);

      const response = await axios.get('https://sms.multiprovider.info/api/switchNumbers', {
        params: {
          ip: ipAddress,
          provider:currentBrand?.name

        }
      });
      if(response.data.length>0) {
        let resp = response.data.map(e => {
          if (e.contacts.value.startsWith('0')) {
            e.tel = keepOnlyNumbers('38'+e.contacts.value)
            return keepOnlyNumbers('38'+e.contacts.value)
          } else if (e.contacts.value.startsWith('8')) {
            e.tel = keepOnlyNumbers('3'+e.contacts.value)
            return keepOnlyNumbers('3'+e.contacts.value)
          }
          e.tel = keepOnlyNumbers(e.contacts.value)
          return keepOnlyNumbers(e.contacts.value)
        })
        setCountFindNumvers(resp.length)
        showInfo(`Знайдено ${resp.length} номерів телефонів`)
        setListOfUser(response.data)
        setNumbers(resp.join('\n'));
      } else {
        showInfo('За вказаною ip свіча немає жодного користувача')
        setListOfUser([])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByGroup = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true);

      const response = await axios.post('https://sms.multiprovider.info/api/getByGroup', {
        group: group,
        provider:currentBrand?.name

      });
      if(response.data.length>0) {
        let resp = response.data.map(e => {
          if (e.contacts.value.startsWith('0')) {
            e.tel = keepOnlyNumbers('38'+e.contacts.value)
            return keepOnlyNumbers('38'+e.contacts.value)
          } else if (e.contacts.value.startsWith('8')) {
            e.tel = keepOnlyNumbers('3'+e.contacts.value)
            return keepOnlyNumbers('3'+e.contacts.value)
          }
          e.tel = keepOnlyNumbers(e.contacts.value)
          return keepOnlyNumbers(e.contacts.value)
        })
        let respLog = response.data.map(e => {
          return e.id
        })
        setCountFindNumvers(resp.length)
        showInfo(`Знайдено ${resp.length} номерів телефонів`)
        setListOfUser(response.data)
        setListGroupLogin(respLog.join('\n'))
        setNumbers(resp.join('\n'));
      } else {
        showInfo('За вказаною групою немає жодного користувача')
        setListOfUser([])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByIPOLTAll = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true);
      function isDateFormatValid(dateString) {
        const datePattern = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;
        return datePattern.test(dateString);
      }
      let response
      
      if(!isDateFormatValid(loginText)) {
        response = await axios.get('https://sms.multiprovider.info/api/oltNumbersAll', {
          params: {
            ip: ipAddressOLT,
            sfp: sfpSelect,
            login: loginText,
            provider:currentBrand?.name

          }
        });
      } else {
        response = await axios.get('https://sms.multiprovider.info/api/oltNumbersAll', {
          params: {
            ip: ipAddressOLT,
            sfp: sfpSelect,
            last_date: loginText,
            provider:currentBrand?.name

          }
        });
      }
      if(response.data.length>0) {
        let resp = response.data.map(e => {
          if (e.contacts.value.startsWith('0')) {
            e.tel = keepOnlyNumbers('38'+e.contacts.value)
            return keepOnlyNumbers('38'+e.contacts.value)
          } else if (e.contacts.value.startsWith('8')) {
            e.tel = keepOnlyNumbers('3'+e.contacts.value)
            return keepOnlyNumbers('3'+e.contacts.value)
          }
          e.tel = keepOnlyNumbers(e.contacts.value)
          return keepOnlyNumbers(e.contacts.value)
        })
        setCountFindNumvers(resp.length)
        showInfo(`Знайдено ${resp.length} номерів телефонів`)
        setListOfUser(response.data)
        setNumbers(resp.join('\n'));
      } else {
        showInfo('За ip немає жодного абонента')
        setListOfUser([])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByIPOLTSFP = async () => {
    function isDateFormatValid(dateString) {
      const datePattern = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/;
      return datePattern.test(dateString);
    }
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true);
      let response;
      if(!isDateFormatValid(loginText)) {
        response = await axios.get('https://sms.multiprovider.info/api/oltNumbers', {
          params: {
            ip: ipAddressOLT,
            sfp: sfpSelect,
            login: loginText,
            provider:currentBrand?.name

          }
        });
      } else {
        response = await axios.get('https://sms.multiprovider.info/api/oltNumbers', {
          params: {
            ip: ipAddressOLT,
            sfp: sfpSelect,
            last_date: loginText,
            provider:currentBrand?.name

          }
        });
      }
      if(response.data.length>0) {
        let resp = response.data.map(e => {
          if (e.contacts.value.startsWith('0')) {
            e.tel = keepOnlyNumbers('38'+e.contacts.value)
            return keepOnlyNumbers('38'+e.contacts.value)
          } else if (e.contacts.value.startsWith('8')) {
            e.tel = keepOnlyNumbers('3'+e.contacts.value)
            return keepOnlyNumbers('3'+e.contacts.value)
          }
          e.tel = keepOnlyNumbers(e.contacts.value)
          return keepOnlyNumbers(e.contacts.value)
        })
        setCountFindNumvers(resp.length)
        showInfo(`Знайдено ${resp.length} номерів телефонів`)
        setListOfUser(response.data)
        setNumbers(resp.join('\n'));
      } else {
        showInfo('За ip немає жодного абонента')
        setListOfUser([])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDataByAddress = async () => {
    try {
      setNumbers('')
      setListOfSms([])
      setLoading(true);

      const response = await axios.get('https://sms.multiprovider.info/api/addressNumbers', {
        params: {
          budId: budId,
          address: valueAddress,
          provider:currentBrand?.name

        }
      });
      if(response.data.length>0) {
        let resp = response.data.map(e => {
          if (e.contacts.value.startsWith('0')) {
            e.tel = keepOnlyNumbers('38'+e.contacts.value)
            return keepOnlyNumbers('38'+e.contacts.value)
          } else if (e.contacts.value.startsWith('8')) {
            e.tel = keepOnlyNumbers('3'+e.contacts.value)
            return keepOnlyNumbers('3'+e.contacts.value)
          }
          e.tel = keepOnlyNumbers(e.contacts.value)
          return keepOnlyNumbers(e.contacts.value)
        })
        setCountFindNumvers(resp.length)
        showInfo(`Знайдено ${resp.length} номерів телефонів`)
        setListOfUser(response.data)
        setNumbers(resp.join('\n'));
      } else {
        showInfo('За ip немає жодного абонента')
        setListOfUser([])
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIpOLT = (event) => {
    setIpAddressOLT(event.target.value);
  }

  const handleSFP = (event) => {
    setSfpSelect(event.target.value)
  }

  const handleChange = (event) => {
    setCountFindNumvers(0)
    setValue(event.target.value);
    setCheckedLog(false)
    setNumbers('')
    setListOfSms([])
  };

  const handleNumbers = (event) => {
    setTarNumbers(event.target.value);
  };

  const handleIp = (event) => {
    setIpAddress(event.target.value);
  };

  const handleGroup = (event) => {
    setGroup(event.target.value);
  };
  
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && value=="tariff") {
      event.preventDefault();
      setLoading(true)
      await getDataById(tarNumbers)
    }
  };

  const handleKeyDownSwitches = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLoading(true)
      await getDataByIPSwitches(ipAddress)
    }
  };

  const handleKeyDownOLT = async (event) => {
    if (event.key === 'Enter' && ipAddressOLT!='') {
      event.preventDefault();
      setSfpSelect("")
      setLoading(true)
      await getDataByIPOLTAll(ipAddressOLT)
    }
  }

  const handleKeyDownOLTSFP = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(sfpSelect=="") {
        showInfo("Введіть сфп, приклад: 1-16")
        return
      }
      setLoading(true)
      await getDataByIPOLTSFP(ipAddressOLT,sfpSelect)
    }
  }

  const handleKeyDownAdressBudId = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(budId=="") {
        showInfo("Введіть номер будинку")
        return
      }
      setLoading(true)
      await getDataByAddress(valueAddress,budId)
    }
  }

  const handleKeyDownAdressBudId1 = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setLoading(true)
      await getDataByAddress(valueAddress,budId)
    }
  }

  const handleGetNumbersByAddress = async (event) => {
    event.preventDefault();
    setLoading(true)
    await getDataByAddress(valueAddress,budId)
  }

  const handleCopyTariffLogins = async (event) => {
    event.preventDefault();
    let isCopy = copy(listTariffLogin);
    if (isCopy) {
      showInfo('Логіни скопіювано у буфер обміну')
    } else {
      showInfo('Помилка при копіюванні у буфер обміну')
    }
  }

  const handleCopyGroupLogins = async (event) => {
    event.preventDefault();
    let isCopy = copy(listGroupLogin);
    if (isCopy) {
      showInfo('Логіни скопіювано у буфер обміну')
    } else {
      showInfo('Помилка при копіюванні у буфер обміну')
    }
  }

  const handleGetNumbersByTariff = async (event) => {
    event.preventDefault();
    setLoading(true)
    await getDataById(tarNumbers)
  }

  const handleGetNumbersBySwitch = async (event) => {
    event.preventDefault();
    setLoading(true)
    await getDataByIPSwitches(ipAddress)
  }
  
  const handleGetNumbersByGroup = async (event) => {
    event.preventDefault();
    setLoading(true)
    await getDataByGroup(group.trim())
  }

  const handleChangeCheck = (event) => {
    event.preventDefault();
    setChecked(event.target.checked);
  };

  const handleChangeCheckLog = (event) => {
    event.preventDefault();
    setNumbers('')
    setListOfSms([])
    setCheckedLog(event.target.checked);
  };

  const handleGetNumbersByOLT = async (event) => {
    setListOfSms([])
    setNumbers('')
    event.preventDefault();
    if(sfpSelect=="" && checked==true) {
      showInfo("Введіть сфп, приклад: 1-16")
      return
    }
    if (checked==true) {
      setLoading(true)
      await getDataByIPOLTSFP(ipAddressOLT,sfpSelect)
    } else {
      setSfpSelect("")
      setLoading(true)
      await getDataByIPOLTAll(ipAddressOLT)
    }
  }

  return (
    <FormControl className='flex justify-center'>
      <InfoBars open={infoBars} setOpen={setInfoBars} text={textResp} />
      <FormLabel id="demo-controlled-radio-buttons-group">Вибрати номери телефонів</FormLabel>
      <Typography 
          className="text-sm font-medium"
          style={{ color: currentBrand?.color }}
        >
          Провайдер: {currentBrand?.name}
        </Typography>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        row
        onChange={handleChange}
        className='flex'
      >
        <FormControlLabel className='text' value="none" control={<Radio />} label="Вручну" />
        <FormControlLabel className='text' value="tariff" control={<Radio />} label="Тариф" />
        <FormControlLabel value="olt" control={<Radio />} label="ОЛТ" />
        <FormControlLabel value="switches" control={<Radio />} label="Комутатор" />
        <FormControlLabel value="adress" control={<Radio />} label="Адреса" />
        <FormControlLabel value="group" control={<Radio />} label="Група" />
      </RadioGroup>
      <div className='flex'>
        {value=='none' && 
          <div className=''>
            <div className='flex items-center'>
              <div className='mr-2'><Typography>Номери телефонів</Typography></div>
              <AntSwitch onChange={handleChangeCheckLog} checked={checkedLog} size='xl' />
              <div className='ml-2'><Typography>Логіни</Typography></div>
            </div>
          </div>
        }
        {value=='tariff' && 
          <div className=''>
            <TextField
              id="filled-multiline-static"
              label="Введіть номер тарифного плану"
              type='number'
              style={{width:'260px'}}
              value={tarNumbers}
              onChange={handleNumbers}
              onKeyDown={handleKeyDown}
            />
            <div className=' mb-2 flex items-center align-center '>
              <Button onClick={handleGetNumbersByTariff} variant="outlined">Витягнути номера телефонів</Button>
              {listTariffLogin.length!==0 && 
                <ContentCopyIcon className='cursor-pointer' onClick={handleCopyTariffLogins}/>
              }
            </div>
          </div>
        }
        {value=="group" && 
          <div>
            <TextField
              id="filled-multiline-static"
              label="Введіть номер групи"
              type='text'
              style={{width:'260px'}}
              value={group}
              onChange={handleGroup}
            />
            <div className='mb-2 flex items-center align-center gap-x-2'>
              <Button onClick={handleGetNumbersByGroup} variant="outlined">Витягнути номера телефонів</Button>
              {listGroupLogin.length!==0 && 
                <ContentCopyIcon className='cursor-pointer' onClick={handleCopyGroupLogins}/>
              }
            </div>
          </div>
        }
        {value=='switches' && 
          <div>
            <TextField
              id="filled-multiline-static"
              label="Введіть ip обладнання"
              type='text'
              style={{width:'260px'}}
              value={ipAddress}
              onChange={handleIp}
              onKeyDown={handleKeyDownSwitches}
            />
            <div className=' mb-2'>
              <Button onClick={handleGetNumbersBySwitch} variant="outlined">Витягнути номера телефонів</Button>
            </div>
          </div>
        }
        {value=='olt' && 
          <div className='flex flex-col'>
            <div>
              <TextField
                id="filled-multiline-static"
                label="Введіть ip обладнання"
                type='text'
                style={{width:'260px'}}
                value={ipAddressOLT}
                onChange={handleIpOLT}
                onKeyDown={handleKeyDownOLT}
              />
              <Switch
                checked={checked}
                onChange={handleChangeCheck}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <DialogShow open={open} setOpen={setOpen} text={`
                За потреби можна просписати логін абонента, тоді з сфп витягнуться абоненти які одночасно перестали працювати разом з ним,
                корисно коли відпала не вся сфп, також можна записати Дата оновлення з юзера формат дати 11.12.2023 07:25, це поле може бути і пустим.
              `}/>
            </div>
            {checked && 
              <TextField
                id="filled-multiline-static"
                label="Введіть sfp"
                type='number'
                style={{width:'260px'}}
                value={sfpSelect}
                onChange={handleSFP}
                onKeyDown={handleKeyDownOLTSFP}
              />
            }
            <TextField
              id="filled-multiline-static"
              label="фільтрувати по логіну / даті оновлення, необов'язкове поле"
              type='text'
              style={{width:'260px'}}
              value={loginText}
              onChange={(e)=>setLoginText(e.target.value)}
            />
            <div className=" mb-2">
              <Button onClick={handleGetNumbersByOLT} variant="outlined">Витягнути номера телефонів</Button>
              <Button startIcon={<InfoIcon/>} onClick={()=>setOpen(true)} variant="outlined">Інф.</Button>
            </div>
          </div>
        }
        {value=='adress' && 
          <div>
            <Autocomplete
              value={valueAddress}
              onChange={(event, newValue) => {
                setValueAddress(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: 400 }}
              renderInput={(params) => <TextField {...params} label="Введіть адресу" />}
              onKeyDown={handleKeyDownAdressBudId1}
            />
            <TextField
              id="filled-multiline-static"
              label="Введіть номер будинку якщо потрібно"
              type='text'
              style={{width:'50'}}
              value={budId}
              onChange={(e)=>setBudId(e.target.value)}
              onKeyDown={handleKeyDownAdressBudId}
            />
            <div className=' mb-2'>
              <Button onClick={handleGetNumbersByAddress} variant="outlined">Витягнути номера телефонів</Button>
            </div>
          </div>
        }
      </div>
    </FormControl>
  )
}

export default FilterRadioGroup