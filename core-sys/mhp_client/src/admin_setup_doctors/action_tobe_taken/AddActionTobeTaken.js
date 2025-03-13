import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DoctorInboxSetupSidebar from '../../DoctorInbox/DoctorInboxSetupSidebar';
function AddActionTobeTaken() {

    const [actionTobeTaken, setactionTobeTaken] = useState({
        action_to_be_taken: "",
        error_list: [],
    });


    const handleInput = (e) => {
        setactionTobeTaken({
            ...actionTobeTaken, [e.target.name]: e.target.value
        });
    }
    const submitActionTobe = (e) => {
        e.preventDefault();
        console.log(actionTobeTaken);

        axios.post(`/save-actionTobeTaken`, actionTobeTaken).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setactionTobeTaken({
                    action_to_be_taken: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setactionTobeTaken({ ...actionTobeTaken, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorInboxSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Action To be
                                        <Link to={'/action-tobe-taken'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="theResultIsForm" onSubmit={submitActionTobe}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={actionTobeTaken.action_to_be_taken} className="form-control" name="action_to_be_taken" onChange={handleInput} />
                                                    <span className="text-danger">{actionTobeTaken.error_list.action_to_be_taken}</span>

                                                </div>


                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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
    )
}

export default AddActionTobeTaken
