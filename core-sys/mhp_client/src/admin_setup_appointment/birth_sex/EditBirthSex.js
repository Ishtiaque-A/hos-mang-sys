import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import Footer from "../../Component/Footer/Footer";

class EditBirthSex extends Component {
    state = {
        birth_sex_name: '',
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

        // const birth_sex_id = this.props.match.params.id;
        // console.log(birth_sex_id);
        const res = await axios.get(`/edit-birth-sex/${lastpart}`);

        if (res.data.status === 200) {
            this.setState({
                birth_sex_name: res.data.birth_sex.birth_sex_name,
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/birth-sex');
        }
    }

    // update data
    updateBirthSex = async (e) => {
        e.preventDefault();
        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
        // const birth_sex_id = this.props.match.params.id;
        const res = await axios.put(`/update-birth-sex/${lastpart}`, this.state);

        if (res.data.status === 200) {
            // console.log(res);
            swal("Success", res.data.message, "success");

            this.setState({
                // birth_sex_name: '',
                error_list: [],
            });
            //  this.props.history.push('/birth-sex');
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/birth-sex);
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
                                    <h6>Gender
                                        <Link to={"/birth-sex"} className="btn btn-sm btn-primary float-end">Back</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateBirthSex}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="birth_sex_name" className="col-form-label-sm">Gender Name</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.birth_sex_name} className="form-control" name="birth_sex_name" />
                                                    <span className="text-danger">{this.state.error_list.birth_sex_name}</span>
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

export default EditBirthSex;