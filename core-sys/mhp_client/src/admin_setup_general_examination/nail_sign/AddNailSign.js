import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GeneralExaminationSidebar from '../general_examination_setup_mainsidbar/GeneralExaminationSidebar';

function AddNailSign() {

    const [nailSign, setnailSign] = useState({
        nailSign_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setnailSign({
            ...nailSign, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('nailSign_name',  nailSign.nailSign_name);

    const submitNailSign = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-nail-sign`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setnailSign({
                    nailSign_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setnailSign({ ...nailSign, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <GeneralExaminationSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Nail Sign
                                        <Link to={'/nail-sign'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="NailSignForm" onSubmit={submitNailSign}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={nailSign.nailSign_name} className="form-control" name="nailSign_name" onChange={handleInput} />
                                                    <span className="text-danger">{nailSign.error_list.nailSign_name}</span>

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

export default AddNailSign;
