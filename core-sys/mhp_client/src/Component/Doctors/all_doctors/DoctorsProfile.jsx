import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NoImages from "../../../Images/dummy_images.svg";
import "../../../imageUrl";
import "../all_doctors/DoctorProfile.css";
const DoctorsProfile = () => {
  const navigate = useNavigate();
  const [docId, setDocId] = useState("");

  console.log("doctor id check", docId);

  var url = window.location.href;
  var urlsplit = url.split("/");
  var lastpart = urlsplit[urlsplit.length - 1];
  if (lastpart === "") {
    lastpart = urlsplit[urlsplit.length - 2];
  }
  const [single_doctors, setSingleDoctor] = useState("");
  const [totalTodaysAppointment, setTotalTodaysAppointment] = useState("");
  const [totalUpcomingAppointment, setTotalUpcomingAppointment] = useState("");
  const [doctorAcademicInfo, setDoctorAcademicInfo] = useState([]);
  console.log("doctor acadamic info", doctorAcademicInfo);
  const [doctorLicenseTraining, setDoctorLicenseTraining] = useState([]);
  const [doctorWorkExperience, setDoctorWorkExperience] = useState([]);
  const [doctorCertificate, setDoctorCertificate] = useState([]);
  const [totalPatients, setTotalPatients] = useState("");

  useEffect(() => {
    setDocId(lastpart);
    axios.get(`/single-doctor/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setSingleDoctor(res.data.doctor);
      }
    });

    axios.get(`/todays-doctorappointment/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setTotalTodaysAppointment(res.data.totalTodaysAppointment);
      }
    });
    axios.get(`/doctor-academic-info/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setDoctorAcademicInfo(...doctorAcademicInfo, res.data.docAcadamic);
      }
    });
    axios.get(`/doctor-license-training/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setDoctorLicenseTraining(res.data.docLicenseTraining);
      }
    });
    axios.get(`/doctor-work-experience/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setDoctorWorkExperience(res.data.docWorkExperience);
      }
    });
    axios.get(`/upcoming-drappointment/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setTotalUpcomingAppointment(res.data.totalUpcomingAppointment);
      }
    });
    axios.get(`/doctor-certificate/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setDoctorCertificate(res.data.docCertificate);
      }
    });
    axios.get(`/doctor-total-patients/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setTotalPatients(res.data.totalPatients);
      }
    });
  }, []);

  console.log(single_doctors, "ddef");
  return (
    <div className="ms-2 mt-2">
      <div className="custom-card">
        <h5 className="p-2">
          Doctor's Profile
          <Link to={"/doctors"} className="btn btn-primary btn-sm float-end">
            {" "}
            Back{" "}
          </Link>
        </h5>
      </div>
      <div className="custom-card p-2">
        <div className="row">
          <div className="col-md-3">
            <div className="doc-container text-center">
              {single_doctors.dr_images == null ? (
                <img src={NoImages} alt="" className="doctor" />
              ) : (
                <img
                  alt=""
                  className="doctor"
                  src={`${global.img_url}/doctors/images/${single_doctors.dr_images}`}
                />
              )}
              <h6 className="doc-name mt-2">
                {single_doctors?.fullName ? single_doctors?.fullName : ""}
              </h6>
              <span className="doc-department">
                {single_doctors?.specialist?.specialists_name}
              </span>
            </div>
            <div className="mt-2">
              <p>
                {single_doctors?.dr_about &&
                  single_doctors?.dr_about !== "null" &&
                  single_doctors?.dr_about}
              </p>
            </div>
            <div className="doctor-btn-container d-grid  gap-2">
              <button
                className="book-btn"
                onClick={() => {
                  navigate("/main");
                }}
              >
                Book Appointment
              </button>
            </div>
            <div className="doc-app-container mt-2 text-center">
              <h6>Appointment</h6>
              <div className="row mt-1">
                <div className="col-6 today">
                  <h6>{totalTodaysAppointment}</h6>
                  <span>Today’s Appointment</span>
                </div>
                <div className="col-6 upcoming">
                  <h6>{totalUpcomingAppointment}</h6>
                  <span>Upcoming Appointment</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 custom-card ps-1 pe-3">
            <div className="doctor-profile-icon-container clearfix d-block">
              <i
                className="m-3 float-end fad fa-edit"
                onClick={() => {
                  navigate(`/edit-doctors/${docId}`);
                }}
              ></i>
            </div>
            <div className="doctor-info-container mt-1">
              <div className="doctor-info">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      className="nav-link doctor-info-btn active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Personal Information
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      className="nav-link doctor-info-btn"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Academic
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      className="nav-link doctor-info-btn"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Certificate
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      className="nav-link doctor-info-btn"
                      id="pills-contact-tab1"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact1"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      Work Experiences
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      className="nav-link doctor-info-btn"
                      id="pills-contact-tab2"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact2"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      License
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="custom-card">
                      <div className="doc-p-info-container p-3 row">
                        <div className="col-4">
                          <div className="d-flex">
                            <span>Doctors Identity No. : </span>
                            <p>{single_doctors.dr_identity_no}</p>
                          </div>
                          <div className="d-flex">
                            <span>Family Name : </span>
                            <p>
                              {single_doctors.dr_family_name == "null"
                                ? ""
                                : single_doctors.dr_family_name}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Given Name : </span>
                            <p>
                              {single_doctors.dr_given_name == "null"
                                ? ""
                                : single_doctors.dr_given_name}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Middle Name : </span>
                            <p>
                              {" "}
                              {single_doctors.dr_middle_name == "null"
                                ? ""
                                : single_doctors.dr_middle_name}
                            </p>
                          </div>

                          <div className="d-flex">
                            <span>Preferred Name : </span>
                            <p>
                              {" "}
                              {single_doctors.dr_preferred_name == "null"
                                ? ""
                                : single_doctors.dr_preferred_name}
                            </p>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex">
                            <span>Address Line 1 : </span>
                            <p>
                              {single_doctors.dr_address_line_1 == "null"
                                ? ""
                                : single_doctors.dr_address_line_1}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Address Line 2 : </span>
                            <p>
                              {single_doctors.dr_address_line_2 == "null"
                                ? ""
                                : single_doctors.dr_address_line_2}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>BMDC Reg No. : </span>
                            <p>
                              {single_doctors.dr_bmdc_reg_no == "null"
                                ? ""
                                : single_doctors.dr_bmdc_reg_no}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Email : </span>
                            <p>
                              {" "}
                              {single_doctors.dr_email == "null"
                                ? ""
                                : single_doctors.dr_email}{" "}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Date of Birth : </span>
                            <p>
                              {" "}
                              {single_doctors.dr_dob == "null"
                                ? ""
                                : single_doctors.dr_dob}{" "}
                            </p>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex">
                            <span>Gender : </span>
                            <p>{single_doctors?.birth_sex?.birth_sex_name}</p>
                          </div>
                          <div className="d-flex">
                            <span>City : </span>
                            <p>{single_doctors?.city?.city_name}</p>
                          </div>
                          <div className="d-flex">
                            <span>Post Code : </span>
                            <p>
                              {single_doctors.dr_postal_code === "null"
                                ? ""
                                : single_doctors.dr_postal_code}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Phone : </span>
                            <p>
                              {" "}
                              {single_doctors.dr_work_phone === "null"
                                ? ""
                                : single_doctors.dr_work_phone}{" "}
                            </p>
                          </div>
                          <div className="d-flex">
                            <span>Usual Provider : </span>
                            <p>
                              {
                                single_doctors?.usual_provider
                                  ?.usual_provider_name
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {doctorAcademicInfo?.length === 0 ? (
                      <p>Records are not available</p>
                    ) : (
                      doctorAcademicInfo?.map((item, i) => {
                        return (
                          <div className="custom-card p-1 my-2" key={i}>
                            <div className="doc-p-info-container p-3 row">
                              <div className="col-4">
                                <div className="d-flex">
                                  <span>Degree : </span>
                                  <p>{item.degree_id}</p>
                                </div>
                                <div className="d-flex">
                                  <span>Scan Copy : </span>
                                  <p>
                                    {item.scan_copy == null ? (
                                      <img src="" alt="" className="inside" />
                                    ) : (
                                      <img
                                        alt=""
                                        className="inside"
                                        src={`${global.img_url}/doctors/scan_copy/academic/${item.scan_copy}`}
                                      />
                                    )}
                                  </p>
                                </div>
                                <div className="d-flex">
                                  <span>City : </span>
                                  <p>{item.city_name}</p>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="d-flex">
                                  <span>Passing Year : </span>
                                  <p>{item.passing_year}</p>
                                </div>
                                <div className="d-flex">
                                  <span>Scan Copy Tittle : </span>
                                  <p>{item.scan_copy_title}</p>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="d-flex">
                                  <span>Result : </span>
                                  <p>{item.result}</p>
                                </div>
                                <div className="d-flex">
                                  <span>Country : </span>
                                  <p>{item.country_name}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    {doctorCertificate.map((item, i) => {
                      return (
                        <div className="card p-1 my-2" key={i}>
                          <div className="doc-p-info-container p-3 row">
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Certificate tittle. : </span>
                                <p>{item.certificate_title}</p>
                              </div>
                              <div className="d-flex">
                                <span>Country : </span>
                                <p>{item.country_name}</p>
                              </div>
                              <div className="d-flex">
                                <span>Scan Copy : </span>
                                <p>
                                  {" "}
                                  {item.scan_copy == null ? (
                                    <img src="" alt="" className="inside" />
                                  ) : (
                                    <img
                                      alt=""
                                      className="inside"
                                      src={`${global.img_url}/doctors/scan_copy/certificate/${item.scan_copy}`}
                                    />
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Certificate Name : </span>
                                <p>{item.certificate_name}</p>
                              </div>
                              <div className="d-flex">
                                <span>City : </span>
                                <p>{item.city_name}</p>
                              </div>
                              <div className="d-flex">
                                <span>Details of Course. : </span>
                                <p>{item.details_of_course}</p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Usual Provider Name : </span>
                                <p>{item.usual_provider_name}</p>
                              </div>
                              <div className="d-flex">
                                <span>Scan Copy Tittle : </span>
                                <p>{item.scan_copy_title}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact1"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab1"
                  >
                    {doctorWorkExperience.map((item, i) => {
                      return (
                        <div className="card p-1 my-2" key={i}>
                          <div className="doc-p-info-container p-3 row">
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Work Experience Tittle. : </span>
                                <p>{item.work_experience_title}</p>
                              </div>
                              <div className="d-flex">
                                <span>Location : </span>
                                <p>{item.location}</p>
                              </div>
                              <div className="d-flex">
                                <span>Is Present : </span>
                                <p>{item.is_present}</p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Employment Tittle : </span>
                                <p>{item.employment_title}</p>
                              </div>
                              <div className="d-flex">
                                <span>Start Date : </span>
                                <p>{item.start_date}</p>
                              </div>
                              <div className="d-flex">
                                <span>Certificates Copy Tittle : </span>
                                <p>{item.certificates_copy_title}</p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Company : </span>
                                <p>{item.company}</p>
                              </div>
                              <div className="d-flex">
                                <span>End Date : </span>
                                <p>{item.end_date}</p>
                              </div>
                              <div className="d-flex">
                                <span>Certificate Copy : </span>
                                <p>
                                  {item.certificates_copy == null ? (
                                    <img src="" alt="" className="inside" />
                                  ) : (
                                    <img
                                      alt=""
                                      className="inside"
                                      src={`${global.img_url}/doctors/scan_copy/workexp/${item.certificates_copy}`}
                                    />
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact2"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab2"
                  >
                    {doctorLicenseTraining.map((item, i) => {
                      return (
                        <div className="card p-1 my-2" key={i}>
                          <div className="doc-p-info-container p-3 row">
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Training Name. : </span>
                                <p>{item.training_name}</p>
                              </div>
                              <div className="d-flex">
                                <span>Expire Date : </span>
                                <p>{item.expire_date}</p>
                              </div>
                              <div className="d-flex">
                                <span>Certificates Copy : </span>
                                <p>
                                  {" "}
                                  {item.certificates_copy == null ? (
                                    <img src="" alt="" className="inside" />
                                  ) : (
                                    <img
                                      alt=""
                                      className="inside"
                                      src={`${global.img_url}/doctors/scan_copy/training/${item.certificates_copy}`}
                                    />
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Issuing Organization : </span>
                                <p>{item.issuing_organization}</p>
                              </div>
                              <div className="d-flex">
                                <span>Credentital Url : </span>
                                <p>{item.credential_url}</p>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="d-flex">
                                <span>Issue Date : </span>
                                <p>{item.issue_date}</p>
                              </div>
                              <div className="d-flex">
                                <span>Certificates Copy Tittle : </span>
                                <p>{item.certificates_copy_tittle}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
