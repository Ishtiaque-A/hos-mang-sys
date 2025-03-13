import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

// import swal from 'sweetalert';

class Add_visit extends Component {

    state = {
        visit_type_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveVisit = async (e) => {
        e.preventDefault();

        const res = await axios.post(`/add-visit`, this.state);
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            // swal({
            //     title: "Successfull!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });         
            this.setState({
                visit_type_name: '',
                error_list: [],
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
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">

                                    <h6 className="card-title">Add Visit
                                        <Link to={'/all-visit'} className="btn mb-1 btn-primary btn-sm float-end"> Back </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveVisit}>
                                        <div className="form-group">
                                            <label htmlFor="visit_type_name" className="col-form-label-sm"> Visit Type Name </label>
                                            <input type="text" className="form-control form-control-sm" name="visit_type_name" onChange={this.handleInput} value={this.state.visit_type_name} />
                                            <span className="text-danger">{this.state.error_list.visit_type_name}</span>

                                        </div>
                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                className="fas fa-save"></i> Save
                                            </button>
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

export default Add_visit;