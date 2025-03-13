import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import MedicationSetupSidebar from '../medication_setup_main_sidebar/MedicationSetupSidebar';


function EditCodeMustBeCircledReason(props) {

    const [codeMustBeCircledReason, setCodeMustBeCircledReason] = useState([]);
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
        axios.get(`/edit-code-must-be-circled-reason/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setCodeMustBeCircledReason(res.data.codeMustBeCircledReason);
                // setPicture(res.data.codeMustBeCircledReason.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setCodeMustBeCircledReason({ ...codeMustBeCircledReason, [e.target.name]: e.target.value });
    }

    const updateCodeMustBeCircledReasonInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('name', codeMustBeCircledReason.name);


        axios.post(`/update-code-must-be-circled-reason/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setCodeMustBeCircledReason({
                    ...codeMustBeCircledReason,

                });
                navigate(`/code-must-be-circled-reason/`);

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
                    <MedicationSetupSidebar/>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Code Must Be Circled Reason
                                    <Link to={'/code-must-be-circled-reason'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="CodeMustBeCircledReasonForm" onSubmit={updateCodeMustBeCircledReasonInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={codeMustBeCircledReason.name} className="form-control" name="name" onChange={handleInput} />
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

export default EditCodeMustBeCircledReason;
