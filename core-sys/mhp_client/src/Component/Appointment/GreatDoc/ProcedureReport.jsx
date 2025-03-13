import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./ProcedureReport.css";
import moment from "moment";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { getAge } from "../../../utils/getAge";
import ReactDatePicker from "react-datepicker";
import ReactSelect, { components as Base } from "react-select";
import Select from "react-select";
import { set } from "date-fns";

const ProcedureReport = (props) => {
  const [items, setItems] = useState([]);
  const [indication, setIndication] = useState([]);
  const [procedure, setProcedure] = useState([]);
  const [findings, setFindings] = useState([]);
  const [incisioon, setIncisioon] = useState([]);
  const [pathologies, setPathologies] = useState([]);
  const [draings, setDraings] = useState([]);
  const [antobi, setAntobi] = useState([]);
  const [bloodL, setBloodL] = useState([]);
  const [process, setProcess] = useState([]);
  const [observing, setObserving] = useState([]);
  const [diets, setDiets] = useState([]);
  const [analgos, setAnalgos] = useState([]);
  const [dvtP, setDvtP] = useState([]);
  const [antobiTwo, setAntobiTwo] = useState([]);
  const [disCha, setDisCha] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [postOp, setPostOp] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [processDetails, setProcessDetails] = useState("");
  const [docData, setDocData] = useState({
    fullName: "",
  });
  const [data, setData] = useState({
    ward: "",
    bed: "",
    department: "",
    anesthesia: "",
    assistantSurgeon: "",
    procedureDate: Date.now(),
    signedBy: "",
    patientPosition: "",
    department_id: "",
    patient_id: "",
    surgeon: "",
  });

  const storageData = JSON.parse(localStorage.getItem("userData"));
  // getting all data using useEffect.

  useEffect(() => {
    axios.get(`/indication-name`).then((res) => {
      if (res.data.status === 200) {
        setIndication(res.data.indicationName);
      }
    });
    axios.get(`/procedure-name`).then((res) => {
      if (res.data.status === 200) {
        setProcedure(res.data.procedureName);
      }
    });
    axios.get(`/findings-name`).then((res) => {
      if (res.data.status === 200) {
        setFindings(res.data.findingsName);
      }
    });
    axios.get(`/incision`).then((res) => {
      if (res.data.status === 200) {
        setIncisioon(res.data.incisionName);
      }
    });
    axios.get(`/pathology-name`).then((res) => {
      if (res.data.status === 200) {
        setPathologies(res.data.pathologyName);
      }
    });
    axios.get(`/drain-name`).then((res) => {
      if (res.data.status === 200) {
        setDraings(res.data.drainName);
      }
    });
    axios.get(`/procedure-Details`).then((res) => {
      if (res.data.status === 200) {
        setProcess(res.data.procedureDetails);
      }
    });
    axios.get(`/antibiotics-name`).then((res) => {
      if (res.data.status === 200) {
        setAntobi(res.data.antibioticsName);
      }
    });
    axios.get(`/blood-loss-name`).then((res) => {
      if (res.data.status === 200) {
        setBloodL(res.data.bloodLossName);
      }
    });
    axios.get(`/observation-name`).then((res) => {
      if (res.data.status === 200) {
        setObserving(res.data.observationName);
      }
    });
    axios.get(`/diet-name`).then((res) => {
      if (res.data.status === 200) {
        setDiets(res.data.dietsName);
      }
    });
    axios.get(`/analgesia-name`).then((res) => {
      if (res.data.status === 200) {
        setAnalgos(res.data.analgesiaName);
      }
    });
    axios.get(`/dvt-prop-name`).then((res) => {
      if (res.data.status === 200) {
        setDvtP(res.data.dvtPropName);
      }
    });
    axios.get(`/antibiotics-two-name`).then((res) => {
      if (res.data.status === 200) {
        setAntobiTwo(res.data.antibioticsTwoName);
      }
    });
    axios.get(`/antibiotics-two-name`).then((res) => {
      if (res.data.status === 200) {
        setAntobiTwo(res.data.antibioticsTwoName);
      }
    });
    axios.get(`/discharge-name`).then((res) => {
      if (res.data.status === 200) {
        setDisCha(res.data.dischargeName);
      }
    });
    axios.get(`/followup-name`).then((res) => {
      if (res.data.status === 200) {
        setFollowUps(res.data.followupName);
      }
    });
    axios.get(`/post-operative-name`).then((res) => {
      if (res.data.status === 200) {
        setPostOp(res.data.postOperativeName);
      }
    });
    axios.get(`/department`).then((res) => {
      if (res.data.status === 200) {
        setDepartments(res.data.department);
      }
    });
    if (storageData?.user_id) {
      axios.get(`/doctorProfile/${storageData?.user_id}`).then((res) => {
        setDocData(res.data.doctors);
        setData({
          ...data,
          signedBy: res.data.doctors?.fullName,
          surgeon: res.data.doctors?.fullName,
        });
      });
    }
  }, [storageData?.user_id]);

  // get doctor data
  useEffect(() => {
    if (data?.department_id) {
      axios
        .get(`/item-number-by-department/${data?.department_id}`)
        .then((res) => {
          if (res.data.status === 200) {
            setItems(res.data.itemNumbersName);
          }
        });
    }
  }, [data?.department_id]);
  // all values
  const [itemNumbers, setItemNumbers] = useState("");
  const [itemNumbersValue, setItemNumbersValue] = useState([]);
  const [indicatee, setIndicatee] = useState("");
  const [proceduree, setProceduree] = useState("");
  const [procedureeValue, setProcedureeValue] = useState([]);
  const [findingss, setFindingss] = useState("");
  const [incision, setIncision] = useState("");
  const [processs, setProcesss] = useState("");
  const [drain, setDrain] = useState("");
  const [antibiotics, setAntibiotics] = useState("");
  const [bloodLoss, setBloodLoss] = useState("");
  const [pathology, setPathology] = useState("");
  const [observation, setObservation] = useState("");
  const [diet, setDiet] = useState("");
  const [analgesia, setAnalgesia] = useState("");
  const [dvtProp, setDvtProp] = useState("");
  const [antibioticsTwo, setAntibioticsTwo] = useState("");
  const [discharge, setDischarge] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [postOperative, setPostOperative] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleItemNumbers = (e) => {
    setItemNumbers(e.target.value);
    const item = items?.find((item) => item.name == e.target.value);
    // setProceduree(item?.description || "");
  };
  const handleIndicatee = (e) => {
    setIndicatee(e.target.value);
  };
  const handleProceduree = (e) => {
    setProceduree(e.target.value);
  };
  const handleFindingss = (e) => {
    setFindingss(e.target.value);
  };
  const handleIncision = (e) => {
    setIncision(e.target.value);
  };
  const handleProcesss = (e) => {
    setProcesss(e.target.value);
    const pro = process?.find((item) => item.name == e.target.value);
    setProcessDetails(pro);
  };
  const handleDrain = (e) => {
    setDrain(e.target.value);
  };
  const handleAntibiotics = (e) => {
    setAntibiotics(e.target.value);
  };
  const handleBloodLoss = (e) => {
    setBloodLoss(e.target.value);
  };
  const handlePathology = (e) => {
    setPathology(e.target.value);
  };
  const handleObservation = (e) => {
    setObservation(e.target.value);
  };
  const handleDiet = (e) => {
    setDiet(e.target.value);
  };
  const handleAnalgesia = (e) => {
    setAnalgesia(e.target.value);
  };
  const handleDvtProp = (e) => {
    setDvtProp(e.target.value);
  };
  const handleAntibioticsTwo = (e) => {
    setAntibioticsTwo(e.target.value);
  };
  const handleDischarge = (e) => {
    setDischarge(e.target.value);
  };
  const handleFollowUp = (e) => {
    setFollowUp(e.target.value);
  };
  const handlePostOperative = (e) => {
    setPostOperative(e.target.value);
  };

  const handleSave = () => {
    const procedureReportData = {
      item_numbers: itemNumbers,
      indicateee: indicatee,
      proceduree: proceduree,
      findings: findingss,
      incision: incision,
      processs: processs,
      drain: drain,
      antibiotics: antibiotics,
      blood_loss: bloodLoss,
      pathology: pathology,
      observation: observation,
      diet: diet,
      analgesia: analgesia,
      dvt_prop: dvtProp,
      antibiotics_two: antibioticsTwo,
      discharge: discharge,
      followup: followUp,
      post_operative: postOperative,
      ...data,
      doctor_id: storageData?.user_id,
      surgeon: data?.surgeon,
      patient_id: props?.patient?.id,
      processDetails: processDetails?.details,
      organization_id: storageData?.organization_id,
    };

    axios
      .post(`/save-addProcedureChartReport`, procedureReportData)
      .then((res) => {
        if (res.data.status == 200) {
          toast.success("Procedure Report Added Successfully");
          setItemNumbers("");
          setIndicatee("");
          setProceduree("");
          setFindingss("");
          setIncision("");
          setProcesss("");
          setDrain("");
          setAntibiotics("");
          setBloodLoss("");
          setPathology("");
          setObservation("");
          setDiet("");
          setAnalgesia("");
          setDvtProp("");
          setDvtProp("");
          setDischarge("");
          setAntibioticsTwo("");
          setPostOperative("");
          props?.setProcedureReportModel(false);
        }
      });
  };
  //   print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // conditional rendering
  const [itemNums, setItemNums] = useState(false);
  const [indications, setIndications] = useState(false);
  const [proced, setProced] = useState(false);
  const [incise, setIncise] = useState(false);
  const [find, setFind] = useState(false);
  const [patho, setPatho] = useState(false);
  const [drains, setDrains] = useState(false);
  const [anto, setAnto] = useState(false);
  const [bLoss, setBLoss] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [observed, setObserved] = useState(false);
  const [dieted, setDieted] = useState(false);
  const [analgesed, setAnalgesed] = useState(false);
  const [dvt, setDvt] = useState(false);
  const [antTwo, setAntTwo] = useState(false);
  const [dis, setDis] = useState(false);
  const [folows, setFolows] = useState(false);
  const [post, setPost] = useState(false);
  return (
    <div className="p-1 pb-5">
      <div className="procedure-report-container">
        <div className="d-flex justify-content-between">
          <div>
            <strong>{props?.patient?.fullName}</strong> <br />
            <strong>
              DOB: {moment(props?.patient?.patient_dob).format("DD/MM/YYYY")}
            </strong>
            <br />
            <strong>HN No: {props.patient.patient_hn_number}</strong>
            <br />
            <strong>
              Sex: {props?.patient?.patient_birth_sex?.birth_sex_name}
            </strong>
            <br />
            <strong>Age: {getAge(props?.patient?.patient_dob)}</strong>
          </div>
          <div>
            <strong>{storageData?.organization_name}</strong> <br />
            <strong>{storageData?.organization_address}</strong>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <label className="fw-bold">Ward:</label>
              </div>
              <div className="col-8">
                <input
                  name="ward"
                  type="text"
                  className="form-control form-control-sm"
                  value={data?.ward}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <label className="fw-bold">Department:</label>
              </div>
              <div className="col-8">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="color"
                  options={departments}
                  getOptionLabel={(option) => option?.departments_name}
                  getOptionValue={(option) => option?.id}
                  styles={ReactSelectStyles}
                  onChange={(e) => {
                    setData({
                      ...data,
                      department_id: e?.id,
                      department: e?.departments_name,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row my-2">
              <div className="col-3">
                <label className="fw-bold">Bed:</label>
              </div>
              <div className="col-8">
                <input
                  name="bed"
                  type="text"
                  className="form-control form-control-sm"
                  value={data?.bed}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3">
                <label className="fw-bold">Anesthetist :</label>
              </div>
              <div className="col-8">
                <input
                  name="anesthetist"
                  type="text"
                  className="form-control form-control-sm"
                  value={data?.anesthetist}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <label className="fw-bold">Procedure Date:</label>
              </div>
              <div className="col-8">
                {/* <input
                  name="procedureDate"
                  type="text"
                  className="form-control form-control-sm"
                  value={moment(data?.procedureDate).format("DD/MM/YYYY")}
                  onChange={handleChange}
                /> */}
                <ReactDatePicker
                  id="procedureDate"
                  placeholderText="DD/MM/YYYY"
                  selected={
                    data?.procedureDate ? new Date(data?.procedureDate) : null
                  }
                  dateFormat={"dd/MM/yyyy"}
                  name="procedureDate"
                  style={{ padding: "10px" }}
                  onChange={(d) =>
                    setData({
                      ...data,
                      procedureDate: d ? d : new Date(),
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mt-2">
              <div className="col-3">
                <label className="fw-bold">Surgeon:</label>
              </div>
              <div className="col-8">
                <input
                  name="surgeon"
                  type="text"
                  className="form-control form-control-sm"
                  value={data?.surgeon}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <label className="fw-bold">Anesthesia:</label>
              </div>
              <div className="col-8">
                <input
                  name="anesthesia"
                  type="text"
                  className="form-control form-control-sm"
                  value={data?.anesthesia}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-3">
                <label className="fw-bold">Assistant Surgeon:</label>
              </div>
              <div className="col-8">
                <input
                  name="assistantSurgeon"
                  type="text"
                  className="form-control form-control-sm"
                  value={data?.assistantSurgeon}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="procedure_report_box">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Item Numbers:</label>
                </div>
                <div className="col-8">
                  <MultipleSelect
                    placeholder={itemNumbers || "Select"}
                    options={items?.map((item) => ({
                      ...item,
                      value: item.name,
                      label: item.name,
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      const stringValueP = newValue?.map(
                        (it) => `${it?.description} `
                      );
                      const clone = [];
                      const newArr = newValue.map((it) => {
                        clone.push({
                          ...it,
                          value: it?.description,
                          label: it?.description?.slice(0, 150) + "...",
                        });
                      });
                      setItemNumbers(stringValue?.toString());
                      setItemNumbersValue(newValue);
                      setProcedureeValue(clone);
                      setProceduree(stringValueP?.toString());
                    }}
                    value={itemNumbersValue}
                  />
                </div>
                <div className="col-1 d-flex align-items-center">
                  {itemNums ? (
                    <LuMinus
                      size={20}
                      className="procedure_icon"
                      onClick={() => setItemNums(!itemNums)}
                    ></LuMinus>
                  ) : (
                    <GoPlus
                      size={20}
                      className="procedure_icon"
                      onClick={() => setItemNums(!itemNums)}
                    ></GoPlus>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Indication:</label>
                </div>
                <div className="col-8">
                  {indications ? (
                    <MultipleSelect
                      placeholder={indicatee || "Select"}
                      options={indication.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setIndicatee(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="indication"
                      className="form-control form-control-sm"
                      value={indicatee}
                      onChange={handleIndicatee}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const indicateData = {
                            name: indicatee,
                          };
                          axios
                            .post("/save-indication", indicateData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/indication-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setIndication(res.data.indicationName);
                                  }
                                });
                                toast.success("Successfully Added Indication");
                              } else if (res.data.status == 400) {
                                setIndicatee({
                                  ...indicatee,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1 d-flex align-items-center">
                  {indications ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setIndications(!indications)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setIndications(!indications)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label for="" className=" fw-bold">
                    Procedure:
                  </label>
                </div>
                <div className="col-8">
                  <MultipleSelect
                    placeholder={proceduree?.slice(0, 150) || "Select"}
                    options={items?.map((item) => ({
                      ...item,
                      value: item?.description,
                      label: item?.description?.slice(0, 150) + "...",
                      id: "",
                    }))}
                    onChange={(newValue) => {
                      const stringValue = newValue?.map(
                        (it) => `${it?.value} `
                      );
                      const stringValueI = newValue?.map(
                        (it) => `${it?.name} `
                      );
                      setProcedureeValue(newValue);
                      setProceduree(stringValue);
                      setItemNumbers(stringValueI?.toString());
                    }}
                    value={procedureeValue}
                  />
                </div>
                <div className="col-1">
                  {proced ? (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setProced(!proced)}
                      ></GoPlus>
                    </div>
                  ) : (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => {
                          setProced(!proced);
                          setProceduree("");
                        }}
                      ></LuMinus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label for="" className="fw-bold">
                    Findings:
                  </label>
                </div>
                <div className="col-8">
                  {find ? (
                    <MultipleSelect
                      // value={indicatee}
                      placeholder={findingss || "Select"}
                      options={findings.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setFindingss(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="findings"
                      className="form-control form-control-sm"
                      value={findingss}
                      onChange={handleFindingss}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const procedureFindings = {
                            name: findingss,
                          };
                          axios
                            .post("/save-findings", procedureFindings)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/findings-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setFindings(res.data.findingsName);
                                  }
                                });
                                toast.success("Successfully Added Findings");
                              } else if (res.data.status == 400) {
                                setFindings({
                                  ...findings,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {find ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setFind(!find)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setFind(!find)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h6 className="mt-4">Procedure Details</h6>
        </div>
        <div className="procedure_report_box">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Incision:</label>
                </div>
                <div className="col-8">
                  {incise ? (
                    <MultipleSelect
                      // value={indicatee}
                      placeholder={incision || "Select"}
                      options={incisioon.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setIncision(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="incision"
                      className="form-control form-control-sm"
                      value={incision}
                      onChange={handleIncision}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const incisionData = {
                            name: incision,
                          };
                          axios
                            .post("/save-incision", incisionData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/incision`).then((res) => {
                                  if (res.data.status === 200) {
                                    setIncisioon(res.data.incisionName);
                                  }
                                });
                                toast.success("Successfully Added Incision");
                              } else if (res.data.status == 400) {
                                setIncisioon({
                                  ...incision,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {incise ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setIncise(!incise)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setIncise(!incise)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label for="" className="fw-bold">
                    Pathology:
                  </label>
                </div>
                <div className="col-8">
                  {patho ? (
                    <MultipleSelect
                      placeholder={pathology || "Select"}
                      options={pathologies?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setPathology(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="pathology"
                      className="form-control form-control-sm"
                      value={pathology}
                      onChange={handlePathology}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const pathologyData = {
                            name: pathology,
                          };
                          axios
                            .post("/save-pathology", pathologyData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/pathology-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setPathologies(res.data.pathologyName);
                                  }
                                });
                                toast.success("Successfully Added Pathology");
                              } else if (res.data.status == 400) {
                                setPathologies({
                                  ...pathology,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {patho ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setPatho(!patho)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setPatho(!patho)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Drain:</label>
                </div>
                <div className="col-8">
                  {drains ? (
                    <MultipleSelect
                      placeholder={drain || "Select"}
                      options={draings?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setDrain(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="drain"
                      className="form-control form-control-sm"
                      value={drain}
                      onChange={handleDrain}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const drainData = {
                            name: drain,
                          };
                          axios
                            .post("/save-drain-name", drainData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/drain-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setDraings(res.data.drainName);
                                  }
                                });
                                toast.success("Successfully Added Drain");
                              } else if (res.data.status == 400) {
                                setDraings({
                                  ...drain,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {drains ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setDrains(!drains)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setDrains(!drains)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Antibiotics:</label>
                </div>
                <div className="col-8">
                  {anto ? (
                    <MultipleSelect
                      placeholder={antibiotics || "Select"}
                      options={antobi?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setAntibiotics(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="antibiotics"
                      className="form-control form-control-sm"
                      value={antibiotics}
                      onChange={handleAntibiotics}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const antiData = {
                            name: antibiotics,
                          };
                          axios
                            .post("/save-antibiotics-name", antiData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/antibiotics-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setAntobi(res.data.antibioticsName);
                                  }
                                });
                                toast.success("Successfully Added Antibiotics");
                              } else if (res.data.status == 400) {
                                setAntobi({
                                  ...antibiotics,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {anto ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setAnto(!anto)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setAnto(!anto)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Blood Loss(ml):</label>
                </div>
                <div className="col-8">
                  {bLoss ? (
                    <MultipleSelect
                      placeholder={bloodLoss || "Select"}
                      options={bloodL?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setBloodLoss(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="bloodLoss"
                      className="form-control form-control-sm"
                      value={bloodLoss}
                      onChange={handleBloodLoss}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const bloodData = {
                            name: bloodLoss,
                          };
                          axios
                            .post("/save-blood-loss-name", bloodData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/blood-loss-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setBloodL(res.data.bloodLossName);
                                  }
                                });
                                toast.success("Successfully Added Blood Loss");
                              } else if (res.data.status == 400) {
                                setBloodL({
                                  ...bloodLoss,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {bLoss ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setBLoss(!bLoss)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setBLoss(!bLoss)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="procedure_report_box">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Process:</label>
                </div>
                <div className="col-8">
                  {processed ? (
                    <select
                      name="process"
                      className="form-select form-select-sm"
                      value={processs}
                      onChange={handleProcesss}
                    >
                      <option value="">Selected</option>
                      {process.map((item, i) => {
                        return (
                          <option value={item.name} key={i}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    // <MultipleSelect
                    //   placeholder={processs || "Select"}
                    //   options={process?.map((item) => ({
                    //     ...item,
                    //     value: item.name,
                    //     label: item.name,
                    //     id: "",
                    //   }))}
                    //   onChange={(newValue) => {
                    //     const stringValue = newValue?.map(
                    //       (it) => `${it?.value} `
                    //     );
                    //     setProcesss(stringValue?.toString());
                    //   }}
                    // />
                    <input
                      name="process"
                      className="form-control form-control-sm"
                      value={processs}
                      onChange={handleProcesss}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const procedureDetailss = {
                            name: processs,
                          };
                          axios
                            .post("/save-procedure-Details", procedureDetailss)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/procedure-Details`).then((res) => {
                                  if (res.data.status === 200) {
                                    setProcesss(res.data.procedureDetails);
                                  }
                                });
                                toast.success("Successfully Added Process");
                              } else if (res.data.status == 400) {
                                setProcesss({
                                  ...processs,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {processed ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setProcessed(!processed)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setProcessed(!processed)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Patient Position:</label>
                </div>
                <div className="col-8">
                  <input
                    name="patientPosition"
                    className="form-control form-control-sm"
                    value={data?.patientPosition}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-1">
                  {processed ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setProcessed(!processed)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setProcessed(!processed)}
                      ></GoPlus>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
          {processDetails?.details && (
            <p className="mt-2">
              <b>Process Details:</b> {processDetails?.details}
            </p>
          )}
        </div>

        <div>
          <h6 className="mt-4">Post Operative Orders</h6>
        </div>
        <div className="procedure_report_box pb-5">
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Observation:</label>
                </div>
                <div className="col-8">
                  {observed ? (
                    <MultipleSelect
                      placeholder={observation || "Select"}
                      options={observing?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setObservation(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="observation"
                      className="form-control form-control-sm"
                      value={observation}
                      onChange={handleObservation}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const observationData = {
                            name: observation,
                          };
                          axios
                            .post("/save-observation-name", observationData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/observation-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setObserving(res.data.observationName);
                                  }
                                });
                                toast.success("Successfully Added Observation");
                              } else if (res.data.status == 400) {
                                setObserving({
                                  ...observation,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {observed ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setObserved(!observed)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setObserved(!observed)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Diet:</label>
                </div>
                <div className="col-8">
                  {dieted ? (
                    <MultipleSelect
                      placeholder={diet || "Select"}
                      options={diets?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setDiet(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="diet"
                      className="form-control form-control-sm "
                      value={diet}
                      onChange={handleDiet}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const dietData = {
                            name: diets,
                          };
                          axios.post("/save-diet", dietData).then((res) => {
                            if (res.data.status == 200) {
                              axios.get(`/diet-name`).then((res) => {
                                if (res.data.status === 200) {
                                  setDiets(res.data.dietName);
                                }
                              });
                              toast.success("Successfully Added Diet");
                            } else if (res.data.status == 400) {
                              setDiets({
                                ...diets,
                                error_list: res.data.errors,
                              });
                            }
                          });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {dieted ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setDieted(!dieted)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setDieted(!dieted)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Analgesia:</label>
                </div>
                <div className="col-8">
                  {analgesed ? (
                    <MultipleSelect
                      placeholder={analgesia || "Select"}
                      options={analgos?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setAnalgesia(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="analgesia"
                      className="form-control form-control-sm"
                      value={analgesia}
                      onChange={handleAnalgesia}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const analgesiaData = {
                            name: analgesia,
                          };
                          axios
                            .post("/save-analgesia-name", analgesiaData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/analgesia-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setAnalgos(res.data.analgesiaName);
                                  }
                                });
                                toast.success(
                                  "Successfully Added Analgesia Data"
                                );
                              } else if (res.data.status == 400) {
                                setAnalgos({
                                  ...analgesia,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {analgesed ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setAnalgesed(!analgesed)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setAnalgesed(!analgesed)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">DVT Prop:</label>
                </div>
                <div className="col-8">
                  {dvt ? (
                    <MultipleSelect
                      placeholder={dvtProp || "Select"}
                      options={dvtP?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setDvtProp(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="dvtProp"
                      className="form-control form-control-sm"
                      value={dvtProp}
                      onChange={handleDvtProp}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const dvtData = {
                            name: dvtProp,
                          };
                          axios
                            .post("/save-dvt-prop-name", dvtData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/dvt-prop-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setDvtP(res.data.dvtPropName);
                                  }
                                });
                                toast.success("Successfully Added Dvt Prop");
                              } else if (res.data.status == 400) {
                                setDvtP({
                                  ...dvtProp,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {dvt ? (
                    <div>
                      <LuMinus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setDvt(!dvt)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setDvt(!dvt)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Antibiotics:</label>
                </div>
                <div className="col-8">
                  {antTwo ? (
                    <MultipleSelect
                      placeholder={antibioticsTwo || "Select"}
                      options={antobiTwo?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setAntibioticsTwo(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="antibioticsTwo"
                      className="form-control form-control-sm"
                      value={antibioticsTwo}
                      onChange={handleAntibioticsTwo}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const antiTwoData = {
                            name: antibioticsTwo,
                          };
                          axios
                            .post("/save-antibiotics-two-name", antiTwoData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios
                                  .get(`/antibiotics-two-name`)
                                  .then((res) => {
                                    if (res.data.status === 200) {
                                      setAntobiTwo(res.data.antibioticsTwoName);
                                    }
                                  });
                                toast.success("Successfully Added Antibiotics");
                              } else if (res.data.status == 400) {
                                setAntobiTwo({
                                  ...antibioticsTwo,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {antTwo ? (
                    <div>
                      <LuMinus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setAntTwo(!antTwo)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setAntTwo(!antTwo)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label for="" className="fw-bold">
                    Discharge:
                  </label>
                </div>
                <div className="col-8">
                  {dis ? (
                    <MultipleSelect
                      placeholder={discharge || "Select"}
                      options={disCha?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setDischarge(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="discharge"
                      className="form-control form-control-sm"
                      value={discharge}
                      onChange={handleDischarge}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const dischargeData = {
                            name: discharge,
                          };
                          axios
                            .post("/save-discharge-name", dischargeData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/discharge-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setDisCha(res.data.dischargeName);
                                  }
                                });
                                toast.success("Successfully Added Discharge");
                              } else if (res.data.status == 400) {
                                setDisCha({
                                  ...discharge,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {dis ? (
                    <div>
                      <LuMinus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setDis(!dis)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setDis(!dis)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Follow Up:</label>
                </div>
                <div className="col-8">
                  {folows ? (
                    <MultipleSelect
                      placeholder={followUp || "Select"}
                      options={followUps?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setFollowUp(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="followUp"
                      className="form-control form-control-sm"
                      value={followUp}
                      onChange={handleFollowUp}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const followupData = {
                            name: followUp,
                          };
                          axios
                            .post("/save-followup-name", followupData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios.get(`/followup-name`).then((res) => {
                                  if (res.data.status === 200) {
                                    setFollowUps(res.data.followupName);
                                  }
                                });
                                toast.success("Successfully Added Follow Up");
                              } else if (res.data.status == 400) {
                                setFollowUps({
                                  ...followUp,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {folows ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setFolows(!folows)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className=" procedure_icon"
                        onClick={() => setFolows(!folows)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-3">
                  <label className="fw-bold">Post Operative Instruction:</label>
                </div>
                <div className="col-8">
                  {post ? (
                    <MultipleSelect
                      placeholder={postOperative || "Select"}
                      options={postOp?.map((item) => ({
                        ...item,
                        value: item.name,
                        label: item.name,
                        id: "",
                      }))}
                      onChange={(newValue) => {
                        const stringValue = newValue?.map(
                          (it) => `${it?.value} `
                        );
                        setPostOperative(stringValue?.toString());
                      }}
                    />
                  ) : (
                    <input
                      name="postOperative"
                      className="form-control form-control-sm"
                      value={postOperative}
                      onChange={handlePostOperative}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          const postData = {
                            name: postOperative,
                          };
                          axios
                            .post("/save-post-operative-name", postData)
                            .then((res) => {
                              if (res.data.status == 200) {
                                axios
                                  .get(`/post-operative-name`)
                                  .then((res) => {
                                    if (res.data.status === 200) {
                                      setPostOp(res.data.postOperativeName);
                                    }
                                  });
                                toast.success(
                                  "Successfully Added Post Operative"
                                );
                              } else if (res.data.status == 400) {
                                setPostOp({
                                  ...postOperative,
                                  error_list: res.data.errors,
                                });
                              }
                            });
                        }
                      }}
                    />
                  )}
                </div>
                <div className="col-1">
                  {post ? (
                    <div>
                      <LuMinus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setPost(!post)}
                      ></LuMinus>
                    </div>
                  ) : (
                    <div>
                      <GoPlus
                        size={20}
                        className="procedure_icon"
                        onClick={() => setPost(!post)}
                      ></GoPlus>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-2 d-flex">
            Electronically Signed By:{" "}
            <div className="ms-2" style={{ width: "300px" }}>
              <input
                name="signedBy"
                type="text"
                className="form-control form-control-sm"
                value={data?.signedBy}
                onChange={handleChange}
              />
            </div>
            <span className="ms-2">
              {moment().format("Do MMMM YYYY, h:mm:ss a")}
            </span>
          </div>
          <small>
            CAUTION:This message may contain both confidential and privileged
            information intended only for the addresses named above.If you are
            not intended recipient you are hereby notified that any
            dissemination,distribution or reproduction of this message is
            prohibited.If you have received this this message in error please
            notify the sender immediately,then destroy the original message.Any
            views expressed in this message are solely those of the individual.
          </small>
        </div>
      </div>

      <div className="report-btn2 mt-3">
        <button className="report-save-btn2" onClick={handleSave}>
          Save
        </button>
        <button className="report-print-btn2" onClick={handlePrint}>
          Print
        </button>
      </div>
      {/* print report */}
      <div className="procedure-report-container-print" ref={componentRef}>
        <div className="procedure-main-content">
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <h3>{storageData?.organization_name}</h3>
              <h4>Operation Report</h4>
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
              <p>
                <span className="procedure-patient-head">Ward</span>
                <span>: {data?.ward}</span>
              </p>
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
              <p>
                <span className="procedure-patient-head">Bed</span>
                <span>: {data?.bed}</span>
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
                    : {moment(data?.procedureDate).format("DD/MM/YYYY")}
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
                    <span className="operation-value">: {itemNumbers}</span>
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
                  <span className="operation-value"> : {data?.department}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="fw-bold operation-details-header">
                    Indication
                  </span>
                </div>
                <div className="col-10">
                  <span className="operation-value">: {indicatee}</span>
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
                  <span className="operation-value"> : {proceduree}</span>
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
                  <span className="operation-value"> : {findingss}</span>
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
                  <span className="operation-value"> : {incision}</span>
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
                  <span className="operation-value"> : {pathology}</span>
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
                  <span className="operation-value"> : {drain}</span>
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
                  <span className="operation-value"> : {antibiotics}</span>
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
                  <span className="operation-value"> : {bloodLoss}</span>
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
                    <span className="operation-value"> : {processs}</span>
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
                      : {data?.patientPosition}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {processDetails?.details && (
              <p className="mt-2">
                <b>Process Details:</b> {processDetails?.details}
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
                  <span className="operation-value"> : {observation}</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-2">
                  <span className="fw-bold operation-details-header">Diet</span>
                </div>
                <div className="col-10">
                  <span className="operation-value"> : {diet}</span>
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
                  <span className="operation-value"> : {analgesia}</span>
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
                  <span className="operation-value"> : {dvtProp}</span>
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
                  <span className="operation-value"> : {antibioticsTwo}</span>
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
                  <span className="operation-value"> : {discharge}</span>
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
                  <span className="operation-value"> : {followUp}</span>
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
                  <span className="operation-value"> : {postOperative}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mt-2">
              Electronically Signed By: {data?.signedBy}
              <span className="ms-2">
                {moment().format("Do MMMM YYYY, h:mm:ss a")}
              </span>
            </p>
            <small>
              CAUTION:This message may contain both confidential and privileged
              information intended only for the addresses named above.If you are
              not intended recipient you are hereby notified that any
              dissemination,distribution or reproduction of this message is
              prohibited.If you have received this this message in error please
              notify the sender immediately,then destroy the original
              message.Any views expressed in this message are solely those of
              the individual.
            </small>
          </div>
        </div>
        <div className="procedure-report-footer">
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
                  <p className="mt-2">{docData?.fullName}</p>
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
      </div>
    </div>
  );
};

export default ProcedureReport;
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
    maxHeight: "150px",
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
