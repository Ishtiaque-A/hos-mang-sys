import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';


const EditL1L2HipFlexion = () => {
    const [l1L2HipFlexion, setL1L2HipFlexion] = useState({
        name: "",
        error:""
    });
    const navigate= useNavigate();
    const handleChange = (e) => {
        setL1L2HipFlexion({ ...l1L2HipFlexion, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-l1-and-l2-hip-flexion/${params.id}`)
            .then(res => setL1L2HipFlexion(res.data.l1L2HipFlexion))
    }, []);
    const updateL1L2HipFlexion = (e) => {
        console.log("l1L2HipFlexion", l1L2HipFlexion)
        e.preventDefault();
        axios.post(`/update-l1-and-l2-hip-flexion/${params.id}`, l1L2HipFlexion)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setL1L2HipFlexion({
                        name: ""
                    });
                    navigate("/l1-and-l2-hip-flexion");
                } else if (res.data.status === 400) {
                    setL1L2HipFlexion({ ...l1L2HipFlexion, error: res.data.message.name[0] })
                }
            })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <MusculoSkeletalExaminationSidebar />
                </div>
                <div className="col-md-9 mt-2">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit L1 and L2 Hip Flexion
                                <Link to={'/l1-and-l2-hip-flexion'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="L1L2HipFlexionForm" onSubmit={updateL1L2HipFlexion}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={l1L2HipFlexion.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{l1L2HipFlexion.error}</span>
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

            </div>
        </div>
    );
};

export default EditL1L2HipFlexion;