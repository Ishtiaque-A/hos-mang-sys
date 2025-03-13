import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddAt90FlextionPalpation() {

    const [at90Flextion, setAt90Flextion] = useState({
        name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setAt90Flextion({
            ...at90Flextion, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('name',  at90Flextion.name);

    const submitAt90Flextion = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-at-90-flextion`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setAt90Flextion({
                    name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setAt90Flextion({ ...at90Flextion, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add At 90° Flextion
                                        <Link to={'/at-90-flextion'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="At90FlextionForm" onSubmit={submitAt90Flextion}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={at90Flextion.name} className="form-control" name="name" onChange={handleInput} />
                                                    <span className="text-danger">{at90Flextion.error_list.name}</span>

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

export default AddAt90FlextionPalpation;
