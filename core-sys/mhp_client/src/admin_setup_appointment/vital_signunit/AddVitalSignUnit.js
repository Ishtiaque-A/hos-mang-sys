import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';
function AddVitalSignUnit() {
   

     const [vitalunit,setvitalunit]=useState({
       vitalunit_name:"",
        error_list: [],
    });



    const handleInput=(e)=>{
       setvitalunit({
          ...vitalunit, [e.target.name]:e.target.value
       });
    }

    const submitCanal=(e)=>{     
        e.preventDefault();
        const data={
           vitalunit_name:vitalunit.vitalunit_name,
        }
    
        axios.post(`/save-vital-unit`,data).then(res=>{
            if(res.data.status==200){
                swal("Success", res.data.message, "success");
               setvitalunit({
               vitalunit_name:"",
                error_list: [],

               });
            }
            else if(res.data.status==400){
                setvitalunit({  error_list: res.data.errors });

            }
   
        })
    }
    
    return (
        <div>
               <>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
            <AddDashboard></AddDashboard>
            </div>
        <div className="col-md-9 mt-2">
            <div className="card">
                <div className="card-header">
                    <h6> Add Vital Sign Unit 
                        <Link to={'/vital-unit'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarCanalForm" onSubmit={submitCanal}>
                        <div className="card-body">

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                        <input type="text"  value={vitalunit.vitalunit_name} className="form-control" name="vitalunit_name" onChange={handleInput} />
                        <span className="text-danger">{vitalunit.error_list.vitalunit_name}</span>

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

export default AddVitalSignUnit
