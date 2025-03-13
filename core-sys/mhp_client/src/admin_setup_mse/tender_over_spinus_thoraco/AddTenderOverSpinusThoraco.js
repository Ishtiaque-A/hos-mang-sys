import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

const AddTenderOverSpinusThoraco = () => {
    const [tenderOverSpinusThoraco, setTenderOverSpinusThoraco] = useState({
        name: "",
        error:""
    });
    const handleChange = (e) => {
        setTenderOverSpinusThoraco({ ...tenderOverSpinusThoraco, [e.target.name]: e.target.value })
    }
    const SubmitTenderOverSpinusThoraco = (e) => {
        // alert("tenderOverSpinusThoraco")
        e.preventDefault();
        axios.post("/add-tender-over-spinus-thoraco",tenderOverSpinusThoraco)
        .then(res=>{
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setTenderOverSpinusThoraco({
                    name:""
                });
    
            }
            else if(res.data.status===400){
                setTenderOverSpinusThoraco({...tenderOverSpinusThoraco,error:res.data.message.name[0]})
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
                            <h6 className="card-title"> Add Tender Over Spinus Process at
                                <Link to={'/tender-over-spinus-thoraco'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="TenderOverSpinusThoracoForm" onSubmit={SubmitTenderOverSpinusThoraco}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={tenderOverSpinusThoraco.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{tenderOverSpinusThoraco.error}</span>
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

export default AddTenderOverSpinusThoraco;