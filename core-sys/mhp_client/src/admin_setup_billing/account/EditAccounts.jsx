import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../billing_setup_sidebar/BillingSetUpSidebar'

function EditAccounts() {

    const [accounts, setAccounts] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        axios.get(`/edit-accounts/${params.id}`).then(res => {

            if (res.data.status === 200) {
                setAccounts(res.data.account);
            }

        });

    }, []);




    const handleInput = (e) => {
        setAccounts({
            ...accounts, [e.target.name]: e.target.value
        });
    }
    const submitDigital = (e) => {
        e.preventDefault();

        axios.post(`/update-accounts/${params.id}`, accounts).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setAccounts({ name: '' });
                navigate('/accounts');
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
                                    <h6 className="card-title"> Edit Digital
                                        <Link to={'/accounts'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DigitalForm" onSubmit={submitDigital}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={accounts.name} className="form-control" name="name" onChange={handleInput} />


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
        </div>
    )
}

export default EditAccounts
