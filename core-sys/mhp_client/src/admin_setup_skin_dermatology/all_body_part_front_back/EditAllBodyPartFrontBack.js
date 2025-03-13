import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import SkinDermatologySetupSidebar from '../skin_dermatology_setup_mainsidebar/SkinDermatologySetupSidebar';


function EditAllBodyPartFrontBack(props) {

    const [AllBodyPartFrontBack, setAllBodyPartFrontBack] = useState([]);
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
        axios.get(`/edit-all-body-part-front-back/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                // console.log(res.data.AllBodyPartFrontBack);
                setAllBodyPartFrontBack(res.data.AllBodyPartFrontBack);
                // setPicture(res.data.AllBodyPartFrontBack.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setAllBodyPartFrontBack({ ...AllBodyPartFrontBack, [e.target.name]: e.target.value });
    }

    const updateAllBodyPartFrontBackInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('AllBodyPartFrontBack_name', AllBodyPartFrontBack.AllBodyPartFrontBack_name);


        axios.post(`/update-all-body-part-front-back/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setAllBodyPartFrontBack({
                    ...AllBodyPartFrontBack,

                });
                navigate(`/all-body-part-front-back/`);

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
                    <SkinDermatologySetupSidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> All Body Part Front Back
                                    <Link to={'/all-body-part-front-back'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="AllBodyPartFrontBackForm" onSubmit={updateAllBodyPartFrontBackInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={AllBodyPartFrontBack.AllBodyPartFrontBack_name} className="form-control" name="AllBodyPartFrontBack_name" onChange={handleInput} />
                                                <span className="text-danger">{error.AllBodyPartFrontBack_name}</span>
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

export default EditAllBodyPartFrontBack;
