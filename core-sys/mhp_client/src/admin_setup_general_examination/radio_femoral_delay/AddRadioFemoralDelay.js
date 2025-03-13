import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GeneralExaminationSidebar from '../general_examination_setup_mainsidbar/GeneralExaminationSidebar';

function AddRadioFemoralDelay() {

    const [name, setname] = useState({
        name_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setname({
            ...name, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('name_name',  name.name_name);

    const submitRadioFemoralDelay = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-radio-femoral-delay`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setname({
                    name_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setname({ ...name, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <GeneralExaminationSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Radio Femoral Delay
                                        <Link to={'/radio-femoral-delay'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadioFemoralDelayForm" onSubmit={submitRadioFemoralDelay}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={name.name_name} className="form-control" name="name_name" onChange={handleInput} />
                                                    <span className="text-danger">{name.error_list.name_name}</span>

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

export default AddRadioFemoralDelay;
