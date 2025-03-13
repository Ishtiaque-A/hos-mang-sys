import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const EditPathologyName = () => {
    const [pathologyNameEdit, setPathologyNameEdit] = useState({
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

        axios.get(`/edit-pathology-name/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setPathologyNameEdit(res.data.pathologyName);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        setPathologyNameEdit({ ...pathologyNameEdit, [e.target.name]: e.target.value });
    }

    const updatePathologyName = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-pathology-name/${lastpart}`, pathologyNameEdit).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setPathologyNameEdit({
                    ...pathologyNameEdit,

                });
                navigate(`/pathology`);

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
                <div className="col-md-9 pt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Edit Pathology Name
                                <Link to={'/pathology'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="pathologyLabratoryForm" onSubmit={updatePathologyName}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                       
                                     
                                        <div className="form-group">
                                            <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm">Name</label>
                                            <input type="text" value={pathologyNameEdit.name}className="form-control" name="name" onChange={handleInput} />
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

export default EditPathologyName;