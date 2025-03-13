import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationSidebar from '../eye_examination_setup_mainsidebar/EyeExaminationSidebar';

function AddLesionRight() {

    const [LesionRight, setLesionRight] = useState({
        LesionRight_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setLesionRight({
            ...LesionRight, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('LesionRight_name',  LesionRight.LesionRight_name);

    const submitLesionRight = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-lesion-right`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setLesionRight({
                    LesionRight_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setLesionRight({ ...LesionRight, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <EyeExaminationSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Double Vision
                                        <Link to={'/lesion-right'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="LesionRightForm" onSubmit={submitLesionRight}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={LesionRight.LesionRight_name} className="form-control" name="LesionRight_name" onChange={handleInput} />
                                                    <span className="text-danger">{LesionRight.error_list.LesionRight_name}</span>

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

export default AddLesionRight;
