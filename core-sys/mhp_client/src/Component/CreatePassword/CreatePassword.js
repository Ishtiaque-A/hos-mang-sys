import React from 'react';
import { useState } from 'react';


const CreatePassword = () => {
    const [users, setUsers] = useState({
        password: '',
        password2: '',
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
        if (name === 'password') {
            isFieldValid = /^[a-zA-Z]+$/.test(value);

        }
        if (name === 'password2') {
            isFieldValid = /^[a-zA-Z]+$/.test(value);

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
        setUsers({ password: '', password2: '' });
        alert(JSON.stringify(useState));
    }


    return (
        <section>
            <div className="">
                <div className="row d-flex justify-content-center">
                    <div className="col-6 container col-md-6  pt-5 ">
                        {/* <form autoComplete="off" onSubmit={handleSubmit} className="row col-md-12 mb-5 pt-3"> */}
                        {/*  <div>
                            {
                                records.map((curElem) => {
                                    const { id, password } = curElem;
                                    return (
                                        <div key={id}>
                                            <p>{username}</p>
                                            <p>{contact}</p>
                                            <p>{address}</p>
                                            <p>{password}</p>
                                        </div>
                                    )
                                })
                            }
                        </div> */}
                        <form onSubmit={handleSubmit} className=" ">
                            <div className="row container mb-3"  >
                                <div className="col-md-11 col-sm-11"  >
                                    <h2 className="fw-bolder  text-center pt-5 text-login" >Create new password</h2>
                                    <p className="text-start pt-3" >Your new password must be different from previous used passwords.</p>
                                </div>
                            </div>
                            <div className="row container pt-1">
                                <level for="password" className="col-form-label fw-bolder text-muted ">Password: </level>
                                <div className="col-md-10 col-sm-10 ">
                                    <input type="password" onChange={handleInput} name="password" value={users.password} id="password" className="form-control" placeholder="Password" required />
                                </div>
                            </div>
                            <div className="row container pt-1 mb-3">
                                <level for="password2" className="col-form-label fw-bolder text-muted ">Confirm Password: </level>
                                <div className="col-md-10 col-sm-10 ">
                                    <input type="password2" onChange={handleInput} name="password2" value={users.password} id="password2" className="form-control" placeholder="Confirm password" required />
                                </div>
                            </div>
                            <div className=" row container mb-3"  >
                                <div className="col-md-10 col-sm-10 pt-3 "  >
                                    {/* <input type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bolder text-white text-nowrap" value="Send instructions link" required /> */}
                                    <button type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bold text-white text-nowrap" value="Reset password" required >Reset password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default CreatePassword;