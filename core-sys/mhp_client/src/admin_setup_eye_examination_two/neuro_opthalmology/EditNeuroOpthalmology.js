import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function EditNeuroOpthalmology(props) {

    const [NeuroOpthalmology, setNeuroOpthalmology] = useState([]);
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
        axios.get(`/edit-neuro-opthalmology/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setNeuroOpthalmology(res.data.NeuroOpthalmology);
                // setPicture(res.data.NeuroOpthalmology.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setNeuroOpthalmology({ ...NeuroOpthalmology, [e.target.name]: e.target.value });
    }

    const updateNeuroOpthalmologyInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('NeuroOpthalmology_name', NeuroOpthalmology.NeuroOpthalmology_name);


        axios.post(`/update-neuro-opthalmology/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setNeuroOpthalmology({
                    ...NeuroOpthalmology,

                });
                navigate(`/neuro-opthalmology/`);

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
                    <EyeExaminationTwoSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">NeuroOpthalmology
                                    <Link to={'/neuro-opthalmology'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="NeuroOpthalmologyForm" onSubmit={updateNeuroOpthalmologyInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={NeuroOpthalmology.NeuroOpthalmology_name} className="form-control" name="NeuroOpthalmology_name" onChange={handleInput} />
                                                <span className="text-danger">{error.NeuroOpthalmology_name}</span>
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

export default EditNeuroOpthalmology;
