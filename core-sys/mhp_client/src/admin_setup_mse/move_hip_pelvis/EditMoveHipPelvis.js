import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';


const EditMoveHipPelvis = () => {
    const [moveHipPelvis, setMoveHipPelvis] = useState({
        name: "",
        error:""
    });
    const navigate=useNavigate();

    const handleChange = (e) => {
        setMoveHipPelvis({ ...moveHipPelvis, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-move-hip-pelvis/${params.id}`)
            .then(res => setMoveHipPelvis(res.data.moveHipPelvis))
    }, []);
    const updateMoveHipPelvis = (e) => {
        console.log("moveHipPelvis", moveHipPelvis)
        e.preventDefault();
        axios.post(`/update-move-hip-pelvis/${params.id}`, moveHipPelvis)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setMoveHipPelvis({
                        name: ""
                    });
                    navigate("/move-hip-pelvis")

                } else if (res.data.status === 400) {
                    setMoveHipPelvis({ ...moveHipPelvis, error: res.data.message.name[0] })
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
                            <h6 className="card-title"> Edit Move Hip Pelvis
                                <Link to={'/move-hip-pelvis'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="InspectionForm" onSubmit={updateMoveHipPelvis}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={moveHipPelvis.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{moveHipPelvis.error}</span>
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

export default EditMoveHipPelvis;