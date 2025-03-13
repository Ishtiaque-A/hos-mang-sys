import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import LabSetupSidebar from './LabSetupSidebar';

const AddLabTestType = () => {
    
   const [LabTestType, setLabTestType] = useState({
        name:"",
        error_list:[]
   });

   const handleInput = (e) => {
    setLabTestType({
        ...LabTestType, [e.target.name]:e.target.value
    })
   }
   const saveLabTest =(e)=>{
    e.preventDefault();

    // const labTest ={
    //     name:LabTestType,
    // }
    
    axios.post('/save-lab-test-type',LabTestType)
    .then(res => {
        console.log("name", res.data);
        if (res.data.status == 200) {
           
            swal("Success", res.data.message, "success");
            setLabTestType({
                name:"",
                error_list:[]
            });

        }
        else if (res.data.status == 400) {
            setLabTestType({ ...LabTestType, error_list: res.data.errors });

        }
     }
    )}
    

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <LabSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Lab Test Type
                                        <Link to={'/lab_test_type'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestTypeForm" onSubmit={saveLabTest}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Name </label>
                                                    <input type="text" className="form-control" value={LabTestType.name} name="name" onChange={handleInput}/>
                                                    <span className="text-danger">{LabTestType.error_list.name}</span>
                                                </div>
                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary  text-uppercase float-end mt-2" ><i
                                                        className="fas fa-save"></i> Save
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
            </>
        </div>
    );
};

export default AddLabTestType;