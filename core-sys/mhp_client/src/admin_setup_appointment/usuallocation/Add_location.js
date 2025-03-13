import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';

// import swal from 'sweetalert';

class Add_location extends Component {

    state = {
        usual_location_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveLocation = async (e) => {
        e.preventDefault();

        const res = await axios.post(`/add-location`, this.state);
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            // swal({
            //     title: "Successfull!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });         
            this.setState({
                usual_location_name: '',
                error_list: [],
            });
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
                                    <h6>Add Location
                                        <Link to={'/location'} className="btn mb-1 btn-primary btn-sm float-end">BACK</Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveLocation}>
                                        <div className="form-group mb-3">
                                            <level className="col-form-label-sm">Usual Location Name</level>
                                            <input type="text" name="usual_location_name" onChange={this.handleInput} value={this.state.usual_location_name} className="form-control" />
                                            <span className="text-danger">{this.state.error_list.usual_location_name}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-primary btn-sm text-uppercase float-end mt-2"><i
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

export default Add_location;