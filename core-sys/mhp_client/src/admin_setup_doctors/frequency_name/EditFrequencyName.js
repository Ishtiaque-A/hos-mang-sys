
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import Footer from "../../Component/Footer/Footer";

class EditFrequencyName extends Component {
    state = {
        id: '',
        frequency_name: '',
        error_list: [],
    }

    handleInput = (e, id) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    async componentDidMount() {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        // const reaction_id = this.props.match.params.id;
        // console.log(reaction_id);
        const res = await axios.get(`/edit-frequency-name/${lastpart}`);

        console.log(res);
        if (res.data.status === 200) {
            this.setState({
                frequency_name: res.data.frequencyName.frequency_name,
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/frequency-name');
        }
    }

    //Update Edit Data
    updateFrequencyName = async (e, id) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        const res = await axios.put(`/update-frequency-name/${lastpart}`, this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res);
            this.setState({
                // frequency_name: '',
                error_list: [],
            });
            //  this.props.history.push('/frequencyName');
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/FrequencyName');
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
                        <div className="col-md-9 mt-3">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title">Frequency Name
                                        <Link to={'/frequency-name'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateFrequencyName}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="frequency_name" className="col-form-label-sm">Frequency Name</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.frequency_name} className="form-control form-control-sm" name="frequency_name" />
                                                    <span className="text-danger">{this.state.error_list.frequency_name}</span>
                                                </div>
                                                <div className="float-right">
                                                    <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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

export default EditFrequencyName;