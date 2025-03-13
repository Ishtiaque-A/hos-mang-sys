import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function AddMainBodyPart() {

    const [MainBodyPart, setMainBodyPart] = useState({
        MainBodyPart_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setMainBodyPart({
            ...MainBodyPart, [e.target.name]: e.target.value
        });
    }

    const formData = new FormData();

    formData.append('MainBodyPart_name', MainBodyPart.MainBodyPart_name);

    const submitMainBodyPart = (e) => {
        e.preventDefault();
        axios.post(`/save-main-body-part`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setMainBodyPart({
                    MainBodyPart_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setMainBodyPart({ ...MainBodyPart, error_list: res.data.errors });
            }
        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <AnatomySetUpSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Main Body Part
                                        <Link to={'/main-body-part'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="MainBodyPartForm" onSubmit={submitMainBodyPart}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={MainBodyPart.MainBodyPart_name} className="form-control" name="MainBodyPart_name" onChange={handleInput} />
                                                    <span className="text-danger">{MainBodyPart.error_list.MainBodyPart_name}</span>

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

export default AddMainBodyPart;
