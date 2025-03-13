import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function AddColorVision() {

    const [ColorVision, setColorVision] = useState({
        ColorVision_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setColorVision({
            ...ColorVision, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('ColorVision_name',  ColorVision.ColorVision_name);

    const submitColorVision = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-color-vision`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setColorVision({
                    ColorVision_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setColorVision({ ...ColorVision, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Color Vision
                                        <Link to={'/color-vision'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="ColorVisionForm" onSubmit={submitColorVision}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={ColorVision.ColorVision_name} className="form-control" name="ColorVision_name" onChange={handleInput} />
                                                    <span className="text-danger">{ColorVision.error_list.ColorVision_name}</span>

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

export default AddColorVision;
