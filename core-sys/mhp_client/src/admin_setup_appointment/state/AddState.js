import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";

class AddState extends Component {

    // to catch the data from input fields
    // to catch the data from input fields

    state = {
        state_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveState = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-state', this.state);

        if (res.data.status === 200) {
            // console.log(res.data.message);
            swal("Success", res.data.message, "success");

            this.setState({
                state_name: '',
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
                                    <h6>State
                                        <Link to={"/state"} className="btn btn-primary mb-1 btn-sm float-end">Back</Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveState}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">State Name</label>

                                                    <input type="text" onChange={this.handleInput} value={this.state.state_name} className="form-control" name="state_name" />
                                                    <span className="text-danger">{this.state.error_list.state_name}</span>
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

export default AddState;