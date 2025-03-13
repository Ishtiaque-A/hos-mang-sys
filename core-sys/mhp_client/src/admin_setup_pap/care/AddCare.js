import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CareSetupSidebar from '../care_setup_main_sidebar/CareSetupSidebar';

function AddCare() {

    const [careSuggestion, setcareSuggestion] = useState({
        care_suggestion_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setcareSuggestion({
            ...careSuggestion, [e.target.name]: e.target.value
        });
    }




    const submitcareSuggestion = (e) => {
        // alert("hgfdhgf")
        console.log('state check',careSuggestion)
        e.preventDefault();
        axios.post(`/save-care-suggestion`, careSuggestion).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setcareSuggestion({
                    care_suggestion_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setcareSuggestion({ ...careSuggestion, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <CareSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add care suggestion name
                                        <Link to={'/care-suggestion'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="careSuggestionForm" onSubmit={submitcareSuggestion}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={careSuggestion.care_suggestion_name} className="form-control" name="care_suggestion_name" onChange={handleInput} />
                                                    <span className="text-danger">{careSuggestion.error_list.care_suggestion_name}</span>

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

export default AddCare;
