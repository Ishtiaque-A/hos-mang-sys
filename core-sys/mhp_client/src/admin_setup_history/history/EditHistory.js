import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

function EditHistory(props) {

    const [historyInput, setHistory] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const history_id = props.match.params.id;
        axios.get(`/edit-history/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setHistory(res.data.history);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setHistory({ ...historyInput, [e.target.name]: e.target.value });
    }

    const updateHistory = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = historyInput;
        axios.post(`/update-history/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setHistory({
                    ...historyInput,
                    // history_name: '',

                });
                setError('');
                navigate("/history");
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
                                <h6 className="card-title">Edit History
                                    <Link to={'/history'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateHistory}>
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="history_code" className="col-form-label-sm">History Code</label>
                                                <input type="text" onChange={handleInput} value={historyInput.history_code} className="form-control" name="history_code" />
                                                <span className="text-danger">{error.history_code}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm">History Name</label>
                                                <input type="text" onChange={handleInput} value={historyInput.history_name} className="form-control" name="history_name" />
                                                <span className="text-danger">{error.history_name}</span>
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

export default EditHistory;