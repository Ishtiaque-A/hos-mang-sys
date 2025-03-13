import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import RadiologySetupSidebar from '../radiology_setup_mainsidebar/RadiologySetupSidebar';



function AddRadiologyTestType() {
    const [RadiologyTestType, setRadiologyTestType] = useState({
        radiology_test_type: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setRadiologyTestType({
            ...RadiologyTestType, [e.target.name]: e.target.value
        });
    }



    const submitRadiologyTestType = (e) => {
        e.preventDefault();
        // console.log("submitRadiologyTestType", RadiologyTestType);
        console.log(e)
        axios.post(`/save-radiology-test-type`, RadiologyTestType).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setRadiologyTestType({
                    radiology_test_type: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setRadiologyTestType({ ...RadiologyTestType, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            < RadiologySetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Radiology Test Type
                                        <Link to={'/radiology-test-type'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestTypeForm" onSubmit={submitRadiologyTestType}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={RadiologyTestType.radiology_test_type} className="form-control" name="radiology_test_type" onChange={handleInput} />
                                                    <span className="text-danger">{RadiologyTestType.error_list.radiology_test_type}</span>
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

export default AddRadiologyTestType;





