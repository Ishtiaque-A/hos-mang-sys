import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import CustomMedicineSetupSidebar from '../custom_medicine_sidebar/CustomMedicineSetupSidebar';

function AddRestriction() {
   
    const [restriction,setrestriction]=useState({
        restriction_name:"",
        error_list:[],
    });
   

    const handleInput=(e)=>{
       setrestriction({
           ...restriction,[e.target.name]:e.target.value
       });
    }
    const submitrestriction=(e)=>{     
        e.preventDefault();
    //   console.log(restriction);
        
        axios.post(`/save-restriction`,restriction).then(res=>{
            if(res.data.status==200){
                swal("Success", res.data.message, "success");
               setrestriction({
                restriction_name:"",
                error_list: [],

               });
            }
            else if(res.data.status==400){
                setrestriction({ ...restriction, error_list: res.data.errors });

            }
   
        })
    }
    
    return (
        <div>
               <>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <CustomMedicineSetupSidebar />
            </div>
        <div className="col-md-9 mt-3">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Add Restriction
                        <Link to={'/all-restriction'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="restrictionForm" onSubmit={submitrestriction}>
                        <div className="card-body">

                <div className="col-md-12">
                
        
                    <div className="form-group">
                        <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                        <input type="text"  value={restriction.restriction_name} className="form-control" name="restriction_name" onChange={handleInput} />
                        {/* <span className="text-danger">{cnFour.error_list.name}</span> */}

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

export default AddRestriction
