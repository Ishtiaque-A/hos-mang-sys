import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function AddJerkC1C8() {

    const [JerkC1C8, setJerkC1C8] = useState({
        JerkC1C8_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setJerkC1C8({
            ...JerkC1C8, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('JerkC1C8_name', JerkC1C8.JerkC1C8_name);

    const submitJerkC1C8 = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-jerk-c1-c8`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setJerkC1C8({
                    JerkC1C8_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setJerkC1C8({ ...JerkC1C8, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Jerk (C1,C8)
                                        <Link to={'/jerk-c1-c8'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="JerkC1C8Form" onSubmit={submitJerkC1C8}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={JerkC1C8.JerkC1C8_name} className="form-control" name="JerkC1C8_name" onChange={handleInput} />
                                                    <span className="text-danger">{JerkC1C8.error_list.JerkC1C8_name}</span>

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

export default AddJerkC1C8;
