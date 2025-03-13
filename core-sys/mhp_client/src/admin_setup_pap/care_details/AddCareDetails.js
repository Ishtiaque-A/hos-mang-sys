import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CareSetupSidebar from '../care_setup_main_sidebar/CareSetupSidebar';

function AddCareDetails() {

    const [CareDetails, setCareDetails] = useState({
        care_details_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setCareDetails({
            ...CareDetails, [e.target.name]: e.target.value
        });
    }




    const submitCareDetails = (e) => {
        // alert("hgfdhgf")
        console.log('state check',CareDetails)
        e.preventDefault();
        axios.post(`/save-care-details`, CareDetails).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setCareDetails({
                    care_details_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setCareDetails({ ...CareDetails, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <CareSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Care Detaills Name
                                        <Link to={'/care-details'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="CareDetailsForm" onSubmit={submitCareDetails}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={CareDetails.care_details_name} className="form-control" name="care_details_name" onChange={handleInput} />
                                                    <span className="text-danger">{CareDetails.error_list.care_details_name}</span>

                                                </div>
                                               
                                                <div className="float-right">
                                                    <button type="submit"  className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"  ></i> Save
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
        </div>
    )
}

export default AddCareDetails;
