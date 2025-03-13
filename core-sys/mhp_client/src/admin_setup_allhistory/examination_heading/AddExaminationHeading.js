import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MlhSetupSidebar from '../mlh_setup_mainsidebar/MlhSetupSidebar';

function AddExaminationHeading() {

    const [examinationHeading, setexaminationHeading] = useState({
        examinationHeading_name: "",
        error_list: [],
    });



    const handleInput = (e) => {
        setexaminationHeading({
            ...examinationHeading, [e.target.name]: e.target.value
        });
    }

    const submitCanal = (e) => {
        e.preventDefault();
        const data = {
            examinationHeading_name: examinationHeading.examinationHeading_name,

        }

        axios.post(`/save-examinationHeading`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setexaminationHeading({
                    examinationHeading_name: "",
                    status_id: "",
                    selection_criteria: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setexaminationHeading({ ...examinationHeading, error_list: res.data.errors });

            }

        })
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
                                <h6 className="card-title"> Add Examination Heading
                                    <Link to={'/examination-heading'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="EarCanalForm" onSubmit={submitCanal}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={examinationHeading.examinationHeading_name} className="form-control" name="examinationHeading_name" onChange={handleInput} />
                                                <span className="text-danger">{examinationHeading.error_list.examinationHeading_name}</span>

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
    )
}

export default AddExaminationHeading
