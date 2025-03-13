/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaRegChartBar } from "react-icons/fa";
import "./GreatDoc.css";
import { MdWorkHistory } from "react-icons/md";
import { GrDocumentTest } from "react-icons/gr";
import { GrTest } from "react-icons/gr";
import { Box, Tooltip } from "@material-ui/core";
import { Popover as Popover1 } from "@material-ui/core";
import smsIcon from "../../../Images/g-doc-sms.png";
import prescriptionIcon from "../../../Images/prescriptionSetup.png";
import patientIcon from "../../../Images/patient.png";
import nurseIcon from "../../../Images/g-doc-nurse.png";
import callIcon from "../../../Images/g-doc-call.png";
import sms1 from "../../../Images/doc-sms-1.png";
import sms2 from "../../../Images/doc-sms-2.png";
import sms3 from "../../../Images/doc-sms-3.png";
import sms4 from "../../../Images/doc-sms-4.png";
import sms5 from "../../../Images/doc-sms-5.png";
import sms6 from "../../../Images/doc-sms-6.png";
import sms7 from "../../../Images/doc-sms-7.png";
import sms8 from "../../../Images/doc-sms-8.png";
import sms9 from "../../../Images/doc-sms-9.png";
import icon from "../../../Images/crush.jpg";
import sms10 from "../../../Images/doc-sms-10.png";
import maleNurse from "../../../Images/male-nurse.png";
import femaleNurse from "../../../Images/female-nurse.png";
import nurseGroup from "../../../Images/nurse-group.png";
import alergy1 from "../../../Images/g-alergy1.png";
import disIcon from "../../../Images/bed.png";
import appointment from "../../../Images/appointment - copy.png";
import closeFull from "../../../Images/close_full_Screen.png";
import openFull from "../../../Images/open_full_Screen.png";
import { Accordion } from "react-bootstrap";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { alpha, styled } from "@mui/material/styles";
import GreatDocPatientDetail from "./GreatDocPatientDetail";
import axios from "axios";
import moment from "moment";
import "../../../imageUrl";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import PastObservation from "./PastObservation";
import Immunisation from "./Immunisation";
import MedicenDetails from "./MedicenDetails";
import AddReactionModal from "./AddReactionModal";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ObstreaticModal from "./ObstreaticModal";
import rx1 from "../../../Images/current rx.png";
import rx2 from "../../../Images/past rx.png";
import pastHistoryIcon from "../../../Images/past history.png";
import cares from "../../../Images/care suggestion.png";
import obsteric from "../../../Images/obstreatic history.png";
import antenatal from "../../../Images/Antenetal vist.png";
import physicalActivityIcom from "../../../Images/Physical Activity.png";
import pastVisitIcon from "../../../Images/Past Visit.png";
import ipdIcon from "../../../Images/ipd-icon.png";
import { FaFileMedicalAlt, FaSyringe } from "react-icons/fa";
import swal from "sweetalert";
import { HiOutlineClock } from "react-icons/hi2";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import useResizeObserver from "../../../hooks/useResizeObserver";
import PrescriptionSetup from "../../prescription-setup/PrescriptionSetup";

import { NewModal } from "../../../common/components/NewModal";
import { SimpleTable } from "../../../common/components/SimpleTable";
import SearchPatientModal from "./SearchPatientModal";
import SearchAdmittedPatientModal from "./SearchAdmittedPatientModal";

