import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from "sweetalert";
import HistorySetupSidebar from '../history_setup_mainsidebar/HistorySetupSidebar';

const EditIschaemicRiskFactor = () => {
    const [ischaemicName, setIschaemicName] = useState({
        name: '',
    });
    let navigate = useNavigate();

    const params = useParams();

    useEffect(() => {
        axios.get(`/edit-ischaemic-risk-factor/${params.id}`).then(res => {

            if (res.data.status === 200) {
                setIschaemicName(res.data.riskFactor);
            }

        });

    }, []);

    const updateRiskFactor = (e) => {
        e.preventDefault();
        const data = ischaemicName;
        axios.post(`/update-ischaemic-risk-factor/${params.id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                navigate("/ischaemic-risk-factor");
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
                            <h6 className="card-title">Edit Ischaemic Risk Factor
                                <Link to={'/ischaemic-risk-factor'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateRiskFactor}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className='form-group mt-3'>
                                            <div className="form-group">
                                                <label htmlFor="carotid_name" className="col-form-label-sm">Ischaemic heart disease risk factor Name</label>
                                                <input type="text" onChange={(e) => setIschaemicName({ ...ischaemicName, name: e.target.value })} value={ischaemicName.name} className="form-control" name="carotid_name" />

                                            </div>
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
    );
};

export default EditIschaemicRiskFactor;