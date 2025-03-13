import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GastroIntestinalSidebar from '../gastro_int_setup_mainsidebar/GastroIntestinalSidebar';

function AddLeftSupraclavicularNode() {

    const [leftsupraclavicularnode, setleftsupraclavicularnode] = useState({
        leftsupraclavicularnode_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setleftsupraclavicularnode({
            ...leftsupraclavicularnode, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('leftsupraclavicularnode_name', leftsupraclavicularnode.leftsupraclavicularnode_name);

    const submitLeftSupraclavicularNode = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        console.log(e)
        axios.post(`/save-left-supraclavicular-node`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setleftsupraclavicularnode({
                    leftsupraclavicularnode_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setleftsupraclavicularnode({ ...leftsupraclavicularnode, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <GastroIntestinalSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Left Supraclavicular Node
                                        <Link to={'/left-supraclavicular-node'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="LeftSupraclavicularNodeForm" onSubmit={submitLeftSupraclavicularNode}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={leftsupraclavicularnode.leftsupraclavicularnode_name} className="form-control" name="leftsupraclavicularnode_name" onChange={handleInput} />
                                                    <span className="text-danger">{leftsupraclavicularnode.error_list.leftsupraclavicularnode_name}</span>

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

export default AddLeftSupraclavicularNode;
