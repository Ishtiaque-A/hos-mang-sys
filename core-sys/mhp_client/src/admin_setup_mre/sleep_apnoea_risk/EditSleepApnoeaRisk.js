import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function EditSleepApnoeaRisk(props) {

    const [sleepapnoearisk, setsleepapnoearisk] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-sleep-apnoea-risk/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setsleepapnoearisk(res.data.sleepapnoearisk);
                // setPicture(res.data.sleepapnoearisk.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setsleepapnoearisk({ ...sleepapnoearisk, [e.target.name]: e.target.value });
    }

    const updateSleepApnoeaRiskInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('sleepapnoearisk_name', sleepapnoearisk.sleepapnoearisk_name);


        axios.post(`/update-sleep-apnoea-risk/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setsleepapnoearisk({
                    ...sleepapnoearisk,

                });
                

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
                        <MreSetupSidebar />
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Edit Sleep Apnoea Risk
                                    <Link to={'/sleep-apnoea-risk'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="SleepApnoeaRiskForm" onSubmit={updateSleepApnoeaRiskInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={sleepapnoearisk.sleepapnoearisk_name} className="form-control" name="sleepapnoearisk_name" onChange={handleInput} />
                                                <span className="text-danger">{error.sleepapnoearisk_name}</span>
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

export default EditSleepApnoeaRisk;
