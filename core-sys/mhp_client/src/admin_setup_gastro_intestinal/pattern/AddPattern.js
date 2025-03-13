import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddPattern() {

    const [Pattern, setPattern] = useState({
        Pattern_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setPattern({
            ...Pattern, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Pattern_name', Pattern.Pattern_name);

    const submitPattern = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-pattern`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setPattern({
                    Pattern_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setPattern({ ...Pattern, error_list: res.data.errors });

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
                                <h6 className="card-title"> Add Pattern
                                    <Link to={'/pattern'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="PatternForm" onSubmit={submitPattern}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={Pattern.Pattern_name} className="form-control" name="Pattern_name" onChange={handleInput} />
                                                <span className="text-danger">{Pattern.error_list.Pattern_name}</span>

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

export default AddPattern;
