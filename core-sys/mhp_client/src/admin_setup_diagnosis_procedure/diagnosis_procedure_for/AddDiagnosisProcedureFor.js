import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';



function AddDiagnosisProcedureFor() {

    const [DiagnosisProcedureFor, setDiagnosisProcedureFor] = useState({
        DiagnosisProcedureFor_type: "",
        DiagnosisProcedureFor_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDiagnosisProcedureFor({
            ...DiagnosisProcedureFor, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('DiagnosisProcedureFor_type', DiagnosisProcedureFor.DiagnosisProcedureFor_type);
    formData.append('DiagnosisProcedureFor_name', DiagnosisProcedureFor.DiagnosisProcedureFor_name);

    const submitDiagnosisProcedureFor = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log("submitDiagnosisProcedure For", DiagnosisProcedureFor);
        console.log(e)
        axios.post(`/save-diagnosis-procedure-for`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDiagnosisProcedureFor({
                    DiagnosisProcedureFor_type: "",
                    DiagnosisProcedureFor_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDiagnosisProcedureFor({ ...DiagnosisProcedureFor, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Diagnosis/Procedure For
                                        <Link to={'/diagnosis-procedure-for'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DiagnosisProcedureForForm" onSubmit={submitDiagnosisProcedureFor}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                              
                                                <div className="form-group">
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Type</label>
                                                    <select id="inputState" onChange={(e) => setDiagnosisProcedureFor({
                                                        ...DiagnosisProcedureFor, DiagnosisProcedureFor_type: e.target.value
                                                    })}
                                                        className="form-select  col-form-label-sm font-size-patient" aria-label="Default select example">
                                                        <option selected>Select</option>
                                                        <option value="Diagnosis">Diagnosis</option>
                                                        <option value="Procedure">Procedure</option>
                                                        <option value="ResonForVisit">Reason For Visit</option>
                                                    </select>
                                                    <span className="text-danger">{DiagnosisProcedureFor.error_list.DiagnosisProcedureFor_type}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={DiagnosisProcedureFor.DiagnosisProcedureFor_name} className="form-control" name="DiagnosisProcedureFor_name" onChange={handleInput} />
                                                    <span className="text-danger">{DiagnosisProcedureFor.error_list.DiagnosisProcedureFor_name}</span>
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

export default AddDiagnosisProcedureFor;



