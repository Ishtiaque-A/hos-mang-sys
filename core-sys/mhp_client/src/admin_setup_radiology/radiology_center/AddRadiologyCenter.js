import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import RadiologySetupSidebar from '../radiology_setup_mainsidebar/RadiologySetupSidebar';



function AddRadiologyCenter() {

    const [RadiologyCenter, setRadiologyCenter] = useState({
        radiology_center_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setRadiologyCenter({
            ...RadiologyCenter, [e.target.name]: e.target.value
        });
    }



    const submitRadiologyCenter = (e) => {
        e.preventDefault();
        // console.log("submitRadiologyCenter", RadiologyCenter);
        console.log(e)
        axios.post(`/save-radiology-center`, RadiologyCenter).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setRadiologyCenter({
                    radiology_center_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setRadiologyCenter({ ...RadiologyCenter, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        < RadiologySetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Radiology Center Name
                                        <Link to={'/radiology-center'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyCenterForm" onSubmit={submitRadiologyCenter}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={RadiologyCenter.radiology_center_name} className="form-control" name="radiology_center_name" onChange={handleInput} />
                                                    <span className="text-danger">{RadiologyCenter.error_list.radiology_center_name}</span>
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

export default AddRadiologyCenter;

