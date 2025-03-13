import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function EditQuestionnaire(props) {

    // const [questionnaire, setquestionnaire] = useState({questionnaire_description:""});
    const [questionnaire, setquestionnaire] = useState([]);
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
        axios.get(`/edit-questionnaire/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setquestionnaire(res.data.questionnaire);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setquestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
    }


    const updateQuestionnaireInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        console.log("questionnaire",questionnaire.questionnaire_name)

        const formData = new FormData();
        formData.append('questionnaire_name', questionnaire.questionnaire_name);
        formData.append('questionnaire_description', questionnaire.questionnaire_description);


        axios.post(`/update-questionnaire/${lastpart}`, formData).then(res => {

            console.log("Res Data",res.data)
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setquestionnaire({
                    ...questionnaire,
                    questionnaire_name:"",
                    questionnaire_description:""
                });
                navigate("/questionnaire");

            } else {
                setError(res.data.errors);
            }
        });

    }


    console.log("questionnaire_description",questionnaire.questionnaire_description)

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <MreSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Questionnaire
                                    <Link to={'/questionnaire'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="QuestionnaireForm" onSubmit={updateQuestionnaireInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={questionnaire.questionnaire_name} className="form-control" name="questionnaire_name" onChange={handleInput} />
                                                <span className="text-danger">{error.questionnaire_name}</span>
                                            </div>

                                            <div class="form-group">
                                                    <label for="floatingTextQuestionnaire" className="col-form-label-sm">Questionnaire</label>
                                                    <textarea type="text" value={questionnaire.questionnaire_description} className="form-control form-control-sm" name="questionnaire_description" onChange={handleInput} placeholder="Description here" id="floatingTextQuestionnaire" rows="4"></textarea>
                                                    <span className="text-danger">{error.questionnaire_description}</span>
                                                </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-3"><i
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

export default EditQuestionnaire;
