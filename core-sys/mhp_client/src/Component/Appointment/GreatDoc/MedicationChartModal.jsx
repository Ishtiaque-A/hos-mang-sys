import React, { useEffect, useRef, useState } from "react";
import { NewModal } from "../../../common/components/NewModal";
import Button from "../../../common/components/Button";
import moment from "moment";
import { getAge } from "../../../utils/getAge";
import { useReactToPrint } from "react-to-print";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
export default function MedicationChartModal({
  isOpen,
  onClose,
  appId,
  doctorId,
  patient,
  data,
}) {
  const handleCloseModal = () => {
    onClose();
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (isOpen) {
      axios.get(`get-given-dugs/${patient?.id}`).then((res) => {
        setHistory(res?.data?.drugs || []);
      });
    }
  }, [patient?.id, isOpen]);
  console.log(history, "history");
  return (
    <NewModal size="full" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Medication Chart</NewModal.Title>
        {/* <Button type="button" onClick={startRegister}>
            Add
          </Button> */}
      </NewModal.Header>
      {/* <form onSubmit={handleSubmit}> */}
      <NewModal.Body
        styles={{
          minHeight: "400px",
        }}
        className="modal-body-full"
      >
        <div
          className="card-header cns-container"
          style={{ background: "white" }}
        >
          <div
            id="v-pills-tab"
            role="tablist"
            className="nav nav-pills d-flex align-items-center"
            aria-orientation="horizontal"
          >
            <button
              class="nav-link text-start active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              History
            </button>
            <button
              class="nav-link text-start"
              id="v-pills-details-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-details"
              type="button"
              role="tab"
              aria-controls="v-pills-details"
              aria-selected="true"
            >
              Medication
            </button>
          </div>
        </div>
        <div id="v-pills-tabContent" class="tab-content">
          <div
            class="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <div className="discharge-header">
              <div className="text-center">
                <h3>Medication Chart</h3>
                <h4>As Required PRN Medicines</h4>
              </div>
              <div className="procedure-patient-head-container d-flex justify-content-between">
                <div>
                  <p>
                    <span className="procedure-patient-head">Name</span>
                    <span>: {patient?.fullName}</span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">DOB</span>
                    <span>
                      : {moment(patient?.patient_dob).format("DD/MM/YYYY")}
                    </span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">HN No</span>
                    <span>: {patient?.patient_hn_number}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="procedure-patient-head">Sex</span>
                    <span>: {patient?.patient_birth_sex?.birth_sex_name}</span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">Age</span>
                    <span>: {getAge(patient?.patient_dob)}</span>
                  </p>
                </div>
              </div>
              {history
                ?.filter((it) => it?.prn)
                ?.map((item, i) => (
                  <div
                    key={item?.id}
                    className={`medication-chart-table ${i === 0 && "mt-2"}`}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <span className="d-block">Drug Name</span>
                            <span className="d-block fw-bold">
                              {item?.brand_name}
                            </span>
                          </td>
                          <td>
                            <span className="d-block">Route</span>
                            <span className="d-block fw-bold">
                              {item?.route}
                            </span>
                          </td>
                          <td>
                            <div>
                              <span className="d-block">Dose</span>
                              <span className="d-block fw-bold">
                                {item?.dose}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="d-flex gap-2">
                                <div>
                                  <span className="d-block">Frequency</span>
                                  <span className="d-block fw-bold">
                                    {item?.frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {item?.history?.map((it) => (
                          <tr key={it?.id}>
                            <td>
                              <span className="d-block">Date</span>
                              <span className="d-block fw-bold">
                                {moment(it?.date).format("DD/MM/YYYY")}
                              </span>
                            </td>
                            <td>
                              <span className="d-block">Time</span>
                              <span className="d-block fw-bold">
                                {moment(it?.date).format("hh:mm A")}
                              </span>
                            </td>
                            <td>
                              <span className="d-block">Nurse</span>
                              <span className="d-block fw-bold">
                                {it?.nurse}
                              </span>
                            </td>
                            <td>
                              <span className="d-block">Contact</span>
                              <span className="d-block fw-bold">
                                {it?.mobile_number}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
            <div
              style={{
                pageBreakBefore: "always",
              }}
              className="mt-3 discharge-header"
            >
              <div className="text-center">
                <h3>Medication Chart</h3>
                <h4>Regular Medicines</h4>
              </div>
              <div className="procedure-patient-head-container d-flex justify-content-between">
                <div>
                  <p>
                    <span className="procedure-patient-head">Name</span>
                    <span>: {patient?.fullName}</span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">DOB</span>
                    <span>
                      : {moment(patient?.patient_dob).format("DD/MM/YYYY")}
                    </span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">HN No</span>
                    <span>: {patient?.patient_hn_number}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="procedure-patient-head">Sex</span>
                    <span>: {patient?.patient_birth_sex?.birth_sex_name}</span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">Age</span>
                    <span>: {getAge(patient?.patient_dob)}</span>
                  </p>
                </div>
              </div>
              {history
                ?.filter((it) => !it?.prn)
                ?.map((item, i) => (
                  <div
                    key={item?.id}
                    className={`medication-chart-table ${i === 0 && "mt-2"}`}
                  >
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <span className="d-block">Drug Name</span>
                            <span className="d-block fw-bold">
                              {item?.brand_name}
                            </span>
                          </td>
                          <td>
                            <span className="d-block">Route</span>
                            <span className="d-block fw-bold">
                              {item?.route}
                            </span>
                          </td>
                          <td>
                            <div>
                              <span className="d-block">Dose</span>
                              <span className="d-block fw-bold">
                                {item?.dose}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="d-flex gap-2">
                                <div>
                                  <span className="d-block">Frequency</span>
                                  <span className="d-block fw-bold">
                                    {item?.frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {item?.history?.map((it) => (
                          <tr key={it?.id}>
                            <td>
                              <span className="d-block">Date</span>
                              <span className="d-block fw-bold">
                                {moment(it?.date).format("DD/MM/YYYY")}
                              </span>
                            </td>
                            <td>
                              <span className="d-block">Time</span>
                              <span className="d-block fw-bold">
                                {moment(it?.date).format("hh:mm A")}
                              </span>
                            </td>
                            <td>
                              <span className="d-block">Nurse</span>
                              <span className="d-block fw-bold">
                                {it?.nurse}
                              </span>
                            </td>
                            <td>
                              <span className="d-block">Contact</span>
                              <span className="d-block fw-bold">
                                {it?.mobile_number}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-details"
            role="tabpanel"
            aria-labelledby="v-pills-details-tab"
          >
            <div ref={componentRef} style={{ margin: "20px" }}>
              <div className="discharge-header">
                <div className="text-center">
                  <h3>Medication Chart</h3>
                  <h4>As Required PRN Medicines</h4>
                </div>
                <div className="procedure-patient-head-container d-flex justify-content-between">
                  <div>
                    <p>
                      <span className="procedure-patient-head">Name</span>
                      <span>: {patient?.fullName}</span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">DOB</span>
                      <span>
                        : {moment(patient?.patient_dob).format("DD/MM/YYYY")}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">HN No</span>
                      <span>: {patient?.patient_hn_number}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="procedure-patient-head">Sex</span>
                      <span>
                        : {patient?.patient_birth_sex?.birth_sex_name}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">Age</span>
                      <span>: {getAge(patient?.patient_dob)}</span>
                    </p>
                  </div>
                </div>
                {data
                  ?.filter((it) => it?.prn)
                  ?.map((item, i) => (
                    <div
                      key={item?.id}
                      className={`medication-chart-table ${i === 0 && "mt-2"}`}
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span className="d-block">Date</span>
                              <span className="d-block fw-bold">
                                {moment(item?.created_at).format("DD/MM/YYYY")}
                              </span>
                            </td>
                            <td colSpan={3}>
                              <span className="d-block">Drug Name</span>
                              <span className="d-block fw-bold">
                                {item?.brand_name}
                              </span>
                            </td>
                            <td style={{ padding: 0 }} colSpan={6} rowSpan={4}>
                              <table className="medication-chart-inner-table">
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderLeft: "none",
                                      }}
                                      width={"35px"}
                                    >
                                      Date
                                    </td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td
                                      colSpan={1}
                                      rowSpan={5}
                                      width={"65px"}
                                      style={{
                                        borderTop: "none",
                                        borderRight: "none",
                                        borderBottom: "none",
                                        verticalAlign: "bottom",
                                      }}
                                    >
                                      <div className="vertical-text">
                                        <div>
                                          <span>Continue on discharge? </span>
                                          <span className="text-end">
                                            Yes / No
                                          </span>
                                        </div>
                                        <div className="ms-1">
                                          <span>Dispense? </span>
                                          <span className="text-end">
                                            Yes / No
                                          </span>
                                        </div>
                                        <div className="ms-1">
                                          <span>
                                            Duration? ........... days Qty
                                            ..........{" "}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{ borderLeft: "none" }}>Time</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td style={{ borderLeft: "none" }}>Dose</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td style={{ borderLeft: "none" }}>
                                      Route
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      style={{
                                        borderLeft: "none",
                                        borderBottom: "none",
                                      }}
                                    >
                                      Sign
                                    </td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="d-block">Route</span>
                              <span className="d-block fw-bold">
                                {item?.route}
                              </span>
                            </td>
                            <td>
                              <div>
                                <span className="d-block">Dose</span>
                                <span className="d-block fw-bold">
                                  {item?.dose}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div className="d-flex gap-2">
                                  <div>
                                    <span className="d-block">Frequency</span>
                                    <span className="d-block fw-bold">
                                      {item?.frequency}
                                    </span>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    verticalAlign: "bottom",
                                  }}
                                  className="text-end"
                                >
                                  <span
                                    style={{ fontSize: "11px" }}
                                    className="fw-bold"
                                  >
                                    PRN
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>Max PRN dose/24 hrs </td>
                          </tr>
                          <tr>
                            <td colSpan={4}>
                              <span className="d-block">Instruction</span>
                              <span className="d-block fw-bold">
                                {item?.Complex_instruction}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Prescriber signature</td>
                            <td colSpan={2}>
                              <span className="d-block">Prescriber Name</span>
                              <span className="d-block fw-bold">
                                {item?.appointment?.doctors?.fullName}
                              </span>
                            </td>
                            <td>Contact</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  pageBreakBefore: "always",
                }}
                className="mt-3 discharge-header"
              >
                <div className="text-center">
                  <h3>Medication Chart</h3>
                  <h4>Regular Medicines</h4>
                </div>
                <div className="procedure-patient-head-container d-flex justify-content-between">
                  <div>
                    <p>
                      <span className="procedure-patient-head">Name</span>
                      <span>: {patient?.fullName}</span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">DOB</span>
                      <span>
                        : {moment(patient?.patient_dob).format("DD/MM/YYYY")}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">HN No</span>
                      <span>: {patient?.patient_hn_number}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="procedure-patient-head">Sex</span>
                      <span>
                        : {patient?.patient_birth_sex?.birth_sex_name}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">Age</span>
                      <span>: {getAge(patient?.patient_dob)}</span>
                    </p>
                  </div>
                </div>
                {data
                  ?.filter((it) => !it?.prn)
                  ?.map((item, i) => (
                    <div
                      key={item?.id}
                      className={`medication-chart-table ${i === 0 && "mt-2"}`}
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td colSpan={4}>
                              <div className="d-flex justify-content-between">
                                <h6>Year : {moment().format("YYYY")}</h6>
                                <h6>
                                  Date and Month{" "}
                                  <span className="ms-3">
                                    <FaLongArrowAltRight
                                      style={{ fontSize: "36px" }}
                                    />
                                  </span>
                                </h6>
                              </div>
                            </td>
                            <td style={{ padding: 0 }} colSpan={6} rowSpan={7}>
                              <table className="medication-chart-inner-table">
                                <tbody>
                                  <tr>
                                    <td
                                      style={{
                                        borderTop: "none",
                                        borderLeft: "none",
                                      }}
                                      colSpan={2}
                                    ></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td style={{ borderTop: "none" }}></td>
                                    <td
                                      colSpan={1}
                                      rowSpan={7}
                                      width={"70px"}
                                      style={{
                                        borderTop: "none",
                                        borderRight: "none",
                                        borderBottom: "none",
                                        verticalAlign: "bottom",
                                      }}
                                    >
                                      <div className="vertical-text">
                                        <div>
                                          <span>Continue on discharge? </span>
                                          <span className="text-end">
                                            Yes / No
                                          </span>
                                        </div>
                                        <div className="ms-2">
                                          <span>Dispense? </span>
                                          <span className="text-end">
                                            Yes / No
                                          </span>
                                        </div>
                                        <div className="ms-2">
                                          <span>
                                            Duration? ........... days Qty
                                            ..........{" "}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{ borderLeft: "none" }}
                                    ></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{ borderLeft: "none" }}
                                    ></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{ borderLeft: "none" }}
                                    ></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{ borderLeft: "none" }}
                                    ></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{ borderLeft: "none" }}
                                    ></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={2}
                                      style={{
                                        borderLeft: "none",
                                        borderBottom: "none",
                                      }}
                                    ></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                    <td style={{ borderBottom: "none" }}></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="d-block">Date</span>
                              <span className="fw-bold">
                                {moment(item?.created_at).format("DD/MM/YYYY")}
                              </span>
                            </td>
                            <td colSpan={2}>
                              <span className="d-block">Drug Name</span>
                              <span className="fw-bold">
                                {item?.brand_name}
                              </span>
                            </td>
                            <td>Tick if slow release</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="d-block">Route</span>
                              <span className="d-block fw-bold">
                                {item?.route}
                              </span>
                            </td>
                            <td>
                              <div>
                                <span className="d-block">Dose</span>
                                <span className="d-block fw-bold">
                                  {item?.dose}
                                </span>
                              </div>
                            </td>
                            <td colSpan={2}>
                              <div>
                                <div className="d-flex gap-2">
                                  <div>
                                    <span className="d-block">Frequency</span>
                                    <span className="d-block fw-bold">
                                      {item?.frequency}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={4}>
                              <span className="d-block">Instruction</span>
                              <span className="d-block">
                                {item?.Complex_instruction}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>Prescriber signature</td>
                            <td colSpan={2}>
                              <span className="d-block">Prescriber Name</span>
                              <span className="fw-bold">
                                {item?.appointment?.doctors?.fullName}
                              </span>
                            </td>
                            <td>Contact</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </NewModal.Body>
      <NewModal.Footer>
        <button
          type="button"
          onClick={handleCloseModal}
          style={{ borderRadius: "5px" }}
          className="btn btn-sm btn-outline-danger"
        >
          Close
        </button>
        <Button onClick={handlePrint}>Print</Button>
      </NewModal.Footer>
      {/* </form> */}
    </NewModal>
  );
}
