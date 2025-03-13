import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import LeftMenuBar from '../leftMenubar/LeftMenuBar';

const AddUserRole = () => {
    const [UserRole, setUserRole] = useState({
        name: "",
    });


    const submitInstitute = (e) => {
        e.preventDefault();
        axios.post(`/save-user-role`, UserRole).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setUserRole({
                    name: "",
                });

            }
           
        })
    }
    return (
        <div className="container mb-3">
            <div className="row">
            <div className="col-md-3">
                <LeftMenuBar />
             </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Add Role
                                <Link to={'/user-role'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="CervixForm" onSubmit={submitInstitute}>
                                <div className="card-body">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                            <input type="text" value={UserRole.name} className="form-control" name="name" onChange={(e)=>setUserRole({...UserRole,name:e.target.value})} />
                                    
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

export default AddUserRole;


