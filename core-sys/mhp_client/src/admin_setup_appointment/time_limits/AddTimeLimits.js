import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

function AddTimeLimits() {

    const [countryInput, setCountry] = useState({
        time_limits_name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCountry({ ...countryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            time_limits_name: countryInput.time_limits_name,
        }

        axios.post(`/save-time-limits`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setCountry({
                    ...countryInput,

                    time_limits_name: '',
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
           
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Add Time Limits
                                    <Link to={'/time-limits'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitCategory} id="countryForms">
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="time_limits_name" className="col-form-label-sm">Time Limits Name</label>
                                                <input placeholder="Time Limits Name" type="text" onChange={handleInput} value={countryInput.time_limits_name} className="form-control" name="time_limits_name" />
                                                <span className="text-danger">{countryInput.error_list.time_limits_name}</span>
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

export default AddTimeLimits;