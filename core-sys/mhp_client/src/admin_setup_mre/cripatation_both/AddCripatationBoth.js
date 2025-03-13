import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddCripatationBoth() {

    const [CripatationBoth, setCripatationBoth] = useState({
        CripatationBoth_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setCripatationBoth({
            ...CripatationBoth, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('CripatationBoth_name', CripatationBoth.CripatationBoth_name);

    const submitCripatationBoth = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-cripatation-both`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setCripatationBoth({
                    CripatationBoth_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setCripatationBoth({ ...CripatationBoth, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Cripatation Both
                                        <Link to={'/cripatation-both'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="CripatationBothForm" onSubmit={submitCripatationBoth}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={CripatationBoth.CripatationBoth_name} className="form-control" name="CripatationBoth_name" onChange={handleInput} />
                                                    <span className="text-danger">{CripatationBoth.error_list.CripatationBoth_name}</span>

                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
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

export default AddCripatationBoth;
