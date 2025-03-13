import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import Footer from "../../Component/Footer/Footer";

class AddBloodGroup extends Component {

    // to catch the data from input fields
    state = {
        blood_group_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveBloodGroup = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-blood-group', this.state);

        if (res.data.status === 200) {

            swal("Success", res.data.message, "success");
            // console.log(res.data.message);
            this.setState({
                blood_group_name: '',
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
                            <AddDashboard></AddDashboard>
                        </div>
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="ms-3">Add Blood Group
                                        <Link to={"/blood-group"} className="btn btn-primary btn-sm me-3 float-end">Back</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveBloodGroup}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="blood_group_name" className="col-form-label-sm">Blood Group Name</label>
                                                    <input type="text" placeholder="Blood Group name" onChange={this.handleInput} value={this.state.blood_group_name} className="form-control" name="blood_group_name" />
                                                    <span className="text-danger">{this.state.error_list.blood_group_name}</span>
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

export default AddBloodGroup;