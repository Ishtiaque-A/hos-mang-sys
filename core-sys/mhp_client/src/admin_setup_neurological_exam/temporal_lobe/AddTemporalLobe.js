import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import NeurologicalSidebar from '../neurological_setup_mainsidebar/NeurologicalSidebar';

function AddTemporalLobe() {

    const [TemporalLobe, setTemporalLobe] = useState({
        TemporalLobe_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setTemporalLobe({
            ...TemporalLobe, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('TemporalLobe_name', TemporalLobe.TemporalLobe_name);

    const submitTemporalLobe = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-temporal-lobe`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setTemporalLobe({
                    TemporalLobe_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setTemporalLobe({ ...TemporalLobe, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Temporal Lobe
                                        <Link to={'/temporal-lobe'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="TemporalLobeForm" onSubmit={submitTemporalLobe}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={TemporalLobe.TemporalLobe_name} className="form-control" name="TemporalLobe_name" onChange={handleInput} />
                                                    <span className="text-danger">{TemporalLobe.error_list.TemporalLobe_name}</span>

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

export default AddTemporalLobe;
