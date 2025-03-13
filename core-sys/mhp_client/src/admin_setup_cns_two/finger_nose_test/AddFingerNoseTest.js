import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function AddFingerNoseTest() {

    const [FingerNoseTest, setFingerNoseTest] = useState({
        FingerNoseTest_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setFingerNoseTest({
            ...FingerNoseTest, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('FingerNoseTest_name', FingerNoseTest.FingerNoseTest_name);

    const submitFingerNoseTest = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-finger-nose-test`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setFingerNoseTest({
                    FingerNoseTest_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setFingerNoseTest({ ...FingerNoseTest, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <CnsTwoSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Finger Nose Test
                                        <Link to={'/finger-nose-test'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="FingerNoseTestForm" onSubmit={submitFingerNoseTest}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={FingerNoseTest.FingerNoseTest_name} className="form-control" name="FingerNoseTest_name" onChange={handleInput} />
                                                    <span className="text-danger">{FingerNoseTest.error_list.FingerNoseTest_name}</span>

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

export default AddFingerNoseTest;
