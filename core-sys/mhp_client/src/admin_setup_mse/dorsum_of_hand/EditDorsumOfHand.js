import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';


const EditDorsumOfHand = () => {
    const [dorsumOfHand, setDorsumOfHand] = useState({
        name: "",
        error: ""
    });
    let navigate = useNavigate();

    const handleChange = (e) => {
        setDorsumOfHand({ ...dorsumOfHand, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-dorsum-of-hand/${params.id}`)
            .then(res => setDorsumOfHand(res.data.dorsumOfHand))
    }, []);
    const updateDorsumOfHand = (e) => {
        console.log("dorsumOfHand", dorsumOfHand)
        e.preventDefault();
        axios.post(`/update-dorsum-of-hand/${params.id}`, dorsumOfHand)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setDorsumOfHand({
                        name: ""
                    });
                    navigate("/dorsum-of-hand");
                } else if (res.data.status === 400) {
                    setDorsumOfHand({ ...dorsumOfHand, error: res.data.message.name[0] })
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
                            <h6 className="card-title"> Edit Dorsum of Hand
                                <Link to={'/dorsum-of-hand'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="DorsumOfHandForm" onSubmit={updateDorsumOfHand}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={dorsumOfHand.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{dorsumOfHand.error}</span>
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

export default EditDorsumOfHand;