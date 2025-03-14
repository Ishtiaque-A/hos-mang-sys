import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';


function AddEarDischarge() {

    const [EarDischarge, setEarDischarge] = useState({
        EarDischarge_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setEarDischarge({
            ...EarDischarge, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('EarDischarge_name', EarDischarge.EarDischarge_name);

    const submitEarDischarge = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-ear-discharge`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setEarDischarge({
                    EarDischarge_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setEarDischarge({ ...EarDischarge, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <EntSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Ear Discharge
                                        <Link to={'/ear-discharge'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="EarDischargeForm" onSubmit={submitEarDischarge}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={EarDischarge.EarDischarge_name} className="form-control" name="EarDischarge_name" onChange={handleInput} />
                                                    <span className="text-danger">{EarDischarge.error_list.EarDischarge_name}</span>

                                                </div>

                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"  ></i> Save
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

export default AddEarDischarge;
