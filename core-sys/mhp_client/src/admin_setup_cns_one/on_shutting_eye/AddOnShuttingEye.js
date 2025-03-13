import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsOneSetupSidebar from '../cns_one_setup_mainsidebar/CnsOneSetupSidebar';

function AddOnShuttingEye() {

    const [onshuttingeye, setonshuttingeye] = useState({
        onshuttingeye_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setonshuttingeye({
            ...onshuttingeye, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('onshuttingeye_name',  onshuttingeye.onshuttingeye_name);

    const submitOnShuttingEye = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-on-shutting-eye`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setonshuttingeye({
                    onshuttingeye_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setonshuttingeye({ ...onshuttingeye, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <CnsOneSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add On Shutting Eye
                                        <Link to={'/on-shutting-eye'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="OnShuttingEyeForm" onSubmit={submitOnShuttingEye}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={onshuttingeye.onshuttingeye_name} className="form-control" name="onshuttingeye_name" onChange={handleInput} />
                                                    <span className="text-danger">{onshuttingeye.error_list.onshuttingeye_name}</span>

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

export default AddOnShuttingEye;
