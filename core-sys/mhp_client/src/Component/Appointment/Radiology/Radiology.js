import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import "../Radiology/Radiology.css";
import Select from "react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaTrash } from "react-icons/fa";
import { MdIndeterminateCheckBox } from "react-icons/md";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  LiaCompressArrowsAltSolid,
  LiaExpandArrowsAltSolid,
} from "react-icons/lia";
import { nullParser } from "../../../utils/null-parser";
import Button from "../../../common/components/Button";
import useUserData from "../../../hooks/useUserData";
import { formatPhoneNumber, formateHN } from "../../../utils/numberHelper";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const emptyEmailActions = {
  emailToLab: null,
  emailToPatient: null,
  sendToDigiPatient: null,
};

const Radiology = (props) => {
  toast.configure();
  // const [allRadiologyCenter, setAllRadiologyCenter] = useState([]);
  const [allTestName, setAllTestName] = useState([]);
  // const [allTestType, setAllTestType] = useState([]);
  const [patient, setPatient] = useState("");
  const [allClinicalIndication, setAllClinicalIndication] = useState([]);
  const [centerDate, setCenterDate] = React.useState(null);
  const [testDate, setTestDate] = React.useState(null);
  const [radiologyCenterId, setRadiologyCenterId] = React.useState("");
  const [allTestId, setAllTestId] = React.useState("");
  const [clinicalIndicationsId, setClinicalIndicationsId] = React.useState("");
  const [submitted, setSubmitted] = useState(false);
  const [maleOrFemale, setMaleOrFemale] = useState("");
  const [emailActionTypes, setEmailActionTypes] = useState({
    ...emptyEmailActions,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const [checkboxValue, setCheckboxValue] = useState({
    symptoms: [],
  });

  const [additional_test_name, setAdditionalTestName] = useState("");
  const [testTypeId, setTestTypeId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const organizationName =
    JSON.parse(localStorage.getItem("userData"))?.organization_name || "";
  const user = useUserData();

  const [testGroup, setTestGroup] = useState(null);
  const [testCategories, setTestCategories] = useState([]);
  const [radiologyCenters, setRadiologyCenters] = useState([]);
  const [selectedRadiology, setSelectedRadiology] = useState(null);
  const [isPastHistory, setIsPastHistory] = useState(false);
  const [pastHistoryData, setPastHistoryData] = useState([]);
  const [testList, setTestList] = useState([]);
  const [inputSearchTestName, setInputSearchTestName] = useState(null);

  useEffect(() => {
    axios.get("new-test-group").then((res) => {
      if (res.data?.status === 200) {
        const findTestGroup = res?.data?.test_group?.find(
          (test) => test?.test_group_name === "Radiology"
        );
        setTestGroup(findTestGroup);
      }
    });
    axios.get(`/test-name-radiology`).then((res) => {
      if (res.data.status === 200) {
        setTestList(res?.data?.test_name);
      }
    });
  }, []);

  // get Categories
  useEffect(() => {
    if (testGroup?.id) {
      axios.get(`/get-labratory-name`).then((res) => {
        if (res.data.status === 200) {
          const modifiedData = res.data?.all_labratory?.map((item) => ({
            ...item,
            value: item.id,
            label: item.labratory_name,
          }));
          setRadiologyCenters(modifiedData);
        }
      });
      axios.get(`/new-test-categories-by-id/${testGroup.id}`).then((res) => {
        if (res?.data.status === 200) {
          const modifiedData = res?.data.all_cat.map((item) => {
            return {
              ...item,
              label: item?.test_category_name,
              value: item?.id,
            };
          });
          setTestCategories(modifiedData);
        }
      });
    }
  }, [testGroup?.id]);

  const handleAdditionalTestNameChange = (e) => {
    setAdditionalTestName(e.target.value);
  };

  const patientId = props?.patient_id;
  //all radiology data get
  const [allRadiology, setAllRadiology] = useState([]);
  useEffect(() => {
    const abort = new AbortController();
    if (patientId) {
      axios.get(`/radiology/${patientId}`).then((res) => {
        if (res.data.status === 200) {
          setAllRadiology(res.data.all_radiology);
        }
      });
    }
    return () => {
      abort.abort();
    };
  }, [submitted, patientId]);
  useEffect(() => {
    if (patientId) {
      axios
        .get("radiology/past-history-test-report/" + patientId)
        .then((res) => {
          if (res.status === 200) {
            setPastHistoryData(res.data);
          }
        });
    }
  }, [patientId]);

  const handleCheckboxChange = (e) => {
    const { symptoms } = checkboxValue;
    if (e.target.checked) {
      setCheckboxValue({
        symptoms: [...symptoms, e.target.value],
      });
    } else {
      setCheckboxValue({
        symptoms: symptoms.filter((item) => item !== e.target.value),
      });
    }
  };

  useEffect(() => {
    axios.get(`/clinical-indications`).then((res) => {
      if (res.data.status === 200) {
        const modifiedData = res?.data?.clinical_indications?.map((item) => ({
          ...item,
          label: item.clinical_indications_name,
          value: item.id,
        }));
        setAllClinicalIndication(modifiedData);
      }
    });
    axios.get(`/edit-patients/${patientId}`).then((res) => {
      setPatient(res.data.patient);
      if (res.data.patient.patient_birth_sex.birth_sex_name.match(/Female.*/)) {
        setMaleOrFemale("female");
      } else {
        setMaleOrFemale("");
      }
    });
  }, [patientId]);

  const [doctorData, setDoctorData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData.user_id) {
      axios
        .get(`/doctorProfile/${userData.user_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setDoctorData(res.data.doctors);
        });
    }

    return () => {
      controller.abort();
    };
  }, [patientId]);

  const refetch = () => setSubmitted(!submitted);

  const submitRadiology = async (e) => {
    try {
      e.preventDefault();
      const currentDate = moment();
      const radiology = {
        center_id: radiologyCenterId,

        center_date: centerDate ? centerDate : currentDate,
        test_name_id: selectedTest?.id,
        clinical_id: clinicalIndicationsId,
        radiology_test_name: selectedTest?.test_name,
        radiology_test_category: selectedCategory?.test_category_name,
        test_type_id: testTypeId,
        additional_test_name: additional_test_name,
        sendToDigiPatient: emailActionTypes.sendToDigiPatient,
        emailToLab: emailActionTypes.emailToLab,
        emailToPatient: emailActionTypes.emailToPatient,
        patient_id: props.patient_id,
      };
      if (testDate) {
        radiology.test_date = testDate;
      }
      if (checkboxValue.symptoms.length > 0) {
        radiology.symptom_name = checkboxValue.symptoms;
      }
      if (!radiology.center_date) {
        toast.error("Please Select Test Date");
        return;
      }

      if (!radiology.radiology_test_name) {
        toast.error("Please Select Test Name");
        return;
      }

      if (!radiology.center_id) {
        toast.error("Please Select Center Name");
        return;
      }
      const isExistsTestName = allRadiology.find(
        (item) => Number(item?.test_name_id) === Number(radiology?.test_name_id)
      );
      if (isExistsTestName) {
        toast.error("Test Name Already Exists");
        return;
      }

      setBtnLoading(true);
      const response = await axios.post(`/save-radiology`, radiology);
      if (response.status === 200) {
        toast.success("Radiology added successfully");
        refetch();
        setInputSearchTestName(null);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  const checkBoxRef = useRef();

  const handleDelete = (e, check_id) => {
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
        axios.delete(`/delete-radiology/${check_id}`).then((res) => {
          console.log(res, "delete Res");
          if (res.status === 200) {
            refetch();
          }
        });

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChangeRadiologyCenter = (center) => {
    if (center) {
      setSelectedRadiology(center);
      setRadiologyCenterId(center.value);
    } else {
      setSelectedRadiology(null);
      setRadiologyCenterId(null);
    }
  };

  const [testNameLoading, setTestNameLoading] = useState(false);

  const handleChangeCategory = async (category) => {
    if (category) {
      try {
        setTestNameLoading(true);
        setSelectedTest(null);
        setSelectedCategory(category);
        setAllTestId(category.id);

        if (category.id) {
          const response = await axios.get(
            `new-test-name-by-id/${category.id}`
          );

          if (response.data.status === 200) {
            const modifiedData = response.data.all_name.map((item) => ({
              ...item,
              label: item.test_name,
              value: item.id,
            }));
            setAllTestName(modifiedData);
          } else {
            setAllTestName([]);
            setSelectedTest(null);
          }
        } else {
          setAllTestName([]);
          setSelectedTest(null);
        }
      } catch (error) {
        console.error(error);
        setAllTestName([]);
        setSelectedTest(null);
      } finally {
        setTestNameLoading(false);
      }
    } else {
      setSelectedCategory(null);
      setSelectedTest(null);
      setAllTestId(null);
      setAllTestName([]);
    }
  };

  const handleChangeTestName = (test) => {
    if (test) {
      setSelectedTest(test);
      setTestTypeId(test.id);
    } else {
      setSelectedTest(null);
      setTestTypeId(null);
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckBox = (e, item) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    }
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(allRadiology);
    } else {
      setSelectedItems([]);
    }
  };

  console.log(props?.patient, "patient-value");
  const [sendBtnLoading, setSendBtnLoading] = useState(false);

  const handleSendEmail = async () => {
    setSendBtnLoading(true);
    try {
      if (!selectedItems.length) {
        toast.error("Please select radiology test");
        return;
      }
      if (emailActionTypes.emailToPatient || emailActionTypes.emailToLab) {
        const response = await axios.post(`/radiology-pdf-send`, {
          id: props.patient_id,
          patientName: props.patient?.fullName,
          doctorName: `${
            nullParser(doctorData?.title?.title_name)
              ? doctorData?.title?.title_name
              : ""
          } ${nullParser(doctorData?.fullName) ? doctorData?.fullName : ""}`,
          patient_gender: props?.patient?.patient_birth_sex?.birth_sex_name,
          patient_birth: props?.patient?.patient_dob,
          patient_mobile: props?.patient?.patient_mobile_phone,
          patient_email: props?.patient?.patient_email,
          radiologies: selectedItems,
          branch_code: user?.isSuperAdmin ? "" : user?.branch_code,
          patient_hn: props?.patient?.patient_hn_number,
          organization_name: organizationName,
          doctor_id: doctorData.dr_identity_no,
          email_to_lab: emailActionTypes.emailToLab ? 1 : 0,
        });

        console.log(response, "res::");
        if (response.status === 200) {
          toast.success("Email sent successfully");
        }
      } else {
        toast.success("send radiology test successfully");
      }
    } catch (error) {
      console.log(error, "pdf error");
      toast.error("Something went wrong");
    } finally {
      setSendBtnLoading(false);
    }
  };

  const [selectedClinicalIndication, setSelectedClinicalIndication] =
    useState(null);
  const handleChangClinicalIndication = (clinic) => {
    if (clinic) {
      setSelectedClinicalIndication(clinic);
      setClinicalIndicationsId(clinic.value);
    } else {
      setSelectedClinicalIndication(null);
      setClinicalIndicationsId(null);
    }
  };

  const handleChangeGlobalSearchTestName = (test) => {
    if (test) {
      setSelectedTest(test);
      setSelectedCategory(test?.category);
      setTestTypeId(test.id);
    } else {
      setSelectedTest(null);
      setTestTypeId(null);
    }
  };

  return (
    <>
      <div className="row my-1 d-flex">
        <div className="col-12">
          <div className="p-1 mb-1  row">
            <div className=" col-12 row d-flex justify-content-center mb-3">
              <div className="col-6">
                <ReactSearchAutocomplete
                  showIcon={true}
                  placeholder={"Search test name"}
                  items={testList}
                  resultStringKeyName="test_name"
                  inputSearchString={inputSearchTestName || ""}
                  onSearch={(value) => setInputSearchTestName(value)}
                  onSelect={(item) => {
                    handleChangeGlobalSearchTestName(item);
                  }}
                  maxResults={5}
                  fuseOptions={{ keys: ["test_name"] }}
                  styling={{
                    borderRadius: "10px !important",
                    width: "100%",
                    zIndex: 999,
                    boxShadow: "none !important",
                  }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-5">
                  <div className="form-group   fw-bold">Laboratory:</div>
                </div>
                <div className="col-7">
                  <Select
                    options={radiologyCenters}
                    isClearable
                    isLoading={radiologyCenters.length === 0}
                    isDisabled={radiologyCenters.length === 0}
                    value={selectedRadiology}
                    onChange={handleChangeRadiologyCenter}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-5">
                  <div className="fw-bold">Test Category:</div>
                </div>
                <div className="col-7">
                  <Select
                    options={testCategories}
                    value={selectedCategory}
                    getOptionLabel={(option) => option?.test_category_name}
                    getOptionValue={(option) => option?.id}
                    onChange={handleChangeCategory}
                    isLoading={testCategories.length === 0}
                    isDisabled={testCategories.length === 0}
                    isClearable
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-5">
                  <div className=" fw-bold">Test Name:</div>
                </div>
                <div className="col-7">
                  <div>
                    <Select
                      isClearable
                      options={
                        allTestName ||
                        testList.filter(
                          (item) =>
                            Number(item?.category?.id) ===
                            Number(selectedCategory?.id)
                        ) ||
                        []
                      }
                      getOptionLabel={(option) => option?.test_name}
                      getOptionValue={(option) => option?.id}
                      onChange={handleChangeTestName}
                      value={selectedTest}
                      isLoading={testNameLoading}
                    />
                  </div>
                </div>
              </div>
              {patient.patient_birth_sex_id !== null &&
                maleOrFemale === "female" && (
                  <div className="">
                    <div className="row" style={{ marginTop: "20px" }}>
                      <div class="form-check col-3">
                        <input
                          // class="form-check-input checkbox"
                          type="checkbox"
                          value="right"
                          onChange={handleCheckboxChange}
                          id="right"
                        />
                        <b className="mx-2" for="right">
                          <label htmlFor="right">Right</label>
                        </b>
                      </div>
                      <div class="form-check col-3">
                        <input
                          // class="form-check-input checkbox"
                          type="checkbox"
                          value="left"
                          onChange={handleCheckboxChange}
                          id="left"
                        />
                        <b className="mx-2">
                          <label htmlFor="left">Left</label>
                        </b>
                      </div>
                      <div class="form-check col-6">
                        <input
                          // class="form-check-input checkbox"
                          type="checkbox"
                          value="pregnant"
                          onChange={handleCheckboxChange}
                          id="pregnant"
                        />
                        <b className="mx-2">
                          <label htmlFor="pregnant">Pregnant</label>
                        </b>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="col-6">
              <div className="row mb-2">
                <div className="col-5">
                  <div className=" mt-2 fw-bold">Date:</div>
                </div>
                <div className="col-7">
                  <div
                    className="border rounded"
                    style={{
                      backgroundColor: "#f2f2f2",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        padding: "7px",
                      }}
                    >
                      {new moment(new Date()).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-5 d-flex align-items-center">
                  {maleOrFemale === "female" && (
                    <div className=" d-flex align-items-center">
                      <label htmlFor="lmp" className="fw-bold mb-0">
                        LMP Date:
                      </label>
                    </div>
                  )}
                </div>
                <div className="col-7">
                  {patient.patient_birth_sex_id !== null &&
                    maleOrFemale === "female" && (
                      <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            format="DD/MM/YYYY"
                            label="LMP Date"
                            sx={{ width: "100%" }}
                            value={testDate}
                            onChange={(value) => setTestDate(value)}
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </LocalizationProvider>
                      </div>
                    )}
                </div>
              </div>
              <div className="row ">
                <div className="col-5">
                  <div className="mt-2 fw-bold">Clinical Indictions:</div>
                </div>
                <div className="col-7">
                  <Select
                    options={allClinicalIndication}
                    onChange={handleChangClinicalIndication}
                    value={selectedClinicalIndication}
                    isLoading={allClinicalIndication.length === 0}
                    isDisabled={allClinicalIndication.length === 0}
                    isClearable
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <div className="form-group fw-bold">Notes :</div>
                </div>
                <div className="col-7">
                  <div className="mt-2">
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="additional_test_name"
                      value={additional_test_name}
                      onChange={handleAdditionalTestNameChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <button
                className="buttonStyle float-end my-2"
                disabled={btnLoading}
                onClick={submitRadiology}
              >
                {btnLoading ? "Loading..." : "Add To List"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div class="row shadow-sm p-1 bg-body rounded">
            <div
              class="table-responsive-sm g-doc-scroll"
              style={{ maxHeight: "350px", overflowX: "auto" }}
            >
              <table class="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>
                      <div
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        {allRadiology.length > 0 && (
                          <>
                            <input
                              type="checkbox"
                              id="radiology-all-select"
                              checked={
                                allRadiology.length === selectedItems.length
                              }
                              style={{
                                margin: "3px 2px",
                                cursor: "pointer",
                                display:
                                  allRadiology.length ===
                                    selectedItems.length ||
                                  selectedItems.length === 0
                                    ? "block"
                                    : "none",
                              }}
                              onChange={handleSelectAll}
                            />
                            {allRadiology.length === selectedItems.length ||
                            selectedItems.length === 0 ? (
                              ""
                            ) : (
                              <label
                                className="m-0 p-0"
                                onClick={handleSelectAll}
                                style={{
                                  cursor: "pointer",
                                }}
                                htmlFor="radiology-all-select"
                              >
                                <MdIndeterminateCheckBox
                                  size={17}
                                  style={{ margin: "0", padding: "0" }}
                                  color="#005CC8"
                                />
                              </label>
                            )}
                          </>
                        )}
                      </div>
                    </th>
                    <th>Date</th>
                    <th>Test Category</th>
                    <th>Test Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allRadiology?.length > 0 ? (
                    allRadiology?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <input
                              style={{
                                cursor: "pointer",
                              }}
                              checked={
                                selectedItems.find(
                                  (selectedItem) => selectedItem.id === item.id
                                )
                                  ? true
                                  : false
                              }
                              ref={checkBoxRef}
                              onChange={(e) => handleCheckBox(e, item)}
                              type="checkbox"
                              id="data-check"
                            />
                          </td>
                          {/* <th scope="row">{i + 1}</th> */}
                          <td>
                            {moment(item?.center_date)?.format("DD/MM/YYYY")}
                          </td>
                          <td>{item?.radiology_test_category}</td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.radiology_test_name}
                          </td>
                          {/* <td>{item?.clinical_indications_name}</td> */}
                          <td>
                            <FaTrash
                              color="red"
                              style={{ cursor: "pointer" }}
                              size={15}
                              onClick={(e) => {
                                handleDelete(e, item?.id);
                              }}
                            ></FaTrash>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-2 align-items-center">
        <button
          style={{
            all: "unset",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
            color: isPastHistory ? "#69B128" : "gray",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "10px 0",
            border: "2px solid #69B128",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
          onClick={() => setIsPastHistory((prev) => !prev)}
        >
          <span> {isPastHistory ? "Less" : "Show"} Past History</span>
          {isPastHistory ? (
            <LiaCompressArrowsAltSolid strokeWidth={1.5} />
          ) : (
            <LiaExpandArrowsAltSolid strokeWidth={1.5} />
          )}
        </button>
        {selectedItems.length > 0 && (
          <div className="d-flex align-items-center flex-grow-1 justify-content-end">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "22px",
              }}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEmailActionTypes((prev) => ({
                        ...prev,
                        emailToPatient: true,
                      }));
                    } else {
                      setEmailActionTypes((prev) => ({
                        ...prev,
                        emailToPatient: null,
                      }));
                    }
                  }}
                  id="email-to-patient"
                />
                <label className="my-0 ms-1 p-0" htmlFor="email-to-patient">
                  Email to patient
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEmailActionTypes((prev) => ({
                        ...prev,
                        sendToDigiPatient: true,
                      }));
                    } else {
                      setEmailActionTypes((prev) => ({
                        ...prev,
                        sendToDigiPatient: null,
                      }));
                    }
                  }}
                  id="send-to-digi-patient"
                />
                <label htmlFor="send-to-digi-patient" className="my-0 ms-1 p-0">
                  Send to digi patient
                </label>
              </div>
              <div className="form-check me-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="email-to-lab"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEmailActionTypes((prev) => ({
                        ...prev,
                        emailToLab: true,
                      }));
                    } else {
                      setEmailActionTypes((prev) => ({
                        ...prev,
                        emailToLab: null,
                      }));
                    }
                  }}
                />
                <label className="my-0 ms-1 p-0" htmlFor="email-to-lab">
                  Email to lab
                </label>
              </div>
            </div>

            {/* <button className="btn me-2 flot-end">Email To Patient</button>
              <button className="btn me-2 flot-end">Email To Lab</button> */}
            <div className="rx-one-button-group">
              {emailActionTypes.emailToPatient ||
              emailActionTypes.sendToDigiPatient ||
              emailActionTypes.emailToLab ? (
                <Button
                  className=" me-2"
                  isLoading={sendBtnLoading}
                  disabled={sendBtnLoading}
                  onClick={handleSendEmail}
                >
                  Send
                </Button>
              ) : null}
            </div>
            {/* <div className="rx-one-button-group"> */}
            <Button className=" me-2 " onClick={handlePrint}>
              Print
            </Button>
            {/* </div> */}
          </div>
        )}
      </div>

      {/* past History Table  */}
      {isPastHistory ? (
        <div className="col-12">
          <div class="row shadow-sm p-1 bg-body rounded">
            <div
              class="table-responsive-sm g-doc-scroll"
              style={{ maxHeight: "350px", overflowX: "auto" }}
            >
              <table class="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>#SL</th>
                    <th>Date</th>
                    <th>Test Category</th>
                    <th>Test Name</th>
                    <th>Clinic</th>
                  </tr>
                </thead>
                <tbody>
                  {pastHistoryData?.length > 0 ? (
                    pastHistoryData?.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{i + 1}</th>
                          <td>
                            {moment(item?.center_date)?.format("DD/MM/YYYY")}
                          </td>
                          <td>{item?.radiology_test_category}</td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.radiology_test_name}
                          </td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.clinical_indications_name}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {/* <div className="radiology_print">
        <table class="table">
          <caption>Radiology Request Print Copy</caption>
          <thead className="thead-light">
            <tr>
              <th>#Sl</th>
              <th>Date</th>
              <th>Test Name</th>
              <th>Radiology Center</th>
              <th>LMP date</th>
              <th>Clinical Indications</th>
            </tr>
          </thead>
          <tbody>
            {allRadiology?.map((item, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {moment(item?.center_date).format("DD/MM/YYYY") ===
                    "Invalid date"
                      ? ""
                      : moment(item?.center_date).format("DD/MM/YYYY")}
                  </td>
                  <td>{item?.radiology_test_category}</td>
                  <td>{item?.radiology_test_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}

      {/* ================ print Code ================ */}

      <div className="printable">
        <div
          ref={componentRef}
          width="100%"
          style={{
            margin: "10px",
          }}
        >
          {/* header  */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              borderBottom: "1px solid #DEE2E6",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            {/* logo  */}

            <div>
              <img
                style={{ width: "100px", height: "100px" }}
                src={`${global.img_url}/labotory/${selectedItems[0]?.logo}`}
                alt="organization_logo"
              />
            </div>
            <div>
              <h6
                style={{
                  fontSize: "20px",
                  fontWeight: "semibold",
                  marginBottom: "2px",
                }}
              >
                {selectedItems[0]?.labratory_name}
              </h6>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Fax:</span>{" "}
                {selectedItems[0]?.fax}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Mobile:</span>{" "}
                {selectedItems[0]?.phone}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Address:</span>{" "}
                {selectedItems[0]?.address}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Website:</span>{" "}
                {selectedItems[0]?.websiteLink}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <h6
                style={{
                  fontSize: "20px",
                  fontWeight: "semibold",
                  marginBottom: "2px",
                }}
              >
                {props?.patient?.fullName}
              </h6>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontWeight: "500" }}>Mobile:</span>{" "}
                {formatPhoneNumber(props?.patient?.patient_mobile_phone)}
              </p>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontWeight: "500" }}>Gender:</span>{" "}
                {props?.patient?.patient_birth_sex?.birth_sex_name}
              </p>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontWeight: "500" }}>Date of Birth:</span>{" "}
                {moment(props?.patient?.patient_dob).format("DD/MM/yyyy") ===
                "Invalid date"
                  ? ""
                  : moment(props?.patient?.patient_dob).format("DD/MM/yyyy")}
              </p>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                }}
              >
                <span style={{ fontWeight: "500" }}>Date:</span>{" "}
                {moment(props?.patient?.center_date).format("DD/MM/yyyy") ===
                "Invalid date"
                  ? ""
                  : moment(props?.patient?.center_date).format("DD/MM/yyyy")}
              </p>
            </div>
          </div>
          {/* body  */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              gap: "10px",
              paddingBottom: "10px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                width: "73%",
                padding: "10px",
                borderRadius: "7px",
                border: "1px solid #DEE2E6",
              }}
            >
              <h6>Test Name</h6>
              <ol>
                {selectedItems?.map((item) => {
                  return (
                    <li
                      style={{
                        margin: "15px 0",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          padding: "0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {item?.radiology_test_name}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          padding: "7px",
                          borderRadius: "7px",
                          border: "1px solid #DEE2E6",
                          width: "100%",
                          fontSize: "12px",
                        }}
                      >
                        <span style={{ fontWeight: "500" }}>Note:</span>{" "}
                        {item?.additional_test_name
                          ? item?.additional_test_name
                          : "N/A"}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div style={{ width: "27%" }}>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #DEE2E6",
                  borderRadius: "7px",
                }}
              >
                <p
                  style={{
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Test Type:{" "}
                  {selectedItems[0]?.test_type_name
                    ? selectedItems[0]?.test_type_name
                    : "N/A"}
                </p>
                <p
                  style={{
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Symptom:{" "}
                  {selectedItems.map((sm) => (
                    <span>{sm?.symptom_name && `${sm?.symptom_name},`}</span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* footer */}
          <div
            style={{
              textAlign: "center",
              width: "170px",
              marginTop: "100px",
              borderTop: "1px solid #DEE2E6",
            }}
          >
            <h5 style={{ fontSize: "14px" }}>{`${
              nullParser(doctorData?.title?.title_name)
                ? doctorData?.title?.title_name
                : ""
            } ${
              nullParser(doctorData?.fullName) ? doctorData?.fullName : ""
            }`}</h5>
          </div>

          <p className="text-center mt-3">
            Please upload the report via following link{" "}
            <a href="https://externallab.macrohealthplus.org/" target="_blank">
              https://externallab.macrohealthplus.org/
            </a>
          </p>
          <div style={{ marginTop: "20px" }}>
            <div
              style={{
                padding: "10px",
                border: "1px solid #DEE2E6",
                borderRadius: "7px",
                width: "50%",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <div style={{ width: "25%" }}>Organization</div>
                <div style={{ width: "75%" }}>
                  : {organizationName}{" "}
                  {user?.isSuperAdmin ? "" : user?.branch_code}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <div style={{ width: "25%" }}>Doctor ID</div>
                <div style={{ width: "75%" }}>
                  : {doctorData?.dr_identity_no}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <div style={{ width: "25%" }}>Patient HN</div>
                <div style={{ width: "75%" }}>
                  : {formateHN(props?.patient?.patient_hn_number)}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px",
              border: "1px solid #DEE2E6",
              borderRadius: "7px",
              marginTop: "20px",
              fontSize: "14px",
            }}
          >
            Thank you for choosing our services. We are committed to providing
            you with the highest level of care and professionalism. If you have
            any questions or concerns, please do not hesitate to contact us.
            Your health and satisfaction are our top priorities.
          </div>
        </div>
      </div>
    </>
  );
};

export default Radiology;
