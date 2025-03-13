import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NewModal as ReactModal } from "../../../../common/components/NewModal";
import moment from "moment";
import { getAge } from "../../../../utils/getAge";
import { useReactToPrint } from "react-to-print";

export default function DiabeticChartOutput({ patient_id, patient }) {
  const [DiabeticCharts, setDiabeticCharts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  console.log("data", data);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const storageData = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {

    setLoading(true);
    axios
      .get(`/diabetic-chart-output/${patient_id}`)
      .then((res) => {
        console.log("Response Data:", res?.data?.data?.charts);
        setDiabeticCharts(res?.data?.data?.charts || []);
      })
      .catch((error) => {
        console.error("Error fetching diabetic charts:", error);
        if (error.response) {
          console.error("Response Error:", error.response.data);
        }
      }) .finally(() => {
        setLoading(false); // End loading after data is fetched
    });


  }, [patient_id]);

  return (
    <div>  {loading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
  ) : (
      <div className="past-history-table past-visit-table g-doc-scroll">
        {DiabeticCharts?.length > 0 ? (
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
              {DiabeticCharts?.length > 0 &&
                DiabeticCharts?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{moment(item?.date).format("DD/MM/YYYY")}</td>
                      <td>{item?.doctor.fullName}</td>

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
        <ReactModal size="md" isOpen={modalIsOpen} onClose={closeModal}>
          <ReactModal.Header onClose={closeModal}>
            <ReactModal.Title>Diabatic Charts of - {moment(data?.date).format("DD/MM/YYYY")}</ReactModal.Title>
          </ReactModal.Header>
          <ReactModal.Body>
            <div
              ref={componentRef}
              style={{ display: "block" }}
              className="procedure-report-container-print"
            >   <div className="procedure-main-content">
                <div className="d-flex justify-content-center procedure-print-head">
                  <div className="text-center">
                    <h4>{storageData?.organization_name}</h4>
                    <h5>Diabetic Chart  - {moment(data?.date).format("DD/MM/YYYY hh:mm A")}</h5>
                  </div>
                </div>
                <div className="procedure-patient-head-container d-flex justify-content-between ">
                  <div>
                    <p>
                      <span className="procedure-patient-head">Name</span>
                      <span>: {patient?.fullName}</span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">DOB</span>
                      <span>
                        :
                        <span className="ms-1">
                          {moment(patient?.patient?.patient_dob).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </span>
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
                <table className="past_rx_table mt-3">
                  <thead>
                    <tr>
                      <th>Meal</th>
                      <th>Time</th>
                      <th>Result (mmol/L)</th>
                      <th>Insulin Type</th>
                      <th>Insulin Unit</th>
                      <th>Food</th>
                      <th>Signature</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.details?.map((detail, j) => (
                      <tr key={j}>
                        <td>{detail?.name}</td>
                        <td> {moment(detail?.time).format("hh:mm A") || "N/A"}</td>
                        <td>{detail?.result}</td>
                        <td>{detail?.insulin_type}</td>
                        <td>{detail?.insulin_unit}</td>
                        <td>{detail?.food}</td>
                        <td>{detail?.signature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
          </ReactModal.Body>
          <ReactModal.Footer>
            <button className="report-save-btn2" onClick={handlePrint}>
              Print
            </button>
          </ReactModal.Footer>
        </ReactModal>
      </div>)}
        </div>
  );
}
