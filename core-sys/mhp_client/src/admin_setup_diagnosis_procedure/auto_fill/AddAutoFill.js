import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';



function AddAutoFill() {

    const [autoFill, setAutoFill] = useState({
        autoFill_name: "",
        autoFill_text: "",
        autoFill_history: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setAutoFill({
            ...autoFill, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('autoFill_name', autoFill.autoFill_name);
    formData.append('autoFill_text', autoFill.autoFill_text);
    formData.append('autoFill_history', autoFill.autoFill_history);

    const submitAutoFill = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log("submitAutoFill", autoFill);
        console.log(e)
        axios.post(`/save-auto-fill`, formData).then(res => {
            console.log("submit Auto Fill", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setAutoFill({
                    autoFill_name: "",
                    autoFill_text: "",
                    autoFill_history: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setAutoFill({ ...autoFill, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Auto Fill
                                        <Link to={'/auto-fill'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="autoFillForm" onSubmit={submitAutoFill}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                             
                                                
                                                <div className="form-group">
                                                    <label htmlFor="auto_fill_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={autoFill.autoFill_name} className="form-control" name="autoFill_name" onChange={handleInput} />
                                                    <span className="text-danger">{autoFill.error_list.autoFill_name}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="auto_fill_text" className="col-form-label-sm"> Text </label>
                                                    <input type="text" value={autoFill.autoFill_text} className="form-control" name="autoFill_text" onChange={handleInput} />
                                                    <span className="text-danger">{autoFill.error_list.autoFill_text}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="auto_fill_history" className="col-form-label-sm"> History </label>
                                                    <input type="text" value={autoFill.autoFill_history} className="form-control" name="autoFill_history" onChange={handleInput} />
                                                    <span className="text-danger">{autoFill.error_list.autoFill_history}</span>
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

export default AddAutoFill;

