import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

function AddDoctorTime() {

    const [serviceproviderlist, setServiceProviderlist] = useState([]);
    const [doctorlist, setDoctorslist] = useState([]);
    const [timeperpatientlist, setTimePerPatientslist] = useState([]);

    const [countryInput, setCountry] = useState({
        country_name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCountry({ ...countryInput, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        
        axios.get(`/timeslots-dropdown`).then(res => {
            if (res.data.status === 200) {
                setServiceProviderlist(res.data.serviceprovider);
                setDoctorslist(res.data.doctors);
                setTimePerPatientslist(res.data.time_per_patients);
            }
        })
        

    }, []);

    const submitTimeSlots = (e) => {
        e.preventDefault();

        const data = {
            country_name: countryInput.country_name,
        }

        axios.post(`/save-country`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setCountry({
                    ...countryInput,

                    country_name: '',
                    error_list: [],
                });
                // document.getElementById('countryForms').reset();
                // console.log(res.data.success);
                // document.getElementById('country_form').reset();

            } else if (res.data.status === 400) {
                setCountry({ ...countryInput, error_list: res.data.errors });
            }

        });
    }

    return (
        <>
            <Sidebar1></Sidebar1>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className="col-md-9 mt-5">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Add Doctors Time
                                    <Link to={'/country'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitTimeSlots} id="countryForms">
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div> 
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm">Time Slot</label>
                                                <select id="inputState" name="department_id" onChange={handleInput} value={countryInput.department_id}
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {/* {
                                                        departmentlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.departments_name}</option>
                                                            )
                                                        })
                                                    } */}
                                                </select>
                                                <span className="text-danger">{countryInput.error_list.department_id}</span>
                                            </div>
                                            <div> 
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm">Time Limit</label>
                                                <select id="inputState" name="department_id" onChange={handleInput} value={countryInput.department_id}
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {/* {
                                                        departmentlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.departments_name}</option>
                                                            )
                                                        })
                                                    } */}
                                                </select>
                                                <span className="text-danger">{countryInput.error_list.department_id}</span>
                                            </div>
                                            <div> 
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm"> Service Provider </label>
                                                <select id="inputState" name="department_id" onChange={handleInput} value={countryInput.department_id}
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        serviceproviderlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.usual_provider_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="text-danger">{countryInput.error_list.department_id}</span>
                                            </div>
                                            <div> 
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm"> Doctors </label>
                                                <select id="inputState" name="department_id" onChange={handleInput} value={countryInput.department_id}
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        doctorlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.dr_middle_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="text-danger">{countryInput.error_list.department_id}</span>
                                            </div>
                                            <div> 
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm"> Time Per Patients </label>
                                                <select id="inputState" name="department_id" onChange={handleInput} value={countryInput.department_id}
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        timeperpatientlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.time_name} min </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="text-danger">{countryInput.error_list.department_id}</span>
                                            </div>
                                            
                                            <div className="form-group">
                                                <label htmlFor="specialists_name" className="col-form-label-sm">Consultation From</label>
                                                <input placeholder="Specialist Name" type="date" onChange={handleInput} value={countryInput.specialists_name} className="form-control font-size-patient" name="specialists_name" />
                                                <span className="text-danger">{countryInput.error_list.specialists_name}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="specialists_name" className="col-form-label-sm">Consultation To</label>
                                                <input placeholder="Specialist Name" type="date" onChange={handleInput} value={countryInput.specialists_name} className="form-control font-size-patient" name="specialists_name" />
                                                <span className="text-danger">{countryInput.error_list.specialists_name}</span>
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
            <Footer></Footer>
        </>

    )
}

export default AddDoctorTime;