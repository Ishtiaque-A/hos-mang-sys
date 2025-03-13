import './Reminders.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';

import Autocomplete from '@mui/material/Autocomplete';

const Reminders = (props) => {

  const [reminderReasons, setReminderReasons] = useState([])
  const [allDoctors, setAllDoctors] = useState([]);

  const [allLocation, setAllLocation] = useState([]);

  const [dueBetween, setDueBetween] = React.useState(null);
  const [andDate, setAndDate] = React.useState(null);
  const [onDate, setOnDate] = React.useState(null);
  const [reason_id, setReason_id] = React.useState(null);
  const [dr_id, setDr_id] = React.useState(null);
  const [location_id, setLocation_id] = React.useState(null);
  const [inactive_patient, setInactive_patient] = React.useState(null);
  const [overrude_reminder, setOverrude_reminder] = React.useState(null);
  const [details, setDetails] = React.useState(null);

  const [multipleChecked, setMultipleChecked] = useState({
    values: [],
  });

  const handleReminderReason = (e) => {
    setReason_id(e.target.value)

  }
  const handleDoctorId = (e) => {
    setDr_id(e.target.value)

  }

  const handleLocationId = (e) => {
    setLocation_id(e.target.value)
  }


  const handleInactivePatient = (e) => {
    if (e.target.checked) {
      setInactive_patient(true)

    }
    else {
      setInactive_patient(false)

    }
  }


  const handleOverRudeReminder = (e) => {
    if (e.target.checked) {
      setOverrude_reminder(true)

    }
    else {
      setOverrude_reminder(false)

    }
  }

  const handleDetails = (e) => {
    setDetails(e.target.value)
  }

  const handleMultipleCheckBox = (e) => {
    const { values } = multipleChecked;
    const { value, checked } = e.target;


    if (checked) {
      setMultipleChecked({
        values: [...values, value]
      })
    }
    else {
      setMultipleChecked({
        values: values.filter((e) => e !== value),
      })
    }
  }

  useEffect(() => {
    axios.get(`/reminder-reason`).then(res => {
      if (res.data.status === 200) {
        setReminderReasons(res.data.reminder_reason);
      }
    })
    axios.get(`/doctors`).then(res => {
      if (res.data.status === 200) {
        setAllDoctors(res.data.doctors);
      }
    })

    axios.get(`/usual-provider`).then(res => {
      if (res.data.status === 200) {
        setAllLocation(res.data.usual_provider);
      }
    })
  }, [])

  const reminderData = {
    reason_id: reason_id,
    dr_id: dr_id,
    location_id: location_id,
    dueBetween: dueBetween,
    andDate: andDate,
    onDate: onDate,
    details: details,
    inactive_patient: inactive_patient,
    overrude_reminder: overrude_reminder,
    multipleChecked: multipleChecked.values

  }

  const saveReminder = (e) => {
    e.preventDefault();

    axios.post(`/save-great-doc-reminder`, reminderData).then(res => {
      if (res.data.status === 200) {
        toast.success('Reminder Added Successfully')
      }
      setDueBetween(null);
      setAndDate(null);
      setOnDate(null);
      setReason_id('');
      setDr_id('');
      setLocation_id('');
      setDetails('');
      setDueBetween(null);
      document.getElementById('checkNo1').checked = false;
      document.getElementById('checkNo2').checked = false;
      document.getElementById('checkNo3').checked = false;
      document.getElementById('checkNo4').checked = false;
      document.getElementById('checkNo5').checked = false;
      document.getElementById('checkNo6').checked = false;

    });

  }

  return (
    <>
      <div className='reminder_container'>
        <div className='row ms-5'>
          <div className='col-4'>
          <label className='d-flex align-items-center'>
          <label className='me-3'>Select Reasons</label>
          <Autocomplete
            size="small" 
            className="w-50"
            disablePortal
            id="combo-box-demo"
            options={reminderReasons}
            getOptionLabel={(option) => option.reason_name}
            renderInput={(params) => <TextField {...params} label="Select Reason" />}
            />
          </label>
          </div>  
          <div className='col-4'>
            <label className='d-flex align-items-center'>
              <span className='me-2 ms-5'>Due Between</span>
              <FormControl variant="filled" size="small" className="w-50">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Between"
                    value={dueBetween}
                    onChange={(newValue) => {
                      setDueBetween(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                </LocalizationProvider>
              </FormControl>
            </label>
          </div>
          <div className='col-4'>
            <label className='d-flex align-items-center'>
              <span className='me-2 ms-5'>And</span>
              <FormControl variant="filled" size="small" className="w-50">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                    label="And"
                    value={andDate}
                    onChange={(newValue) => {
                      setAndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                </LocalizationProvider>
              </FormControl>
            </label>
          </div>
        </div>
        <div className='row mt-3 ms-5'>
          <div className='col-4'>
          <label className='d-flex align-items-center'>
          <label className='me-3'>Select Users</label>
          <Autocomplete
            size="small" 
            className="w-50 ms-3"
            style={{marginLeft:'-2px'}}
            disablePortal
            id="combo-box-demo"
            options={allDoctors}
            getOptionLabel={(option) => option.dr_given_name}
            renderInput={(params) => <TextField {...params} label="Select Users" />}
            />
          </label>
          </div>
          <div className='col-4'>
            <label className='d-flex align-items-center'>
              <span className='on_date ms-5'>On Date</span>
              <FormControl variant="filled" size="small" className="w-50">
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <DatePicker
                    label="On Date"
                    value={onDate}
                    onChange={(newValue) => {
                      setOnDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} size="small" />}
                  />
                </LocalizationProvider>
              </FormControl>
            </label>
          </div>
          <div className='days_months_weeks ms-5'>
            <input type="checkbox" id="checkNo1" name="" value="days" onChange={handleMultipleCheckBox} />
            <label for="" className='ms-3 me-4'>Days</label>
            <input type="checkbox" id="checkNo2" name="" value="month" onChange={handleMultipleCheckBox} />
            <label for="" className='ms-3'>Month</label> <br />
            <input type="checkbox" id="checkNo3" name="" value="weak" onChange={handleMultipleCheckBox} />
            <label for="" className='ms-3 me-4'>Weak</label>
            <input type="checkbox" id="checkNo4" name="" value="year" onChange={handleMultipleCheckBox} />
            <label for="" className='ms-3'>Year</label>
          </div>
        </div>
        <div className='row mt-3 locations_box'>
          <div className='col-6'>
          <label className='d-flex align-items-center'>
          <label className='me-3' style={{marginLeft:'54px'}}>Locations</label>
          <Autocomplete
            style={{width:'32%',marginLeft:'27px'}}
            size="small"
            disablePortal
            id="combo-box-demo"
            options={allLocation}
            getOptionLabel={(option) => option.usual_provider_name}
            renderInput={(params) => <TextField {...params} label="Locations" />}
            />
          </label>
          </div>
          <div className='col-5' style={{ marginLeft: '40px' }}>
            <div className='reminder_checkbox_container'>
              <input type="checkbox" id="checkNo5" name="" onChange={handleOverRudeReminder} value={overrude_reminder} />
              <label for="" className='ms-2'>Include overdue reminders</label> <br />
              <input type="checkbox" id="checkNo6" name="" onChange={handleInactivePatient} value={inactive_patient} />
              <label for="" className='ms-2'>Include inactive patients</label>
            </div>
          </div>
        </div>
        <div className='details_text_area'>
          <p>Add Details</p>
          <textarea id="" name="" rows="4" cols="" placeholder='Write here' className='details_text_box' value={details} onChange={handleDetails} style={{ width: '93%' }}>{details}</textarea>
        </div>
      </div>
      <div className='reminder_btn'>
        <button onClick={props.closeRemindarModal} className='reminder_btn_right'>Cancel</button>
        <button className='reminder_btn_left' onClick={saveReminder}>Save</button>
      </div>
    </>
  );
};

export default Reminders;