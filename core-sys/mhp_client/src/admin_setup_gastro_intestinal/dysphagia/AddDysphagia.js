import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddDysphagia() {

    const [Dysphagia, setDysphagia] = useState({
        Dysphagia_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDysphagia({
            ...Dysphagia, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Dysphagia_name', Dysphagia.Dysphagia_name);

    const submitDysphagia = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-dysphagia`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDysphagia({
                    Dysphagia_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDysphagia({ ...Dysphagia, error_list: res.data.errors });

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
                                <h6 className="card-title"> Add Dysphagia
                                    <Link to={'/dysphagia'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="DysphagiaForm" onSubmit={submitDysphagia}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={Dysphagia.Dysphagia_name} className="form-control" name="Dysphagia_name" onChange={handleInput} />
                                                <span className="text-danger">{Dysphagia.error_list.Dysphagia_name}</span>

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

export default AddDysphagia;
