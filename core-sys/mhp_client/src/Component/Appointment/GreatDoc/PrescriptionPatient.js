import React, { useEffect, useState } from "react";
import "./PrescriptionPatient.css";
import bg from "../../../Images/medicine-bg.png";
import moment from "moment";
import QRCode from "react-qr-code";
import { useBarcode } from "react-barcodes";
import axios from "axios";
import { toast } from "react-toastify";

const PrescriptionPatient = (props) => {
  const { inputRef } = useBarcode({
    value: "32213115",
    options: {
      displayValue: false,
      width: 3,
      height: 70,
    },
  });

  const [doctorData, setdoctorData] = useState([]);
  const [script, setscript] = useState();
  const [reasonForVisit, setReasonForVisit] = useState([]);
  useEffect(() => {
    const docData = JSON.parse(localStorage.getItem("userData"));

    if (docData.user_id) {
      axios.get(`/edit-doctors/${docData.user_id}`).then((res) => {
        setdoctorData(res.data.doctors);
      });
    }
    if (props.patientDetails.id) {
      axios
        .get(`get-great-doc-reson/${props.patientDetails.id}`)
        .then((res) => {
          if (res.status === 200) {
            const data = [];
            res.data.allReasons.map((item) => {
              data.push(item.reson_name);
            });
            setReasonForVisit(data);
          }
        });
    }

    const data = Math.ceil(Math.random() * 100000);
    setscript(data);
  }, [props.patientDetails.id]);

  function divideArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  useEffect(() => {
    console.log("prescription patient id", props.patientDetails);
    if (props.prescriptionSaveDB === true) {
      const dataPres = {
        patient_id: props.patientDetails.id,
        doctor_id: doctorData?.id,
        reason_for_visit: reasonForVisit.toString(),
        prescription_name: `prescription_${moment(Date.now()).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`,
        doctors_note: props.doctorsNote,
        date: moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a"),
      };

      console.log(dataPres, "doctorNote");

      if (props.selectedMedicen.length > 0) {
        axios.post("/save-prescription-name", dataPres).then((res) => {
          console.log("PrescriptionData", res.data);
          props.setupdateState(Math.random());
        });

        props.selectedMedicen.map((item) => {
          const data = {
            patient_id: props.patientDetails.id,
            doctor_id: doctorData?.id,
            medicen_id: item.id,
            prescription_no: `prescription_${moment(Date.now()).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}`,
            prescription_date: moment(Date.now()).format(
              "MMMM Do YYYY, h:mm:ss a"
            ),
          };
          axios.post("/save-prescription", data).then((res) => {
            // console.log("PrescriptionData", res.data);
          });
        });

        props.setPrescriptionSaveDB(false);
        toast.success("Prescription save successfully");
      }
    }
  }, [props.calleffectforsave]);

  const [presData, setpresData] = useState([]);

  console.log("presData", presData);
  useEffect(() => {
    if (props?.selectedMedicen.length > 0) {
      setpresData(divideArray(props.selectedMedicen, 5));
    }
  }, [props?.selectedMedicen]);

  const { patient_hn_number, patient_address1, fullName } =
    props.patientDetails;

  return (
    <div className="prescription-container">
      <div className="prescription__doctor__info d-flex justify-content-between">
        <div className="prescription__doctor__info__name">
          <h6>{doctorData?.fullName}</h6>
          <p>MBBS, FRACGP</p>
          <span className="bmdc-no">
            BMDC No :{" "}
            {doctorData?.dr_bmdc_reg_no !== "null" &&
              doctorData?.dr_bmdc_reg_no}
          </span>
        </div>
        <div className="prescription__doctor__info__address">
          <span className="float-end font-weight-bold">Chamber</span>
          <br />
          <span className="float-end">{doctorData?.dr_address_line_1}</span>
          <br />
          <span className="float-end">Ph: {doctorData?.dr_mobile_phone}</span>
          <br />
          <span className="float-end">
            Work Ph: {doctorData?.dr_work_phone}
          </span>
        </div>
      </div>
      <hr />
      <div className="prescription__patient__info d-flex justify-content-between">
        <div className="prescription__patient__info__name">
          <h6>Patient HN {patient_hn_number}</h6>
          <p className="mt-2">
            <span className="p-title">Patient name </span>:<b>{fullName}</b>
          </p>
          <p className="mt-2">
            <span className="p-title">Address </span>: <b>{patient_address1}</b>
          </p>
          <span className="mt-2 patient-date">
            Date: {moment(Date.now()).format("ll")}
          </span>
        </div>
        <div className="prescription__patient__info__id">
          <div className="prescription__patient__info__id__image__container text-center">
            <div style={{ marginBottom: "5px" }}>
              <QRCode size="60" value="https://macrohealthplus.org"></QRCode>
            </div>

            {/* <img className='qr-code-img' src={qr} alt="" /> */}
            {/* <img src={logo} alt="" /> */}
            <p>MHP Hospital</p>
            <span>Script ID: {script}</span>
          </div>
        </div>
      </div>
      <div className="prescription__medicine__info">
        <div class="form-check mt-3">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label">
            Brand substitution not permitted
          </label>
        </div>

        {/* {presData.length > 0 &&
          presData.map((item, i) => {
            return (
              <div key={i} className="full-prescription">
                <div className="prescription__medicine__container d-flex justify-content-center">
                  <img className="img-fluid" src={bg} alt="" />
                  <div className="prescription__medicine__details">
                    {
                    item?.length > 0 ? (
                      item?.map((item, i) => (
                        <div key={i} className={`prescription__medicine mt-3`}>
                          <h6>{item?.medicine?.macrohealth_sg}</h6>
                          <p>{item?.drug_name} </p>
                          <p>
                            {`${item.dose}  ${item.frequency}`} {item.food}
                          </p>

                          <p>
                            Quantity: {item.quantity} Repeats: {item.repeats}
                          </p>
                          {item.rsdrug !== undefined && (
                            <p className="handwrite_tag">
                              The Prescriber must write the dug details in their
                              own handwriting
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <i
                        style={{ fontSize: "26px", marginLeft: "40%" }}
                        class="fas fa-spinner fa-spin"
                      ></i>
                    )}
                  </div>
                </div>

                <div className="mt-5 text-center p-3">
                  <div className="d-flex justify-content-between">
                    <h6>{doctorData?.fullName}</h6>
                    <h6>Turn over for privacy notice</h6>
                  </div>
                  <svg ref={inputRef} className="mt-2" />
                  <p>
                    Issued under : The Drugs (Control) Ordinance, 1982 <br />{" "}
                    (Ordinance NO. VIII OF 1982 ) Section 14A
                  </p>
                </div>
              </div>
            );
          })} */}
        {/* <div className="full-prescription">
                <div className="prescription__medicine__container d-flex justify-content-center">
                  <img className="img-fluid" src={bg} alt="" />
                  <div className="prescription__medicine__details">
                    {props?.selectedMedicen?.length > 0 ? (
                      props?.selectedMedicen?.slice(0, 5).map((item, i) => (
                        <div key={i} className={`prescription__medicine mt-3`}>
                          <h6>{item?.medicine?.macrohealth_sg}</h6>
                          <p>{item?.drug_name} </p>
                          <p>{`${item.dose}  ${item.frequency}`}  {item.food}</p>

                          <p>
                            Quantity: {item.quantity} Repeats: {item.repeats}
                          </p>
                          {item.rsdrug !== undefined &&
                            <p className="handwrite_tag">
                              The Prescriber must write the dug details in their own handwriting
                            </p>
                          }
                        </div>
                      ))
                    ) : (
                      <i
                        style={{ fontSize: "26px", marginLeft: "40%" }}
                        class="fas fa-spinner fa-spin"
                      ></i>
                    )}
                  </div>
                </div>
             

                <div className="mt-5 text-center">
                  <div className="d-flex justify-content-between">
                    <h6>{doctorData?.fullName}</h6>
                    <h6>Turn over for privacy notice</h6>
                  </div>
                  <svg ref={inputRef} className="mt-2" />
                  <p>
                    Issued under : The Drugs (Control) Ordinance, 1982 <br /> (Ordinance
                    NO. VIII OF 1982 ) Section 14A
                  </p>
                </div>


        </div> */}

        <div className="full-prescription">
          <div className="prescription__medicine__container d-flex justify-content-center">
            <img className="img-fluid" src={bg} alt="" />
            <div className="prescription__medicine__details">
              {props?.selectedMedicen?.length > 0 ? (
                props?.selectedMedicen?.slice(0, 5).map((item, i) => (
                  <div key={i} className={`prescription__medicine mt-3`}>
                    <h6>{item?.medicine?.macrohealth_sg}</h6>
                    <p>{item?.drug_name} </p>
                    <p>
                      {`${item.dose}  ${item.frequency}`} {item.food}
                    </p>

                    <p>
                      Quantity: {item.quantity} Repeats: {item.repeats}
                    </p>
                    {item.rsdrug !== undefined && (
                      <p className="handwrite_tag">
                        The Prescriber must write the dug details in their own
                        handwriting
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <i
                  style={{ fontSize: "26px", marginLeft: "40%" }}
                  class="fas fa-spinner fa-spin"
                ></i>
              )}
            </div>
          </div>
          <div className="prescription__doctor__sign mt-3">
            <h6 className="mt-5">{doctorData?.fullName}</h6>
          </div>
          <h6 className="mt-2 float-end">Turn over for privacy notice</h6>
          <div className="prescription__barcode__section">
            <br></br>
            <br></br>

            <svg ref={inputRef} style={{ height: "100px" }} />
            <br></br>
            <p>
              Issued under : The Drugs (Control) Ordinance, 1982 <br />{" "}
              (Ordinance NO. VIII OF 1982 ) Section 14A
            </p>
          </div>

          {/* <div className="mt-5 text-center p-3">
            <div className="d-flex justify-content-between">
              <h6>{doctorData?.fullName}</h6>
              <h6>Turn over for privacy notice</h6>
            </div>
            <svg ref={inputRef} style={{height:"100px"}} />
            <p>
              Issued under : The Drugs (Control) Ordinance, 1982 <br />{" "}
              (Ordinance NO. VIII OF 1982 ) Section 14A
            </p>
          </div> */}
        </div>

        <div
          className={`full-prescription ${
            props?.selectedMedicen?.length > 6 ? "d-block" : "d-none"
          } mt-5 pt-3`}
        >
          <div className="prescription__medicine__container d-flex justify-content-center">
            <img className="img-fluid" src={bg} alt="" />
            <div className="prescription__medicine__details">
              {props?.selectedMedicen?.length > 6 &&
                props?.selectedMedicen?.slice(6, 14).map((item, i) => (
                  <div key={i} className={`prescription__medicine mt-3`}>
                    <h6>{item?.medicine?.macrohealth_sg}</h6>
                    <p>{item.drug_name}</p>
                    <p>
                      {`${item.dose}  ${item.frequency}`} {item?.food}
                    </p>
                    <p>
                      Quantity: {item.quantity} Repeats: {item.repeats}
                    </p>
                    {item.rsdrug !== undefined && (
                      <p className="handwrite_tag">
                        The Prescriber must write the dug details in their own
                        handwriting
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="prescription__doctor__sign mt-3">
            <h6 className="mt-5">{doctorData?.fullName}</h6>
          </div>
          <h6 className="mt-2 float-end">Turn over for privacy notice</h6>
          <div className="prescription__barcode__section">
            <br></br>
            <br></br>

            <svg ref={inputRef} style={{ height: "100px" }} />
            <br></br>
            <p>
              Issued under : The Drugs (Control) Ordinance, 1982 <br />{" "}
              (Ordinance NO. VIII OF 1982 ) Section 14A
            </p>
          </div>
          {/* <div className=" prescription__doctor__sign mt-5 text-center p-3">
            <div className="d-flex justify-content-between">
              <h6>{doctorData?.fullName}</h6>
              <h6>Turn over for privacy notice</h6>
            </div>
            <svg ref={inputRef} style={{height:"100px"}} />
            <p>
              Issued under : The Drugs (Control) Ordinance, 1982 <br />{" "}
              (Ordinance NO. VIII OF 1982 ) Section 14A
            </p>
             </div> */}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPatient;
