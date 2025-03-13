import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

// import swal from 'sweetalert';

class Edit_visit extends Component {

    state = {
        visit_type_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Data Show in edit form
    async componentDidMount() {
        // const visit_id = this.props.match.params.id;
        // console.log(visit_id);
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        const res = await axios.get(`/edit-visitor/${lastpart}`);
        if (res.data.status === 200) {
            this.setState({
                visit_type_name: res.data.visitors.visit_type_name,
            });
        } else if (res.data.status === 404) {

            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/all-visit');
        }
    }

    //Update Edit Data
    updateVisitors = async (e) => {
        e.preventDefault();
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText = "Updating";
        // const visit_id = this.props.match.params.id;
        const res = await axios.put(`/update-visitors/${lastpart}`, this.state);
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            this.setState({
                visit_type_name: '',
                error_list: [],

            });
            // swal({
            //     title: "Updated!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });
            // this.props.history.push('/all-visit');
            // document.getElementById('updatebtn').disabled = false;
            // document.getElementById('updatebtn').innerText = "Update Info";
        }
        else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/all-visit');
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
                                    <h6>Edit Visit
                                        <Link to={'/all-visit'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateVisitors}>
                                        <div className="form-group">
                                            <label htmlFor="visit_type_name" className="col-form-label-sm">Visit Type Name</label>
                                            <input type="text" onChange={this.handleInput} value={this.state.visit_type_name} className="form-control form-control-sm" name="visit_type_name" />
                                            <span className="text-danger">{this.state.error_list.visit_type_name}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
                                                className="fas fa-save"></i> Update
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

export default Edit_visit;