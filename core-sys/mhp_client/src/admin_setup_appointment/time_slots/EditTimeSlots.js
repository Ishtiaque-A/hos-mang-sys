import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from "sweetalert";
import Footer from '../../Component/Footer/Footer';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import AddDashboard from '../AddDashboard/AddDashboard';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
function EditTimeSlots(props) {

    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    const [error, setError] = useState([]);
    const[allDoctors,setAllDoctors]=useState([]);

    const [doctor_id, setDoctor_id] = useState('');

    const handleChange=(e)=>{
        setDoctor_id(
            e.target.value
        )
    }
    useEffect(()=>{

        axios.get(`/all-doctorList`).then(res=>{
            
            if(res.data.status==200){
                setAllDoctors(res.data.allDoctors);
            }
        })

    },[])


    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const country_id = props.match.params.id;
        axios.get(`/edit-time-slots/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log('res data',res.data);
                setStartTime(res.data.time_slots.startTime);
                setEndTime(res.data.time_slots.endTime);
                setDoctor_id(res.data.time_slots.doctor_id);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


   

    const updateCountry = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = {
            startTime:startTime,
            endTime:endTime,
            doctor_id:doctor_id
        };
        axios.put(`/update-time-slots/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setStartTime(null);
                setEndTime(null);
                setDoctor_id('');
                setError('')
            } else {
                setError(res.data.errors)
            }
        });

    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Edit Time Slots
                                    <Link to={'/time-slots'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateCountry}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                        <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Doctors Name</label>

                                                    <select id="inputState"   onChange={handleChange} value={doctor_id} name="doctor_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            allDoctors.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.dr_given_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {/* <span className="text-danger">{procedureFee.error_list.procedure_id}</span> */}

                                                </div>

                                            <div className="mt-4">
                                                <label htmlFor="time_slots_name" className="col-form-label-sm mx-2 ">Start Time:</label>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        label="Start Date & Time"
                                                        value={startTime}
                                                        onChange={(newValue) => {
                                                            setStartTime(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>

                                                {/* <span className="text-danger">{countryInput.error_list.time_slots_name}</span> */}
                                            </div>

                                            <div className="form-group mt-3">
                                                <label htmlFor="time_slots_name" className="col-form-label-sm mx-2 ">End Time:</label>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        label="End Date & Time"
                                                        value={endTime}
                                                        onChange={(newValue) => {
                                                            setEndTime(newValue);
                                                        }} renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>

                                                {/* <span className="text-danger">{countryInput.error_list.time_slots_name}</span> */}
                                            </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )

}

export default EditTimeSlots;