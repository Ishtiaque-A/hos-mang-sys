import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import MlhSetupSidebar from '../mlh_setup_mainsidebar/MlhSetupSidebar';

function EditExaminationHeading(props) {

    const [examinationHeading, setexaminationHeading] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-examinationHeading/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setexaminationHeading(res.data.examinationHeading);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);




    const handleInput = (e) => {
        e.persist();
        setexaminationHeading({ ...examinationHeading, [e.target.name]: e.target.value });
    }

    const updateCanalInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = examinationHeading;
        axios.post(`/update-examinationHeading/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setexaminationHeading({
                    ...examinationHeading,

                });
                setError('');
                navigate("/examination-heading");
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
                        <MlhSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Examination Heading
                                    <Link to={'/examination-heading'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="EarCanalForm" onSubmit={updateCanalInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={examinationHeading.examinationHeading_name} className="form-control" name="examinationHeading_name" onChange={handleInput} />
                                                <span className="text-danger">{error.examinationHeading_name}</span>

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

export default EditExaminationHeading
