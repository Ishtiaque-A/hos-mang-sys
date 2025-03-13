import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';


const EditLyingOnCouch = () => {
    const [lyingOnCouch, setLyingOnCouch] = useState({
        name: "",
        error:""
    });
    let navigate = useNavigate();
    const handleChange = (e) => {
        setLyingOnCouch({ ...lyingOnCouch, [e.target.name]: e.target.value })
    }
    let params = useParams();
    useEffect(() => {
        axios.get(`/edit-lying-on-couch/${params.id}`)
            .then(res => setLyingOnCouch(res.data.lyingOnCouch))
    }, []);
    const updateLyingOnCouch = (e) => {
        console.log("lyingOnCouch", lyingOnCouch)
        e.preventDefault();
        axios.post(`/update-lying-on-couch/${params.id}`, lyingOnCouch)
            .then(res => {
                if (res.data.status == 200) {
                    swal("Success", res.data.message, "success");
                    setLyingOnCouch({
                        name: ""
                    });
                    navigate("/lying-on-couch");
                } else if (res.data.status === 400) {
                    setLyingOnCouch({ ...lyingOnCouch, error: res.data.message.name[0] })
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
                            <h6 className="card-title"> Edit Lying On Couch
                                <Link to={'/lying-on-couch'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="LyingOnCouchForm" onSubmit={updateLyingOnCouch}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={lyingOnCouch.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{lyingOnCouch.error}</span>
                                        </div>
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                className="fas fa-save"  ></i> update
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

export default EditLyingOnCouch;