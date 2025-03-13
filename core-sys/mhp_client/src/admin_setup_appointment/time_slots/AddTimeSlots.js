import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddTimeSlots() {


    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);
    const [doctor_id, setDoctor_id] = useState('');
    const [allDoctors, setAllDoctors] = useState([]);
    const [error, setError] = useState();

    console.log('all doctors', allDoctors);


    const handleChange = (e) => {
        setDoctor_id(
            e.target.value
        )
    }

    useEffect(() => {

        axios.get(`/all-doctorList`).then(res => {

            if (res.data.status == 200) {
                setAllDoctors(res.data.allDoctors);
            }
        })

    }, [])



    const submitTimeSlots = (e) => {
        e.preventDefault();

        const data = {
            startTime: startTime,
            endTime: endTime,
            doctor_id: doctor_id
        }

        console.log('data check ', data);


        axios.post(`/save-time-slots`, data).then(res => {

            console.log('check', res.data);
            if (res.data.status == 400) {
                setError(res.data.errors);
            }

            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDoctor_id('');
                setStartTime(null);
                setEndTime(null);

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
                                <h6>Add Time Slot
                                    <Link to={'/time-slots'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitTimeSlots} id="countryForms">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div>
                                                <label htmlFor="inputPassword4"
                                                    className="form-label  col-form-label col-form-label-sm">Doctors Name</label>

                                                <select id="inputState" onChange={handleChange} value={doctor_id} name="doctor_id"
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

                                            <div className='mt-4'>
                                                <label htmlFor="time_slots_name" className="col-form-label-sm mx-2 ">Time Slot Start:</label>

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
                                                <label htmlFor="time_slots_name" className="col-form-label-sm mx-2 ">Time Slot End:</label>

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
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Save
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

export default AddTimeSlots;