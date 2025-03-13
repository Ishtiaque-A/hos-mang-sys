import { Popover } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import clinic8 from "../../../../Images/clinical1.png";

toast.configure();

const General = (props) => {
  const [historyShowAll, setHistoryShowAll] = useState(false);
  const [historyValue, setHistoryValue] = useState({});
  const [singleValue, setSingleValue] = useState({
    Anaemic: false,
    Jaundiced: false,
    Cyanosis: false,
    Skin: false,
  });
  const [capillary, setCapillary] = useState("");
  const [dehydration, setDehydration] = useState("");
  const [radioFD, setRadio] = useState("");
  const [nailSign, setNailSign] = useState("");
  const [bloodSugerType, setBloodSugerType] = useState("");
  const [bloodSuger, setBloodSuger] = useState("");

  const [newHistoryValue, setnewHistoryValue] = useState([]);

  const [history, setHistory] = useState([]);
  const [historySort, setHistorySort] = useState([]);
  const addHistoryValue = (e) => {
    const { name, checked, value } = e.target;

    if (checked) {
      setnewHistoryValue([...newHistoryValue, value]);
    } else {
      const dataNe = newHistoryValue.filter((item) => item !== value);
      setnewHistoryValue(dataNe);
    }

    if (historyValue[name] === true) {
      setHistoryValue({ ...historyValue, [name]: false });
    } else {
      setHistoryValue({ ...historyValue, [name]: true });
    }
  };

  const addSigleValue = (e) => {
    const name = e.target.name;
    if (singleValue[name] === true) {
      setSingleValue({ ...singleValue, [name]: false });
    } else {
      setSingleValue({ ...singleValue, [name]: true });
    }
  };
  //history Search

  const historySearch = (e) => {
    const { value } = e.target;
    if (value?.length > 0) {
      const existing = [...historySort];
      setHistory(
        existing.filter((item) =>
          item?.history_name?.toLowerCase().includes(value?.toLowerCase())
        )
      );
    } else {
      setHistory(historySort);
    }
  };
  //
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

  const [imputGeneral, setimputGeneral] = useState({
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

  const [nailSignArray, setNailSignArray] = useState([]);
  useEffect(() => {
    let controller = new AbortController();
    axios
      .get(`/commonHistory-all/general`, { signal: controller.signal })
      .then((res) => {
        setHistory(res.data.commonHistory);
        setHistorySort(res.data.commonHistory);
      });
    axios.get(`/nail-sign`, { signal: controller.signal }).then((res) => {
      if (res.data.status === 200) {
        setNailSignArray(res.data.nailSign);
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

  const [saveLoading, setsaveLoading] = useState(false);

  const saveGenral = () => {
    setsaveLoading(true);
    const formData = new FormData();
    formData.append("patient_id", props.patient_id);
    formData.append("appointment_id", props?.appId);
    formData.append("history", newHistoryValue);
    formData.append("pulse", imputGeneral.pulse);
    formData.append("respiratoryRate", imputGeneral.respiratoryRate);
    formData.append("o2saturation", imputGeneral.o2saturation);

    formData.append("bloodSuger", bloodSuger);
    formData.append("bloodSugerType", bloodSugerType);

    formData.append("sitting_left", imputGeneral.sitting_left);
    formData.append("sitting_right", imputGeneral.sitting_right);
    formData.append("standing_left", imputGeneral.standing_left);
    formData.append("standing_right", imputGeneral.standing_right);
    formData.append("lying_left", imputGeneral.lying_left);
    formData.append("lying_right", imputGeneral.lying_right);
    formData.append("weight", imputGeneral.weight);
    formData.append("height", imputGeneral.height);
    formData.append("BMI", imputGeneral.BMI);
    formData.append("waist_measurement", imputGeneral.waist_measurement);
    formData.append("hip_measurement", imputGeneral.hip_measurement);
    formData.append("WHR", imputGeneral.WHR);
    formData.append("temp", imputGeneral.temp);

    formData.append("Anaemic", singleValue.Anaemic === false ? 0 : 1);
    formData.append("Jaundiced", singleValue.Jaundiced === false ? 0 : 1);
    formData.append("Cyanosis", singleValue.Cyanosis === false ? 0 : 1);
    formData.append("Skin", singleValue.Skin === false ? 0 : 1);

    formData.append("capillary", capillary);
    formData.append("dehydration", dehydration);
    formData.append("radioFD", radioFD);
    formData.append("nailSign", nailSign);

    const setVt = () => {
      const vt = [];
      bloodSuger && vt?.push({ name: "Blood sugar ", value: bloodSuger });
      imputGeneral?.BMI && vt.push({ name: "BMI", value: imputGeneral?.BMI });
      imputGeneral?.weight &&
        vt.push({ name: "Weight", value: imputGeneral?.weight });
      imputGeneral?.height &&
        vt.push({ name: "Height", value: imputGeneral?.height });
      imputGeneral?.temp &&
        vt.push({ name: "Temparature", value: imputGeneral?.temp });
      imputGeneral?.waist_measurement &&
        vt.push({
          name: "Waist circumferences",
          value: imputGeneral?.waist_measurement,
        });
      imputGeneral?.hip_measurement &&
        vt.push({
          name: "Hip Circumference",
          value: imputGeneral?.hip_measurement,
        });
      imputGeneral?.respiratoryRate &&
        vt.push({
          name: "Respiratory Rate",
          value: imputGeneral?.respiratoryRate,
        });
      imputGeneral?.o2saturation &&
        vt.push({
          name: "Oxygen Saturation",
          value: imputGeneral?.o2saturation,
        });
      imputGeneral?.pulse &&
        vt.push({
          name: "Pulse",
          value: imputGeneral?.pulse,
        });
      imputGeneral?.sitting_left &&
        imputGeneral?.sitting_right &&
        vt.push({
          name: "Blood pressure",
          value: `${imputGeneral?.sitting_left} / ${imputGeneral?.sitting_right}`,
        });
      return vt;
    };

    const vitals = setVt();
    if (vitals?.length > 0) {
      axios
        .post(`/save-vital-sign-general/${props?.patient_id}`, {
          signs: vitals,
        })
        .then((res) => {
          console.log(res.data, "vital save");
        });
    }

    axios
      .post("/save-general", formData)
      .then((res) => {
        const note = `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;"><span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>General:</strong></span></p>
           ${
             res.data.general.history
               ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                   res.data.general.history ? "History:" : ""
                 } </span></strong></p>`
               : ""
           }
            ${
              res.data.general.history
                ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.history === null
                      ? ""
                      : res.data.general.history.replaceAll(",", " . ")
                  }</span></p>`
                : ""
            }
            ${
              res.data.general.Anaemic !== "0" ||
              res.data.general.Jaundiced !== "0" ||
              res.data.general.Cyanosis !== "0" ||
              res.data.general.temp ||
              res.data.general.dehydration ||
              res.data.general.Skin !== "0" ||
              res.data.general.capillary ||
              res.data.general.radioFD ||
              res.data.general.pulse ||
              res.data.general.bloodSuger ||
              res.data.general.sitting_left ||
              res.data.general.lying_left ||
              res.data.general.weight ||
              res.data.general.height ||
              res.data.general.hip_measurement ||
              res.data.general.waist_measurement
                ? ` <p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; line-height: 180%;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.Anaemic !== "0" ||
                    res.data.general.Jaundiced !== "0" ||
                    res.data.general.Cyanosis !== "0" ||
                    res.data.general.temp ||
                    res.data.general.dehydration ||
                    res.data.general.Skin !== "0" ||
                    res.data.general.capillary ||
                    res.data.general.radioFD ||
                    res.data.general.pulse ||
                    res.data.general.bloodSuger ||
                    res.data.general.sitting_left ||
                    res.data.general.lying_left ||
                    res.data.general.weight ||
                    res.data.general.height ||
                    res.data.general.hip_measurement ||
                    res.data.general.waist_measurement
                      ? "Examination: "
                      : ""
                  } </span></strong></p>`
                : ""
            }
            ${
              res.data.general.Anaemic !== "0" ||
              res.data.general.Jaundiced !== "0" ||
              res.data.general.Cyanosis !== "0" ||
              res.data.general.temp ||
              res.data.general.dehydration ||
              res.data.general.Skin !== "0" ||
              res.data.general.capillary ||
              res.data.general.radioFD ||
              res.data.general.pulse ||
              res.data.general.bloodSuger ||
              res.data.general.sitting_left ||
              res.data.general.lying_left ||
              res.data.general.weight ||
              res.data.general.height ||
              res.data.general.hip_measurement ||
              res.data.general.waist_measurement
                ? `<p style="font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin: 0in 0in 0px ; text-align: justify; line-height: 200%; background: white; vertical-align: baseline;"><span style="font-size: 15px; line-height: 200%; font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.Anaemic === "1" ? "Anaemic ." : ""
                  }${res.data.general.Jaundiced === "1" ? "Jaundiced ." : ""} ${
                    res.data.general.Cyanosis === "1" ? "Cyanosis. " : ""
                  }${
                    res.data.general.Skin === "1"
                      ? " Skin Turgor :- Normal . "
                      : ""
                  } ${
                    res.data.general.capillary !== null
                      ? `Capillary Refill:- ${res.data.general.capillary} .`
                      : ""
                  }</span></p>`
                : ""
            }
            
            ${
              res.data.general.nailSign ||
              res.data.general.dehydration ||
              res.data.general.radioFD
                ? `<p style="font-size: 16px; font-family: &quot;Times New Roman&quot;, serif; margin: 0in 0in 0px ; text-align: justify; line-height: 200%; background: white; vertical-align: baseline;"><span style="font-size: 15px; line-height: 200%; font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.nailSign
                      ? `Nail Sign :- ${res.data.general.nailSign} . `
                      : ""
                  }${
                    res.data.general.dehydration
                      ? `Dehydration :- ${res.data.general.dehydration} . `
                      : ""
                  }${
                    res.data.general.radioFD
                      ? `Radio Femoral Delay :- ${res.data.general.radioFD} . `
                      : ""
                  }</span></p>`
                : ""
            }

            ${
              res.data.general.temp
                ? ` <p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.temp !== null ? "Temp:" : ""
                  }  </span></strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.temp !== null ? res.data.general.temp : ""
                  } ${res.data.general.temp !== null ? "oF" : ""} 
             <strong><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </span>${
              res.data.general.o2saturation !== null ? "O2 Saturation: " : ""
            }<span>&nbsp;&nbsp; </span></strong><span>&nbsp;</span>${
                    res.data.general.o2saturation !== null
                      ? res.data.general.o2saturation
                      : ""
                  }<span>&nbsp;&nbsp; </span>${
                    res.data.general.o2saturation !== null
                      ? "% on room air"
                      : ""
                  } </span></p>`
                : ""
            }
            
             ${
               res.data.general.respiratoryRate || res.data.general.pulse
                 ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                     res.data.general.pulse !== null ? "Pulse:" : ""
                   } <span>&nbsp; </span></span></strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                     res.data.general.pulse !== null
                       ? res.data.general.pulse
                       : ""
                   }${
                     res.data.general.pulse !== null ? "/minute" : ""
                   }<strong><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>${
                     res.data.general.respiratoryRate !== null
                       ? "Respiratory Rate:"
                       : ""
                   }</strong><span>&nbsp;&nbsp; </span>${
                     res.data.general.respiratoryRate !== null
                       ? res.data.general.respiratoryRate
                       : ""
                   }${
                     res.data.general.respiratoryRate !== null ? "/ minute" : ""
                   }</span></p>`
                 : ""
             }
            
            ${
              res.data.general.bloodSuger
                ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);"> ${
                    res.data.general.bloodSuger !== null ? "Blood Sugar:" : ""
                  }<span>&nbsp; </span></span></strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.bloodSuger !== null
                      ? res.data.general.bloodSuger
                      : ""
                  }  ${
                    res.data.general.bloodSuger !== null ? "molls/L" : ""
                  }  </span></p>`
                : ""
            }
            
            ${
              res.data.general.sitting_right
                ? ` <h6 style="font-size: 15px; font-family: Arial, sans-serif; color: rgb(102, 102, 102); font-weight: normal; font-style: italic; margin: 0in 0in 0px ; text-align: justify; line-height: 120%; break-after: auto; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54); font-style: normal;">${
                    res.data.general.sitting_left !== null
                      ? "Blood Pressure:"
                      : ""
                  } &nbsp; &nbsp;</span></strong><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.sitting_left !== null ? " Sitting:" : ""
                  }&nbsp; &nbsp;</span></strong><span style="font-family: Roboto; color: rgb(54, 54, 54); font-style: normal;">${
                    res.data.general.sitting_left !== null
                      ? res.data.general.sitting_left
                      : ""
                  } ${res.data.general.sitting_right !== null ? "/" : ""} ${
                    res.data.general.sitting_right !== null
                      ? res.data.general.sitting_right
                      : ""
                  } ${
                    res.data.general.sitting_right !== null ? "mm of Hg" : ""
                  }</span></h6> `
                : ""
            }
            
            ${
              res.data.general.standing_right || res.data.general.standing_left
                ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><span style="font-family: Roboto; color: rgb(33, 37, 41);"><span><span style="font: 9px &quot;Times New Roman&quot;;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></span><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.standing_left !== null ? "Standing:" : ""
                  } &nbsp;&nbsp;</span></strong><em><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.standing_left !== null
                      ? res.data.general.standing_left
                      : ""
                  } ${res.data.general.standing_left !== null ? "/" : ""} ${
                    res.data.general.standing_right !== null
                      ? res.data.general.standing_right
                      : ""
                  } ${
                    res.data.general.standing_left !== null ? "mm of Hg:" : ""
                  } </span></em></p> `
                : ""
            }
            
           ${
             res.data.general.pulse ||
             res.data.general.lying_right ||
             res.data.general.lying_left
               ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${
                   res.data.general.lying_left !== null ? "Lying:" : ""
                 } &nbsp;&nbsp;</span></strong><em><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                   res.data.general.lying_left !== null
                     ? res.data.general.lying_left
                     : ""
                 } ${res.data.general.pulse !== null ? "/" : ""} ${
                   res.data.general.lying_right !== null
                     ? res.data.general.lying_right
                     : ""
                 } ${
                   res.data.general.pulse !== null ? "mm of Hg" : ""
                 }</span></em></p> `
               : ""
           }
            
            ${
              res.data.general.BMI ||
              res.data.general.height ||
              res.data.general.weight
                ? `<p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">${
                    res.data.general.weight !== null ? "Weight (kg):" : ""
                  }</span></strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">
            ${
              res.data.general.weight !== null ? res.data.general.weight : ""
            } ${
                    res.data.general.weight !== null ? "Kg" : ""
                  } <span>&nbsp;&nbsp; </span><strong>${
                    res.data.general.height !== null ? "Height(cm)" : ""
                  } 
                         </strong>${
                           res.data.general.height !== null
                             ? res.data.general.height
                             : ""
                         } ${
                    res.data.general.height !== null ? "cm" : ""
                  } <span>&nbsp;&nbsp;&nbsp;&nbsp; </span><strong>${
                    res.data.general.BMI !== null ? "BMI:" : ""
                  }  </strong> ${
                    res.data.general.BMI !== null ? res.data.general.BMI : ""
                  } ${
                    res.data.general.BMI !== null ? "Kg/m 2" : ""
                  }</span></p> `
                : ""
            }
            
            <p class="MsoNormal" style="margin: 0in 0in 0px ; font-size: 15px; font-family: Arial, sans-serif; text-align: justify; line-height: 180%; background: white;"><strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">
           ${
             res.data.general.waist_measurement !== null
               ? "Waist Measurement:"
               : ""
           }  </span></strong><span style="font-family: Roboto; color: rgb(54, 54, 54);">
            ${
              res.data.general.waist_measurement !== null
                ? res.data.general.waist_measurement
                : ""
            } ${
          res.data.general.waist_measurement !== null ? "cm:" : ""
        } <strong><span>&nbsp;&nbsp;
                        </span>${
                          res.data.general.hip_measurement !== null
                            ? "Hip Measurement:"
                            : ""
                        }  </strong>${
          res.data.general.hip_measurement !== null
            ? res.data.general.hip_measurement
            : ""
        } ${
          res.data.general.hip_measurement !== null ? "cm" : ""
        }  <strong><span>&nbsp;&nbsp;&nbsp; </span>${
          res.data.general.WHR !== null ? "WHR :" : ""
        }  </strong>${
          res.data.general.WHR !== null ? res.data.general.WHR : ""
        }</span></p> `;
        const data = {
          appointment_id: props?.appId,
          patient_id: props?.patient_id,
          note: note,
        };
        if (props?.from === "greatDoc") {
          axios.post("doctors-note", data).then((res) => console.log(res));
          props?.setUpdateForHistory(Math.random());
          toast.success(res.data.message);
        } else {
          axios
            .post("doctors-note-from-nurse", data)
            .then((res) => console.log(res));
          props?.setUpdateForHistory(Math.random());
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ops! something is wrong");
      });
  };

  return (
    <div className="row">
      {props?.from === "greatDoc" ? (
        <div className="history-main-header d-flex justify-content-between mb-2">
          <div>
            <h6>General</h6>
          </div>
          <div>
            <img src={clinic8} alt="" className="img-fluid" />
          </div>
        </div>
      ) : null}

      <div className="col-3 col-lg-2">
        <div className="he-history p-1">
          <input
            type="text"
            placeholder="History"
            className="form-control form-control-sm mt-1 mb-2"
            onChange={historySearch}
          />
          <ul
            className={`g-doc-scroll ${
              historyShowAll ? "full-height" : "half-height"
            }`}
          >
            {history.length > 0 ? (
              history.map((item, i) => (
                <li key={i}>
                  {/* <div className="d-flex justify-content-between"> */}
                  <div className="row">
                    <div className="col-8">
                      <p>{item.history_name}</p>
                    </div>
                    <div className="col-4">
                      <label className="switch me-1">
                        <input
                          name={item.id}
                          value={item.history_name}
                          type="checkbox"
                          onChange={(e) => addHistoryValue(e)}
                          id="togBtn"
                        />
                        <div className="slider round"></div>
                      </label>
                    </div>
                    {/* <p className="w-75">{item.history_name}</p>
                                        <div className="ms-1">
                                            <label className="switch me-1">
                                                <input
                                                    name={item.id}
                                                    value={item.history_name}
                                                    type="checkbox"
                                                    onChange={(e) => addHistoryValue(e)}
                                                    id="togBtn"
                                                />
                                                <div className="slider round"></div>

                                            </label>
                                        </div> */}
                  </div>
                </li>
              ))
            ) : (
              <i
                style={{ fontSize: "26px", marginLeft: "40%" }}
                class="fas fa-spinner fa-spin"
              ></i>
            )}
          </ul>
          {!historyShowAll ? (
            <span
              onClick={() => setHistoryShowAll(!historyShowAll)}
              className="history-see-all"
            >
              Show All <i className="ms-1 far fa-angle-down"></i>
            </span>
          ) : (
            <span
              onClick={() => setHistoryShowAll(!historyShowAll)}
              className="history-see-all"
            >
              Show Less <i className="ms-1 far fa-angle-up"></i>
            </span>
          )}
        </div>
      </div>
      <div className="col-9 col-lg-10">
        <div className="history-main-header mb-lg-2">
          <div className="d-flex">
            <input
              type="text"
              placeholder="Examination Search"
              className="form-control form-control-sm w-75"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.find(e.target.value);
                }
              }}
            />
            <div className="w-lg-25 w-50">
              <button
                onClick={() => setsaveLoading(false)}
                className="vaital-setup-btn-cancel float-end"
              >
                Reset
              </button>
              {saveLoading ? (
                <button className="vaital-setup-btn float-end me-2">
                  <i className="fas fa-check-circle"></i>
                </button>
              ) : (
                <button
                  onClick={saveGenral}
                  className="vaital-setup-btn float-end me-2"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 row mt-lg-1 g-lg-0 g-2">
            <div className="col-lg-12 col-4 ">
              <div className=" exam-bg-white p-1">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Anaemic</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Anaemic"
                        value="Anaemic"
                        type="checkbox"
                        onChange={(e) => addSigleValue(e)}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-4">
              <div className="exam-bg-white p-1 mt-lg-">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Jaundiced</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Jaundiced"
                        value="Jaundiced"
                        type="checkbox"
                        onChange={(e) => addSigleValue(e)}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-4">
              <div className="exam-bg-white p-1 mt-lg-">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Cyanosis</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Cyanosis"
                        value="Cyanosis"
                        type="checkbox"
                        onChange={(e) => addSigleValue(e)}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-4">
              <div className="exam-bg-white p-1 mt-lg-">
                <div className="d-flex justify-content-between">
                  <p className="w-75">Skin Turgor</p>
                  <div className="ms-1">
                    <label className="switch me-1">
                      <input
                        name="Skin"
                        value="Skin Turgor"
                        type="checkbox"
                        onChange={(e) => addSigleValue(e)}
                        id="togBtn"
                      />
                      <div className="slider round"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 col-4">
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
                                Less than 3
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
                                More than 3
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
            <div className="col-lg-12 col-4">
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

            <div className="col-lg-12 col-4">
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
                            <label className="form-check-label">Moderate</label>
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

            <div className="col-lg-12 col-4">
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
                          setimputGeneral({
                            ...imputGeneral,
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
                            setimputGeneral({
                              ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
                        setimputGeneral({
                          ...imputGeneral,
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
              <div className="col-4">
                <label>Weight (kg)</label>
                <input
                  onChange={(e) =>
                    setimputGeneral({ ...imputGeneral, weight: e.target.value })
                  }
                  type="number"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-4">
                <label>Height (cm)</label>
                <input
                  onChange={(e) => {
                    if (e.target.value) {
                      setimputGeneral({
                        ...imputGeneral,
                        height: e.target.value,
                        BMI: (
                          imputGeneral?.weight /
                          Math.pow(e.target.value / 100, 2)
                        ).toFixed(1),
                      });
                    } else {
                      setimputGeneral({ ...imputGeneral, BMI: "" });
                    }
                  }}
                  type="number"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-4">
                <label>BMI</label>
                <div className="row">
                  <div className="col-9">
                    <input
                      value={imputGeneral.BMI}
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
            </div>
            <div className="row exam-bg-white p-1 mt-lg-2 mt-1">
              <div className="col-4">
                <label>Waist Measurement</label>
                <input
                  onChange={(e) => {
                    setimputGeneral({
                      ...imputGeneral,
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
                      setimputGeneral({
                        ...imputGeneral,
                        hip_measurement: e.target.value,
                        WHR: (
                          imputGeneral.waist_measurement / e.target.value
                        ).toFixed(2),
                      });
                    } else {
                      setimputGeneral({ ...imputGeneral, WHR: "" });
                    }
                  }}
                  type="number"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-4">
                <label>WHR</label>
                <input
                  value={imputGeneral.WHR}
                  disabled
                  type="text"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
