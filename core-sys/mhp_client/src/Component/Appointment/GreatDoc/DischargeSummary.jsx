import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { getAge } from "../../../utils/getAge";
import ReactDatePicker from "react-datepicker";
import ReactSelect, { components as Base } from "react-select";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

export default function DischargeSummary(props) {
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const [data, setData] = useState({
    gpPractitioner: "",
    admissionDate: new Date(),
    dischargeDate: new Date(),
    dischargedTo: "",
    admittingDoctor: "",
    admittingDoctorPhone: "",
    chiefCompliant: [],
    history: "",
    investigation: [],
    diagnosis: [],
    operationNote: "",
    medicationList: "",
    painRelief: "",
    hygiene: "",
    exercise: "",
    dressing: "",
    woundCare: "",
    diet: "",
    recommendation: "",
    followUp: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const [investigations, setInvestigations] = useState([]);
  const [reasonForVisit, setReasonForVisit] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);
  const [procedureReport, setProcedureReport] = useState([]);
  const [painRelief, setPainRelief] = useState([]);
  const [woundCare, setWoundCare] = useState([]);
  const [hygiene, setHygiene] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [dressing, setDressing] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [followUp, setFollowUp] = useState([]);
  const [diet, setDiet] = useState([]);
  const [rx, setRx] = useState([]);
  const [testList, setTestList] = useState([]);
  const [discharge, setDischarge] = useState([]);
  useEffect(() => {
    axios.get(`reason-for-visit-only`).then((res) => {
      console.log(res.data, "res");
      setReasonForVisit(res?.data?.reason);
      setDiagnosis(res?.data?.diagnosis);
    });
    axios.get(`/procedure-report/${props?.patient?.id}`).then((res) => {
      setProcedureReport(res?.data?.report);
    });
    axios.get(`get-pescriped-dugs/${props?.patient?.id}`).then((res) => {
      setRx(res.data.drugs);
    });
    axios.get(`pain-relief`).then((res) => {
      setPainRelief(res.data);
    });
    axios.get(`wound-care`).then((res) => {
      setWoundCare(res.data);
    });
    axios.get(`hygiene`).then((res) => {
      setHygiene(res.data);
    });
    axios.get(`exercise`).then((res) => {
      setExercise(res.data);
    });
    axios.get(`dressing`).then((res) => {
      setDressing(res.data);
    });
    axios.get(`recommendation`).then((res) => {
      setRecommendation(res.data);
    });
    axios.get(`/followup-name`).then((res) => {
      if (res.data.status === 200) {
        setFollowUp(res.data.followupName);
      }
    });
    axios.get(`/diet-name`).then((res) => {
      if (res.data.status === 200) {
        setDiet(res.data.dietsName);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setTestList(res.data.test_name);
      }
    });
    axios
      .get(
        `/discharge-patients-report/${storageData?.user_id}/${props?.patient?.id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setInvestigations(res.data.patient_labs);
        }
      });
    axios.get(`/discharge-name`).then((res) => {
      if (res.data.status === 200) {
        setDischarge(res.data.dischargeName);
      }
    });
  }, []);
  const [searchReasonForVisit, setSearchReasonForVisit] = useState("");
  const [searchDiagnosis, setSearchDiagnosis] = useState("");
  const [searchTest, setSearchTest] = useState("");

  const removeChiefCompliant = (item) => {
    setData({
      ...data,
      chiefCompliant: data.chiefCompliant.filter((i) => i !== item),
    });
  };
  const removeDiagnosis = (item) => {
    setData({
      ...data,
      diagnosis: data.diagnosis.filter((i) => i !== item),
    });
  };
  const removeTest = (item) => {
    setData({
      ...data,
      investigation: data.investigation.filter((i) => i !== item),
    });
  };
  const [note, setNote] = useState({});
  const handleNote = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    const procedure = procedureReport.find((item) => item.id == e.target.value);
    setNote(procedure);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleSave = () => {
    // console.log(data, "data");
    console.log(rx, "rx data");
    // console.log(procedureReport, "testList");
    const postData = {
      ...data,
      patient_id: props?.patient?.id,
      doctor_id: storageData?.user_id,
      investigation: data?.investigation?.toString(),
      diagnosis: data?.diagnosis?.toString(),
      chiefCompliant: data?.chiefCompliant?.toString(),
      rx: rx,
      organization_id: storageData?.organization_id,
    };
    axios
      .post(`discharge-summary`, postData)
      .then((res) => {
        toast.success("Discharge Summary Saved Successfully");
        props.setDischargeModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <>
      <div className="discharge-header">
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <h3>{storageData?.organization_name}</h3>
            <h4>Discharge Summary (Confidential)</h4>
          </div>
        </div>
        <div className="procedure-patient-head-container d-flex justify-content-between">
          <div>
            <p>
              <span className="procedure-patient-head">Name</span>
              <span>: {props?.patient?.fullName}</span>
            </p>
            <p>
              <span className="procedure-patient-head">DOB</span>
              <span>
                : {moment(props?.patient?.patient_dob).format("DD/MM/YYYY")}
              </span>
            </p>
            <p>
              <span className="procedure-patient-head">HN No</span>
              <span>: {props.patient.patient_hn_number}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="procedure-patient-head">Sex</span>
              <span>: {props?.patient?.patient_birth_sex?.birth_sex_name}</span>
            </p>
            <p>
              <span className="procedure-patient-head">Age</span>
              <span>: {getAge(props?.patient?.patient_dob)}</span>
            </p>
          </div>
        </div>

        <div className="discharge-admission-data mt-2">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    General Practitioner
                  </label>
                </div>
                <div className="col-9">
                  <textarea
                    className="form-control"
                    name="gpPractitioner"
                    onChange={handleChange}
                    id=""
                  ></textarea>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Admitting Doctor
                  </label>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    name="admittingDoctor"
                    onChange={handleChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Admitting Doctor Phone
                  </label>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    name="admittingDoctorPhone"
                    onChange={handleChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Admission Date
                  </label>
                </div>
                <div className="col-9">
                  <ReactDatePicker
                    id="admissionDate"
                    placeholderText="DD/MM/YYYY"
                    selected={
                      data?.admissionDate ? new Date(data?.admissionDate) : null
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="admissionDate"
                    style={{ padding: "10px" }}
                    onChange={(d) =>
                      setData({
                        ...data,
                        admissionDate: d ? d : new Date(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Discharge Date
                  </label>
                </div>
                <div className="col-9">
                  <ReactDatePicker
                    id="dischargeDate"
                    placeholderText="DD/MM/YYYY"
                    selected={
                      data?.dischargeDate ? new Date(data?.dischargeDate) : null
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="dischargeDate"
                    style={{ padding: "10px" }}
                    onChange={(d) =>
                      setData({
                        ...data,
                        dischargeDate: d ? d : new Date(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Discharged To
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data.dischargedTo || "Select"}
                    options={discharge?.map((item) => ({
                      ...item,
                      value: item.name,
                      label: item.name,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({
                        ...data,
                        dischargedTo: stringValue?.toString(),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discharge-data">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Chief Complaint
                  </label>
                </div>
                <div className="col-9">
                  <ReactSearchAutocomplete
                    showIcon={false}
                    placeholder={"Search Chief Complaint"}
                    items={reasonForVisit}
                    resultStringKeyName="DiagnosisProcedure_name"
                    inputSearchString={searchReasonForVisit || ""}
                    onSearch={(value) => setSearchReasonForVisit(value)}
                    onSelect={(item) => {
                      setData({
                        ...data,
                        chiefCompliant: [
                          ...data.chiefCompliant,
                          item?.DiagnosisProcedure_name,
                        ],
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
                  {data?.chiefCompliant?.length > 0 &&
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
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discharge-data">
          <label htmlFor="" className="fw-bold">
            History
          </label>
          <textarea
            name="history"
            id=""
            onChange={handleChange}
            rows="3"
            className="form-control"
          ></textarea>
        </div>
        <div className="discharge-data mt-2">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Investigation
                  </label>
                </div>
                <div className="col-9">
                  <ReactSearchAutocomplete
                    showIcon={false}
                    placeholder={"Search Investigation"}
                    items={testList}
                    resultStringKeyName="test_name"
                    inputSearchString={searchTest || ""}
                    onSearch={(value) => setSearchTest(value)}
                    onSelect={(item) => {
                      setData({
                        ...data,
                        investigation: [...data.investigation, item?.test_name],
                      });
                      setSearchTest("");
                    }}
                    maxResults={5}
                    fuseOptions={{ keys: ["test_name"] }}
                    styling={{
                      borderRadius: "10px !important",
                      width: "100%",
                      zIndex: 1,
                      height: "34px",
                      boxShadow: "none !important",
                    }}
                  />
                  {data?.investigation?.length > 0 &&
                    data?.investigation?.map((item, index) => (
                      <p key={index}>
                        {index + 1}. {item}
                        <span
                          className="ms-2 cursor-pointer discharge-summary-close"
                          onClick={() => removeTest(item)}
                        >
                          <FaRegCircleXmark />
                        </span>
                      </p>
                    ))}
                  {/* <MultipleSelect
                    placeholder={data?.investigation || "Select"}
                    options={investigations.map((item) => ({
                      ...item,
                      value: item.title,
                      label: `${item.title} - ${moment(item.created_at).format(
                        "DD/MM/YYYY"
                      )}`,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, investigation: stringValue });
                    }}
                  /> */}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Diagnosis
                  </label>
                </div>
                <div className="col-9">
                  <ReactSearchAutocomplete
                    showIcon={false}
                    placeholder={"Search Diagnosis"}
                    items={diagnosis}
                    resultStringKeyName="DiagnosisProcedure_name"
                    inputSearchString={searchDiagnosis || ""}
                    onSearch={(value) => setSearchDiagnosis(value)}
                    onSelect={(item) => {
                      setData({
                        ...data,
                        diagnosis: [
                          ...data.diagnosis,
                          item?.DiagnosisProcedure_name,
                        ],
                      });
                      setSearchDiagnosis("");
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
                  {data?.diagnosis?.length > 0 &&
                    data?.diagnosis?.map((item, index) => (
                      <p key={index}>
                        {index + 1}. {item}
                        <span
                          className="ms-2 cursor-pointer discharge-summary-close"
                          onClick={() => removeDiagnosis(item)}
                        >
                          <FaRegCircleXmark />
                        </span>
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Operation Note
                  </label>
                </div>
                <div className="col-9">
                  <select
                    onChange={handleNote}
                    name="operationNote"
                    id=""
                    className="form-select"
                  >
                    <option value="">Select</option>
                    {procedureReport?.map((item) => (
                      <option value={item.id}>
                        {moment(item.created_at).format("DD/MM/YYYY")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="discharge-data discharge-rx-table">
          <label htmlFor="" className="fw-bold">
            Medication List
          </label>
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
              {rx?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item?.brand_name}</td>
                    <td>{item?.drug_name}</td>
                    <td>{item?.Complex_instruction ? "" : item?.dose}</td>
                    <td>{item?.Complex_instruction ? "" : item?.frequency}</td>
                    <td>
                      {item?.Complex_instruction
                        ? item?.Complex_instruction
                        : ""}
                    </td>
                    <td>{item?.prn ? item.prn : ""}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.repeats}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="discharge-data">
          <h6 className="mt-3">Advice</h6>
          <div className="row">
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Pain Relief
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.painRelief || "Select"}
                    options={painRelief?.map((item) => ({
                      ...item,
                      value: item.title,
                      label: item.title,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, painRelief: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Hygiene
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.hygiene || "Select"}
                    options={hygiene?.map((item) => ({
                      ...item,
                      value: item.title,
                      label: item.title,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, hygiene: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Exercise
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.exercise || "Select"}
                    options={exercise?.map((item) => ({
                      ...item,
                      value: item.title,
                      label: item.title,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, exercise: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Dressing
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.dressing || "Select"}
                    options={dressing?.map((item) => ({
                      ...item,
                      value: item.title,
                      label: item.title,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, dressing: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Wound Care
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.woundCare || "Select"}
                    options={woundCare?.map((item) => ({
                      ...item,
                      value: item.title,
                      label: item.title,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, woundCare: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Diet
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.diet || "Select"}
                    options={diet?.map((item) => ({
                      ...item,
                      value: item?.name,
                      label: item?.name,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, diet: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Recommendation
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.recommendation || "Select"}
                    options={recommendation?.map((item) => ({
                      ...item,
                      value: item?.title,
                      label: item?.title,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({
                        ...data,
                        recommendation: stringValue?.toString(),
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row mt-2">
                <div className="col-3">
                  <label htmlFor="" className="fw-bold">
                    Follow Up
                  </label>
                </div>
                <div className="col-9">
                  <MultipleSelect
                    placeholder={data?.followUp || "Select"}
                    options={followUp?.map((item) => ({
                      ...item,
                      value: item?.name,
                      label: item?.name,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      setData({ ...data, followUp: stringValue?.toString() });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="report-btn2 mt-3 mb-5">
          <button className="report-save-btn2" onClick={handleSave}>
            Save
          </button>
          <button className="report-print-btn2" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
      {/* print discharge */}
      <div
        // style={{ display: "block" }}
        className="procedure-report-container-print"
        ref={componentRef}
      >
        <div style={{ minHeight: "11in" }} className="procedure-main-content">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h3>{storageData?.organization_name}</h3>
              <h4>Discharge Summary(Confidential)</h4>
            </div>
          </div>
          <div className="procedure-patient-head-container d-flex justify-content-between">
            <div>
              <p>
                <span className="procedure-patient-head">Name</span>
                <span>: {props?.patient?.fullName}</span>
              </p>
              <p>
                <span className="procedure-patient-head">DOB</span>
                <span>
                  : {moment(props?.patient?.patient_dob).format("DD/MM/YYYY")}
                </span>
              </p>
              <p>
                <span className="procedure-patient-head">HN No</span>
                <span>: {props.patient.patient_hn_number}</span>
              </p>
              {/* <p>
                <span className="procedure-patient-head">Ward</span>
                <span>: {data?.ward}</span>
              </p> */}
            </div>
            <div>
              <p>
                <span className="procedure-patient-head">Sex</span>
                <span>
                  : {props?.patient?.patient_birth_sex?.birth_sex_name}
                </span>
              </p>
              <p>
                <span className="procedure-patient-head">Age</span>
                <span>: {getAge(props?.patient?.patient_dob)}</span>
              </p>
              {/* <p>
                <span className="procedure-patient-head">Bed</span>
                <span>: {data?.bed}</span>
              </p> */}
            </div>
          </div>
          <div className="row my-1">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    General Practitioner
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    :
                    {
                      <span
                        className="ms-1"
                        dangerouslySetInnerHTML={{
                          __html: data?.gpPractitioner?.replace(/\n/g, "<br>"),
                        }}
                      ></span>
                    }
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Admitting Doctor
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    : {data?.admittingDoctor}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Admitting Doctor Phone
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    : {data?.admittingDoctorPhone}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Chief Complaint
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    : {data?.chiefCompliant?.toString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Admission Date
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    : {moment(data?.admissionDate).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Discharge Date
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    : {moment(data?.dischargeDate).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Discharge To
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    : {data?.dischargedTo}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px dashed #000" }} className="row mt-1">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    History
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    :
                    {
                      <span
                        className="ms-1"
                        dangerouslySetInnerHTML={{
                          __html: data?.history?.replace(/\n/g, "<br>"),
                        }}
                      ></span>
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px dashed #000" }} className="row mt-1">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Investigation
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    :{data?.investigation?.toString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Diagnosis
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    :{data?.diagnosis?.toString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Medication List
                  </span>
                </div>
                <div className="col-9">:</div>
              </div>
            </div>
            <table className="past_rx_table">
              <thead style={{ backgroundColor: "#fff" }}>
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
                {rx?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item?.brand_name}</td>
                      <td>{item?.drug_name}</td>
                      <td>{item?.Complex_instruction ? "" : item?.dose}</td>
                      <td>
                        {item?.Complex_instruction ? "" : item?.frequency}
                      </td>
                      <td>
                        {item?.Complex_instruction
                          ? item?.Complex_instruction
                          : ""}
                      </td>
                      <td>{item?.prn ? item.prn : ""}</td>
                      <td>{item?.quantity}</td>
                      <td>{item?.repeats}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="row mt-1">
            <h6>Advice</h6>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Pain Relief
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.painRelief}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Exercise
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.exercise}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Wound Care
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.woundCare}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Recommendation
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value">
                    {" "}
                    : {data?.recommendation}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Hygiene
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.hygiene}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Dressing
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.dressing}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">Diet</span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.diet}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <span className="fw-bold operation-details-header">
                    Follow Up
                  </span>
                </div>
                <div className="col-9">
                  <span className="operation-value"> : {data?.followUp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ visibility: "hidden" }}
          className="procedure-report-footer mb-4"
        >
          <div className="row">
            <div className="col-4">
              <div className="d-flex justify-content-center">
                <div className="text-center">
                  <div
                    style={{
                      height: "1px",
                      width: "150px",
                      borderTop: "1px solid black",
                    }}
                  ></div>
                  <span className="fw-bold operation-details-header">
                    Surgeon
                  </span>
                  <p className="mt-2"></p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-center">
                <div className="text-center">
                  <div
                    style={{
                      height: "1px",
                      width: "150px",
                      borderTop: "1px solid black",
                    }}
                  ></div>
                  <span className="fw-bold operation-details-header">
                    Anesthesia
                  </span>
                  <p className="mt-2">{data?.anesthetist}</p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-center">
                <div className="text-center">
                  <div
                    style={{
                      height: "1px",
                      width: "150px",
                      borderTop: "1px solid black",
                    }}
                  ></div>
                  <span className="fw-bold operation-details-header">
                    Assistant Surgeon
                  </span>
                  <p className="mt-2">{data?.assistantSurgeon}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* procedure report  */}
        <div
          style={{ pageBreakBefore: "always" }}
          className="procedure-report-container-print"
        >
          <div className="procedure-main-content">
            <div className="d-flex justify-content-center procedure-print-head">
              <div className="text-center">
                <h3>{storageData?.organization_name}</h3>
                <h4>Operation Report</h4>
              </div>
            </div>
            <div className="procedure-patient-head-container d-flex justify-content-between">
              <div>
                <p>
                  <span className="procedure-patient-head">Name</span>
                  <span>: {note?.patient?.fullName}</span>
                </p>
                <p>
                  <span className="procedure-patient-head">DOB</span>
                  <span>
                    :
                    <span className="ms-1">
                      {moment(note?.patient?.patient_dob).format("DD/MM/YYYY")}
                    </span>
                  </span>
                </p>
                <p>
                  <span className="procedure-patient-head">HN No</span>
                  <span>: {note?.patient?.patient_hn_number}</span>
                </p>
                <p>
                  <span className="procedure-patient-head">Ward</span>
                  <span>: {note?.ward}</span>
                </p>
              </div>
              <div>
                <p>
                  <span className="procedure-patient-head">Sex</span>
                  <span>
                    : {note?.patient?.patient_birth_sex?.birth_sex_name}
                  </span>
                </p>
                <p>
                  <span className="procedure-patient-head">Age</span>
                  <span>: {getAge(note?.patient?.patient_dob)}</span>
                </p>
                <p>
                  <span className="procedure-patient-head">Bed</span>
                  <span>: {note?.bed}</span>
                </p>
              </div>
            </div>

            <div className="row my-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Procedure Date
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      :
                      <span className="ms-1">
                        {moment(
                          new Date(parseInt(note?.procedure_date)).toString()
                        ).format("DD/MM/YYYY")}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Item Numbers
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      <span className="operation-value">
                        : {note?.item_number}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Department
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.department}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Indication
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.indication}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Procedure
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.procedure}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Findings
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.findings}</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px dashed #000" }}>
              <h6 className="mt-2">Procedure Details</h6>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Incision
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.incision}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Pathology
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.pathology}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Drain
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.drain}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Antibiotics
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.antibiotics}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Blood Loss(ml)
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.blood_loss}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="procedure_report_box">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-2">
                      <span className="fw-bold operation-details-header">
                        Process
                      </span>
                    </div>
                    <div className="col-10">
                      <span className="operation-value">: {note?.process}</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-2">
                      <span className="fw-bold operation-details-header">
                        Patient Position
                      </span>
                    </div>
                    <div className="col-10">
                      <span className="operation-value">
                        : {note?.patient_position}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {note?.process_details && (
                <p className="mt-2">
                  <b>Process Details:</b> {note?.process_details}
                </p>
              )}
            </div>

            <div style={{ borderTop: "1px dashed #000" }}>
              <h6 className="mt-2">Post Operative Orders</h6>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Observation
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.observation}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Diet
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value"> : {note?.diet}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Analgesia
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.analgesia}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      DVT Prop
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.dvt_prop}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Antibiotics
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.antibiotics_two}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Discharge
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.discharge}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Follow Up
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">: {note?.followup}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <span className="fw-bold operation-details-header">
                      Post Operative Instruction
                    </span>
                  </div>
                  <div className="col-10">
                    <span className="operation-value">
                      : {note?.post_operative}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="mt-2">
                Electronically Signed By: {note?.doctor?.fullName}
                <span className="ms-2">
                  {moment().format("Do MMMM YYYY, h:mm:ss a")}
                </span>
              </p>
              <small>
                CAUTION:This message may contain both confidential and
                privileged information intended only for the addresses named
                above.If you are not intended recipient you are hereby notified
                that any dissemination,distribution or reproduction of this
                message is prohibited.If you have received this this message in
                error please notify the sender immediately,then destroy the
                original message.Any views expressed in this message are solely
                those of the individual.
              </small>
            </div>
          </div>
          <div
            style={{ borderTop: "1px dashed black" }}
            className="procedure-report-footer mt-4"
          >
            <div className="row mt-3">
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <span className="fw-bold operation-details-header">
                      Surgeon
                    </span>
                    <p className="mt-2">{note?.surgeon}</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <span className="fw-bold operation-details-header">
                      Anesthetist
                    </span>
                    <p className="mt-2">{note?.anesthetist}</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <span className="fw-bold operation-details-header">
                      Assistant Surgeon
                    </span>
                    <p className="mt-2">{note?.assistant_surgeon}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* print discharge */}
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
function generateUniqueId() {
  const randomNumber = Math.floor(Math.random() * 9000000) + 1000000; // Generate random 7-digit number
  return randomNumber;
}
const MultipleSelect = ({
  components,
  value,
  options,
  onChange,
  placeholder,
  id,
}) => {
  const Option = (props) => {
    return (
      <Base.Option
        {...props}
        className="border d-flex align-items-center justify-content-between py-1"
      >
        <div className="d-flex align-items-center gap-2">
          <div className="form-check py-0">
            <input
              className="form-check-input"
              type="checkbox"
              checked={props.isSelected}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <span
              className="ms-2"
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {props.label}
            </span>
          </div>
        </div>
        <span>{props?.data?.dial_code}</span>
      </Base.Option>
    );
  };
  const IndicatorSeparator = () => null;
  const DropdownIndicator = () => null;
  const htmlId = generateUniqueId();
  return (
    <ReactSelect
      options={options || []}
      isMulti
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      placeholder={placeholder}
      isSearchable
      // isClearable
      styles={{
        ...ReactSelectStyles,
      }}
      value={value}
      onChange={onChange}
      inputId={`${id ? id : htmlId}`}
      components={{
        Option,
        DropdownIndicator,
        IndicatorSeparator,
        ...components,
      }}
    />
  );
};
