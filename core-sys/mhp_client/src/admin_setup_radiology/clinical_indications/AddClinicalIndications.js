import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import RadiologySetupSidebar from '../radiology_setup_mainsidebar/RadiologySetupSidebar';



function AddClinicalIndications() {

    const [ClinicalIndications, setClinicalIndications] = useState({
        clinical_indications_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setClinicalIndications({
            ...ClinicalIndications, [e.target.name]: e.target.value
        });
    }



    const submitClinicalIndications = (e) => {
        e.preventDefault();
        // console.log("submitClinicalIndications", ClinicalIndications);
        console.log(e)
        axios.post(`/save-clinical-indications`, ClinicalIndications).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setClinicalIndications({
                    clinical_indications_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setClinicalIndications({ ...ClinicalIndications, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        < RadiologySetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Clinical indications
                                        <Link to={'/clinical-indications'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ClinicalIndicationsForm" onSubmit={submitClinicalIndications}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={ClinicalIndications.clinical_indications_name} className="form-control" name="clinical_indications_name" onChange={handleInput} />
                                                    <span className="text-danger">{ClinicalIndications.error_list.clinical_indications_name}</span>
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

export default AddClinicalIndications;

