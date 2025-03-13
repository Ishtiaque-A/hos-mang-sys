import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GeneralExaminationSidebar from '../general_examination_setup_mainsidbar/GeneralExaminationSidebar';

function AddDehydration() {

    const [dehydration, setdehydration] = useState({
        dehydration_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setdehydration({
            ...dehydration, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('dehydration_name',  dehydration.dehydration_name);

    const submitDehydration = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-dehydration`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setdehydration({
                    dehydration_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setdehydration({ ...dehydration, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Dehydration
                                        <Link to={'/dehydration'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DehydrationForm" onSubmit={submitDehydration}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={dehydration.dehydration_name} className="form-control" name="dehydration_name" onChange={handleInput} />
                                                    <span className="text-danger">{dehydration.error_list.dehydration_name}</span>

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

export default AddDehydration;
