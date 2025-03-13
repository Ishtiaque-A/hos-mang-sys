import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import PathologySetupSidebar from '../PathologySetupSidebar';


function AddClinicalDetails() {

    const [ClinicalDetails, setClinicalDetails] = useState({
        clinical_details_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setClinicalDetails({
            ...ClinicalDetails, [e.target.name]: e.target.value
        });
    }



    const submitClinicalDetails = (e) => {
        e.preventDefault();
        // console.log("submitClinicalDetails", ClinicalDetails);
        console.log(e)
        axios.post(`/save-clinical-details`, ClinicalDetails).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setClinicalDetails({
                    clinical_details_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setClinicalDetails({ ...ClinicalDetails, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        < PathologySetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Clinical Details
                                        <Link to={'/clinical-details'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ClinicalDetailsForm" onSubmit={submitClinicalDetails}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={ClinicalDetails.clinical_details_name} className="form-control" name="clinical_details_name" onChange={handleInput} />
                                                    <span className="text-danger">{ClinicalDetails.error_list.clinical_details_name}</span>
                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
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

export default AddClinicalDetails;

