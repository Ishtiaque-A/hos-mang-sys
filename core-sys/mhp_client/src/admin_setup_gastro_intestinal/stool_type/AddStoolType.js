import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddStoolType() {

    const [StoolType, setStoolType] = useState({
        StoolType_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setStoolType({
            ...StoolType, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('StoolType_name', StoolType.StoolType_name);

    const submitStoolType = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-stool-type`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setStoolType({
                    StoolType_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setStoolType({ ...StoolType, error_list: res.data.errors });

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
                                <h6 className="card-title"> Add Stool Type
                                    <Link to={'/stool-type'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="StoolTypeForm" onSubmit={submitStoolType}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={StoolType.StoolType_name} className="form-control" name="StoolType_name" onChange={handleInput} />
                                                <span className="text-danger">{StoolType.error_list.StoolType_name}</span>

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

export default AddStoolType;
