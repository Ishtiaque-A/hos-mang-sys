import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [users, setUsers] = useState({
        email: ''
    });

    const handleBlur = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name,value);
        event.persist();
        setUsers((users) => ({ ...users, [name]: value }));
        // ////// or,
        // const {name, value} = event.target;
        // console.log(name, value);
        // setUsers({ ...users, [name]: value})

        let isFieldValid = true;

        if (name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(value);
            console.log(isFieldValid);
        }

        if (isFieldValid) {
            const newUserInfo = { ...users };
            newUserInfo[name] = value;
            setUsers(newUserInfo);
        }
    }

    // const [newUsers, setNewUsers] = useState({})
    const handleSubmit = (event) => {
        // const updateUsers = {username: username , email: email, contact: contact , message:message };
        // setNewUsers([...newUsers, updateUsers  ])

        console.log(users.username, users.email, users.password, users.message);

        if (users.email) {

            console.log('Submitting')

        }

        setUsers({ email: '' });
        alert(JSON.stringify(setUsers));
        // alert(`Submitting Name ${users}`)
        event.preventDefault();
    }

    return (
        <section className="">
            <div className="row d-flex justify-content-center">
                <div className="col-5 col-md-5  pt-5">
                    <form onSubmit={handleSubmit} className="row  ms-3">
                        <div className="form-group col-md-10 col-sm-10"  >
                            <Link exact to={'/forgotPassword'} style={{ textDecoration: 'none' }}><h2 class="fw-bolder text-center pt-5 text-login " >Forgot Password</h2></Link>
                            <p class="text-start pt-3" >Fill the form we'll send an email with  instructions to reset your password.</p>
                        </div>
                        <div className="form-group col-md-10 col-sm-10 mb-2 pt-3">
                            <label for="email" class="form-label">Email:</label>
                            <div className="input-group pt-0">
                                {/* <span className="input-group-text"><i className="far fa-envelope"></i></span> */}
                                <input type="email" onBlur={handleBlur} name="email" className="form-control" placeholder="E-mail address" aria-label="email" required />
                            </div>
                        </div>
                        <div className="col-md-10 col-sm-10 pt-3 "  >
                            {/* <button type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bolder text-white" value="Send instructions link" aria-label="login" required /> */}
                            <Link exact to={"/createPassword"} style={{ textDecoration: 'none' }}> <button type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bolder text-white text-nowrap " value="Send instructions link" aria-label="login" required >Send instructions link</button></Link>
                        </div>
                        {/* <button type="button" class="btn btn-success">Success</button> */}
                        <div class="col-md-10 col-sm-10 pt-4">
                            <span class="text-center mb-0">Return to ? <Link to={"/login"} className=" text-decoration-none" ><span class="text-register mb-0">Login</span></Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;