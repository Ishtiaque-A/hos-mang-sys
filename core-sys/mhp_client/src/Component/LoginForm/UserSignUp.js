
import React, { Component } from 'react';
import './LoginForm.css';
import MHP2 from '../../Images/MHP2.png';
import Integra_Logo from '../../Images/Integra_Logo.png';
import CarouselBar from './CarouselBar';
import axios from 'axios';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

class UserSignUp extends Component {

    state = {
        preferred_name: '',
        mobile_number: '',
        email_address: '',
        occupation: '',
        error_list: [],
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveReligion = async (e) => {
        e.preventDefault();

        const res = await axios.post('/user-selfsignup', this.state);
        // console.log(res);
        if (res.data.status === 200) {

            swal("Success", res.data.message, "success");

            this.setState({
                preferred_name: '',
                mobile_number: '',
                email_address: '',
                occupation: '',
            });
        } else {
            this.setState({
                error_list: res.data.error_msg,
            });
        }

    }

    render() {

        return (
            <div className="reg reg-bg-img">
                <div className="row mx-3">
                    <div className="col-4 pt-5  border-end-reg">
                        <div className="col-md-11 col-sm-11 mb-4 pt-5 text-center">
                            <a href="#">
                                <img src={MHP2} className="img-fluid p-2 " style={{ width: '200px', height: '180px' }} alt="MHP2" border="0" />
                            </a>
                            {/* <img src={Integra_Logo} className=" bg-light img-fluid p-2" style={{ width: '182px', height: '40px' }} alt="Integra Logo" border="0" /> */}
                            <div className="container col-md-11 col-sm-11"  >
                                <h2 className="text-center pt-5 text-login">Let's get you signup</h2>
                                <p className="text-center fs-6 pt-1">It should only take a couple of minutes to pair with our team</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-8 container col-md-8  pt-5 ">

                        <form className="container-md pt-2 offset-1" onSubmit={this.saveReligion}>
                            <h2 className="fw-bolder  text-center pt-3 mb-5 text-login"> Registration
                            </h2>
                            <div className="row container mb-3">
                                <label for="username" className="col-sm-4 col-form-label fw-bolder text-muted">Name:</label>
                                <div className="col-sm-6">
                                    <input type="text" name="preferred_name" onChange={this.handleInput} value={this.state.preferred_name} className="form-control" autoComplete="off" placeholder="Enter your name" required />
                                    <span className="text-danger"> {this.state.error_list.preferred_name} </span>
                                </div>
                            </div>

                            <div className="row container mb-3">
                                <level for="contact" className="col-sm-4 col-form-label fw-bolder text-muted"> Contact Number: </level>
                                <div className="col-sm-6 ">
                                    <input type="text" name="mobile_number" onChange={this.handleInput} value={this.state.mobile_number} className="form-control" autoComplete="off" placeholder="Contact number" required />
                                    <span className="text-danger"> {this.state.error_list.mobile_number} </span>

                                </div>
                            </div>
                            <div className="row container mb-3">
                                <level for="email" className="col-sm-4 col-form-label fw-bolder text-muted"> E-mail Address: </level>
                                <div className="col-sm-6 ">
                                    <input type="email" name="email_address" onChange={this.handleInput} value={this.state.email_address} className="form-control" autoComplete="off" placeholder="E-mail address" />
                                    <span className="text-danger"> {this.state.error_list.email_address} </span>
                                </div>
                            </div>
                            <div className="row container mb-3">
                                <level for="password2" className="col-sm-4 col-form-label fw-bolder text-muted"> Occupation: </level>
                                <div className="col-sm-6 ">
                                    <select name="occupation" type="text" onChange={this.handleInput} value={this.state.occupation} className="form-select">
                                        <option selected> Select </option>
                                        <option> Doctors </option>
                                        <option> Patients </option>
                                    </select>
                                    <span className="text-danger"> {this.state.error_list.occupation} </span>
                                </div>
                            </div>
                            <div className=" mb-3 ">
                                <div className=" offset-sm-4 pt-1">
                                    <input type="submit" className="btn btn-sm m-2 rounded text-white" style={{ backgroundColor: "#69B128" }} value="Signup" />
                                    <Link to={'/'} className="btn btn-sm m-2 btn-warning"> Cancel </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}


export default UserSignUp;