import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from "../AddDashboard/AddDashboard";

class AddUsualAccount extends Component {

    // to catch the data from input fields

    state = {
        usual_account_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveTitle = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-usual-account', this.state);

        if (res.data.status === 200) {
            // console.log(res.data.message);
            swal("Success", res.data.message, "success");

            this.setState({
                usual_account_name: '',
                error_list: [],
            })

            // this.props.history.push('/usual-account');
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
                                    <h6>Usual Account
                                        <Link to={"/usual-account"} className="btn mb-1 btn-sm btn-primary float-end">Back</Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveTitle}>

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="asset_color" className="col-form-label-sm">Usual Account Name</label>

                                                <input type="text" onChange={this.handleInput} value={this.state.usual_account_name} className="form-control" name="usual_account_name" />
                                                <span className="text-danger">{this.state.error_list.usual_account_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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

export default AddUsualAccount;