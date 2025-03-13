import React, { useState } from 'react';
import './OTPForm.css';

const OTPForm = () => {
    const [users, setUsers] = useState({
        contact: '',
        email: '',
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

        if (name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(value);
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
        setUsers({ contact: '', email: '' });
        alert(JSON.stringify(useState));
    }

    return (
        <div className="card-body-otp otp-bg-img">
            <div className="row ">
                <div className="col-7 container col-md-7  pt-5 ">
                    <form className="container-md pt-2 " onSubmit={handleSubmit}>
                        <div className="d-flex justify-content-center align-items-center container">
                            <div className="card card-otp py-5 px-5">
                                <h5 className="m-0 mb-4 text-center">OTP Verification</h5>
                                <span className="mobile-text">Enter the code we just send on your mobile phone <b className="text-danger">+880 1774168650</b></span>
                                <div className="d-flex flex-row mt-5">
                                    <input type="text" className="form-control" autofocus="" />
                                    <input type="text" className="form-control" />
                                    <input type="text" className="form-control" />
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="text-center pt-4">
                                    <input type="submit" style={{ backgroundColor: "#69B128" }} className="form-control rounded text-white" value="Verify OTP" required />
                                </div>
                                <div className="text-center pt-2">
                                    <span className="d-block mobile-text">Don't receive the OTP code?</span>
                                    <a href="#" className="text-decoration-none"> <span className="font-weight-bold text-success cursor">Resend OTP</span></a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OTPForm;