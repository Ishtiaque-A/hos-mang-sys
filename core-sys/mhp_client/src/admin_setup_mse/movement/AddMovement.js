import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddMovement() {

    const [Movement, setMovement] = useState({
        Movement_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setMovement({
            ...Movement, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Movement_name',  Movement.Movement_name);

    const submitMovement = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-movement`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setMovement({
                    Movement_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setMovement({ ...Movement, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Movement
                                        <Link to={'/movement'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="MovementForm" onSubmit={submitMovement}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Movement.Movement_name} className="form-control" name="Movement_name" onChange={handleInput} />
                                                    <span className="text-danger">{Movement.error_list.Movement_name}</span>

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

export default AddMovement;
