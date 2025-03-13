import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';



class AddDiagnosisAction extends Component {

    // to catch the data from input fields
    state = {
        diagnosis_action_name: '',
        // delete_status: '',
        // created_by: '',
        // updated_by: '',
        error_list: [],
    }

    // handle the input fields

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // pass data to laravel controller

    saveDiagnosisAction = async (e) => {
        e.preventDefault();

        // alert('hello');
        const res = await axios.post('/add-diagnosis-action', this.state);

        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");

            // console.log(res.data.message);
            this.setState({
                // id: '',
                diagnosis_action_name: '',
                error_list: [],

                // delete_status: '',
                // created_by: '',
                // updated_by: '',
            })
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
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title">Add Diagnosis Action

                                        <Link to={"/diagnosis-action"} className="btn btn-primary btn-sm float-end">Back</Link>

                                    </h6>

                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveDiagnosisAction}>
                                        <div className="card-body">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="diagnosis_action_name" className="col-form-label-sm">Diagnosis Action Name</label>
                                                    <input type="text" className="form-control form-control-sm" onChange={this.handleInput} value={this.state.diagnosis_action_name} name="diagnosis_action_name" />
                                                    <span className="text-danger">{this.state.error_list.diagnosis_action_name}</span>
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

export default AddDiagnosisAction;
