import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

function EditProximalInterphalangealJoint(props) {

    const [ProximalInterphalangealJoint, setProximalInterphalangealJoint] = useState([]);
    const [error, setError] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const carotid_id = props.match.params.id;
        axios.get(`/edit-proximal-interphalangeal-joint/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                console.log(res.data);
                setProximalInterphalangealJoint(res.data.ProximalInterphalangealJoint);
                // setPicture(res.data.ProximalInterphalangealJoint.image);
            } else if (res.data.status === 404) {
                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setProximalInterphalangealJoint({ ...ProximalInterphalangealJoint, [e.target.name]: e.target.value });
    }

    const updateProximalInterphalangealJointInput = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append('ProximalInterphalangealJoint_name', ProximalInterphalangealJoint.ProximalInterphalangealJoint_name);


        axios.post(`/update-proximal-interphalangeal-joint/${lastpart}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setProximalInterphalangealJoint({
                    ...ProximalInterphalangealJoint,

                });
                navigate(`/proximal-interphalangeal-joint/`);

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
                    <MusculoSkeletalExaminationSidebar/>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title"> Proximal Interphalangeal Joint
                                    <Link to={'/proximal-interphalangeal-joint'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="ProximalInterphalangealJointForm" onSubmit={updateProximalInterphalangealJointInput}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={ProximalInterphalangealJoint.ProximalInterphalangealJoint_name} className="form-control" name="ProximalInterphalangealJoint_name" onChange={handleInput} />
                                                <span className="text-danger">{error.ProximalInterphalangealJoint_name}</span>
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

export default EditProximalInterphalangealJoint;
