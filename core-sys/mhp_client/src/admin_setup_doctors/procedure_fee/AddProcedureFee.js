import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../../admin_setup_billing/billing_setup_sidebar/BillingSetUpSidebar';

function AddProcedureFee() {

    const [procedure, setprocedure] = useState([]);
    const [procedureFee, setprocedureFee] = useState({
        fee_name: "",
        subProcedure_name: "",
        procedure_id: "",
        item_code: "",
        description: "",
        error_list: [],
    });

    useEffect(() => {
        axios.get(`/procedure-dropdown`).then(res => {
            console.log(res.data.procedure_name);
            if (res.data.status === 200) {
                setprocedure(res.data.procedure_name);
            }
        })
    },
        []);

    const handleInput = (e) => {
        setprocedureFee({
            ...procedureFee, [e.target.name]: e.target.value
        });
    }

    const submitCanal = (e) => {
        e.preventDefault();

        const data = {
            fee_name: procedureFee.fee_name,
            subProcedure_name: procedureFee.subProcedure_name,
            procedure_id: procedureFee.procedure_id,
            item_code: procedureFee.item_code,
            description: procedureFee.description,
        }

        axios.post(`/save-procedureFee`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setprocedureFee({
                    fee_name: "",
                    procedure_id: "",
                    subProcedure_name: "",
                    item_code: "",
                    description: "",
                    error_list: [],
                });
            }
            else if (res.data.status == 400) {
                setprocedureFee({ ...procedureFee, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Procedure Fees
                                        <Link to={'/procedure-fee'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="EarCanalForm" onSubmit={submitCanal}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div>
                                                    <label htmlFor="inputPassword4"
                                                        className="form-label  col-form-label col-form-label-sm">Procedure Name ( Group )</label>
                                                    <select id="inputState" onChange={handleInput} value={procedureFee.procedure_id} name="procedure_id"
                                                        className="form-select  col-form-label-sm font-size-patient">
                                                        <option selected>Select</option>
                                                        {
                                                            procedure.map((item) => {
                                                                return (
                                                                    <option value={item.id} key={item.id}>{item.procedure_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    <span className="text-danger">{procedureFee.error_list.procedure_id}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Sub-procedure Name ( SubGroup ) </label>
                                                    <input type="text" value={procedureFee.subProcedure_name} className="form-control" name="subProcedure_name" onChange={handleInput} />
                                                    <span className="text-danger">{procedureFee.error_list.subProcedure_name}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Fee </label>
                                                    <input type="text" value={procedureFee.fee_name} className="form-control" name="fee_name" onChange={handleInput} />
                                                    <span className="text-danger">{procedureFee.error_list.fee_name}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Item Code </label>
                                                    <input type="text" value={procedureFee.item_code} className="form-control" name="item_code" onChange={handleInput} />
                                                    <span className="text-danger">{procedureFee.error_list.item_code}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Description </label>
                                                    <textarea value={procedureFee.description} className="form-control" name='description' onChange={handleInput} id="exampleFormControlTextarea1" rows="6"></textarea>
                                                    <span className="text-danger">{procedureFee.error_list.description}</span>
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

export default AddProcedureFee;
