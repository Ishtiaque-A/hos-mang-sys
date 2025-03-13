import React from "react";
import logo from "../../../Images/mhp-small.png";
import patient1 from "../../../Images/crush.jpg";
import pic1 from "../../../Images/pic1.jpg";
import pic2 from "../../../Images/pic2 .jpg";
import pic3 from "../../../Images/pic3.jpg";
import pic4 from "../../../Images/pic4.jpg";
import pic5 from "../../../Images/pic5.jpg";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Box, Popper } from "@mui/material";
import Modal from "react-modal";
import moment from "moment";
import { nullParser } from "../../../utils/null-parser";

const DoctorList = () => {
  const [sortedDoctorData, setSortedDoctorData] = useState([]);
  const [department, setDepartment] = useState([]);
  const [specialist, setSpecialist] = useState([]);

  const [doctorsDep, setDoctorsDep] = useState([]);
  const [doctorSpecialist, setDoctorSpecialist] = useState([]);
  const [doctorName, setDoctorName] = useState([]);

  const [doctorDepart, setDoctorDepart] = useState("depart");
  const [specialistDoc, setSpecialistDoc] = useState("special");
  const [drName, setDrName] = useState("dr");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    axios.get(`doctors`).then((res) => {
      if (res.data.status === 200) {
        setSortedDoctorData(res.data.doctors);
        setDoctorsDep(res.data.doctors);
        setDoctorSpecialist(res.data.doctors);
        setDoctorName(res.data.doctors);
      }
    });

    axios.get(`department`).then((res) => {
      setDepartment(res.data.department);
    });

    axios.get(`specialist`).then((res) => {
      setSpecialist(res.data.specialist);
    });
  }, []);

  // Filters option department
  useEffect(() => {
    if (doctorDepart == "depart") {
      setSortedDoctorData(doctorsDep);
    } else {
      setSortedDoctorData(
        doctorsDep.filter(
          (dep) =>
            dep.department_id.toLowerCase() === doctorDepart.toLowerCase()
        )
      );
    }
  }, [doctorDepart]);

  //   const nullParser = (data) => {
  //     console.log(data, "null-data");
  //     if (data == null || data === "null") {
  //       return false;
  //     } else {
  //       return data;
  //     }
  //   };

  // Filters option specialist
  useEffect(() => {
    if (specialistDoc == "special") {
      setSortedDoctorData(doctorSpecialist);
    } else {
      setSortedDoctorData(
        doctorSpecialist.filter(
          (specialDoc) =>
            specialDoc.specialist?.specialists_name.toLowerCase() ===
            specialistDoc.toLowerCase()
        )
      );
    }
  }, [specialistDoc]);

  useEffect(() => {
    if (drName == "dr") {
      setSortedDoctorData(doctorName);
    } else {
      setSortedDoctorData(
        doctorName.filter(
          (dn) => dn.dr_given_name.toLowerCase() === drName.toLowerCase()
        )
      );
    }
  }, [drName]);
  const [doctorId, setDoctorId] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setDoctorId(event.target.getAttribute("patientId"));
  };
  const open = Boolean(anchorEl);
  const id1 = open ? "simple-popper" : undefined;
  let navigate = useNavigate();
  const handleProfile = () => {
    let path = `/doctors-profile/${doctorId}`;
    navigate(path);
    setDoctorId("");
  };
  const customStyles = {
    content: {
      top: "32%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      // height: "280px",
      // background: "#F8F4F4",
      zIndex: "3000",
      padding: "5px",
    },
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState([]);
  const openModal = (id) => {
    axios
      .get(`doctor-chamber-times/${id}`)
      .then((res) => setTimeSlot(res.data.docTimeSlots));
    setModalIsOpen(true);
  };
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <>
      <div className="ms-2">
        <div className="custom-card mt-2 mb-2 p-2">
          <h5 className="card-title">Doctor List</h5>
        </div>
        <div className="custom-card">
          <div className="doctor-list-container p-2 m-2">
            <div className="doctor-list-header">
              <div className="row">
                <div className="col-4 doc-list-logo-container">
                  <img
                    src={logo}
                    alt=""
                    className="img-fluid doc-list-logo d-inline"
                  />
                  <p className="doc-list-rating d-inline">
                    <i className="fas fa-star"></i> 4.8
                  </p>{" "}
                  <br />
                  <p className="doc-list-address mt-2">
                    <i className="fal fa-map-marker-alt ms-1"></i> 300 Grattan
                    Street Parkville, Victoria 3050 Australia{" "}
                  </p>
                  <p className="doc-list-address">
                    <i className="fal fa-phone-alt"></i> TEL. +61 3 9342 7000
                    FAX. +61 3 9342 7802{" "}
                  </p>
                </div>
                <div className="col-8 doc-list-image-container  d-flex justify-content-between">
                  <div className="doc-list-img-content w-100 me-3">
                    <img src={pic1} alt="" className="img-fluid" />
                  </div>
                  <div className="doc-list-img-content w-100 me-3">
                    <img src={pic2} alt="" className="img-fluid" />
                  </div>
                  <div className="doc-list-img-content w-100 me-3">
                    <img src={pic3} alt="" className="img-fluid" />
                  </div>
                  <div className="doc-list-img-content w-100 me-3">
                    <img src={pic4} alt="" className="img-fluid" />
                  </div>
                  <div className="doc-list-img-content w-100 me-3">
                    <img src={pic5} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            <div className="doctor-list-filter-container mt-4">
              <div className="doctor-list-filter-container row">
                <div className="doc-filter col-4">
                  <select
                    class="form-select form-select-sm"
                    id="autoSizingSelect"
                    value={doctorDepart}
                    onChange={(e) => setDoctorDepart(e.target.value)}
                  >
                    <option selected value={"depart"}>
                      All Department
                    </option>
                    {department.length > 0 &&
                      department.map((item) => (
                        <option value={item.departments_name} key={item.id}>
                          {item.departments_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="doc-filter col-4">
                  <select
                    class="form-select form-select-sm"
                    id="autoSizingSelect"
                    value={specialistDoc}
                    onChange={(e) => setSpecialistDoc(e.target.value)}
                  >
                    <option selected value={"special"}>
                      Specialist
                    </option>
                    {specialist.length > 0 &&
                      specialist.map((item) => (
                        <option value={item?.specialists_name} key={item.id}>
                          {item?.specialists_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="doc-filter col-4">
                  <select
                    class="form-select form-select-sm"
                    id="autoSizingSelect"
                    value={drName}
                    onChange={(e) => setDrName(e.target.value)}
                  >
                    <option selected value={"dr"}>
                      All doctor name
                    </option>
                    {sortedDoctorData.length > 0 &&
                      sortedDoctorData.map((item, i) => (
                        <option key={i} value={item.dr_given_name}>
                          {item.dr_given_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="doc-filter-status-container mt-5">
              <div className="row">
                <div className="col-md-3">
                  <div className="doc-filter-online ms-1 p-3">
                    <span className="online-icon">
                      <i className="fad fa-circle me-1"></i> Online
                    </span>
                    <span className="status-count float-end">52</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="doc-filter-offline ms-2 p-3">
                    <span className="offline-icon">
                      <i className="fad fa-circle me-1"></i> Offline
                    </span>
                    <span className="status-count float-end">25</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="doc-filter-onduty ms-2 p-3">
                    <span className="onduty-icon">
                      <i className="fad fa-circle me-1"></i> On Duty
                    </span>
                    <span className="status-count float-end">48</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="doc-filter-status-all ms-2 p-3">
                    <span className="status-all-icon">All Doctors</span>
                    <span className="status-count float-end">
                      {sortedDoctorData.length}
                    </span>
                  </div>
                </div>
              </div>
              {/* <span className="fav-read-more float-end mt-2 d-block clearfix" onClick={() => setDoctorDepart("depart") }>See All Doctors</span> <br /><br /> */}
              <span
                className="fav-read-more float-end mt-2 d-block clearfix"
                onClick={() => {
                  setDoctorDepart("depart");
                  setSpecialistDoc("special");
                  setDrName("dr");
                }}
              >
                See All Doctors
              </span>
              <br />
            </div>

            <div className="all-doc-list-card-container mt-3">
              {/* <div className="row icon-container " >
                                <div className="all-app-list-icon clearfix">
                                    <span  title="Print"><i onClick={handlePrint} className="float-end me-2 fas fa-print"></i></span>
                                    <span  title="Print"><i className="fal float-end me-2 fa-file-pdf"></i></span>
                                </div>
                            </div> */}
              <div className="row mt-2" ref={componentRef}>
                {sortedDoctorData.map((doctors, index) => {
                  return (
                    <div key={index} className="col-md-4 p-2">
                      <div
                        style={{
                          minHeight: "320px",
                          position: "relative",
                        }}
                        className="patient-card p-3 ms-3 me-4"
                      >
                        <div className="patient-card-icon clearfix">
                          <i
                            onClick={handleClick}
                            style={{ fontSize: "18px", cursor: "pointer" }}
                            patientId={doctors.id}
                            className="fas float-end me-1 fa-ellipsis-h"
                          ></i>
                          <Popper
                            id={id1}
                            open={open}
                            anchorEl={anchorEl}
                            placement={"bottom-end"}
                          >
                            <Box sx={{ p: 1, bgcolor: "#ffff" }}>
                              <div className="all-app-list-contact-popover">
                                <button onClick={handleProfile}>
                                  <i className="far fa-user me-1"></i> Profile
                                </button>
                                <button className="mb-3">
                                  {" "}
                                  <a
                                    style={{
                                      color: "#363636",
                                      textDecoration: "none",
                                    }}
                                    href={`tel: ${doctors.dr_mobile_phone}`}
                                  >
                                    <i className="far fa-phone-alt me-1"></i>{" "}
                                    Make Call
                                  </a>{" "}
                                </button>
                              </div>
                            </Box>
                          </Popper>
                        </div>
                        <div className="doc-list-doc-img">
                          <div className="row">
                            <div className="col-3">
                              <img
                                src={`${global.img_url}/doctors/images/${doctors.dr_images}`}
                                alt=""
                                className="img-fluid d-inline"
                              />
                            </div>
                            <div className="col-8 mt-2">
                              <h6 className="d-inline">{doctors.fullName}</h6>{" "}
                              <br />
                              {/* <span>{doctors.department.departments_name}</span> <br /> */}
                              <span>
                                {doctors.specialist?.specialists_name}
                              </span>{" "}
                              <br />
                            </div>
                          </div>
                        </div>
                        <div className="doc-list-doc-rating mt-3">
                          <p>
                            <span style={{ fontWeight: 500 }}>
                              Patient Treated:
                            </span>{" "}
                            283
                          </p>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt me-1"> </i>
                          <span style={{ fontWeight: 500 }}> 4.5</span>
                        </div>
                        <div className=" mt-3">
                          <p
                            title={
                              nullParser(doctors?.dr_about)
                                ? doctors?.dr_about
                                : ""
                            }
                          >
                            {nullParser(doctors?.dr_about)
                              ? doctors?.dr_about.length > 100
                                ? doctors?.dr_about.substring(0, 100) + "..."
                                : doctors?.dr_about
                              : ""}
                            {/* <span className="fav-read-more">Read More...</span> */}
                          </p>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                            right: "10px",
                          }}
                          className="patient-card-booking mt-4"
                        >
                          <button
                            onClick={() => openModal(doctors.id)}
                            class="patient-card-booking-app w-100"
                          >
                            Schedule
                          </button>
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                          >
                            <div className="d-flex justify-content-between mt-1">
                              <h6>Doctors Time Slot</h6>
                              <span
                                className="float-end"
                                style={{ fontSize: "15px", cursor: "pointer" }}
                                onClick={closeModal}
                              >
                                <i class="fal fa-times"></i>
                              </span>
                            </div>
                            <table class="table table-bordered mt-3">
                              <thead>
                                <tr>
                                  <th scope="col">SL</th>
                                  <th scope="col">Hospital</th>
                                  <th scope="col">Day</th>
                                  <th scope="col">Scehdule</th>
                                  <th scope="col">Month</th>
                                </tr>
                              </thead>
                              <tbody>
                                {timeSlot.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <th scope="row">{i + 1}</th>
                                      <td>{item.usual_provider_name}</td>
                                      <td>{item.day}</td>
                                      <td>
                                        {moment(item.slot_from).format("LT")} -{" "}
                                        {moment(item.slot_to).format("LT")}
                                        <span class="badge badge-success mx-1">
                                          {" "}
                                          {item.type}
                                        </span>
                                      </td>
                                      <td>{item.month}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </Modal>
                          <Link to="/main">
                            <button class="patient-card-booking-app w-100 mt-2">
                              Make Appointment
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="patietn-card-pagination text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item active"><a class="page-link" href="#">1</a></li>
                                    <li className="page-item"><a class="page-link" href="#">2</a></li>
                                    <li className="page-item"><a class="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
