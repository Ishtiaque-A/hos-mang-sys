import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import DiagnosisProcedureSetupSidebar from '../diagnosis_procedure_setup_mainsidebar/DiagnosisProcedureSetupSidebar';

function EditAutoFill(props) {

    const [autoFill, setAutoFill] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-auto-fill/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log("Edit Auto Fill", res.data.autoFill);
                setAutoFill(res.data.autoFill);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setAutoFill({ ...autoFill, [e.target.name]: e.target.value });
    }

    const updateAutoFillInput = (e) => {
        e.preventDefault();
        // alert("update")
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('autoFill_name', autoFill.autoFill_name);
        formData.append('autoFill_text', autoFill.autoFill_text);
        formData.append('autoFill_history', autoFill.autoFill_history);


        axios.post(`/update-auto-fill/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setAutoFill({
                    ...autoFill,

                });
                navigate(`/auto-fill/`);

            } else {
                setError(res.data.errors)
            }
        });

    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <DiagnosisProcedureSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Auto Fill
                                    <Link to={'/auto-fill'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="AutoFillForm" onSubmit={updateAutoFillInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="auto_fill_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={autoFill.autoFill_name} className="form-control" name="autoFill_name" onChange={handleInput} />
                                                <span className="text-danger">{error.autoFill_name}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="auto_fill_text" className="col-form-label-sm"> Text </label>
                                                <input type="text" value={autoFill.autoFill_text} className="form-control" name="autoFill_text" onChange={handleInput} />
                                                <span className="text-danger">{error.autoFill_text}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="auto_fill_history" className="col-form-label-sm"> History </label>
                                                <input type="text" value={autoFill.autoFill_history} className="form-control" name="autoFill_history" onChange={handleInput} />
                                                <span className="text-danger">{error.autoFill_history}</span>
                                            </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
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

export default EditAutoFill;

