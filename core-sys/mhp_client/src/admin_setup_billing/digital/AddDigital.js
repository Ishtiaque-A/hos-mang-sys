import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import BillingSetupSidebar from '../billing_setup_sidebar/BillingSetUpSidebar'

function AddDigital() {

    const [digital, setDigital] = useState({
        digital_name: "",
        error_list: [],
    });


    const handleInput = (e) => {
        setDigital({
            ...digital, [e.target.name]: e.target.value
        });
    }
    const submitDigital = (e) => {
        e.preventDefault();
        //   console.log(digital);

        axios.post(`/save-digital`, digital).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDigital({
                    digital_name: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setDigital({ ...digital, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Digital
                                        <Link to={'/digital'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DigitalForm" onSubmit={submitDigital}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={digital.digital_name} className="form-control" name="digital_name" onChange={handleInput} />
                                                    <span className="text-danger">{digital.error_list.digital_name}</span>

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

export default AddDigital
