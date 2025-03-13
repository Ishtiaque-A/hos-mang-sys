import React, { useEffect, useState } from "react";
import MHP2 from "../../Images/MHP2.png";
import Integra_Logo from "../../Images/Integra_Logo.png";
import "./RegForm.css";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Swal from "sweetalert2";

export default function New_users_registration() {
  const [userType, setuserType] = useState([]);

  const [userTypeValue, setuserTypeValue] = useState({
    user_type_name: "",
  });
  const [patients, setpatients] = useState([]);
  const [getPatientValue, setPatientValue] = useState({
    patient_preferred_name: "",
    patient_email: "",
  });
  const [doctors, setdoctors] = useState([]);
  const [getdoctorsValue, setdoctorsValue] = useState({
    dr_given_name: "",
    dr_email: "",
  });
  const [getemployee, setemployeeValue] = useState({
    given_name: "",
    email: "",
  });

  const [password, setpassword] = useState();

  const [employee, setemployee] = useState([]);

  useEffect(() => {
    axios.get("user-type").then((res) => {
      console.log("user-type Value", res.data);
      setuserType(res.data.user_type);
    });

    axios.get("patients").then((res) => {
      setpatients(res.data.patients);
    });
    axios.get("doctors").then((res) => {
      setdoctors(res.data.doctors);
    });
    axios.get(`/employee`).then((res) => {
      if (res.data.status === 200) {
        setemployee(res.data.employee);
      }
    });
  }, []);

  console.log("get Patient Value", getPatientValue);

  // console.log("Pass", password.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "name",
      getPatientValue.patient_preferred_name ||
        getdoctorsValue.dr_given_name ||
        getemployee.given_name
    );
    formData.append(
      "email",
      getPatientValue.patient_email ||
        getdoctorsValue.dr_email ||
        getemployee.email
    );
    formData.append("password", password);
    formData.append("user_type", userTypeValue.user_type_name);
    formData.append(
      "user_id",
      getPatientValue.id || getdoctorsValue.id || getemployee.id
    );

    axios.post("signup", formData).then((res) => {
      console.log("Res", res);

      if (res.data.status == 200) {
        Swal.fire(res.data.message, "Success..!", "success");
        setuserTypeValue({
          user_type_name: "",
        });
        setPatientValue({
          patient_preferred_name: "",
          patient_email: "",
        });
        setdoctorsValue({
          dr_given_name: "",
          dr_email: "",
        });
        setemployeeValue({
          given_name: "",
          email: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.error_msg.email,
        });
      }
    });
  };

  return (
    <div className="reg reg-bg-img-registration">
      <div className="row mx-3 mt-2">
        <div className="col-4 pt-5 ">
          <div className="col-md-11 col-sm-11 mb-4 pt-4 text-center">
            <a href="#">
              <img
                src={MHP2}
                className="img-fluid p-2 "
                style={{ width: "200px", height: "180px" }}
                alt="MHP2"
                border="0"
              />
            </a>
            {/* <img src={Integra_Logo} className=" bg-light img-fluid p-2" style={{ width: '182px', height: '40px' }} alt="Integra Logo" border="0" /> */}

            <div className=" col-md-11 col-sm-11">
              <h2
                className="text-center ml-3"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  fontFamily: "Libre Baskerville",
                  color: "#D90202",
                }}
              >
                Smart Doc
              </h2>
              <h2 className="text-center pt-4 text-login">
                Let's get you signup
              </h2>
              <p className="text-center fs-6 pt-1">
                It should only take a couple of minutes to pair with our team
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-8  pt-5">
          <div className=" pt-2 offset-1">
            <h2 className="fw-bolder  text-center pt-3 mb-5 text-login">
              Users Creation
            </h2>

            <div className="row  mb-3">
              <label className="col-sm-4 col-form-label fw-bolder text-muted">
                User Type:
              </label>
              <div className="col-sm-6">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={userType}
                  getOptionLabel={(option) => option.user_type_name}
                  onChange={(e, newValue) => {
                    if (newValue != null) {
                      setuserTypeValue(newValue);
                    } else {
                      setuserTypeValue({
                        user_type_name: "",
                      });
                      setPatientValue({
                        patient_preferred_name: "",
                        patient_email: "",
                      });
                      setdoctorsValue({
                        dr_given_name: "",
                        dr_email: "",
                      });
                      setemployeeValue({
                        given_name: "",
                        email: "",
                      });
                    }
                    console.log("New Value ", newValue);
                  }}
                  sx={{ width: 300, height: 50 }}
                  renderInput={(params) => (
                    <TextField {...params} label="User Type" />
                  )}
                />
                <span className="text-danger"> </span>
              </div>
            </div>

            {userTypeValue.user_type_name == "Patient" && (
              <div className="row  mb-3">
                <label
                  for="username"
                  className="col-sm-4 col-form-label fw-bolder text-muted"
                >
                  Patients:
                </label>
                <div className="col-sm-6">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={patients}
                    getOptionLabel={(option) => option.patient_preferred_name}
                    onChange={(e, newValue) => {
                      console.log("New Value Patient ", newValue);
                      if (newValue != null) {
                        setPatientValue(newValue);
                      } else {
                        setPatientValue({
                          patient_preferred_name: "",
                          patient_email: "",
                        });
                      }
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Patient Name" />
                    )}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
            )}

            {userTypeValue.user_type_name == "Doctor" && (
              <div className="row  mb-3">
                <label
                  for="username"
                  className="col-sm-4 col-form-label fw-bolder text-muted"
                >
                  Doctors:
                </label>
                <div className="col-sm-6">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={doctors}
                    getOptionLabel={(option) => option.dr_given_name}
                    onChange={(e, newValue) => {
                      console.log("New Value Doctors ", newValue);
                      if (newValue != null) {
                        setdoctorsValue(newValue);
                      } else {
                        setdoctorsValue({
                          dr_given_name: "",
                          dr_email: "",
                        });
                      }
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Doctors Name" />
                    )}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
            )}

            {userTypeValue.user_type_name == "Employee" && (
              <div className="row  mb-3">
                <label
                  for="username"
                  className="col-sm-4 col-form-label fw-bolder text-muted"
                >
                  Doctors:
                </label>
                <div className="col-sm-6">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={employee}
                    getOptionLabel={(option) => option.given_name}
                    onChange={(e, newValue) => {
                      console.log("New Value Doctors ", newValue);
                      if (newValue != null) {
                        setemployeeValue(newValue);
                      } else {
                        setemployeeValue({
                          given_name: "",
                          email: "",
                        });
                      }
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Employee Name" />
                    )}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>
            )}

            {getPatientValue.patient_email != "" ||
            getdoctorsValue.dr_email != "" ||
            getemployee.email != "" ? (
              <>
                <div className="row  mb-3">
                  <label
                    for="username"
                    className="col-sm-4 col-form-label fw-bolder text-muted"
                  >
                    Name:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      name="name"
                      value={
                        getPatientValue.patient_preferred_name ||
                        getdoctorsValue.dr_given_name ||
                        getemployee.given_name
                      }
                      id="name"
                      className="form-control"
                      disabled
                    />
                    <span className="text-danger"> </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <level
                    for="email"
                    className="col-sm-4 col-form-label fw-bolder text-muted  "
                  >
                    E-mail Address:{" "}
                  </level>
                  <div className="col-sm-6 ">
                    <input
                      type="email"
                      name="email"
                      value={
                        getPatientValue.patient_email ||
                        getdoctorsValue.dr_email ||
                        getemployee.email
                      }
                      id="email"
                      className="form-control"
                      disabled
                    />
                    <span className="text-danger"> </span>
                  </div>
                </div>
                <div className="row  mb-3">
                  <level
                    for="password"
                    className="col-sm-4 col-form-label fw-bolder text-muted "
                  >
                    Password:{" "}
                  </level>
                  <div className="col-sm-6 ">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => setpassword(e.target.value)}
                      value={password}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                    <p style={{ color: "rgb(109 109 109)" }}>
                      Password must be gretter then 8 character
                    </p>
                  </div>
                </div>

                {password == undefined || password.length <= 7 ? (
                  <div className=" mb-3 ">
                    <div className=" offset-sm-4 pt-1">
                      <button
                        className="btn btn-sm m-2 rounded text-white"
                        style={{ backgroundColor: "rgb(109 109 109)" }}
                        disabled
                      >
                        Create User
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className=" mb-3 ">
                    <div className=" offset-sm-4 pt-1">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-sm m-2 rounded text-white"
                        style={{ backgroundColor: "#69B128" }}
                      >
                        Create User
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
