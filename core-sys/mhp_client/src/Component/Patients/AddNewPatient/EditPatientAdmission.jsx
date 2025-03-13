import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientAdmission.css";
import Swal from "sweetalert2";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import moment from "moment";

export default function EditPatientAdmission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reasonForVisit, setReasonForVisit] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [childData, setChildData] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [searchReasonForVisit, setSearchReasonForVisit] = useState("");
    const [reasonSearchValue, setReasonSearchValue] = useState("");
  const [formData, setFormData] = useState({
    patientName: "",
    department: null,
    doctorId: null,
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

  const ReactSelectStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
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

  useEffect(() => {
    // Fetch admission details
    axios
      .get(`/get-admit/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const admissionData = res.data.data;

          setChildData(admissionData);
          setFormData({
            patientName: admissionData?.patient?.fullName || "",
            departmentId: admissionData?.department?.id || null,
            doctorId: admissionData.doctor_id || null,
            specialist: admissionData.specialist_id || null,
            block: admissionData.block || "",
            ward: admissionData.ward || "",
            level: admissionData.level || "",
            bed: admissionData.bed || "",
            unit: admissionData.unit || "",
            cabin: admissionData.cabin || "",
            PRN: admissionData.PRN || "",
            note: admissionData.note || "",
            admissionDate: admissionData.admission_date
              ? new Date(admissionData.admission_date)
              : null,
            reasonForAdmission: admissionData.reason_for_admission || "",
            referred_by: admissionData.referred_by || "",
            paying: admissionData.paying || "",
            nonpaying: admissionData.nonpaying || "",
          });
        } else {
          console.error("Error fetching admission data:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching admission details:", err);
      });

    // Fetch doctors
    axios.get(`/doctors`).then((res) => {
      setDoctors(res?.data?.doctors || []);
    });

    // Fetch departments
    axios.get(`/department`).then((res) => {
      if (res.data.status === 200) {
        setDepartments(res.data.department || []);
      }
    });

    axios.get(`reason-for-visit-only`).then((res) => {
      setReasonForVisit(res?.data?.reason);
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: value.id });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, admissionDate: date });
  };

  const handleSave = async () => {
    setSubmitLoading(true);

    const payload = {
      patient_id: childData?.id || formData.patientId,
      specialist_id: formData.specialist,
      department_id: formData.departmentId,
      doctor_id: formData.doctorId,
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
      reason_for_admission: formData.reasonForAdmission,
      referred_by: formData.referred_by,
      paying:formData.paying,
      nonpaying: formData.nonpaying,
    };

    console.log("payload", payload);
    try {
      await axios.put(`/update-admit/${id}`, payload);
      Swal.fire({
        title: "Success!",
        text: "Patient admission updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSubmitLoading(false);
      navigate("/patient-admission-list");
    } catch (error) {
      console.error("Error updating admission:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the admission.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setSubmitLoading(false);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = moment(dob);
    const now = moment();
    if (!birthDate.isValid()) return "N/A";
    const years = now.diff(birthDate, "years");
    const months = now.diff(birthDate.add(years, "years"), "months");
    const days = now.diff(birthDate.add(months, "months"), "days");
    return (
      `${years > 0 ? `${years} years` : ""} ${
        months > 0 ? `${months} months` : ""
      } ${days > 0 ? `${days} days` : ""}`.trim() || "0 days"
    );
  };

  return (
    <div className="ms-2">
      <div className="custom-card p-2 mt-2 min-hv-100">
        <div className="row">
          <div className="custom-card patients-head d-flex justify-content-between align-items-center">
            <h5 className="fw-normal py-1 mt-1 px-2 text-start text-login">
              Update Patients Admission
            </h5>
          </div>
          <div className="row g-doc-patient-details border-bottom py-2">
            <div className="col-1">
              {childData?.patient?.patient_images !== "" ? (
                <img
                  src={`${global.img_url}/images/files/${childData?.patient?.patient_images}`}
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
                  <span className="mhp-patient-details-title">Medical No</span>:
                </span>
                <p>{childData?.patient?.patient_hn_number}</p>
              </div>
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Name</span> :
                </span>
                <p
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {childData?.fullName === ""
                    ? ""
                    : childData?.patient?.fullName}
                </p>
              </div>
              <div className="d-flex">
                <span className="me-1 ">
                  <span className="mhp-patient-details-title">Religion</span> :
                </span>
                <p>{childData?.patient?.religion_name}</p>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Health ID</span>:
                </span>
                <p>{childData?.patient_id}</p>
              </div>
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Age</span>:
                </span>
                <p>{calculateAge(childData?.patient?.patient_dob)}</p>
              </div>
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Gender</span>:
                </span>
                <p>{childData?.patient?.patient_birth_sex?.birth_sex_name}</p>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Natioal ID</span>:
                </span>
                <p>{childData?.patient?.patient_nid}</p>
              </div>
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">D.O.B</span> :
                </span>
                <p>
                  {childData?.patient?.patient_dob
                    ? moment(childData?.patient?.patient_dob).format(
                        "DD/MM/YYYY"
                      )
                    : ""}
                </p>
              </div>
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Alcohol</span> :
                </span>
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Blood Group</span>
                  :
                </span>
                <p>{childData?.patient?.blood_group?.blood_group_name}</p>
              </div>
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Smoking</span> :
                </span>
              </div>
            </div>
          </div>

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
                name="departmentId"
                options={departments}
                getOptionLabel={(option) => option?.departments_name}
                getOptionValue={(option) => option?.id}
                value={departments?.filter(
                  (option) => option?.id === formData?.departmentId
                )}
                styles={ReactSelectStyles}
                onChange={handleSelectChange}
              />
            </div>
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
                value={doctors?.filter(
                  (option) => option?.id === formData?.specialist
                )}
                getOptionLabel={(option) =>
                  `${option?.title?.title_name} ${
                    option?.fullName
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
                name="doctorId"
                value={doctors?.filter(
                  (option) => option?.id === formData?.doctorId
                )}
                options={doctors}
                getOptionLabel={(option) =>
                  `${option?.title?.title_name} ${
                    option?.fullName
                  } ${option?.academic?.map((it) => it?.degree_id)}`
                }
                getOptionValue={(option) => option?.id}
                styles={ReactSelectStyles}
                onChange={handleSelectChange}
              />
            </div>
          </div>

          <div className="row mt-3">
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
      
            <div className="col-4">
   
              <div className="mb-2">
                <label className="form-label fw-bold">
                Search  Reason for Admission
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
            <div className="col-4">
            <div className="mb-2">
                <label className="form-label fw-bold">
                Reason for Admission
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="reasonForAdmission"
                  value={formData.reasonForAdmission}
                  onChange={handleInputChange} disabled
                />
              </div>
            </div>
            <div className="col-4 ">
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
                  style={{ padding: "100px" }}
                  placeholder="......"
                  onChange={handleInputChange}
                  value={formData.note}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end mt-4 rx-one-button-group">
                <button className="btn px-3" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
