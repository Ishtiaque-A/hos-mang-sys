import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';

function AddDoctorFeeGroup() {


    const [doctorFee, setdoctorFee] = useState({
        fee_name: "",
        accounts_id: "",
        accounts_type_id: "",
    });

    const [accounts, setAccounts] = useState([]);
    const [accountsType, setAccountsType] = useState([]);
    useEffect(() => {
        axios.get(`/all-accounts-type`).then(res => {
            if (res.data.status === 200) {
                setAccountsType(res.data.accounts);
            }

        });
        axios.get(`/all-accounts`).then(res => {
            if (res.data.status === 200) {
                setAccounts(res.data.accounts);
            }

        });
    }, []);

    const handleInput = (e) => {
        setdoctorFee({
            ...doctorFee, [e.target.name]: e.target.value
        });
    }

    const submitCanal = (e) => {
        e.preventDefault();
        const data = {
            fee_name: doctorFee.fee_name,
            accounts_id: doctorFee.accounts_id,
            accounts_type_id: doctorFee.accounts_type_id,

        }

        axios.post(`/save-doctorFeeName`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setdoctorFee({
                    fee_name: "",
                    accounts_id: "",
                    accounts_type_id: "",

                });
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
                                    <h6 className="card-title"> Add Accounts Group
                                        <Link to={'/doctorFee-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="EarCanalForm" onSubmit={submitCanal}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                <label className='mb-1'>Account</label>
                                                <select name='accounts_id' value={accounts.accounts_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
                                                    <option selected>Select</option>
                                                    {
                                                        accounts.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label className='mb-1'>Accounts Type</label>
                                                <select name='accounts_type_id' value={accounts.accounts_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
                                                    <option selected>Select</option>
                                                    {
                                                        accountsType.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Accounts Group Name </label>
                                                    <input type="text" value={doctorFee.fee_name} className="form-control" name="fee_name" onChange={handleInput} />

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

export default AddDoctorFeeGroup;
