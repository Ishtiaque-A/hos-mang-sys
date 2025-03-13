import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import AddDashboard from "../AddDashboard/AddDashboard";

class AddEthnicity extends Component {

    // to catch the data from input fields
    state = {
        ethnicity_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveEthnicity = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-ethnicity', this.state);

        if (res.data.status === 200)
        {

            swal("Success",res.data.message,"success");
            // console.log(res.data.message);
            this.setState({
                ethnicity_name: '',
                error_list: [],
            });
        }else{
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
                                <h6>Add Ethnicity
                                    <Link to={"/ethnicity"} className="btn btn-primary btn-sm me-3 float-end">Back</Link>
                                </h6>

                            </div>
                                    <div className="card-body">
                                <form onSubmit={this.saveEthnicity}>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="ethnicity_name" className="col-form-label-sm">Ethnicity Name</label>
                                                <input type="text" placeholder="Ethnicity name" onChange={this.handleInput} value={this.state.ethnicity_name} className="form-control" name="ethnicity_name" />
                                                <span className="text-danger">{this.state.error_list.ethnicity_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                    className="fas fa-save"></i> Save
                                                </button>

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

export default AddEthnicity;