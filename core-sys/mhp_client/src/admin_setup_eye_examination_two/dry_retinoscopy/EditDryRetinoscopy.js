import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import EyeExaminationTwoSidebar from '../eye_examination_two_setup_mainsidebar/EyeExaminationTwoSidebar';

function EditDryRetinoscopy(props) {

    const [DryRetinoscopy, setDryRetinoscopy] = useState([]);
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
        axios.get(`/edit-dry-retinoscopy/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setDryRetinoscopy(res.data.DryRetinoscopy);
                // setPicture(res.data.DryRetinoscopy.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setDryRetinoscopy({ ...DryRetinoscopy, [e.target.name]: e.target.value });
    }

    const updateDryRetinoscopyInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('DryRetinoscopy_name', DryRetinoscopy.DryRetinoscopy_name);


        axios.post(`/update-dry-retinoscopy/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setDryRetinoscopy({
                    ...DryRetinoscopy,

                });
                navigate(`/dry-retinoscopy/`);

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
                    <EyeExaminationTwoSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Dry Retinoscopy
                                    <Link to={'/dry-retinoscopy'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="DryRetinoscopyForm" onSubmit={updateDryRetinoscopyInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={DryRetinoscopy.DryRetinoscopy_name} className="form-control" name="DryRetinoscopy_name" onChange={handleInput} />
                                                <span className="text-danger">{error.DryRetinoscopy_name}</span>
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

export default EditDryRetinoscopy;
