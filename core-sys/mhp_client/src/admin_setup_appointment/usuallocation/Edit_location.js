import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';

// import swal from 'sweetalert';

class Edit_location extends Component {

    state = {
        usual_location_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Data Show in edit form
    async componentDidMount() {
        // const loc_id = this.props.match.params.id;
        // console.log(loc_id);

        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        const res = await axios.get(`/edit-location/${lastpart}`);
        if (res.data.status === 200) {
            this.setState({
                usual_location_name: res.data.location.usual_location_name,
            });
        } else if (res.data.status === 404) {
            // swal({
            //     title: "Warning!",
            //     text: res.data.message,
            //     icon: "warning",
            //     button: "Ok",
            // });
            // this.props.history.push('/location');
        }
    }

    //Update Edit Data
    updateLocation = async (e) => {
        e.preventDefault();


        var url = window.location.href;
        var urlsplit = url.split("/");
        var lastpart = urlsplit[urlsplit.length - 1];
        if (lastpart === '') {
            lastpart = urlsplit[urlsplit.length - 2];
        }

        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText = "Updating";
        // const loc_id = this.props.match.params.id;
        const res = await axios.put(`/update-location/${lastpart}`,
            this.state
        );
        if (res.data.status === 200) {
            // console.log(res.data.message);
            swal("Success", res.data.message, "success");


            this.setState({
                // usual_location_name: '',
                error_list: [],
            });
            // swal({
            //     title: "Updated!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });
            // this.props.history.push('/location');
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
            // this.props.history.push('/location');
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
                                    <h6>Edit Location
                                        <Link to={'/location'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.updateLocation}>
                                        <div className="form-group mb-3">
                                            <level className="col-form-label-sm">Usual Location Name</level>
                                            <input type="text" name="usual_location_name" onChange={this.handleInput} value={this.state.usual_location_name} className="form-control" />
                                            <span className="text-danger">{this.state.error_list.usual_location_name}</span>
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

export default Edit_location;