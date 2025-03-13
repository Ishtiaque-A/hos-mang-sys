import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './LoginForm.css'
import Swal from 'sweetalert2'


const CreatePassword = () => {
    const [oldPassword, setoldPassword] = useState()
    const [newPassword, setnewPassword] = useState()
    const [confirmNewPassword, setconfirmNewPassword] = useState()

    const [passwordType, setpasswordType] = useState(
        {
            old: "password",
            new: "password",
            confirm: "password"
        }
    )


    const [getId, setgetId] = useState()

    useEffect(() => {
        const storageData = localStorage.getItem('userData')
        const storageUser = JSON.parse(storageData)
        setgetId(storageUser)
    }, [])

    const [isLoading, setisLoading] = useState(false)

    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        setisLoading(true)
        if (newPassword == confirmNewPassword) {
            axios
                .post(`/update-password`,
                    {
                        current_password: oldPassword,
                        new_password: confirmNewPassword,
                        new_password_confirmation: confirmNewPassword
                    }
                ).then((res) => {

                    if (res.data.code == 200) {
                        swal("Success", res.data.message, "success");
                        navigate('/main');
                        setisLoading(false)
                    }
                    if (res.data.code == 422) {
                        swal("Error", res.data.message, "error");
                        setisLoading(false)
                    }
                })
                .catch(error => {
                    // Extracting the error messages
                    let errorMessage = error.response.data.message;
                    if (error.response.data.errors) {
                        errorMessage += "\n";
                        for (const [key, messages] of Object.entries(error.response.data.errors)) {
                            errorMessage += `${key}: ${messages.join(', ')}\n`;
                        }
                    }
                    swal("Error", errorMessage.trim(), "error");
                    setisLoading(false)
                })
        } else {
            setisLoading(false)
            swal("Error", "New password and confirm password must be same", "error");
        }

    }


    return (
        <>
            <div className="container pt-3 vh-100 ">
                <div className="row ">
                    <div className="container col-12 col-md-12 pt-5 d-flex justify-content-center">

                        <form onSubmit={(e) => {

                            e.preventDefault();
                            Swal.fire({
                                title: "Are you sure you want to reset your password?",
                                text: "Your password will be reset!",
                                showCancelButton: true,
                                confirmButtonText: "Reset password",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleSubmit(e)
                                }
                            });
                        }} className=" shadow p-3 mb-5 bg-white rounded">
                            <div className="row container mb-3 "  >
                                <div className="col-md-12 col-sm-12"  >
                                    <h2 className="fw-bolder  text-center pt-5 text-login" >Change password</h2>
                                    <p className="text-center pt-3" >Your new password must be different from previous used passwords.</p>
                                </div>
                            </div>
                            <div className="row container pt-1">
                                <level for="password" className="col-form-label fw-bolder text-muted ">Old Password: </level>
                                <div className="col-md-12 col-sm-12 d-flex align-items-center" >
                                    <input type={passwordType?.old}

                                        onChange={(e) => setoldPassword(e.target.value)}
                                        name="oldPassword" value={oldPassword}
                                        id="password1" className="form-control" placeholder="Old Password" required />

                                    {
                                        passwordType?.old == "password" ? <i class="fa-solid fa-eye eyeBtn" onClick={() => {
                                            setpasswordType({
                                                ...passwordType,
                                                old: "text"
                                            })
                                        }}></i> : <i class="fa-solid fa-eye-slash eyeBtn" onClick={() => {
                                            setpasswordType({
                                                ...passwordType,
                                                old: "password"
                                            })
                                        }}></i>
                                    }

                                </div>
                            </div>
                            <div className="row container pt-1">
                                <level for="password" className="col-form-label fw-bolder text-muted ">New Password: </level>
                                <div className="col-md-12 col-sm-12 d-flex align-items-center">
                                    <input type={passwordType?.new}
                                        onChange={(e) => setnewPassword(e.target.value)}
                                        name="newPassword"
                                        value={newPassword}
                                        id="password2" className="form-control" placeholder="Password" required />
                                    {
                                        passwordType?.new == "password" ? <i class="fa-solid fa-eye eyeBtn" onClick={() => {
                                            setpasswordType({
                                                ...passwordType,
                                                new: "text"
                                            })
                                        }}></i> : <i class="fa-solid fa-eye-slash eyeBtn" onClick={() => {
                                            setpasswordType({
                                                ...passwordType,
                                                new: "password"
                                            })
                                        }}></i>
                                    }
                                </div>
                            </div>
                            <div className="row container pt-1 mb-3">
                                <level for="password2" className="col-form-label fw-bolder text-muted ">Confirm New Password: </level>
                                <div className="col-md-12 col-sm-12 d-flex align-items-center">
                                    <input type={passwordType?.confirm}
                                        onChange={(e) => setconfirmNewPassword(e.target.value)}
                                        name="confirmNewPassword"
                                        value={confirmNewPassword}
                                        id="password3" className="form-control" placeholder="Confirm password" required />

                                    {
                                        passwordType?.confirm == "password" ? <i class="fa-solid fa-eye eyeBtn" onClick={() => {
                                            setpasswordType({
                                                ...passwordType,
                                                confirm: "text"
                                            })
                                        }}></i> : <i class="fa-solid fa-eye-slash eyeBtn" onClick={() => {
                                            setpasswordType({
                                                ...passwordType,
                                                confirm: "password"
                                            })
                                        }}></i>
                                    }
                                </div>
                            </div>
                            <div className=" row container mb-3"  >
                                <div className="col-md-12 col-sm-12 pt-3 d-flex justify-content-center gap-3"  >
                                    <button type="button" style={{ backgroundColor: "white" }} className="form-control  shadow rounded  fw-bold  text-nowrap p-2" onClick={() => navigate('/main')} >Cancel</button>
                                    {
                                        isLoading ? <button style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bold text-white text-nowrap p-2" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="visually-hidden">Loading...</span>
                                        </button> : <button type="submit" style={{ backgroundColor: "#69B128" }} className="form-control  shadow rounded  fw-bold text-white text-nowrap p-2" value="Reset password" required >Reset password</button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ >
    );
};

export default CreatePassword;