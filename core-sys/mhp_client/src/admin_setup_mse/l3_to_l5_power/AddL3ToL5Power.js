import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

const AddL3ToL5Power = () => {
    const [l3ToL5Power, setL3ToL5Power] = useState({
        name: "",
        error:""
    });
    const handleChange = (e) => {
        setL3ToL5Power({ ...l3ToL5Power, [e.target.name]: e.target.value })
    }
    const SubmitL3ToL5Power = (e) => {
        // alert("l3ToL5Power")
        e.preventDefault();
        axios.post("/add-l3-to-l5-power",l3ToL5Power)
        .then(res=>{
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setL3ToL5Power({
                    name:""
                });
    
            }
            else if(res.data.status===400){
                setL3ToL5Power({...l3ToL5Power,error:res.data.message.name[0]})
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
                            <h6 className="card-title"> Add L3 To L5 Power
                                <Link to={'/l3-to-l5-power'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="L3ToL5PowerForm" onSubmit={SubmitL3ToL5Power}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={l3ToL5Power.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{l3ToL5Power.error}</span>
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

export default AddL3ToL5Power;