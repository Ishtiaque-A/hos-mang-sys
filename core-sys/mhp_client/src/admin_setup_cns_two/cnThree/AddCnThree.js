import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CnsTwoSetupSidebar from '../cns_two_setup_mainsidebar/CnsTwoSetupSidebar';

function AddCnThree() {


    const [cnThree, setcnThree] = useState({
        name: "",
        error_list: [],
    });



    const handleInput = (e) => {
        setcnThree({
            ...cnThree, [e.target.name]: e.target.value
        });
    }
    const submitcnThree = (e) => {
        e.preventDefault();
        //   console.log(cnThree);

        axios.post(`/save-cnThree`, cnThree).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setcnThree({
                    name: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                setcnThree({ ...cnThree, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <CnsTwoSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add CN-III IV VI
                                        <Link to={'/cnThree'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="EarCanalForm" onSubmit={submitcnThree}>
                                        <div className="card-body">

                                            <div className="col-md-12">


                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={cnThree.name} className="form-control" name="name" onChange={handleInput} />
                                                    <span className="text-danger">{cnThree.error_list.name}</span>

                                                </div>


                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                        className="fas fa-save"></i> Save
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

export default AddCnThree
