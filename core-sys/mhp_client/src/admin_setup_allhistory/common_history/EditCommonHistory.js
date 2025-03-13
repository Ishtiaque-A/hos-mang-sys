import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import MlhSetupSidebar from '../mlh_setup_mainsidebar/MlhSetupSidebar';

function EditCommonHistory(props) {

    const [statuslist, setStatusList] = useState([]);
    const [history, sethistory] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-commonHistory/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                sethistory(res.data.commonHistory);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    useEffect(() => {

        axios.get(`/examination-name-dropdown`).then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.status_list);
            }
        })


    }, []);


    const handleInput = (e) => {
        e.persist();
        sethistory({ ...history, [e.target.name]: e.target.value });
    }

    const updateCanalInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = history;
        axios.post(`/update-commonHistory/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                sethistory({
                    ...history,

                });
                setError('');
                navigate("/common-history");
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
                        <MlhSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Common History
                                    <Link to={'/common-history'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="EarCanalForm" onSubmit={updateCanalInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={history.history_name} className="form-control" name="history_name" onChange={handleInput} />
                                                <span className="text-danger">{error.history_name}</span>

                                            </div>


                                            <div>
                                                <label htmlFor="inputPassword4"
                                                    className="form-label  col-form-label col-form-label-sm">Examination Name</label>

                                                <select id="inputState" onChange={handleInput} value={history.status_id} name="status_id"
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        statuslist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.examinationHeading_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
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

export default EditCommonHistory
