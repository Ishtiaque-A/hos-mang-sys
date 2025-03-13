import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import NeurologicalSidebar from '../neurological_setup_mainsidebar/NeurologicalSidebar';


function EditFrontalLobe(props) {

    const [FrontalLobe, setFrontalLobe] = useState([]);
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
        axios.get(`/edit-frontal-lobe/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.FrontalLobe);
                setFrontalLobe(res.data.FrontalLobe);
                // setPicture(res.data.FrontalLobe.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setFrontalLobe({ ...FrontalLobe, [e.target.name]: e.target.value });
    }

    const updateFrontalLobeInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('FrontalLobe_name', FrontalLobe.FrontalLobe_name);


        axios.post(`/update-frontal-lobe/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setFrontalLobe({
                    ...FrontalLobe,

                });
                navigate(`/frontal-lobe/`);

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
                        <NeurologicalSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Frontal Lobe
                                    <Link to={'/frontal-lobe'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="FrontalLobeForm" onSubmit={updateFrontalLobeInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={FrontalLobe.FrontalLobe_name} className="form-control" name="FrontalLobe_name" onChange={handleInput} />
                                                <span className="text-danger">{error.FrontalLobe_name}</span>
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

export default EditFrontalLobe;
