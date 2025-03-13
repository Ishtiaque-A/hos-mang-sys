import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddDistalInterphalangealJoint() {

    const [DistalInterphalangealJoint, setDistalInterphalangealJoint] = useState({
        DistalInterphalangealJoint_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDistalInterphalangealJoint({
            ...DistalInterphalangealJoint, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('DistalInterphalangealJoint_name',  DistalInterphalangealJoint.DistalInterphalangealJoint_name);

    const submitDistalInterphalangealJoint = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-distal-interphalangeal-joint`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDistalInterphalangealJoint({
                    DistalInterphalangealJoint_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDistalInterphalangealJoint({ ...DistalInterphalangealJoint, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Distal Interphalangeal Joint
                                        <Link to={'/distal-interphalangeal-joint'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DistalInterphalangealJointForm" onSubmit={submitDistalInterphalangealJoint}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={DistalInterphalangealJoint.DistalInterphalangealJoint_name} className="form-control" name="DistalInterphalangealJoint_name" onChange={handleInput} />
                                                    <span className="text-danger">{DistalInterphalangealJoint.error_list.DistalInterphalangealJoint_name}</span>

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

export default AddDistalInterphalangealJoint;
