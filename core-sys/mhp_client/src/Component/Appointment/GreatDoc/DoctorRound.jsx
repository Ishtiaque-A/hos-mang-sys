import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ReactDatePicker from "react-datepicker";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import Select from "react-select";
import { Popover } from "@mui/material";
import PathologyResultModal from "./DoctorRoundModals/PathologyResultModal";
import DrugSinceModal from "./DoctorRoundModals/DrugSinceModal";
import TreatmentProtocolModal from "./DoctorRoundModals/TreatmentProtocolModal";
import Button from "../../../common/components/Button";
import DiabeticChartModal from "./DoctorRoundModals/DiabeticChartModal";
import IntakeOutputModal from "./DoctorRoundModals/IntakeOutputModal";

import EcogModal from "./DoctorRoundModals/EcogModal";
import KpsModal from "./DoctorRoundModals/KpsModal";
export default function DoctorRound(props) {
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState({
    doctorId: "",
    residentId: "",
    protocolId: "",
    chiefCompliant: [],
    protocol: "",
    cycle: "",
    day: "",
    freshComplaint: "",
    consultants_advice: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [reasonForVisit, setReasonForVisit] = useState([]);
  const [currentAdmission, setCurrentAdmission] = useState({});
  // Morning round

  const [doctors, setDoctors] = useState([]);
  const [protocol, setProtocol] = useState([]);
  const [nailSignArray, setNailSignArray] = useState([]);
  const [urineanalysisArray1, seturineanalysisArray1] = useState([]);
  const [urineanalysisArray2, seturineanalysisArray2] = useState([]);
  const [allSetup, setAllSetup] = useState({});
  useEffect(() => {
    axios.get(`reason-for-visit-only`).then((res) => {
      console.log(res.data, "res");
      setReasonForVisit(res?.data?.reason);
    });
    axios.get("round-protocol-name").then((res) => {
      setProtocol(res.data || []);
    });
    axios.get(`patient-current-admission/${props?.patient?.id}`).then((res) => {
      setCurrentAdmission(res?.data?.data || {});
    });
    axios.get(`doctors`).then((res) => {
      setDoctors(res?.data?.doctors);
    });
    axios.get(`/nail-sign`).then((res) => {
      if (res.data.status === 200) {
        setNailSignArray(res.data.nailSign);
      }
    });
    axios.get(`/urine-analysis`).then((res) => {
      if (res.data.status === 200) {
        var i = res.data.urineanalysis.length / 2;

        const tem1 = res.data.urineanalysis.slice(0, i);
        seturineanalysisArray1(tem1);

        const tem2 = res.data.urineanalysis.slice(
          i,
          res.data.urineanalysis.length
        );
        seturineanalysisArray2(tem2);
      }
    });
    axios.get(`doctor-round-all-setup`).then((res) => {
      setAllSetup(res.data);
    });
  }, []);
  useEffect(() => {
    if (currentAdmission?.id) {
      axios
        .post(`todays-round`, {
          patient_id: props?.patient?.id,
          admission_id: currentAdmission?.id,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setData({
              ...data,
              protocolId: res?.data?.data?.protocolId,
              cycle: res?.data?.data?.cycle,
              day: res?.data?.data?.day,
              doctorId: res?.data?.data?.doctorId,
              residentId: res?.data?.data?.residentId,
              freshComplaint: res?.data?.data?.freshComplaint,
            });
          }
        });
    }
  }, [props?.patient?.id, currentAdmission?.id]);
  console.log(data, "data");
  const [searchReasonForVisit, setSearchReasonForVisit] = useState("");
  // history
  const [singleValue, setSingleValue] = useState({
    Anaemic: "",
    Jaundiced: "",
    Cyanosis: "",
    Skin: "",
  });
  const [capillary, setCapillary] = useState("");
  const [dehydration, setDehydration] = useState("");
  const [radioFD, setRadio] = useState("");
  const [nailSign, setNailSign] = useState("");
  const [bloodSugerType, setBloodSugerType] = useState("");
  const [bloodSuger, setBloodSuger] = useState("");

  //urine
  const [urineLoading, setUrineLoading] = useState(false);
  const [urineDate, setUrineDate] = useState("");
  const [leucocytes, setLeucocytes] = useState("");
  const [nitrites, setNitrites] = useState("");
  const [bilirubin, setBilirubin] = useState("");
  const [ketones, setKetones] = useState("");
  const [urobiliongen, setUrobiliongen] = useState("");
  const [glucose, setGlucose] = useState("");
  const [protein, setProtein] = useState("");
  const [specificGravity, setSpecificGravity] = useState("");
  const [ph, setPh] = useState("");
  const [color, setColor] = useState("");

  const handleSaveUrineResult = () => {
    setUrineLoading(true);
    axios
      .post(`save-doctor-round-urine-result`, {
        patient_id: props?.patient?.id,
        doctor_id: props?.doctorId,
        appointment_id: props?.appId,
        admission_id: currentAdmission?.id,
        date: urineDate,
        leucocyte: leucocytes,
        nitrites: nitrites,
        bilirubin: bilirubin,
        ketones: ketones,
        urobilinogen: urobiliongen,
        glucose: glucose,
        protein: protein,
        specific_gravity: specificGravity,
        ph: ph,
        color: color,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setUrineLoading(false);
          toast.success("Urine Result saved successfully");
          setUrineDate("");
          setLeucocytes("");
          setNitrites("");
          setBilirubin("");
          setKetones("");
          setUrobiliongen("");
          setGlucose("");
          setProtein("");
          setSpecificGravity("");
          setPh("");
          setColor("");
          setChange16(false);
        } else {
          setUrineLoading(false);
          toast.error("Something went wrong");
        }
      });
  };
  //urine

  const addSigleValue = (e) => {
    const { name, value } = e.target;
    setSingleValue({ ...singleValue, [name]: value });
  };
  //history Search
  const [doctorRoundData, setDoctorRoundData] = useState({
    mucositis: [],
    abdomen: [],
    abdominalGuard: "",
    chest: [],
    skin: [],
    cns: [],
    cvs: [],
    ecog_scale: "",
  });
  const [intakeOutput, setIntakeOutput] = useState({
    inputDate: "",
    inputTime: "",
    oral: "",
    ivFluid: "",
    fluidTime: "",
    injection: "",
    totalIntake: "",
    totalOutput: "",
    outputDate: "",
    outputTime: "",
    urine: "",
    drain: "",
    vomit: "",
    others: "",
    balance: "",
  });
  const handleIntake = (e) => {
    const { name, value } = e.target;
    setIntakeOutput({
      ...intakeOutput,
      [name]: value,
    });
  };
  //
  const handleChangeMultiple = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      setDoctorRoundData({
        ...doctorRoundData,
        [name]: [...doctorRoundData[name], value],
      });
    } else {
      setDoctorRoundData({
        ...doctorRoundData,
        [name]: doctorRoundData[name].filter((item) => item !== value),
      });
    }
  };
  //
  const [change, setChange] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //
  const [change1, setChange1] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;
  //
  const [change2, setChange2] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  //
  const [change3, setChange3] = useState(false);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;
  //
  const [change4, setChange4] = useState(false);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);
  const id4 = open4 ? "simple-popover" : undefined;
  //
  const [change5, setChange5] = useState(false);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const open5 = Boolean(anchorEl5);
  const id5 = open5 ? "simple-popover" : undefined;
  //
  const [change6, setChange6] = useState(false);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const open6 = Boolean(anchorEl6);
  const id6 = open6 ? "simple-popover" : undefined;
  //
  //
  const [change7, setChange7] = useState(false);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const open7 = Boolean(anchorEl7);
  const id7 = open7 ? "simple-popover" : undefined;
  //
  //
  const [change8, setChange8] = useState(false);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
  //
  //
  const [change9, setChange9] = useState(false);
  const [anchorEl9, setAnchorEl9] = useState(null);
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;
  //
  //
  const [change10, setChange10] = useState(false);
  const [anchorEl10, setAnchorEl10] = useState(null);
  const open10 = Boolean(anchorEl10);
  const id10 = open10 ? "simple-popover" : undefined;
  //
  //
  const [change11, setChange11] = useState(false);
  const [anchorEl11, setAnchorEl11] = useState(null);
  const open11 = Boolean(anchorEl11);
  const id11 = open11 ? "simple-popover" : undefined;
  //
  //
  const [change12, setChange12] = useState(false);
  const [anchorEl12, setAnchorEl12] = useState(null);
  const open12 = Boolean(anchorEl12);
  const id12 = open12 ? "simple-popover" : undefined;
  //
  //
  const [change13, setChange13] = useState(false);
  const [anchorEl13, setAnchorEl13] = useState(null);
  const open13 = Boolean(anchorEl13);
  const id13 = open13 ? "simple-popover" : undefined;
  //
  //
  const [change14, setChange14] = useState(false);
  const [anchorEl14, setAnchorEl14] = useState(null);
  const open14 = Boolean(anchorEl14);
  const id14 = open14 ? "simple-popover" : undefined;
  //
  //
  const [change15, setChange15] = useState(false);
  const [anchorEl15, setAnchorEl15] = useState(null);
  const open15 = Boolean(anchorEl15);
  const id15 = open15 ? "simple-popover" : undefined;
  //
  //
  const [change16, setChange16] = useState(false);
  const [anchorEl16, setAnchorEl16] = useState(null);
  const open16 = Boolean(anchorEl16);
  const id16 = open16 ? "simple-popover" : undefined;
  //
  //
  const [change17, setChange17] = useState(false);
  const [anchorEl17, setAnchorEl17] = useState(null);
  const open17 = Boolean(anchorEl17);
  const id17 = open17 ? "simple-popover" : undefined;
  //
  //
  const [change18, setChange18] = useState(false);
  const [anchorEl18, setAnchorEl18] = useState(null);
  const open18 = Boolean(anchorEl18);
  const id18 = open18 ? "simple-popover" : undefined;
  //
  //
  const [change20, setChange20] = useState(false);
  const [anchorEl20, setAnchorEl20] = useState(null);
  const open20 = Boolean(anchorEl20);
  const id20 = open20 ? "simple-popover" : undefined;
  //
  const [change21, setChange21] = useState(false);
  const [anchorEl21, setAnchorEl21] = useState(null);
  const open21 = Boolean(anchorEl21);
  const id21 = open21 ? "simple-popover" : undefined;
  //
  const [change22, setChange22] = useState(false);
  const [anchorEl22, setAnchorEl22] = useState(null);
  const open22 = Boolean(anchorEl22);
  const id22 = open22 ? "simple-popover" : undefined;
  //
  const [change23, setChange23] = useState(false);
  const [anchorEl23, setAnchorEl23] = useState(null);
  const open23 = Boolean(anchorEl23);
  const id23 = open23 ? "simple-popover" : undefined;
  //
  const [change24, setChange24] = useState(false);
  const [anchorEl24, setAnchorEl24] = useState(null);
  const open24 = Boolean(anchorEl24);
  const id24 = open24 ? "simple-popover" : undefined;
  //
  const [change25, setChange25] = useState(false);
  const [anchorEl25, setAnchorEl25] = useState(null);
  const open25 = Boolean(anchorEl25);
  const id25 = open25 ? "simple-popover" : undefined;
  //
  const [change26, setChange26] = useState(false);
  const [anchorEl26, setAnchorEl26] = useState(null);
  const open26 = Boolean(anchorEl26);
  const id26 = open26 ? "simple-popover" : undefined;
  //
  const [change27, setChange27] = useState(false);
  const [anchorEl27, setAnchorEl27] = useState(null);
  const open27 = Boolean(anchorEl27);
  const id27 = open27 ? "simple-popover" : undefined;
  //
  const [change28, setChange28] = useState(false);
  const [anchorEl28, setAnchorEl28] = useState(null);
  const open28 = Boolean(anchorEl28);
  const id28 = open28 ? "simple-popover" : undefined;
  //
  const [change29, setChange29] = useState(false);
  const [anchorEl29, setAnchorEl29] = useState(null);
  const open29 = Boolean(anchorEl29);
  const id29 = open29 ? "simple-popover" : undefined;
  //
  const [change30, setChange30] = useState(false);
  const [anchorEl30, setAnchorEl30] = useState(null);
  const open30 = Boolean(anchorEl30);
  const id30 = open30 ? "simple-popover" : undefined;
  //
  const [change31, setChange31] = useState(false);
  const [anchorEl31, setAnchorEl31] = useState(null);
  const open31 = Boolean(anchorEl31);
  const id31 = open31 ? "simple-popover" : undefined;
  //
  const [change32, setChange32] = useState(false);
  const [anchorEl32, setAnchorEl32] = useState(null);
  const open32 = Boolean(anchorEl32);
  const id32 = open32 ? "simple-popover" : undefined;
  //
  const [change33, setChange33] = useState(false);
  const [anchorEl33, setAnchorEl33] = useState(null);
  const open33 = Boolean(anchorEl33);
  const id33 = open33 ? "simple-popover" : undefined;

  const [inputGeneral, setInputGeneral] = useState({
    pulse: "",
    respiratoryRate: "",
    o2saturation: "",
    sitting_left: "",
    sitting_right: "",
    standing_left: "",
    standing_right: "",
    lying_left: "",
    lying_right: "",
    weight: "",
    height: "",
    BMI: "",
    waist_measurement: "",
    hip_measurement: "",
    WHR: "",
    temp: "",
  });

  // history

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [loading, setLoading] = useState(false);
  const handleSave = () => {
    const postData = {
      ...data,
      patient_id: props?.patient?.id,
      doctor_id: storageData?.user_id,
      appointment_id: props?.appId,
      admission_id: currentAdmission?.id,
      investigation: data?.investigation?.toString(),
      ...inputGeneral,
      ...singleValue,
      capillary_refill: capillary,
      nail_sign: nailSign,
      dehydration: dehydration,
      radio_femoral_delay: radioFD,
      mucositis: doctorRoundData?.mucositis?.toString(),
      ecog_scale: doctorRoundData?.ecog_scale,
      kps_scale: doctorRoundData?.kps_scale,
      abdomen: doctorRoundData?.abdomen?.toString(),
      abdominal_guard: doctorRoundData?.abdominalGuard,
      skin: doctorRoundData?.skin?.toString(),
      cns: doctorRoundData?.cns?.toString(),
      cvs: doctorRoundData?.cvs?.toString(),
      chest: doctorRoundData?.chest?.toString(),
      date: new Date(),
      bloodSugar: bloodSuger,
      bloodSugarType: bloodSugerType,
    };
    if (!postData?.doctorId) {
      toast.error("Please select consultant !");
      return;
    }
    if (!postData?.residentId) {
      toast.error("Please select resident !");
      return;
    }
    setLoading(true);
    axios
      .post(`save-doctor-round`, postData)
      .then((res) => {
        setLoading(false);
        toast.success("Saved Successfully");
        props?.setRoundModal(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  // Pathology Modal
  const [pathologyModal, setPathologyModal] = useState(false);
  const closePathologyModal = () => {
    setPathologyModal(false);
  };
  // Pathology Modal
  // DrugSince Modal
  const [drugSinceModal, setDrugSinceModal] = useState(false);
  const closeDrugSinceModal = () => {
    setDrugSinceModal(false);
  };
  // Protocol Modal
  const [protocolModal, setProtocolModal] = useState(false);
  const closeProtocolModal = () => {
    setProtocolModal(false);
  };
  // Protocol Modal
  // Diabetic Modal
  const [diabeticModal, setDiabeticModal] = useState(false);
  const closeDiabeticModal = () => {
    setDiabeticModal(false);
  };
  // Diabetic Modal
  // IntakeOutput Modal
  const [intakeOutputModal, setIntakeOutputModal] = useState(false);
  const closeIntakeOutputModal = () => {
    setIntakeOutputModal(false);
  };
  // ECOG Modal
  const [ecogModal, setECogModal] = useState(false);
  const closeECogModal = () => {
    setECogModal(false);
  };
  // KPS Modal
  const [kpsModal, setKPSModal] = useState(false);
  const closeKPSModal = () => {
    setKPSModal(false);
  };
  // KPS Modal
  // BSA
  const calculateBSAMosteller = (heightCm, weightKg) => {
    return Math.sqrt((heightCm * weightKg) / 3600).toFixed(2);
  };

  // DuBois and DuBois Formula
  const calculateBSADuBois = (heightCm, weightKg) => {
    return (
      0.007184 *
      Math.pow(weightKg, 0.425) *
      Math.pow(heightCm, 0.725)
    ).toFixed(2);
  };
  const [bsaType, setBsaType] = useState("dubois");
  useEffect(() => {
    const { height, weight } = inputGeneral;
    if (height && weight) {
      if (bsaType === "dubois") {
        const bsa = calculateBSADuBois(height, weight);
        setInputGeneral({ ...inputGeneral, body_surface_area: bsa });
      }
      if (bsaType === "mosteller") {
        const bsa = calculateBSAMosteller(height, weight);
        setInputGeneral({ ...inputGeneral, body_surface_area: bsa });
      }
    }
  }, [bsaType, inputGeneral?.height, inputGeneral?.weight]);
  // BSA
  console.log(doctorRoundData, "doctorRoundData");
  return (
    <>
      <div className="discharge-header">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h4 className="text-uppercase">{storageData?.organization_name}</h4>
            <h5 className="text-uppercase">Department of haematology</h5>
          </div>
        </div>
        <div className="procedure-patient-head-container d-flex justify-content-between mt-2">
          <div>
            <p>
              <span className="procedure-patient-head">Name</span>
              <span>: {props?.patient?.fullName}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="procedure-patient-head">Date</span>
              <span>: {moment().format("DD-MM-YYYY")}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="procedure-patient-head">Time</span>
              <span>: {moment().format("hh:mm")}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="procedure-patient-head">Day</span>
              <span>: {moment().format("dddd")}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="procedure-patient-head">PRN</span>
              <span>: {currentAdmission?.PRN} </span>
            </p>
          </div>
          <div>
            <p>
              <span className="procedure-patient-head">HN No</span>
              <span>: {props?.patient?.patient_hn_number}</span>
            </p>
          </div>
        </div>
        <div className="text-center my-1">
          <h6>Morning Round</h6>
        </div>
        <div className="discharge-data mt-2">
          <div className="row">
            <div className="col-4">
              <div className="row mt-2">
                <div className="col-3">
                  <label className="fw-bold">Consultant </label>
                </div>
                <div className="col-9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    name="color"
                    options={doctors}
                    getOptionLabel={(option) => option?.fullName}
                    getOptionValue={(option) => option?.id}
                    styles={ReactSelectStyles}
                    onChange={(e) => {
                      setData({
                        ...data,
                        doctorId: e?.id,
                        doctor: e?.fullName,
                      });
                    }}
                    value={doctors?.find(
                      (item) => Number(item?.id) === Number(data?.doctorId)
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row mt-2">
                <div className="col-3">
                  <label className="fw-bold">Resident </label>
                </div>
                <div className="col-9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    name="color"
                    options={doctors}
                    getOptionLabel={(option) => option?.fullName}
                    getOptionValue={(option) => option?.id}
                    styles={ReactSelectStyles}
                    onChange={(e) => {
                      setData({
                        ...data,
                        residentId: e?.id,
                        resident: e?.fullName,
                      });
                    }}
                    value={doctors?.find(
                      (item) => Number(item?.id) === Number(data?.residentId)
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row mt-2">
                <div className="col-3">
                  <label className="fw-bold">Protocol </label>
                </div>
                <div className="col-9">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isSearchable={true}
                    name="color"
                    options={protocol}
                    getOptionLabel={(option) => option?.name}
                    getOptionValue={(option) => option?.id}
                    styles={ReactSelectStyles}
                    onChange={(e) => {
                      setData({
                        ...data,
                        protocolId: e?.id,
                        protocol: e,
                      });
                    }}
                    value={protocol?.find(
                      (item) => Number(item?.id) === Number(data?.protocolId)
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Fresh Complaints
                  </label>
                </div>
                <div className="col-9">
                  <ReactSearchAutocomplete
                    showIcon={false}
                    placeholder={"Search Fresh Complaint"}
                    items={reasonForVisit}
                    resultStringKeyName="DiagnosisProcedure_name"
                    inputSearchString={searchReasonForVisit || ""}
                    onSearch={(value) => setSearchReasonForVisit(value)}
                    onSelect={(item) => {
                      setData({
                        ...data,
                        chiefCompliant: [
                          ...data?.chiefCompliant,
                          item?.DiagnosisProcedure_name,
                        ],
                        freshComplaint: data?.freshComplaint
                          ? data?.freshComplaint +
                            `${item?.DiagnosisProcedure_name} , `
                          : `${item?.DiagnosisProcedure_name} , `,
                      });
                      setSearchReasonForVisit("");
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
                  {/* {data?.chiefCompliant?.length > 0 &&
                    data?.chiefCompliant?.map((item, index) => (
                      <p key={index}>
                        {index + 1}. {item}
                        <span
                          className="ms-2 cursor-pointer discharge-summary-close"
                          onClick={() => removeChiefCompliant(item)}
                        >
                          <FaRegCircleXmark />
                        </span>
                      </p>
                    ))} */}
                </div>
              </div>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
              <div className="row mt-2">
                <div className="col-6">
                  <div className="row">
                    <div className="col-4">
                      <label className="fw-bold">Day </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="day"
                        value={data?.day}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-4">
                      <label className="fw-bold">Cycle </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="cycle"
                        value={data?.cycle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="history-main-header mb-lg-2">
            <textarea
              value={data?.freshComplaint}
              rows="3"
              name=""
              id=""
              onChange={(e) =>
                setData({ ...data, freshComplaint: e?.target?.value })
              }
              className="form-control form-control-sm "
              placeholder="Fresh complaints"
            ></textarea>
          </div>
          <div className="row">
            <div className="col-lg-3 g-2">
              <div className="mt-2 ">
                <div className=" exam-bg-white p-1">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Anaemic</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Anaemic"
                          value="Anaemic"
                          type="checkbox"
                          onChange={(e) => {
                            setChange30(!change30);
                            setSingleValue({ ...singleValue, Anaemic: "" });
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl30(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change30 && (
                          <Popover
                            id={id30}
                            open={open30}
                            anchorEl={anchorEl30}
                            onClose={() => setAnchorEl30(null)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {allSetup?.anaemic?.map((item) => (
                                <div key={item.id} className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value={item?.name}
                                    type="radio"
                                    name="Anaemic"
                                    onChange={addSigleValue}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item?.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="history-popup-value">
                    <p>{singleValue?.Anaemic}</p>
                  </div>
                </div>
              </div>
              {/* ddd */}
              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Jaundiced</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Jaundiced"
                          value="Jaundiced"
                          type="checkbox"
                          onChange={(e) => {
                            setChange31(!change31);
                            setSingleValue({ ...singleValue, Jaundiced: "" });
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl31(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change31 && (
                          <Popover
                            id={id31}
                            open={open31}
                            anchorEl={anchorEl31}
                            onClose={() => setAnchorEl31(null)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {allSetup?.jaundiced?.map((item) => (
                                <div key={item.id} className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value={item?.name}
                                    type="radio"
                                    name="Jaundiced"
                                    onChange={addSigleValue}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item?.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="history-popup-value">
                    <p>{singleValue?.Jaundiced}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Cyanosis</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Cyanosis"
                          value="Cyanosis"
                          type="checkbox"
                          onChange={(e) => {
                            setChange32(!change32);
                            setSingleValue({ ...singleValue, Cyanosis: "" });
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl32(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change32 && (
                          <Popover
                            id={id32}
                            open={open32}
                            anchorEl={anchorEl32}
                            onClose={() => setAnchorEl32(null)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {allSetup?.cyanosis?.map((item) => (
                                <div key={item.id} className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value={item?.name}
                                    type="radio"
                                    name="Cyanosis"
                                    onChange={addSigleValue}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item?.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="history-popup-value">
                    <p>{singleValue?.Cyanosis}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Skin Turgor</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Skin"
                          value="Skin Turgor"
                          type="checkbox"
                          onChange={(e) => {
                            setChange33(!change33);
                            setSingleValue({ ...singleValue, Skin: "" });
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl33(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change33 && (
                          <Popover
                            id={id33}
                            open={open33}
                            anchorEl={anchorEl33}
                            onClose={() => setAnchorEl33(null)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {allSetup?.skinTurgor?.map((item) => (
                                <div key={item.id} className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value={item?.name}
                                    type="radio"
                                    name="Skin"
                                    onChange={addSigleValue}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item?.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="history-popup-value">
                    <p>{singleValue?.Skin}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Capillary Refill</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Skin"
                          value="Capillary Refill"
                          type="checkbox"
                          onChange={(e) => {
                            setChange3(!change3);
                            setCapillary("");
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl3(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change3 && (
                          <Popover
                            id={id3}
                            open={open3}
                            anchorEl={anchorEl3}
                            onClose={() => setAnchorEl3(null)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              <div className="form-check ms-1">
                                <input
                                  className="form-check-input"
                                  value="Less than 3"
                                  type="radio"
                                  name="movement"
                                  onChange={(e) => setCapillary(e.target.value)}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  Less than 3 Sec
                                </label>
                              </div>
                              <div className="form-check ms-1">
                                <input
                                  className="form-check-input"
                                  value="Greater than 3"
                                  type="radio"
                                  name="movement"
                                  onChange={(e) => setCapillary(e.target.value)}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  More than 3 Sec
                                </label>
                              </div>
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="history-popup-value">
                    <p>{capillary}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Nail Sign</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Jaundiced"
                          value="Jaundiced"
                          type="checkbox"
                          onChange={(e) => {
                            setChange2(!change2);
                            setNailSign("");
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl2(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change2 && (
                          <Popover
                            id={id2}
                            open={open2}
                            anchorEl={anchorEl2}
                            onClose={() => setAnchorEl2(null)}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {nailSignArray.length > 0 &&
                                nailSignArray.map((item, i) => (
                                  <div key={i} className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value={item.nailSign_name}
                                      type="radio"
                                      name="cough1"
                                      onChange={(e) => {
                                        setNailSign(e.target.value);
                                      }}
                                      id="flexRadioDefault1"
                                    />
                                    <label className="form-check-label">
                                      {item.nailSign_name}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="history-popup-value">
                    <p>{nailSign}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p>Dehydration</p>
                    <label className="switch me-1">
                      <input
                        onChange={() => {
                          setChange(!change);
                          setDehydration("");
                        }}
                        type="checkbox"
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        className="slider round"
                      ></div>
                      {change && (
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={() => setAnchorEl(null)}
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <div className="left-popup">
                            <div className="form-check ms-1">
                              <input
                                className="form-check-input"
                                value="Mild"
                                type="radio"
                                name="cough1"
                                onChange={(e) => {
                                  setDehydration(e.target.value);
                                }}
                                id="flexRadioDefault1"
                              />
                              <label className="form-check-label">Mild</label>
                            </div>
                            <div className="form-check ms-1">
                              <input
                                className="form-check-input"
                                value="Moderate"
                                type="radio"
                                name="cough1"
                                onChange={(e) => setDehydration(e.target.value)}
                                id="flexRadioDefault1"
                              />
                              <label className="form-check-label">
                                Moderate
                              </label>
                            </div>
                            <div className="form-check ms-1">
                              <input
                                className="form-check-input"
                                value="Severe"
                                type="radio"
                                name="cough1"
                                onChange={(e) => setDehydration(e.target.value)}
                                id="flexRadioDefault1"
                              />
                              <label className="form-check-label">Severe</label>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                  <div className="history-popup-value">
                    <p>{dehydration}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p>Radio Femoral Delay</p>
                    <label className="switch me-1">
                      <input
                        onChange={() => {
                          setChange1(!change1);
                          setRadio("");
                        }}
                        type="checkbox"
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => setAnchorEl1(e.currentTarget)}
                        className="slider round"
                      ></div>
                      {change1 && (
                        <Popover
                          id={id1}
                          open={open1}
                          anchorEl={anchorEl1}
                          onClose={() => setAnchorEl1(null)}
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <div className="left-popup">
                            <div className="form-check ms-1">
                              <input
                                className="form-check-input"
                                value="Left"
                                type="radio"
                                name="cough1"
                                onChange={(e) => {
                                  setRadio(e.target.value);
                                }}
                                id="flexRadioDefault1"
                              />
                              <label className="form-check-label">Left</label>
                            </div>
                            <div className="form-check ms-1">
                              <input
                                className="form-check-input"
                                value="Right"
                                type="radio"
                                name="cough1"
                                onChange={(e) => setRadio(e.target.value)}
                                id="flexRadioDefault1"
                              />
                              <label className="form-check-label">Right</label>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                  <div className="history-popup-value">
                    <p>{radioFD}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p>Mucositis</p>
                    <label className="switch me-1">
                      <input
                        onChange={() => {
                          setChange5(!change5);
                          setDoctorRoundData({
                            ...doctorRoundData,
                            mucositis: [],
                          });
                        }}
                        type="checkbox"
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => setAnchorEl5(e.currentTarget)}
                        className="slider round"
                      ></div>
                      {change5 && (
                        <Popover
                          id={id5}
                          open={open5}
                          anchorEl={anchorEl5}
                          onClose={() => setAnchorEl5(null)}
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <div className="left-popup">
                            {allSetup?.mucositis?.map((item, index) => {
                              return (
                                <div key={index} className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value={item.name}
                                    type="checkbox"
                                    name="mucositis"
                                    onChange={handleChangeMultiple}
                                    id={`mucositis${index}`}
                                  />
                                  <label
                                    htmlFor={`mucositis${index}`}
                                    className="form-check-label"
                                  >
                                    {item.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                  <div className="history-popup-value">
                    <p>{doctorRoundData?.mucositis?.toString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p>ECOG Scale </p>
                    <label className="switch me-1">
                      <input
                        type="checkbox"
                        id="togBtn"
                        onChange={(e) => setECogModal(e.target.checked)}
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                  <div className="history-popup-value">
                    <p>
                      {doctorRoundData?.ecog
                        ? `Grade : ${doctorRoundData?.ecog?.grade}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p>KPS Scale </p>
                    <label className="switch me-1">
                      <input
                        type="checkbox"
                        id="togBtn"
                        onChange={(e) => setKPSModal(e.target.checked)}
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                  <div className="history-popup-value">
                    <p>
                      {doctorRoundData?.kps
                        ? `Grade : ${doctorRoundData?.kps?.grade}`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" mt-2">
                <div className="exam-bg-white p-1 mt-lg-">
                  <div className="d-flex justify-content-between">
                    <p>Pathology result</p>
                    <label className="switch me-1">
                      <input
                        onChange={(e) => {
                          setPathologyModal(e.target.checked);
                        }}
                        type="checkbox"
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => setAnchorEl7(e.currentTarget)}
                        className="slider round"
                      ></div>
                      {change7 && (
                        <Popover
                          id={id7}
                          open={open7}
                          anchorEl={anchorEl7}
                          onClose={() => setAnchorEl7(null)}
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <div className="left-popup">
                            <div style={{ width: "750px" }}>
                              <table
                                style={{ tableLayout: "auto" }}
                                className="past_rx_table"
                              >
                                <tbody>
                                  <tr>
                                    <td>Date</td>
                                    <td>APTT</td>
                                    <td>PT</td>
                                    <td>PC</td>
                                    <td>Blast%</td>
                                    <td>ANC</td>
                                    <td>Total count</td>
                                    <td>Hb gm/dl</td>
                                    <td>CRP</td>
                                    <td>Prolactin</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                  <div className="history-popup-value">
                    <p>{}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 mt-1">
              <div className="row exam-bg-white p-1">
                <div className="row">
                  <div className="col-4 p-1">
                    <div className="row">
                      <div className="col-lg-2 col-3">
                        <span>Temp:</span>
                      </div>
                      <div className="col-lg-8 col-7">
                        <input
                          onChange={(e) =>
                            setInputGeneral({
                              ...inputGeneral,
                              temp: e.target.value,
                            })
                          }
                          type="number"
                          className="form-control form-control-sm"
                        />
                      </div>
                      <div className="col-2">
                        <sup>o</sup> F
                      </div>
                    </div>
                  </div>
                  <div className="col-8 row">
                    <div className="col-8">
                      <div className="m-1 row">
                        <div className="col-5">
                          <label>
                            O<sub>2 </sub> Saturation
                          </label>
                        </div>
                        <div className="col-7">
                          <input
                            onChange={(e) =>
                              setInputGeneral({
                                ...inputGeneral,
                                o2saturation: e.target.value,
                              })
                            }
                            className="form-control form-control-sm"
                            type="number"
                            placeholder="/c"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <p className="pt-2">% on room air</p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-lg-2 col-3">
                      <label> Pulse</label>
                    </div>
                    <div className="col-7 col-lg-8">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            pulse: e.target.value,
                          })
                        }
                        className="form-control form-control-sm"
                        type="number"
                        placeholder="/min"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row me-1">
                    <div className="col-5">
                      <label> Respiratory rate</label>
                    </div>
                    <div className="col-7">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            respiratoryRate: e.target.value,
                          })
                        }
                        className="form-control form-control-sm ms-1"
                        type="number"
                        placeholder="/min"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="exam-bg-white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Blood Sugar</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange4(!change4);
                              setBloodSugerType("");
                              setBloodSuger("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl4(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change4 && (
                            <Popover
                              id={id4}
                              open={open4}
                              anchorEl={anchorEl4}
                              onClose={() => setAnchorEl4(null)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <div
                                style={{ width: "180px" }}
                                className="left-popup"
                              >
                                <div className="row">
                                  <div className="col-6">
                                    <div className="form-check ms-1">
                                      <input
                                        className="form-check-input"
                                        value="Fasting "
                                        type="radio"
                                        name="right"
                                        onChange={(e) => {
                                          setBloodSugerType(e.target.value);
                                        }}
                                        id="flexRadioDefault1"
                                      />
                                      <label className="form-check-label">
                                        Fasting
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <input
                                      onChange={(e) =>
                                        setBloodSuger(e.target.value)
                                      }
                                      type="text"
                                      className="form-control form-control-sm"
                                    />
                                  </div>
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Non Fasting"
                                      type="radio"
                                      name="right"
                                      onChange={(e) => {
                                        setBloodSugerType(e.target.value);
                                      }}
                                      id="flexRadioDefault1"
                                    />
                                    <label className="form-check-label">
                                      Non fasting
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p>
                        {bloodSugerType && `${bloodSugerType} : `} {bloodSuger}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row exam-bg-white p-1 mt-lg-2 mt-1">
                <h6>Blood Pressure</h6>
                <div className="col-lg-4 col-6">
                  <label> Sitting</label>
                  <div className="row">
                    <div className="col-4">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            sitting_left: e.target.value,
                          })
                        }
                        style={{ width: "84%" }}
                        type="number"
                        className="form-control form-control-sm d-inline"
                      />
                      <span> /</span>
                    </div>
                    <div className="col-4">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            sitting_right: e.target.value,
                          })
                        }
                        type="number"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-4">
                      <p className="mt-1">mm of Hg</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-6">
                  <label> Standing</label>
                  <div className="row">
                    <div className="col-4">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            standing_left: e.target.value,
                          })
                        }
                        style={{ width: "84%" }}
                        type="number"
                        className="form-control form-control-sm d-inline"
                      />
                      <span> /</span>
                    </div>
                    <div className="col-4">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            standing_right: e.target.value,
                          })
                        }
                        type="number"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-4">
                      <p className="mt-1">mm of Hg</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-6">
                  <label> Lying</label>
                  <div className="row">
                    <div className="col-4">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            lying_left: e.target.value,
                          })
                        }
                        style={{ width: "84%" }}
                        type="number"
                        className="form-control form-control-sm d-inline"
                      />
                      <span> /</span>
                    </div>
                    <div className="col-4">
                      <input
                        onChange={(e) =>
                          setInputGeneral({
                            ...inputGeneral,
                            lying_right: e.target.value,
                          })
                        }
                        type="number"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-4">
                      <p className="mt-1">mm of Hg</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row exam-bg-white p-1 mt-lg-2 mt-1">
                <div className="col-2">
                  <label>Weight (kg)</label>
                  <input
                    onChange={(e) =>
                      setInputGeneral({
                        ...inputGeneral,
                        weight: e.target.value,
                      })
                    }
                    type="number"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-2">
                  <label>Height (cm)</label>
                  <input
                    onChange={(e) => {
                      if (e.target.value) {
                        setInputGeneral({
                          ...inputGeneral,
                          height: e.target.value,
                          BMI: (
                            inputGeneral?.weight /
                            Math.pow(e.target.value / 100, 2)
                          ).toFixed(1),
                        });
                      } else {
                        setInputGeneral({ ...inputGeneral, BMI: "" });
                      }
                    }}
                    type="number"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-3">
                  <label>BMI</label>
                  <div className="row">
                    <div className="col-9">
                      <input
                        value={inputGeneral.BMI}
                        type="text"
                        readOnly
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-3">
                      <p className="mt-1">
                        Kg/m <sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <label>BSA</label>
                  <div className="row">
                    <div className="col-9">
                      <input
                        value={inputGeneral?.body_surface_area}
                        type="text"
                        readOnly
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-3">
                      <p className="mt-1">
                        m <sup>2</sup>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="mt-3">
                    <input
                      className="custom-radio"
                      value="dubois"
                      type="radio"
                      name="bsa"
                      onChange={(e) => {
                        setBsaType(e.target.value);
                      }}
                      id="flexRadioDefault1"
                      checked={bsaType === "dubois"}
                    />
                    <label className="">Dubois and Dubois</label>
                  </div>
                  <div className="">
                    <input
                      className="custom-radio"
                      value="mosteller"
                      type="radio"
                      name="bsa"
                      onChange={(e) => {
                        setBsaType(e.target.value);
                      }}
                      checked={bsaType === "mosteller"}
                      id="flexRadioDefault1"
                    />
                    <label className="">Mosteller</label>
                  </div>
                </div>
              </div>
              <div className="row exam-bg-white p-1 mt-lg-2 mt-1">
                <div className="col-4">
                  <label>Waist Measurement</label>
                  <input
                    onChange={(e) => {
                      setInputGeneral({
                        ...inputGeneral,
                        waist_measurement: e.target.value,
                      });
                    }}
                    type="number"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-4">
                  <label>Hip Measurement</label>
                  <input
                    onChange={(e) => {
                      if (e.target.value) {
                        setInputGeneral({
                          ...inputGeneral,
                          hip_measurement: e.target.value,
                          WHR: (
                            inputGeneral.waist_measurement / e.target.value
                          ).toFixed(2),
                        });
                      } else {
                        setInputGeneral({ ...inputGeneral, WHR: "" });
                      }
                    }}
                    type="number"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="col-4">
                  <label>WHR</label>
                  <input
                    value={inputGeneral.WHR}
                    disabled
                    type="text"
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>CNS</p>
                      <label className="switch me-1">
                        <input
                          onChange={() => {
                            setChange10(!change10);
                            setDoctorRoundData({
                              ...doctorRoundData,
                              cns: [],
                            });
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl10(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change10 && (
                          <Popover
                            id={id10}
                            open={open10}
                            anchorEl={anchorEl10}
                            onClose={() => setAnchorEl10(null)}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup ">
                              {allSetup?.cns?.map((item, index) => {
                                return (
                                  <div key={index} className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value={item?.name}
                                      type="checkbox"
                                      name="cns"
                                      onChange={handleChangeMultiple}
                                      id={`cns${index}`}
                                    />
                                    <label
                                      htmlFor={`cns${index}`}
                                      className="form-check-label"
                                    >
                                      {item?.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                    <div className="history-popup-value">
                      <p>{doctorRoundData?.cns?.toString()}</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>CVS</p>
                      <label className="switch me-1">
                        <input
                          onChange={() => {
                            setChange6(!change6);
                            setDoctorRoundData({
                              ...doctorRoundData,
                              cvs: [],
                            });
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl6(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change6 && (
                          <Popover
                            id={id6}
                            open={open6}
                            anchorEl={anchorEl6}
                            onClose={() => setAnchorEl6(null)}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {allSetup?.cvs?.map((item, index) => {
                                return (
                                  <div key={index} className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value={item.name}
                                      type="checkbox"
                                      name="cvs"
                                      onChange={handleChangeMultiple}
                                      id={`cvs${index}`}
                                    />
                                    <label
                                      htmlFor={`cvs${index}`}
                                      className="form-check-label"
                                    >
                                      {item?.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                    <div className="history-popup-value">
                      <p>{doctorRoundData?.cvs?.toString()}</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Chest</p>
                      <label className="switch me-1">
                        <input
                          onChange={() => {
                            setChange9(!change9);
                            setDoctorRoundData({
                              ...doctorRoundData,
                              chest: [],
                            });
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl9(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change9 && (
                          <Popover
                            id={id9}
                            open={open9}
                            anchorEl={anchorEl9}
                            onClose={() => setAnchorEl9(null)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <div className="left-popup ">
                              {allSetup?.chest?.map((item, index) => {
                                return (
                                  <div key={index} className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value={item.name}
                                      type="checkbox"
                                      name="chest"
                                      onChange={handleChangeMultiple}
                                      id={`chest${index}`}
                                    />
                                    <label
                                      htmlFor={`chest${index}`}
                                      className="form-check-label"
                                    >
                                      {item.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                    <div className="history-popup-value">
                      <p>{doctorRoundData?.chest?.toString()}</p>
                    </div>
                  </div>
                </div>

                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Abdomen</p>
                      <label className="switch me-1">
                        <input
                          onChange={() => {
                            setChange8(!change8);
                            setDoctorRoundData({
                              ...doctorRoundData,
                              abdominalGuard: "",
                              abdomen: [],
                            });
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl8(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change8 && (
                          <Popover
                            id={id8}
                            open={open8}
                            anchorEl={anchorEl8}
                            onClose={() => setAnchorEl8(null)}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup ">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-6">
                                    <label htmlFor="">Abdominal Girth</label>
                                  </div>
                                  <div className="col-6 d-flex">
                                    <input
                                      type="text"
                                      className="form-control form-control-sm"
                                      onChange={(e) => {
                                        setDoctorRoundData({
                                          ...doctorRoundData,
                                          abdominalGuard: e.target.value,
                                        });
                                      }}
                                    />
                                    <span className="ms-1">cm</span>
                                  </div>
                                </div>
                                {allSetup?.abdomen?.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="form-check ms-1"
                                    >
                                      <input
                                        className="form-check-input"
                                        value={item.name}
                                        type="checkbox"
                                        name="abdomen"
                                        onChange={handleChangeMultiple}
                                        id={`abdomen${index}`}
                                      />
                                      <label
                                        htmlFor={`abdomen${index}`}
                                        className="form-check-label"
                                      >
                                        {item.name}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                    <div className="history-popup-value">
                      <p>
                        {doctorRoundData?.abdominalGuard
                          ? `Abdominal Girth : ${doctorRoundData?.abdominalGuard}`
                          : ""}
                      </p>
                      <p>{doctorRoundData?.abdomen?.toString()}</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Skin</p>
                      <label className="switch me-1">
                        <input
                          onChange={() => {
                            setChange11(!change11);
                            setDoctorRoundData({
                              ...doctorRoundData,
                              skin: [],
                            });
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => setAnchorEl11(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change11 && (
                          <Popover
                            id={id11}
                            open={open11}
                            anchorEl={anchorEl11}
                            onClose={() => setAnchorEl11(null)}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div className="left-popup">
                              {allSetup?.skin?.map((item, index) => {
                                return (
                                  <div key={index} className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value={item.name}
                                      type="checkbox"
                                      name="skin"
                                      onChange={handleChangeMultiple}
                                      id={`skin${index}`}
                                    />
                                    <label
                                      htmlFor={`skin${index}`}
                                      className="form-check-label"
                                    >
                                      {item.name}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                    <div className="history-popup-value">
                      <p>{doctorRoundData?.skin?.toString()}</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Intake output</p>
                      <label className="switch me-1">
                        <input
                          onChange={(e) => {
                            setIntakeOutputModal(e.target.checked);
                          }}
                          type="checkbox"
                          id="togBtn"
                          checked={intakeOutputModal}
                        />
                        <div
                          // onClick={(e) => setAnchorEl11(e.currentTarget)}
                          className="slider round"
                        ></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Drug Since</p>
                      <label className="switch me-1">
                        <input
                          onChange={(e) => {
                            setDrugSinceModal(e.target.checked);
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Treatment Protocol</p>
                      <label className="switch me-1">
                        <input
                          onChange={(e) => {
                            setProtocolModal(e.target.checked);
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Urine result</p>
                      <label className="switch me-1">
                        <input
                          onChange={() => {
                            setChange16(!change16);
                          }}
                          type="checkbox"
                          id="togBtn"
                          checked={change16}
                        />
                        <div
                          onClick={(e) => setAnchorEl16(e.currentTarget)}
                          className="slider round"
                        ></div>
                        {change16 && (
                          <Popover
                            id={id16}
                            open={open16}
                            anchorEl={anchorEl16}
                            onClose={() => setAnchorEl16(null)}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                          >
                            <div className="left-popup">
                              <div style={{ width: "800px", height: "260px" }}>
                                <div className="row">
                                  <>
                                    <div className="col-4">
                                      <div className="exam-bg-white p-1 mb-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="">Date</p>
                                          <div className="ms-1">
                                            <ReactDatePicker
                                              id="patient_dob"
                                              placeholderText="DD/MM/YYYY"
                                              dateFormat={"dd/MM/yyyy"}
                                              name="requisition_no"
                                              maxDate={new Date()}
                                              style={{ padding: "10px" }}
                                              autoComplete="off"
                                              selected={urineDate || new Date()}
                                              onChange={(d) => setUrineDate(d)}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Leucocyte</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange20(!change20);
                                                  setLeucocytes("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl20(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change20 && (
                                                <Popover
                                                  id={id20}
                                                  open={open20}
                                                  anchorEl={anchorEl20}
                                                  onClose={() =>
                                                    setAnchorEl20(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setLeucocytes(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setLeucocytes(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{leucocytes}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Nitrites</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange21(!change21);
                                                  setNitrites("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl21(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change21 && (
                                                <Popover
                                                  id={id21}
                                                  open={open21}
                                                  anchorEl={anchorEl21}
                                                  onClose={() =>
                                                    setAnchorEl21(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setNitrites(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setNitrites(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{nitrites}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Bilirubin</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange22(!change22);
                                                  setBilirubin("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl22(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change22 && (
                                                <Popover
                                                  id={id22}
                                                  open={open22}
                                                  anchorEl={anchorEl22}
                                                  onClose={() =>
                                                    setAnchorEl22(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setBilirubin(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setBilirubin(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{bilirubin}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="exam-bg-white p-1">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Ketones</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange23(!change23);
                                                  setKetones("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl23(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change23 && (
                                                <Popover
                                                  id={id23}
                                                  open={open23}
                                                  anchorEl={anchorEl23}
                                                  onClose={() =>
                                                    setAnchorEl23(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setKetones(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setKetones(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{ketones}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Urobilinogen</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange24(!change24);
                                                  setUrobiliongen("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl24(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change24 && (
                                                <Popover
                                                  id={id24}
                                                  open={open24}
                                                  anchorEl={anchorEl24}
                                                  onClose={() =>
                                                    setAnchorEl24(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setUrobiliongen(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setUrobiliongen(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{urobiliongen}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Glucose</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange25(!change25);
                                                  setGlucose("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl25(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change25 && (
                                                <Popover
                                                  id={id25}
                                                  open={open25}
                                                  anchorEl={anchorEl25}
                                                  onClose={() =>
                                                    setAnchorEl25(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setGlucose(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setGlucose(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{glucose}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Protein</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange28(!change28);
                                                  setProtein("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl28(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change28 && (
                                                <Popover
                                                  id={id28}
                                                  open={open28}
                                                  anchorEl={anchorEl28}
                                                  onClose={() =>
                                                    setAnchorEl28(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Positive"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setProtein(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Positive
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="Negative"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setProtein(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        Negative
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{protein}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="exam-bg-white p-1">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">
                                            Specific Gravity
                                          </p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange26(!change26);
                                                  setSpecificGravity("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl26(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change26 && (
                                                <Popover
                                                  id={id26}
                                                  open={open26}
                                                  anchorEl={anchorEl26}
                                                  onClose={() =>
                                                    setAnchorEl26(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="1.005"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setSpecificGravity(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        1.005
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="1.010"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setSpecificGravity(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        1.010
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="1.015"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setSpecificGravity(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        1.015
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="1.020"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setSpecificGravity(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        1.020
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="1.025"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setSpecificGravity(
                                                            e.target.value
                                                          );
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        1.025
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{specificGravity}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Ph</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange27(!change27);
                                                  setPh("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl27(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change27 && (
                                                <Popover
                                                  id={id27}
                                                  open={open27}
                                                  anchorEl={anchorEl27}
                                                  onClose={() =>
                                                    setAnchorEl27(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="5.5"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setPh(e.target.value);
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        5.5
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="6"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setPh(e.target.value);
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        6
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="6.5"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setPh(e.target.value);
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        6.5
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="7"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setPh(e.target.value);
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        7
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="7.5"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setPh(e.target.value);
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        7.5
                                                      </label>
                                                    </div>
                                                    <div className="form-check ms-1">
                                                      <input
                                                        className="form-check-input"
                                                        value="8"
                                                        type="radio"
                                                        name="cough1"
                                                        onChange={(e) => {
                                                          setPh(e.target.value);
                                                        }}
                                                        id="flexRadioDefault1"
                                                      />
                                                      <label className="form-check-label">
                                                        8
                                                      </label>
                                                    </div>
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{ph}</p>
                                        </div>
                                      </div>
                                      <div className="exam-bg-white p-1 mt-2">
                                        <div className="d-flex justify-content-between">
                                          <p className="w-75">Color</p>
                                          <div className="ms-1">
                                            <label className="switch me-1">
                                              <input
                                                name="Jaundiced"
                                                value="Jaundiced"
                                                type="checkbox"
                                                onChange={(e) => {
                                                  setChange29(!change29);
                                                  setColor("");
                                                }}
                                                id="togBtn"
                                              />
                                              <div
                                                onClick={(e) =>
                                                  setAnchorEl29(e.currentTarget)
                                                }
                                                className="slider round"
                                              ></div>
                                              {change29 && (
                                                <Popover
                                                  id={id29}
                                                  open={open29}
                                                  anchorEl={anchorEl29}
                                                  onClose={() =>
                                                    setAnchorEl29(null)
                                                  }
                                                  anchorOrigin={{
                                                    vertical: "bottom",
                                                    horizontal: "right",
                                                  }}
                                                  transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "right",
                                                  }}
                                                >
                                                  <div className="left-popup">
                                                    {urineanalysisArray2.length >
                                                      0 &&
                                                      urineanalysisArray2.map(
                                                        (item, i) => (
                                                          <div className="form-check ms-1">
                                                            <input
                                                              className="form-check-input"
                                                              value={
                                                                item.urineanalysis_name
                                                              }
                                                              type="radio"
                                                              name="cough1"
                                                              onChange={(e) => {
                                                                setColor(
                                                                  e.target.value
                                                                );
                                                              }}
                                                              id="flexRadioDefault1"
                                                            />
                                                            <label className="form-check-label">
                                                              {
                                                                item.urineanalysis_name
                                                              }
                                                            </label>
                                                          </div>
                                                        )
                                                      )}
                                                  </div>
                                                </Popover>
                                              )}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="history-popup-value">
                                          <p>{color}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end">
                                <Button
                                  isDisabled={urineLoading}
                                  onClick={handleSaveUrineResult}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-4 mt-2">
                  <div className="exam-bg-white p-1 mt-lg-">
                    <div className="d-flex justify-content-between">
                      <p>Diabetic chart</p>
                      <label className="switch me-1">
                        <input
                          onChange={(e) => {
                            setDiabeticModal(e.target.checked);
                          }}
                          type="checkbox"
                          id="togBtn"
                        />
                        <div
                          // onClick={(e) => setAnchorEl15(e.currentTarget)}
                          className="slider round"
                        ></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-7">
            <div className="row">
              <div className="col-2">
                <label htmlFor="" className="">
                  Consultants Advice
                </label>
              </div>
              <div className="col-10">
                <textarea
                  name="consultants_advice"
                  id=""
                  rows="3"
                  className="form-control"
                  placeholder="Consultants Advice"
                  value={data?.consultants_advice}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="report-btn2 mt-3 mb-5">
              <button
                disabled={loading}
                className="report-save-btn2"
                onClick={handleSave}
              >
                Save
              </button>
              {/* <button className="report-print-btn2" onClick={handlePrint}>
                Print
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <PathologyResultModal
        isOpen={pathologyModal}
        patientId={props?.patient?.id}
        doctorId={props?.doctorId}
        appId={props?.appId}
        onClose={closePathologyModal}
      />
      <DrugSinceModal
        isOpen={drugSinceModal}
        patientId={props?.patient?.id}
        doctorId={props?.doctorId}
        appId={props?.appId}
        admissionId={currentAdmission?.id}
        onClose={closeDrugSinceModal}
      />
      <TreatmentProtocolModal
        isOpen={protocolModal}
        patientId={props?.patient?.id}
        doctorId={props?.doctorId}
        appId={props?.appId}
        data={data?.protocolId}
        onClose={closeProtocolModal}
      />
      <DiabeticChartModal
        isOpen={diabeticModal}
        patientId={props?.patient?.id}
        doctorId={props?.doctorId}
        appId={props?.appId}
        onClose={closeDiabeticModal}
      />
      <IntakeOutputModal
        isOpen={intakeOutputModal}
        patientId={props?.patient?.id}
        doctorId={props?.doctorId}
        appId={props?.appId}
        admissionId={currentAdmission?.id}
        onClose={closeIntakeOutputModal}
      />
      <EcogModal
        isOpen={ecogModal}
        doctorRoundData={doctorRoundData}
        setDoctorRoundData={setDoctorRoundData}
        onClose={closeECogModal}
      />
      <KpsModal
        isOpen={kpsModal}
        doctorRoundData={doctorRoundData}
        setDoctorRoundData={setDoctorRoundData}
        onClose={closeKPSModal}
      />
    </>
  );
}
//
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
    // padding: "5px",
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
