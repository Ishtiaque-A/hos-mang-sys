import React, { useEffect, useState, useRef } from "react";
import "./GreatDoc.css";
import icon from "../../../Images/crush.jpg";
import clinic1 from "../../../Images/clinical1.png";
import clinic2 from "../../../Images/clinical2.png";
import clinic3 from "../../../Images/clinical3.png";
import clinic4 from "../../../Images/clinical4.png";
import clinic5 from "../../../Images/clinical5.png";
import clinic6 from "../../../Images/clinical6.png";
import clinic7 from "../../../Images/clinical7.png";
import clinic8 from "../../../Images/clinical8.png";
import clinic9 from "../../../Images/clinical9.png";
import clinic10 from "../../../Images/clinical10.png";
import clinic11 from "../../../Images/Mentalicon.png";
import clinic12 from "../../../Images/neurology.png";
import clinic13 from "../../../Images/womens-health.png";
import docMenu2 from "../../../Images/g-doc-menu2.png";
import docMenu3 from "../../../Images/g-doc-menu3.png?";
import docMenu5 from "../../../Images/g-doc-menu5.png";
import docMenu6 from "../../../Images/g-doc-menu6.png";
import digiPatientButtonImage from "../../../Images/referral_follow_up.png";
import docMenu7 from "../../../Images/pragnency-icon.png";
//import docMenu8 from "../../../Images/diagnosis-image.png";
import accIcon from "../../../Images/accordion (2).png";
import pMenu1 from "../../../Images/p-menu-1.png";
// import { Accordion as Accordion1 } from "react-bootstrap";
// import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
// import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { alpha, styled } from "@mui/material/styles";
// import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import VitalSignModal from "./VitalSignModal";
import DoctorMenuModal from "./DoctorMenuModal";
import RadiologyPopUp from "./RadiologyPopUp";
import axios from "axios";
import moment from "moment";
import NewRx from "./NewRx";
import HistoryAndExamination from "./HistoryAndExamination/HistoryAndExamination";
import Modal from "react-modal";
import procedureImg from "../../../Images/Procedure image.png";
import diagnosisImg from "../../../Images/diagnosis-image.png";
import autoFeelImg from "../../../Images/autofill.png";
import giveMedicine from "../../../Images/giveMedicine.png";
import "./GreatDocPatientDetails.css";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import { useReactToPrint } from "react-to-print";
// import PrescriptionDetails from "./PrescriptionDetails";
import DiabaticCharts from "../GreatDoc/DoctorRoundOutput/DiabeticChartOutput";
import JoditEditor from "jodit-react";
import PastHistory from "./PastHistory";
import PathologyPopUp from "./PathologyPopUp";
import ObstreaticHistory from "./ObstreaticHistory";
import { Tooltip, tooltipClasses } from "@mui/material";
import Swal from "sweetalert2";
import Immunisation from "./Immunisation";
import CareSuggestion from "./CareSuggestion";
import MimsProductDetails from "./MimsProductDetails";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { cloudUrl } from "../../../index";
import PastVisit from "./PastVisit";
import PhysicalActivityAdviceOutput from "./PhysicalActivityAdviceOutput";
import AntenatalVisitOutput from "./AntenatalVisitOutput";
import FamilyAndSocialHistoryModal from "./FamilyAndSocialHistoryModal";
import PatientReports from "./PatientReports";
import { AiFillFileText } from "react-icons/ai";
import { FaHeartPulse } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";
// import { IoChevronBackCircleOutline } from "react-icons/io5";
// import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { FaPrint } from "react-icons/fa6";
import { MdIndeterminateCheckBox } from "react-icons/md";
import useResizeObserver from "../../../hooks/useResizeObserver";
import LocalPrescription from "./prescription-templates/LocalPrescription";
import DefaultPrescription from "./prescription-templates/DefaultPrescription";
import { getAge } from "../../../utils/getAge";
import { Modal as CustomModal } from "../../../common/components/Modal";
import Button from "../../../common/components/Button";
import { nullParser } from "../../../utils/null-parser";
import useUserData from "../../../hooks/useUserData";
import { Popover, ArrowContainer } from "react-tiny-popover";
import DigiPatientHistoryModal from "./DigiPatientHistoryModal";
import ProcedureReportHistory from "./ProcedureReportHistory";
import DischargeSummaryHistory from "./DischargeSummaryHistory";
import { numHelper } from "../../../utils/numberHelper";
import EyePrescription from "./EyePrescription";
import DoctorRoundOutput from "./DoctorRoundOutput/DoctorRoundOutput";
import PathologyResultsOutput from "./DoctorRoundOutput/PathologyResultsOutput";
import UrineResultOutput from "./DoctorRoundOutput/UrineResultOutput";
import AddMedicationChartModal from "./AddMedicationChartModal";
import MedicationChartModal from "./MedicationChartModal";

const config = {
  readonly: false,
  removeButtons: [
    "source",
    "strikethrough",
    "eraser",
    "copyformat",
    "link",
    "showall",
  ],
};

