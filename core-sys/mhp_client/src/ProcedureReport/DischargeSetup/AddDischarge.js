import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const AddDischargeName = () => {

    const [dischargeName,setDischargeName] = useState({
           name:"",
           error_list:[]
    });

    const handleInput =(e)=> {
        setDischargeName({
            ...dischargeName, [e.target.name]:e.target.value
        })
    }
    const saveDischargeName =(e)=>{
     e.preventDefault();
    
    //  const dischargeNames ={
    //      name:dischargeName
    //  }
     
     axios.post('/save-discharge-name',dischargeName)
     .then(res => {
         if (res.data.status == 200) {
             swal("Success", res.data.message, "success");
             setDischargeName({
                name:"",
                error_list:[]
             });
 
         }
         else if (res.data.status == 400) {
            setDischargeName({ ...dischargeName, error_list: res.data.errors });
 
         }
      }
     )}

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <ProcedureReportSetupSidebar />
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Discharge Name
                                        <Link to={'/discharge'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestTypeForm" onSubmit={saveDischargeName}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Name </label>
                                                    <input type="text" className="form-control" value={dischargeName.name} name="name" onChange={handleInput}/>
                                                    <span className="text-danger">{dischargeName.error_list.name}</span>
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

export default AddDischargeName;