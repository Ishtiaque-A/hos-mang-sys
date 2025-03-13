import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

// import swal from 'sweetalert';

class Edit_occupation extends Component {

    state = {
        occupation_name: '',
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

        const res = await axios.get(`/edit-occupation/${lastpart}`);
        if (res.data.status === 200) {
            this.setState({
                occupation_name: res.data.occupation.occupation_name,
            });
        } else if (res.data.status === 404) {

            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });

            // this.props.history.push('/occupation');
        }
    }

    // async componentDidMount() {
    //     if (this.props.match && this.props.match.params.postID) {
    //         const postID = this.props.match.params.postID
    //         // console.log(postID);
    //         const res = await axios.get(`/edit-occupation/${postID}`).then(res => {
    //             console.log(res);

    //             this.setState({
    //                 post: res.data
    //             });
    //         })
    //     }
    // }


    // Update Edit Data
    updateOccupation = async (e) => {
        e.preventDefault();

        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText = "Updating";

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // const occu_id = this.props.match.params.id;
        const res = await axios.put(`/update-occupation/${lastpart}`, this.state);
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            this.setState({
                // occupation_name: '',
                error_list: [],
            });

            // console.log(res.data.message);
            // swal({
            //     title: "Updated!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });
            // this.props.history.push('/occupation');
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
            // this.props.history.push('/occupation');
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
                                    <h6>Edit Occupation
                                        <Link to={'/occupation'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateOccupation}>
                                        <div className="form-group mb-3">
                                            <level className="col-form-label-sm">Occupation Name</level>
                                            <input type="text" name="occupation_name" onChange={this.handleInput} value={this.state.occupation_name} className="form-control" />
                                            <span className="text-danger">{this.state.error_list.occupation_name}</span>
                                        </div>

                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-sm btn-primary text-uppercase float-end mt-2"><i
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

export default Edit_occupation;