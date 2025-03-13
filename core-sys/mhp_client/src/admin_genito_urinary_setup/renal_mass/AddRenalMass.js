import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import GenitoUrinarySidebar from '../genito_urinary_setup_mainsidebar/GenitoUrinarySidebar';

function AddRenalMass() {

    const [renalmass, setrenalmass] = useState({
        renalmass_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setrenalmass({
            ...renalmass, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('renalmass_name',  renalmass.renalmass_name);

    const submitrenalmass = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
 
        axios.post(`/save-renal-mass`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setrenalmass({
                    renalmass_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setrenalmass({ ...renalmass, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <GenitoUrinarySidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Renal Mass
                                        <Link to={'/renal-mass'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="renalmassForm" onSubmit={submitrenalmass}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={renalmass.renalmass_name} className="form-control" name="renalmass_name" onChange={handleInput} />
                                                    <span className="text-danger">{renalmass.error_list.renalmass_name}</span>

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

export default AddRenalMass;
