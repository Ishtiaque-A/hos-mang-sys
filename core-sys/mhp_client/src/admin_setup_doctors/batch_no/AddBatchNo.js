import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';

const AddBatchNo = () => {
    const [batchNo, setBatchNo] = useState({
        name: "",
        error:""
    });
    const handleChange = (e) => {
        setBatchNo({ ...batchNo, [e.target.name]: e.target.value })
    }
    const SubmitBatchNo = (e) => {
        // alert("batchNo")
        e.preventDefault();
        axios.post("/add-batch-no",batchNo)
        .then(res=>{
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setBatchNo({
                    name:""
                });
    
            }
            else if(res.data.status===400){
                setBatchNo({...batchNo,error:res.data.message.name[0]})
            }
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ImmunisationSetupSidebar />
                </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Add Batch No.
                                <Link to={'/batch-no'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="BatchNoForm" onSubmit={SubmitBatchNo}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={batchNo.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{batchNo.error}</span>
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

export default AddBatchNo;