import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import swal from 'sweetalert';
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

class AddReligions extends Component {

    state = {
        religion_name: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveReligion = async (e) => {
        e.preventDefault();

        const res = await axios.post('/add-religions', this.state);

        if (res.data.status === 200) {
            // console.log(res.data.message);
            // swal({
            //     title: "Success!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok!",
            // });

            // this.props.history.push('/');
            swal("Success", res.data.message, "success");


            this.setState({
                religion_name: '',
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
                        <AddDashboard></AddDashboard>
                    </div>
                    <div className="col-md-9 mt-2">
                        <div className="card">
                            <div className="card-header">
                                <h6>Add Religions
                                    <Link to={'/religions'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveReligion}>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="asset_color" className="col-form-label-sm">Religion Name</label>
                                                <input placeholder="Religion Name" type="text" onChange={this.handleInput} value={this.state.religion_name} className="form-control" name="religion_name" />
                                                <span className="text-danger"> {this.state.error_list.religion_name} </span>
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

export default AddReligions;