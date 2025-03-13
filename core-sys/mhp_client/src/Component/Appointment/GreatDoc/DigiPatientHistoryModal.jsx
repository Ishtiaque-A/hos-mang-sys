import React, { useEffect, useRef, useState } from "react";
import { NewModal } from "../../../common/components/NewModal";
import ReactDatePicker from "react-datepicker";
import Button from "../../../common/components/Button";
import axios from "axios";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { VscInbox } from "react-icons/vsc";
const DigiPatientHistoryModal = ({ isOpen, onClose, patientId, doctorId }) => {
  const [prescription, setPrescription] = useState([]);
  const [pendingStates, setPendingStates] = useState({
    labReport: false,
    prescription: false,
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [labReports, setLabReports] = useState([]);
  const [fromDateL, setFromDateL] = useState("");
  const [toDateP, setToDateP] = useState("");
  const [fromDateP, setFromDateP] = useState("");
  const [toDateL, setToDateL] = useState("");
  const [isOpenViewBox, setIsOpenViewBox] = useState(false);
  useEffect(() => {
    if (patientId !== null) {
      setPendingStates((prev) => ({ ...prev, labReport: true }));
      axios
        .get(`get-lab-reports-from-greatdoc`, {
          params: {
            patientId: patientId,
            toDate: toDateL,
            fromDate: fromDateL,
          },
        })
        .then((res) => {
          setLabReports(res.data);
          setPendingStates((prev) => ({ ...prev, labReport: false }));
        })
        .catch((err) => {
          console.log(err);
          setLabReports([]);
          setPendingStates((prev) => ({ ...prev, labReport: false }));
        });
    }
    return () => {};
  }, [patientId, fromDateL, toDateL]);
  useEffect(() => {
    if (patientId && doctorId) {
      setPendingStates((prev) => ({ ...prev, prescription: true }));
      axios
        .get("get-prescription-from-greatdoc", {
          params: {
            patientId: patientId,
            doctorId: doctorId,
            toDate: toDateP,
            fromDate: fromDateP,
          },
        })
        .then((res) => {
          setPendingStates((prev) => ({ ...prev, prescription: false }));
          setPrescription(res.data);
        })
        .catch((err) => {
          setPendingStates((prev) => ({ ...prev, prescription: false }));
          setPrescription([]);
          console.log(err);
        });
    }
  }, [patientId, doctorId, fromDateP, toDateP]);

  const handleSelectLabReport = (item) => {
    setSelectedReport(item);
    setIsOpenViewBox(true);
  };
  const handleCloseViewBox = () => {
    setIsOpenViewBox(false);
    setSelectedReport(null);
  };
  const Loader = () => (
    <div
      style={{ height: "200px" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="spinner-border  text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return (
    <>
      <NewModal center isOpen={isOpen} onClose={onClose} size="lg">
        <NewModal.Header onClose={onClose}>
          {/* <NewModal.Title>Digi patients history</NewModal.Title> */}
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
                class="nav-link text-start  active"
                id="v-pills-labReports-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-labReports"
                type="button"
                role="tab"
                aria-controls="v-pills-labReports"
                aria-selected="true"
              >
                Lab Reports
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-digiPrescription-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-digiPrescription"
                type="button"
                role="tab"
                aria-controls="v-pills-digiPrescription"
                aria-selected="true"
              >
                Prescription
              </button>
            </div>
          </div>
        </NewModal.Header>
        <NewModal.Body>
          <div
            styles={{
              minHeight: "400px",
            }}
          >
            <div id="v-pills-tabContent" class="tab-content">
              <div
                class="tab-pane fade show active"
                id="v-pills-labReports"
                role="tabpanel"
                aria-labelledby="v-pills-labReports-tab"
                style={{
                  paddingTop: "20px",
                }}
              >
                {/* head part  */}
                <div className="d-flex justify-content-start align-items-center gap-4">
                  <div className="d-flex  align-items-center gap-2">
                    <label htmlFor="fromDate" className="form-label">
                      From
                    </label>
                    <ReactDatePicker
                      id="fromDate"
                      placeholderText="From Date"
                      selected={fromDateL}
                      maxDate={new Date()}
                      dateFormat={"dd/MM/yyyy"}
                      style={{ padding: " 14px 20px" }}
                      onChange={(d) => setFromDateL(d)}
                    />
                  </div>
                  <div className="d-flex  align-items-center gap-2">
                    <label htmlFor="toDate" className="form-label">
                      To
                    </label>
                    <ReactDatePicker
                      id="toDate"
                      placeholderText="To Date"
                      selected={toDateL}
                      maxDate={new Date()}
                      minDate={new Date(fromDateL)}
                      dateFormat={"dd/MM/yyyy"}
                      style={{ padding: " 14px 20px" }}
                      onChange={(d) => setToDateL(d)}
                    />
                  </div>
                </div>
                <div style={{ minHeight: "400px" }}>
                  <table class="table mt-2 table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">SL.</th>
                        <th scope="col">File Name</th>
                        <th scope="col">File</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingStates.labReport ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Loader />
                          </td>
                        </tr>
                      ) : labReports.length ? (
                        labReports.map((item, index) => {
                          return (
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleSelectLabReport({
                                  ...item,
                                  file:
                                    "/images/patients_reports/" + item?.file,
                                })
                              }
                            >
                              <th scope="row">{index + 1}</th>
                              <td width={"50%"}>{item?.name}</td>
                              <td width={"40%"}>
                                {item?.file?.endsWith(".pdf") ? (
                                  <AiOutlineFilePdf size={24} color="#69b128" />
                                ) : (
                                  <img
                                    src={
                                      global.img_url +
                                      "/images/patients_reports/" +
                                      item?.file
                                    }
                                    alt="file_img"
                                    height={50}
                                    width={50}
                                    style={{ borderRadius: "0" }}
                                  />
                                )}
                              </td>
                              <td>
                                <Button>View</Button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <div className="d-flex justify-content-center flex-column my-4 gap-2 align-items-center">
                              <VscInbox size={24} />
                              <p
                                style={{ fontSize: "14px", fontWeight: "500" }}
                              >
                                No data found
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="v-pills-digiPrescription"
                role="tabpanel"
                aria-labelledby="v-pills-digiPrescription-tab"
              >
                {/* head part  */}
                <div className="d-flex justify-content-start align-items-center gap-4">
                  <div className="d-flex  align-items-center gap-2">
                    <label htmlFor="fromDate" className="form-label">
                      From
                    </label>
                    <ReactDatePicker
                      id="fromDate"
                      placeholderText="From Date"
                      selected={fromDateP}
                      maxDate={new Date()}
                      dateFormat={"dd/MM/yyyy"}
                      style={{ padding: " 14px 20px" }}
                      onChange={(d) => setFromDateP(d)}
                    />
                  </div>
                  <div className="d-flex  align-items-center gap-2">
                    <label htmlFor="toDate" className="form-label">
                      To
                    </label>
                    <ReactDatePicker
                      id="toDate"
                      placeholderText="To Date"
                      selected={toDateP}
                      maxDate={new Date()}
                      minDate={new Date(fromDateP)}
                      dateFormat={"dd/MM/yyyy"}
                      style={{ padding: " 14px 20px" }}
                      onChange={(d) => setToDateP(d)}
                    />
                  </div>
                </div>
                <div style={{ minHeight: "400px" }}>
                  <table class="table mt-2 table-bordered table-hover">
                    <thead>
                      <tr>
                        <th scope="col">SL.</th>
                        <th scope="col">File</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingStates.prescription ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <Loader />
                          </td>
                        </tr>
                      ) : prescription.length ? (
                        prescription.map((item, index) => {
                          return (
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleSelectLabReport({
                                  ...item,
                                  file:
                                    "/images/online_prescription/" +
                                    item?.prescription_url,
                                })
                              }
                            >
                              <th scope="row">{index + 1}</th>
                              <td width={"80%"}>
                                {item?.prescription_url?.endsWith(".pdf") ? (
                                  <AiOutlineFilePdf size={40} color="#69b128" />
                                ) : (
                                  <img
                                    src={
                                      global.img_url +
                                      "/images/patients_reports/" +
                                      item?.prescription_url
                                    }
                                    alt="file_img"
                                    height={70}
                                    width={100}
                                    style={{ borderRadius: "0" }}
                                  />
                                )}
                              </td>
                              <td>
                                <Button>View</Button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <div className="d-flex justify-content-center flex-column my-4 gap-2 align-items-center">
                              <VscInbox size={24} />
                              <p
                                style={{ fontSize: "14px", fontWeight: "500" }}
                              >
                                No data found
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </NewModal.Body>
      </NewModal>
      <ViewBox
        isOpen={isOpenViewBox}
        onClose={handleCloseViewBox}
        data={selectedReport}
        title={"Lab Report"}
      />
    </>
  );
};
const ViewBox = ({ isOpen, onClose, data }) => {
  return (
    <NewModal center isOpen={isOpen} onClose={onClose} size="md">
      <NewModal.Header onClose={onClose}>
        <NewModal.Title>{data?.name}</NewModal.Title>
        <a
          href={global.img_url + data?.file}
          target="_blank"
          className="link"
          rel="noreferrer"
        >
          <FaLink /> Full Screen
        </a>
      </NewModal.Header>
      <NewModal.Body style={{ minHeight: "700px !important" }}>
        <div className="d-flex justify-content-center">
          {data?.file?.endsWith(".pdf") ? (
            <iframe
              src={global.img_url + data?.file}
              width="100%"
              aria-atomic="true"
              title="file"
              height="350px"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={global.img_url + data?.file}
              alt="file_img"
              height={500}
              width={500}
              style={{ borderRadius: "0" }}
            />
          )}
        </div>
      </NewModal.Body>
    </NewModal>
  );
};

export default DigiPatientHistoryModal;
