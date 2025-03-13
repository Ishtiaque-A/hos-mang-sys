import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

class EditReligions extends Component {

    state = {
        religion_name: '',
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
        const res = await axios.get(`/edit-religion/${lastpart}`);
        // console.log(res);
        if (res.data.status === 200) {
            this.setState({
                religion_name: res.data.religion.religion_name,
            });
        } else if (res.data.status === 404) {

            // this.props.history.push('/');
        }

    }

    updateReligion = async (e) => {
        e.preventDefault();

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // document.getElementById('update_btn').innerText = "Updating";
        // const rel_id = this.props.match.params.id;
        const res = await axios.put(`/update-religion/${lastpart}`, this.state);

        if (res.data.status === 200) {
            // console.log(res.data.message);
            // swal({
            //     title: "Updated!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok!",
            // });
            swal("Success", res.data.message, "success");

            // document.getElementById('update_btn').innerText = "Update Religion";

            this.setState({
                // religion_name: '',
                error_list: [],
            });

            // this.props.history.push('/');
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok!",
            // });
            // this.props.history.push('/');
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
                                <h6>Edit Religions
                                    <Link to={'/religions'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateReligion}>
                                    <div className="card-body">

                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <label htmlFor="religion_name" className="col-form-label-sm">Religion Name</label>
                                                <input type="text" onChange={this.handleInput} value={this.state.religion_name} className="form-control" name="religion_name" />
                                                <span className="text-danger">{this.state.error_list.religion_name}</span>
                                            </div>
                                            <div className="float-right">
                                                <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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

export default EditReligions;