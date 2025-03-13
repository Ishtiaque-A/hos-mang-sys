import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../billing_setup_sidebar/BillingSetUpSidebar'

function EditAccountsType() {

    const [accounts, setAccounts] = useState({
        name: "",
        accounts_id: "",
    });
    const params = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState([]);

    useEffect(() => {
        axios.get(`/all-accounts`).then(res => {
            if (res.data.status === 200) {
                setAccount(res.data.accounts);
            }

        });
        axios.get(`/edit-accounts-type/${params.id}`).then(res => {
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
    const submitAccountsType = (e) => {
        e.preventDefault();
        //   console.log(digital);

        axios.post(`/update-accounts-type/${params.id}`, accounts).then(res => {
            console.log(res)
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setAccounts({
                    name: "",
                    accounts_id: "",
                });
                navigate('/accounts-type');
            }
        })
    }
    console.log(accounts)
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
                                    <h6 className="card-title"> Add Accounts
                                        <Link to={'/accounts-type'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DigitalForm" onSubmit={submitAccountsType}>
                                        <div className="card-body">

                                            <div className="col-md-12">
                                                <label>Account</label>
                                                <select name='accounts_id' value={accounts.accounts_id} onChange={handleInput} className="form-select form-select-sm" aria-label="Default select example">
                                                    <option selected>Select</option>
                                                    {
                                                        account.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm">Type </label>
                                                    <input type="text" value={accounts.name} className="form-control" name="name" onChange={handleInput} />
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

export default EditAccountsType
