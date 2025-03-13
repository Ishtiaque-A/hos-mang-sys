import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

class Add_generic extends Component {

    // to catch the data from input fields
    state = {
        name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    generic = async (e) => {
        e.preventDefault();
        const res = await axios.post('/add-generic-name', this.state);

        if (res.data.status === 200)
        {

            swal("Success",res.data.message,"success");
            // console.log(res.data.message);
            this.setState({
                name: '',
                error_list: [],
            });
        }else{
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
                                <h6 className="ms-3 mt-3">Add Generic
                                    <Link to={"/generic-name"} className="btn btn-primary btn-sm me-3 float-end">Back</Link>
                                </h6>
                                <form onSubmit={this.generic}>
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="name" className="col-form-label-sm">Generic Name</label>
                                                <input type="text" placeholder="Generic Name" onChange={this.handleInput} value={this.state.name} className="form-control" name="name" />
                                                <span className="text-danger">{this.state.error_list.name}</span>
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
        );
    }
}

export default Add_generic;

