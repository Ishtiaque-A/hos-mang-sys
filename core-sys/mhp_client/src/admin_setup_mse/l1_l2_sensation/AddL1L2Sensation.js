import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

const AddL1L2Sensation = () => {
    const [l1L2Sensation, setL1L2Sensation] = useState({
        name: "",
        error:""
    });
    const handleChange = (e) => {
        setL1L2Sensation({ ...l1L2Sensation, [e.target.name]: e.target.value })
    }
    const SubmitL1L2Sensation = (e) => {
        // alert("l1L2Sensation")
        e.preventDefault();
        axios.post("/add-l1-and-l2-sensation",l1L2Sensation)
        .then(res=>{
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setL1L2Sensation({
                    name:""
                });
    
            }
            else if(res.data.status===400){
                setL1L2Sensation({...l1L2Sensation,error:res.data.message.name[0]})
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
                            <h6 className="card-title"> Add L1 and L2 Sensation
                                <Link to={'/l1-and-l2-sensation'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="L1L2SensationForm" onSubmit={SubmitL1L2Sensation}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={l1L2Sensation.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{l1L2Sensation.error}</span>
                                        </div>
                                        <div className="float-right">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
                                                className="fas fa-save"  ></i> Save
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

export default AddL1L2Sensation;