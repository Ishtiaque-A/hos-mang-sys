import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../billing_setup_sidebar/BillingSetUpSidebar'

function AddBranch() {

    const [branch, setbranch] = useState({
        branch_name: "",
        error_list: [],
    });


    const handleInput = (e) => {
        setbranch({
            ...branch, [e.target.name]: e.target.value
        });
    }
    const submitbranch = (e) => {
        e.preventDefault();
        //   console.log(branch);

        axios.post(`/save-branch`, branch).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setbranch({
                    branch_name: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setbranch({ ...branch, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <BillingSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Branch
                                        <Link to={'/branch'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="branch-body">
                                    <form id="branchForm" onSubmit={submitbranch}>
                                        <div className="branch-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={branch.branch_name} className="form-control" name="branch_name" onChange={handleInput} />
                                                    <span className="text-danger">{branch.error_list.branch_name}</span>

                                                </div>


                                                <div className="float-right mb-3">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                        className="fas fa-save"></i> Save
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

export default AddBranch
