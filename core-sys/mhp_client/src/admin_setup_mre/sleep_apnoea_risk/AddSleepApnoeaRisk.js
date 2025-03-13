import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddSleepApnoeaRisk() {

    const [sleepapnoearisk, setsleepapnoearisk] = useState({
        sleepapnoearisk_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setsleepapnoearisk({
            ...sleepapnoearisk, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('sleepapnoearisk_name',  sleepapnoearisk.sleepapnoearisk_name);

    const submitSleepApnoeaRisk = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-sleep-apnoea-risk`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setsleepapnoearisk({
                    sleepapnoearisk_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setsleepapnoearisk({ ...sleepapnoearisk, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <MreSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Sleep Apnoea Risk
                                        <Link to={'/sleep-apnoea-risk'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="SleepApnoeaRiskForm" onSubmit={submitSleepApnoeaRisk}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={sleepapnoearisk.sleepapnoearisk_name} className="form-control" name="sleepapnoearisk_name" onChange={handleInput} />
                                                    <span className="text-danger">{sleepapnoearisk.error_list.sleepapnoearisk_name}</span>

                                                </div>
                                               
                                                <div className="float-right">
                                                    <button type="submit"  className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"  ></i> Save
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
        </div>
    )
}

export default AddSleepApnoeaRisk;
