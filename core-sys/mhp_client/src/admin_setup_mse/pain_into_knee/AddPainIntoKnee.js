import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddPainIntoKnee() {

    const [PainIntoKnee, setPainIntoKnee] = useState({
        PainIntoKnee_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setPainIntoKnee({
            ...PainIntoKnee, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('PainIntoKnee_name',  PainIntoKnee.PainIntoKnee_name);

    const submitPainIntoKnee = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-pain-into-knee`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setPainIntoKnee({
                    PainIntoKnee_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setPainIntoKnee({ ...PainIntoKnee, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Pain Into Knee
                                        <Link to={'/pain-into-knee'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="PainIntoKneeForm" onSubmit={submitPainIntoKnee}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={PainIntoKnee.PainIntoKnee_name} className="form-control" name="PainIntoKnee_name" onChange={handleInput} />
                                                    <span className="text-danger">{PainIntoKnee.error_list.PainIntoKnee_name}</span>

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

export default AddPainIntoKnee;
