import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';


class Edit_generic extends Component {
    state = {
        name: '',
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

        const res = await axios.get(`/edit-generic-name/${lastpart}`);
        console.log("edit",res.data)
        if (res.data.status === 200) {
            this.setState({
                name: res.data.drugs.name,
            });
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
        const res = await axios.put(`/update-generic-name/${lastpart}`, this.state);

        if (res.data.status === 200) {
            // console.log(res);
            swal("Success", res.data.message, "success");

            this.setState({
                // name: '',
                error_list: [],
            });

        }
         else {
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
                                <div className="card-header">
                                    <h6 className="card-title">Edit Generic
                                        <Link to={'/generic-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateEthnicity}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="name" className="col-form-label-sm"> Generic Name </label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.name} className="form-control" name="name" />
                                                    <span className="text-danger">{this.state.error_list.name}</span>
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

export default Edit_generic;


// import React from 'react'

// export default function Edit_generic() {
//   return (
//     <div>edit_generic</div>
//   )
// }
