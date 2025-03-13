import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import useUserData from "../../hooks/useUserData";
import { formateHN } from "../../utils/numberHelper";
import { getAge } from "../../utils/getAge";
export default function GreatLabTechnicainModalBackup(props) {
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
  const [doctorDetails, setDoctorDetails] = useState();
  useEffect(() => {
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
  const handlePrintTest = useReactToPrint({
    content: () => testRef.current,
  });

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
          <button onClick={handlePrintTest} className="btn">
            Print All
          </button>
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
          <div ref={testRef} className="bg-white mt-2 rounded p-1">
            {console.log(reports, "reports")}
            {reports &&
              reports.map((pd) => {
                return (
                  <>
                    <div className="mt-2 mb-3">
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

                      <div className="text-center">
                        <h6 className="text-uppercase">
                          {pd?.test_group} Report
                        </h6>
                      </div>
                      <div
                        style={{ border: "1px solid #000" }}
                        className="d-flex justify-content-between p-2 mb-2"
                      >
                        <div className="lab-report-details">
                          <p>
                            <span
                              style={{ width: "70px" }}
                              className="d-inline-block"
                            >
                              Invoice No
                            </span>
                            :
                            <span className="ms-1">
                              {invoiceDetails?.invoiceNo}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "70px" }}
                              className="d-inline-block"
                            >
                              Patient ID
                            </span>
                            :
                            <span className="ms-1">
                              {formateHN(patientDetails?.patient_hn_number)}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "70px" }}
                              className="d-inline-block"
                            >
                              Name
                            </span>
                            :
                            <span className="ms-1">
                              {patientDetails?.fullName}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "70px" }}
                              className="d-inline-block"
                            >
                              Date
                            </span>
                            :{" "}
                            <span className="ms-1">
                              {moment(invoiceDetails?.deliveryDate).format(
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="lab-report-details">
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              DOB
                            </span>
                            :
                            <span className="ms-1">
                              {moment(patientDetails?.patient_dob).format(
                                "DD/MM/YYYY"
                              ) === "Invalid date"
                                ? ""
                                : moment(patientDetails?.patient_dob).format(
                                    "DD/MM/YYYY"
                                  )}
                              &nbsp; ({getAge(patientDetails?.patient_dob)})
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Sex
                            </span>
                            :
                            <span className="ms-1">
                              {
                                patientDetails?.patient_birth_sex
                                  ?.birth_sex_name
                              }
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Reference By
                            </span>
                            : {console.log(invoiceDetails, "invoiceDetails")}
                            <span className="ms-1">
                              {invoiceDetails?.referredBy === "doctor"
                                ? doctorDetails?.fullName
                                : "Self"}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Specimen
                            </span>
                            : <span className="ms-1">Blood</span>
                          </p>
                        </div>
                        <div className="lab-report-details">
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Sample Date
                            </span>
                            :
                            <span className="ms-1">
                              {moment(
                                invoiceDetails?.sampleCollectionDate
                              ).format("DD/MM/YYYY hh:mm A")}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Report Date
                            </span>
                            :
                            <span className="ms-1">
                              {moment(pd?.updated_at).format(
                                "DD/MM/YYYY hh:mm A"
                              )}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Branch Name
                            </span>
                            :
                            <span className="ms-1">
                              {user?.isSuperAdmin ? "Admin" : user?.branch_name}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Branch ID
                            </span>
                            :
                            <span className="ms-1">
                              {user?.isSuperAdmin ? "Admin" : user?.branch_code}
                            </span>
                          </p>
                          <p>
                            <span
                              style={{ width: "110px" }}
                              className="d-inline-block"
                            >
                              Report Status
                            </span>
                            :{" "}
                            <span className="ms-1">
                              {Number(pd?.report_confirm) === 1
                                ? "Final"
                                : "Draft"}
                            </span>
                          </p>
                        </div>
                      </div>
                      {pd.test_group?.toLowerCase() === "pathology" && (
                        <>
                          <div className="lab-report-table">
                            {pd.details?.length > 0 && (
                              <table className="table table-borderless">
                                <tbody>
                                  <tr
                                    style={{
                                      border: "1px solid #000",
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
                                          style={{
                                            textDecoration: "underline",
                                            margin: 0,
                                          }}
                                        >
                                          {pd?.test_name}
                                        </h6>
                                      </div>
                                    </td>
                                  </tr>
                                  {pd?.test?.parameter_group?.map((test) => {
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
                                        {pd?.details
                                          ?.filter(
                                            (t) =>
                                              t.parameter_group_id == test?.id
                                          )
                                          .map((param) => {
                                            const normalParameterValue =
                                              param?.parameter[0]
                                                ?.parameter_value || [];
                                            return (
                                              <tr>
                                                <td>
                                                  <p
                                                    style={{
                                                      fontWeight: "500",
                                                      margin: 0,
                                                    }}
                                                  >
                                                    {param?.parameter_name}{" "}
                                                  </p>
                                                </td>
                                                <td style={{ width: "200px" }}>
                                                  <p
                                                    style={{
                                                      fontWeight: "500",
                                                      margin: 0,
                                                    }}
                                                  >
                                                    {param?.result}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p style={{ margin: 0 }}>
                                                    {param?.unit}
                                                  </p>
                                                </td>
                                                <td>{param?.flag}</td>
                                                <td>
                                                  {param?.lower_value} -{" "}
                                                  {param?.upper_value}
                                                </td>
                                                <td className="text-start">
                                                  {/* {
                                                      normalParameterValue?.find(
                                                        (pt) => {
                                                          return (
                                                            pt?.gender.toLowerCase() ===
                                                            patientDetails?.patient_birth_sex?.birth_sex_name?.toLowerCase()
                                                          );
                                                        }
                                                      )?.normal_value
                                                    } */}
                                                  <span
                                                    className="ms-1 d-inline-block"
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        normalParameterValue
                                                          ?.find((pt) => {
                                                            return (
                                                              pt?.gender.toLowerCase() ===
                                                              patientDetails?.patient_birth_sex?.birth_sex_name?.toLowerCase()
                                                            );
                                                          })
                                                          ?.normal_value?.replace(
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
                                </tbody>
                              </table>
                            )}

                            <h6>Impression : </h6>
                            <p className="mt-3 ms-5">{pd.remark}</p>
                          </div>
                        </>
                      )}
                      {pd.test_group?.toLowerCase() === "radiology" && (
                        <>
                          {
                            <div
                              dangerouslySetInnerHTML={{
                                __html: pd?.radiologyReportDetails,
                              }}
                              className="mt-2"
                            ></div>
                          }
                        </>
                      )}
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
                          <p className="text-center m-0">
                            {letterHeadData?.doctor_name}
                          </p>
                          <p className="text-center m-0">
                            {letterHeadData?.doctor_designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