const GreatDocPatientDetail = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [docMenuModalIsOpen, setDocMenuModalIsOpen] = useState(false);
  const [showPatientHistory, setShowPatientHistory] = useState(true);
  const [isOpenDigiHistory, setIsOpenDigiHistory] = useState(false);

  const [medicationChartModalIsOpen, setMedicationChartModalIsOpen] =
    useState(false);

  const [appModalIsOpen, setAppModalIsOpen] = useState(false);
  const [examModalIsOpen, setExamModalIsOpen] = useState(false);
  const [radiologyModalIsOpen, setRadiologyModalIsOpen] = useState(false);
  const [pathologyModalIsOpen, setPathologyModalIsOpen] = useState(false);
  const clinicalExamRef = useRef();
  const [isShowClinicalExamPopover, setIsShowClinicalExamPopover] =
    useState(false);
  const [eyeDataForPrescription, setEyeDataForPrescription] = useState();
  const [generalDataForPrescription, setGeneralDataForPrescription] =
    useState();

  // popover

  //modal
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // Morshed

  const docMenuModalOpen = () => {
    setDocMenuModalIsOpen(true);
  };
  const docMenuModalClose = () => {
    setDocMenuModalIsOpen(false);
  };
  const appModaClose = () => {
    setAppModalIsOpen(false);
  };
  const examModalOpen = () => {
    if (props.patientPropsValue.id) {
      setExamModalIsOpen(true);
    } else {
      Swal.fire(
        "Warning!",
        "Please select patient from today's appointment ",
        "warning"
      );
    }
  };
  const examModalClose = () => {
    setExamModalIsOpen(false);
  };
  const radiologyModalOpen = () => {
    setRadiologyModalIsOpen(true);
  };
  const radiologyModalClose = () => {
    setRadiologyModalIsOpen(false);
  };
  const pathologyModalOpen = () => {
    setPathologyModalIsOpen(true);
  };
  const pathologyModalClose = () => {
    setPathologyModalIsOpen(false);
  };

  // modal

  const {
    patient_hn_number,
    ethnicity,
    patient_hcc_no,
    blood_group,
    patient_birth_sex,
    religion,
    patient_images,
    patient_dob,
    usual_provider,
    patient_nid,
    lactation,
    fullName,
  } = props.patientPropsValue;

  const { StartTime } = props.appointmentTime;
  const [alcoholHistory, setalcoholHistory] = useState();
  const [tobacoHistory, settobacoHistory] = useState();
  const [patientInfo, setpatientInfo] = useState([]);
  const [pregnancyOutcome, setpregnancyOutcome] = useState([]);
  const [pregnancyUpdate, setpregnancyUpdate] = useState();

  const [investigations, setInvestigations] = useState([]);

  const patientId = props?.patientPropsValue?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let newInvestigation = [];
        const resPath = await axios.get(`get-pathology-new/${patientId}`);
        if (resPath.status === 200) {
          const modifiedPath = resPath?.data?.map(
            (item) => item?.pathology_test_name
          );
          newInvestigation = [...modifiedPath];
        }

        const resRadi = await axios.get(`radiology/${patientId}`);
        if (resRadi.status === 200) {
          const modifiedRad = resRadi?.data?.all_radiology?.map(
            (item) => item?.radiology_test_name
          );
          newInvestigation = [...newInvestigation, ...modifiedRad];
        }
        setInvestigations([...newInvestigation]);
      } catch (error) {
        // Handle errors here
        if (axios.isCancel(error)) {
          // Request was canceled
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [pathologyModalIsOpen, radiologyModalIsOpen, patientId]);

  useEffect(() => {
    if (props.patientPropsValue.id) {
      const controller = new AbortController();
      axios
        .get(`patients-family-social/${props.patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setalcoholHistory(res.data.alcohols);
          settobacoHistory(res.data.social_tobacco);
        });

      axios
        .get(`patient-search-by-id/${props.patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setpatientInfo(res.data.patient);
        });
      axios
        .get(`/pregnancy-history/${props.patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setpregnancyOutcome(res.data.pregnancy);
        });

      setselectedMedicen([]);
      setalertboxArray([]);

      return () => {
        controller.abort();
      };
    }
  }, [props?.patientPropsValue.id, props?.saveMedicen, pregnancyUpdate]);

  // modal2

  const customStyles = {
    content: {
      top: "30%",
      left: "27%",
      height: "60vh",
      width: "75%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(243, 242, 239)",
    },
  };

  const [procedureModelShow, setprocedureModelShow] = useState(false);

  function openProcedureModal() {
    setprocedureModelShow(true);
  }

  function closeProcedurModal() {
    setprocedureModelShow(false);
  }

  // diagnosis data
  const [diagonis, setdiagonis] = useState([]);
  //  procedure data
  const [procedure, setProcedure] = useState([]);
  //reason for visit data
  const [reson, setReson] = useState([]);
  const [resonFor, setResonFor] = useState([]);

  //review all data get
  const [allReviewName, setAllReviewName] = useState([]);

  //all auto fill
  const [autoFill, setAutoFill] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [AllDrugs, setAllDrugs] = useState([]);
  const [searchReasonForVisit, setSearchReasonForVisit] = useState("");

  const onClearReasonForVisit = () => {
    setSearchReasonForVisit("");
  };

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`/drug-name-for-gd`, {
        signal: controller.signal,
      })
      .then((res) => {
        setAllDrugs(res.data);
      });

    axios
      .get(`/gd-all-api`, {
        signal: controller.signal,
      })
      .then((res) => {
        setdiagonis(res.data.diagnosis);

        // const modifiedData = res?.data?.ResonForVisit?.map((item, i) => {
        //   return {
        //     ...item,
        //     value: `${i}-${item?.DiagnosisProcedure_code}`,
        //     label: item?.DiagnosisProcedure_name,
        //   };
        // });
        setReson(res?.data?.ResonForVisit);
        setProcedure(res.data.ResonForVisit);
        setResonFor(res.data.ResonForVisit2nd);
        setAutoFill(res.data.autoFill);
        setAllReviewName(res.data.reviewName);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const [diagAndPastHistoriyStateUpdate, setdiagAndPastHistoriyStateUpdate] =
    useState();
  const [pastHistory, setpastHistory] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (props.patientPropsValue.id) {
      axios
        .get(`/past-history/${props.patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setpastHistory(res.data.past_history);
        });
    }

    return () => {
      controller.abort();
    };
  }, [props.patientPropsValue.id, diagAndPastHistoriyStateUpdate]);

  // diagnosis_onchange_submit
  const [diagnosis, setDiagnosis] = useState({
    diagnosis_name: "",
    diagnosis_for_name: "",
    diagnosis_further_details: "",
    diagnosis_action_name: "",
  });

  const [diagnosisChecked, setdiagnosisChecked] = useState(false);

  function handleDiagnosisChecbox(e) {
    setdiagnosisChecked(e.target.checked);
  }
  function addDiagnosisList(e) {
    e.preventDefault();

    const data = {
      patient_id: props.patientPropsValue.id,
      date: moment().format("YYYY-MM-DD"),
      condition: diagnosis.diagnosis_name,
      code: diagnosis.code,
      details: diagnosis.diagnosis_further_details,
      appointment_id: props.appId,
    };

    if (diagnosis.diagnosis_name === "") {
      toast.error("please provide all input Data");
    } else {
      axios.post(`/past-history-save`, data).then((res) => {
        toast.success("Diagnosis added successfully");
        setUpdateForHistory(Math.random());
        setdiagAndPastHistoriyStateUpdate(Math.random());
        setDiagnosis({
          diagnosis_name: "",
          diagnosis_for_name: "",
          diagnosis_further_details: "",
          diagnosis_action_name: "",
        });
        setdiagnosisChecked(false);
      });
    }
  }

  const [procedureStateUpdate, setprocedureStateUpdate] = useState();
  useEffect(() => {
    const controller = new AbortController();
    if (props.patientPropsValue.id) {
      axios
        .get(`/great-doc-procedure/${props.patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setProcedureList(res.data.all_procedures);
        });
    }

    return () => {
      controller.abort();
    };
  }, [props.patientPropsValue.id, procedureStateUpdate]);

  //procedure functional start
  const [procedureData, setProcedureData] = useState({
    procedure_name: "",
    procedure_for_name: "",
    procedure_further_details: "",
    procedure_action_name: "",
  });
  const [procedureList, setProcedureList] = useState([]);

  function handleProcedureInput(e) {
    setProcedureData({ ...procedureData, [e.target.name]: e.target.value });
  }

  function addProcedureList(e) {
    e.preventDefault();
    if (procedureData.procedure_name === "") {
      toast.error("please provide all input Data");
    } else {
      const data = {
        procedure_name: procedureData.procedure_name,
        procedure_further_details: procedureData.procedure_further_details,
        patient_id: props.patientPropsValue.id,
      };

      axios.post(`/save-great-doc-procedure`, data).then((res) => {
        if (res.data.status == 200) {
          toast.success("Data add successfully");
          setprocedureStateUpdate(Math.random());
          setdiagAndPastHistoriyStateUpdate(Math.random());
          setProcedureData({
            procedure_name: "",
            procedure_further_details: "",
          });
        } else if (res.data.status == 400) {
          toast.error("Please input all valid field ");
        }
      });
    }
  }

  ////////////////////////////////////    Reason for visit     ///////////////////////////

  const [resonForVisitData, setresonForVisitData] = useState({
    reson_name: "",
    reson_for_name: "",
    reson_further_details: "",
    code: "",
  });
  const handleResonInput = (e) => {
    setresonForVisitData({
      ...resonForVisitData,
      [e.target.name]: e.target.value,
    });
  };
  const [resonList, setResonList] = useState([]);
  const [stateUpdateReson, setstateUpdateReson] = useState();
  useEffect(() => {
    const controller = new AbortController();
    if (props.patientPropsValue.id) {
      axios
        .get(`get-great-doc-reson/${props.patientPropsValue.id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setResonList(res.data.allReasons);
        });
    }

    return () => {
      controller.abort();
    };
  }, [props.patientPropsValue.id, stateUpdateReson]);

  function addResonList() {
    const allResonData = {
      patient_id: props.patientPropsValue.id,
      reson_name: resonForVisitData.reson_name,
      code: resonForVisitData.code,
      reson_for_name: resonForVisitData.reson_for_name,
      reson_further_details: resonForVisitData.reson_further_details,
      appointment_id: props.appId,
    };

    axios
      .post(`/save-great-doc-reson`, allResonData)
      .then((res) => {
        if (res.data.status === 200) {
          setUpdateForHistory(Math.random());
          setstateUpdateReson(Math.random());
          toast.success("Data save successfully");
          setSelectedReson(null);
          setresonForVisitData({
            reson_name: "",
            reson_for_name: "",
            reson_further_details: "",
          });
          onClearReasonForVisit();
        }
      })
      .catch((err) => toast.error("Something is wrong ?"));
  }

  ///// review functionality start ////

  const [review, setReview] = useState({
    review_name: "",
    date: "",
  });

  const [manageModalIsOpen, setManageModalIsOpen] = useState(false);

  const submitReview = (e) => {
    // e.preventDefault();

    if (
      review.review_name === "" ||
      review.date === "" ||
      props.patientPropsValue.id === ""
    ) {
      return toast.warning(
        "Need to select required field and select patient for send reminder"
      );
    } else {
      const data = {
        ...review,
        patient_ID: props.patientPropsValue.id,
        patient_name: `${props.patientPropsValue.patient_first_name} ${props.patientPropsValue.patient_last_name}`,
        patient_mobile: props.patientPropsValue?.patient_mobile_phone,
        doctor_id: props.appointmentTime?.doctors?.id,
        doctor_name: props.appointmentTime?.doctors?.dr_given_name,
      };
      axios.post(`/save-great-doc-review`, data).then((res) => {
        if (res.data.status == 200) {
          setReview({
            review_name: "",
            date: "",
          });
          setSubmitted(!submitted);
          toast.success("Review added Successfully");
        } else if (res.data.status == 400) {
          // setAutoFillError([res.data.errors])
          toast.error("Please input all valid field ");
        }
      });
    }
  };

  ////////////////////////////////////    Auto fill functionality start      ///////////////////////////
  const [autoFillData, setAutoFillData] = useState({
    auto_fill_id: "",
  });
  const [autoFillDependent, setAutoFillDependent] = useState({
    autofillText: "",
    autofillHistory: "",
  });

  const autoFillAllData = {
    auto_fill_id: autoFillData.auto_fill_id,
    auto_fill_text: autoFillDependent.autofillText,
    auto_fill_history: autoFillDependent.autofillHistory,
  };

  useEffect(() => {
    const controller = new AbortController();
    if (autoFillData.auto_fill_id) {
      axios
        .get(`/autofill/${autoFillData.auto_fill_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          if (res.data.status == 200) {
            setAutoFillDependent({
              autofillText: res.data.autoFill.autoFill_text,
              autofillHistory: res.data.autoFill.autoFill_history,
            });
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [autoFillData.auto_fill_id]);

  const handleAutoFillInput = (e) => {
    setAutoFillData({
      ...autoFillData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDisableValueChange = (e) => {
    setAutoFillDependent({
      ...autoFillDependent,
      [e.target.name]: e.target.value,
    });
  };
  const disabledElement1 = useRef();
  const disabledElement2 = useRef();

  const editHandleAutoFillChange = () => {
    disabledElement1.current.removeAttribute("disabled");
    disabledElement2.current.removeAttribute("disabled");
  };

  function submitAutoFill(e) {
    e.preventDefault();
    if (
      autoFillData.auto_fill_id === "" ||
      autoFillDependent.autofillHistory === "" ||
      autoFillDependent.autofillText === ""
    ) {
      toast.error("please provide all input Data");
    } else {
      axios.post(`/save-great-doc-autofill`, autoFillAllData).then((res) => {
        if (res.data.status == 200) {
          setAutoFillDependent({
            autofillText: "",
            autofillHistory: "",
          });
          setAutoFillData({ auto_fill_id: "" });

          setSubmitted(!submitted);
          toast.success("AutoFill added Successfully");
        } else if (res.data.status == 400) {
          // setAutoFillError([res.data.errors])
          toast.error("Please input all valid field ");
        }
      });
    }
  }

  const [restricatedDrugsList, setrestricatedDrugsList] = useState([
    //s4 dugs List
    "Amobarbital",
    "Anabolic",
    "Androisoxazole",
    "Barbiturates",
    "Benzphetamine",
    "Bolandiol",
    "Bolasterone",
    "Boldenone",
    "Bolmantalate",
    "Bromazepam",
    "Calusterone",
    "Cathine",
    "Chlorandrostenolone",
    "Chlordiazepoxide",
    "Chloroxydienone",
    "Chloroxymesterone",
    "CJC",
    "Clobazam",
    "Clonazepam",
    "Clorazepate",
    "Clostebol",
    "Darbepoetin",
    "Dextropropoxyphene",
    "Diazepam",
    "Diethylpropion",
    "Dihydrolone",
    "Dimethandrostanolone",
    "Dimethazine",
    "Doxapram",
    "Drostanolone",
    "Enobosarm",
    "Ephedrine",
    "Epoetins",
    "Erythropoietins",
    "Ethchlorvynol",
    "Ethinamate",
    "Ethyldienolone",
    "Ethyloestrenol",
    "Fencamfamin",
    "Fenproporex",
    "Fibroblast growth factors",
    "Fluoxymesterone",
    "Flurazepam",
    "Follistatin",
    "Formebolone",
    "Formyldienolone",
    "Furazabol",
    "Glutethimide",
    "hormones",
    "Hexarelin",
    "Hydroxystenozol",
    "Ibutamoren",
    "Insulin",
    "Ipamorelin",
    "Lorazepam",
    "Mazindol",
    "Medazepam",
    "Mefenorex",
    "Meprobamate",
    "Mesabolone",
    "Mestanolone",
    "Mesterolone",
    "Methandienone",
    "Methandriol",
    "Methenolone",
    "Methylandrostanolone",
    "Methylclostebol",
    "Methylphenobarbitone",
    "Methyltestosterone",
    "Methyltrienolone",
    "Methyprylone",
    "Mibolerone",
    "Midazolam",
    "Nalbuphine",
    "Nandrolone",
    "Nitrazepam",
    "Norandrostenolone",
    "Norbolethone",
    "Norethandrolone",
    "Normethandrone",
    "Oxabolone",
    "Oxandrolone",
    "Oxazepam",
    "Oxymesterone",
    "Oxymetholone",
    "Paraldehyde",
    "Pentobarbitone",
    "Perampanel",
    "Phenobarbitone",
    "Phentermine",
    "Pipradrol",
    "Pralmorelin",
    "Prasterone",
    "Prazepam",
    "Pregabalin",
    "Propylhexedrine",
    "Pseudoephedrine",
    "Pyrovalerone",
    "Quetiapine",
    "Quinbolone",
    "Selective androgen receptor modulators",
    "Silandrone",
    "Somatropin",
    "Stanolone",
    "Stanozolol",
    "Stenabolic",
    "Stenbolone",
    "TB - 500",
    "Temazepam",
    "Testolactone",
    "Testosterone",
    "Tianeptine",
    "Thiomesterone",
    "Thymosin beta",
    "Tramadol",
    "Trenbolone",
    "Trestolone",
    "Triazolam",
    "Zolazepam",
    "Zolpidem",
    "Zopiclone",

    //s8 dugs List
    "alfentanil",
    "alprazolam",
    "amobarbital1",
    "amfetamine",
    "buprenorphine",
    "butorphanol",
    "cannabis2",
    "cocaine",
    "codeine3",
    "dexamfetamine",
    "dextropropoxyphene4",
    "dihydrocodeine5",
    "diphenoxylate6",
    "dronabinol7",
    "fentanyl",
    "flunitrazepam",
    "hydromorphone",
    "ketamine",
    "lisdexamfetamine",
    "methadone",
    "methylamfetamine",
    "methylphenidate",
    "morphine",
    "nabilone",
    "nabiximols8",
    "opium9",
    "oxycodone",
    "pentobarbitone",
    "pethidine",
    "pholcodine11",
    "secobarbital",
    "remifentanil",
    "secobarbitone",
    "quinalbarbitone",
    "sodium oxybate12",
    "tapentadol",
    "tetrahydrocannabinols13",
  ]);
  const componentRef = useRef();
  const [doctorsNote, setDoctrosNote] = useState();
  const handlePrintPrescription = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @page {
      size: auto;
      margin: 2mm; /* Adjust margin as needed */
    }
    @media print {
      body {
        margin: 0;
      }
    }
  `,
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCxc4AMP6lbBP.woff2",
      },
    ],
  });
  const [advises, setAdvises] = useState([]);
  const [selectedMedicen, setselectedMedicen] = useState([]);
  const userData = useUserData();
  useEffect(() => {
    const getAdvises = async () => {
      const res = await axios.get(
        "advise-for-greatdoc-prescription-show/" + userData?.user_id
      );
      if (res.status === 200) {
        const modifiedData = res.data?.advise.map((ad) => ({
          ...ad,
          check: ad.check === 0 ? false : true,
        }));
        setAdvises(modifiedData);
      }
    };

    getAdvises();
    return () => {};
  }, [userData]);
  const endPrescription = () => {
    let matches = selectedMedicen.filter((obj1) =>
      restricatedDrugsList.some((obj2) => obj1.drug_generic_name === obj2)
    );
    let newSelectedMedicen = selectedMedicen.map((obj1) => {
      matches.find((obj2) => {
        if (obj1.id === obj2.id) {
          obj1.rsdrug = true;
        }
      });

      return obj1;
    });
    if (matches.length > 0) {
      setselectedMedicen(newSelectedMedicen);

      Swal.fire({
        title: "Restricted Items",
        text: `A prescription for a restricted item was printed.The drug details must be hand written on the prescription`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, go for it!",
        cancelButtonText: "No, modify the prescription!",
      }).then((result) => {
        if (result.isConfirmed) {
          // handlePrintPrescription();
          setpastHistory([]);
          printPrescriptionfrombackend();
        }
      });
    } else {
      // handlePrintPrescription();
      printPrescriptionfrombackend();
      axios.post(`end-consultation/${props.appId}`).then((res) => {
        console.log(res);
      });
    }

    const dataPres = {
      patient_id: props.patientPropsValue?.id,
      doctor_id: docdata?.id,
      reason_for_visit: resonList?.map((item) => item.reson_name).join(", "),
      prescription_name: `prescription_${moment(Date.now()).format(
        "MMMM Do YYYY, h:mm:ss a"
      )}`,
      doctors_note: doctorsNote,
      date: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
      rx: selectedMedicen,
      advices:
        advises
          ?.filter((ad) => ad?.check === true)
          .map((ad) => ad?.advise_name)
          .join(", ") || "",
      investigations: investigations.toString() || "",
    };
    axios.post("/save-prescription-name", dataPres).then((res) => {
      console.log("PrescriptionData", res.data);
    });
  };

  const [navMenuActiveClass, setnavMenuActiveClass] = useState();

  const [activeClassForHistory, setactiveClassForHistory] = useState();

  const [updateForHistory, setUpdateForHistory] = useState();

  useEffect(() => {
    let cancleData = false;
    if (!cancleData) {
      if (props?.appId) {
        axios
          .get(`eye-data/${props?.patientPropsValue?.id}/${props.appId}`)
          .then((res) => {
            if (res.data) {
              const eyeData = res?.data?.eye;
              if (eyeData) {
                const eyePrescriptionData = {
                  columns: ["Vision", "Right", "Left", "OU"],
                  data: [
                    {
                      Vision: "Distance",
                      Right: eyeData?.UCVARightDistance ?? "",
                      Left: eyeData?.UCVALeftDistance ?? "",
                      OU: eyeData?.UCVAOUDistance ?? "",
                    },
                    {
                      Vision: "Near",
                      Right: eyeData?.UCVARightNear ?? "",
                      Left: eyeData?.UCVALeftNear ?? "",
                      OU: eyeData?.UCVAOUNear ?? "",
                    },
                  ],
                };

                const dilation = {
                  columns: [
                    "IOP",
                    "Right",
                    "Left",
                    //  "Start", "End"
                  ],
                  data: [
                    {
                      IOP: "Pre",
                      Right: eyeData?.intraOcularPressureRightPre ?? "",
                      Left: eyeData?.intraOcularPressureLeftPre ?? "",
                    },
                    {
                      IOP: "Post",
                      Right: eyeData?.intraOcularPressureRightPost ?? "",
                      Left: eyeData?.intraOcularPressureLeftPost ?? "",
                      // Start: eyeData?.intraOcularPressureStartTime
                      //   ? moment(
                      //       eyeData?.intraOcularPressureStartTime,
                      //       "HH:mm"
                      //     ).format("hh:mm A")
                      //   : "",
                      // End: eyeData?.intraOcularPressureEndTime
                      //   ? moment(
                      //       eyeData?.intraOcularPressureEndTime,
                      //       "HH:mm"
                      //     ).format("hh:mm A")
                      //   : "",
                    },
                  ],
                };

                setEyeDataForPrescription({
                  eye: eyePrescriptionData,
                  dilation,
                });
              }

              if (res?.data?.general) {
                console.log(res?.data?.general, "general data");
                const generalData = [
                  {
                    title: "Pulse",
                    value: numHelper(res?.data?.general?.pulse)
                      ? res?.data?.general?.pulse + "/min"
                      : "",
                  },
                  {
                    title: "BP",
                    value:
                      `${res?.data?.general?.sitting_left}/${res?.data?.general?.sitting_right}` +
                        "mm of Hg" ?? "",
                  },
                  {
                    title: "Temp",
                    value: numHelper(res?.data?.general?.temp)
                      ? res?.data?.general?.temp + "°F"
                      : "",
                  },
                  {
                    title: "RBS",
                    value: numHelper(res?.data?.general?.bloodSuger)
                      ? res?.data?.general?.bloodSuger + "molls/L"
                      : "",
                  },
                ];
                setGeneralDataForPrescription(generalData);
              }
            }
          })
          .catch((err) => {
            console.log(err, "eye data");
          });
        axios.get(`/doctors-note/${props.appId}`).then((res) => {
          const string = `
            ${
              res.data?.diagonosis
                ? ` <p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
            <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Diagnosis :</strong></span><br>
            ${res.data?.diagonosis}
        </p>`
                : ""
            }
            ${
              res.data?.reason
                ? ` <p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
            <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Reason for visit :</strong></span><br>
            ${res.data?.reason}
        </p>`
                : ""
            }
            ${
              res.data?.symptom
                ? ` <p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
            <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Symptoms :</strong></span><br>
            ${res.data?.symptom}
        </p>`
                : ""
            }
            ${res.data?.note?.note ? res.data?.note?.note : ""}
            ${
              res.data?.medicine
                ? `
            <p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
            <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Medicines:</strong></span>
        </p>
        <table className="past_rx_table">
                              <thead>
                                  <tr>
                                      <th scope="col">Brand</th>
                                      <th scope="col">Drug</th>
                                      <th scope="col">Dose</th>
                                      <th scope="col">Frequency</th>
                                      <th scope="col">Instruction</th>
                                      <th scope="col">PRN</th>
                                      <th scope="col">Qty</th>
                                      <th scope="col">Repeats</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  ${res.data?.medicine?.map((item, i) => {
                                    return `<tr key=${i}>
                                                  <td>${item?.brand_name}</td>
                                                  <td>${item?.drug_name}</td>
                                                  <td>${
                                                    item?.Complex_instruction
                                                      ? ""
                                                      : item?.dose
                                                  }</td>
                                                  <td>${
                                                    item?.Complex_instruction
                                                      ? ""
                                                      : item?.frequency
                                                  }</td>
                                                  <td>${
                                                    item?.Complex_instruction
                                                      ? item?.Complex_instruction
                                                      : ""
                                                  }</td>
                                                  <td>${
                                                    item?.prn ? item.prn : ""
                                                  }</td>
                                                  <td>${item?.quantity}</td>
                                                  <td>${item?.repeats}</td>  
                                              </tr>`;
                                  })}
  
                              </tbody>
                          </table>
            
            `
                : ""
            }
            ${
              res.data?.advice
                ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
              <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Advice:</strong></span>
          </p>
         <span class="editor-advice">${res.data?.advice}</span>
          
          `
                : ""
            }
  
            `; // main string
          setDoctrosNote(string);
        });
      }
    }

    return () => {
      cancleData = true;
    };
  }, [props?.appId, updateForHistory]);

  //For text Editor

  // const handleEditorDataUpdate = (data) => {
  //   setDoctrosNote(data);
  //   axios.put(`/ doctors - note / ${ props.appId }`, { note: data });
  // };
  const editor = useRef(null);

  useEffect(() => {
    let cancelSubcription = false;
    if (!cancelSubcription) {
      // setDoctrosNote("");
      if (lactation === 1) {
        setlactationValue(true);
      } else {
        setlactationValue(false);
      }
    }

    return () => {
      cancelSubcription = true;
    };
  }, [props.patientPropsValue.id]);

  const [lactationValue, setlactationValue] = useState(false);
  const [lactationUpdate, setlactationUpdate] = useState();
  const [lacValUpdate, setlacValUpdate] = useState();
  useEffect(() => {
    let cancelSubcription = false;
    if (!cancelSubcription) {
      const data = {
        lactation: lactationValue,
      };
      if (props.patientPropsValue.id) {
        axios
          .post(
            `update - patients - lactation / ${props.patientPropsValue.id}`,
            data
          )
          .then((res) => {
            toast.success(res.data.message);
            setlactationUpdate(Math.random());
          });
      }
    }
    return () => {
      cancelSubcription = true;
    };
  }, [lacValUpdate]);

  const [mimsData, setMimsData] = useState("");
  const [modalIsOpenMimsProduct, setmodalIsOpenMimsProduct] = useState(false);
  const closeModalMimsProduct = () => {
    setmodalIsOpenMimsProduct(false);
    setMimsData();
  };
  const [medicine, setmedicine] = useState("");

  const mimsInfo = (row) => {
    axios.get(`/edit-drug-name / ${row.drug_id}`).then((res) => {
      setmedicine(res.data.drugs);
    });
    cloudUrl.get(`generic/${row.guid}`).then((res) => {
      setMimsData(res.data.Result.Content.GGPI);
      setmodalIsOpenMimsProduct(true);
    });
  };
  const [alertmodelShow, setalertmodelShow] = useState(false);
  const customStylesAleart = {
    content: {
      top: "37%",
      left: "22%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "49%",
      padding: "10px",
      marginLeft: "38%",
    },
  };

  const [alertboxArray, setalertboxArray] = useState([]);
  const [indexNumber, setindexNumber] = useState(0);

  const mimsAlertInformation = () => {
    const newArryAlert = [];

    const mimsNewData = [];

    selectedMedicen.map((mediItem) => {
      return mimsNewData.push({ Guid: mediItem.guid });
    });

    var pYear = Math.abs(
      moment(new Date(), "YYYY/MM/DD").format("YYYY") -
        moment(patientInfo.patient_dob, "YYYY/MM/DD").format("YYYY")
    );

    var xmlData = `<Request>
      <Interaction>
        <Prescribing>
          ${mimsNewData
            .map((item, i) => {
              return `<GGPI reference="{${item.Guid}}"/>`;
            })
            .join("")}
        </Prescribing>
        <References />
        <HealthIssueCodes>
          ${
            pastHistory.length > 0
              ? pastHistory
                  .map((item) => {
                    return `<HealthIssueCode code="${item.code}" codeType="ICD10"/>`;
                  })
                  .join("")
              : ""
          }

        </HealthIssueCodes>
      </Interaction>
         ${
           patientInfo?.patient_birth_sex?.birth_sex_name?.toLowerCase() ===
           "female"
             ? ` <PatientProfile>
<Gender>F</Gender>
<Age><Year>${pYear}</Year></Age>
<Pregnancy><Week>${pregnancyOutcome[0]?.scan_weeks}</Week></Pregnancy>
${lactationValue ? `<Nursing>true</Nursing>` : ""}
</PatientProfile>`
             : ""
         }
                           
</Request>
  `;

    cloudUrl
      .post(`drugtodrug-rawdata`, xmlData, {
        method: "POST",
        headers: { "Content-Type": "text/xml" },
      })
      .then((res) => {
        if (Array.isArray(res?.data?.Result?.Interaction?.GGPI)) {
          res?.data?.Result?.Interaction?.GGPI?.map((itemGGIP, i) => {
            if (itemGGIP.Route !== undefined) {
              if (Array.isArray(itemGGIP.Route)) {
                itemGGIP.Route.map((route) => {
                  if (route.GGPI !== undefined) {
                    if (Array.isArray(route.GGPI)) {
                      route.GGPI.map((val) => {
                        newArryAlert.push({
                          name: `Drug interactison(${itemGGIP.name} vs ${val.name})[Severity level - ${val.Route.ClassInteraction.Severity.name}]`,
                          flug: `${val.Route.ClassInteraction.Severity.ranking} `,
                          description: `${val?.Route?.ClassInteraction?.Interaction?.Professional} `,
                          precaution: val.Route.ClassInteraction.Precaution,
                          References: val.Route.ClassInteraction.References,
                        });
                        setalertmodelShow(true);
                      });
                    } else {
                      newArryAlert.push({
                        name: `Drug interactison(${itemGGIP.name} vs ${route.GGPI.name})[Severity level - ${route.GGPI.Route.ClassInteraction.Severity.name}]`,
                        flug: `${route.GGPI.Route.ClassInteraction.Severity.ranking} `,
                        description: `${route.GGPI.Route.ClassInteraction.Interaction.Professional} `,
                        precaution:
                          route.GGPI.Route.ClassInteraction.Precaution,
                        References:
                          route.GGPI.Route.ClassInteraction.References,
                      });
                      setalertmodelShow(true);
                    }
                  }
                  if (route.HealthIssueCode !== undefined) {
                    newArryAlert.push({
                      name: `Health Condition(${route.HealthIssueCode.name})`,
                      description: `${route.HealthIssueCode.ClassInteraction.Interaction.Abbreviated} `,
                    });
                    setalertmodelShow(true);
                  }

                  if (route.Pregnancy !== undefined) {
                    if (Array.isArray(route.Pregnancy.Category)) {
                      route.Pregnancy.Category.map((wom) => {
                        if (wom.Source === "MIMS") {
                          newArryAlert.push({
                            name: `${itemGGIP.name} [Pregnancy][${wom.Trimester} Trimester]`,
                            description: `${wom.Comment} `,
                          });
                          setalertmodelShow(true);
                        }
                      });
                    } else {
                      if (route.Pregnancy.Category.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${itemGGIP.name} [Pregnancy][${route.Pregnancy.Category.Trimester} Trimester]`,
                          description: `${route.Pregnancy.Category.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    }
                  }

                  if (route.Lactation !== undefined) {
                    newArryAlert.push({
                      name: `${itemGGIP.name} [Lactation][Severity Level - ${
                        route.Lactation.Severity.name == undefined
                          ? ""
                          : route.Lactation.Severity.name
                      }]`,
                      description: `${route.Lactation.Comment} `,
                    });
                    setalertmodelShow(true);
                  }

                  if (route.WOCBA !== undefined) {
                    if (Array.isArray(route.WOCBA.Category)) {
                      route.WOCBA.Category.map((wom) => {
                        if (wom.Source === "MIMS") {
                          newArryAlert.push({
                            name: `${itemGGIP.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                            description: `${wom.Comment} `,
                          });
                          setalertmodelShow(true);
                        }
                      });
                    } else {
                      if (route.WOCBA.Category.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${itemGGIP.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                          description: `${route.WOCBA.Category.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    }
                  }
                });
              } else {
                if (itemGGIP.Route.GGPI !== undefined) {
                  if (Array.isArray(itemGGIP.Route.GGPI)) {
                    itemGGIP.Route.GGPI.map((val) => {
                      newArryAlert.push({
                        name: `Drug interactison(${itemGGIP.name} vs ${val.name})[Severity level - ${val.Route.ClassInteraction.Severity.name}]`,
                        flug: `${val.Route.ClassInteraction.Severity.ranking} `,
                        description: `${val.Route.ClassInteraction.Interaction.Professional} `,
                        precaution: val.Route.ClassInteraction.Precaution,
                        References: val.Route.ClassInteraction.References,
                      });
                      setalertmodelShow(true);
                    });
                  } else {
                    newArryAlert.push({
                      name: `Drug interactison(${itemGGIP.name} vs ${itemGGIP.Route.GGPI.name})[Severity level - ${itemGGIP.Route.GGPI.Route.ClassInteraction.Severity.name}]`,
                      flug: `${itemGGIP.Route.GGPI.Route.ClassInteraction.Severity.ranking} `,
                      description: `${itemGGIP.Route.GGPI.Route.ClassInteraction.Interaction.Professional} `,
                      precaution:
                        itemGGIP.Route.GGPI.Route.ClassInteraction.Precaution,
                      References:
                        itemGGIP.Route.GGPI.Route.ClassInteraction.References,
                    });
                    setalertmodelShow(true);
                  }
                }
                if (itemGGIP.Route.HealthIssueCode !== undefined) {
                  newArryAlert.push({
                    name: `Health Condition(${itemGGIP.Route.HealthIssueCode.name})`,
                    description: `${itemGGIP?.Route?.HealthIssueCode?.ClassInteraction?.Interaction?.Abbreviated} `,
                  });
                  setalertmodelShow(true);
                }

                if (itemGGIP.Route.Pregnancy !== undefined) {
                  if (Array.isArray(itemGGIP.Route.Pregnancy.Category)) {
                    itemGGIP.Route.Pregnancy.Category.map((wom) => {
                      if (wom.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${itemGGIP.name} [Pregnancy][${wom.Trimester} Trimester]`,
                          description: `${wom.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    });
                  } else {
                    if (itemGGIP.Route.Pregnancy.Category.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${itemGGIP.name} [Pregnancy][${itemGGIP.Route.Pregnancy.Category.Trimester} Trimester]`,
                        description: `${itemGGIP.Route.Pregnancy.Category.Comment} `,
                      });
                      setalertmodelShow(true);
                    }
                  }
                }

                if (itemGGIP.Route.Lactation !== undefined) {
                  newArryAlert.push({
                    name: `${itemGGIP.name} [Lactation][Severity Level - ${
                      itemGGIP.Route.Lactation.Severity.name == undefined
                        ? ""
                        : itemGGIP.Route.Lactation.Severity.name
                    }]`,
                    description: `${itemGGIP.Route.Lactation.Comment} `,
                  });
                  setalertmodelShow(true);
                }

                if (itemGGIP.Route.WOCBA !== undefined) {
                  if (Array.isArray(itemGGIP.Route.WOCBA.Category)) {
                    itemGGIP.Route.WOCBA.Category.map((wom) => {
                      if (wom.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${itemGGIP.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                          description: `${wom.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    });
                  } else {
                    if (itemGGIP.Route.WOCBA.Category.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${itemGGIP.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                        description: `${itemGGIP.Route.WOCBA.Category.Comment} `,
                      });
                      setalertmodelShow(true);
                    }
                  }
                }
              }
            }
          });
        } else {
          if (res.data.Result.Interaction.GGPI.Route !== undefined) {
            if (Array.isArray(res.data.Result.Interaction.GGPI.Route)) {
              res.data.Result.Interaction.GGPI.Route.map((route) => {
                if (route.GGPI !== undefined) {
                  if (Array.isArray(route.GGPI)) {
                    route.GGPI.map((val) => {
                      newArryAlert.push({
                        name: `Drug interactison(${res.data.Result.Interaction.GGPI.name} vs ${val.name})[Severity level - ${val.Route.ClassInteraction.Severity.name}]`,
                        flug: `${val.Route.ClassInteraction.Severity.ranking} `,
                        description: `${val.Route.ClassInteraction.Interaction.Professional} `,
                        precaution: val.Route.ClassInteraction.Precaution,
                        References: val.Route.ClassInteraction.References,
                      });
                      setalertmodelShow(true);
                    });
                  } else {
                    newArryAlert.push({
                      name: `Drug interactison(${res.data.Result.Interaction.GGPI.name} vs ${route.GGPI.name})[Severity level - ${route.GGPI.Route.ClassInteraction.Severity.name}]`,
                      flug: `${route.GGPI.Route.ClassInteraction.Severity.ranking} `,
                      description: `${route.GGPI.Route.ClassInteraction.Interaction.Professional} `,
                      precaution: route.GGPI.Route.ClassInteraction.Precaution,
                      References: route.GGPI.Route.ClassInteraction.References,
                    });
                    setalertmodelShow(true);
                  }
                }
                if (route.HealthIssueCode !== undefined) {
                  newArryAlert.push({
                    name: `Health Condition(${route.HealthIssueCode.name})`,
                    description: `${route.HealthIssueCode.ClassInteraction.Interaction.Abbreviated} `,
                  });
                  setalertmodelShow(true);
                }

                if (route.Pregnancy !== undefined) {
                  if (Array.isArray(route.Pregnancy.Category)) {
                    route.Pregnancy.Category.map((wom) => {
                      if (wom.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${res.data.Result.Interaction.GGPI.name} [Pregnancy][${wom.Trimester} Trimester]`,
                          description: `${wom.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    });
                  } else {
                    if (route.Pregnancy.Category.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${res.data.Result.Interaction.GGPI.name} [Pregnancy][${route.Pregnancy.Category.Trimester} Trimester]`,
                        description: `${route.Pregnancy.Category.Comment} `,
                      });
                      setalertmodelShow(true);
                    }
                  }
                }

                if (route.Lactation !== undefined) {
                  newArryAlert.push({
                    name: `${
                      res.data.Result.Interaction.GGPI.name
                    } [Lactation][Severity Level - ${
                      route.Lactation.Severity.name == undefined
                        ? ""
                        : route.Lactation.Severity.name
                    }]`,
                    description: `${route.Lactation.Comment} `,
                  });
                  setalertmodelShow(true);
                }

                if (route.WOCBA !== undefined) {
                  if (Array.isArray(route.WOCBA.Category)) {
                    route.WOCBA.Category.map((wom) => {
                      if (wom.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                          description: `${wom.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    });
                  } else {
                    if (route.WOCBA.Category.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                        description: `${route.WOCBA.Category.Comment} `,
                      });
                      setalertmodelShow(true);
                    }
                  }
                }
              });
            } else {
              if (res.data.Result.Interaction.GGPI.Route.GGPI !== undefined) {
                if (
                  Array.isArray(res.data.Result.Interaction.GGPI.Route.GGPI)
                ) {
                  res.data.Result.Interaction.GGPI.Route.GGPI.map((val) => {
                    newArryAlert.push({
                      name: `Drug interactison(${res.data.Result.Interaction.GGPI.name} vs ${val.name})[Severity level - ${val.Route.ClassInteraction.Severity.name}]`,
                      flug: `${val.Route.ClassInteraction.Severity.ranking} `,
                      description: `${val.Route.ClassInteraction.Interaction.Professional} `,
                      precaution: val.Route.ClassInteraction.Precaution,
                      References: val.Route.ClassInteraction.References,
                    });
                    setalertmodelShow(true);
                  });
                } else {
                  newArryAlert.push({
                    name: `Drug interactison(${res.data.Result.Interaction.GGPI.name} vs ${res.data.Result.Interaction.GGPI.Route.GGPI.name})[Severity level - ${res.data.Result.Interaction.GGPI.Route.GGPI.Route.ClassInteraction.Severity.name}]`,
                    flug: `${res.data.Result.Interaction.GGPI.Route.GGPI.Route.ClassInteraction.Severity.ranking} `,
                    description: `${res.data.Result.Interaction.GGPI.Route.GGPI.Route.ClassInteraction.Interaction.Professional} `,
                    precaution:
                      res.data.Result.Interaction.GGPI.Route.GGPI.Route
                        .ClassInteraction.Precaution,
                    References:
                      res.data.Result.Interaction.GGPI.Route.GGPI.Route
                        .ClassInteraction.References,
                  });
                  setalertmodelShow(true);
                }
              }
              if (
                res.data.Result.Interaction.GGPI.Route.HealthIssueCode !==
                undefined
              ) {
                newArryAlert.push({
                  name: `Health Condition(${res.data.Result.Interaction.GGPI.Route.HealthIssueCode.name})`,
                  description: `${res.data.Result.Interaction.GGPI.Route.HealthIssueCode.ClassInteraction.Interaction.Abbreviated} `,
                });
                setalertmodelShow(true);
              }

              if (
                res.data.Result.Interaction.GGPI.Route.Pregnancy !== undefined
              ) {
                if (
                  Array.isArray(
                    res.data.Result.Interaction.GGPI.Route.Pregnancy.Category
                  )
                ) {
                  res.data.Result.Interaction.GGPI.Route.Pregnancy.Category.map(
                    (wom) => {
                      if (wom.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${res.data.Result.Interaction.GGPI.name} [Pregnancy][${wom.Trimester} Trimester]`,
                          description: `${wom.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    }
                  );
                } else {
                  if (
                    res.data.Result.Interaction.GGPI.Route.Pregnancy.Category
                      .Source === "MIMS"
                  ) {
                    newArryAlert.push({
                      name: `${res.data.Result.Interaction.GGPI.name} [Pregnancy][${res.data.Result.Interaction.GGPI.Route.Pregnancy.Category.Trimester} Trimester]`,
                      description: `${res.data.Result.Interaction.GGPI.Route.Pregnancy.Category.Comment} `,
                    });
                    setalertmodelShow(true);
                  }
                }
              }

              if (
                res.data.Result.Interaction.GGPI.Route.Lactation !== undefined
              ) {
                newArryAlert.push({
                  name: `${
                    res.data.Result.Interaction.GGPI.name
                  } [Lactation][Severity Level - ${
                    res.data.Result.Interaction.GGPI.Route.Lactation.Severity
                      .name == undefined
                      ? ""
                      : res.data.Result.Interaction.GGPI.Route.Lactation
                          .Severity.name
                  }]`,
                  description: `${res.data.Result.Interaction.GGPI.Route.Lactation.Comment} `,
                });
                setalertmodelShow(true);
              }

              if (res.data.Result.Interaction.GGPI.Route.WOCBA !== undefined) {
                if (
                  Array.isArray(
                    res.data.Result.Interaction.GGPI.Route.WOCBA.Category
                  )
                ) {
                  res.data.Result.Interaction.GGPI.Route.WOCBA.Category.map(
                    (wom) => {
                      if (wom.Source === "MIMS") {
                        newArryAlert.push({
                          name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                          description: `${wom.Comment} `,
                        });
                        setalertmodelShow(true);
                      }
                    }
                  );
                } else {
                  if (
                    res.data.Result.Interaction.GGPI.Route.WOCBA.Category
                      .Source === "MIMS"
                  ) {
                    newArryAlert.push({
                      name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE(WOCBA)]`,
                      description: `${res.data.Result.Interaction.GGPI.Route.WOCBA.Category.Comment} `,
                    });
                    setalertmodelShow(true);
                  }
                }
              }
            }
          }
        }
      });

    setalertboxArray(newArryAlert);
    if (newArryAlert.length > 0) {
      setalertmodelShow(true);
    }
  };

  function closeModalAlert() {
    setindexNumber(0);
    setalertmodelShow(false);
    setalertboxArray([]);
  }

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip} `]: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 350,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid rgb(204, 204, 204)",
      textAlign: "justify",
      boxShadow: "4px 8px 5px -3px rgba(143,143,143,0.64)",
      borderRadius: "5px",
    },
  }));
  const [familyHistoryModalIsOpen, setFamilyHistoryModalIsOpen] =
    useState(false);
  const closeFamilyHistoryModal = () => {
    setFamilyHistoryModalIsOpen(false);
  };

  const [docdata, setdocdata] = useState();
  const [docID, setDocID] = useState();
  const [docName, setDocName] = useState();

  function handleCall() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const popupWidth = 900;
    const popupHeight = 500;

    const leftPosition = (screenWidth - popupWidth) / 2;
    const topPosition = (screenHeight - popupHeight) / 2;

    window.open(
      `/video-call/${
        props?.patientPropsValue?.fullName
      } /${props?.patientPropsValue?.patient_hn_number
        .replace(/^HN-/, "")
        .toString()}/${docName} /${userData?.mobile.toString()}`,
      "_blank",
      `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`
    );
  }

  useEffect(() => {
    const controller = new AbortController();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.user_id) {
      axios
        .get(`/doctorProfile/${userData.user_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setdocdata(res.data.doctors);
          setDocID(res.data.doctors.id);
          setDocName(res.data.doctors.fullName);
        });
    }

    return () => {
      controller.abort();
    };
  }, [props.patientPropsValue.id]);

  const [lodingEs, setlodingEs] = useState(false);
  const [selectDateOrDuration, setselectDateOrDuration] = useState("date");

  const [prescriptionData, setprescriptionData] = useState(null);
  const [prescriptionTemplate, setPrescriptionTemplate] = useState(null);

  const localStorageData = localStorage.getItem("userData");
  const praseLocalData = JSON.parse(localStorageData);

  useEffect(() => {
    const getPrescriptionData = async () => {
      if (docdata?.id) {
        try {
          const res = await axios.get(
            `/greatdoc-prescription-type-setup-get/${docdata.id}`
          );

          if (res.status === 200) {
            setPrescriptionTemplate(res.data?.data);
          }
        } catch (error) {
          console.error("Error fetching prescription data:", error);
        }
      }
    };

    getPrescriptionData();
  }, [docdata?.id, props?.refetchPrescription]);
  const printPrescriptionfrombackend = () => {
    const data = {
      organization: { ...praseLocalData },
      prescriptionCode: `${Math.floor(Math.random() * 9000) + 1000}`,
      doctorInfo: {
        doctor_id: docdata?.id,
        docName: `${
          nullParser(docdata?.title?.title_name)
            ? docdata?.title?.title_name
            : ""
        } ${docdata?.fullName}`,
        experience:
          docdata?.work_experience[docdata?.work_experience?.length - 1],
        dr_work_phone: docdata?.dr_work_phone,
        dr_mobile_phone: docdata?.dr_mobile_phone,
        usual_provider:
          docdata?.usual_provider !== "null" ? docdata?.usual_provider : "",
        dr_bmdc_reg_no:
          docdata?.dr_bmdc_reg_no !== "null" ? docdata?.dr_bmdc_reg_no : "",
        specialist:
          docdata?.specialist?.specialists_name !== "null"
            ? docdata?.specialist?.specialists_name
            : "",
        academic: docdata?.academic?.map((item) => item.degree_id).join(", "),
      },
      patientInfo: {
        name: props?.patientPropsValue?.fullName,
        sex: props?.patientPropsValue?.patient_birth_sex,
        dob: props?.patientPropsValue?.patient_dob,
        patient_HN: props?.patientPropsValue?.patient_hn_number,
      },
      rx: selectedMedicen,
      ophth: {
        eye: eyeDataForPrescription?.eye,
        dilation: eyeDataForPrescription?.dilation,
        general: generalDataForPrescription,
      },
      advices: advises?.filter((ad) => ad.check === true),
      chielfComplaints: resonList?.map((item) => item.reson_name) || [],
      investigations: investigations || [],
    };
    setprescriptionData(data);
    setTimeout(() => {
      if (selectedMedicen.length > 0 && prescriptionTemplate) {
        handlePrintPrescription();
      }
    }, 500);
  };
  //console.log(docdata, "prescriptionData");
  const handleEScriptToPdf = async () => {
    setlodingEs(true);
    const data = {
      organization: { ...praseLocalData },
      prescriptionCode: `${Math.floor(Math.random() * 9000) + 1000}`,
      prescriptionData: prescriptionTemplate,
      doctorInfo: {
        doctor_id: docdata?.id,
        docName: docdata?.fullName,
        usual_provider:
          docdata?.usual_provider !== "null" ? docdata?.usual_provider : "",
        dr_bmdc_reg_no:
          docdata?.dr_bmdc_reg_no !== "null" ? docdata?.dr_bmdc_reg_no : "",
        specialist:
          docdata?.specialist?.specialists_name !== "null"
            ? docdata?.specialist?.specialists_name
            : "",
        academic: docdata?.academic?.map((item) => item.degree_id).join(", "),
      },
      patientInfo: {
        email: props?.patientPropsValue?.patient_email,
        name: props?.patientPropsValue?.fullName,
        sex: props?.patientPropsValue?.patient_birth_sex,
        dob: props?.patientPropsValue?.patient_dob,
        age: getAge(props?.patientPropsValue?.patient_dob),
        patient_HN: props?.patientPropsValue?.patient_hn_number,
      },
      rx: selectedMedicen,
      ophth: {
        eye: eyeDataForPrescription?.eye,
        dilation: eyeDataForPrescription?.dilation,
        general: generalDataForPrescription,
      },
      advices: advises?.filter((ad) => ad.check === true),
      chiefComplaints: resonList
        ? resonList
            .filter((item) => item !== null)
            .map((item) => item.reson_name) || []
        : [],
      investigation: investigations || [],
      prescriptionType: prescriptionTemplate?.prescription_type,
    };
    setprescriptionData(data);

    if (
      !props?.patientPropsValue?.patient_email ||
      props?.patientPropsValue?.patient_email === ""
    ) {
      toast.warn("Patient email not found");
      setlodingEs(false);
      return;
    }

    try {
      const response = await axios.post(`send-escript-to-patient-email`, data);

      if (response.status === 200) {
        setlodingEs(false);
        toast.success("Email sent successfully");
      }
    } catch (error) {
      setlodingEs(false);
      toast.error("something went wrong");
      console.log("Error sending email:", error);
    }
  };

  useEffect(() => {
    setprescriptionData(null);
    setselectedMedicen([]);
  }, [props?.patientPropsValue?.patient_hn_number]);

  const [_, setSelectedReson] = useState(null);
  // medication chart modal
  const [medication, setMedication] = useState({});
  const [medicationChartAddModalIsOpen, setMedicationChartAddModalIsOpen] =
    useState(false);
  const handleChartModalClose = () => {
    setMedicationChartAddModalIsOpen(false);
    setMedication({});
  };
  const medicationChartModalOpen = () => {
    setMedicationChartModalIsOpen(true);
  };
  const handleMedicationModal = (data) => {
    setMedicationChartAddModalIsOpen(true);
    setMedication(data);
  };
  return (
    <>
      <div className="printable">
        {
          <div ref={componentRef}>
            {prescriptionTemplate?.prescription_type === "local" ? (
              <LocalPrescription
                prescriptionData={prescriptionData}
                prescriptionTemplate={prescriptionTemplate}
              />
            ) : (
              <DefaultPrescription
                prescriptionData={prescriptionData}
                prescriptionTemplate={prescriptionTemplate}
              />
            )}
          </div>
        }
      </div>
      <div className="g-doc-middle-content custom-card p-1 ms-1">
        <div className="row g-doc-patient-details border-bottom pb-1">
          <div className="col-1">
            {patient_images !== "" ? (
              <img
                src={`${global.img_url}/images/files/${patient_images}`}
                alt=""
                className="img-fluid g-doc-patient-img"
              />
            ) : (
              <img src={icon} alt="" className="img-fluid" />
            )}
          </div>
          <div className="col-3">
            <div className="d-flex">
              <span className="me-1 ">
                <span className="mhp-patient-details-title">Medical No</span>:
              </span>
              <p>{patient_hn_number}</p>
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
                {fullName === "" ? "" : fullName}
              </p>
            </div>
            <div className="d-flex">
              <span className="me-1 ">
                <span className="mhp-patient-details-title">Religion</span> :
              </span>
              <p>{religion == null ? "" : religion.religion_name}</p>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex">
              <span className="me-1 ">
                <span className="mhp-patient-details-title">Health ID</span> :
              </span>
              <p>{patient_hcc_no === "" ? " " : patient_hcc_no}</p>
            </div>
            <div className="d-flex">
              <span className="me-1 ">
                <span className="mhp-patient-details-title">Age</span> :
              </span>
              <p>{getAge(patient_dob)}</p>
            </div>
            {patient_birth_sex?.birth_sex_name?.toLowerCase() === "female" ? (
              <div className="d-flex">
                <span className="me-1 ">Breast-feeding : </span>
                <input
                  onChange={() => {
                    setlactationValue(!lactationValue);
                    setlacValUpdate(Math.random());
                  }}
                  checked={lactationValue}
                  type="checkbox"
                  className="lactationCheckbox"
                />
              </div>
            ) : (
              <div className="d-flex">
                <span className="me-1">
                  <span className="mhp-patient-details-title">Ethnicity</span>:
                </span>
                <p>{ethnicity?.ethnicity_name}</p>
              </div>
            )}
          </div>
          <div className="col-3">
            <div className="d-flex">
              <span className="me-1">
                <span className="mhp-patient-details-title">Natioal ID</span>:
              </span>
              <p>{patient_nid}</p>
            </div>
            <div className="d-flex">
              <span className="me-1">
                <span className="mhp-patient-details-title">D.O.B</span> :
              </span>
              <p>
                {patient_dob === ""
                  ? ""
                  : moment(patient_dob).format("DD/MM/YYYY") === "Invalid date"
                  ? " "
                  : moment(patient_dob).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="d-flex">
              <span className="me-1">
                <span className="mhp-patient-details-title">Alcohol</span> :
              </span>
              {props.patientPropsValue.id && (
                <p>{alcoholHistory ? alcoholHistory.is_drinker : "No"}</p>
              )}
            </div>
          </div>
          <div className="col-2">
            <div className="d-flex">
              <span className="me-1">
                <span className="mhp-patient-details-title">Blood Group</span>:
              </span>
              <p>{blood_group === "" ? "" : blood_group?.blood_group_name}</p>
            </div>
            <div className="d-flex">
              <span className="me-1">
                <span className="mhp-patient-details-title">Gender</span> :
              </span>
              <p>
                {patient_birth_sex === ""
                  ? ""
                  : patient_birth_sex?.birth_sex_name}
              </p>
            </div>
            <div className="d-flex">
              <span className="me-1">
                <span className="mhp-patient-details-title">Smoking</span> :
              </span>
              {props.patientPropsValue.id && (
                <p>
                  {tobacoHistory && tobacoHistory.amount_per_day !== "null"
                    ? tobacoHistory.amount_per_day && "Yes"
                    : "No"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="row col-12 p-0 m-0">
            <div
              className="col-12 p-1 doctor-menu-container border-bottom"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "0px",
                marginRight: "0px",
                position: "relative",
              }}
            >
              {/* {medicationChartModalIsOpen && (
                        <MedicationChart
                          patient_id={props.patientPropsValue.id}
                          closeModal={medicationChartModalClose}
                          modalIsOpen={medicationChartModalIsOpen}
                        />
                      )} */}
              <RadiologyPopUp
                patient_id={props?.patientPropsValue.id}
                patient={props?.patientPropsValue}
                closeModal={radiologyModalClose}
                modalIsOpen={radiologyModalIsOpen}
              />
              {/* <RadiologyPopUp
                  patient_id={props?.patientPropsValue.id}
                  patient={props?.patientPropsValue}
                  closeModal={radiologyModalClose}
                  modalIsOpen={radiologyModalIsOpen}
                /> */}
              <PathologyPopUp
                patient_id={props.patientPropsValue.id}
                patient={props?.patientPropsValue}
                closeModal={pathologyModalClose}
                modalIsOpen={pathologyModalIsOpen}
              />
              <DoctorMenuModal
                patient_id={props.patientPropsValue.id}
                patient={props.patientPropsValue}
                closeModal={docMenuModalClose}
                modalIsOpen={docMenuModalIsOpen}
                docData={docdata}
                appId={props?.appId}
                reason={resonList}
              ></DoctorMenuModal>
              <nav className="top-menu">
                <button
                  className={
                    props?.patientPropsValue?.id ? "gd-btn" : "printDisabledbtn"
                  }
                  style={{
                    backgroundColor: props?.patientPropsValue.id
                      ? "#69b128"
                      : "#5d7449",
                    color: "#fff",
                  }}
                  onClick={radiologyModalOpen}
                  disabled={!props?.patientPropsValue.id}
                >
                  <img src={docMenu3} alt="" />
                  Radiology
                </button>
                <button
                  className={
                    props?.patientPropsValue?.id ? "gd-btn" : "printDisabledbtn"
                  }
                  style={{
                    backgroundColor: props?.patientPropsValue.id
                      ? "#69b128"
                      : "#5d7449",
                    color: "#fff",
                  }}
                  onClick={pathologyModalOpen}
                  disabled={!props?.patientPropsValue.id}
                >
                  <img src={docMenu5} alt="" />
                  Pathology
                </button>
                <button
                  className={
                    props?.patientPropsValue.id ? "gd-btn" : "printDisabledbtn"
                  }
                  disabled={!props?.patientPropsValue.id}
                  onClick={medicationChartModalOpen}
                >
                  <img src={docMenu2} alt="" />
                  Medication Chart
                </button>
                {patient_birth_sex?.birth_sex_name?.toLowerCase() ===
                  "female" && (
                  <button
                    onClick={() => props.setElement("obstreaticHistory")}
                    className={
                      props?.patientPropsValue?.id
                        ? "gd-btn"
                        : "printDisabledbtn"
                    }
                    disabled={!props?.patientPropsValue.id}
                  >
                    <img src={docMenu7} alt="" />
                    Pregnancy
                  </button>
                )}
                <PatientReports id={props?.patientPropsValue?.id} />

                <button
                  disabled={!props?.patientPropsValue.id}
                  onClick={() => {
                    setIsOpenDigiHistory(true);
                  }}
                  className={
                    props?.patientPropsValue.id ? "gd-btn" : "printDisabledbtn"
                  }
                  style={{ padding: "5px" }}
                >
                  <img
                    src={digiPatientButtonImage}
                    alt="img"
                    style={{ marginRight: "5px" }}
                  />
                  Digi Patient
                </button>
                <button
                  disabled={!props?.patientPropsValue.id}
                  onClick={docMenuModalOpen}
                  className={
                    props?.patientPropsValue.id ? "gd-btn" : "printDisabledbtn"
                  }
                  style={{ padding: "5px" }}
                >
                  <img src={docMenu6} alt="" style={{ margin: "0px" }} />
                </button>
              </nav>
              <Popover
                isOpen={isShowClinicalExamPopover}
                positions={["bottom", "right", "left", "top"]}
                padding={10}
                onClickOutside={() => setIsShowClinicalExamPopover(false)}
                ref={clinicalExamRef}
                content={({ position, childRect, popoverRect }) => (
                  <ArrowContainer
                    position={position}
                    childRect={childRect}
                    popoverRect={popoverRect}
                    arrowColor={"lightgray"}
                    arrowSize={10}
                    arrowStyle={{ opacity: 0.7 }}
                    style={{
                      zIndex: 9999,
                    }}
                    className="popover-arrow-container"
                    arrowClassName="popover-arrow"
                  >
                    <div
                      className="simple-scrollbar"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        width: "170px",
                        maxHeight: "calc(100vh - 250px)",
                        overflowY: "auto",
                        border: "1px solid lightgray",
                        zIndex: 9999,
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => setIsShowClinicalExamPopover(false)}
                    >
                      <ul className="d-flex flex-column gap-2 clinical-list">
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("General");
                          }}
                        >
                          <img src={clinic1} alt="" /> General
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Cardiovascular");
                          }}
                        >
                          <img src={clinic2} alt="" /> Cardiovascular
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Respiratory");
                          }}
                        >
                          <img src={clinic3} alt="" /> Respiratory
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Gestro Int");
                          }}
                        >
                          <img src={clinic4} alt="" /> Gastro-Intestinal
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("CNS");
                          }}
                        >
                          <img src={clinic5} alt="" /> Cranial Nerves
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Genito Urinary");
                          }}
                        >
                          <img src={clinic6} alt="" /> Genito Urinary
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("ENT");
                          }}
                        >
                          <img src={clinic7} alt="" /> ENT
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("EYE");
                          }}
                        >
                          <img src={clinic8} alt="" /> EYE
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Skin");
                          }}
                        >
                          <img src={clinic9} alt="" /> Skin
                        </li>
                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Masculo Skel");
                          }}
                        >
                          <img src={clinic10} alt="" /> Musculo Skeletal
                        </li>

                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Mental Health");
                          }}
                        >
                          <img src={clinic11} alt="" /> Mental Health
                        </li>

                        <li
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            examModalOpen();
                            setactiveClassForHistory("Neurological");
                          }}
                        >
                          <img src={clinic12} alt="" /> Neurological
                        </li>

                        {patient_birth_sex?.birth_sex_name?.toLowerCase() ===
                          "female" && (
                          <li
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              examModalOpen();
                              setactiveClassForHistory("Women’s Health");
                            }}
                          >
                            <img src={clinic13} alt="" /> Women’s Health
                          </li>
                        )}
                      </ul>
                    </div>
                  </ArrowContainer>
                )}
              >
                <button
                  onClick={() =>
                    setIsShowClinicalExamPopover(!isShowClinicalExamPopover)
                  }
                  disabled={props.patientPropsValue.id === ""}
                  style={{
                    display: "flex",
                    padding: "5px 0px",
                    fontSize: "12px",
                    fontWeight: "500",
                    border: "none",
                    backgroundColor:
                      props.patientPropsValue.id === "" ? "#5d7449" : "#69b128",
                    cursor:
                      props.patientPropsValue.id === ""
                        ? "not-allowed"
                        : "pointer",
                    outline: "none",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "5px",
                    width: "140px",
                    justifyContent: "center",
                  }}
                >
                  Clinical Examination
                </button>
              </Popover>
            </div>
            <DigiPatientHistoryModal
              isOpen={isOpenDigiHistory}
              onClose={() => setIsOpenDigiHistory(false)}
              patientId={props?.patientPropsValue?.id || null}
              doctorId={docdata?.id || null}
            />
            <HistoryAndExamination
              setUpdateForHistory={setUpdateForHistory}
              setactiveClassForHistory={setactiveClassForHistory}
              activeClassForHistory={activeClassForHistory}
              patient_id={props.patientPropsValue.id}
              patientValue={props.patientPropsValue}
              modalIsOpen={examModalIsOpen}
              closeModal={examModalClose}
              appId={props?.appId}
              doctorId={docdata?.id || null}
            ></HistoryAndExamination>
            <div className={`prescription col-12`}>
              <div className="doctor-prescription">
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => setAppModalIsOpen(true)}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                  style={{
                    backgroundColor: props?.patientPropsValue.id
                      ? "#69b128"
                      : "#5d7449",
                    color: "#fff",
                  }}
                >
                  <img src={pMenu1} alt="" className="me-2" />
                  Add Prescription
                </button>
                <button
                  disabled={
                    props.patientPropsValue.id === "" ||
                    lodingEs ||
                    !selectedMedicen?.length
                  }
                  onClick={() => {
                    printPrescriptionfrombackend();
                    // endPrescription();
                  }}
                  className={[
                    props.patientPropsValue.id === "" ||
                    lodingEs ||
                    !selectedMedicen?.length
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  <FaPrint className="me-1" size={15} />
                  Print
                </button>
                <button
                  disabled={
                    lodingEs ||
                    !selectedMedicen?.length ||
                    props.patientPropsValue.id === ""
                  }
                  onClick={handleEScriptToPdf}
                  className={[
                    props.patientPropsValue.id === "" ||
                    lodingEs ||
                    !selectedMedicen?.length
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  <AiFillFileText className="me-1" size={15} />
                  {lodingEs ? "loading ..." : "eScript"}
                </button>
                <button
                  className={
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn"
                  }
                  disabled={props.patientPropsValue.id === ""}
                  onClick={openModal}
                >
                  <FaHeartPulse className="me-1" size={15} />
                  Vital Sign
                </button>
                <button
                  className={
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn"
                  }
                  onClick={() => setFamilyHistoryModalIsOpen(true)}
                  disabled={props.patientPropsValue.id === ""}
                >
                  <FaUsers className="me-1" size={15} />
                  Family History
                </button>
                <button
                  className={
                    props.patientPropsValue.id === "" ||
                    props?.appointmentTime?.app_type?.toLowerCase() ===
                      "chamber"
                      ? "printDisabledbtn"
                      : "gd-btn"
                  }
                  disabled={
                    props.patientPropsValue.id === "" ||
                    props?.appointmentTime?.app_type?.toLowerCase() ===
                      "chamber"
                  }
                  onClick={handleCall}
                >
                  <IoCall className="me-1" size={15} />
                  Video Call
                </button>
              </div>
              <div className="doctor-prescription-menu">
                <nav>
                  <ul>
                    {appModalIsOpen && (
                      <NewRx
                        lactationUpdate={lactationUpdate}
                        AllDrugs={AllDrugs}
                        diagonis={diagonis}
                        appointmentId={props?.appId}
                        prescribedDrugs={props.prescribedDrugs}
                        saveMedicen={props.saveMedicen}
                        setsaveMedicen={props.setsaveMedicen}
                        patient_id={props.patientPropsValue.id}
                        closeModal={appModaClose}
                        modalIsOpen={appModalIsOpen}
                        setdiagAndPastHistoriyStateUpdate={
                          setdiagAndPastHistoriyStateUpdate
                        }
                        setUpdateForHistory={setUpdateForHistory}
                      ></NewRx>
                    )}
                    <FamilyAndSocialHistoryModal
                      patient_id={props.patientPropsValue.id}
                      familyHistoryModalIsOpen={familyHistoryModalIsOpen}
                      closeFamilyHistoryModal={closeFamilyHistoryModal}
                    />
                    <VitalSignModal
                      vitalSign={props.vitalSign}
                      closeModal={closeModal}
                      modalIsOpen={modalIsOpen}
                    ></VitalSignModal>
                  </ul>
                </nav>
              </div>
              <div className="bottom-menu">
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => {
                    if (props.patientPropsValue?.id) {
                      openProcedureModal();
                      setnavMenuActiveClass("Diagnosis");
                    }
                  }}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  Diagonosis
                </button>
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => {
                    if (props.patientPropsValue?.id) {
                      openProcedureModal();
                      setnavMenuActiveClass("Procedure");
                    }
                  }}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  Procedure
                </button>
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => {
                    if (props.patientPropsValue?.id) {
                      setManageModalIsOpen(true);
                    }
                  }}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  Management
                </button>
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => {
                    if (props.patientPropsValue?.id) {
                      openProcedureModal();
                      setnavMenuActiveClass("Reason for Visit");
                    }
                  }}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  Reason for Visit
                </button>
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => {
                    if (props.patientPropsValue?.id) {
                      openProcedureModal();
                      setnavMenuActiveClass("Review");
                    }
                  }}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  Review
                </button>
                <button
                  disabled={props.patientPropsValue.id === ""}
                  onClick={() => {
                    if (props.patientPropsValue?.id) {
                      Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, End visit !",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          endPrescription();
                          props.unset();
                          setDoctrosNote("");
                        }
                      });
                    }
                  }}
                  className={[
                    props.patientPropsValue.id === ""
                      ? "printDisabledbtn"
                      : "gd-btn",
                  ]}
                >
                  End Visit
                </button>
              </div>
              {props.element === "CurrentRx" && (
                <div className="rx">
                  <div
                    style={{ zIndex: isShowClinicalExamPopover ? 0 : "auto" }}
                    className="accordion"
                    id="accordionExample"
                  >
                    <div
                      className="accordion-item"
                      style={{
                        zIndex: isShowClinicalExamPopover ? 0 : "auto",
                      }}
                    >
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingTwo"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          style={{
                            zIndex: isShowClinicalExamPopover ? 0 : "auto",
                          }}
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          Current Rx
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          {props?.patientPropsValue?.id === "" ? (
                            <p
                              style={{
                                fontSize: "13px",
                                marginLeft: "2%",
                                marginTop: "2%",
                                color: "red",
                              }}
                            >
                              Records are not available
                            </p>
                          ) : (
                            <>
                              {props.prescribedDrugs.length > 0 ? (
                                <div>
                                  <div className="rx-one-button-group d-flex justify-content-end MimsAlert">
                                    <button
                                      className="btn"
                                      onClick={() => {
                                        if (selectedMedicen.length > 0) {
                                          mimsAlertInformation();
                                        } else {
                                          Swal.fire(
                                            "Warning!",
                                            "Please select drugs for mims alert ",
                                            "warning"
                                          );
                                        }
                                      }}
                                    >
                                      MIMS Alert
                                    </button>
                                  </div>
                                  <MaterialTable
                                    columns={[
                                      {
                                        title: "Brand",
                                        field: "",
                                        render: (row) => (
                                          <div>{row?.brand_name}</div>
                                        ),
                                      },
                                      {
                                        title: "Drug",
                                        field: "drug_name",
                                        render: (row) => {
                                          return <div>{row?.drug_name}</div>;
                                        },
                                        cellStyle: {
                                          width: "35%",
                                        },
                                      },
                                      { title: "Dose", field: "dose" },
                                      {
                                        title: "Frequency",
                                        field: "frequency",
                                      },
                                      {
                                        title: "PRN",
                                        field: "prn",
                                      },
                                      {
                                        title: "Qty",
                                        field: "quantity",
                                      },
                                      {
                                        title: "Repeats",
                                        field: "repeats",
                                        render: (row) => {
                                          return (
                                            <div>
                                              {nullParser(row?.repeats)
                                                ? row?.repeats
                                                : 0}
                                            </div>
                                          );
                                        },
                                      },

                                      {
                                        title: "Act",
                                        render: (row) => (
                                          <>
                                            <div className="CurrentRxIcon">
                                              <img
                                                src={giveMedicine}
                                                alt=""
                                                onClick={() =>
                                                  handleMedicationModal(row)
                                                }
                                                className="img-fluid cursor-pointer"
                                              />
                                              <FaInfo
                                                className="PrescribedRxInfo mr-2"
                                                onClick={() => mimsInfo(row)}
                                              />
                                              <FaTrash
                                                className="PrescribedRxDelete"
                                                onClick={() => {
                                                  Swal.fire({
                                                    title:
                                                      "Rx Update (Current to Past)",
                                                    text: "Are you sure?",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor:
                                                      "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText:
                                                      "Yes, update it!",
                                                  }).then((result) => {
                                                    if (result.isConfirmed) {
                                                      axios
                                                        .put(
                                                          `current-to-past-rx/${row.id}`
                                                        )
                                                        .then((res) => {
                                                          if (
                                                            res.status == 200
                                                          ) {
                                                            props.setupdateState(
                                                              Math.random()
                                                            );
                                                          }
                                                        });
                                                      Swal.fire(
                                                        "Update!",
                                                        "Patient data has been updated.",
                                                        "success"
                                                      );
                                                    }
                                                  });
                                                }}
                                              />
                                            </div>
                                          </>
                                        ),
                                        cellStyle: {
                                          width: "10%",
                                        },
                                      },
                                    ]}
                                    data={props.prescribedDrugs}
                                    options={{
                                      selection: true,
                                      emptyRowsWhenPaging: false,
                                      showTitle: false,
                                      headerStyle: {
                                        backgroundColor: "#EEE",
                                        zIndex: -1,
                                      },
                                      rowStyle: {
                                        fontSize: "12px",
                                        width: "5%",
                                      },

                                      searchFieldStyle: {
                                        marginLeft: "-24px",
                                      },
                                    }}
                                    onSelectionChange={(rows) => {
                                      if (rows.length > 0) {
                                        setselectedMedicen(rows);
                                      } else {
                                        setselectedMedicen([]);
                                      }
                                      setalertboxArray([]);
                                    }}
                                  />
                                </div>
                              ) : (
                                <>
                                  {props?.nodatafoundPrescribedDrugs ? (
                                    <p
                                      style={{
                                        fontSize: "13px",
                                        marginLeft: "2%",
                                        marginTop: "2%",
                                        color: "red",
                                      }}
                                    >
                                      Records not available
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
                            </>
                          )}
                        </div>
                      </div>

                      <Modal
                        isOpen={alertmodelShow}
                        onRequestClose={alertmodelShow}
                        style={customStylesAleart}
                        contentLabel="Example Modal"
                      >
                        <span
                          className="float-end"
                          style={{
                            fontSize: "15px",
                            cursor: "pointer",
                            marginTop: "-5px",
                          }}
                          onClick={() => {
                            setalertmodelShow(false);
                            setalertboxArray([]);
                            setindexNumber(0);
                          }}
                        >
                          <i className="fal fa-times"></i>
                        </span>
                        <div className="alert-container">
                          <div className="d-flex">
                            {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["flug"] &&
                              alertboxArray[indexNumber].flug === "5" && (
                                <HtmlTooltip
                                  title="The interaction between these medications may be life-threatening or may cause permanent damage. These medications are not usually used concurrently; medical intervention may be required"
                                  placement="top"
                                  arrow
                                >
                                  <div
                                    className="SeverityFlug"
                                    style={{ background: "red" }}
                                  ></div>
                                </HtmlTooltip>
                              )}
                            {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["flug"] &&
                              alertboxArray[indexNumber].flug === "4" && (
                                <HtmlTooltip
                                  title="These medications may interact resulting in the potential deterioration of the patient's condition. The patient should be monitored for the possible manifestations of the interaction. Medical intervention or a change in therapy may be required."
                                  placement="top"
                                  arrow
                                >
                                  <div
                                    className="SeverityFlug"
                                    style={{ background: "orange" }}
                                  ></div>
                                </HtmlTooltip>
                              )}

                            {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["flug"] &&
                              alertboxArray[indexNumber].flug === "3" && (
                                <HtmlTooltip
                                  title="Clinical effects of the interaction are limited and may be bothersome but would not usually require a major change to therapy. The patient should be monitored for the possible manifestations of the interaction"
                                  placement="top"
                                  arrow
                                >
                                  <div
                                    className="SeverityFlug"
                                    style={{ background: "yellow" }}
                                  ></div>
                                </HtmlTooltip>
                              )}
                            {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["flug"] &&
                              alertboxArray[indexNumber].flug === "2" && (
                                <HtmlTooltip
                                  title="The interaction may occur based on the mechanism of action of the co-administered medicines. Be alert for increased or decreased effect, depending on the combination of medicines"
                                  placement="top"
                                  arrow
                                >
                                  <div
                                    className="SeverityFlug"
                                    style={{ background: "green" }}
                                  ></div>
                                </HtmlTooltip>
                              )}
                            <h6
                              className="text-danger text-center"
                              style={{
                                height: "50px",
                                width: " 95%",
                              }}
                            >
                              {alertboxArray.length > 0 &&
                                alertboxArray[indexNumber].name}
                            </h6>
                          </div>
                          <div className="alertDesc g-doc-scroll">
                            <h6>Probable Mechanism</h6>
                            <p className="text-justify mr-2">
                              {alertboxArray.length > 0 &&
                                alertboxArray[indexNumber].description}
                            </p>
                            {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["precaution"] && (
                                <h6>Action to be Taken</h6>
                              )}

                            {alertboxArray.length > 0 &&
                            alertboxArray[indexNumber]["precaution"] &&
                            Array.isArray(
                              alertboxArray[indexNumber].precaution
                            ) ? (
                              alertboxArray[indexNumber].precaution.map(
                                (preca, i) => {
                                  return (
                                    <ul key={i}>
                                      <li>{preca.Professional}</li>
                                    </ul>
                                  );
                                }
                              )
                            ) : alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["precaution"] &&
                              typeof alertboxArray[indexNumber].precaution ===
                                "object" ? (
                              <ul>
                                <li>
                                  {
                                    alertboxArray[indexNumber].precaution
                                      .Professional
                                  }
                                </li>
                              </ul>
                            ) : (
                              ""
                            )}

                            {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["References"] && (
                                <h6>References</h6>
                              )}

                            <div className="references">
                              {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["References"] &&
                              Array.isArray(
                                alertboxArray[indexNumber].References
                                  .ElectronicReference
                              ) ? (
                                alertboxArray[
                                  indexNumber
                                ].References.ElectronicReference.map(
                                  (ref, i) => {
                                    return (
                                      <ul key={i}>
                                        <li>{`${ref.Title}. ${ref.RefTitle}. ${
                                          ref.SystemName
                                        }. ${
                                          typeof ref.SystemAuthor === "string"
                                            ? ref.SystemAuthor
                                            : ""
                                        }. ${ref.SystemManf}. ${
                                          ref.SystemManfLoc
                                        }. ${
                                          ref.SystemManfCountry
                                        }. Available from URL : ${
                                          ref.URL
                                        } (Accessed on ${ref.Date})`}</li>
                                      </ul>
                                    );
                                  }
                                )
                              ) : alertboxArray.length > 0 &&
                                alertboxArray[indexNumber]["References"] &&
                                typeof alertboxArray[indexNumber].References
                                  .ElectronicReference === "object" ? (
                                <ul>
                                  <li>{`${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.Title
                                  }. ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.RefTitle
                                  }. ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.SystemName
                                  }. ${
                                    typeof alertboxArray[indexNumber].References
                                      .ElectronicReference.SystemAuthor ===
                                    "string"
                                      ? alertboxArray[indexNumber].References
                                          .ElectronicReference.SystemAuthor
                                      : ""
                                  }. ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.SystemManf
                                  }. ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.SystemManfLoc
                                  }. ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.SystemManfCountry
                                  }. Available from URL : ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.URL
                                  } (Accessed on ${
                                    alertboxArray[indexNumber].References
                                      .ElectronicReference.Date
                                  })`}</li>
                                </ul>
                              ) : (
                                ""
                              )}

                              {alertboxArray.length > 0 &&
                              alertboxArray[indexNumber]["References"] &&
                              Array.isArray(
                                alertboxArray[indexNumber].References
                                  .JournalReference
                              ) ? (
                                alertboxArray[
                                  indexNumber
                                ].References.JournalReference.map((ref, i) => {
                                  return (
                                    <ul key={i}>
                                      <li>{`${ref.Author} ${ref.Title} ${ref.Year} ; ${ref.Volume} (${ref.Part}) : ${ref.Page}`}</li>
                                    </ul>
                                  );
                                })
                              ) : alertboxArray.length > 0 &&
                                alertboxArray[indexNumber]["References"] &&
                                typeof alertboxArray[indexNumber].References
                                  .JournalReference === "object" ? (
                                <ul>
                                  <li>
                                    {`${alertboxArray[indexNumber].References.JournalReference.Author} ${alertboxArray[indexNumber].References.JournalReference.Title} ${alertboxArray[indexNumber].References.JournalReference.Year} ; ${alertboxArray[indexNumber].References.JournalReference.Volume} (${alertboxArray[indexNumber].References.JournalReference.Part}) : ${alertboxArray[indexNumber].References.JournalReference.Page}`}
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="rx-one-button-group">
                          <div className="mt-1">
                            <button
                              onClick={() => {
                                if (indexNumber + 1 < alertboxArray.length) {
                                  setindexNumber(indexNumber + 1);
                                } else {
                                  closeModalAlert();
                                }
                              }}
                              className="btn float-end me-2"
                            >
                              Continue
                              <i className="fas fa-angle-right ms-2"></i>
                            </button>

                            {alertboxArray.length > 1 && (
                              <button
                                onClick={() => {
                                  if (indexNumber > 0) {
                                    setindexNumber(indexNumber - 1);
                                  } else {
                                    closeModalAlert();
                                  }
                                }}
                                className="btn float-end me-2"
                              >
                                <i className="fas fa-angle-left mr-2"></i>
                                Back
                              </button>
                            )}
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>

                  <div className="g-doc-text-editor mt-2">
                    <JoditEditor
                      style={{ height: "400px" }}
                      ref={editor}
                      value={doctorsNote}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setDoctrosNote(newContent)} // preferred to use only this option to update the content for performance reasons
                    />
                  </div>
                </div>
              )}

              {modalIsOpenMimsProduct && mimsData && (
                <MimsProductDetails
                  medicine={medicine}
                  modalIsOpenMimsProduct={modalIsOpenMimsProduct}
                  mimsData={mimsData}
                  closeModalMimsProduct={closeModalMimsProduct}
                ></MimsProductDetails>
              )}
              {props.element === "pastRx" && (
                <div className="rx">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingTwo"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          Past Rx
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          {props.PastPrescribedDrugs.length > 0 ? (
                            <div>
                              <MaterialTable
                                columns={[
                                  {
                                    title: "Brand",
                                    render: (row) => (
                                      <div>{row?.medicine?.macrohealth_sg}</div>
                                    ),
                                    cellStyle: {
                                      width: "31%",
                                    },
                                  },
                                  {
                                    title: "Drug",
                                    render: (row) => (
                                      <div>{row?.medicine?.mims_sg}</div>
                                    ),
                                  },
                                  { title: "Dose", field: "dose" },
                                  {
                                    title: "Qty",
                                    field: "quantity",
                                  },

                                  {
                                    title: "Prescribed",
                                    field: "prescribedAs",
                                  },
                                  {
                                    title: "Time",
                                    field: "drugsTimeLimit",
                                  },
                                ]}
                                data={props.PastPrescribedDrugs}
                                options={{
                                  selection: true,
                                  emptyRowsWhenPaging: false,
                                  showTitle: false,
                                  headerStyle: {
                                    backgroundColor: "#EEE",
                                    zIndex: -1,
                                  },
                                  rowStyle: {
                                    fontSize: "12px",
                                    width: "5%",
                                  },
                                  searchFieldStyle: {
                                    marginLeft: "-24px",
                                  },
                                }}
                                onSelectionChange={(rows) =>
                                  setselectedMedicen(rows)
                                }
                              />
                            </div>
                          ) : (
                            <p
                              style={{
                                fontSize: "13px",
                                marginLeft: "2%",
                                marginTop: "2%",
                                color: "red",
                              }}
                            >
                              Records are not available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="g-doc-text-editor mt-2">
                    <JoditEditor
                      ref={editor}
                      value={doctorsNote}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setDoctrosNote(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {
                        // console.log("Data for Text editor", newContent)
                      }}
                    />
                  </div>
                </div>
              )}
              {props.element === "pastHistory" && (
                <PastHistory
                  setprocedureStateUpdate={setprocedureStateUpdate}
                  diagAndPastHistoriyStateUpdate={
                    diagAndPastHistoriyStateUpdate
                  }
                  setdiagAndPastHistoriyStateUpdate={
                    setdiagAndPastHistoriyStateUpdate
                  }
                  patient_id={props.patientPropsValue.id}
                />
              )}
              {props.element === "obstreaticHistory" && (
                <ObstreaticHistory
                  setpregnancyUpdate={setpregnancyUpdate}
                  patient_id={props.patientPropsValue.id}
                />
              )}
              {props.element === "immunisation" && (
                <Immunisation patient_id={props.patientPropsValue.id} />
              )}
              {props.element === "careSuggestion" && (
                <CareSuggestion patient_id={props.patientPropsValue.id} />
              )}
              {props.element === "pastVisit" && (
                <PastVisit
                  pastVisit={props.pastVisitList}
                  patient_id={props.patientPropsValue.id}
                />
              )}
              {props.element === "physicalActivity" && (
                <PhysicalActivityAdviceOutput
                  physicalActivity={props.physicalActivity}
                  patient_id={props.patientPropsValue.id}
                />
              )}
              {props.element === "antenatalVisit" && (
                <AntenatalVisitOutput
                  antenatalVisit={props.antenatalVisit}
                  patient_id={props.patientPropsValue.id}
                />
              )}
              {props.element === "procedureReport" && (
                <ProcedureReportHistory
                  patient_id={props.patientPropsValue.id}
                  procedureReport={props.procedureReport}
                />
              )}
              {props.element === "dischargeSummary" && (
                <DischargeSummaryHistory
                  patient_id={props.patientPropsValue.id}
                  dischargeSummary={props?.dischargeSummary}
                />
              )}
              {props.element === "eyePrescription" && (
                <EyePrescription
                  patient_id={props.patientPropsValue.id}
                  eyePrescription={props?.eyePrescription}
                  prescriptionTemplate={prescriptionTemplate}
                />
              )}
              {props.element === "doctorRound" && (
                <DoctorRoundOutput patient_id={props?.patientPropsValue?.id} />
              )}
              {props.element === "DiabeticCharts" && (
                <DiabaticCharts
                  patient_id={props.patientPropsValue.id}
                  patient={props.patientPropsValue}
                />
              )}
              {props.element === "PathologyResults" && (
                <PathologyResultsOutput
                  patient_id={props.patientPropsValue.id}
                  patient={props.patientPropsValue}
                />
              )}
              {props.element === "UrineResult" && (
                <UrineResultOutput
                  patient_id={props.patientPropsValue.id}
                  patient={props.patientPropsValue}
                />
              )}
              <div className="g-doc-patient-history mt-1">
                {showPatientHistory ? (
                  <div
                    className="g-doc-patient-history-small p-2"
                    style={{
                      position: "relative",
                    }}
                  >
                    <div className="row">
                      <div className="col-4 d-flex">
                        <h6 className="">Care by : </h6>
                        <p className="ms-1">
                          {usual_provider?.usual_provider_name}
                        </p>
                      </div>
                      <div className="col-4 d-flex">
                        <h6 className="">Referred by : </h6>
                        <p className="ms-1">
                          {props?.patientPropsValue?.patient_head_of_family}
                        </p>
                      </div>
                      <div className="col-4 d-flex">
                        <h6 className="">Seen by : </h6>
                        {props?.patientPropsValue?.id && (
                          <p className="ms-1">{docdata?.fullName}</p>
                        )}
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                        >
                          <img
                            onClick={() =>
                              setShowPatientHistory(!showPatientHistory)
                            }
                            src={accIcon}
                            alt=""
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="g-doc-patient-history-large p-2"
                    style={{
                      position: "relative",
                    }}
                  >
                    <div className="row">
                      <div className="col-4">
                        <div className="d-flex">
                          <h6>Care by : </h6>
                          <p className="ms-1">
                            {usual_provider?.usual_provider_name}
                          </p>
                        </div>
                        <div className="d-flex">
                          <h6>Date : </h6>
                          <p className="ml-2">
                            {moment(StartTime)?.format("DD/MM/YYYY") ===
                            "Invalid date"
                              ? "N/A"
                              : moment(StartTime)?.format("DD/MM/YYYY")}
                          </p>
                        </div>
                      </div>
                      <div className="col-4 d-flex">
                        <h6 className="">Referred by : </h6>
                        <p className="ms-1">
                          {props?.patientPropsValue?.patient_head_of_family}
                        </p>
                      </div>
                      <div className="col-4">
                        <div className="d-flex">
                          <h6>Seen by : </h6>
                          <p className="ms-1">{docdata?.fullName}</p>
                        </div>
                        <div className="d-flex">
                          <h6>Time : </h6>
                          <p className="ml-2">
                            {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                          }}
                        >
                          <img
                            onClick={() =>
                              setShowPatientHistory(!showPatientHistory)
                            }
                            src={accIcon}
                            alt="arow"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          isOpen={procedureModelShow}
          onRequestClose={closeProcedurModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <span className="float-end" onClick={closeProcedurModal}>
            <i className="fal fa-times digonasisCloseModel"></i>
          </span>
          <div className="procedure-container mt-2">
            <div className="d-flex align-items-start">
              <div
                className="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className={`${
                    navMenuActiveClass === "Diagnosis"
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Diagnosis
                </button>
                <button
                  className={`${
                    navMenuActiveClass === "Procedure"
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Procedure
                </button>
                <button
                  className={`${
                    navMenuActiveClass === "Reason for Visit"
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Reason For Visit
                </button>
                <button
                  className={`${
                    navMenuActiveClass === "Review"
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-autofeel"
                  aria-selected="false"
                >
                  Review
                </button>
                <button
                  className={`${
                    navMenuActiveClass === "Auto Fill"
                      ? "nav-link active"
                      : "nav-link"
                  }`}
                  id="v-pills-autofeel-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-autofeel"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-autofeel"
                  aria-selected="false"
                >
                  Auto Fill
                </button>
              </div>
              <div
                className="tab-content w-100"
                id="v-pills-tabContent"
                style={{ border: "none" }}
              >
                <div
                  className={`${
                    navMenuActiveClass === "Diagnosis"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }`}
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  {/* ----------------------------------------!
          ------------------Diagnosis-------------- 
          -------------------------------------------*/}

                  <div
                    style={{
                      display: "flex",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      justifyContent: "space-between",
                      padding: "5px 5px",
                      marginTop: "0px",
                      boxShadow: "1px 1px 2px #d2d2d2",
                      borderRadius: "5px",
                      paddingTop: "10px",
                      background: "#FFFFFF",
                    }}
                  >
                    <h6 style={{ fontSize: "14px" }}>Diagnosis</h6>
                    <img
                      src={diagnosisImg}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>

                  <div className="row w-100 diagnosisBoxes">
                    <div className="col-md-6">
                      <div
                        className="me-2"
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          marginTop: "20px",
                          padding: "10px",
                          borderRadius: "5px",
                          boxShadow: "1px 1px 2px #d2d2d2",
                          background: "#FFFFFF",
                        }}
                      >
                        <div className="row mt-2">
                          <div className="col-3">
                            <p style={{ paddingTop: "8px" }}>Diagnosis</p>
                          </div>
                          <div className="col-9">
                            <ReactSearchAutocomplete
                              showIcon={true}
                              placeholder={"Search Diagnosis"}
                              items={diagonis}
                              resultStringKeyName="DiagnosisProcedure_name"
                              onSelect={(item) => {
                                setDiagnosis({
                                  ...diagnosis,
                                  diagnosis_name: item.DiagnosisProcedure_name,
                                  code: item.DiagnosisProcedure_code,
                                });
                              }}
                              fuseOptions={{
                                keys: ["DiagnosisProcedure_name"],
                              }} // Search in the description text as well
                              styling={{
                                borderRadius: "5px !important",
                                zIndex: 3,
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            onChange={handleDiagnosisChecbox}
                            type="checkbox"
                            name="diagnosis_provitional_status"
                            checked={diagnosisChecked}
                          />
                          <label
                            style={{ marginLeft: "15px", marginTop: "10px" }}
                          >
                            Provitional Diagnosis
                          </label>
                        </div>
                        <div className="form-group purple-border">
                          <label for="exampleFormControlTextarea4">
                            Further Details
                          </label>

                          <ReactSearchAutocomplete
                            showIcon={true}
                            placeholder={"Search"}
                            items={procedure}
                            resultStringKeyName="DiagnosisProcedure_name"
                            onSelect={(item) => {
                              setDiagnosis({
                                ...diagnosis,
                                diagnosis_further_details:
                                  item.DiagnosisProcedure_name,
                              });
                            }}
                            fuseOptions={{ keys: ["DiagnosisProcedure_name"] }} // Search in the description text as well
                            styling={{
                              borderRadius: "5px !important",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="col-md-6"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        marginTop: "22px",
                        boxShadow: "1px 1px 2px #d2d2d2",
                        background: "#FFFFFF",
                      }}
                    >
                      <div>
                        <div>
                          <h6
                            style={{
                              fontSize: "14px",
                              lineHeight: "20px",
                            }}
                          >
                            Active List
                          </h6>
                          <hr />
                        </div>
                        <table className="diagnosis-table">
                          <tr className="diagnosis-table-row diagnosis-head">
                            <th width="15%">Date</th>
                            <th width="40%">Diagnosis </th>
                            <th width="40%">Details</th>
                            <th width="5%">Act</th>
                          </tr>
                          {pastHistory.map((item, i) => {
                            return (
                              <tr className="diagnosis-table-row" key={i}>
                                <td>{moment(item.date).format("MMM Do")}</td>
                                <td>{item.condition}</td>
                                <td>{item.details}</td>
                                <td>
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                    style={{
                                      color: "red",
                                      cursor: "pointer",
                                      marginLeft: "3px",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();

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
                                          axios
                                            .delete(
                                              `/past-history-delete/${item.id}`
                                            )
                                            .then((res) => {
                                              setdiagAndPastHistoriyStateUpdate(
                                                Math.random()
                                              );
                                            });
                                          Swal.fire(
                                            "Deleted!",
                                            "Your data has been deleted.",
                                            "success"
                                          );
                                        }
                                      });
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          onClick={addDiagnosisList}
                          style={{
                            background: "#69B128",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "10px",
                            marginTop: "10px",
                            width: "100px",
                            height: "30px",
                            marginLeft: "75%",
                            boxShadow: "1px 1px 2px #d2d2d2",
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/*!!!!!---------------------- Procedure-------------------!!!!! */}

                <div
                  className={`${
                    navMenuActiveClass == "Procedure"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }`}
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      justifyContent: "space-between",
                      padding: "5px 5px",
                      marginTop: "0px",
                      boxShadow: "1px 1px 2px #d2d2d2",
                      borderRadius: "5px",
                      paddingTop: "10px",
                      background: "#FFFFFF",
                    }}
                  >
                    <h6 style={{ fontSize: "14px" }}>Procedure</h6>
                    <img
                      src={procedureImg}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>

                  <div className="row w-100 mt-2">
                    <div className="col-md-5">
                      <div
                        className="me-2"
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          padding: "10px",
                          borderRadius: "5px",
                          boxShadow: "1px 1px 2px #d2d2d2",
                          background: "#FFFFFF",
                        }}
                      >
                        <div className="row mt-2">
                          <div className="col-3">
                            <p
                              style={{
                                paddingTop: "2px",
                                fontSize: "14px",
                              }}
                            >
                              Procedure
                            </p>
                          </div>
                          <div className="col-9">
                            <ReactSearchAutocomplete
                              showIcon={true}
                              placeholder={"Search Diagnosis"}
                              items={procedure}
                              resultStringKeyName="DiagnosisProcedure_name"
                              onSelect={(value) => {
                                setProcedureData({
                                  ...procedureData,
                                  procedure_name: value.DiagnosisProcedure_name,
                                });
                              }}
                              fuseOptions={{
                                keys: ["DiagnosisProcedure_name"],
                              }} // Search in the description text as well
                              styling={{
                                borderRadius: "5px !important",
                                zIndex: 3,
                              }}
                            />
                          </div>
                        </div>

                        <div className="form-group purple-border">
                          <label for="exampleFormControlTextarea4">
                            Further Details
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea4"
                            rows="3"
                            placeholder="Write Here"
                            onChange={handleProcedureInput}
                            value={procedureData.procedure_further_details}
                            name="procedure_further_details"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-7"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        boxShadow: "1px 1px 2px #d2d2d2",
                        background: "#FFFFFF",
                      }}
                    >
                      <div className="">
                        <div>
                          <h6
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            List
                          </h6>
                          <hr />
                        </div>

                        <table className="diagnosis-table">
                          <tbody>
                            <tr className="procedure-table-row">
                              <td width="13%">Date</td>
                              <td width="45%">Procedure</td>
                              <td width="30%">Further Details</td>
                              <td width="5%">Act</td>
                            </tr>
                            {procedureList.map((item, i) => {
                              return (
                                <tr className="diagnosis-table-row" key={i}>
                                  <td>
                                    {moment(item.created_at).format("Do MMM")}
                                  </td>
                                  <td>{item.procedure_name}</td>
                                  <td>{item.procedure_further_details}</td>
                                  <td>
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                      style={{ color: "red" }}
                                      onClick={() => {
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
                                            axios
                                              .post(
                                                `/delete-great-doc-procedure/${item.id}`
                                              )
                                              .then((res) => {
                                                setprocedureStateUpdate(
                                                  Math.random()
                                                );
                                              });
                                            Swal.fire(
                                              "Deleted!",
                                              "Your data has been deleted.",
                                              "success"
                                            );
                                          }
                                        });
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <button
                          style={{
                            background: "#69B128",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "10px",
                            marginTop: "30px",
                            width: "100px",
                            height: "30px",
                            marginLeft: "58%",
                            boxShadow: "1px 1px 2px #d2d2d2",
                          }}
                          onClick={addProcedureList}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/*!!!!!---------------------- Reason For Visit -------------------!!!!! */}

                <div
                  className={`${
                    navMenuActiveClass === "Reason for Visit"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }`}
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      justifyContent: "space-between",
                      padding: "5px 5px",
                      marginTop: "0px",
                      boxShadow: "1px 1px 2px #d2d2d2",
                      borderRadius: "5px",
                      paddingTop: "10px",
                      background: "#FFFFFF",
                    }}
                  >
                    <h6 style={{ fontSize: "14px" }}>Reason For Visit</h6>
                    <img
                      src={procedureImg}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>

                  <div className="row w-100 mt-2">
                    <div className="col-md-5">
                      <div
                        className="me-2"
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.2)",
                          padding: "10px",
                          borderRadius: "5px",
                          boxShadow: "1px 1px 2px #d2d2d2",
                          background: "#FFFFFF",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "5px",
                          }}
                        >
                          <p style={{ textAlign: "left", marginBottom: "0px" }}>
                            Reason For Visit
                          </p>
                          <div
                            className="diagnosisSelectBox search-reason-for-visit"
                            style={{ width: "100%" }}
                          >
                            <ReactSearchAutocomplete
                              showIcon={true}
                              placeholder={"Search Reason For Visit"}
                              items={reson}
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
                              onHover={(item) =>
                                setresonForVisitData({
                                  ...resonForVisitData,
                                  code: item?.DiagnosisProcedure_code,
                                  reson_name: item?.DiagnosisProcedure_name,
                                })
                              }
                              onSelect={(item) => {
                                setresonForVisitData({
                                  ...resonForVisitData,
                                  code: item?.DiagnosisProcedure_code,
                                  reson_name: item?.DiagnosisProcedure_name,
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
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <p
                            style={{ paddingTop: "10px", marginBottom: "0px" }}
                          >
                            Visit Type
                          </p>
                          <select
                            onChange={handleResonInput}
                            name="reson_for_name"
                            value={resonForVisitData.reson_for_name}
                            className="form-select"
                          >
                            <option>Select</option>
                            {resonFor.map((item, i) => {
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
                        </div>
                        <div className="form-group purple-border">
                          <p
                            style={{ paddingTop: "10px", marginBottom: "0px" }}
                          >
                            Future Details
                          </p>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea4"
                            rows="3"
                            placeholder="Write Here"
                            name="reson_further_details"
                            value={resonForVisitData.reson_further_details}
                            onChange={handleResonInput}
                          ></textarea>
                        </div>
                        <button
                          onClick={() => addResonList()}
                          style={{
                            background: "#69B128",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "10px",
                            width: "100px",
                            height: "30px",
                            marginLeft: "65%",
                            boxShadow: "1px 1px 2px #d2d2d2",
                          }}
                        >
                          save
                        </button>
                      </div>
                    </div>
                    <div
                      className="col-md-7"
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        boxShadow: "1px 1px 2px #d2d2d2",
                        background: "#FFFFFF",
                      }}
                    >
                      <div className="">
                        <div>
                          <h6
                            style={{
                              fontSize: "14px",
                              marginLeft: "10px",
                            }}
                          >
                            List
                          </h6>
                          <hr />
                        </div>

                        <table className="diagnosis-table">
                          <tbody>
                            <tr className="procedure-table-row">
                              <td width="15%">Date</td>
                              <td width="45%">Reason For</td>
                              <td width="20%">Visit Type</td>
                              <td width="20%">Details</td>
                              <td width="5%">Act</td>
                            </tr>
                            {resonList.map((item, i) => {
                              return (
                                <tr className="diagnosis-table-row" key={i}>
                                  <td>{moment(item.date).format("Do MMM")}</td>
                                  <td>{item.reson_name}</td>
                                  <td>{item.reson_for_name}</td>
                                  <td>{item.reson_further_details}</td>
                                  <td>
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        axios
                                          .delete(
                                            `delete-great-doc-reson/${item.id}`
                                          )
                                          .then((res) => {
                                            setstateUpdateReson(Math.random());
                                            toast.success(
                                              "Data delete sucessfully"
                                            );
                                          });
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6"></div>
                    </div>
                  </div>
                </div>

                {/* !!!!!!!!!-----------------------Review------------------!!!!!!!!!!!! */}

                <div
                  className={`${
                    navMenuActiveClass === "Review"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }`}
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      justifyContent: "space-between",
                      padding: "5px 5px",
                      marginTop: "0px",
                      boxShadow: "1px 1px 2px #d2d2d2",
                      borderRadius: "5px",
                      paddingTop: "10px",
                      background: "#FFFFFF",
                    }}
                  >
                    <h6 style={{ fontSize: "14px" }}>Review</h6>
                    <img
                      src={procedureImg}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>

                  <div className="reviewContainer">
                    <div className="row">
                      <div className="col-6">
                        <div className="row mb-3">
                          <label
                            for="colFormLabelSm"
                            className="col-sm-2 col-form-label col-form-label-sm"
                          >
                            Review
                          </label>
                          <div className="col-sm-10">
                            <select
                              className="form-select form-select-sm"
                              name="review_name"
                              value={review?.review_name}
                              onChange={(e) => {
                                setReview({
                                  ...review,
                                  review_name: e.target.value,
                                });
                              }}
                            >
                              <option>Select</option>
                              {allReviewName.map((item, i) => {
                                return (
                                  <option value={item.name} key={i}>
                                    {item.review_name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        {selectDateOrDuration === "date" ? (
                          <div className="row">
                            <label className="col-2 col-form-label col-form-label-sm">
                              On Date
                            </label>
                            <div className="col-10">
                              <input
                                type="date"
                                name="review_date"
                                className="form-control form-control-sm"
                                value={review?.date}
                                onChange={(e) =>
                                  setReview({ ...review, date: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <label className="col-2 mb-3 col-form-label col-form-label-sm">
                              Duration
                            </label>
                            <div className="col-4">
                              <input
                                type="number"
                                value={review?.limit}
                                placeholder="Write here"
                                className="form-control form-control-sm"
                                onChange={(e) =>
                                  setReview({
                                    ...review,
                                    limit: e.target.value,
                                    type: "",
                                  })
                                }
                              />
                            </div>
                            <div className="col-5">
                              <select
                                className="form-select form-select-sm"
                                value={review?.date_type}
                                onChange={(e) => {
                                  if (
                                    review.limit !== null &&
                                    e.target.value !== null
                                  ) {
                                    var currentDate = new Date();

                                    const countDays =
                                      Number(review?.limit) *
                                      Number(e.target.value);

                                    currentDate.setDate(
                                      currentDate.getDate() + countDays
                                    );
                                    var formattedDate = currentDate
                                      .toISOString()
                                      .slice(0, 10);
                                    setReview({
                                      ...review,
                                      date_type: e.target.value,
                                      date: formattedDate,
                                    });
                                  }
                                }}
                              >
                                <option>Select</option>
                                <option value="1">Days</option>
                                <option value="7">Weeks</option>
                                <option value="30">Months</option>
                                <option value="365">Years</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-6">
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label col-form-label-sm">
                            Select
                          </label>
                          <div className="col-10">
                            <div className="row">
                              <div className="col-6">
                                <input
                                  type="radio"
                                  className="mt-2"
                                  name="selectDate"
                                  defaultChecked
                                  onClick={() =>
                                    setselectDateOrDuration("date")
                                  }
                                ></input>
                                <label className="ms-2">Date</label>
                              </div>
                              <div className="col-6">
                                <input
                                  type="radio"
                                  className="mt-2"
                                  name="selectDate"
                                  onClick={() =>
                                    setselectDateOrDuration("duration")
                                  }
                                ></input>
                                <label className="ms-2">Duration</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label col-form-label-sm">
                            Note
                          </label>
                          <div className="col-10">
                            <textarea
                              name="note"
                              rows="3"
                              value={review?.note}
                              placeholder="Write here"
                              className="form-control"
                              onChange={(e) =>
                                setReview({ ...review, note: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="review-btn">
                        <button
                          className="review-btn-left"
                          onClick={submitReview}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* !!!!!!!!!-----------------------AutoFeel------------------!!!!!!!!!!!! */}
                <div
                  className={`${
                    navMenuActiveClass === "Auto Fill"
                      ? "tab-pane fade show active"
                      : "tab-pane fade"
                  }`}
                  id="v-pills-autofeel"
                  role="tabpanel"
                  aria-labelledby="v-pills-autofeel-tab"
                >
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      justifyContent: "space-between",
                      padding: "5px 5px",
                      marginTop: "0px",
                      boxShadow: "1px 1px 2px #d2d2d2",
                      borderRadius: "5px",
                      paddingTop: "10px",
                      background: "#FFFFFF",
                    }}
                  >
                    <h6 style={{ fontSize: "14px" }}>Auto Fill</h6>
                    <img
                      src={autoFeelImg}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>
                  <div>
                    <div className="autofeelContainer mt-2">
                      <div className="row">
                        <div className="col-md-9">
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "10px",
                              }}
                            >
                              <p style={{ paddingTop: "10px" }}>
                                Auto Fill Entries
                              </p>
                              <select
                                onChange={handleAutoFillInput}
                                name="auto_fill_id"
                                value={autoFillData.auto_fill_id}
                                className="form-select diagnosisSelectBox"
                              >
                                <option>Select</option>
                                {autoFill.map((item, i) => {
                                  return (
                                    <option key={i} value={item.id}>
                                      {item.autoFill_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="form-group purple-border">
                              <label for="exampleFormControlTextarea4">
                                Text
                              </label>
                              <div className="autoFeelTextArea">
                                <textarea
                                  className="form-control "
                                  ref={disabledElement2}
                                  id="exampleFormControlTextarea4 disableRef1"
                                  rows="3"
                                  placeholder="Text"
                                  value={autoFillDependent.autofillText}
                                  name="autofillText"
                                  onChange={handleDisableValueChange}
                                  disabled
                                ></textarea>
                              </div>
                            </div>
                            <div className="form-group purple-border">
                              <label for="exampleFormControlTextarea4">
                                History
                              </label>
                              <div
                                className="autoFeelTextArea"
                                style={{ marginTop: "-40px" }}
                              >
                                <textarea
                                  className="form-control "
                                  ref={disabledElement1}
                                  id="exampleFormControlTextarea4 disableRef2"
                                  rows="3"
                                  placeholder="History"
                                  value={autoFillDependent.autofillHistory}
                                  name="autofillHistory"
                                  onChange={handleDisableValueChange}
                                  disabled
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="autofeelButton">
                            <button>Add</button> <br />
                            <button onClick={editHandleAutoFillChange}>
                              Edit
                            </button>
                            <br />
                            <button>Delete</button> <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="autofeelSaveCancelBtn">
                    <button className="float-end ms-3">Cancel</button>
                    <button className="float-end" onClick={submitAutoFill}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* Manage Modal  */}
        <ManagementModal
          manageModalIsOpen={manageModalIsOpen}
          setManageModalIsOpen={setManageModalIsOpen}
          advises={advises}
          setAdvises={setAdvises}
        />
        {/* Medication Modal */}
        <AddMedicationChartModal
          isOpen={medicationChartAddModalIsOpen}
          onClose={handleChartModalClose}
          appId={props?.appId}
          doctorId={docdata?.id || null}
          patientId={props?.patientPropsValue?.id || null}
          data={medication}
        />
        <MedicationChartModal
          isOpen={medicationChartModalIsOpen}
          onClose={() => setMedicationChartModalIsOpen(false)}
          appId={props?.appId}
          doctorId={docdata?.id || null}
          patient={props?.patientPropsValue || null}
          data={props?.prescribedDrugs || []}
        />
      </div>
    </>
  );
};

export default GreatDocPatientDetail;

// ==================== Manage Modal

const ManagementModal = ({
  manageModalIsOpen,
  setManageModalIsOpen,
  advises,
  setAdvises,
}) => {
  const tabLabels = [
    {
      id: 1,
      label: "advice",
    },
    {
      id: 2,
      label: "management",
    },
  ];
  const editor = useRef(null);
  const [addBtnLoading, setAddBtnLoading] = useState(false);
  const { width } = useResizeObserver();
  const userData = useUserData();

  const [refetch, setRefetch] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [tabLabel, setTabLabel] = useState(tabLabels[0]);
  const onRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    const getAdvises = async () => {
      const res = await axios.get(
        "advise-for-greatdoc-prescription-show/" + userData?.user_id
      );
      if (res.status === 200) {
        const modifiedData = res.data?.advise.map((ad) => ({
          ...ad,
          check: ad.check === 0 ? false : true,
        }));
        setAdvises(modifiedData);
      }
    };

    getAdvises();
    return () => {};
  }, [refetch, manageModalIsOpen, userData?.user_id]);

  const [managementNote, setMangementNote] = useState(
    `<p><span style="font-family: Georgia, serif; color: rgb(102, 102, 102);">Managment ....</span></p>`
  );

  const saveMangement = () => {
    // console.log("ddf", managementNote)
  };

  const handleAdviseSubmit = async (e) => {
    e.preventDefault();
    setAddBtnLoading(true);
    try {
      const data = {
        advise_name: e.target.advise_name.value || "",
        doctor_id: userData?.user_id,
      };
      const res = await axios.post("advise-for-greatdoc-prescription", data);
      if (res.status === 201) {
        onRefetch();
        toast.success("Advise Added Successfully");
        e.target.reset();
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.error(error);
    } finally {
      setAddBtnLoading(false);
    }
  };

  const saveAdviseValues = async () => {
    setIsChecking(true);
    try {
      const data = [...advises];
      const res = await axios.put(
        "advise-for-greatdoc-prescription-update",
        data
      );
      if (res.status === 200) {
        onRefetch();
        toast.success("Updated Successfully");
      }
    } catch (error) {
      toast.error("somthing went wrong");
      console.error(error);
    } finally {
      setIsChecking(false);
    }
  };

  const signleAdviseStyles = {
    display: "flex",
    gap: "5px",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const deleteAdvise = async (id) => {
    try {
      const res = await axios.delete(`advise-for-greatdoc-prescription/${id}`);
      if (res.status === 200) {
        onRefetch();
        toast.success("Advise Deleted Successfully");
      }
    } catch (error) {
      toast.error("something went wrong");
      console.error(error);
    }
  };

  const handleCheck = (e, id) => {
    const findAdvise = advises.find((advise) => advise.id === id);
    if (findAdvise) {
      setAdvises((prev) =>
        prev.map((advise) =>
          advise.id === id ? { ...advise, check: e.target.checked } : advise
        )
      );
    }
  };
  const isAllChecked =
    advises.length === advises.filter((item) => item.check).length ||
    advises.filter((item) => item.check).length === 0;

  const handleCheckAll = (e) => {
    setAdvises((prev) =>
      prev.map((advise) => ({ ...advise, check: e.target.checked }))
    );
  };
  const checkboxStyle = {
    display: isAllChecked ? "block" : "none",
  };

  const containerStyle = {
    display: "flex",
    width: width > 900 ? "75%" : "100%",
    alignItems: "center",
    gap: "5px",
    marginBottom: "-10px",
  };
  const onClose = () => {
    setManageModalIsOpen(false);
  };

  return (
    <>
      <CustomModal isOpen={manageModalIsOpen} onClose={onClose}>
        <CustomModal.Header onClose={onClose}>
          <CustomModal.Title>Management</CustomModal.Title>
        </CustomModal.Header>
        <CustomModal.Body>
          <div
            className="management-header-tab"
            style={{
              width: "550px",
              marginBottom: "30px",
            }}
          >
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-advise-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-advise"
                  type="button"
                  role="tab"
                  onClick={() =>
                    setTabLabel(
                      tabLabels.find(
                        (item) => item?.label?.toString() === "advice"
                      )
                    )
                  }
                  aria-controls="pills-advise"
                  aria-selected="false"
                >
                  Advice
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-management-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-management"
                  type="button"
                  role="tab"
                  aria-controls="pills-management"
                  aria-selected="true"
                  onClick={() =>
                    setTabLabel(
                      tabLabels?.find(
                        (item) => item?.label?.toString() === "management"
                      )
                    )
                  }
                >
                  Management
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content" id="pills-tabContent">
            {/*============== advise  start ===== */}
            <div
              className="tab-pane fade  active show"
              id="pills-advise"
              role="tabpanel"
              aria-labelledby="pills-advise-tab"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <form
                  onSubmit={handleAdviseSubmit}
                  className="d-flex justify-content-between align-items-center gap-2"
                  style={{
                    width: width > 900 ? "75%" : "100%",
                  }}
                >
                  <input
                    type="text"
                    name="advise_name"
                    id="advise"
                    required
                    width={"50%"}
                    className="form-control m-0"
                    placeholder="Enter advise name"
                  />
                  <div>
                    <Button isLoading={addBtnLoading} disabled={addBtnLoading}>
                      Add
                    </Button>
                  </div>
                </form>
                {advises.length === 0 ? (
                  <div className="text-center">No data available</div>
                ) : (
                  <div style={containerStyle}>
                    {advises?.length ===
                      advises?.filter((item) => item.check).length ||
                    advises?.filter((item) => item.check).length === 0 ? (
                      ""
                    ) : (
                      <label htmlFor="checkAll">
                        <MdIndeterminateCheckBox size={18} color="#005CC8" />
                      </label>
                    )}
                    <input
                      style={checkboxStyle}
                      onChange={handleCheckAll}
                      checked={
                        advises?.filter((ad) => ad.check).length ===
                        advises.length
                      }
                      type="checkbox"
                      id="checkAll"
                    />
                    <label htmlFor="checkAll">Check all advice</label>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    alignItems: "center",
                    width: width > 900 ? "75%" : "100",
                    overflowY: "auto",
                    height: "250px",
                  }}
                  className="simple-scrollbar"
                >
                  {advises?.map((item, index) => (
                    <div key={index} style={signleAdviseStyles}>
                      <div className="d-flex align-items-center gap-1">
                        <input
                          type="checkbox"
                          id={item?.id}
                          onChange={(e) => handleCheck(e, item?.id)}
                          checked={item?.check}
                        />
                        <label className="m-0 p-0" htmlFor={item?.id}>
                          {item?.advise_name}
                        </label>
                      </div>
                      <button
                        style={{
                          all: "unset",
                          fontSize: "12px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteAdvise(item?.id)}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    width: width > 900 ? "75%" : "100%",
                    margin: "10px auto",
                  }}
                ></div>
              </div>
            </div>
            {/*============== advise  end ===== */}
            {/*============== management  start ===== */}
            <div
              className="tab-pane fade show"
              id="pills-management"
              role="tabpanel"
              aria-labelledby="pills-management-tab"
            >
              {/* <h6 className="text-center">Management</h6> */}
              <JoditEditor
                style={{ height: "100%" }}
                ref={editor}
                value={managementNote}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setMangementNote(newContent)}
                onChange={(newContent) => {}}
              />
            </div>
            {/*============== management  End ===== */}
          </div>
        </CustomModal.Body>
        <CustomModal.Footer>
          <Button onClick={() => onClose()}>Cancel</Button>
          {tabLabel?.label === "management" && (
            <Button onClick={saveMangement}>Save</Button>
          )}
          {tabLabel?.label === "advice" && (
            <Button
              isLoading={isChecking}
              disabled={advises?.length > 0 ? false : true}
              onClick={saveAdviseValues}
            >
              Save
            </Button>
          )}
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
};
