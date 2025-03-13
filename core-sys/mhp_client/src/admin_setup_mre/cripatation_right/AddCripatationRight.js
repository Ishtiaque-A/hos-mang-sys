import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddCripatationRight() {

    const [CripatationRight, setCripatationRight] = useState({
        CripatationRight_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setCripatationRight({
            ...CripatationRight, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('CripatationRight_name',  CripatationRight.CripatationRight_name);

    const submitCripatationRight = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-cripatation-right`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setCripatationRight({
                    CripatationRight_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setCripatationRight({ ...CripatationRight, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MreSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Cripatation Right
                                        <Link to={'/cripatation-right'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="CripatationRightForm" onSubmit={submitCripatationRight}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={CripatationRight.CripatationRight_name} className="form-control" name="CripatationRight_name" onChange={handleInput} />
                                                    <span className="text-danger">{CripatationRight.error_list.CripatationRight_name}</span>

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

export default AddCripatationRight;
