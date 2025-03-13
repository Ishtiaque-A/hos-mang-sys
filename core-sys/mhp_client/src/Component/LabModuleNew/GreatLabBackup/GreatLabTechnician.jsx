import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import JoditEditor from "jodit-react";
import Modal from "react-modal";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { formateHN } from "../../utils/numberHelper";
import useUserData from "../../hooks/useUserData";
import { getAge } from "../../utils/getAge";
import { nullParser } from "../../utils/null-parser";

const emptyLetterHead = {
  lab_incharge_name: null,
  lab_incharge_designation: null,
  lab_incharge_sign: null,
  doctor_name: null,
  doctor_designation: null,
  doctor_sign: null,
  preferred_name: null,
  preferred_designation: null,
  preferred_sign: null,
  letter_head_logo: null,
};

export default function GreatLabTechnicianBackup({
  test,
  invoiceDetails,
  setUpdate,
  testDetails,
  patientDetails,
  closeModal,
}) {
  const [labTest, setLabTest] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [letterHeadData, setLetterHeadData] = useState({ ...emptyLetterHead });
  // console.log(testDetails, "labTest");
  const user = useUserData();

  console.log(test, "test dd");
  console.log(invoiceDetails, "invoiceDetails");

  // const [image, setImage] = useState('');
  const [remark, setRemark] = useState("");

  const [radiologyReportDetails, setRadiologyReportDetails] = useState("");
  const [radiogyReportImage, setRadiogyReportImage] = useState("");
  const [radiogyReportUrl, setRadiogyReportUrl] = useState("");
  const testValue = labTest.reduce(
    (totalValue, current) => totalValue + (current.result ? 1 : 0),
    0
  );
  let editorReadOnly =
    Number(test.report_confiremd_status) === 1 ? true : false;
  const config = {
    removeButtons: [
      "source",
      "iframe",
      "xpath",
      "wrap-nodes",
      "video",
      "table-keyboard-navigation",
      "color",
      "copy-format",
      "drag-and-drop",
      "drag-and-drop-element",
      "enter",
      "error-messages",
      "file",
      "focus",
      "font",
      "format-block",
      "fullsize",
      "hotkeys",
      "hr",
      "about",
      "key-arrow-outside",
      "limit",
      "line-height",
      "link",
      "media",
      "mobile",
      "ordered-list",
      "paste",
      "paste-from-word",
      "paste-storage",
      "placeholder",
      "powered-by-jodit",
      "preview",
      "print",
      "backspace",
      "add-new-line",
      "clipboard",
    ],
    readonly: editorReadOnly,
  };
  const editor = useRef(null);
  // pdf view
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [testNameConfigValues, setTestNameConfigValues] = useState([]);
  const [centerDetails, setCenterDetails] = useState();
  const [doctorDetails, setDoctorDetails] = useState();
  console.log(centerDetails, "centerDetails");
  useEffect(() => {
    if (invoiceDetails.referrer) {
      axios
        .get("doctors/" + invoiceDetails?.referrer)
        .then((res) => {
          setDoctorDetails(res.data?.doctors[0]);
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }
  }, [invoiceDetails]);
  useEffect(() => {
    axios.get("lab-center-details").then((res) => {
      setCenterDetails(res?.data?.center);
    });
    if (
      Number(test.report_confiremd_status) === 1 &&
      Number(test.report_add_status) === 1 &&
      testDetails?.parameter &&
      labTest.length > 0
    ) {
      const { parameter } = testDetails;

      const filteredData = parameter?.map((param) => {
        if (
          patientDetails.patient_birth_sex?.birth_sex_name.toLowerCase() ===
            "male" &&
          param?.parameter_config
        ) {
          const {
            test_name_id,
            parameter_id,
            male_lower_value,
            male_upper_value,
            male_normal_value,
          } = param?.parameter_config;

          let rang_value = "";
          const findTest = labTest.find(
            (item) => Number(item.parameter_id) === Number(parameter_id)
          );
          console.log(findTest, "findTest");
          if (findTest?.flag) {
            if (findTest?.flag.toLowerCase() === "low")
              rang_value = male_lower_value;
            if (findTest?.flag.toLowerCase() === "high")
              rang_value = male_upper_value;
            if (findTest?.flag.toLowerCase() === "normal")
              rang_value = male_normal_value;
            return {
              gender: "Male",
              flag: findTest?.flag,
              parameter_name: findTest.parameter_name,
              rang_value,
            };
          }
        } else if (
          patientDetails.patient_birth_sex?.birth_sex_name.toLowerCase() ===
            "female" &&
          param?.parameter_config
        ) {
          const {
            test_name_id,
            parameter_id,
            female_lower_value,
            female_upper_value,
            female_normal_value,
          } = param.parameter_config;
          const findTest = labTest.find(
            (item) => Number(item.parameter_id) === Number(parameter_id)
          );
          let rang_value = "";
          if (findTest?.flag) {
            if (findTest?.flag.toLowerCase() === "low")
              rang_value = female_lower_value;
            if (findTest?.flag.toLowerCase() === "high")
              rang_value = female_upper_value;
            if (findTest?.flag.toLowerCase() === "normal")
              rang_value = female_normal_value;
            return {
              gender: "Female",
              flag: findTest?.flag,
              parameter_name: findTest.parameter_name,
              rang_value,
              // test_name_id, parameter_id, female_lower_value, female_upper_value, female_normal_value
            };
          }
        } else if (
          patientDetails.patient_birth_sex?.birth_sex_name.toLowerCase() ===
            "child" &&
          param?.parameter_config
        ) {
          const {
            test_name_id,
            parameter_id,
            child_lower_value,
            child_upper_value,
            child_normal_value,
          } = param.parameter_config;
          const findTest = labTest.find(
            (item) => Number(item.parameter_id) === Number(parameter_id)
          );
          let rang_value = "";
          if (findTest?.flag) {
            if (findTest?.flag.toLowerCase() === "low")
              rang_value = child_lower_value;
            if (findTest?.flag.toLowerCase() === "high")
              rang_value = child_upper_value;
            if (findTest?.flag.toLowerCase() === "normal")
              rang_value = child_normal_value;
            return {
              gender: "Child",
              flag: findTest?.flag,
              parameter_name: findTest.parameter_name,
              rang_value,
              // test_name_id, parameter_id, child_lower_value, child_upper_value, child_normal_value
            };
          }
        } else {
          return null;
        }
      });
      setTestNameConfigValues(filteredData);
    }
  }, [
    testDetails,
    patientDetails,
    labTest,
    test.report_confiremd_status,
    test.report_add_status,
  ]);
  // useEffect;

  const [report, setReport] = useState({});
  console.log(report, "report details");
  useEffect(() => {
    if (testDetails?.parameter && Number(test.report_add_status) === 0) {
      setLabTest(testDetails.parameter);
    } else if (Number(test.report_add_status) === 1) {
      axios.get(`great-lab-test-report/${test.report_id}`).then((res) => {
        //console.log(res, "res");
        if (res.status === 200) {
          setLabTest(res.data.report.details);
          setReport(res.data.report);
          if (
            res.data?.report?.remark &&
            res.data?.report?.remark !== "" &&
            res.data?.report?.remark !== "null"
          ) {
            setRemark(res.data.report.remark);
          }

          setRadiologyReportDetails(res.data.report.radiologyReportDetails);
          setRadiogyReportUrl(res.data.report.radiogyReportImage);
          if (res.data?.report?.radiologyReportDetails?.endsWith(".pdf")) {
            const currentDocs = [...selectedDocs];
            currentDocs.push(res.data.report.radiologyReportDetails);
            setSelectedDocs(currentDocs);
            setIsUploadFile(true);
          }
        }
      });
    } else {
      setLabTest([]);
    }
    axios.get("/lab-center-letter-head").then((res) => {
      if (res.status === 200) {
        setLetterHeadData(res.data.letter_head);
      }
    });
  }, [testDetails, test, selectedDocs]);
  const handleParameterInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...labTest];
    if (Number(test.report_add_status) === 0) {
      const filtered = list[index].parameter_value?.find(
        (pt) =>
          pt.gender.toLowerCase() ===
          patientDetails?.patient_birth_sex?.birth_sex_name.toLowerCase()
      );
      if (filtered?.upper_value && filtered.lower_value) {
        list[index]["flag"] =
          value > parseFloat(filtered?.upper_value)
            ? "High"
            : value < parseFloat(filtered.lower_value)
            ? "Low"
            : "Normal";
        list[index]["upper_value"] = filtered?.upper_value;
        list[index]["lower_value"] = filtered?.lower_value;
      }
    }
    if (Number(test.report_add_status) === 1) {
      const exist = list[index].upper_value
        ? list[index].lower_value
          ? true
          : false
        : false;
      console.log(exist, "exist");
      if (exist) {
        list[index]["flag"] =
          value > parseFloat(list[index]?.upper_value)
            ? "High"
            : value < parseFloat(list[index].lower_value)
            ? "Low"
            : "Normal";
      } else {
        list[index]["flag"] = "";
      }
    }
    if (!value.length > 0) {
      list[index]["flag"] = "";
    }
    list[index][name] = value;
    setLabTest(list);
  };

  const creatReport = () => {
    const report = new FormData();
    report.append("invoice_id", invoiceDetails.id);
    report.append("invoice_no", invoiceDetails.invoiceNo);
    report.append("patient_id", invoiceDetails.patient_id);
    report.append("test_id", testDetails.id);
    report.append("test_name", testDetails.test_name);
    report.append("test_group", testDetails?.group?.test_group_name);
    report.append("gender", patientDetails?.patient_birth_sex?.birth_sex_name);
    report.append("technician_name", "Mr John");
    // report.append('technician_sign', imageUrl ? imageUrl : image);
    report.append("validator", "");
    report.append("status", 0);
    report.append("remark", remark);
    report.append(
      "radiologyReportDetails",
      isUploadFile ? selectedDocs[0] : radiologyReportDetails
    );
    report.append("radiogyReportImage", radiogyReportImage);
    if (testDetails?.group?.test_group_name?.toLowerCase() === "pathology") {
      if (testValue > 0 || radiologyReportDetails || remark) {
        if (Number(test.report_add_status) === 0) {
          axios.post("save-great-lab-test-report", report).then((res) => {
            if (res.status === 200) {
              labTest.map((item) => {
                const data = {
                  report_id: res.data.report.id,
                  test_id: testDetails.id,
                  patient_id: invoiceDetails.patient_id,
                  invoice_id: invoiceDetails.id,
                  parameter_id: item.id,
                  parameter_name: item.parameter_name,
                  result: item.result,
                  unit: item.parameter_unit,
                  upper_value: item.upper_value,
                  lower_value: item.lower_value,
                  flag: item.flag,
                  parameter_group_id: item.parameter_group_id,
                  lab_no: 1,
                };

                axios
                  .post("save-great-lab-test-report-details", data)
                  .then((res) => {
                    if (res.status === 200) {
                      setUpdate(Math.random());
                    }
                  });
              });
            }
            swal("Success", res.data.message, "success");
            axios
              .post(`great-lab-test-report-update/${test.id}`, {
                report_add_status: 1,
                report_approve_status: 0,
                report_id: res.data.report.id,
                report_confiremd_status: 0,
              })
              .then((res) => {
                if (res.status === 200) {
                  closeModal();
                  setUpdate(Math.random());
                }
              });
          });
        }
        if (Number(test.report_add_status) === 1) {
          axios
            .post(`update-great-lab-test-report/${test.report_id}`, report)
            .then((res) => {
              if (res.status === 200) {
                swal("Success", res.data.message, "success");
                closeModal();
                setUpdate(Math.random());
              }
            });
          labTest.map((item) => {
            if (Number(item.result) > 0) {
              const data = {
                report_id: test.report_id,
                test_id: testDetails.id,
                patient_id: invoiceDetails.patient_id,
                invoice_id: invoiceDetails.id,
                parameter_id: item.id,
                parameter_name: item.parameter_name,
                result: item.result,
                unit: item.parameter_unit,
                upper_value: item.upper_value,
                lower_value: item.lower_value,
                flag: item.flag,
                lab_no: 1,
              };

              axios
                .post(`update-great-lab-test-report-details/${item.id}`, data)
                .then((res) => {
                  if (res.status === 200) {
                    swal("Success", res.data.message, "success");
                    closeModal();
                    setUpdate(Math.random());
                  }
                });
            }
          });
        }
      } else {
        toast.error("Please enter test parameter value !");
      }
    }
    if (testDetails?.group?.test_group_name?.toLowerCase() === "radiology") {
      if (Number(test.report_add_status) === 0) {
        axios.post("save-great-lab-test-report", report).then((res) => {
          if (res.status === 200) {
            swal("Success", res.data.message, "success");
            axios
              .post(`great-lab-test-report-update/${test.id}`, {
                report_add_status: 1,
                report_approve_status: 0,
                report_id: res.data.report.id,
                report_confiremd_status: 0,
              })
              .then((res) => {
                if (res.status === 200) {
                  closeModal();
                  setUpdate(Math.random());
                }
              });
          }
        });
      }
      if (Number(test.report_add_status) === 1) {
        axios
          .post(`update-great-lab-test-report/${test.report_id}`, report)
          .then((res) => {
            console.log("update", res);
            if (res.status === 200) {
              swal("Success", res.data.message, "success");
              closeModal();
              setUpdate(Math.random());
            }
          });
      }
    }
  };
  const testRef = useRef();
  const handlePrintTest = useReactToPrint({
    content: () => testRef.current,
  });
  const printReport = () => {
    if (testValue > 0 || radiologyReportDetails || remark) {
      handlePrintTest();
    } else {
      toast.error("Please select test for print!");
    }
  };
  const confirmReport = () => {
    if (testValue > 0 || radiologyReportDetails || remark) {
      creatReport();

      axios
        .post(`great-lab-test-report-confirm/${test.id}`, {
          report_approve_status: 0,
          report_confiremd_status: 1,
        })
        .then((res) => {
          if (res.status === 200) {
            swal("Success", res?.data?.message, "success");
            setUpdate(Math.random());
            setRemark("");
            closeModal();
          }
        });
    } else {
      toast.error("Please enter test parameter value !");
    }
  };
  // picture modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "32%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      height: "500px",
      padding: "15px",
      zIndex: "3000",
    },
  };
  console.log("impression value ", remark);
  console.log("test", testDetails);
  console.log(invoiceDetails, "invoiceDetails");
  return (
    <div className="ms-2 mt-2">
      <div className="custom-card p-2">
        <h5 className="card-title">
          Test result
          {Number(test.report_add_status) === 1 ? "Update" : "Create"}
        </h5>
      </div>
      <div className="custom-card mt-2 p-2">
        <div className="row lab-technician-patient-info">
          <div className="col-4">
            <div className="row">
              <div className="col-6">
                <p>
                  <span>Patient Name</span>
                </p>
              </div>
              <div className="col-6">
                <p> : {invoiceDetails?.patient?.fullName}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p>Patient HN </p>
              </div>
              <div className="col-6">
                <p> : {formateHN(patientDetails?.patient_hn_number)}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p>Sex </p>
              </div>
              <div className="col-6">
                <p> : {patientDetails?.patient_birth_sex?.birth_sex_name}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <p>DOB</p>
              </div>
              <div className="col-6">
                <p>
                  :
                  {moment(invoiceDetails?.patient?.patient_dob).format(
                    "DD/MM/YYYY"
                  ) === "Invalid date"
                    ? ""
                    : moment(invoiceDetails?.patient?.patient_dob).format(
                        "DD/MM/YYYY"
                      )}
                  &nbsp; ( {getAge(invoiceDetails?.patient?.patient_dob)})
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-6">
                <p>Reference By </p>
              </div>
              <div className="col-6">
                <p> : {invoiceDetails?.referredBy}</p>
              </div>
            </div>
            {invoiceDetails?.referrer ? (
              <div className="row">
                <div className="col-6">
                  <p>
                    <span>Reference Doctor</span>
                  </p>
                </div>
                <div className="col-6">
                  <p>
                    :
                    {nullParser(doctorDetails?.fullName)
                      ? doctorDetails?.fullName
                      : ""}
                  </p>
                </div>
              </div>
            ) : null}
            <div className="row">
              <div className="col-6">
                <p>PRN </p>
              </div>
              <div className="col-6">
                <p> : P - 000 - 000 - 1</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p>Collection Date </p>
              </div>
              <div className="col-6">
                <p>
                  :
                  {moment(invoiceDetails?.sampleCollectionDate).format(
                    "DD/MM/YYYY hh:mm A"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <p>
              <span className="w-50 d-inline-block">Report Date </span>:
              <span className="ms-2">
                {moment(report?.updated_at).format("DD/MM/YYYY hh:mm A")}
              </span>
            </p>
            <p>
              <span className="w-50 d-inline-block">Branch Name </span>:
              <span className="ms-2">
                {!user?.isSuperAdmin ? user?.branch_name : "Admin"}
              </span>
            </p>
            <p>
              <span className="w-50 d-inline-block">Branch ID </span>:
              <span className="ms-2">
                {!user?.isSuperAdmin ? user?.branch_code : "Admin"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="custom-card p-2 mt-2">
        <h6>Basic Metabolic Panel</h6>
      </div>
      <div className="bg-white mt-2 rounded p-1">
        <div className="d-flex justify-content-center pt-3">
          <h6>{testDetails?.group?.test_group_name}</h6>
        </div>
        <div className="d-flex mt-2 justify-content-between">
          <div>
            <p style={{ fontWeight: "500", marginBottom: "0px" }}>
              {testDetails?.test_name}
            </p>
          </div>
        </div>
        {testDetails?.group?.test_group_name.toLowerCase() === "pathology" && (
          <>
            <div className="mt-2">
              {labTest?.length > 0 && (
                <table className="past_rx_table">
                  <thead>
                    <tr>
                      <th scope="col">Test Parameter</th>
                      <th scope="col">Result</th>
                      <th scope="col">Flag</th>
                      <th scope="col">Unit</th>
                      <th scope="col">Ref. Range</th>
                      {/* <th scope="col">Interval</th> */}
                      <th scope="col">Normal Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labTest?.map((item, i) => {
                      const filtered = item.parameter_value?.find(
                        (pt) =>
                          pt.gender.toLowerCase() ===
                          patientDetails?.patient_birth_sex?.birth_sex_name.toLowerCase()
                      );
                      console.log(
                        "filtered",
                        patientDetails?.patient_birth_sex
                      );
                      const parameterValue =
                        Number(test.report_add_status) === 0
                          ? item.parameter_value
                          : item?.parameter[0]?.parameter_value;
                      return (
                        console.log(item, "item"),
                        (
                          <tr key={i}>
                            <td>{item.parameter_name}</td>
                            <td>
                              {filtered?.upper_value &&
                              filtered?.lower_value ? (
                                <input
                                  readOnly={
                                    Number(test.report_confiremd_status) === 1
                                  }
                                  value={item.result}
                                  onChange={(e) =>
                                    handleParameterInputChange(e, i)
                                  }
                                  type="number"
                                  name="result"
                                  className="form-control form-control-sm"
                                />
                              ) : (
                                <input
                                  readOnly={
                                    Number(test.report_confiremd_status) === 1
                                  }
                                  value={item.result}
                                  onChange={(e) =>
                                    handleParameterInputChange(e, i)
                                  }
                                  type="text"
                                  name="result"
                                  className="form-control form-control-sm"
                                />
                              )}
                            </td>
                            <td
                              className={`${
                                (item.flag === "Low" || item.flag === "High") &&
                                "text-danger fw-bolder"
                              }`}
                            >
                              {item.flag}
                            </td>
                            <td>
                              {Number(test.report_add_status) === 1
                                ? item.unit
                                : item.parameter_unit}
                            </td>
                            <td>
                              {Number(test.report_add_status) === 1
                                ? `${item.lower_value || "-"} - ${
                                    item.upper_value || "-"
                                  }`
                                : `${filtered?.lower_value || "-"} - ${
                                    filtered?.upper_value || "-"
                                  }`}
                            </td>
                            <td className="text-start ">
                              {/* <blockquote>
                                {
                                  parameterValue?.find((pt) => {
                                    return (
                                      pt?.gender.toLowerCase() ===
                                      patientDetails?.patient_birth_sex?.birth_sex_name?.toLowerCase()
                                    );
                                  })?.normal_value
                                }
                              </blockquote> */}
                              <span
                                className="ms-1 d-inline-block"
                                dangerouslySetInnerHTML={{
                                  __html: parameterValue
                                    ?.find((pt) => {
                                      return (
                                        pt?.gender.toLowerCase() ===
                                        patientDetails?.patient_birth_sex?.birth_sex_name?.toLowerCase()
                                      );
                                    })
                                    ?.normal_value?.replace(/\n/g, "<br>"),
                                }}
                              ></span>
                            </td>
                            {/* <td><i onClick={editTest} className="fal fa-edit me-1 text-success"></i><i className="fal text-danger fa-trash-alt me-1"></i></td> */}
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            <div className="row mt-2">
              {testNameConfigValues?.length > 0 &&
              Number(test?.report_confiremd_status) === 1 &&
              Number(test?.report_add_status) === 1 &&
              remark?.length === 0 &&
              testDetails?.parameter ? (
                <>
                  <div className="row p-0  my-2">
                    {testNameConfigValues
                      .filter((item) => item?.flag !== undefined)
                      .map((item, i) => {
                        return (
                          <div key={i} className="col-4">
                            <div
                              style={{
                                background: "#F3F2EF",
                                padding: "10px",
                                margin: "5px 0",
                                borderRadius: "12px",
                              }}
                            >
                              <h3
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  marginBottom: "7px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {item?.parameter_name}
                              </h3>

                              <p>
                                {item?.rang_value.length
                                  ? item?.rang_value
                                  : "Test value is not available"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              ) : null}
              <div className="col-9">
                {remark?.length > 0 ||
                test?.remark?.length > 0 ||
                Number(test.report_confiremd_status) === 0 ? (
                  <div className="row">
                    <div className="col-1">
                      <label
                        for="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Impression
                      </label>
                    </div>
                    <div className="col-10">
                      <textarea
                        readOnly={Number(test?.report_confiremd_status) === 1}
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="form-control ms-3"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        )}
        {testDetails?.group?.test_group_name.toLowerCase() === "radiology" && (
          <>
            <JoditEditor
              style={{ height: "100%" }}
              ref={editor}
              value={radiologyReportDetails}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setRadiologyReportDetails(newContent)} // preferred to use only this option to update the content for performance reasons
            />

            <div className="mt-2 row">
              <div className="col-7 d-flex">
                {Number(test.report_confiremd_status) === 0 && (
                  <>
                    <label htmlFor="formFileSm" className="form-label me-3">
                      Report file upload
                    </label>
                    <input
                      onChange={(e) => {
                        setRadiogyReportImage(e.target.files[0]);
                        setRadiogyReportUrl("");
                      }}
                      id="formFileSm"
                      type="file"
                    />
                  </>
                )}
                {Number(test.report_confiremd_status) === 1 && (
                  <p className="me-3">Uploaded report image: </p>
                )}
                <div className="technician-sign-preview">
                  {radiogyReportUrl && (
                    <img
                      onClick={() => setModalIsOpen(true)}
                      src={`${global.img_url}/images/lab/${radiogyReportUrl}`}
                      alt=""
                      className="img-fluid"
                    />
                  )}
                  {radiogyReportImage && (
                    <img
                      onClick={() => setModalIsOpen(true)}
                      src={URL.createObjectURL(radiogyReportImage)}
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* dd */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="d-flex justify-content-between">
                <h6 className="card-title">Radiology Report</h6>
                <span
                  className="float-end ms-3"
                  style={{ fontSize: "15px", cursor: "pointer" }}
                  onClick={() => setModalIsOpen(false)}
                >
                  <i className="fal fa-times"></i>
                </span>
              </div>

              <div className="card-body">
                <TransformWrapper>
                  {({
                    zoomIn,
                    zoomOut,
                    doubleClick,
                    resetTransform,
                    ...rest
                  }) => (
                    <React.Fragment>
                      <div className="tools">
                        <button
                          className="zoom-button"
                          onClick={() => zoomIn()}
                        >
                          <i className="fas fa-search-plus"></i>
                        </button>
                        <button
                          className="zoom-button"
                          onClick={() => zoomOut()}
                        >
                          <i className="fas fa-search-minus"></i>
                        </button>
                        <button
                          className="zoom-button"
                          onClick={() => resetTransform()}
                        >
                          <i className="fas fa-sync-alt"></i>
                        </button>
                      </div>
                      <TransformComponent>
                        {radiogyReportUrl && (
                          <img
                            src={`${global.img_url}/images/lab/${radiogyReportUrl}`}
                            alt=""
                            className="img-fluid"
                          />
                        )}
                        {radiogyReportImage && (
                          <img
                            src={URL.createObjectURL(radiogyReportImage)}
                            alt=""
                            className="img-fluid"
                          />
                        )}
                      </TransformComponent>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            </Modal>
            {/* dd */}
          </>
        )}
        <div className="row mt-2">
          <div className="col-12 ">
            <div className="d-flex justify-content-end mt-1">
              <div className="rx-one-button-group">
                {Number(test.report_confiremd_status) === 0 &&
                  Number(test.report_add_status) === 1 && (
                    <button onClick={confirmReport} className="btn me-2">
                      Confirm
                    </button>
                  )}
                <button onClick={printReport} className="btn me-2">
                  Print
                </button>
                {Number(test.report_confiremd_status) === 0 && (
                  <button onClick={creatReport} className="btn me-2">
                    Save
                  </button>
                )}
                <button
                  onClick={() => {
                    closeModal();
                    setLabTest([]);
                  }}
                  className="btn me-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="great-lab-print-report" ref={testRef}>
          <div
            style={{ borderBottom: "1px solid #000" }}
            className="d-flex justify-content-between "
          >
            <div className="great-lab-print-head mt-3">
              <h6 style={{ textTransform: "uppercase" }}>
                {centerDetails?.name || ""}
              </h6>
              <br />
              <p className="my-0">
                {centerDetails?.address1 +
                  ", " +
                  centerDetails?.city?.city_name +
                  ", " +
                  centerDetails?.postal_code +
                  ", " +
                  centerDetails?.country?.country_name}
              </p>
              <p className="my-0">Phone: {centerDetails?.mobile}</p>
              <p className="my-0">
                Center Name: {user?.organization_name}
                {user?.branch_code ? `(${user?.branch_code})` : ""}
              </p>
            </div>
            <div>
              <img
                style={{ height: "80px" }}
                src={`${global.img_url}/images/letterHead/${letterHeadData?.letter_head_logo}`}
                alt="letter-head"
              />
            </div>
          </div>
          <div className="text-center">
            <h6 className="text-uppercase">
              {testDetails?.group?.test_group_name} Report
            </h6>
          </div>
          <div
            style={{ border: "1px solid #000" }}
            className="d-flex justify-content-between p-2 mb-2"
          >
            <div className="lab-report-details">
              <p>
                <span style={{ width: "70px" }} className="d-inline-block">
                  Invoice No
                </span>
                :<span className="ms-1">{invoiceDetails?.invoiceNo}</span>
              </p>
              <p>
                <span style={{ width: "70px" }} className="d-inline-block">
                  Patient ID
                </span>
                :
                <span className="ms-1">
                  {formateHN(patientDetails?.patient_hn_number)}
                </span>
              </p>
              <p>
                <span style={{ width: "70px" }} className="d-inline-block">
                  Name
                </span>
                :
                <span className="ms-1">
                  {invoiceDetails?.patient?.fullName}
                </span>
              </p>
              <p>
                <span style={{ width: "70px" }} className="d-inline-block">
                  Date
                </span>
                :
                <span className="ms-1">
                  {moment(invoiceDetails?.deliveryDate).format("DD/MM/YYYY")}
                </span>
              </p>
            </div>
            <div className="lab-report-details">
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Age
                </span>
                :
                <span className="ms-1">
                  {moment().diff(patientDetails?.patient_dob, "years")}
                </span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Sex
                </span>
                :
                <span className="ms-1">
                  {patientDetails?.patient_birth_sex?.birth_sex_name}
                </span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Reference By
                </span>
                : <span className="ms-1">{invoiceDetails?.referredBy}</span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Specimen
                </span>
                : <span className="ms-1">Blood</span>
              </p>
            </div>
            <div className="lab-report-details">
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Sample Date
                </span>
                :
                <span className="ms-1">
                  {moment(invoiceDetails?.sampleCollectionDate).format(
                    "DD/MM/YYYY hh:mm A"
                  )}
                </span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Report Date
                </span>
                :
                <span className="ms-1">
                  {moment(report?.updated_at).format("DD/MM/YYYY hh:mm A")}
                </span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Report Status
                </span>
                :
                <span className="ms-1">
                  {Number(test?.report_confiremd_status) === 1
                    ? "Final"
                    : "Draft"}
                </span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Branch Name
                </span>
                :
                <span className="ms-1">
                  {user?.isSuperAdmin ? "Admin" : user?.branch_name}
                </span>
              </p>
              <p>
                <span style={{ width: "110px" }} className="d-inline-block">
                  Branch ID
                </span>
                :
                <span className="ms-1">
                  {user?.isSuperAdmin ? "Admin" : user?.branch_code}
                </span>
              </p>
            </div>
          </div>

          {testDetails?.group?.test_group_name.toLowerCase() ===
            "pathology" && (
            <>
              <div className="lab-report-table">
                {labTest?.length > 0 && (
                  <table className="table table-borderless">
                    <tbody>
                      <tr
                        style={{
                          border: "1px solid #000",
                          padding: "5px",
                        }}
                      >
                        <td>Test Name</td>
                        <td>Result</td>
                        <td>Unit</td>
                        <td>Flag</td>
                        <td>Ref. Range</td>
                        <td>Normal Value</td>
                      </tr>
                      <tr>
                        <td colSpan={5}>
                          <div className="mt-2">
                            <h6
                              className="text-uppercase "
                              style={{ textDecoration: "underline", margin: 0 }}
                            >
                              {testDetails?.test_name}
                            </h6>
                          </div>
                        </td>
                      </tr>
                      {testDetails?.parameter_group?.map((test) => {
                        const normalParameterValue = labTest?.find(
                          (tst) => tst?.parameter_group_id == test?.id
                        );
                        console.log(
                          normalParameterValue,
                          "normalParameterValue"
                        );
                        return (
                          <>
                            <tr>
                              <td
                                colSpan={5}
                                style={{
                                  margin: 0,
                                }}
                              >
                                <h6
                                  style={{
                                    margin: 0,
                                    fontSize: "16px",
                                  }}
                                >
                                  {test?.group_name}
                                </h6>
                              </td>
                            </tr>
                            {labTest
                              ?.filter((t) => t.parameter_group_id == test?.id)
                              .map((param) => {
                                let normalParameterValue = [];
                                if (param?.parameter?.length > 0) {
                                  normalParameterValue =
                                    param?.parameter[0]?.parameter_value || [];
                                } else {
                                  normalParameterValue = [];
                                }

                                return (
                                  <tr>
                                    <td>
                                      <p
                                        style={{ fontWeight: "500", margin: 0 }}
                                      >
                                        {param?.parameter_name}
                                      </p>
                                    </td>
                                    <td style={{ width: "200px" }}>
                                      <p
                                        style={{ fontWeight: "500", margin: 0 }}
                                      >
                                        {param?.result}
                                      </p>
                                    </td>
                                    <td>
                                      <p style={{ margin: 0 }}>{param?.unit}</p>
                                    </td>
                                    <td>{param?.flag}</td>
                                    <td>
                                      {param?.lower_value} -{param?.upper_value}
                                    </td>
                                    <td>
                                      <div style={{ width: "150px" }}>
                                        <p style={{ whiteSpace: "normal" }}>
                                          {normalParameterValue.length > 0 &&
                                            normalParameterValue?.find((pt) => {
                                              return (
                                                pt?.gender?.toLowerCase() ===
                                                patientDetails?.patient_birth_sex?.birth_sex_name?.toLowerCase()
                                              );
                                            })?.normal_value}
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                {remark && remark?.length > 0 ? (
                  <>
                    <h6>Impression : </h6>
                    <p className="mt-3 ms-5">{remark}</p>
                  </>
                ) : (
                  testNameConfigValues
                    .filter((item) => item?.flag !== undefined)
                    .map((item, i) => {
                      return (
                        <div className="d-flex align-items-center" key={i}>
                          <div style={{ width: "150px" }}>
                            <h6 className="my-1 py-0">
                              {item?.parameter_name}
                            </h6>
                          </div>
                          <p className="my-1 py-0 ms-2">
                            {item?.rang_value.length
                              ? ` : ${item?.rang_value}`
                              : "Test value is not available"}
                          </p>
                        </div>
                      );
                    })
                )}
              </div>
            </>
          )}
          {testDetails?.group?.test_group_name.toLowerCase() ===
            "radiology" && (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: radiologyReportDetails }}
                className="mt-2"
              ></div>
            </>
          )}
          {Number(test.report_confiremd_status) === 1 ? (
            <div
              style={{
                margin: "25px 0px",
              }}
              className="d-flex gap-4 justify-content-between"
            >
              <div className="me-3">
                <div className="technician-sign-preview mb-2">
                  {letterHeadData?.preferred_sign && (
                    <img
                      src={`${global.img_url}/images/letterHead/${letterHeadData?.preferred_sign}`}
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </div>
                <hr />
                <p className="text-center m-0">
                  {letterHeadData?.preferred_name}
                </p>
                <p className="text-center m-0">
                  {letterHeadData?.preferred_designation}
                </p>
              </div>
              <div className="me-3">
                <div className="technician-sign-preview mb-2">
                  {letterHeadData?.lab_incharge_sign && (
                    <img
                      src={`${global.img_url}/images/letterHead/${letterHeadData?.lab_incharge_sign}`}
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </div>
                <hr />
                <p className="text-center m-0">
                  {letterHeadData?.lab_incharge_name}
                </p>
                <p className="text-center m-0">
                  {letterHeadData?.lab_incharge_designation}
                </p>
              </div>
              <div className="me-3">
                <div className="technician-sign-preview mb-2">
                  {letterHeadData?.doctor_sign && (
                    <img
                      src={`${global.img_url}/images/letterHead/${letterHeadData.doctor_sign}`}
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </div>
                <hr />
                <p className="text-center m-0">{letterHeadData?.doctor_name}</p>
                <p className="text-center m-0">
                  {letterHeadData?.doctor_designation}
                </p>
              </div>
            </div>
          ) : (
            <div className="justify-content-end d-flex">
              <h6 className="text-danger">Draft Report</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
