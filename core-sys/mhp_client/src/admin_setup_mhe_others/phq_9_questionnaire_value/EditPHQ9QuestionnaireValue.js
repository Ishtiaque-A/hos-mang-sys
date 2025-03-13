import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import MheMainSetupSidebar from '../mhe_others_setup_mainsidebar/MheOthersSetupSidebar';

function EditPHQ9QuestionnaireValue(props) {

    const [PHQ9QuestionnaireValue, setPHQ9QuestionnaireValue] = useState([]);
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
        axios.get(`/edit-phq-9-questionnaire-value/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setPHQ9QuestionnaireValue(res.data.PHQ9QuestionnaireValue);
                // setPicture(res.data.PHQ9QuestionnaireValue.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setPHQ9QuestionnaireValue({ ...PHQ9QuestionnaireValue, [e.target.name]: e.target.value });
    }

    const updatePHQ9QuestionnaireValueInput = (e) => {
        // alert("ydgff")
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('PHQ9QuestionnaireValue_name', PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_name);
        formData.append('PHQ9QuestionnaireValue_value', PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_value);


        axios.post(`/update-phq-9-questionnaire-value/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setPHQ9QuestionnaireValue({
                    ...PHQ9QuestionnaireValue,

                });
                navigate(`/phq-9-questionnaire-value/`);

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
                        <MheMainSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">PHQ-9 Questionnaire Value
                                    <Link to={'/phq-9-questionnaire-value'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="PHQ9QuestionnaireValueForm" onSubmit={updatePHQ9QuestionnaireValueInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_name} className="form-control" name="PHQ9QuestionnaireValue_name" onChange={handleInput} />
                                                <span className="text-danger">{error.PHQ9QuestionnaireValue_name}</span>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="history_value" className="col-form-label-sm"> Value </label>
                                                <input type="text" value={PHQ9QuestionnaireValue.PHQ9QuestionnaireValue_value} className="form-control" name="PHQ9QuestionnaireValue_value" onChange={handleInput} />
                                                <span className="text-danger">{error.PHQ9QuestionnaireValue_value}</span>
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

export default EditPHQ9QuestionnaireValue;
