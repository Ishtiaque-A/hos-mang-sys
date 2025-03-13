import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import NeurologicalSidebar from '../neurological_setup_mainsidebar/NeurologicalSidebar';


function AddIntermittent() {

    const [Intermittent, setIntermittent] = useState({
        Intermittent_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setIntermittent({
            ...Intermittent, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Intermittent_name', Intermittent.Intermittent_name);

    const submitIntermittent = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-intermittent`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setIntermittent({
                    Intermittent_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setIntermittent({ ...Intermittent, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <NeurologicalSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Intermittent
                                        <Link to={'/intermittent'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="IntermittentForm" onSubmit={submitIntermittent}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Intermittent.Intermittent_name} className="form-control" name="Intermittent_name" onChange={handleInput} />
                                                    <span className="text-danger">{Intermittent.error_list.Intermittent_name}</span>

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

export default AddIntermittent;
