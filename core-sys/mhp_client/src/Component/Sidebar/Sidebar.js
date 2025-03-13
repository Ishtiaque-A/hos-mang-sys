import React from "react";
import "./Sidebar.css";
import MHP from "../../Images/MHP.png";
import Dashboard_1 from "../../Images/Dashboard_1.png";
import appointment from "../../Images/appointment.svg";
import appointment_history from "../../Images/appointment_history.png";
import daily_job_list from "../../Images/daily_job_list.png";
import daily_message from "../../Images/daily_message.png";
import database_search from "../../Images/database_search.png";
import deleted_clinical_data from "../../Images/deleted_clinical_data.png";
import referral_follow_up from "../../Images/referral_follow_up.png";
import reports_awaiting_allocation from "../../Images/reports_awaiting_allocation.png";
import waiting_room from "../../Images/waiting_room.png";
import word_processor from "../../Images/word_processor.png";
import appoinment_book from "../../Images/appoinment_book.png";
// import { Link } from 'react-router-dom';
// import MHP from '../../Images/MHP.png';
// import AddNewPatient from "../AddNewPatient/AddNewPatient";

const Sidebar = () => {
  return (
    <div class="sidebar-top">
      <div class="row">
        <div className="col-4 fixed-top  ">
          {/* //navbar start*/}
          <nav className=" navbar navbar-expand-lg navbar-dark navbar-header ">
            <div className="d-flex justify-content-start me-2">
              {/* offcanvas trigger */}
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
                <a className="navbar-brand active" aria-current="page" href="#">
                  SmartHealth
                </a>
              </nav>
            </div>
          </nav>
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
                    <a className="navbar-brand" href="#">
                      <img
                        src={MHP}
                        className="shadow bg-light p-2"
                        style={{ width: "85px", height: "70px" }}
                        alt="MHP"
                        border="0"
                      />
                    </a>
                  </div>
                  <div className="col-md-6 pt-3 px-1">
                    <span className="text-white mb-0 ">
                      <span>Welcome</span>
                      <h5>Dr. John</h5>
                    </span>
                    <p className="text-white ">
                      <a href="#" class="text-decoration-none ">
                        <span className="text-white me-1 ">
                          <i className="fas fa-envelope"></i>
                        </span>
                      </a>
                      <a href="#" class="text-decoration-none ">
                        <span className="text-white me-1 ">
                          <i className="fas fa-user"></i>
                        </span>
                      </a>
                      <a href="#" class="text-decoration-none ">
                        {" "}
                        <span className="text-white me-1 ">
                          {" "}
                          <i className="fas fa-cog"></i>
                        </span>
                      </a>
                      <a href="#" class="text-decoration-none ">
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
            {/* offcanvas-header sidebar-nav-top  end */}

            {/* offcanvas-body sidebar-nav-bottom start */}
            <div className="offcanvas-body p-0">
              <nav className="navbar-dark">
                <div className="row ms-1 me-1  user-main">
                  <h6 className=" bg-text mb-3 shadow p-3">MAIN NAVIGATION</h6>
                  <h6 className=" bg-text ">
                    {" "}
                    <i className="fas fa-clipboard-list"></i>
                    <span className="ms-3">Dashboard</span>
                  </h6>
                  <div className="accordion accordion-flush" id="faqlist">
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
                          {/* <a className="navbar-brand lh-1" href="#"> */}
                          <a
                            href="#"
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
                          </a>
                          {/* </a> */}
                          <a
                            href="#"
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
                              <span>Uncompleted Appointments</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={waiting_room}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Waiting room</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={appointment_history}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Appointment History</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={daily_job_list}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Daily job list</span>
                            </span>
                          </a>
                          <a
                            href="#"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={database_search}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Database search</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={word_processor}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Word Processor</span>
                            </span>
                          </a>
                          <a
                            href="#"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={deleted_clinical_data}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Deleted clinical data</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={referral_follow_up}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Referral follow-up</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={reports_awaiting_allocation}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Reports awaiting allocations</span>
                            </span>
                          </a>
                          <a
                            href="#"
                            class="text-decoration-none navbar-brand lh-1"
                          >
                            <span>
                              <img
                                src={daily_message}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Daily Messages</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Patient contact notes</span>
                            </span>
                          </a>
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
                          <a className="navbar-brand lh-1" href="#">
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
                          </a>
                          <a className="navbar-brand lh-1" href="#">
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
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Doctor Profile</span>
                            </span>
                          </a>
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
                          <a className="navbar-brand lh-1" href="#">
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
                          </a>
                          <a href="#" className="navbar-brand lh-1" href="#">
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
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Patient Profile</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Patient Invoice</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-4"
                        >
                          <i className="fas fa-user-md"></i>
                          <span className="ms-3">Payments</span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-4"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body ">
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Payments</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Add Payments</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Patient Invoice</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <h6 className=" bg-text pt-3">
                      <i className="fas fa-file-alt"></i>
                      <span className="ms-3">Reports</span>
                    </h6>
                    <h6 className=" bg-text">
                      <i className="fas fa-clipboard-list"></i>
                      <span className="ms-3">Widgets</span>
                    </h6>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq-content-5"
                        >
                          <i className="fas fa-user-md"></i>
                          <span className="ms-3">Extra Pages</span>
                        </button>
                      </h2>
                      <div
                        id="faq-content-5"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body ">
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Sign In</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Sign Up</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Forgot Password</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Pages 404</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Pages 500</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Page Offline</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Lock Screen</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Blank Page</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
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
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Sign In</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Sign Up</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Forgot Password</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Pages 404</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Pages 500</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Page Offline</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Lock Screen</span>
                            </span>
                          </a>
                          <a className="navbar-brand lh-1" href="#">
                            <span>
                              <img
                                src={MHP}
                                alt=""
                                width="16"
                                height="14"
                                className="d-inline-block align-text-center bg-white mx-2"
                              />
                              <span>Blank Page</span>
                            </span>
                          </a>
                        </div>
                      </div>
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

export default Sidebar;

////mainContent code
// import React from 'react';
// import './Sidebar.css';
// import MHP from '../../Images/MHP.png';
// import Dashboard_1 from '../../Images/Dashboard_1.png';
// import appointment from '../../Images/appointment.svg';
// import appointment_history from '../../Images/appointment_history.png';
// import daily_job_list from '../../Images/daily_job_list.png';
// import daily_message from '../../Images/daily_message.png';
// import database_search from '../../Images/database_search.png';
// import deleted_clinical_data from '../../Images/deleted_clinical_data.png';
// import referral_follow_up from '../../Images/referral_follow_up.png';
// import reports_awaiting_allocation from '../../Images/reports_awaiting_allocation.png';
// import waiting_room from '../../Images/waiting_room.png';
// import word_processor from '../../Images/word_processor.png';
// import appoinment_book from '../../Images/appoinment_book.png';
// import { Link } from 'react-router-dom';
// // import MHP from '../../Images/MHP.png';
// // import AddNewPatient from "../AddNewPatient/AddNewPatient";

// const Sidebar = () => {
//     return (
//         <div class="sidebar-top">

//             <div class="row">
//                 <div className="col-4 fixed-top  ">
//                     {/* //navbar start*/}
//                     <nav className=" navbar navbar-expand-lg navbar-dark navbar-header " >
//                         <div className="d-flex justify-content-start me-2">

//                             {/* offcanvas trigger */}
//                             <button className="navbar-toggler  me-2 my-lg-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//                                 <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
//                             </button>
//                             <nav className=" navbar-nav mx-2">
//                                 <a className="navbar-brand active" aria-current="page" href="#">MacroHealthPlus</a>
//                             </nav>
//                         </div>
//                     </nav>
//                     {/* //navbar end */}

//                     {/* offcanvas start*/}
//                     <div className="offcanvas offcanvas-start text-white sidebar-nav " tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
//                         {/* offcanvas-header sidebar-nav-top  start */}
//                         <div className="offcanvas-header sidebar-nav-top">
//                             <nav className="navbar navbar-dark ">
//                                 <div className=" container ">
//                                     <div className="col-md-6 pt-0 ">
//                                         <a className="navbar-brand" href="#">
//                                             <img src={MHP} className="shadow bg-light p-2" style={{ width: '85px', height: '70px' }} alt="MHP" border="0" />
//                                         </a>
//                                     </div>
//                                     <div className="col-md-6 pt-3 px-1">
//                                         <span className="text-white mb-0 ">
//                                             <span>Welcome</span>
//                                             <h5>Dr. John</h5>
//                                         </span>
//                                         <p className="text-white ">
//                                             <a href="#" class="text-decoration-none "><span className="text-white me-1 "><i className="fas fa-envelope"></i></span></a>
//                                             <a href="#" class="text-decoration-none "><span className="text-white me-1 "><i className="fas fa-user"></i></span></a>
//                                             <Link exact to={"/sidebar/setting"} class="text-decoration-none "> <span className="text-white me-1 "> <i className="fas fa-cog"></i></span></Link>
//                                             <a href="#" class="text-decoration-none "><span className="text-white me-1 ">  <i className="fas fa-sign-in-alt"></i></span></a>
//                                         </p>
//                                     </div>
//                                 </div>
//                             </nav>
//                         </div>
//                         {/* offcanvas-header sidebar-nav-top  end */}

//                         {/* offcanvas-body sidebar-nav-bottom start */}
//                         <div className="offcanvas-body p-0">
//                             <nav className="navbar-dark">
//                                 <div className="row ms-1 me-1  user-main" >
//                                     <h6 className=" bg-text mb-3 shadow p-3">MAIN NAVIGATION</h6>
//                                     <h6 className=" bg-text "> <i className="fas fa-clipboard-list"></i><span className="ms-3">Dashboard</span></h6>
//                                     <div className="accordion accordion-flush" id="faqlist"  >
//                                         <div className="accordion-item">
//                                             <h2 className="accordion-header">

//                                                 <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
//                                                     <img src={appointment} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Appointment</span>
//                                                 </button>
//                                             </h2>
//                                             <div id="faq-content-1" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                                 <div className="accordion-body">
//                                                     {/* <a className="navbar-brand lh-1" href="#"> */}
//                                                     <Link exact to={"/AppiontmentBook"} class="text-decoration-none navbar-brand lh-1">
//                                                         <span>
//                                                             <img src={appoinment_book} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Appointment book</span>
//                                                         </span>
//                                                     </Link>
//                                                     {/* </a> */}
//                                                     <Link exact to={"/UncompletedAppointments"} class="text-decoration-none navbar-brand lh-1">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Uncompleted Appointments</span>
//                                                         </span>
//                                                     </Link>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={waiting_room} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Waiting room</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={appointment_history} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Appointment History</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={daily_job_list} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Daily job list</span>
//                                                         </span>
//                                                     </a>
//                                                     <Link exact to={"/DatabaseSearch"} class="text-decoration-none navbar-brand lh-1">
//                                                         <span>
//                                                             <img src={database_search} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Database search</span>
//                                                         </span>
//                                                     </Link>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={word_processor} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Word Processor</span>
//                                                         </span>
//                                                     </a>
//                                                     <Link exact to={"/DeletedClinicalData"} class="text-decoration-none navbar-brand lh-1">
//                                                         <span>
//                                                             <img src={deleted_clinical_data} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Deleted clinical data</span>
//                                                         </span>
//                                                     </Link>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={referral_follow_up} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Referral follow-up</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={reports_awaiting_allocation} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Reports awaiting allocations</span>
//                                                         </span>
//                                                     </a>
//                                                     <Link exact to={"/DailyMessages"} class="text-decoration-none navbar-brand lh-1">
//                                                         <span>
//                                                             <img src={daily_message} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Daily Messages</span>
//                                                         </span>
//                                                     </Link>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Patient contact notes</span>
//                                                         </span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="accordion-item">
//                                             <h2 className="accordion-header">
//                                                 <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
//                                                     <i className="fas fa-user-md"></i> <span className="ms-3">Doctors</span>
//                                                 </button>
//                                             </h2>
//                                             <div id="faq-content-2" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                                 <div className="accordion-body ">
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>All Doctor</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Add Doctor</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Doctor Profile</span>
//                                                         </span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="accordion-item">
//                                             <h2 className="accordion-header">
//                                                 <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
//                                                     <i className="fas fa-user-md"></i><span className="ms-3">Patients</span>
//                                                 </button>
//                                             </h2>
//                                             <div id="faq-content-3" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                                 <div className="accordion-body ">
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>All Patients</span>
//                                                         </span>
//                                                     </a>
//                                                     <Link exact to="/AddNewPatient" className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Add New Patient</span>
//                                                         </span>
//                                                     </Link>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Patient Profile</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Patient Invoice</span>
//                                                         </span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="accordion-item">
//                                             <h2 className="accordion-header">
//                                                 <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
//                                                     <i className="fas fa-user-md"></i><span className="ms-3">Payments</span>
//                                                 </button>
//                                             </h2>
//                                             <div id="faq-content-4" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                                 <div className="accordion-body ">
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Payments</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Add Payments</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Patient Invoice</span>
//                                                         </span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <h6 className=" bg-text pt-3"><i className="fas fa-file-alt"></i><span className="ms-3">Reports</span></h6>
//                                         <h6 className=" bg-text"><i className="fas fa-clipboard-list"></i><span className="ms-3">Widgets</span></h6>
//                                         <div className="accordion-item">
//                                             <h2 className="accordion-header">
//                                                 <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-5">
//                                                     <i className="fas fa-user-md"></i><span className="ms-3">Extra Pages</span>
//                                                 </button>
//                                             </h2>
//                                             <div id="faq-content-5" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                                 <div className="accordion-body ">
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Sign In</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Sign Up</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Forgot Password</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Pages 404</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Pages 500</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Page Offline</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Lock Screen</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Blank Page</span>
//                                                         </span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="accordion-item">
//                                             <h2 className="accordion-header">
//                                                 <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-6">
//                                                     <i className="fas fa-user-md"></i><span className="ms-3">User</span>
//                                                 </button>
//                                             </h2>
//                                             <div id="faq-content-6" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                                 <div className="accordion-body">
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Sign In</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Sign Up</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Forgot Password</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Pages 404</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Pages 500</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Page Offline</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Lock Screen</span>
//                                                         </span>
//                                                     </a>
//                                                     <a className="navbar-brand lh-1" href="#">
//                                                         <span>
//                                                             <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                             <span>Blank Page</span>
//                                                         </span>
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </nav>
//                         </div>
//                         {/* offcanvas-body sidebar-nav-bottom end */}
//                     </div>
//                 </div>
//                 {/* offcanvas end */}

//                 {/* <div class="col py-3">
//                 <Dashbord></Dashbord>
//             </div> */}
//               {/* main content */}
//                 {/* <div class="col-12">
//                     <main className="py-5 text-dark">
//                         <div className=" text-dark mx-3">
//                             <h1>main content</h1>
//                             <a className="navbar-brand " href="#">
//                                 <img src={Dashboard_1} className="shadow bg-light p-5 w-100 " alt="MHP" border="0" />
//                             </a>
//                             <AddNewPatient></AddNewPatient>
//                         </div>
//                     </main>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

// import React from 'react';
// import './Sidebar.css';
// import MHP from '../../Images/MHP.png';
// import Dashboard_1 from '../../Images/Dashboard_1.png';
// import appointment from '../../Images/appointment.svg';
// import appointment_history from '../../Images/appointment_history.png';
// import daily_job_list from '../../Images/daily_job_list.png';
// import daily_message from '../../Images/daily_message.png';
// import database_search from '../../Images/database_search.png';
// import deleted_clinical_data from '../../Images/deleted_clinical_data.png';
// import referral_follow_up from '../../Images/referral_follow_up.png';
// import reports_awaiting_allocation from '../../Images/reports_awaiting_allocation.png';
// import waiting_room from '../../Images/waiting_room.png';
// import word_processor from '../../Images/word_processor.png';
// import appoinment_book from '../../Images/appoinment_book.png';
// import { Link } from 'react-router-dom';
// // import MHP from '../../Images/MHP.png';

// const Sidebar = () => {
//     return (

//         <div className="position-fixed">
//             {/* //navbar start*/}
//             <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-header " >
//                 <div className="col-12 justify-content-start container-fluid">

//                     {/* offcanvas trigger */}
//                     <button className="navbar-toggler  me-2 my-lg-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//                         <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
//                     </button>
//                     <nav className="navbar-nav ">
//                         <a className="navbar-brand  active" aria-current="page" href="#">MacroHealthPlus</a>
//                     </nav>
//                 </div>
//             </nav>
//             {/* //navbar end */}

//             {/* offcanvas start*/}
//             <div className="offcanvas offcanvas-start text-white sidebar-nav " tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
//                 {/* offcanvas-header sidebar-nav-top  start */}
//                 <div className="offcanvas-header sidebar-nav-top">
//                     <nav className="navbar navbar-dark ">
//                         <div className=" container">
//                             <div className="col-md-6 pt-0">
//                                 <a className="navbar-brand" href="#">
//                                     <img src={MHP} className="shadow bg-light p-2" style={{ width: '90px', height: '70px' }} alt="MHP" border="0" />
//                                 </a>
//                             </div>
//                             <div className="col-md-6 pt-3">
//                                 <span className="text-white mb-0">
//                                     <span>Welcome</span>
//                                     <h5>Dr. John</h5>
//                                 </span>
//                                 <p className="text-white ">
//                                     <a href="#" class="text-decoration-none "><span className="text-white me-2 "><i className="fas fa-envelope"></i></span></a>
//                                     <a href="#" class="text-decoration-none "><span className="text-white me-2 "><i className="fas fa-user"></i></span></a>
//                                     <Link exact to={"/sidebar/setting"} class="text-decoration-none "> <span className="text-white me-2 "> <i className="fas fa-cog"></i></span></Link>
//                                     <a href="#" class="text-decoration-none "><span className="text-white me-2 ">  <i className="fas fa-sign-in-alt"></i></span></a>
//                                 </p>
//                             </div>
//                         </div>
//                     </nav>
//                 </div>
//                 {/* offcanvas-header sidebar-nav-top  end */}

//                 {/* offcanvas-body sidebar-nav-bottom start */}
//                 <div className="offcanvas-body p-0">
//                     <nav className="navbar-dark">
//                         <div className="row ms-1 me-1  user-main" >
//                             <h6 className=" bg-text mb-3 shadow p-3">MAIN NAVIGATION</h6>
//                             <h6 className=" bg-text "> <i className="fas fa-clipboard-list"></i><span className="ms-3">Dashboard</span></h6>
//                             <div className="accordion accordion-flush" id="faqlist"  >
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">

//                                         <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-1">
//                                             <img src={appointment} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                             <span>Appointment</span>
//                                         </button>
//                                     </h2>
//                                     <div id="faq-content-1" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                         <div className="accordion-body">
//                                             {/* <a className="navbar-brand lh-1" href="#"> */}
//                                             <Link exact to={"/appiontment"} class="text-decoration-none navbar-brand lh-1">
//                                                 <span>
//                                                     <img src={appoinment_book} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Appointment book</span>
//                                                 </span>
//                                             </Link>
//                                             {/* </a> */}
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Uncompleted Appointments</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={waiting_room} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Waiting room</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={appointment_history} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Appointment History</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={daily_job_list} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Daily job list</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={database_search} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Data Base search</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={word_processor} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Word Processor</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={deleted_clinical_data} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Deleted clinical data</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={referral_follow_up} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Referral follow-up</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={reports_awaiting_allocation} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Reports awaiting allocations</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={daily_message} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Daily Messages</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Patient contact notes</span>
//                                                 </span>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">
//                                         <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-2">
//                                             <i className="fas fa-user-md"></i> <span className="ms-3">Doctors</span>
//                                         </button>
//                                     </h2>
//                                     <div id="faq-content-2" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                         <div className="accordion-body ">
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>All Doctor</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Add Doctor</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Doctor Profile</span>
//                                                 </span>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">
//                                         <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-3">
//                                             <i className="fas fa-user-md"></i><span className="ms-3">Patients</span>
//                                         </button>
//                                     </h2>
//                                     <div id="faq-content-3" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                         <div className="accordion-body ">
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>All Patients</span>
//                                                 </span>
//                                             </a>
//                                             <Link exact to="/sidebar/addPatient" className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Add New Patient</span>
//                                                 </span>
//                                             </Link>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Patient Profile</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Patient Invoice</span>
//                                                 </span>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">
//                                         <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-4">
//                                             <i className="fas fa-user-md"></i><span className="ms-3">Payments</span>
//                                         </button>
//                                     </h2>
//                                     <div id="faq-content-4" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                         <div className="accordion-body ">
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Payments</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Add Payments</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Patient Invoice</span>
//                                                 </span>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <h6 className=" bg-text pt-3"><i className="fas fa-file-alt"></i><span className="ms-3">Reports</span></h6>
//                                 <h6 className=" bg-text"><i className="fas fa-clipboard-list"></i><span className="ms-3">Widgets</span></h6>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">
//                                         <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-5">
//                                             <i className="fas fa-user-md"></i><span className="ms-3">Extra Pages</span>
//                                         </button>
//                                     </h2>
//                                     <div id="faq-content-5" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                         <div className="accordion-body ">
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Sign In</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Sign Up</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Forgot Password</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Pages 404</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Pages 500</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Page Offline</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Lock Screen</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Blank Page</span>
//                                                 </span>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header">
//                                         <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#faq-content-6">
//                                             <i className="fas fa-user-md"></i><span className="ms-3">User</span>
//                                         </button>
//                                     </h2>
//                                     <div id="faq-content-6" className="accordion-collapse collapse" data-bs-parent="#faqlist">
//                                         <div className="accordion-body">
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Sign In</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Sign Up</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Forgot Password</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Pages 404</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Pages 500</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Page Offline</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Lock Screen</span>
//                                                 </span>
//                                             </a>
//                                             <a className="navbar-brand lh-1" href="#">
//                                                 <span>
//                                                     <img src={MHP} alt="" width="16" height="14" className="d-inline-block align-text-center bg-white mx-2" />
//                                                     <span>Blank Page</span>
//                                                 </span>
//                                             </a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </nav>
//                 </div>
//                 {/* offcanvas-body sidebar-nav-bottom end */}

//             </div>
//             {/* offcanvas end */}

//             {/* <div class="col py-3">
//                 <Dashbord></Dashbord>
//             </div> */}
//             {/* main content */}
//             <main className=" text-dark">
//                 <div className=" text-dark mx-3">
//                     <h1>main content</h1>
//                     <div className="col-md-6 pt-0">
//                         <a className="navbar-brand " href="#">
//                             <img src={Dashboard_1} className="shadow bg-light p-5 w-100 "  alt="MHP" border="0" />
//                         </a>
//                     </div>
//                 </div>
//             </main>

//         </div>
//     );
// };

// export default Sidebar;

// import React from 'react';
// import './Sidebar.css';
// import MHP from '../../Images/MHP.png';
// import Dashboard_1 from '../../Images/Dashboard_1.png';
// import appointment from '../../Images/appointment.svg';
// import appointment_history from '../../Images/appointment_history.png';
// import daily_job_list from '../../Images/daily_job_list.png';
// import daily_message from '../../Images/daily_message.png';
// import database_search from '../../Images/database_search.png';
// import deleted_clinical_data from '../../Images/deleted_clinical_data.png';
// import referral_follow_up from '../../Images/referral_follow_up.png';
// import reports_awaiting_allocation from '../../Images/reports_awaiting_allocation.png';
// import waiting_room from '../../Images/waiting_room.png';
// import word_processor from '../../Images/word_processor.png';
// import appoinment_book from '../../Images/appoinment_book.png';
// import { Link } from 'react-router-dom';
// // import MHP from '../../Images/MHP.png';

// const Sidebar = () => {
//     return (

//         <div className="position-fixed ">
//             {/* //navbar start*/}
//             <div class="container-fluid">
//                 <div class="row">
//                     <div class="">
//                         <nav class="navbar navbar-dark">
//                             <div class="container-fluid">
//                                 <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//                                     <span className="navbar-toggler-icon" data-bs-target="#offcanvasExample"></span>
//                                     <a className="navbar-brand  active mx-3" aria-current="page" href="#">MacroHealthPlus</a>
//                                 </button>
//                             </div>
//                         </nav>
//                         <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
//                             <div class="offcanvas-header">
//                                 <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
//                                 <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                             </div>
//                             <div class="offcanvas-body">
//                                 <div>
//                                     Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             {/* //navbar end */}

//         </div>
//     );
// };

// export default Sidebar;
