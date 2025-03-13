import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function AddDryRetinoscopy() {

    const [DryRetinoscopy, setDryRetinoscopy] = useState({
        DryRetinoscopy_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDryRetinoscopy({
            ...DryRetinoscopy, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('DryRetinoscopy_name',  DryRetinoscopy.DryRetinoscopy_name);

    const submitDryRetinoscopy = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-dry-retinoscopy`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDryRetinoscopy({
                    DryRetinoscopy_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDryRetinoscopy({ ...DryRetinoscopy, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Dry Retinoscopy
                                        <Link to={'/dry-retinoscopy'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DryRetinoscopyForm" onSubmit={submitDryRetinoscopy}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={DryRetinoscopy.DryRetinoscopy_name} className="form-control" name="DryRetinoscopy_name" onChange={handleInput} />
                                                    <span className="text-danger">{DryRetinoscopy.error_list.DryRetinoscopy_name}</span>

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

export default AddDryRetinoscopy;
