import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import DoctorInboxSetupSidebar from '../../DoctorInbox/DoctorInboxSetupSidebar';
function AddTheResultIs() {
   
    const [theResultIs,settheResultIs]=useState({
        the_result_is_name:"",
        error_list:[],
    });
   

    const handleInput=(e)=>{
       settheResultIs({
           ...theResultIs,[e.target.name]:e.target.value
       });
    }
    const submittheResultIs=(e)=>{     
        e.preventDefault();
    //   console.log(theResultIs);
        
        axios.post(`/save-theResultIs`,theResultIs).then(res=>{
            if(res.data.status==200){
                swal("Success", res.data.message, "success");
               settheResultIs({
                the_result_is_name:"",
                error_list: [],

               });
            }
            else if(res.data.status==400){
                settheResultIs({ ...theResultIs, error_list: res.data.errors });

            }
   
        })
    }
    
    return (
        <div>
               <>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <DoctorInboxSetupSidebar />
            </div>
        <div className="col-md-9 mt-2">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Add theResultIs
                        <Link to={'/the-result-is'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="theResultIsForm" onSubmit={submittheResultIs}>
                        <div className="card-body">

                <div className="col-md-12">
                
        
                    <div className="form-group">
                        <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                        <input type="text"  value={theResultIs.the_result_is_name} className="form-control" name="the_result_is_name" onChange={handleInput} />
                        <span className="text-danger">{theResultIs.error_list.the_result_is_name}</span>

                    </div>
                
                
                    <div className="float-right">
                        <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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
    )
}

export default AddTheResultIs
