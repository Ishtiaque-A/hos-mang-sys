import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddWheezingLeft() {

    const [WheezingLeft, setWheezingLeft] = useState({
        WheezingLeft_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setWheezingLeft({
            ...WheezingLeft, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('WheezingLeft_name',  WheezingLeft.WheezingLeft_name);

    const submitWheezingLeft = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
         console.log(e)
        axios.post(`/save-wheezing-left`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setWheezingLeft({
                    WheezingLeft_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setWheezingLeft({ ...WheezingLeft, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MreSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Wheezing Left
                                        <Link to={'/wheezing-left'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="WheezingLeftForm" onSubmit={submitWheezingLeft}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={WheezingLeft.WheezingLeft_name} className="form-control" name="WheezingLeft_name" onChange={handleInput} />
                                                    <span className="text-danger">{WheezingLeft.error_list.WheezingLeft_name}</span>

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

export default AddWheezingLeft;
