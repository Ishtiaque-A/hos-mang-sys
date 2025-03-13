import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddShapeAndContour() {

    const [ShapeAndContour, setShapeAndContour] = useState({
        ShapeAndContour_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setShapeAndContour({
            ...ShapeAndContour, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('ShapeAndContour_name',  ShapeAndContour.ShapeAndContour_name);

    const submitShapeAndContour = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-shape-and-contour`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setShapeAndContour({
                    ShapeAndContour_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setShapeAndContour({ ...ShapeAndContour, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Shape & Contour
                                        <Link to={'/shape-and-contour'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ShapeAndContourForm" onSubmit={submitShapeAndContour}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={ShapeAndContour.ShapeAndContour_name} className="form-control" name="ShapeAndContour_name" onChange={handleInput} />
                                                    <span className="text-danger">{ShapeAndContour.error_list.ShapeAndContour_name}</span>

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

export default AddShapeAndContour;
