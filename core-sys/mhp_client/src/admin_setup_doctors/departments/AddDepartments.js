import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import './Ethnicity.css';

import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

class AddDepartments extends Component {

    // to catch the data from input fields
    state = {
        departments_name: '',
        error_list: [],
        department_image: '',
        dept_image_url: '',
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveEthnicity = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('departments_name', this.state.departments_name);
        formData.append('department_image', this.state.department_image);
        const res = await axios.post('/save-department', formData);

        if (res.data.status === 200) {

            swal("Success", res.data.message, "success");
            // console.log(res.data.message);
            this.setState({
                departments_name: '',
                error_list: [],
                department_image: '',
                dept_image_url: '',
            });
        } else {
            this.setState({
                error_list: res.data.validate_error,
            });
        }

    }

    render() {
        return (
            <>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <DoctorsSetupSidebar></DoctorsSetupSidebar>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="ms-3 mt-3">Add Departments
                                        <Link to={"/department"} className="btn btn-primary btn-sm me-3 float-end">Back</Link>
                                    </h6>
                                    <form onSubmit={this.saveEthnicity}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="departments_name" className="col-form-label-sm">Departments Name</label>
                                                    <input type="text" placeholder="Department Name" onChange={this.handleInput} value={this.state.departments_name} className="form-control" name="departments_name" />
                                                    <span className="text-danger">{this.state.error_list.departments_name}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="department_image" className="col-form-label-sm"> Image </label>
                                                    <input type="file" onChange={(e) => {
                                                        this.setState({
                                                            department_image: e.target.files[0],
                                                            dept_image_url: URL.createObjectURL(e.target.files[0])
                                                        });
                                                    }} accept="image/jpg,image/jpeg,image/png" className="form-control" name="department_image" />
                                                    <span className="text-danger">{this.state.error_list.department_image}</span>
                                                </div>
                                                {this.state.dept_image_url == false ?
                                                    "" : (
                                                        <div className="docImage">
                                                            <img
                                                                src={this.state.dept_image_url}
                                                                className="doctorImageUrlPreview"
                                                                alt="preview image"
                                                            />
                                                            <i
                                                                onClick={() => {
                                                                    this.setState({
                                                                        dept_image_url: ""
                                                                    });
                                                                }}
                                                                class="far fa-times-circle"
                                                            ></i>
                                                        </div>
                                                    )}
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
        );
    }
}

export default AddDepartments;