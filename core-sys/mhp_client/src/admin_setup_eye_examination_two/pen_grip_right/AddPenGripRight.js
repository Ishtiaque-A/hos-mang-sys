import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function AddPenGripRight() {

    const [PenGripRight, setPenGripRight] = useState({
        PenGripRight_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setPenGripRight({
            ...PenGripRight, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('PenGripRight_name',  PenGripRight.PenGripRight_name);

    const submitPenGripRight = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-pen-grip-right`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setPenGripRight({
                    PenGripRight_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setPenGripRight({ ...PenGripRight, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Pen Grip Right
                                        <Link to={'/pen-grip-right'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="PenGripRightForm" onSubmit={submitPenGripRight}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={PenGripRight.PenGripRight_name} className="form-control" name="PenGripRight_name" onChange={handleInput} />
                                                    <span className="text-danger">{PenGripRight.error_list.PenGripRight_name}</span>

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

export default AddPenGripRight;
