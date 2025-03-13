import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddProximalInterphalangealJoint() {

    const [ProximalInterphalangealJoint, setProximalInterphalangealJoint] = useState({
        ProximalInterphalangealJoint_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setProximalInterphalangealJoint({
            ...ProximalInterphalangealJoint, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('ProximalInterphalangealJoint_name',  ProximalInterphalangealJoint.ProximalInterphalangealJoint_name);

    const submitProximalInterphalangealJoint = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-proximal-interphalangeal-joint`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setProximalInterphalangealJoint({
                    ProximalInterphalangealJoint_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setProximalInterphalangealJoint({ ...ProximalInterphalangealJoint, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <MusculoSkeletalExaminationSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Proximal Interphalangeal Joint
                                        <Link to={'/proximal-interphalangeal-joint'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ProximalInterphalangealJointForm" onSubmit={submitProximalInterphalangealJoint}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={ProximalInterphalangealJoint.ProximalInterphalangealJoint_name} className="form-control" name="ProximalInterphalangealJoint_name" onChange={handleInput} />
                                                    <span className="text-danger">{ProximalInterphalangealJoint.error_list.ProximalInterphalangealJoint_name}</span>

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

export default AddProximalInterphalangealJoint;
