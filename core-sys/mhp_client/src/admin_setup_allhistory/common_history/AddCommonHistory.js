import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MlhSetupSidebar from '../mlh_setup_mainsidebar/MlhSetupSidebar';

function AddCommonHistory() {


    const [statuslist, setStatusList] = useState([]);
    const [history, sethistory] = useState({
        history_name: "",
        status_id: "",
        selection_criteria: "",
        error_list: [],
    });

    useEffect(() => {
        axios.get(`/examination-name-dropdown`).then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.status_list);
            }
        })
    },
        []);

    const handleInput = (e) => {
        sethistory({
            ...history, [e.target.name]: e.target.value
        });
    }

    const submitCanal = (e) => {
        e.preventDefault();
        const data = {
            history_name: history.history_name,
            status_id: history.status_id,
            selection_criteria: history.selection_criteria,
        }

        axios.post(`/save-commonHistory`, data).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                sethistory({
                    history_name: "",
                    status_id: "",
                    selection_criteria: "",
                    error_list: [],

                });
            }
            else if (res.data.status == 400) {
                sethistory({ ...history, error_list: res.data.errors });

            }

        })
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
                                <h6 className="card-title"> Add Common History
                                    <Link to={'/common-history'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="EarCanalForm" onSubmit={submitCanal}>
                                    <div className="card-body">

                                        <div className="col-md-12">


                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={history.history_name} className="form-control" name="history_name" onChange={handleInput} />
                                                <span className="text-danger">{history.error_list.history_name}</span>

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
                                                <span className="text-danger">{history.error_list.status_id}</span>

                                            </div>

                                            <span className="text-danger">{history.error_list.selection_criteria}</span>


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

export default AddCommonHistory
