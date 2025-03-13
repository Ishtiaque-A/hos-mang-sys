import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';


function AddUlser() {

    const [Ulser, setUlser] = useState({
        Ulser_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setUlser({
            ...Ulser, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('Ulser_name', Ulser.Ulser_name);

    const submitUlser = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-ulser`, formData).then(res => {
            console.log("sdfdf", res.data)
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setUlser({
                    Ulser_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setUlser({ ...Ulser, error_list: res.data.errors });

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
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Ulser
                                        <Link to={'/ulser'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="UlserForm" onSubmit={submitUlser}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={Ulser.Ulser_name} className="form-control" name="Ulser_name" onChange={handleInput} />
                                                    <span className="text-danger">{Ulser.error_list.Ulser_name}</span>

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

export default AddUlser;
