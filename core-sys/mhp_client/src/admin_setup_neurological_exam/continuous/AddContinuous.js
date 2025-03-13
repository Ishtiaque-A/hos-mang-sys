import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import NeurologicalSidebar from '../neurological_setup_mainsidebar/NeurologicalSidebar';


function AddContinuous() {

    const [Continuous, setContinuous] = useState({
        Continuous_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setContinuous({
            ...Continuous, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Continuous_name', Continuous.Continuous_name);

    const submitContinuous = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-continuous`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setContinuous({
                    Continuous_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setContinuous({ ...Continuous, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <NeurologicalSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Continuous
                                        <Link to={'/continuous'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ContinuousForm" onSubmit={submitContinuous}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Continuous.Continuous_name} className="form-control" name="Continuous_name" onChange={handleInput} />
                                                    <span className="text-danger">{Continuous.error_list.Continuous_name}</span>

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

export default AddContinuous;
