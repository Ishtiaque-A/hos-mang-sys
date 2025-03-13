import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MusculoSkeletalExaminationSidebar from '../mse_setup_mainsidebar/MusculoSkeletalExaminationSidebar';

const AddTenderTenernessOverL1ToL6Thoraco = () => {
    const [tenderTenernessOverL1ToL6Thoraco, setTenderTenernessOverL1ToL6Thoraco] = useState({
        name: "",
        error:""
    });
    const handleChange = (e) => {
        setTenderTenernessOverL1ToL6Thoraco({ ...tenderTenernessOverL1ToL6Thoraco, [e.target.name]: e.target.value })
    }
    const SubmitTenderTenernessOverL1ToL6Thoraco = (e) => {
        // alert("tenderTenernessOverL1ToL6Thoraco")
        e.preventDefault();
        axios.post("/add-tender-tenerness-over-l1-to-l6-thoraco",tenderTenernessOverL1ToL6Thoraco)
        .then(res=>{
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setTenderTenernessOverL1ToL6Thoraco({
                    name:""
                });
    
            }
            else if(res.data.status===400){
                setTenderTenernessOverL1ToL6Thoraco({...tenderTenernessOverL1ToL6Thoraco,error:res.data.message.name[0]})
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
                            <h6 className="card-title"> Add Tender/Tenerness Over L1 To L6 Thoraco
                                <Link to={'/tender-tenerness-over-l1-to-l6-thoraco'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="TenderTenernessOverL1ToL6ThoracoForm" onSubmit={SubmitTenderTenernessOverL1ToL6Thoraco}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={tenderTenernessOverL1ToL6Thoraco.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{tenderTenernessOverL1ToL6Thoraco.error}</span>
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

export default AddTenderTenernessOverL1ToL6Thoraco;