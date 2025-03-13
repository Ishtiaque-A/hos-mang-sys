import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import GeneralExaminationSidebar from '../general_examination_setup_mainsidbar/GeneralExaminationSidebar';

function EditRadioFemoralDelay(props) {

    const [name, setname] = useState([]);
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
        axios.get(`/edit-radio-femoral-delay/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setname(res.data.name);
                // setPicture(res.data.name.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setname({ ...name, [e.target.name]: e.target.value });
    }

    const updateRadioFemoralDelayInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('name_name', name.name_name);


        axios.post(`/update-radio-femoral-delay/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setname({
                    ...name,

                });
                navigate("/radio-femoral-delay");

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
                    <GeneralExaminationSidebar/>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Radio Femoral Delay
                                    <Link to={'/radio-femoral-delay'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="RadioFemoralDelayForm" onSubmit={updateRadioFemoralDelayInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={name.name_name} className="form-control" name="name_name" onChange={handleInput} />
                                                <span className="text-danger">{error.name_name}</span>
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

export default EditRadioFemoralDelay;
