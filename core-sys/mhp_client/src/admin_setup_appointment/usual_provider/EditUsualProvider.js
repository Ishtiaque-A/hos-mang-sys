import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";
class EditUsualProvider extends Component {
    state = {
        usual_provider_name: '',
        address: '',
        mobile: '',
        phone: '',
        email: '',
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
        // const usual_provider_id = this.props.match.params.id;
        // console.log(usual_provider_id);
        const res = await axios.get(`/edit-usual-provider/${lastpart}`);

        if (res.data.status === 200) {
            this.setState({
                usual_provider_name: res.data.usual_provider.usual_provider_name,
                mobile: res.data.usual_provider.mobile,
                phone: res.data.usual_provider.phone,
                address: res.data.usual_provider.address,
                email: res.data.usual_provider.email,
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/usual-provider');
        }
    }

    // update data
    updateusual_provider = async (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        const res = await axios.put(`/update-usual-provider/${lastpart}`, this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res);
            this.setState({
                // usual_provider_name: '',
                error_list: [],

            });
            //  this.props.history.push('/usual_provider');
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/usual-provider);
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
                                    <h6>Edit Usual Provider
                                        <Link to={"/usual-provider"} className="btn btn-primary btn-sm float-end">Back</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateusual_provider}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="mb-2">
                                                    <label htmlFor="usual_provider_name" className="col-form-label-sm">Usual Provider Name</label>
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

export default EditUsualProvider;