import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddHistoryExamStatus() {

    const [history_exam_statusInput, setHistoryExamStatus] = useState({
        history_exam_status_name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setHistoryExamStatus({ ...history_exam_statusInput, [e.target.name]: e.target.value })
    }

    const submitHistoryExamStatus = (e) => {
        e.preventDefault();

        const data = {
            history_exam_status_name: history_exam_statusInput.history_exam_status_name,
        }

        axios.post(`/save-history-exam-status`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setHistoryExamStatus({
                    ...history_exam_statusInput,
                    history_exam_status_name: '',
                    error_list: [],
                });

            } else if (res.data.status === 400) {
                // console.log(res.data.status);
                setHistoryExamStatus({ ...history_exam_statusInput, error_list: res.data.errors });
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
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Add History Exam Status
                                    <Link to={'/history-exam-status'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitHistoryExamStatus} id="history_exam_statusForms">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="history_exam_status_name" className="col-form-label-sm">History Exam Status Name</label>
                                                <input type="text" onChange={handleInput} value={history_exam_statusInput.history_exam_status_name} className="form-control" name="history_exam_status_name" />
                                                <span className="text-danger">{history_exam_statusInput.error_list.history_exam_status_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Save
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

export default AddHistoryExamStatus;