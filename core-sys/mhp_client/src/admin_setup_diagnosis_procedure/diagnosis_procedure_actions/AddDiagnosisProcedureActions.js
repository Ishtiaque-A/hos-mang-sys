import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';



function AddDiagnosisProcedureActions() {

    const [DiagnosisProcedureActions, setDiagnosisProcedureActions] = useState({
        DiagnosisProcedureActions_type: "",
        DiagnosisProcedureActions_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDiagnosisProcedureActions({
            ...DiagnosisProcedureActions, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('DiagnosisProcedureActions_type', DiagnosisProcedureActions.DiagnosisProcedureActions_type);
    formData.append('DiagnosisProcedureActions_name', DiagnosisProcedureActions.DiagnosisProcedureActions_name);

    const submitDiagnosisProcedureActions = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log("submitDiagnosisProcedure Actions", DiagnosisProcedureActions);
        console.log(e)
        axios.post(`/save-diagnosis-procedure-actions`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDiagnosisProcedureActions({
                    DiagnosisProcedureActions_type: "",
                    DiagnosisProcedureActions_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDiagnosisProcedureActions({ ...DiagnosisProcedureActions, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DiagnosisProcedureSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Diagnosis/Procedure
                                        <Link to={'/diagnosis-procedure-actions'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DiagnosisProcedureActionsForm" onSubmit={submitDiagnosisProcedureActions}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Type</label>
                                                    <select id="inputState" onChange={(e) => setDiagnosisProcedureActions({
                                                        ...DiagnosisProcedureActions, DiagnosisProcedureActions_type: e.target.value
                                                    })}
                                                        className="form-select  col-form-label-sm font-size-patient" aria-label="Default select example">
                                                        <option selected>Select</option>
                                                        <option value="Diagnosis">Diagnosis</option>
                                                        <option value="Procedure">Procedure</option>
                                                        <option value="ResonForVisit">Reason For Visit</option>
                                                    </select>
                                                    <span className="text-danger">{DiagnosisProcedureActions.error_list.DiagnosisProcedureActions_type}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={DiagnosisProcedureActions.DiagnosisProcedureActions_name} className="form-control" name="DiagnosisProcedureActions_name" onChange={handleInput} />
                                                    <span className="text-danger">{DiagnosisProcedureActions.error_list.DiagnosisProcedureActions_name}</span>
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

export default AddDiagnosisProcedureActions;


