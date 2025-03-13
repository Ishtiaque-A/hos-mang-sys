import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsOneSetupSidebar from '../cns_one_setup_mainsidebar/CnsOneSetupSidebar';

function AddMotor() {

    const [motor, setmotor] = useState({
        motor_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setmotor({
            ...motor, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('motor_name',  motor.motor_name);

    const submitMotor = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-motor`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setmotor({
                    motor_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setmotor({ ...motor, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <CnsOneSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Motor
                                        <Link to={'/motor'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="MotorForm" onSubmit={submitMotor}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={motor.motor_name} className="form-control" name="motor_name" onChange={handleInput} />
                                                    <span className="text-danger">{motor.error_list.motor_name}</span>

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

export default AddMotor;
