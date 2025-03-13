import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import DoctorsSetupSidebar from '../../admin_setup_doctors/doctors_setup_sidebar/DoctorsSetupSidebar';

import swal from 'sweetalert';

class AddTobaccoCost extends Component {

    state = {
        tobacco_cost_amounts_name: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveTobaccoTypes = async (e) => {
        e.preventDefault();

        const res = await axios.post('/save-tobacco-cost', this.state);

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
                tobacco_cost_amounts_name: '',
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
                            <DoctorsSetupSidebar></DoctorsSetupSidebar>
                        </div>
                        <div className="col-md-9 mt-3">
                            <div className='card'>
                                <div className="card-header">
                                    <h6 className="card-title">Tobacco Cost
                                        <Link to={'/tobacco-cost'} className="btn btn-primary btn-sm float-end"> Back </Link>
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.saveTobaccoTypes}>
                                        <div className="card-body">

                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="asset_color" className="col-form-label-sm">Tobacco Cost Name</label>
                                                    <input type="text" onChange={this.handleInput} value={this.state.tobacco_cost_amounts_name} className="form-control form-control-sm" name="tobacco_cost_amounts_name" />
                                                    <span className="text-danger"> {this.state.error_list.tobacco_cost_amounts_name} </span>
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

export default AddTobaccoCost;