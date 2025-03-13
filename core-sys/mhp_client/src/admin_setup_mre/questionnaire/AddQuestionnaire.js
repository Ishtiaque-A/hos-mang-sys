import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddQuestionnaire() {

    const [questionnaire, setquestionnaire] = useState({
        questionnaire_name: "",
        questionnaire_description: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setquestionnaire({
            ...questionnaire, [e.target.name]: e.target.value
        });
    }

    console.log("ques name", questionnaire.questionnaire_name)

    const submitQuestionnaire = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('questionnaire_name', questionnaire.questionnaire_name);
        formData.append('questionnaire_description', questionnaire.questionnaire_description);

        axios.post('/save-ques', formData).then(res => {

            console.log("questionaria", res.data)
            // swal("Success", res.data.message, "success");
            // setquestionnaire({
            //     questionnaire_name: "",
            //     questionnaire_description: "",
            //     error_list: [],
            // });

            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setquestionnaire({
                    questionnaire_name: "",
                    questionnaire_description: "",
                    error_list: [],
                });

            }
            else if (res.data.status == 400) {
                setquestionnaire({ ...questionnaire, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MreSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Questionnaire
                                        <Link to={"/questionnaire"} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="QuestionnaireForm" onSubmit={submitQuestionnaire}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={questionnaire.questionnaire_name} className="form-control" name="questionnaire_name" onChange={handleInput} />
                                                    <span className="text-danger">{questionnaire.error_list.questionnaire_name}</span>
                                                </div>

                                                <div class="form-group">
                                                    <label for="floatingTextQuestionnaire" className="col-form-label-sm">Questionnaire</label>
                                                    <textarea type="text" value={questionnaire.questionnaire_description} className="form-control form-control-sm" name="questionnaire_description" onChange={handleInput} placeholder="Description here" id="floatingTextQuestionnaire" rows="4"></textarea>
                                                    <span className="text-danger">{questionnaire.error_list.questionnaire_description}</span>
                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-3" ><i
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

export default AddQuestionnaire;
