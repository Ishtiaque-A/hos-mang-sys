import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import Footer from "../../Component/Footer/Footer";

class AddContactVia extends Component {

    // to catch the data from input fields

    state = {
        contact_via_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    // pass data to laravel controller

    saveContactvia = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-contact-via', this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            this.setState({
                contact_via_name: '',
                error_list: [],
            })

            // this.props.history.push('/contact-via');
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
                                    <h6>Contact Via
                                        <Link to={"/contact-via"} className="btn mb-1 btn-primary btn-sm float-end">Back</Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveContactvia}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="contact_via_name" className="col-form-label-sm">Contact Via Name</label>

                                                    <input type="text" onChange={this.handleInput} value={this.state.contact_via_name} className="form-control" name="contact_via_name" />
                                                    <span className="text-danger">{this.state.error_list.contact_via_name}</span>
                                                </div>
                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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

export default AddContactVia;