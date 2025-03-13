import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';

function EditDoctorFeeGroup(props) {

    const [doctorFee, setdoctorFee] = useState([]);
    const [error, setError] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [accountsType, setAccountsType] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-doctorFeeName/${params.id}`).then(res => {

            if (res.data.status === 200) {
                setdoctorFee(res.data.doctorFeeName);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });
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
        setdoctorFee({ ...doctorFee, [e.target.name]: e.target.value });
    }

    const updateCanalInput = (e) => {
        e.preventDefault();

        const data = doctorFee;
        console.log('edit pdata', data);
        axios.put(`/update-doctorFeeName/${params.id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setdoctorFee({
                    ...doctorFee,

                });
                setError('')
                navigate('/doctorFee-name');
            } else {
                setError(res.data.errors)
            }
        });

    }

    console.log(doctorFee, "doctorFee")
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
                                <h6 className="card-title"> Edit Accounts Group
                                    <Link to={'/doctorFee-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="EarCanalForm" onSubmit={updateCanalInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label className='mb-1'>Account</label>
                                                <select name='accounts_id' value={doctorFee.accounts_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
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
                                                <select name='accounts_type_id' value={doctorFee.accounts_type_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
                                                    <option selected>Select</option>
                                                    {
                                                        accountsType.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <label htmlFor="history_name" className="col-form-label-sm"> Doctor Fee Name </label>
                                                <input type="text" value={doctorFee.fee_name} className="form-control" name="fee_name" onChange={handleInput} />
                                                <span className="text-danger">{error.fee_name}</span>

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

export default EditDoctorFeeGroup
