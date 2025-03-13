import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NewModal as ReactModal } from "../../../../common/components/NewModal";
import moment from "moment";
import { getAge } from "../../../../utils/getAge";
import { useReactToPrint } from "react-to-print";

export default function PathologyResultsOutput({ patient_id, patient }) {
    const [PathologyResults, setPathologyResults] = useState([]);
    const [PathologyParameter, setPathologyParameter] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Print functionality
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const storageData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        setLoading(true); // Start loading before fetching data
        axios
            .get(`/pathology-result-output/${patient_id}`)
            .then((res) => {
                console.log("Response Data:", res?.data?.data?.results);
                setPathologyResults(res?.data?.data?.results || []);
                setPathologyParameter(res?.data?.data?.parameters || []);
            })
            .catch((error) => {
                console.error("Error fetching Pathology Result:", error);
                if (error.response) {
                    console.error("Response Error:", error.response.data);
                }
            })
            .finally(() => {
                setLoading(false); // End loading after data is fetched
            });
    }, [patient_id]);

    console.log("Pathology Results", PathologyResults);
    console.log("Pathology Parameter", PathologyParameter);

    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="past-history-table past-visit-table g-doc-scroll">
                    {PathologyResults?.length > 0 ? (
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
                                {PathologyResults?.length > 0 &&
                                    PathologyResults?.map((item, i) => {
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
                   <ReactModal size="lg" isOpen={modalIsOpen} onClose={closeModal}>
    <ReactModal.Header onClose={closeModal}>
        <ReactModal.Title>Pathology Results of - {moment(data?.date).format("DD/MM/YYYY hh:mm A")}</ReactModal.Title>
    </ReactModal.Header>
    <ReactModal.Body>
        <div ref={componentRef} style={{ display: "block" }} className="procedure-report-container-print">
            <div className="procedure-main-content">
                <div className="d-flex justify-content-center procedure-print-head">
                    <div className="text-center">
                        <h4>{storageData?.organization_name}</h4>
                        <h5>Pathology Result of - {moment(data?.date).format("DD/MM/YYYY hh:mm A")}</h5>
                    </div>
                </div>
                <div className="procedure-patient-head-container d-flex justify-content-between">
                    <div>
                        <p>
                            <span className="procedure-patient-head">Name</span>: {patient?.fullName}
                        </p>
                        <p>
                            <span className="procedure-patient-head">DOB</span>:{" "}
                            <span className="ms-1">
                                {moment(patient?.patient?.patient_dob).format("DD/MM/YYYY")}
                            </span>
                        </p>
                        <p>
                            <span className="procedure-patient-head">HN No</span>: {patient?.patient_hn_number}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="procedure-patient-head">Sex</span>:{" "}
                            {patient?.patient_birth_sex?.birth_sex_name}
                        </p>
                        <p>
                            <span className="procedure-patient-head">Age</span>: {getAge(patient?.patient_dob)}
                        </p>
                    </div>
                </div>
                <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table className="past_rx_table mt-3 " style={{ width: '100%', tableLayout: 'auto'}}>
                        <thead>
                            <tr>
                                <th className="text-start">Tests</th>
                                {PathologyParameter[0]?.details.map((detail, index) => (
                                    <th className="text-start" key={index}>
                                        {moment(detail.created_at).format("DD/MM/YYYY hh:mm A")}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {PathologyParameter.map((parameter, j) => (
                                <tr key={j}>
                                    <td className="text-start">{parameter.name}</td>
                                    {parameter.details.map((detail, i) => (
                                        <td className="text-start" key={i}>
                                            {detail.value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

                </div>)}
        </div>
    );
}
