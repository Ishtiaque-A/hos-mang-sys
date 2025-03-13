import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function AddLeftValue() {

    const [LeftValue, setLeftValue] = useState({
        LeftValue_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setLeftValue({
            ...LeftValue, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('LeftValue_name', LeftValue.LeftValue_name);

    const submitLeftValue = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-left-value`, formData).then(res => {
            console.log("Res", res)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setLeftValue({
                    LeftValue_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setLeftValue({ ...LeftValue, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <CnsTwoSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Left Value
                                        <Link to={'/left-value'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="LeftValueForm" onSubmit={submitLeftValue}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={LeftValue.LeftValue_name} className="form-control" name="LeftValue_name" onChange={handleInput} />
                                                    <span className="text-danger">{LeftValue.error_list.LeftValue_name}</span>

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

export default AddLeftValue;
