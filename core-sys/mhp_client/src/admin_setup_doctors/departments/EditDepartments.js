import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';


class EditDepartments extends Component {
    state = {
        departments_name: '',
        department_image: '',
        dept_image_url: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount() {
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        // return lastpart;
        // const ethnicity_id = this.props.match.params.id;
        // // console.log(ethnicity_id);
        const res = await axios.get(`/edit-department/${lastpart}`);
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                departments_name: res.data.ethnicity.departments_name,
                department_image: res.data.ethnicity.department_image
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/ethnicity');
        }

    }

    //Update Edit Data
    updateEthnicity = async (e) => {
        e.preventDefault();
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const formData = new FormData();
        formData.append("departments_name", this.state.departments_name);
        formData.append("department_image", this.state.department_image);

        axios.post(`/update-department/${lastpart}`, formData).then(res => {
            swal("Success", res.data.message, "success");
        }).catch(err => {
            swal("Error", "Oops something is wrong", "error");
        });
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
                                <div className="card-header">
                                    <h6 className="card-title">Edit Department
                                        <Link to={'/department'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateEthnicity}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="departments_name" className="col-form-label-sm"> Department Name </label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.departments_name} className="form-control" name="departments_name" />
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
        );
    }
}

export default EditDepartments;