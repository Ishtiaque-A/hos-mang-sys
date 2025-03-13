import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "../../Patients/AddNewPatient/AddNewPatient.css";
import swal from "sweetalert";
import healthLogo from "../../../Images/health-card-logo.png";
import qrCode from "../../../Images/qr-code.png";
import myHealth from "../../../Images/myhealthcard.png";
import { useReactToPrint } from "react-to-print";
import NoImages from "../../../Images/dummy_images.svg";
import carle from "../../../Images/carle.png";
import PatientLabReport from "./PatientLabReport";
import Family from "../Family";
import Swal from "sweetalert2";
import ReactModal from "react-modal";
import MaterialTable from "material-table";
import MySymptoms from "./MySymptoms/MySymptoms";

import "../../../imageUrl";
import { toast } from "react-toastify";
import useUserData from "../../../hooks/useUserData";
import useCredentialURL from "../../../hooks/useCredentialURL";
import { getAllBranch } from "../../../utils/getAllBranch";
import ReactDatePicker from "react-datepicker";
import { nullParser } from "../../../utils/null-parser";
function EditPatient(props) {
  var url = window.location.href;
  var urlsplit = url.split("/");
  var lastpart = urlsplit[urlsplit.length - 1];
  if (lastpart === "") {
    lastpart = urlsplit[urlsplit.length - 2];
  }

  const IdCheck = useParams();
  const patientID = IdCheck.id;
  console.log("use params check", patientID);

  const [singlepatient, setSinglePatient] = useState([]);

  const [bloodgrouplist, setBloodGroupList] = useState([]);
  const [titlelist, setTitlelist] = useState([]);
  const [genderlist, setGenderlist] = useState([]);
  const [religionlist, setReligionlist] = useState([]);
  const [ethnicitylist, setEthnicitylist] = useState([]);
  const [statuslist, setStatuslist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [visittypelist, setVisittypelist] = useState([]);

  const [contactvialist, setContactvialist] = useState([]);
  const [stateslist, setStatesvialist] = useState([]);
  const [usualproviderlist, setUsualproviderlist] = useState([]);
  const [usualaccountlist, setUsualaccountlist] = useState([]);
  const [occupationlist, setOccupationlist] = useState([]);

  // card show
  const [frontShow, setFrontShow] = useState(true);
  const [backShow, setBackShow] = useState(true);

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
  });

  const [picture, setPicture] = useState([]);
  const handleInput = (e) => {
    e.persist();
    setPatient({ ...patientInput, [e.target.name]: e.target.value });
  };

  const [image_error, setimage_error] = useState();
  const [imageUrl, setimageUrl] = useState();
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const [refetch, setRefetch] = useState(false);
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
      // setDoctors({ ...doctorsInput, doctorImageUrl: URL.createObjectURL(event.target.files[0]) });
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };

  const closeImage = () => {
    setimageUrl();
    document.getElementById("PatientImageUrl").value = "";
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [vitalSignArray, setvitalSignArray] = useState([]);

  const [historyModel, sethistoryModel] = useState(false);

  const [vitalSignTableShow, setvitalSignTableShow] = useState();

  const [valuedt, setValuedt] = React.useState(new Date());

  const [allergyArray, setallergyArray] = useState([]);
  const allergyRemove = (i) => {
    const list = [...allergyArray];
    list.splice(i, 1);
    setallergyArray(list);
  };
  // const [doctors, setDoctors] = useState([]);
  // const [doctorsSort, setDoctorsSort] = useState([]);
  // const [doctorsDepartment, setDoctorsDepartment] = useState([]);
  // const [doctorsSpecialist, setDoctorsSpecialist] = useState([]);
  useEffect(() => {
    ReactModal.setAppElement("body");

    axios.get("allergy-patient").then((res) => {
      setallergyArray(res.data.allergySign);
    });

    axios.get("vital-sign-patient").then((res) => {
      setvitalSignArray(res.data.vitalSign);
    });

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

    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    axios.get(`/edit-patients/${lastpart}`).then((res) => {
      setPatient(res.data.patient);
    });

    axios.get(`/patients-profile/${lastpart}`).then((res) => {
      if (res.data.status === 200) {
        setSinglePatient(res.data.patients_details);
      }
    });
    // axios.get(`/doctors`).then((res) => {
    //   if (res.data.status === 200) {
    //     setDoctors(res.data.doctors);
    //     setDoctorsSort(res.data.doctors);
    //   }
    // });
    // axios.get(`/department`).then((res) => {
    //   if (res.data.status === 200) {
    //     setDoctorsDepartment(res.data.department);
    //   }
    // });
    // axios.get(`/specialist`).then((res) => {
    //   if (res.data.status === 200) {
    //     setDoctorsSpecialist(res.data.specialist);
    //   }
    // });
  }, []);

  const [vitalStateUpdate, setvitalStateUpdate] = useState();

  useEffect(() => {
    axios.get(`patient-search-by-id/${lastpart}`).then((res) => {
      setvitalSignTableShow(res.data.vital_signs);
    });
  }, [vitalStateUpdate]);

  const [allergyLastCheckDate, setallergyLastCheckDate] = useState(new Date());

  const saveAllargy = () => {
    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    allergyArray.map((item) => {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("patient_id", lastpart);
      formData.append("desc", item.desc);
      formData.append("icon", item.icon);
      formData.append("last_checkup", allergyLastCheckDate);
      axios.post("save-allergy-patient", formData).then((res) => {
        // console.log("Allergy Res", res);
      });
    });

    Swal.fire("Allergy Add Successfully!", "done", "success");
  };

  const signOnchage = (e, i) => {
    const { name, value } = e.target;
    const list = [...vitalSignArray];
    list[i][name] = value;
    setvitalSignArray(list);
  };

  const vitalSignSave = () => {
    vitalSignArray.map((item) => {
      var url = window.location.href;
      var urlsplit = url.split("/");
      var lastpart = urlsplit[urlsplit.length - 1];
      if (lastpart === "") {
        lastpart = urlsplit[urlsplit.length - 2];
      }
      const formData = new FormData();
      formData.append("patient_id", lastpart);
      formData.append("name", item.name);
      formData.append("value", item.vitalValue);
      formData.append("desc", item.desc);
      formData.append("color", item.color);
      formData.append("last_check_up_date", valuedt);
      formData.append("units_id", item.units_id);
      formData.append("status_id", item.status_id);
      formData.append("icon", item.icon);

      if (item.vitalValue != null) {
        axios.post(`/save-vital-sign-patient`, formData).then((res) => {
          console.log("Vital Res", res.data);
        });
      }
    });

    axios.get("vital-sign-patient").then((res) => {
      setvitalSignArray(res.data.vitalSign);
    });

    Swal.fire("VitalSign Add Successfully!", "done", "success");
    setvitalStateUpdate(Math.random());
  };

  const navigate = useNavigate();
  const updatePatient = () => {
    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    const formData = new FormData();

    formData.append("image", picture.image);

    formData.append(
      "patient_hn_number",
      patientInput.patient_hn_number == null
        ? ""
        : patientInput.patient_hn_number
    );
    formData.append(
      "patient_title_id",
      patientInput.patient_title_id == null ? "" : patientInput.patient_title_id
    );
    formData.append(
      "patient_nid",
      patientInput.patient_nid == null ? "" : patientInput.patient_nid
    );
    formData.append(
      "patient_bcid",
      patientInput.patient_bcid == null ? "" : patientInput.patient_bcid
    );
    formData.append(
      "ptn_blood_group_id",
      patientInput.ptn_blood_group_id == null
        ? ""
        : patientInput.ptn_blood_group_id
    );
    formData.append(
      "patient_first_name",
      patientInput.patient_first_name == null
        ? ""
        : patientInput.patient_first_name
    );
    formData.append(
      "patient_last_name",
      patientInput.patient_last_name == null
        ? ""
        : patientInput.patient_last_name
    );
    formData.append(
      "patient_contact_via",
      patientInput.patient_contact_via == null
        ? ""
        : patientInput.patient_contact_via
    );
    formData.append(
      "patient_mobile_phone",
      patientInput.patient_mobile_phone == null
        ? ""
        : patientInput.patient_mobile_phone
    );
    formData.append(
      "patient_head_of_family",
      patientInput.patient_head_of_family == null
        ? ""
        : patientInput.patient_head_of_family
    );
    formData.append(
      "patient_emergency_contact",
      patientInput.patient_emergency_contact == null
        ? ""
        : patientInput.patient_emergency_contact
    );
    formData.append(
      "patient_dob",
      patientInput.patient_dob == null ? "" : patientInput.patient_dob
    );
    formData.append("age", patientInput?.age == null ? "" : patientInput?.age);
    formData.append("day", patientInput?.day == null ? "" : patientInput?.day);
    formData.append(
      "month",
      patientInput?.month == null ? "" : patientInput?.month
    );
    formData.append(
      "patient_email",
      patientInput.patient_email == null ? "" : patientInput.patient_email
    );
    formData.append(
      "patient_birth_sex_id",
      patientInput.patient_birth_sex_id == null
        ? ""
        : patientInput.patient_birth_sex_id
    );
    formData.append(
      "patient_individual_health_identifier_no",
      patientInput.patient_individual_health_identifier_no == null
        ? ""
        : patientInput.patient_individual_health_identifier_no
    );
    formData.append(
      "patient_religion_id",
      patientInput.patient_religion_id == null
        ? ""
        : patientInput.patient_religion_id
    );
    formData.append(
      "patient_usual_provider_id",
      patientInput.patient_usual_provider_id == null
        ? ""
        : patientInput.patient_usual_provider_id
    );
    formData.append(
      "patient_ethnicity_id",
      patientInput.patient_ethnicity_id == null
        ? ""
        : patientInput.patient_ethnicity_id
    );
    formData.append(
      "patient_parent_id",
      patientInput.patient_parent_id == null
        ? ""
        : patientInput.patient_parent_id
    );
    formData.append(
      "patient_address1",
      patientInput.patient_address1 == null ? "" : patientInput.patient_address1
    );
    formData.append(
      "patient_address2",
      patientInput.patient_address2 == null ? "" : patientInput.patient_address2
    );
    formData.append(
      "patient_usual_visit_type_id",
      patientInput.patient_usual_visit_type_id == null
        ? ""
        : patientInput.patient_usual_visit_type_id
    );
    formData.append(
      "patient_next_of_kin",
      patientInput.patient_next_of_kin == null
        ? ""
        : patientInput.patient_next_of_kin
    );
    formData.append(
      "patient_usual_account",
      patientInput.patient_usual_account == null
        ? ""
        : patientInput.patient_usual_account
    );
    formData.append(
      "patient_deceased_date",
      patientInput.patient_deceased_date == null
        ? ""
        : patientInput.patient_deceased_date
    );
    formData.append(
      "patient_medical_record_no",
      patientInput.patient_medical_record_no == null
        ? ""
        : patientInput.patient_medical_record_no
    );
    formData.append(
      "patient_city_id",
      patientInput.patient_city_id == null ? "" : patientInput.patient_city_id
    );
    formData.append(
      "patient_safety_net_no",
      patientInput.patient_safety_net_no == null
        ? ""
        : patientInput.patient_safety_net_no
    );
    formData.append(
      "patient_postal_code",
      patientInput.patient_postal_code == null
        ? ""
        : patientInput.patient_postal_code
    );
    formData.append(
      "patient_health_inc_fund",
      patientInput.patient_health_inc_fund == null
        ? ""
        : patientInput.patient_health_inc_fund
    );
    formData.append(
      "patient_health_inc_no",
      patientInput.patient_health_inc_no == null
        ? ""
        : patientInput.patient_health_inc_no
    );
    formData.append(
      "patient_expire_date",
      patientInput.patient_expire_date == null
        ? ""
        : patientInput.patient_expire_date
    );
    formData.append(
      "patient_medical_no",
      patientInput.patient_medical_no == null
        ? ""
        : patientInput.patient_medical_no
    );
    formData.append(
      "patient_occupation_id",
      patientInput.patient_occupation_id == null
        ? ""
        : patientInput.patient_occupation_id
    );
    formData.append(
      "patient_hcc_no",
      patientInput.patient_hcc_no == null ? "" : patientInput.patient_hcc_no
    );
    formData.append(
      "patient_general_notes",
      patientInput.patient_general_notes == null
        ? ""
        : patientInput.patient_general_notes
    );
    formData.append(
      "patient_appointment_notes",
      patientInput.patient_appointment_notes == null
        ? ""
        : patientInput.patient_appointment_notes
    );
    formData.append(
      "patient_middle_name",
      patientInput.patient_middle_name == null
        ? ""
        : patientInput.patient_middle_name
    );
    formData.append(
      "patient_preferred_name",
      patientInput.patient_preferred_name == null
        ? ""
        : patientInput.patient_preferred_name
    );
    formData.append(
      "patient_home_phone",
      patientInput.patient_home_phone == null
        ? ""
        : patientInput.patient_home_phone
    );
    formData.append(
      "patient_work_phone",
      patientInput.patient_work_phone == null
        ? ""
        : patientInput.patient_work_phone
    );
    formData.append(
      "patient_status",
      patientInput.patient_status == null ? "" : patientInput.patient_status
    );
    formData.append(
      "patient_state_id",
      patientInput.patient_state_id == null ? "" : patientInput.patient_state_id
    );
    formData.append(
      "patient_passport",
      patientInput.patient_passport == null ? "" : patientInput.patient_passport
    );
    formData.append("saas_branch_id", patientInput.saas_branch_id);
    formData.append(
      "saas_branch_name",
      orgBranch.find(
        (x) => Number(x.value) === Number(patientInput.saas_branch_id)
      )?.name
    );

    axios.post(`/update-patients/${lastpart}`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");

        setPatient({
          ...patientInput,

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
          patient_dob: "",
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
        });

        navigate("/patients");
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
          toast.error("Patient Date of birth is required");
        }
        if (res.data.patient_birth_sex_id) {
          toast.error("Patient Gender is required");
        }
      }
    });
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
        day: days,
        month: months,
        year: years,
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
  const nextInfoPersonal = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-profile-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-profile-tab").click();
  };

  const nextInfoContact = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-messages-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-messages-tab").click();
  };

  const nextInfoAddress = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab").click();
  };

  const nextInfoNotes = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab1").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab1").click();
  };
  const nextInfoHC = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab2").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab2").click();
  };

  return (
    <>
      <div className="ms-2 font-size-patient pt-2">
        <div className="custom-card flex-grow-1">
          <h5 className="fw-normal  text-start  mb-2 px-1 py-2 text-login">
            Edit Patient
            <Link to={"/patients"} className="btn btn-primary btn-sm float-end">
              Back
            </Link>
          </h5>
        </div>
        <div className=" newClass">
          <div className="row me-1">
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
                  className={
                    patientInput.patient_mobile_phone == null &&
                    patientInput.patient_email == null
                      ? "nav-link text-start disabled btnNEw"
                      : "nav-link text-start"
                  }
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
                  className={
                    patientInput.patient_address1 == null &&
                    patientInput.patient_city_id == null
                      ? "nav-link text-start disabled btnNEw"
                      : "nav-link text-start"
                  }
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
                  className={
                    patientInput.patient_health_inc_no == null &&
                    patientInput.patient_medical_no == null
                      ? "nav-link text-start disabled btnNEw"
                      : "nav-link text-start"
                  }
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i> Medicare Info
                </button>
                <button
                  className={
                    patientInput.patient_general_notes == null &&
                    patientInput.patient_appointment_notes == null
                      ? "nav-link text-start disabled btnNEw"
                      : "nav-link text-start"
                  }
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
                  className="nav-link text-start"
                  id="v-pills-settings-tab7"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings7"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings7"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i>Family &
                  Social History
                </button>

                <button
                  className="nav-link text-start"
                  id="v-pills-settings-tab2"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings2"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings2"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i> Health Card
                </button>
                <button
                  className="nav-link text-start"
                  id="v-pills-settings-tab3"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings3"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings3"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i> My Symptoms
                </button>
                <button
                  className="nav-link text-start"
                  id="v-pills-settings-tab4"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings4"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings4"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i> Vital Signs
                </button>
                {/* <button
                  className="nav-link text-start"
                  id="v-pills-settings-tab5"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings5"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings5"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i> My Favourite
                  Doctor
                </button> */}
                <button
                  className="nav-link text-start"
                  id="v-pills-settings-tab6"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings6"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings6"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i>
                  Reactions/Allergies
                </button>
                <button
                  className="nav-link text-start"
                  id="v-pills-settings-tab9"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings9"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings6"
                  aria-selected="false"
                >
                  <i className="fas menu-icon fa-plus-circle"></i> Lab Report
                  Upload
                </button>
              </div>
              <div className="tab-content col-md-9" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <div className="mb-2 pt-2 px-3 custom-card">
                    <div className="d-flex bd-highlight">
                      <div className="p-2 flex-grow-1 bd-highlight">
                        <h6> Personal Information </h6>
                      </div>
                      <div className="p-2 bd-highlight">
                        <button
                          onClick={updatePatient}
                          className="btn btn-success btn-sm  float-right"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>

                        <Link
                          to={`/newpatient`}
                          type="button"
                          className="btn btn-success btn-sm  float-right mr-2"
                          title="Patients Profile"
                        >
                          Add New Patient
                        </Link>
                      </div>
                      <div className="p-2 bd-highlight">
                        <Link
                          to={`/patients-profile/${lastpart}`}
                          type="button"
                          className="float-right"
                          title="Add Patient"
                        >
                          <i className="edit-doctor-icon far fa-user-alt"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="custom-card pb-1">
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
                              className="form-control form-control-sm "
                              disabled
                              value={
                                patientInput.patient_hn_number == "null"
                                  ? ""
                                  : patientInput.patient_hn_number
                              }
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
                                    {item?.title_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div className="col-md-12 p-1 px-3">
                            <label htmlFor="inputEmail4" className="">
                              First Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="patient_first_name"
                              type="text"
                              onChange={handleInput}
                              value={
                                patientInput.patient_first_name == "null"
                                  ? ""
                                  : patientInput.patient_first_name
                              }
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
                              value={
                                patientInput.patient_middle_name == "null"
                                  ? ""
                                  : patientInput.patient_middle_name
                              }
                              className="form-control form-control-sm"
                              id="inputPassword4"
                            />
                          </div>
                          <div className="col-md-12 p-1 px-3">
                            <label htmlFor="inputEmail4" className="">
                              Last Name <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="patient_last_name"
                              type="text"
                              onChange={handleInput}
                              value={
                                patientInput.patient_last_name == "null"
                                  ? ""
                                  : patientInput.patient_last_name
                              }
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
                              value={
                                patientInput.patient_preferred_name == "null"
                                  ? ""
                                  : patientInput.patient_preferred_name
                              }
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
                                  ? new Date(patientInput?.patient_dob)
                                  : null
                              }
                              dateFormat={"dd/MM/yyyy"}
                              name="requisition_no"
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
                              Referred By
                            </label>
                            <input
                              name="patient_head_of_family"
                              type="text"
                              onChange={handleInput}
                              value={
                                patientInput.patient_head_of_family == "null"
                                  ? ""
                                  : patientInput.patient_head_of_family
                              }
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
                              Ethencity
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
                              NID/Smart ID
                            </label>
                            <input
                              name="patient_nid"
                              type="text"
                              onChange={handleInput}
                              value={
                                patientInput.patient_nid == "null"
                                  ? ""
                                  : patientInput.patient_nid
                              }
                              className="form-control form-control-sm "
                              id="inputEmail4"
                            />
                          </div>

                          <div className="col-md-12 p-1 px-3">
                            <label htmlFor="inputEmail4" className="">
                              Mobile Phone
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="patient_mobile_phone"
                              type="text"
                              onChange={handleInput}
                              value={
                                patientInput.patient_mobile_phone == "null"
                                  ? ""
                                  : patientInput.patient_mobile_phone
                              }
                              className="form-control form-control-sm "
                              id="inputEmail4"
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
                              value={
                                patientInput.patient_passport == "null"
                                  ? ""
                                  : patientInput.patient_passport
                              }
                              className="form-control form-control-sm"
                              id="inputPassword4"
                            />
                          </div>
                          {/* <div className="col-md-12 p-1 px-3">
                            <label htmlFor="inputPassword4" className="">
                              Age
                            </label>
                            <input
                              name="age"
                              type="number"
                              onChange={(e) => calculateAge(e.target.value)}
                              value={patientInput.age}
                              className="form-control form-control-sm"
                              id="inputPassword4"
                            />
                          </div> */}
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
                                    value={patientInput?.day}
                                    onChange={(e) =>
                                      handleAge(
                                        e.target.value,
                                        patientInput?.month || 0,
                                        patientInput?.age || 0
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
                                    value={patientInput?.month}
                                    onChange={(e) =>
                                      handleAge(
                                        patientInput?.day || 0,
                                        e.target.value,
                                        patientInput?.age || 0
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
                                    value={patientInput?.age}
                                    onChange={(e) =>
                                      handleAge(
                                        patientInput?.day || 0,
                                        patientInput?.month || 0,
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
                            {user?.isSuperAdmin ? (
                              <>
                                <label htmlFor="inputEmail4" className="">
                                  Branch
                                </label>
                                <select
                                  name="saas_branch_id"
                                  type="text"
                                  onChange={handleInput}
                                  value={patientInput.saas_branch_id}
                                  id="inputState"
                                  required
                                  className="form-select  col-form-label-sm font-size-patient"
                                >
                                  <option selected value={""}>
                                    Select
                                  </option>
                                  {orgBranch?.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </>
                            ) : null}

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

                              {nullParser(imageUrl) ? (
                                <img
                                  src={`${global.img_url}/images/files/${patientInput.patient_images}`}
                                  className="doctorImageUrlPreview"
                                  alt="No"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <button
                            onClick={nextInfoPersonal}
                            className="btn btn-success btn-sm  float-end mt-2"
                          >
                            <i className="far fa-hand-point-right"></i> Next
                          </button>
                          <button
                            onClick={updatePatient}
                            className="btn btn-success btn-sm  float-end mt-2 mr-2"
                          >
                            <i className="fas fa-save"></i> Update
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
                  <div className="custom-card clearfix pb-2 mb-3">
                    <div className="ml-3 pt-2 px-3">
                      <h6 className="card-title">Contacts</h6>
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
                              value={
                                patientInput.patient_home_phone == "null"
                                  ? ""
                                  : patientInput.patient_home_phone
                              }
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
                              value={
                                patientInput.patient_work_phone == "null"
                                  ? ""
                                  : patientInput.patient_work_phone
                              }
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
                              value={
                                patientInput.patient_parent_id == "null"
                                  ? ""
                                  : patientInput.patient_parent_id
                              }
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
                              value={
                                patientInput.patient_emergency_contact == "null"
                                  ? ""
                                  : patientInput.patient_emergency_contact
                              }
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
                              value={
                                patientInput.patient_email == "null"
                                  ? ""
                                  : patientInput.patient_email
                              }
                              className="form-control form-control-sm "
                              id="inputEmail4"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <button
                          onClick={nextInfoContact}
                          className="btn btn-success btn-sm  float-end mt-2"
                        >
                          <i className="far fa-hand-point-right"></i> Next
                        </button>
                        <button
                          onClick={updatePatient}
                          className="btn btn-success btn-sm  float-end mt-2 mr-2"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
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
                  <div className="custom-card pb-2 clearfix mb-3">
                    <div className="ml-3 pt-2 px-3">
                      <h6 className="card-title">Address</h6>
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
                              value={
                                patientInput.patient_address1 == "null"
                                  ? ""
                                  : patientInput.patient_address1
                              }
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
                              value={
                                patientInput.patient_address2 == "null"
                                  ? ""
                                  : patientInput.patient_address2
                              }
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
                              value={
                                patientInput.patient_postal_code == "null"
                                  ? ""
                                  : patientInput.patient_postal_code
                              }
                              className="form-control form-control-sm"
                              id="inputZip"
                            />
                            <div className="mt-2">
                              <button
                                onClick={nextInfoAddress}
                                className="btn btn-success btn-sm  float-end mt-2"
                              >
                                <i className="far fa-hand-point-right"></i> Next
                              </button>
                              <button
                                onClick={updatePatient}
                                className="btn btn-success btn-sm  float-end mt-2 mr-2"
                              >
                                <i className="fas fa-save"></i> Update
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
                    <div className="ml-3 pt-1 pb-2 clearfix px-3">
                      <h6 className="card-title">Medicare Info</h6>
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
                              value={
                                patientInput.patient_health_inc_no == "null"
                                  ? ""
                                  : patientInput.patient_health_inc_no
                              }
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
                              value={
                                patientInput.patient_medical_no == "null"
                                  ? ""
                                  : patientInput.patient_medical_no
                              }
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
                              value={
                                patientInput.patient_hcc_no == "null"
                                  ? ""
                                  : patientInput.patient_hcc_no
                              }
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
                                patientInput.patient_individual_health_identifier_no ==
                                "null"
                                  ? ""
                                  : patientInput.patient_individual_health_identifier_no
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
                              value={
                                patientInput.patient_health_inc_fund == "null"
                                  ? ""
                                  : patientInput.patient_health_inc_fund
                              }
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
                              value={
                                patientInput.patient_medical_record_no == "null"
                                  ? ""
                                  : patientInput.patient_medical_record_no
                              }
                              className="form-control form-control-sm"
                              id="inputCity"
                            />
                          </div>
                          <div className="col-md-12 p-1 px-3">
                            <label htmlFor="inputEmail4" className="">
                              Deceased Date
                            </label>
                            <input
                              type="date"
                              name="patient_deceased_date"
                              className="form-control form-control-sm"
                              onChange={handleInput}
                              value={
                                patientInput.patient_deceased_date == "null"
                                  ? ""
                                  : patientInput.patient_deceased_date
                              }
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
                              value={
                                patientInput.patient_safety_net_no == "null"
                                  ? ""
                                  : patientInput.patient_safety_net_no
                              }
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
                              value={
                                patientInput.patient_next_of_kin == "null"
                                  ? ""
                                  : patientInput.patient_next_of_kin
                              }
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
                              value={
                                patientInput.patient_usual_provider_id == "null"
                                  ? ""
                                  : patientInput.patient_usual_provider_id
                              }
                              className="form-select font-size-patient"
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
                          <div className="col-md-12 p-1 mt-5 px-3">
                            <label htmlFor="inputEmail4" className="">
                              Expiry Date
                            </label>
                            <input
                              name="patient_expire_date"
                              type="date"
                              onChange={handleInput}
                              value={
                                patientInput.patient_expire_date == "null"
                                  ? ""
                                  : patientInput.patient_expire_date
                              }
                              className="form-control form-control-sm "
                              id="inputEmail4"
                            />
                            <div className="mt-2">
                              <button
                                onClick={nextInfoNotes}
                                className="btn btn-success btn-sm  float-end mt-2"
                              >
                                <i className="far fa-hand-point-right"></i> Next
                              </button>
                              <button
                                onClick={updatePatient}
                                className="btn btn-success btn-sm  float-end mt-2 mr-2"
                              >
                                <i className="fas fa-save"></i> Update
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
                  id="v-pills-settings1"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab1"
                >
                  <div className="custom-card pb-2 clearfix mb-3">
                    <div className="ml-3 pt-1 px-3">
                      <h6 className="card-title">Notes</h6>
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
                          value={
                            patientInput.patient_general_notes == "null"
                              ? ""
                              : patientInput.patient_general_notes
                          }
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
                          value={
                            patientInput.patient_appointment_notes == "null"
                              ? ""
                              : patientInput.patient_appointment_notes
                          }
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="4"
                        ></textarea>
                        <div className="mt-2">
                          {/* <button onClick={nextInfoHC} className="btn btn-success btn-sm  float-end mt-2"><i
                                                        className="far fa-hand-point-right"></i> Next
                                                    </button> */}
                          <button
                            onClick={updatePatient}
                            className="btn btn-success btn-sm  float-end mt-2 mr-2"
                          >
                            <i className="fas fa-save"></i> Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  ref={componentRef}
                  className="tab-pane fade"
                  id="v-pills-settings2"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab2"
                >
                  <div className="custom-card health-card-header">
                    <div className="ml-3 p-2">
                      <h6 className="card-title">
                        Health Card
                        <span
                          className="float-end me-3 ms-3"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Print"
                        >
                          <i onClick={handlePrint} className="fas fa-print"></i>
                        </span>
                        <span className="float-end me-3 ms-3">
                          <i
                            onClick={() => {
                              setFrontShow(true);
                              setBackShow(true);
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="All"
                            className="fas fa-border-all"
                          ></i>
                        </span>
                        <span className="float-end me-3 ms-3">
                          <i
                            onClick={() => {
                              setFrontShow(false);
                              setBackShow(true);
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Back"
                            className="fas fa-address-card"
                          ></i>
                        </span>
                        <span className="float-end me-3 ms-3">
                          <i
                            onClick={() => {
                              setFrontShow(true);
                              setBackShow(false);
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Front"
                            className="far fa-address-card"
                          ></i>
                        </span>
                      </h6>
                    </div>
                  </div>

                  {frontShow && (
                    <div className="custom-card mt-2">
                      <div className="card-body">
                        <div className="health-card-container">
                          <div className="health-card-bg-container d-flex justify-content-evenly">
                            <img
                              className="img-fluid health-logo"
                              src={healthLogo}
                              alt=""
                            />
                            <img
                              className="img-fluid my-health"
                              src={myHealth}
                              alt=""
                            />
                          </div>
                          <div className="health-content">
                            {singlepatient.patient_images === "" ? (
                              <img src={NoImages} className="health-patient" />
                            ) : (
                              <img
                                src={`${global.img_url}/images/files/${patientInput.patient_images}`}
                                className="img-fluid rounded mt-1"
                                style={{ width: "120px", height: "100px" }}
                                border="0"
                              />
                            )}

                            <div className="detial">
                              <h5 className="patient-name">
                                {singlepatient.patient_title_id == null
                                  ? ""
                                  : singlepatient?.title?.title_name}
                                {singlepatient.patient_first_name == null
                                  ? ""
                                  : singlepatient.patient_first_name}
                                {singlepatient.patient_middle_name == null
                                  ? ""
                                  : singlepatient.patient_middle_name}
                                {singlepatient.patient_last_name == null
                                  ? ""
                                  : singlepatient.patient_last_name}
                              </h5>
                              <h6 className="hid">
                                HI :
                                {singlepatient.patient_hn_number == null
                                  ? ""
                                  : singlepatient.patient_hn_number}
                              </h6>
                            </div>
                            <img src={qrCode} alt="" className="qr-code" />
                          </div>
                          <div className="row health-details">
                            <div className="col-3 health-data">
                              {singlepatient?.ptn_blood_group_id == null ? (
                                ""
                              ) : (
                                <div>
                                  <p className="health-data-title">
                                    Blood Group:
                                  </p>
                                  <span className="health-bicon">
                                    {singlepatient?.ptn_blood_group_id == null
                                      ? ""
                                      : singlepatient?.blood_group
                                          ?.blood_group_name}
                                  </span>
                                </div>
                              )}
                              {singlepatient.patient_dob == null ? (
                                ""
                              ) : (
                                <div>
                                  <p className="health-data-title">D.O.B:</p>
                                  <span>
                                    {singlepatient.patient_dob == null
                                      ? ""
                                      : moment(
                                          singlepatient.patient_dob
                                        ).format("DD/MM/YYYY")}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="col-3 health-data">
                              {singlepatient.patient_birth_sex_id == null ? (
                                ""
                              ) : (
                                <div>
                                  <p className="health-data-title">Gender:</p>
                                  <span>
                                    {singlepatient?.patient_birth_sex_id == null
                                      ? ""
                                      : singlepatient?.patient_birth_sex
                                          ?.birth_sex_name}
                                  </span>
                                </div>
                              )}
                              {singlepatient.patient_nid == null ? (
                                ""
                              ) : (
                                <div>
                                  <p className="health-data-title">NID:</p>
                                  <span>
                                    {singlepatient.patient_nid == null
                                      ? ""
                                      : singlepatient.patient_nid}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="col-5">
                              {singlepatient.created_at == null ? (
                                ""
                              ) : (
                                <div>
                                  <p className="health-data-title">
                                    Effective Date:
                                  </p>
                                  <span>
                                    {moment(singlepatient.created_at).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </span>
                                </div>
                              )}

                              <p className="health-data-title">Validity:</p>
                              <span>Till the policy remain inforce</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {backShow && (
                    <div className="custom-card mt-2">
                      <div className="card-body">
                        <div className="health-card-back-container">
                          <div className="health-card-back-bg mt-2"></div>
                          <div className="card-back-content">
                            <p>
                              1. Minim excepteur est cupidatat eu occaecat
                              deserunt. Et <br />
                              excepteur aute sunt exercitation.
                            </p>
                            <p>
                              2. Id mollit nulla fugiat labore minim nulla
                              ullamco eu velit anim <br />
                              nostrud irure ad.
                            </p>
                            <p>
                              3. Sit consequat dolor Lorem veniam laborum dolore
                              non ex <br />
                              adipisicing qui ut nisi anim.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-settings3"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab3"
                >
                  <MySymptoms gender={patientInput.patient_birth_sex} />
                </div>
                <ReactModal
                  isOpen={historyModel}
                  appElement={document.getElementById("app")}
                  contentLabel="Example Modal"
                >
                  <div className="ml-1">
                    <div className="card">
                      <div className="vital-header patient_header ml-2 mt-3 px-3 ">
                        <h5 className="card-title">Vital Sign History</h5>
                        <a onClick={() => sethistoryModel(false)}>
                          <i className="fas fa-times"></i>
                        </a>
                      </div>
                      <div
                        className="vital-setup-container row p-1 m-1 mt-3"
                        style={{ backgrondColor: "#D4D4D4" }}
                      >
                        <div className="col-md-12 mt-3">
                          <MaterialTable
                            title=""
                            columns={[
                              {
                                title: "Time",
                                field: "created_at",
                                render: (row) => (
                                  <div>
                                    {moment(row.created_at).format(
                                      "MMMM Do YYYY, h:mm a"
                                    )}
                                  </div>
                                ),
                              },
                              { title: "Name", field: "name" },
                              { title: "value", field: "value" },
                            ]}
                            data={vitalSignTableShow}
                            options={{
                              search: true,
                              emptyRowsWhenPaging: false,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ReactModal>
                <div
                  className="tab-pane fade"
                  id="v-pills-settings4"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab4"
                >
                  <div className="custom-card d-flex justify-content-between mb-2 p-2">
                    <h6 className="card-title">Vital Signs</h6>

                    <button
                      onClick={() => sethistoryModel(true)}
                      className="btn btn-success btn-sm  float-end"
                    >
                      History
                    </button>
                  </div>
                  <div className="custom-card p-2">
                    <div className="card-body">
                      <div className="vital-patient-container">
                        <div className="my-vital-signs mt-3">
                          <h5 className="mb-2">My Vital Signs</h5>
                          <div className="row all-vital-sign-container">
                            {vitalSignArray.length > 0 &&
                              vitalSignArray.map((item, i) => {
                                return (
                                  <div key={i} className=" col-md-4  mb-3">
                                    <div className="vital-sign row m-1">
                                      <div>
                                        <div
                                          style={{
                                            height: "3px",
                                            background: item.color,
                                          }}
                                          className="w-50 float-end"
                                        ></div>
                                      </div>
                                      <div className="sign-title col-9">
                                        <span className="ms-1 little-heading">
                                          {item.name}
                                        </span>
                                        <br />
                                        <input
                                          className="d-inline"
                                          id="inputVitalSgin"
                                          name="vitalValue"
                                          onChange={(e) => signOnchage(e, i)}
                                          placeholder={item.value}
                                          type="text"
                                        />
                                        <span className="little-text">
                                          {item.units_id}
                                        </span>
                                      </div>
                                      <div className="sign-iocn col-3">
                                        <img
                                          src={`${global.img_url}/images/VitalSignIcon/${item.icon}`}
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                            <div>
                              <button
                                onClick={vitalSignSave}
                                className="btn btn-sm btn-success btn-sm  float-end"
                              >
                                <i className="fas fa-save"></i> Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="tab-pane fade"
                  id="v-pills-settings5"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab5"
                >
                  <div className="custom-card p-2">
                    <h6 className="card-title">My Favorite Doctors</h6>
                  </div>
                  <div className="custom-card">
                    <div className="m-2 p-2">
                      <div className="fav-doc-filter row">
                        <div className="col-4">
                          <input
                            type="text"
                            onChange={(e) =>
                              setDoctorsSort(
                                doctors.filter((item) =>
                                  item.dr_given_name
                                    .toLowerCase()
                                    .match(e.target.value.toLowerCase())
                                )
                              )
                            }
                            className="form-control form-control-sm  mb-sm-1"
                            placeholder="Search"
                          />
                        </div>
                        <div className="col-4">
                          <select
                            onChange={(e) => {
                              if (e.target.value === "Department") {
                                setDoctorsSort(doctors);
                              } else {
                                setDoctorsSort(
                                  doctors.filter(
                                    (item) =>
                                      item.department?.departments_name?.toLowerCase() ===
                                      e.target.value.toLocaleLowerCase()
                                  )
                                );
                              }
                            }}
                            className="form-select form-select-sm mb-sm-1"
                          >
                            <option defaultValue="Department">
                              Department
                            </option>
                            {doctorsDepartment.length > 0 &&
                              doctorsDepartment.map((item, i) => (
                                <option key={i} value={item.departments_name}>
                                  {item.departments_name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-4">
                          <select
                            onChange={(e) => {
                              if (e.target.value === "Specialist") {
                                setDoctorsSort(doctors);
                              } else {
                                setDoctorsSort(
                                  doctors.filter(
                                    (item) =>
                                      item.specialist?.specialists_name?.toLowerCase() ===
                                      e.target.value.toLocaleLowerCase()
                                  )
                                );
                              }
                            }}
                            className="form-select form-select-sm mb-sm-1"
                          >
                            <option defaultVlaue="Specialist">
                              Specialist
                            </option>
                            {doctorsSpecialist.length > 0 &&
                              doctorsSpecialist.map((item, i) => (
                                <option key={i} value={item.specialists_name}>
                                  {item.specialists_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="doc-cart-container mt-2">
                        <div className="row p-2">
                          {doctorsSort.length > 0 &&
                            doctorsSort.map((item, i) => {
                              return (
                                <div key={i} className="col-md-4 mb-2">
                                  <div className="fav-doc-cart">
                                    <div className="fav-doc-menu-icon clearfix">
                                      <div className="triangle-top-left"></div>
                                      <span className="year">15</span>
                                      <span className="years"> Years Exp.</span>
                                      <i className="fas float-end fa-ellipsis-h mt-2"></i>
                                      <i className="fas float-end fav-heart me-3 fa-heart mt-2"></i>
                                    </div>
                                    <div className="fav-doc-card">
                                      <div className="fav-doc-img-rating-container text-center">
                                        <img
                                          className="me-2"
                                          src={`${global.img_url}/doctors/images/${item.dr_images}`}
                                          alt="No Image"
                                        />
                                        <h6 className="mt-2 mb-2">
                                          {item.dr_given_name}
                                        </h6>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <span> 4.5</span>
                                      </div>
                                      <div className="fav-doc-chat-container mt-2 ps-2 pe-2">
                                        <p className="d-inline">
                                          <strong>Specialist</strong>
                                        </p>
                                        <span className="float-end">
                                          <i className="fas fa-comments fav-doc-chat-icon"></i>
                                          <span className="fav-doc-chat">
                                            Chat with doctor
                                          </span>
                                        </span>
                                      </div>
                                      <span className="d-block fav-doc-sergon ps-2 pe-2">
                                        {item.specialist?.specialists_name}
                                      </span>
                                      <p className="fav-doc-details mt-2 lh-1 ps-2 pe-2">
                                        {item.dr_about}
                                        <span className="fav-read-more">
                                          Read More...
                                        </span>
                                      </p>
                                      <button className="btn-fav-doc-app">
                                        Make Appointment
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div
                  className="tab-pane fade"
                  id="v-pills-settings6"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab6"
                >
                  <div className="card">
                    <div className="vital-header ml-2 mt-3 px-3">
                      <h5 className="card-title">
                        Patient Reactions / Allergies
                      </h5>
                    </div>
                    <div className="reaction-container m-3 p-2">
                      <div className="row">
                        <div className="col-md-5">
                          <p className="allergi-type d-inline me-1">
                            Allergy Type
                          </p>
                          <select
                            className="allergi-type-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select</option>
                            <option value="1">Food Allergy</option>
                            <option value="2">Drug Allergy</option>
                            <option value="3">Insect Allergy</option>
                            <option value="3">Latex Allergy</option>
                            <option value="3">Mold Allergy</option>
                            <option value="3">Pet Allergy</option>
                            <option value="3">Pollen Allergy</option>
                          </select>
                          <br />
                        </div>
                        <div className="col-md-7">
                          <p className="allergi-type d-inline mr-1">
                            Last check-up date
                          </p>
                          <input
                            className="allergy-input me-3"
                            type="date"
                            onChange={(e) =>
                              setallergyLastCheckDate(e.target.value)
                            }
                            value={allergyLastCheckDate}
                            placeholder="Search by date"
                          />
                          <button
                            onClick={saveAllargy}
                            className="btn btn-success btn-sm btn-sm"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="food-allergy-container mt-5 ">
                        <div className="food-allergy-head mt-4 mb-4 text-center">
                          <h5 className="d-inline ">Allergy List</h5>
                        </div>
                        <div className="allergy-food row p-1">
                          {allergyArray.map((item, i) => {
                            return (
                              <div key={i} className="col-3 mb-3">
                                <div className="allergy-food-icon d-block mb-3">
                                  <i
                                    onClick={() => allergyRemove(i)}
                                    className="float-end me-3 far fa-times-circle"
                                  ></i>
                                </div>
                                <div className="food-name text-center">
                                  <img
                                    src={carle}
                                    alt=""
                                    className="img-fluid mb-3"
                                  />
                                  <h6>{item.name}</h6>
                                  <span>{item.desc}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-settings7"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab7"
                >
                  <Family patient_id={patientID} />
                </div>

                <div
                  className="tab-pane fade"
                  id="v-pills-settings9"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab9"
                >
                  <PatientLabReport patient_id={patientID} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatient;
