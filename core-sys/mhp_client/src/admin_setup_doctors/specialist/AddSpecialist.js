import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';


function AddSpecialist() {

    const [specialistInput, setSpecialist] = useState({
        specialists_name: '',
        department_id: '',
        error_list: [],
    });
    const [departmentlist, setDepartmentlist] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setSpecialist({ ...specialistInput, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        
        axios.get(`/department-dropdown`).then(res => {
            if (res.data.status === 200) {
                setDepartmentlist(res.data.department);
            }
        })
        

    }, []);

    const submitSpecialist = (e) => {
        e.preventDefault();

        const data = {
            specialists_name: specialistInput.specialists_name,
            department_id: specialistInput.department_id,
        }

        axios.post(`/save-specialist`, data).then(res => {
            // console.log(res.data.status);
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSpecialist({
                    ...specialistInput,

                    specialists_name: '',
                    department_id: '',
                    error_list: [],

                });

            } else if (res.data.status === 400) {
                setSpecialist({ ...specialistInput, error_list: res.data.errors });
            }

        });
    }

    return (
        <>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <DoctorsSetupSidebar></DoctorsSetupSidebar>
                    </div>
                    <div className="col-md-9 mt-3">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title">Add Specialist
                                    <Link to={'/specialist'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitSpecialist} id="specialistForms">
                                    <div className="card-body">

                                        <div className="col-md-12">
                                            <div> 
                                                <label htmlFor="inputEmail4"
                                                    className="form-label col-form-label col-form-label-sm">Departments</label>
                                                <select id="inputState" name="department_id" onChange={handleInput} value={specialistInput.department_id}
                                                    className="form-select  col-form-label-sm font-size-patient">
                                                    <option selected>Select</option>
                                                    {
                                                        departmentlist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.departments_name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className="text-danger">{specialistInput.error_list.department_id}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="specialists_name" className="col-form-label-sm">Specialist Name</label>
                                                <input placeholder="Specialist Name" type="text" onChange={handleInput} value={specialistInput.specialists_name} className="form-control font-size-patient" name="specialists_name" />
                                                <span className="text-danger">{specialistInput.error_list.specialists_name}</span>
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

    )
}


export default AddSpecialist;