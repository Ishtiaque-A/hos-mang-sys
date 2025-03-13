import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientAdmission.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchPatientModal from "./SearchPatientModal";
import moment from "moment";

export default function PatientAdmission() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [childData, setChildData] = useState("");
  const [submitloading, setSubmitLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [reasonForVisit, setReasonForVisit] = useState([]);
  const [searchReasonForVisit, setSearchReasonForVisit] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    department: null,
    doctor: null,
    specialist: null,
    block: "",
    ward: "",
    level: "",
    bed: "",
    unit: "",
    cabin: "",
    PRN: "",
    note: "",
    admissionDate: null,
    reasonForAdmission: "",
    referred_by: "",
    paying: "",
    nonpaying: "",
  });

  useEffect(() => {
    axios.get(`/doctors`).then((res) => {
      setDoctors(res?.data?.doctors || []);
    });
    axios.get(`/department`).then((res) => {
      if (res.data.status === 200) {
        setDepartments(res.data.department || []);
      }
    });
    axios.get(`reason-for-visit-only`).then((res) => {
      setReasonForVisit(res?.data?.reason);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: value });
    setFormErrors({ ...formErrors, [actionMeta.name]: "" });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, admissionDate: date });
    setFormErrors({ ...formErrors, admissionDate: "" });
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!childData?.id) {
      errors.patient = "Please select a patient.";
    }
    if (!formData.department) {
      errors.department = "Please select a department.";
    }
    if (!formData.specialist) {
      errors.specialist = "Please select a specialist.";
    }
    if (!formData.doctor) {
      errors.doctor = "Please select a doctor.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    }
    setSubmitLoading(true);

    const payload = {
      patient_id: childData?.id,
      specialist_id: formData.specialist?.id,
      department_id: formData.department?.id,
      doctor_id: formData.doctor?.id,
      block: formData.block,
      PRN: formData.PRN,
      level: formData.level,
      unit: formData.unit,
      admission_date: formData.admissionDate
        ? formData.admissionDate.toISOString().split("T")[0]
        : null,
      ward: formData.ward,
      bed: formData.bed,
      note: formData.note,
      cabin: formData.cabin,
      status: 0, // Default to 'pending'
      reason_for_admission: formData.reasonForAdmission,
      referred_by: formData.referred_by,
      paying: formData.paying,
      nonpaying: formData.nonpaying,
    };

    try {
      const res = await axios.post("/save-admit", payload);
      console.log(res);
      Swal.fire({
        title: "Success!",
        text: "Patient admission saved successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setSubmitLoading(false);
      navigate("/patient-admission-list");

      setFormData({
        specialist: null,
        department: null,
        doctor: null,
        block: "",
        PRN: "",
        level: "",
        unit: "",
        admissionDate: null,
        ward: "",
        bed: "",
        cabin: "",
        note: "",
        reasonForAdmission: "",
        referred_by: "",
        paying: "",
        nonpaying: "",
      });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        title: "Error!",
        text: "An error occurred while saving patient admission.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setSubmitLoading(false);
    }
  };

  const ReactSelectStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      borderRadius: "10px",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      margin: "0px",
      padding: "0px",
      overflowX: "hidden",
      overflowY: "auto",
      maxHeight: "250px",
      "&::-webkit-scrollbar": {
        width: "7px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cccccc",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#fcfcfc",
      },
      scrollbarWidth: "thin",
      scrollbarColor: "#cccccc #fcfcfc",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? "#69B128" : provided.color,
      backgroundColor:
        state.isSelected || state.isFocused
          ? " #fcfcfc"
          : provided.backgroundColor,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#69B128" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #69B128" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#69B128" : provided.borderColor,
      },
    }),
  };

  const [isOpenSearchPatientModal, setIsOpenSearchPatientModal] =
    useState(false);

  const handleClosedSearchPatientModal = () => {
    setIsOpenSearchPatientModal(false);
  };
  const handleOpenSearchPatientModal = () => {
    setIsOpenSearchPatientModal(true);
  };
  const calculateAge = (dob) => {
    const birthDate = moment(dob);
    const now = moment();

    if (!birthDate.isValid()) {
      return "N/A"; // If the date of birth is invalid
    }

    const years = now.diff(birthDate, "years");
    const months = now.diff(birthDate, "months") % 12;
    const days = now.diff(
      birthDate.add(years, "years").add(months, "months"),
      "days"
    );

    let ageString = "";

    if (years > 0) {
      ageString += `${years} ${years === 1 ? "year" : "years"}`;
    }
    if (months > 0) {
      ageString += `${years > 0 ? ", " : ""}${months} ${months === 1 ? "month" : "months"
        }`;
    }
    if (days > 0) {
      ageString += `${years > 0 || months > 0 ? ", " : ""}${days} ${days === 1 ? "day" : "days"
        }`;
    }

    return ageString || "0 days";
  };
  console.log(formData)
  const [reasonSearchValue, setReasonSearchValue] = useState("")
  return (
    <div className="ms-2">
      <div className="custom-card p-2 mt-2 min-hv-100">
        <div className="row">
          <div className="custom-card patients-head d-flex justify-content-between align-items-center">
            <h5 className="fw-normal py-1 mt-1 px-2 text-start text-login">
              Patients Admission
            </h5>
            <Link to="/patient-admission">
              <button
                onClick={handleOpenSearchPatientModal}
                className="patient-card-booking-app p-1 px-2"
              >
                Add Patients
              </button>
            </Link>
            <SearchPatientModal
              isOpen={isOpenSearchPatientModal}
              onClose={handleClosedSearchPatientModal}
              sendDataToParent={setChildData}
            />
          </div>
          <div className="custom-card patients-head mt-2 pt-2 row mx-auto">
            {childData === "" ? (
              <></>
            ) : (
              <>
                <div className="row g-doc-patient-details border-bottom pb-1">
                  <div className="col-1">
                    {childData?.patient_images !== "" ? (
                      <img
                        src={`${global.img_url}/images/files/${childData?.patient_images}`}
                        alt=""
                        className="img-fluid g-doc-patient-img"
                      />
                    ) : (
                      <>
                        <img
                          src="https://i.ibb.co.com/bs5DczT/istockphoto-1331432256-612x612.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </>
                    )}
                  </div>
                  <div className="col-3">
                    <div className="d-flex">
                      <span className="me-1 ">
                        <span className="mhp-patient-details-title">
                          Medical No
                        </span>
                        :
                      </span>
                      <p>{childData?.patient_hn_number}</p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">Name</span>{" "}
                        :
                      </span>
                      <p
                        style={{
                          fontSize: "11px",
                        }}
                      >
                        {childData?.fullName === "" ? "" : childData?.fullName}
                      </p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1 ">
                        <span className="mhp-patient-details-title">
                          Religion
                        </span>{" "}
                        :
                      </span>
                      <p>{childData?.religion?.religion_name}</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-flex">
                      <span className="me-1 ">
                        <span className="mhp-patient-details-title">
                          Health ID
                        </span>{" "}
                        :
                      </span>
                      <p>
                        {childData?.patient_hn_number === ""
                          ? " "
                          : childData?.patient_hn_number}
                      </p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1 ">
                        <span className="mhp-patient-details-title">Age</span> :
                      </span>
                      <p>
                        {childData?.patient_dob
                          ? calculateAge(childData?.patient_dob)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">
                          Natioal ID
                        </span>
                        :
                      </span>
                      <p>{childData?.patient_nid}</p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">D.O.B</span>{" "}
                        :
                      </span>
                      <p>
                        {childData?.patient_dob
                          ? moment(childData?.patient_dob).format("DD/MM/YYYY")
                          : ""}
                      </p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">
                          Alcohol
                        </span>{" "}
                        :
                      </span>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">
                          Blood Group
                        </span>
                        :
                      </span>
                      <p>{childData?.blood_group?.blood_group_name}</p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">
                          Gender
                        </span>{" "}
                        :
                      </span>
                      <p>{childData?.patient_birth_sex?.birth_sex_name}</p>
                    </div>
                    <div className="d-flex">
                      <span className="me-1">
                        <span className="mhp-patient-details-title">
                          Smoking
                        </span>{" "}
                        :
                      </span>
                    </div>
                  </div>
                </div>{" "}
              </>
            )}

            <div className="col-6 mt-3 ">
              <div className="mb-2">
                <label className="form-label fw-bold">PRN</label>
                <input
                  type="text"
                  className="form-control form-control-sm extraPadding"
                  placeholder="ex. 123456"
                  name="PRN"
                  value={formData.PRN}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold">Department</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="department"
                  options={departments}
                  getOptionLabel={(option) => option?.departments_name}
                  getOptionValue={(option) => option?.id}
                  value={formData.department}
                  styles={ReactSelectStyles}
                  onChange={handleSelectChange}
                />
              </div>
              {formErrors.department && (
                <div className="text-danger">{formErrors.department}</div>
              )}
            </div>
            <div className="col-6 mt-3">
              <div className="mb-2">
                <label className="form-label fw-bold">Specialist</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="specialist"
                  options={doctors}
                  value={formData.specialist}
                  getOptionLabel={(option) =>
                    `${option?.title?.title_name} ${option?.fullName
                    } ${option?.academic?.map((it) => it?.degree_id)}`
                  }
                  getOptionValue={(option) => option?.id}
                  styles={ReactSelectStyles}
                  onChange={handleSelectChange}
                />
              </div>
              {formErrors.specialist && (
                <div className="text-danger">{formErrors.specialist}</div>
              )}
              <div className="mb-2">
                <label className="form-label fw-bold">Doctor</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="doctor"
                  value={formData.doctor}
                  options={doctors}
                  getOptionLabel={(option) =>
                    `${option?.title?.title_name} ${option?.fullName
                    } ${option?.academic?.map((it) => it?.degree_id)}`
                  }
                  getOptionValue={(option) => option?.id}
                  styles={ReactSelectStyles}
                  onChange={handleSelectChange}
                />
                {formErrors.doctor && (
                  <div className="text-danger">{formErrors.doctor}</div>
                )}
              </div>
            </div>

            <div className="col-2">
              <div className="mb-2">
                <label className="form-label fw-bold">Block</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Block"
                  name="block"
                  value={formData.block}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold">Ward</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="mb-2">
                <label className="form-label fw-bold">Level</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Level"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label fw-bold">Bed</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Bed"
                  name="bed"
                  value={formData.bed}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="mb-2">
                <label className="form-label fw-bold">Unit</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Cabin</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Cabin"
                  name="cabin"
                  value={formData.cabin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="mb-2">
                <label className="form-label fw-bold">Admission Date</label>
                <ReactDatePicker
                  className="p-0 m-0"
                  placeholderText="DD/MM/YYYY"
                  selected={formData.admissionDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-bold">
                  Referred By
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="referred_by"
                  value={formData.referred_by}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label className="form-label fw-bold">
                  Reason for Admission
                </label>
                <ReactSearchAutocomplete
                  showIcon={false}
                  placeholder={"Search Reason for Admission"}
                  items={reasonForVisit}
                  resultStringKeyName="DiagnosisProcedure_name"
                  inputSearchString={reasonSearchValue || ""}
                  onSearch={(value) =>
                    setReasonSearchValue(value)
                  }
                  onSelect={(item) => {
                    setFormData({ ...formData, reasonForAdmission: item.DiagnosisProcedure_name });
                    console.log(item);
                  }}
                  maxResults={5}
                  fuseOptions={{ keys: ["DiagnosisProcedure_name"] }}
                  styling={{
                    borderRadius: "10px !important",
                    width: "100%",
                    zIndex: 999,
                    height: "34px",
                    boxShadow: "none !important",
                  }}
                />
              </div>
            </div>

            <div className="col-6 ">
              <div className="mb-2">
                <div className="ml-5 mt-4">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input mt-2"
                      name="paying"
                      id="paying"
                      value="Paying"
                      checked={formData.paying === "Paying"}
                      onChange={(e) => setFormData({ ...formData, paying: e.target.value })}
                    />
                    <label className="form-check-label ms-1" for="paying">
                      Paying
                    </label>
                  </div>
                  <div className="form-check form-check-inline ml-3">
                    <input
                      type="radio"
                      className="form-check-input mt-2"
                      name="paying"
                      id="nonPaying"
                      value="Non-Paying"
                      checked={formData.paying === "Non-Paying"}
                      onChange={(e) => setFormData({ ...formData, paying: e.target.value })}
                    />
                    <label htmlFor="nonPaying" className="form-check-label ms-1">
                      Non-Paying
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="mb-2">
                <label className="form-label fw-bold"> Note: </label>

                <textarea
                  name="note"
                  className="form-control form-control-sm p-2"
                  rows="7"
                  style={{ padding: "100px !important" }}
                  placeholder="......"
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4 rx-one-button-group">
          <button
            className="btn px-3"
            onClick={handleSave}
            disabled={submitloading}
          >
            {submitloading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
