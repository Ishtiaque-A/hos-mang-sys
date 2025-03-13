import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import CnsOneSetupSidebar from '../cns_one_setup_mainsidebar/CnsOneSetupSidebar';

function EditOnShuttingEye(props) {

    const [onshuttingeye, setonshuttingeye] = useState([]);
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
        axios.get(`/edit-on-shutting-eye/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setonshuttingeye(res.data.onshuttingeye);
                // setPicture(res.data.onshuttingeye.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setonshuttingeye({ ...onshuttingeye, [e.target.name]: e.target.value });
    }

    const updateOnShuttingEyeInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('onshuttingeye_name', onshuttingeye.onshuttingeye_name);


        axios.post(`/update-on-shutting-eye/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setonshuttingeye({
                    ...onshuttingeye,

                });
                navigate("/on-shutting-eye");

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
                    <CnsOneSetupSidebar/>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit On Shutting Eye
                                    <Link to={'/on-shutting-eye'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="OnShuttingEyeForm" onSubmit={updateOnShuttingEyeInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={onshuttingeye.onshuttingeye_name} className="form-control" name="onshuttingeye_name" onChange={handleInput} />
                                                <span className="text-danger">{error.onshuttingeye_name}</span>
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

export default EditOnShuttingEye;
