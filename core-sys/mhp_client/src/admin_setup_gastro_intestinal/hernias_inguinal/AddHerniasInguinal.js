import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddHerniasInguinal() {

    const [herniasinguinal, setherniasinguinal] = useState({
        herniasinguinal_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setherniasinguinal({
            ...herniasinguinal, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('herniasinguinal_name', herniasinguinal.herniasinguinal_name);

    const submitHerniasInguinal = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-hernias-inguinal`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setherniasinguinal({
                    herniasinguinal_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setherniasinguinal({ ...herniasinguinal, error_list: res.data.errors });

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
                                <h6 className="card-title"> Add Hernias Inguinal
                                    <Link to={'/hernias-inguinal'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="HerniasInguinalForm" onSubmit={submitHerniasInguinal}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={herniasinguinal.herniasinguinal_name} className="form-control" name="herniasinguinal_name" onChange={handleInput} />
                                                <span className="text-danger">{herniasinguinal.error_list.herniasinguinal_name}</span>

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

export default AddHerniasInguinal;
