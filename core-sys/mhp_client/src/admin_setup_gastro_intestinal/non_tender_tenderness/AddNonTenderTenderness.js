import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddNonTenderTenderness() {

    const [nontendertenderness, setnontendertenderness] = useState({
        nontendertenderness_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setnontendertenderness({
            ...nontendertenderness, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('nontendertenderness_name', nontendertenderness.nontendertenderness_name);

    const submitNonTenderTenderness = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-non-tender-tenderness`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setnontendertenderness({
                    nontendertenderness_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setnontendertenderness({ ...nontendertenderness, error_list: res.data.errors });

            }

        })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <GastroIntestinalSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Add Non-Tender Tenderness
                                    <Link to={'/non-tender-tenderness'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="NonTenderTendernessForm" onSubmit={submitNonTenderTenderness}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={nontendertenderness.nontendertenderness_name} className="form-control" name="nontendertenderness_name" onChange={handleInput} />
                                                <span className="text-danger">{nontendertenderness.error_list.nontendertenderness_name}</span>

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
    )
}

export default AddNonTenderTenderness;
