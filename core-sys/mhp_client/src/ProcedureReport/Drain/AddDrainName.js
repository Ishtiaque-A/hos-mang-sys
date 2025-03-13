import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const AddDrainName = () => {

    const [drainName,setDrainName] = useState({
          name:"",
          error_list: []
    });


    const handleInput=(e)=>{
        setDrainName({
            ...drainName,[e.target.name]:e.target.value
        });
     };

    const saveDrainName =(e)=>{
     e.preventDefault();
 
    //  const drainNameProcess ={
    //      name:drainName
    //  }
     
     axios.post('/save-drain-name',drainName)
     .then(res => {
         if (res.data.status === 200) {
             swal("Success", res.data.message, "success");
             setDrainName({
                name:"",
                error_list:[]
             });
 
         }
         else if (res.data.status === 400) {
            setDrainName({ ...drainName, error_list: res.data.errors });
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
                                <h6 className="card-title"> Add Drain
                                    <Link to={'/drain'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form id="RadiologyTestTypeForm" onSubmit={saveDrainName}>
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="" className="col-form-label-sm"> Name </label>
                                                <input type="text" value={drainName.name} className="form-control" name="name" onChange={handleInput}/>
                                                <span className="text-danger">{drainName.error_list.name}</span>
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

export default AddDrainName;