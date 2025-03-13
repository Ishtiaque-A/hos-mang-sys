import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Sidebar1 from "../../Component/Sidebar1/Sidebar1";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import Footer from "../../Component/Footer/Footer";

class AddReaction extends Component {

    // to catch the data from input fields

    state = {
        reaction_name: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveReaction = async (e) => {
        e.preventDefault();
        const res = await axios.post('/save-reaction', this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            this.setState({
                reaction_name: '',
                error_list: [],
            })

            // this.props.history.push('/reaction');
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

                                    <h6 className="card-title">Add Reaction
                                        <Link to={"/reaction"} className="btn btn-primary btn-sm float-end">Back</Link>
                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveReaction}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="reaction_name" className="col-form-label-sm">Reaction Name</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.reaction_name} className="form-control" name="reaction_name" />
                                                    <span className="text-danger">{this.state.error_list.reaction_name}</span>
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

export default AddReaction;