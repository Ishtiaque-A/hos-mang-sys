import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../billing_setup_sidebar/BillingSetUpSidebar'

function EditBranch() {

    const [branch, setbranch] = useState('');
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        axios.get(`/edit-branch/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setbranch(res.data.branch);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);




    const handleInput = (e) => {
        setbranch({
            ...branch, [e.target.name]: e.target.value
        });
    }
    const submitbranch = (e) => {
        e.preventDefault();
        //   console.log(branch);


        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.put(`/update-branch/${lastpart}`, branch).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setbranch({
                    branch_name: "",
                    error_list: [],

                });
                setError('')
                navigate('/branch');
            }
            else {
                setError(res.data.errors)
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
                                    <h6 className="card-title"> Edit Branch
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
                                                    <span className="text-danger">{error.branch_name}</span>

                                                </div>


                                                <div className="float-right mb-3">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                        className="fas fa-save"></i> Update
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

export default EditBranch
