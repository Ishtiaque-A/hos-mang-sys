import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function AddHistory() {

    const [historyInput, setHistory] = useState({
        history_name: '',
        history_code: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setHistory({ ...historyInput, [e.target.name]: e.target.value })
    }

    const submitHistory = (e) => {
        e.preventDefault();

        const data = {
            history_code: historyInput.history_code,
            history_name: historyInput.history_name,
        }

        axios.post(`/save-history`, data).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setHistory({
                    ...historyInput,

                    history_code: '',
                    history_name: '',
                    error_list: [],
                });

            } else if (res.data.status === 400) {
                setHistory({ ...historyInput, error_list: res.data.errors });
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
                                <h6 className="card-title">Add History
                                    <Link to={'/history'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitHistory} id="historyForms">
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_code" className="col-form-label-sm">History Code</label>
                                                <input type="text" onChange={handleInput} value={historyInput.history_code} className="form-control" name="history_code" />
                                                <span className="text-danger">{historyInput.error_list.history_code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm">History Name</label>
                                                <input type="text" onChange={handleInput} value={historyInput.history_name} className="form-control" name="history_name" />
                                                <span className="text-danger">{historyInput.error_list.history_name}</span>
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

export default AddHistory;