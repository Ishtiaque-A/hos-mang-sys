import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

function EditSpecialist(props) {

    const [specialistInput, setSpecialist] = useState([]);
    const [error, setError] = useState([]);

    const [departmentlist, setDepartmentlist] = useState([]);

    useEffect(() => {

        axios.get(`/department-dropdown`).then(res => {
            if (res.data.status === 200) {
                setDepartmentlist(res.data.department);
            }
        })

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const specialist_id = props.match.params.id;
        axios.get(`/edit-specialist/${lastpart}`).then(res => {

            if (res.data.status === 200) {
                setSpecialist(res.data.specialist);
            } else if (res.data.status === 404) {

                setError(res.data.errors);

            }

        });

    }, []);


    const handleInput = (e) => {
        e.persist();
        setSpecialist({ ...specialistInput, [e.target.name]: e.target.value });
    }

    const updateSpecialist = (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const data = specialistInput;
        axios.put(`/update-specialist/${lastpart}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");

                setSpecialist({
                    ...specialistInput,
                });
                setError('');
            } else {
                setError(res.data.errors)
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
                                <h6 className="card-title">Edit Specialist
                                    <Link to={'/specialist'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateSpecialist}>
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
                                                <span className="text-danger">{error.department_id}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="specialists_name" className="col-form-label-sm">Specialist Name</label>
                                                <input type="text" onChange={handleInput} value={specialistInput.specialists_name} className="form-control font-size-patient" name="specialists_name" />
                                                <span className="text-danger">{error.specialists_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Update
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

export default EditSpecialist;