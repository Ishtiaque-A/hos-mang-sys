import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import MedicationSetupSidebar from '../medication_setup_main_sidebar/MedicationSetupSidebar';


function EditGuidelinesOnlyRecommended(props) {

    const [guidelinesOnlyRecommended, setGuidelinesOnlyRecommended] = useState([]);
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
        axios.get(`/edit-guidelines-only-recommended/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log("edit-guidelines-only-recommended", res.data.guidelinesOnly);
                setGuidelinesOnlyRecommended(res.data.guidelinesOnly);
                // setPicture(res.data.guidelinesOnlyRecommended.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setGuidelinesOnlyRecommended({ ...guidelinesOnlyRecommended, [e.target.name]: e.target.value });
    }

    const updateGuidelinesOnlyRecommendedInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('name', guidelinesOnlyRecommended.name);


        axios.post(`/update-guidelines-only-recommended/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setGuidelinesOnlyRecommended({
                    ...guidelinesOnlyRecommended,

                });
                navigate(`/guidelines-only-recommended/`);

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
                    <MedicationSetupSidebar/>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Guide lines Only Recommended
                                    <Link to={'/guidelines-only-recommended'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="GuidelinesOnlyRecommendedForm" onSubmit={updateGuidelinesOnlyRecommendedInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={guidelinesOnlyRecommended.name} className="form-control" name="name" onChange={handleInput} />
                                                <span className="text-danger">{error.name}</span>
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

export default EditGuidelinesOnlyRecommended;
