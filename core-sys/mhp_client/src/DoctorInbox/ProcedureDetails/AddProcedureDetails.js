import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';


const AddProcedureDetails = () => {

    const [procedureDetails, setProcedureDetails] = useState({
        procedure_details: "",
    });

    const saveProcedureDetails = (e) => {
        e.preventDefault();

        const procedureDetailsName = {
            name: procedureDetails
        }

        axios.post('/save-procedure-Details', procedureDetailsName)
            .then(res => {
                if (res.data.status == 200) {
                    console.log(res.data)
                    swal("Success", res.data.message, "success");
                    setProcedureDetails({
                        procedure_details: ""
                    });

                }
                else if (res.data.status == 400) {
                    setProcedureDetails({ ...procedureDetails, error_list: res.data.errors });

                }
            }
            )
    }


    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProcedureReportSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Procedure Details
                                        <Link to={'/procedure-details'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestTypeForm" onSubmit={saveProcedureDetails}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={procedureDetails.procedure_details} className="form-control" name="procedure_details" onChange={(e) => { setProcedureDetails(e.target.value) }} />
                                                    <span className="text-danger"></span>
                                                </div>
                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary  text-uppercase float-end mt-2" ><i
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
        </div>
    );
};

export default AddProcedureDetails;