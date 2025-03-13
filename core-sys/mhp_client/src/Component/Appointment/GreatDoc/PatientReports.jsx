import React from "react";
import docMenu8 from "../../../Images/diagnosis-image.png";
import { useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { Margin, usePDF } from "react-to-pdf";
import { RxCross2 } from "react-icons/rx";
import useResizeObserver from "../../../hooks/useResizeObserver";
export default function PatientReports({ id }) {
  const doctorId = JSON.parse(localStorage.getItem("userData"))?.user_id;
  const { width } = useResizeObserver();
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/great-doc-patients-report/${doctorId}/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setReports(res.data.patient_labs);
          setLoading(false);
          if (res.data.patient_labs?.length === 0) {
            setError(true);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, [id, doctorId]);
  const { toPDF, targetRef } = usePDF({
    filename: "Report.pdf",
    page: { margin: Margin.LARGE, format: "letter" },
  });
  const customStyles = {
    content: {
      top: "38%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "72%",
      height: "80%",
      padding: "10px",
      zIndex: "3000",
    },
  };
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <button
        className={id ? "gd-btn" : "printDisabledbtn"}
        onClick={handleModal}
        disabled={!id}
      >
        {width > 867 && (
          <img
            src={docMenu8}
            alt=""
            className="me-2"
            style={{ height: "20px", width: "20px" }}
          />
        )}
        Test Result
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={closeModal}
        >
          <RxCross2 />
        </span>
        <h6 className="card-title">Patients Test Reports</h6>

        <>
          {loading ? (
            <div>
              <i
                style={{ fontSize: "26px", marginLeft: "50%" }}
                class="fas fa-spinner fa-spin"
              ></i>
            </div>
          ) : (
            <div className="card-body">
              <div className="actual-receipt bg-white great-lab-print-report-view mb-1">
                {reports?.length > 0 ? (
                  <>
                    {reports?.map((dynamicSrc, i) => {
                      return (
                        <div key={i}>
                          {dynamicSrc?.report_file === "internal" && (
                            <>
                              <div ref={targetRef} className=" mt-2 mb-3 w-100">
                                <div className="d-flex justify-content-between">
                                  <div className="great-lab-print-head mt-3">
                                    <h6>Macro Healthplus Clinic</h6>
                                    <p>
                                      3 Dhakeshwari Rd, Dhaka 1211, Bangladesh
                                    </p>
                                  </div>
                                  <div>
                                    {/* <img style={{ height: "80px" }} src={`${global.img_url}/images/letterHead/${letterImage}`} alt="" /> */}
                                    {/* <img style={{ height: "80px" }} src='https://picsum.photos/200' alt="" /> */}
                                    {dynamicSrc?.result && (
                                      <div className="d-flex">
                                        <h6>Result : </h6>
                                        <p>{dynamicSrc?.result}</p>
                                      </div>
                                    )}
                                    {dynamicSrc?.action_taken && (
                                      <div className="d-flex">
                                        <h6>Action : </h6>
                                        <p>{dynamicSrc?.action_taken}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <h6 className="text-uppercase">
                                    laboratory report
                                  </h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div className="lab-report-details">
                                    <p>
                                      <span
                                        style={{ width: "110px" }}
                                        className="d-inline-block"
                                      >
                                        Name
                                      </span>
                                      :
                                      <span className="ms-1">
                                        {
                                          dynamicSrc?.patient
                                            ?.patient_first_name
                                        }
                                      </span>
                                    </p>
                                    <p>
                                      <span
                                        style={{ width: "110px" }}
                                        className="d-inline-block"
                                      >
                                        Date
                                      </span>
                                      :
                                      <span className="ms-1">
                                        {moment(dynamicSrc?.created_at).format(
                                          "LL"
                                        )}
                                      </span>
                                    </p>
                                    <p>
                                      <span
                                        style={{ width: "110px" }}
                                        className="d-inline-block"
                                      >
                                        Reference By
                                      </span>
                                      :
                                      <span className="ms-1">
                                        {dynamicSrc?.doctor?.dr_given_name}
                                      </span>
                                    </p>
                                    {/* <p> <span style={{ width: "110px" }} className='d-inline-block'>Reference</span>: <span className='ms-1'>{dynamicSrc?.referrer}</span> </p> */}
                                  </div>
                                  <div className="lab-report-details">
                                    <p>
                                      <span
                                        style={{ width: "70px" }}
                                        className="d-inline-block"
                                      >
                                        Age
                                      </span>
                                      :
                                      <span className="ms-1">
                                        {moment().diff(
                                          dynamicSrc?.patient.patient_dob,
                                          "years"
                                        )}
                                      </span>
                                    </p>
                                    <p>
                                      <span
                                        style={{ width: "70px" }}
                                        className="d-inline-block"
                                      >
                                        Sex
                                      </span>
                                      :
                                      <span className="ms-1">
                                        {dynamicSrc?.reports?.gender}
                                      </span>
                                    </p>
                                    <p>
                                      <span
                                        style={{ width: "70px" }}
                                        className="d-inline-block"
                                      >
                                        HN
                                      </span>
                                      :
                                      <span className="ms-1">
                                        {dynamicSrc?.patient.patient_hn_number}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-2 text-center">
                                  <h6 className="text-uppercase">
                                    {dynamicSrc?.reports?.test_name}
                                  </h6>
                                </div>
                                {
                                  <>
                                    <div className="lab-report-table">
                                      {dynamicSrc?.reports?.details?.length >
                                        0 && (
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td>Test Name</td>
                                              <td>Flag</td>
                                              <td>Result</td>
                                              <td>Normal Range</td>
                                              <td>Units</td>
                                            </tr>
                                            {dynamicSrc?.reports?.details?.map(
                                              (item, i) => {
                                                return (
                                                  <tr key={i}>
                                                    <td>
                                                      {item.parameter_name}
                                                    </td>
                                                    <td
                                                      className={`${
                                                        (item.flag === "Low" ||
                                                          item.flag ===
                                                            "High") &&
                                                        "text-danger fw-bolder"
                                                      }`}
                                                    >
                                                      {item.flag}
                                                    </td>
                                                    <td> {item.result}</td>
                                                    <td>
                                                      {item.lower_value +
                                                        "-" +
                                                        item.upper_value}
                                                    </td>
                                                    <td> {item.unit}</td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </tbody>
                                        </table>
                                      )}

                                      {dynamicSrc?.reports?.test_group?.toLowerCase() ===
                                        "pathology" && (
                                        <>
                                          <h6>Impression : </h6>
                                          <p className="mt-3 ms-5">
                                            {dynamicSrc?.reports?.remark}
                                          </p>
                                        </>
                                      )}
                                      {dynamicSrc?.reports?.test_group?.toLowerCase() ===
                                        "radiology" && (
                                        <>
                                          {
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  dynamicSrc?.reports
                                                    ?.radiologyReportDetails,
                                              }}
                                              className="mt-2"
                                            ></div>
                                          }
                                          {dynamicSrc?.reports
                                            ?.radiogyReportImage && (
                                            <img
                                              src={`${global.img_url}/images/lab/${dynamicSrc?.reports?.radiogyReportImage}`}
                                              alt="report"
                                              className="img-fluid mt-2 mb-2"
                                            />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </>
                                }

                                <div className="d-flex justify-content-end">
                                  <div className="me-3">
                                    <div className="technician-sign-preview mb-2">
                                      {/* {
                                                                      imageUrl &&
                                                                      <img src={URL.createObjectURL(imageUrl)} alt="" className='img-fluid' />
                                                                  }
                                                                  {
                                                                      image &&
                                                                      <img src={`${global.img_url}/images/letterHead/${image}`} alt="" className='img-fluid' />
                                                                  } */}
                                    </div>
                                    <p>Dr.Leonard Giblin</p>
                                    <p>GNU Public Key : E44311F4</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {dynamicSrc?.report_file === "external" && (
                            <div style={{ minHeight: "570px" }}>
                              <div className="text-center">
                                <h6 className="text-uppercase">
                                  laboratory report
                                </h6>
                              </div>
                              {dynamicSrc?.files?.length > 0 &&
                                dynamicSrc?.files?.map((item, i) => {
                                  return item.file_name.endsWith("pdf") ? (
                                    <>
                                      <h6 className="my-2"> {item.title}</h6>
                                      <iframe
                                        title="Report"
                                        width="100%"
                                        height="350px"
                                        src={`${global.img_url}/images/external_lab/${item?.file_name}`}
                                        frameborder="0"
                                        style={{ objectFit: "cover" }}
                                      ></iframe>

                                      <div>
                                        {dynamicSrc?.result && (
                                          <div className="d-flex">
                                            <h6>Result : </h6>
                                            <p>{dynamicSrc?.result}</p>
                                          </div>
                                        )}
                                        {dynamicSrc?.action_taken && (
                                          <div className="d-flex">
                                            <h6>Action : </h6>
                                            <p>{dynamicSrc?.action_taken}</p>
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <h6 className="my-2"> {item.title}</h6>
                                      <img
                                        src={`${global.img_url}/images/external_lab/${item?.file_name}`}
                                        alt="report"
                                        className="img-fluid mt-2 mb-2"
                                      />
                                    </>
                                  );
                                })}
                              <div className="mt-2">
                                <h6>Remarks</h6>
                                <p>{dynamicSrc?.remarks}</p>
                              </div>
                              <div>
                                {dynamicSrc?.result && (
                                  <div className="d-flex">
                                    <h6>Result : </h6>
                                    <p>{dynamicSrc?.result}</p>
                                  </div>
                                )}
                                {dynamicSrc?.action_taken && (
                                  <div className="d-flex">
                                    <h6>Action : </h6>
                                    <p>{dynamicSrc?.action_taken}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <hr className="text-success" />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <p className="text-danger text-center mt-lg-5 mt-lg-2 font-weight-bold">
                      No Records Available
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      </Modal>
    </>
  );
}
