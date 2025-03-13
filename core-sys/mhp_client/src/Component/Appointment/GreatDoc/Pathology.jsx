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
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import { nullParser } from "../../../utils/null-parser";
import Button from "../../../common/components/Button";
import useUserData from "../../../hooks/useUserData";
import { formatPhoneNumber } from "react-phone-number-input";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
const organizationName =
  JSON.parse(localStorage.getItem("userData"))?.organization_name || "";

const emptyEmailActions = {
  emailToLab: null,
  emailToPatient: null,
  sendToDigiPatient: null,
};

const Pathology = (props) => {
  toast.configure();
  const [allTestName, setAllTestName] = useState([]);
  const [patient, setPatient] = useState("");
  const [allClinicalDetails, setAllClinicalDetails] = useState([]);
  const [centerDate, setCenterDate] = React.useState(null);
  const [lmpDate, setLmpDate] = useState(null);
  const [edcDate, setEdcDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [maleOrFemale, setMaleOrFemale] = useState("");
  const [emailActionTypes, setEmailActionTypes] = useState({
    ...emptyEmailActions,
  });
  const [btnLoading, setBtnLoading] = useState(false);
  const [additional_test_name, setAdditionalTestName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const [testGroup, setTestGroup] = useState(null);
  const [testCategories, setTestCategories] = useState([]);
  const [pathologyCenters, setPathologyCenters] = useState([]);
  const [selectedPathologyCenter, setSelectedPathologyCenter] = useState(null);
  const [fasting, setFasting] = useState(null);
  const [billing, setBilling] = useState(false);
  const [concession, setConcession] = useState(null);
  const [isPastHistory, setIsPastHistory] = useState(false);
  const [pastHistoryData, setPastHistoryData] = useState([]);
  const [testList, setTestList] = useState([]);
  const [inputSearchTestName, setInputSearchTestName] = useState(null);
  const user = useUserData();
  // const { width } = useResizeObserver();

  const [pregnant, setPregnant] = useState(null);

  useEffect(() => {
    axios.get("new-test-group").then((res) => {
      if (res.data?.status === 200) {
        const findTestGroup = res?.data?.test_group?.find(
          (test) => test?.test_group_name === "Pathology"
        );
        setTestGroup(findTestGroup);
      }
    });
    axios.get(`/test-name-pathology`).then((res) => {
      if (res.data.status === 200) {
        setTestList(res.data.test_name);
      }
    });
  }, []);

  useEffect(() => {
    if (props.patient_id) {
      axios
        .get("pathology-past-history-test-report/" + props.patient_id)
        .then((res) => {
          if (res.status === 200) {
            setPastHistoryData(res.data);
          }
        });
    }
  }, [props.patient_id]);

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
          setPathologyCenters(modifiedData);
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

  const [toDayPathologyData, setToDayPathologyData] = useState([]);
  const [doctorData, setDoctorData] = useState(null);
  useEffect(() => {
    axios.get(`/get-pathology-new/${props.patient_id}`).then((res) => {
      if (res.status === 200) {
        console.log("toDayPathologyData", res.data);
        setToDayPathologyData(res.data);
      }
    });
  }, [submitted, props.patient_id]);

  useEffect(() => {
    const controller = new AbortController();
    axios.get("clinical-details").then((res) => {
      console.log("clinical-details", res?.data?.clinical_details);
      if (res.data.status === 200) {
        const modifiedData = res?.data?.clinical_details?.map((item) => ({
          ...item,
          label: item.clinical_details_name,
          value: item.id,
        }));
        setAllClinicalDetails(modifiedData);
      }
    });
    axios.get(`/edit-patients/${props.patient_id}`).then((res) => {
      setPatient(res.data.patient);
      if (res.data.patient.patient_birth_sex.birth_sex_name.match(/Female.*/)) {
        setMaleOrFemale("female");
      } else {
        setMaleOrFemale("");
      }
    });

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
  }, [props?.patient_id]);

  const refetch = () => setSubmitted(!submitted);

  const handleSavePathology = async (e) => {
    try {
      e.preventDefault();
      const currentDate = moment();
      const pathologyData = {
        // center_id: radiologyCenterId,
        pathology_laboratory_name: selectedPathologyCenter?.label,
        laboratory_id: selectedPathologyCenter?.id,
        pathology_test_category: selectedCategory?.test_category_name,
        test_category_id: selectedCategory?.id,
        clinical_id: selectedClinicalDetails?.id,
        pathology_clinical_details_name: selectedClinicalDetails?.label,
        center_date: centerDate ? centerDate : currentDate,
        test_name_id: selectedTest?.id,
        pathology_test_name: selectedTest?.test_name,
        additional_test_name: additional_test_name,
        patient_id: props.patient_id,
      };
      if (lmpDate) {
        pathologyData.lmpDate = lmpDate;
      }
      if (edcDate) {
        pathologyData.edcDate = edcDate;
      }
      if (fasting) {
        pathologyData.fasting = fasting;
      }
      if (pregnant) {
        pathologyData.pregnant = pregnant;
      }

      if (billing) {
        pathologyData.billing_type = billing;
      }
      if (!pathologyData?.pathology_laboratory_name) {
        toast.error("Please Select Laboratory Name");
        return;
      }
      if (!pathologyData?.pathology_test_category) {
        toast.error("Please Select Test Category");
        return;
      }

      if (!pathologyData?.pathology_test_name) {
        toast.error("Please Select Test Name");
        return;
      }

      const isExistTestName = toDayPathologyData?.find(
        (item) =>
          Number(item?.test_name_id) === Number(pathologyData?.test_name_id)
      );
      if (isExistTestName) {
        toast.error("Test Name Already Exists");
        return;
      }

      setBtnLoading(true);
      const response = await axios.post(`/save-pathology-new`, pathologyData);
      if (response.status === 200) {
        toast.success("Pathology added successfully");
        e.target.reset();
        refetch();
        resetForm();
        setInputSearchTestName(null);
        // setSelectedTest(null);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedTest(null);
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
        axios.delete(`/delete-pathology-new/${check_id}`).then((res) => {
          if (res.data.status === 200) {
            refetch();
          }
        });

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => {
      const printableContent = componentRef.current;

      // Apply styles to the printable content
      printableContent.style.margin = "0";
      printableContent.style.padding = "0";

      return printableContent;
    },
  });

  const handleChangeRadiologyCenter = (center) => {
    if (center) {
      setSelectedPathologyCenter(center);
    } else {
      setSelectedPathologyCenter(null);
    }
  };

  const [testNameLoading, setTestNameLoading] = useState(false);

  const handleChangeCategory = async (category) => {
    if (category) {
      try {
        setTestNameLoading(true);
        setSelectedTest(null);
        setSelectedCategory(category);

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
      setAllTestName([]);
    }
  };

  const handleChangeTestName = (test) => {
    if (test) {
      setSelectedTest(test);
    } else {
      setSelectedTest(null);
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
  console.log(selectedItems, "selected");
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(toDayPathologyData);
    } else {
      setSelectedItems([]);
    }
  };
  const [sendBtnLoading, setSendBtnLoading] = useState(false);

  const handleSendEmail = async () => {
    setSendBtnLoading(true);
    try {
      if (!selectedItems.length) {
        toast.error("Please select radiology test");
        return;
      }

      if (emailActionTypes.emailToPatient || emailActionTypes.emailToLab) {
        const data = {
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
          patient_hn: props?.patient?.patient_hn_number,
          organization_name: organizationName,
          branch_code: user?.isSuperAdmin ? "" : user?.branch_name,
          doctor_id: doctorData.dr_identity_no,
          pathologies: selectedItems,
          email_to_lab: emailActionTypes.emailToLab ? 1 : 0,
        };
        const response = await axios.post(
          `/pathology-pdf-send-to-patient-email-new`,
          data
        );

        // console.log(response, "res::");
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

  const [selectedClinicalDetails, setSelectedClinicalDetails] = useState(null);
  const handleChangClinicalDetails = (clinic) => {
    if (clinic) {
      setSelectedClinicalDetails(clinic);
    } else {
      setSelectedClinicalDetails(null);
    }
  };

  console.log("patient-details", props?.patient);

  const handleChangeGlobalSearchTestName = (test) => {
    if (test) {
      setSelectedTest(test);
      setSelectedCategory(test?.category);
    } else {
      setSelectedTest(null);
    }
  };

  return (
    <>
      <div className="row d-flex">
        <div className="col-12">
          <form onSubmit={handleSavePathology}>
            <div className="p-1 mb-1 row">
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
                <div className="row mb-2">
                  <div className="col-4">
                    <div className="form-group m-0 d-flex align-items-center">
                      <label
                        htmlFor="laboratory"
                        className="from-label fw-bold mb-0"
                      >
                        Laboratory:
                      </label>
                    </div>
                  </div>
                  <div className="col-8">
                    <Select
                      id="laboratory"
                      options={pathologyCenters}
                      isClearable
                      placeholder="Select Laboratory"
                      isLoading={pathologyCenters?.length === 0 || false}
                      isDisabled={pathologyCenters?.length === 0 || false}
                      value={selectedPathologyCenter}
                      onChange={handleChangeRadiologyCenter}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        htmlFor="test-category"
                        className="from-label fw-bold mb-0"
                      >
                        Test Category:
                      </label>
                    </div>
                  </div>
                  <div className="col-8">
                    <Select
                      id="test-category"
                      options={testCategories}
                      placeholder="Select test category"
                      value={selectedCategory}
                      onChange={handleChangeCategory}
                      getOptionLabel={(option) => option?.test_category_name}
                      getOptionValue={(option) => option?.id}
                      isLoading={testCategories.length === 0}
                      isDisabled={testCategories.length === 0}
                      isClearable
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        htmlFor="test-name"
                        className="from-label fw-bold mb-0"
                      >
                        Test name:
                      </label>
                    </div>
                  </div>
                  <div className="col-8">
                    <div>
                      <Select
                        isClearable
                        id="test-name"
                        placeholder="Select test name"
                        options={
                          allTestName ||
                          testList.filter(
                            (item) => item.id === selectedTest?.id
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
                <div className="row mb-2">
                  <div className="col-4">
                    <div lassName="form-group d-flex align-items-center">
                      <label className="from-label fw-bold mb-0">
                        {" "}
                        Other Info:
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <input
                          type="radio"
                          name="fasting"
                          value="fasting"
                          onChange={(e) => setFasting(e.target.value)}
                          id="fasting"
                          className="form-radio-input"
                        />
                        <label htmlFor="fasting" className="mb-0">
                          Fasting
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <input
                          type="radio"
                          name="fasting"
                          id="non-fasting"
                          value={"non-fasting"}
                          onChange={(e) => setFasting(e.target.value)}
                          className="form-radio-input"
                        />
                        <label
                          htmlFor="non-fasting"
                          className="mb-0"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Non Fasting
                        </label>
                      </div>
                      {patient.patient_birth_sex_id !== null &&
                        maleOrFemale === "female" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <input
                              type="checkbox"
                              name="pregnant"
                              className="form-checkbox-input"
                              id="pregnant"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPregnant(true);
                                } else {
                                  setPregnant(null);
                                }
                              }}
                            />
                            <label htmlFor="pregnant" className="mb-0">
                              Pregnant
                            </label>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-4">
                    <div className="d-flex align-items-center">
                      <label className="form-label fw-bold mb-0 " htmlFor="">
                        Billing:
                      </label>
                    </div>
                  </div>
                  <div className="col-8 d-flex gap-2">
                    {/* <div className="d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="billing"
                        id="billing-private"
                        onChange={(e) => setBilling(e.target.value)}
                        value="private"
                      />
                      <label htmlFor="billing-private" className="mb-0">
                        Private
                      </label>
                    </div> */}
                    <div className="d-flex gap-2 align-items-center">
                      <input
                        type="checkbox"
                        name="billing"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBilling("discount");
                          } else {
                            setBilling(null);
                          }
                        }}
                        id="billing-discount"
                        // value="Discount"
                      />
                      <label htmlFor="billing-discount" className="mb-0">
                        Discount
                      </label>
                      {billing === "discount" && (
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            value={concession}
                            onChange={(e) => setConcession(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row mb-2">
                  <div className="col-4 ps-3">
                    <div className="d-flex align-items-center">
                      <label
                        htmlFor="date"
                        className="mb-0 fw-bold form-label"
                        style={{ fontSize: "15px" }}
                      >
                        Date:
                      </label>
                    </div>
                  </div>
                  <div className="col-8">
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
                  <div className="col-4 ps-3 d-flex align-items-center">
                    {maleOrFemale === "female" && (
                      <div className=" d-flex align-items-center">
                        <label
                          htmlFor="lmp"
                          className="mb-0 fw-bold form-label"
                          style={{ fontSize: "15px" }}
                        >
                          LMP Date:
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="col-8">
                    {patient.patient_birth_sex_id !== null &&
                      maleOrFemale === "female" && (
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              format="DD/MM/YYYY"
                              label="LMP Date"
                              sx={{ width: "100%" }}
                              value={lmpDate}
                              onChange={(value) => setLmpDate(value)}
                              slotProps={{ textField: { size: "small" } }}
                            />
                          </LocalizationProvider>
                        </div>
                      )}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-4 ps-3 d-flex align-items-center">
                    {maleOrFemale === "female" && (
                      <div className=" d-flex align-items-center">
                        <label
                          htmlFor="lmp"
                          className="mb-0 fw-bold form-label"
                          style={{ fontSize: "15px" }}
                        >
                          EDC Date:
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="col-8">
                    {patient.patient_birth_sex_id !== null &&
                      maleOrFemale === "female" && (
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              format="DD/MM/YYYY"
                              label="EDC Date"
                              sx={{ width: "100%" }}
                              value={edcDate}
                              onChange={(value) => setEdcDate(value)}
                              slotProps={{ textField: { size: "small" } }}
                            />
                          </LocalizationProvider>
                        </div>
                      )}
                  </div>
                </div>
                <div className="row ">
                  <div className="col-4 ps-3">
                    <div className="mt-2 fw-bold">
                      <label
                        className="mb-0 fw-bold form-label"
                        htmlFor="clinical"
                        style={{ fontSize: "15px" }}
                      >
                        Clinical Notes:
                      </label>
                    </div>
                  </div>
                  <div className="col-8">
                    <Select
                      placeholder="Select Clinical Notes"
                      id="clinical"
                      options={allClinicalDetails}
                      onChange={handleChangClinicalDetails}
                      value={selectedClinicalDetails}
                      isLoading={allClinicalDetails?.length === 0}
                      isDisabled={allClinicalDetails?.length === 0}
                      isClearable
                    />
                  </div>
                </div>
                <div className="row d-flex align-items-center">
                  <div className="col-4 ps-3 d-flex align-items-center">
                    <label
                      className="mb-0 fw-bold form-label"
                      htmlFor="exampleFormControlTextarea1"
                      style={{ fontSize: "15px" }}
                    >
                      Notes:
                    </label>
                  </div>
                  <div className="col-8">
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
                  type="submit"
                >
                  {btnLoading ? "Loading..." : "Add To List"}
                </button>
              </div>
            </div>
          </form>
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
                        {toDayPathologyData.length > 0 && (
                          <>
                            <input
                              type="checkbox"
                              id="radiology-all-select"
                              checked={
                                toDayPathologyData.length ===
                                selectedItems.length
                              }
                              style={{
                                margin: "3px 2px",
                                cursor: "pointer",
                                display:
                                  toDayPathologyData.length ===
                                    selectedItems.length ||
                                  selectedItems.length === 0
                                    ? "block"
                                    : "none",
                              }}
                              onChange={handleSelectAll}
                            />
                            {toDayPathologyData.length ===
                              selectedItems.length ||
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
                    <th>Clinic</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {toDayPathologyData?.length > 0 ? (
                    toDayPathologyData?.map((item, i) => {
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
                          <td>{item?.pathology_test_category}</td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.pathology_test_name}
                          </td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.pathology_clinical_details_name}
                          </td>
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
          <div className="d-flex align-items-center justify-content-end flex-grow-1">
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
                  {/* {sendBtnLoading ? "Sending..." : "Send"} */}
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
        {/* <div className="rx-one-button-group">
         
          <button onClick={props.closeModal} className="btn me-2 flot-end">
            Cancel
          </button>
        </div> */}
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
                          <td>{item?.pathology_test_category}</td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.pathology_test_name}
                          </td>
                          <td
                            style={{
                              whiteSpace: "normal",
                            }}
                          >
                            {item?.pathology_clinical_details_name}
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
      {/* Print Code Start */}
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
                src={`${global.img_url}/labotory/${selectedItems[0]?.laboratory_details?.logo}`}
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
                {selectedItems[0]?.laboratory_details?.labratory_name}
              </h6>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Fax:</span>{" "}
                {selectedItems[0]?.laboratory_details?.fax}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Mobile:</span>{" "}
                {selectedItems[0]?.laboratory_details?.phone}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>Address:</span>{" "}
                {selectedItems[0]?.laboratory_details?.address}
              </p>
              <p style={{ margin: "0px", padding: "0", fontSize: "14px" }}>
                <span style={{ fontWeight: "500" }}>website:</span>{" "}
                {selectedItems[0]?.laboratory_details?.websiteLink}
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
                  textTransform: "capitalize",
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
                <span style={{ fontWeight: "500" }}>Date of Birth:</span>
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
                <span style={{ fontWeight: "500" }}>Date:</span>
                {moment(props?.patient?.center_date).format("DD/MM/yyyy") ===
                "Invalid date"
                  ? ""
                  : moment(props?.patient?.center_date).format("DD/MM/yyyy")}
              </p>
              {selectedItems[0]?.concession && (
                <p style={{ margin: "0", padding: "0", fontSize: "14px" }}>
                  <span style={{ fontWeight: "500" }}>
                    Billed as concession:
                  </span>
                  {parseFloat(selectedItems[0]?.concession)?.toFixed(2)} TK
                </p>
              )}
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
                        {item?.pathology_test_name}
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
                  Fasting:{" "}
                  {selectedItems[0]?.fasting
                    ? selectedItems[0]?.fasting
                    : "N/A"}
                </p>

                {maleOrFemale === "female" && (
                  <>
                    <p
                      style={{
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      Pregnant:{" "}
                      {selectedItems[0]?.pregnant
                        ? Number(selectedItems[0]?.pregnant) === 1
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </p>
                    <p
                      style={{
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      LMP Date:{" "}
                      {selectedItems[0]?.lmpDate
                        ? moment(selectedItems[0]?.lmpDate).format("DD/MM/YYYY")
                        : "N/A"}
                    </p>
                    <p
                      style={{
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      EDC Date:{" "}
                      {selectedItems[0]?.edcDate
                        ? moment(selectedItems[0]?.edcDate).format("DD/MM/YYYY")
                        : "N/A"}
                    </p>
                  </>
                )}
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
                  : {props?.patient?.patient_hn_number}
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

export default Pathology;
