import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';

function AddCountry() {

    const [countryInput, setCountry] = useState({
        country_name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setCountry({ ...countryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
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

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Add Country
                                    <Link to={'/country'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitCategory} id="countryForms">
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="country_name" className="col-form-label-sm">Country Name</label>
                                                <input placeholder="Country Name" type="text" onChange={handleInput} value={countryInput.country_name} className="form-control" name="country_name" />
                                                <span className="text-danger">{countryInput.error_list.country_name}</span>
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

export default AddCountry;