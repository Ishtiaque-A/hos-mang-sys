import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import EntSetupSidebar from '../ent_setup_mainsidebar/EntSetupSidebar';

function AddTongue() {
   

    const[statuslist,setStatusList]=useState([]);
     const [tongue,settongue]=useState({
        tongue_name:"",
       status_id:"",
        selection_criteria:"",
        error_list: [],
    });

    useEffect(() => {  
        axios.get(`/tongue-status`).then(res => {
            if (res.data.status === 200) {
                setStatusList(res.data.status_list);
            }
        })
    }, 
    []);

    const handleInput=(e)=>{
       settongue({
           ...tongue,[e.target.name]:e.target.value
       });
    }

    const submittongue=(e)=>{     
        e.preventDefault();
        const data={
            tongue_name:tongue.tongue_name,
           status_id:tongue.status_id,
            selection_criteria:tongue.selection_criteria,
        }
        
        axios.post(`/save-tongue`,data).then(res=>{
            if(res.data.status==200){
                swal("Success", res.data.message, "success");
               settongue({
                tongue_name:"",
               status_id:"",
                selection_criteria:"",
                error_list: [],

               });
            }
            else if(res.data.status==400){
                settongue({ ...tongue, error_list: res.data.errors });

            }
   
        })
    }
    
    return (
        <div>
               <>
    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <EntSetupSidebar/>
            </div>
        <div className="col-md-9 mt-3">
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title"> Add Tongue
                        <Link to={'/tongue'} className="btn btn-primary btn-sm float-end"> Back </Link>
                    </h6>
                </div>
                <div className="card-body">
                    <form id="EarCanalForm" onSubmit={submittongue}>
                        <div className="card-body">

                <div className="col-md-12">
                
        
                    <div className="form-group">
                        <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                        <input type="text"  value={tongue.tongue_name} className="form-control" name="tongue_name" onChange={handleInput} />
                        <span className="text-danger">{tongue.error_list.tongue_name}</span>

                    </div>
                    <div>
                        <label htmlFor="inputPassword4"
                                className="form-label  col-form-label col-form-label-sm">Status</label>

                        <select id="inputState" onChange={handleInput} value={tongue.status_id} name="status_id"
                            className="form-select  col-form-label-sm font-size-patient">
                            <option value="">Select</option>
                            {
                                statuslist.map((item) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.history_exam_status_name}</option>
                                    )
                                })
                            }
                            </select>
                    </div>
                    <span className="text-danger">{tongue.error_list.status_id}</span>


         <div className='form-group mt-3'>
                    <label htmlFor="history_name" className="col-form-label-sm mt-1  "><b className='me-3'>Selection </b></label>
                    <div class="form-check form-check-inline  ">
                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria"id="inlineRadio1" value="single"/>
                        <label className="form-check-label" for="inlineRadio1"> <span style={{marginLeft:"-28px"}}>Single </span></label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-1" type="radio" onChange={handleInput} name="selection_criteria" id="inlineRadio2" value="multiple"/>
                        <label className="form-check-label" for="inlineRadio2"> <span style={{marginLeft:"-28px"}}>Multiple </span></label>
                </div>
            </div>
            <span className="text-danger">{tongue.error_list.selection_criteria}</span>

                
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

export default AddTongue
