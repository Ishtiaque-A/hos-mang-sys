import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../Component/Patients/AddNewPatient/AddNewPatient.css';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

const AddIschaemicRiskFactor = () => {
    const [ischaemicName, setIschaemicName] = useState({
        name: '',
    });


    const submitIschaemic = (e) => {
        e.preventDefault();
        axios.post(`/add-ischaemic-risk-factor`, ischaemicName).then(res => {

            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setIschaemicName({
                    name: '',
                });

            }

        });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <HistorySetupSidebar></HistorySetupSidebar>
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title">Add Ischaemic Risk Factor
                                <Link to={'/ischaemic-risk-factor'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitIschaemic} id="carotidForms">
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="carotid_name" className="col-form-label-sm">Ischaemic heart disease risk factor Name</label>
                                            <input type="text" onChange={(e) => setIschaemicName({ ...ischaemicName, name: e.target.value })} value={ischaemicName.name} className="form-control" name="carotid_name" required />
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
    );
};

export default AddIschaemicRiskFactor;