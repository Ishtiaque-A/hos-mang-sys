import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';


function AddRenneTest() {

    const [RenneTest, setRenneTest] = useState({
        RenneTest_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setRenneTest({
            ...RenneTest, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('RenneTest_name', RenneTest.RenneTest_name);

    const submitRenneTest = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-renne-test`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setRenneTest({
                    RenneTest_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setRenneTest({ ...RenneTest, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <EntSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Renne Test
                                        <Link to={'/renne-test'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RenneTestForm" onSubmit={submitRenneTest}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={RenneTest.RenneTest_name} className="form-control" name="RenneTest_name" onChange={handleInput} />
                                                    <span className="text-danger">{RenneTest.error_list.RenneTest_name}</span>

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

export default AddRenneTest;
