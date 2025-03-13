import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import SkinDermatologySetupSidebar from '../skin_dermatology_setup_mainsidebar/SkinDermatologySetupSidebar';

function AddSkinType() {

    const [skinType, setSkinType] = useState({
        name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setSkinType({
            ...skinType, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('name',  skinType.name);

    const submitSkinType = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-skin-type`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setSkinType({
                    name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setSkinType({ ...skinType, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <SkinDermatologySetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Skin Type
                                        <Link to={'/skin-type'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SkinTypeForm" onSubmit={submitSkinType}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={skinType.name} className="form-control" name="name" onChange={handleInput} />
                                                    <span className="text-danger">{skinType.error_list.name}</span>

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

export default AddSkinType;
