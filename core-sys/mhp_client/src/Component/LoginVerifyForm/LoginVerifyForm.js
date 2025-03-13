
import React, { useState } from 'react';
import './LoginVerifyForm.css';
import sms_email_otps from '../../Images/sms_email_otps.png';
import { Link } from 'react-router-dom';


const LoginVerifyForm = () => {
    const [users, setUsers] = useState({
        contact: '',
    });

    const [records, setRecords] = useState([]);
    // // const [messageError, setMessageError] = useState({});
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        event.persist();
        setUsers({ ...users, [name]: value });

        let isFieldValid = true;
        if (name === 'contact') {
            isFieldValid = /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/.test(value);
        }
        if (isFieldValid) {
            const newUserInfo = { ...users };
            newUserInfo[name] = value;
            setUsers(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newRecord = { ...users, id: new Date(new Date().getTime).toString() }
        console.log(records);
        setRecords([...records, newRecord]);
        console.log(records);
        setUsers({ contact: '' });
        alert(JSON.stringify(useState));
    }
    return (
        <div className="login-bg-img">
            <h3 className="text-start pt-1 offset-3"><Link exact to={"/login"} className="text-decoration-none "><i className="fas fa-arrow-left"></i></Link> <span className="mx-2">2-Step Verification</span></h3>
            <hr />
            <div className="card card-login position-relative top-0 start-50 translate-middle-x" onSubmit={handleSubmit}>
                <div className="text-center">
                    <img src={sms_email_otps} className="img-fluid card-img-top " style={{ maxWidth: '70%', height: '250px' }} alt="sms_email_otps" border="0" />
                </div>
                <div className="card-body p-4 ">
                    <form className="row g-1">
                        <h4 className="card-title">Let's set up your phone </h4>
                        <h6 className="card-title text-muted">What phone number do you want to use?</h6>
                        <div className="col-md-4">
                            <select className="form-select" id="validationDefault04" required>
                                <option selected disabled value="country">choose country</option>
                                <option>Bangladesh</option>
                                <option>India</option>
                                <option>USA</option>
                                <option>Iran</option>
                                <option>Austrolia</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <input type="text" onChange={handleInput} name="contact" value={users.contact} id="contact" className="form-control " autoComplete="off" placeholder="Contact number" required />
                        </div>

                        <p className="card-text text-muted pt-4">Macro health plus will only use this number for account security.</p>
                        <p className="card-text text-muted ">Don't use a voice number.</p>
                        <p className="card-text text-muted ">message and data rates may apply.</p>
                        <h6 className="card-title text-muted pt-0">What phone number do you want to use?</h6>

                        <div className="col-md-6 ">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label className="form-check-label text-muted" for="inlineRadio1">Text message</label>
                            </div>
                            <div className="form-check form-check-inline mx-3">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label className="form-check-label text-muted" for="inlineRadio2">Phone call</label>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between pt-2">
                            <Link exact to={"/sidebar"} className="text-decoration-none "> <p className="card-text "><i className="fas fa-angle-left"></i>Back</p></Link>
                            <Link exact to={"/sidebar/setting2"} className="text-decoration-none "> <p className="card-text ">Next<i className="fas fa-angle-right"></i></p></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginVerifyForm;
