import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../billing_setup_sidebar/BillingSetUpSidebar'

function AddBank() {
    const [branches, setBranches] = useState([]);
    const [bank, setbank] = useState({
        bank_name: "",
        branch_id: "",
        error_list: [],
    });

    useEffect(() => {
        axios.get(`/all-branch`).then(res => {
            if (res.data.status == 200) {
                setBranches(res.data.allBranch);
                // console.log(res.data.allBranch)
            }
        })
    }, [])

    const handleInput = (e) => {
        setbank({
            ...bank, [e.target.name]: e.target.value
        });
    }
    const submitcard = (e) => {
        e.preventDefault();
        console.log(bank);

        axios.post(`/save-bank`, bank).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setbank({
                    bank_name: "",
                    branch_id: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setbank({ ...bank, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Bank
                                        <Link to={'/bank'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="cardForm" onSubmit={submitcard}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Select Branch</label>

                                                    <select id="inputState" onChange={handleInput} value={branches.branch_id} name="branch_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            branches.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.branch_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {/* <span className="text-danger">{gasreflex.error_list.status_id}</span> */}

                                                </div>

                                                <div className="form-group mt-3">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={bank.bank_name} className="form-control" name="bank_name" onChange={handleInput} />
                                                    {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

                                                </div>




                                                <div className="float-right">
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

export default AddBank
