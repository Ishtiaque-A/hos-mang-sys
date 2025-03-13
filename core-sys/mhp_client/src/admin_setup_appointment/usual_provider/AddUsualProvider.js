import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";

class AddUsualProvider extends Component {

    // to catch the data from input fields

    // to catch the data from input fields

    state = {
        usual_provider_name: '',
        address: '',
        mobile: '',
        phone: '',
        email: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveTitle = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-usual-provider', this.state);

        if (res.data.status === 200) {
            // console.log(res.data.message);
            swal("Success", res.data.message, "success");

            this.setState({
                usual_provider_name: '',
                address: '',
                mobile: '',
                phone: '',
                email: '',
                error_list: [],
            })

            // this.props.history.push('/title');
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
                                    <h6>Usual Provider
                                        <Link to={"/usual-provider"} className="btn mb-1 btn-sm btn-primary float-end">Back</Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveTitle}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="mb-2">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Usual Provider Name</label>

                                                    <input type="text" onChange={this.handleInput} value={this.state.usual_provider_name} className="form-control" name="usual_provider_name" />
                                                    <span className="text-danger">{this.state.error_list.usual_provider_name}</span>
                                                </div>

                                                <div className="mb-2">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Mobile</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.mobile} className="form-control" name="mobile" />
                                                    <span className="text-danger">{this.state.error_list.mobile}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Phone</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.phone} className="form-control" name="phone" />
                                                    <span className="text-danger">{this.state.error_list.phone}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Address</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.address} className="form-control" name="address" />
                                                    <span className="text-danger">{this.state.error_list.address}</span>
                                                </div>
                                                <div className="mb-2">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Email</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.email} className="form-control" name="email" />
                                                    <span className="text-danger">{this.state.error_list.email}</span>
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

export default AddUsualProvider;