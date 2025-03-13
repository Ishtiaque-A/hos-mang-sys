import { Popover } from "@mui/material";
import axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useScreenshot } from "use-react-screenshot";

const DiabeticManagement = (props) => {
  const [bp, setBp] = useState("");
  const [weight, setWeight] = useState(false);
  const [height, setHeight] = useState(false);
  const [bmi, setBmi] = useState(false);
  const [uncorrected, setUncorrected] = useState(false);
  const [corrected, setCorrected] = useState(false);

  const [deformity, setDeformity] = useState(false);
  const [dorsalisPedisPulse, setDorsalisPedisPulse] = useState(false);
  const [posteriorTibialis, setPosteriorTibialis] = useState();
  const [ankleBrachialIndexAbi, setAnkleBrachialIndexAbi] = useState(false);
  const [abiInterpretation, setAbiInterpretation] = useState(false);
  const [ulcer, setUlcer] = useState(false);

  const [decreasedSensation, setDecreasedSensation] = useState(false);
  const [vibration, setVibration] = useState({
    left: "",
    right: "",
  });

  const [pinPrick, setPinPrick] = useState();
  const [temperature, setTemperature] = useState(false);

  const [hbA1c, setHbA1c] = useState(false);
  const [allSameDate, setAllSameDate] = useState(false);
  const [lookUpInvestigations, setLookUpInvestigations] = useState(false);

  const [totalChol, setTotalChol] = useState(false);
  const [LdlChol, setLdlChol] = useState(false);
  const [hdl, setHdl] = useState(false);
  const [trig, setTrig] = useState(false);

  const [acr, setAcr] = useState(false);
  const [serumCreatinine, setSerumCreatinine] = useState(false);
  const [microAlbuminemia, setMicroAlbuminemia] = useState(false);
  const [egfr, setEgfr] = useState(false);

  const [endocrinologist, setEndocrinologist] = useState(false);
  const [ophthalmologist, setOphthalmologist] = useState(false);
  const [renalSpecialist, setRenalSpecialist] = useState(false);
  const [annualInfluenza, setAnnualInfluenza] = useState(false);
  const [pneumococcalVaccination, setPneumococcalVaccination] = useState(false);
  const [covidVaccination, setCovidVaccination] = useState(false);

  const [Intermittent, setIntermittent] = useState();
  const [RestPain, setRestPain] = useState();

  const [FundusExamination, setFundusExamination] = useState();
  const [FundusExaminationValue, setFundusExaminationValue] = useState();
  const [fundoscopyArray, setfundoscopyArray] = useState([]);

  const [UCVAArray1, setUCVAArray1] = useState([
    { name: "6/5+", id: 1 },
    { name: "6/5", id: 2 },
    { name: "6/5-", id: 3 },
    { name: "6/5=", id: 4 },
    { name: "6/6+", id: 5 },
    { name: "6/6", id: 6 },
    { name: "6/6-", id: 7 },
    { name: "6/6=", id: 8 },
    { name: "6/7.5+", id: 9 },
    { name: "6/7.5", id: 10 },
    { name: "6/7.5-", id: 11 },
    { name: "6/7.5=", id: 12 },
    { name: "6/9+", id: 13 },
  ]);
  const [UCVAArray2, setUCVAArray2] = useState([
    { name: "6/9", id: 1 },
    { name: "6/9-", id: 2 },
    { name: "6/9=", id: 3 },
    { name: "6/12+", id: 4 },
    { name: "6/12", id: 5 },
    { name: "6/12-", id: 6 },
    { name: "6/12=", id: 7 },
    { name: "6/24+", id: 8 },
    { name: "6/24", id: 9 },
    { name: "6/24-", id: 10 },
    { name: "6/24=", id: 11 },
    { name: "6/36+", id: 12 },
    { name: "6/36", id: 13 },
  ]);
  const [UCVAArray3, setUCVAArray3] = useState([
    { name: "6/36-", id: 1 },
    { name: "6/36=", id: 2 },
    { name: "6/60+", id: 3 },
    { name: "6/60", id: 4 },
    { name: "6/60-", id: 5 },
    { name: "6/60=", id: 6 },
    { name: "6/120+", id: 7 },
    { name: "6/120", id: 8 },
    { name: "6/120-", id: 9 },
    { name: "6/120=", id: 10 },
    { name: "HM", id: 11 },
    { name: "LP", id: 12 },
  ]);

  const [CorrectedRightDistance, setCorrectedRightDistance] = useState("");
  const [CorrectedRightNear, setCorrectedRightNear] = useState("");
  const [CorrectedLeftDistance, setCorrectedLeftDistance] = useState("");
  const [CorrectedLeftNear, setCorrectedLeftNear] = useState("");
  const [CorrectedOUDistance, setCorrectedOUDistance] = useState("");
  const [CorrectedOUNear, setCorrectedOUNear] = useState("");

  const [UCVARightDistance, setUCVARightDistance] = useState("");
  const [UCVARightNear, setUCVARightNear] = useState("");
  const [UCVALeftDistance, setUCVALeftDistance] = useState("");
  const [UCVALeftNear, setUCVALeftNear] = useState("");
  const [UCVAOUDistance, setUCVAOUDistance] = useState("");
  const [UCVAOUNear, setUCVAOUNear] = useState("");

  useEffect(() => {
    axios.get(`/fundoscopy`).then((res) => {
      if (res.data.status === 200) {
        setfundoscopyArray(res.data.fundoscopy);
      }
    });
  }, []);

  const [change1, setChange1] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const [change2, setChange2] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  const [change3, setChange3] = useState(false);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;

  const [change4, setChange4] = useState(false);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);
  const id4 = open4 ? "simple-popover" : undefined;

  const [change5, setChange5] = useState(false);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const open5 = Boolean(anchorEl5);
  const id5 = open5 ? "simple-popover" : undefined;

  const [change6, setChange6] = useState(false);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const open6 = Boolean(anchorEl6);
  const id6 = open6 ? "simple-popover" : undefined;

  const [change7, setChange7] = useState(false);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const open7 = Boolean(anchorEl7);
  const id7 = open7 ? "simple-popover" : undefined;

  const [change8, setChange8] = useState(false);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;

  const [change9, setChange9] = useState(false);
  const [anchorEl9, setAnchorEl9] = useState(null);
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;

  const [change10, setChange10] = useState(false);
  const [anchorEl10, setAnchorEl10] = useState(null);
  const open10 = Boolean(anchorEl10);
  const id10 = open10 ? "simple-popover" : undefined;

  const [image, takeScreenShot] = useScreenshot();
  const refPE1 = createRef(null);
  const [btnLoading, setbtnLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (image) {
      const pData = {
        patient_id: parseInt(props.patient_id),
        image: image,
      };
      axios
        .post(`/diabetic`, pData)
        .then((res) => {
          toast.success(res.data.message);
          props.setstateUpdate(Math.random());
          setbtnLoading(false);
        })
        .catch((error) => {
          toast.error("Opps ! Someting is wrong");
          setbtnLoading(false);
        });
    } else {
      toast.error("Please take screenshot");
    }
  };

  return (
    <>
      <div ref={refPE1} className="bg-white p-4 rounded-3">
        <div className="row">
          <div className="col-4">
            <div className="d-flex justify-content-between newBorn_date_box pt-2">
              <p className="w-75 ps-2">Date</p>
              <div className="ms-1">
                <label className="me-1">
                  <input
                    type="date"
                    name="Date"
                    className="date__input"
                    id="togBtn"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row shadow-lg bg-white mt-3 p-3 rounded">
          <div>
            <p className="fw-bold" style={{ marginBottom: "-14px" }}>
              Observation
            </p>
            <hr></hr>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">BP</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Pregnancy complications"
                      name="Pregnancy complications"
                      onChange={(e) => {
                        setChange1(!change1);
                        setBp("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl1(e.currentTarget)}
                    ></div>
                    {change1 && (
                      <Popover
                        id={id1}
                        open={open1}
                        anchorEl={anchorEl1}
                        onClose={() => setAnchorEl1(null)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <div
                          className="text-box"
                          style={{ width: "90px", padding: "4px" }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={bp}
                              type="text"
                              name="cough1"
                              onChange={(e) => {
                                setBp(e.target.value);
                              }}
                              id="exampleCheck1"
                            />
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{bp}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Weight</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Weight"
                      name="Weight"
                      onChange={(e) => {
                        setWeight(!weight);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Height</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Height"
                      name="Height"
                      onChange={(e) => {
                        setHeight(!height);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "-12px" }}>
            <div className="col-4">
              <div className="paedriatric_btn_container pt-2">
                <div className="d-flex justify-content-around">
                  <p className="w-75">BMI</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        type="checkbox"
                        value="BMI"
                        name="BMI"
                        onChange={(e) => {
                          setBmi(!bmi);
                        }}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 mb-3">
          <p className="fw-bold">Microvasculature assessment</p>
        </div>
        <div className="shadow-lg bg-white mt-3 p-3 rounded">
          <div className="row">
            <div>
              <p className="fw-bold" style={{ marginBottom: "-14px" }}>
                Eye
              </p>
              <hr></hr>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-between newBorn_date_box pt-2">
                <p className="w-75 ps-2">Date</p>
                <div className="ms-1">
                  <label className="me-1">
                    <input
                      type="date"
                      name="Date"
                      className="date__input"
                      id="togBtn"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row shadow-lg bg-white mt-3 pt-2 pb-4 rounded">
            <div>
              <p className="fw-bold mt-2" style={{ marginBottom: "-14px" }}>
                Visual acuity distal
              </p>
              <hr></hr>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-2 mt-2">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Non-Corrected</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange7(!change7);
                          setUCVAOUNear("");
                          setUCVAOUDistance("");
                          setUCVALeftNear();
                          setUCVALeftDistance("");
                          setUCVARightNear("");
                          setUCVARightDistance("");
                        }}
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
                          <div
                            style={{ width: "500px" }}
                            className="left-popup"
                          >
                            <div className="cns-container">
                              <ul
                                className="nav nav-pills"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link active"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                  >
                                    Right
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="pills-Left-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-Left"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-Left"
                                    aria-selected="false"
                                  >
                                    Left
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="pills-OU-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-OU"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-OU"
                                    aria-selected="false"
                                  >
                                    OU
                                  </button>
                                </li>
                              </ul>
                              <div
                                className="tab-content"
                                id="pills-tabContent"
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="pills-home"
                                  role="tabpanel"
                                  aria-labelledby="pills-home-tab"
                                >
                                  <div className="row eye-large-popup p-2">
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1">Distance</h6>
                                      <div className="border-top row">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough2"
                                                    onChange={(e) => {
                                                      setUCVARightDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough2"
                                                    onChange={(e) => {
                                                      setUCVARightDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough2"
                                                    onChange={(e) => {
                                                      setUCVARightDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1 ">Near</h6>
                                      <div className="border-top row clearfix">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough1"
                                                    onChange={(e) => {
                                                      setUCVARightNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough1"
                                                    onChange={(e) => {
                                                      setUCVARightNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough1"
                                                    onChange={(e) => {
                                                      setUCVARightNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
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
                                  id="pills-Left"
                                  role="tabpanel"
                                  aria-labelledby="pills-Left-tab"
                                >
                                  <div className="row eye-large-popup p-2">
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1">Distance</h6>
                                      <div className="border-top row">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setUCVALeftDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setUCVALeftDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setUCVALeftDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1 ">Near</h6>
                                      <div className="border-top row clearfix">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setUCVALeftNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setUCVALeftNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setUCVALeftNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
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
                                  id="pills-OU"
                                  role="tabpanel"
                                  aria-labelledby="pills-OU-tab"
                                >
                                  <div className="row eye-large-popup p-2">
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1">Distance</h6>
                                      <div className="border-top row">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setUCVAOUDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setUCVAOUDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setUCVAOUDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1 ">Near</h6>
                                      <div className="border-top row clearfix">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setUCVAOUNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setUCVAOUNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setUCVAOUNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                <div className="history-popup-value d-flex">
                  <p className="ms-1">
                    {UCVARightDistance && `R : D - ${UCVARightDistance}`}{" "}
                    {UCVARightNear && `,N -  ${UCVARightNear} `}{" "}
                    {(UCVARightNear || UCVARightDistance) && " | "}{" "}
                    {UCVALeftDistance && `L : D - ${UCVALeftDistance}`}{" "}
                    {UCVALeftNear && `,N -  ${UCVALeftNear} `}{" "}
                    {(UCVALeftNear || UCVALeftDistance) && " | "}{" "}
                    {UCVAOUDistance && `OU : D - ${UCVAOUDistance}`}{" "}
                    {UCVAOUNear && `,N -  ${UCVAOUNear} `}{" "}
                    {(UCVAOUNear || UCVAOUDistance) && " | "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-2 mt-2">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Corrected</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange8(!change8);
                          setCorrectedOUNear("");
                          setCorrectedOUDistance("");
                          setCorrectedLeftNear();
                          setCorrectedLeftDistance("");
                          setCorrectedRightNear("");
                          setCorrectedRightDistance("");
                        }}
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
                          <div
                            style={{ width: "500px" }}
                            className="left-popup"
                          >
                            <div className="cns-container">
                              <ul
                                className="nav nav-pills"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link active"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                  >
                                    Right
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="pills-Left-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-Left"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-Left"
                                    aria-selected="false"
                                  >
                                    Left
                                  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                  <button
                                    className="nav-link"
                                    id="pills-OU-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-OU"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-OU"
                                    aria-selected="false"
                                  >
                                    OU
                                  </button>
                                </li>
                              </ul>
                              <div
                                className="tab-content"
                                id="pills-tabContent"
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="pills-home"
                                  role="tabpanel"
                                  aria-labelledby="pills-home-tab"
                                >
                                  <div className="row eye-large-popup p-2">
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1">Distance</h6>
                                      <div className="border-top row">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough2"
                                                    onChange={(e) => {
                                                      setCorrectedRightDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough2"
                                                    onChange={(e) => {
                                                      setCorrectedRightDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough2"
                                                    onChange={(e) => {
                                                      setCorrectedRightDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1 ">Near</h6>
                                      <div className="border-top row clearfix">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough1"
                                                    onChange={(e) => {
                                                      setCorrectedRightNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough1"
                                                    onChange={(e) => {
                                                      setCorrectedRightNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough1"
                                                    onChange={(e) => {
                                                      setCorrectedRightNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
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
                                  id="pills-Left"
                                  role="tabpanel"
                                  aria-labelledby="pills-Left-tab"
                                >
                                  <div className="row eye-large-popup p-2">
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1">Distance</h6>
                                      <div className="border-top row">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setCorrectedLeftDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setCorrectedLeftDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setCorrectedLeftDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1 ">Near</h6>
                                      <div className="border-top row clearfix">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setCorrectedLeftNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setCorrectedLeftNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setCorrectedLeftNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
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
                                  id="pills-OU"
                                  role="tabpanel"
                                  aria-labelledby="pills-OU-tab"
                                >
                                  <div className="row eye-large-popup p-2">
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1">Distance</h6>
                                      <div className="border-top row">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setCorrectedOUDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setCorrectedOUDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough3"
                                                    onChange={(e) => {
                                                      setCorrectedOUDistance(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6 text-center border rounded">
                                      <h6 className="mt-1 ">Near</h6>
                                      <div className="border-top row clearfix">
                                        <div className="col-4 border-right">
                                          {UCVAArray1.length > 0 &&
                                            UCVAArray1.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setCorrectedOUNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4 border-right">
                                          {UCVAArray2.length > 0 &&
                                            UCVAArray2.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setCorrectedOUNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                        <div className="col-4">
                                          {UCVAArray3.length > 0 &&
                                            UCVAArray3.map((v, i) => {
                                              return (
                                                <div key={i} className="d-flex">
                                                  <input
                                                    className="custom-radio"
                                                    value={v.name}
                                                    type="radio"
                                                    name="cough4"
                                                    onChange={(e) => {
                                                      setCorrectedOUNear(
                                                        e.target.value
                                                      );
                                                    }}
                                                    id="flexRadioDefault1"
                                                  />
                                                  <label className="">
                                                    {v.name}
                                                  </label>
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                <div className="history-popup-value d-flex">
                  <p className="ms-1">
                    {CorrectedRightDistance &&
                      `R : D - ${CorrectedRightDistance}`}{" "}
                    {CorrectedRightNear && `,N -  ${CorrectedRightNear} `}{" "}
                    {(CorrectedRightNear || CorrectedRightDistance) && " | "}{" "}
                    {CorrectedLeftDistance &&
                      `L : D - ${CorrectedLeftDistance}`}{" "}
                    {CorrectedLeftNear && `,N -  ${CorrectedLeftNear} `}{" "}
                    {(CorrectedLeftNear || CorrectedLeftDistance) && " | "}{" "}
                    {CorrectedOUDistance && `OU : D - ${CorrectedOUDistance}`}{" "}
                    {CorrectedOUNear && `,N -  ${CorrectedOUNear} `}{" "}
                    {(CorrectedOUNear || CorrectedOUDistance) && " | "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-2 mt-2">
                <div className="d-flex justify-content-between">
                  <p>Fundoscopy</p>
                  <label className="switch me-1">
                    <input
                      onChange={() => {
                        setChange6(!change6);
                      }}
                      type="checkbox"
                      id="togBtn"
                    />
                    <div
                      onClick={(e) => {
                        setAnchorEl6(e.currentTarget);
                        setFundusExaminationValue([]);
                        setFundusExamination("");
                      }}
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
                        <div className="cns-eye-popup">
                          <div className="row">
                            <div className="col-4">
                              <div className="form-check ms-1">
                                <input
                                  className="form-check-input"
                                  value="Left"
                                  type="checkbox"
                                  name="cough2"
                                  onChange={(e) => {
                                    const { value, checked } = e.target;

                                    if (checked) {
                                      setFundusExamination([
                                        ...FundusExamination,
                                        value,
                                      ]);
                                    } else {
                                      const newCn = FundusExamination.filter(
                                        (item) => item !== value
                                      );
                                      setFundusExamination(newCn);
                                    }
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">Left</label>
                              </div>
                              <div className="form-check ms-1">
                                <input
                                  className="form-check-input"
                                  value="Right"
                                  type="checkbox"
                                  name="cough2"
                                  onChange={(e) => {
                                    const { value, checked } = e.target;

                                    if (checked) {
                                      setFundusExamination([
                                        ...FundusExamination,
                                        value,
                                      ]);
                                    } else {
                                      const newCn = FundusExamination.filter(
                                        (item) => item !== value
                                      );
                                      setFundusExamination(newCn);
                                    }
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  Right
                                </label>
                              </div>
                              <div className="form-check ms-1">
                                <input
                                  className="form-check-input"
                                  value="Both"
                                  type="checkbox"
                                  name="cough2"
                                  onChange={(e) => {
                                    const { value, checked } = e.target;

                                    if (checked) {
                                      setFundusExamination([
                                        ...FundusExamination,
                                        value,
                                      ]);
                                    } else {
                                      const newCn = FundusExamination.filter(
                                        (item) => item !== value
                                      );
                                      setFundusExamination(newCn);
                                    }
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">Both</label>
                              </div>
                            </div>

                            <div className="col-6">
                              {fundoscopyArray.map((item, i) => (
                                <div key={i} className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value={item.fundoscopy_name}
                                    type="checkbox"
                                    name={item.id}
                                    onChange={(e) => {
                                      const { value, checked } = e.target;

                                      if (checked) {
                                        setFundusExaminationValue([
                                          ...FundusExaminationValue,
                                          value,
                                        ]);
                                      } else {
                                        const newCn =
                                          FundusExaminationValue.filter(
                                            (item) => item !== value
                                          );
                                        setFundusExaminationValue(newCn);
                                      }
                                    }}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item.fundoscopy_name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
                <div className="history-popup-value">
                  <div className="row">
                    <div className="col-4">
                      {FundusExamination &&
                        Object.keys(FundusExamination).map((key, i) => (
                          <p key={i} className="me-2">
                            {FundusExamination[key]}
                          </p>
                        ))}
                    </div>
                    <div className="col-8">
                      {FundusExaminationValue &&
                        Object.keys(FundusExaminationValue).map((key, i) => (
                          <p key={i} className="me-2">
                            {FundusExaminationValue[key]}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row shadow-lg bg-white mt-3 p-3 rounded">
          <div className="row">
            <div>
              <p className="fw-bold" style={{ marginBottom: "-14px" }}>
                Feet
              </p>
              <hr></hr>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-between newBorn_date_box pt-2">
                <p className="w-75 ps-2">Date</p>
                <div className="ms-1">
                  <label className="me-1">
                    <input
                      type="date"
                      name="Date"
                      className="date__input"
                      id="togBtn"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row shadow-lg bg-white mt-3 pt-2 pb-4 rounded">
            <div className="col-4">
              <div className="paedriatric_btn_container pt-2">
                <div className="d-flex justify-content-around">
                  <p className="w-75">Deformity</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        type="checkbox"
                        value="Deformity"
                        name="Deformity"
                        onChange={(e) => {
                          setDeformity(!deformity);
                        }}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-2 mt-2">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Dorsalis Pedis pulse</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange10(!change10);
                        }}
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => {
                          setAnchorEl10(e.currentTarget);
                          setDorsalisPedisPulse();
                        }}
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
                          <div className="left-popup">
                            <div className="row">
                              <div className="col-6">
                                <h6 className="ml-2">Left</h6>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Biphasic"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Biphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Triphasic"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Triphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">+</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="++"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">++</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+++"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    +++
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+++"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    +++
                                  </label>
                                </div>
                              </div>
                              <div className="col-6">
                                <h6 className="ml-2">Right</h6>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Biphasic"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Biphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Triphasic"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Triphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">+</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="++"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">++</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+++"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    +++
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="++++"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setDorsalisPedisPulse({
                                        ...dorsalisPedisPulse,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    ++++
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                <div className="history-popup-value">
                  {dorsalisPedisPulse && (
                    <>
                      {dorsalisPedisPulse.left && (
                        <p className="me-1">
                          {" "}
                          {dorsalisPedisPulse.left && <span>Left : </span>}{" "}
                          {dorsalisPedisPulse.left}
                        </p>
                      )}
                      {dorsalisPedisPulse.right && (
                        <p className="me-1">
                          {" "}
                          {dorsalisPedisPulse.right && (
                            <span>Right : </span>
                          )}{" "}
                          {dorsalisPedisPulse.right}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-2 mt-2">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Posterior tibialis pulse</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange9(!change9);
                        }}
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => {
                          setAnchorEl9(e.currentTarget);
                          setPosteriorTibialis();
                        }}
                        className="slider round"
                      ></div>
                      {change9 && (
                        <Popover
                          id={id9}
                          open={open9}
                          anchorEl={anchorEl9}
                          onClose={() => setAnchorEl9(null)}
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
                            <div className="row">
                              <div className="col-6">
                                <h6 className="ml-2">Left</h6>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Biphasic"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Biphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Triphasic"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Triphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">+</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="++"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">++</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+++"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    +++
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+++"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    +++
                                  </label>
                                </div>
                              </div>
                              <div className="col-6">
                                <h6 className="ml-2">Right</h6>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Biphasic"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Biphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Doppler Triphasic"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Doppler Triphasic
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">+</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="++"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">++</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="+++"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    +++
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="++++"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setPosteriorTibialis({
                                        ...posteriorTibialis,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    ++++
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                <div className="history-popup-value">
                  {posteriorTibialis && (
                    <>
                      {posteriorTibialis.left && (
                        <p className="me-1">
                          {" "}
                          {posteriorTibialis.left && <span>Left : </span>}{" "}
                          {posteriorTibialis.left}
                        </p>
                      )}
                      {posteriorTibialis.right && (
                        <p className="me-1">
                          {" "}
                          {posteriorTibialis.right && (
                            <span>Right : </span>
                          )}{" "}
                          {posteriorTibialis.right}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="paedriatric_btn_container pt-2">
                  <div className="d-flex justify-content-around">
                    <p className="w-75">Ankle brachial index ABI</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          type="checkbox"
                          value="Ankle brachial index ABI"
                          name="Ankle brachial index ABI"
                          onChange={(e) => {
                            setAnkleBrachialIndexAbi(!ankleBrachialIndexAbi);
                          }}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="paedriatric_btn_container pt-2 ms-1">
                  <div className="d-flex justify-content-around">
                    <p className="w-75">ABI interpretation</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          type="checkbox"
                          value="ABI interpretation"
                          name="ABI interpretation"
                          onChange={(e) => {
                            setAbiInterpretation(!abiInterpretation);
                          }}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="paedriatric_btn_container pt-2 ms-1">
                  <div className="d-flex justify-content-around">
                    <p className="w-75">Ulcer</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          type="checkbox"
                          value="Ulcer"
                          name="Ulcer"
                          onChange={(e) => {
                            setUlcer(!ulcer);
                          }}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <div className="exam-bg-white p-1 mt-2">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Intermittent claudication</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Jaundiced"
                          value="Jaundiced"
                          type="checkbox"
                          onChange={(e) => {
                            setChange4(!change4);
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => {
                            setAnchorEl4(e.currentTarget);
                            setIntermittent();
                          }}
                          className="slider round"
                        ></div>
                        {change4 && (
                          <Popover
                            id={id4}
                            open={open4}
                            anchorEl={anchorEl4}
                            onClose={() => setAnchorEl4(null)}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <div
                              style={{
                                width: "350px",
                                padding: "9px",
                              }}
                            >
                              <div className="row">
                                <div className="col-sm-6">
                                  <span className="ml-3">Left</span>
                                </div>
                                <div className="col-sm-6">
                                  <span className="ml-3">Right</span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 d-flex">
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Pres"
                                      type="radio"
                                      name="left"
                                      onChange={(e) =>
                                        setIntermittent({
                                          ...pinPrick,
                                          left: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Pres</label>
                                  </div>
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Abs"
                                      type="radio"
                                      name="left"
                                      onChange={(e) =>
                                        setIntermittent({
                                          ...Intermittent,
                                          left: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Abs</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 d-flex">
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value=" Pres"
                                      type="radio"
                                      name="right"
                                      onChange={(e) =>
                                        setIntermittent({
                                          ...Intermittent,
                                          right: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Pres</label>
                                  </div>
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Abs"
                                      type="radio"
                                      name="right"
                                      onChange={(e) =>
                                        setIntermittent({
                                          ...Intermittent,
                                          right: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Abs</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  {Intermittent && (
                    <>
                      <p style={{ color: "blue" }}>{`${Intermittent.left === undefined
                          ? ""
                          : `left : ${Intermittent.left}`
                        }  ${Intermittent.right === undefined
                          ? ""
                          : `| right : ${Intermittent.right}`
                        }`}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className="exam-bg-white p-1 mt-2">
                  <div className="d-flex justify-content-between">
                    <p className="w-75">Rest pain</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          name="Jaundiced"
                          value="Jaundiced"
                          type="checkbox"
                          onChange={(e) => {
                            setChange5(!change5);
                          }}
                          id="togBtn"
                        />
                        <div
                          onClick={(e) => {
                            setAnchorEl5(e.currentTarget);
                            setRestPain();
                          }}
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
                            <div
                              style={{
                                width: "350px",
                                padding: "9px",
                              }}
                            >
                              <div className="row">
                                <div className="col-sm-6">
                                  <span className="ml-3">Left</span>
                                </div>
                                <div className="col-sm-6">
                                  <span className="ml-3">Right</span>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 d-flex">
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Pres"
                                      type="radio"
                                      name="left"
                                      onChange={(e) =>
                                        setRestPain({
                                          ...RestPain,
                                          left: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Pres</label>
                                  </div>
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Abs"
                                      type="radio"
                                      name="left"
                                      onChange={(e) =>
                                        setRestPain({
                                          ...RestPain,
                                          left: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Abs</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 d-flex">
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value=" Pres"
                                      type="radio"
                                      name="right"
                                      onChange={(e) =>
                                        setRestPain({
                                          ...RestPain,
                                          right: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Pres</label>
                                  </div>
                                  <div className="form-check ms-1">
                                    <input
                                      className="form-check-input"
                                      value="Abs"
                                      type="radio"
                                      name="right"
                                      onChange={(e) =>
                                        setRestPain({
                                          ...RestPain,
                                          right: e.target.value,
                                        })
                                      }
                                      id="flexRadioDefault1"
                                    />
                                    <label>Abs</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover>
                        )}
                      </label>
                    </div>
                  </div>
                  {RestPain && (
                    <>
                      <p style={{ color: "blue" }}>{`${RestPain.left === undefined
                          ? ""
                          : `left : ${RestPain.left}`
                        }  ${RestPain.right === undefined
                          ? ""
                          : `| right : ${RestPain.right}`
                        }`}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row shadow-lg bg-white mt-3 p-3 rounded">
          <div className="row">
            <div>
              <p className="fw-bold" style={{ marginBottom: "-14px" }}>
                Neuropathy
              </p>
              <hr></hr>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-between newBorn_date_box pt-2">
                <p className="w-75 ps-2">Date</p>
                <div className="ms-1">
                  <label className="me-1">
                    <input
                      type="date"
                      name="Date"
                      className="date__input"
                      id="togBtn"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="row shadow-lg bg-white mt-3 pt-2 pb-4 rounded">
            <div className="col-4">
              <div className="paedriatric_btn_container pt-2">
                <div className="d-flex justify-content-around">
                  <p className="w-75">
                    Decreased sensation ,pins and needles, Neuropathic pain{" "}
                  </p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        type="checkbox"
                        value="Decreased sensation ,pins and needles, Neuropathic pain"
                        name="Decreased sensation ,pins and needles, Neuropathic pain "
                        onChange={(e) => {
                          setDecreasedSensation(!decreasedSensation);
                        }}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-1 mt-2">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Pin Prick with 10g Monofilament</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange3(!change3);
                        }}
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => {
                          setAnchorEl3(e.currentTarget);
                          setPinPrick();
                        }}
                        className="slider round"
                      ></div>
                      {change3 && (
                        <Popover
                          id={id3}
                          open={open3}
                          anchorEl={anchorEl3}
                          onClose={() => setAnchorEl3(null)}
                          anchorOrigin={{
                            vertical: "center",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <div
                            style={{
                              width: "350px",
                              padding: "9px",
                            }}
                          >
                            <div className="row">
                              <div className="col-sm-4"></div>
                              <div className="col-sm-4">
                                <h6 className="ml-3">Left</h6>
                              </div>
                              <div className="col-sm-4">
                                <h6 className="ml-3">Right</h6>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>Hallux plantar</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="HalluxLeft"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HalluxLeft: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="HalluxLeft"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HalluxLeft: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="HalluxRight"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HalluxRight: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="HalluxRight"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HalluxRight: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>MPJ 1 plantar</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="MPJ1Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ1Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ1Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ1Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="MPJ1Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ1Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ1Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ1Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>MPJ 2 plantar </p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="MPJ2Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ2Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ2Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ2Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="MPJ2Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ2Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ2Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ2Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>MPJ 3 plantar</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="MPJ3Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ3Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ3Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ3Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="MPJ3Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ3Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ3Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ3Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>MPJ 4 plantar</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="MPJ4Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ4Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ4Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ4Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="MPJ4Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ4Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ4Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ4Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>MPJ5 plantar</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="MPJ5Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ5Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ5Left"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ5Left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="MPJ5Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ5Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="MPJ5Right"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        MPJ5Right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>Heel plantar</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="HeelLeft"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HeelLeft: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="HeelLeft"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HeelLeft: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="HeelRight"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HeelRight: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="HeelRight"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        HeelRight: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4 mt-2">
                                <p>Dorsum of the foot</p>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Pres"
                                    type="radio"
                                    name="DorsumLeft"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        DorsumLeft: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="DorsumLeft"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        DorsumLeft: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                              <div className="col-sm-4 d-flex">
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value=" Pres"
                                    type="radio"
                                    name="DorsumRight"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        DorsumRight: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Pres</label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Abs"
                                    type="radio"
                                    name="DorsumRight"
                                    onChange={(e) =>
                                      setPinPrick({
                                        ...pinPrick,
                                        DorsumRight: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label>Abs</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                {pinPrick && (
                  <>
                    <p style={{ color: "blue" }}>{`${pinPrick.HalluxLeft === undefined
                        ? ""
                        : `HalluxLeft : ${pinPrick.HalluxLeft}`
                      }  ${pinPrick.HalluxRight === undefined
                        ? ""
                        : `| HalluxRight : ${pinPrick.HalluxRight}`
                      }`}</p>
                    <p style={{ color: "blue" }}>{`${pinPrick.MPJ1Left === undefined
                        ? ""
                        : `MPJ1Left : ${pinPrick.MPJ1Left}`
                      }  ${pinPrick.MPJ1Right === undefined
                        ? ""
                        : `| MPJ1Right : ${pinPrick.MPJ1Right}`
                      }`}</p>

                    <p style={{ color: "blue" }}>{`${pinPrick.MPJ2Left === undefined
                        ? ""
                        : `MPJ2Left : ${pinPrick.MPJ2Left}`
                      }  ${pinPrick.MPJ2Right === undefined
                        ? ""
                        : `| MPJ2Right : ${pinPrick.MPJ2Right}`
                      }`}</p>

                    <p style={{ color: "blue" }}>{`${pinPrick.MPJ3Left === undefined
                        ? ""
                        : `MPJ3Left : ${pinPrick.MPJ3Left}`
                      }  ${pinPrick.MPJ3Right === undefined
                        ? ""
                        : `| MPJ3Right : ${pinPrick.MPJ3Right}`
                      }`}</p>

                    <p style={{ color: "blue" }}>{`${pinPrick.MPJ4Left === undefined
                        ? ""
                        : `MPJ4Left : ${pinPrick.MPJ4Left}`
                      }  ${pinPrick.MPJ4Right === undefined
                        ? ""
                        : `| MPJ4Right : ${pinPrick.MPJ4Right}`
                      }`}</p>

                    <p style={{ color: "blue" }}>{`${pinPrick.MPJ5Left === undefined
                        ? ""
                        : `MPJ5Left : ${pinPrick.MPJ5Left}`
                      }  ${pinPrick.MPJ5Right === undefined
                        ? ""
                        : `| MPJ5Right : ${pinPrick.MPJ5Right}`
                      }`}</p>

                    <p style={{ color: "blue" }}>{`${pinPrick.HeelLeft === undefined
                        ? ""
                        : `HeelLeft : ${pinPrick.HeelLeft}`
                      }  ${pinPrick.HeelRight === undefined
                        ? ""
                        : `| HeelRight : ${pinPrick.HeelRight}`
                      }`}</p>

                    <p style={{ color: "blue" }}>{`${pinPrick.DorsumLeft === undefined
                        ? ""
                        : `DorsumLeft : ${pinPrick.DorsumLeft}`
                      }  ${pinPrick.DorsumRight === undefined
                        ? ""
                        : `| DorsumRight : ${pinPrick.DorsumRight}`
                      }`}</p>
                  </>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="exam-bg-white p-1 mt-2">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Vibration :Tuning fork</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange2(!change2);
                          setVibration({ ...vibration, left: "", right: "" });
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
                          <div className="left-popup" height="200px">
                            <div className="row">
                              <div className="col-6">
                                <h6 className="ml-2">Left</h6>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="0/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    0/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="1/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    1/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="2/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    2/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="3/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    3/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="4/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    4/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="5/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    5/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="6/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    6/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="7/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    7/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="8/8"
                                    type="radio"
                                    name="right"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        left: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    8/8
                                  </label>
                                </div>
                              </div>
                              <div className="col-6">
                                <h6 className="ml-2">Right</h6>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="0/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    0/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="1/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    1/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="2/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    2/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="3/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    3/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="4/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    4/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="5/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    5/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="6/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    6/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="7/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    7/8
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="8/8"
                                    type="radio"
                                    name="right1"
                                    onChange={(e) =>
                                      setVibration({
                                        ...vibration,
                                        right: e.target.value,
                                      })
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    8/8
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                <div className="history-popup-value">
                  {vibration.left && (
                    <p className="me-1">
                      {" "}
                      {vibration.left && <span>Left : </span>} {vibration.left}
                    </p>
                  )}
                  {vibration.right && (
                    <p className="me-1">
                      {" "}
                      {vibration.right && <span>Right : </span>}{" "}
                      {vibration.right}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* <div className='col-4'>
                        <div className="paedriatric_btn_container pt-2">
                            <div className="d-flex justify-content-around">
                                <p className="w-75">Pin Prick with 10g Monofilament</p>
                                <div className="ms-1">
                                    <label className="switch me-1">
                                        <input
                                            type="checkbox"
                                            value="Pin prick with monofilment"
                                            name="Pin prick with monofilment"
                                            onChange={(e) => { setPinPrick(!pinPrick) }}
                                            id="togBtn"
                                        />
                                        <div className="slider round"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}
            <div className="row">
              <div className="col-4">
                <div className="paedriatric_btn_container pt-2">
                  <div className="d-flex justify-content-around">
                    <p className="w-75">Temperature</p>
                    <div className="ms-1">
                      <label className="switch me-1">
                        <input
                          type="checkbox"
                          value="Temperature"
                          name="Temperature"
                          onChange={(e) => {
                            setTemperature(!temperature);
                          }}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row shadow-lg bg-white mt-3 p-3 rounded">
          <div>
            <p className="fw-bold" style={{ marginBottom: "-14px" }}>
              {" "}
              Metabolic status{" "}
            </p>
            <hr></hr>
          </div>
          <div className="row">
            <div className="col-4 gx-4">
              <div className="row shadow-lg bg-white rounded p-2">
                <div className="col-12">
                  <div className="d-flex justify-content-between newBorn_date_box pt-2">
                    <p className="w-75 ps-2">Date</p>
                    <div className="ms-1">
                      <label className="me-1">
                        <input
                          type="date"
                          name="Date"
                          className="date__input"
                          id="togBtn"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">Hb A1c</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Hb A1c"
                            name="Hb A1c"
                            onChange={(e) => {
                              setHbA1c(!hbA1c);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">All same date</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="All same date"
                            name="All same date"
                            onChange={(e) => {
                              setAllSameDate(!allSameDate);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">Look up Investigations</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Look up Investigations"
                            name="Look up Investigations"
                            onChange={(e) => {
                              setLookUpInvestigations(!lookUpInvestigations);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 gx-5">
              <div className="row shadow-lg bg-white rounded p-2">
                <div className="col-12">
                  <div className="d-flex justify-content-between newBorn_date_box pt-2">
                    <p className="w-75 ps-2">Date</p>
                    <div className="ms-1">
                      <label className="me-1">
                        <input
                          type="date"
                          name="Date"
                          className="date__input"
                          id="togBtn"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">Total Chol </p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Total Chol "
                            name="Total Chol "
                            onChange={(e) => {
                              setTotalChol(!totalChol);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">LDL Chol</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="LDL Chol"
                            name="LDL Chol"
                            onChange={(e) => {
                              setLdlChol(!LdlChol);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">HDL</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="HDL"
                            name="HDL"
                            onChange={(e) => {
                              setHdl(!hdl);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">Trig</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Trig"
                            name="Trig"
                            onChange={(e) => {
                              setTrig(!trig);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 gx-5">
              <div className="row shadow-lg bg-white rounded p-2">
                <div className="col-12">
                  <div className="d-flex justify-content-between newBorn_date_box pt-2">
                    <p className="w-75 ps-2">Date</p>
                    <div className="ms-1">
                      <label className="me-1">
                        <input
                          type="date"
                          name="Date"
                          className="date__input"
                          id="togBtn"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">ACR</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="ACR"
                            name="ACR"
                            onChange={(e) => {
                              setAcr(!acr);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">Serum creatinine</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Serum creatinine"
                            name="Serum creatinine"
                            onChange={(e) => {
                              setSerumCreatinine(!serumCreatinine);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">Micro-albuminemia</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Micro-albuminemia"
                            name="Micro-albuminemia"
                            onChange={(e) => {
                              setMicroAlbuminemia(!microAlbuminemia);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="paedriatric_btn_container pt-2">
                    <div className="d-flex justify-content-around">
                      <p className="w-75">eGFR</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="eGFR"
                            name="eGFR"
                            onChange={(e) => {
                              setEgfr(!egfr);
                            }}
                            id="togBtn"
                          />
                          <div className="slider round"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row shadow-lg bg-white mt-3 p-3 rounded">
          <div>
            <p className="fw-bold" style={{ marginBottom: "-14px" }}>
              Refer
            </p>
            <hr></hr>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Endocrinologist</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Endocrinologist"
                      name="Endocrinologist"
                      onChange={(e) => {
                        setEndocrinologist(!endocrinologist);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Ophthalmologist</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Ophthalmologist"
                      name="Ophthalmologist"
                      onChange={(e) => {
                        setOphthalmologist(!ophthalmologist);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Renal specialist</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Renal  specialist"
                      name="Renal  specialist"
                      onChange={(e) => {
                        setRenalSpecialist(!renalSpecialist);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row shadow-lg bg-white mt-3 p-3 rounded">
          <div>
            <p className="fw-bold" style={{ marginBottom: "-14px" }}>
              Vaccination
            </p>
            <hr></hr>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Annual Influenza</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Annual  Influenza"
                      name="Annual  Influenza"
                      onChange={(e) => {
                        setAnnualInfluenza(!annualInfluenza);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Pneumococcal Vaccination 65yr</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Pneumococcal Vaccination >65yr"
                      name="Pneumococcal Vaccination >65yr"
                      onChange={(e) => {
                        setPneumococcalVaccination(!pneumococcalVaccination);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Covid Vaccination </p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Covid Vaccination"
                      name="Covid Vaccination"
                      onChange={(e) => {
                        setCovidVaccination(!covidVaccination);
                      }}
                      id="togBtn"
                    />
                    <div className="slider round"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pedriatric_btn">
        <button
          className="pedriatric_btn_left"
          onClick={props.closeDiabeticManagementModal}
        >
          Cancel
        </button>
        {btnLoading ? (
          <button className="pedriatric_btn_middle">Loading....</button>
        ) : (
          <button className="pedriatric_page4_btn_left" onClick={handleSave}>
            Save
          </button>
        )}

        {btnLoading ? (
          <button className="pedriatric_btn_middle mr-2">Loading...</button>
        ) : (
          <button
            className="pedriatric_btn_right mr-2"
            onClick={() => {
              setbtnLoading(true);
              takeScreenShot(refPE1.current).then((res) => {
                toast.success("ScreenShot take Sucessfully", {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "light",
                });
                setbtnLoading(false);
              });
            }}
          >
            Take Screenshot{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default DiabeticManagement;
