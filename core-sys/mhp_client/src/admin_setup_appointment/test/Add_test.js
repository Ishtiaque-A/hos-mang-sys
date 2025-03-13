import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

// import swal from 'sweetalert';

class Add_test extends Component {

    state = {
        test_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveTest = async (e) => {
        e.preventDefault();

        const res = await axios.post(`/add-test`, this.state);
        if (res.data.status === 200) {
            // console.log(res.data.message);
            // swal({
            //     title: "Successfull!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });     
            swal("Success", res.data.message, "success");

            this.setState({
                test_name: '',
                error_list: [],
            });
            // this.props.history.push('/all-test');
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
                        <div className="col-md-9 mt-2">
                            <div className="card">
                                <div className="card-header">
                                    <h6>Add Test</h6>
                                    <Link to={'/all-test'} className="btn mb-1 btn-primary btn-sm float-end">BACK</Link>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveTest}>
                                        <div className="form-group mb-3">
                                            <level className="col-form-label-sm">Test Name</level>
                                            
                                            <input type="text" name="test_name" onChange={this.handleInput} value={this.state.test_name} className="form-control" />
                                            <span className="text-danger">{this.state.error_list.test_name}</span>
                                        </div>

                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
                                                className="fas fa-save"></i> Save
                                            </button>
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

export default Add_test;