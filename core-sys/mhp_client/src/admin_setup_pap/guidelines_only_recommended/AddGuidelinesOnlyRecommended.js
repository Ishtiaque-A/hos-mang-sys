import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MedicationSetupSidebar from '../medication_setup_main_sidebar/MedicationSetupSidebar';

function AddGuidelinesOnlyRecommended() {

    const [guidelinesOnlyRecommended, setGuidelinesOnlyRecommended] = useState({
        name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setGuidelinesOnlyRecommended({
            ...guidelinesOnlyRecommended, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('name', guidelinesOnlyRecommended.name);

    const submitGuidelinesOnlyRecommended = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-guidelines-only-recommended`, formData).then(res => {
            console.log("save-guidelines-only-recommended", res)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setGuidelinesOnlyRecommended({
                    name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setGuidelinesOnlyRecommended({ ...guidelinesOnlyRecommended, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MedicationSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Guide lines Only Recommended
                                        <Link to={'/guidelines-only-recommended'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="GuidelinesOnlyRecommendedForm" onSubmit={submitGuidelinesOnlyRecommended}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={guidelinesOnlyRecommended.name} className="form-control" name="name" onChange={handleInput} />
                                                    <span className="text-danger">{guidelinesOnlyRecommended.error_list.name}</span>

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

export default AddGuidelinesOnlyRecommended;
