import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import NeurologicalSidebar from '../neurological_setup_mainsidebar/NeurologicalSidebar';


function AddFrontalLobe() {

    const [FrontalLobe, setFrontalLobe] = useState({
        FrontalLobe_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setFrontalLobe({
            ...FrontalLobe, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('FrontalLobe_name',  FrontalLobe.FrontalLobe_name);

    const submitFrontalLobe = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-frontal-lobe`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setFrontalLobe({
                    FrontalLobe_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setFrontalLobe({ ...FrontalLobe, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <NeurologicalSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Frontal Lobe
                                        <Link to={'/frontal-lobe'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="FrontalLobeForm" onSubmit={submitFrontalLobe}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={FrontalLobe.FrontalLobe_name} className="form-control" name="FrontalLobe_name" onChange={handleInput} />
                                                    <span className="text-danger">{FrontalLobe.error_list.FrontalLobe_name}</span>

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

export default AddFrontalLobe;
