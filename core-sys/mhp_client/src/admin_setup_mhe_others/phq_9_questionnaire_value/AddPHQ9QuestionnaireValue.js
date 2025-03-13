import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MheMainSetupSidebar from '../mhe_others_setup_mainsidebar/MheOthersSetupSidebar';

function AddPHQ9QuestionnaireValue() {

    const [PHQ9QuestionnaireValue, setPHQ9QuestionnaireValue] = useState({
        PHQ9QuestionnaireValue_name: "",
        PHQ9QuestionnaireValue_value: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setPHQ9QuestionnaireValue({
            ...PHQ9QuestionnaireValue, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('PHQ9QuestionnaireValue_name',  PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_name);
    formData.append('PHQ9QuestionnaireValue_value',  PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_value);

    const submitPHQ9QuestionnaireValue = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-phq-9-questionnaire-value`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setPHQ9QuestionnaireValue({
                    PHQ9QuestionnaireValue_name: "",
                    PHQ9QuestionnaireValue_value: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setPHQ9QuestionnaireValue({ ...PHQ9QuestionnaireValue, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add PHQ-9 Questionnaire Value
                                        <Link to={'/phq-9-questionnaire-value'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="PHQ9QuestionnaireValueForm" onSubmit={submitPHQ9QuestionnaireValue}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_name} className="form-control" name="PHQ9QuestionnaireValue_name" onChange={handleInput} />
                                                    <span className="text-danger">{PHQ9QuestionnaireValue.error_list.PHQ9QuestionnaireValue_name}</span>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="history_value" className="col-form-label-sm"> Value </label>
                                                    <input type="text" value={PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_value} className="form-control" name="PHQ9QuestionnaireValue_value" onChange={handleInput} />
                                                    <span className="text-danger">{PHQ9QuestionnaireValue.error_list.PHQ9QuestionnaireValue_value}</span>
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

export default AddPHQ9QuestionnaireValue;
