import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NewModal as ReactModal } from "../../../../common/components/NewModal";
import moment from "moment";
import { getAge } from "../../../../utils/getAge";
import { useReactToPrint } from "react-to-print";

export default function UrineResultOutput({ patient_id, patient }) {
    const [UrineResults, setUrineResults] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState({});
   const [loading, setLoading] = useState(true); // Loading state
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
            .get(`/urine-result-output/${patient_id}`)
            .then((res) => {
                console.log("Response Data:", res?.data?.data?.results);
                setUrineResults(res?.data?.data?.results || []);
            })
            .catch((error) => {
                console.error("Error fetching Pathology Result:", error);
                if (error.response) {
                    console.error("Response Error:", error.response.data);
                }
            }) .finally(() => {
                setLoading(false); // End loading after data is fetched
            });

    }, [patient_id]);
    console.log("Urine Results", UrineResults);
    console.log("patient", patient);
    return (
        <div>  {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : (
            <div className="past-history-table past-visit-table g-doc-scroll">
                {UrineResults?.length > 0 ? (
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
                            {UrineResults?.length > 0 &&
                                UrineResults?.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
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
                        <ReactModal.Title>Pathology Results of - {moment(data?.date).format("DD/MM/YYYY hh:mm A")}</ReactModal.Title>
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
                                        <h5>Pathology Result of - {moment(data?.date).format("DD/MM/YYYY hh:mm A")}</h5>
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
                                            <th className="text-start">Date</th>
                                            <th className="text-start">Ketones</th>
                                            <th className="text-start">Specific Gravity</th>
                                            <th className="text-start">Leucocyte</th>
                                            <th className="text-start">Urobilinogen</th>
                                            <th className="text-start">Ph</th>
                                            <th className="text-start">Nitrites</th>
                                            <th className="text-start">Glucose</th>
                                            <th className="text-start">Color</th>
                                            <th className="text-start">Bilirubin</th>
                                            <th className="text-start">Protein</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {UrineResults?.map((item, j) => (
                                            <tr key={j}>
                                                <td className="text-start">{moment(item?.created_at).format("DD/MM/YYYY hh:mm A")}</td>
                                                <td className="text-start">{item?.ketones|| "N/A"}</td>
                                                <td className="text-start">{item?.specific_gravity|| "N/A"}</td>
                                                <td className="text-start">{item?.leucocyte|| "N/A"}</td>
                                                <td className="text-start">{item?.nitrites|| "N/A"}</td>
                                                <td className="text-start">{item?.urobilinogen|| "N/A"}</td>
                                                <td className="text-start">{item?.ph|| "N/A"}</td>
                                                <td className="text-start">{item?.bilirubin|| "N/A"}</td>
                                                <td className="text-start">{item?.glucose|| "N/A"}</td>
                                                <td className="text-start">{item?.color|| "N/A"}</td>
                                                <td className="text-start">{item?.protein|| "N/A"}</td>
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
            </div> )}
       </div>
    );
}
