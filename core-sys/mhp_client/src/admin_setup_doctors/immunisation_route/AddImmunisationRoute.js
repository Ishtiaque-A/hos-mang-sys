import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import ImmunisationSetupSidebar from '../immunisation_setup_sidebar/ImmunisationSetupSidebar';

const AddImmunisationRoute = () => {
    const [immunisationRoute, setImmunisationRoute] = useState({
        name: "",
        error:""
    });
    const handleChange = (e) => {
        setImmunisationRoute({ ...immunisationRoute, [e.target.name]: e.target.value })
    }
    const SubmitImmunisationRoute = (e) => {
        // alert("immunisationRoute")
        e.preventDefault();
        axios.post("/add-immunisation-route",immunisationRoute)
        .then(res=>{
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setImmunisationRoute({
                    name:""
                });
    
            }
            else if(res.data.status===400){
                setImmunisationRoute({...immunisationRoute,error:res.data.message.name[0]})
            }
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ImmunisationSetupSidebar />
                </div>
                <div className="col-md-9 mt-3">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title"> Add Immunization Route.
                                <Link to={'/immunisation-route'} className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h6>
                        </div>
                        <div className="card-body">
                            <form id="ImmunisationRouteForm" onSubmit={SubmitImmunisationRoute}>
                                <div className="card-body">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input type="text" name='name' onChange={(e) => handleChange(e)} value={immunisationRoute.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            <span className='text-danger'>{immunisationRoute.error}</span>
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

export default AddImmunisationRoute;