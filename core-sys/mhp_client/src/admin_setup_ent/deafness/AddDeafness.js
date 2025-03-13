import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';


function AddDeafness() {

    const [Deafness, setDeafness] = useState({
        Deafness_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setDeafness({
            ...Deafness, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Deafness_name', Deafness.Deafness_name);

    const submitDeafness = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-deafness`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setDeafness({
                    Deafness_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setDeafness({ ...Deafness, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <EntSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Deafness
                                        <Link to={'/deafness'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="DeafnessForm" onSubmit={submitDeafness}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Deafness.Deafness_name} className="form-control" name="Deafness_name" onChange={handleInput} />
                                                    <span className="text-danger">{Deafness.error_list.Deafness_name}</span>

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

export default AddDeafness;
