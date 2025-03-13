import React, { useRef, useState } from "react";
import { NewModal as ReactModal } from "../../../common/components/NewModal";
import moment from "moment";
import { getAge } from "../../../utils/getAge";
import { useReactToPrint } from "react-to-print";
export default function DischargeSummaryHistory({ dischargeSummary }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({});
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const storageData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      <div className="past-history-table past-visit-table g-doc-scroll">
        {dischargeSummary?.length > 0 ? (
          <table className="past_rx_table">
            <thead>
              <tr>
                <th width={"20%"} scope="col">
                  Date
                </th>
                <th scope="col">Doctor</th>
                <th width={"15%"} scope="col">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {dischargeSummary?.length > 0 &&
                dischargeSummary?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
                      <td>{item?.general_practitioner}</td>
                      <td>
                        <i
                          onClick={(e) => {
                            setData(item);
                            setModalIsOpen(true);
                          }}
                          className="fa-solid fa-eye"
                          style={{
                            cursor: "pointer",
                            color: "#69B128",
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-lg-5 mt-lg-2 text-danger">
            Records are not available
          </p>
        )}
        <ReactModal size="lg" isOpen={modalIsOpen} onClose={closeModal}>
          <ReactModal.Header onClose={closeModal}>
            <ReactModal.Title>Discharge Report</ReactModal.Title>
          </ReactModal.Header>
          <ReactModal.Body>
            <div
              style={{ display: "block" }}
              className="procedure-report-container-print"
              ref={componentRef}
            >
              <div
                style={{ minHeight: "11in" }}
                className="procedure-main-content"
              >
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <h3>{storageData?.organization_name}</h3>
                    <h4>Discharge Summary(Confidential)</h4>
                  </div>
                </div>
                <div className="procedure-patient-head-container d-flex justify-content-between">
                  <div>
                    <p>
                      <span className="procedure-patient-head">Name</span>
                      <span>: {data?.patient?.fullName}</span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">DOB</span>
                      <span>
                        :{" "}
                        {moment(data?.patient?.patient_dob).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">HN No</span>
                      <span>: {data?.patient?.patient_hn_number}</span>
                    </p>
                    {/* <p>
                <span className="procedure-patient-head">Ward</span>
                <span>: {data?.ward}</span>
              </p> */}
                  </div>
                  <div>
                    <p>
                      <span className="procedure-patient-head">Sex</span>
                      <span>
                        : {data?.patient?.patient_birth_sex?.birth_sex_name}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">Age</span>
                      <span>: {getAge(data?.patient?.patient_dob)}</span>
                    </p>
                    {/* <p>
                <span className="procedure-patient-head">Bed</span>
                <span>: {data?.bed}</span>
              </p> */}
                  </div>
                </div>
                <div className="row my-1">
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          General Practitioner
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          :
                          {
                            <span
                              className="ms-1"
                              dangerouslySetInnerHTML={{
                                __html: data?.general_practitioner?.replace(
                                  /\n/g,
                                  "<br>"
                                ),
                              }}
                            ></span>
                          }
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Admitting Doctor
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          : {data?.admitting_doctor}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Admitting Doctor Phone
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          : {data?.admitting_doctor_phone}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Chief Complaint
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          : {data?.chief_compliant?.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Admission Date
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          : {moment(data?.admissionDate).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Discharge Date
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          : {moment(data?.discharge_date).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Discharge To
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          : {data?.discharge_to}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ borderTop: "1px dashed #000" }}
                  className="row mt-1"
                >
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          History
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          :
                          {
                            <span
                              className="ms-1"
                              dangerouslySetInnerHTML={{
                                __html: data?.history?.replace(/\n/g, "<br>"),
                              }}
                            ></span>
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ borderTop: "1px dashed #000" }}
                  className="row mt-1"
                >
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Investigation
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          :{data?.investigation?.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Diagnosis
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          :{data?.diagnosis?.toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Medication List
                        </span>
                      </div>
                      <div className="col-9">:</div>
                    </div>
                  </div>
                  <table className="past_rx_table">
                    <thead style={{ backgroundColor: "#fff" }}>
                      <tr>
                        <th scope="col">Brand</th>
                        <th scope="col">Drug</th>
                        <th scope="col">Dose</th>
                        <th scope="col">Frequency</th>
                        <th scope="col">Instruction</th>
                        <th scope="col">PRN</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Repeats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.medication?.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item?.drug_name}</td>
                            <td>{item?.drug_description}</td>
                            <td>
                              {item?.Complex_instruction ? "" : item?.dose}
                            </td>
                            <td>
                              {item?.Complex_instruction ? "" : item?.frequency}
                            </td>
                            <td>
                              {item?.Complex_instruction
                                ? item?.Complex_instruction
                                : ""}
                            </td>
                            <td>{item?.prn ? item.prn : ""}</td>
                            <td>{item?.qty}</td>
                            <td>{item?.repeat}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="row mt-1">
                  <h6>Advice</h6>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Pain Relief
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.pain_relief}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Exercise
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.exercise}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Wound Care
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.wound_care}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Recommendation
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.recommendation}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Hygiene
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.hygiene}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Dressing
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.dressing}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Diet
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value"> : {data?.diet}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <span className="fw-bold operation-details-header">
                          Follow Up
                        </span>
                      </div>
                      <div className="col-9">
                        <span className="operation-value">
                          {" "}
                          : {data?.follow_up}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ visibility: "hidden" }}
                className="procedure-report-footer mb-4"
              >
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <div className="text-center">
                        <div
                          style={{
                            height: "1px",
                            width: "150px",
                            borderTop: "1px solid black",
                          }}
                        ></div>
                        <span className="fw-bold operation-details-header">
                          Surgeon
                        </span>
                        <p className="mt-2"></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <div className="text-center">
                        <div
                          style={{
                            height: "1px",
                            width: "150px",
                            borderTop: "1px solid black",
                          }}
                        ></div>
                        <span className="fw-bold operation-details-header">
                          Anesthesia
                        </span>
                        <p className="mt-2">{data?.anesthetist}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-center">
                      <div className="text-center">
                        <div
                          style={{
                            height: "1px",
                            width: "150px",
                            borderTop: "1px solid black",
                          }}
                        ></div>
                        <span className="fw-bold operation-details-header">
                          Assistant Surgeon
                        </span>
                        <p className="mt-2">{data?.assistantSurgeon}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* procedure report  */}
              <div
                style={{ pageBreakBefore: "always" }}
                className="procedure-report-container-print"
              >
                <div className="procedure-main-content">
                  <div className="d-flex justify-content-center procedure-print-head">
                    <div className="text-center">
                      <h3>{storageData?.organization_name}</h3>
                      <h4>Operation Report</h4>
                    </div>
                  </div>
                  <div className="procedure-patient-head-container d-flex justify-content-between">
                    <div>
                      <p>
                        <span className="procedure-patient-head">Name</span>
                        <span>: {data?.patient?.fullName}</span>
                      </p>
                      <p>
                        <span className="procedure-patient-head">DOB</span>
                        <span>
                          :
                          <span className="ms-1">
                            {moment(data?.patient?.patient_dob).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                        </span>
                      </p>
                      <p>
                        <span className="procedure-patient-head">HN No</span>
                        <span>: {data?.patient?.patient_hn_number}</span>
                      </p>
                      <p>
                        <span className="procedure-patient-head">Ward</span>
                        <span>: {data?.procedure?.ward}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="procedure-patient-head">Sex</span>
                        <span>
                          : {data?.patient?.patient_birth_sex?.birth_sex_name}
                        </span>
                      </p>
                      <p>
                        <span className="procedure-patient-head">Age</span>
                        <span>: {getAge(data?.patient?.patient_dob)}</span>
                      </p>
                      <p>
                        <span className="procedure-patient-head">Bed</span>
                        <span>: {data?.procedure?.bed}</span>
                      </p>
                    </div>
                  </div>
                  <div className="row my-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Procedure Date
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            :
                            <span className="ms-1">
                              {moment(
                                new Date(
                                  parseInt(data?.procedure?.procedure_date)
                                ).toString()
                              ).format("DD/MM/YYYY")}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Item Numbers
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            <span className="operation-value">
                              : {data?.procedure?.item_number}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Department
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.department}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Indication
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.indication}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Procedure
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.procedure}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Findings
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.findings}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px dashed #000" }}>
                    <h6 className="mt-2">Procedure Details</h6>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Incision
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.incision}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Pathology
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.pathology}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Drain
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.drain}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Antibiotics
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.antibiotics}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Blood Loss(ml)
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.blood_loss}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="procedure_report_box">
                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <div className="col-2">
                            <span className="fw-bold operation-details-header">
                              Process
                            </span>
                          </div>
                          <div className="col-10">
                            <span className="operation-value">
                              : {data?.procedure?.process}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col-2">
                            <span className="fw-bold operation-details-header">
                              Patient Position
                            </span>
                          </div>
                          <div className="col-10">
                            <span className="operation-value">
                              : {data?.procedure?.patient_position}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {data?.procedure?.process_details && (
                      <p className="mt-2">
                        <b>Process Details:</b>{" "}
                        {data?.procedure?.process_details}
                      </p>
                    )}
                  </div>

                  <div style={{ borderTop: "1px dashed #000" }}>
                    <h6 className="mt-2">Post Operative Orders</h6>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Observation
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.observation}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Diet
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            {" "}
                            : {data?.procedure?.diet}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Analgesia
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.analgesia}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            DVT Prop
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.dvt_prop}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Antibiotics
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.antibiotics_two}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Discharge
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.discharge}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Follow Up
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.followup}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-2">
                          <span className="fw-bold operation-details-header">
                            Post Operative Instruction
                          </span>
                        </div>
                        <div className="col-10">
                          <span className="operation-value">
                            : {data?.procedure?.post_operative}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mt-2">
                      Electronically Signed By:{" "}
                      {data?.procedure?.doctor?.fullName}
                      <span className="ms-2">
                        {moment().format("Do MMMM YYYY, h:mm:ss a")}
                      </span>
                    </p>
                    <small>
                      CAUTION:This message may contain both confidential and
                      privileged information intended only for the addresses
                      named above.If you are not intended recipient you are
                      hereby notified that any dissemination,distribution or
                      reproduction of this message is prohibited.If you have
                      received this this message in error please notify the
                      sender immediately,then destroy the original message.Any
                      views expressed in this message are solely those of the
                      individual.
                    </small>
                  </div>
                </div>
                <div
                  style={{ borderTop: "1px dashed black" }}
                  className="procedure-report-footer mt-4"
                >
                  <div className="row mt-3">
                    <div className="col-4">
                      <div className="d-flex justify-content-center">
                        <div className="text-center">
                          <span className="fw-bold operation-details-header">
                            Surgeon
                          </span>
                          <p className="mt-2">{data?.procedure?.surgeon}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-center">
                        <div className="text-center">
                          <span className="fw-bold operation-details-header">
                            Anesthetist
                          </span>
                          <p className="mt-2">{data?.procedure?.anesthetist}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-center">
                        <div className="text-center">
                          <span className="fw-bold operation-details-header">
                            Assistant Surgeon
                          </span>
                          <p className="mt-2">
                            {data?.procedure?.assistant_surgeon}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ReactModal.Body>
          <ReactModal.Footer>
            <button className="report-save-btn2" onClick={handlePrint}>
              Print
            </button>
          </ReactModal.Footer>
        </ReactModal>
      </div>
    </>
  );
}
