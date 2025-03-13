import React, { useEffect, useState } from "react";
import { NewModal } from "../../../common/components/NewModal";
import { formatPhoneNumber, formateHN } from "../../../utils/numberHelper";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import useUserData from "../../../hooks/useUserData";
import Button from "../../../common/components/Button";
import Swal from "sweetalert2";
import ReactDatePicker from "react-datepicker";
import PhoneInput from "react-phone-number-input";

const SearchPatientModal = ({ isOpen, onClose, setUpdateSchedule }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [search, setSearch] = useState(null);
  const [options, setOptions] = useState("mobile");
  const user = useUserData();

  const searchHandler = (e) => {
    e.preventDefault();
    if (search !== null) {
      // console.log("serche data", search);
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
  const handleAppoint = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("item", item);
        const AppointDetails = {
          doctors_id: user?.user_id.toString(),
          patient_name: item?.fullName,
          IsAllDay: false,
          StartTime: new Date(),
          EndTime: new Date(Date.now() + 10 * 60000),
          patient_mobile: item?.patient_mobile_phone,
          notes: "",
          patient_id: item?.id,
          statusColor: "#020131",
          app_type: "chamber",
          statusName: "Arrived",
        };
        axios.post("/save-scheduler", AppointDetails).then((res) => {
          if (res?.data?.status === 200) {
            toast.success("Appointment created successfully");
            setUpdateSchedule(Math.random());
            axios
              .post(`start-consultation/${res?.saveData?.id}`)
              .then((res) => {
                console.log("res", res);
              });
            handleCloseModal();
          } else {
            toast.error("Something went wrong");
          }
        });
      }
    });
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
  // console.log(user, "user");
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
  // console.log(newPatientInfo, "newPatientInfo");
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

  return (
    <NewModal isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Registered Patient List</NewModal.Title>
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
                <div className="model_sub_heading">
                  <label className="Label1">Chose an option</label>
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
                    className="customButton1 search"
                    onClick={searchHandler}
                    type="button"
                  >
                    Search
                  </button>
                  <button
                    className="customButton1 clear"
                    type="button"
                    onClick={clearHandle}
                  >
                    Clear
                  </button>
                  <button
                    className="customButton1 clear"
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
                                {moment(item.patient_dob).format("DD/MM/YYYY")}
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
                                  onClick={() => handleAppoint(item)}
                                >
                                  Appoint
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
              <div className="ml-1 reg-form-appointment">
                <div className=" row p-1 m-1 mt-3">
                  <div className="col-md-12 mt-3">
                    <div className="row mb-3">
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label"
                      >
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          style={{ border: "1px solid red" }}
                          placeholder="Enter Name"
                          name="patient_first_name"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Date Of Birth <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-4">
                        <ReactDatePicker
                          dropdownMode="select"
                          selected={
                            newPatientInfo?.patient_dob
                              ? newPatientInfo?.patient_dob
                              : new Date()
                          }
                          onChange={(date) => {
                            handleDate(date);
                          }}
                          dateFormat="dd/MM/yyyy"
                        />
                      </div>
                      {/* <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Age
                      </label>
                      <div className="col-sm-4">
                        <input
                          type="number"
                          name="age"
                          className="form-control form-control-sm"
                          placeholder="Enter Age"
                          value={newPatientInfo?.age}
                          // onChange={(e) => calculateAge(e.target.value)}
                        />
                      </div> */}
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Mobile No. <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="col-sm-4">
                        {/* <input
                          type="text"
                          name="patient_mobile_phone"
                          className="form-control form-control-sm"
                          placeholder="Enter Mobile No."
                          onChange={handleChange}
                        /> */}
                        <PhoneInput
                          className="form-control"
                          defaultCountry="BD"
                          placeholder="Enter Phone number"
                          name="patient_mobile_phone"
                          required
                          style={{
                            width: "100%",
                          }}
                          // value={phoneNumber}
                          onChange={(v) => {
                            setNewPatientInfo({
                              ...newPatientInfo,
                              patient_mobile_phone: v,
                            });
                          }}
                        />
                      </div>
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label mt-2"
                      >
                        Age
                      </label>
                      <div className="col-sm-10 mt-3">
                        <div className="row">
                          <div className="col-sm-4 row">
                            <div className="col-3">Day</div>
                            <div className="col-9">
                              <input
                                type="number"
                                name="age"
                                max={200}
                                className="form-control form-control-sm"
                                placeholder="Enter Days"
                                value={newPatientInfo?.days}
                                onChange={(e) =>
                                  handleAge(
                                    e.target.value,
                                    newPatientInfo?.months || 0,
                                    newPatientInfo?.years || 0
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 row">
                            <div className="col-3">Month</div>
                            <div className="col-9">
                              <input
                                type="number"
                                name="age"
                                max={200}
                                className="form-control form-control-sm"
                                placeholder="Enter Month"
                                value={newPatientInfo?.months}
                                onChange={(e) =>
                                  handleAge(
                                    newPatientInfo?.days || 0,
                                    e.target.value,
                                    newPatientInfo?.years || 0
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-sm-4 row">
                            <div className="col-3">Year</div>
                            <div className="col-9">
                              <input
                                type="number"
                                name="age"
                                max={200}
                                className="form-control form-control-sm"
                                placeholder="Enter Year"
                                value={newPatientInfo?.years}
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
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Email
                      </label>
                      <div className="col-sm-4">
                        <input
                          type="email"
                          name="patient_email"
                          className="form-control form-control-sm"
                          placeholder="Enter Email"
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Gender <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className={`col-sm-4`}>
                        <select
                          className="form-select form-select-sm"
                          name="patient_birth_sex_id"
                          id="autoSizingSelect"
                          onChange={handleChange}
                        >
                          <option selected>Select Gender</option>
                          {genderList?.map((item) => {
                            return (
                              <>
                                <option value={item.id}>
                                  {item.birth_sex_name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="row mb-2">
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Blood Group
                      </label>
                      <div className="col-sm-4">
                        <select
                          className="form-select form-select-sm"
                          name="ptn_blood_group_id"
                          id="autoSizingSelect"
                          onChange={handleChange}
                        >
                          <option selected>Select Blood Group</option>

                          {bloodGroupList.map((i) => {
                            return (
                              <option value={i.id}>{i.blood_group_name}</option>
                            );
                          })}
                        </select>
                      </div>
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Image
                      </label>
                      <div className="col-sm-4">
                        <input
                          className="form-control"
                          id="PatientImageUrl"
                          onChange={handleImage}
                          type="file"
                        />

                        <p className="doc_image_size">
                          Image size must be less than 2 mb
                        </p>
                      </div>
                      <div className="col-sm-8"></div>
                      <div className="col-sm-4">
                        {!newPatientInfo.patient_images ? (
                          ""
                        ) : (
                          <div className="docImage">
                            <img
                              src={URL.createObjectURL(
                                newPatientInfo.patient_images
                              )}
                              className="schedulePaitimage"
                              alt="preview img"
                            />
                            <i
                              onClick={closeImage}
                              className="far fa-times-circle"
                            ></i>
                          </div>
                        )}
                      </div>
                      <label
                        for="app-reg-label"
                        className="col-sm-2 app-reg-label "
                      >
                        Address
                      </label>
                      <div className="col-sm-4">
                        <textarea
                          name="patient_address1"
                          className="form-control form-control-sm"
                          rows="3"
                          placeholder="Enter Address"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2"></div>
                  <div className="col-sm-6">
                    <div className="form-check">
                      <input
                        className="form-check-input mt-1"
                        type="checkbox"
                        value=""
                        style={{ width: "1.2em", height: "1.2em" }}
                        id="flexCheckDefault"
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            createUser: e.target.checked,
                          })
                        }
                      />
                      <label
                        className="form-check-label app-reg-label"
                        for="flexCheckDefault"
                        style={{ marginLeft: "5px", lineHeight: "1.3" }}
                      >
                        Create an user for DigiPatient app (Mobile number will
                        be the password)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
  );
};

export default SearchPatientModal;
