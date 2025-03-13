import React, { useEffect, useState } from "react";
import "./PedriaticExam.css";
import Modal from "react-modal";
import { Popover } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useScreenshot } from "use-react-screenshot";
import { createRef } from "react";
import { LuChevronRight } from "react-icons/lu";

function PaediatricPage1(props) {
  const [pregnancyComplications, setPregnancyComplications] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(false);
  const [antidGiven, setAntidGiven] = useState("");
  const [labour, setLabour] = useState(false);
  const [spontaneous, setSpontaneous] = useState(false);
  const [induced, setInduced] = useState(false);
  const [labourComplications, setLabourComplications] = useState(false);
  const [typeBirth, setTypeBirth] = useState("");
  const [apgarScoreat5, setapgarScoreat5] = useState();
  const [apgarScoreat10, setapgarScoreat10] = useState();
  const [abnormalities, setAbnormalities] = useState(false);
  const [problemsRequiring, setProblemsRequiring] = useState(false);
  const [birthWeight, setBirthWeight] = useState("");
  const [birthLength, setBirthLength] = useState("");
  const [birthHead, setBirthHead] = useState("");
  const [newbornHearing, setNewBornHearing] = useState("");
  const [vitaminKGiven, setVitaminKGiven] = useState("");
  const [vitaminKGiven1, setVitaminKGiven1] = useState("");
  const [vitaminKGiven2, setVitaminKGiven2] = useState("");
  const [hepbImmunisation, setHepbImmunisation] = useState("");
  const [hepbImmunisation2, setHepbImmunisation2] = useState("");
  const [hepBImmunoglobin, setHepBImmunoglobin] = useState("");
  const [hepBImmunoglobin1, setHepBImmunoglobin1] = useState("");
  const [postPartumComplications, setPostPartumComplications] = useState(false);
  const [feedingAtDischarge, setFeedingAtDischarge] = useState("");
  const [difficultiesWithFeeding, setDifficultiesWithFeeding] = useState(false);
  const [dateOfDischarge, setDateOfDischarge] = useState(false);
  const [dischargeWeight, setDischargeWeight] = useState("");
  const [headCirc, setHeadCirc] = useState("");

  const [bloodGroupArray, setbloodGroupArray] = useState([]);
  const PregnancyArray = [
    { id: 1, p_name: "Gestational diabetes" },
    { id: 2, p_name: "Hypertension" },
    { id: 3, p_name: "Pre - Eclampsia" },
    { id: 4, p_name: "Renal disease" },
    { id: 5, p_name: "Preterm labour" },
    { id: 6, p_name: "Iron deficiency" },
    { id: 7, p_name: "Anaemia" },
    { id: 8, p_name: "Hyperemesis gravidarum" },
    { id: 9, p_name: "Placenta previa" },
    { id: 10, p_name: "Placenta abruptio" },
    { id: 11, p_name: "Growth retardation of foetus" },
    { id: 12, p_name: "Foetal enlarged renal pelvis" },
  ];
  const [deliverycomplications, setdeliverycomplications] = useState();
  const DeliveryArray = [
    { id: 1, p_name: "Breech Presentation or birth" },
    { id: 2, p_name: "Shoulder Dystonia" },
    { id: 3, p_name: "Cord prolapse" },
    { id: 4, p_name: "Placental Abruption" },
    { id: 5, p_name: "Foetal distress" },
  ];

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/blood-group", { signal: controller.signal })
      .then((res) => setbloodGroupArray(res.data.blood_group))
      .catch((err) => console.log(err));
    return () => {
      controller.abort();
    };
  }, []);

  const [image, takeScreenShot] = useScreenshot();
  const refPE1 = createRef(null);

  const [btnLoading, setbtnLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    if (image) {
      const pData = {
        patient_id: parseInt(props.propsData.patient_id),
        page_no: 1,
        image: image,
      };
      axios
        .post(`/paediatric`, pData)
        .then((res) => {
          toast.success(res.data.message);
          props.setstateUpdate(Math.random());
          setbtnLoading(false);
        })
        .catch((error) => {
          toast.error("Ops ! Something is wrong");
        });
    }

    const page1Data = {
      pregnancyComplications: pregnancyComplications,
      bloodGroup: bloodGroup,
      antidGiven: antidGiven,
      labour: labour,
      spontaneous: spontaneous,
      induced: induced,
      labourComplications: labourComplications,
      typeBirth: typeBirth,
      estimatedGestation: apgarScoreat5,
      abnormalities: abnormalities,
      problemsRequiring: problemsRequiring,
      birthWeight: birthWeight,
      birthLength: birthLength,
      birthHead: birthHead,
      newbornHearing: newbornHearing,
      vitaminKGiven: vitaminKGiven,
      vitaminKGiven1: vitaminKGiven1,
      vitaminKGiven2: vitaminKGiven2,
      hepbImmunisation: hepbImmunisation,
      hepbImmunisation2: hepbImmunisation2,
      hepBImmunoglobin: hepBImmunoglobin,
      hepBImmunoglobin1: hepBImmunoglobin1,
      postPartumComplications: postPartumComplications,
      feedingAtDischarge: feedingAtDischarge,
      difficultiesWithFeeding: difficultiesWithFeeding,
      dateOfDischarge: dateOfDischarge,
      dischargeWeight: dischargeWeight,
      headCirc: headCirc,
      patient_id: props.propsData.patient_id,
    };
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (var checkbox of checkboxes) {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    }

    if (image) {
      axios.post(`/save-paediatric-page1`, page1Data).then((res) => {
        if (res.data.status === 200) {
          setPregnancyComplications();
          setAbnormalities();
          setBirthHead();
          setDateOfDischarge();
          setVitaminKGiven();
          setVitaminKGiven1();
          setVitaminKGiven2();
          setSpontaneous();
          setPostPartumComplications();
          setFeedingAtDischarge();
          setDifficultiesWithFeeding();
          setDischargeWeight();
          setHeadCirc();
          setHepbImmunisation();
          setHepbImmunisation2();
          setHepbImmunisation();
          setHepBImmunoglobin1();
          setProblemsRequiring();
          setLabour();
          setInduced();
          setBirthLength();
          setBirthWeight();
          setBloodGroup();
          setapgarScoreat5();
          setNewBornHearing();
          setTypeBirth();
          setAntidGiven();
          setHepBImmunoglobin();
        }
      });
    } else {
      toast.warning("Plz take screenShot then save", {
        position: "top-center",
      });
    }
  };

  // const [modalPaediatricExaminationIsOpen, setPaediatricExaminationIsOpen] = useState(false);

  // function openPaediatricExaminationModal() {
  //     setPaediatricExaminationIsOpen(true);
  // }

  // function closePaediatricExaminationModal() {
  //     setPaediatricExaminationIsOpen(false);
  // }

  // anti d given
  const [change1, setChange1] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  // type of birth
  const [change2, setChange2] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  // estimated Gestation
  const [change3, setChange3] = useState(false);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;

  // birth weight
  const [change4, setChange4] = useState(false);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open4 = Boolean(anchorEl4);
  const id4 = open4 ? "simple-popover" : undefined;

  // birth length
  const [change5, setChange5] = useState(false);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const open5 = Boolean(anchorEl5);
  const id5 = open5 ? "simple-popover" : undefined;

  // birth Head
  const [change6, setChange6] = useState(false);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const open6 = Boolean(anchorEl6);
  const id6 = open6 ? "simple-popover" : undefined;

  // birth Head
  const [change7, setChange7] = useState(false);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const open7 = Boolean(anchorEl7);
  const id7 = open7 ? "simple-popover" : undefined;

  // vitamin k given
  const [change8, setChange8] = useState(false);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;

  // hep b immunisation
  const [change9, setChange9] = useState(false);
  const [anchorEl9, setAnchorEl9] = useState(null);
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;

  // hep b immunoglobin
  const [change10, setChange10] = useState(false);
  const [anchorEl10, setAnchorEl10] = useState(null);
  const open10 = Boolean(anchorEl10);
  const id10 = open10 ? "simple-popover" : undefined;

  // feeding At Discharge
  const [change11, setChange11] = useState(false);
  const [anchorEl11, setAnchorEl11] = useState(null);
  const open11 = Boolean(anchorEl11);
  const id11 = open11 ? "simple-popover" : undefined;

  // discharge Weight
  const [change12, setChange12] = useState(false);
  const [anchorEl12, setAnchorEl12] = useState(null);
  const open12 = Boolean(anchorEl12);
  const id12 = open12 ? "simple-popover" : undefined;

  // head circ
  const [change13, setChange13] = useState(false);
  const [anchorEl13, setAnchorEl13] = useState(null);
  const open13 = Boolean(anchorEl13);
  const id13 = open13 ? "simple-popover" : undefined;

  const [change14, setChange14] = useState(false);
  const [anchorEl14, setAnchorEl14] = useState(null);

  const open14 = Boolean(anchorEl14);
  const id14 = open14 ? "simple-popover" : undefined;

  const [change15, setChange15] = useState(false);
  const [anchorEl15, setAnchorEl15] = useState(null);
  const open15 = Boolean(anchorEl15);
  const id15 = open15 ? "simple-popover" : undefined;

  const [change16, setChange16] = useState(false);
  const [anchorEl16, setAnchorEl16] = useState(null);
  const open16 = Boolean(anchorEl16);
  const id16 = open16 ? "simple-popover" : undefined;

  const [change17, setChange17] = useState(false);
  const [anchorEl17, setAnchorEl17] = useState(null);
  const open17 = Boolean(anchorEl17);
  const id17 = open17 ? "simple-popover" : undefined;

  return (
    <>
      <div
        // style={{
        //   height: "320px",
        //   overflow: "auto",
        // }}
        ref={refPE1}
        className="p-2"
      >
        <div>
          <p className="fw-bold">Maternal information</p>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Pregnancy complications</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Pregnancy complications"
                      name="Pregnancy complications"
                      onChange={(e) => {
                        setChange15(!change15);
                        setPregnancyComplications("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl15(e.currentTarget)}
                    ></div>
                    {change15 && (
                      <Popover
                        id={id15}
                        open={open15}
                        anchorEl={anchorEl15}
                        onClose={() => setAnchorEl15(null)}
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
                          {PregnancyArray.length > 0 &&
                            PregnancyArray.map((item, i) => {
                              return (
                                <div key={i} className="form-check">
                                  <input
                                    className="form-check-input"
                                    value={item.p_name}
                                    type="radio"
                                    name="AntidGiven"
                                    onChange={(e) => {
                                      setPregnancyComplications(e.target.value);
                                    }}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item.p_name}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{pregnancyComplications}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Blood group</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Blood group"
                      name="Blood group"
                      onChange={(e) => {
                        setChange14(!change14);
                        setBloodGroup("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl14(e.currentTarget)}
                    ></div>
                    {change14 && (
                      <Popover
                        id={id14}
                        open={open14}
                        anchorEl={anchorEl14}
                        onClose={() => setAnchorEl14(null)}
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
                          {bloodGroupArray.length > 0 &&
                            bloodGroupArray.map((item) => {
                              return (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    value={item.blood_group_name}
                                    type="radio"
                                    name="AntidGiven"
                                    onChange={(e) => {
                                      setBloodGroup(e.target.value);
                                    }}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item.blood_group_name}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{bloodGroup}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Anti D given</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Anti D given"
                      name="Anti D given"
                      onChange={(e) => {
                        setChange1(!change1);
                        setAntidGiven("");
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
                              value="yes"
                              type="radio"
                              name="AntidGiven"
                              onChange={(e) => {
                                setAntidGiven(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Yes</label>
                            <input
                              className="form-check-input"
                              value="no"
                              type="radio"
                              name="AntidGiven"
                              onChange={(e) => {
                                setAntidGiven(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">No</label>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{antidGiven}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "-12px" }}>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Labour</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Labour"
                      name="Labour"
                      onChange={(e) => {
                        setLabour(!labour);
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
                <p className="w-75">Spontaneous</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Spontaneous"
                      name="Spontaneous"
                      onChange={(e) => {
                        setSpontaneous(!spontaneous);
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
                <p className="w-75">Induced</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Induced"
                      name="Induced"
                      onChange={(e) => {
                        setInduced(!induced);
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
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Labour complications</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Labour complications"
                      name="Labour complications"
                      onChange={(e) => {
                        setLabourComplications(!labourComplications);
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
                <p className="w-75">Type of birth</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Type of birth"
                      name="Type of birth"
                      onChange={(e) => {
                        setChange2(!change2);
                        setTypeBirth("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl2(e.currentTarget)}
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
                          <div className="form-check ms-1">
                            <input
                              className="form-check-input"
                              value="normal"
                              type="radio"
                              name="typeofbirth"
                              onChange={(e) => {
                                setTypeBirth(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Normal</label>
                            <input
                              className="form-check-input"
                              value="breech"
                              type="radio"
                              name="typeofbirth"
                              onChange={(e) => {
                                setTypeBirth(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Breech</label>
                            <input
                              className="form-check-input"
                              value="forceps"
                              type="radio"
                              name="typeofbirth"
                              onChange={(e) => {
                                setTypeBirth(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Forceps</label>
                            <input
                              className="form-check-input"
                              value="Caesarean"
                              type="radio"
                              name="typeofbirth"
                              onChange={(e) => {
                                setTypeBirth(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">
                              Caesarean
                            </label>
                            <input
                              className="form-check-input"
                              value="Vacuumed extraction"
                              type="radio"
                              name="EyesIncludingRedReflex"
                              onChange={(e) => {
                                setTypeBirth(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">
                              Vacuumed extraction
                            </label>
                            <input
                              className="form-check-input"
                              value="Other"
                              type="radio"
                              name="typeofbirth"
                              onChange={(e) => {
                                setTypeBirth(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Other</label>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{typeBirth}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Delivery complications</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Delivery complications"
                      name="Delivery complications"
                      onChange={(e) => {
                        setChange16(!change16);
                        setdeliverycomplications("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl16(e.currentTarget)}
                    ></div>
                    {change16 && (
                      <Popover
                        id={id16}
                        open={open16}
                        anchorEl={anchorEl16}
                        onClose={() => setAnchorEl16(null)}
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
                          {DeliveryArray.length > 0 &&
                            DeliveryArray.map((item, i) => {
                              return (
                                <div key={i} className="form-check">
                                  <input
                                    className="form-check-input"
                                    value={item.p_name}
                                    type="radio"
                                    name="AntidGiven"
                                    onChange={(e) => {
                                      setdeliverycomplications(e.target.value);
                                    }}
                                    id="flexRadioDefault1"
                                  />
                                  <label className="form-check-label">
                                    {item.p_name}
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{deliverycomplications}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 mb-3">
          <p className="fw-bold">Neonatal information</p>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">APGAR score</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="APGAR score"
                      name="APGAR score"
                      onChange={(e) => {
                        setChange3(!change3);
                        setapgarScoreat5("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl3(e.currentTarget)}
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
                        <div className="left-popup">
                          <div style={{ width: "100px" }} className="d-flex">
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setapgarScoreat5(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label ml-2 mt-1">
                              at 5 min.
                            </label>
                          </div>
                          <div style={{ width: "100px" }} className="d-flex">
                            <input
                              className="form-control"
                              type="text"
                              onChange={(e) => {
                                setapgarScoreat10(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label ml-2 mt-1">
                              at 10 min.
                            </label>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">
                  {apgarScoreat5 && `APGAR score ${apgarScoreat5} at 5 minutes`}
                </p>
                <p className="ms-2">
                  {apgarScoreat10 &&
                    `APGAR score ${apgarScoreat10} at 10 minutes`}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Abnormalities noted at birth</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Abnormalities noted at birth"
                      name="Abnormalities noted at birth"
                      onChange={(e) => {
                        setAbnormalities(!abnormalities);
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
                <p className="w-75">Problems requiring treatment</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Problems requiring treatment"
                      name="Problems requiring treatment"
                      onChange={(e) => {
                        setProblemsRequiring(!problemsRequiring);
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

        <div className="row" style={{ marginTop: "-12px" }}>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Birth weight</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Birth weight"
                      name="Birth weight "
                      onChange={(e) => {
                        setChange4(!change4);
                        setBirthWeight("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl4(e.currentTarget)}
                    ></div>
                    {change4 && (
                      <Popover
                        id={id4}
                        open={open4}
                        anchorEl={anchorEl4}
                        onClose={() => setAnchorEl4(null)}
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
                          style={{
                            width: "90px",
                            padding: "4px",
                            boxShadow: "none",
                          }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={birthWeight}
                              type="text"
                              name="birth eright"
                              onChange={(e) => {
                                setBirthWeight(e.target.value);
                              }}
                              id="exampleCheck1"
                            />
                            <label className="mx-2 mt-1" for="exampleCheck1">
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
                <p className="ms-2">{birthWeight && `${birthWeight} kg`}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Birth length </p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Birth length"
                      name="Birth length"
                      onChange={(e) => {
                        setChange5(!change5);
                        setBirthLength("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl5(e.currentTarget)}
                    ></div>
                    {change5 && (
                      <Popover
                        id={id5}
                        open={open5}
                        anchorEl={anchorEl5}
                        onClose={() => setAnchorEl5(null)}
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
                          style={{
                            width: "90px",
                            padding: "4px",
                            boxShadow: "none",
                          }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={birthLength}
                              type="text"
                              name="birth lenth"
                              onChange={(e) => {
                                setBirthLength(e.target.value);
                              }}
                              id="exampleCheck1"
                            />
                            <label className="mx-2 mt-1" for="exampleCheck1">
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
                <p className="ms-2">{birthLength && `${birthLength} cm`}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Birth head circ </p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Birth head circ"
                      name="Birth head circ"
                      onChange={(e) => {
                        setChange6(!change6);
                        setBirthHead("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl6(e.currentTarget)}
                    ></div>
                    {change6 && (
                      <Popover
                        id={id6}
                        open={open6}
                        anchorEl={anchorEl6}
                        onClose={() => setAnchorEl6(null)}
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
                          style={{
                            width: "90px",
                            padding: "4px",
                            boxShadow: "none",
                          }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={birthHead}
                              type="text"
                              name="birth lenth"
                              onChange={(e) => {
                                setBirthHead(e.target.value);
                              }}
                              id="exampleCheck1"
                            />
                            <label className="mx-2 mt-1" for="exampleCheck1">
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
                <p className="ms-2">{birthHead}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "-12px" }}>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Newborn Hearing Screen</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Newborn Hearing Screen"
                      name="Newborn Hearing Screen"
                      onChange={(e) => {
                        setChange7(!change7);
                        setNewBornHearing("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl7(e.currentTarget)}
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
                          <div className="form-check ms-1">
                            <input
                              className="form-check-input"
                              value="normal"
                              type="radio"
                              name="completed"
                              onChange={(e) => {
                                setNewBornHearing(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">
                              Completed
                            </label>
                            <input
                              className="form-check-input"
                              value="not performed"
                              type="radio"
                              name="notperformed"
                              onChange={(e) => {
                                setNewBornHearing(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">
                              Not performed
                            </label>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <p className="ms-2">{newbornHearing}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Vitamin K given</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Vitamin K given"
                      name="Vitamin K given"
                      onChange={(e) => {
                        setChange8(!change8);
                        setVitaminKGiven("");
                        setVitaminKGiven1("");
                        setVitaminKGiven2("");
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
                        <div className="left-popup">
                          <div className="form-check ms-1">
                            <div className="d-flex justify-content-between gap-2">
                              <span className="hep_immunisation">
                                <input
                                  className="form-check-input"
                                  value="yes"
                                  type="radio"
                                  name="vitaminkgiven"
                                  onChange={(e) => {
                                    setVitaminKGiven(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">Yes</label>
                                <input
                                  className="form-check-input"
                                  value="no"
                                  type="radio"
                                  name="vitaminkgiven"
                                  onChange={(e) => {
                                    setVitaminKGiven(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">No</label>
                              </span>

                              <span className="hep_immunisation">
                                <input
                                  className="form-check-input"
                                  value="injection"
                                  type="radio"
                                  name="vitaminkgiven2"
                                  onChange={(e) => {
                                    setVitaminKGiven1(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  Injection
                                </label>
                                <input
                                  className="form-check-input"
                                  value="oral"
                                  type="radio"
                                  name="vitaminkgiven2"
                                  onChange={(e) => {
                                    setVitaminKGiven1(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">Oral</label>
                              </span>

                              <span className="hep_immunisation">
                                <input
                                  className="form-check-input"
                                  value="1st dose"
                                  type="radio"
                                  name="vitaminkgiven3"
                                  onChange={(e) => {
                                    setVitaminKGiven2(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  1st dose
                                </label>
                                <input
                                  className="form-check-input"
                                  value="2nd dose"
                                  type="radio"
                                  name="vitaminkgiven3"
                                  onChange={(e) => {
                                    setVitaminKGiven2(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  2nd dose
                                </label>
                                <input
                                  className="form-check-input"
                                  value="3rd dose"
                                  type="radio"
                                  name="vitaminkgiven3"
                                  onChange={(e) => {
                                    setVitaminKGiven2(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">
                                  3rd dose
                                </label>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{vitaminKGiven}</span>
                <span className="ms-2">{vitaminKGiven1}</span>
                <span className="ms-2">{vitaminKGiven2}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Hep B immunization</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Hep B immunisation"
                      name="Hep B immunisation"
                      onChange={(e) => {
                        setChange9(!change9);
                        setHepbImmunisation("");
                        setHepbImmunisation2("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl9(e.currentTarget)}
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
                          <div className="form-check ms-1 me-5">
                            <div className="d-flex justify-content-between gap-2">
                              <span className="hep_immunisation">
                                <p style={{ borderBottom: "1px solid gray" }}>
                                  Given
                                </p>
                                <input
                                  className="form-check-input"
                                  value="yes"
                                  type="radio"
                                  name="HepbImmunisation"
                                  onChange={(e) => {
                                    setHepbImmunisation(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">Yes</label>
                                <input
                                  className="form-check-input"
                                  value="no"
                                  type="radio"
                                  name="HepbImmunisation"
                                  onChange={(e) => {
                                    setHepbImmunisation(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">No</label>
                              </span>
                              <span className="hep_immunisation">
                                <p
                                  className=""
                                  style={{ borderBottom: "1px solid gray" }}
                                >
                                  Date Given
                                </p>
                                <input
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setHepbImmunisation2(e.target.value);
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{hepbImmunisation}</span>
                <span className="ms-2">{hepbImmunisation2}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Hep B immunoglobulin</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Hep B immunoglobin"
                      name="Hep B immunoglobin"
                      onChange={(e) => {
                        setChange10(!change10);
                        setHepBImmunoglobin(" ");
                        setHepBImmunoglobin1("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl10(e.currentTarget)}
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
                          <div className="form-check ms-1">
                            <div className="d-flex justify-content-between gap-2">
                              <span className="hep_immunisation">
                                <p style={{ borderBottom: "1px solid gray" }}>
                                  Given
                                </p>
                                <input
                                  className="form-check-input"
                                  value="yes"
                                  type="radio"
                                  name="HepbImmunisation"
                                  onChange={(e) => {
                                    setHepBImmunoglobin(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">Yes</label>
                                <input
                                  className="form-check-input"
                                  value="no"
                                  type="radio"
                                  name="HepbImmunisation"
                                  onChange={(e) => {
                                    setHepBImmunoglobin(e.target.value);
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label className="form-check-label">No</label>
                              </span>
                              <span className="hep_immunisation">
                                <p
                                  className=""
                                  style={{ borderBottom: "1px solid gray" }}
                                >
                                  Date Given
                                </p>
                                <input
                                  type="date"
                                  id="birthday"
                                  name="birthday"
                                  onChange={(e) => {
                                    setHepBImmunoglobin1(e.target.value);
                                  }}
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{hepBImmunoglobin}</span>
                <span className="ms-2">{hepBImmunoglobin1}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Postpartum complications</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Postpartum complications"
                      name="Postpartum complications"
                      onChange={(e) => {
                        setPostPartumComplications(!postPartumComplications);
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
                <p className="w-75">Feeding at discharge </p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Feeding at discharge "
                      name="Feeding at discharge "
                      onChange={(e) => {
                        setChange11(!change11);
                        setFeedingAtDischarge("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl11(e.currentTarget)}
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
                          <div className="form-check ms-1">
                            <input
                              className="form-check-input"
                              value="Breast"
                              type="radio"
                              name="Feeding at discharge"
                              onChange={(e) => {
                                setFeedingAtDischarge(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Breast</label>
                            <input
                              className="form-check-input"
                              value="Bottle"
                              type="radio"
                              name="Feeding at discharge"
                              onChange={(e) => {
                                setFeedingAtDischarge(e.target.value);
                              }}
                              id="flexRadioDefault1"
                            />
                            <label className="form-check-label">Bottle</label>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{feedingAtDischarge}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Difficulties with feeding</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Difficulties with feeding"
                      name="Difficulties with feeding"
                      onChange={(e) => {
                        setDifficultiesWithFeeding(!difficultiesWithFeeding);
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
                <p className="w-75">Date of discharge </p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Date of discharge"
                      name="Date of discharge"
                      onChange={(e) => {
                        setDateOfDischarge(!dateOfDischarge);
                        setChange17(!change17);
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl17(e.currentTarget)}
                    ></div>
                    {change17 && (
                      <Popover
                        id={id17}
                        open={open17}
                        anchorEl={anchorEl17}
                        onClose={() => setAnchorEl17(null)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <div className="text-box" style={{ padding: "5px" }}>
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={dateOfDischarge}
                              type="date"
                              name="birth weight"
                              onChange={(e) => {
                                setDateOfDischarge(e.target.value);
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
                <span className="ms-2">{dateOfDischarge}</span>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Discharge weight</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Discharge weight"
                      name="Discharge weight"
                      onChange={(e) => {
                        setChange12(!change12);
                        setDischargeWeight("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl12(e.currentTarget)}
                    ></div>
                    {change12 && (
                      <Popover
                        id={id12}
                        open={open12}
                        anchorEl={anchorEl12}
                        onClose={() => setAnchorEl12(null)}
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
                          style={{
                            width: "90px",
                            padding: "4px",
                            boxShadow: "none",
                          }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={dischargeWeight}
                              type="text"
                              name="birth weight"
                              onChange={(e) => {
                                setDischargeWeight(e.target.value);
                              }}
                              id="exampleCheck1"
                            />
                            <label className="mx-2 mt-1" for="exampleCheck1">
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
                <span className="ms-2">{dischargeWeight}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "-12px" }}>
          <div className="col-4">
            <div className="paedriatric_btn_container pt-2">
              <div className="d-flex justify-content-around">
                <p className="w-75">Estimated gestation</p>
                <div className="ms-1">
                  <label className="switch me-1">
                    <input
                      type="checkbox"
                      value="Estimated gestation"
                      name="Estimated gestation"
                      onChange={(e) => {
                        setChange13(!change13);
                        setHeadCirc("");
                      }}
                      id="togBtn"
                    />
                    <div
                      className="slider round"
                      onClick={(e) => setAnchorEl13(e.currentTarget)}
                    ></div>
                    {change13 && (
                      <Popover
                        id={id13}
                        open={open13}
                        anchorEl={anchorEl13}
                        onClose={() => setAnchorEl13(null)}
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
                          style={{
                            width: "100px",
                            padding: "4px",
                            boxShadow: "none",
                          }}
                        >
                          <div className="d-flex">
                            <input
                              className="form-control"
                              value={headCirc}
                              type="text"
                              name="birth weight"
                              onChange={(e) => {
                                setHeadCirc(e.target.value);
                              }}
                              id="exampleCheck1"
                            />
                            <label className="mx-2 mt-1" for="exampleCheck1">
                              week
                            </label>
                          </div>
                        </div>
                      </Popover>
                    )}
                  </label>
                </div>
              </div>
              <div className="history-popup-value">
                <span className="ms-2">{headCirc && `${headCirc} week`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pedriatric_btn">
        <button
          className="pedriatric_btn_left"
          onClick={props.closePaediatricExaminationModal}
        >
          Cancel
        </button>
        {btnLoading ? (
          <button className="pedriatric_btn_middle">Loading...</button>
        ) : (
          <button
            className="pedriatric_btn_middle"
            onClick={(e) => {
              handleSave(e);
            }}
          >
            Save
          </button>
        )}

        <button
          className="pedriatric_btn_right"
          onClick={() => {
            props.passData(2);
          }}
        >
          Next
          <LuChevronRight size={18} className="ms-2 text-white" />
        </button>

        {btnLoading ? (
          <button className="pedriatric_btn_middle">Loading...</button>
        ) : (
          <button
            className="pedriatric_btn_right"
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
            Take screenshot{" "}
          </button>
        )}
      </div>
    </>
  );
}
export default PaediatricPage1;
