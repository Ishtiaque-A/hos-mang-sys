import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';


const EditWalkOnHeels = () => {
    const [walkOnHeels, setWalkOnHeels] = useState({
        name: "",
        error: ""
    });
    let navigate = useNavigate();
    const handleChange = (e) => {
        setWalkOnHeels({ ...walkOnHeels, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-walk-on-heels/${params.id}`)
            .then(res => setWalkOnHeels(res.data.walkOnHeels))
    }, []);
    const updateWalkOnHeels = (e) => {
        console.log("walkOnHeels", walkOnHeels)
        e.preventDefault();
        axios.post(`/update-walk-on-heels/${params.id}`, walkOnHeels)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setWalkOnHeels({
                        name: ""
                    });
                    navigate("/walk-on-heels")
                } else if (res.data.status === 400) {
                    setWalkOnHeels({ ...walkOnHeels, error: res.data.message.name[0] })
                }
            })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <MusculoSkeletalExaminationSidebar />
                </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Edit Walk On Heels
                                <Link to={'/walk-on-heels'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="WalkOnHeelsForm" onSubmit={updateWalkOnHeels}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={walkOnHeels.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{walkOnHeels.error}</span>
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

export default EditWalkOnHeels;