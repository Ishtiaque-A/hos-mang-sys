import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationSidebar from '../eye_examination_setup_mainsidebar/EyeExaminationSidebar';

function AddNeuroOpthal() {

    const [NeuroOpthal, setNeuroOpthal] = useState({
        NeuroOpthal_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setNeuroOpthal({
            ...NeuroOpthal, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('NeuroOpthal_name', NeuroOpthal.NeuroOpthal_name);

    const submitNeuroOpthal = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-neuro-opthal`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setNeuroOpthal({
                    NeuroOpthal_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setNeuroOpthal({ ...NeuroOpthal, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <EyeExaminationSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Neuro Opthal
                                        <Link to={'/neuro-opthal'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="NeuroOpthalForm" onSubmit={submitNeuroOpthal}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={NeuroOpthal.NeuroOpthal_name} className="form-control" name="NeuroOpthal_name" onChange={handleInput} />
                                                    <span className="text-danger">{NeuroOpthal.error_list.NeuroOpthal_name}</span>

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

export default AddNeuroOpthal;
