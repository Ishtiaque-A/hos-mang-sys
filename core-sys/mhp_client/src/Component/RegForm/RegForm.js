import React, { Component } from 'react';
import MHP2 from '../../Images/MHP2.png';
import Integra_Logo from '../../Images/Integra_Logo.png';
import './RegForm.css';
import axios from "axios";
import swal from 'sweetalert';
class RegForm extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        error_list: [],
        user_type:'Super_Admin'
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    saveReligion = async (e) => {
        e.preventDefault();
        const res = await axios.post('/signup', this.state);
        if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            this.setState({
                name: '',
                email: '',
                password: '',

            });

            this.setState({
                error_list: '',
            });

        } else {
            this.setState({
                error_list: res.data.error_msg,
            });
        }

    }
    render() {

    return (
        <div className="reg reg-bg-img-registration">
            
            <div className="row mx-3 mt-4">
                <div className="col-4 pt-5  border-end-reg">
                    <div className="col-md-11 col-sm-11 mb-4 pt-5 text-center">
                        <a href="#">
                            <img src={MHP2} className="img-fluid p-2 " style={{ width: '200px', height: '180px' }} alt="MHP2" border="0" />
                        </a>
                        <img src={Integra_Logo} className=" bg-light img-fluid p-2" style={{ width: '182px', height: '40px' }} alt="Integra Logo" border="0" />

                        <div className="col-md-11 col-sm-11"  >
                            <h2 className="text-center pt-5 text-login">Let's get you signup</h2>
                            <p className="text-center fs-6 pt-1">It should only take a couple of minutes to pair with our team</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-8  pt-5 ">

                    <form className="container-md pt-2 offset-1" onSubmit={this.saveReligion}>
                        <h2 className="fw-bolder  text-center pt-3 mb-5 text-login" >Admin Registration</h2>
                        <div className="row  mb-3">
                            <label for="username" className="col-sm-4 col-form-label fw-bolder text-muted">Name:</label>
                            <div className="col-sm-6">
                                <input type="text" onChange={this.handleInput} name="name" value={this.state.name} id="name" className="form-control" autoComplete="off" placeholder="Enter your name" />
                                <span className="text-danger"> {this.state.error_list.name == null ? '' : this.state.error_list.name} </span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <level for="email" className="col-sm-4 col-form-label fw-bolder text-muted  ">E-mail Address: </level>
                            <div className="col-sm-6 ">
                                <input type="email" onChange={this.handleInput} name="email" value={this.state.email} id="email" name="email" className="form-control" autoComplete="off" placeholder="E-mail address" />
                                <span className="text-danger"> {this.state.error_list.email == null ? '' : this.state.error_list.email} </span>
                             </div>
                        </div>
                        <div className="row mb-3">
                            <level for="password" className="col-sm-4 col-form-label fw-bolder text-muted ">Password: </level>
                            <div className="col-sm-6 ">
                                <input type="password" onChange={this.handleInput} name="password" value={this.state.password} name="password" id="password" className="form-control" placeholder="Password" />
                                <span className="text-danger"> {this.state.error_list.password == null ? '':this.state.error_list.password} </span>
                            </div>
                        </div>

                        <div className="mb-3 ">
                            <div className=" offset-sm-4 pt-1">
                                 <input type="submit" className="btn btn-sm m-2 rounded text-white" style={{ backgroundColor: "#69B128" }} value="Signup" required />
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
}

export default RegForm;

