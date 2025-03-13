import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MreSetupSidebar from '../mre_setup_mainsidebar/MreSetupSidebar';

function AddMedicalHistory() {

    const [medicalhistory, setmedicalhistory] = useState({
        medicalhistory_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setmedicalhistory({
            ...medicalhistory, [e.target.name]: e.target.value
        });
    }


    const formData = new FormData();

    formData.append('medicalhistory_name',  medicalhistory.medicalhistory_name);

    const submitMedicalHistory = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
  console.log(e)
        axios.post(`/save-medical-history`, formData).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setmedicalhistory({
                    medicalhistory_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setmedicalhistory({ ...medicalhistory, error_list: res.data.errors });

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
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add MedicalHistory
                                        <Link to={'/medical-history'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="MedicalHistoryForm" onSubmit={submitMedicalHistory}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={medicalhistory.medicalhistory_name} className="form-control" name="medicalhistory_name" onChange={handleInput} />
                                                    <span className="text-danger">{medicalhistory.error_list.medicalhistory_name}</span>

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

export default AddMedicalHistory;
