import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ProcedureReportSetupSidebar from '../ProcedureReportSetupSidebar';

const AddDietName = () => {

    const [dietName,setDietName] = useState({
           name:"",
           error_list: []
    });


    const handleInput=(e)=>{
        setDietName({
            ...dietName,[e.target.name]:e.target.value
        });
     };

    const saveDietName =(e)=>{
     e.preventDefault();
    
    //  const dietedName ={
    //      name:dietName
    //  }
     
     axios.post('/save-diet-name',dietName)
     .then(res => {
       
         if (res.data.status == 200) {
            console.log("res.data save-diet-name", res.data);
             swal("Success", res.data.message, "success");
             setDietName({
                name:"",
                error_list:[]
             });
 
         }
         else if (res.data.status == 400) {
            setDietName({ ...dietName, error_list: res.data.errors });
 
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
                                    <h6 className="card-title"> Add Diet Name
                                        <Link to={'/diet'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="RadiologyTestTypeForm" onSubmit={saveDietName}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="col-form-label-sm"> Name </label>
                                                    <input type="text" className="form-control" value={dietName.name} name="name" onChange={handleInput}/>
                                                    <span className="text-danger">{dietName.error_list.name}</span>
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

export default AddDietName;