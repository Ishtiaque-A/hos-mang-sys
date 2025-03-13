import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MheMainSetupSidebar from '../mhe_others_setup_mainsidebar/MheOthersSetupSidebar';

function AddPHQ9Questionnaire() {

    const [PHQ9Questionnaire, setPHQ9Questionnaire] = useState({
        PHQ9Questionnaire_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setPHQ9Questionnaire({
            ...PHQ9Questionnaire, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('PHQ9Questionnaire_name', PHQ9Questionnaire.PHQ9Questionnaire_name);

    const submitPHQ9Questionnaire = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-phq-9-questionnaire`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setPHQ9Questionnaire({
                    PHQ9Questionnaire_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setPHQ9Questionnaire({ ...PHQ9Questionnaire, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MheMainSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add PHQ-9 Questionnaire
                                        <Link to={'/phq-9-questionnaire'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="PHQ9QuestionnaireForm" onSubmit={submitPHQ9Questionnaire}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={PHQ9Questionnaire.PHQ9Questionnaire_name} className="form-control" name="PHQ9Questionnaire_name" onChange={handleInput} />
                                                    <span className="text-danger">{PHQ9Questionnaire.error_list.PHQ9Questionnaire_name}</span>

                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
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

export default AddPHQ9Questionnaire;
