import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FiInfo } from "react-icons/fi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { MdOutlineWorkOutline, MdSupportAgent } from "react-icons/md";
import "./LabAgentApplication.css";
import { Col, Row } from "react-bootstrap";
import { AiOutlineFileText } from "react-icons/ai";
import { TbFileCertificate } from "react-icons/tb";
import AgentQRcode from "./AgentQRcode";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useCredentialURL from "../../hooks/useCredentialURL";
import useUserData from "../../hooks/useUserData";
import { getAllBranch } from "../../utils/getAllBranch";
const LabAgentApplication = () => {
  const [image_error, setimage_error] = useState();
  const [titleList, setTitleList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [instituteList, setInstituteList] = useState([]);
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);

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

  //set up data
  useEffect(() => {
    axios.get(`/title-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setTitleList(res.data.title);
      }
    });
    axios.get(`/gender-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setGenderList(res.data.gender);
      }
    });

    axios.get(`/city-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setCityList(res.data.city);
      }
    });

    axios.get(`/country`).then((res) => {
      if (res.data.status === 200) {
        setCountryList(res.data.country);
      }
    });

    axios.get(`/institutions`).then((res) => {
      if (res.data.status === 200) {
        setInstituteList(res.data.institution);
      }
    });
  }, []);

  //====================*************(handle information tab input)*****************==================================//
  const [informationInput, setInformationInput] = useState({
    type: "",
    title: "",
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    workPhone: "",
    mobilePhone: "",
    email: "",
    address: "",
    housePlan: "",
    emergencyCenter: "",
    specialist: "",
    specialistArray: [],
    image: "",
    saas_branch_id: null,
    saas_branch_name: null,
  });
  const [imageUrl, setImageUrl] = useState("");
  //handle information input
  const handleInfomationInput = (e) => {
    const { value, name } = e.target;
    setInformationInput({
      ...informationInput,
      [name]: value,
    });
  };
  const handleLabAgentImg = (e) => {
    const { files } = e.target;
    if (files[0]?.size < 2000048) {
      setimage_error(null);
      setInformationInput({ ...informationInput, image: files[0] });
      setImageUrl(URL.createObjectURL(files[0]));
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };
  const closeImage = () => {
    setInformationInput({ ...informationInput, image: "" });
    document.getElementById("labAgentImage").value = "";
    setImageUrl("");
  };
  //handleCheckBox value
  const handleCheckBox = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setInformationInput({
        ...informationInput,
        specialistArray: [...informationInput.specialistArray, value],
      });
    } else {
      setInformationInput({
        ...informationInput,
        specialistArray: informationInput.specialistArray.filter(
          (eValue) => eValue !== value
        ),
      });
    }
  };

  //====================*************(Multiple Inputs Handle Area)*****************==================================//
  //multiple inputs for academic
  const [academicArray, setAcademicArray] = useState([
    {
      degreeName: "",
      countryName: "",
      passingYear: "",
      cityName: "",
      result: "",
      scanCopyTitle: "",
      institutionName: "",
      scanCopy: "",
    },
  ]);
  //multiple inputs for professional certificate
  const [certificateInfoArray, setCertificateArray] = useState([
    {
      degreeName: "",
      countryName: "",
      passingYear: "",
      cityName: "",
      result: "",
      scanCopyTitle: "",
      institutionName: "",
      scanCopy: "",
    },
  ]);
  //multiple inputs for licnese and training
  const [licneseTrainingArray, setLicneseTrainingArray] = useState([
    {
      title: "",
      credentialID: "",
      issueOrganize: "",
      credentialURL: "",
      issueDate: "",
      certificateCopy: "",
      expireDate: "",
      scanCopy: "",
    },
  ]);
  //multiple inputs for work experience
  const [workExperienceArray, setWorkExperienceArray] = useState([
    {
      title: "",
      startDate: "",
      employmentType: "",
      isPresent: "",
      companyName: "",
      endDate: "",
      location: "",
      certificateCopy: "",
      scanCopy: "",
    },
  ]);

  const specialist = [
    { _id: "wer45", name: "Diabetic Measurement" },
    { _id: "5846dsf", name: "Blood Collection" },
    { _id: "dc35x", name: "Injection Pulsing" },
  ];
  const searchSpeacilist = [
    { label: "Diabetic Measurement", _id: "jksfj34" },
    { label: "Blood Collection", _id: "jks834" },
    { label: "Injection Pulsing", _id: "uii97ks" },
  ];
  //====================*************(Handle input)*****************==================================//
  //handle academic input
  const handleAcademicInput = () => {
    setAcademicArray([
      ...academicArray,
      {
        degreeName: "",
        countryName: "",
        passingYear: "",
        cityName: "",
        result: "",
        scanCopyTitle: "",
        institutionName: "",
        scanCopy: "",
      },
    ]);
  };
  //handle professional certificate input
  const handleProfessionalCertificateInput = () => {
    setCertificateArray([
      ...certificateInfoArray,
      {
        degreeName: "",
        countryName: "",
        passingYear: "",
        cityName: "",
        result: "",
        scanCopyTitle: "",
        institutionName: "",
        scanCopy: [],
      },
    ]);
  };
  //handle licnese and training input
  const handleLicneseTrainingInput = () => {
    setLicneseTrainingArray([
      ...licneseTrainingArray,
      {
        title: "",
        credentialID: "",
        issueOrganize: "",
        credentialURL: "",
        issueDate: "",
        certificateCopy: "",
        expireDate: "",
        scanCopy: [],
      },
    ]);
  };
  //handle work experience input
  const handleWorkExperienceInput = () => {
    setWorkExperienceArray([
      ...workExperienceArray,
      {
        title: "",
        startDate: "",
        employmentType: "",
        isPresent: "",
        companyName: "",
        endDate: "",
        location: "",
        certificateCopy: "",
        scanCopy: "",
      },
    ]);
  };
  //====================*************(Handle input remove)*****************==================================//
  //handle academic input remove
  const handleAcademicRemoveInput = (index) => {
    const list = [...academicArray];
    list.splice(index, 1);
    setAcademicArray(list);
  };
  //handle professional certificate input remove
  const handleProfessionalCertificateRemoveInput = (index) => {
    const list = [...certificateInfoArray];
    list.splice(index, 1);
    setCertificateArray(list);
  };
  //handle licnese and training input remove
  const handleLicneseTrainingRemoveInput = (index) => {
    const list = [...licneseTrainingArray];
    list.splice(index, 1);
    setLicneseTrainingArray(list);
  };
  //handle work experience input remove
  const handleWorkExperienceRemoveInput = (index) => {
    const list = [...workExperienceArray];
    list.splice(index, 1);
    setWorkExperienceArray(list);
  };
  //====================*************(Handle value)*****************==================================//
  // handle academic form value
  const handleChangeAcademic = (e, index) => {
    const { name, value } = e.target;
    const list = [...academicArray];
    list[index][name] = value;
    setAcademicArray(list);
  };
  // handle professional certificate form value
  const handleChangeProfessionalCertificate = (e, index) => {
    const { name, value } = e.target;
    const list = [...certificateInfoArray];
    list[index][name] = value;
    setCertificateArray(list);
  };
  // handle licnese & training form value
  const handleLicneseAndTraining = (e, index) => {
    const { name, value } = e.target;
    const list = [...licneseTrainingArray];
    list[index][name] = value;
    setLicneseTrainingArray(list);
  };
  // handle work experience form value
  const handleChangeWorkExperience = (e, index) => {
    const { name, value } = e.target;
    const list = [...workExperienceArray];
    list[index][name] = value;
    setWorkExperienceArray(list);
  };
  //====================*************(Handle file)*****************==================================//

  //handle academic file
  const handleAcademicImg = (e, index) => {
    const { name, files } = e.target;
    if (files[0]?.size < 2000048) {
      setimage_error(null);
      const list = [...academicArray];
      list[index][name] = files[0];
      setAcademicArray(list);
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };
  //handle professional certificate file
  const handleProfessionalCertificateImg = (e, index) => {
    const { name, files } = e.target;
    if (files[0]?.size < 2000048) {
      setimage_error(null);
      const list = [...certificateInfoArray];
      list[index][name] = files[0];
      setCertificateArray(list);
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };
  //handle licnese & training file
  const handleLicneseTrainingImg = (e, index) => {
    const { name, files } = e.target;
    if (files[0]?.size < 2000048) {
      setimage_error(null);
      const list = [...licneseTrainingArray];
      list[index][name] = files[0];
      setLicneseTrainingArray(list);
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };

  //handle work experience file
  const handleWorkExperienceImg = (e, index) => {
    const { name, files } = e.target;
    if (files[0]?.size < 2000048) {
      setimage_error(null);
      const list = [...workExperienceArray];
      list[index][name] = files[0];
      setWorkExperienceArray(list);
    } else {
      setimage_error("File size must be less than 2 mb !");
    }
  };

  //====================*************(Handle previous button)*****************==================================//
  // for previous and nex button
  const prevInformationLink = () => {
    document.getElementById("v-pills-information-tab").click();
  };
  const prevAcademicLink = () => {
    document.getElementById("v-pills-academic-tab").click();
  };
  const prevCertificateLink = () => {
    document.getElementById("v-pills-certificate-tab").click();
  };
  const prevLiceneseTrainingLink = () => {
    document.getElementById("v-pills-licnese-training-tab").click();
  };
  //====================*************(Handle next button)*****************==================================//
  //for next button
  const nextAcademicLink = () => {
    document.getElementById("v-pills-academic-tab").className =
      "nav-link text-start text-nowrap";
    document.getElementById("v-pills-academic-tab").click();
  };
  const nextCertificateLink = () => {
    document.getElementById("v-pills-certificate-tab").className =
      "nav-link text-start text-nowrap";
    document.getElementById("v-pills-certificate-tab").click();
  };
  const nextLicneseLink = () => {
    document.getElementById("v-pills-licnese-training-tab").className =
      "nav-link text-start text-nowrap";
    document.getElementById("v-pills-licnese-training-tab").click();
  };
  const nextWorkLink = () => {
    document.getElementById("v-pills-work-tab").className =
      "nav-link text-start text-nowrap";
    document.getElementById("v-pills-work-tab").click();
  };
  const nextAgentLink = () => {
    document.getElementById("v-pills-agent-tab").className =
      "nav-link text-start text-nowrap";
    document.getElementById("v-pills-agent-tab").click();
  };

  // Data for submit
  const formData = new FormData();
  formData.append("type", informationInput.type);
  formData.append("title", informationInput.title);
  formData.append("name", informationInput.name);
  formData.append("fatherName", informationInput.fatherName);
  formData.append("motherName", informationInput.motherName);
  formData.append("dob", informationInput.dob);
  formData.append("gender", informationInput.gender);
  formData.append("workPhone", informationInput.workPhone);
  formData.append("mobilePhone", informationInput.mobilePhone);
  formData.append("email", informationInput.email);
  formData.append("address", informationInput.address);
  formData.append("housePlan", informationInput.housePlan);
  formData.append("emergencyCenter", informationInput.emergencyCenter);
  formData.append("specialist", informationInput.specialist);
  formData.append(
    "specialistArray",
    informationInput.specialistArray.toString()
  );
  formData.append("image", informationInput.image);
  formData.append("saas_branch_id", informationInput.saas_branch_id);
  formData.append("saas_branch_name", informationInput.saas_branch_name);

  const [labAgentResInfo, setLabAgentResInfo] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      informationInput.gender &&
      informationInput.specialistArray.length > 0
    ) {
      axios.post("save-lab-agent-info", formData).then((res) => {
        if (res.status === 200) {
          console.log(res);
          academicArray.map((item) => {
            if (
              item.degreeName !== "" &&
              item.countryName &&
              item.institutionName
            ) {
              const academic = new FormData();
              academic.append("lab_agent_master_id", res.data.agentInfo.id);
              academic.append("degreeName", item.degreeName);
              academic.append("countryName", item.countryName);
              academic.append("passingYear", item.passingYear);
              academic.append("cityName", item.cityName);
              academic.append("result", item.result);
              academic.append("scanCopyTitle", item.scanCopyTitle);
              academic.append("institutionName", item.institutionName);
              academic.append("scanCopy", item.scanCopy);
              axios.post("save-lab-agent-academic", academic).then((res) => {
                if (res.data.status === 200) {
                  console.log(res);
                  swal("Success", res.data.message, "success");
                }
              });
            }
          });
          // Certificate
          certificateInfoArray.map((item) => {
            if (
              item.degreeName !== "" &&
              item.countryName &&
              item.institutionName
            ) {
              const certificate = new FormData();
              certificate.append("lab_agent_master_id", res.data.agentInfo.id);
              certificate.append("degreeName", item.degreeName);
              certificate.append("countryName", item.countryName);
              certificate.append("passingYear", item.passingYear);
              certificate.append("cityName", item.cityName);
              certificate.append("result", item.result);
              certificate.append("scanCopyTitle", item.scanCopyTitle);
              certificate.append("institutionName", item.institutionName);
              certificate.append("scanCopy", item.scanCopy);
              axios
                .post("save-lab-agent-certificate", certificate)
                .then((res) => {
                  if (res.data.status === 200) {
                    console.log(res);
                    swal("Success", res.data.message, "success");
                  }
                });
            }
          });
          //License
          licneseTrainingArray.map((item) => {
            if (item.title !== "") {
              const license = new FormData();
              license.append("lab_agent_master_id", res.data.agentInfo.id);
              license.append("title", item.title);
              license.append("credentialID", item.credentialID);
              license.append("issueOrganize", item.issueOrganize);
              license.append("credentialURL", item.credentialURL);
              license.append("issueDate", item.issueDate);
              license.append("certificateCopy", item.certificateCopy);
              license.append("expireDate", item.expireDate);
              license.append("scanCopy", item.scanCopy);
              axios.post("save-lab-agent-license", license).then((res) => {
                if (res.data.status === 200) {
                  console.log(res);
                  swal("Success", res.data.message, "success");
                }
              });
            }
          });
          // Work
          workExperienceArray.map((item) => {
            if (item.title !== "" && item.location) {
              const workExp = new FormData();
              workExp.append("lab_agent_master_id", res.data.agentInfo.id);
              workExp.append("title", item.title);
              workExp.append("startDate", item.startDate);
              workExp.append("employmentType", item.employmentType);
              workExp.append("isPresent", item.isPresent);
              workExp.append("companyName", item.companyName);
              workExp.append("endDate", item.endDate);
              workExp.append("location", item.location);
              workExp.append("certificateCopy", item.certificateCopy);
              workExp.append("scanCopy", item.scanCopy);
              axios.post("save-lab-agent-work", workExp).then((res) => {
                if (res.data.status === 200) {
                  console.log(res);
                  swal("Success", res.data.message, "success");
                }
              });
            }
          });
          setLabAgentResInfo(res);
          swal("Success", res.data.message, "success");
          navigate(`/edit-lab-agent/${res.data.agentInfo.id}`);
        }
      });
    } else if (informationInput.specialistArray.length === 0) {
      toast.error("Please select specialties");
    } else {
      toast.error("Please fill out required fields");
    }
    // Academic
    if (labAgentResInfo?.status === 200) {
      academicArray.map((item) => {
        if (
          item.degreeName !== "" &&
          item.countryName &&
          item.institutionName
        ) {
          const academic = new FormData();
          academic.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          academic.append("degreeName", item.degreeName);
          academic.append("countryName", item.countryName);
          academic.append("passingYear", item.passingYear);
          academic.append("cityName", item.cityName);
          academic.append("result", item.result);
          academic.append("scanCopyTitle", item.scanCopyTitle);
          academic.append("institutionName", item.institutionName);
          academic.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-academic", academic).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        } else {
          toast.error("Please fill out required fields!");
        }
      });
    }
    // Certificate
    if (labAgentResInfo?.status === 200) {
      certificateInfoArray.map((item) => {
        if (
          item.degreeName !== "" &&
          item.countryName &&
          item.institutionName
        ) {
          const certificate = new FormData();
          certificate.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          certificate.append("degreeName", item.degreeName);
          certificate.append("countryName", item.countryName);
          certificate.append("passingYear", item.passingYear);
          certificate.append("cityName", item.cityName);
          certificate.append("result", item.result);
          certificate.append("scanCopyTitle", item.scanCopyTitle);
          certificate.append("institutionName", item.institutionName);
          certificate.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-certificate", certificate).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        } else {
          toast.error("Please fill out required fields!");
        }
      });
    }
    //License
    if (labAgentResInfo?.status === 200) {
      licneseTrainingArray.map((item) => {
        if (item.title !== "") {
          const license = new FormData();
          license.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          license.append("title", item.title);
          license.append("credentialID", item.credentialID);
          license.append("issueOrganize", item.issueOrganize);
          license.append("credentialURL", item.credentialURL);
          license.append("issueDate", item.issueDate);
          license.append("certificateCopy", item.certificateCopy);
          license.append("expireDate", item.expireDate);
          license.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-license", license).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        }
      });
    }
    // Work
    if (labAgentResInfo?.status === 200) {
      workExperienceArray.map((item) => {
        if (item.title !== "" && item.location) {
          const workExp = new FormData();
          workExp.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          workExp.append("title", item.title);
          workExp.append("startDate", item.startDate);
          workExp.append("employmentType", item.employmentType);
          workExp.append("isPresent", item.isPresent);
          workExp.append("companyName", item.companyName);
          workExp.append("endDate", item.endDate);
          workExp.append("location", item.location);
          workExp.append("certificateCopy", item.certificateCopy);
          workExp.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-work", workExp).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        } else {
          toast.error("Please fill out required fields!");
        }
      });
    }
  };
  console.log(informationInput, "dde");
  const handleSubmitAcademic = (e) => {
    e.preventDefault();
    if (labAgentResInfo?.status === 200) {
      academicArray.map((item) => {
        if (
          item.degreeName !== "" &&
          item.countryName &&
          item.institutionName
        ) {
          const academic = new FormData();
          academic.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          academic.append("degreeName", item.degreeName);
          academic.append("countryName", item.countryName);
          academic.append("passingYear", item.passingYear);
          academic.append("cityName", item.cityName);
          academic.append("result", item.result);
          academic.append("scanCopyTitle", item.scanCopyTitle);
          academic.append("institutionName", item.institutionName);
          academic.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-academic", academic).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        } else {
          toast.error("Please fill out required fields!");
        }
      });
    }
  };
  const handleSubmitCertificate = (e) => {
    e.preventDefault();
    if (labAgentResInfo?.status === 200) {
      certificateInfoArray.map((item) => {
        if (
          item.degreeName !== "" &&
          item.countryName &&
          item.institutionName
        ) {
          const certificate = new FormData();
          certificate.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          certificate.append("degreeName", item.degreeName);
          certificate.append("countryName", item.countryName);
          certificate.append("passingYear", item.passingYear);
          certificate.append("cityName", item.cityName);
          certificate.append("result", item.result);
          certificate.append("scanCopyTitle", item.scanCopyTitle);
          certificate.append("institutionName", item.institutionName);
          certificate.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-certificate", certificate).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        } else {
          toast.error("Please fill out required fields!");
        }
      });
    }
  };
  const handleSubmitTraining = (e) => {
    e.preventDefault();
    if (labAgentResInfo?.status === 200) {
      licneseTrainingArray.map((item) => {
        if (item.title !== "") {
          const license = new FormData();
          license.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          license.append("title", item.title);
          license.append("credentialID", item.credentialID);
          license.append("issueOrganize", item.issueOrganize);
          license.append("credentialURL", item.credentialURL);
          license.append("issueDate", item.issueDate);
          license.append("certificateCopy", item.certificateCopy);
          license.append("expireDate", item.expireDate);
          license.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-license", license).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        }
      });
    }
  };
  const handleSubmitWorkExp = (e) => {
    e.preventDefault();
    if (labAgentResInfo?.status === 200) {
      workExperienceArray.map((item) => {
        if (item.title !== "" && item.location) {
          const workExp = new FormData();
          workExp.append(
            "lab_agent_master_id",
            labAgentResInfo.data.agentInfo.id
          );
          workExp.append("title", item.title);
          workExp.append("startDate", item.startDate);
          workExp.append("employmentType", item.employmentType);
          workExp.append("isPresent", item.isPresent);
          workExp.append("companyName", item.companyName);
          workExp.append("endDate", item.endDate);
          workExp.append("location", item.location);
          workExp.append("certificateCopy", item.certificateCopy);
          workExp.append("scanCopy", item.scanCopy);
          axios.post("save-lab-agent-work", workExp).then((res) => {
            if (res.data.status === 200) {
              console.log(res);
              swal("Success", res.data.message, "success");
            }
          });
        } else {
          toast.error("Please fill out required fields!");
        }
      });
    }
  };
  return (
    <section className="mt-2 pl-1">
      <div className="patients-head custom-card ms-1">
        <h6 className="ml-3 text-start mb-1  py-2 custom-color">
          Pharmacy Application for Lab Agent
        </h6>
      </div>
      <div className="mt-2 ms-1 newClass">
        <div className="row new-doctor-entry me-1">
          <div className="d-flex align-items-start">
            <div
              className="nav custom-card col-md-3 flex-column nav-pills me-2"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link text-start  active"
                id="v-pills-information-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-information"
                type="button"
                role="tab"
                aria-controls="v-pills-information"
                aria-selected="true"
              >
                <FiInfo className="menu-icon" />
                Information
              </button>
              <button
                className="nav-link text-start disabled btnNEw"
                id="v-pills-academic-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-academic"
                type="button"
                role="tab"
                aria-controls="v-pills-academic"
                aria-selected="true"
              >
                <AiOutlineFileText className="menu-icon" />
                Academic Files
              </button>
              <button
                className="nav-link text-start text-nowrap disabled btnNEw"
                id="v-pills-certificate-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-certificate"
                type="button"
                role="tab"
                aria-controls="v-pills-certificate"
                aria-selected="true"
              >
                <TbFileCertificate className="menu-icon" />
                Professional Certificate
              </button>
              <button
                className="nav-link text-start text-nowrap disabled btnNEw"
                id="v-pills-licnese-training-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-licnese-training"
                type="button"
                role="tab"
                aria-controls="v-pills-licnese-training"
                aria-selected="true"
              >
                <AiOutlineFileProtect className="menu-icon" />
                Licnese and Training
              </button>
              <button
                className="nav-link text-start text-nowrap disabled btnNEw"
                id="v-pills-work-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-work"
                type="button"
                role="tab"
                aria-controls="v-pills-work"
                aria-selected="true"
              >
                <MdOutlineWorkOutline className="menu-icon" />
                Work Experience
              </button>
              <button
                className="nav-link text-start text-nowrap disabled btnNEw"
                id="v-pills-agent-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-agent"
                type="button"
                role="tab"
                aria-controls="v-pills-agent"
                aria-selected="true"
              >
                <MdSupportAgent className="menu-icon" />
                My Agent QR
              </button>
            </div>
            {/* tab content */}
            <div className="tab-content col-md-9 " id="v-pills-tabContent">
              {/* tab content for information */}
              <div
                className="tab-pane fade show active"
                id="v-pills-information"
                role="tabpanel"
                aria-labelledby="v-pills-information-tab"
              >
                <form onSubmit={handleSubmit} className="custom-card px-1">
                  {/* selected area */}
                  <div className="p-2 d-flex gap-2">
                    <div className="radio-container">
                      <div className="d-flex">
                        <input
                          type="radio"
                          name="Individual"
                          value="Individual"
                          id="Individual"
                          checked={informationInput.type === "Individual"}
                          onChange={(e) =>
                            setInformationInput({
                              ...informationInput,
                              type: e.target.value,
                            })
                          }
                        />
                        <label className="pt-1 pl-2" htmlFor="Individual">
                          Individual <span className="red">*</span>
                        </label>
                      </div>
                    </div>
                    <div className="radio-container">
                      <div className="d-flex">
                        <input
                          type="radio"
                          name="Business"
                          value="Business"
                          id="Business"
                          checked={informationInput.type === "Business"}
                          onChange={(e) =>
                            setInformationInput({
                              ...informationInput,
                              type: e.target.value,
                            })
                          }
                        />
                        <label className="pt-1 pl-2" htmlFor="Business">
                          Business
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr className="m-0" />
                  {/* form control area */}
                  <Row>
                    <Col lg={9} className="p-2 ">
                      <div>
                        <Row className="row row-cols-2">
                          <Col>
                            <div className="mb-1">
                              <label for="title" className="form-label">
                                Title
                              </label>
                              <select
                                name="title"
                                value={informationInput.title}
                                onChange={handleInfomationInput}
                                className="form-select  form-select-sm"
                                aria-label="Default select example"
                              >
                                <option selected>Select</option>
                                {titleList.map((title, i) => (
                                  <option key={i} value={title.id}>
                                    {title.title_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="name" className="form-label">
                                Name <span className="red">*</span>
                              </label>
                              <input
                                name="name"
                                value={informationInput.name}
                                onChange={handleInfomationInput}
                                type="text"
                                className="form-control"
                                id="name"
                                required
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="father-name" className="form-label">
                                Father Name <span className="red">*</span>
                              </label>
                              <input
                                name="fatherName"
                                value={informationInput.fatherName}
                                onChange={handleInfomationInput}
                                type="text"
                                className="form-control"
                                id="father-name"
                                required
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="mother-name" className="form-label">
                                Mother Name
                              </label>
                              <input
                                name="motherName"
                                value={informationInput.motherName}
                                onChange={handleInfomationInput}
                                type="text"
                                className="form-control"
                                id="mother-name"
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="dob" className="form-label">
                                DOB <span className="red">*</span>
                              </label>
                              <input
                                name="dob"
                                value={informationInput.dob}
                                onChange={handleInfomationInput}
                                type="date"
                                className="form-control"
                                id="dob"
                                required
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="gender" className="form-label">
                                Gender <span className="red">*</span>
                              </label>

                              <select
                                name="gender"
                                value={informationInput.gender}
                                onChange={handleInfomationInput}
                                className="form-select  form-select-sm"
                                aria-label="Default select example"
                                required
                              >
                                <option>Select</option>
                                {genderList.map((gender, i) => (
                                  <option key={i} value={gender.id}>
                                    {gender.birth_sex_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="work-phone" className="form-label">
                                Work Phone
                              </label>
                              <input
                                name="workPhone"
                                value={informationInput.workPhone}
                                onChange={handleInfomationInput}
                                type="number"
                                className="form-control"
                                id="work-phone"
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="mobile-phone" className="form-label">
                                Mobile Phone <span className="red">*</span>
                              </label>
                              <input
                                name="mobilePhone"
                                value={informationInput.mobilePhone}
                                onChange={handleInfomationInput}
                                type="number"
                                className="form-control"
                                id="work-phone"
                                required
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="email" className="form-label">
                                Email <span className="red">*</span>
                              </label>
                              <input
                                name="email"
                                value={informationInput.email}
                                onChange={handleInfomationInput}
                                type="email"
                                className="form-control"
                                id="email"
                                required
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="address" className="form-label">
                                Address <span className="red">*</span>
                              </label>
                              <textarea
                                name="address"
                                value={informationInput.address}
                                onChange={handleInfomationInput}
                                className="form-control"
                                id="address"
                                rows="1"
                                required
                              ></textarea>
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="home-plan" className="form-label">
                                Home Plan
                              </label>
                              <input
                                name="housePlan"
                                value={informationInput.housePlan}
                                onChange={handleInfomationInput}
                                type="text"
                                className="form-control"
                                id="home-plan"
                              />
                            </div>
                          </Col>
                          <Col>
                            <div className="mb-1">
                              <label for="center" className="form-label">
                                Emergency Center
                              </label>
                              <input
                                name="emergencyCenter"
                                value={informationInput.emergencyCenter}
                                onChange={handleInfomationInput}
                                type="text"
                                className="form-control"
                                id="center"
                              />
                            </div>
                          </Col>
                          {user?.isSuperAdmin ? (
                            <Col>
                              <div className="my-1">
                                <label htmlFor="saas_branch_id">
                                  Branch Name <span className="red">*</span>
                                </label>
                                <select
                                  required
                                  name="saas_branch_id"
                                  value={informationInput.saas_branch_id}
                                  onChange={(e) => {
                                    setInformationInput({
                                      ...informationInput,
                                      saas_branch_id: e.target.value,
                                      saas_branch_name: orgBranch.find(
                                        (branch) =>
                                          branch.id === Number(e.target.value)
                                      ).name,
                                    });
                                  }}
                                  className="form-select form-select-sm"
                                  id="saas_branch_id"
                                >
                                  <option value={""}>Select</option>
                                  {orgBranch.map((branch, i) => (
                                    <option key={i} value={branch.id}>
                                      {branch.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                          ) : null}
                        </Row>
                        <div className="row mb-2">
                          <div className=" col-6">
                            <label htmlFor="scanCopy" className="form-label">
                              Lab Agent Image <span className="red">*</span>
                            </label>
                            <input
                              type="file"
                              name="scanCopy"
                              id="labAgentImage"
                              className="form-control form-control-sm"
                              onChange={(e) => handleLabAgentImg(e)}
                              required
                            />
                            {image_error == null ? (
                              <p className="doc_image_size">
                                File size must be less than 2 mb and
                                type/jpg/jpeg/png !
                              </p>
                            ) : (
                              <p className="docimage_error">{image_error}</p>
                            )}
                          </div>
                          <div className="col-3">
                            {imageUrl && (
                              <div className="docImage">
                                <img
                                  src={imageUrl}
                                  className="doctorImageUrlPreview"
                                  alt="preview"
                                />
                                <i
                                  onClick={closeImage}
                                  class="far fa-times-circle"
                                ></i>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <div className="d-flex gap-3">
                            <button
                              onClick={nextAcademicLink}
                              type="button"
                              className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                            >
                              <span>Next</span>
                              <span className="ms-1">
                                <i className="far fa-angle-right"></i>
                              </span>
                            </button>
                            <button
                              type="submit"
                              className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                            >
                              Save
                            </button>
                            <button
                              type="reset"
                              className="cancel-btn px-2 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col className="p-2 " lg={3}>
                      <p className="text-center fw-bold">
                        Specialities <span style={{ color: "red" }}>*</span>
                      </p>
                      <div className="speciallities-area-container">
                        <div className="mb-3">
                          <Autocomplete
                            name="specialist"
                            id="combo-box-demo"
                            size="small"
                            options={searchSpeacilist}
                            sx={{ width: "100%" }}
                            onChange={(e, value) =>
                              setInformationInput({
                                ...informationInput,
                                specialist: value.label,
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} label="Specialist" />
                            )}
                          />
                        </div>
                        <hr className="m-0" />
                        {/* list down specailities */}
                        <div className="list-down g-doc-scroll">
                          {specialist.map((special) => (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={special.name}
                                id={special._id}
                                onChange={handleCheckBox}
                              />
                              <label
                                className="form-check-label text-nowrap mx-0"
                                htmlFor={special._id}
                              >
                                {special.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
              {/* tab content for academic */}
              <div
                className="tab-pane fade show "
                id="v-pills-academic"
                role="tabpanel"
                aria-labelledby="v-pills-academic-tab"
              >
                <>
                  <form onSubmit={handleSubmit}>
                    {academicArray.map((item, i) => {
                      return (
                        <div key={i} className=" p-2 custom-card mb-2">
                          <h6>Academic</h6>
                          <Row className="row row-cols-1 row-cols-md-2">
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="degree" className="form-label">
                                  Degree <span className="red">*</span>
                                </label>
                                <input
                                  name="degreeName"
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                  value={item.degreeName}
                                  type="text"
                                  className="form-control"
                                  id="degree"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="country" className="form-label">
                                  Country <span className="red">*</span>
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="countryName"
                                  // value={item.countryName}
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                >
                                  <option>Select</option>
                                  {countryList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.country_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="passingYear"
                                  className="form-label"
                                >
                                  Passing Year <span className="red">*</span>
                                </label>
                                <input
                                  name="passingYear"
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                  value={item.passingYear}
                                  type="text"
                                  className="form-control"
                                  id="passingYear"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="cityName"
                                  className="form-label"
                                >
                                  City
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="cityName"
                                  value={item.cityName}
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                >
                                  <option>Select</option>
                                  {cityList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.city_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="result" className="form-label">
                                  Result <span className="red">*</span>
                                </label>
                                <input
                                  name="result"
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                  value={item.result}
                                  type="text"
                                  className="form-control"
                                  id="result"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="scanCopyTitle"
                                  className="form-label"
                                >
                                  Scan Copy Title <span className="red">*</span>
                                </label>
                                <input
                                  name="scanCopyTitle"
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                  value={item.scanCopyTitle}
                                  type="text"
                                  className="form-control"
                                  id="scanCopyTitle"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="institutionName"
                                  className="form-label"
                                >
                                  Institution <span className="red">*</span>
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="institutionName"
                                  value={item.institutionName}
                                  onChange={(e) => handleChangeAcademic(e, i)}
                                  required
                                >
                                  <option selected>Select</option>
                                  {instituteList.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="scanCopy"
                                  className="form-label"
                                >
                                  Scan Copy <span className="red">*</span>
                                </label>
                                <input
                                  type="file"
                                  name="scanCopy"
                                  id="academicImgUrl"
                                  className="form-control form-control-sm"
                                  onChange={(e) => handleAcademicImg(e, i)}
                                  required
                                />
                                {image_error == null ? (
                                  <p className="doc_image_size">
                                    File size must be less than 2 mb and type
                                    pdf/jpg/jpeg/png !
                                  </p>
                                ) : (
                                  <p className="docimage_error">
                                    {image_error}
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col>
                              {academicArray.length - 1 === i && (
                                <button
                                  type="button"
                                  onClick={handleAcademicInput}
                                  className="add-more-btn"
                                >
                                  + Add More
                                </button>
                              )}
                            </Col>
                            <Col>
                              <div className="d-flex justify-content-end">
                                {academicArray.length !== 1 && (
                                  <input
                                    type="button"
                                    onClick={() => handleAcademicRemoveInput(i)}
                                    className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                    value="- Remove"
                                  />
                                )}
                              </div>
                            </Col>
                          </Row>
                          {/* button container */}
                          {academicArray.length - 1 === i && (
                            <div className="d-flex justify-content-end gap-3 mt-2">
                              <button
                                type="button"
                                onClick={prevInformationLink}
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <i className="far fa-angle-left"></i>
                                <span> Previous Page</span>
                              </button>
                              <button
                                onClick={nextCertificateLink}
                                type="button"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <span>Next</span>
                                <span className="ms-1">
                                  <i className="far fa-angle-right"></i>
                                </span>
                              </button>
                              <button
                                type="submit"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                type="reset"
                                className="cancel-btn px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </form>
                </>
              </div>
              {/* tab content for professional certificate */}
              <div
                className="tab-pane fade show"
                id="v-pills-certificate"
                role="tabpanel"
                aria-labelledby="v-pills-certificate-tab"
              >
                <>
                  <form onSubmit={handleSubmit}>
                    {certificateInfoArray.map((item, i) => {
                      return (
                        <div key={i} className=" p-2 custom-card mb-2">
                          <h6>Professional Certificate</h6>
                          <Row className="row row-cols-1 row-cols-md-2">
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="degree" className="form-label">
                                  Degree <span className="red">*</span>
                                </label>
                                <input
                                  name="degreeName"
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                  value={item.degreeName}
                                  type="text"
                                  className="form-control"
                                  id="degree"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="country" className="form-label">
                                  Country <span className="red">*</span>
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="countryName"
                                  value={item.countryName}
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                >
                                  <option>Select</option>
                                  {countryList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.country_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="passingYear"
                                  className="form-label"
                                >
                                  Passing Year <span className="red">*</span>
                                </label>
                                <input
                                  name="passingYear"
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                  value={item.passingYear}
                                  type="text"
                                  className="form-control"
                                  id="passingYear"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="cityName"
                                  className="form-label"
                                >
                                  City
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="cityName"
                                  value={item.cityName}
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                >
                                  <option>Select</option>
                                  {cityList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.city_name}
                                    </option>
                                  ))}
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="result" className="form-label">
                                  Result <span className="red">*</span>
                                </label>
                                <input
                                  name="result"
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                  value={item.result}
                                  type="text"
                                  className="form-control"
                                  id="result"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="scanCopyTitle"
                                  className="form-label"
                                >
                                  Scan Copy Title <span className="red">*</span>
                                </label>
                                <input
                                  name="scanCopyTitle"
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                  value={item.scanCopyTitle}
                                  type="text"
                                  className="form-control"
                                  id="scanCopyTitle"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="institutionName"
                                  className="form-label"
                                >
                                  Institution <span className="red">*</span>
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="institutionName"
                                  value={item.institutionName}
                                  onChange={(e) =>
                                    handleChangeProfessionalCertificate(e, i)
                                  }
                                >
                                  <option selected>Select</option>
                                  {instituteList.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="scanCopy"
                                  className="form-label"
                                >
                                  Scan Copy <span className="red">*</span>
                                </label>
                                <input
                                  type="file"
                                  name="scanCopy"
                                  id="professionalCertificateImgUrl"
                                  className="form-control form-control-sm"
                                  onChange={(e) =>
                                    handleProfessionalCertificateImg(e, i)
                                  }
                                  required
                                />
                                {image_error == null ? (
                                  <p className="doc_image_size">
                                    File size must be less than 2 mb and type
                                    pdf/jpg/jpeg/png !
                                  </p>
                                ) : (
                                  <p className="docimage_error">
                                    {image_error}
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col>
                              {certificateInfoArray.length - 1 === i && (
                                <button
                                  type="button"
                                  onClick={handleProfessionalCertificateInput}
                                  className="add-more-btn"
                                >
                                  + Add More
                                </button>
                              )}
                            </Col>
                            <Col>
                              <div className="d-flex justify-content-end">
                                {certificateInfoArray.length !== 1 && (
                                  <input
                                    type="button"
                                    onClick={() =>
                                      handleProfessionalCertificateRemoveInput(
                                        i
                                      )
                                    }
                                    className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                    value="- Remove"
                                  />
                                )}
                              </div>
                            </Col>
                          </Row>
                          {/* button container */}
                          {certificateInfoArray.length - 1 === i && (
                            <div className="d-flex justify-content-end gap-3 mt-2">
                              <button
                                type="button"
                                onClick={prevAcademicLink}
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <i className="far fa-angle-left"></i>
                                <span> Previous Page</span>
                              </button>
                              <button
                                onClick={nextLicneseLink}
                                type="button"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <span>Next</span>
                                <span className="ms-1">
                                  <i className="far fa-angle-right"></i>
                                </span>
                              </button>
                              <button
                                type="submit"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                type="reset"
                                className="cancel-btn px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </form>
                </>
              </div>
              {/* tab content for licnese and training  */}
              <div
                className="tab-pane fade show"
                id="v-pills-licnese-training"
                role="tabpanel"
                aria-labelledby="v-pills-licnese-training-tab"
              >
                <>
                  <form onSubmit={handleSubmit}>
                    {licneseTrainingArray.map((item, i) => {
                      return (
                        <div key={i} className=" p-2 custom-card mb-2">
                          <h6>Licnese and Training</h6>
                          <Row className="row row-cols-1 row-cols-md-2">
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="title" className="form-label">
                                  Title/Name <span className="red">*</span>
                                </label>
                                <input
                                  name="title"
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.title}
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="credentialID"
                                  className="form-label"
                                >
                                  Crendential ID
                                </label>
                                <select
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.credentialID}
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="credentialID"
                                >
                                  <option selected>Select</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="issueOrganize"
                                  className="form-label"
                                >
                                  Issuing Organization{" "}
                                  <span className="red">*</span>
                                </label>
                                <input
                                  name="issueOrganize"
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.issueOrganize}
                                  type="text"
                                  className="form-control"
                                  id="issueOrganize"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="credentialURL"
                                  className="form-label"
                                >
                                  Credentail URL
                                </label>
                                <select
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.credentialURL}
                                  className="form-select form-select-sm"
                                  aria-label="Default select example"
                                  name="credentialURL"
                                >
                                  <option selected>Select</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="issueDate"
                                  className="form-label"
                                >
                                  Issue Date <span className="red">*</span>
                                </label>
                                <input
                                  name="issueDate"
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.issueDate}
                                  type="date"
                                  className="form-control"
                                  id="issueDate"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="certificateCopy"
                                  className="form-label"
                                >
                                  Certificates Copy Title{" "}
                                  <span className="red">*</span>
                                </label>
                                <input
                                  name="certificateCopy"
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.certificateCopy}
                                  type="text"
                                  className="form-control"
                                  id="certificateCopy"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="expireDate"
                                  className="form-label"
                                >
                                  Expire Date <span className="red">*</span>
                                </label>
                                <input
                                  name="expireDate"
                                  onChange={(e) =>
                                    handleLicneseAndTraining(e, i)
                                  }
                                  value={item.expireDate}
                                  type="date"
                                  className="form-control"
                                  id="expireDate"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="scanCopy"
                                  className="form-label"
                                >
                                  Scan Copy <span className="red">*</span>
                                </label>
                                <input
                                  type="file"
                                  name="scanCopy"
                                  id="licneseTrainingImgUrl"
                                  className="form-control form-control-sm"
                                  onChange={(e) =>
                                    handleLicneseTrainingImg(e, i)
                                  }
                                  required
                                />
                                {image_error == null ? (
                                  <p className="doc_image_size">
                                    Image size must be less than 2 mb
                                  </p>
                                ) : (
                                  <p className="docimage_error">
                                    {image_error}
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col>
                              {licneseTrainingArray.length - 1 === i && (
                                <button
                                  type="button"
                                  onClick={handleLicneseTrainingInput}
                                  className="add-more-btn"
                                >
                                  + Add More
                                </button>
                              )}
                            </Col>
                            <Col>
                              <div className="d-flex justify-content-end">
                                {licneseTrainingArray.length !== 1 && (
                                  <input
                                    type="button"
                                    onClick={() =>
                                      handleLicneseTrainingRemoveInput(i)
                                    }
                                    className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                    value="- Remove"
                                  />
                                )}
                              </div>
                            </Col>
                          </Row>
                          {/* button container */}
                          {licneseTrainingArray.length - 1 === i && (
                            <div className="d-flex justify-content-end gap-3 mt-2">
                              <button
                                type="button"
                                onClick={prevCertificateLink}
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <i className="far fa-angle-left"></i>
                                <span> Previous Page</span>
                              </button>
                              <button
                                onClick={nextWorkLink}
                                type="button"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <span>Next</span>
                                <span className="ms-1">
                                  <i className="far fa-angle-right"></i>
                                </span>
                              </button>
                              <button
                                type="submit"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                type="reset"
                                className="cancel-btn px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </form>
                </>
              </div>
              {/* tab content for work experience */}
              <div
                className="tab-pane fade show"
                id="v-pills-work"
                role="tabpanel"
                aria-labelledby="v-pills-work-tab"
              >
                <>
                  <form onSubmit={handleSubmit}>
                    {workExperienceArray.map((item, i) => {
                      return (
                        <div key={i} className=" p-2 custom-card mb-2">
                          <h6>Work Experience</h6>
                          <Row className="row row-cols-1 row-cols-md-2">
                            <Col>
                              <div className="mb-2">
                                <label htmlFor="title" className="form-label">
                                  Title <span className="red">*</span>
                                </label>
                                <input
                                  name="title"
                                  value={item.title}
                                  onChange={(e) =>
                                    handleChangeWorkExperience(e, i)
                                  }
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="startDate"
                                  className="form-label"
                                >
                                  Start Date <span className="red">*</span>
                                </label>
                                <input
                                  name="startDate"
                                  value={item.startDate}
                                  onChange={(e) =>
                                    handleChangeWorkExperience(e, i)
                                  }
                                  type="date"
                                  className="form-control"
                                  id="startDate"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="employmentType"
                                  className="form-label"
                                >
                                  Employment Type <span className="red">*</span>
                                </label>
                                <input
                                  name="employmentType"
                                  value={item.employmentType}
                                  onChange={(e) =>
                                    handleChangeWorkExperience(e, i)
                                  }
                                  type="text"
                                  className="form-control"
                                  id="employmentType"
                                  required
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="p-2 mb-2 d-flex gap-3">
                                <p className="info-head pt-1">
                                  Is Present <span className="red">*</span>
                                </p>
                                <div className="radio-container">
                                  <div className="d-flex">
                                    <input
                                      type="radio"
                                      name="isPresent"
                                      value="Yes"
                                      id="Yes"
                                      required
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        const newArray = [
                                          ...workExperienceArray,
                                        ];
                                        newArray[i].isPresent = value;
                                        setWorkExperienceArray(newArray);
                                      }}
                                    />
                                    <label className="pt-1 pl-2" htmlFor="Yes">
                                      Yes
                                    </label>
                                  </div>
                                </div>
                                <div className="radio-container">
                                  <div className="d-flex">
                                    <input
                                      type="radio"
                                      name="isPresent"
                                      value="No"
                                      id="No"
                                      required
                                      onChange={(e) => {
                                        const { value } = e.target;
                                        const newArray = [
                                          ...workExperienceArray,
                                        ];
                                        newArray[i].isPresent = value;
                                        setWorkExperienceArray(newArray);
                                      }}
                                    />
                                    <label className="pt-1 pl-2" htmlFor="No">
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="companyName"
                                  className="form-label"
                                >
                                  Company <span className="red">*</span>
                                </label>
                                <input
                                  name="companyName"
                                  value={item.companyName}
                                  onChange={(e) =>
                                    handleChangeWorkExperience(e, i)
                                  }
                                  type="text"
                                  className="form-control"
                                  id="companyName"
                                  required
                                />
                              </div>
                            </Col>
                            {item.isPresent === "No" && (
                              <Col>
                                <div className="mb-2">
                                  <label
                                    htmlFor="endDate"
                                    className="form-label"
                                  >
                                    End Date
                                  </label>
                                  <input
                                    name="endDate"
                                    value={item.endDate}
                                    onChange={(e) =>
                                      handleChangeWorkExperience(e, i)
                                    }
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                  />
                                </div>
                              </Col>
                            )}

                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Location
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  value={item.location}
                                  onChange={(e) =>
                                    handleChangeWorkExperience(e, i)
                                  }
                                  aria-label="Default select example"
                                  name="location"
                                >
                                  <option selected>Select</option>
                                  {countryList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.country_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="certificateCopy"
                                  className="form-label"
                                >
                                  Certificate Copy Title{" "}
                                  <span className="red">*</span>
                                </label>
                                <input
                                  name="certificateCopy"
                                  value={item.certificateCopy}
                                  onChange={(e) =>
                                    handleChangeWorkExperience(e, i)
                                  }
                                  type="text"
                                  className="form-control"
                                  id="certificateCopy"
                                  required
                                />
                              </div>
                            </Col>
                            <Col></Col>
                            <Col>
                              <div className="mb-2">
                                <label
                                  htmlFor="scanCopy"
                                  className="form-label"
                                >
                                  Scan Copy <span className="red">*</span>
                                </label>
                                <input
                                  type="file"
                                  name="scanCopy"
                                  id="workExperienceImgUrl"
                                  className="form-control form-control-sm"
                                  onChange={(e) =>
                                    handleWorkExperienceImg(e, i)
                                  }
                                  required
                                />
                                {image_error == null ? (
                                  <p className="doc_image_size">
                                    Image size must be less than 2 mb
                                  </p>
                                ) : (
                                  <p className="docimage_error">
                                    {image_error}
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col>
                              {workExperienceArray.length - 1 === i && (
                                <button
                                  type="button"
                                  onClick={handleWorkExperienceInput}
                                  className="add-more-btn"
                                >
                                  + Add More
                                </button>
                              )}
                            </Col>
                            <Col>
                              <div className="d-flex justify-content-end">
                                {workExperienceArray.length !== 1 && (
                                  <input
                                    type="button"
                                    onClick={() =>
                                      handleWorkExperienceRemoveInput(i)
                                    }
                                    className="btn btn-warning float-end mt-2 btn-sm mr-2"
                                    value="- Remove"
                                  />
                                )}
                              </div>
                            </Col>
                          </Row>
                          {/* button container */}
                          {workExperienceArray.length - 1 === i && (
                            <div className="d-flex justify-content-end gap-3 mt-2">
                              <button
                                type="button"
                                onClick={prevLiceneseTrainingLink}
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <i className="far fa-angle-left"></i>
                                <span> Previous Page</span>
                              </button>
                              <button
                                onClick={nextAgentLink}
                                type="button"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                <span>Next</span>
                                <span className="ms-1">
                                  <i className="far fa-angle-right"></i>
                                </span>
                              </button>
                              <button
                                type="submit"
                                className="custom-bg-color text-white apply-btn px-2 py-1 rounded"
                              >
                                Save
                              </button>
                              <button
                                type="reset"
                                className="cancel-btn px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </form>
                </>
              </div>
              {/* tab content for Agent QR code Generate */}
              <div
                className="tab-pane fade show"
                id="v-pills-agent"
                role="tabpanel"
                aria-labelledby="v-pills-agent-tab"
              >
                <AgentQRcode agentInfo={informationInput} imgUrl={imageUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabAgentApplication;
