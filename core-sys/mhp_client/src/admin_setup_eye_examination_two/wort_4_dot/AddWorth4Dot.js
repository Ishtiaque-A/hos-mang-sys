import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function AddWorth4Dot() {

    const [Worth4Dot, setWorth4Dot] = useState({
        Worth4Dot_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setWorth4Dot({
            ...Worth4Dot, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Worth4Dot_name',  Worth4Dot.Worth4Dot_name);

    const submitWorth4Dot = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-worth-4-dot`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setWorth4Dot({
                    Worth4Dot_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setWorth4Dot({ ...Worth4Dot, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Worth-4-Dot
                                        <Link to={'/worth-4-dot'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="Worth4DotForm" onSubmit={submitWorth4Dot}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Worth4Dot.Worth4Dot_name} className="form-control" name="Worth4Dot_name" onChange={handleInput} />
                                                    <span className="text-danger">{Worth4Dot.error_list.Worth4Dot_name}</span>

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

export default AddWorth4Dot;
