import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function AddLumberLordosis() {

    const [LumberLordosis, setLumberLordosis] = useState({
        LumberLordosis_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setLumberLordosis({
            ...LumberLordosis, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('LumberLordosis_name',  LumberLordosis.LumberLordosis_name);

    const submitLumberLordosis = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-lumber-lordosis`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setLumberLordosis({
                    LumberLordosis_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setLumberLordosis({ ...LumberLordosis, error_list: res.data.errors });

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
                                    <h6 className="card-title"> Add Lumber Lordosis
                                        <Link to={'/lumber-lordosis'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="LumberLordosisForm" onSubmit={submitLumberLordosis}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={LumberLordosis.LumberLordosis_name} className="form-control" name="LumberLordosis_name" onChange={handleInput} />
                                                    <span className="text-danger">{LumberLordosis.error_list.LumberLordosis_name}</span>

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

export default AddLumberLordosis;
