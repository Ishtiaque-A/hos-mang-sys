
import React from 'react';
import './LoginVerifyConfirmForm.css';
import sms_email_otps from '../../Images/sms_email_otps.png';
import { Link } from 'react-router-dom';


const LoginVerifyConfirmForm = () => {
    return (
        <div className="login-bg-img">
            <h3 className="text-start pt-1 offset-3"><Link exact to={"/loginVerifyForm"} className="text-decoration-none "><i className="fas fa-arrow-left"></i></Link> <span className="mx-2">2-Step Verification</span></h3>
            <hr />
            <div className="card card-login-confirm position-relative top-0 start-50 translate-middle-x">
                <div className="text-center">
                    <img src={sms_email_otps} className="img-fluid card-img-top " style={{ maxWidth: '70%', height: '260px' }} alt="sms_email_otps" border="0" />
                </div>
                <div className="card-body p-4">
                    <form className="row g-1">
                        <h4 className="card-title">Confirm that it works </h4>
                        <span className="card-title text-muted">Macro health plus sent a text message with a verificatiom code to 01774168650.</span>
                        <span className="mobile-text text-muted">Enter the code</span>
                        <div className="d-flex flex-row">
                            <input type="text" className="form-control" autofocus="" />
                            <input type="text" className="form-control" />
                            <input type="text" className="form-control" />
                            <input type="text" className="form-control" />
                            <input type="text" className="form-control" />
                            <input type="text" className="form-control" />
                        </div>
                        <div className="text-center d-flex justify-content-start pt-2">
                            <span className="d-block mobile-text">Didn't get it?</span>
                            <a href="#" className="text-decoration-none"> <span className="font-weight-bold text-success mx-2 cursor">Resend</span></a>
                        </div>

                        <div className="d-flex justify-content-between pt-4">
                            <Link exact to={"/sidebar/setting"} className="text-decoration-none "> <p className="card-text "><i className="fas fa-angle-left"></i>Back</p></Link>
                            <Link exact to={"/sidebar/setting3"} className="text-decoration-none "> <p className="card-text ">Next<i className="fas fa-angle-right"></i></p></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginVerifyConfirmForm;
