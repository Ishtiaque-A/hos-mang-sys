import React, { useEffect, useState } from "react";
import "./NewRx.css";
import Modal from "react-modal";
import FilterListIcon from "@mui/icons-material/FilterList";
import mims from "../../../../src/Images/mims-Integrated-logo.png";
import swal from "sweetalert";
import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import MimsProductDetails from "./MimsProductDetails";
import { Link } from "react-router-dom";
import moment from "moment";
import { cloudUrl } from "../../../index";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { LiaTimesCircle } from "react-icons/lia";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import SimpleSelect from "../../../common/components/SimpleSelect";

toast.configure();

const searchDrugsTypeOptions = [
  { value: "1", label: "Brand Name" },
  { value: "2", label: "Generic Name" },
];

const NewRx = (props) => {
  console.log("props", props);
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const [drgsInfo, setdrgsInfo] = useState([
    {
      id: "",
      drug_name: "",
      qty: "",
      rpts: "",
      restriction: "",
      bpp: "",
      tgp: "",
      generic_name: {
        name: "",
      },
      iSAllergyCheck: false,
    },
  ]);
  const [loding, setloding] = useState(false);
  const [drugTypeSlection, setdrugTypeSlection] = useState("drugs");
  const [doseName, setdoseName] = useState([]);
  const [frequencyName, setfrequencyName] = useState([]);
  const [others, setothers] = useState([]);
  const [Route, setRoute] = useState([]);
  const [foodName, setfoodName] = useState([]);
  const [generalNote, setGeneralNote] = useState([]);
  const [searchSelectedDrugs, setsearchSelectedDrugs] = useState(
    searchDrugsTypeOptions[0]
  );
  const [masterDrugsInfo, setmasterDrugsInfo] = useState({
    drugs: [],
    custom: [],
    fav: [],
  });
  useEffect(() => {
    let sub = true;
    if (sub) {
      setmasterDrugsInfo(props.AllDrugs);
      setdrgsInfo(props.AllDrugs?.drugs);
    }

    return () => {
      sub = false;
    };
  }, []);

  console.log("props  dr", props.AllDrugs);
  const [patientInfo, setpatientInfo] = useState([]);
  const [pregnancyOutcome, setpregnancyOutcome] = useState([]);
  const [pastHistory, setpastHistory] = useState([]);
  const [reactionTableData, setReactionTableData] = useState([]);
  const [prn, setPrn] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios.get("dose-name", { signal: controller.signal }).then((res) => {
      setdoseName(res.data.dosesName);
    });

    axios.get("frequency-name", { signal: controller.signal }).then((res) => {
      setfrequencyName(res.data.frequencyName);
    });

    axios.get("others-name", { signal: controller.signal }).then((res) => {
      setothers(res.data.othersName);
    });

    axios.get("food-name", { signal: controller.signal }).then((res) => {
      setfoodName(res.data.foodsName);
    });
    axios.get("route-name", { signal: controller.signal }).then((res) => {
      setRoute(res.data.routesName);
    });

    axios.get(`/general-note`, { signal: controller.signal }).then((res) => {
      if (res.data.status === 200) {
        setGeneralNote(res.data.notes);
      }
    });
    axios.get(`/past-history/${props.patient_id}`).then((res) => {
      setpastHistory(res.data.past_history);
    });

    axios
      .get(`/pregnancy-history/${props.patient_id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setpregnancyOutcome(res.data.pregnancy);
      });

    axios
      .get(`/added-reaction/${props.patient_id}`, {
        signal: controller.signal,
      })
      .then((res) => setReactionTableData(res.data.reaction));

    return () => {
      controller.abort();
    };
  }, [props.patient_id]);

  useEffect(() => {
    const controller = new AbortController();
    if (props.patient_id) {
      axios
        .get(`patient-search-by-id/${props.patient_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setpatientInfo(res.data.patient);
        });
    }
    return () => {
      controller.abort();
    };
  }, [props.lactationUpdate, props.patient_id]);

  const [existingCondition, setExistingCondition] = useState(true);

  const [medicine, setMedicine] = useState();

  const [doseInfo, setDoseInfo] = useState({
    dose: "1",
    frequency: "Daily",
    food: "- ",
    others: " -",
    route: "Oral",
    is_FVDose: false,
    tabs_inistraction: "",
    Complex_instruction: "",
    extra_instruction: "",
    is_Regulation: false,
    drugsTimeLimit: "",
    prescribedAs: "",
    is_print_brand_name: false,
    is_print_generic_name: false,
    is_urgent_supply: false,
    is_allow_brand_substitution: false,
    general_note: "",
    pbs_listing: "",
    is_save_dose: false,
    quantity: 30,
    repeats: 5,
    condition: [],
    code: "",
    is_condition_status_right: false,
    is_condition_status_left: false,
    is_condition_status_bilateral: false,
    is_condition_status_acute: false,
    is_condition_status_chronic: false,
    is_condition_status_mild: false,
    is_condition_status_moderate: false,
    is_condition_status_severe: false,
    is_add_to_past_history: false,
    is_add_to_reason_for_visit: false,
    is_mark_as_confidential: false,
    further_details: "",
  });
  const handleDoseInfo = (e) => {
    const { name, value } = e.target;
    setDoseInfo({ ...doseInfo, [name]: value });
  };
  const customStyles = {
    content: {
      top: "37%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "490px",
      padding: "10px",
      marginLeft: "38%",
    },
  };
  const ingredientStyles = {
    content: {
      top: "35%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "40%",
      height: "250px",
      padding: "10px",
      marginLeft: "38%",
    },
  };
  const customStylesAleart = {
    content: {
      top: "37%",
      left: "22%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "49%",
      // background: "#F3F2EF",
      padding: "10px",
      marginLeft: "38%",
    },
  };

  const nextForStep2 = (e) => {
    e.preventDefault();
    if (alertboxArray.length > 0) {
      setalertmodelShow(true);
    } else {
      document.getElementById("v-pills-profile-tab").click();
    }
    // closeModalAlert()
  };

  const nextForStep3 = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-messages-tab").click();
  };
  const backForStep2 = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-home-tab").click();
  };
  const nextForStep4 = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-settings-tab").click();
  };
  const backForStep3 = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-profile-tab").click();
  };
  const backForStep4 = (e) => {
    e.preventDefault();
    document.getElementById("v-pills-messages-tab").click();
  };

  const saveDrugsInfo = () => {
    const patient_id = props.patient_id;
    doseInfo.prn = prn;
    doseInfo.appointment_id = props?.appointmentId || 0;
    const drugData = {
      medicine,
      doseInfo,
      patient_id,
      condition: doseInfo.condition.toString(),
    };
    axios.post("/save-dugs-details", drugData).then((res) => {
      props.setsaveMedicen(res.data.drugs);
      props.closeModal();
      props.setUpdateForHistory(Math.random());
      toast.success("Medicine uploaded sucessfully");
    });
  };

  const [mimsData, setmimsData] = useState();
  const [modalIsOpenMimsProduct, setmodalIsOpenMimsProduct] = useState(false);
  const closeModalMimsProduct = () => {
    setmodalIsOpenMimsProduct(false);
  };

  const closeModelRx = () => {
    props.closeModal();
    // setdrgsInfo([])
    setmimsData();
    setMedicine();
  };
  console.log(medicine, "ddf");
  const [alertmodelShow, setalertmodelShow] = useState(false);

  const [alertboxArray, setalertboxArray] = useState([]);
  const handleSelect = (item) => {
    console.log("guid", item.guid);
    setMedicine(item);
    cloudUrl.get(`generic/${item.guid}`).then((res) => {
      setmimsData(res.data.Result.Content.GGPI);
    });
    const newArryAlert = [];
    const mimsNewData = [{ Guid: item.guid }];
    props.prescribedDrugs.map((mediItem) => {
      return mimsNewData.push({ Guid: mediItem.guid });
    });

    props.prescribedDrugs.map((value) => {
      if (value.drug_name === item.drug_name) {
        return newArryAlert.push({
          name: "Duplicate Drug Class!",
          description: `The patient is already taking ${item.generic_name.name} , which has an ingredient in the same class as ${item.macrohealth_sg}`,
        });
      }
    });

    var xmlData = `<Request>
                            <Interaction>
                            <Prescribing>
                            ${mimsNewData
        .map((item) => {
          return `<GGPI reference="{${item.Guid}}"/>`;
        })
        .join("")}
                            </Prescribing> 
                            <References/>
                         <HealthIssueCodes>
                            ${pastHistory.length > 0
        ? pastHistory
          .map((item) => {
            return `<HealthIssueCode code="${item.code}" codeType="ICD10"/>`;
          })
          .join("")
        : ""
      }

                                </HealthIssueCodes>
                            </Interaction>
                       </Request>
            `;
    cloudUrl
      .post(`drugtodrug-rawdata`, xmlData, {
        method: "POST",
        headers: { "Content-Type": "text/xml" },
      })
      .then((res) => {
        if (Array.isArray(res.data.Result.Interaction.GGPI)) {
          if (Array.isArray(res.data.Result.Interaction.GGPI[0].Route.GGPI)) {
            res.data.Result.Interaction.GGPI[0].Route.GGPI.map((val) => {
              newArryAlert.push({
                name: `Drug interaction (${res.data.Result.Interaction.GGPI[0].name} vs ${val.name}) [Severity level - ${val.Route.ClassInteraction.Severity.name}]`,
                flug: `${val.Route.ClassInteraction.Severity.ranking}`,
                description: `${val.Route.ClassInteraction.Interaction.Professional}`,
                precaution: val.Route.ClassInteraction.Precaution,
                References: val.Route.ClassInteraction.References,
              });
            });
          } else {
            newArryAlert.push({
              name: `Drug interaction (${res.data.Result.Interaction.GGPI[0].name} vs ${res.data.Result.Interaction.GGPI[0].Route.GGPI.name}) [Severity level - ${res.data.Result.Interaction.GGPI[0].Route.GGPI.Route.ClassInteraction.Severity.name}]`,
              flug: `${res.data.Result.Interaction.GGPI[0].Route.GGPI.Route.ClassInteraction.Severity.ranking}`,
              description: `${res.data.Result.Interaction.GGPI[0].Route.GGPI.Route.ClassInteraction.Interaction.Professional}`,
              precaution:
                res.data.Result.Interaction.GGPI[0].Route.GGPI.Route
                  .ClassInteraction.Precaution,
              References:
                res.data.Result.Interaction.GGPI[0].Route.GGPI.Route
                  .ClassInteraction.References,
            });
          }

          if (
            res.data.Result.Interaction.GGPI[0].Route.HealthIssueCode !==
            undefined
          ) {
            newArryAlert.push({
              name: `Health Condition (${res.data.Result.Interaction.GGPI[0].Route.HealthIssueCode.name})`,
              description: `${res.data.Result.Interaction.GGPI[0].Route.HealthIssueCode.ClassInteraction.Interaction.Abbreviated}`,
            });
          }
        } else {
          // console.log("mims obj", res.data.Result.Interaction.GGPI)
        }
      });

    reactionTableData.map((values) => {
      if (values.drug_name === item.drug_name) {
        newArryAlert.push({
          name: "Allergy!",
          description: `This patient is noted to be allergic to ${item.drug_name}`,
        });
      }
    });

    if (patientInfo?.patient_birth_sex?.birth_sex_name === "Female") {
      var pMonth = Math.abs(
        moment(new Date(), "YYYY/MM/DD").format("M") -
        moment(patientInfo.patient_dob, "YYYY/MM/DD").format("M")
      );
      var pDay = Math.abs(
        moment(new Date(), "YYYY/MM/DD").format("D") -
        moment(patientInfo.patient_dob, "YYYY/MM/DD").format("D")
      );
      var pYear = Math.abs(
        moment(new Date(), "YYYY/MM/DD").format("YYYY") -
        moment(patientInfo.patient_dob, "YYYY/MM/DD").format("YYYY")
      );

      if (15 <= pYear <= 44) {
        const womensHealth = `<Request>
                <Interaction>
                <Prescribing>
                <GGPI reference="{${item.guid}}">
                </GGPI>
                </Prescribing>
                <HealthIssueCodes>
                ${pastHistory.length > 0
            ? pastHistory
              .map((item) => {
                return `<HealthIssueCode code="${item.code}" codeType="ICD10"/>`;
              })
              .join("")
            : ""
          }

                    </HealthIssueCodes>
                </Interaction>
                <PatientProfile>
                <Gender>F</Gender>
                <Age>
                <Day>${pDay}</Day>
                <Month>${pMonth}</Month>
                <Year>${pYear}</Year>
                </Age>

                </PatientProfile>
                </Request>`;

        cloudUrl
          .post(`womens-wocba`, womensHealth, {
            method: "POST",
            headers: { "Content-Type": "text/xml" },
          })
          .then((res) => {
            if (Array.isArray(res.data.Result.Interaction.GGPI.Route)) {
              res.data.Result.Interaction.GGPI.Route.map((wom) => {
                if (wom.WOCBA !== undefined) {
                  wom.WOCBA.Category.map((wom) => {
                    if (wom.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE (WOCBA)]`,
                        description: `${wom.Comment}`,
                      });
                    }
                  });
                }
              });
            } else {
              if (
                Array.isArray(
                  res.data.Result.Interaction.GGPI.Route.WOCBA.Category
                )
              ) {
                res.data.Result.Interaction.GGPI.Route.WOCBA.Category.map(
                  (wom) => {
                    if (wom.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE (WOCBA)]`,
                        description: `${wom.Comment}`,
                      });
                    }
                  }
                );
              } else {
                newArryAlert.push({
                  name: `${res.data.Result.Interaction.GGPI.name} [WOMAN OF CHILD BEARING AGE (WOCBA)]`,
                  description: `${res.data.Result.Interaction.GGPI.Route.WOCBA.Category.Comment}`,
                });
              }
            }
          });
      }

      if (
        pregnancyOutcome.length > 0 &&
        pregnancyOutcome[0].scan_weeks > 1 &&
        pregnancyOutcome[0].scan_weeks < 43
      ) {
        const womensHealth = `<Request>
                <Interaction>
                <Prescribing>
                <GGPI reference="{${item.guid}}">
                </GGPI>
                </Prescribing>
                <HealthIssueCodes>
                ${pastHistory.length > 0
            ? pastHistory
              .map((item) => {
                return `<HealthIssueCode code="${item.code}" codeType="ICD10"/>`;
              })
              .join("")
            : ""
          }

                    </HealthIssueCodes>
                </Interaction>
                <PatientProfile>
                <Gender>F</Gender>
                <Age>
                <Day>${pDay}</Day>
                <Month>${pMonth}</Month>
                <Year>${pYear}</Year>
                </Age>
                <Pregnancy><Week>${pregnancyOutcome[0].scan_weeks
          }</Week></Pregnancy>
                </PatientProfile>
                </Request>`;

        cloudUrl
          .post(`womens-pregnanecy`, womensHealth, {
            method: "POST",
            headers: { "Content-Type": "text/xml" },
          })
          .then((res) => {
            if (Array.isArray(res.data.Result.Interaction.GGPI.Route)) {
              res.data.Result.Interaction.GGPI.Route.map((wom) => {
                if (wom.Pregnancy !== undefined) {
                  wom.Pregnancy.Category.map((wom) => {
                    if (wom.Source === "MIMS") {
                      newArryAlert.push({
                        name: `${res.data.Result.Interaction.GGPI.name} [Pregnancy][${wom.Trimester} Trimester]`,
                        description: `${wom.Comment}`,
                      });
                    }
                  });
                }
              });
            } else {
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
                        description: `${wom.Comment}`,
                      });
                    }
                  }
                );
              } else {
                newArryAlert.push({
                  name: `${res.data.Result.Interaction.GGPI.name} [Pregnancy][${res.data.Result.Interaction.GGPI.Route.Pregnancy.Category.Trimester} Trimester]`,
                  description: `${res.data.Result.Interaction.GGPI.Route.WOCBA.Category.Comment}`,
                });
              }
            }
          });
      }
      if (patientInfo.lactation === 1) {
        const lactation = `<Request>
                <Interaction>
                <Prescribing>
                <GGPI reference="{${item.guid}}">
                </GGPI>
                </Prescribing>
                </Interaction>
                <PatientProfile>
                <Gender>F</Gender>
                <Age>
                <Day>${pDay}</Day>
                <Month>${pMonth}</Month>
                <Year>${pYear}</Year>
                </Age>
                <Nursing>true</Nursing>
                </PatientProfile>
                </Request>`;

        cloudUrl
          .post(`womens-lactation`, lactation, {
            method: "POST",
            headers: { "Content-Type": "text/xml" },
          })
          .then((res) => {
            if (Array.isArray(res.data.Result.Interaction.GGPI.Route)) {
              res.data.Result.Interaction.GGPI.Route.map((data) => {
                if (data.Lactation !== undefined) {
                  newArryAlert.push({
                    name: `${res.data.Result.Interaction.GGPI.name
                      } [Lactation][Severity Level - ${data.Lactation.Severity.name === undefined
                        ? ""
                        : data.Lactation.Severity.name
                      }]`,
                    description: `${data.Lactation.Comment}`,
                  });
                }
              });
            } else {
              newArryAlert.push({
                name: `${res.data.Result.Interaction.GGPI.name} [Lactation][Severity Level - ${res.data.Result.Interaction.GGPI.Route.Lactation.Severity.name}]`,
                description: `${res.data.Result.Interaction.GGPI.Route.Lactation.Comment}`,
              });
            }
          });
      }
    }

    setalertboxArray(newArryAlert);
  };

  console.log("alertboxArray", alertboxArray.length);

  const [indexNumber, setindexNumber] = useState(0);
  function closeModalAlert() {
    setindexNumber(0);
    setalertmodelShow(false);
    setalertboxArray([]);
  }
  const [ingredient, setingredient] = useState([]);
  const [ingredientModelShow, setingredientModelShow] = useState(false);
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
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
  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  };

  const [noDataFound, setnoDataFound] = useState("");
  const [searchDrugs, setsearchDrugs] = useState();
  const handleSearchDrugs = (e) => {
    setnoDataFound("");
    setloding(true);

    if (searchDrugs) {
      // /${drugTypeSlection}/${searchDrugs}/${searchSelectedDrugs?.value}
      axios
        .get(`search-drug-update`, {
          params: {
            typeSelection: drugTypeSlection,
            name: searchDrugs,
            drugType: searchSelectedDrugs?.value,
          },
        })
        .then((res) => {
          setdrgsInfo(res.data);
          setloding(false);
          setnoDataFound("");
        })
        .catch((err) => {
          if (err.response.status === 404) setnoDataFound("Data Not Found");
        });
    } else {
      loadMasterData();
    }
  };

  const loadMasterData = () => {
    setloding(false);
    setnoDataFound("");
    if (drugTypeSlection === "custom") {
      setdrgsInfo(masterDrugsInfo?.custom);
    } else if (drugTypeSlection === "favDrug") {
      setdrgsInfo(masterDrugsInfo?.fav);
    } else {
      setdrgsInfo(masterDrugsInfo?.drugs);
    }
  };
  const optimized = useCallback(debounce(handleSearchDrugs, 700), []);

  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={() => { }}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
          onClick={() => closeModelRx()}
        >
          {/* <i className="fal fa-times"></i> */}
          <LiaTimesCircle size={20} />
        </span>
        <h6 style={{ fontSize: "14px" }}>New Rx</h6>
        <hr className="top-hr" />
        <div className="row new-rx-container">
          <div className="col-lg-1 d-none d-lg-block">
            <div
              className="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link mb-2 active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Step 1
              </button>
              <button
                className="nav-link mb-2"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                Step 2
              </button>
              <button
                className="nav-link mb-2"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Step 3
              </button>
              <button
                className="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                Step 4
              </button>
            </div>
          </div>
          <div className="col-lg-11 col-md-12 col-sm-12">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="row">
                  <div className="col-2">
                    <div className="rx-bg-white p-1">
                      <div className="text-center">
                        <h6>Selection</h6>
                        <hr />
                      </div>
                      <div className="form-check">
                        <input
                          defaultChecked
                          onChange={(e) => {
                            setloding(false);
                            setnoDataFound("");
                            setdrgsInfo(props.AllDrugs?.drugs);
                            setdrugTypeSlection(e.target.value);
                          }}
                          className="form-check-input"
                          type="radio"
                          value="drugs"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Product Name
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          onChange={(e) => {
                            setloding(false);
                            setnoDataFound("");
                            setdrgsInfo(props.AllDrugs?.custom);
                            setmimsData();
                            setdrugTypeSlection(e.target.value);
                          }}
                          className="form-check-input"
                          type="radio"
                          value="custom"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Custom
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          onChange={(e) => {
                            setloding(false);
                            setnoDataFound("");
                            setdrgsInfo(props.AllDrugs?.fav);
                            setmimsData();
                            setdrugTypeSlection(e.target.value);
                          }}
                          className="form-check-input"
                          type="radio"
                          value="favDrug"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Favourites
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        axios
                          .post(`/fav-dug-update/${medicine.id}`)
                          .then((res) => {
                            toast.success("Favourite medicien add sucessfully");
                          });
                      }}
                      className="btn rx-fav-btn mt-3 w-100"
                    >
                      Favourite
                    </button>
                  </div>
                  <div className="col-8">
                    <div className="rx-search-container rx-bg-white row p-2">
                      <div className="col-lg-12 col-md-12 d-flex align-items-center gap-2">
                        <SimpleSelect
                          options={searchDrugsTypeOptions}
                          width="140px"
                          isClearable={false}
                          value={searchSelectedDrugs}
                          onChange={(data) => {
                            setsearchSelectedDrugs(data);
                            loadMasterData();
                          }}
                        />
                        <input
                          placeholder="Search Drugs Name"
                          onChange={(e) => {
                            if (e.target.value.length > 2) {
                              setsearchDrugs(e.target.value);
                            } else {
                              loadMasterData();
                            }
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSearchDrugs();
                            }
                          }}
                          type="text"
                          className="form-control form-control-sm"
                        />
                        <button onClick={handleSearchDrugs} className="gd-btn">
                          <IoMdSearch size={20} />
                        </button>
                        <Link
                          style={{ textDecoration: "none" }}
                          to="/add-custom-medicine"
                        >
                          <button
                            style={{
                              whiteSpace: "nowrap",
                            }}
                            className="gd-btn"
                          >
                            Drug Com.
                          </button>
                        </Link>
                      </div>
                    </div>
                    {drugTypeSlection === "custom" ? (
                      <div className="rx-bg-white  p-2 mt-1">
                        <div className="formulation-header row">
                          <div className="col-7">
                            <h6>Custom Formulation</h6>
                          </div>
                        </div>
                        <div className="formulation-table g-doc-scroll">
                          <table className="">
                            <tbody>
                              <tr className="rx-table-first-row">
                                <td width="40%">Product Name</td>
                                <td width="8%">Qty.</td>
                                <td>strength</td>
                                <td>other_details</td>
                                <td style={{ textAlign: "center" }}>
                                  Ingredient
                                </td>
                              </tr>
                              {drgsInfo?.length > 0 ? (
                                drgsInfo.map((item, i) => (
                                  <tr
                                    key={i}
                                    onClick={() => {
                                      setMedicine({
                                        id: item.id,
                                        mims_sg: item.other_details,
                                        macrohealth_sg:
                                          item.custom_medicine_name,
                                        guid: "",
                                        generic_name: {
                                          name: "",
                                        },
                                      });
                                    }}
                                    className={`${medicine?.id === item?.id
                                      ? "rx-table-active"
                                      : ""
                                      }`}
                                  >
                                    <td>{item?.custom_medicine_name}</td>
                                    <td>{item?.qty}</td>
                                    <td>{item?.strength}</td>

                                    <td>{item?.other_details}</td>
                                    <td
                                      onClick={() => {
                                        axios
                                          .get(`/find-ingredient/${item?.id}`)
                                          .then((res) => {
                                            setingredient(
                                              res?.data?.medicine_ingredient
                                            );
                                            setingredientModelShow(true);
                                          });
                                      }}
                                      style={{ textAlign: "center" }}
                                    >
                                      {/* <i class='fas fa-info-circle'></i> */}
                                      <IoMdInformationCircleOutline size={20} />
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td>
                                    {/* <i
                                      style={{
                                        fontSize: '26px',
                                        marginLeft: '10%',
                                        marginTop: '10%',
                                      }}
                                      class='fas fa-spinner fa-spin'
                                    ></i>
                                     */}
                                    <FaSpinner size={26} className="fa-spin" />
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <Modal
                          isOpen={ingredientModelShow}
                          onRequestClose={ingredientModelShow}
                          style={ingredientStyles}
                        >
                          <span
                            className="float-end"
                            style={{
                              fontSize: "15px",
                              cursor: "pointer",
                              marginTop: "-5px",
                            }}
                            onClick={() => setingredientModelShow(false)}
                          >
                            {/* <i className='fal fa-times'></i> */}
                            <LiaTimesCircle />
                          </span>
                          <h6 style={{ fontSize: "14px" }}>
                            Ingredient Details
                          </h6>
                          <hr className="top-hr" />
                          <div className="formulation-table g-doc-scroll">
                            <table className="">
                              <tbody>
                                <tr className="rx-table-first-row">
                                  <td width="60%">Ingredient name</td>
                                  <td>unit</td>
                                  <td>strength</td>
                                </tr>
                                {ingredient.length > 0 ? (
                                  ingredient.map((item, i) => (
                                    <tr key={i}>
                                      <td>
                                        {item.mhp_ingredient !== null &&
                                          item.mhp_ingredient.ingredient_name}
                                      </td>
                                      <td>{item.ingredient_unit}</td>
                                      <td>{item.ingredient_strength}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td>
                                      <FaSpinner
                                        className="fa-spin"
                                        size={26}
                                      />
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </Modal>
                      </div>
                    ) : (
                      <div className="rx-bg-white  p-2 mt-1">
                        <div className="formulation-header row">
                          <div className="col-7">
                            <h6>Available Formulation</h6>
                          </div>
                        </div>
                        <div className="formulation-table g-doc-scroll">
                          <table className="">
                            <tbody>
                              <tr
                                className="rx-table-first-row"
                                style={{
                                  position: "sticky",
                                  top: "0",
                                  background: "white",
                                }}
                              >
                                <td width="35%">Trade Name</td>
                                <td width="50%">Product Description</td>
                                <td style={{ textAlign: "center" }}>Qty.</td>
                                <td style={{ textAlign: "center" }}>RPTS</td>
                              </tr>
                              {drgsInfo?.length > 0 && noDataFound === "" ? (
                                !loding ? (
                                  drgsInfo.map((value, i) => (
                                    <tr
                                      key={i}
                                      onClick={() => {
                                        handleSelect(value);
                                      }}
                                      className={`${medicine?.id === value.id
                                        ? "rx-table-active"
                                        : ""
                                        }`}
                                    >
                                      <td>{value?.macrohealth_sg}</td>
                                      <td>{value?.mims_sg}</td>
                                      {/* <td>{value.manufacturer}</td> */}
                                      <td style={{ textAlign: "center" }}>
                                        {value?.qty}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {value?.rpts}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td>
                                      {/* <i
                                        style={{
                                          fontSize: '26px',
                                          marginLeft: '188%',
                                          marginTop: '27%',
                                          color: 'black',
                                        }}
                                        class='fas fa-spinner fa-spin'
                                      ></i> */}
                                      <FaSpinner
                                        size={26}
                                        className="fa-spin"
                                      />
                                    </td>
                                  </tr>
                                )
                              ) : (
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        fontSize: "18px",
                                        marginLeft: "158%",
                                        marginTop: "33%",
                                        color: "red",
                                        width: "150%",
                                      }}
                                    >
                                      {noDataFound}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="rx-bg-white p-2 mt-1">
                      <div className="rx-medicine-detail-header">
                        <h6 className="">Product Details</h6>
                        <div
                          style={{
                            borderBottom: "0.5px solid #c3c3c3",
                            marginBottom: "5px",
                          }}
                        ></div>
                      </div>
                      {medicine != null && (
                        <div className="rx-medicine-detail g-doc-scroll rx-medicine-detail-header">
                          <h6
                            className="rx-medicine-detail-header"
                            style={{ fontWeight: "bold" }}
                          >
                            {medicine?.macrohealth_sg}
                          </h6>
                          <h6
                            className="rx-medicine-detail-header"
                            style={{ fontWeight: "bold" }}
                          >
                            {medicine?.manufacturer}
                          </h6>

                          <p className="margin-zero">
                            Product Name : {medicine?.drug_name}
                          </p>
                          <p className="margin-zero">
                            Generic Name : {medicine?.generic_name?.name}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="rx-one-button-group mt-1">
                      <div className="row">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              onChange={(e) =>
                                setMedicine({
                                  ...medicine,
                                  iSAllergyCheck: !medicine.iSAllergyCheck,
                                })
                              }
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Allergy/Drug reaction has been checked
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <button
                            onClick={() => closeModelRx()}
                            className="btn float-end"
                          >
                            Cancel
                          </button>
                          {medicine?.drug_name !== "" ? (
                            <button
                              onClick={nextForStep2}
                              className="btn float-end me-2"
                            >
                              Next
                              {/* <i className='fas fa-angle-right ms-2'></i> */}
                              <FaChevronRight className="ms-2" size={12} />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                swal("Please select a medicine!", "", "info");
                              }}
                              className="btn float-end me-2"
                            >
                              Next
                              {/* <i className='fas fa-angle-right ms-2'></i> */}
                              <FaChevronRight className="ms-2" size={12} />
                            </button>
                          )}

                          <button className="btn float-end me-2">
                            {/* <i className='fas fa-angle-left me-2'></i> */}
                            <FaChevronLeft className="me-2" size={12} />
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 rx-first-step-right">
                    <div className="rx-bg-white mb-2">
                      <button
                        onClick={() => {
                          if (medicine.generic_name.name !== "") {
                            setloding(true);
                            axios
                              .get(
                                `search-drug/${drugTypeSlection}/${medicine.generic_name.name}`
                              )
                              .then((res) => {
                                setdrgsInfo(res.data);
                                setloding(false);
                              })
                              .catch((err) => {
                                if (err.response.status === 404)
                                  setnoDataFound("Data Not Found");
                              });
                          } else {
                            toast.warning("please select a drug");
                            setdrgsInfo(props.AllDrugs?.drugs);
                          }
                        }}
                        className="btn btn-sm w-100"
                      >
                        Same drug class
                      </button>
                    </div>
                    <div className="rx-bg-white mb-2">
                      <button
                        onClick={() => {
                          if (medicine.drug_name !== "") {
                            setloding(true);
                            axios
                              .get(
                                `search-drug/${drugTypeSlection}/${medicine.drug_name}`
                              )
                              .then((res) => {
                                setdrgsInfo(res.data);
                                setloding(false);
                                setnoDataFound("");
                              })
                              .catch((err) => {
                                if (err.response.status === 404)
                                  setnoDataFound("Data Not Found");
                              });
                          } else {
                            toast.warning("please select a drug");
                            loadMasterData();
                          }
                        }}
                        className="btn btn-sm w-100"
                      >
                        Equivalent product
                      </button>
                    </div>
                    <div className="rx-bg-white mb-2">
                      <button
                        onClick={() => setmodalIsOpenMimsProduct(true)}
                        className="btn btn-sm w-100"
                      >
                        Product information
                      </button>
                      {modalIsOpenMimsProduct && (
                        <MimsProductDetails
                          medicine={medicine}
                          modalIsOpenMimsProduct={modalIsOpenMimsProduct}
                          mimsData={mimsData}
                          closeModalMimsProduct={closeModalMimsProduct}
                        ></MimsProductDetails>
                      )}
                    </div>

                    <div className="rx-bg-white mb-2">
                      <button
                        id="mimsProductInfo"
                        onClick={() => setmodalIsOpenMimsProduct(true)}
                        className="btn btn-sm w-100"
                      >
                        MIMS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <div className="row">
                  <div className="col-lg-3 col-md-2 col-sm-2">
                    <div className="rx-bg-white p-2">
                      <div className="step2-img text-center">
                        <img src={mims} alt="" className="img-fluid m-1" />
                      </div>
                      <label>Dose</label>
                      <select
                        onChange={handleDoseInfo}
                        name="dose"
                        className="form-select form-select-sm mb-1"
                        aria-label=".form-select-sm example"
                      >
                        <option defaultValue="1">1</option>
                        {doseName.length > 0 &&
                          doseName.map((item, i) => {
                            return (
                              <>
                                <option key={i} value={item.dose_name}>
                                  {item.dose_name}
                                </option>
                              </>
                            );
                          })}
                      </select>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Frequency</label>
                        <div className="d-flex align-items-center gap-2">
                          <label for="prnE" className="mb-0">
                            PRN
                          </label>
                          <input
                            type="checkbox"
                            id="prnE"
                            checked={prn === "PRN"}
                            value={"PRN"}
                            onChange={() => {
                              setPrn(prn === "PRN" ? "" : "PRN");
                            }}
                          />
                        </div>
                      </div>
                      <select
                        onChange={handleDoseInfo}
                        name="frequency"
                        className="form-select form-select-sm mb-1"
                        aria-label=".form-select-sm example"
                      >
                        <option defaultValue="Daily">Daily</option>
                        {frequencyName.length > 0 &&
                          frequencyName.map((item, i) => {
                            return (
                              <option key={i} value={item.frequency_name}>
                                {item.frequency_name}
                              </option>
                            );
                          })}
                      </select>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <label>Food</label>
                        <div className="d-flex align-items-center gap-2">
                          <label for="prnB" className="mb-0">
                            প্রয়োজন হলে
                          </label>
                          <input
                            type="checkbox"
                            id="prnB"
                            checked={prn === "প্রয়োজন হলে"}
                            value={"PRN"}
                            onChange={() => {
                              setPrn(
                                prn === "প্রয়োজন হলে" ? "" : "প্রয়োজন হলে"
                              );
                            }}
                          />
                        </div>
                      </div>
                      <select
                        onChange={handleDoseInfo}
                        name="food"
                        className="form-select form-select-sm mb-1"
                        aria-label=".form-select-sm example"
                      >
                        <option defaultValue="Select">Select</option>
                        {foodName.length > 0 &&
                          foodName.map((item, i) => {
                            return (
                              <option key={i} value={item.food_name}>
                                {item.food_name}
                              </option>
                            );
                          })}
                      </select>
                      <label>Others</label>
                      <select
                        onChange={handleDoseInfo}
                        name="others"
                        className="form-select form-select-sm mb-1"
                        aria-label=".form-select-sm example"
                      >
                        <option defaultValue="Select">Select</option>
                        {others.length > 0 &&
                          others.map((item, i) => {
                            return (
                              <option key={i} value={item.others_name}>
                                {item.others_name}
                              </option>
                            );
                          })}
                      </select>
                      <label>Route</label>
                      <select
                        onChange={handleDoseInfo}
                        name="route"
                        className="form-select form-select-sm mb-1"
                        aria-label=".form-select-sm example"
                      >
                        <option defaultValue="Oral">Oral</option>
                        {Route.length > 0 &&
                          Route.map((item, i) => {
                            return (
                              <option key={i} value={item.route_name}>
                                {item.route_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-8 col-sm-8">
                    <div className="rx-bg-white">
                      <div className="rx-about-medicine g-doc-scroll p-1">
                        <h6>About Medicine</h6>
                        <hr />
                        {/* <h6>MIMS Abbreviated Product Listing</h6> */}
                        <p>{medicine?.drug_name}</p>
                        {/* <p>Generic Ingredients: {medicine.generic_name.name}</p> */}
                        {/* <p>Company Aspen Pharmacare Australia Pty. Ltd</p> */}
                      </div>
                    </div>
                    <div className="rx-bg-white mt-1">
                      <div className="dose-detail row ms-1">
                        <div className="col-2 p-2">
                          <p>Dose</p>
                          <p>Frequency</p>
                          <p>Food</p>
                        </div>
                        <div className="col-4 p-1">
                          <p className="dose-name">{doseInfo.dose}</p>
                          <p className="dose-name">{doseInfo.frequency}</p>
                          <p className="dose-name">{doseInfo.food}</p>
                        </div>
                        <div className="col-2 p-2">
                          <p>Others</p>
                          <p>Route</p>
                        </div>
                        <div className="col-4 p-1">
                          <p className="dose-name">{doseInfo.others}</p>
                          <p className="dose-name">{doseInfo.route}</p>
                          <div>
                            <input
                              className="form-check-input fvdInput"
                              checked={doseInfo.is_FVDose}
                              type="checkbox"
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_FVDose: !doseInfo.is_FVDose,
                                })
                              }
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label mt-2 ml-1"
                              for="flexCheckDefault"
                            >
                              Favourite Dose
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rx-s2-radio-group rx-bg-white mt-1">
                      <div className="row ms-1">
                        <div className="col-4">
                          <div className="form-check">
                            <input
                              name="tabs_inistraction"
                              onChange={handleDoseInfo}
                              className="form-check-input"
                              value="Number of tabs per day"
                              type="radio"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Number of tabs per day
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check">
                            <input
                              name="tabs_inistraction"
                              onChange={handleDoseInfo}
                              className="form-check-input"
                              value="Compliance checking"
                              type="radio"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Compliance checking
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check">
                            <input
                              name="tabs_inistraction"
                              onChange={handleDoseInfo}
                              className="form-check-input"
                              value="No complance checking"
                              type="radio"
                              id="flexRadioDefault1"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefault1"
                            >
                              No complance checking
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="instruction rx-bg-white mt-1 p-1">
                      <h6>Instruction</h6>
                      <hr />
                      <input
                        onChange={(e) =>
                          setDoseInfo({
                            ...doseInfo,
                            Complex_instruction: e.target.value,
                          })
                        }
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="instruction rx-bg-white mt-1 p-1">
                      <h6>Extra Instruction</h6>
                      <hr />
                      <input
                        onChange={(e) =>
                          setDoseInfo({
                            ...doseInfo,
                            extra_instruction: e.target.value,
                          })
                        }
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="rx-one-button-group mt-1">
                      <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-6">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Save this dose as the default for this preparation
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 d-flex justify-content-end">
                          <div>
                            <button onClick={backForStep2} className="btn me-2">
                              {/* <i className='fas fa-angle-left me-2'></i> */}
                              <FaChevronLeft className="me-2" size={12} />
                              Back
                            </button>
                            {doseInfo.dose !== "-" ? (
                              <button
                                onClick={nextForStep3}
                                className="btn me-2"
                              >
                                Next
                                {/* <i className='fas fa-angle-right ms-2'></i> */}
                                <FaChevronRight className="ms-2" size={12} />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  swal("Please select dose!", "", "info");
                                }}
                                className="btn me-2"
                              >
                                Next
                                {/* <i className='fas fa-angle-right ms-2'></i> */}
                                <FaChevronRight className="ms-2" size={12} />
                              </button>
                            )}
                            <button onClick={props.closeModal} className="btn">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="rx-bg-white mb-2">
                      <button className="btn btn-sm w-100 disabled">
                        Dose Calculator
                      </button>
                    </div>
                    <div className="rx-bg-white mb-2">
                      <button
                        onClick={() => setmodalIsOpenMimsProduct(true)}
                        className="btn btn-sm w-100"
                      >
                        Product Information
                      </button>
                    </div>
                    <div className="rx-bg-white mb-2">
                      <button className="btn btn-sm w-100 disabled">CMI</button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
              >
                <div className="row">
                  <div className="col-10">
                    <div className="row mt-2">
                      <div className="col-8 rx-step3-info">
                        <div className="rx-bg-white">
                          <div className="row">
                            <div className="col-4">
                              <label className="rx-label">Quantity</label>
                              <input
                                onChange={(e) =>
                                  setDoseInfo({
                                    ...doseInfo,
                                    quantity: e.target.value,
                                  })
                                }
                                defaultValue={doseInfo.quantity}
                                className="form-control form-control-sm ms-1"
                                type="text"
                              />
                            </div>
                            <div className="col-4">
                              <label className="rx-label">Repeats</label>
                              <input
                                onChange={(e) =>
                                  setDoseInfo({
                                    ...doseInfo,
                                    repeats: e.target.value,
                                  })
                                }
                                defaultValue={doseInfo.repeats}
                                className="form-control form-control-sm ms-1"
                                type="text"
                                aria-label=".form-control-sm example"
                              />
                            </div>
                            <div className="col-4">
                              <div className="form-check rx-regulation ms-2">
                                <input
                                  onChange={(e) =>
                                    setDoseInfo({
                                      ...doseInfo,
                                      is_Regulation: !doseInfo.is_Regulation,
                                    })
                                  }
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexCheckDefault"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexCheckDefault"
                                >
                                  Ragulation 24
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-8">
                                <div className="form-check form-check-inline ms-1">
                                  <input
                                    onChange={(e) =>
                                      setDoseInfo({
                                        ...doseInfo,
                                        drugsTimeLimit: "Long term medication",
                                      })
                                    }
                                    className="form-check-input mt-1"
                                    type="radio"
                                    name="dose"
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Long term medication
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input
                                    onChange={(e) =>
                                      setDoseInfo({
                                        ...doseInfo,
                                        drugsTimeLimit: "One time only",
                                      })
                                    }
                                    className="form-check-input mt-1"
                                    type="radio"
                                    name="dose"
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    One time only
                                  </label>
                                </div>
                                <div>
                                  <select
                                    onChange={(e) =>
                                      setDoseInfo({
                                        ...doseInfo,
                                        general_note: e.target.value,
                                      })
                                    }
                                    className="form-select form-select-sm m-1 mb-1"
                                    aria-label=".form-select-sm example"
                                  >
                                    <option value="General Note">
                                      General Note
                                    </option>
                                    {generalNote.length > 0 &&
                                      generalNote.map((item, i) => {
                                        return (
                                          <option key={i} value={item.name}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="ms-3 mt-2">
                                  <label className="rx-label">
                                    Prescribed as
                                  </label>
                                </div>
                                {/* <div className="form-check  form-check-inline ms-2">
                                                                <input className="form-check-input mt-1" type="radio" onChange={e => setDoseInfo({ ...doseInfo, prescribedAs: e.target.value })} value="PBS" name="prescribedAs" id="flexCheckDefault" />
                                                                <label className="form-check-label" for="flexCheckDefault">
                                                                    PBS
                                                                </label>
                                                            </div> */}
                                <div className="form-check  form-check-inline">
                                  <input
                                    className="form-check-input mt-1"
                                    type="radio"
                                    name="prescribedAs"
                                    onChange={(e) =>
                                      setDoseInfo({
                                        ...doseInfo,
                                        prescribedAs: e.target.value,
                                      })
                                    }
                                    value="Private"
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    Private
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="rx-bg-white rx-s3-checkgroup ps-1">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_print_brand_name:
                                    !doseInfo.is_print_brand_name,
                                })
                              }
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Print brand name on scripts
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_print_generic_name:
                                    !doseInfo.is_print_generic_name,
                                })
                              }
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Print generic name on scripts
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_urgent_supply: !doseInfo.is_urgent_supply,
                                })
                              }
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Urgent supply (own script)
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_allow_brand_substitution:
                                    !doseInfo.is_allow_brand_substitution,
                                })
                              }
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Allow brand substitution
                            </label>
                          </div>
                          {/* <div className="form-check">
                                                    <input className="form-check-input" type="checkbox"  id="flexCheckDefault" />
                                                    <label className="form-check-label" for="flexCheckDefault">
                                                        Brand substitution not allowed
                                                    </label>
                                                </div> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="rx-s3-text-area">
                                        <h6>PBS Listing</h6>
                                        <div className="rx-bg-white">
                                            <div class="form-floating">
                                                <textarea onChange={e => setDoseInfo({ ...doseInfo, pbs_listing: e.target.value })} class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "80px" }}></textarea>
                                                <label for="floatingTextarea2">PBS/RPBS General benefit</label>
                                            </div>
                                        </div>
                                    </div> */}
                    <div className="rx-one-button-group mt-2">
                      <div className="row">
                        <div className="col-lg-7 col-md-7 col-sm-6">
                          <div className="form-check">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_save_dose: !doseInfo.is_save_dose,
                                })
                              }
                              className="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Save this dose as the default for this preparation
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6">
                          <button
                            onClick={props.closeModal}
                            className="btn float-end"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={nextForStep4}
                            className="btn float-end me-2"
                          >
                            Next
                            {/* <i className='fas fa-angle-right ms-2'></i> */}
                            <FaChevronRight className="ms-2" size={12} />
                          </button>
                          <button
                            onClick={backForStep3}
                            className="btn float-end me-2"
                          >
                            {/* <i className='fas fa-angle-left me-2'></i> */}
                            <FaChevronLeft className="me-2" size={12} />
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-2">
                    <div className="rx-bg-white mb-2">
                      <button
                        onClick={() => setmodalIsOpenMimsProduct(true)}
                        className="btn btn-sm w-100"
                      >
                        Product Information
                      </button>
                    </div>
                    <div className="rx-bg-white mb-2">
                      <button className="btn btn-sm w-100">CMI</button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                <div className="row">
                  <div className="col-6">
                    <div className="rx-bg-white d-flex ">
                      <div className="form-check ms-2 me-lg-5 me-2">
                        <input
                          className="form-check-input"
                          onChange={() => {
                            setExistingCondition(!existingCondition);
                            setDoseInfo({ ...doseInfo, condition: [] });
                          }}
                          type="radio"
                          name="condition"
                          id="flexRadioDefault1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          Existing condition
                        </label>
                      </div>
                      <div className="form-check ms-lg-5 ms-2">
                        <input
                          className="form-check-input"
                          onChange={() =>
                            setExistingCondition(!existingCondition)
                          }
                          type="radio"
                          name="condition"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          New condition
                        </label>
                      </div>
                    </div>
                    <div className=" mt-2  p-1 formulation-table g-doc-scroll">
                      {existingCondition ? (
                        <>
                          {pastHistory?.map((item, i) => {
                            return (
                              <div key={i} className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="Excondition"
                                  value={item.condition}
                                  onChange={(e) => {
                                    const { value, checked } = e.target;
                                    if (checked) {
                                      setDoseInfo({
                                        ...doseInfo,
                                        condition: [
                                          ...doseInfo.condition,
                                          value,
                                        ],
                                      });
                                    } else {
                                      const newData = doseInfo.condition.filter(
                                        (item) => item !== value
                                      );
                                      setDoseInfo({
                                        ...doseInfo,
                                        condition: newData,
                                      });
                                    }
                                  }}
                                  id="flexRadioDefault1"
                                />
                                <label
                                  className="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  {item.condition}
                                </label>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <div className="rx-one-button-group">
                          <div style={{ width: 470 }}>
                            <ReactSearchAutocomplete
                              showIcon={true}
                              placeholder={"Search Diagnosis"}
                              items={props.diagonis}
                              resultStringKeyName="DiagnosisProcedure_name"
                              onSelect={(item) => {
                                setDoseInfo({
                                  ...doseInfo,
                                  code: item.DiagnosisProcedure_code,
                                  condition: item.DiagnosisProcedure_name,
                                });
                              }}
                              fuseOptions={{
                                keys: ["DiagnosisProcedure_name"],
                              }}
                              styling={{
                                borderRadius: "5px !important",
                                zIndex: 3,
                              }}
                            />
                          </div>
                          <button
                            onClick={() => {
                              if (doseInfo.condition !== "") {
                                const data = {
                                  date: moment().format("YYYY-MM-DD"),
                                  patient_id: props.patient_id,
                                  doctor_id: props.doctor_id,
                                  condition: doseInfo.condition,
                                  code: doseInfo.code,
                                };
                                axios
                                  .post("/past-history-save", data)
                                  .then((res) => {
                                    toast.success("Data save sucessfully.");
                                    props.setdaignosisProps(`
                                                                            <p class="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
                                                                                <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Diagnosis :</strong></span><br>
                                                                                ${res.data.pastHistory
                                        .map(
                                          (
                                            item,
                                            i
                                          ) => {
                                            return item.condition;
                                          }
                                        )
                                        .join(
                                          " , "
                                        )}
                                                                            </p>
                                                                            `);
                                    props.setdiagAndPastHistoriyStateUpdate(
                                      Math.random()
                                    );
                                  })
                                  .catch((err) =>
                                    toast.error("Something is wrong!")
                                  );
                              }
                            }}
                            className="btn float-end mt-2"
                          >
                            Add to past history
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="rx-bg-white p-2">
                      <div className="row ms-1">
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_right:
                                    !doseInfo.is_condition_status_right,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Right
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_left:
                                    !doseInfo.is_condition_status_left,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              left
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_bilateral:
                                    !doseInfo.is_condition_status_bilateral,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Bilateral
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="ms-1 row">
                        <div className="col-4">
                          <div className="form-check form-check-inline ">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_acute:
                                    !doseInfo.is_condition_status_acute,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Acute
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_chronic:
                                    !doseInfo.is_condition_status_chronic,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Chronic
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_mild:
                                    !doseInfo.is_condition_status_mild,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Mild
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row ms-1">
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_moderate:
                                    !doseInfo.is_condition_status_moderate,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Moderate
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_condition_status_severe:
                                    !doseInfo.is_condition_status_severe,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Severe
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rx-bg-white rx-checkbox-group  p-2 mt-2">
                      <div className="row ms-1">
                        <div className="col-6">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_add_to_reason_for_visit:
                                    !doseInfo.is_add_to_reason_for_visit,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Add to reason for visit
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-check form-check-inline">
                            <input
                              onChange={(e) =>
                                setDoseInfo({
                                  ...doseInfo,
                                  is_mark_as_confidential:
                                    !doseInfo.is_mark_as_confidential,
                                })
                              }
                              className="form-check-input mt-1"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Mark as confidential
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rx-bg-white rx-further-detail mt-2">
                    <h6>Further Details</h6>
                    <div class="form-floating m-1 mb-2">
                      <textarea
                        onChange={(e) =>
                          setDoseInfo({
                            ...doseInfo,
                            further_details: e.target.value,
                          })
                        }
                        class="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label for="floatingTextarea2">Write here</label>
                    </div>
                  </div>
                  <div className="rx-one-button-group mt-2">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <button
                          onClick={props.closeModal}
                          className="btn float-end"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveDrugsInfo}
                          className="btn float-end me-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={backForStep4}
                          className="btn float-end me-2"
                        >
                          {/* <i className='fas fa-angle-left me-1'> </i>  */}
                          <FaChevronLeft size={12} className="me-1" />
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={alertmodelShow}
          onRequestClose={closeModalAlert}
          style={customStylesAleart}
          contentLabel="Example Modal"
        >
          <>
            <span
              className="float-end"
              style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
              onClick={() => {
                setalertmodelShow(false);
                setalertboxArray([]);
                setindexNumber(0);
              }}
            >
              <LiaTimesCircle size={20} />
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
                  {alertboxArray.length > 0 && alertboxArray[indexNumber].name}
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
                  Array.isArray(alertboxArray[indexNumber].precaution) ? (
                  alertboxArray[indexNumber].precaution.map((preca, i) => {
                    return (
                      <>
                        <ul>
                          <li key={i}>{preca.Professional}</li>
                        </ul>
                      </>
                    );
                  })
                ) : alertboxArray.length > 0 &&
                  alertboxArray[indexNumber]["precaution"] &&
                  typeof alertboxArray[indexNumber].precaution === "object" ? (
                  <ul>
                    <li>
                      {alertboxArray[indexNumber].precaution.Professional}
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
                      alertboxArray[indexNumber].References.ElectronicReference
                    ) ? (
                    alertboxArray[
                      indexNumber
                    ].References.ElectronicReference.map((ref, i) => {
                      return (
                        <>
                          <ul>
                            <li key={i}>{`${ref.Title}. ${ref.RefTitle}. ${ref.SystemName
                              }. ${typeof ref.SystemAuthor === "string"
                                ? ref.SystemAuthor
                                : ""
                              }. ${ref.SystemManf}. ${ref.SystemManfLoc}. ${ref.SystemManfCountry
                              }. Available from URL : ${ref.URL} (Accessed on ${ref.Date
                              })`}</li>
                          </ul>
                        </>
                      );
                    })
                  ) : alertboxArray.length > 0 &&
                    alertboxArray[indexNumber]["References"] &&
                    typeof alertboxArray[indexNumber].References
                      .ElectronicReference === "object" ? (
                    <ul>
                      <li>{`${alertboxArray[indexNumber].References
                        .ElectronicReference.Title
                        }. ${alertboxArray[indexNumber].References
                          .ElectronicReference.RefTitle
                        }. ${alertboxArray[indexNumber].References
                          .ElectronicReference.SystemName
                        }. ${typeof alertboxArray[indexNumber].References
                          .ElectronicReference.SystemAuthor === "string"
                          ? alertboxArray[indexNumber].References
                            .ElectronicReference.SystemAuthor
                          : ""
                        }. ${alertboxArray[indexNumber].References
                          .ElectronicReference.SystemManf
                        }. ${alertboxArray[indexNumber].References
                          .ElectronicReference.SystemManfLoc
                        }. ${alertboxArray[indexNumber].References
                          .ElectronicReference.SystemManfCountry
                        }. Available from URL : ${alertboxArray[indexNumber].References
                          .ElectronicReference.URL
                        } (Accessed on ${alertboxArray[indexNumber].References
                          .ElectronicReference.Date
                        })`}</li>
                    </ul>
                  ) : (
                    ""
                  )}

                  {alertboxArray.length > 0 &&
                    alertboxArray[indexNumber]["References"] &&
                    Array.isArray(
                      alertboxArray[indexNumber].References.JournalReference
                    ) ? (
                    alertboxArray[indexNumber].References.JournalReference.map(
                      (ref, i) => {
                        return (
                          <>
                            <ul>
                              <li
                                key={i}
                              >{`${ref.Author} ${ref.Title} ${ref.Year} ; ${ref.Volume} (${ref.Part}) : ${ref.Page}`}</li>
                            </ul>
                          </>
                        );
                      }
                    )
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
                    setmodalIsOpenMimsProduct(true);
                    closeModalAlert();
                  }}
                  className="btn float-end "
                >
                  Product Information
                </button>

                <button
                  onClick={() => {
                    if (indexNumber + 1 < alertboxArray.length) {
                      setindexNumber(indexNumber + 1);
                    } else {
                      document.getElementById("v-pills-profile-tab").click();
                      closeModalAlert();
                    }
                  }}
                  className="btn float-end me-2"
                >
                  Continue
                  {/* <i className='fas fa-angle-right ms-2'></i> */}
                  <FaChevronRight size={12} />
                </button>

                {alertboxArray.length > 1 && (
                  <button
                    onClick={() => {
                      if (indexNumber > 0) {
                        setindexNumber(indexNumber - 1);
                      } else {
                        // document.getElementById("v-pills-profile-tab").click();
                        closeModalAlert();
                      }
                    }}
                    className="btn float-end me-2"
                  >
                    {/* <i className='fas fa-angle-left mr-2'></i> */}
                    <FaChevronLeft className="me-2" size={12} />
                    Back
                  </button>
                )}

                <button
                  onClick={closeModalAlert}
                  className="btn float-end me-2"
                >
                  <FaChevronLeft className="me-2" size={12} />
                  Chose again
                </button>
              </div>
            </div>
          </>
        </Modal>
      </Modal>
    </>
  );
};

export default NewRx;
