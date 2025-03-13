import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import ReminderSetupSidebar from '../reminder_setup_main_sidebar/ReminderSetupSidebar';

function AddReminderReason() {

    const [reminderReason, setreminderReason] = useState({
        reason_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setreminderReason({
            ...reminderReason, [e.target.name]: e.target.value
        });
    }




    const submitreminderReason = (e) => {
        // alert("hgfdhgf")
        console.log('state check',reminderReason)
        e.preventDefault();
        axios.post(`/save-reminder-reason`, reminderReason).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setreminderReason({
                    reason_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setreminderReason({ ...reminderReason, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <ReminderSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Reminder Reason
                                        <Link to={'/reminder-reason'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="reminderReasonForm" onSubmit={submitreminderReason}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={reminderReason.reason_name} className="form-control" name="reason_name" onChange={handleInput} />
                                                    <span className="text-danger">{reminderReason.error_list.reason_name}</span>

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

export default AddReminderReason;
