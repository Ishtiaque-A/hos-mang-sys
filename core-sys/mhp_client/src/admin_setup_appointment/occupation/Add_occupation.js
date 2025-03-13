import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import AddDashboard from '../AddDashboard/AddDashboard';
import Sidebar1 from '../../Component/Sidebar1/Sidebar1';
import Footer from '../../Component/Footer/Footer';

// import swal from 'sweetalert';

class Add_occupation extends Component
{

    state = {
        occupation_name: '',
        error_list: [],
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveOccupation = async (e) => {
        e.preventDefault();

        const res = await axios.post(`/add-occupation`, this.state);
        if (res.data.status === 200) {
            // console.log(res.data.message);
            swal("Success",res.data.message,"success");


            // swal({
            //     title: "Successfull!",
            //     text: res.data.message,
            //     icon: "success",
            //     button: "Ok",
            // });

            this.setState({
                occupation_name: '',
                error_list: [],
            });
        }else{
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
                                <h6>Add Occupation
                                    <Link to={'/occupation'} className="btn btn-primary btn-sm float-end">BACK</Link>
                                </h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveOccupation}>
                                    <div className="form-group mb-3">
                                        <level className="col-form-label-sm" >Occupation Name</level>
                                        <input placeholder="Occupation Name" type="text" name="occupation_name" onChange={this.handleInput} value={this.state.occupation_name} className="form-control" />
                                        <span className="text-danger">{this.state.error_list.occupation_name}</span>
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

export default Add_occupation;