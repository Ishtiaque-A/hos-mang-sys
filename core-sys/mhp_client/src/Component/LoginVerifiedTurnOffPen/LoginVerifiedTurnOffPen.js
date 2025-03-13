import React from 'react';
import { useState } from 'react';
import './LoginVerifiedTurnOffPen.css';
import sms_email_otps from '../../Images/sms_email_otps.png';

const LoginVerifiedTurnOffPen = () => {
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
        <div className="text-center">
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Modal 1 need image</h5>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <span className="btn-close" data-bs-dismiss="modal" aria-label="Close"></span>
                        </div>
                        <div className="modal-body ">
                        <div className="text-center">
                                <img src={sms_email_otps} className="img-fluid card-img-top " style={{ maxWidth: '70%', height: '170px' }} alt="sms_email_otps" border="0" />
                            </div>
                            <div className="pt-3 p-3">
                                <h5 className="text-start text-muted" id="exampleModalLabel">Registered Phone</h5>
                                <p className="text-muted text-start">
                                    <span>01774168650</span>
                                    <span className="text-start">
                                        <a href="#" className="text-decoration-none mx-3 text-login">
                                            <b >Verified</b>
                                        </a>
                                    </span>
                                </p>
                                <p className="text-muted text-start text-remove">Verification codes are sent by text message.</p>
                                {/* <div className="text-start pt-3">
                                    <button type="button" className="btn btn-danger button-size" >Remove Phone</button>                                   
                                </div> */}
                                <div className="text-start pt-3">
                                <a href="#" className="text-decoration-none "> <p className="btn btn-white border border-2 shadow ">Remove Phone</p></a>
                                </div>
                            </div>
                        </div>
                        {/* <div className="d-flex justify-content-end  pt-2 mb-4">
                            <button className="btn btn-primary button-size" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change Phone</button>
                            <button type="button" className="btn btn-dark mx-3 button-size" data-bs-dismiss="modal">Done</button>
                        </div> */}
                        <div className="d-flex justify-content-end  mb-5">
                            <a href="#" className="text-decoration-none  mx-3 "> <p className="card-text " data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change Phone</p></a>
                            <a href="#" className="text-decoration-none  mx-3 "> <p className="card-text " data-bs-dismiss="modal">Done</p></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            <span className="btn-close" data-bs-dismiss="modal" aria-label="Close"></span>
                        </div>
                        <div className="modal-body">
                            {/* <div className="card card-login position-relative top-0 start-50 translate-middle-x" onSubmit={handleSubmit}> */}
                            <div className="text-center">
                                <img src={sms_email_otps} className="img-fluid card-img-top " style={{ maxWidth: '70%', height: '170px' }} alt="sms_email_otps" border="0" />
                            </div>
                            <form className="row g-1 p-3">
                                <h4 className="modal-title pt-2 text-start">Let's set up your phone </h4>
                                <h6 className="card-title text-muted text-start">What phone number do you want to use?</h6>
                                <div className="col-md-5">
                                    <select className="form-select" id="validationDefault04" required>
                                        <option selected disabled value="country">choose country</option>
                                        <option>Bangladesh</option>
                                        <option>India</option>
                                        <option>USA</option>
                                        <option>Iran</option>
                                        <option>Australia</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" onChange={handleInput} name="contact" value={users.contact} id="contact" className="form-control " autoComplete="off" placeholder="Contact number" required />
                                </div>

                                <p className="text-start text-muted pt-1">Macro health plus will only use this number for account security.</p>
                                <p className="text-start text-muted modal-text">Don't use a voice number.</p>
                                <p className="text-start text-muted modal-text">message and data rates may apply.</p>
                                <h6 className="text-start text-muted modal-text">What phone number do you want to use?</h6>

                                <div className="col-md-6 ">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                        <label className="form-check-label text-muted" for="inlineCheckbox1">Text message</label>
                                    </div>
                                    {/* <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio" value="option" />
                                        <label className="form-check-label text-muted" for="inlineRadio1">Text message</label>
                                    </div>
                                    <div className="form-check form-check-inline mx-3">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                <label className="form-check-label text-muted" for="inlineRadio2">Phone call</label>
                                    </div> */}
                                </div>
                                <div className="d-flex justify-content-end pt-2 ">
                                    <a href="#" className="text-decoration-none  mx-3 "> <p className="card-text " data-bs-dismiss="modal">Chancel</p></a>
                                    <a href="#" className="text-decoration-none  mx-3 "> <p className="card-text " >Next</p></a>
                                </div>
                            </form>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            {/* <a className="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a> */}
            <a data-bs-toggle="modal" href="#exampleModalToggle" role="button"><i className="fas fa-pen-fancy"></i></a>
        </div>
    );
};

export default LoginVerifiedTurnOffPen;

