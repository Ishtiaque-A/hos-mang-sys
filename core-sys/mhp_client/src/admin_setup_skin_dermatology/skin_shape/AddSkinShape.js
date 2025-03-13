import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import SkinDermatologySetupSidebar from '../skin_dermatology_setup_mainsidebar/SkinDermatologySetupSidebar';


function AddSkinShape() {

    const [SkinShape, setSkinShape] = useState({
        SkinShape_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setSkinShape({
            ...SkinShape, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('SkinShape_name', SkinShape.SkinShape_name);

    const submitSkinShape = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-skin-shape`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setSkinShape({
                    SkinShape_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setSkinShape({ ...SkinShape, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <SkinDermatologySetupSidebar />
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Skin Shape
                                        <Link to={'/skin-shape'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SkinShapeForm" onSubmit={submitSkinShape}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={SkinShape.SkinShape_name} className="form-control" name="SkinShape_name" onChange={handleInput} />
                                                    <span className="text-danger">{SkinShape.error_list.SkinShape_name}</span>

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

export default AddSkinShape;
