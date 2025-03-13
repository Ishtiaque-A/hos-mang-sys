import React, { useEffect, useState } from "react";
import "./DashboardNav.css";
import MHP from "../../Images/MHP.png";
import { Outlet, Link } from "react-router-dom";
import appointment from "../../Images/appointment.svg";

import appoinment_book from "../../Images/appoinment_book.png";
import { useNavigate } from "react-router";

const DashboardNav = () => {
  const [userInfo, setuserInfo] = useState();
  useEffect(() => {
    const storageData = localStorage.getItem("userData");
    const storageUser = JSON.parse(storageData);
    setuserInfo(storageUser);
  }, []);
  let navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
  }

  return (
    <div class="sidebar-top">
      <div class="row">
        <div className="col-12 fixed-top  ">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-header">
            <div className="col-md-3 d-flex justify-content-start me-2">
              <button
                className="navbar-toggler  me-2 my-lg-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <span
                  className="navbar-toggler-icon"
                  data-bs-target="#offcanvasExample"
                ></span>
              </button>
              <nav className=" navbar-nav mx-2">
                <a
                  className="navbar-brand active"
                  aria-current="page"
                  href="/dashboard"
                >
                  SmartHealth
                </a>
              </nav>
            </div>
            <div className="col-md-9 d-flex justify-content-end me-2">
              <div className="btn-group">
                <a
                  className="btn  dropdown-toggle text-white"
                  type="button"
                  id="dropdownMenuClickableOutside"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="inside"
                  aria-expanded="false"
                >
                  <img
                    src={MHP}
                    className="bg-light rounded-circle p-2"
                    alt="MHP"
                    width="20"
                    height="20"
                    border="0"
                  />
                  <span className="text-white mx-2">
                    {userInfo != null ? userInfo.name : "Dr. Jone"}
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end user_dropdown"
                  aria-labelledby="dropdownMenuClickableOutside"
                >
                  <li>
                    <Link to="/user-profile" className="dropdown-item">
                      <i class="fas fa-user-circle"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/password_change" className="dropdown-item">
                      <i class="fas fa-key"></i> Change Password
                    </Link>
                  </li>
                  <li>
                    <Link to="/main" className="dropdown-item">
                      <i class="fas fa-align-justify"></i> Dashboard
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logout}>
                      <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                  </li>
                </ul>
                {/* <ul className="dropdown-menu float-end user_dropdown" aria-labelledby="dropdownMenuClickableOutside">
                                    <li>
                                        <Link to="/user-profile" className="dropdown-item" ><i class="fas fa-user-circle"></i> Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="/password_change" className="dropdown-item" ><i class="fas fa-key"></i> Change Password</Link>
                                    </li>
                                    <li>
                                        <Link to="/main" className="dropdown-item" ><i class="fas fa-align-justify"></i> Dashboard</Link>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" onClick={logout}><i class="fas fa-sign-out-alt"></i> Logout</a>
                                    </li>
                                </ul> */}
              </div>
            </div>
          </nav>

          {/* <nav className="navbar navbar-expand-lg navbar-dark navbar-header" >
                        <div className="d-flex justify-content-start me-2">
                            <button className="navbar-toggler  me-2 my-lg-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
                            </button>
                                <nav className=" navbar-nav mx-2">
                                    <a className="navbar-brand active" aria-current="page" href="/main">MacroHealthPlus</a>
                                </nav>
                                <nav className=" navbar-nav mx-2">
                                    <a className="navbar-brand active" aria-current="page" onClick={logout}>Logout</a>
                                </nav>
                        </div>
                    </nav> */}

          {/* //navbar end */}

          {/* offcanvas start*/}
          <div
            className="offcanvas offcanvas-start text-white sidebar-nav "
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            {/* offcanvas-header sidebar-nav-top  start */}
            <div className="offcanvas-header sidebar-nav-top">
              <nav className="navbar navbar-dark ">
                <div className=" container ">
                  <div className="col-md-6 pt-0 ">
                    <Link className="navbar-brand" to="/main">
                      <img
                        src={MHP}
                        className="shadow bg-light p-2"
                        style={{ width: "85px", height: "70px" }}
                        alt="MHP"
                        border="0"
                      />
                    </Link>
                  </div>
                  <div className="col-md-6 pt-3 px-1">
                    <span className="text-white mb-0 ">
                      <span> Welcome </span>
                      {userInfo != null ? (
                        <h5 className="ml-2"> {userInfo.name}</h5>
                      ) : (
                        <h5>Dr. Jone</h5>
                      )}
                    </span>
                    <p className="text-white ">
                      {/* <a href="#" class="text-decoration-none "><span className="text-white me-1 "><i className="fas fa-envelope"></i></span></a> */}
                      <Link to="/user-profile" className="text-decoration-none">
                        <span className="text-white me-1 ">
                          <i className="fas fa-user"></i>
                        </span>
                      </Link>
                      {/* <a href="#" class="text-decoration-none "> <span className="text-white me-1 "> <i className="fas fa-cog"></i></span></a> */}
                      <a
                        href="#"
                        onClick={logout}
                        class="text-decoration-none "
                      >
                        <span className="text-white me-1 ">
                          {" "}
                          <i className="fas fa-sign-in-alt"></i>
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </nav>
            </div>

            <div className="offcanvas-body p-0">
              <nav className="navbar-dark">
                <div className="row ms-1 me-1  user-main">
                  <h6 className=" bg-text mb-3 shadow p-3">MAIN NAVIGATION</h6>
                  <Link to="/main" className="text-decoration-none">
                    <h6 className=" bg-text ">
                      {" "}
                      <i className="fas fa-clipboard-list"></i>
                      <span className="ms-3">Dashboard</span>
                    </h6>
                  </Link>
                  <div className="accordion accordion-flush" id="faqlist">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <Link
                          to="/appointment-setup"
                          className="text-decoration-none"
                        >
                          <button
                            className="accordion-button collapsed "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-content-7"
                          >
                            <img
                              src={appointment}
                              alt=""
                              width="16"
                              height="14"
                              className="d-inline-block align-text-center bg-white mx-2"
                            />
                            <span>Appointment Setup</span>
                          </button>
                        </Link>
                      </h2>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <Link
                          to="/doctors-setup"
                          className="text-decoration-none"
                        >
                          <button
                            className="accordion-button collapsed "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-content-7"
                          >
                            <img
                              src={appointment}
                              alt=""
                              width="16"
                              height="14"
                              className="d-inline-block align-text-center bg-white mx-2"
                            />
                            <span>Doctors Setup </span>
                          </button>
                        </Link>
                      </h2>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-exam-history"
                        >
                          <img
                            src={appointment}
                            alt=""
                            width="16"
                            height="14"
                            className="d-inline-block align-text-center bg-white mx-2"
                          />
                          <span> Exam & History Setup </span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-exam-history"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body">
                          <Outlet />
                          {/* <a className="navbar-brand lh-1" href="#"> */}
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <Link
                                to="/history-setup"
                                className="text-decoration-none"
                              >
                                <button
                                  className="accordion-button collapsed "
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#faq-content-7"
                                >
                                  <img
                                    src={appointment}
                                    alt=""
                                    width="16"
                                    height="14"
                                    className="d-inline-block align-text-center bg-white mx-2"
                                  />
                                  <span>History</span>
                                </button>
                              </Link>
                            </h2>
                          </div>

                          {/*<Link to="/history" class="text-decoration-none navbar-brand lh-1">*/}
                          {/*    <span>*/}
                          {/*        <img src={appoinment_book} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />*/}
                          {/*        <span>History</span>*/}
                          {/*    </span>*/}
                          {/*</Link>*/}
                          <Link
                            to="/AppointmentBook"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={appoinment_book}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Examination</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-1"
                        >
                          <img
                            src={appointment}
                            alt=""
                            width="16"
                            height="14"
                            className="d-inline-block align-text-center bg-white mx-2"
                          />
                          <span>Appointment</span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-1"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body">
                          <Outlet />
                          {/* <a className="navbar-brand lh-1" href="#"> */}
                          <Link
                            to="/AppointmentBook"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={appoinment_book}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Appointment book</span>
                            </span>
                          </Link>
                          <Link
                            to="/patient-card"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={appoinment_book}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Patient Card</span>
                            </span>
                          </Link>
                          <Link
                            to="/appointment-list"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={appoinment_book}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>All Appointment list</span>
                            </span>
                          </Link>

                          {/* <Link to ="/UncompletedAppointments" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Uncompleted Appointments</span>
                                                        </span>
                                                     </Link>
                                                    
                                                    <Link to ="/WaitingRoom" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={waiting_room} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Waiting room</span>
                                                        </span>
                                                    </Link>
                                                   
                                                    <Link to ="/AppointmentHistory" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={appointment_history} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Appointment History</span>
                                                        </span>
                                                    </Link>
                                                    
                                                    <Link to ="/DailyJobList" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={daily_job_list} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Daily job list</span>
                                                        </span>
                                                    </Link>
                                                    
                                                    <Link to ="/DatabaseSearch" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={database_search} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Database search</span>
                                                        </span>
                                                    </Link>
                                                    
                                                    <Link to ="/WordProcessor" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={word_processor} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Word Processor</span>
                                                        </span>
                                                    </Link>
                                                   
                                                    <Link to ="/DeletedClinicalData" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={deleted_clinical_data} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Deleted clinical data</span>
                                                        </span>
                                                    </Link>
                                                    
                                                    <Link to ="/ReferralFollowUp" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={referral_follow_up} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Referral follow-up</span>
                                                        </span>
                                                    </Link>
                                                   
                                                    <Link to ="/ReportsAwaitingAllocations" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={reports_awaiting_allocation} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Reports awaiting allocations</span>
                                                        </span>
                                                    </Link>
                                                    
                                                    <Link to ="/DailyMessages" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={daily_message} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Daily Messages</span>
                                                        </span>
                                                    </Link>
                                                    
                                                    <Link to ="/PatientContactNotes" class="text-decoration-none navbar-brand lh-1">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Patient contact notes</span>
                                                        </span>
                                                    </Link> */}
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-2"
                        >
                          <i className="fas fa-user-md"></i>{" "}
                          <span className="ms-3">Doctors</span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-2"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body ">
                          <Link
                            to="/doctors"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>All Doctor</span>
                            </span>
                          </Link>
                          <Link
                            to="/add-doctors"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Add Doctor</span>
                            </span>
                          </Link>
                          {/* <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Doctor Profile</span>
                                                        </span>
                                                    </a> */}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-3"
                        >
                          <i className="fas fa-user-md"></i>
                          <span className="ms-3">Patients</span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-3"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body ">
                          <Link
                            to="/patients"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>All Patients</span>
                            </span>
                          </Link>
                          {/* <a href="#"className="navbar-brand lh-1" href="#"> */}
                          <Link
                            to="/AddNewPatient"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Add New Patient</span>
                            </span>
                          </Link>
                          <Link
                            to="/vital-sign-setup"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Vital sign setup</span>
                            </span>
                          </Link>
                          {/* </a> */}
                          {/* <a className="navbar-brand lh-1" href="#"> */}

                          {/* <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Patient Profile</span>
                                                        </span> */}
                          {/* </a> */}
                          {/* <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Patient Invoice</span>
                                                        </span>
                                                    </a> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
                                                    <i className="fas fa-user-md"></i><span className="ms-3">Payments</span>
                                                </button>
                                            </h2>
                                            <div id="faq-content-4" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                                <div className="accordion-body ">
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Payments</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Add Payments</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Patient Invoice</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <h6 className=" bg-text pt-3"><i className="fas fa-file-alt"></i><span className="ms-3">Reports</span></h6>
                                        <h6 className=" bg-text"><i className="fas fa-clipboard-list"></i><span className="ms-3">Widgets</span></h6> */}
                    {/* <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-5">
                                                    <i className="fas fa-user-md"></i><span className="ms-3">Extra Pages</span>
                                                </button>
                                            </h2>
                                            <div id="faq-content-5" className="accordion-collapse collapse" data-bs-parent="#faqlist">
                                                <div className="accordion-body ">
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Sign In</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Sign Up</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Forgot Password</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Pages 404</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Pages 500</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Page Offline</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Lock Screen</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Blank Page</span>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-6"
                        >
                          <i className="fas fa-user-md"></i>
                          <span className="ms-3">User</span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-6"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body">
                          <Link
                            to="/sign-up"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Add New User</span>
                            </span>
                          </Link>

                          {/* <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Sign In</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Forgot Password</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Pages 404</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Pages 500</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Page Offline</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Lock Screen</span>
                                                        </span>
                                                    </a>
                                                    <a className="navbar-brand lh-1" href="#">
                                                        <span>
                                                            <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
                                                            <span>Blank Page</span>
                                                        </span>
                                                    </a> */}
                        </div>
                      </div>
                      <Outlet />
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            {/* offcanvas-body sidebar-nav-bottom end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
