import React from 'react';
import { useEffect } from 'react';
import { Popover, Tooltip } from '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './LoginVerifyTurnOffForm.css';


const LoginVerifyTurnOffForm = () => {
    useEffect(() => {
        Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
            .forEach(popoverNode => new Popover(popoverNode))
    });
    useEffect(() => {
        //init tooltip
        Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
            .forEach(tooltipNode => new Tooltip(tooltipNode))
    });

    return (
        <div className="">
            <h3 className="text-start pt-1 offset-3"><i className="fas fa-arrow-left"></i> <span className="mx-2">2-Step Verification</span></h3>
            <hr />
            <div className=" card-login-turn-off position-relative top-0 start-50 translate-middle-x p-3">
                <div className=" border bg-white mb-3 p-3">
                    <div className="d-flex justify-content-between ">
                        <p className="text-start">2-Step Verification is ON since 24 Oct 2021</p>
                        <button type="button" className="btn btn-primary">TURN ON</button>
                    </div>
                </div>
                <div className="p-2">
                    <h5 className="text-muted">Available second steps</h5>
                    <span className="text-muted">A second step after entering your password verifies that it's you signing in.</span>
                    <a href="#" className="text-decoration-none"> <span className="font-weight-boldcursor">Learn more</span></a>
                    <p className="text-muted">Note: If you sign in to your Macro Health Plus on any eligible phone, Macro Health Plus prompt will be added as another method for 2-Step Verification.</p>
                </div>
                <hr className="p-1" />

                <div className="border bg-white p-4">

                    <h5 className="text-muted">
                        <i className="fas fa-comment-dots"></i>
                        <span className="mx-4">Text message (Default)</span>
                        <button type="button" className="btn btn-white me-2" data-bs-toggle="tooltip" data-bs-placement="right" title="This is your default second step for signing in. You can always use any other second step that you've set up.">
                            <i className="far fa-question-circle"></i>
                        </button>
                    </h5>
                    <div className="d-flex justify-content-between offset-sm-1 pt-1 ">
                        <p>
                            <span className="text-muted ">01774168650</span>
                            <span className=" text-success"><b> Verified</b></span>
                        </p>
                        <a href="#" className="text-muted ">
                            <i className="fas fa-pen-fancy"></i>
                        </a>
                    </div>
                    <p className="text-muted mx-5 text-off">Verification codes are sent by text message.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginVerifyTurnOffForm;