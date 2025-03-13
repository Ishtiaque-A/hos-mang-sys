import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddSpine() {

    const [Spine, setSpine] = useState({
        Spine_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setSpine({
            ...Spine, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Spine_name',  Spine.Spine_name);

    const submitSpine = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-spine`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setSpine({
                    Spine_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setSpine({ ...Spine, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <MusculoSkeletalExaminationSidebar/>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Spine
                                        <Link to={'/spine'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SpineForm" onSubmit={submitSpine}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Spine.Spine_name} className="form-control" name="Spine_name" onChange={handleInput} />
                                                    <span className="text-danger">{Spine.error_list.Spine_name}</span>

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

export default AddSpine;
