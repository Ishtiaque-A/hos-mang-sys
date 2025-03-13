import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import useUserData from "../../hooks/useUserData";
import { formateHN } from "../../utils/numberHelper";
import { getAge } from "../../utils/getAge";
import "./LabModule.css";
export default function GreatLabTechnicainModal(props) {
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
  const user = useUserData();
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  const { reports, patient } = props.testInfo;
  const { invoiceDetails } = props;
  const [patientDetails, setPatientDetails] = useState({});
  const [groupReport, setGroupReport] = useState([]);
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
  const [letterHeadData, setLetterHeadData] = useState({ ...emptyLetterHead });
  const [centerDetails, setCenterDetails] = useState();
  const [doctorDetails, setDoctorDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (patient?.id) {
      axios
        .get(`edit-patients/${patient?.id}`)
        .then((res) => setPatientDetails(res.data.patient));
    }
    axios.get("lab-center-details").then((res) => {
      setCenterDetails(res?.data?.center);
    });
    axios.get("/lab-center-letter-head").then((res) => {
      if (res.status === 200) {
        setLetterHeadData(res.data.letter_head);
      }
    });
    axios
      .get(`/great-lab-report-by-invoice/${invoiceDetails?.id}`)
      .then((res) => {
        if (res.status === 200) {
          setGroupReport(res.data?.report);
          setLoading(false);
        }
      });
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
  }, [patient, invoiceDetails]);

  const testRef = useRef();

  const [reportPrint, setReportPrint] = useState([]);
  const [singlePrint, setSinglePrint] = useState({});
  const handleCheckbox = (e, i, j) => {
    const existing = [...groupReport];
    const { checked } = e.target;
    existing[i]["tests"][j]["print"] = checked;
    setGroupReport(existing);
  };
  const handleCheckboxAll = (e, i, j) => {
    const existing = [...groupReport];
    const { checked } = e.target;
    existing[i]["tests"]?.map((item) => (item["print"] = checked));
    setGroupReport(existing);
  };

  const handlePrintTest = useReactToPrint({
    content: () => testRef.current,
  });
  const testRefSingle = useRef();
  const handlePrintTestSingle = useReactToPrint({
    content: () => testRefSingle.current,
  });
  const printAll = (item) => {
    setReportPrint(item);
    setTimeout(() => handlePrintTest(), 500);
  };
  const printSingle = (item) => {
    setSinglePrint(item);
    setTimeout(() => handlePrintTestSingle(), 500);
  };
  const specimenName = invoiceDetails?.tests?.find(
    (test) => test?.specimen_name !== null
  )?.specimen_name;

  return (
    <Modal
      isOpen={props.reportViewModal}
      onRequestClose={props.closeReportViewModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="d-flex justify-content-between">
        <h6 className="card-title">All Test Report</h6>
        <div className="rx-one-button-group">
          <span
            className="float-end ms-3"
            style={{ fontSize: "15px", cursor: "pointer" }}
            onClick={props.closeReportViewModal}
          >
            <i class="fal fa-times"></i>
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="ms-2">
          {loading && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {groupReport?.length > 0 && !loading && (
            <>
              {groupReport?.map((item, i) => {
                return (
                  <div key={i} className="mt-3">
                    <table className="past_rx_table_technician">
                      <thead>
                        <tr>
                          <th className="text-start" colSpan={3}>
                            <h6>{item?.category}</h6>
                          </th>
                          <th className="">
                            <div className="rx-one-button-group">
                              <button
                                onClick={() => printAll(item)}
                                className="btn"
                              >
                                Print All
                              </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: "5%" }}>
                            <input
                              type="checkbox"
                              className="form-check"
                              style={{
                                textAlign: "center",
                                margin: "0 auto",
                              }}
                              name=""
                              id=""
                              onChange={(e) => handleCheckboxAll(e, i)}
                            />
                          </th>
                          <th style={{ width: "15%" }} scope="col">
                            Date
                          </th>
                          <th
                            className="text-start"
                            style={{ width: "60%" }}
                            scope="col"
                          >
                            Test Name
                          </th>
                          <th style={{ width: "10%" }} scope="col">
                            View
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item?.tests?.length > 0 &&
                          item?.tests?.map((pd, j) => {
                            return (
                              <tr key={j}>
                                <td
                                  style={{
                                    width: "5%",
                                    textAlign: "center",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    className="form-check"
                                    style={{
                                      textAlign: "center",
                                      margin: "0 auto",
                                    }}
                                    name=""
                                    id=""
                                    checked={pd?.print}
                                    onChange={(e) => handleCheckbox(e, i, j)}
                                  />
                                </td>
                                <td style={{ width: "15%" }}>
                                  {moment(pd?.created_at).format("DD/MM/YYYY")}
                                </td>
                                <td
                                  className="text-start"
                                  style={{ width: "60%" }}
                                >
                                  {pd?.test_name}
                                </td>
                                <td style={{ width: "10%" }}>
                                  <i
                                    onClick={() => printSingle(pd)}
                                    className="fa-solid fa-eye"
                                    style={{
                                      cursor: "pointer",
                                      color: "#69B128",
                                      fontSize: "16px",
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </>
          )}

          <div
            ref={testRef}
            // style={{ display: "block" }}
            className="great-lab-print-report bg-white rounded p-1"
          >
            <>
              <div
                style={{
                  marginLeft: "50px",
                  marginRight: "35px",
                  // marginTop: "45px",
                }}
                className=""
              >
                {letterHeadData?.hide_report_header === 0 ? (
                  <div
                    style={{ borderBottom: "1px solid #000" }}
                    className="d-flex justify-content-between"
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
                        Center Name: {user?.organization_name}{" "}
                        {user?.isSuperAdmin ? "" : user?.branch_code}
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
                ) : (
                  <div style={{ height: "1.5in" }}></div>
                )}

                <div className="text-center">
                  <h6 className="text-uppercase fw-bold mb-0">
                    {reportPrint?.category}
                  </h6>
                </div>

                <div
                  // style={{ border: "1px solid #000" }}
                  className="p-1 px-1"
                >
                  <div className="d-flex justify-content-between">
                    <div className="lab-report-details">
                      <p>
                        <span
                          style={{ width: "92px" }}
                          className="d-inline-block"
                        >
                          Invoice No
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {invoiceDetails?.invoiceNo}
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ width: "92px" }}
                          className="d-inline-block"
                        >
                          Invoice Date
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(invoiceDetails?.deliveryDate).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </p>
                      {/* <p>
                        <span
                          style={{ width: "90px" }}
                          className="d-inline-block"
                        >
                          Patient Name
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {patientDetails?.fullName}
                        </span>
                      </p> */}
                    </div>
                    <div className="lab-report-details">
                      <p>
                        <span
                          style={{ width: "65px" }}
                          className="d-inline-block text-end me-1"
                        >
                          DOB
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(patientDetails?.patient_dob).format(
                            "DD/MM/YYYY"
                          ) === "Invalid date"
                            ? ""
                            : moment(patientDetails?.patient_dob).format(
                                "DD/MM/YYYY"
                              )}
                          &nbsp; ({getAge(patientDetails?.patient_dob)}
                          <span></span> )
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ width: "65px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Sex
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {patientDetails?.patient_birth_sex?.birth_sex_name}
                        </span>
                      </p>
                    </div>
                    <div className="lab-report-details">
                      <p>
                        <span
                          style={{ width: "90px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Sample Date
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(invoiceDetails?.sampleCollectionDate).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ width: "90px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Report Date
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(reportPrint?.updated_at).format("DD/MM/YYYY")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="lab-report-details d-flex w-100">
                    <div className="d-flex w-75">
                      <div>
                        <p style={{ width: "96px" }}>
                          <span
                            style={{ width: "92px" }}
                            className="d-inline-block"
                          >
                            Patient Name
                          </span>
                          :
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="ms-1 invoice-details-value">
                            {patientDetails?.fullName}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-25">
                      <p>
                        <span
                          style={{ width: "90px", marginLeft: "-34px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Specimen
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {specimenName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="lab-report-details d-flex w-100">
                    <div>
                      <p style={{ width: "96px" }}>
                        <span
                          style={{ width: "92px" }}
                          className="d-inline-block"
                        >
                          Referred By
                        </span>
                        :
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="ms-1 invoice-details-value">
                          {invoiceDetails?.referrer
                            ? `${doctorDetails?.title?.title_name || ""} ${
                                doctorDetails?.fullName || ""
                              }  ${doctorDetails?.academic
                                ?.map((item) => item?.degree_id)
                                .join(",")}`
                            : "Self"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {reportPrint?.group?.toLowerCase() === "pathology" && (
                  <>
                    <div
                      style={{ minHeight: "6in" }}
                      className="lab-report-table"
                    >
                      {reportPrint?.tests?.length > 0 && (
                        <table className="great-lab-result-print-table">
                          <tbody>
                            <tr
                              style={{
                                border: "1px solid #000",
                              }}
                            >
                              <td
                                className="fw-bold py-1 ps-1"
                                style={{ width: "42%" }}
                              >
                                <span className="ms-1">Test Name</span>
                              </td>
                              <td className="fw-bold py-1">Result</td>
                              <td className="fw-bold py-1">Unit</td>
                              <td className="fw-bold py-1">Normal Value</td>
                            </tr>
                            <tr>
                              <td colSpan={5}>
                                <div className="mt-2"></div>
                              </td>
                            </tr>
                            {reportPrint?.tests
                              ?.filter((pt) => pt?.print === true)
                              ?.map((pd) => {
                                return (
                                  <>
                                    {Number(pd?.test_only?.hide_test_name) ===
                                    1 ? null : (
                                      <tr>
                                        <td colSpan={5}>
                                          <div className="">
                                            <h6
                                              className="text-uppercase "
                                              style={{
                                                marginBottom: "5px",
                                                fontSize: "15px",
                                              }}
                                            >
                                              {pd?.test_name}
                                            </h6>
                                          </div>
                                        </td>
                                      </tr>
                                    )}

                                    {pd?.parameter_group?.map((test) => {
                                      return (
                                        <>
                                          {Number(test?.hidden) === 1 ? null : (
                                            <tr>
                                              <td
                                                colSpan={5}
                                                style={{
                                                  margin: 0,
                                                }}
                                              >
                                                <h6
                                                  style={{
                                                    marginLeft: "10px",
                                                    fontSize: "14px",
                                                    marginBottom: "1px",
                                                  }}
                                                >
                                                  {test?.group_name}
                                                </h6>
                                              </td>
                                            </tr>
                                          )}

                                          {pd?.details
                                            ?.filter(
                                              (t) =>
                                                t.parameter_group_id == test?.id
                                            )
                                            .map((param) => {
                                              return (
                                                <tr
                                                  key={param?.id}
                                                  className="report-table-row"
                                                >
                                                  <td>
                                                    <p
                                                      style={{
                                                        fontWeight:
                                                          Number(
                                                            pd?.test_only
                                                              ?.hide_test_name
                                                          ) === 1
                                                            ? "600"
                                                            : "400",
                                                        fontSize: "13px",
                                                        marginLeft: "17px",
                                                        marginBottom: "1px",
                                                      }}
                                                    >
                                                      {param?.parameter_name}
                                                    </p>
                                                  </td>
                                                  <td
                                                    style={{
                                                      width: "110px",
                                                    }}
                                                  >
                                                    <p
                                                      style={{
                                                        fontWeight: "700",
                                                        margin: 0,
                                                        fontSize: "13px",
                                                      }}
                                                    >
                                                      {param?.result}
                                                    </p>
                                                  </td>
                                                  <td
                                                    style={{
                                                      width: "85px",
                                                    }}
                                                    className="p"
                                                  >
                                                    <p style={{ margin: 0 }}>
                                                      {param?.unit}
                                                    </p>
                                                  </td>

                                                  <td className="text-start">
                                                    <span
                                                      style={{
                                                        fontSize: "13px",
                                                        lineHeight: "1.2",
                                                      }}
                                                      className="ms-1 d-inline-block"
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          param?.parameter?.reference_value?.replace(
                                                            /\n/g,
                                                            "<br>"
                                                          ),
                                                      }}
                                                    ></span>
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                        </>
                                      );
                                    })}
                                  </>
                                );
                              })}
                          </tbody>
                        </table>
                      )}

                      {/* <h6>Impression : </h6>
                      <p className="mt-3 ms-5">{pd.remark}</p> */}
                    </div>
                  </>
                )}
                {reportPrint?.group?.toLowerCase() === "radiology" && (
                  <>
                    {
                      // <div
                      //   dangerouslySetInnerHTML={{
                      //     __html: pd?.radiologyReportDetails,
                      //   }}
                      //   className="mt-2"
                      // ></div>
                    }
                  </>
                )}
                <div className="lab-report-print-footer">
                  <div
                    style={{
                      margin: "25px 0px",
                    }}
                    className="d-flex gap-4 justify-content-between"
                  >
                    <div className="me-3">
                      <hr />
                      <p className="text-center1 m-0">
                        {letterHeadData?.preferred_name}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            letterHeadData?.preferred_designation?.replace(
                              /\n/g,
                              "<br>"
                            ),
                        }}
                        className="text-center1 m-0"
                      ></p>
                    </div>
                    <div className="me-3">
                      <hr />
                      <p className="text-center1 m-0">
                        {letterHeadData?.lab_incharge_name}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            letterHeadData?.lab_incharge_designation?.replace(
                              /\n/g,
                              "<br>"
                            ),
                        }}
                        className="text-center1 m-0"
                      ></p>
                    </div>
                    <div className="me-3">
                      <hr />
                      <p className="text-center1 m-0">
                        {letterHeadData?.doctor_name}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: letterHeadData?.doctor_designation?.replace(
                            /\n/g,
                            "<br>"
                          ),
                        }}
                        className="text-center1 m-0"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
          {/* single report  */}
          <div
            ref={testRefSingle}
            // style={{ display: "block", width: "8.3in" }}
            className="great-lab-print-report lab-report-main-content bg-white rounded"
          >
            <>
              <div
                style={{
                  marginLeft: "50px",
                  marginRight: "35px",
                  // marginTop: "45px",
                }}
              >
                {/* report header */}
                {letterHeadData?.hide_report_header === 0 ? (
                  <div
                    style={{ borderBottom: "1px solid #000" }}
                    className="d-flex justify-content-between"
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
                        Center Name: {user?.organization_name}{" "}
                        {user?.isSuperAdmin ? "" : user?.branch_code}
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
                ) : (
                  <div style={{ height: "1.5in" }}></div>
                )}
                <div className="text-center mt-3">
                  <h6 className="text-uppercase fw-bold mb-0">
                    {singlePrint?.test_category}
                  </h6>
                </div>

                <div
                  // style={{ border: "1px solid #000" }}
                  className="p-1 px-1"
                >
                  <div className="d-flex justify-content-between">
                    <div className="lab-report-details">
                      <p>
                        <span
                          style={{ width: "92px" }}
                          className="d-inline-block"
                        >
                          Invoice No
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {invoiceDetails?.invoiceNo}
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ width: "92px" }}
                          className="d-inline-block"
                        >
                          Invoice Date
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(invoiceDetails?.deliveryDate).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </p>
                      {/* <p>
                        <span
                          style={{ width: "90px" }}
                          className="d-inline-block"
                        >
                          Patient Name
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {patientDetails?.fullName}
                        </span>
                      </p> */}
                    </div>
                    <div className="lab-report-details">
                      <p>
                        <span
                          style={{ width: "65px" }}
                          className="d-inline-block text-end me-1"
                        >
                          DOB
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(patientDetails?.patient_dob).format(
                            "DD/MM/YYYY"
                          ) === "Invalid date"
                            ? ""
                            : moment(patientDetails?.patient_dob).format(
                                "DD/MM/YYYY"
                              )}
                          &nbsp; ({getAge(patientDetails?.patient_dob)}
                          <span></span> )
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ width: "65px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Sex
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {patientDetails?.patient_birth_sex?.birth_sex_name}
                        </span>
                      </p>
                    </div>
                    <div className="lab-report-details">
                      <p>
                        <span
                          style={{ width: "90px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Sample Date
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(invoiceDetails?.sampleCollectionDate).format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </span>
                      </p>
                      <p>
                        <span
                          style={{ width: "90px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Report Date
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {moment(reportPrint?.updated_at).format("DD/MM/YYYY")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="lab-report-details d-flex w-100">
                    <div className="d-flex w-75">
                      <div>
                        <p style={{ width: "96px" }}>
                          <span
                            style={{ width: "92px" }}
                            className="d-inline-block"
                          >
                            Patient Name
                          </span>
                          :
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="ms-1 invoice-details-value">
                            {patientDetails?.fullName}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex w-25">
                      <p>
                        <span
                          style={{ width: "90px", marginLeft: "-55px" }}
                          className="d-inline-block text-end me-1"
                        >
                          Specimen
                        </span>
                        :
                        <span className="ms-1 invoice-details-value">
                          {specimenName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="lab-report-details d-flex w-100">
                    <div>
                      <p style={{ width: "96px" }}>
                        <span
                          style={{ width: "92px" }}
                          className="d-inline-block"
                        >
                          Referred By
                        </span>
                        :
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="ms-1 invoice-details-value">
                          {invoiceDetails?.referrer
                            ? `${doctorDetails?.title?.title_name || ""} ${
                                doctorDetails?.fullName || ""
                              }  ${doctorDetails?.academic
                                ?.map((item) => item?.degree_id)
                                .join(",")}`
                            : "Self"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {singlePrint?.test_group?.toLowerCase() === "pathology" && (
                  <>
                    <div
                      style={{ minHeight: "6in" }}
                      className="lab-report-table "
                    >
                      <table className="great-lab-result-print-table">
                        <tbody>
                          <tr
                            style={{
                              border: "1px solid #000",
                            }}
                          >
                            <td
                              className="fw-bold py-1 ps-1"
                              style={{ width: "42%" }}
                            >
                              <span className="ms-1">Test Name</span>
                            </td>
                            <td className="fw-bold py-1">Result</td>
                            <td className="fw-bold py-1">Unit</td>
                            <td className="fw-bold py-1">Reference Value</td>
                          </tr>
                          <>
                            {Number(singlePrint?.test_only?.hide_test_name) ===
                            1 ? (
                              <div className="mt-2"></div>
                            ) : (
                              <tr>
                                <td colSpan={5}>
                                  <div className="mt-2">
                                    <h6
                                      className="text-uppercase "
                                      style={{
                                        marginBottom: "3px",
                                        fontSize: "15px",
                                      }}
                                    >
                                      {singlePrint?.test_name}
                                    </h6>
                                  </div>
                                </td>
                              </tr>
                            )}

                            {singlePrint?.parameter_group?.map((test) => {
                              return (
                                <>
                                  {Number(test?.hidden) === 1 ? null : (
                                    <tr>
                                      <td
                                        colSpan={5}
                                        style={{
                                          margin: 0,
                                        }}
                                      >
                                        <h6
                                          style={{
                                            marginLeft: "10px",
                                            fontSize: "14px",
                                            marginBottom: "1px",
                                          }}
                                        >
                                          {test?.group_name}
                                        </h6>
                                      </td>
                                    </tr>
                                  )}

                                  {singlePrint?.details
                                    ?.filter(
                                      (t) => t.parameter_group_id == test?.id
                                    )
                                    .map((param) => {
                                      return (
                                        <tr
                                          className="report-table-row"
                                          key={param?.id}
                                        >
                                          <td>
                                            <p
                                              style={{
                                                fontWeight:
                                                  Number(
                                                    singlePrint?.test_only
                                                      ?.hide_test_name
                                                  ) === 1
                                                    ? "600"
                                                    : "400",
                                                fontSize: "13px",
                                                marginLeft:
                                                  Number(
                                                    singlePrint?.test_only
                                                      ?.hide_test_name
                                                  ) === 1
                                                    ? "0px"
                                                    : "17px",
                                                marginBottom: "1px",
                                              }}
                                            >
                                              {param?.parameter_name}{" "}
                                            </p>
                                          </td>
                                          <td
                                            style={{
                                              width: "100px",
                                            }}
                                          >
                                            <p
                                              style={{
                                                fontWeight: "700",
                                                margin: 0,
                                                fontSize: "13px",
                                              }}
                                            >
                                              {param?.result}
                                            </p>
                                          </td>
                                          <td>
                                            <p
                                              style={{
                                                width: "80px",
                                              }}
                                              className="p"
                                            >
                                              {param?.unit}
                                            </p>
                                          </td>

                                          <td className="text-start">
                                            <span
                                              style={{
                                                fontSize: "13px",
                                                lineHeight: "1.2",
                                              }}
                                              className="ms-1 d-inline-block"
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  param?.parameter?.reference_value?.replace(
                                                    /\n/g,
                                                    "<br>"
                                                  ),
                                              }}
                                            ></span>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </>
                              );
                            })}
                          </>
                        </tbody>
                      </table>

                      {singlePrint?.remark && (
                        <>
                          <h6>Impression : </h6>
                          <p className="mt-3 ms-5">{singlePrint?.remark}</p>
                        </>
                      )}
                    </div>
                  </>
                )}
                {singlePrint?.group?.toLowerCase() === "radiology" && (
                  <>
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: singlePrint?.radiologyReportDetails,
                        }}
                        className="mt-2"
                      ></div>
                    }
                  </>
                )}
                <div className="lab-report-print-footer">
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                    className="d-flex gap-4 justify-content-between"
                  >
                    <div className="me-3">
                      <hr />
                      <p className="text-center1 m-0">
                        {letterHeadData?.preferred_name}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            letterHeadData?.preferred_designation?.replace(
                              /\n/g,
                              "<br>"
                            ),
                        }}
                        className="text-center1 m-0"
                      ></p>
                    </div>
                    <div className="me-3">
                      <hr />
                      <p className="text-center1 m-0">
                        {letterHeadData?.lab_incharge_name}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            letterHeadData?.lab_incharge_designation?.replace(
                              /\n/g,
                              "<br>"
                            ),
                        }}
                        className="text-center1 m-0"
                      ></p>
                    </div>
                    <div className="me-3">
                      <hr />
                      <p className="text-center1 m-0">
                        {letterHeadData?.doctor_name}
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: letterHeadData?.doctor_designation?.replace(
                            /\n/g,
                            "<br>"
                          ),
                        }}
                        className="text-center1 m-0"
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </Modal>
  );
}
