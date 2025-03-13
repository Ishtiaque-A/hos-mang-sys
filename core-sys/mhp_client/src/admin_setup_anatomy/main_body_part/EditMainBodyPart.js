import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import AnatomySetUpSidebar from '../anatomy_setup_mainsidebar/AnatomySetupSidebar';

function EditMainBodyPart(props) {

    const [MainBodyPart, setMainBodyPart] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-main-body-part/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setMainBodyPart(res.data.MainBodyPart);
                // setPicture(res.data.MainBodyPart.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setMainBodyPart({ ...MainBodyPart, [e.target.name]: e.target.value });
    }

    const updateMainBodyPartInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('MainBodyPart_name', MainBodyPart.MainBodyPart_name);


        axios.post(`/update-main-body-part/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setMainBodyPart({
                    ...MainBodyPart,

                });
                navigate(`/main-body-part/`);

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
                        <AnatomySetUpSidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Main Body Part
                                    <Link to={'/main-body-part'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="MainBodyPartForm" onSubmit={updateMainBodyPartInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={MainBodyPart.MainBodyPart_name} className="form-control" name="MainBodyPart_name" onChange={handleInput} />
                                                <span className="text-danger">{error.MainBodyPart_name}</span>
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

export default EditMainBodyPart;
