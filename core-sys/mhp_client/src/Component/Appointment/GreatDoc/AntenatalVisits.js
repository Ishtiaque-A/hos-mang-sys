import { Popover } from "@mui/material";
import React, { createRef, useState } from "react";
import { Table } from "react-bootstrap";
import "./AntenatalVisits.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useScreenshot } from "use-react-screenshot";

const AntenatalVisits = (props) => {
  const [date, setEnterdDate] = useState("");
  const dateInput = (e) => {
    setEnterdDate(e.target.value);
  };
  //
  const [change501, setChange501] = useState(false);
  const [anchorEl501, setAnchorEl501] = useState(null);
  const open501 = Boolean(anchorEl501);
  const id501 = open501 ? "simple-popover" : undefined;

  //
  const [change490, setChange490] = useState(false);
  const [anchorEl490, setAnchorEl490] = useState(null);
  const open490 = Boolean(anchorEl490);
  const id490 = open490 ? "simple-popover" : undefined;
  //
  const [change, setChange] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //
  const [change1, setChange1] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const id1 = open ? "simple-popover" : undefined;
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
  const [change7, setChange7] = useState(false);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const open7 = Boolean(anchorEl7);
  const id7 = open7 ? "simple-popover" : undefined;
  //
  const [change8, setChange8] = useState(false);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
  //
  const [change9, setChange9] = useState(false);
  const [anchorEl9, setAnchorEl9] = useState(null);
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;
  //
  const [change10, setChange10] = useState(false);
  const [anchorEl10, setAnchorEl10] = useState(null);
  const open10 = Boolean(anchorEl10);
  const id10 = open10 ? "simple-popover" : undefined;
  //
  const [change11, setChange11] = useState(false);
  const [anchorEl11, setAnchorEl11] = useState(null);
  const open11 = Boolean(anchorEl11);
  const id11 = open11 ? "simple-popover" : undefined;
  //
  const [change12, setChange12] = useState(false);
  const [anchorEl12, setAnchorEl12] = useState(null);
  const open12 = Boolean(anchorEl12);
  const id12 = open12 ? "simple-popover" : undefined;
  //
  const [change13, setChange13] = useState(false);
  const [anchorEl13, setAnchorEl13] = useState(null);
  const open13 = Boolean(anchorEl13);
  const id13 = open13 ? "simple-popover" : undefined;
  //
  const [change14, setChange14] = useState(false);
  const [anchorEl14, setAnchorEl14] = useState(null);
  const open14 = Boolean(anchorEl14);
  const id14 = open14 ? "simple-popover" : undefined;
  //
  const [change15, setChange15] = useState(false);
  const [anchorEl15, setAnchorEl15] = useState(null);
  const open15 = Boolean(anchorEl15);
  const id15 = open15 ? "simple-popover" : undefined;
  //
  const [change16, setChange16] = useState(false);
  const [anchorEl16, setAnchorEl16] = useState(null);
  const open16 = Boolean(anchorEl16);
  const id16 = open16 ? "simple-popover" : undefined;
  //
  const [change17, setChange17] = useState(false);
  const [anchorEl17, setAnchorEl17] = useState(null);
  const open17 = Boolean(anchorEl17);
  const id17 = open17 ? "simple-popover" : undefined;
  //
  const [change18, setChange18] = useState(false);
  const [anchorEl18, setAnchorEl18] = useState(null);
  const open18 = Boolean(anchorEl18);
  const id18 = open18 ? "simple-popover" : undefined;
  //
  const [change19, setChange19] = useState(false);
  const [anchorEl19, setAnchorEl19] = useState(null);
  const open19 = Boolean(anchorEl19);
  const id19 = open19 ? "simple-popover" : undefined;
  //
  const [change20, setChange20] = useState(false);
  const [anchorEl20, setAnchorEl20] = useState(null);
  const open20 = Boolean(anchorEl20);
  const id20 = open20 ? "simple-popover" : undefined;

  const [systolic, setSystolic] = useState("");
  const [notesText, setNotesText] = useState("");
  const [bMITarget, setBMITarget] = useState([]);
  //
  const [diastolic, setDiastolic] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bMI, setBMI] = useState("");
  const [prePregnancyBMI, setPrePregnancyBMI] = useState("");
  const [gestation, setGestation] = useState("");
  const [protine, setProtine] = useState("");
  const [glucose, setGlucose] = useState("");
  const [ketone, setKetone] = useState("");
  const [others, setOthers] = useState("");
  const [fundalHeight, setFundalHeight] = useState("");
  const [size, setSize] = useState("");
  const [clinical, setClinical] = useState("");
  const [foetalMovement, setFoetalMovement] = useState("");
  const [presentation, setPresentation] = useState("");
  const [position, setPosition] = useState("");
  const [engagement, setEngagement] = useState("");
  const [foetalHeartSound, setFoetalHeartSound] = useState("");
  const [dTpa, setDTpa] = useState(false);
  const [influenza, setInfluenza] = useState(false);
  const [antiD, setAntiD] = useState(false);
  const [i8Weeks, setI8Weeks] = useState(false);
  const [i36Weeks, setI36Weeks] = useState(false);
  const [heartRate, setHeartRate] = useState("");

  const doctorData = JSON.parse(localStorage.getItem("userData"));
  const patientId = props.patient_id;

  const [image, takeScreenShot] = useScreenshot();
  const refPE1 = createRef(null);
  const [btnLoading, setbtnLoading] = useState(false);
  console.log(image, "screenshot Images");

  const handleScreenshot = () => {
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
  };

  const saveAntenatalVisitsData = () => {
    const formData = {
      patient_id: patientId,
      doctor_id: doctorData.user_id,
      image: image,
      systolic_value: systolic,
      diastolic_ternary: diastolic,
      height_ternary: height,
      weight_ternary: weight,
      bMI_ternary: bMI,
      bmi_terget: bMITarget.toString(),
      prePregnancyBMI_ternary: prePregnancyBMI,
      gestation_ternary: gestation,
      protine_ternary: protine,
      glucose_ternary: glucose,
      ketone_ternary: ketone,
      others_ternary: others,
      fundalHeight_ternary: fundalHeight,
      size_ternary: size,
      clinical_ternary: clinical,
      foetalMovement_ternary: foetalMovement,
      presentation_ternary: presentation,
      position_ternary: position,
      engagement_ternary: engagement,
      foetalHeartSound_ternary: foetalHeartSound,
      dTpa_ternary: dTpa,
      influenza_ternary: influenza,
      antiD_ternary: antiD,
      i8Weeks_ternary: i8Weeks,
      i36Weeks_ternary: i36Weeks,
      antenatal_visits_date: date,
      text_value: notesText,
      next_date: date,
    };

    if (!image) {
      toast.error("Please Take Screenshot");
      return;
    }
    axios.post("/save-antenatal-visits", formData).then((res) => {
      if (res.status === 200) {
        props.setstateUpdate(Math.random());
        toast.success(res.data.message);
        const closeModal = props.setmodelOpen;
        closeModal(false);
      }
    });
  };

  return (
    <div>
      <div
        className="simple-scrollbar"
        style={{
          height: "380px",
          position: "relative",
          overflow: "auto",
        }}
      >
        <div ref={refPE1} className="container mb-5">
          <div className="row">
            <div className="col-4">
              <div className="current__bg__white p-1">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Date</p>
                  <div className="ms-1">
                    <label className="me-1">
                      <input
                        type="date"
                        name="Date"
                        className="date__input"
                        // onChange={(e) =>  setDate(e.target.value) }
                        onChange={dateInput}
                        id="togBtn"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="blood_pressure_box">
                <strong>Blood Pressure</strong>
                <hr />
                <div className="row g-2">
                  <div className="col-12">
                    <div className="current__bg__white p-1">
                      <div className="d-flex justify-content-between">
                        <p className="w-75">Systolic</p>
                        <div className="ms-1">
                          <label className="switch me-1">
                            <input
                              name="Jaundiced"
                              value="Jaundiced"
                              type="checkbox"
                              onChange={(e) => {
                                setChange490(!change490);
                                setSystolic("");
                              }}
                              id="togBtn"
                            />
                            <div
                              onClick={(e) => setAnchorEl490(e.currentTarget)}
                              className="slider round"
                            ></div>
                            {change490 && (
                              <Popover
                                className="mt-2"
                                id={id490}
                                open={open490}
                                anchorEl={anchorEl490}
                                onClose={() => setAnchorEl490(null)}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <div className="left-popup">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <input
                                        type="text"
                                        name="left"
                                        onChange={(e) =>
                                          setSystolic(e.target.value)
                                        }
                                        className="form-control form-control-sm"
                                        id="colFormLabelSm"
                                      />
                                    </div>
                                    <label className="col-sm-4 col-form-label col-form-label-sm">
                                      mm of Hg
                                    </label>
                                  </div>
                                </div>
                              </Popover>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="history-popup-value">
                        <p className="me-2">
                          {systolic}
                          {`${systolic && " mm of Hg"}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="current__bg__white p-1">
                      <div className="d-flex justify-content-between">
                        <p className="w-75">Diastolic</p>
                        <div className="ms-1">
                          <label className="switch me-1">
                            <input
                              name="Jaundiced"
                              value="Jaundiced"
                              type="checkbox"
                              onChange={(e) => {
                                setChange(!change);
                                setDiastolic("");
                              }}
                              id="togBtn"
                            />
                            <div
                              onClick={(e) => setAnchorEl(e.currentTarget)}
                              className="slider round"
                            ></div>
                            {change && (
                              <Popover
                                className="mt-2"
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <div className="left-popup">
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <input
                                        type="text"
                                        name="left"
                                        onChange={(e) =>
                                          setDiastolic(e.target.value)
                                        }
                                        className="form-control form-control-sm"
                                        id="colFormLabelSm"
                                      />
                                    </div>
                                    <label className="col-sm-4 col-form-label col-form-label-sm">
                                      mm of Hg
                                    </label>
                                  </div>
                                </div>
                              </Popover>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="history-popup-value">
                        <p className="me-2">
                          {diastolic}
                          {`${diastolic && " mm of Hg"}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 pt-2">
              <div className="row g-2">
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Height</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange1(!change1);
                              setHeight("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl1(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change1 && (
                            <Popover
                              className="mt-2"
                              id={id1}
                              open={open1}
                              anchorEl={anchorEl1}
                              onClose={() => setAnchorEl1(null)}
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) =>
                                        setHeight(e.target.value)
                                      }
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    cm
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {height}
                        {`${height && " cm"}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Weight</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange2(!change2);
                              setWeight("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl2(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change2 && (
                            <Popover
                              className="mt-2"
                              id={id2}
                              open={open2}
                              anchorEl={anchorEl2}
                              onClose={() => setAnchorEl2(null)}
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) =>
                                        setWeight(e.target.value)
                                      }
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    kg
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {weight}
                        {`${weight && " kg"}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">BMI</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange3(!change3);
                              setBMI("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl3(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change3 && (
                            <Popover
                              className="mt-2"
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) => setBMI(e.target.value)}
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    kg/m<sup>2</sup>
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {bMI}
                        {bMI && (
                          <span>
                            kg/m<sup>2</sup>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 pt-2">
              <div className="row g-2">
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Pre-Pregnancy BMI</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange4(!change4);
                              setPrePregnancyBMI("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl4(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change4 && (
                            <Popover
                              className="mt-2"
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
                              <div className="left-popup">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) =>
                                        setPrePregnancyBMI(e.target.value)
                                      }
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    kg/m<sup>2</sup>
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {prePregnancyBMI}
                        {prePregnancyBMI && (
                          <span>
                            kg/m<sup>2</sup>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">BMI Target</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange501(!change501);
                              setBMITarget([]);
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl501(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change501 && (
                            <Popover
                              id={id501}
                              open={open501}
                              anchorEl={anchorEl501}
                              onClose={() => setAnchorEl501(null)}
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
                                <div className="input-group w-50">
                                  <Table className="immunisation-table mt-3">
                                    <tbody>
                                      <tr>
                                        <td className="w-50 fw-bold">
                                          Pre Pregnancy BMI
                                        </td>
                                        <td className="w-50 fw-bold">
                                          Target weight gain in this pregnancy
                                        </td>
                                        <td className="w-50 fw-bold">
                                          Choose your target and discuss
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>&#9001; 18.4</td>
                                        <td>12.5 - 18 Kg</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            id=""
                                            name="bm1"
                                            value="18.5 | 12.5 - 18 Kg"
                                            onChange={(e) => {
                                              const { value, checked } =
                                                e.target;

                                              if (checked) {
                                                setBMITarget([
                                                  ...bMITarget,
                                                  value,
                                                ]);
                                              } else {
                                                const newCn = bMITarget.filter(
                                                  (item) => item !== value
                                                );
                                                setBMITarget(newCn);
                                              }
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>18.4 - 24.9</td>
                                        <td>11.5 - 16 Kg</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            name="bm2"
                                            value="18.4 - 24.9 | 11.5 - 16 Kg"
                                            onChange={(e) => {
                                              const { value, checked } =
                                                e.target;

                                              if (checked) {
                                                setBMITarget([
                                                  ...bMITarget,
                                                  value,
                                                ]);
                                              } else {
                                                const newCn = bMITarget.filter(
                                                  (item) => item !== value
                                                );
                                                setBMITarget(newCn);
                                              }
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>25 - 29.9</td>
                                        <td>7 - 11.5 Kg</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            id=""
                                            name="bm3"
                                            value="25 - 29.9 | 7 - 11.5 Kg"
                                            onChange={(e) => {
                                              const { value, checked } =
                                                e.target;

                                              if (checked) {
                                                setBMITarget([
                                                  ...bMITarget,
                                                  value,
                                                ]);
                                              } else {
                                                const newCn = bMITarget.filter(
                                                  (item) => item !== value
                                                );
                                                setBMITarget(newCn);
                                              }
                                            }}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>30</td>
                                        <td>5 - 7 Kg</td>
                                        <td>
                                          <input
                                            type="checkbox"
                                            id="vehicle1"
                                            name="bm4"
                                            value="30 | 5 - 7 Kg"
                                            onChange={(e) => {
                                              const { value, checked } =
                                                e.target;

                                              if (checked) {
                                                setBMITarget([
                                                  ...bMITarget,
                                                  value,
                                                ]);
                                              } else {
                                                const newCn = bMITarget.filter(
                                                  (item) => item !== value
                                                );
                                                setBMITarget(newCn);
                                              }
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      {Object.keys(bMITarget).map((item, i) => (
                        <p key={i}>{bMITarget[item]}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-4">
              <div className="current__bg__white p-1">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Gestation</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => {
                          setChange5(!change5);
                          setGestation("");
                        }}
                        id="togBtn"
                      />
                      <div
                        onClick={(e) => setAnchorEl5(e.currentTarget)}
                        className="slider round"
                      ></div>
                      {change5 && (
                        <Popover
                          className="mt-2"
                          id={id5}
                          open={open5}
                          anchorEl={anchorEl5}
                          onClose={() => setAnchorEl5(null)}
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
                            <div className="row">
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  name="left"
                                  onChange={(e) => setGestation(e.target.value)}
                                  className="form-control form-control-sm"
                                  id="colFormLabelSm"
                                />
                              </div>
                              <label className="col-sm-4 col-form-label col-form-label-sm">
                                Weeks
                              </label>
                            </div>
                          </div>
                        </Popover>
                      )}
                    </label>
                  </div>
                </div>
                <div className="history-popup-value">
                  <p className="me-2">
                    {gestation}
                    {gestation && " Weeks"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="blood_pressure_box">
                <strong>Urine</strong>
                <hr />
                <div className="row g-2">
                  <div className="col-12">
                    <div className="current__bg__white p-1">
                      <div className="d-flex justify-content-between">
                        <p className="w-75">Protine</p>
                        <div className="ms-1">
                          <label className="switch me-1">
                            <input
                              name="Jaundiced"
                              value="Jaundiced"
                              type="checkbox"
                              onChange={(e) => {
                                setChange6(!change6);
                                setProtine("");
                              }}
                              id="togBtn"
                            />
                            <div
                              onClick={(e) => setAnchorEl6(e.currentTarget)}
                              className="slider round"
                            ></div>
                            {change6 && (
                              <Popover
                                className="mt-2"
                                id={id6}
                                open={open6}
                                anchorEl={anchorEl6}
                                onClose={() => setAnchorEl6(null)}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                <div className="left-popup p-1">
                                  <input
                                    type="text"
                                    name="left"
                                    onChange={(e) => setProtine(e.target.value)}
                                    className="form-control form-control-sm"
                                    id="colFormLabelSm"
                                  />
                                </div>
                              </Popover>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="history-popup-value">
                        <p className="me-2">{protine}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="current__bg__white p-1">
                      <div className="d-flex justify-content-between">
                        <p className="w-75">Glucose</p>
                        <div className="ms-1">
                          <label className="switch me-1">
                            <input
                              name="Jaundiced"
                              value="Jaundiced"
                              type="checkbox"
                              onChange={(e) => {
                                setChange7(!change7);
                                setGlucose("");
                              }}
                              id="togBtn"
                            />
                            <div
                              onClick={(e) => setAnchorEl7(e.currentTarget)}
                              className="slider round"
                            ></div>
                            {change7 && (
                              <Popover
                                className="mt-2"
                                id={id7}
                                open={open7}
                                anchorEl={anchorEl7}
                                onClose={() => setAnchorEl7(null)}
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
                                  <input
                                    type="text"
                                    name="left"
                                    onChange={(e) => setGlucose(e.target.value)}
                                    className="form-control form-control-sm"
                                    id="colFormLabelSm"
                                  />
                                </div>
                              </Popover>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="history-popup-value">
                        <p className="me-2">{glucose}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="current__bg__white p-1">
                      <div className="d-flex justify-content-between">
                        <p className="w-75">Ketone</p>
                        <div className="ms-1">
                          <label className="switch me-1">
                            <input
                              name="Jaundiced"
                              value="Jaundiced"
                              type="checkbox"
                              onChange={(e) => {
                                setChange8(!change8);
                                setKetone("");
                              }}
                              id="togBtn"
                            />
                            <div
                              onClick={(e) => setAnchorEl8(e.currentTarget)}
                              className="slider round"
                            ></div>
                            {change8 && (
                              <Popover
                                className="mt-2"
                                id={id8}
                                open={open8}
                                anchorEl={anchorEl8}
                                onClose={() => setAnchorEl8(null)}
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
                                  <input
                                    type="text"
                                    name="left"
                                    onChange={(e) => setKetone(e.target.value)}
                                    className="form-control form-control-sm"
                                    id="colFormLabelSm"
                                  />
                                </div>
                              </Popover>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="history-popup-value">
                        <p className="me-2">{ketone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="current__bg__white p-1">
                      <div className="d-flex justify-content-between">
                        <p className="w-75">Others</p>
                        <div className="ms-1">
                          <label className="switch me-1">
                            <input
                              name="Jaundiced"
                              value="Jaundiced"
                              type="checkbox"
                              onChange={(e) => {
                                setChange9(!change9);
                                setOthers("");
                              }}
                              id="togBtn"
                            />
                            <div
                              onClick={(e) => setAnchorEl9(e.currentTarget)}
                              className="slider round"
                            ></div>
                            {change9 && (
                              <Popover
                                className="mt-2"
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
                                  horizontal: "left",
                                }}
                              >
                                <div className="left-popup">
                                  <input
                                    type="text"
                                    name="left"
                                    onChange={(e) => setOthers(e.target.value)}
                                    className="form-control form-control-sm"
                                    id="colFormLabelSm"
                                  />
                                </div>
                              </Popover>
                            )}
                          </label>
                        </div>
                      </div>
                      <div className="history-popup-value">
                        <p className="me-2">{others}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 pt-2">
              <div className="row g-2">
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Fundal Height</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange10(!change10);
                              setFundalHeight("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl10(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change10 && (
                            <Popover
                              className="mt-2"
                              id={id10}
                              open={open10}
                              anchorEl={anchorEl10}
                              onClose={() => setAnchorEl10(null)}
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) =>
                                        setFundalHeight(e.target.value)
                                      }
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    cm
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {fundalHeight} {fundalHeight && "cm"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Size</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange11(!change11);
                              setSize("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl11(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change11 && (
                            <Popover
                              className="mt-2"
                              id={id11}
                              open={open11}
                              anchorEl={anchorEl11}
                              onClose={() => setAnchorEl11(null)}
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) => setSize(e.target.value)}
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    cm
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {size} {size && "cm"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Clinical</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange12(!change12);
                              setClinical("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl12(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change12 && (
                            <Popover
                              className="mt-2"
                              id={id12}
                              open={open12}
                              anchorEl={anchorEl12}
                              onClose={() => setAnchorEl12(null)}
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) =>
                                        setClinical(e.target.value)
                                      }
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    Weeks
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {clinical} {clinical && "Weeks"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Foetal Movement</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange13(!change13);
                              setFoetalMovement("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl13(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change13 && (
                            <Popover
                              className="mt-2"
                              id={id13}
                              open={open13}
                              anchorEl={anchorEl13}
                              onClose={() => setAnchorEl13(null)}
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
                                    value="Present"
                                    type="radio"
                                    name="test1"
                                    onChange={(e) =>
                                      setFoetalMovement(e.target.value)
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Present
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Absent"
                                    type="radio"
                                    name="test1"
                                    onChange={(e) =>
                                      setFoetalMovement(e.target.value)
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Absent
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">{foetalMovement}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Rate</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange18(!change18);
                              setHeartRate("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl18(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change18 && (
                            <Popover
                              className="mt-2"
                              id={id18}
                              open={open18}
                              anchorEl={anchorEl18}
                              onClose={() => setAnchorEl18(null)}
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
                                <div className="row">
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      name="left"
                                      onChange={(e) =>
                                        setHeartRate(e.target.value)
                                      }
                                      className="form-control form-control-sm"
                                      id="colFormLabelSm"
                                    />
                                  </div>
                                  <label className="col-sm-4 col-form-label col-form-label-sm">
                                    {" "}
                                    /min
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">
                        {heartRate} {heartRate && " /min"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4 pt-2">
              <div className="row g-2">
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Presentation</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange14(!change14);
                              setPresentation("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl14(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change14 && (
                            <Popover
                              className="mt-2"
                              id={id14}
                              open={open14}
                              anchorEl={anchorEl14}
                              onClose={() => setAnchorEl14(null)}
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
                                <input
                                  type="text"
                                  name="left"
                                  onChange={(e) =>
                                    setPresentation(e.target.value)
                                  }
                                  className="form-control form-control-sm"
                                  id="colFormLabelSm"
                                />
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">{presentation}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Position</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange15(!change15);
                              setPosition("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl15(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change15 && (
                            <Popover
                              className="mt-2"
                              id={id15}
                              open={open15}
                              anchorEl={anchorEl15}
                              onClose={() => setAnchorEl15(null)}
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
                                <input
                                  type="text"
                                  name="left"
                                  onChange={(e) => setPosition(e.target.value)}
                                  className="form-control form-control-sm"
                                  id="colFormLabelSm"
                                />
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">{position}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Engagement</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange16(!change16);
                              setEngagement("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl16(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change16 && (
                            <Popover
                              className="mt-2"
                              id={id16}
                              open={open16}
                              anchorEl={anchorEl16}
                              onClose={() => setAnchorEl16(null)}
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
                                <input
                                  type="text"
                                  name="left"
                                  onChange={(e) =>
                                    setEngagement(e.target.value)
                                  }
                                  className="form-control form-control-sm"
                                  id="colFormLabelSm"
                                />
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">{engagement}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Foetal Heart Sound</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            name="Jaundiced"
                            value="Jaundiced"
                            type="checkbox"
                            onChange={(e) => {
                              setChange17(!change17);
                              setFoetalHeartSound("");
                            }}
                            id="togBtn"
                          />
                          <div
                            onClick={(e) => setAnchorEl17(e.currentTarget)}
                            className="slider round"
                          ></div>
                          {change17 && (
                            <Popover
                              className="mt-2"
                              id={id17}
                              open={open17}
                              anchorEl={anchorEl17}
                              onClose={() => setAnchorEl17(null)}
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
                                    value="Audible"
                                    type="radio"
                                    name="test1"
                                    onChange={(e) =>
                                      setFoetalHeartSound(e.target.value)
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Audible
                                  </label>
                                </div>
                                <div className="form-check ms-1">
                                  <input
                                    className="form-check-input"
                                    value="Not Audible"
                                    type="radio"
                                    name="test1"
                                    onChange={(e) =>
                                      setFoetalHeartSound(e.target.value)
                                    }
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    Not Audible
                                  </label>
                                </div>
                              </div>
                            </Popover>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="history-popup-value">
                      <p className="me-2">{foetalHeartSound}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-1">
            <div className="mb-1 immunisation">
              <strong>Immunisation</strong>
            </div>
            <div className="blood_pressure_box p-1">
              <strong>28 weeks</strong>
              <hr />
              <div className="row g-2 p-1">
                <div className="col-4">
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">DTpa</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="DTpa"
                            name="DTpa"
                            onChange={(e) => {
                              setDTpa(!dTpa);
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
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Influenza</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Influenza"
                            name="Influenza"
                            onChange={(e) => {
                              setInfluenza(!influenza);
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
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">Anti-D</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="Anti-D"
                            name="Anti-D"
                            onChange={(e) => {
                              setAntiD(!antiD);
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
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">8 Weeks</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="8 Weeks"
                            name="8 Weeks"
                            onChange={(e) => {
                              setI8Weeks(!i8Weeks);
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
                  <div className="current__bg__white p-1">
                    <div className="d-flex justify-content-between">
                      <p className="w-75">36 Weeks</p>
                      <div className="ms-1">
                        <label className="switch me-1">
                          <input
                            type="checkbox"
                            value="36 Weeks"
                            name="36 Weeks"
                            onChange={(e) => {
                              setI36Weeks(!i36Weeks);
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
          <div className="row pt-2">
            <div className="col-12">
              <h6>Notes</h6>
              <textarea
                id=""
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                rows="4"
                className="note_box_textarea p-2 w-100"
                placeholder="Write here"
              ></textarea>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <div className="current__bg__white p-1">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Next Date</p>
                  <div className="ms-1">
                    <label className="me-1">
                      <input
                        type="date"
                        name="Next Date"
                        className="date__input"
                        // onChange={(e) =>  setDate(e.target.value) }
                        onChange={dateInput}
                        id="togBtn"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pedriatric_btn">
        <button
          className="pedriatric_btn_left"
          onClick={() => props.setmodelOpen(false)}
        >
          Cancel
        </button>
        {btnLoading ? (
          <button className="pedriatric_btn_middle">Loading...</button>
        ) : (
          <button
            className="pedriatric_btn_middle"
            onClick={saveAntenatalVisitsData}
          >
            Save
          </button>
        )}

        {btnLoading ? (
          <button className="pedriatric_btn_middle mr-2">Loading...</button>
        ) : (
          <button
            className="pedriatric_btn_right mr-2"
            onClick={handleScreenshot}
          >
            Take Screenshot{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AntenatalVisits;
