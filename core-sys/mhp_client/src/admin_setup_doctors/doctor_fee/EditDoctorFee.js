import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';

function EditDoctorFee(props) {

    const [doctor, setDoctor] = useState([]);
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
    const [error, setError] = useState([]);
    const [Fee, setFee] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-doctorFee/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setdoctor_fee(res.data.doctorFee);
                // setDoctor(res.data.doctor_id);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


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
        e.persist();
        setdoctor_fee({ ...doctor_fee, [e.target.name]: e.target.value });
    }

    const updateCanalInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = doctor_fee;
        axios.put(`/update-doctorFee/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setdoctor_fee({
                    ...doctor_fee,

                });
                setError('')
                navigate('/doctor-fee')
            } else {
                setError(res.data.errors)
            }
        });

    }

    console.log(doctor_fee, 'doctor_fee')
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <BillingSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Doctor Fees
                                    <Link to={'/doctor-fee'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="EarCanalForm" onSubmit={updateCanalInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <label className='mb-1'>Account</label>
                                            <select name='accounts_id' value={doctor_fee.accounts_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
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
                                            <select name='accounts_type_id' value={doctor_fee.accounts_type_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
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
                                                <span className="text-danger">{doctor_fee.error_list?.doctor_id}</span>

                                            </div>
                                            {/* <div>
                                                <label htmlFor="inputPassword4"
                                                    className="form-label  col-form-label col-form-label-sm">Select Fee</label>

                                                <select id="inputState" onChange={handleInput} value={doctor_fee.doctorfee_id} name="doctorfee_id"
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

                                            </div> */}
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
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Fees</label>
                                                <input type="text" value={doctor_fee.fee_name} className="form-control" name="fee_name" onChange={handleInput} />
                                                <span className="text-danger">{error.fee_name}</span>

                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Item Code</label>
                                                <input type="text" value={doctor_fee.item_code} className="form-control" name="item_code" onChange={handleInput} />
                                                <span className="text-danger">{error.item_code}</span>

                                            </div>

                                            <div className="float-right">
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

    )
}

export default EditDoctorFee
