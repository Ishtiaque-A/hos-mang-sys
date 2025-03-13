import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../DoctorsChamber/DoctorChamber.css";
import Modal from "react-modal";
import axios from "axios";
import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const emptyError = {
  doctor_name: "",
  chamber_name: "",
  year: "",
  month: "",
};

function AddDoctorsChamber() {
  const [storeDataList, setStoreDataList] = useState([]);
  const [slotFormError, setSlotFormError] = useState();
  const [slotToError, setSlotToError] = useState();
  const [appointmentTypeError, setAppointmentTypeError] = useState();
  const [weekendData, setWeekendData] = useState([]);

  const customStyles = {
    content: {
      top: "30%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "47%",
      height: "460px",
      background: "#ffffff",
    },
    overlay: { zIndex: 1000 },
  };
  const [doctorChamberDates, setDoctorChamberDates] = useState([]);
  const [status, setStatus] = useState();
  const [unavailable, setUnavailable] = useState();
  const [emergency, setEmergency] = useState();
  const [holidayData, setHolidayData] = useState();
  // const [id, setId] = useState();
  const [error, setError] = useState({ ...emptyError });

  useEffect(() => {
    Modal.setAppElement("body");
  }, [doctorChamberDates]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const [availableMonthSlot, setAvailableMonthSlot] = useState(null);

  function Btn(e) {
    e.preventDefault();
    if (!docChamberTimeSlot?.doctor_name) {
      console.log("The doctor name field is required");
      setError({ doctor_name: "Doctor name field is required" });
      return false;
    } else if (!docChamberTimeSlot?.chamber_name) {
      setError({ chamber_name: "Chamber name field is required" });
      return false;
    } else if (!docChamberTimeSlot?.year) {
      setError({ year: "Year field is required" });
      return false;
    } else if (!docChamberTimeSlot?.month) {
      setError({ month: "Month field is required" });
      return false;
    }
    setBtnLoading(true);
    const data = {
      doctor_id: docChamberTimeSlot?.doctor_id,
      chamber_id: docChamberTimeSlot?.chamber_id,
      year: docChamberTimeSlot?.year,
      month: docChamberTimeSlot?.month,
    };

    axios.post("doctor-chamber-validation-form", data).then((res) => {
      if (res.status === 200) {
        setAvailableMonthSlot(res.data);
        if (res?.data?.evening > 0 && res?.data?.morning > 0) {
          swal(
            "Warning",
            `${docChamberTimeSlot?.doctor_name} is fully booked this month.`,
            "warning"
          );
          setBtnLoading(false);
        } else {
          setBtnLoading(false);
          setIsOpen(true);
          setShowTable(true);
        }
      } else {
        setBtnLoading(false);
        toast.warn("something went wrong");
      }
    });
  }

  const handleChange = (e, i) => {
    const statusValue = e.target.value;
    setEmergency(i.key);
    setUnavailable(statusValue);
  };

  function closeModal() {
    setError({ ...emptyError });
    setSlotFormError("");
    setSlotToError("");
    setAppointmentTypeError("");
    setIsOpen(false);
  }
  //all usual provider chamber
  const [allChamber, setAllChamber] = useState([]);
  const [doctor, setDoctor] = useState({});

  const [showTable, setShowTable] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  useEffect(() => {
    axios.get(`/usual-provider`).then((res) => {
      if (res.data.status == 200) {
        setAllChamber(res.data.usual_provider);
      }
    });
    if (user?.user_type === "Doctor") {
      axios.get(`/edit-doctors/${user?.user_id}`).then((res) => {
        console.log(res, "fff");
        if (res.data.status == 200) {
          setDoctor(res.data.doctors);
          setdocChamberTimeSlot({
            ...docChamberTimeSlot,
            doctor_name: res.data.doctors?.fullName,
            doctor_id: res.data.doctors?.id,
            chamber_id: res.data.doctors?.usual_provider?.id,
            chamber_name: res.data.doctors?.usual_provider?.usual_provider_name,
          });
        }
      });
    }
    axios.get(`/doctors`).then(res => {
      if (res.data.status == 200) {
        setAllDoctors(res.data.doctors);
      }
    })
  }, []);

  const [checkBoxValue, setCheckBoxValue] = useState("");
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setCheckBoxValue(1);
    } else {
      setCheckBoxValue(0);
    }
  };

  const [storeDocTimeList, setStoreDocTimeList] = useState([]);

  function getAllDatesInMonth(year, month) {
    const lastDay = new Date(year, month, 0).getDate();
    const datesInMonth = [];

    for (let day = 1; day <= lastDay; day++) {
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `${month}` : month;
      const dateString = `${formattedDay}/${formattedMonth}/${year}`;
      datesInMonth.push(dateString);
    }
    return datesInMonth;
  }

  const [scheduleError, setScheduleError] = useState("");

  const addToList = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const slotForm = docChamberTimeSlot.slot_from;
    const slotTo = docChamberTimeSlot.slot_to;
    const appointment_type = docChamberTimeSlot.appointment_type;
    console.log(docChamberTimeSlot, "testdoc");
    if (appointment_type.trim() === "") {
      setAppointmentTypeError("appointment type field is required");
      return true;
    } else {
      setAppointmentTypeError("");
    }

    if (slotForm.trim() === "") {
      console.log("console", "Slot from field is required!");
      setSlotFormError("slot from field is required");
      return true;
    } else {
      setSlotFormError("");
    }

    if (slotTo.trim() === "") {
      console.log("console 1", "slot to field is required!");
      setSlotToError("Slot to field is required");
      return true;
    } else {
      setSlotToError("");
    }
    if (
      availableMonthSlot.morning > 0 &&
      docChamberTimeSlot?.type?.toString() === "morning"
    ) {
      setScheduleError(
        `Doctor is fully booked  ${docChamberTimeSlot?.type?.toString()} time`
      );
      return true;
    }
    if (
      availableMonthSlot.evening > 0 &&
      docChamberTimeSlot?.type?.toString() === "evening"
    ) {
      setScheduleError(
        `Doctor is fully booked  ${docChamberTimeSlot?.type?.toString()} time`
      );
      return true;
    }
    console.log(availableMonthSlot, "availableMonthSlot");
    console.log(appointment_type, "appointment_type");
    // return true;

    if (slotForm > slotTo) {
      return swal(
        "Error",
        "Slot to time Should be greater then slot from ",
        "error"
      );
    } else {
      const getAllDates = getAllDatesInMonth(
        docChamberTimeSlot.year,
        docChamberTimeSlot.month
      );
      const today = new Date();
      const allDates = getAllDates.map((item, index) => {
        const isWeekend = weekendData.some(
          (day) => moment(item, "DD/MM/yyyy").format("dddd") === day.name
        );

        const getdata = holidayData.filter((data) => {

          const startDate = moment(data?.date, "YYYY-MM-DD");
          const endDate = moment(data?.endDate, "YYYY-MM-DD");
          const isInRange =
            moment(item, "DD/MM/yyyy").isBetween(
              startDate,
              endDate,
              null,
              "[]"
            ) || moment(item, "DD/MM/yyyy").isSame(startDate, "day");
          // const dayNameMatches = weekendData.some(day => moment(item, 'DD/MM/yyyy').format('dddd') === day.name);

          return isInRange;
        });

        const isOffDuty = isWeekend || getdata.length > 0;

        // const isOffDuty = getdata.length > 0;

        console.log("isOffDuty", isOffDuty);
        console.log("item", item);

        return {
          id: index + 1,
          doctor_id: doctor?.id,
          doctor_name: doctor?.fullName,
          chamber_id: doctor?.usual_provider?.id,
          chamber_name: docChamberTimeSlot.chamber_name,
          month: docChamberTimeSlot.month,
          day: item,
          year: docChamberTimeSlot.year,
          slot_from: docChamberTimeSlot.slot_from,
          slot_to: docChamberTimeSlot.slot_to,
          type: docChamberTimeSlot.type,
          status: isOffDuty ? "off_duty" : "on_duty",
          appointment_type: docChamberTimeSlot.appointment_type,
        };
      });

      setStoreDataList(allDates);
      closeModal();
    }
  };

  console.log(storeDataList, "storeDataList");
  const deleteList = (e, key) => {
    const filtered = storeDocTimeList.filter((item, index) => {
      return index !== key;
    });
    setStoreDocTimeList(filtered);
  };

  console.log("slot to ", slotToError || "no error");
  //submit doctor times
  const submitDoctorTimes = (e) => {
    e.preventDefault();
    if (storeDataList.length == 0) {
      toast.error("No data given");
    } else {
      axios
        .post("/save-chamber-data", {
          data: storeDataList,
        })
        .then((res) => {
          console.log(res);
          navigate("/doctors-chamber");
        });
    }
    toast.success("Doctor times added successfully");
  };

  const navigate = useNavigate();

  const closeCancelBtn = () => {
    setStoreDocTimeList([]);
    navigate("/doctors-chamber");
  };
  const user = JSON.parse(localStorage.getItem("userData"));
  const [docChamberTimeSlot, setdocChamberTimeSlot] = useState({
    doctor_id: doctor?.id,
    doctor_name: doctor?.fullName,
    chamber_id: doctor?.usual_provider?.id,
    chamber_name: doctor?.usual_provider?.usual_provider_name,
    month: "",
    day: "",
    year: "",
    slot_from: "",
    slot_to: "",
    type: "",
    appointment_type: "",
  });

  useEffect(() => {
    setStoreDocTimeList((prevStoreDocTimeList) => {
      const isDuplicate = prevStoreDocTimeList.some(
        (item) => item.day === docChamberTimeSlot.day
      );
      return isDuplicate
        ? prevStoreDocTimeList
        : [...prevStoreDocTimeList, docChamberTimeSlot];
    });

    axios.get(`/holiday`).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        setHolidayData(res?.data?.data);
      } else if (res.data.status === 404) {
      }
    });
    axios.get(`/holiday-weekend-data`).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        setWeekendData(res?.data?.data);
      } else if (res.data.status === 404) {
      }
    });
  }, [docChamberTimeSlot]);

  const changeSlotForm = (e, id) => {
    const ext = [...storeDataList];
    ext.map((item) => {
      if (item.id == id) {
        item.slot_from = e.target.value;
      }
    });
    setStoreDataList(ext);
  };
  const changeSlotTo = (e, id) => {
    const ext = [...storeDataList];
    ext.map((item) => {
      if (item.id == id) {
        item.slot_to = e.target.value;
      }
    });
    setStoreDataList(ext);
  };

  const changeAppointmentType = (e, id) => {
    const ext = [...storeDataList];
    ext.map((item) => {
      if (item.id == id) {
        item.appointment_type = e.target.value;
      }
    });
    setStoreDataList(ext);
  };

  const [emergencyStatus, setEmergencyStatus] = useState();
  const changeStatus = (e, id) => {
    const status = [...storeDataList];
    status.map((item) => {
      if (item.id == id) {
        item.status = e.target.value;
        if (item.status == "emergency") {
          setEmergencyStatus("emergency");
        }
      }
    });
    setStoreDataList(status);
  };
  const changeDoctorTimeSlotTo = (e) => {
    const value = e.target.value;
    const slotForm = docChamberTimeSlot.slot_from;
    if (slotForm > value) {
      return swal(
        "Error",
        "Slot to time Should be greater then slot from ",
        "error"
      );
    } else {
      return setdocChamberTimeSlot({ ...docChamberTimeSlot, slot_to: value });
    }
  };

  const changeTimeSlotTo = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value == "morning") {
      console.log("am");
      setdocChamberTimeSlot({
        ...docChamberTimeSlot,
        slot_from: "08:00",
        slot_to: "11:59",
        type: value, // Also setting the type here
      });
    } else if (value == "evening") {
      setdocChamberTimeSlot({
        ...docChamberTimeSlot,
        slot_from: "17:00",
        slot_to: "20:00",
        type: value, // Also setting the type here
      });
    }
  };

  const getTodayAndFutureYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const futureYears = [];

    for (let i = 0; i < 3; i++) {
      const year = currentYear + i;
      futureYears.push(year);
    }

    return {
      today: currentYear,
      futureYears: futureYears,
    };
  };
  const yearsArray = getTodayAndFutureYearsArray();

  console.log("docChamberTimeSlot", docChamberTimeSlot);
  console.log("fff", doctor?.usual_provider?.id);

  return (
    <div className="ms-2">
      <div className="row">
        <div className="col-12">
          <div className="custom-card mt-2 mb-2 p-2">
            <h5 className="card-title">Add Doctor's Chamber</h5>
          </div>
          <div className="custom-card clearfix p-1">
            {
              user?.user_type === 'Doctor' ?
                <div className="row my-4 w-100">
                  <div className="item col-4 text-center">
                    <h6>{doctor?.usual_provider?.usual_provider_name}</h6>
                  </div>

                  <div className="item col-4">
                    <div className="d-flex">
                      <h6 className="mt-2  mx-3">Year</h6>
                      <Box sx={{ minWidth: 250 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            Year
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={docChamberTimeSlot.year}
                            label="Month"
                            onChange={(e) =>
                              setdocChamberTimeSlot({
                                ...docChamberTimeSlot,
                                year: e.target.value,
                              })
                            }
                          >
                            {yearsArray.futureYears.map((year) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    {error?.year && (
                      <p className="text-danger d-block">{error?.year}</p>
                    )}
                  </div>

                  <div className="item col-4">
                    <div className="d-flex">
                      <h6 className="mt-2  mx-3">Month</h6>
                      <Box sx={{ minWidth: 250 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            Month
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={docChamberTimeSlot.month}
                            label="Month"
                            onChange={(e) =>
                              setdocChamberTimeSlot({
                                ...docChamberTimeSlot,
                                month: e.target.value,
                              })
                            }
                          >
                            <MenuItem value="01">January</MenuItem>
                            <MenuItem value="02">February</MenuItem>
                            <MenuItem value="03">March</MenuItem>
                            <MenuItem value="04">April</MenuItem>
                            <MenuItem value="05">May</MenuItem>
                            <MenuItem value="06">June</MenuItem>
                            <MenuItem value="07">July</MenuItem>
                            <MenuItem value="08">August</MenuItem>
                            <MenuItem value="09">September</MenuItem>
                            <MenuItem value="10">October</MenuItem>
                            <MenuItem value="11">November</MenuItem>
                            <MenuItem value="12">December </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    {error?.month && (
                      <p className="text-danger d-block">{error?.month}</p>
                    )}
                  </div>
                </div>
                :
                <div className="top-header my-4 w-100">
                  <div className="item">
                    <div className="d-flex">
                      <h6 className="mt-2">Doctor</h6>
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable

                        options={allDoctors}
                        loadingText="loading..."
                        getOptionLabel={(option) =>
                          option.fullName
                        }
                        onChange={(e, value) => {
                          setdocChamberTimeSlot({
                            ...docChamberTimeSlot,
                            doctor_id: value.id,
                            doctor_name: value.fullName
                          })
                          setDoctor(value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search doctors"
                            size="small"
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        sx={{ width: 230 }}
                      />
                    </div>
                    {error?.doctor_name && <p className="text-danger d-block">{error?.doctor_name}</p>}
                  </div>




                  <div className="item">
                    <div className="d-flex">
                      <h6 className="mt-2 ms-1">Chamber </h6>
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable

                        options={allChamber}
                        loadingText="loading..."
                        getOptionLabel={(option) =>
                          option.usual_provider_name
                        }
                        onChange={(e, value) => {
                          setdocChamberTimeSlot({
                            ...docChamberTimeSlot,
                            chamber_id: value.id,
                            chamber_name: value.usual_provider_name
                          })
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search chember"
                            size="small"
                            InputProps={{
                              ...params.InputProps,
                              type: 'search',
                            }}
                          />
                        )}
                        sx={{ width: 250 }}
                      />
                    </div>
                    {error?.chamber_name && <p className="text-danger d-block">{error?.chamber_name}</p>}
                  </div>

                  <div className="item">
                    <div className="d-flex">
                      <h6 className="mt-2  mx-3">Year</h6>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">Year</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={docChamberTimeSlot.year}
                            label="Month"
                            onChange={(e) => setdocChamberTimeSlot({ ...docChamberTimeSlot, year: e.target.value })}
                          >
                            {/* <MenuItem value="2023">2023</MenuItem>
                                                <MenuItem value="2024">2024</MenuItem>
                                                <MenuItem value="2025">2025</MenuItem> */}
                            {yearsArray.futureYears.map((year) => (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    {error?.year && <p className="text-danger d-block">{error?.year}</p>}
                  </div>

                  <div className="item">
                    <div className="d-flex">
                      <h6 className="mt-2  mx-3">Month</h6>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">Month</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={docChamberTimeSlot.month}
                            label="Month"
                            onChange={(e) => setdocChamberTimeSlot({ ...docChamberTimeSlot, month: e.target.value })}
                          >
                            <MenuItem value="01">January</MenuItem>
                            <MenuItem value="02">February</MenuItem>
                            <MenuItem value="03">March</MenuItem>
                            <MenuItem value="04">April</MenuItem>
                            <MenuItem value="05">May</MenuItem>
                            <MenuItem value="06">June</MenuItem>
                            <MenuItem value="07">July</MenuItem>
                            <MenuItem value="08">August</MenuItem>
                            <MenuItem value="09">September</MenuItem>
                            <MenuItem value="10">October</MenuItem>
                            <MenuItem value="11">November</MenuItem>
                            <MenuItem value="12">December </MenuItem>

                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    {error?.month && <p className="text-danger d-block">{error?.month}</p>}
                  </div>
                </div>
            }

            <div></div>

            <div>
              <button
                disabled={btnLoading}
                className="buttonStyle ms-1"
                onClick={Btn}
              >
                <b>{btnLoading ? "Loading..." : "Add"}</b>
              </button>
              <button
                className="buttonStyleCancel"
                onClick={() => {
                  window.history.back();
                }}
              >
                <b>Back</b>
              </button>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="card-body">
                <span
                  className="float-end"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={closeModal}
                >
                  <i class="fal fa-times"></i>
                </span>

                <h5 className="">
                  {" "}
                  <b>Add Slots</b>
                </h5>

                {/* <div className="line "></div> */}

                <div className="row">
                  <div className="col-12 d-flex">
                    <div className="col-5 mt-4">
                      {/* <h6 className="mt-4">Day</h6> */}
                      <h6 className="mt-4 mb-5">Schedule</h6>
                      <h6 className="mb-5 mt-4">Appointment Type</h6>
                      <h6 className="mt-5">Slot(From)</h6>
                      <h6 className="mt-5">Slot(To)</h6>
                    </div>
                    <div className="col-7 mt-4">
                      <select
                        class="form-select mt-4"
                        aria-label="Default select example"
                        name="type"
                        onChange={(e) => changeTimeSlotTo(e)}
                      >
                        <option selected>Select schedule</option>
                        <option value="morning">Morning</option>
                        <option value="evening">Evening</option>
                      </select>
                      {scheduleError && (
                        <div style={{ color: "red" }}>{scheduleError}</div>
                      )}
                      {/* {slotToError && (
                        <div style={{ color: "red" }}>{slotToError}</div>
                      )} */}
                      <select
                        class="form-select mt-4"
                        aria-label="Default select example"
                        name="type"
                        required
                        onChange={(e) =>
                          setdocChamberTimeSlot({
                            ...docChamberTimeSlot,
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
                      {appointmentTypeError && (
                        <div style={{ color: "red" }}>
                          {appointmentTypeError}
                        </div>
                      )}
                      <input
                        type="time"
                        className="form-control me-1 mt-5"
                        value={docChamberTimeSlot?.slot_from}
                        onChange={(e) =>
                          setdocChamberTimeSlot({
                            ...docChamberTimeSlot,
                            slot_from: e.target.value,
                          })
                        }
                      />
                      {slotFormError && (
                        <div style={{ color: "red" }}>{slotFormError}</div>
                      )}
                      <input
                        type="time"
                        className="form-control me-1 mt-5"
                        value={docChamberTimeSlot?.slot_to}
                        onChange={(e) => changeDoctorTimeSlotTo(e)}
                      />
                      {slotToError && (
                        <div style={{ color: "red" }}>{slotToError}</div>
                      )}

                      <div className="float-right">
                        <button
                          className="buttonStyleCancel mt-5 "
                          onClick={closeModal}
                        >
                          <b>Cancel</b>
                        </button>
                        <button
                          className="buttonStyle mt-5 mx-2"
                          onClick={addToList}
                        >
                          <b>Save</b>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            <div className="main-body mt-1">
              {showTable && (
                <>
                  <table class="table table-bordered mt-1">
                    <thead>
                      <tr>
                        <th scope="col">
                          <b>#SL</b>
                        </th>
                        <th scope="col">
                          <b>Time Schedule</b>
                        </th>
                        <th scope="col">
                          <b>Appointment Type</b>
                        </th>
                        <th scope="col">
                          <b>Day</b>
                        </th>
                        <th scope="col">
                          <b>Date</b>
                        </th>
                        <th scope="col">
                          <b>Status</b>
                        </th>
                        {emergencyStatus != "emergency" ? (
                          <></>
                        ) : (
                          <th scope="col">
                            <b>Emergency</b>
                          </th>
                        )}
                      </tr>
                    </thead>
                    {/**|| `${(item.status == 'off_duty') ? 'ligtGray' : ''}` */}
                    <tbody>
                      {storeDataList.map((item, i) => {
                        console.log(storeDataList, "storeDataList from JSX");
                        const getdata = holidayData.find(
                          (data) => data?.date == item?.day
                        );
                        const date = moment(item?.day, "DD/MM/YYYY");
                        return (
                          <tr
                            key={i}
                            className={`${item.status == "off_duty" ? "ligtGray" : ""
                              }`}
                          >
                            <th scope="row">{i + 1}</th>
                            <td>
                              <div className="d-inline-block">
                                <label htmlFor="">Slot From</label>
                                <input
                                  type="time"
                                  className="form-control me-1"
                                  value={item.slot_from}
                                  onChange={(e) => changeSlotForm(e, item.id)}
                                />
                              </div>

                              <div className="d-inline-block">
                                <label htmlFor="">Slot To</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={item.slot_to}
                                  onChange={(e) => changeSlotTo(e, item.id)}
                                />
                              </div>

                              <span className="badge badge-success mx-1">
                                {" "}
                                {item.type}
                              </span>
                            </td>
                            <td>
                              <select
                                onChange={(e) =>
                                  changeAppointmentType(e, item.id)
                                }
                                className="form-select"
                              >
                                <option
                                  selected={
                                    item.appointment_type.toString() ===
                                    "online"
                                  }
                                  value="online"
                                >
                                  Online
                                </option>
                                <option
                                  selected={
                                    item.appointment_type.toString() ===
                                    "chamber"
                                  }
                                  value="chamber"
                                >
                                  Chamber
                                </option>
                              </select>
                            </td>
                            <td>{moment(date).format("dddd")}</td>
                            <td>{item.day}</td>

                            <td>
                              <FormControl sx={{ minWidth: "22ch" }}>
                                <InputLabel id="demo-simple-select-autowidth-label">{`${item.status == "off_duty" ? "Off Duty" : ""
                                  }`}</InputLabel>
                                <Select
                                  labelId="demo-simple-select-autowidth-label"
                                  id="demo-simple-select-autowidth"
                                  value={status}
                                  onChange={(e) => changeStatus(e, item.id)}
                                  autoWidth
                                  label="Status"
                                  size="small"
                                  defaultValue={`${item.status == "off_duty"
                                    ? "off_duty"
                                    : "on_duty"
                                    }`}
                                  inputProps={{ style: { fontSize: 12 } }}
                                >
                                  <MenuItem value="">
                                    <em></em>
                                  </MenuItem>
                                  <MenuItem value="on_duty">On Duty</MenuItem>
                                  <MenuItem value="off_duty">Off Duty</MenuItem>
                                  <MenuItem value="emergency">
                                    Emergency
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </td>

                            {item.status == "emergency" ? (
                              <td>
                                <FormControl sx={{ minWidth: "22ch" }}>
                                  <InputLabel id="demo-simple-select-autowidth-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={status}
                                    onChange={handleChange}
                                    autoWidth
                                    label="Status"
                                    size="small"
                                  >
                                    <MenuItem value="emergency">
                                      Travel
                                    </MenuItem>
                                    <MenuItem value="on_leave">
                                      On Leave
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </td>
                            ) : (
                              <td></td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="float-right">
                    <button
                      className="buttonStyleCancel"
                      onClick={closeCancelBtn}
                    >
                      <b>Cancel</b>
                    </button>
                    <button
                      className="buttonStyle mx-3"
                      onClick={submitDoctorTimes}
                    >
                      <b>Save</b>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddDoctorsChamber;
