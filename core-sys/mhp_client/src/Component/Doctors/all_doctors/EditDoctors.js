import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Patients/AddNewPatient/AddNewPatient.css";
import swal from "sweetalert";

import Swal from "sweetalert2";
import "../../../imageUrl";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import doctor from "../../../Images/crush.jpg";
import qrCode from "../../../Images/qr-code.png";
import moment from "moment";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

function EditNewDoctors() {
  var url = window.location.href;
  var urlsplit = url.split("/");
  var lastpart = urlsplit[urlsplit.length - 1];
  if (lastpart === "") {
    lastpart = urlsplit[urlsplit.length - 2];
  }

  const [titlelist, setTitlelist] = useState([]);
  const [genderlist, setGenderlist] = useState([]);
  const [citylist, setCitylist] = useState([]);
  const [contactvialist, setContactvialist] = useState([]);
  const [countrydrop, setcountrydrop] = useState([]);
  const [usualproviderlist, setUsualproviderlist] = useState([]);
  const [departmentlist, setDepartmentlist] = useState([]);
  const [specialistlist, setSpecialistlist] = useState([]);

  const [frontShow, setFrontShow] = useState(true);
  const [backShow, setBackShow] = useState(true);

  const [qrCodevalue, setqrCodevalue] = useState("Hey");

  console.log("qrCodevalue", qrCodevalue);

  const [doctorsInput, setDoctor] = useState({
    dr_identity_no: "",
    title: "",
    department_id: "",
    specialists_id: "",
    dr_family_name: "",
    dr_given_name: "",
    dr_middle_name: "",
    dr_last_name: "",
    dr_preferred_name: "",
    dr_address_line_1: "",
    dr_address_line_2: "",
    dr_bmdc_reg_no: "",
    dr_email: "",
    dr_dob: "",
    dr_birth_sex_id: "",
    dr_city_id: "",
    dr_postal_code: "",
    dr_home_phone: "",
    dr_work_phone: "",
    dr_mobile_phone: "",
    dr_contact_via_id: "",
    dr_provider_id: "",
    dr_images: "",
    created_at: "",
    usual_provider: {
      usual_provider_name: "",
    },
    work_experience_years: "",
    dr_about: "",
  });
  console.log(doctorsInput.dr_images, "ddd");

  const handleInput = (e) => {
    e.persist();
    setDoctor({ ...doctorsInput, [e.target.name]: e.target.value });
  };

  const [institionArray, setinstitionArray] = useState([]);

  useEffect(() => {
    axios.get(`/title-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setTitlelist(res.data.title);
      }
    });
    axios.get(`/gender-dropdown`).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.gender);
        setGenderlist(res.data.gender);
      }
    });

    axios.get(`/country`).then((res) => {
      if (res.data.status === 200) {
        setcountrydrop(res.data.country);
      }
    });

    axios.get(`/city-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setCitylist(res.data.city);
      }
    });

    axios.get(`/usual-provider`).then((res) => {
      if (res.data.status === 200) {
        setUsualproviderlist(res.data.usual_provider);
      }
    });

    axios.get(`/department`).then((res) => {
      if (res.data.status === 200) {
        setDepartmentlist(res.data.department);
      }
    });

    axios.get(`/specialist`).then((res) => {
      if (res.data.status === 200) {
        setSpecialistlist(res.data.specialist);
      }
    });
    axios.get(`/institutions`).then((res) => {
      if (res.data.status === 200) {
        setinstitionArray(res.data.institution);
      }
    });

    // console.log("Academic",AcademicArray);

    axios.get(`/edit-doctors/${lastpart}`).then((res) => {
      console.log("Doctors Data", res.data);

      setDoctor(res.data.doctors);

      setqrCodevalue(
        `${window.location.origin}/doctors-profile/${res.data.doctors.id}`
      );

      console.log("res.data.Academic.length", res.data.academic);

      if (res.data.academic.length > 0) {
        setAcademicArray(res.data.academic);
        setscan_copy_Academic(res.data.academic);
      }

      console.log("res.data.Certificate.length", res.data.certificate.length);
      if (res.data.certificate.length > 0) {
        setCertificate(res.data.certificate);
        setscan_copy_certificate(res.data.certificate);
      }
      if (res.data.trainnig.length > 0) {
        setTrainingArray(res.data.trainnig);
        setscan_copy_training(res.data.trainnig);
      }
      if (res.data.work.length > 0) {
        setWorkExp(res.data.work);
        setscan_copy_work(res.data.work);
      }
    });
  }, []);

  const [docImage_error, setdocImage_error] = useState();
  const [doctorImageUrl, setdoctorImageUrl] = useState();
  const [doctorImage, setdoctorImage] = useState();

  const handleDoctorImageUrl = (event) => {
    if (event.target.files[0].size < 2000048) {
      setdoctorImage(event.target.files[0]);
      setdocImage_error(null);
    } else {
      setdocImage_error("File size must be less than 2 mb !");
    }
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].size < 2000048
    ) {
      setdoctorImageUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setdocImage_error("File size must be less than 2 mb !");
    }
  };
  const closeImage = () => {
    setdoctorImageUrl();
    document.getElementById("doctorImageUrl").value = "";
  };

  const [AcademicArray, setAcademicArray] = useState([
    {
      id: "",
      doctors_master_id: "",
      degree_id: "",
      passing_year: "",
      result: "",
      institution_id: "",
      country_id: "",
      city_id: "",
      scan_copy_title: "",
    },
  ]);

  const [scan_copy_Academic, setscan_copy_Academic] = useState([
    { scan_copy: "" },
  ]);

  const handleChangeAcademic = (e, index) => {
    const { name, value } = e.target;
    const list = [...AcademicArray];
    list[index][name] = value;
    setAcademicArray(list);
  };
  const handle_Academic_File = (e, index) => {
    if (e.target.files[0].size < 2000048) {
      const { name } = e.target;

      const fileList = [...scan_copy_Academic];

      fileList[index][name] = e.target.files[0];

      setscan_copy_Academic(fileList);

      setdocImage_error(null);
    } else {
      setdocImage_error(
        "File size must be less than 2 mb and file type pdf/jpg/jpeg/png !"
      );
    }
  };

  const handleAddInput = () => {
    setAcademicArray([
      ...AcademicArray,
      {
        id: "",
        degree_id: "",
        passing_year: "",
        result: "",
        institution_id: "",
        country_id: "",
        city_id: "",
        scan_copy_title: "",
        scan_copy: [],
      },
    ]);

    setscan_copy_Academic([
      ...scan_copy_Academic,
      {
        scan_copy: "",
      },
    ]);
  };

  const handleRemoveInput = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const list = [...AcademicArray];
        list.splice(index, 1);
        setAcademicArray(list);

        const listFile = [...scan_copy_Academic];
        listFile.splice(index, 1);
        setscan_copy_Academic(list);

        if (AcademicArray[index].id !== "") {
          axios
            .delete(`/destroy-doctors-academic/${AcademicArray[index].id}`)
            .then((res) => {
              console.log("Academic row Detele");
            });
        }

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const [CertificateArray, setCertificate] = useState([
    {
      id: "",
      doctors_master_id: "",
      certificate_title: "",
      certificate_name: "",
      provider_id: "",
      country_id: "",
      city_id: "",
      scan_copy_title: "",
      details_of_course: "",
    },
  ]);
  const [scan_copy_certificate, setscan_copy_certificate] = useState([
    { scan_copy: "" },
  ]);

  const handle_Certificate_File = (e, index) => {
    if (e.target.files[0].size < 2000048) {
      const { name } = e.target;

      const fileListCertificate = [...scan_copy_certificate];

      fileListCertificate[index][name] = e.target.files[0];

      setscan_copy_certificate(fileListCertificate);

      setdocImage_error(null);
    } else {
      setdocImage_error(
        "File size must be less than 2 mb and file type pdf/jpg/jpeg/png !"
      );
    }
  };

  const handleChangeCertificate = (e, index) => {
    const { name, value } = e.target;
    const list = [...CertificateArray];
    list[index][name] = value;
    setCertificate(list);
  };

  const handleAddCertificate = () => {
    setCertificate([
      ...CertificateArray,
      {
        id: "",
        certificate_title: "",
        certificate_name: "",
        provider_id: "",
        country_id: "",
        city_id: "",
        scan_copy_title: "",
        details_of_course: "",
      },
    ]);

    setscan_copy_certificate([
      ...scan_copy_certificate,
      {
        scan_copy: "",
      },
    ]);
  };

  const handleRemoveCertificate = (i) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const list = [...CertificateArray];
        list.splice(i, 1);
        setCertificate(list);

        const listCer = [...scan_copy_certificate];
        listCer.splice(i, 1);
        setscan_copy_certificate(listCer);

        if (CertificateArray[i].id !== "") {
          axios
            .delete(`/destroy-doctors-certificate/${CertificateArray[i].id}`)
            .then((res) => {
              console.log("certificate row Detele");
            });
        }

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const [TrainingArray, setTrainingArray] = useState([
    {
      id: "",
      doctors_master_id: "",
      training_name: "",
      issuing_organization: "",
      issue_date: "",
      expire_date: "",
      credential_identity: "",
      credential_url: "",
      certificates_copy_title: "",
    },
  ]);

  const [scan_copy_training, setscan_copy_training] = useState([
    { scan_copy: "" },
  ]);

  const handle_Training_File = (e, index) => {
    if (e.target.files[0].size < 2000048) {
      const { name } = e.target;

      const fileListTrai = [...scan_copy_training];

      fileListTrai[index][name] = e.target.files[0];

      setscan_copy_training(fileListTrai);

      setdocImage_error(null);
    } else {
      setdocImage_error(
        "File size must be less than 2 mb and file type pdf/jpg/jpeg/png !"
      );
    }
  };

  const handleChangeTraining = (e, index) => {
    const { name, value } = e.target;
    const list = [...TrainingArray];
    list[index][name] = value;
    setTrainingArray(list);
  };

  const handleAddTrainig = () => {
    setTrainingArray([
      ...TrainingArray,
      {
        id: "",
        doctors_master_id: "",
        training_name: "",
        issuing_organization: "",
        issue_date: "",
        expire_date: "",
        credential_identity: "",
        credential_url: "",
        certificates_copy_title: "",
        certificates_copy: "",
      },
    ]);

    setscan_copy_training([
      ...scan_copy_training,
      {
        scan_copy: "",
      },
    ]);
  };

  const handleRemoveTrainig = (i) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const list = [...TrainingArray];
        list.splice(i, 1);
        setTrainingArray(list);

        const listTrai = [...scan_copy_training];
        listTrai.splice(i, 1);
        setscan_copy_training(listTrai);

        if (TrainingArray[i].id !== "") {
          axios
            .delete(`/destroy-doctors-trainig/${TrainingArray[i].id}`)
            .then((res) => {
              console.log("trainig row Detele");
            });
        }

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const [WorkExp, setWorkExp] = useState([
    {
      id: "",
      doctors_master_id: "",
      work_experience_title: "",
      employment_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      is_present: "Yes",
      certificates_copy_title: "",
      credential_identity: "",
    },
  ]);

  const [scan_copy_work, setscan_copy_work] = useState([{ scan_copy: "" }]);

  const handle_Work_File = (e, index) => {
    if (e.target.files[0].size < 2000048) {
      const { name } = e.target;

      const fileListWork = [...scan_copy_work];

      fileListWork[index][name] = e.target.files[0];

      setscan_copy_work(fileListWork);

      setdocImage_error(null);
    } else {
      setdocImage_error(
        "File size must be less than 2 mb and file type pdf/jpg/jpeg/png !"
      );
    }
  };

  const handleChangeWord = (e, index) => {
    const { name, value } = e.target;
    const list = [...WorkExp];
    list[index][name] = value;
    setWorkExp(list);
  };

  const handleAddWork = () => {
    setWorkExp([
      ...WorkExp,
      {
        id: "",
        work_experience_title: "",
        employment_title: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        is_present: "Yes",
        certificates_copy_title: "",
        credential_identity: "",
      },
    ]);

    setscan_copy_work([
      ...scan_copy_work,
      {
        scan_copy: "",
      },
    ]);
  };

  const handleRemoveWork = (i) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const list = [...WorkExp];
        list.splice(i, 1);
        setWorkExp(list);

        const listWork = [...scan_copy_work];
        listWork.splice(i, 1);
        setscan_copy_work(listWork);

        if (WorkExp[i].id !== "") {
          axios.delete(`/destroy-doctors-work/${WorkExp[i].id}`).then((res) => {
            console.log("work row Detele");
          });
        }

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigate = useNavigate();

  const updateDoctor = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("dr_identity_no", doctorsInput.dr_identity_no);
    formData.append("title", doctorsInput.title);
    formData.append("department_id", doctorsInput.department_id);
    formData.append("specialists_id", doctorsInput.specialists_id);
    formData.append("dr_family_name", doctorsInput.dr_family_name);
    formData.append("dr_given_name", doctorsInput.dr_given_name);
    formData.append("dr_middle_name", doctorsInput.dr_middle_name);
    formData.append("dr_last_name", doctorsInput.dr_last_name);
    formData.append("dr_preferred_name", doctorsInput.dr_preferred_name);
    formData.append("dr_address_line_1", doctorsInput.dr_address_line_1);
    formData.append("dr_address_line_2", doctorsInput.dr_address_line_2);
    formData.append("dr_bmdc_reg_no", doctorsInput.dr_bmdc_reg_no);
    formData.append("dr_email", doctorsInput.dr_email);
    formData.append("dr_dob", doctorsInput.dr_dob);
    formData.append("dr_birth_sex_id", doctorsInput.dr_birth_sex_id);
    formData.append("dr_city_id", doctorsInput.dr_city_id);
    formData.append("dr_postal_code", doctorsInput.dr_postal_code);
    formData.append("dr_home_phone", doctorsInput.dr_home_phone);
    formData.append("dr_work_phone", doctorsInput.dr_work_phone);
    formData.append("dr_mobile_phone", doctorsInput.dr_mobile_phone);
    formData.append("dr_contact_via_id", doctorsInput.dr_contact_via_id);
    formData.append("dr_provider_id", doctorsInput.dr_provider_id);
    formData.append("dr_about", doctorsInput.dr_about);
    formData.append("doctor_fee", doctorsInput?.doctor_fee);
    formData.append(
      "work_experience_years",
      doctorsInput.work_experience_years
    );
    formData.append(
      "doctorImage",
      doctorImage == null ? doctorsInput.dr_images : doctorImage
    );

    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    axios.post(`/update-doctors/${lastpart}`, formData).then((res) => {
      if (res.data.status === 200) {
        AcademicArray.map((item, i) => {
          if (item.degree_id !== "") {
            const academic = new FormData();
            academic.append("doctors_master_id", res.data.doctors.id);
            academic.append("degree_id", item.degree_id);
            academic.append("passing_year", item.passing_year);
            academic.append("result", item.result);
            academic.append("institution_id", item.institution_id);
            academic.append("country_id", item.country_id);
            academic.append("city_id", item.city_id);
            academic.append("scan_copy_title", item.scan_copy_title);
            academic.append("scan_copy", scan_copy_Academic[i].scan_copy);

            if (item.id !== "") {
              axios
                .post(`/update-doctors-academic/${item.id}`, academic)
                .then((res) => {
                  console.log("save-doctors-academic");
                });
            } else {
              axios.post("save-doctors-academic", academic).then((res) => {
                console.log("save-doctors-academic");
              });
            }
          }
        });

        CertificateArray.map((item, i) => {
          if (item.certificate_title !== "") {
            const academic = new FormData();
            academic.append("doctors_master_id", res.data.doctors.id);
            academic.append("certificate_title", item.certificate_title);
            academic.append("certificate_name", item.certificate_name);
            academic.append("provider_id", item.provider_id);
            academic.append("country_id", item.country_id);
            academic.append("city_id", item.city_id);
            academic.append("scan_copy_title", item.scan_copy_title);
            academic.append("details_of_course", item.details_of_course);
            academic.append("scan_copy", scan_copy_certificate[i].scan_copy);

            if (item.id !== "") {
              axios
                .post(`/update-doctors-certificate/${item.id}`, academic)
                .then((res) => {
                  console.log("save-doctors-Certificate");
                });
            } else {
              axios.post("save-doctors-certificate", academic).then((res) => {
                console.log("save-doctors-certificate");
              });
            }
          }
        });

        TrainingArray.map((item, i) => {
          if (item.training_name !== "") {
            const academic = new FormData();
            academic.append("doctors_master_id", res.data.doctors.id);
            academic.append("training_name", item.training_name);
            academic.append("issuing_organization", item.issuing_organization);
            academic.append("issue_date", item.issue_date);
            academic.append("expire_date", item.expire_date);
            academic.append("credential_identity", item.credential_identity);
            academic.append("credential_url", item.credential_url);
            academic.append(
              "certificates_copy_title",
              item.certificates_copy_title
            );

            academic.append("scan_copy", scan_copy_training[i].scan_copy);

            if (item.id !== "") {
              axios
                .post(`/update-doctors-trainig/${item.id}`, academic)
                .then((res) => {
                  console.log("save-doctors-Certificate");
                });
            } else {
              axios.post("save-doctors-tarinnig", academic).then((res) => {
                console.log("save-doctors-tarinnig");
              });
            }
          }
        });

        WorkExp.map((item, i) => {
          if (item.work_experience_title !== "") {
            const academic = new FormData();
            academic.append("doctors_master_id", res.data.doctors.id);
            academic.append(
              "work_experience_title",
              item.work_experience_title
            );
            academic.append("employment_title", item.employment_title);
            academic.append("company", item.company);
            academic.append("location", item.location);
            academic.append("start_date", item.start_date);
            academic.append("end_date", item.end_date);
            academic.append("is_present", item.is_present);
            academic.append(
              "certificates_copy_title",
              item.certificates_copy_title
            );
            academic.append("scan_copy", scan_copy_work[i].scan_copy);
            academic.append("credential_identity", item.credential_identity);

            if (item.id !== "") {
              axios
                .post(`/update-doctors-work/${item.id}`, academic)
                .then((res) => {
                  console.log("save-doctors-Certificate");
                });
            } else {
              axios.post("save-doctors-work", academic).then((res) => {
                console.log("save-doctors-work");
              });
            }
          }
        });

        swal("Success", res.data.message, "success");
        navigate("/doctors");
      } else {
        if (res.data.dr_identity_no) {
          toast.error(res.data.dr_identity_no[0]);
        }

        if (res.data.dr_given_name) {
          toast.error(res.data.dr_given_name[0]);
        }

        if (res.data.dr_last_name) {
          toast.error(res.data.dr_last_name[0]);
        }

        if (res.data.dr_birth_sex_id) {
          toast.error("Doctors Gender is required");
        }
        if (res.data.dr_mobile_phone) {
          toast.error(res.data.dr_mobile_phone[0]);
        }
        if (res.data.dr_work_phone) {
          toast.error(res.data.dr_work_phone[0]);
        }
        if (res.data.department_id) {
          toast.error("Doctors Department is required");
        }
      }
    });
  };

  const nextAcademic = () => {
    document.getElementById("v-pills-profile-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-profile-tab").click();
  };

  const NextLinkActiveCer = () => {
    document.getElementById("v-pills-messages-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-messages-tab").click();
  };

  const NextLinkActiveLie = () => {
    document.getElementById("v-pills-settings-tab").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab").click();
  };

  const NextLinkActiveWork = () => {
    document.getElementById("v-pills-settings-tab1").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab1").click();
  };

  const NextLinkActiveAll = () => {
    document.getElementById("v-pills-settings-tab3").className =
      "nav-link text-start";
    document.getElementById("v-pills-settings-tab3").click();
  };

  return (
    <>
      <div className="ms-2 font-size-patient pt-2">
        <div className="custom-card">
          <h5 className="fw-normal  text-start  mb-2 px-1 py-2 text-login">
            Edit Doctors
            <Link
              to={"/doctors"}
              className="btn btn-primary btn-sm float-end me-1"
            >
              {" "}
              Back{" "}
            </Link>
          </h5>
        </div>
        <div className="newClass me-1">
          <div className="d-flex align-items-start">
            <div
              class="nav custom-card col-md-3 flex-column nav-pills me-2"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link text-start  active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <i class="fas menu-icon fa-plus-circle"></i>Personal Information
              </button>

              <button
                class={
                  AcademicArray[0].id == false
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
                <i class="fas menu-icon fa-plus-circle"></i>Academic
              </button>
              <button
                class={
                  CertificateArray[0].id == false
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
                <i class="fas menu-icon fa-plus-circle"></i>Certificates
              </button>
              <button
                class={
                  TrainingArray[0].id == false
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
                <i class="fas menu-icon fa-plus-circle"></i>License and Training
              </button>
              <button
                class={
                  WorkExp[0].id == false
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
                <i class="fas menu-icon fa-plus-circle"></i>Work Experience
              </button>
              {/* <button class="nav-link text-start" id="v-pills-settings-tab2" data-bs-toggle="pill" data-bs-target="#v-pills-settings2" type="button" role="tab" aria-controls="v-pills-settings2" aria-selected="false"><i class="fas menu-icon fa-plus-circle"></i> Time Slot</button> */}
              <button
                class="nav-link text-start"
                id="v-pills-settings-tab3"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings3"
                type="button"
                role="tab"
                aria-controls="v-pills-settings3"
                aria-selected="false"
              >
                <i class="fas menu-icon fa-plus-circle"></i> ALL
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
                <i className="fas menu-icon fa-plus-circle"></i> ID Card{" "}
              </button>
            </div>

            <div class="tab-content col-md-9" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="custom-card pt-1 mb-2 px-1">
                  <div className="d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight">
                      {" "}
                      <h6> Personal Information </h6>{" "}
                    </div>
                    <div className="p-2 bd-highlight">
                      <button
                        onClick={updateDoctor}
                        className="btn btn-sm btn-success btn-sm  float-right"
                      >
                        <i className="fas fa-save"></i> Update
                      </button>
                    </div>
                    <div className="p-2 bd-highlight">
                      <Link
                        to={`/doctor-time-slot`}
                        type="button"
                        className="float-right"
                        title="Time Slot"
                      >
                        <i className="edit-doctor-icon me-3 float-end fas fa-clock"></i>
                      </Link>
                    </div>
                    <div className="p-2 bd-highlight">
                      <Link
                        to={`/doctor-time-slot-details`}
                        type="button"
                        className="float-right"
                        title="Time Slot Details"
                      >
                        <i className="edit-doctor-icon float-end me-3 far fa-clock"></i>
                      </Link>
                    </div>
                    <div className="p-2 bd-highlight">
                      <Link
                        to={`/doctors-profile/${lastpart}`}
                        type="button"
                        className="float-right"
                        title="Doctors Profile"
                      >
                        <i className="edit-doctor-icon far fa-user-alt"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="custom-card pb-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Doctors Identity No.{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="dr_identity_no"
                            disabled
                            type="text"
                            className="form-control form-control-sm "
                            value={
                              doctorsInput.dr_identity_no == "null"
                                ? ""
                                : doctorsInput.dr_identity_no
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Doctors Title
                          </label>
                          <select
                            id="inputState"
                            name="title"
                            onChange={handleInput}
                            value={doctorsInput.title}
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
                        {/* <div className="col-md-12 p-1 px-3">
                                                    <label htmlFor="inputEmail4"
                                                        className="form-label col-form-label col-form-label-sm">Family Name</label>
                                                    <input name="dr_family_name" type="text" className="form-control form-control-sm "
                                                        onChange={handleInput} value={doctorsInput.dr_family_name == 'null' ? '' : doctorsInput.dr_family_name} id="inputEmail4" />
                                                    <span className="span_desc">Enter family name.</span>
                                                </div> */}
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Given Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="dr_given_name"
                            type="text"
                            className="form-control form-control-sm "
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_given_name == "null"
                                ? ""
                                : doctorsInput.dr_given_name
                            }
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Middle Name
                          </label>
                          <input
                            name="dr_middle_name"
                            type="text"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_middle_name == "null"
                                ? ""
                                : doctorsInput.dr_middle_name
                            }
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Last Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="dr_last_name"
                            type="text"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_last_name == "null"
                                ? ""
                                : doctorsInput.dr_last_name
                            }
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Preferred Name
                          </label>
                          <input
                            name="dr_preferred_name"
                            type="text"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_preferred_name == "null"
                                ? ""
                                : doctorsInput.dr_preferred_name
                            }
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Address Line 1
                          </label>
                          <textarea
                            name="dr_address_line_1"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_address_line_1 == "null"
                                ? ""
                                : doctorsInput.dr_address_line_1
                            }
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="2"
                          ></textarea>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Address Line 2
                          </label>
                          <textarea
                            name="dr_address_line_2"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_address_line_2 == "null"
                                ? ""
                                : doctorsInput.dr_address_line_2
                            }
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="2"
                          ></textarea>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            BMDC Reg No.
                          </label>
                          <input
                            type="text"
                            name="dr_bmdc_reg_no"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_bmdc_reg_no == "null"
                                ? ""
                                : doctorsInput.dr_bmdc_reg_no
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="dr_email"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_email == "null"
                                ? ""
                                : doctorsInput.dr_email
                            }
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dr_dob"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_dob == "null"
                                ? ""
                                : doctorsInput.dr_dob
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label htmlFor="inputEmail4" className="">
                            Doctors Consultation Fee
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            name="doctor_fee"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={doctorsInput?.doctor_fee}
                            id="inputEmail4"
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            {" "}
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="dr_birth_sex_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_birth_sex_id}
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            City
                          </label>
                          <select
                            id="inputState"
                            name="dr_city_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_city_id}
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Post Code
                          </label>
                          <input
                            type="text"
                            name="dr_postal_code"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_postal_code == "null"
                                ? ""
                                : doctorsInput.dr_postal_code
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Bkash Number
                          </label>
                          <input
                            type="text"
                            name="dr_home_phone"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_home_phone == "null"
                                ? ""
                                : doctorsInput.dr_home_phone
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Appointment Number{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="dr_work_phone"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_work_phone == "null"
                                ? ""
                                : doctorsInput.dr_work_phone
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Mobile Phone
                          </label>
                          <input
                            type="text"
                            name="dr_mobile_phone"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_mobile_phone == "null"
                                ? ""
                                : doctorsInput.dr_mobile_phone
                            }
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Contact Via{" "}
                          </label>
                          <select
                            id="inputState"
                            name="dr_contact_via_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_contact_via_id}
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
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            {" "}
                            Departments <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="inputState"
                            name="department_id"
                            onChange={handleInput}
                            value={doctorsInput.department_id}
                            className="form-select  col-form-label-sm font-size-patient"
                          >
                            <option value="" selected>
                              Select
                            </option>

                            {departmentlist.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.departments_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            {" "}
                            Specialists{" "}
                          </label>
                          <select
                            id="inputState"
                            name="specialists_id"
                            onChange={handleInput}
                            value={doctorsInput.specialists_id}
                            className="form-select  col-form-label-sm font-size-patient"
                          >
                            <option selected>Select</option>

                            {specialistlist.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.specialists_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputState"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Usual Provider
                          </label>
                          <select
                            id="inputState"
                            name="dr_provider_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_provider_id}
                            className="form-select col-form-label-sm font-size-patient"
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Year Of Experience
                          </label>
                          <input
                            onChange={handleInput}
                            value={doctorsInput.work_experience_years}
                            name="work_experience_years"
                            type="text"
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            About Doctor
                          </label>
                          <textarea
                            name="dr_about"
                            onChange={handleInput}
                            value={doctorsInput.dr_about}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>

                        <div className="col-md-12 p-1 px-3 d-flex">
                          <div>
                            <label
                              htmlFor="doctorImageUrl"
                              className="form-label col-form-label col-form-label-sm"
                            >
                              Doctor image
                            </label>
                            <input
                              type="file"
                              name="doctorImage"
                              className="form-control form-control-sm"
                              onChange={handleDoctorImageUrl}
                              id="doctorImageUrl"
                              accept="image/jpg,image/jpeg,image/gif,image/png"
                            />
                            {docImage_error == null ? (
                              <p className="doc_image_size">
                                Image size must be less than 2 mb
                              </p>
                            ) : (
                              <p className="docimage_error">{docImage_error}</p>
                            )}
                          </div>

                          {doctorImageUrl == null ? (
                            <img
                              src={`${global.img_url}/doctors/images/${doctorsInput.dr_images}`}
                              className="doctorImageUrlPreview"
                              alt="preview image"
                            />
                          ) : (
                            <div className="docImage">
                              <img
                                src={doctorImageUrl}
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
                      <div className="mr-4 mb-3">
                        <button
                          onClick={nextAcademic}
                          className="btn btn-success btn-sm  float-end mt-2 "
                        >
                          <i className="far fa-hand-point-right"></i> Next
                        </button>
                        <button
                          onClick={updateDoctor}
                          className="btn btn-success btn-sm  float-end mt-2 mr-3"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                {AcademicArray.map((item, i) => {
                  return (
                    <div key={i} className="custom-card clearfix pb-2 mb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Academic</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Degree
                              </label>
                              <input
                                name="degree_id"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => handleChangeAcademic(e, i)}
                                id="inputEmail4"
                                value={item.degree_id}
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Passing Year
                              </label>
                              <input
                                name="passing_year"
                                type="text"
                                value={item.passing_year}
                                className="form-control form-control-sm"
                                onChange={(e) => handleChangeAcademic(e, i)}
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Result
                              </label>
                              <input
                                name="result"
                                type="text"
                                value={item.result}
                                className="form-control form-control-sm "
                                onChange={(e) => handleChangeAcademic(e, i)}
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Institution
                              </label>
                              <select
                                id="institution_id"
                                name="institution_id"
                                value={item.institution_id}
                                className="form-select  col-form-label-sm font-size-patient"
                                onChange={(e) => handleChangeAcademic(e, i)}
                              >
                                <option selected>Select</option>
                                {institionArray.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Country
                              </label>
                              <select
                                id="country_id"
                                name="country_id"
                                value={item.country_id}
                                onChange={(e) => handleChangeAcademic(e, i)}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {countrydrop.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.country_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                City
                              </label>
                              <select
                                id="city_id"
                                name="city_id"
                                value={item.city_id}
                                onChange={(e) => handleChangeAcademic(e, i)}
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
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy Title
                              </label>
                              <input
                                type="text"
                                name="scan_copy_title"
                                onChange={(e) => handleChangeAcademic(e, i)}
                                value={item.scan_copy_title}
                                className="form-control form-control-sm"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Academic_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 clearfix p-1 px-3 mb-2">
                        {AcademicArray.length - 1 === i && (
                          <input
                            type="button"
                            onClick={handleAddInput}
                            className="btn btn-success float-end mt-2 btn-sm"
                            value="+ Add More"
                          />
                        )}
                        {AcademicArray.length !== 1 && (
                          <input
                            type="button"
                            onClick={() => handleRemoveInput(i)}
                            className="btn btn-warning float-end mt-2 btn-sm mr-2"
                            value="- Remove"
                          />
                        )}
                      </div>
                      <div className="clearfix me-3 mb-3">
                        <button
                          onClick={NextLinkActiveCer}
                          className="btn btn-success btn-sm  float-end mt-2 "
                        >
                          <i className="far fa-hand-point-right"></i> Next
                        </button>
                        <button
                          onClick={updateDoctor}
                          className="btn btn-success btn-sm  float-end mt-2 mr-3"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                class="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                {CertificateArray.map((item, i) => {
                  return (
                    <div key={i} className="custom-card clearfix mb-2 pb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Professional Certificates</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificate Title
                              </label>
                              <input
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.certificate_title}
                                name="certificate_title"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificate Name
                              </label>
                              <input
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.certificate_name}
                                name="certificate_name"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Provider
                              </label>
                              <select
                                id="inputState"
                                name="provider_id"
                                value={item.provider_id}
                                onChange={(e) => handleChangeCertificate(e, i)}
                                className="form-select col-form-label-sm font-size-patient"
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
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Country
                              </label>
                              <select
                                id="inputState"
                                name="country_id"
                                value={item.country_id}
                                onChange={(e) => handleChangeCertificate(e, i)}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {countrydrop.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.country_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                City
                              </label>
                              <select
                                id="city_id"
                                name="city_id"
                                value={item.city_id}
                                onChange={(e) => handleChangeCertificate(e, i)}
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
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy Title
                              </label>
                              <input
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.scan_copy_title}
                                type="text"
                                name="scan_copy_title"
                                className="form-control form-control-sm"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Certificate_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                {" "}
                                Details of the Course{" "}
                              </label>
                              <textarea
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.details_of_course}
                                name="details_of_course"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="2"
                              ></textarea>
                            </div>
                            <div className="col-md-12 p-1 px-3 mb-2">
                              {CertificateArray.length - 1 === i && (
                                <input
                                  type="button"
                                  onClick={handleAddCertificate}
                                  className="btn btn-success float-end mt-2 btn-sm"
                                  value="+ Add More"
                                />
                              )}
                              {CertificateArray.length !== 1 && (
                                <input
                                  type="button"
                                  onClick={() => handleRemoveCertificate(i)}
                                  className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                  value="- Remove"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mr-4 clearfix mb-3">
                        <button
                          onClick={NextLinkActiveLie}
                          className="btn btn-success btn-sm  float-end mt-2 "
                        >
                          <i className="far fa-hand-point-right"></i> Next
                        </button>
                        <button
                          onClick={updateDoctor}
                          className="btn btn-success btn-sm  float-end mt-2 mr-3"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                class="tab-pane fade"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                {TrainingArray.map((item, i) => {
                  return (
                    <div className="custom-card pb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">License and Training</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Title/Name
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.training_name}
                                name="training_name"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Issuing Organaization
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.issuing_organization}
                                name="issuing_organization"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Issue Date
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.issue_date}
                                name="issue_date"
                                type="date"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Expire Date
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.expire_date}
                                name="expire_date"
                                type="date"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Credential ID
                              </label>
                              <input
                                type="button"
                                className="btn btn-success float-end mb-1 btn-sm"
                                value="Verify"
                              />
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.credential_identity}
                                name="credential_identity"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Credential URL
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.credential_url}
                                name="credential_url"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificates Copy Title
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.certificates_copy_title}
                                type="text"
                                name="certificates_copy_title"
                                className="form-control form-control-sm"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Training_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>

                            <div className="col-md-12 p-1 px-3 mb-2">
                              {TrainingArray.length - 1 === i && (
                                <input
                                  type="button"
                                  onClick={handleAddTrainig}
                                  className="btn btn-success float-end mt-2 btn-sm"
                                  value="+ Add More"
                                />
                              )}
                              {TrainingArray.length !== 1 && (
                                <input
                                  type="button"
                                  onClick={() => handleRemoveTrainig(i)}
                                  className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                  value="- Remove"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mr-4 clearfix mb-3">
                        <button
                          onClick={NextLinkActiveWork}
                          className="btn btn-success btn-sm  float-end mt-2 "
                        >
                          <i className="far fa-hand-point-right"></i> Next
                        </button>
                        <button
                          onClick={updateDoctor}
                          className="btn btn-success btn-sm  float-end mt-2 mr-3"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                class="tab-pane fade"
                id="v-pills-settings1"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab1"
              >
                {WorkExp.map((item, i) => {
                  return (
                    <div className="custom-card pb-2 clearfix">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Work Experience</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Title
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.work_experience_title}
                                name="work_experience_title"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Employment Type
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.employment_title}
                                name="employment_title"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Company
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.company}
                                name="company"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Location
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.location}
                                name="location"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Start Date
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.start_date}
                                name="start_date"
                                type="date"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm mr-3"
                              >
                                Is present
                              </label>
                              <div class="form-check form-check-inline  ">
                                <input
                                  class="form-check-input mt-1"
                                  type="radio"
                                  onChange={(e) => handleChangeWord(e, i)}
                                  checked
                                  name="is_present"
                                  id="is_P_Yes"
                                  value="Yes"
                                />
                                <label class="form-check-label" for="is_P_Yes">
                                  {" "}
                                  <span style={{ marginLeft: "-28px" }}>
                                    Yes{" "}
                                  </span>
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  class="form-check-input mt-1"
                                  type="radio"
                                  onChange={(e) => handleChangeWord(e, i)}
                                  name="is_present"
                                  id="is_P_no"
                                  value="No"
                                />
                                <label class="form-check-label" for="is_P_no">
                                  {" "}
                                  <span style={{ marginLeft: "-28px" }}>
                                    No{" "}
                                  </span>
                                </label>
                              </div>
                            </div>
                            {item.is_present === "No" && (
                              <div className="col-md-12 p-1 px-3">
                                <label
                                  htmlFor="exampleFormControlTextarea1"
                                  className="form-label col-form-label col-form-label-sm"
                                >
                                  End Date
                                </label>
                                <input
                                  onChange={(e) => handleChangeWord(e, i)}
                                  value={item.end_date}
                                  type="date"
                                  name="end_date"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            )}

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificates Copy Title
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.certificates_copy_title}
                                type="text"
                                name="certificates_copy_title"
                                className="form-control form-control-sm"
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Work_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>

                            <div className="col-md-12 p-1 px-3 mb-2">
                              {WorkExp.length - 1 === i && (
                                <input
                                  type="button"
                                  onClick={handleAddWork}
                                  className="btn btn-success float-end mt-2 btn-sm"
                                  value="+ Add More"
                                />
                              )}
                              {WorkExp.length !== 1 && (
                                <input
                                  type="button"
                                  onClick={() => handleRemoveWork(i)}
                                  className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                  value="- Remove"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mr-4 clearfix mb-3">
                        <button
                          onClick={NextLinkActiveAll}
                          className="btn btn-success btn-sm  float-end mt-2 "
                        >
                          <i className="far fa-hand-point-right"></i> Next
                        </button>
                        <button
                          onClick={updateDoctor}
                          className="btn btn-success btn-sm  float-end mt-2 mr-3"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                class="tab-pane fade"
                id="v-pills-settings3"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab3"
              >
                <div className=" custom-card mt-2 mb-2 px-1">
                  <div className="d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight">
                      {" "}
                      <h6> Personal Information </h6>{" "}
                    </div>
                    <div className="p-2 bd-highlight">
                      <button
                        onClick={updateDoctor}
                        className="btn btn-sm btn-success btn-sm  float-right"
                      >
                        <i className="fas fa-save"></i> Update
                      </button>
                    </div>
                    <div className="p-2 bd-highlight">
                      <Link
                        to={`/doctor-time-slot`}
                        type="button"
                        className="float-right"
                        title="Time Slot"
                      >
                        <i className="edit-doctor-icon me-3 float-end fas fa-clock"></i>
                      </Link>
                    </div>
                    <div className="p-2 bd-highlight">
                      <Link
                        to={`/doctor-time-slot-details`}
                        type="button"
                        className="float-right"
                        title="Time Slot Details"
                      >
                        <i className="edit-doctor-icon float-end me-3 far fa-clock"></i>
                      </Link>
                    </div>
                    <div className="p-2 bd-highlight">
                      <Link
                        to={`/doctors-profile/${lastpart}`}
                        type="button"
                        className="float-right"
                        title="Doctors Profile"
                      >
                        <i className="edit-doctor-icon far fa-user-alt"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="custom-card pb-2 mb-2 clearfix">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Doctors Identity No.{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="dr_identity_no"
                            type="text"
                            className="form-control form-control-sm "
                            disabled
                            readOnly
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_identity_no == "null"
                                ? ""
                                : doctorsInput.dr_identity_no
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Doctors Title
                          </label>
                          <select
                            id="inputState"
                            name="title"
                            onChange={handleInput}
                            value={doctorsInput.title}
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Family Name
                          </label>
                          <input
                            name="dr_family_name"
                            type="text"
                            className="form-control form-control-sm "
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_family_name == "null"
                                ? ""
                                : doctorsInput.dr_family_name
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Given Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="dr_given_name"
                            type="text"
                            className="form-control form-control-sm "
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_given_name == "null"
                                ? ""
                                : doctorsInput.dr_given_name
                            }
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Middle Name
                          </label>
                          <input
                            name="dr_middle_name"
                            type="text"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_middle_name == "null"
                                ? ""
                                : doctorsInput.dr_middle_name
                            }
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Last Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="dr_last_name"
                            type="text"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_last_name == "null"
                                ? ""
                                : doctorsInput.dr_last_name
                            }
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Preferred Name
                          </label>
                          <input
                            name="dr_preferred_name"
                            type="text"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_preferred_name == "null"
                                ? ""
                                : doctorsInput.dr_preferred_name
                            }
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Address Line 1
                          </label>
                          <textarea
                            name="dr_address_line_1"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_address_line_1 == "null"
                                ? ""
                                : doctorsInput.dr_address_line_1
                            }
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="2"
                          ></textarea>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Address Line 2
                          </label>
                          <textarea
                            name="dr_address_line_2"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_address_line_2 == "null"
                                ? ""
                                : doctorsInput.dr_address_line_2
                            }
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="2"
                          ></textarea>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            BMDC Reg No.
                          </label>
                          <input
                            type="text"
                            name="dr_bmdc_reg_no"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_bmdc_reg_no == "null"
                                ? ""
                                : doctorsInput.dr_bmdc_reg_no
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="dr_email"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_email == "null"
                                ? ""
                                : doctorsInput.dr_email
                            }
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dr_dob"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_dob == "null"
                                ? ""
                                : doctorsInput.dr_dob
                            }
                            id="inputEmail4"
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            {" "}
                            Gender <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="dr_birth_sex_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_birth_sex_id}
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            City
                          </label>
                          <select
                            id="inputState"
                            name="dr_city_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_city_id}
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Post Code
                          </label>
                          <input
                            type="text"
                            name="dr_postal_code"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_postal_code == "null"
                                ? ""
                                : doctorsInput.dr_postal_code
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Home Phone
                          </label>
                          <input
                            type="text"
                            name="dr_home_phone"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_home_phone == "null"
                                ? ""
                                : doctorsInput.dr_home_phone
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Work Phone <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="dr_work_phone"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_work_phone == "null"
                                ? ""
                                : doctorsInput.dr_work_phone
                            }
                            id="inputEmail4"
                          />
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Mobile Phone
                          </label>
                          <input
                            type="text"
                            name="dr_mobile_phone"
                            className="form-control form-control-sm"
                            onChange={handleInput}
                            value={
                              doctorsInput.dr_mobile_phone == "null"
                                ? ""
                                : doctorsInput.dr_mobile_phone
                            }
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Contact Via{" "}
                          </label>
                          <select
                            id="inputState"
                            name="dr_contact_via_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_contact_via_id}
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
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            {" "}
                            Departments <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            id="inputState"
                            name="department_id"
                            onChange={handleInput}
                            value={doctorsInput.department_id}
                            className="form-select  col-form-label-sm font-size-patient"
                          >
                            <option value="" selected>
                              Select
                            </option>

                            {departmentlist.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.departments_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            {" "}
                            Specialists{" "}
                          </label>
                          <select
                            id="inputState"
                            name="specialists_id"
                            onChange={handleInput}
                            value={doctorsInput.specialists_id}
                            className="form-select  col-form-label-sm font-size-patient"
                          >
                            <option selected>Select</option>

                            {specialistlist.map((item) => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.specialists_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputState"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Usual Provider
                          </label>
                          <select
                            id="inputState"
                            name="dr_provider_id"
                            onChange={handleInput}
                            value={doctorsInput.dr_provider_id}
                            className="form-select col-form-label-sm font-size-patient"
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
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            Year Of Experience
                          </label>
                          <input
                            onChange={handleInput}
                            value={doctorsInput.work_experience_years}
                            name="work_experience_years"
                            type="text"
                            className="form-control form-control-sm "
                            id="inputEmail4"
                          />
                        </div>

                        <div className="col-md-12 p-1 px-3">
                          <label
                            htmlFor="inputEmail4"
                            className="form-label col-form-label col-form-label-sm"
                          >
                            About Doctor
                          </label>
                          <textarea
                            name="dr_about"
                            onChange={handleInput}
                            value={doctorsInput.dr_about}
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                          ></textarea>
                        </div>

                        <div className="col-md-12 p-1 px-3 d-flex">
                          <div>
                            <label
                              htmlFor="doctorImageUrl"
                              className="form-label col-form-label col-form-label-sm"
                            >
                              Doctor image
                            </label>
                            <input
                              type="file"
                              name="doctorImage"
                              className="form-control form-control-sm"
                              onChange={handleDoctorImageUrl}
                              id="doctorImageUrl"
                              accept="image/jpg,image/jpeg,image/gif,image/png"
                            />
                            {docImage_error == null ? (
                              <p className="doc_image_size">
                                Image size must be less than 2 mb
                              </p>
                            ) : (
                              <p className="docimage_error">{docImage_error}</p>
                            )}
                          </div>

                          {doctorImageUrl == null ? (
                            <img
                              src={`${global.img_url}/doctors/images/${doctorsInput.dr_images}`}
                              className="doctorImageUrlPreview"
                              alt="preview image"
                            />
                          ) : (
                            <div className="docImage">
                              <img
                                src={doctorImageUrl}
                                className="doctorImageUrlPreview"
                                alt="preview image"
                              />
                              <i
                                onClick={closeImage}
                                class="far fa-times-circle"
                              ></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {AcademicArray.map((item, i) => {
                  return (
                    <div key={i} className="custom-card clearfix mb-2 pb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Academic</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Degree
                              </label>
                              <input
                                name="degree_id"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => handleChangeAcademic(e, i)}
                                id="inputEmail4"
                                value={item.degree_id}
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Passing Year
                              </label>
                              <input
                                name="passing_year"
                                type="text"
                                value={item.passing_year}
                                className="form-control form-control-sm"
                                onChange={(e) => handleChangeAcademic(e, i)}
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Result
                              </label>
                              <input
                                name="result"
                                type="text"
                                value={item.result}
                                className="form-control form-control-sm "
                                onChange={(e) => handleChangeAcademic(e, i)}
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Institution
                              </label>
                              <select
                                id="institution_id"
                                name="institution_id"
                                value={item.institution_id}
                                className="form-select  col-form-label-sm font-size-patient"
                                onChange={(e) => handleChangeAcademic(e, i)}
                              >
                                <option selected>Select</option>
                                {institionArray.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Country
                              </label>
                              <select
                                id="country_id"
                                name="country_id"
                                value={item.country_id}
                                onChange={(e) => handleChangeAcademic(e, i)}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>

                                {countrydrop.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.country_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                City
                              </label>
                              <select
                                id="city_id"
                                name="city_id"
                                value={item.city_id}
                                onChange={(e) => handleChangeAcademic(e, i)}
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
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy Title
                              </label>
                              <input
                                type="text"
                                name="scan_copy_title"
                                onChange={(e) => handleChangeAcademic(e, i)}
                                value={item.scan_copy_title}
                                className="form-control form-control-sm"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Academic_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 p-1 px-3 mb-2">
                        {AcademicArray.length - 1 === i && (
                          <input
                            type="button"
                            onClick={handleAddInput}
                            className="btn btn-success float-end mt-2 btn-sm"
                            value="+ Add More"
                          />
                        )}
                        {AcademicArray.length !== 1 && (
                          <input
                            type="button"
                            onClick={() => handleRemoveInput(i)}
                            className="btn btn-warning float-end mt-2 btn-sm mr-2"
                            value="- Remove"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}

                {CertificateArray.map((item, i) => {
                  return (
                    <div key={i} className="custom-card mb-2 pb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Professional Certificates</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificate Title
                              </label>
                              <input
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.certificate_title}
                                name="certificate_title"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificate Name
                              </label>
                              <input
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.certificate_name}
                                name="certificate_name"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Provider
                              </label>
                              <select
                                id="inputState"
                                name="provider_id"
                                value={item.provider_id}
                                onChange={(e) => handleChangeCertificate(e, i)}
                                className="form-select col-form-label-sm font-size-patient"
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
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Country
                              </label>
                              <select
                                id="inputState"
                                name="country_id"
                                value={item.country_id}
                                onChange={(e) => handleChangeCertificate(e, i)}
                                className="form-select  col-form-label-sm font-size-patient"
                              >
                                <option selected>Select</option>
                                {countrydrop.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.country_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                City
                              </label>
                              <select
                                id="city_id"
                                name="city_id"
                                value={item.city_id}
                                onChange={(e) => handleChangeCertificate(e, i)}
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
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy Title
                              </label>
                              <input
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.scan_copy_title}
                                type="text"
                                name="scan_copy_title"
                                className="form-control form-control-sm"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Certificate_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                {" "}
                                Details of the Course{" "}
                              </label>
                              <textarea
                                onChange={(e) => handleChangeCertificate(e, i)}
                                value={item.details_of_course}
                                name="details_of_course"
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="2"
                              ></textarea>
                            </div>
                            <div className="col-md-12 p-1 px-3 mb-2">
                              {CertificateArray.length - 1 === i && (
                                <input
                                  type="button"
                                  onClick={handleAddCertificate}
                                  className="btn btn-success float-end mt-2 btn-sm"
                                  value="+ Add More"
                                />
                              )}
                              {CertificateArray.length !== 1 && (
                                <input
                                  type="button"
                                  onClick={() => handleRemoveCertificate(i)}
                                  className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                  value="- Remove"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {TrainingArray.map((item, i) => {
                  return (
                    <div className="custom-card mb-2 pb-2">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">License and Training</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Title/Name
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.training_name}
                                name="training_name"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Issuing Organaization
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.issuing_organization}
                                name="issuing_organization"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Issue Date
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.issue_date}
                                name="issue_date"
                                type="date"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Expire Date
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.expire_date}
                                name="expire_date"
                                type="date"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Credential ID
                              </label>
                              <input
                                type="button"
                                className="btn btn-success float-end mb-1 btn-sm"
                                value="Verify"
                              />
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.credential_identity}
                                name="credential_identity"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Credential URL
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.credential_url}
                                name="credential_url"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificates Copy Title
                              </label>
                              <input
                                onChange={(e) => handleChangeTraining(e, i)}
                                value={item.certificates_copy_title}
                                type="text"
                                name="certificates_copy_title"
                                className="form-control form-control-sm"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Training_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>

                            <div className="col-md-12 p-1 px-3 mb-2">
                              {TrainingArray.length - 1 === i && (
                                <input
                                  type="button"
                                  onClick={handleAddTrainig}
                                  className="btn btn-success float-end mt-2 btn-sm"
                                  value="+ Add More"
                                />
                              )}
                              {TrainingArray.length !== 1 && (
                                <input
                                  type="button"
                                  onClick={() => handleRemoveTrainig(i)}
                                  className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                  value="- Remove"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {WorkExp.map((item, i) => {
                  return (
                    <div className="custom-card clearfix">
                      <div className="ml-3 pt-1 px-3">
                        <h6 className="">Work Experience</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Title
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.work_experience_title}
                                name="work_experience_title"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Employment Type
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.employment_title}
                                name="employment_title"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Company
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.company}
                                name="company"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Location
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.location}
                                name="location"
                                type="text"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Start Date
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.start_date}
                                name="start_date"
                                type="date"
                                className="form-control form-control-sm "
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm mr-3"
                              >
                                Is present
                              </label>
                              <div class="form-check form-check-inline  ">
                                <input
                                  class="form-check-input mt-1"
                                  type="radio"
                                  onChange={(e) => handleChangeWord(e, i)}
                                  checked
                                  name="is_present"
                                  id="is_P_Yes"
                                  value="Yes"
                                />
                                <label class="form-check-label" for="is_P_Yes">
                                  {" "}
                                  <span style={{ marginLeft: "-28px" }}>
                                    Yes{" "}
                                  </span>
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  class="form-check-input mt-1"
                                  type="radio"
                                  onChange={(e) => handleChangeWord(e, i)}
                                  name="is_present"
                                  id="is_P_no"
                                  value="No"
                                />
                                <label class="form-check-label" for="is_P_no">
                                  {" "}
                                  <span style={{ marginLeft: "-28px" }}>
                                    No{" "}
                                  </span>
                                </label>
                              </div>
                            </div>
                            {item.is_present === "No" && (
                              <div className="col-md-12 p-1 px-3">
                                <label
                                  htmlFor="exampleFormControlTextarea1"
                                  className="form-label col-form-label col-form-label-sm"
                                >
                                  End Date
                                </label>
                                <input
                                  onChange={(e) => handleChangeWord(e, i)}
                                  value={item.end_date}
                                  type="date"
                                  name="end_date"
                                  className="form-control form-control-sm"
                                />
                              </div>
                            )}

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Certificates Copy Title
                              </label>
                              <input
                                onChange={(e) => handleChangeWord(e, i)}
                                value={item.certificates_copy_title}
                                type="text"
                                name="certificates_copy_title"
                                className="form-control form-control-sm"
                                id="inputEmail4"
                              />
                            </div>

                            <div className="col-md-12 p-1 px-3">
                              <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label col-form-label col-form-label-sm"
                              >
                                Scan Copy
                              </label>
                              <input
                                type="file"
                                name="scan_copy"
                                onChange={(e) => handle_Work_File(e, i)}
                                className="form-control form-control-sm"
                                accept="image/jpg,image/jpeg,image/gif,image/png,application/pdf"
                              />

                              {docImage_error == null ? (
                                <p className="doc_image_size">
                                  File size must be less than 2 mb and type
                                  pdf/jpg/jpeg/png !
                                </p>
                              ) : (
                                <p className="docimage_error">
                                  {docImage_error}
                                </p>
                              )}
                            </div>

                            <div className="col-md-12 p-1 px-3 mb-2">
                              {WorkExp.length - 1 === i && (
                                <input
                                  type="button"
                                  onClick={handleAddWork}
                                  className="btn btn-success float-end mt-2 btn-sm"
                                  value="+ Add More"
                                />
                              )}
                              {WorkExp.length !== 1 && (
                                <input
                                  type="button"
                                  onClick={() => handleRemoveWork(i)}
                                  className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                  value="- Remove"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mr-4 mb-3 clearfix">
                        <button
                          onClick={updateDoctor}
                          className="btn btn-success btn-sm  float-end mt-2 mr-3"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                class="tab-pane fade"
                id="v-pills-settings4"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab4"
              >
                <div className="card">
                  <div className="card health-card-header">
                    <div className="ml-3  mt-3 px-3">
                      <h5 className="">
                        {" "}
                        Doctors's ID Card
                        <span
                          style={{ cursor: "pointer" }}
                          className="float-end me-3 ms-3"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Print"
                        >
                          <i onClick={handlePrint} className="fas fa-print"></i>
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          className="float-end me-3 ms-3"
                        >
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
                        <span
                          style={{ cursor: "pointer" }}
                          className="float-end me-3 ms-3"
                        >
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
                        <span
                          style={{ cursor: "pointer" }}
                          className="float-end me-3 ms-3"
                        >
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
                      </h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <div
                      ref={componentRef}
                      className="doctor-id-card-container d-flex"
                    >
                      {frontShow && (
                        <div
                          className="doctor-id-card-front"
                          style={{ width: "204px", height: "324px" }}
                        >
                          <div className="clearfix">
                            <p className="mt-2">
                              <p className="float-end doc-id-hospital">
                                {doctorsInput.usual_provider == null
                                  ? ""
                                  : doctorsInput.usual_provider
                                      .usual_provider_name}
                              </p>{" "}
                              <br />
                              {/* <span className="float-end me-3 doc-id-hospital-name"></span> */}
                            </p>
                          </div>

                          <div className="d-flex clearfix">
                            <img
                              src={
                                doctorsInput.dr_images == null
                                  ? doctor
                                  : `${global.img_url}/doctors/images/${doctorsInput.dr_images}`
                              }
                              alt=""
                              className="doc-id-img"
                            />
                            <div className="doc-id-doc-name">
                              <span className="">
                                {" "}
                                {doctorsInput.dr_given_name == "null"
                                  ? ""
                                  : doctorsInput.dr_given_name}
                              </span>
                              <p className="doc-card-id">
                                ID #:{" "}
                                {doctorsInput.dr_identity_no == "null"
                                  ? ""
                                  : doctorsInput.dr_identity_no}
                              </p>
                            </div>
                          </div>
                          <div className="doc-id-details clearfix">
                            <div className="w-75 float-end">
                              <span className="">
                                Issue Date :{" "}
                                {doctorsInput.created_at == "null"
                                  ? ""
                                  : moment(doctorsInput.created_at).format(
                                      "MMM Do YY"
                                    )}
                              </span>
                              <span className="me-1">
                                Exp. Date :{" "}
                                {doctorsInput.created_at == "null"
                                  ? ""
                                  : moment(doctorsInput.created_at)
                                      .add(1, "years")
                                      .format("MMM Do YY")}
                              </span>
                            </div>
                            <div className="w-50 float-end">
                              <QRCode
                                className="ms-3 mt-3"
                                size="60"
                                value={qrCodevalue}
                              />
                            </div>
                          </div>
                          <div className="w-100 d-block clear-fix">
                            <h4
                              className="mt-3 ms-3 departName"
                              style={{ color: "#fff" }}
                            >
                              {doctorsInput.department != null
                                ? doctorsInput.department.departments_name
                                : ""}
                            </h4>
                          </div>
                        </div>
                      )}
                      {backShow && (
                        <div
                          className="doctor-id-card-back"
                          style={{ width: "204px", height: "324px" }}
                        >
                          <div className="w-100 d-block clear-fix mb-4">
                            <h5 className="mt-3 ms-3" style={{ color: "#fff" }}>
                              {doctorsInput.usual_provider == null
                                ? ""
                                : doctorsInput.usual_provider
                                    .usual_provider_name}
                            </h5>
                          </div>
                          <div className="doc-id-terms pt-2 clear-fix">
                            <h6 className="ms-3">Terms & Conditions</h6>
                            <div className="ms-3 pt-4">
                              <ul>
                                <li>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.{" "}
                                </li>
                                <li>Eu malesuada donec at risus viverra.</li>
                                <li>
                                  Lorem ipsum dolor sit amet, donec at risus
                                  viverra.
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="authorise-sign text-center clear-fix">
                            <hr className="w-75 mx-auto" />
                            <span className="mx-auto">
                              Authorized Signature{" "}
                            </span>
                          </div>
                          <div className="doc-id-address mt-1">
                            <p>
                              {" "}
                              <i className="fas fa-map-marker-alt me-1"></i>{" "}
                              123, street address, City State, Zip code
                            </p>
                            <p>
                              <i className="far fa-envelope me-1"></i>{" "}
                              email@example.com
                            </p>
                            <p>
                              <i className="far fa-phone-alt me-1"></i> +1
                              234-567-890
                            </p>
                            <p>
                              <i className="fal fa-globe me-1"></i>{" "}
                              macrohealthplus.org
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNewDoctors;
