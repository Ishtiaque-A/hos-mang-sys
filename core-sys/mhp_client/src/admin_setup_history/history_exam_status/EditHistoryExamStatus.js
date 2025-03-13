import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditHistoryExamStatus(props) {

    const [history_exam_statusInput, setHistoryExamStatus] = useState([]);
    const [error, setError] = useState([]);
    let navigate=useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const history_exam_status_id = props.match.params.id;
        axios.get(`/edit-history-exam-status/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setHistoryExamStatus(res.data.history_exam_status);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setHistoryExamStatus({ ...history_exam_statusInput, [e.target.name]: e.target.value });
    }

    const updateHistoryExamStatus = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = history_exam_statusInput;
        axios.post(`/update-history-exam-status/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setHistoryExamStatus({
                    ...history_exam_statusInput,
                    // history_exam_status_name: '',

                });
                setError('');
                navigate("/history-exam-status");
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
                        <HistorySetupSidebar></HistorySetupSidebar>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Edit History Exam Status
                                    <Link to={'/history-exam-status'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateHistoryExamStatus}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="history_exam_status_name" className="col-form-label-sm">History Exam Status Name</label>
                                                <input type="text" onChange={handleInput} value={history_exam_statusInput.history_exam_status_name} className="form-control" name="history_exam_status_name" />
                                                <span className="text-danger">{error.history_exam_status_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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

export default EditHistoryExamStatus;