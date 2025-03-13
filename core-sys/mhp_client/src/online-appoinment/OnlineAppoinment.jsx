import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../Style/Style.css";
import "../Style/Responsive.css";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import "../online-appoinment/OnlineAppointment.css";
import dayjs from "dayjs";
import Modal from "react-bootstrap/Modal";

const OnlineAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  console.log("appointmentDate", appointmentDate)
  const [startDateValue, setStartDateValue] = useState();
  const [page, setPage] = useState(1);

  const handleSubmit = () => {
    if (!slotsTime) {
      return swal("Warning", "Please selct a time slots", "warning");
    }
    if (selectedAppData?.reschedule_id !== null) {
      resuduleDataSave()
    } else {
      const data = {
        appID: selectedAppData?.id,
        patient_name: selectedAppData?.patients?.fullName,
        doctors_id: selectedAppData?.doctor_id,
        date: appointmentDate,
        patientId: selectedAppData?.patients?.id,
        patientMobile: selectedAppData?.patients?.patient_mobile_phone,
        startTime: slotsTime,
        app_type: selectedAppData?.appointment_type,
      };
      axios
        .post("/save-online-appointment-scheduler", data)
        .then(function (response) {
          swal("Success", response.data.message, "success");
          setupdateState(false);
          handleClose();
        })
        .catch(function (error) {
          console.log(error);
          swal("Error", "Something is wrong", "error");
        });
    }

  };

  const resuduleDataSave = () => {
    axios
      .post("/update-online-appointment-scheduler", {
        appID: selectedAppData?.id,
        rescheduleTime: slotsTime,
        rescheduleAppDate: appointmentDate,
        rescheduleId: selectedAppData?.reschedule_id,
      })
      .then(function (response) {
        swal("Success", response.data.message, "success");
        setupdateState(true);
        handleClose();
      })
      .catch(function (error) {
        swal("Error", "Something is wrong", "error");
      });
  };

  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => {
  //       func.apply(this, args);
  //     }, delay);
  //   };
  // };
  // const debouncedSearch = debounce(filterData, 300);
  let data = JSON.parse(localStorage.getItem("userData"));
  const handelInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const [slotsLoading, setslotsLoading] = useState(false);
  const [soltsData, setsoltsData] = useState();



  const [onlineAppDataAll, setonlineAppDataAll] = useState([]);
  const [onlineAppData, setonlineAppData] = useState([]);
  const [selectedAppData, setselectedAppData] = useState();
  const [updateState, setupdateState] = useState();
  const [appointmentType, setAppointmentType] = useState('');
  const userRaw = localStorage.getItem("userData");
  const user = JSON.parse(userRaw)
  console.log(user, "onlineAppDataAll")
  useEffect(() => {

    axios
      .post(`/online-appointment-list/${data.user_id}/16/1`, { userType: user?.user_type || 'Super_Admin' })
      .then((res) => {
        console.log("app Data", res.data.data.data);
        setonlineAppData(res.data.data.data);
        setonlineAppDataAll(res.data.data.data)
      });


  }, [updateState]);

  useEffect(() => {
    const controller = new AbortController();

    if (appointmentDate) {
      setslotsLoading(true);
      axios
        .get(
          `/doctor-time-slots/${selectedAppData?.doctor_id}/${appointmentDate}/${appointmentType}`,
          {
            signal: controller.signal,
          }
        )
        .then((res) => {
          setslotsLoading(false);
          setsoltsData(res.data);
        })
        .catch((err) => {
          setslotsLoading(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [appointmentDate]);

  const [slotsTime, setslotsTime] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setselectedAppData()
    setslotsTime()
    setAppointmentDate()
    setShow(false)
  };
  const handleShow = (type) => {
    setShow(true)
    setAppointmentType(type)
  };



  return (
    <>
      <div id="online-appointment">
        <div className="custom-card flex-grow-1 mx-2 mt-2">
          <h5 className="fw-normal &nbsp;text-start py-2 px-1 mb-2 text-login">
            Online Appointment
          </h5>
          <div className="online_appointment_heading"></div>
        </div>
        <div class="row custom-card p-2 mx-2">
          <div class="col-5">
            <TextField
              className="background_color_text_field search_style"
              label="Search"
              variant="outlined"
              onChange={(e) => {
                const name = e.target.value
                if (name.length > 0) {
                  const result = onlineAppDataAll.filter(item =>
                    item?.patients?.fullName.toLowerCase().includes(name.toLowerCase())
                  );
                  setonlineAppData(result)
                } else {
                  setonlineAppData(onlineAppDataAll)
                }
              }}
              size="small"
            />
          </div>
          <div class=" col-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DatePicker
                label="Start Date"
                onChange={(v) => setStartDateValue(v.$d)}
                slotProps={{ textField: { size: "small" } }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </div>
          <div class=" col-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DatePicker
                label="End Date"
                onChange={(v) => {

                  const sDate = moment(startDateValue).format("YYYY-MM-DD");
                  const eDate = moment(v.$d).format("YYYY-MM-DD");

                  if (sDate <= eDate) {
                    const result = onlineAppDataAll.filter(item =>
                      moment(item.date).format("YYYY-MM-DD") >= sDate && item.date <= eDate
                    );
                    setonlineAppData(result)
                  } else {
                    swal("warning", "End date must be greate then start date", "warning");

                  }

                }}
                slotProps={{ textField: { size: "small" } }}
                format="DD/MM/YYYY"
              />
            </LocalizationProvider>
          </div>
          <div class=" col-1">
            <div className="search_oniline_appointment_search_button">
              <Button
                onClick={() => {
                  setonlineAppData(onlineAppDataAll)
                }}
                className="patient-card-booking-app w-100 search_oniline_appointment_button"
              >
                all
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="">
            <div className="custom-card p-2 mx-2 cns-container">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" id="pills-family-tab-gd" data-bs-toggle="pill" data-bs-target="#pills-family-gd" type="button" role="tab" aria-controls="pills-family-gd" aria-selected="true">Telehealth</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-social-tab-gd" data-bs-toggle="pill" data-bs-target="#pills-social-gd" type="button" role="tab" aria-controls="pills-social-gd" aria-selected="false">Chamber</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-social-tab-clinic" data-bs-toggle="pill" data-bs-target="#pills-social-clinic" type="button" role="tab" aria-controls="pills-social-gd" aria-selected="false">Clinic</button>
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <div className="tab-content" id="pills-tabContent">

                <div className="tab-pane fade show active" id="pills-family-gd" role="tabpanel" aria-labelledby="pills-family-tab-gd">

                  <div className="row me-1">
                    <>
                      {onlineAppData?.filter((item) => item?.appointment_type == "Telehealth")
                        .filter((items) => items?.calling_type?.toLowerCase() !== 'clinic')
                        .map((items) => {

                          return (
                            <>
                              <div className="col-md-4 col-lg-3">
                                <div
                                  style={{
                                    height: "205px",
                                    overflow: "hidden",
                                    overflowY: "auto",
                                  }}
                                  className="g-doc-scroll patient-card p-3 ms-2 me-0"
                                >
                                  <div className="doc-list-doc-img">
                                    <div className="row">
                                      <div className="col-3">
                                        <img
                                          src={`${global.img_url}/images/files/${items?.patients?.patient_images}`}
                                          alt=""
                                          className="img-fluid d-inline"
                                        />
                                      </div>
                                      <div className="col-9">
                                        <h6 className="d-inline">
                                          {items?.patients?.fullName ?? " "}
                                          <br />
                                        </h6>
                                        <p className="d-inline">Doctor Fee : </p>
                                        {items?.doctors?.doctor_fee ?? " "}
                                        <br />
                                        <p className="d-inline">Phone:</p>
                                        {items?.transaction_phone_number ?? " "} <br />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="doc-list-doc-rating row">
                                    <div className="col-3">
                                      <p>Doctor :</p>
                                    </div>
                                    <div className="col-9">
                                      <p style={{ color: "#69B128" }}>
                                        {items?.doctors?.fullName ?? " "}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="doc-list-doc-rating row">
                                    <p className="col-6">

                                      Date: {
                                        items?.reschedule_id !== null ?
                                          moment(items?.date).format("DD/MM/YYYY") : ""
                                      }

                                      {/* {moment(items?.date).format("DD/MM/YYYY")} */}
                                    </p>
                                    {/* <p className="col-6">Time: {items?.patients?.mhp_appointment_scheduler[0]?.StartTime || '00:00 AM'}</p> */}

                                    {items?.reschedule_id !== null ? (
                                      <p className="col-6">
                                        Time:
                                        {moment(
                                          items?.schedule
                                            ?.StartTime
                                        )?.format("LT")}
                                      </p>
                                    ) : (
                                      <p className="col-6">Slots: {items?.time}</p>
                                    )}
                                  </div>
                                  <div className="doc-list-doc-rating row">
                                    <p className="col-6">
                                      Type: {items?.appointment_type}
                                    </p>
                                    <p className="col-6">
                                      Day: {moment(items?.date).format("dddd")}
                                    </p>
                                    {/* {items?.patients?.mhp_appointment_scheduler[0]
                ?.StartTime ? (
                <p className="col-6">
                  Date: {moment(time).format("dddd")}
                </p>
              ) : (
                <p className="col-6">
                  Date:{moment(Apptime).format("dddd")}
                </p>
              )} */}
                                  </div>

                                  <div className="patient-card-booking mt-1 d-flex">
                                    {items?.reschedule_id === null ? (
                                      <>
                                        <button
                                          type="button"
                                          className="patient-card-booking-app w-100 mt-2"
                                          onClick={() => {
                                            handleShow(items?.appointment_type);
                                            setselectedAppData(items);
                                            setAppointmentDate(moment(items.date).format("YYYY-MM-DD"));
                                          }}
                                        >
                                          Accept
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          className="patient-card-booking-app w-100 mt-2"
                                          data-bs-toggle="modal"
                                          onClick={() => {
                                            handleShow(items?.appointment_type);
                                            setselectedAppData(items);
                                            setAppointmentDate(moment(items?.schedule?.StartTime).format("YYYY-MM-DD"));
                                          }}
                                        >
                                          Reschedule
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </>
                  </div>
                </div>

                <div className="tab-pane fade" id="pills-social-gd" role="tabpanel" aria-labelledby="pills-social-tab-gd">
                  <div className="row me-1">
                    <>
                      {onlineAppData?.filter((item) => item?.appointment_type === "Chamber")
                        .filter((items) => items?.calling_type?.toLowerCase() !== 'clinic')
                        .map((items) => {

                          return (
                            <>
                              <div className="col-md-4 col-lg-3">
                                <div
                                  style={{
                                    height: "205px",
                                    overflow: "hidden",
                                    overflowY: "auto",
                                  }}
                                  className="g-doc-scroll patient-card p-3 ms-2 me-0"
                                >
                                  <div className="doc-list-doc-img">
                                    <div className="row">
                                      <div className="col-3">
                                        <img
                                          src={`${global.img_url}/images/files/${items?.patients?.patient_images}`}
                                          alt=""
                                          className="img-fluid d-inline"
                                        />
                                      </div>
                                      <div className="col-9">
                                        <h6 className="d-inline">
                                          {items?.patients?.fullName ?? " "}
                                          <br />
                                        </h6>
                                        <p className="d-inline">Doctor Fee : </p>
                                        {items?.doctors?.doctor_fee ?? " "}
                                        <br />
                                        <p className="d-inline">Phone:</p>
                                        {items?.transaction_phone_number ?? " "} <br />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="doc-list-doc-rating row">
                                    <div className="col-3">
                                      <p>Doctor :</p>
                                    </div>
                                    <div className="col-9">
                                      <p style={{ color: "#69B128" }}>
                                        {items?.doctors?.fullName ?? " "}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="doc-list-doc-rating row">
                                    <p className="col-6">

                                      Date: {
                                        items?.reschedule_id !== null ?
                                          moment(items?.date).format("DD/MM/YYYY") : ""
                                      }

                                      {/* {moment(items?.date).format("DD/MM/YYYY")} */}
                                    </p>
                                    {/* <p className="col-6">Time: {items?.patients?.mhp_appointment_scheduler[0]?.StartTime || '00:00 AM'}</p> */}

                                    {items?.reschedule_id !== null ? (
                                      <p className="col-6">
                                        Time:
                                        {moment(
                                          items?.schedule?.StartTime).format("LT")}
                                      </p>
                                    ) : (
                                      <p className="col-6">Slots: {items?.time}</p>
                                    )}
                                  </div>
                                  <div className="doc-list-doc-rating row">
                                    <p className="col-6">
                                      Type: {items?.appointment_type}
                                    </p>
                                    <p className="col-6">
                                      Day: {moment(items?.date).format("dddd")}
                                    </p>
                                  </div>

                                  <div className="patient-card-booking mt-1 d-flex">
                                    {items?.reschedule_id === null ? (
                                      <>
                                        <button
                                          type="button"
                                          className="patient-card-booking-app w-100 mt-2"
                                          onClick={() => {
                                            handleShow(items?.appointment_type);
                                            setselectedAppData(items);
                                            setAppointmentDate(moment(items.date).format("YYYY-MM-DD"));
                                          }}
                                        >
                                          Accept
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          className="patient-card-booking-app w-100 mt-2"
                                          data-bs-toggle="modal"
                                          onClick={() => {
                                            handleShow(items?.appointment_type);
                                            setselectedAppData(items);
                                            setAppointmentDate(moment(items?.schedule?.StartTime).format("YYYY-MM-DD"));
                                          }}
                                        >
                                          Reschedule
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </>
                  </div>
                </div>
                <div className="tab-pane fade" id="pills-social-clinic" role="tabpanel" aria-labelledby="pills-social-tab-clinic">
                  <div className="row me-1">
                    <>
                      {onlineAppData?.filter((item) => item?.calling_type?.toLowerCase() === "clinic").map((items) => {

                        return (
                          <>
                            <div className="col-md-4 col-lg-3">
                              <div
                                style={{
                                  height: "205px",
                                  overflow: "hidden",
                                  overflowY: "auto",
                                }}
                                className="g-doc-scroll patient-card p-3 ms-2 me-0"
                              >
                                <div className="doc-list-doc-img">
                                  <div className="row">
                                    <div className="col-3">
                                      <img
                                        src={`${global.img_url}/images/files/${items?.patients?.patient_images}`}
                                        alt=""
                                        className="img-fluid d-inline"
                                      />
                                    </div>
                                    <div className="col-9">
                                      <h6 className="d-inline">
                                        {items?.patients?.fullName ?? " "}
                                        <br />
                                      </h6>
                                      <p className="d-inline">Doctor Fee : </p>
                                      {items?.doctors?.doctor_fee ?? " "}
                                      <br />
                                      <p className="d-inline">Phone:</p>
                                      {items?.transaction_phone_number ?? " "} <br />
                                    </div>
                                  </div>
                                </div>

                                <div className="doc-list-doc-rating row">
                                  <div className="col-3">
                                    <p>Doctor :</p>
                                  </div>
                                  <div className="col-9">
                                    <p style={{ color: "#69B128" }}>
                                      {items?.doctors?.fullName ?? " "}
                                    </p>
                                  </div>
                                </div>

                                <div className="doc-list-doc-rating row">
                                  <p className="col-6">

                                    Date: {
                                      items?.reschedule_id !== null ?
                                        moment(items?.date).format("DD/MM/YYYY") : ""
                                    }

                                  </p>
                                  {items?.reschedule_id !== null ? (
                                    <p className="col-6">
                                      Time:
                                      {moment(
                                        items?.schedule?.StartTime).format("LT")}
                                    </p>
                                  ) : (
                                    <p className="col-6">Slots: {items?.time}</p>
                                  )}
                                </div>
                                <div className="doc-list-doc-rating row">
                                  <p className="col-6">
                                    Type: {items?.appointment_type}
                                  </p>
                                  <p className="col-6">
                                    Day: {moment(items?.date).format("dddd")}
                                  </p>

                                </div>

                                <div className="patient-card-booking mt-1 d-flex">
                                  {items?.reschedule_id === null ? (
                                    <>
                                      <button
                                        type="button"
                                        className="patient-card-booking-app w-100 mt-2"
                                        onClick={() => {
                                          handleShow(items?.appointment_type);
                                          setselectedAppData(items);
                                          setAppointmentDate(moment(items.date).format("YYYY-MM-DD"));
                                        }}
                                      >
                                        Accept
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        className="patient-card-booking-app w-100 mt-2"
                                        data-bs-toggle="modal"
                                        onClick={() => {
                                          handleShow(items?.appointment_type);
                                          setselectedAppData(items);
                                          setAppointmentDate(moment(items?.schedule?.StartTime).format("YYYY-MM-DD"));
                                        }}
                                      >
                                        Reschedule
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ padding: "10px 10px" }} closeButton>
          <h6>{selectedAppData?.reschedule_id ? "Reschedule an" : "Create an"} appointment</h6>
        </Modal.Header>
        <div className="appointment_modal_body">
          <div className="row">
            <div className="col-12">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // label={moment(appointmentDate).format("DD/MM/YYYY")}
                  label="Appointment date"
                  onChange={(v) => {
                    setAppointmentDate(moment(v.$d).format("YYYY-MM-DD"));
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      helperText:
                        appointmentDate &&
                        moment(appointmentDate).format("dddd, MMMM D, YYYY"),
                    },
                  }}
                  sx={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  defaultValue={dayjs(appointmentDate)}
                />
              </LocalizationProvider>
            </div>
            <div className="doc-app-schedule-slots">
              <div class="d-flex align-items-start mt-2">
                <div
                  style={{ height: "10rem" }}
                  className="d-flex align-items-center"
                >
                  <div
                    class="nav flex-column nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Morning
                    </button>
                    <button
                      class="nav-link"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Evening
                    </button>
                  </div>
                </div>

                <div class="tab-content" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <nav>
                      <div
                        class="nav nav-pills"
                        style={{ marginLeft: "5rem" }}
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          class="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Available
                        </button>
                        <button
                          class="nav-link"
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          Booked
                        </button>
                        <button
                          class="nav-link"
                          id="nav-contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-contact"
                          type="button"
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                        >
                          All
                        </button>
                      </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                      <div
                        class=" tab-pane fade show active"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        {slotsLoading ? (
                          <p>Loading...</p>
                        ) : soltsData?.mData.length > 0 ? (
                          soltsData?.mData
                            ?.filter((i) => i.status === "available")
                            .map((v, i) => (
                              <div
                                key={i}
                                onClick={() => {
                                  setslotsTime(v.slots);
                                }}
                                className={`${slotsTime === v.slots
                                  ? "slots-pill active"
                                  : "slots-pill"
                                  }`}
                              >
                                {v.slots}
                              </div>
                            ))
                        ) : (
                          <p className="no-data-found-slots">No data found</p>
                        )}
                      </div>
                      <div
                        class="tab-pane fade"
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        {slotsLoading ? (
                          <p>Loading...</p>
                        ) : soltsData?.mData.length > 0 ? (
                          soltsData?.mData
                            ?.filter((i) => i.status === "booked")
                            .map((v, i) => (
                              <div className="slots-pill booked">{v.slots}</div>
                            ))
                        ) : (
                          <p className="no-data-found-slots">No data found</p>
                        )}
                      </div>
                      <div
                        class="tab-pane fade"
                        id="nav-contact"
                        role="tabpanel"
                        aria-labelledby="nav-contact-tab"
                      >
                        {slotsLoading ? (
                          <p>Loading...</p>
                        ) : soltsData?.mData.length > 0 ? (
                          soltsData?.mData?.map((v, i) => (
                            <div
                              className={`slots-pill ${v.status === "booked"
                                ? "booked"
                                : v.slots === slotsTime && "active"
                                }`}
                              onClick={() => {
                                if (v.status !== "booked") {
                                  setslotsTime(v.slots);
                                } else {
                                  swal("warning", "Already booked this slots", "warning");
                                }

                              }}
                            >
                              {v.slots}
                            </div>
                          ))
                        ) : (
                          <p className="no-data-found-slots">No data found</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <nav>
                      <div
                        class="nav nav-pills"
                        style={{ marginLeft: "5rem" }}
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          class="nav-link active"
                          id="nav-e-avialable-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-e-avialable"
                          type="button"
                          role="tab"
                          aria-controls="nav-e-avialable"
                          aria-selected="true"
                        >
                          Available
                        </button>
                        <button
                          class="nav-link"
                          id="nav-e-booked-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-e-booked"
                          type="button"
                          role="tab"
                          aria-controls="nav-e-booked"
                          aria-selected="false"
                        >
                          Booked
                        </button>
                        <button
                          class="nav-link"
                          id="nav-e-all-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-e-all"
                          type="button"
                          role="tab"
                          aria-controls="nav-e-all"
                          aria-selected="false"
                        >
                          All
                        </button>
                      </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                      <div
                        class=" tab-pane fade show active"
                        id="nav-e-avialable"
                        role="tabpanel"
                        aria-labelledby="nav-e-avialable-tab"
                      >
                        {slotsLoading ? (
                          <p>Loading...</p>
                        ) : soltsData?.eData.length > 0 ? (
                          soltsData?.eData
                            ?.filter((i) => i.status === "available")
                            .map((v, i) => (
                              <div
                                key={i}
                                onClick={() => {
                                  setslotsTime(v.slots);
                                }}
                                className={`${slotsTime === v.slots
                                  ? "slots-pill active"
                                  : "slots-pill"
                                  }`}
                              >
                                {v.slots}
                              </div>
                            ))
                        ) : (
                          <p className="no-data-found-slots">No data found</p>
                        )}
                      </div>
                      <div
                        class="tab-pane fade"
                        id="nav-e-booked"
                        role="tabpanel"
                        aria-labelledby="nav-e-booked-tab"
                      >
                        {slotsLoading ? (
                          <p>Loading...</p>
                        ) : soltsData?.eData.length > 0 ? (
                          soltsData?.eData
                            ?.filter((i) => i.status === "booked")
                            .map((v, i) => (
                              <div className="slots-pill booked">{v.slots}</div>
                            ))
                        ) : (
                          <p className="no-data-found-slots">No data found</p>
                        )}
                      </div>
                      <div
                        class="tab-pane fade"
                        id="nav-e-all"
                        role="tabpanel"
                        aria-labelledby="nav-e-all-tab"
                      >
                        {slotsLoading ? (
                          <p>Loading...</p>
                        ) : soltsData?.eData.length > 0 ? (
                          soltsData?.eData?.map((v, i) => (
                            <div
                              className={`slots-pill ${v.status === "booked"
                                ? "booked"
                                : v.slots === slotsTime && "active"
                                }`}
                              onClick={() => {
                                if (v.status !== "booked") {
                                  setslotsTime(v.slots);
                                } else {
                                  swal("warning", "Already booked this slots", "warning");
                                }
                              }}
                            >
                              {v.slots}
                            </div>
                          ))
                        ) : (
                          <p className="no-data-found-slots">No data found</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex">
          <button
            type="button"
            className="patient_modal_cancel_button"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="patient-card-booking-app"
            onClick={handleSubmit}
          >
            Save changes
          </button>
        </div>
      </Modal>
    </>
  );
};

export default OnlineAppointment;
