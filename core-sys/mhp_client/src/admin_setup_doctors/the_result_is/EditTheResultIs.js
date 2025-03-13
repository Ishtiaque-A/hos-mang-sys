import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import DoctorInboxSetupSidebar from '../../DoctorInbox/DoctorInboxSetupSidebar';
function EditTheResultIs() {

    const [theResultIs, settheResultIs] = useState('');
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-theResultIs/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                settheResultIs(res.data.theResultIs);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);




    const handleInput = (e) => {
        settheResultIs({
            ...theResultIs, [e.target.name]: e.target.value
        });
    }
    const submittheResultIs = (e) => {
        e.preventDefault();
        //   console.log(theResultIs);


        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.put(`/update-theResultIs/${lastpart}`, theResultIs).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                settheResultIs({
                    theResultIs_name: "",
                    error_list: [],

                });
                setError('');
                navigate('/the-result-is');
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
                                    <h6 className="card-title"> Edit theResultIs Name
                                        <Link to={'/the-result-is'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="theResultIsForm" onSubmit={submittheResultIs}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={theResultIs.the_result_is_name} className="form-control" name="the_result_is_name" onChange={handleInput} />
                                                    <span className="text-danger">{error.the_result_is_name}</span>

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

export default EditTheResultIs
