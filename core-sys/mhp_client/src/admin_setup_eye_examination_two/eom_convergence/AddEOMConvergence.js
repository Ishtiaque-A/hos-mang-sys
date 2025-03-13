import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function AddEOMConvergence() {

    const [EOMConvergence, setEOMConvergence] = useState({
        EOMConvergence_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setEOMConvergence({
            ...EOMConvergence, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('EOMConvergence_name',  EOMConvergence.EOMConvergence_name);

    const submitEOMConvergence = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-eom-convergence`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setEOMConvergence({
                    EOMConvergence_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setEOMConvergence({ ...EOMConvergence, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <EyeExaminationTwoSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Convergence
                                        <Link to={'/eom-convergence'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="EOMConvergenceForm" onSubmit={submitEOMConvergence}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={EOMConvergence.EOMConvergence_name} className="form-control" name="EOMConvergence_name" onChange={handleInput} />
                                                    <span className="text-danger">{EOMConvergence.error_list.EOMConvergence_name}</span>

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

export default AddEOMConvergence;
