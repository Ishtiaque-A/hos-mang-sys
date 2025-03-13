import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./newPatientEntry.css";
import useCredentialURL from "../../../hooks/useCredentialURL";
import useUserData from "../../../hooks/useUserData";
import { getAllBranch } from "../../../utils/getAllBranch";
import { nullParser } from "../../../utils/null-parser";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

export default function NewPatientEntry() {
  const [deceased, setDeceased] = useState(false);
  const [bloodgrouplist, setBloodGroupList] = useState([]);
  const [titlelist, setTitlelist] = useState([]);
  const [genderlist, setGenderlist] = useState([]);
  const [religionlist, setReligionlist] = useState([]);
  const [ethnicitylist, setEthnicitylist] = useState([]);
  const [statuslist, setStatuslist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [visittypelist, setVisittypelist] = useState([]);
  const [contactvialist, setContactvialist] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [stateslist, setStatesvialist] = useState([]);
  const [usualproviderlist, setUsualproviderlist] = useState([]);
  const [usualaccountlist, setUsualaccountlist] = useState([]);
  const [occupationlist, setOccupationlist] = useState([]);
  const [picture, setPicture] = useState([]);

  const [patientInput, setPatient] = useState({
    patient_hn_number: "",
    patient_title_id: "",
    patient_nid: "",
    patient_bcid: "",
    ptn_blood_group_id: "",
    patient_first_name: "",
    patient_last_name: "",
    patient_contact_via: "",
    patient_mobile_phone: "",
    patient_head_of_family: "",
    patient_emergency_contact: "",
    patient_dob: null,
    patient_email: "",
    patient_birth_sex_id: "",
    patient_individual_health_identifier_no: "",
    patient_religion_id: "",
    patient_usual_provider_id: "",
    patient_ethnicity_id: "",
    patient_parent_id: "",
    patient_address1: "",
    patient_address2: "",
    patient_usual_visit_type_id: "",
    patient_usual_account: "",
    patient_deceased_date: "",
    patient_next_of_kin: "",
    patient_medical_record_no: "",
    patient_city_id: "",
    patient_safety_net_no: "",
    patient_postal_code: "",
    patient_health_inc_fund: "",
    patient_health_inc_no: "",
    patient_expire_date: "",
    patient_medical_no: "",
    patient_occupation_id: "",
    patient_hcc_no: "",
    patient_general_notes: "",
    patient_appointment_notes: "",
    patient_images: "",
    patient_middle_name: "",
    patient_preferred_name: "",
    patient_home_phone: "",
    patient_work_phone: "",
    patient_status: "",
    patient_state_id: "",
    patient_passport: "",
    saas_branch_id: "",
    saas_branch_name: "",
    createUser: false,
    age: "",
    days: "",
    months: "",
  });
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const user = useUserData();
  useEffect(() => {
    const getBranch = async () => {
      const branches = await getAllBranch(
        SaasAuthURL + "/branch/service/find-branch-by-organizationId"
      );
      if (branches.status === 200) {
        const updatedBranches = branches?.data?.data?.map((branch) => ({
          ...branch,
          value: branch.id,
          label: branch.name,
        }));
        setOrgBranch(updatedBranches);
      }
    };
    getBranch();
    return () => {};
  }, [SaasAuthURL]);
  useEffect(() => {
    axios.get(`/title-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setTitlelist(res.data.title);
      }
    });
    axios.get(`/gender-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setGenderlist(res.data.gender);
      }
    });
    axios.get(`/religion-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setReligionlist(res.data.religion);
      }
    });
    axios.get(`/ethnicity-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setEthnicitylist(res.data.ethnicity);
      }
    });
    axios.get(`/pstatus-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setStatuslist(res.data.pstatus);
      }
    });
    axios.get(`/city-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setCitylist(res.data.city);
        setContactvialist(res.data.contactvia);
        setStatesvialist(res.data.states);
        setUsualproviderlist(res.data.usualprovider);
        setUsualaccountlist(res.data.usualaccount);
        setOccupationlist(res.data.occupation);
        setBloodGroupList(res.data.blood_group);
      }
    });
    axios.get(`/visittype-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setVisittypelist(res.data.visittype);
      }
    });

    // axios.get(`/patients-hn-number`).then(async (res) => {
    //   console.log("patients", res.data);

    //   setPatient({
    //     ...patientInput,
    //     patient_hn_number: res.data.hn_number,
    //   });
    // });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setPatient({ ...patientInput, [e.target.name]: e.target.value });
  };

  const [image_error, setimage_error] = useState();
  const [imageUrl, setimageUrl] = useState();
  const handleImage = (e) => {
    e.persist();

    if (e.target.files[0].size < 2000048) {
      setPicture({ image: e.target.files[0] });
      setimage_error(null);
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 2000048
    ) {
      setimageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };

  const closeImage = () => {
    setimageUrl();
    document.getElementById("PatientImageUrl").value = "";
  };
  const navigate = useNavigate();

  const submitPatient = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", picture.image);
    formData.append("patient_hn_number", patientInput.patient_hn_number);
    formData.append("patient_title_id", patientInput.patient_title_id);
    formData.append("patient_nid", patientInput.patient_nid);
    formData.append("patient_bcid", patientInput.patient_bcid);
    formData.append("ptn_blood_group_id", patientInput.ptn_blood_group_id);
    formData.append("patient_first_name", patientInput.patient_first_name);
    formData.append("patient_last_name", patientInput.patient_last_name);
    formData.append("patient_contact_via", patientInput.patient_contact_via);
    formData.append("patient_mobile_phone", phoneNumber);
    formData.append(
      "patient_head_of_family",
      patientInput.patient_head_of_family
    );
    formData.append(
      "patient_emergency_contact",
      patientInput.patient_emergency_contact
    );
    formData.append("patient_dob", patientInput.patient_dob);
    formData.append("patient_email", patientInput.patient_email);
    formData.append("patient_birth_sex_id", patientInput.patient_birth_sex_id);
    formData.append(
      "patient_individual_health_identifier_no",
      patientInput.patient_individual_health_identifier_no
    );
    formData.append("patient_religion_id", patientInput.patient_religion_id);
    formData.append(
      "patient_usual_provider_id",
      patientInput.patient_usual_provider_id
    );
    formData.append("patient_ethnicity_id", patientInput.patient_ethnicity_id);
    formData.append("patient_parent_id", patientInput.patient_parent_id);
    formData.append("patient_address1", patientInput.patient_address1);
    formData.append("patient_address2", patientInput.patient_address2);
    formData.append(
      "patient_usual_visit_type_id",
      patientInput.patient_usual_visit_type_id
    );
    formData.append("patient_next_of_kin", patientInput.patient_next_of_kin);
    formData.append(
      "patient_usual_account",
      patientInput.patient_usual_account
    );
    formData.append(
      "patient_deceased_date",
      patientInput.patient_deceased_date
    );
    formData.append(
      "patient_medical_record_no",
      patientInput.patient_medical_record_no
    );
    formData.append("patient_city_id", patientInput.patient_city_id);
    formData.append(
      "patient_safety_net_no",
      patientInput.patient_safety_net_no
    );
    formData.append("patient_postal_code", patientInput.patient_postal_code);
    formData.append(
      "patient_health_inc_fund",
      patientInput.patient_health_inc_fund
    );
    formData.append(
      "patient_health_inc_no",
      patientInput.patient_health_inc_no
    );
    formData.append("patient_expire_date", patientInput.patient_expire_date);
    formData.append("patient_medical_no", patientInput.patient_medical_no);
    formData.append(
      "patient_occupation_id",
      patientInput.patient_occupation_id
    );
    formData.append("patient_hcc_no", patientInput.patient_hcc_no);
    formData.append(
      "patient_general_notes",
      patientInput.patient_general_notes
    );
    formData.append(
      "patient_appointment_notes",
      patientInput.patient_appointment_notes
    );
    formData.append("patient_middle_name", patientInput.patient_middle_name);
    formData.append(
      "patient_preferred_name",
      patientInput.patient_preferred_name
    );
    formData.append("patient_home_phone", patientInput.patient_home_phone);
    formData.append("patient_work_phone", patientInput.patient_work_phone);
    formData.append("patient_status", patientInput.patient_status);
    formData.append("patient_state_id", patientInput.patient_state_id);
    formData.append("patient_passport", patientInput.patient_passport);
    formData.append("age", patientInput.age);
    formData.append("day", patientInput.days);
    formData.append("month", patientInput.months);
    formData.append("doctor_id", nullParser(user?.user_id) ? user?.user_id : 0);

    formData.append("createUser", patientInput?.createUser);
    formData.append("organization_id", user?.organization_id);

    if (!user?.isSuperAdmin) {
      formData.append("saas_branch_id", user?.branch_id);
      formData.append("saas_branch_name", user?.branch_name);
    } else {
      if (patientInput.saas_branch_id) {
        formData.append("saas_branch_id", patientInput.saas_branch_id);
        formData.append(
          "saas_branch_name",
          orgBranch?.find(
            (x) => Number(x.id) === Number(patientInput.saas_branch_id)
          )?.name
        );
      } else {
        toast.error("Branch is required");
        return;
      }
    }

    axios
      .post(`/save-patients`, formData)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("Patients Info", res.data.patients.id);

          navigate(`/edit-patients/${res.data.patients.id}`);

          swal("Success", res.data.message, "success");
        } else {
          if (res.data.patient_hn_number) {
            toast.error(res.data.patient_hn_number[0]);
          }

          if (res.data.patient_first_name) {
            toast.error(res.data.patient_first_name[0]);
          }

          if (res.data.patient_last_name) {
            toast.error(res.data.patient_last_name[0]);
          }

          if (res.data.patient_mobile_phone) {
            toast.error(res.data.patient_mobile_phone[0]);
          }
          if (res.data.patient_status) {
            toast.error(res.data.patient_status[0]);
          }
          if (res.data.patient_dob) {
            toast.error("Patient date of birth is required");
          }
          if (res.data.patient_birth_sex_id) {
            toast.error("Patient Gender is required");
          }
        }
      })
      .catch((err) => {
        const { errors, message } = err.response.data;
        if (message) {
          toast.error(message);
          return;
        }
      });
  };
  // age calculation
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
      setPatient({
        ...patientInput,
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
  // age calculation

  const savePersonalInfo = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-profile-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-profile-tab").click();
  };

  const saveContactInfo = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-messages-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-messages-tab").click();
  };

  const saveAddressInfo = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab").click();
  };

  const saveMedicareInfo = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab1").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab1").click();
  };

  const saveNotesInfo = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab2").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab2").click();
  };
  const calculateAge = (age) => {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    setPatient({
      ...patientInput,
      patient_dob: new Date(birthYear, 0, 1),
      age: age,
    });
  };
  const calculateYearsFromDate = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();

    let yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();

    if (
      currentDate.getMonth() < givenDate.getMonth() ||
      (currentDate.getMonth() === givenDate.getMonth() &&
        currentDate.getDate() < givenDate.getDate())
    ) {
      yearsDifference--;
    }
    setPatient({
      ...patientInput,
      patient_dob: givenDate,
      age: yearsDifference,
    });
  };
  console.log("patient", patientInput);
  return (
    <>
      <div className="ms-2 font-size-patient pt-2">
        <div className="newClass">
          <div className="custom-card">
            <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
              Add New Patient
              <Link
                to={"/patients"}
                className="btn btn-primary btn-sm float-end"
              >
                Back
              </Link>
            </h5>
          </div>
          <div className="row new-patient-entry me-1">
            <form className="" onSubmit={submitPatient}>
              <div className="d-flex align-items-start">
                <div
                  className="nav custom-card col-md-3 flex-column nav-pills me-2"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link text-start  active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <i className="fas menu-icon fa-plus-circle"></i> Personal
                    Information
                  </button>
                  <button
                    className="nav-link text-start disabled btnNEw"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <i className="fas menu-icon fa-plus-circle"></i> Contacts
                  </button>
                  <button
                    className="nav-link text-start disabled btnNEw"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    <i className="fas menu-icon fa-plus-circle"></i> Address
                  </button>
                  <button
                    className="nav-link text-start disabled btnNEw"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    <i className="fas menu-icon fa-plus-circle"></i> Medicare
                    Info
                  </button>
                  <button
                    className="nav-link text-start disabled btnNEw"
                    id="v-pills-settings-tab1"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings1"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings1"
                    aria-selected="false"
                  >
                    <i className="fas menu-icon fa-plus-circle"></i> Notes
                  </button>
                  <button
                    className="nav-link text-start disabled btnNEw"
                    id="v-pills-settings-tab2"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings2"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings2"
                    aria-selected="false"
                  >
                    <i className="fas menu-icon fa-plus-circle"></i> All
                  </button>
                </div>

                <div className="tab-content col-md-9" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="mb-2 custom-card px-3">
                      <div className="d-flex bd-highlight">
                        <div className="py-2 flex-grow-1 bd-highlight">
                          <h6> Personal Information </h6>
                        </div>
                        <div className="py-2 bd-highlight">
                          <button
                            onClick={submitPatient}
                            className="btn btn-success btn-sm  float-right"
                          >
                            <i className="fas fa-save"></i> Save
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="custom-card pb-2 clearfix">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            {/* <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Patient HI Number
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_hn_number"
                                type="text"
                                className="form-control form-control-sm"
                                disabled
                                value={patientInput.patient_hn_number}
                                id="inputEmail4"
                              />
                            </div> */}

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Patient Title
                              </label>
                              <select
                                id="inputState"
                                name="patient_title_id"
                                onChange={handleInput}
                                value={patientInput.patient_title_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {titlelist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.title_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                First Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_first_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_first_name}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Middle Name
                              </label>
                              <input
                                name="patient_middle_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_middle_name}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Last Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_last_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_last_name}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Preferred Name
                              </label>
                              <input
                                name="patient_preferred_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_preferred_name}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Date of Birth
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY"
                                selected={
                                  patientInput.patient_dob
                                    ? new Date(patientInput.patient_dob)
                                    : null
                                }
                                dateFormat={"dd/MM/yyyy"}
                                name="requisition_no"
                                maxDate={new Date()}
                                style={{ padding: "20px" }}
                                onChange={(d) => handleDate(d)}
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Blood Group
                              </label>
                              <select
                                name="ptn_blood_group_id"
                                onChange={handleInput}
                                value={patientInput.ptn_blood_group_id}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {bloodgrouplist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.blood_group_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Gender <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="patient_birth_sex_id"
                                onChange={handleInput}
                                value={patientInput.patient_birth_sex_id}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {genderlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.birth_sex_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Ethnicity
                              </label>
                              <select
                                id="inputState"
                                name="patient_ethnicity_id"
                                onChange={handleInput}
                                value={patientInput.patient_ethnicity_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {ethnicitylist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.ethnicity_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Referred By
                              </label>
                              <input
                                name="patient_head_of_family"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_head_of_family}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Religion
                              </label>
                              <select
                                id="inputState"
                                name="patient_religion_id"
                                onChange={handleInput}
                                value={patientInput.patient_religion_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {religionlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.religion_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                NID/Smart ID
                              </label>
                              <input
                                name="patient_nid"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_nid}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Mobile Phone
                                <span style={{ color: "red" }}>*</span>
                              </label>

                              <PhoneInput
                                className="form-control"
                                defaultCountry="BD"
                                placeholder="Enter Phone number"
                                name="patient_mobile_phone"
                                required
                                style={{
                                  width: "100%",
                                }}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                              />
                              {/* <input
                                name="patient_mobile_phone"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_mobile_phone}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              /> */}
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Birth Certificates No.
                              </label>
                              <input
                                name="patient_bcid"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_bcid}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Patient Passport ID
                              </label>
                              <input
                                name="patient_passport"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_passport}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Age
                              </label>
                              <div className="row">
                                <div className="col-sm-4 row">
                                  <div className="col-4">Day</div>
                                  <div className="col-8">
                                    <input
                                      type="number"
                                      name="age"
                                      max={200}
                                      className="form-control form-control-sm"
                                      placeholder="Day"
                                      value={patientInput?.days}
                                      onChange={(e) =>
                                        handleAge(
                                          e.target.value,
                                          patientInput?.months || 0,
                                          patientInput?.years || 0
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-4 row">
                                  <div className="col-5">Month</div>
                                  <div className="col-7">
                                    <input
                                      type="number"
                                      name="age"
                                      max={200}
                                      className="form-control form-control-sm"
                                      placeholder="Month"
                                      value={patientInput?.months}
                                      onChange={(e) =>
                                        handleAge(
                                          patientInput?.days || 0,
                                          e.target.value,
                                          patientInput?.years || 0
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-4 row">
                                  <div className="col-4">Year</div>
                                  <div className="col-8">
                                    <input
                                      type="number"
                                      name="age"
                                      max={200}
                                      className="form-control form-control-sm"
                                      placeholder=" Year"
                                      value={patientInput?.years}
                                      onChange={(e) =>
                                        handleAge(
                                          patientInput?.days || 0,
                                          patientInput?.months || 0,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <input
                                name="age"
                                type="number"
                                onChange={(e) => calculateAge(e.target.value)}
                                value={patientInput.age}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              /> */}
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Patient Status
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="patient_status"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_status}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {statuslist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.status_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Occupation
                              </label>

                              <select
                                name="patient_occupation_id"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_occupation_id}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {occupationlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.occupation_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            {/* for super admin  */}
                            <div className="col-md-12 p-1 px-3">
                              {user?.isSuperAdmin && (
                                <>
                                  <label htmlFor="inputEmail4" className="">
                                    Branch
                                    <span style={{ color: "red" }}> *</span>
                                  </label>

                                  <select
                                    name="saas_branch_id"
                                    type="text"
                                    required
                                    onChange={handleInput}
                                    value={patientInput.saas_branch_id}
                                    id="inputState"
                                    className="form-select  col-form-label-sm font-size-patient"
                                  >
                                    <option selected value={""}>
                                      Select
                                    </option>
                                    {orgBranch.map((item) => {
                                      return (
                                        <option value={item.id} key={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </>
                              )}
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Patient Image
                              </label>
                              <input
                                type="file"
                                name="image"
                                id="PatientImageUrl"
                                className="form-control form-control-sm"
                                onChange={handleImage}
                              />

                              {image_error == null ? (
                                <p className="doc_image_size">
                                  Image size must be less than 2 mb
                                </p>
                              ) : (
                                <p className="docimage_error">{image_error}</p>
                              )}

                              {imageUrl == null ? (
                                ""
                              ) : (
                                <div className="docImage">
                                  <img
                                    src={imageUrl}
                                    className="doctorImageUrlPreview"
                                    alt="preview image"
                                  />
                                  <i
                                    onClick={closeImage}
                                    className="far fa-times-circle"
                                  ></i>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 p-1 px-3">
                            <div className="form-check">
                              <input
                                className="form-check-input mt-1"
                                type="checkbox"
                                value=""
                                style={{ width: "1.2em", height: "1.2em" }}
                                id="flexCheckDefault"
                                onChange={(e) =>
                                  setPatient({
                                    ...patientInput,
                                    createUser: e.target.checked,
                                  })
                                }
                              />
                              <label
                                className="form-check-label app-reg-label"
                                for="flexCheckDefault"
                                style={{ marginLeft: "5px", lineHeight: "1.3" }}
                              >
                                Create an user for DigiPatient app (Mobile
                                number will be the password)
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4 p-1 px-3">
                            <button
                              onClick={savePersonalInfo}
                              className="btn btn-success btn-sm  float-end mt-2 "
                            >
                              <i className="far fa-hand-point-right"></i> Next
                            </button>

                            <button
                              onClick={submitPatient}
                              className="btn btn-success btn-sm  float-end mt-2 mr-3"
                            >
                              <i className="fas fa-save"></i> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="custom-card mb-3">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Contacts</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Contact Via
                              </label>
                              <select
                                id="inputState"
                                name="patient_contact_via"
                                onChange={handleInput}
                                value={patientInput.patient_contact_via}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {contactvialist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.contact_via_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Home Phone
                              </label>
                              <input
                                name="patient_home_phone"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_home_phone}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Work Phone
                              </label>
                              <input
                                name="patient_work_phone"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_work_phone}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Parent NID/Smart ID
                              </label>
                              <input
                                name="patient_parent_id"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_parent_id}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Emergency Contact
                              </label>
                              <input
                                name="patient_emergency_contact"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_emergency_contact}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Email Address
                              </label>
                              <input
                                name="patient_email"
                                type="email"
                                onChange={handleInput}
                                value={patientInput.patient_email}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 p-1 px-3">
                            <button
                              onClick={saveContactInfo}
                              className="btn btn-success btn-sm  float-end mt-2 "
                            >
                              <i className="far fa-hand-point-right"></i> Next
                            </button>

                            <button
                              onClick={submitPatient}
                              className="btn btn-success btn-sm  float-end mt-2 mr-3"
                            >
                              <i className="fas fa-save"></i> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <div className="custom-card mb-3">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Address</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className=""
                              >
                                Address Line 1
                              </label>
                              <textarea
                                name="patient_address1"
                                onChange={handleInput}
                                value={patientInput.patient_address1}
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className=""
                              >
                                Address Line 2
                              </label>
                              <textarea
                                name="patient_address2"
                                onChange={handleInput}
                                value={patientInput.patient_address2}
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                City
                              </label>
                              <select
                                id="inputState"
                                name="patient_city_id"
                                onChange={handleInput}
                                value={patientInput.patient_city_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {citylist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.city_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                State
                              </label>
                              <select
                                name="patient_state_id"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_state_id}
                                id="inputState"
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>
                                {stateslist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.state_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputZip" className="">
                                Postal/Zip Code
                              </label>
                              <input
                                name="patient_postal_code"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_postal_code}
                                className="form-control form-control-sm"
                                id="inputZip"
                              />
                              <div className="mt-2">
                                <button
                                  onClick={saveAddressInfo}
                                  className="btn btn-success btn-sm  float-end mt-2 "
                                >
                                  <i className="far fa-hand-point-right"></i>
                                  Next
                                </button>

                                <button
                                  onClick={submitPatient}
                                  className="btn btn-success btn-sm  float-end mt-2 mr-3"
                                >
                                  <i className="fas fa-save"></i> Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                  >
                    <div className="custom-card mb-3">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className=""> Medicare Info</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 px-3">
                              <label htmlFor="inputCity" className="">
                                Health Inc No.
                              </label>
                              <input
                                name="patient_health_inc_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_health_inc_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Medicare No.
                              </label>
                              <input
                                name="patient_medical_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_medical_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                HCC No.
                              </label>
                              <input
                                name="patient_hcc_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_hcc_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Individual health identifier (IHI) No.
                              </label>
                              <input
                                name="patient_individual_health_identifier_no"
                                type="text"
                                onChange={handleInput}
                                value={
                                  patientInput.patient_individual_health_identifier_no
                                }
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Health Inc Fund
                              </label>
                              <input
                                name="patient_health_inc_fund"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_health_inc_fund}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Medical Record No (MRN)
                              </label>
                              <input
                                name="patient_medical_record_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_medical_record_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Expiry Date
                              </label>
                              <input
                                name="patient_expire_date"
                                type="date"
                                onChange={handleInput}
                                value={patientInput.patient_expire_date}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Safety Net No.
                              </label>
                              <input
                                name="patient_safety_net_no"
                                onChange={handleInput}
                                value={patientInput.patient_safety_net_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Next of KIN
                              </label>
                              <input
                                name="patient_next_of_kin"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_next_of_kin}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                Usual Provider
                              </label>
                              <select
                                id="inputState"
                                name="patient_usual_provider_id"
                                onChange={handleInput}
                                value={patientInput.patient_usual_provider_id}
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>

                                {usualproviderlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.usual_provider_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                Usual Visit Type
                              </label>
                              <select
                                id="inputState"
                                name="patient_usual_visit_type_id"
                                onChange={handleInput}
                                value={patientInput.patient_usual_visit_type_id}
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>
                                {visittypelist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.visit_type_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                Usual Account
                              </label>
                              <select
                                id="inputState"
                                name="patient_usual_account"
                                onChange={handleInput}
                                value={patientInput.patient_usual_account}
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>

                                {usualaccountlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.usual_account_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 clearfix px-3">
                              <div className="float-end">
                                <input
                                  className="form-check-input "
                                  onChange={() => setDeceased(!deceased)}
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label className="" for="flexCheckDefault">
                                  Is Deceased
                                </label>
                              </div>
                              {deceased && (
                                <>
                                  <label htmlFor="inputEmail4" className="">
                                    Deceased Date
                                  </label>
                                  <input
                                    type="date"
                                    name="patient_deceased_date"
                                    className="form-control form-control-sm"
                                    onChange={handleInput}
                                    value={patientInput.deceased_date}
                                    id="inputEmail4"
                                  />
                                </>
                              )}
                            </div>

                            <div className="mt-4">
                              <button
                                onClick={saveMedicareInfo}
                                className="btn btn-success btn-sm  float-end mt-2 "
                              >
                                <i className="far fa-hand-point-right"></i> Next
                              </button>
                              <button
                                onClick={submitPatient}
                                className="btn btn-success btn-sm  float-end mt-2 mr-3"
                              >
                                <i className="fas fa-save"></i> Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-settings1"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab1"
                  >
                    <div className="custom-card mb-3">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Notes</h6>
                      </div>
                      <div className="card-body">
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className=""
                          >
                            General Notes
                          </label>
                          <textarea
                            name="patient_general_notes"
                            onChange={handleInput}
                            value={patientInput.patient_general_notes}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className=""
                          >
                            Appointment Notes
                          </label>
                          <textarea
                            name="patient_appointment_notes"
                            onChange={handleInput}
                            value={patientInput.patient_appointment_notes}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="col-md-12 clearfix pt-2">
                          <button
                            onClick={saveNotesInfo}
                            className="btn btn-success btn-sm  float-end mt-2 "
                          >
                            <i className="far fa-hand-point-right"></i> Next
                          </button>

                          <button
                            onClick={submitPatient}
                            className="btn btn-success btn-sm  float-end mt-2 mr-3"
                          >
                            <i className="fas fa-save"></i> Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="v-pills-settings2"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab2"
                  >
                    <div className="custom-card mb-2">
                      <div className="ml-3 pt-1 px-3">
                        <div className="d-flex bd-highlight">
                          <div className="p-2 flex-grow-1 bd-highlight">
                            <h6> Personal Information </h6>
                          </div>
                          <div className="p-2 bd-highlight">
                            <button
                              onClick={submitPatient}
                              className="btn btn-sm btn-success btn-sm  float-right"
                            >
                              <i className="fas fa-save"></i> Save
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Patient HI Number
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_hn_number"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={handleInput}
                                value={patientInput.patient_hn_number}
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Patient Title
                              </label>
                              <select
                                id="inputState"
                                name="patient_title_id"
                                onChange={handleInput}
                                value={patientInput.patient_title_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {titlelist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.title_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                First Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_first_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_first_name}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Middle Name
                              </label>
                              <input
                                name="patient_middle_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_middle_name}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Last Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_last_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_last_name}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Preferred Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="patient_preferred_name"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_preferred_name}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Head of Family
                              </label>
                              <input
                                name="patient_head_of_family"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_head_of_family}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Date of Birth
                              </label>
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY"
                                selected={
                                  patientInput.patient_dob
                                    ? new Date(patientInput.patient_dob)
                                    : null
                                }
                                dateFormat={"dd/MM/yyyy"}
                                name="requisition_no"
                                style={{ padding: "20px" }}
                                onChange={(d) =>
                                  setPatient({
                                    ...patientInput,
                                    patient_dob: d
                                      ? moment(d).format("YYYY-MM-DD")
                                      : new Date(),
                                  })
                                }
                              />
                              {/* <input
                                type="date"
                                name="patient_dob"
                                onChange={handleInput}
                                value={patientInput.patient_dob}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              /> */}
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Blood Group
                              </label>
                              <select
                                name="ptn_blood_group_id"
                                onChange={handleInput}
                                value={patientInput.ptn_blood_group_id}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {bloodgrouplist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.blood_group_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Gender <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="patient_birth_sex_id"
                                onChange={handleInput}
                                value={patientInput.patient_birth_sex_id}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {genderlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.birth_sex_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Referred By
                              </label>
                              <input
                                name="patient_head_of_family"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_head_of_family}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Religion
                              </label>
                              <select
                                id="inputState"
                                name="patient_religion_id"
                                onChange={handleInput}
                                value={patientInput.patient_religion_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {religionlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.religion_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                NID/Smart ID
                              </label>
                              <input
                                name="patient_nid"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_nid}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Parent NID/Smart ID
                              </label>
                              <input
                                name="patient_parent_id"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_parent_id}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Birth Certificates No.
                              </label>
                              <input
                                name="patient_bcid"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_bcid}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Patient Passport ID
                              </label>
                              <input
                                name="patient_passport"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_passport}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Patient Status
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="patient_status"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_status}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {statuslist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.status_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Occupation
                              </label>

                              <select
                                name="patient_occupation_id"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_occupation_id}
                                id="inputState"
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {occupationlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.occupation_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            {/* for super admin  */}
                            <div className="col-md-12 p-1 px-3">
                              {user?.isSuperAdmin && (
                                <>
                                  <label htmlFor="inputEmail4" className="">
                                    Branch
                                    <span style={{ color: "red" }}> *</span>
                                  </label>

                                  <select
                                    name="saas_branch_id"
                                    type="text"
                                    required
                                    onChange={handleInput}
                                    value={patientInput.saas_branch_id}
                                    id="inputState"
                                    className="form-select  col-form-label-sm font-size-patient"
                                  >
                                    <option selected value={""}>
                                      Select
                                    </option>
                                    {orgBranch.map((item) => {
                                      return (
                                        <option value={item.id} key={item.id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </>
                              )}
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Patient Image
                              </label>
                              <input
                                type="file"
                                name="image"
                                id="PatientImageUrl"
                                className="form-control form-control-sm"
                                onChange={handleImage}
                              />

                              {image_error == null ? (
                                <p className="doc_image_size">
                                  Image size must be less than 2 mb
                                </p>
                              ) : (
                                <p className="docimage_error">{image_error}</p>
                              )}

                              {imageUrl == null ? (
                                ""
                              ) : (
                                <div className="docImage">
                                  <img
                                    src={imageUrl}
                                    className="doctorImageUrlPreview"
                                    alt="preview image"
                                  />
                                  <i
                                    onClick={closeImage}
                                    className="far fa-times-circle"
                                  ></i>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="custom-card mb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Contacts</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Contact Via
                              </label>
                              <select
                                id="inputState"
                                name="patient_contact_via"
                                onChange={handleInput}
                                value={patientInput.patient_contact_via}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {contactvialist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.contact_via_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Home Phone
                              </label>
                              <input
                                name="patient_home_phone"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_home_phone}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Work Phone
                              </label>
                              <input
                                name="patient_work_phone"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_work_phone}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Mobile Phone
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <PhoneInput
                                className="form-control"
                                defaultCountry="BD"
                                placeholder="Enter Phone number"
                                name="patient_mobile_phone"
                                required
                                style={{
                                  width: "100%",
                                }}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputPassword4" className="">
                                Emergency Contact
                              </label>
                              <input
                                name="patient_emergency_contact"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_emergency_contact}
                                className="form-control form-control-sm"
                                id="inputPassword4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Email Address
                              </label>
                              <input
                                name="patient_email"
                                type="email"
                                onChange={handleInput}
                                value={patientInput.patient_email}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="custom-card mb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Address</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className=""
                              >
                                Address Line 1
                              </label>
                              <textarea
                                name="patient_address1"
                                onChange={handleInput}
                                value={patientInput.patient_address1}
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className=""
                              >
                                Address Line 2
                              </label>
                              <textarea
                                name="patient_address2"
                                onChange={handleInput}
                                value={patientInput.patient_address2}
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                City
                              </label>
                              <select
                                id="inputState"
                                name="patient_city_id"
                                onChange={handleInput}
                                value={patientInput.patient_city_id}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {citylist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.city_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                State
                              </label>
                              <select
                                name="patient_state_id"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_state_id}
                                id="inputState"
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>
                                {stateslist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.state_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputZip" className="">
                                Postal/Zip Code
                              </label>
                              <input
                                name="patient_postal_code"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_postal_code}
                                className="form-control form-control-sm"
                                id="inputZip"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="custom-card mb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className=""> Medicare Info</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 px-3">
                              <label htmlFor="inputCity" className="">
                                Health Inc No.
                              </label>
                              <input
                                name="patient_health_inc_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_health_inc_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Medicare No.
                              </label>
                              <input
                                name="patient_medical_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_medical_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                HCC No.
                              </label>
                              <input
                                name="patient_hcc_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_hcc_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Individual health identifier (IHI) No.
                              </label>
                              <input
                                name="patient_individual_health_identifier_no"
                                type="text"
                                onChange={handleInput}
                                value={
                                  patientInput.patient_individual_health_identifier_no
                                }
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Health Inc Fund
                              </label>
                              <input
                                name="patient_health_inc_fund"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_health_inc_fund}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Medical Record No (MRN)
                              </label>
                              <input
                                name="patient_medical_record_no"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_medical_record_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputEmail4" className="">
                                Expiry Date
                              </label>
                              <input
                                name="patient_expire_date"
                                type="date"
                                onChange={handleInput}
                                value={patientInput.patient_expire_date}
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Safety Net No.
                              </label>
                              <input
                                name="patient_safety_net_no"
                                onChange={handleInput}
                                value={patientInput.patient_safety_net_no}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputCity" className="">
                                Next of KIN
                              </label>
                              <input
                                name="patient_next_of_kin"
                                type="text"
                                onChange={handleInput}
                                value={patientInput.patient_next_of_kin}
                                className="form-control form-control-sm"
                                id="inputCity"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                Usual Provider
                              </label>
                              <select
                                id="inputState"
                                name="patient_usual_provider_id"
                                onChange={handleInput}
                                value={patientInput.patient_usual_provider_id}
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>

                                {usualproviderlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.usual_provider_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                Usual Visit Type
                              </label>
                              <select
                                id="inputState"
                                name="patient_usual_visit_type_id"
                                onChange={handleInput}
                                value={patientInput.patient_usual_visit_type_id}
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>
                                {visittypelist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.visit_type_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label htmlFor="inputState" className="">
                                Usual Account
                              </label>
                              <select
                                id="inputState"
                                name="patient_usual_account"
                                onChange={handleInput}
                                value={patientInput.patient_usual_account}
                                className="form-select  font-size-patient"
                              >
                                <option selected>Select</option>

                                {usualaccountlist.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.usual_account_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 clearfix px-3">
                              <div className="float-end">
                                <input
                                  className="form-check-input "
                                  onChange={() => setDeceased(!deceased)}
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                />
                                <label className="" for="flexCheckDefault">
                                  Is Deceased
                                </label>
                              </div>
                              {deceased && (
                                <>
                                  <label htmlFor="inputEmail4" className="">
                                    Deceased Date
                                  </label>
                                  <input
                                    type="date"
                                    name="patient_deceased_date"
                                    className="form-control form-control-sm"
                                    onChange={handleInput}
                                    value={patientInput.deceased_date}
                                    id="inputEmail4"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="custom-card mb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Notes</h6>
                      </div>
                      <div className="card-body">
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className=""
                          >
                            General Notes
                          </label>
                          <textarea
                            name="patient_general_notes"
                            onChange={handleInput}
                            value={patientInput.patient_general_notes}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className=""
                          >
                            Appointment Notes
                          </label>
                          <textarea
                            name="patient_appointment_notes"
                            onChange={handleInput}
                            value={patientInput.patient_appointment_notes}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="4"
                          ></textarea>
                          <div className="mt-2 clearfix">
                            <button
                              type="submit"
                              className="btn btn-success btn-sm  float-end mt-2"
                            >
                              <i className="fas fa-save"></i> Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
