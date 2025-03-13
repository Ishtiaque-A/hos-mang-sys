import React, { useEffect, useState } from "react";
import { NewModal } from "../../../common/components/NewModal";
import { formatPhoneNumber, formateHN } from "../../../utils/numberHelper";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import useUserData from "../../../hooks/useUserData";
import Button from "../../../common/components/Button";

import ReactDatePicker from "react-datepicker";
import "./SearchPatientModal.css";

import PhoneInput from "react-phone-number-input";
const SearchPatientModal = ({
  isOpen,
  onClose,
  setUpdateSchedule,
  sendDataToParent,
}) => {
  const [searchResult, setSearchResult] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [search, setSearch] = useState(null);
  const [options, setOptions] = useState("mobile");
  const user = useUserData();

  const searchHandler = (e) => {
    e.preventDefault();
    if (search !== null) {
      console.log("serche data", search);
      axios
        .post(`/patient-search-for-doctor/${search.replace(/\s+/g, "")}`, {
          doctor_id: user?.user_id,
        })
        .then((res) => {
          setSearchResult(res.data);
          setErrorData(null);
        })
        .catch((err) => {
          setErrorData("No Data Found , Please Check Again?");
          setSearchResult(null);
        });
    } else {
      toast.error("Please insert patient mobile or hn number");
    }
  };

  const clearHandle = () => {
    setSearchResult(null);
    setErrorData(null);
    setSearch(null);
  };

  const randomChange = (e) => {
    setSearch(null);
    setOptions(e.target.value);
  };
  const handleCloseModal = () => {
    setSearchResult(null);
    setErrorData(null);
    setSearch(null);
    onClose();
    setRegister(false);
    setNewPatientInfo({
      patient_hn_number: "",
      patient_first_name: "",
      patient_mobile_phone: "",
      patient_email: "",
      patient_dob: "",
      ptn_blood_group_id: "",
      patient_birth_sex_id: "",
      patient_address1: "",
      patient_images: "",
      saas_branch_id: "",
      saas_branch_name: "",
      createUser: false,
      age: "",
      days: "",
      months: "",
    });
  };
  const [genderList, setGenderList] = useState([]);
  const [bloodGroupList, setBloodGroupList] = useState([]);

  const handleAdmitPatient = (item) => {
    handleCloseModal();
    sendDataToParent(item);
  };

  useEffect(() => {
    axios.get(`/gender-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setGenderList(res.data.gender);
      }
    });
    axios.get(`/blood-group`).then((res) => {
      if (res.data.status === 200) {
        setBloodGroupList(res.data.blood_group);
      }
    });
  }, []);
  // ADD PATIENT
  console.log(user, "user");
  const [register, setRegister] = useState(false);
  const [newPatientInfo, setNewPatientInfo] = useState({
    patient_hn_number: "",
    patient_first_name: "",
    patient_mobile_phone: "",
    patient_email: "",
    patient_dob: "",
    ptn_blood_group_id: "",
    patient_birth_sex_id: "",
    patient_address1: "",
    patient_images: "",
    saas_branch_id: "",
    saas_branch_name: "",
    createUser: false,
    age: "",
  });
  const startRegister = () => {
    setRegister(true);
  };
  const handleChange = (e) => {
    setNewPatientInfo({ ...newPatientInfo, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    setNewPatientInfo({ ...newPatientInfo, patient_images: e.target.files[0] });
  };
  const closeImage = () => {
    setNewPatientInfo({ ...newPatientInfo, patient_images: "" });
    document.getElementById("PatientImageUrl").value = "";
  };
  console.log(newPatientInfo, "newPatientInfo");
  const handleSubmitPatient = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newPatientInfo?.patient_images);
    formData.append("patient_first_name", newPatientInfo?.patient_first_name);
    formData.append(
      "patient_mobile_phone",
      newPatientInfo?.patient_mobile_phone
    );
    formData.append("patient_email", newPatientInfo?.patient_email);
    formData.append("patient_dob", newPatientInfo?.patient_dob);
    formData.append("ptn_blood_group_id", newPatientInfo?.ptn_blood_group_id);
    formData.append(
      "patient_birth_sex_id",
      newPatientInfo?.patient_birth_sex_id
    );
    formData.append("patient_address1", newPatientInfo?.patient_address1);
    formData.append("patient_status", "1");
    formData.append("saas_branch_id", user?.branch_id);
    formData.append("saas_branch_name", user?.branch_name);
    formData.append("StartTime", new Date());
    formData.append("EndTime", new Date(Date.now() + 10 * 60000));
    formData.append("doctor_id", user?.user_id);
    formData.append("organization_id", user?.organization_id);
    formData.append("createUser", newPatientInfo?.createUser);
    formData.append("age", newPatientInfo?.age);
    formData.append("day", newPatientInfo?.days);
    formData.append("month", newPatientInfo?.months);
    axios
      .post("/save-patient-from-greatdoc", formData)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Patient Registered Successfully");
          setRegister(false);
          sendDataToParent(res?.data?.patients);
          setUpdateSchedule(Math.random());
          setNewPatientInfo({
            patient_hn_number: "",
            patient_first_name: "",
            patient_mobile_phone: "",
            patient_email: "",
            patient_dob: "",
            ptn_blood_group_id: "",
            patient_birth_sex_id: "",
            patient_address1: "",
            patient_images: "",
            saas_branch_id: "",
            saas_branch_name: "",
            age: "",
            days: "",
            months: "",
          });
          handleCloseModal();
        }
      })
      .catch((err) => {
        const { errors, message } = err.response.data;
        if (errors?.patient_first_name) {
          toast.error(errors?.patient_first_name[0]);
          return;
        }
        if (errors?.patient_mobile_phone) {
          toast.error(errors?.patient_mobile_phone[0]);
          return;
        }
        if (errors?.patient_dob) {
          toast.error("Patient date of birth is required");
          return;
        }
        if (errors?.patient_birth_sex_id) {
          toast.error("Patient Gender is required");
          return;
        }
        if (message) {
          toast.error(message);
          return;
        }
        console.log(err.response.data);
      });
  };
  const calculateDateFromAge = (days = 0, months = 0, years = 0) => {
    const currentDate = new Date();

    // Subtract the provided values from the current date
    const calculatedDate = new Date(
      currentDate.getFullYear() - years,
      currentDate.getMonth() - months,
      currentDate.getDate() - days
    );

    // Check for invalid date
    if (isNaN(calculatedDate.getTime())) {
      return { error: "Invalid date input" };
    }

    return { date: calculatedDate };
  };
  const calculateAgeFromDate = (inputDate) => {
    const givenDate = new Date(inputDate);
    const currentDate = new Date();

    // Check for invalid date input
    if (isNaN(givenDate.getTime())) {
      return { error: "Invalid date input" };
    }

    // Calculate differences
    let years = currentDate.getFullYear() - givenDate.getFullYear();
    let months = currentDate.getMonth() - givenDate.getMonth();
    let days = currentDate.getDate() - givenDate.getDate();

    // Adjust for negative values in months and days
    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  const handleAge = (days, months, years) => {
    const { date, error } = calculateDateFromAge(days, months, years);
    if (!error) {
      setNewPatientInfo({
        ...newPatientInfo,
        patient_dob: date,
        age: `${years || 0}`,
        days: days,
        months: months,
        years: years,
      });
    } else {
      console.error(error);
    }
  };
  const handleDate = (inputDate) => {
    const { years, months, days, error } = calculateAgeFromDate(inputDate);
    if (!error) {
      handleAge(days, months, years);
    }
  };
  console.log(newPatientInfo, "newPatientInfo");
  return (
    <>
      <NewModal isOpen={isOpen} onClose={handleCloseModal}>
        <NewModal.Header onClose={handleCloseModal}>
          <NewModal.Title>Registered Patient List </NewModal.Title>
          {/* <Button type="button" onClick={startRegister}>
          Add
        </Button> */}
        </NewModal.Header>
        <form onSubmit={handleSubmitPatient}>
          <NewModal.Body
            styles={{
              minHeight: "400px",
            }}
          >
            {!register ? (
              <>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="model_sub_heading mb-3">
                    <label className="Label1 font-weight-bold">
                      Chose an option:{" "}
                    </label>
                    <select name="patient" id="patient" onChange={randomChange}>
                      <option selected value={"mobile"}>
                        Mobile
                      </option>
                      <option value={"HN"}>HN</option>
                      <option value={"DOB"}>DOB</option>
                    </select>
                    <input
                      id="output"
                      name="output"
                      type={options === "DOB" ? "date" : "text"}
                      placeholder="Search here..."
                      value={search}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          searchHandler(e);
                        }
                      }}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />

                    <button
                      className=" button1  search bg-info text-white"
                      onClick={searchHandler}
                      type="button"
                    >
                      Search
                    </button>
                    <button
                      className="button1 clear"
                      type="button"
                      onClick={clearHandle}
                    >
                      Clear
                    </button>
                    <button
                      className="button1 clear"
                      type="button"
                      onClick={startRegister}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {errorData !== null && (
                  <h4 className="errorH4" style={{ textAlign: "center" }}>
                    {errorData}
                  </h4>
                )}

                {searchResult !== null && (
                  <div>
                    <h5 className="h5" style={{ textAlign: "center" }}>
                      Patient Information
                    </h5>
                    <table className="pTable">
                      <thead>
                        <tr className="tr1">
                          <th className="th1">Patient Name</th>
                          <th className="th1">HN no</th>
                          <th className="th1">Phone no</th>
                          <th className="th1">DOB</th>
                          <th className="th1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult != null ? (
                          searchResult.map((item) => {
                            return (
                              <tr key={item.id} className="tr1">
                                <td className="td1">{item.fullName}</td>
                                <td className="td1">
                                  {formateHN(item.patient_hn_number)}
                                </td>
                                <td className="td1">
                                  {formatPhoneNumber(item.patient_mobile_phone)}
                                </td>
                                <td className="td1">
                                  {moment(item.patient_dob).format(
                                    "DD/MM/YYYY"
                                  )}
                                </td>
                                <td
                                  className="td1"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    type="button"
                                    onClick={() => handleAdmitPatient(item)}
                                  >
                                    Admit Patient
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <>
                <d iv className="ml-1 reg-form-appointment">
                  <div className="row p-1 m-1 mt-3  ">
                    <div className="row  ">
                      <div className="row mb-3">
                        <label
                          htmlFor="name"
                          className="col-sm-2 col-form-label fw-bold d-flex "
                        >
                          Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control form-control-sm border-danger"
                            placeholder="Enter Name"
                            name="patient_first_name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="row mb-3">
                        <label
                          htmlFor="dob"
                          className="col-sm-2 col-form-label"
                        >
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-4">
                          <ReactDatePicker
                            dropdownMode="select"
                            selected={
                              newPatientInfo?.patient_dob
                                ? newPatientInfo.patient_dob
                                : new Date()
                            }
                            onChange={(date) => handleDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                          />
                        </div>

                        <label
                          htmlFor="mobile"
                          className="col-sm-2 col-form-label"
                        >
                          Mobile No. <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-4">
                          <PhoneInput
                            className="form-control"
                            defaultCountry="BD"
                            placeholder="Enter Phone number"
                            name="patient_mobile_phone"
                            required
                            onChange={(v) =>
                              setNewPatientInfo({
                                ...newPatientInfo,
                                patient_mobile_phone: v,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Age and Email */}
                    <div className="row mb-3">
                      <div className="col-md-6 d-flex align-items-center">
                        <label
                          htmlFor="age"
                          className="col-sm-4 col-form-label"
                        >
                          Age
                        </label>
                        <div className="col d-flex">
                          <input
                            type="number"
                            name="days"
                            max={200}
                            className="form-control form-control-sm me-1"
                            placeholder="DD"
                            value={newPatientInfo?.days || ""}
                            onChange={(e) =>
                              handleAge(
                                e.target.value,
                                newPatientInfo?.months || 0,
                                newPatientInfo?.years || 0
                              )
                            }
                          />
                          <input
                            type="number"
                            name="months"
                            max={12}
                            className="form-control form-control-sm me-1"
                            placeholder="MM"
                            value={newPatientInfo?.months || ""}
                            onChange={(e) =>
                              handleAge(
                                newPatientInfo?.days || 0,
                                e.target.value,
                                newPatientInfo?.years || 0
                              )
                            }
                          />
                          <input
                            type="number"
                            name="years"
                            max={120}
                            className="form-control form-control-sm"
                            placeholder="YYYY"
                            value={newPatientInfo?.years || ""}
                            onChange={(e) =>
                              handleAge(
                                newPatientInfo?.days || 0,
                                newPatientInfo?.months || 0,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-6 d-flex">
                        <label
                          htmlFor="email"
                          className="col-sm-4 col-form-label"
                        >
                          Email:
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="email"
                            name="patient_email"
                            className="form-control form-control-sm"
                            placeholder="Enter Email"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Gender and Image */}
                    <div className="row mb-3">
                      <div className="col-md-6 d-flex">
                        <label
                          htmlFor="gender"
                          className="col-sm-4 col-form-label"
                        >
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-select form-select-sm"
                            name="patient_birth_sex_id"
                            onChange={handleChange}
                          >
                            <option>Select Gender</option>
                            {genderList?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.birth_sex_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex">
                        <label
                          htmlFor="image"
                          className="col-sm-4 col-form-label"
                        >
                          Image
                        </label>
                        <div className="col-sm-8">
                          <input
                            type="file"
                            className="form-control"
                            id="PatientImageUrl"
                            accept="image/*"
                            onChange={handleImage}
                          />
                          <small className="text-muted">
                            Image size must be less than 2 MB
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Blood Group and Address */}
                    <div className="row mb-3">
                      <div className="col-md-6 d-flex">
                        <label
                          htmlFor="bloodGroup"
                          className="col-sm-4 col-form-label"
                        >
                          Blood Group
                        </label>
                        <div className="col-sm-8">
                          <select
                            className="form-select form-select-sm"
                            name="ptn_blood_group_id"
                            onChange={handleChange}
                          >
                            <option>Select Blood Group</option>
                            {bloodGroupList.map((i) => (
                              <option key={i.id} value={i.id}>
                                {i.blood_group_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 d-flex">
                        <label
                          htmlFor="address"
                          className="col-sm-4 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-sm-8">
                          <textarea
                            name="patient_address1"
                            className="form-control form-control-sm p-2"
                            rows="3"
                            placeholder="Enter Address"
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </d>
              </>
            )}
          </NewModal.Body>
          <NewModal.Footer>
            <button
              type="button"
              onClick={handleCloseModal}
              style={{ borderRadius: "5px" }}
              className="btn btn-sm btn-outline-danger"
            >
              Close
            </button>
            <Button>Save</Button>
          </NewModal.Footer>
        </form>
      </NewModal>
    </>
  );
};

export default SearchPatientModal;
