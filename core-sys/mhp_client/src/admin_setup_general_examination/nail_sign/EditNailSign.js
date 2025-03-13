import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import GeneralExaminationSidebar from '../general_examination_setup_mainsidbar/GeneralExaminationSidebar';

function EditNailSign(props) {

    const [nailSign, setnailSign] = useState([]);
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
        axios.get(`/edit-nail-sign/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setnailSign(res.data.nailSign);
                // setPicture(res.data.nailSign.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setnailSign({ ...nailSign, [e.target.name]: e.target.value });
    }

    const updateNailSignInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('nailSign_name', nailSign.nailSign_name);


        axios.post(`/update-nail-sign/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setnailSign({
                    ...nailSign,

                });
                navigate("/nail-sign");

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
                        <GeneralExaminationSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Nail Sign
                                    <Link to={'/nail-sign'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="NailSignForm" onSubmit={updateNailSignInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={nailSign.nailSign_name} className="form-control" name="nailSign_name" onChange={handleInput} />
                                                <span className="text-danger">{error.nailSign_name}</span>
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

export default EditNailSign;
