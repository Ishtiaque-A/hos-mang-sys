import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export default function AddLabService() {
    const [service, setService] = useState({
        name: "",
    });
    const navigate = useNavigate();
    const submitSevice = (e) => {
        e.preventDefault();
        axios.post(`/save-lab-center-services`, service).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setService({
                    name: ""
                });
                navigate('/lab-module-new/lab-center-service');
            }
        })
    }
    return (
        <div>
            <div className="card mt-2">
                <div className="card-header rx-one-button-group">
                    <h6 className="card-title"> Add Lab Center Service
                        <Link to={'/lab-module-new/lab-center-service'} className=" float-end"> <button className="btn">Back</button> </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="UrineAnalysisForm" onSubmit={submitSevice}>
                        <div className="card-body">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                    <input type="text" value={service.name} className="form-control" name="name" onChange={(e) => setService({ ...service, name: e.target.value })} />
                                </div>

                                <div className="float-right rx-one-button-group">
                                    <button type="submit" className="btn  text-uppercase float-end mt-2" ><i
                                        className="fas fa-save"  ></i> Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
