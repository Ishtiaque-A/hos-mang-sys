import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AddProcedure() {
    const [procedure_name, setProcedureName] = useState({
        procedure_name: "",
        accounts_id: "",
        accounts_type_id: "",
        accounts_group_id: ''
    });
    const [accounts, setAccounts] = useState([]);
    const [accountsType, setAccountsType] = useState([]);
    const [accountsGroup, setAccountsGroup] = useState([]);

    //all-doctors
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
        axios.get(`/all-doctorFee`).then(res => {
            if (res.data.status === 200) {
                setAccountsGroup(res.data.doctorFees);
            }
        })
    }, []);
    const handleInput = (e) => {
        setProcedureName({
            ...procedure_name, [e.target.name]: e.target.value
        });
    }
    const saveProcedureName = async (e) => {
        e.preventDefault();
        const res = await axios.post('/add-procedure-name', procedure_name);
        console.log(res, "res");
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            setProcedureName({
                procedure_name: '',
            })
        }

    }
    console.log(procedure_name, "procedure_name");
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <BillingSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className='card'>
                        <div className="card-header">
                            <h6 className="card-title">Add  Procedure Name

                                <Link to={"/procedure-name"} className="btn btn-primary btn-sm float-end">Back</Link>

                            </h6>

                        </div>
                        <div className="card-body">
                            <form onSubmit={saveProcedureName}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <label className='mb-1'>Account</label>
                                        <select name='accounts_id' value={procedure_name.accounts_id} onChange={handleInput} className="form-select form-select-sm mb-2" aria-label="Default select example">
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
                                        <label htmlFor="inputPassword4"
                                            className="form-label  col-form-label col-form-label-sm">Accounts Group</label>

                                        {/* <select id="inputState" onChange={handleInput} value={procedure_name.accounts_group_id} name="accounts_group_id"
                                            className="form-select  col-form-label-sm font-size-patient">
                                            <option selected>Select</option>
                                            {
                                                accountsGroup.map((item) => {
                                                    return (
                                                        <option value={item.id} key={item.id}>{item.fee_name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <div className="form-group">
                                            <label htmlFor="procedure_name" className="col-form-label-sm">Procedure Name</label>
                                            <input type="text" className="form-control form-control-sm" onChange={handleInput} value={procedure_name.procedure_name} name="procedure_name" />
                                        </div>

                                        <div className="float-right">
                                            <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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
    )
}
