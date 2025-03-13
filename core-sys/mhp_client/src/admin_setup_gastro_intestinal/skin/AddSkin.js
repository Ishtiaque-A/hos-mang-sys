import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddSkin() {

    const [skin, setskin] = useState({
        skin_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setskin({
            ...skin, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('skin_name', skin.skin_name);

    const submitSkin = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-skin`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setskin({
                    skin_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setskin({ ...skin, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <GastroIntestinalSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Skin
                                        <Link to={'/skin'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SkinForm" onSubmit={submitSkin}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={skin.skin_name} className="form-control" name="skin_name" onChange={handleInput} />
                                                    <span className="text-danger">{skin.error_list.skin_name}</span>

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

export default AddSkin;
