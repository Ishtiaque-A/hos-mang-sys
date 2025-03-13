import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";

class EditEthnicity extends Component {
    state = {
        ethnicity_name: '',
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
        const res = await axios.get(`/edit-ethnicity/${lastpart}`);
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                ethnicity_name: res.data.ethnicity.ethnicity_name,
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
        const res = await axios.put(`/update-ethnicity/${lastpart}`, this.state);

        if (res.data.status === 200) {
            // console.log(res);
            swal("Success", res.data.message, "success");

            // this.setState({
            //     ethnicity_name: '',
            // });

        }
        else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/Ethnicity');
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
                                    <h6>Edit Ethnicity
                                        <Link to={'/ethnicity'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateEthnicity}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="ethnicity_name" className="col-form-label-sm"> Ethnicity Name </label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.ethnicity_name} className="form-control" name="ethnicity_name" />
                                                    <span className="text-danger">{this.state.error_list.ethnicity_name}</span>
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

export default EditEthnicity;