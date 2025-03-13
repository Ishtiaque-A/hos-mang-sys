import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import { useReactToPrint } from "react-to-print";
import { getAge } from "../../../../utils/getAge";

export default function DoctorRoundOutput({ patient_id }) {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drugCategory, setDrugCategory] = useState([]);
  useEffect(() => {
    if (patient_id) {
      setLoading(true);
      axios
        .get(`patients-all-round/${patient_id}`)
        .then((res) => {
          setOutput(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      axios
        .get(`drug-since-category`)
        .then((res) => setDrugCategory(res?.data || []));
    }
  }, [patient_id]);
  const [data, setData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(output, "output");
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const storageData = JSON.parse(localStorage.getItem("userData"));
  const general = [
    { label: "ECOG Scale", value: data?.ecog_scale },
    { label: "KPS Scale", value: data?.kps_scale },
    { label: "Anaemic", value: data?.anaemic },
    { label: "Jaundiced", value: data?.jaundiced },
    { label: "Cyanosis", value: data?.cyanosis },
    { label: "Skin Turgor", value: data?.skin_turgor },
    {
      label: "Capillary Refill",
      value: data?.capillary_refill && `${data?.capillary_refill} seconds`,
    },
    { label: "Nail Sign", value: data?.nail_sign },
    { label: "Dehydration", value: data?.dehydration },
    {
      label: "Radio Femoral Delay",
      value: data?.radio_femoral_delay,
    },
    { label: "Mucositis", value: data?.mucositis },
  ];
  const vital = [
    {
      label: "Temperature",
      value: data?.temperature ? `${data.temperature} °F` : "",
    },
    {
      label: "O2 Saturation",
      value: data?.o2_saturation ? `${data.o2_saturation} %RA` : "",
    },
    {
      label: "Blood Sugar",
      value:
        data?.blood_sugar && data?.blood_sugar_type
          ? `${data.blood_sugar} mmol/L : ${data.blood_sugar_type}`
          : "",
    },
    { label: "Pulse", value: data?.pulse ? `${data.pulse} /min` : "" },
    {
      label: "Respiratory Rate",
      value: data?.respiratory_rate ? `${data.respiratory_rate} /min` : "",
    },
    {
      label: "BP Sitting Systolic",
      value:
        data?.bp_sitting_systolic && data?.bp_sitting_diastolic
          ? `${data.bp_sitting_systolic}/${data.bp_sitting_diastolic} mm of Hg`
          : "",
    },
    {
      label: "BP Standing Systolic",
      value:
        data?.bp_standing_systolic && data?.bp_standing_diastolic
          ? `${data.bp_standing_systolic}/${data.bp_standing_diastolic} mm of Hg`
          : "",
    },
    {
      label: "BP Lying Systolic",
      value:
        data?.bp_lying_systolic && data?.bp_lying_diastolic
          ? `${data.bp_lying_systolic}/${data.bp_lying_diastolic} mm of Hg`
          : "",
    },
    { label: "Weight", value: data?.weight ? `${data.weight} Kg` : "" },
    { label: "Height", value: data?.height ? `${data.height} cm` : "" },
    { label: "BMI", value: data?.bmi ? `${data.bmi} Kg/m²` : "" },
    {
      label: "Body Surface Area",
      value: data?.body_surface_area ? `${data.body_surface_area} m²` : "",
    },
    {
      label: "Waist Measurement",
      value: data?.waist_measurement ? `${data.waist_measurement} cm` : "",
    },
    {
      label: "Hip Measurement",
      value: data?.hip_measurement ? `${data.hip_measurement} cm` : "",
    },
    { label: "WHR", value: data?.whr ? data.whr : "" },
  ];

  const systemic = [
    { label: "CNS", value: data?.cns },
    { label: "CVS", value: data?.cvs },
    { label: "Chest", value: data?.chest },
    {
      label: "Abdomen",
      value:
        data?.abdominal_guard &&
        `Abdominal Girth: ${data?.abdominal_guard} cm ,`,
    },
    { label: "", value: data?.abdomen },
    { label: "Skin", value: data?.skin },
    {
      label: "Consultants Advice",
      value: data?.consultants_advice,
    },
  ];
  const dailyInput = data?.intake_output?.details?.reduce(
    (total, current) =>
      total +
      parseFloat(current?.injection || 0) +
      parseFloat(current?.ivFluid || 0) +
      parseFloat(current?.oral || 0),
    0
  );
  const dailyOutput = data?.intake_output?.details?.reduce(
    (total, current) =>
      total +
      parseFloat(current?.others || 0) +
      parseFloat(current?.vomit || 0) +
      parseFloat(current?.drain_two || 0) +
      parseFloat(current?.drain_three || 0) +
      parseFloat(current?.drain_four || 0) +
      parseFloat(current?.drain || 0) +
      parseFloat(current?.urine || 0),
    0
  );
  return (
    <div>
      <div className="past-history-table past-visit-table g-doc-scroll">
        {output?.length > 0 && !loading ? (
          <table className="past_rx_table">
            <thead>
              <tr>
                <th width={"20%"} scope="col">
                  Date & Time
                </th>
                <th scope="col">Consultant</th>
                <th scope="col">Resident</th>
                <th width={"15%"} scope="col">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {output?.length > 0 &&
                output?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{moment(item?.date).format("DD/MM/YYYY hh:mm A")}</td>
                      <td>{item?.doctor?.fullName}</td>
                      <td>{item?.resident?.fullName}</td>
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
          !loading && (
            <p className="text-center mt-lg-5 mt-lg-2 text-danger">
              Records are not available
            </p>
          )
        )}
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      <NewModal size="lg" isOpen={modalIsOpen} onClose={closeModal}>
        <NewModal.Header onClose={closeModal}>
          <NewModal.Title>Morning Round</NewModal.Title>
        </NewModal.Header>
        <NewModal.Body>
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
                  <h4 className="text-uppercase">
                    {storageData?.organization_name}
                  </h4>
                  <h5 className="text-uppercase">Department of haematology</h5>
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
                      :{moment(data?.patient?.patient_dob).format("DD/MM/YYYY")}
                    </span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">HN No</span>
                    <span>: {data?.patient?.patient_hn_number}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="procedure-patient-head">Date</span>
                    <span>: {moment(data?.date).format("DD-MM-YYYY")}</span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">Time</span>
                    <span>: {moment(data?.date).format("hh:mm A")}</span>
                  </p>
                  <p>
                    <span className="procedure-patient-head">PRN</span>
                    <span>: {data?.admission?.PRN}</span>
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
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="row mt-2">
                    <div className="col-3">
                      <label className="fw-bold">Consultant :</label>
                    </div>
                    <div className="col-9">{data?.doctor?.fullName}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row mt-2">
                    <div className="col-3">
                      <label className="fw-bold">Resident :</label>
                    </div>
                    <div className="col-9">{data?.resident?.fullName}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row mt-2">
                    <div className="col-3">
                      <label className="fw-bold">Protocol :</label>
                    </div>
                    <div className="col-9">{data?.protocol?.name}</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row">
                    <div className="col-6">
                      <div className="row mt-2">
                        <div className="col-4">
                          <label className="fw-bold">Day:</label>
                        </div>
                        <div className="col-8">{data?.day}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row mt-2">
                        <div className="col-4">
                          <label className="fw-bold">Cycle:</label>
                        </div>
                        <div className="col-8">{data?.cycle}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row mt-2">
                    <div className="col-2">
                      <label className="fw-bold">Fresh Complaints :</label>
                    </div>
                    <div className="col-10">{data?.freshComplaint}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <h6 style={{ fontWeight: "700" }}>General Examinations:</h6>
                  {general
                    ?.filter((item) => item?.value)
                    ?.map((item, i) => (
                      <p key={i}>
                        <span style={{ fontWeight: "500" }} className="">
                          {item?.label}
                          {item?.label && " : "}
                        </span>
                        {item?.value}
                      </p>
                    ))}
                </div>
                <div className="mt-3">
                  <h6 style={{ fontWeight: "700" }}>Vital Examinations:</h6>
                  {vital
                    ?.filter((item) => item?.value)
                    ?.map((item, i) => (
                      <p key={i}>
                        <span style={{ fontWeight: "500" }}>
                          {item.label} {item?.label && " : "}{" "}
                        </span>{" "}
                        {item.value}
                      </p>
                    ))}
                </div>
                <div className="mt-3">
                  <h6 style={{ fontWeight: "700" }}>Systemic Examinations:</h6>
                  {systemic
                    ?.filter((item) => item.value)
                    ?.map((item, i) => (
                      <p key={i}>
                        <span style={{ fontWeight: "500" }}>
                          {item.label} {item?.label && " : "}
                        </span>
                        {item.value}
                      </p>
                    ))}
                </div>
                <div className="my-3">
                  <p>
                    <span className="fw-bold">
                      Intake Output:{" "}
                      {data?.intake_output &&
                        moment(data?.intake_output?.date).format(
                          "DD-MM-YYYY hh:mm A"
                        )}
                    </span>
                  </p>
                  {data?.intake_output && (
                    <p>
                      Final daily input : {dailyInput} mls - Final daily output
                      : {dailyOutput} = Final Balance :{" "}
                      {dailyInput - dailyOutput} mls
                    </p>
                  )}
                </div>
                <div className="">
                  <h6 className="fw-bold"> Urine Analysis</h6>
                  {data?.urine_result && (
                    <>
                      <p>
                        <span style={{ fontWeight: "500" }}>Date </span>:{" "}
                        {moment(data?.urine_result?.date).format("DD/MM/YYYY")}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Leukocyte </span>:{" "}
                        {data?.urine_result?.leucocyte || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Nitrites </span>:{" "}
                        {data?.urine_result?.nitrites || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Bilirubin </span>:{" "}
                        {data?.urine_result?.bilirubin || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Ketones </span>:{" "}
                        {data?.urine_result?.ketones || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Urobilinogen </span>
                        : {data?.urine_result?.urobilinogen || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Glucose </span>:{" "}
                        {data?.urine_result?.glucose || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Protein </span>:{" "}
                        {data?.urine_result?.protein || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>
                          Specific Gravity{" "}
                        </span>
                        : {data?.urine_result?.specific_gravity || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Ph </span>:{" "}
                        {data?.urine_result?.ph || "N/A"}
                      </p>
                      <p>
                        <span style={{ fontWeight: "500" }}>Color </span>:{" "}
                        {data?.urine_result?.color || "N/A"}
                      </p>
                    </>
                  )}
                </div>
                <div className="mt-3">
                  <h6 className="fw-bold">Drug Since</h6>
                  {data?.drug_since && (
                    <div className="row">
                      {drugCategory?.map((item, i) => {
                        const drugs = data?.drug_since?.drugs?.filter(
                          (it) =>
                            Number(it?.drug?.category_id) === Number(item.id)
                        );
                        return (
                          drugs?.length > 0 && (
                            <div className={` col-3${i > 4 ? "mt-2" : ""}`}>
                              <div
                                style={{
                                  // borderBottom: "1px solid #ccc",
                                  padding: "5px 0px",
                                  marginRight: " 5px",
                                }}
                              >
                                <h6
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    margin: "0px",
                                    padding: "2px 0px",
                                  }}
                                >
                                  {item.name}
                                </h6>
                              </div>
                              <div
                                className=""
                                style={{
                                  border: "none",
                                }}
                              >
                                <table className="past_rx_table">
                                  <tbody>
                                    {drugs?.map((res, j) => (
                                      <>
                                        <tr>
                                          <td
                                            className="text-start"
                                            colSpan={3}
                                          >
                                            {res?.drug?.name}
                                          </td>
                                        </tr>
                                        {j === 0 && (
                                          <tr>
                                            <td className="">Days</td>
                                            <td className="">Dose</td>
                                            <td className="">Route</td>
                                          </tr>
                                        )}
                                        <tr>
                                          <td>{res?.days}</td>
                                          <td>{res?.dose}</td>
                                          <td>{res?.route}</td>
                                        </tr>
                                      </>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </NewModal.Body>
        <NewModal.Footer>
          <button className="report-save-btn2" onClick={handlePrint}>
            Print
          </button>
        </NewModal.Footer>
      </NewModal>
    </div>
  );
}
