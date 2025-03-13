import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

// import swal from 'sweetalert';

class Edit_test extends Component {

    state = {
        test_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Data Show in edit form
    async componentDidMount() {

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }
       
        const res = await axios.get(`/edit-test/${lastpart}`);
        if (res.data.status === 200) {
            this.setState({
                test_name: res.data.testor.test_name,
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/all-test');
        }
    }

    //Update Edit Data
    updateTest = async (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText = "Updating";
        // const test_id = this.props.match.params.id;
        const res = await axios.put(`/update-test/${lastpart}`, this.state);
        if (res.data.status === 200) {
            console.log(res.data.message);
            swal("Success", res.data.message, "success");

            this.setState({
                // test_name: '',
                error_list: [],

            });

            // swal({
            //     title: "Updated!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });
            // this.props.history.push('/all-test');
            // document.getElementById('updatebtn').disabled = false;
            // document.getElementById('updatebtn').innerText = "Update Info";
        }
        else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
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
                                    <h6>Edit Test
                                        <Link to={'/all-test'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateTest}>
                                        <div className="form-group mb-3">
                                            <level className="col-form-label-sm">Test Name</level>
                                            <input type="text" name="test_name" onChange={this.handleInput} value={this.state.test_name} className="form-control" />
                                            <span className="text-danger">{this.state.error_list.test_name}</span>
                                        </div>

                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
                                                className="fas fa-save"></i> Update
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

export default Edit_test;