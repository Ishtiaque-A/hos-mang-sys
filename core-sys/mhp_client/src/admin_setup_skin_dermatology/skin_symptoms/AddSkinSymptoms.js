import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import SkinDermatologySetupSidebar from '../skin_dermatology_setup_mainsidebar/SkinDermatologySetupSidebar';

function AddSkinSymptoms() {

    const [skinSymptoms, setSkinSymptoms] = useState({
        name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setSkinSymptoms({
            ...skinSymptoms, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('name',  skinSymptoms.name);

    const submitSkinSymptoms = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-skin-symptoms`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setSkinSymptoms({
                    name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setSkinSymptoms({ ...skinSymptoms, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <SkinDermatologySetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Skin Symptoms
                                        <Link to={'/skin-symptoms'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SkinSymptomsForm" onSubmit={submitSkinSymptoms}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={skinSymptoms.name} className="form-control" name="name" onChange={handleInput} />
                                                    <span className="text-danger">{skinSymptoms.error_list.name}</span>

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

export default AddSkinSymptoms;
