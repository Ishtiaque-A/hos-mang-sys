import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsOneSetupSidebar from '../cns_one_setup_mainsidebar/CnsOneSetupSidebar';

function AddUpperLimb() {

    const [UpperLimb, setUpperLimb] = useState({
        UpperLimb_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setUpperLimb({
            ...UpperLimb, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('UpperLimb_name',  UpperLimb.UpperLimb_name);

    const submitUpperLimb = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-upper-limb`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setUpperLimb({
                    UpperLimb_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setUpperLimb({ ...UpperLimb, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <CnsOneSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Upper Limb
                                        <Link to={'/upper-limb'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="UpperLimbForm" onSubmit={submitUpperLimb}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={UpperLimb.UpperLimb_name} className="form-control" name="UpperLimb_name" onChange={handleInput} />
                                                    <span className="text-danger">{UpperLimb.error_list.UpperLimb_name}</span>

                                                </div>
                                               
                                                <div className="float-right">
                                                    <button type="submit"  className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
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

export default AddUpperLimb;
