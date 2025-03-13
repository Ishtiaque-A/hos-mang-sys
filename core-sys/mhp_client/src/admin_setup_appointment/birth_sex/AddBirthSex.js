import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import Footer from "../../Component/Footer/Footer";

class AddBirthSex extends Component {

    // to catch the data from input fields

    state = {
        birth_sex_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveBirthSex = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-birth-sex', this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            this.setState({
                birth_sex_name: '',
                error_list: [],
            })

            // this.props.history.push('/birth-sex');
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
                                        <Link to={"/birth-sex"} className="btn mb-1 btn-sm btn-primary float-end">Back</Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveBirthSex}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="birth_sex_name" className="col-form-label-sm">Gender Name</label>

                                                    <input type="text" onChange={this.handleInput} value={this.state.birth_sex_name} className="form-control" name="birth_sex_name" />
                                                    <span className="text-danger">{this.state.error_list.birth_sex_name}</span>
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

export default AddBirthSex;