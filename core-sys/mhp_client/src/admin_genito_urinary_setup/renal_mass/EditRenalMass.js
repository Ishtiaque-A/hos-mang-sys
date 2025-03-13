import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import GenitoUrinarySidebar from '../genito_urinary_setup_mainsidebar/GenitoUrinarySidebar';

function EditRenalMass(props) {

    const [renalmass, setrenalmass] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-renal-mass/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setrenalmass(res.data.renalmass);
                // setPicture(res.data.renalmass.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setrenalmass({ ...renalmass, [e.target.name]: e.target.value });
    }

    const updateRenalMassInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('renalmass_name', renalmass.renalmass_name);


        axios.post(`/update-renal-mass/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setrenalmass({
                    ...renalmass,

                });
                navigate("/renal-mass");

            } else {
                setError(res.data.errors)
            }
        });

    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                    <GenitoUrinarySidebar/>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Renal Mass
                                    <Link to={'/renal-mass'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="RenalMassForm" onSubmit={updateRenalMassInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={renalmass.renalmass_name} className="form-control" name="renalmass_name" onChange={handleInput} />
                                                <span className="text-danger">{error.renalmass_name}</span>
                                            </div>

                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
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

    )
}

export default EditRenalMass;
