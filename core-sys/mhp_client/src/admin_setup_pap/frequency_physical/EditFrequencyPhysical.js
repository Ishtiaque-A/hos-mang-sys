import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import PhysicalActivityPrescriptionSidebar from '../physical_activity_pres_setup_mainsidebar/PhysicalActivityPrescriptionSidebar';

function EditFrequencyPhysical(props) {

    const [frequencyPhysical, setFrequencyPhysical] = useState([]);
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
        axios.get(`/edit-frequency-physical/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setFrequencyPhysical(res.data.frequencyPhysical);
                // setPicture(res.data.frequencyPhysical.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setFrequencyPhysical({ ...frequencyPhysical, [e.target.name]: e.target.value });
    }

    const updateFrequencyPhysicalInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('name', frequencyPhysical.name);


        axios.post(`/update-frequency-physical/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setFrequencyPhysical({
                    ...frequencyPhysical,

                });
                navigate(`/frequency-physical/`);

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
                    <PhysicalActivityPrescriptionSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Frequency Physical
                                    <Link to={'/frequency-physical'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="FrequencyPhysicalForm" onSubmit={updateFrequencyPhysicalInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={frequencyPhysical.name} className="form-control" name="name" onChange={handleInput} />
                                                <span className="text-danger">{error.name}</span>
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

export default EditFrequencyPhysical;
