import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import NeurologicalSidebar from '../neurological_setup_mainsidebar/NeurologicalSidebar';


function EditParietalLobe(props) {

    const [ParietalLobe, setParietalLobe] = useState([]);
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
        axios.get(`/edit-parietal-lobe/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.ParietalLobe);
                setParietalLobe(res.data.ParietalLobe);
                // setPicture(res.data.ParietalLobe.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setParietalLobe({ ...ParietalLobe, [e.target.name]: e.target.value });
    }

    const updateParietalLobeInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('ParietalLobe_name', ParietalLobe.ParietalLobe_name);


        axios.post(`/update-parietal-lobe/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setParietalLobe({
                    ...ParietalLobe,

                });
                navigate(`/parietal-lobe/`);

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
                                <h6 className="card-title"> Parietal Lobe
                                    <Link to={'/parietal-lobe'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="ParietalLobeForm" onSubmit={updateParietalLobeInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={ParietalLobe.ParietalLobe_name} className="form-control" name="ParietalLobe_name" onChange={handleInput} />
                                                <span className="text-danger">{error.ParietalLobe_name}</span>
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

export default EditParietalLobe;
