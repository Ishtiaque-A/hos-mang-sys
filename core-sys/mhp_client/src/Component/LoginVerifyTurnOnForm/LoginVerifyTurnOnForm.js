import React from 'react';
import './LoginVerifyTurnOnForm.css';
import sms_email_otps from '../../Images/sms_email_otps.png';
import { Link } from 'react-router-dom';


const LoginVerifyWorkedForm = () => {
    return (
        <div className="login-bg-img">
            <h3 className="text-start pt-1 offset-3"> <Link exact to={"/loginVerifyForm2"} className="text-decoration-none "><i className="fas fa-arrow-left"></i></Link> <span className="mx-2">2-Step Verification</span></h3>
            <hr />
            <div className="card card-login-turn-on position-relative top-0 start-50 translate-middle-x">
                <div className="text-center">
                    <img src={sms_email_otps} className="img-fluid card-img-top " style={{ maxWidth: '70%', height: '260px' }} alt="sms_email_otps" border="0" />
                </div>
                <div className="card-body p-4">
                    <form className="row g-1">
                        <h4 className="card-title">It worked ! Turn on 2-Step Verification ?</h4>
                        <span className="card-title text-muted">Now that you've seen how it works, do you want to turn on 2-Step Verification for Macro Health Plus account <b className="text-info">mdmorshedhossain603@gmail.com</b> ?</span>
                        <div className="text-end pt-3">
                        <Link exact to={"/loginVerifyFormTurnOnSidebar"} className="text-decoration-none "><span className="font-weight-bold  mx-2 cursor">TURN ON</span></Link>
                        </div>

                        <div className="d-flex justify-content-between pt-3">
                        <Link exact to={"/sidebar/setting2"} className="text-decoration-none "> <p className="card-text "><i className="fas fa-angle-left"></i>Back</p></Link>
                            {/* <a href="#" className="text-decoration-none "> <p className="card-text ">Next<i className="fas fa-angle-right"></i></p></a> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginVerifyWorkedForm;