import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import CareSetupSidebar from '../care_setup_main_sidebar/CareSetupSidebar';

function EditCare(props) {

    const [careSuggestion, setcareSuggestion] = useState([]);
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
        axios.get(`/edit-care-suggestion/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setcareSuggestion(res.data.care_suggestion);
                // setPicture(res.data.careSuggestion.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setcareSuggestion({ ...careSuggestion, [e.target.name]: e.target.value });
    }

    const updatecareSuggestionInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

       


        axios.post(`/update-care-suggestion/${lastpart}`, careSuggestion).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setcareSuggestion({
                    ...careSuggestion,

                });
                navigate(`/care-suggestion/`);

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
                    <CareSetupSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Care Suggestion
                                    <Link to={'/care-suggestion'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="careSuggestionForm" onSubmit={updatecareSuggestionInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={careSuggestion.care_suggestion_name} className="form-control" name="care_suggestion_name" onChange={handleInput} />
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

export default EditCare;
