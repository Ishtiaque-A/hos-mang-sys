import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const EditDischarge = () => {

    const [dischargeEdit, setDischargeEdit] = useState({
        name:"",
    });

    const [error, setError] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        axios.get(`/edit-discharge-name/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log("dddd",res.data.dischargeName);
                setDischargeEdit(res.data.dischargeName);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        setDischargeEdit({ ...dischargeEdit, [e.target.name]: e.target.value });
    }

    const updateDischargeName = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-discharge-name/${lastpart}`, dischargeEdit).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setDischargeEdit({
                    ...dischargeEdit,

                });
                navigate(`/discharge`);

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
                    <ProcedureReportSetupSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Edit Discharge Name
                                <Link to={'/discharge'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="pathologyLabratoryForm" onSubmit={updateDischargeName}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm">Name</label>
                                            <input type="text" value={dischargeEdit.name}className="form-control" name="name" onChange={handleInput} />
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
    );
};

export default EditDischarge;