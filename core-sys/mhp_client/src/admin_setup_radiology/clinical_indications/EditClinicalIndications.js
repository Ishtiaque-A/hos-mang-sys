import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import RadiologySetupSidebar from '../radiology_setup_mainsidebar/RadiologySetupSidebar';


function EditClinicalIndications(props) {

    const [ClinicalIndications, setClinicalIndications] = useState('');
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
        axios.get(`/edit-clinical-indications/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setClinicalIndications(res.data.clinical_indications);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setClinicalIndications({ ...ClinicalIndications, [e.target.name]: e.target.value });
    }

    const updateClinicalIndicationsInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-clinical-indications/${lastpart}`, ClinicalIndications).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setClinicalIndications({
                    ...ClinicalIndications,

                });
                navigate(`/clinical-indications/`);

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
                        < RadiologySetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Clinical indications
                                    <Link to={'/clinical-indications'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="ClinicalIndicationsForm" onSubmit={updateClinicalIndicationsInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                           
                                         
                                            <div className="form-group">
                                                <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={ClinicalIndications.clinical_indications_name} className="form-control" name="clinical_indications_name" onChange={handleInput} />
                                                <span className="text-danger">{error.clinical_indications_name}</span>
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

export default EditClinicalIndications;


