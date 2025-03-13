import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationSidebar from '../eye_examination_setup_mainsidebar/EyeExaminationSidebar';

function EditSwollenEyeLid(props) {

    const [SwollenEyeLid, setSwollenEyeLid] = useState([]);
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
        axios.get(`/edit-swollen-eye-lid/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setSwollenEyeLid(res.data.SwollenEyeLid);
                // setPicture(res.data.SwollenEyeLid.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setSwollenEyeLid({ ...SwollenEyeLid, [e.target.name]: e.target.value });
    }

    const updateSwollenEyeLidInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('SwollenEyeLid_name', SwollenEyeLid.SwollenEyeLid_name);


        axios.post(`/update-swollen-eye-lid/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSwollenEyeLid({
                    ...SwollenEyeLid,

                });
                navigate(`/swollen-eye-lid/`);

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
                    <EyeExaminationSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Swollen Eye Lid
                                    <Link to={'/swollen-eye-lid'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="SwollenEyeLidForm" onSubmit={updateSwollenEyeLidInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={SwollenEyeLid.SwollenEyeLid_name} className="form-control" name="SwollenEyeLid_name" onChange={handleInput} />
                                                <span className="text-danger">{error.SwollenEyeLid_name}</span>
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

export default EditSwollenEyeLid;
