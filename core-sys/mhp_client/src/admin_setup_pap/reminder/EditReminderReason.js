import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import ReminderSetupSidebar from '../reminder_setup_main_sidebar/ReminderSetupSidebar';

function EditReminderReason(props) {

    const [ReminderReason, setReminderReason] = useState([]);
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
        axios.get(`/edit-reminder-reason/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setReminderReason(res.data.reminder_reason);
                // setPicture(res.data.ReminderReason.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setReminderReason({ ...ReminderReason, [e.target.name]: e.target.value });
    }

    const updateReminderReasonInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

       


        axios.post(`/update-reminder-reason/${lastpart}`, ReminderReason).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setReminderReason({
                    ...ReminderReason,

                });
                navigate(`/reminder-reason/`);

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
                    <ReminderSetupSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Reminder Reason
                                    <Link to={'/reminder-reason'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="ReminderReasonForm" onSubmit={updateReminderReasonInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={ReminderReason.reason_name} className="form-control" name="reason_name" onChange={handleInput} />
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

export default EditReminderReason;
