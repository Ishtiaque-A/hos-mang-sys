import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import PaediatricExamMain from "./paediatric/PaediatricExamMain";
import "./AddNewPatient/FamilyHistory.css";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import DatePicker from "react-datepicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "../../common/components/Button";
import { nullParser } from "../../utils/null-parser";
import { isValidDate } from "../../utils/isValidDate";
// import "react-datepicker/dist/react-datepicker.css";

export default function Family(props) {
  console.log("props Family", props);
  const params = useParams();

  const [occupationlist, setOccupationList] = useState([]);
  const [doctorslist, setDoctorsList] = useState([]);

  const [occupationalhazards, setoccupationalhazardslist] = useState([]);
  const [currentsmokinghistory, setcurrentsmokinghistorylist] = useState([]);
  const [tobaccotype, settobaccotypelist] = useState([]);
  const [tobaccoamountcost, settobaccoamountcostlist] = useState([]);
  const [advicesuggestion, setadvicesuggestionlist] = useState([]);
  const [pastalcconsumption, setpastalcconsumptionlist] = useState([]);
  const [familyOrSocialTab, setFamilyOrSocialTab] = useState(false);
  const [subTabId, setSubTabId] = useState("alcohol");

  const [familyMaritalStatusDropList, setFamilyMaritalStatusDropList] =
    useState([
      { id: 1, title_status: "Married" },
      { id: 2, title_status: "Unmarried" },
    ]);
  const [familyFatherDropList, setFamilyFatherDropList] = useState([
    { id: 1, title_status_father: "Alive" },
    { id: 2, title_status_father: "Died" },
  ]);
  const [familyMotherDropList, setFamilyMotherDropList] = useState([
    { id: 1, title_status_mother: "Alive" },
    { id: 2, title_status_mother: "Died" },
  ]);
  const [
    familyFatherMedicalHistoryCheckbox,
    setFamilyFatherMedicalHistoryCheckbox,
  ] = useState([
    { id: 1, title: "HTN" },
    { id: 2, title: "Hypercholesterolaemia" },
    { id: 3, title: "Diabetes" },
    { id: 4, title: "IHD" },
    { id: 5, title: "Bowel cancer" },
    { id: 6, title: "Stroke" },
    { id: 7, title: "Prostate cancer" },
    { id: 8, title: "Mental health condition" },
  ]);
  const [
    familyFatherMedicalHistoryCheckboxMother,
    setFamilyFatherMedicalHistoryCheckboxMother,
  ] = useState([
    { id: 1, title: "HTN" },
    { id: 2, title: "Hypercholesterolaemia" },
    { id: 3, title: "Diabetes" },
    { id: 4, title: "IHD" },
    { id: 5, title: "Bowel cancer" },
    { id: 6, title: "Stroke" },
    { id: 7, title: "Breast cancer" },
    { id: 8, title: "Mental health condition" },
  ]);
  const [
    familyMotherMedicalHistoryCheckbox,
    setFamilyMotherMedicalHistoryCheckbox,
  ] = useState([
    { id: 1, title: "HTN" },
    { id: 2, title: "Hypercholesterolaemia" },
    { id: 3, title: "Diabetes" },
    { id: 4, title: "IHD" },
    { id: 5, title: "Bowel cancer" },
    { id: 6, title: "Stroke" },
    { id: 7, title: "Uterine ca" },
    { id: 8, title: "Mental health condition" },
  ]);

  const [patientInput, setPatient] = useState({
    alcohol_id: "",
    days_per_week: "",
    standard_drinks_per_day: "",
    past_alc_consumption: "",
    year_started: new Date(),
    year_stopped: new Date(),
    comments: "",

    Ocu_id: "",
    occupation_id: "",
    occupation_details: "",
    employee_id: "",
    year_commented: new Date(),
    year_ceased: new Date(),
    occupational_hazards_exposer: "",
    extra_details: "",

    merital_status_id: "",
    father_status: "",
    father_death_year: new Date(),
    father_medical_history: [],
    father_cause_of_death: "",
    mother_status: "",
    mother_death_year: new Date(),
    mother_medical_history: [],
    mother_cause_of_death: "",

    tabaco_id: "",
    current_smoking_history: "",
    date_started: new Date(),
    tobacco_type: "",
    tobacco_year_started: new Date(),
    tobacco_year_stopped: new Date(),
    is_fresho_leaf: "",
    amount_per_day: "",
    is_cessation_advice: "",
    advice_suggestion: "",
    comments_tobacco: "",
  });

  console.log("patien1", patientInput);
  const handleInput = (e) => {
    e.persist();
    setPatient({ ...patientInput, [e.target.name]: e.target.value });
  };

  const [allcheckbox, setCheckboxes] = useState([]);

  const handleCheckbox = (e) => {
    e.persist();
    setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked });
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/patients-additional-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setOccupationList(res.data.occupation);
        setDoctorsList(res.data.doctors);

        setoccupationalhazardslist(res.data.occupationalhazards);
        setcurrentsmokinghistorylist(res.data.currentsmokinghistory);
        settobaccotypelist(res.data.tobaccotype);
        settobaccoamountcostlist(res.data.tobaccoamountcost);
        setadvicesuggestionlist(res.data.advicesuggestion);
        setpastalcconsumptionlist(res.data.pastalcconsumption);
      }
    });

    axios
      .get(
        `/patients-family-social/${params.id ? params.id : props.patient_id}`
      )
      .then((res) => {
        if (res.data.status === 200) {
          setLoading(false);
          console.log("patien2", res.data);
          setPatient({
            alcohol_id: res.data.alcohols.id,
            days_per_week: res.data.alcohols.days_per_week,
            standard_drinks_per_day: res.data.alcohols.standard_drinks_per_day,
            past_alc_consumption: res.data.alcohols.past_alc_consumption,
            year_started: res.data.alcohols.year_started,
            year_stopped: res.data.alcohols.year_stopped,
            comments: res.data.alcohols.comments,

            Ocu_id: res.data.occupation_details.id,
            occupation_id: res.data.occupation_details.occupation_id,
            occupation_details: res.data.occupation_details.occupation_details,
            employee_id: res.data.occupation_details.employee_id,
            year_commented: res.data.occupation_details.year_commented,
            year_ceased: res.data.occupation_details.year_ceased,
            occupational_hazards_exposer:
              res.data.occupation_details.occupational_hazards_exposer,
            extra_details: res.data.occupation_details.extra_details,

            merital_status_id: res.data.occupation_details.merital_status_id,
            father_status: res.data.occupation_details.father_status,
            father_death_year: res.data.occupation_details.father_death_year,
            father_medical_history: res.data.occupation_details
              .father_medical_history
              ? res.data.occupation_details.father_medical_history.split(",")
              : [],
            father_cause_of_death:
              res.data.occupation_details.father_cause_of_death,
            mother_status: res.data.occupation_details.mother_status,
            mother_death_year: res.data.occupation_details.mother_death_year,
            mother_medical_history: res.data.occupation_details
              .mother_medical_history
              ? res.data.occupation_details.mother_medical_history.split(",")
              : [],
            mother_cause_of_death:
              res.data.occupation_details.mother_cause_of_death,

            tabaco_id: res.data.social_tobacco.id,
            current_smoking_history:
              res.data.social_tobacco.current_smoking_history,
            date_started: res.data.social_tobacco.date_started,
            tobacco_type: res.data.social_tobacco.tobacco_type,
            tobacco_year_started: res.data.social_tobacco.tobacco_year_started,
            tobacco_year_stopped: res.data.social_tobacco.tobacco_year_stopped,
            is_fresho_leaf: res.data.social_tobacco.is_fresho_leaf,
            amount_per_day: res.data.social_tobacco.amount_per_day,
            is_cessation_advice: res.data.social_tobacco.is_cessation_advice,
            advice_suggestion: res.data.social_tobacco.advice_suggestion,
            comments_tobacco: res.data.social_tobacco.comments_tobacco,
          });
        }
      });
  }, [params, props.patient_id]);

  console.log("Patien tabaco", patientInput);
  const navigate = useNavigate();
  const updatePatientFamily = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("patient_id", params.id ? params.id : props.patient_id);
    formData.append("alcohol_id", patientInput.alcohol_id);
    formData.append("is_drinker", allcheckbox.is_drinker ? "Yes" : "No");
    formData.append("days_per_week", patientInput.days_per_week);
    formData.append(
      "standard_drinks_per_day",
      patientInput.standard_drinks_per_day
    );
    formData.append("past_alc_consumption", patientInput.past_alc_consumption);
    formData.append("year_started", patientInput.year_started);
    formData.append("year_stopped", patientInput.year_stopped);
    formData.append("comments", patientInput.comments);

    formData.append("Ocu_id", patientInput.Ocu_id);
    formData.append("occupation_id", patientInput.occupation_id);
    formData.append("occupation_details", patientInput.occupation_details);
    formData.append("employee_id", patientInput.employee_id);
    formData.append("year_commented", patientInput.year_commented);
    formData.append("year_ceased", patientInput.year_ceased);
    formData.append(
      "occupational_hazards_exposer",
      patientInput.occupational_hazards_exposer
    );
    formData.append("extra_details", patientInput.extra_details);

    formData.append("merital_status_id", patientInput.merital_status_id);
    formData.append(
      "mother_cause_of_death",
      patientInput.mother_cause_of_death
    );
    formData.append(
      "mother_medical_history",
      patientInput.mother_medical_history
    );
    formData.append("mother_death_year", patientInput.mother_death_year);
    formData.append("mother_status", patientInput.mother_status);
    formData.append(
      "father_cause_of_death",
      patientInput.father_cause_of_death
    );
    formData.append(
      "father_medical_history",
      patientInput.father_medical_history
    );
    formData.append("father_status", patientInput.father_status);
    formData.append("father_death_year", patientInput.father_death_year);

    formData.append("tabaco_id", patientInput.tabaco_id);
    formData.append(
      "current_smoking_history",
      patientInput.current_smoking_history
    );
    formData.append("date_started", patientInput.date_started);
    formData.append("tobacco_type", patientInput.tobacco_type);
    formData.append("tobacco_year_started", patientInput.tobacco_year_started);
    formData.append("tobacco_year_stopped", patientInput.tobacco_year_stopped);
    formData.append("is_fresho_leaf", patientInput.is_fresho_leaf);
    formData.append("amount_per_day", patientInput.amount_per_day);
    formData.append("is_cessation_advice", patientInput.is_cessation_advice);
    formData.append("advice_suggestion", patientInput.advice_suggestion);
    formData.append("comments_tobacco", patientInput.comments_tobacco);

    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    if (
      patientInput.alcohol_id !== "" ||
      patientInput.Ocu_id !== "" ||
      patientInput.tabaco_id !== ""
    ) {
      // console.log("patientInput.alcohol_id",patientInput.alcohol_id);
      // console.log("patientInput.Ocu_id",patientInput.Ocu_id);
      // console.log("patientInput.tabaco_id",patientInput.tabaco_id);

      axios
        .post(
          `/update-family-details/${params.id ? params.id : props.patient_id}`,
          formData
        )
        .then((res) => {
          console.log("Update", res);
          swal("Success", res.data.message, "success");
        });
    } else {
      axios
        .post(
          `/add-family-details/${params.id ? params.id : props.patient_id}`,
          formData
        )
        .then((res) => {
          if (res.data.status === 200) {
            console.log("Res", res);

            swal("Success", res.data.message, "success");

            // setPatient({
            //   days_per_week: '',
            //   standard_drinks_per_day: '',
            //   past_alc_consumption: '',
            //   year_started: '',
            //   year_stopped: '',
            //   comments: '',

            //   occupation_id: '',
            //   occupation_details: '',
            //   employee_id: '',
            //   year_commented: '',
            //   year_ceased: '',
            //   occupational_hazards_exposer: '',
            //   extra_details: '',
            //   merital_status_id: '',
            //   father_status: '',
            //   father_death_year: '',
            //   father_medical_history: [],
            //   father_cause_of_death: '',
            //   mother_status: '',
            //   mother_death_year: '',
            //   mother_medical_history: [],
            //   mother_cause_of_death: '',

            //   current_smoking_history: '',
            //   date_started: '',
            //   tobacco_type: '',
            //   tobacco_year_started: '',
            //   tobacco_year_stopped: '',
            //   is_fresho_leaf: '',
            //   amount_per_day: '',
            //   is_cessation_advice: '',
            //   advice_suggestion: '',
            //   comments_tobacco: '',

            // });
          }
        });
    }
  };
  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  console.log(patientInput?.father_death_year, "patientData", patientInput);

  return (
    <>
      {loading ? (
        <h1>loading ...</h1>
      ) : (
        <div className="row family-history-container patient-history">
          <div className="ms-1 col-md-12">
            <div>
              <div className="d-flex custom-card justify-content-between mb-2">
                <h6 className="ml-3 mt-2">Family & Social History</h6>
                {/* <button onClick={updatePatientFamily} className="btn btn-sm btn-primary mt-2 mr-3">Submit</button> */}
              </div>
              <div className="custom-card mb-2">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  <li className="nav-item active" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-family-tab-gd"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-family-gd"
                      type="button"
                      role="tab"
                      aria-controls="pills-family-gd"
                      aria-selected="true"
                      onClick={() => {
                        setFamilyOrSocialTab(false);
                      }}
                    >
                      Family
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-social-tab-gd"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-social-gd"
                      type="button"
                      role="tab"
                      aria-controls="pills-social-gd"
                      aria-selected="false"
                      onClick={() => {
                        setFamilyOrSocialTab(true);
                      }}
                    >
                      Social
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content" id="pills-tabContent">
                <div
                  className={`tab-pane fade  ${
                    familyOrSocialTab ? "" : "show active"
                  }`}
                  id="pills-family-gd"
                  role="tabpanel"
                  aria-labelledby="pills-family-tab-gd"
                >
                  <form onSubmit={updatePatientFamily}>
                    <div className="card p-2 mb-2">
                      {/* <h5 className="card-header">Tobacco</h5> */}
                      <div className="card-body">
                        <div className="row g-3">
                          <div className="col-6">
                            <label className="form-check-label col-form-label col-form-label-sm">
                              Marital Status
                            </label>

                            <select
                              className="form-select form-select-sm"
                              aria-label=""
                              name="merital_status_id"
                              onChange={handleInput}
                              value={
                                nullParser(patientInput.merital_status_id)
                                  ? patientInput.merital_status_id
                                  : 0
                              }
                            >
                              <option>Select</option>
                              {familyMaritalStatusDropList.map((item) => {
                                return (
                                  <option
                                    value={item.title_status}
                                    key={item.id}
                                  >
                                    {item.title_status}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className=" col-6">
                            <label className="form-check-label col-form-label col-form-label-sm">
                              Father
                            </label>
                            <select
                              className="form-select form-select-sm"
                              aria-label=""
                              name="father_status"
                              onChange={handleInput}
                              value={
                                nullParser(patientInput.father_status)
                                  ? patientInput.father_status
                                  : 0
                              }
                            >
                              <option>Select</option>
                              {familyFatherDropList.map((item) => {
                                return (
                                  <option
                                    value={item.title_status_father}
                                    key={item.id}
                                  >
                                    {item.title_status_father}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-6 ">
                            <div style={{ width: "100%" }}>
                              <div>
                                <label className="form-label col-form-label col-form-label-sm">
                                  {" "}
                                  Year{" "}
                                </label>
                              </div>
                              {/* {console.log(
                                patientInput?.father_death_year,
                                "patientInput?.father_death_year"
                              )} */}
                              <DatePicker
                                selected={
                                  isValidDate(patientInput?.father_death_year)
                                    ? new Date(patientInput.father_death_year)
                                    : new Date()
                                }
                                onChange={(year) => {
                                  setPatient({
                                    ...patientInput,
                                    father_death_year: year,
                                  });
                                }}
                                showYearPicker
                                dateFormat="yyyy"
                                yearItemNumber={6}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <label className="form-label col-form-label col-form-label-sm">
                              {" "}
                              Cause of death{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control date-option from-control-sm"
                              name="father_cause_of_death"
                              onChange={handleInput}
                              value={
                                nullParser(patientInput.father_cause_of_death)
                                  ? patientInput.father_cause_of_death
                                  : ""
                              }
                            />
                          </div>
                          <div className="col-12 family_medical_history">
                            <label for="name" className="control-label">
                              Medical History
                            </label>
                            <div className="form-group row">
                              <div className="col-sm-12 checkbox-wrapper">
                                {familyFatherMedicalHistoryCheckbox.map(
                                  (item, id) => {
                                    return (
                                      <div key={id} className="checkbox-inline">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="severity_0"
                                          checked={
                                            patientInput.father_medical_history.find(
                                              (ele) => ele === item.title
                                            )
                                              ? true
                                              : false
                                          }
                                          name="severity[]"
                                          onChange={(e) => {
                                            const { checked, value } = e.target;
                                            const history = [
                                              ...patientInput.father_medical_history,
                                            ];
                                            if (checked) {
                                              history.push(value);
                                              setPatient({
                                                ...patientInput,
                                                father_medical_history: history,
                                              });
                                            } else {
                                              const filtered =
                                                patientInput.father_medical_history.filter(
                                                  (history) =>
                                                    history !== item.title
                                                );
                                              setPatient({
                                                ...patientInput,
                                                father_medical_history:
                                                  filtered,
                                              });
                                            }
                                          }}
                                          value={
                                            nullParser(item.title)
                                              ? item.title
                                              : ""
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          for="severity_0"
                                        >
                                          {nullParser(item.title)
                                            ? item.title
                                            : ""}
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>

                          <div className=" col-6">
                            <label className="form-check-label col-form-label col-form-label-sm">
                              Mother
                            </label>
                            <select
                              className="form-select form-select-sm"
                              aria-label=""
                              name="mother_status"
                              onChange={handleInput}
                              value={
                                nullParser(patientInput.mother_status)
                                  ? patientInput.mother_status
                                  : 0
                              }
                            >
                              <option>Select</option>
                              {familyMotherDropList.map((item) => {
                                return (
                                  <option
                                    value={item.title_status_mother}
                                    key={item.id}
                                  >
                                    {item.title_status_mother}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="col-6">
                            <div>
                              <label className="form-label col-form-label col-form-label-sm">
                                {" "}
                                Year
                              </label>
                            </div>
                            <DatePicker
                              selected={
                                isValidDate(patientInput?.mother_death_year)
                                  ? new Date(patientInput.mother_death_year)
                                  : new Date().getFullYear()
                              }
                              onChange={(value) => {
                                setPatient({
                                  ...patientInput,
                                  mother_death_year: value,
                                });
                              }}
                              showYearPicker
                              dateFormat="yyyy"
                              yearItemNumber={6}
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label col-form-label col-form-label-sm">
                              {" "}
                              Cause of death{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control date-option from-control-sm"
                              name="mother_cause_of_death"
                              onChange={handleInput}
                              value={
                                nullParser(patientInput.mother_cause_of_death)
                                  ? patientInput.mother_cause_of_death
                                  : ""
                              }
                            />
                          </div>
                          <div className="col-12 family_medical_history">
                            <label for="name" className="control-label">
                              Medical History
                            </label>
                            <div className="form-group row">
                              <div className="col-sm-12 checkbox-wrapper">
                                {familyFatherMedicalHistoryCheckboxMother.map(
                                  (item, i) => {
                                    return (
                                      <div key={i} className="checkbox-inline">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="severity_0"
                                          checked={
                                            patientInput.mother_medical_history.find(
                                              (ele) => ele === item.title
                                            )
                                              ? true
                                              : false
                                          }
                                          name="severity[]"
                                          onChange={(e) => {
                                            const { checked, value } = e.target;
                                            const history = [
                                              ...patientInput.mother_medical_history,
                                            ];
                                            if (checked) {
                                              history.push(value);
                                              setPatient({
                                                ...patientInput,
                                                mother_medical_history: history,
                                              });
                                            } else {
                                              const filtered =
                                                patientInput.mother_medical_history.filter(
                                                  (history) =>
                                                    history !== item.title
                                                );
                                              setPatient({
                                                ...patientInput,
                                                mother_medical_history:
                                                  filtered,
                                              });
                                            }
                                          }}
                                          value={
                                            nullParser(item.title)
                                              ? item.title
                                              : ""
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          for="severity_0"
                                        >
                                          {nullParser(item.title)
                                            ? item.title
                                            : ""}
                                        </label>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <input
                          className="btn float-end btn-sm btn-primary"
                          type="submit"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className={`tab-pane fade ${
                    familyOrSocialTab ? "show active" : ""
                  }`}
                  id="pills-social-gd"
                  role="tabpanel"
                  aria-labelledby="pills-social-tab-gd"
                >
                  <div className="custom-card mb-2">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
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
                          onClick={() => {
                            setSubTabId("alcohol");
                          }}
                        >
                          Alcohol
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                          onClick={() => {
                            setSubTabId("tobacco");
                          }}
                        >
                          Tobacco
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                          onClick={() => {
                            setSubTabId("occupation");
                          }}
                        >
                          Occupation
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-paediatric-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-paediatric"
                          type="button"
                          role="tab"
                          aria-controls="pills-paediatric"
                          aria-selected="false"
                          onClick={() => {
                            setSubTabId("paediatric");
                          }}
                        >
                          Paediatric
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className={`tab-pane fade ${
                        subTabId === "alcohol" ? "show active" : ""
                      }`}
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <form onSubmit={updatePatientFamily} className="mb-3">
                        <div className="card p-3">
                          <div className="mb-3">
                            <label className="form-check-label col-form-label col-form-label-sm">
                              Current Alcohol Consumption :
                            </label>
                            <input
                              className="form-check-input check-box"
                              type="checkbox"
                              name="is_drinker"
                              onChange={handleCheckbox}
                              defaultChecked={
                                allcheckbox.is_drinker === "Yes" ? true : false
                              }
                            />
                            <label className="form-check-label col-form-label col-form-label-sm ml-5">
                              Non Drinker
                            </label>
                          </div>

                          <div className="row">
                            <div className="col-6 mb-3">
                              <label className="form-label col-form-label col-form-label-sm">
                                Day per week
                              </label>
                              <input
                                type="text"
                                className="form-control from-control-sm"
                                name="days_per_week"
                                onChange={handleInput}
                                value={
                                  nullParser(patientInput.days_per_week)
                                    ? patientInput.days_per_week
                                    : ""
                                }
                              />
                            </div>
                            <div className="col-6 mb-3">
                              <label className="form-label col-form-label col-form-label-sm">
                                Standard drinks per day
                              </label>
                              <input
                                type="text"
                                className="form-control from-control-sm"
                                name="standard_drinks_per_day"
                                onChange={handleInput}
                                value={
                                  nullParser(
                                    patientInput?.standard_drinks_per_day
                                  )
                                    ? patientInput.standard_drinks_per_day
                                    : ""
                                }
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-6 mb-3">
                              <label className="form-check-label col-form-label col-form-label-sm">
                                Past Alcohol Consumption:
                              </label>

                              <select
                                className="form-select form-select-sm"
                                aria-label=""
                                name="occupation_id"
                                value={
                                  nullParser(patientInput.occupation_id)
                                    ? patientInput.occupation_id
                                    : ""
                                }
                                onChange={handleInput}
                              >
                                <option>Select</option>
                                {pastalcconsumption.map((item) => {
                                  return (
                                    <option value={item.id} key={item.id}>
                                      {item.alcohol_consumption_name}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                            <div className="col-6 mb-3 ">
                              <label className="form-label col-form-label col-form-label-sm">
                                Year Started
                              </label>
                              <div className="w-100">
                                <DatePicker
                                  selected={
                                    isValidDate(patientInput?.year_started)
                                      ? new Date(patientInput.year_started)
                                      : new Date()
                                  }
                                  onChange={(value) => {
                                    setPatient({
                                      ...patientInput,
                                      year_started: value,
                                    });
                                  }}
                                  showYearPicker
                                  dateFormat="yyyy"
                                  yearItemNumber={6}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-6 mb-3">
                              <label className="form-label col-form-label col-form-label-sm">
                                Year Stopped
                              </label>
                              <DatePicker
                                selected={
                                  isValidDate(patientInput?.year_stopped)
                                    ? new Date(patientInput.year_stopped)
                                    : new Date()
                                }
                                onChange={(value) => {
                                  setPatient({
                                    ...patientInput,
                                    year_stopped: value,
                                  });
                                }}
                                showYearPicker
                                dateFormat="yyyy"
                                yearItemNumber={6}
                              />
                            </div>
                            <div className="col-6 mb-3">
                              <label className="form-label col-form-label col-form-label-sm">
                                Comments
                              </label>
                              <textarea
                                className="form-control  from-control-sm"
                                rows="3"
                                name="comments"
                                onChange={handleInput}
                                value={
                                  nullParser(patientInput.comments)
                                    ? patientInput.comments
                                    : ""
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div>
                            <div className="d-flex justify-content-end">
                              <Button>Submit</Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        subTabId === "occupation" ? "show active" : ""
                      }`}
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <form onSubmit={updatePatientFamily} className="mb-3">
                        <div className="card p-2">
                          {/* <h5 className="card-header">Occupation</h5> */}
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6 mb-3">
                                <label className="form-label col-form-label col-form-label-sm">
                                  Occupation
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="occupation_id"
                                  onChange={handleInput}
                                  value={patientInput.occupation_id}
                                >
                                  <option>Select</option>
                                  {occupationlist.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.occupation_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-6 mb-3">
                                <label className="form-label col-form-label col-form-label-sm">
                                  Details
                                </label>
                                <input
                                  type="text"
                                  className="form-control  from-control-sm"
                                  name="occupation_details"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.occupation_details)
                                      ? patientInput.occupation_details
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6 mb-3">
                                <label className="form-label col-form-label col-form-label-sm">
                                  Employee
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="employee_id"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.employee_id)
                                      ? patientInput.employee_id
                                      : ""
                                  }
                                >
                                  <option selected>Select</option>
                                  {doctorslist.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.fullName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-6 mb-3">
                                <label className="form-label col-form-label col-form-label-sm">
                                  Year Commenced
                                </label>
                                <input
                                  type="text"
                                  className="form-control  from-control-sm"
                                  name="year_commented"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput?.year_commented)
                                      ? patientInput.year_commented
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6 mb-3">
                                <label className="form-label col-form-label col-form-label-sm">
                                  Year Ceased
                                </label>
                                <input
                                  type="text"
                                  className="form-control from-control-sm"
                                  name="year_ceased"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput?.year_ceased)
                                      ? patientInput.year_ceased
                                      : ""
                                  }
                                />
                              </div>
                              <div className="col-6 mb-3">
                                <label className="form-check-label col-form-label col-form-label-sm">
                                  Occupational Hazards/Exposer:
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="occupation_id"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.occupation_id)
                                      ? patientInput.occupation_id
                                      : ""
                                  }
                                >
                                  <option>Select</option>
                                  {occupationalhazards.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.occupational_hazards_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>

                            <div className="mb-3">
                              <label className="form-label col-form-label col-form-label-sm">
                                Extra Details
                              </label>
                              <textarea
                                className="form-control"
                                rows="3"
                                name="extra_details"
                                onChange={handleInput}
                                value={
                                  nullParser(patientInput.extra_details)
                                    ? patientInput.extra_details
                                    : ""
                                }
                              ></textarea>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <Button isDisabled={false} isLoading={false}>
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        subTabId === "tobacco" ? "show active" : ""
                      }`}
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                    >
                      <form onSubmit={updatePatientFamily} className="mb-3">
                        <div className="card p-2">
                          {/* <h5 className="card-header">Tobacco</h5> */}
                          <div className="card-body">
                            <div className="row">
                              <div className=" col-6 mb-1">
                                <label className="form-check-label col-form-label col-form-label-sm">
                                  Current Smoking History:
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="occupation_id"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.occupation_id)
                                      ? patientInput.occupation_id
                                      : ""
                                  }
                                >
                                  <option>Select</option>
                                  {currentsmokinghistory.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.current_smoking_histories_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-6 mb-1 ">
                                <div>
                                  <label className="form-label col-form-label col-form-label-sm">
                                    {" "}
                                    Date Started{" "}
                                  </label>
                                </div>
                                {/* <div className="w-100"> */}
                                <DatePicker
                                  selected={
                                    isValidDate(patientInput?.date_started)
                                      ? new Date(patientInput.date_started)
                                      : new Date()
                                  }
                                  onChange={(value) => {
                                    setPatient({
                                      ...patientInput,
                                      date_started: value,
                                    });
                                  }}
                                  dateFormat="dd/MM/yyyy"
                                />
                                {/* </div> */}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6 mb-1">
                                <label className="form-check-label col-form-label col-form-label-sm">
                                  Type:
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="occupation_id"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.occupation_id)
                                      ? patientInput.occupation_id
                                      : ""
                                  }
                                >
                                  <option>Select</option>
                                  {tobaccotype.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.tobacco_types_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-6 mb-1">
                                <div>
                                  <label className="form-label col-form-label col-form-label-sm">
                                    {" "}
                                    Year Started{" "}
                                  </label>
                                </div>
                                <div>
                                  <DatePicker
                                    selected={
                                      isValidDate(
                                        patientInput?.tobacco_year_started
                                      )
                                        ? new Date(
                                            patientInput.tobacco_year_started
                                          )
                                        : new Date()
                                    }
                                    // selected={
                                    //   patientInput?.tobacco_year_started ||
                                    //   new Date()
                                    // }
                                    onChange={(value) => {
                                      setPatient({
                                        ...patientInput,
                                        tobacco_year_started: value,
                                      });
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    yearItemNumber={6}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row my-2">
                              <div className="col-6 mb-3">
                                <div>
                                  <label className="form-label col-form-label col-form-label-sm">
                                    Year Stopped
                                  </label>
                                </div>
                                <DatePicker
                                  // selected={
                                  //   patientInput.tobacco_year_stopped ||
                                  //   new Date()
                                  // }
                                  selected={
                                    isValidDate(
                                      patientInput?.tobacco_year_stopped
                                    )
                                      ? new Date(
                                          patientInput.tobacco_year_stopped
                                        )
                                      : new Date()
                                  }
                                  onChange={(value) => {
                                    setPatient({
                                      ...patientInput,
                                      tobacco_year_stopped: value,
                                    });
                                  }}
                                  showYearPicker
                                  dateFormat="yyyy"
                                  yearItemNumber={6}
                                />
                              </div>
                              <div className="col-6 d-flex align-items-start">
                                <div style={{ marginBottom: "-7px" }}>
                                  <label
                                    className="form-check-label col-form-label col-form-label-sm"
                                    for="flexRadioDefault1"
                                  >
                                    Eat Fresho Leaf and Beatle Nuts :
                                  </label>
                                  <input
                                    className="form-check-input ml-2"
                                    type="checkbox"
                                    name="is_fresho_leaf"
                                    onChange={handleInput}
                                    value={
                                      nullParser(patientInput.is_fresho_leaf)
                                        ? patientInput.is_fresho_leaf
                                        : ""
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6 mb-3">
                                <label className="form-check-label col-form-label col-form-label-sm">
                                  Amount (Per Day):
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="occupation_id"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.occupation_id)
                                      ? patientInput.occupation_id
                                      : ""
                                  }
                                >
                                  <option>Select</option>
                                  {tobaccoamountcost.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.tobacco_cost_amounts_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="col-6 d-flex align-items-center">
                                <div style={{ marginBottom: "-7px" }}>
                                  <label className="form-label col-form-label col-form-label-sm">
                                    Patient would like cessation advice/support:
                                  </label>
                                  <input
                                    className="form-check-input ml-2"
                                    type="checkbox"
                                    name="is_cessation_advice"
                                    onChange={handleInput}
                                    value={
                                      nullParser(
                                        patientInput.is_cessation_advice
                                      )
                                        ? patientInput.is_cessation_advice
                                        : ""
                                    }
                                  />
                                  {/* <label className="form-label col-form-label col-form-label-sm ml-5">
                        Yes
                      </label> */}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className=" col-6 mb-3">
                                <label className="form-check-label col-form-label col-form-label-sm">
                                  Advice and Suggestion:
                                </label>
                                <select
                                  className="form-select form-select-sm"
                                  aria-label=""
                                  name="occupation_id"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.occupation_id)
                                      ? patientInput.occupation_id
                                      : ""
                                  }
                                >
                                  <option>Select</option>
                                  {advicesuggestion.map((item) => {
                                    return (
                                      <option value={item.id} key={item.id}>
                                        {item.advice_suggestions_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className=" col-6 mb-3">
                                <label className="form-label col-form-label col-form-label-sm">
                                  Comments
                                </label>
                                <textarea
                                  className="form-control"
                                  rows="3"
                                  name="comments_tobacco"
                                  onChange={handleInput}
                                  value={
                                    nullParser(patientInput.comments_tobacco)
                                      ? patientInput.comments_tobacco
                                      : ""
                                  }
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="d-flex justify-content-end">
                              <Button>Submit</Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className={`tab-pane fade ${
                        subTabId === "paediatric" ? "show active" : ""
                      }`}
                      id="pills-paediatric"
                      role="tabpanel"
                      aria-labelledby="pills-paediatric-tab"
                    >
                      <div className="card">
                        <div className="card-body">
                          <PaediatricExamMain patient_id={props.patient_id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