const GreatDoc = () => {
  const [smallMenu, setSmallMenu] = useState(false);
  const [showFullScreen, setShowFullScreen] = useState(true);
  const { width } = useResizeObserver();

  // popover
  // sms popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  //
  const [anchorEl3, setAnchorEl3] = useState(null);
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;

  let params = useParams();
  console.log("params", params);

  const [activeId, setActiveId] = useState(params?.id);

  // popover

  const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
    ({ theme }) => ({
      [`& .${treeItemClasses.iconContainer}`]: {
        "& .close": {
          opacity: 0.3,
        },
      },
      [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
      },
    })
  );

  const fullScreen = () => {
    document.body.requestFullscreen();
  };
  const closeFullScreen = () => {
    document.exitFullscreen();
  };
  const [scheduleData, setscheduleData] = useState([]);

  const [uppcomingApp, setuppcomingApp] = useState([]);

  const [appointmentTime, setappointmentTime] = useState({
    StartTime: "",
  });

  const [reactionTableData, setReactionTableData] = useState([]);
  const [reactionTableUpdate, setReactionTableUpdate] = useState();
  const [resourceModal, setResourceModal] = useState(false);
  useEffect(() => {
    if (patientPropsValue.id) {
      const controller = new AbortController();
      axios
        .get(`/added-reaction/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => setReactionTableData(res.data.reaction));
      return () => {
        controller.abort();
      };
    }
  }, [reactionTableUpdate]);

  const [prescribedDrugs, setprescribedDrugs] = useState([]);
  const [PastPrescribedDrugs, setPastPrescribedDrugs] = useState([]);
  const [pastHistory, setPastHistory] = useState([]);
  const [allNurse, setAllNurse] = useState([]);
  const [nurseUpdate, setNurseUpdate] = useState([]);
  const [allEmployee, setAllEmployee] = useState([]);
  const [updateEmployee, setUpdateEmployee] = useState([]);
  const [updateSchedule, setUpdateSchedule] = useState("");
  const [ipdPatients, setIpdPatients] = useState([]);

  const [nodataFoundtodays, setnodataFoundtodays] = useState(false);
  const [nodataFoundupcomming, setnodataFoundupcomming] = useState(false);
  const [nodatafoundPrescribedDrugs, setnodatafoundPrescribedDrugs] =
    useState(false);
  const [noDataFoundIpd, setNoDataFoundIpd] = useState(false);
  const [isOpenSearchPatientModal, setIsOpenSearchPatientModal] =
    useState(false);

  const handleClosedSearchPatientModal = () => {
    setIsOpenSearchPatientModal(false);
  };
  const handleOpenSearchPatientModal = () => {
    setIsOpenSearchPatientModal(true);
  };
  const [
    isOpenSearchAdmittedPatientModal,
    setIsOpenSearchAdmittedPatientModal,
  ] = useState(false);

  const handleClosedSearchAdmittedPatientModal = () => {
    setIsOpenSearchAdmittedPatientModal(false);
  };
  const handleOpenSearchAdmittedPatientModal = () => {
    setIsOpenSearchAdmittedPatientModal(true);
  };

  useEffect(() => {
    const controller = new AbortController();

    const storageData = JSON.parse(localStorage.getItem("userData"));
    if (storageData.user_type === "Doctor") {
      axios
        .get(`great-doc-today-patient-appointment/${storageData.user_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setscheduleData(res.data.GDPatientAppointmentToday);
          if (res.data.GDPatientAppointmentToday.length === 0) {
            setnodataFoundtodays(true);
          }
        });
      axios
        .get(`appointment-ipd/${storageData.user_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setIpdPatients(res?.data?.data || []);
          if (res?.data?.data?.length === 0) {
            setNoDataFoundIpd(true);
          }
        });

      axios
        .get(`great-doc-upcomming-patient-appointment/${storageData.user_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setuppcomingApp(res.data.upcomingAppointments);
          if (res.data.upcomingAppointments.length === 0) {
            setnodataFoundupcomming(true);
          }
        });
    }
    axios.get("/all-nurses", { signal: controller.signal }).then((res) => {
      setAllNurse(res.data.nurse);
      setNurseUpdate(res.data.nurse);
    });

    return () => {
      controller.abort();
    };
  }, [updateSchedule]);
  useEffect(() => {
    let controller = new AbortController();
    axios.get("/employee", { signal: controller.signal }).then((res) => {
      setAllEmployee(res.data.employee);
    });
    return () => {
      controller.abort();
    };
  }, [updateEmployee]);

  const [updateState, setupdateState] = useState();
  const [saveMedicen, setsaveMedicen] = useState();
  const [currentMedicen, setcurrentMedicen] = useState([]);

  useEffect(() => {
    let controller = new AbortController();

    if (patientPropsValue?.id) {
      setnodatafoundPrescribedDrugs(false);
      axios
        .get(`get-pescriped-dugs/${patientPropsValue?.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setprescribedDrugs(res.data.drugs);
          if (res.data.drugs === 0) {
            setnodatafoundPrescribedDrugs(true);
          }
        });
      axios
        .get(`past-dugs-history/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setPastPrescribedDrugs(res.data.drugs);
        });
    }

    if (saveMedicen !== undefined) {
      setcurrentMedicen([...currentMedicen, saveMedicen]);
    }

    return () => {
      controller.abort();
    };
  }, [updateState, saveMedicen]);
  useEffect(() => {
    let controller = new AbortController();
    if (patientPropsValue?.id) {
      setnodatafoundPrescribedDrugs(false);
      axios
        .get(`get-pescriped-dugs/${patientPropsValue?.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setprescribedDrugs(res.data.drugs);
          if (res.data.drugs.length === 0) {
            setnodatafoundPrescribedDrugs(true);
          }
        });
      axios
        .get(`past-dugs-history/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {});
    }

    if (saveMedicen !== undefined) {
      setcurrentMedicen([...currentMedicen, saveMedicen]);
    }

    return () => {
      controller.abort();
    };
  }, [updateState, saveMedicen]);
  const [patientPropsValue, setPatientPropsValue] = useState({
    id: "",
    patient_hn_number: "",
    patient_first_name: "",
    patient_middle_name: "",
    patient_last_name: "",
    patient_hcc_no: "",
    blood_group: {
      blood_group_name: "",
    },
    patient_birth_sex: {
      birth_sex_name: "",
    },
    religion: {
      religion_name: "",
    },
    patient_images: "",
    patient_dob: "",
  });
  const [obstericHistory, setObstericHistory] = useState([]);
  const [immunisationHistory, setImmunisationHistory] = useState([]);
  const [procedureReport, setProcedureReport] = useState([]);
  const [pastVisitList, setPastVisitList] = useState([]);
  const [physicalActivity, setPhysicalActivity] = useState([]);
  const [antenatalVisit, setAntenatalVisit] = useState([]);
  const [dischargeSummary, setDischargeSummary] = useState([]);
  const [eyePrescription, setEyePrescription] = useState([]);
  useEffect(() => {
    let controller = new AbortController();
    if (patientPropsValue.id !== "") {
      axios
        .get(`/pregnancy-history/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setObstericHistory(res.data.pregnancy);
        });
      axios
        .get(`/past-history/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setPastHistory(res.data.past_history);
        });
      axios
        .get(`/get-immunisation/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setImmunisationHistory(res.data.immunisation);
        });
      axios
        .get(`/procedure-report/${patientPropsValue?.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setProcedureReport(res?.data?.report);
        });

      // axios
      //   .get(`/diabetic-chart-output/${patientPropsValue?.id}`, {
      //     signal: controller.signal,
      //   })
      //   .then((res) => {
      //     console.log("Response Data:", res?.data?.data?.charts);
      //     setDiabeticCharts(res?.data?.data?.charts);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching diabetic charts:", error);
      //     if (error.response) {
      //       console.error("Response Error:", error.response.data);
      //     }
      //   });

      axios
        .get(`/discharge-summary/${patientPropsValue?.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setDischargeSummary(res?.data?.summary || []);
        });
      axios
        .get(`/eye-prescription/${patientPropsValue?.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setEyePrescription(res?.data?.prescription || []);
        });
      axios
        .get(`get-prescription-name/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.prescription, "past visit list");
            setPastVisitList(res.data.prescription);
          }
        });
      axios
        .get(`physical-activity-advice/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          if (res.status === 200) {
            setPhysicalActivity(res.data.physicalActivityAdvice);
          }
        });
      axios
        .get(`antenatal-visits/${patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          if (res.status === 200) {
            setAntenatalVisit(res.data.antenatalVisits);
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [updateState, patientPropsValue]);

  const [vitalSign, setvitalSign] = useState([
    {
      name: "",
      value: "",
      icon: "",
      color: "",
      units_id: "",
    },
  ]);

  const customStylesImmunisation = {
    content: {
      top: "30%",
      left: "30%",
      height: "500px",
      width: "80%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(243, 242, 239)",
    },
  };
  const customStylesObs = {
    content: {
      top: "40%",
      left: "30%",
      height: "60%",
      width: "80%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(243, 242, 239)",
    },
  };
  const customStylesPast = {
    content: {
      top: "37%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "83%",
      background: "#F3F2EF",
      padding: "10px",
      marginLeft: "38%",
    },
  };

  const customStylesMedicen = {
    content: {
      top: "37%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "73%",
      background: "white",
      padding: "15px",
      marginLeft: "38%",
    },
  };

  const [immunisationModalIsOpen, setImmunisationIsOpen] = useState(false);
  function openImmunisationModal() {
    setImmunisationIsOpen(true);
  }
  function closeModal() {
    setImmunisationIsOpen(false);
  }
  const [modalPastObservationIsOpen, setPastObservationIsOpen] =
    useState(false);

  function openModal() {
    setPastObservationIsOpen(true);
  }

  function closePastObservationModal() {
    setPastObservationIsOpen(false);
  }

  const [addReactionModalIsOpen, setAddReactionModalIsOpen] = useState(false);
  function addReactionModalOpen() {
    setAddReactionModalIsOpen(true);
  }
  function closeReactionModal() {
    setAddReactionModalIsOpen(false);
  }
  const [obstreaticModalIsOpen, setObstreaticModalIsOpen] = useState(false);
  function closeObstreaticModal() {
    setObstreaticModalIsOpen(false);
  }
  const [medicenDetailsModelShow, setmedicenDetailsModelShow] = useState(false);
  const [medicenDetails, setmedicenDetails] = useState();
  const [element, setElement] = useState("CurrentRx");
  const deleteHistory = (id, e) => {
    const thisClicked = e.currentTarget;

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
        axios.delete(`/added-allergy-delete/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const [timeCalculation, settimeCalculation] = useState({
    start: "",
    end: "",
    total: "",
  });

  const initialSet = (item) => {
    axios.get(`patient-search-by-id/${item.patient_id}`).then((res) => {
      setPatientPropsValue(res.data.patient);
      setvitalSign(res?.data?.dateVitalSign);
      setupdateState(Math.random());
      setcurrentMedicen([]);
      setReactionTableUpdate(Math.random());
    });
    axios
      .post(`start-consultation/${item?.id}`)
      .then((res) => console.log("res", res));
    setappointmentTime(item);
    setActiveId(item.id);
    settimeCalculation({ ...timeCalculation, start: moment(), end: "" });
  };

  const unset = () => {
    setnodataFoundupcomming(false);
    axios
      .get(`appointment-complete/${activeId}`)
      .then((res) => console.log("res", res));
    const totalCount = timeCalculation.start.diff(moment(), "minutes");
    swal(
      "Examination Complete",
      `You examin this patient total ${Math.abs(
        totalCount
      )} minutes [ StartTime : ${timeCalculation.start.format(
        "hh:mm"
      )} EndTime : ${moment().format("hh:mm")} ]`,
      "success"
    );

    setappointmentTime({
      StartTime: "",
    });
    setPatientPropsValue({
      id: "",
      patient_hn_number: "",
      patient_first_name: "",
      patient_middle_name: "",
      patient_last_name: "",
      patient_hcc_no: "",
      blood_group: {
        blood_group_name: "",
      },
      patient_birth_sex: {
        birth_sex_name: "",
      },
      religion: {
        religion_name: "",
      },
      patient_images: "",
      patient_dob: "",
    });
    setvitalSign([]);
    setActiveId();
    setupdateState();
    setcurrentMedicen([]);
    setReactionTableUpdate();
    setUpdateSchedule(Math.random());
  };

  useEffect(() => {
    let cancelSubcription = false;
    if (!cancelSubcription) {
      if (params?.id) {
        setActiveId(params?.id);
        scheduleData.find((ele, i) => {
          if (ele.id === params?.id) {
            setappointmentTime({
              StartTime: scheduleData[i].StartTime,
            });
          }
        });

        axios.get(`patient-search-by-id/${params?.patientID}`).then((res) => {
          setPatientPropsValue(res.data.patient);

          setvitalSign(res.data.vital_signs);
          setupdateState(Math.random());
          setcurrentMedicen([]);
          setReactionTableUpdate(Math.random());
        });
      }
    }

    return () => {
      cancelSubcription = true;
    };
  }, [params?.id, scheduleData]);

  const [nkda, setnkda] = useState(true);
  console.log(patientPropsValue, "greatDoc::");
  const [prescriptionSetupOpen, setPrescriptionSetupOpen] = useState(false);

  const handlePresCriptionSetup = () => {
    setPrescriptionSetupOpen(true);
  };
  const openResourceModal = () => {
    setResourceModal(true);
    setAnchorEl(null);
  };
  return (
    <div className="ms-1">
      <ResourceModal
        isOpen={resourceModal}
        onClose={() => setResourceModal(false)}
      />
      <div className="custom-card m-1 mt-2 p-2 d-flex justify-content-between">
        <h5 className="card-title">Smart Doc</h5>
        <div className=" g-doc-patient-menu">
          <img
            className="d-inline me-2"
            src={ipdIcon}
            title="IPD Patient"
            onClick={handleOpenSearchAdmittedPatientModal}
            alt="IPD Patient"
          />
          <img
            className="d-inline me-2"
            src={patientIcon}
            title="Search Patient"
            onClick={handleOpenSearchPatientModal}
            alt="patient_img"
          />
          <img
            className="d-inline me-2"
            src={prescriptionIcon}
            onClick={handlePresCriptionSetup}
            alt=""
          />
          <img
            onClick={handleClick}
            src={smsIcon}
            alt=""
            className="d-inline me-2"
          />
          <Popover1
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box sx={{ p: 1, bgcolor: "#ffff" }}>
              <div className="g-doc-doctor-sms-popover row">
                <div className="row">
                  <div className="text-center col-4">
                    <img src={sms1} alt="" className="img-fluid" />
                    <p>Clinical</p>
                  </div>

                  <div className="text-center col-4">
                    <Link className="text-decoration-none" to="/patients">
                      <img src={sms2} alt="" className="img-fluid" />
                      <p>Patient</p>
                    </Link>
                  </div>

                  <div className="text-center col-4">
                    <img src={sms3} alt="" className="img-fluid" />
                    <p>Administration</p>
                  </div>
                  <div className="text-center col-4">
                    <Link className="text-decoration-none" to="/doctors-inbox">
                      <img src={sms4} alt="" className="img-fluid" />
                      <p>Inbox</p>
                    </Link>
                  </div>
                  <div className="text-center col-4">
                    <img src={sms5} alt="" className="img-fluid" />
                    <p>Clinical Data</p>
                  </div>
                  <div className="text-center col-4">
                    <img
                      src={sms6}
                      alt=""
                      onClick={openImmunisationModal}
                      className="img-fluid"
                    />
                    <p>Immunisation</p>
                  </div>
                  <div className="text-center col-4">
                    <img src={sms7} alt="" className="img-fluid" />
                    <p>Disease Register</p>
                  </div>
                  <div
                    onClick={openResourceModal}
                    className="text-center col-4"
                  >
                    <img src={sms8} alt="" className="img-fluid" />
                    <p>Resources</p>
                  </div>
                  <div className="text-center col-4">
                    <img src={sms9} alt="" className="img-fluid" />
                    <p>Setup</p>
                  </div>
                  <div className="text-center col-4">
                    <img src={sms10} alt="" className="img-fluid" />
                    <p>Help</p>
                  </div>
                </div>
              </div>
            </Box>
          </Popover1>

          {/* immunisation modal */}

          <Modal
            isOpen={immunisationModalIsOpen}
            onRequestClose={closeModal}
            style={customStylesImmunisation}
            contentLabel="Example Modal"
          >
            <span
              className="float-end"
              style={{ fontSize: "15px", cursor: "pointer" }}
              onClick={closeModal}
            >
              <i className="fal fa-times"></i>
            </span>
            <h6 style={{ fontSize: "14px" }}>Immunisation</h6>
            <hr />
            <Immunisation
              patientId={patientPropsValue?.id}
              closeModal={closeModal}
            ></Immunisation>
          </Modal>
          <img
            onClick={handleClick2}
            src={callIcon}
            alt=""
            className="d-inline me-2"
          />
          <Popover1
            id={id2}
            open={open2}
            anchorEl={anchorEl2}
            onClose={handleClose2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box sx={{ p: 1, bgcolor: "#ffff", width: "270px" }}>
              <div className="g-doc-doctor-call-popover main-call">
                <div className="g-doc-call-pop-top p-2">
                  <h6>Office Directory</h6>
                  <input
                    type="text"
                    onChange={(e) => {
                      const data = allEmployee.filter((item) =>
                        item.given_name
                          .toLowerCase()
                          .match(e.target.value.toLowerCase())
                      );
                      e.target.value.length > 0
                        ? setAllEmployee(data)
                        : setUpdateEmployee(Math.random());
                    }}
                    placeholder="Search by name"
                    className="form-control form-control-sm mt-3 mb-2"
                  />
                </div>
                <div className="g-doc-call-pop-contact p-2">
                  <ul>
                    {allEmployee.length > 0 ? (
                      allEmployee.map((item, i) => {
                        return (
                          <li
                            key={i}
                            className="row pop-contact-details p-2 mb-2"
                          >
                            <div className="col-3">
                              <img
                                src={`${global.img_url}/employee/images/${item.image}`}
                                alt=""
                              />
                            </div>
                            <div className="col-6">
                              <h6 className="pop-contact-details-name ms-1 mt-2">
                                {item.given_name}
                              </h6>
                              <span className="pop-contact-details-number">
                                {item.mobile_phone}
                              </span>
                            </div>
                            <div className="col-3">
                              <span>
                                <i className="fal fa-comment-lines me-1 pop-contact-icon-sms mt-2"></i>
                              </span>
                              <span>
                                <a href={`tel: ${item.mobile_phone}`}>
                                  <i className=" mt-2 fas fa-phone-alt pop-contact-icon-call"></i>
                                </a>
                              </span>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <i
                        style={{ fontSize: "20px", marginLeft: "40%" }}
                        className="fas fa-spinner fa-spin"
                      ></i>
                    )}
                  </ul>
                </div>
              </div>
            </Box>
          </Popover1>
          <img
            onClick={handleClick3}
            src={nurseIcon}
            alt=""
            className="d-inline"
          />
          <Popover1
            id={id3}
            open={open3}
            anchorEl={anchorEl3}
            onClose={handleClose3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box sx={{ p: 1, bgcolor: "#ffff", width: "270px" }}>
              <div className="g-doc-doctor-call-popover">
                <div className="g-doc-call-pop-top p-2">
                  <h6>Nurse Directory</h6>
                  <input
                    type="text"
                    onChange={(e) =>
                      setNurseUpdate(
                        allNurse.filter((item) =>
                          item.given_name
                            .toLowerCase()
                            .match(e.target.value.toLowerCase())
                        )
                      )
                    }
                    placeholder="Search by name"
                    className="form-control form-control-sm mt-3 mb-2"
                  />
                </div>
                <div className="g-doc-nurse-directory-filter d-flex justify-content-around p-2">
                  <div
                    onClick={() =>
                      setNurseUpdate(
                        allNurse.filter(
                          (item) => item.birth_sex_name.toLowerCase() === "male"
                        )
                      )
                    }
                    className="male-nurse d-flex me-2 p-2 ms-2"
                  >
                    <img src={maleNurse} className=" me-1" alt="" />
                    <p>Male Nurse</p>
                  </div>
                  <div
                    onClick={() =>
                      setNurseUpdate(
                        allNurse.filter(
                          (item) =>
                            item.birth_sex_name.toLowerCase() === "female"
                        )
                      )
                    }
                    className="male-nurse d-flex me-2 p-2"
                  >
                    <img src={femaleNurse} alt="" />
                    <p>Female Nurse</p>
                  </div>
                  <div
                    onClick={() => setNurseUpdate(allNurse)}
                    className="male-nurse d-flex me-2 p-2"
                  >
                    <img src={nurseGroup} alt="" />
                    <p>Nurse Group</p>
                  </div>
                </div>
                <div className="g-doc-call-pop-contact p-2">
                  <ul>
                    {nurseUpdate.length > 0 ? (
                      nurseUpdate.map((item, i) => {
                        return (
                          <li
                            key={i}
                            className="row  pop-contact-details p-2 mb-2"
                          >
                            <div className="col-3">
                              <img
                                src={`${global.img_url}/employee/images/${item.image}`}
                                alt=""
                              />
                            </div>
                            <div className="col-6">
                              <h6 className="pop-contact-details-name mt-2 ms-1">
                                {item.given_name}
                              </h6>
                              <span className="pop-contact-details-number ms-1">
                                {item.mobile_phone}
                              </span>
                            </div>
                            <div className="col-3">
                              <span>
                                <i className="fal fa-comment-lines me-1 pop-contact-icon-sms mt-2"></i>
                              </span>
                              <span>
                                <a href={`tel: ${item.mobile_phone}`}>
                                  <i className=" mt-2 fas fa-phone-alt pop-contact-icon-call"></i>
                                </a>
                              </span>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <i
                        style={{ fontSize: "20px", marginLeft: "40%" }}
                        className="fas fa-spinner fa-spin"
                      ></i>
                    )}
                  </ul>
                </div>
              </div>
            </Box>
          </Popover1>
          {showFullScreen ? (
            <img
              className="ms-3 screen-img"
              onClick={() => {
                fullScreen();
                setShowFullScreen(!showFullScreen);
              }}
              src={openFull}
              alt=""
            />
          ) : (
            <img
              className="ms-3 screen-img"
              onClick={() => {
                closeFullScreen();
                setShowFullScreen(!showFullScreen);
              }}
              src={closeFull}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="great-doc-container ms-2 mt-2">
        <div className="row">
          <div
            className={`${
              smallMenu ? "col-1" : "col-md-2 col-sm-1"
            } d-none d-lg-block g-doc-left-sidebar g-doc-scroll custom-card g-doc-left-content`}
          >
            <div className="g-doc-left-content-top clearfix">
              {!smallMenu ? (
                <>
                  <h6 className="d-inline ms-1">Patient</h6>

                  <span className="float-end ms-1">
                    <IoChevronForwardCircleOutline
                      onClick={() => setSmallMenu(!smallMenu)}
                      className="text-green"
                      size={20}
                    />
                    {/* <i
                      onClick={() => setSmallMenu(!smallMenu)}
                      className='fal fa-chevron-circle-left'
                    ></i> */}
                  </span>
                </>
              ) : (
                <span className="float-end ms-1">
                  <IoChevronBackCircleOutline
                    onClick={() => setSmallMenu(!smallMenu)}
                    className="text-green"
                    size={20}
                  />
                </span>
              )}
            </div>
            <Accordion defaultActiveKey="0" className="mb-2">
              <Accordion.Item eventKey="0">
                {smallMenu ? (
                  <Tooltip title="Appointments" placement="top">
                    <Accordion.Header onClick={() => setSmallMenu(false)}>
                      {smallMenu ? (
                        <img src={appointment} className="me-2" alt="" />
                      ) : (
                        "Appointments"
                      )}
                    </Accordion.Header>
                  </Tooltip>
                ) : (
                  <Accordion.Header> Appointments</Accordion.Header>
                )}

                <Accordion.Body>
                  <div className="g-doc-left-content">
                    {!smallMenu && (
                      <input
                        type="text"
                        onChange={(e) => {
                          const data = scheduleData.filter((item) =>
                            item.patient_name
                              .toLowerCase()
                              .match(e.target.value.toLowerCase())
                          );
                          e.target.value.length > 0
                            ? setscheduleData(data)
                            : setUpdateSchedule(Math.random());
                        }}
                        placeholder="search"
                        className="form-control form-control-sm mb-2"
                      />
                    )}
                    {!smallMenu ? (
                      <p style={{ fontSize: "13px" }}>Today’s Appointments</p>
                    ) : (
                      <h6 style={{ fontSize: "14px" }}>Today..</h6>
                    )}
                    <div className="g-doc-paiten-list-container">
                      <ul>
                        {scheduleData.length > 0 ? (
                          scheduleData.map((item, i) => {
                            return (
                              <li
                                key={i}
                                onClick={() => initialSet(item)}
                                className={`d-lg-flex g-doc-left-patient ${
                                  item.id === activeId ? "active" : ""
                                } mb-2`}
                              >
                                <div className="d-md-flex d-lg-block justify-content-between align-items-center">
                                  {item?.patients?.patient_images ? (
                                    <img
                                      src={`${global?.img_url}/images/files/${item?.patients?.patient_images}`}
                                      alt=""
                                      className="img-fluid me-1"
                                    />
                                  ) : (
                                    <img
                                      src={icon}
                                      alt=""
                                      className={`img-fluid me-1 ${
                                        !smallMenu ? "mt-1" : ""
                                      }`}
                                    />
                                  )}
                                  <span
                                    style={{ fontSize: "10px" }}
                                    className="d-block d-lg-none text-center"
                                  >
                                    {/* <i className="fal fa-clock me-1"></i> */}
                                    <HiOutlineClock
                                      className="me-1"
                                      size={10}
                                    />
                                    {moment(item?.StartTime).format("hh:mm A")}
                                  </span>
                                </div>
                                {!smallMenu && (
                                  <div className="g-doc-left-patient-detail flex-grow-1">
                                    {/* <span className='d-block d-lg-none text-white text-center'><i className="fal fa-clock me-1"></i> {moment(item?.StartTime).format('hh:mm A')}</span> */}
                                    <div className="d-flex justify-content-between align-items-center ">
                                      <div>
                                        <h6 className="ms-sm-1">
                                          {item?.patient_name}
                                        </h6>
                                      </div>
                                      {/* <div className="d-none d-lg-block">
                                        <OverlayTrigger
                                          trigger="click"
                                          placement="bottom-end"
                                          overlay={popover}
                                          rootClose="true"
                                        >
                                          
                                          <HiDotsVertical
                                            className="text-white"
                                            style={{ cursor: "pointer" }}
                                          />
                                        </OverlayTrigger>
                                      </div> */}
                                    </div>
                                    <span className="d-none d-lg-block ms-3 mt-1">
                                      {/* <i className='fal fa-clock me-1'></i>{' '} */}
                                      <HiOutlineClock
                                        className="me-1"
                                        size={10}
                                      />
                                      {moment(item?.StartTime).format(
                                        "hh:mm A"
                                      )}
                                    </span>
                                  </div>
                                )}
                              </li>
                            );
                          })
                        ) : (
                          <>
                            {nodataFoundtodays ? (
                              <p
                                style={{
                                  fontSize: "11px",
                                  // marginLeft: "19%",
                                  textAlign: "center",
                                  color: "red",
                                }}
                              >
                                Not Available
                              </p>
                            ) : (
                              <i
                                style={{ fontSize: "26px", marginLeft: "40%" }}
                                className="fas fa-spinner fa-spin"
                              ></i>
                            )}
                          </>
                        )}
                      </ul>
                      {
                        <>
                          <p style={{ fontSize: "11px" }}>Ipd Patients</p>
                          <ul>
                            {ipdPatients?.length > 0 ? (
                              ipdPatients?.map((item, i) => {
                                return (
                                  <li
                                    key={i}
                                    onClick={() => initialSet(item)}
                                    className={`d-lg-flex g-doc-left-patient ${
                                      item.id === activeId ? "active" : ""
                                    } mb-2`}
                                  >
                                    <div className="d-md-flex d-lg-block justify-content-between align-items-center">
                                      {item?.patients?.patient_images ? (
                                        <img
                                          src={`${global?.img_url}/images/files/${item?.patients?.patient_images}`}
                                          alt=""
                                          className="img-fluid me-1"
                                        />
                                      ) : (
                                        <img
                                          src={icon}
                                          alt=""
                                          className={`img-fluid me-1 ${
                                            !smallMenu ? "mt-1" : ""
                                          }`}
                                        />
                                      )}
                                      <span
                                        style={{ fontSize: "10px" }}
                                        className="d-block d-lg-none text-center"
                                      >
                                        {/* <i className="fal fa-clock me-1"></i> */}
                                        <HiOutlineClock
                                          className="me-1"
                                          size={10}
                                        />
                                        {moment(item?.StartTime).format(
                                          "hh:mm A"
                                        )}
                                      </span>
                                    </div>
                                    {!smallMenu && (
                                      <div className="g-doc-left-patient-detail flex-grow-1">
                                        {/* <span className='d-block d-lg-none text-white text-center'><i className="fal fa-clock me-1"></i> {moment(item?.StartTime).format('hh:mm A')}</span> */}
                                        <div className="d-flex justify-content-between align-items-center ">
                                          <div>
                                            <h6 className="ms-sm-1">
                                              {item?.patient_name}
                                            </h6>
                                          </div>
                                        </div>
                                        <span className="d-none d-lg-block ms-3 mt-1">
                                          <HiOutlineClock
                                            className="me-1"
                                            size={10}
                                          />
                                          {moment(item?.StartTime).format(
                                            "hh:mm A"
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </li>
                                );
                              })
                            ) : (
                              <>
                                {noDataFoundIpd ? (
                                  <p
                                    style={{
                                      fontSize: "13px",
                                      marginLeft: "19%",
                                      color: "red",
                                    }}
                                  >
                                    Records are not available
                                  </p>
                                ) : (
                                  <i
                                    style={{
                                      fontSize: "26px",
                                      marginLeft: "40%",
                                    }}
                                    className="fas fa-spinner fa-spin"
                                  ></i>
                                )}
                              </>
                            )}
                          </ul>
                        </>
                      }
                      {!smallMenu ? (
                        <p style={{ fontSize: "11px" }}>
                          Upcoming Appointments
                        </p>
                      ) : (
                        <h6 style={{ fontSize: "11px" }}>Upcoming</h6>
                      )}
                      <ul>
                        {uppcomingApp?.length > 0 ? (
                          uppcomingApp?.map((item, i) => {
                            return (
                              <li
                                key={i}
                                className={`d-flex g-doc-left-patient ${
                                  patientPropsValue?.id === item?.patient_id
                                    ? "active"
                                    : ""
                                } mb-2`}
                              >
                                <div className="">
                                  <img
                                    src={`${global.img_url}/images/files/${item?.patient_appionment?.patient_images}`}
                                    alt=""
                                    className="img-fluid me-1"
                                  />
                                </div>
                                {!smallMenu && (
                                  <div className="g-doc-left-patient-detail ms-2">
                                    <h6 className="d-inline">
                                      {item?.patient_name}
                                    </h6>

                                    <br />
                                    <span>
                                      <i className="fal fa-clock me-1"></i>
                                      {moment(item?.StartTime).calendar()}
                                    </span>
                                  </div>
                                )}
                              </li>
                            );
                          })
                        ) : (
                          <>
                            {nodataFoundupcomming ? (
                              <p
                                style={{
                                  fontSize: "11px",
                                  // marginLeft: "19%",
                                  textAlign: "center",
                                  color: "red",
                                }}
                              >
                                Not Available
                              </p>
                            ) : (
                              <i
                                style={{ fontSize: "26px", marginLeft: "40%" }}
                                className="fas fa-spinner fa-spin"
                              ></i>
                            )}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* NKDA */}
            <div className="d-none d-lg-block">
              <Accordion>
                <Accordion.Item eventKey="0">
                  {smallMenu ? (
                    <Tooltip title="Allergy" placement="bottom">
                      <Accordion.Header onClick={() => setSmallMenu(false)}>
                        {smallMenu ? (
                          <img
                            style={{ width: "27px" }}
                            src={alergy1}
                            className="me-2"
                            alt=""
                          />
                        ) : (
                          "Allergy"
                        )}
                      </Accordion.Header>
                    </Tooltip>
                  ) : (
                    <Accordion.Header>
                      Allergy : NKDA
                      <input
                        type="checkbox"
                        onChange={() => {
                          setnkda(!nkda);
                        }}
                        className="ml-2"
                        defaultChecked={
                          reactionTableData.length > 0 ? false : true
                        }
                      />
                    </Accordion.Header>
                  )}
                  <Accordion.Body>
                    <div className="g-doc-reaction-container">
                      {!smallMenu && (
                        <>
                          <span className="ms-1 mb-2">
                            <span
                              style={{
                                fontSize: "11px",
                                textAlign: "center",
                              }}
                            >
                              {" "}
                              Allergy / Drug Reaction:
                            </span>
                            <div className="nkda">
                              <span
                                style={{
                                  fontSize: width > 900 ? "14px" : "11px",
                                }}
                              >
                                NKDA
                              </span>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  setnkda(!nkda);
                                }}
                                className="ml-2"
                                defaultChecked={
                                  reactionTableData.length > 0 ? false : true
                                }
                              />
                              {!nkda && patientPropsValue.id !== "" && (
                                <i
                                  onClick={addReactionModalOpen}
                                  style={{
                                    color: "#429846",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                  }}
                                  className="fas fa-plus-circle mx-1 mt-2"
                                ></i>
                              )}
                            </div>
                          </span>

                          <AddReactionModal
                            setReactionTableUpdate={setReactionTableUpdate}
                            patient_id={patientPropsValue?.id}
                            closeModal={closeReactionModal}
                            modalIsOpen={addReactionModalIsOpen}
                          />
                          {reactionTableData.length > 0 ? (
                            <div className="g-doc-left-reaction mt-2">
                              <table className="table-sm">
                                <tr className="left-reaction-thead">
                                  <td>Item</td>
                                  <td>Reaction</td>
                                  <td>Severty</td>
                                  <td>Action</td>
                                </tr>
                                {reactionTableData.length > 0 &&
                                  reactionTableData.map((item, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>{item?.drug_name}</td>
                                        <td>{item?.reaction}</td>
                                        <td>{item?.severty}</td>
                                        <td>
                                          <i
                                            onClick={(e) =>
                                              deleteHistory(item?.id, e)
                                            }
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "12px",
                                            }}
                                            className="far fa-trash-alt"
                                          ></i>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </table>
                            </div>
                          ) : (
                            // <i
                            //   style={{ fontSize: "26px", marginLeft: "40%" }}
                            //   className="fas fa-spinner fa-spin"
                            // ></i>
                            <p
                              style={{
                                fontSize: "11px",
                                textAlign: "center",
                                color: "red",
                              }}
                            >
                              Not available
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            {!smallMenu && (
              <>
                {/* for large screen */}
                <div className="d-none d-lg-block g-doc-alergy-examination-container g-doc-scroll p-2 mt-3">
                  <div className="">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <img className="img-fluid" alt="ew" src={rx1} />
                      }
                      defaultExpandIcon={
                        <img className="img-fluid" alt="ew" src={rx1} />
                      }
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("CurrentRx")}
                        nodeId="1"
                        label="Current RX"
                      >
                        {prescribedDrugs.length > 0 ? (
                          prescribedDrugs.map((item, i) => {
                            return (
                              <>
                                <StyledTreeItem
                                  key={i}
                                  onClick={() => {
                                    setmedicenDetailsModelShow(true);
                                    setmedicenDetails(item);
                                  }}
                                  nodeId={`${i} + 20`}
                                  label={item?.medicine?.macrohealth_sg}
                                />

                                <Modal
                                  isOpen={medicenDetailsModelShow}
                                  onRequestClose={medicenDetailsModelShow}
                                  style={customStylesMedicen}
                                  contentLabel="Medicen details"
                                >
                                  <span
                                    style={{ cursor: "pointer" }}
                                    className="float-end"
                                  >
                                    <i
                                      className="fal fa-times"
                                      onClick={() =>
                                        setmedicenDetailsModelShow(false)
                                      }
                                    ></i>
                                  </span>
                                  <h6 style={{ fontSize: "14px" }}>
                                    Medicine Details
                                  </h6>
                                  <hr />
                                  <MedicenDetails
                                    medicenDetails={medicenDetails}
                                  />
                                </Modal>
                              </>
                            );
                          })
                        ) : (
                          <StyledTreeItem
                            nodeId="156"
                            label="Records are not available"
                            style={{ color: "red" }}
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <img className="img-fluid" alt="ew" src={rx2} />
                      }
                      defaultExpandIcon={
                        <img className="img-fluid" alt="ew" src={rx2} />
                      }
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("pastRx")}
                        nodeId="155"
                        label="Past RX"
                      >
                        {PastPrescribedDrugs.length > 0 ? (
                          PastPrescribedDrugs.map((item, i) => {
                            return (
                              <>
                                <StyledTreeItem
                                  key={i}
                                  onClick={() => {
                                    setmedicenDetailsModelShow(true);
                                    setmedicenDetails(item);
                                  }}
                                  nodeId={`${i} + 20`}
                                  label={item?.drug_name}
                                />

                                <Modal
                                  isOpen={medicenDetailsModelShow}
                                  onRequestClose={medicenDetailsModelShow}
                                  style={customStylesMedicen}
                                  contentLabel="Medicen details"
                                >
                                  <span
                                    style={{ cursor: "pointer" }}
                                    className="float-end"
                                  >
                                    <i
                                      className="fal fa-times"
                                      onClick={() =>
                                        setmedicenDetailsModelShow(false)
                                      }
                                    ></i>
                                  </span>
                                  <h6 style={{ fontSize: "14px" }}>
                                    Medicen Details
                                  </h6>
                                  <hr />
                                  <MedicenDetails
                                    medicenDetails={medicenDetails}
                                  />
                                </Modal>
                              </>
                            );
                          })
                        ) : (
                          <StyledTreeItem
                            nodeId="156"
                            style={{ color: "red" }}
                            label="Records are not available"
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <img
                          className="img-fluid"
                          src={pastHistoryIcon}
                          alt="ew"
                        />
                      }
                      defaultExpandIcon={
                        <img
                          className="img-fluid"
                          src={pastHistoryIcon}
                          alt="ew"
                        />
                      }
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("pastHistory")}
                        nodeId="157"
                        label="Past History"
                      >
                        {pastHistory.length > 0 ? (
                          pastHistory.map((item, i) => {
                            return (
                              <StyledTreeItem
                                key={i}
                                nodeId={158 + i}
                                label={`${item?.condition} (${
                                  item?.date
                                    ? moment(item?.date).format("DD/MM/YYYY")
                                    : ""
                                })`}
                              />
                            );
                          })
                        ) : (
                          <StyledTreeItem
                            nodeId="159"
                            label="Records are not available"
                            style={{ color: "red" }}
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <img
                          className="img-fluid"
                          src={pastVisitIcon}
                          alt="icon"
                        />
                      }
                      defaultExpandIcon={
                        <img
                          className="img-fluid"
                          src={pastVisitIcon}
                          alt="icon"
                        />
                      }
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("pastVisit")}
                        nodeId="160"
                        label="Past Visit"
                      >
                        {pastVisitList.length > 0 ? (
                          pastVisitList.map((item, i) => {
                            return (
                              <StyledTreeItem
                                key={i}
                                nodeId={160 + i}
                                label={moment(item?.created_at).format(
                                  "DD/MM/YYYY"
                                )}
                              />
                            );
                          })
                        ) : (
                          <StyledTreeItem
                            nodeId="161"
                            style={{ color: "red" }}
                            label="Records are not available"
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <img
                          className="img-fluid"
                          src={physicalActivityIcom}
                          alt="Icon"
                        />
                      }
                      defaultExpandIcon={
                        <img
                          className="img-fluid"
                          src={physicalActivityIcom}
                          alt="Icon"
                        />
                      }
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("physicalActivity")}
                        nodeId="162"
                        label="Physical Activity"
                      >
                        {physicalActivity.length > 0 ? (
                          physicalActivity.map((item, i) => {
                            return (
                              <StyledTreeItem
                                key={i}
                                nodeId={162 + i}
                                label={moment(item?.created_at).format(
                                  "DD/MM/YYYY"
                                )}
                              />
                            );
                          })
                        ) : (
                          <StyledTreeItem
                            nodeId="163"
                            style={{ color: "red" }}
                            label="Records are not available"
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                    {patientPropsValue?.patient_birth_sex?.birth_sex_name?.toLocaleLowerCase() ===
                      "female" && (
                      <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={
                          <img
                            className="img-fluid"
                            src={antenatal}
                            alt="Icon"
                          />
                        }
                        defaultExpandIcon={
                          <img
                            className="img-fluid"
                            src={antenatal}
                            alt="Icon"
                          />
                        }
                        defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                      >
                        <StyledTreeItem
                          onClick={() => setElement("antenatalVisit")}
                          nodeId="164"
                          label="Antenatal Visit"
                        >
                          {antenatalVisit.length > 0 ? (
                            antenatalVisit.map((item, i) => {
                              return (
                                <StyledTreeItem
                                  key={i}
                                  nodeId={164 + i}
                                  label={moment(item?.created_at).format(
                                    "DD/MM/YYYY"
                                  )}
                                />
                              );
                            })
                          ) : (
                            <StyledTreeItem
                              nodeId="165"
                              style={{ color: "red" }}
                              label="Records are not available"
                            />
                          )}
                        </StyledTreeItem>
                      </TreeView>
                    )}
                  </div>

                  <div className="mt-1">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <FaSyringe style={{ color: "green" }} />
                      }
                      defaultExpandIcon={<FaSyringe />}
                      // defaultCollapseIcon={<img className='img-fluid' src={alergy4} />}
                      // defaultExpandIcon={<img className='img-fluid' src={alergy4} />}
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("immunisation")}
                        nodeId="23"
                        label="Immunization"
                      >
                        {immunisationHistory.length > 0 ? (
                          immunisationHistory.map((item, i) => (
                            <StyledTreeItem
                              key={i}
                              nodeId={21 + i}
                              label={item?.date}
                            />
                          ))
                        ) : (
                          <StyledTreeItem
                            nodeId="21"
                            style={{ color: "red" }}
                            label=" Records are not available"
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                  </div>
                  <div className="mt-1">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <FaFileMedicalAlt style={{ color: "green" }} />
                      }
                      defaultExpandIcon={<FaFileMedicalAlt />}
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("procedureReport")}
                        nodeId="23"
                        label="Procedure Report"
                      >
                        {procedureReport.length > 0 ? (
                          procedureReport.map((item, i) => (
                            <StyledTreeItem
                              key={i}
                              nodeId={21 + i}
                              label={moment(item?.created_at).format(
                                "DD/MM/YYYY"
                              )}
                            />
                          ))
                        ) : (
                          <StyledTreeItem
                            nodeId="21"
                            style={{ color: "red" }}
                            label=" Records are not available"
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                  </div>
                  <div className="mt-1">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <img className="img-fluid" src={disIcon} alt="Icon" />
                      }
                      defaultExpandIcon={
                        <img className="img-fluid" src={disIcon} alt="Icon" />
                      }
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("dischargeSummary")}
                        nodeId="23"
                        label="Discharge Summary"
                      >
                        {dischargeSummary.length > 0 ? (
                          dischargeSummary.map((item, i) => (
                            <StyledTreeItem
                              key={i}
                              nodeId={21 + i}
                              label={moment(item?.created_at).format(
                                "DD/MM/YYYY"
                              )}
                            />
                          ))
                        ) : (
                          <StyledTreeItem
                            nodeId="21"
                            style={{ color: "red" }}
                            label=" Records are not available"
                          />
                        )}
                      </StyledTreeItem>
                    </TreeView>
                  </div>
                  <div className="mt-1">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <FaFileMedicalAlt style={{ color: "green" }} />
                      }
                      defaultExpandIcon={<FaFileMedicalAlt />}
                      defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("eyePrescription")}
                        nodeId="23"
                        label="Optical Prescriptions"
                      ></StyledTreeItem>
                    </TreeView>
                  </div>
                  <div className="mt-1">
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={
                        <MdWorkHistory style={{ color: "green" }} />
                      }
                      defaultExpandIcon={<MdWorkHistory />}
                      // defaultEndIcon={ <MdWorkHistory style={{ color: "green" }} />}
                      sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                    >
                      <StyledTreeItem
                        onClick={() => setElement("doctorRound")}
                        nodeId="24"
                        label="Doctor Round"
                      >
                        {" "}
                        <StyledTreeItem
                          onClick={() => setElement("DiabeticCharts")}
                          nodeId="25"
                          label="Diabetic Chart"
                          icon={<FaRegChartBar style={{ color: "teal" }} />}
                        ></StyledTreeItem>
                        <StyledTreeItem
                          onClick={() => setElement("PathologyResults")}
                          nodeId="26"
                          label="Pathology Result"
                          icon={<GrTest style={{ color: "orchid" }} />}
                        ></StyledTreeItem>
                        <StyledTreeItem
                          onClick={() => setElement("UrineResult")}
                          nodeId="23"
                          label="Urine result"
                          icon={
                            <GrDocumentTest style={{ color: "darkorange" }} />
                          }
                        ></StyledTreeItem>
                      </StyledTreeItem>
                    </TreeView>
                  </div>

                  {patientPropsValue?.patient_birth_sex?.birth_sex_name ===
                    "Female" && (
                    <div className="mt-1">
                      <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={
                          <img
                            className="img-fluid"
                            src={obsteric}
                            alt="Icon"
                          />
                        }
                        defaultExpandIcon={
                          <img
                            className="img-fluid"
                            src={obsteric}
                            alt="Icon"
                          />
                        }
                        defaultEndIcon={<InsertDriveFileOutlinedIcon />}
                        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
                      >
                        <StyledTreeItem
                          onClick={() => setElement("obstreaticHistory")}
                          nodeId="157"
                          label="obstetric History"
                        >
                          {obstericHistory.length > 0 ? (
                            obstericHistory.map((item, i) => {
                              return (
                                <>
                                  <StyledTreeItem
                                    onClick={() =>
                                      setObstreaticModalIsOpen(true)
                                    }
                                    key={i}
                                    nodeId={159 + i}
                                    label={item.pregnancy_no}
                                  />
                                  <Modal
                                    isOpen={obstreaticModalIsOpen}
                                    onRequestClose={closeObstreaticModal}
                                    style={customStylesObs}
                                    contentLabel="Medicen details"
                                  >
                                    <span
                                      style={{ cursor: "pointer" }}
                                      className="float-end"
                                    >
                                      <i
                                        className="fal fa-times"
                                        onClick={() =>
                                          setObstreaticModalIsOpen(false)
                                        }
                                      ></i>
                                    </span>
                                    <h6 style={{ fontSize: "14px" }}>
                                      Pregnancy Details
                                    </h6>
                                    <hr />
                                    <ObstreaticModal id={item?.id} />
                                  </Modal>
                                </>
                              );
                            })
                          ) : (
                            <StyledTreeItem
                              nodeId={159}
                              style={{ color: "red" }}
                              label={"Records are not available"}
                            />
                          )}
                        </StyledTreeItem>
                      </TreeView>
                    </div>
                  )}
                </div>
                {/* for Tab */}
                <div className="d-block d-lg-none g-doc-scroll p-1 mt-3">
                  <div className="g-doc-left-menu-icons">
                    <p>
                      <img
                        onClick={() => setElement("CurrentRx")}
                        className="img-fluid"
                        src={rx1}
                        alt="Current Rx"
                      />
                    </p>
                    <p>
                      <img
                        onClick={() => setElement("pastRx")}
                        className="img-fluid"
                        src={rx2}
                        alt="Past Rx"
                      />
                    </p>
                    <p>
                      <img
                        onClick={() => setElement("pastHistory")}
                        className="img-fluid"
                        src={pastHistoryIcon}
                        alt="Past History"
                      />
                    </p>
                    <p>
                      <img
                        onClick={() => setElement("pastVisit")}
                        className="img-fluid"
                        src={pastHistoryIcon}
                        alt="Past Visit"
                      />
                    </p>
                    <p>
                      <img
                        onClick={() => setElement("physicalActivity")}
                        className="img-fluid"
                        src={physicalActivityIcom}
                        alt="Physical Activity"
                      />
                    </p>
                    <p>
                      <img
                        onClick={() => setElement("antenatalVisit")}
                        className="img-fluid"
                        src={antenatal}
                        alt="Antenatal Visit"
                      />
                    </p>

                    <p>
                      <FaSyringe
                        onClick={() => setElement("immunisation")}
                        style={{ color: "green" }}
                      />
                    </p>

                    <p>
                      <img
                        onClick={() => setElement("careSuggestion")}
                        className="img-fluid"
                        src={cares}
                        alt="Care Suggestion"
                      />
                    </p>
                    <Modal
                      isOpen={modalPastObservationIsOpen}
                      onRequestClose={closePastObservationModal}
                      style={customStylesPast}
                      contentLabel="Example Modal"
                    >
                      <span className="float-end">
                        <i
                          className="fal fa-times"
                          onClick={closePastObservationModal}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </span>
                      <h6 style={{ fontSize: "14px" }}>Past Observation</h6>
                      <hr />
                      <PastObservation
                        patientId={patientPropsValue?.id}
                        closePastObservationModal={closePastObservationModal}
                      ></PastObservation>
                    </Modal>

                    <p>
                      <img
                        onClick={() => setElement("obstreaticHistory")}
                        className="img-fluid"
                        src={obsteric}
                        alt="Obstreatic History"
                      />
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={`col-1 d-block d-lg-none g-doc-left-sidebar g-doc-scroll custom-card g-doc-left-content`}
          >
            <div className="">
              <div className="g-doc-paiten-list-container">
                <span
                  style={{ fontSize: "11px", fontWeight: "500" }}
                  className="text-center my-1"
                >
                  Today
                </span>
                <ul>
                  {scheduleData.length > 0 ? (
                    scheduleData.map((item, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => initialSet(item)}
                          className={`d-lg-flex g-doc-left-patient ${
                            item.id === activeId ? "active-sm" : ""
                          } mb-2`}
                        >
                          <div className="text-center">
                            <img
                              src={`${global?.img_url}/images/files/${item?.patients?.patient_images}`}
                              alt=""
                              className="img-fluid"
                            />
                            {/* <img src={icon} alt="" className={`img-fluid me-1 ${!smallMenu ? "mt-1" : ""}`} /> */}
                            <span
                              style={{ fontSize: "10px" }}
                              className=" text-center"
                            >
                              {moment(item?.StartTime).format("hh:mm A")}
                            </span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <>
                      {nodataFoundtodays ? (
                        <p
                          style={{
                            fontSize: "13px",
                            marginLeft: "19%",
                            color: "red",
                          }}
                        >
                          Records are not available
                        </p>
                      ) : (
                        <i
                          style={{ fontSize: "16px", marginLeft: "40%" }}
                          className="fas fa-spinner fa-spin"
                        ></i>
                      )}
                    </>
                  )}
                </ul>
                <span
                  style={{ fontSize: "11px", fontWeight: "500" }}
                  className="my-1 text-center"
                >
                  Upcoming
                </span>
                <ul>
                  {uppcomingApp.length > 0 ? (
                    uppcomingApp.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className={` g-doc-left-patient ${
                            patientPropsValue?.id === item?.patient_id
                              ? "active"
                              : ""
                          } mb-2`}
                        >
                          <div className="text-center">
                            <img
                              src={`${global.img_url}/images/files/${item?.patient_appionment?.patient_images}`}
                              alt=""
                              className="img-fluid me-1"
                            />
                            <span style={{ fontSize: "10px" }}>
                              {moment(item?.StartTime).calendar()}
                            </span>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <>
                      {nodataFoundupcomming ? (
                        <p
                          style={{
                            fontSize: "13px",
                            marginLeft: "19%",
                            color: "red",
                          }}
                        >
                          Records are not available
                        </p>
                      ) : (
                        <i
                          style={{ fontSize: "16px", marginLeft: "40%" }}
                          className="fas fa-spinner fa-spin"
                        ></i>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* for Tab */}
            <div className="d-block d-lg-none g-doc-scroll p-1 mt-3">
              <div className="g-doc-left-menu-icons">
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("CurrentRx")}
                    className="img-fluid"
                    src={rx1}
                    alt="Current Rx"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("pastRx")}
                    className="img-fluid"
                    src={rx2}
                    alt="Past Rx"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("pastHistory")}
                    className="img-fluid"
                    src={pastHistoryIcon}
                    alt="Past History"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("pastVisit")}
                    className="img-fluid"
                    src={pastHistoryIcon}
                    alt="Past Visit"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("physicalActivity")}
                    className="img-fluid"
                    src={physicalActivityIcom}
                    alt="Physical Activity"
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("antenatalVisit")}
                    className="img-fluid"
                    src={antenatal}
                    alt="Antenatal Visit"
                  />
                </div>

                <div className="d-flex justify-content-center align-items-center">
                  <FaSyringe
                    onClick={() => setElement("immunisation")}
                    style={{ color: "green" }}
                  />
                </div>
                <Modal
                  isOpen={modalPastObservationIsOpen}
                  onRequestClose={closePastObservationModal}
                  style={customStylesPast}
                  contentLabel="Example Modal"
                >
                  <span className="float-end">
                    <i
                      className="fal fa-times"
                      onClick={closePastObservationModal}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                  <h6 style={{ fontSize: "14px" }}>Past Observation</h6>
                  <hr />
                  <PastObservation
                    patientId={patientPropsValue?.id}
                    closePastObservationModal={closePastObservationModal}
                  ></PastObservation>
                </Modal>

                <div className="d-flex justify-content-center align-items-center">
                  <img
                    onClick={() => setElement("obstreaticHistory")}
                    className="img-fluid"
                    src={obsteric}
                    alt="Obstreatic History"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              smallMenu ? "col-lg-11 col-md-11" : "col-lg-10 col-11 col-md-11 "
            }`}
          >
            <GreatDocPatientDetail
              unset={unset}
              appId={activeId}
              antenatalVisit={antenatalVisit}
              procedureReport={procedureReport}
              eyePrescription={eyePrescription}
              dischargeSummary={dischargeSummary}
              element={element}
              PastPrescribedDrugs={PastPrescribedDrugs}
              prescribedDrugs={prescribedDrugs}
              nodatafoundPrescribedDrugs={nodatafoundPrescribedDrugs}
              setupdateState={setupdateState}
              setElement={setElement}
              saveMedicen={saveMedicen}
              setsaveMedicen={setsaveMedicen}
              appointmentTime={appointmentTime}
              patientPropsValue={patientPropsValue}
              vitalSign={vitalSign}
              pastVisitList={pastVisitList}
              physicalActivity={physicalActivity}
              refetchPrescription={prescriptionSetupOpen}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "relative",
        }}
      >
        <SearchPatientModal
          isOpen={isOpenSearchPatientModal}
          onClose={handleClosedSearchPatientModal}
          setUpdateSchedule={setUpdateSchedule}
        />
        <SearchAdmittedPatientModal
          isOpen={isOpenSearchAdmittedPatientModal}
          onClose={handleClosedSearchAdmittedPatientModal}
          setUpdateSchedule={setUpdateSchedule}
        />
        <PrescriptionSetup
          isOpen={prescriptionSetupOpen}
          onClose={() => setPrescriptionSetupOpen(false)}
        />
      </div>
    </div>
  );
};

export default GreatDoc;

const tableData = [
  {
    id: 1,
    title: "EMERGENCY DEPARTMENT-CLINICAL GUIDELINES",
    link: "https://www.pch.health.wa.gov.au/For-health-professionals/Emergency-Department-Guidelines",
  },
  {
    id: 2,
    title: "CHILDREN’S ANTIBIOTICS GUIDELINES",
    link: "https://pch.health.wa.gov.au/For-health-professionals/Childrens-Antimicrobial-Management-Program",
  },
  {
    id: 3,
    title: "KIDS Antimicrobial dose calculator:",
    link: "https://kidshealthwa.com/wp-content/uploads/calculators/Antibiotic_doses/Antibiotic_Doses.htm",
  },
  {
    id: 4,
    title: "CLINICAL GUIDELINES: CIAP",
    link: "https://www.ciap.health.nsw.gov.au/specialty-guides/emergency/guidelines-tools.html",
  },
  {
    id: 5,
    title: "EMERGENCY GUIDELINE:NEPAL GOV & WHO",
    link: "https://r.search.yahoo.com/_ylt=Awr9.x4eBjFlWH0MPSM36At.;_ylu=Y29sbwNncTEEcG9zAzIEdnRpZAMEc2VjA3Ny/RV=2/RE=1697740446/RO=10/RU=https%3a%2f%2fcdn.who.int%2fmedia%2fdocs%2fdefault-source%2fnepal-documents%2fhss_nepal%2fstandard-treatment-protocol-of-emergency-health-service-package.pdf%3fsfvrsn%3d6c838ca4_7/RK=2/RS=tg_AC_iaWaGCmn_fIhMgQzsGrXo-",
  },
  {
    id: 6,
    title: "QLD AUSTRALIA : Maternity and Neonatal Clinical Guidelines",
    link: "https://www.health.qld.gov.au/qcg/publications#maternity",
  },
  {
    id: 7,
    title: "Cancer council australia :Clinical practice guidelines",
    link: "https://www.cancer.org.au/health-professionals/clinical-practice-guidelines",
  },
  {
    id: 8,
    title: "Travellers Health Advice : By CDC USA ",
    link: "https://wwwnc.cdc.gov/travel/destinations/list",
  },
  {
    id: 9,
    title: "RACGP :Australia guidelines ",
    link: "https://www.racgp.org.au/clinical-resources/clinical-guidelines/key-racgp-guidelines/view-all-racgp-guidelines",
  },
  {
    id: 10,
    title: "The college of Optometry UK guidelines:",
    link: "https://www.college-optometrists.org/clinical-guidance/clinical-management-guidelines",
  },
  {
    id: 11,
    title: "Diabetes australia : Best practice guidelines ",
    link: "https://www.diabetesaustralia.com.au/health-professional-guidelines/",
  },
  {
    id: 12,
    title: "Womens : The Royal Womens hospital, Victoria, Australia ",
    link: "https://www.thewomens.org.au/health-professionals/clinical-resources/clinical-guidelines-gps",
  },
  {
    id: 13,
    title: "STI management Guideline: Australia",
    link: "https://sti.guidelines.org.au/",
  },
  {
    id: 14,
    title: "Lung Foundation Australia-Guidelines :",
    link: "https://sti.guidelines.org.au/",
  },
  {
    id: 15,
    title: "Prof Kaye E Wilkins - Paedaitric Orthopaedics ",
    link: "https://global-help.org/category/author/kaye-e-wilkins/",
  },
  {
    id: 16,
    title: "Heart Murmur learning",
    link: "https://depts.washington.edu/physdx/heart/demo.html/",
  },
  {
    id: 17,
    title: "The Operation Note",
    link: "https://teachmesurgery.com/skills/theatre-basics/the-operation-note/",
  },
  {
    id: 18,
    title: "HADSVASC and HASBLED risk factors, EHRA score",
    link: "https://chadsvasc.org/",
  },
  {
    id: 19,
    title: "Australia CVD risk calculator",
    link: "https://www.cvdcheck.org.au/calculator/",
  },
  {
    id: 20,
    title: "e VIQ Cancer treatment protocols",
    link: "https://www.eviq.org.au/haematology-and-bmt/",
  },
];

const ResourceModal = ({ isOpen, onClose }) => {
  const columns = [
    {
      title: "SL",
      field: "id",
      style: {
        width: "50px",
        textAlign: "center",
      },
    },
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Link",
      field: "link",
      style: {
        cursor: "pointer",
        width: "100px",
        textAlign: "center",
      },
      render: (row) => (
        <a target="_blank" rel="noreferrer" href={row.link}>
          Link
        </a>
      ),
    },
  ];
  return (
    <>
      <NewModal isOpen={isOpen} onClose={onClose} size="md">
        <NewModal.Header onClose={onClose}>
          <NewModal.Title>Resources</NewModal.Title>
        </NewModal.Header>
        <NewModal.Body>
          <SimpleTable isSerially={false} columns={columns} data={tableData} />
        </NewModal.Body>
      </NewModal>
    </>
  );
};
