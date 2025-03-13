import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import DoctorInboxSetupSidebar from '../../DoctorInbox/DoctorInboxSetupSidebar';
function EditStoreResultIn() {

    const [storeResultIn, setstoreResultIn] = useState('');
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-storeResultIn/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setstoreResultIn(res.data.storeResultIn);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);




    const handleInput = (e) => {
        setstoreResultIn({
            ...storeResultIn, [e.target.name]: e.target.value
        });
    }
    const submitstoreResultIn = (e) => {
        e.preventDefault();
        //   console.log(storeResultIn);


        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.put(`/update-storeResultIn/${lastpart}`, storeResultIn).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setstoreResultIn({
                    store_result_in: "",
                    error_list: [],

                });
                setError('');
                navigate('/store-result-in');
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
                                    <h6 className="card-title"> Edit storeResultIn Name
                                        <Link to={'/store-result-in'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="storeResultInForm" onSubmit={submitstoreResultIn}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={storeResultIn.store_result_in} className="form-control" name="store_result_in" onChange={handleInput} />
                                                    <span className="text-danger">{error.store_result_in}</span>

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

export default EditStoreResultIn
