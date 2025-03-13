import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import swal from "sweetalert";
import "./DoctorChamber.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { nullParser } from "../../../utils/null-parser";

function DoctorsChamber() {
  const [allTimeList, setAllTimeList] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [allTimeListMain, setAllTimeListMain] = useState([]);
  const [doctorValue, setDoctorValue] = useState("all");
  const [slotFromError, setSlotFromError] = useState();
  const [slotToError, setSlotToError] = useState();
  const [statusError, setStatusError] = useState();
  const [loading, setLoading] = useState();
  const [timeSlotError, setTimeSlotError] = useState();
  const [date, setDate] = useState();
  const [emergency, setEmergency] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 3,
    px: 4,
    pb: 3,
  };

  const buttonDesign = {
    backgroundColor: "#69B128",
    color: "#fff",
  };

  const buttonDesignCancel = {
    backgroundColor: "red",
    color: "#fff",
  };
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    axios.post(`/doctor-chamber-all/${user?.user_id}`, { userType: user?.user_type }).then((res) => {
      if (res.data.status === 200) {
        setAllTimeList(res.data.docTimeSlots);
        setAllTimeListMain(res.data.docTimeSlots);
      }
    });
    axios.get(`/doctors`).then((res) => {
      if (res.data.status == 200) {
        setAllDoctors(res.data.doctors);
      }
    });
  }, [loading, user?.user_id]);

  const getAllDoctorData = () => {
    axios.post(`/doctor-chamber-all/${user?.user_id}`, { userType: user?.user_type }).then((res) => {
      if (res.data.status === 200) {
        setAllTimeList(res.data.docTimeSlots);
      }
    });
  };

  useEffect(() => {
    if (doctorValue == "all") {
      axios.post(`/doctor-chamber-all/${user?.user_id}`, { userType: user?.user_type }).then((res) => {
        if (res.data.status == 200) {
          setAllTimeList(res.data.docTimeSlots);
        }
      });
    } else {
      axios.get(`/doctor-chamber-times/${doctorValue}`).then((res) => {
        if (res.data.status == 200) {
          setAllTimeList(res.data.docTimeSlots);
        }
      });
    }
  }, [loading, doctorValue, user?.user_id]);
  function convertTo12HourFormat(time24) {
    if (time24 === null || time24 === undefined) {
      return "Invalid time";
    }
    const [hours, minutes] = time24.split(":");
    const date = new Date(`2000-01-01T${hours}:${minutes}:00`);
    const time12 = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return time12;
  }
  const onSubmit = (id) => {
    const slotForm = docChamberData.slot_From;
    const slotTo = docChamberData.slot_to;
    const status = docChamberData.status;
    const appointment_type = docChamberData.appointment_type;

    if (slotForm.trim() === "") {
      setSlotFromError("This slot from field is required");
      return true;
    }

    if (slotTo.trim() === "") {
      setSlotToError("This slot to field is required");
      return true;
    }

    if (status.trim() === "") {
      setStatusError("This status to field is required");
      return true;
    }
    if (appointment_type.trim() === "") {
      setStatusError("This appointment type to field is required");
      return true;
    }

    axios
      .post(`/update-doctor-chamber-schedule-data/${id}`, {
        slotFrom: docChamberData.slot_From,
        slotTo: docChamberData.slot_to,
        status: docChamberData.status,
        appointment_type: docChamberData.appointment_type,
        // timeSlot: docChamberData.time_slot
      })
      .then((res) => {
        try {
          if (res.data.error) {
            setSlotFromError(res.data.error["slotFrom"]);
            setSlotToError(res.data.error["slotTo"]);
            setStatusError(res.data.error["status"]);
            setTimeSlotError(res.data.error["timeSlot"]);
          }
          if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            setLoading(Math.random());
            setOpen(false);
            setEmergency(0);
            docChamberData({ slot_From: "" });
            docChamberData({ slot_to: "" });
            docChamberData({ status: "" });
            docChamberData({ appointment_type: "" });
          }
        } catch (error) {
          throw new Error(error);
        }
      });
  };

  const [docChamberData, setDocChamberData] = useState({
    slot_From: "",
    slot_to: "",
    status: "",
    time_slot: "",
    id: "",
    date: "",
    fullName: "",
    appointment_type: "",
  });


  function filterWithMonth() {
    axios
      .get(`/filtering-doctor-chamber/${date}/${user?.user_type === "Doctor" ? user?.user_id : null}`)
      .then((res) => {
        if (res.data.status === 200) {
          const setData = res.data.allData;
          if (setData.length > 0) {
            setAllTimeList(setData);
            setError("");
          } else {
            setError("No data found");
            return false;
          }
        }
      });
  }

  const changeStatus = (e) => {
    const value = e.target.value;
    if (value == "emergency") {
      setEmergency(1);
      setDocChamberData({ ...docChamberData, status: value });
    } else {
      setDocChamberData({ ...docChamberData, status: value });
    }
  };

  const handleOpen = (id) => {
    const findDoctorData = allTimeList.filter((item) => item?.id === id);
    const doctor = allDoctors.filter(
      (item) => item.id == findDoctorData[0]?.doctor_id
    );
    setDocChamberData({
      ...docChamberData,
      slot_From: findDoctorData[0]?.slot_from,
      slot_to: findDoctorData[0]?.slot_to,
      status: findDoctorData[0]?.status,
      id: findDoctorData[0]?.id,
      fullName: doctor[0]?.fullName,
      date: findDoctorData[0]?.day,
    });
    // return false;
    setDate("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="ms-2">
      <div className="row">
        <div className="col-12">
          <div className="custom-card mt-2 mb-2 p-2">
            <h5 className="card-title">Doctor Chamber Setup </h5>
          </div>
          <div className="custom-card p-1">
            <div className="d-flex mt-2  mb-2  align-items-center ">
              <div className="col-7">
                <div className="d-flex ">
                  <div className="ms-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker", "DatePicker", "DatePicker"]}
                      >
                        <DatePicker
                          format="DD/MM/YYYY"
                          label="Basic date picker"
                          onChange={(value) => setDate(value)}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>

                  <div className="doctorChamberAllButton">
                    <div className="doctorChamberButton allButton">
                      <button onClick={filterWithMonth} className="link">
                        Search
                      </button>
                    </div>
                  </div>

                  <div className="doctorChamberAllButton">
                    <div className="doctorChamberButton allButton">
                      <FontAwesomeIcon icon="fa-solid fa-file" />
                      <button onClick={getAllDoctorData} className="link">
                        All
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3" style={{ marginLeft: "-10px" }}></div>
              <div className="col-2 ms-auto ">
                <Link
                  to="/add-doctors-chamber"
                  className="link"
                  style={{ textDecoration: "none" }}
                >
                  <div className="doctorChamberButton">
                    <span>
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    Add Time Slot
                  </div>
                </Link>
              </div>
            </div>
            {error && <p className="text-danger ">{error}</p>}

            <div
              className="main-wrapper g-doc-scroll"
              style={{
                maxHeight: "30rem",
                overflow: "hidden",
                overFlowX: "auto",
                overflowY: "scroll",
              }}
            >
              <div className="table-responsive">
                <table className="table mt-3">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Dr Name</th>
                      <th scope="col">Hospital</th>
                      <th scope="col">Appointment Type</th>
                      <th scope="col">Day</th>
                      <th scope="col">Date</th>
                      <th scope="col">Schedule</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTimeList.map((item, i) => {
                      const date = moment(item?.day, "DD/MM/YYYY");
                      return (
                        <tr
                          key={i}
                          className={`${item.status == "off_duty" ? "ligtGray" : ""
                            }`}
                        >
                          <th scope="row">{i + 1}</th>
                          <td>{item?.doctor?.fullName}</td>
                          <td>{item?.usual_provider?.usual_provider_name}</td>
                          <td>
                            {nullParser(item.appointment_type)
                              ? item.appointment_type
                              : ""}
                          </td>
                          <td>{moment(date).format("dddd")}</td>
                          <td>{item.day}</td>

                          <td>
                            {convertTo12HourFormat(item.slot_from)} -
                            {convertTo12HourFormat(item.slot_to)}
                            <span className="badge badge-success mx-1">
                              {item.type}
                            </span>
                          </td>

                          <td>
                            {item?.status === "on_duty"
                              ? "On Duty"
                              : item?.status === "off_duty"
                                ? "Off Duty"
                                : ""}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn"
                              style={{ color: "#69B128" }}
                              onClick={() => handleOpen(item.id)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Doctor Chamber Time Slot
                  </Typography>

                  <div className="pt-1">
                    <h1 style={{ fontSize: "16px", fontWeight: "400" }}>
                      Doctor Name: {docChamberData?.fullName}
                    </h1>
                    <h2 style={{ fontSize: "16px", fontWeight: "400" }}>
                      Date: {docChamberData?.date}
                    </h2>
                  </div>

                  <div className="form-group mt-2">
                    <label htmlFor="">Slot From</label>
                    <input
                      type="time"
                      name="holiday"
                      className="form-control pb-2"
                      value={docChamberData?.slot_From}
                      required
                      onChange={(e) =>
                        setDocChamberData({
                          ...docChamberData,
                          slot_From: e.target.value,
                        })
                      }
                    />
                  </div>
                  {slotFromError && (
                    <div style={{ color: "red" }}>{slotFromError}</div>
                  )}

                  <div className="">
                    <label htmlFor="">Slot To</label>
                    <input
                      type="time"
                      name="holiday"
                      className="form-control pb-2"
                      value={docChamberData?.slot_to}
                      required
                      onChange={(e) =>
                        setDocChamberData({
                          ...docChamberData,
                          slot_to: e.target.value,
                        })
                      }
                    />
                    {slotToError && (
                      <div style={{ color: "red" }}>{slotToError}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="">Appointment Type</label>
                    <select
                      class="form-select mt-2 "
                      aria-label="Default select example"
                      name="appointment_type"
                      required
                      value={docChamberData?.appointment_type}
                      onChange={(e) =>
                        setDocChamberData({
                          ...docChamberData,
                          appointment_type: e.target.value,
                        })
                      }
                    >
                      <option value={""} disabled selected>
                        Select Appointment
                      </option>
                      <option value="Telehealth">Telehealth</option>
                      <option value="Chamber">Chamber</option>
                    </select>
                    {slotToError && (
                      <div style={{ color: "red" }}>{slotToError}</div>
                    )}
                  </div>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={docChamberData?.status}
                      onChange={(e) => changeStatus(e)}
                      autoWidth5
                      label="Status"
                      size="small"
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value="on_duty">On Duty</MenuItem>
                      <MenuItem value="off_duty">Off Duty</MenuItem>
                      <MenuItem value="emergency">Emergency</MenuItem>
                    </Select>
                  </FormControl>
                  {statusError && (
                    <div style={{ color: "red" }}>{statusError}</div>
                  )}
                  <div className="form-group mt-3">
                    {emergency == 1 && (
                      <FormControl sx={{ minWidth: "100%" }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Emergency
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          onChange={(e) => changeStatus(e)}
                          autoWidth5
                          value={docChamberData?.status}
                          label="Status"
                          size="small"
                        >
                          <MenuItem value="">
                            <em></em>
                          </MenuItem>
                          <MenuItem value="Travel">Travel</MenuItem>
                          <MenuItem value="on_Leave">On Leave</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-sm py-1 px-3"
                      style={buttonDesign}
                      onClick={() => onSubmit(docChamberData.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm py-1 px-3 ms-2"
                      style={buttonDesignCancel}
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoctorsChamber;
