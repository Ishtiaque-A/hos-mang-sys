import React, { useState, useEffect, useRef } from "react";
import "./AddNewPatient.css";
import NoImages from "../../../Images/dummy_images.svg";
import { useReactToPrint } from "react-to-print";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import axios from "axios";

import { Link } from "react-router-dom";
import "../../../imageUrl";
import moment from "moment";
import { nullParser } from "../../../utils/null-parser";

const PatientProfile = () => {
  var url = window.location.href;
  var urlsplit = url.split("/");
  var lastpart = urlsplit[urlsplit.length - 1];
  if (lastpart === "") {
    lastpart = urlsplit[urlsplit.length - 2];
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState([]);

  const [currentappointments, setAppointments] = useState([]);

  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(
    []
  );
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [previousAppointmentsCount, setPreviousAppointmentsCount] = useState(
    []
  );
  const [vitalsignInfo, setVitalsignInfo] = useState([]);

  console.log(upcomingAppointments, "pp");
  useEffect(() => {
    axios.get(`/patients-profile/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setPatient(res.data.patients_details);
        setAppointments(res.data.appointments);
      }
    });
    axios.get(`/todays-patientappointment/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setTodaysAppointments(res.data.todaysPatientAppointments);
      }
    });
    axios.get(`/upcoming-patientappointment/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setUpcomingAppointmentsCount(res.data.totalUpcomingLists);
        setUpcomingAppointments(res.data.upcomingPatientAppointments);
      }
    });
    axios.get(`/patientcompleted-appointment/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setPreviousAppointmentsCount(res.data.totalCompletedLists);
        setPreviousAppointments(res.data.completedPatientAppointments);
      }
    });
    axios.get(`/get-all-vital-signs/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setVitalsignInfo(res.data.Patients_Vitalsigns_Info);
      }
    });
  }, []);

  return (
    <>
      <div className="ms-2">
        <div className="custom-card mt-2">
          <div className="row">
            <div className="col-md-6">
              <h5 className="mt-1 ms-1"> Patient Profile </h5>
            </div>
            <div className="col-md-6 icon-container">
              {/* <button className='view-icon icon-btn me-3 float-end'>
                                    <i className="far fa-file-pdf"></i>
                                </button> */}
              <button
                onClick={handlePrint}
                className="view-icon icon-btn float-end"
              >
                <i className="fal fa-print"></i>
              </button>

              <button className="view-icon  icon-btn float-end">
                <Link
                  to={`/edit-patients/${lastpart}`}
                  className="text-decoration-none"
                >
                  {" "}
                  <i className="fal fa-edit"></i>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mt-2">
            <div className="appointment-container custom-card">
              <h6 className="ms-3">Appointments</h6>
              <div className="row">
                <div className="col-6 text-center">
                  <span className="appointment-counter d-block">
                    {previousAppointmentsCount}
                  </span>
                  <p> Previous </p>
                </div>
                <div className="col-6 text-center">
                  <span className="appointment-counter d-block">
                    {upcomingAppointmentsCount}
                  </span>
                  <p> Upcoming </p>
                </div>
              </div>
              <h6 className="ms-3 appointment-heading mt-2"> Today </h6>
              <div className="today-container ms-3">
                <Timeline>
                  {todaysAppointments?.map((item, i) => {
                    console.log("todays", item);
                    return (
                      <TimelineItem key={i}>
                        <TimelineSeparator>
                          <TimelineDot variant="outlined" color="secondary" />
                          {todaysAppointments.length - 1 !== i && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="">
                            <small>{moment(item.StartTime).format("LT")}</small>
                            <p className="d-inline ms-3">
                              {item?.dr_given_name} {item?.dr_middle_name}{" "}
                              {item?.dr_last_name}
                            </p>{" "}
                            <br />
                            <small className="float-end appointment-date">
                              {moment().format("MMMM Do YYYY")}
                            </small>{" "}
                            <br />
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </div>
              <h6 className="ms-3 appointment-heading">UPCOMING </h6>
              <div className="today-container ms-3">
                <Timeline>
                  {upcomingAppointments?.map((item, i) => {
                    return (
                      <TimelineItem key={i}>
                        <TimelineSeparator>
                          <TimelineDot variant="outlined" color="warning" />
                          {upcomingAppointments.length - 1 !== i && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="">
                            <small>{moment(item.StartTime).format("LT")}</small>
                            <p className="d-inline ms-3">
                              {nullParser(item?.dr_given_name)
                                ? item?.dr_given_name
                                : ""}{" "}
                              {nullParser(item?.dr_middle_name)
                                ? item?.dr_middle_name
                                : ""}{" "}
                              {nullParser(item?.dr_last_name)
                                ? item?.dr_last_name
                                : ""}
                            </p>{" "}
                            <br />
                            <small className="float-end appointment-date">
                              {moment(item.StartTime).format("MMMM Do YYYY")}
                            </small>{" "}
                            <br />
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </div>
              <h6 className="appointment-heading ms-3">Past Visited </h6>
              <div className="today-container mb-2 ms-3">
                <Timeline>
                  {previousAppointments?.map((item, i) => {
                    return (
                      <TimelineItem key={i}>
                        <TimelineSeparator>
                          <TimelineDot variant="outlined" color="success" />
                          {previousAppointments.length - 1 !== i && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="" key={i}>
                            <small>{moment(item.StartTime).format("LT")}</small>
                            <p className="d-inline ms-3">
                              {item?.dr_given_name} {item?.dr_middle_name}{" "}
                              {item?.dr_last_name}
                            </p>{" "}
                            <br />
                            <small className="float-end appointment-date">
                              {moment(item.StartTime).format("MMMM Do YYYY")}
                            </small>{" "}
                            <br />
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              </div>
            </div>
          </div>
          <div ref={componentRef} className="col-md-9 mt-2">
            <div className="for-print text-center">
              <h5 className="mt-2 mb-3">Patients Profile</h5>
            </div>
            <div className="personal-info custom-card">
              <div className="row">
                <h6 className="mt-2 p-info-header"> Personal details </h6>
                <div className="col-3 text-center basic-info-container">
                  <div className="custom-card p-2">
                    {patient.patient_images === "" ? (
                      <img src={NoImages} className="mb-3 img-fluid" />
                    ) : (
                      <img
                        className="mb-2 img-fluid"
                        src={`${global.img_url}/images/files/${patient?.patient_images}`}
                      />
                    )}
                    <h6 className="">{patient?.fullName}</h6>
                  </div>
                </div>
                <div className="col-9">
                  <div className="row family-info">
                    <div className="col-3">
                      {patient.patient_status == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Status : </span>
                          <p>{patient.statuses.status_name}</p>
                        </div>
                      )}

                      {patient.patient_hn_number == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>HN : </span>
                          <p>{patient.patient_hn_number}</p>
                        </div>
                      )}

                      {patient.patient_dob == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>DOB : </span>
                          <p>
                            {moment(patient?.patient_dob).format("DD/MM/YYYY")}
                          </p>
                        </div>
                      )}

                      {patient.patient_birth_sex_id == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Gender : </span>
                          <p>{patient?.patient_birth_sex?.birth_sex_name}</p>
                        </div>
                      )}
                    </div>
                    <div className="col-5">
                      {patient.patient_head_of_family == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Head of Family : </span>
                          <p>{patient.patient_head_of_family}</p>
                        </div>
                      )}

                      {patient.patient_religion_id == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Religion</span>
                          <p>{patient.religion.religion_name}</p>
                        </div>
                      )}

                      {patient.patient_nid == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>NID/Smart ID</span>
                          <p>{patient.patient_nid}</p>
                        </div>
                      )}
                      {patient.patient_parent_id == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Parent NID/Smart ID</span>
                          <p>{patient.patient_parent_id}</p>
                        </div>
                      )}
                    </div>
                    <div className="col-4">
                      {patient.patient_ethnicity_id == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Ethnicity : </span>
                          <p>{patient.ethnicity.ethnicity_name}</p>
                        </div>
                      )}
                      {patient.patient_passport == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Patient Passport ID : </span>
                          <p>{patient.patient_passport}</p>
                        </div>
                      )}

                      {patient.patient_status == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Patient Status :</span>
                          <p>{patient.statuses.status_name}</p>
                        </div>
                      )}
                      {patient.patient_occupation_id == null ? (
                        ""
                      ) : (
                        <div className="d-flex">
                          <span>Occupation : </span>
                          <p>{patient.occupation.occupation_name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="all-details custom-card mt-2 p-2">
              <ul className="nav nav-pills mb-2" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    All
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Contacts
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Address
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab1"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact1"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact1"
                    aria-selected="false"
                  >
                    Medicare Info
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab2"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact2"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact2"
                    aria-selected="false"
                  >
                    Notes
                  </button>
                </li>
              </ul>

              <div className="all-details-card custom-card mb-2">
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="contacts row mb-2">
                      <h6 className="p-info-header">Contacts</h6>
                      <div className="col-4">
                        {patient.patient_contact_via == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Contact Via : </span>
                            <p>{patient.contact_via.contact_via_name}</p>
                          </div>
                        )}
                        {patient.patient_home_phone == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Home Phone : </span>
                            <p>{patient.patient_home_phone}</p>
                          </div>
                        )}
                        {patient.patient_work_phone == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Work Phone : </span>
                            <p>{patient.patient_work_phone}</p>
                          </div>
                        )}
                        {patient.patient_mobile_phone == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Mobile Phone : </span>
                            <p>{patient.patient_mobile_phone}</p>
                          </div>
                        )}
                        {patient.patient_emergency_contact == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Emergency Contact : </span>
                            <p>{patient.patient_emergency_contact}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_email == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Email Address : </span>
                            <p>{patient.patient_email}</p>
                          </div>
                        )}

                        {patient.patient_dob == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Date of Birth : </span>
                            <p>
                              {moment(patient?.patient_dob).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        )}

                        {patient.patient_birth_sex_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Gender : </span>
                            <p>{patient?.patient_birth_sex?.birth_sex_name}</p>
                          </div>
                        )}

                        {patient.patient_nid == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>NID/Smart ID : </span>
                            <p>{patient.patient_nid}</p>
                          </div>
                        )}
                        {patient.patient_parent_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Parent NID/Smart ID : </span>
                            <p>{patient.patient_parent_id}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_religion_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Religion : </span>
                            <p>{patient.religion.religion_name}</p>
                          </div>
                        )}
                        {patient.patient_ethnicity_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Ethnicity : </span>
                            <p>{patient.ethnicity.ethnicity_name}</p>
                          </div>
                        )}
                        {patient.patient_passport == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Passport ID : </span>
                            <p>{patient.patient_passport}</p>
                          </div>
                        )}
                        {patient.patient_status == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Status : </span>
                            <p>{patient.statuses.status_name}</p>
                          </div>
                        )}

                        {patient.patient_occupation_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Occupation : </span>
                            <p>{patient.occupation.occupation_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="contacts row mb-2">
                      <h6 className="p-info-header">Address</h6>
                      <div className="col-4">
                        {patient.patient_address1 == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Address Line 1 : </span>
                            <p>{patient.patient_address1}</p>
                          </div>
                        )}
                        {patient.patient_address2 == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Address Line 2 : </span>
                            <p>{patient.patient_address2}</p>
                          </div>
                        )}
                        {patient.patient_city_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>City : </span>
                            <p>{patient.city.city_name}</p>
                          </div>
                        )}
                        {patient.patient_state_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>State : </span>
                            <p>{patient.state.state_name}</p>
                          </div>
                        )}
                        {patient.patient_postal_code == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Postal/Zip Code : </span>
                            <p>{patient.patient_postal_code}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_head_of_family == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Head of Family : </span>
                            <p>{patient.patient_head_of_family}</p>
                          </div>
                        )}
                        {patient.patient_dob == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Date of Birth : </span>
                            <p>
                              {moment(patient?.patient_dob).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        )}
                        {patient.patient_birth_sex_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Gender : </span>
                            <p>{patient?.patient_birth_sex?.birth_sex_name}</p>
                          </div>
                        )}
                        {patient.patient_nid == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>NID/Smart ID : </span>
                            <p>{patient.patient_nid}</p>
                          </div>
                        )}
                        {patient.patient_parent_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Parent NID/Smart ID : </span>
                            <p>{patient.patient_parent_id}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_religion_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Religion : </span>
                            <p>{patient.religion.religion_name}</p>
                          </div>
                        )}
                        {patient.patient_ethnicity_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Ethnicity : </span>
                            <p>{patient.ethnicity.ethnicity_name}</p>
                          </div>
                        )}
                        {patient.patient_passport == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Passport ID : </span>
                            <p>{patient.patient_passport}</p>
                          </div>
                        )}
                        {patient.patient_status == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Status : </span>
                            <p>{patient.statuses.status_name}</p>
                          </div>
                        )}
                        {patient.patient_occupation_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Occupation : </span>
                            <p>{patient.occupation.occupation_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="contacts row mb-4">
                      <h6 className="p-info-header">Medicare Info : </h6>
                      <div className="col-4">
                        {patient.patient_individual_health_identifier_no ==
                        null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Health Inc No. : </span>
                            <p>
                              {patient.patient_individual_health_identifier_no}
                            </p>
                          </div>
                        )}
                        {patient.patient_medical_record_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Medicare No. : </span>
                            <p>{patient.patient_medical_record_no}</p>
                          </div>
                        )}
                        {patient.patient_hcc_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>HCC No. : </span>
                            <p>{patient.patient_hcc_no}</p>
                          </div>
                        )}
                        {patient.patient_individual_health_identifier_no ==
                        null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>
                              Individual health identifier (IHI) No. :{" "}
                            </span>
                            <p>
                              {patient.patient_individual_health_identifier_no}
                            </p>
                          </div>
                        )}
                        {patient.patient_health_inc_fund == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Health Inc Fund</span>
                            <p>{patient.patient_health_inc_fund}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_medical_record_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Medical Record No (MRN) : </span>
                            <p>{patient.patient_medical_record_no}</p>
                          </div>
                        )}
                        {patient.patient_safety_net_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Safety Net No. : </span>
                            <p>{patient.patient_safety_net_no}</p>
                          </div>
                        )}
                        {patient.patient_next_of_kin == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Next of KIN : </span>
                            <p>{patient.patient_next_of_kin}</p>
                          </div>
                        )}
                        {patient.patient_usual_provider_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Usual Provider : </span>
                            <p>{patient.usual_provider?.usual_provider_name}</p>
                          </div>
                        )}
                        {patient.patient_usual_account == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Usual Account : </span>
                            <p>{patient?.usual_account?.usual_account_name}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_expire_date == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Expire Date : </span>
                            <p>{patient.patient_expire_date}</p>
                          </div>
                        )}
                        {patient.patient_ethnicity_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Ethnicity : </span>
                            <p>{patient.ethnicity.ethnicity_name}</p>
                          </div>
                        )}
                        {patient.patient_passport == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Passport ID : </span>
                            <p>{patient.patient_passport}</p>
                          </div>
                        )}
                        {patient.patient_status == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Status : </span>
                            <p>{patient.statuses.status_name}</p>
                          </div>
                        )}
                        {patient.patient_occupation_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Occupation : </span>
                            <p>{patient.occupation.occupation_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="contacts row ">
                      <h6 className="p-info-header">Notes</h6>
                      <div className="col-6">
                        {patient.patient_general_notes == null ? (
                          ""
                        ) : (
                          <div>
                            <span>General Notes : </span>
                            <p>{patient.patient_general_notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        {patient.patient_appointment_notes == null ? (
                          ""
                        ) : (
                          <div>
                            <span>Appointment Notes : </span>
                            <p>{patient.patient_appointment_notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div className="contacts row mb-4">
                      <h6 className="p-info-header">Contacts</h6>
                      <div className="col-4">
                        {patient.patient_contact_via == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Contact Via : </span>
                            <p>{patient.contact_via.contact_via_name}</p>
                          </div>
                        )}
                        {patient.patient_home_phone == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Home Phone : </span>
                            <p>{patient.patient_home_phone}</p>
                          </div>
                        )}
                        {patient.patient_work_phone == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Work Phone : </span>
                            <p>{patient.patient_work_phone}</p>
                          </div>
                        )}
                        {patient.patient_mobile_phone == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Mobile Phone : </span>
                            <p>{patient.patient_mobile_phone}</p>
                          </div>
                        )}
                        {patient.patient_emergency_contact == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Emergency Contact : </span>
                            <p>{patient.patient_emergency_contact}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_email == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Email Address : </span>
                            <p>{patient.patient_email}</p>
                          </div>
                        )}
                        {patient.patient_dob == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Date of Birth : </span>
                            <p>
                              {moment(patient?.patient_dob).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        )}
                        {patient.patient_birth_sex_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Gender : </span>
                            <p>{patient?.patient_birth_sex?.birth_sex_name}</p>
                          </div>
                        )}
                        {patient.patient_nid == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>NID/Smart ID : </span>
                            <p>{patient.patient_nid}</p>
                          </div>
                        )}
                        {patient.patient_parent_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Parent NID/Smart ID : </span>
                            <p>{patient.patient_parent_id}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_religion_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Religion : </span>
                            <p>{patient.religion.religion_name}</p>
                          </div>
                        )}
                        {patient.patient_ethnicity_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Ethnicity : </span>
                            <p>{patient.ethnicity.ethnicity_name}</p>
                          </div>
                        )}
                        {patient.patient_passport == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Passport ID : </span>
                            <p>{patient.patient_passport}</p>
                          </div>
                        )}
                        {patient.patient_status == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Status : </span>
                            <p>{patient.statuses.status_name}</p>
                          </div>
                        )}
                        {patient.patient_occupation_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Occupation : </span>
                            <p>{patient.occupation.occupation_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div className="contacts row mb-4">
                      <h6 className="p-info-header">Address</h6>
                      <div className="col-4">
                        {patient.patient_address1 == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Address Line 1 : </span>
                            <p>{patient.patient_address1}</p>
                          </div>
                        )}
                        {patient.patient_address2 == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Address Line 2 : </span>
                            <p>{patient.patient_address2}</p>
                          </div>
                        )}
                        {patient.patient_city_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>City : </span>
                            <p>{patient.city.city_name}</p>
                          </div>
                        )}
                        {patient.patient_state_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>State : </span>
                            <p>{patient.state.state_name}</p>
                          </div>
                        )}
                        {patient.patient_postal_code == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Postal/Zip Code : </span>
                            <p>{patient.patient_postal_code}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_head_of_family == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Head of Family : </span>
                            <p>{patient.patient_head_of_family}</p>
                          </div>
                        )}
                        {patient.patient_dob == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Date of Birth : </span>
                            <p>
                              {moment(patient?.patient_dob).format(
                                "DD/MM/YYYY"
                              )}
                            </p>
                          </div>
                        )}
                        {patient.patient_birth_sex_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Gender : </span>
                            <p>{patient?.patient_birth_sex?.birth_sex_name}</p>
                          </div>
                        )}
                        {patient.patient_nid == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>NID/Smart ID : </span>
                            <p>{patient.patient_nid}</p>
                          </div>
                        )}
                        {patient.patient_parent_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Parent NID/Smart ID : </span>
                            <p>{patient.patient_parent_id}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_religion_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Religion : </span>
                            <p>{patient.religion.religion_name}</p>
                          </div>
                        )}
                        {patient.patient_ethnicity_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Ethnicity : </span>
                            <p>{patient.ethnicity.ethnicity_name}</p>
                          </div>
                        )}
                        {patient.patient_passport == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Passport ID : </span>
                            <p>{patient.patient_passport}</p>
                          </div>
                        )}
                        {patient.patient_status == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Status : </span>
                            <p>{patient.statuses.status_name}</p>
                          </div>
                        )}
                        {patient.patient_occupation_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Occupation : </span>
                            <p>{patient.occupation.occupation_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact1"
                    role="tabpanel1"
                    aria-labelledby="pills-contact-tab1"
                  >
                    <div className="contacts row mb-4">
                      <h6 className="p-info-header">Medicare Info</h6>
                      <div className="col-4">
                        {patient.patient_health_inc_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Health Inc No. : </span>
                            <p>{patient.patient_health_inc_no}</p>
                          </div>
                        )}
                        {patient.patient_medical_record_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Medicare No. : </span>
                            <p>{patient.patient_medical_record_no}</p>
                          </div>
                        )}
                        {patient.patient_hcc_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>HCC No. : </span>
                            <p>{patient.patient_hcc_no}</p>
                          </div>
                        )}
                        {patient.patient_individual_health_identifier_no ==
                        null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>
                              Individual health identifier (IHI) No. :{" "}
                            </span>
                            <p>
                              {patient.patient_individual_health_identifier_no}
                            </p>
                          </div>
                        )}
                        {patient.patient_health_inc_fund == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Health Inc Fund : </span>
                            <p>{patient.patient_health_inc_fund}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_medical_record_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Medical Record No (MRN) : </span>
                            <p>{patient.patient_medical_record_no}</p>
                          </div>
                        )}
                        {patient.patient_safety_net_no == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Safety Net No. : </span>
                            <p>{patient.patient_safety_net_no}</p>
                          </div>
                        )}
                        {patient.patient_next_of_kin == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Next of KIN : </span>
                            <p>{patient.patient_next_of_kin}</p>
                          </div>
                        )}
                        {patient.patient_usual_provider_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Usual Provider : </span>
                            <p>{patient.usual_provider?.usual_provider_name}</p>
                          </div>
                        )}
                        {patient.patient_usual_account == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Usual Account : </span>
                            <p>{patient.usual_account?.usual_account_name}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-4">
                        {patient.patient_expire_date == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Expire Date : </span>
                            <p>{patient.patient_expire_date}</p>
                          </div>
                        )}
                        {patient.patient_ethnicity_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Ethnicity : </span>
                            <p>{patient.ethnicity?.ethnicity_name}</p>
                          </div>
                        )}
                        {patient.patient_passport == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Passport ID : </span>
                            <p>{patient.patient_passport}</p>
                          </div>
                        )}
                        {patient.patient_status == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Patient Status : </span>
                            <p>{patient.statuses?.status_name}</p>
                          </div>
                        )}
                        {patient.patient_occupation_id == null ? (
                          ""
                        ) : (
                          <div className="d-flex">
                            <span>Occupation : </span>
                            <p>{patient.occupation?.occupation_name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact2"
                    role="tabpanel2"
                    aria-labelledby="pills-contact-tab2"
                  >
                    <div className="contacts row mb-4">
                      <h6 className="p-info-header">Notesss</h6>
                      <div className="col-6">
                        {patient.patient_general_notes == null ? (
                          ""
                        ) : (
                          <div>
                            <span>General Notes : </span>
                            <p>{patient.patient_general_notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        {patient.patient_appointment_notes == null ? (
                          ""
                        ) : (
                          <div>
                            <span>Appointment Notes : </span>
                            <p>{patient.patient_appointment_notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientProfile;
