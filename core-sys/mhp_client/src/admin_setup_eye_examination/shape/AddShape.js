import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationSidebar from '../eye_examination_setup_mainsidebar/EyeExaminationSidebar';

function AddShape() {

    const [Shape, setShape] = useState({
        Shape_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setShape({
            ...Shape, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Shape_name',  Shape.Shape_name);

    const submitShape = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-shape`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setShape({
                    Shape_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setShape({ ...Shape, error_list: res.data.errors });

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
                                        <Link to={'/shape'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ShapeForm" onSubmit={submitShape}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Shape.Shape_name} className="form-control" name="Shape_name" onChange={handleInput} />
                                                    <span className="text-danger">{Shape.error_list.Shape_name}</span>

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

export default AddShape;
