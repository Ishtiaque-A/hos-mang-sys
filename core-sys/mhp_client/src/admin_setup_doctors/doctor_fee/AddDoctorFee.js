import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';

function AddDoctorFee() {


    const [doctor, setDoctor] = useState([]);

    const [Fee, setFee] = useState([]);

    const [doctor_fee, setdoctor_fee] = useState({
        accounts_id: "",
        accounts_type_id: "",
        accounts_group_id: "",
        fee_name: "",
        doctor_id: "",
        item_code: "",
        doctorfee_id: "",
        error_list: [],
    });
    const [accounts, setAccounts] = useState([]);
    const [accountsType, setAccountsType] = useState([]);

    //all-doctors
    useEffect(() => {
        axios.get(`/all-doctorList`).then(res => {
            if (res.data.status === 200) {
                setDoctor(res.data.allDoctors);
            }
        })
        axios.get(`/all-doctorFee`).then(res => {
            if (res.data.status === 200) {
                setFee(res.data.doctorFees);
            }
        })
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
        setdoctor_fee({
            ...doctor_fee, [e.target.name]: e.target.value
        });
    }

    const submitCanal = (e) => {
        e.preventDefault();
        const data = {
            fee_name: doctor_fee.fee_name,
            doctor_id: doctor_fee.doctor_id,
            item_code: doctor_fee.item_code,
            doctorfee_id: doctor_fee.doctorfee_id,
            accounts_id: doctor_fee.accounts_id,
            accounts_type_id: doctor_fee.accounts_type_id,
            accounts_group_id: doctor_fee.accounts_group_id,
        }

        console.log('datacheck', data);
        axios.post(`/save-doctorFee`, data).then(res => {
            console.log(res, 'res')
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setdoctor_fee({
                    accounts_id: "",
                    accounts_type_id: "",
                    fee_name: "",
                    doctorfee_id: "",
                    doctor_id: "",
                    item_code: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setdoctor_fee({ ...doctor_fee, error_list: res.data.errors });

            }

        })
    }
    console.log(doctor_fee, 'doctor_fee');
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
                                    <h6 className="card-title"> Add Doctor Fee
                                        <Link to={'/doctor-fee'} className="btn btn-primary btn-sm float-end"> Back </Link>
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

                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Accounts Group</label>

                                                    <select id="inputState" onChange={handleInput} value={doctor_fee.accounts_group_id} name="accounts_group_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            Fee.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.fee_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="text-danger">{doctor_fee.error_list.doctor_id}</span>

                                                </div>

                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Doctor Name</label>

                                                    <select id="inputState" onChange={handleInput} value={doctor_fee.doctor_id} name="doctor_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            doctor.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.dr_given_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="text-danger">{doctor_fee.error_list.doctor_id}</span>

                                                </div>

                                                <div className="form-group mt-2">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Doctor Fees</label>
                                                    <input type="text" value={doctor_fee.fee_name} className="form-control" name="fee_name" onChange={handleInput} />
                                                    <span className="text-danger">{doctor_fee.error_list.fee_name}</span>

                                                </div>

                                                <div className="form-group mt-2">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Item Code</label>
                                                    <input type="text" value={doctor_fee.item_code} className="form-control" name="item_code" onChange={handleInput} />
                                                    <span className="text-danger">{doctor_fee.error_list.item_code}</span>

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

export default AddDoctorFee
