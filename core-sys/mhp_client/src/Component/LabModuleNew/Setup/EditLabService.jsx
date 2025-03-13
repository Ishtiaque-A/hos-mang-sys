import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function EditLabService() {
    const [service, setService] = useState({
        name: "",
    });
    const params = useParams();
    const navigate = useNavigate();
    const submitSevice = (e) => {
        e.preventDefault();
        axios.post(`/update-lab-center-services/${params.id}`, service).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                navigate('/lab-module-new/lab-center-service');
            }
        })
    }

    useEffect(() => {
        axios.get(`/edit-lab-center-services/${params.id}`, service).then(res => {
            if (res.data.status === 200) {
                setService(res.data.service);

            }
        })
    }, [])
    return (
        <div>
            <div className="card mt-2">
                <div className="card-header">
                    <h6 className="card-title"> Add Lab Center Service
                        <Link to={'/lab-module-new/lab-center-service'} className="btn btn-primary btn-sm float-end"> Back </Link>
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

                                <div className="float-right">
                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                        className="fas fa-save"  ></i> Update
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