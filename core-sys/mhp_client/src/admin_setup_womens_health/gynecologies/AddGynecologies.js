import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import WomensHealthSidebar from '../womens_health_seup_mainsidebar/WomensHealthSidebar';

function AddGynecologies() {

    const [addGynecologies, setAddGynecologies] = useState({
        name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setAddGynecologies({
            ...addGynecologies, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('name',  addGynecologies.name);

    const submitGynecologies = (e) => {
        e.preventDefault();
        
        axios.post(`/save-addGynecologies`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setAddGynecologies({
                    name: "",
                    error_list: [],
                });

            }
            else if (res.data.status == 400) {
                setAddGynecologies({ ...addGynecologies, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <WomensHealthSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Gynecologies
                                        <Link to={'/gynecologies'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="CSTForm" onSubmit={submitGynecologies}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={addGynecologies.name} className="form-control" name="name" onChange={handleInput} />
                                                    <span className="text-danger">{addGynecologies.error_list.name}</span>
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
export default AddGynecologies;
