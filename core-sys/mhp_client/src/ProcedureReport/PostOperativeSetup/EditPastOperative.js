import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const EditPastOperative = () => {

    const [pastOperativeEdit, setPastOperativeEdit] = useState({
        name: "",
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

        axios.get(`/edit-post-operative-name/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log("edit-post-operative-name", res.data.postOperativeName);
                setPastOperativeEdit(res.data.postOperativeName);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        setPastOperativeEdit({ ...pastOperativeEdit, [e.target.name]: e.target.value });
    }

    const updatePastOperativeName = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }


        axios.post(`/update-post-operative-name/${lastpart}`, pastOperativeEdit).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setPastOperativeEdit({
                    ...pastOperativeEdit,

                });
                navigate(`/post-operative`);

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
                            <h6 className="card-title">Edit Past Operative Name
                                <Link to={'/post-operative'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="pathologyLabratoryForm" onSubmit={updatePastOperativeName}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="diagnosis_procedure_name" className="col-form-label-sm">Name</label>
                                            <input type="text" value={pastOperativeEdit[0].name} className="form-control" name="name" onChange={handleInput} />
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

export default EditPastOperative;