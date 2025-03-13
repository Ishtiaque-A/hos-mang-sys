import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';


class AddPastAlcohol extends Component {

    state = {
        alcohol_consumption_name: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveAlcConsumption = async (e) => {
        e.preventDefault();

        const res = await axios.post('/save-alcohol-consumption', this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            this.setState({
                alcohol_consumption_name: '',
                error_list: [],
            });
        } else {
            this.setState({
                error_list: res.data.error_msg,
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
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header">
                                    <h6 className="card-title">Alcohol Consumption
                                        <Link to={'/palcconsumption'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveAlcConsumption}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Alcohol Consumption Name</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.alcohol_consumption_name} className="form-control" name="alcohol_consumption_name" />
                                                    <span className="text-danger"> {this.state.error_list.alcohol_consumption_name} </span>
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

export default AddPastAlcohol;