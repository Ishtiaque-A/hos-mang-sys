import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import MedicationSetupSidebar from '../medication_setup_main_sidebar/MedicationSetupSidebar';

function AddServices() {

    const [services, setservices] = useState({
        services_name: "",
        error_list: [],
    });

    const handleInput = (e) => {
        setservices({
            ...services, [e.target.name]: e.target.value
        });
    }




    const submitservices = (e) => {
        // alert("hgfdhgf")
        e.preventDefault();
        axios.post(`/save-services-name`, services).then(res => {
            if (res.data.status == 200) {
                swal("Success", res.data.message, "success");
                setservices({
                    services_name: "",
                    error_list: [],

                });

            }
            else if (res.data.status == 400) {
                setservices({ ...services, error_list: res.data.errors });

            }

        })
    }

    return (
        <div>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <MedicationSetupSidebar/>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title"> Add Services/Facilities Name
                                        <Link to={'/services-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form id="servicesForm" onSubmit={submitservices}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="history_name" className="col-form-label-sm"> Name </label>
                                                    <input type="text" value={services.services_name} className="form-control" name="services_name" onChange={handleInput} />
                                                    <span className="text-danger">{services.error_list.services_name}</span>

                                                </div>
                                               
                                                <div className="float-right">
                                                    <button type="submit"  className="btn btn-sm btn-primary text-uppercase float-end mt-2" ><i
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
            </>
        </div>
    )
}

export default AddServices;
