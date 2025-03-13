import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddWrist() {

    const [Wrist, setWrist] = useState({
        Wrist_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setWrist({
            ...Wrist, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Wrist_name',  Wrist.Wrist_name);

    const submitWrist = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-wrist`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setWrist({
                    Wrist_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setWrist({ ...Wrist, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Wrist
                                        <Link to={'/wrist'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="WristForm" onSubmit={submitWrist}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Wrist.Wrist_name} className="form-control" name="Wrist_name" onChange={handleInput} />
                                                    <span className="text-danger">{Wrist.error_list.Wrist_name}</span>

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

export default AddWrist;
