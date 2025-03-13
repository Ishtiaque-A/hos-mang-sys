import "../Patients/PatientVitalReading.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import NoImages from "../../Images/dummy_images.svg";
import { NewModal } from "../../common/components/NewModal";
import General from "../Appointment/GreatDoc/HistoryAndExamination/General";

function PatientVitalReading() {
  const customStyles = {
    content: {
      top: "35%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "370px",
      background: "#ffffff",
    },
    overlay: { zIndex: 1000 },
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal(e) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [patientIdRender, setpatientIdRender] = useState("");
  const [patientInfo, setPatientInfo] = useState({ fullName: "" });

  const [vitaSignArray, setvitalSignArray] = useState([]);
  useEffect(() => {
    axios.get("vital-sign").then((res) => {
      setvitalSignArray(res.data.vitalSign);
    });
  }, []);

  const [renderData, setRenderData] = useState("");

  const [allVitals, setAllVitals] = useState([]);


  useEffect(() => {
    Modal.setAppElement("body");
  }, []);


  const [patients, setPatients] = useState([]);

  ///reason for visit functionality /////
  const [reasonVisitType, setReasonVisitType] = useState([]);
  const [reasonFor, setReasonFor] = useState([]);
  useEffect(() => {
    axios.get(`/diagnosis-procedure-reason/ResonForVisit`).then((res) => {
      setReasonVisitType(res.data.data);
    });
    axios.get(`/diagnosis-procedure-reason-for/ResonForVisit`).then((res) => {
      setReasonFor(res.data.data);
    });
    axios.get(`patient-search-for-vital-reading`)
      .then((res) => {
        setPatients(res?.data?.patient)
      })
  }, []);
  const [searchReasonForVisit, setSearchReasonForVisit] = useState("");
  const onClearReasonForVisit = () => {
    setresonForVisitData({
      reson_name: "",
      reson_for_name: "",
      reson_further_details: "",
      category_name: "",
      nurse_id: "",
      patient_id: patientIdRender,
      last_check_up_date: value,
    });
    setSearchReasonForVisit("");
  }
  const [resonForVisitData, setresonForVisitData] = useState({
    reson_name: "",
    reson_for_name: "",
    reson_further_details: "",
    category_name: "",
    nurse_id: "",
    patient_id: patientIdRender,
    last_check_up_date: value,
  });
  const handleResonInput = (e) => {
    setresonForVisitData({
      ...resonForVisitData,
      [e.target.name]: e.target.value,
    });
  };

  const [allReasonForVisit, setAllReasonForVisit] = useState([]);
  const [renderReasonData, setRenderReasonData] = useState("");

  useEffect(() => {
    axios.get(`/get-great-doc-reson/${patientInfo?.id}`).then((res) => {
      setAllReasonForVisit(res.data.allReasons);
    });
    axios.get(`patient-search-by-id/${patientInfo?.id}`).then((res) => {
      setAllVitals(res.data.dateVitalSign);
    });
  }, [patientInfo?.id, renderReasonData]);

  const handleReasonSubmit = (e) => {
    e.preventDefault();
    const resonForVisit = {
      reson_name: resonForVisitData.reson_name,
      reson_for_name: resonForVisitData.reson_for_name,
      reson_further_details: resonForVisitData.reson_further_details,
      category_name: resonForVisitData.category_name,
      nurse_id: "",
      patient_id: patientInfo?.id,
      last_check_up_date: value,
    };
    axios.post(`/save-great-doc-reson`, resonForVisit).then((res) => {
      if (res.data.status == 200) {
        setresonForVisitData({
          reson_name: "",
          reson_for_name: "",
          reson_further_details: "",
          category_name: "",
        });
        setRenderReasonData(res.data);
        toast.success("Reason For Visit Added Successfully");
        closeReasonModal();
      }
    });
  };

  const [editReasonId, setEditReasonId] = useState("");

  const handleReasonEdit = (e, id) => {
    e.preventDefault();
    setEditReasonId(id);
    openReasonEditModal();
  };

  const [modalReasonEditIsOpen, setReasonEditIsOpen] = React.useState(false);
  function openReasonEditModal() {
    setReasonEditIsOpen(true);
  }
  function closeEditReasonModal() {
    setReasonEditIsOpen(false);
  }

  const [editReasonData, setEditReasonData] = useState({
    reson_name: "",
    reson_for_name: "",
    reson_further_details: "",
    category_name: "",
    nurse_id: "",
    patient_id: patientIdRender,
    last_check_up_date: value,
  });

  useEffect(() => {
    axios.get(`/edit-great-doc-reson/${editReasonId}`).then((res) => {
      if (res.data.status === 200) {
        setEditReasonData(res.data.edit_reason);
      }
    });
  }, [editReasonId]);

  const handleReasonEditFunc = (e) => {
    setEditReasonData({
      ...editReasonData,
      [e.target.name]: e.target.value,
    });
  };
  const ReasonUpdate = (e) => {
    e.preventDefault();
    const submitUpdateReasonData = {
      reson_name: editReasonData.reson_name,
      reson_for_name: editReasonData.reson_for_name,
      reson_further_details: editReasonData.reson_further_details,
      category_name: editReasonData.category_name,
      nurse_id: "",
      patient_id: patientIdRender,
      last_check_up_date: value,
    };
    setEditReasonId("");
    axios
      .post(`/update-great-doc-reson/${editReasonId}`, submitUpdateReasonData)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success(res.data.message);
          setRenderReasonData(res.data);
        }
      });
    closeEditReasonModal();
  };
  console.log("allReasonForVisit", reasonFor)
  const handleDeleteReason = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    console.log("this clicked check", thisClicked);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-great-doc-reson/${id}`).then((res) => {
          if (res.data.status === 200) {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            setRenderReasonData(Math.random());
          }
        });

      }
    });
  };

  const [modalReasonIsOpen, setReasonIsOpen] = useState(false);
  function openReasonModal() {
    setReasonIsOpen(true);
  }
  function closeReasonModal() {
    setReasonIsOpen(false);
  }
  const [searchPatientName, setSearchPatientName] = useState("");
  const clearBillingSearch = () => {
    setSearchPatientName("");
  }
  console.log(allVitals, "all vital")
  return (
    <div className="ms-2 mt-2">
      <div className="custom-card flex-grow-1">
        <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
          Add vital Reading
        </h5>
      </div>
      <div className="custom-card p-1 ">
        <div className="p-search mt-2 ">
          <div className="row">
            <div className="col-5 ">
              <ReactSearchAutocomplete
                showIcon={false}
                placeholder={
                  "Search Patients with HN Number, Name or Mobile Number"
                }
                items={patients}
                onClear={clearBillingSearch}
                autoFocus
                inputSearchString={searchPatientName || ""}
                onSearch={(value) => setSearchPatientName(value)}
                className="form__control"
                formatResult={(item) => {
                  return (
                    <div
                      // ref={searchRef}
                      style={{
                        padding: "3px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {item?.patient_images?.length > 0 ? (
                          <Avatar
                            src={`${global.img_url}/images/files/${item?.patient_images}`}
                            alt="avatar-img"
                          />
                        ) : (
                          <Avatar src={NoImages} alt="avatar-img" />
                        )}
                        <div>
                          <p
                            style={{
                              fontWeight: "normal",
                              fontSize: "14px",
                              margin: "0px",
                              padding: "0px",
                            }}
                          >
                            {item?.fullName}
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              margin: "0px",
                              fontWeight: "600",
                              padding: "0px",
                            }}
                          >
                            {item?.patient_mobile_phone}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: "10px",
                          fontWeight: "600",
                          padding: "0px",
                          margin: "0px 7px 0px 0px",
                        }}
                      >
                        {item?.patient_hn_number}
                      </p>
                    </div>
                  );
                }}
                resultStringKeyName="fullName"
                onSelect={(item) => {
                  setPatientInfo(item);
                }}
                maxResults={5}
                fuseOptions={{
                  keys: [
                    "patient_hn_number",
                    "patient_mobile_phone",
                    "patient_first_name",
                    "patient_hn_number",
                    "patient_middle_name",
                    "patient_last_name",
                    "fullName",
                  ],
                }} // Search in the description text as well
                styling={{
                  borderRadius: "5px !important",
                  zIndex: "20",
                  width: "100%",
                  height: "40px",

                }}
              >

              </ReactSearchAutocomplete>
            </div>
            <div className="col-4 d-flex align-items-center">
              <h6>Date:</h6>

              <h6 className="mx-2">
                {moment(new Date()).format("MM/DD/YYYY")}
              </h6>
            </div>
            <div className="col-3 d-flex align-items-center">
              <h6>Time</h6>

              <div className=" mb-1 py-2 mx-1 col-8 ">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>

        {patientInfo?.fullName && (
          <>
            <div className="doc-pat-info d-flex mt-4 ">
              <div className="col-6 d-flex justify-content-between">
                <div className="rounded-3">
                  {patientInfo?.patient_images !== "" ? (
                    <img
                      className="rounded-3"
                      src={`${global.img_url}/images/files/${patientInfo?.patient_images}`}
                      style={{ width: "60px", height: "50px" }}
                      alt="ptn-image"
                    />
                  ) : (
                    <img
                      className="me-2"
                      src={`https://static.thenounproject.com/png/363640-200.png`}
                      width="60px"
                      alt="No Image"
                    />
                  )}
                </div>
                <div className="">
                  <b>{patientInfo?.fullName}</b>
                  <span className="d-block">
                    {patientInfo?.patient_hn_number}
                  </span>
                  <div
                    style={{
                      width: "2px",
                      height: "100%",
                      backgroundColor: "#d2d2d2",
                      display: "inline",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "80%",
                    backgroundColor: "#d2d2d2",
                  }}
                ></div>
                <div className="">
                  <b>Gender</b>
                  <span className="d-block">
                    {patientInfo?.patient_birth_sex == null
                      ? ""
                      : patientInfo?.patient_birth_sex.birth_sex_name}
                  </span>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "80%",
                    backgroundColor: "#d2d2d2",
                  }}
                ></div>

                <div className="">
                  <b>Date Of Birth</b>
                  <span className="d-block">{patientInfo?.patient_dob}</span>
                </div>
                <div
                  style={{
                    width: "1px",
                    height: "80%",
                    backgroundColor: "#d2d2d2",
                  }}
                ></div>

                <div className="">
                  <b>Phone No</b>
                  <span className="d-block">
                    {patientInfo?.patient_mobile_phone}
                  </span>
                </div>
              </div>

              <div className="col-2"></div>

            </div>

            <button
              className="float-end rounded fw-bold me-1 mt-4"
              onClick={openReasonModal}
              style={{
                backgroundColor: "#69B128",
                padding: "6px 27px",
                color: "white",
                border: "0",
                outline: "none",
              }}
            >

              Add
            </button>

            <Modal
              isOpen={modalReasonIsOpen}
              onRequestClose={closeReasonModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="card-body">
                <span
                  className="float-end"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={closeReasonModal}
                >
                  <i className="fal fa-times"></i>
                </span>

                <h5 className="">

                  <b>Add Reason For Visit </b>
                </h5>

                <div className="row">
                  <div className="col-12 d-flex">
                    <div className="col-5 mt-4">
                      <h6 className="mt-1 ml-1">Visit Type</h6>
                      <h6 className="mt-3 ml-1">Category</h6>
                      <h6 className="mt-4">Reason For Visit</h6>
                      <h6 className="mt-4">Further Details</h6>
                    </div>
                    <div className="col-7 mt-4">
                      <select
                        className="form-select form-select-sm mt-2"
                        aria-label=".form-select-sm"
                        name="reson_name"
                        value={resonForVisitData.name}
                        onChange={handleResonInput}
                      >
                        <option selected>Select Visit Type</option>
                        {reasonFor?.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item?.DiagnosisProcedureFor_name}
                            >
                              {item?.DiagnosisProcedureFor_name}
                            </option>
                          );
                        })}
                      </select>

                      <select
                        className="form-select form-select-sm mt-2 mb-2"
                        aria-label=".form-select-sm"
                        name="category_name"
                        value={resonForVisitData.category_name}
                        onChange={handleResonInput}
                      >
                        <option selected>Select Category</option>
                        <option value="category-1">Category 1</option>
                        <option value="category-2">Category 2</option>
                        <option value="category-3">Category 3</option>
                        <option value="category-4">Category 4</option>
                        <option value="category-5">Category 5</option>
                      </select>

                      {/* <select
                        className="form-select form-select-sm mt-2"
                        aria-label=".form-select-sm"
                        name="reson_for_name"
                        value={resonForVisitData.name}
                        onChange={handleResonInput}
                      >
                        <option selected>Select Visit Type</option>
                        {reasonFor.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.DiagnosisProcedureFor_name}
                            >
                              {item.DiagnosisProcedureFor_name}
                            </option>
                          );
                        })}
                      </select> */}
                      <ReactSearchAutocomplete
                        showIcon={false}
                        placeholder={"Search Reason For Visit"}
                        items={reasonVisitType}
                        className="search-reason-for-visit"
                        onClear={onClearReasonForVisit}
                        inputSearchString={searchReasonForVisit || ""}
                        onSearch={(value) =>
                          setSearchReasonForVisit(value)
                        }
                        autoFocus
                        formatResult={(item) => {
                          return (
                            <div
                              style={{
                                padding: "3px",
                                margin: "0px",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "14px",
                                  margin: "0px",
                                  padding: "0px",
                                  color: "#312e2e",
                                }}
                              >
                                {item?.DiagnosisProcedure_name}
                              </p>
                            </div>
                          );
                        }}
                        resultStringKeyName="DiagnosisProcedure_name"
                        onSelect={(item) => {
                          setresonForVisitData({
                            ...resonForVisitData,
                            code: item?.DiagnosisProcedure_code,
                            reson_for_name: item?.DiagnosisProcedure_name,
                          });
                        }}
                        maxResults={10}
                        fuseOptions={{
                          keys: ["DiagnosisProcedure_name"],
                        }}
                        styling={{
                          borderRadius: "5px !important",
                          width: "100%",
                          fontSize: "14px",
                          placeholderColor: "grey",
                          clearIconMargin: "0px 5px",
                          searchIconMargin: "0px 5px",
                          height: "35px",
                          boxShadow: "0px 0px 0px 0px",
                          lineColor: "transparent",
                          ul: "ul",
                        }}
                      />

                      <div className="mt-3">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="Write here"
                          name="reson_further_details"
                          onChange={handleResonInput}
                          value={resonForVisitData.reson_further_details}
                        ></textarea>
                      </div>

                      <div className="float-right mt-3">
                        <button
                          className=" rounded  fw-bold me-1"
                          onClick={handleReasonSubmit}
                          style={{
                            backgroundColor: "#69B128",
                            padding: "6px 25px",
                            color: "white",
                            border: "0",
                            outline: "none",
                          }}
                        >

                          Save
                        </button>
                        <button
                          className=" rounded  fw-bold mx-1"
                          onClick={closeModal}
                          style={{
                            backgroundColor: "#FFFFFF",
                            padding: "6px 20px",
                            color: "black",
                            border: "1px solid #69B128 ",
                            outline: "none",
                          }}
                        >

                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            <h5 className="mt-5">Reason For Visit</h5>

            <table className="tablenur mt-2">
              <tr className="lol">
                <th>Visit Type</th>
                <th>Category</th>
                <th>Reason For Visit</th>
                <th>Further Details</th>
                <th>Action</th>
              </tr>

              {allReasonForVisit.map((item, i) => {
                return (
                  <tr key={i} id={item.id}>
                    <td>{item.reson_name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.reson_for_name}</td>
                    <td>{item.reson_further_details}</td>
                    <td>
                      <i
                        className="fa fa-edit "
                        style={{ fontSize: "20px" }}
                        onClick={(e) => handleReasonEdit(e, item.id)}
                      ></i>
                      <i
                        className="fa fa-trash text-danger mx-2 "
                        style={{ fontSize: "20px" }}
                        onClick={(e) => handleDeleteReason(e, item.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </table>

            <Modal
              isOpen={modalReasonEditIsOpen}
              onRequestClose={closeEditReasonModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="card-body">
                <span
                  className="float-end"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={closeEditReasonModal}
                >
                  <i className="fal fa-times"></i>
                </span>

                <h5 className="">

                  <b>Edit Reason For Visit </b>
                </h5>

                <div className="row">
                  <div className="col-12 d-flex">
                    <div className="col-5 mt-4">
                      <h6 className="mt-2 ml-1">Visit Type</h6>
                      <h6 className="mt-4 ml-1">Category</h6>
                      <h6 className="mt-4">Reason For Visit</h6>
                      <h6 className="mt-4">Further Details</h6>
                    </div>
                    <div className="col-7 mt-4">
                      <select
                        className="form-select form-select-sm mt-2"
                        aria-label=".form-select-sm"
                        name="reson_name"
                        value={editReasonData.reson_name}
                        onChange={handleReasonEditFunc}
                      >
                        <option selected>Select Visit Type</option>
                        {reasonVisitType.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.DiagnosisProcedure_name}
                            >
                              {item.DiagnosisProcedure_name}
                            </option>
                          );
                        })}
                      </select>

                      <select
                        className="form-select form-select-sm mt-2"
                        aria-label=".form-select-sm"
                        name="category_name"
                        value={editReasonData.category_name}
                        onChange={handleReasonEditFunc}
                      >
                        <option selected>Select Category</option>
                        <option value="category-1">Category 1</option>
                        <option value="category-2">Category 2</option>
                        <option value="category-3">Category 3</option>
                        <option value="category-4">Category 4</option>
                        <option value="category-5">Category 5</option>
                      </select>

                      <select
                        className="form-select form-select-sm mt-2"
                        aria-label=".form-select-sm"
                        name="reson_for_name"
                        value={editReasonData.reson_for_name}
                        onChange={handleReasonEditFunc}
                      >
                        <option selected>Select Visit Type</option>
                        {reasonFor.map((item, i) => {
                          return (
                            <option
                              key={i}
                              value={item.DiagnosisProcedureFor_name}
                            >
                              {item.DiagnosisProcedureFor_name}
                            </option>
                          );
                        })}
                      </select>

                      <div className="mt-3">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="Write here"
                          name="reson_further_details"
                          onChange={handleReasonEditFunc}
                          value={editReasonData.reson_further_details}
                        ></textarea>
                      </div>

                      <div className="float-right mt-3">
                        <button
                          className=" rounded  fw-bold me-1"
                          onClick={ReasonUpdate}
                          style={{
                            backgroundColor: "#69B128",
                            padding: "6px 25px",
                            color: "white",
                            border: "0",
                            outline: "none",
                          }}
                        >

                          Update
                        </button>
                        <button
                          className=" rounded  fw-bold mx-1"
                          onClick={closeEditReasonModal}
                          style={{
                            backgroundColor: "#FFFFFF",
                            padding: "6px 20px",
                            color: "black",
                            border: "1px solid #69B128 ",
                            outline: "none",
                          }}
                        >

                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>

            <button
              className="float-end rounded fw-bold me-1 mt-4"
              onClick={openModal}
              style={{
                backgroundColor: "#69B128",
                padding: "6px 27px",
                color: "white",
                border: "0",
                outline: "none",
              }}
            >

              Add
            </button>

            <h5 className="mt-5">Vital Sign Reading</h5>

            {/* <Modal
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
                  <i className="fal fa-times"></i>
                </span>

                <h5 className="">

                  <b>Add Vital Reading</b>
                </h5>

                <div className="row">
                  <div className="col-12 d-flex">
                    <div className="col-5 mt-4">
                      <h6 className="mt-2 ml-1">Parameters</h6>
                      <h6 className="mt-4">Ref. Range</h6>
                      <h6 className="mt-4">Values</h6>
                      <h6 className="mt-4">Remarks</h6>
                    </div>
                    <div className="col-7 mt-4">
                      <select
                        className="form-select form-select-sm mt-2"
                        aria-label=".form-select-sm"
                        name="name"
                        value={vitalInfoAdd.name}
                        onChange={handleVitalInfoAdd}
                      >
                        <option selected>Select Parameters</option>
                        {vitaSignArray.map((item, i) => {
                          return (
                            <option key={i} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>

                      <input
                        type="text"
                        className="form-control mt-3"
                        id="exampleFormControlInput1"
                        aria-label="default input example"
                        name="ref_range_value"
                        onChange={handleVitalInfoAdd}
                        value={vitalRefValue.value}
                        disabled
                      />

                      <input
                        type="text"
                        className="form-control mt-3"
                        id="exampleFormControlInput1"
                        placeholder="Write here"
                        aria-label="default input example"
                        name="value"
                        onChange={handleVitalInfoAdd}
                        value={vitalInfoAdd.value}
                      />

                      <div className="mt-3">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="Write here"
                          name="remarks"
                          onChange={handleVitalInfoAdd}
                          value={vitalInfoAdd.remarks}
                        ></textarea>
                      </div>

                      <div className="float-right mt-3">
                        <button
                          className=" rounded  fw-bold me-1"
                          onClick={handleSubmitData}
                          style={{
                            backgroundColor: "#69B128",
                            padding: "6px 25px",
                            color: "white",
                            border: "0",
                            outline: "none",
                          }}
                        >

                          Save
                        </button>
                        <button
                          className=" rounded  fw-bold mx-1"
                          onClick={closeModal}
                          style={{
                            backgroundColor: "#FFFFFF",
                            padding: "6px 20px",
                            color: "black",
                            border: "1px solid #69B128 ",
                            outline: "none",
                          }}
                        >

                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal> */}
            <>
              <NewModal size="lg" isOpen={modalIsOpen} onClose={closeModal}>
                <NewModal.Header isShowCloseIcon={false} onClose={closeModal}>
                  <NewModal.Title>Patient's Vital Sign</NewModal.Title>

                </NewModal.Header>

                <NewModal.Body
                  styles={{
                    minHeight: "400px",
                  }}
                >
                  <General
                    patient_id={patientInfo?.id}
                    appId={0}
                    from="patientVitalReading"
                    setUpdateForHistory={setRenderData}
                  />
                </NewModal.Body>
                <NewModal.Footer>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{ borderRadius: "5px" }}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Close
                  </button>
                </NewModal.Footer>
              </NewModal>
            </>
            {/* <table className="tablenur mt-2">
              <tr className="lol">
                <th>Paramiters</th>
                <th>Ref. Range</th>
                <th>Values</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>

              {allVitals.map((item, i) => {
                return (
                  <tr key={i} id={item.id}>
                    <td>{item.name}</td>
                    <td>{item.ref_range_value}</td>
                    <td>{item.value}</td>
                    <td>{item.remarks}</td>
                    <td>
                      <i
                        className="fa fa-edit "
                        style={{ fontSize: "20px" }}
                        onClick={(e) => handleEdit(e, item.id)}
                      ></i>
                      <i
                        className="fa fa-trash text-danger mx-2 "
                        style={{ fontSize: "20px" }}
                        onClick={(e) => handleDelete(e, item.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </table> */}
            <div className=" all-vital-sign-container">
              {allVitals?.length > 0 ? (
                <table className="vital-sign-modal-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      {
                        vitaSignArray.map((item, i) => {
                          return (
                            <th key={i}>{item.name}</th>
                          )
                        })
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      allVitals?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.date}</td>
                            {
                              item?.vital_signs?.map((vt, i) => <td key={i}>{vt?.value ? vt?.value : "-"}</td>
                              )
                            }

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              ) : (
                <h6 className="text-danger text-center">
                  No vital sign added !
                </h6>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientVitalReading;
