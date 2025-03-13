import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import DoctorInboxSetupSidebar from '../../DoctorInbox/DoctorInboxSetupSidebar';
function EditActionTobeTaken() {

    const [actionTobeTaken, setactionTobeTaken] = useState('');
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-actionTobeTaken/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setactionTobeTaken(res.data.actionTobe);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);




    const handleInput = (e) => {
        setactionTobeTaken({
            ...actionTobeTaken, [e.target.name]: e.target.value
        });
    }
    const submitActionToBe = (e) => {
        e.preventDefault();
        //   console.log(theResultIs);


        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.put(`/update-actionTobeTaken/${lastpart}`, actionTobeTaken).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setactionTobeTaken({
                    action_to_be_taken: "",
                    error_list: [],

                });
                setError('');
                navigate('/action-tobe-taken');
            }
            else {
                setError(res.data.errors);
            }

        })
    }

    return (
        <div>
            <>
                <div className="ms-2">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorInboxSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Edit Action to be
                                        <Link to={'/action_tobe_taken'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="theResultIsForm" onSubmit={submitActionToBe}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={actionTobeTaken.action_to_be_taken} className="form-control" name="action_to_be_taken" onChange={handleInput} />
                                                    <span className="text-danger">{error.action_to_be_taken}</span>

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
        </div>
    )
}

export default EditActionTobeTaken
