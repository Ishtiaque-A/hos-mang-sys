import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import RadiologySetupSidebar from '../radiology_setup_mainsidebar/RadiologySetupSidebar';



function AddRadiologyTestName() {

    const [RadiologyTestName, setRadiologyTestName] = useState({
        radiology_test_name: "",
        radiology_test_type_id: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setRadiologyTestName({
            ...RadiologyTestName, [e.target.name]: e.target.value
        });
    }

    const [RadiologyTestType, setRadiologyTestType] = useState([]);


    useEffect(() => {
        axios.get(`/radiology-test-type`).then(res => {
            if (res.data.status === 200) {
                setRadiologyTestType(res.data.radiology_test_type);
            }

        });

    }, []);



    const submitRadiologyTestName = (e) => {
        e.preventDefault();
        // console.log("submitRadiologyTestName", RadiologyTestName);
        console.log(e)
        axios.post(`/save-radiology-test-name`, RadiologyTestName).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setRadiologyTestName({
                    radiology_test_name: "",
                    radiology_test_type_id:"",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setRadiologyTestName({ ...RadiologyTestName, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Radiology Test Name
                                        <Link to={'/radiology-test-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestNameForm" onSubmit={submitRadiologyTestName}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                
                                            <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Test Type</label>
                                                    <select id="inputState" onChange={handleInput} value={RadiologyTestName.radiology_test_type_id} name="radiology_test_type_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            RadiologyTestType.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.radiology_test_type}</option>
                                                                )
                                                            })
                                                        }
                                                        <span className="text-danger">{RadiologyTestName.error_list.radiology_test_type}</span>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={RadiologyTestName.radiology_test_name} className="form-control" name="radiology_test_name" onChange={handleInput} />
                                                    <span className="text-danger">{RadiologyTestName.error_list.radiology_test_name}</span>
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

export default AddRadiologyTestName;

