import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function AddNeuroOpthalmology() {

    const [NeuroOpthalmology, setNeuroOpthalmology] = useState({
        NeuroOpthalmology_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setNeuroOpthalmology({
            ...NeuroOpthalmology, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('NeuroOpthalmology_name', NeuroOpthalmology.NeuroOpthalmology_name);

    const submitNeuroOpthalmology = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-neuro-opthalmology`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setNeuroOpthalmology({
                    NeuroOpthalmology_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setNeuroOpthalmology({ ...NeuroOpthalmology, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <EyeExaminationTwoSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Neuro Opthalmology
                                        <Link to={'/neuro-opthalmology'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="NeuroOpthalmologyForm" onSubmit={submitNeuroOpthalmology}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={NeuroOpthalmology.NeuroOpthalmology_name} className="form-control" name="NeuroOpthalmology_name" onChange={handleInput} />
                                                    <span className="text-danger">{NeuroOpthalmology.error_list.NeuroOpthalmology_name}</span>

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

export default AddNeuroOpthalmology;
