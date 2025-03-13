import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { NewModal } from "../../../../common/components/NewModal";
import { FaSpinner } from "react-icons/fa6";
import Button from "../../../../common/components/Button";
import ReactDatePicker from "react-datepicker";
import { useReactToPrint } from "react-to-print";

export default function TreatmentProtocolModal({
  data,
  isOpen,
  setIsOpen,
  onClose,
  patientId,
  doctorId,
  appId,
}) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [route, setRoute] = useState([]);
  const [cycleData, setCycleData] = useState({
    frequency: "",
    cycle: "",
  });
  const [resultValue, setResultValue] = useState([]);
  useEffect(() => {
    if (isOpen) {
      axios.get(`round-protocol-name/${data}`).then((res) => {
        setDetails(res?.data);
      });
      axios.get("route-name").then((res) => {
        setRoute(res.data.routesName);
      });
      setCycleData({
        frequency: data?.frequency,
        cycle: data?.cycle,
      });
      axios
        .post(`current-treatment-protocol-result`, {
          protocol_id: data?.id,
          patient_id: patientId,
          appointment_id: appId,
        })
        .then((res) => {
          setResultValue(res?.data || []);
        });
    }
  }, [data, isOpen]);

  const handleChange = (e, it, name) => {
    const existingResultValue = [...resultValue];
    const exist = existingResultValue.find(
      (item) => Number(item?.protocol_drug_id) === Number(it?.id)
    );
    if (exist) {
      existingResultValue.map((item) => {
        if (Number(item?.protocol_drug_id) === Number(it?.id)) {
          item[name] = e;
        }
      });
    } else {
      existingResultValue.push({
        ...it,
        protocol_drug_id: it?.id,
        date_to: "",
        date_from: "",
        date: "",
        nurse: "",
        given_date_time: "",
        [name]: e,
      });
    }
    setResultValue(existingResultValue);
  };
  const [selectedDate, setSelectedDate] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const calculateDate = (baseDate, offsetDays = 0) => {
    const date = new Date(baseDate || new Date());
    date.setDate(date.getDate() + offsetDays - 1);
    return date;
  };

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);

    const existingResults = resultValue?.filter((item) => !item?.new) || [];
    const newDrugs = details
      ?.flatMap((item) => item?.drugs || [])
      ?.filter(
        (drug) =>
          !existingResults.some(
            (result) => Number(result?.protocol_drug_id) === Number(drug?.id)
          )
      );

    const updatedResults = [
      ...existingResults,
      ...newDrugs.map((drug) => {
        const fromDate = calculateDate(selectedDate, Number(drug?.day || 0));
        const toDate = calculateDate(fromDate, Number(drug?.day_to || 0));
        return {
          ...drug,
          protocol_drug_id: drug?.id,
          date_to: fromDate.toISOString(),
          date_from: "",
          date: toDate.toISOString(),
          nurse: "",
          given_date_time: "",
          new: true,
        };
      }),
    ];

    setResultValue(updatedResults);
  };

  const closeModal = () => {
    onClose();
    setDetails([]);
    setCycleData({});
    setSelectedDate("");
  };
  const handleSubmit = async (e) => {
    setBtnLoading(true);
    try {
      e.preventDefault();
      await axios
        .post(`round-protocol-result-save`, {
          details: resultValue,
          id: data?.id,
          patient_id: patientId,
          doctor_id: doctorId,
          appointment_id: appId,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Protocol Name updated successfully");
            setBtnLoading(false);
          }
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      setBtnLoading(false);
    } finally {
      setIsOpen(false);
      closeModal();
    }
  };

  return (
    <NewModal size="full" isOpen={isOpen} onClose={closeModal}>
      <NewModal.Header onClose={closeModal}>
        <div
          style={{ justifyContent: "space-between", width: "400px" }}
          className="d-flex"
        >
          <NewModal.Title>Treatment Protocol:</NewModal.Title>
        </div>
      </NewModal.Header>
      <NewModal.Body
        styles={{ minHeight: "400px" }}
        className="modal-body-full"
      >
        <div ref={componentRef}>
          {details?.length > 0 ? (
            <>
              {details?.map((item, i) => (
                <div key={item?.id}>
                  <div className="d-flex  align-items-center justify-content-between">
                    <h6>{item?.name}</h6>
                    {i === 0 && (
                      <div
                        className="ms-2 mb-2 d-flex align-items-center"
                        // style={{ width: "370px" }}
                      >
                        <label className="form-label me-2 fw-bold">
                          Start Date :
                        </label>
                        <div style={{ width: "200px" }}>
                          <ReactDatePicker
                            id="patient_dob"
                            placeholderText="DD/MM/YYYY"
                            dateFormat={"dd/MM/yyyy"}
                            name="requisition_no"
                            selected={
                              selectedDate ? new Date(selectedDate) : ""
                            }
                            style={{ padding: "20px", width: "200px" }}
                            onChange={(d) => handleDateChange(d)}
                            autoComplete="off"
                            tabIndex={-1}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <table className="past_rx_table">
                    <tbody>
                      <tr>
                        <td width={"15%"} className="text-start fw-bold">
                          Drug
                        </td>
                        <td width={"5%"} className="fw-bold text-start">
                          Dose
                        </td>
                        <td width={"7%"} className="fw-bold text-start">
                          Route
                        </td>
                        <td width={"20%"} className="fw-bold text-start">
                          Instruction
                        </td>
                        <td className="fw-bold text-start">
                          Trigger dose change
                        </td>
                        <td width={"5%"} className="fw-bold text-start">
                          Day
                        </td>
                        <td className="fw-bold text-start">Date to</td>
                        <td className="fw-bold text-start">Date</td>
                        <td className="fw-bold text-start">Nurse</td>
                        <td width={"17%"} className="fw-bold text-start">
                          Date/time given
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={10} className="text-start">
                          <h6
                            style={{
                              fontSize: "13px",
                              marginBottom: "0px",
                              lineHeight: "0.9rem",
                            }}
                          >
                            Pre Medications
                          </h6>
                        </td>
                      </tr>
                      {item?.drugs
                        ?.filter((drug) => drug?.type === "pre")
                        ?.map((it) => (
                          <tr key={it?.id}>
                            <td className="text-start">{it?.drug_name}</td>
                            <td className="text-start">{it?.dose}</td>
                            <td className="text-start">
                              {it?.route?.route_name}
                            </td>
                            <td className="text-start">
                              <textarea
                                name="instruction"
                                id=""
                                rows={3}
                                defaultValue={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.instruction
                                    ? resultValue.find(
                                        (item) =>
                                          Number(item?.protocol_drug_id) ===
                                          Number(it?.id)
                                      )?.instruction
                                    : it?.instruction
                                }
                                className="form-control form-control-sm"
                                onBlur={(e) =>
                                  handleChange(
                                    e.target.value,
                                    it,
                                    "instruction"
                                  )
                                }
                              ></textarea>
                            </td>
                            <td className="text-start">
                              {it?.trigger_dose_change}
                            </td>
                            <td className="text-start">{` ${
                              it?.day ? "Day" : ""
                            } ${it?.day ? it?.day : ""}  ${
                              it?.day_to ? `- ${it?.day_to}` : ""
                            }`}</td>{" "}
                            <td className="text-start">
                              <div>
                                <ReactDatePicker
                                  id="patient_dob"
                                  placeholderText="DD/MM/YYYY"
                                  dateFormat={"dd/MM/yyyy"}
                                  name="requisition_no"
                                  selected={
                                    resultValue.find(
                                      (item) =>
                                        Number(item?.protocol_drug_id) ===
                                        Number(it?.id)
                                    )?.date_to
                                      ? new Date(
                                          resultValue.find(
                                            (item) =>
                                              Number(item?.protocol_drug_id) ===
                                              Number(it?.id)
                                          )?.date_to
                                        )
                                      : new Date()
                                  }
                                  style={{ padding: "20px" }}
                                  onChange={(d) =>
                                    handleChange(d, it, "date_to")
                                  }
                                  autoComplete="off"
                                />
                              </div>
                            </td>
                            <td className="text-start">
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY"
                                dateFormat={"dd/MM/yyyy"}
                                name="requisition_no"
                                style={{ padding: "20px" }}
                                autoComplete="off"
                                selected={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.date
                                    ? new Date(
                                        resultValue.find(
                                          (item) =>
                                            Number(item?.protocol_drug_id) ===
                                            Number(it?.id)
                                        )?.date
                                      )
                                    : new Date()
                                }
                                onChange={(d) => handleChange(d, it, "date")}
                              />
                            </td>
                            <td className="text-start">
                              <input
                                //   defaultValue={it?.dose}
                                type="text"
                                className="form-control form-control-sm"
                                name="dose"
                                defaultValue={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.nurse || ""
                                }
                                onBlur={(e) =>
                                  handleChange(e.target.value, it, "nurse")
                                }
                              />
                            </td>
                            <td className="text-start">
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY HH:mm AM/PM"
                                dateFormat="dd/MM/yyyy h:mm aa" // AM/PM format
                                maxDate={new Date()}
                                showTimeSelect
                                timeIntervals={10} // 15-minute intervals
                                style={{ padding: "20px" }}
                                autoComplete="off"
                                onChange={(d) =>
                                  handleChange(d, it, "given_date_time")
                                }
                                selected={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.given_date_time
                                    ? new Date(
                                        resultValue.find(
                                          (item) =>
                                            Number(item?.protocol_drug_id) ===
                                            Number(it?.id)
                                        )?.given_date_time
                                      )
                                    : new Date()
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan={10} className="text-start">
                          <h6
                            style={{
                              fontSize: "13px",
                              marginBottom: "0px",
                              lineHeight: "0.9rem",
                            }}
                          >
                            Medications
                          </h6>
                        </td>
                      </tr>
                      {item?.drugs
                        ?.filter((drug) => drug?.type === "medi")
                        ?.map((it) => (
                          <tr key={it?.id}>
                            <td className="text-start">{it?.drug_name}</td>
                            <td className="text-start">{it?.dose}</td>
                            <td className="text-start">
                              {it?.route?.route_name}
                            </td>
                            <td className="text-start">
                              <textarea
                                name="instruction"
                                id=""
                                rows={3}
                                defaultValue={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.instruction
                                    ? resultValue.find(
                                        (item) =>
                                          Number(item?.protocol_drug_id) ===
                                          Number(it?.id)
                                      )?.instruction
                                    : it?.instruction
                                }
                                className="form-control form-control-sm"
                                onBlur={(e) =>
                                  handleChange(
                                    e.target.value,
                                    it,
                                    "instruction"
                                  )
                                }
                              ></textarea>
                            </td>
                            <td className="text-start">
                              {it?.trigger_dose_change}
                            </td>
                            <td className="text-start">{` ${
                              it?.day ? "Day" : ""
                            } ${it?.day ? it?.day : ""}  ${
                              it?.day_to ? `- ${it?.day_to}` : ""
                            }`}</td>
                            <td className="text-start">
                              <div>
                                <ReactDatePicker
                                  id="patient_dob"
                                  placeholderText="DD/MM/YYYY"
                                  dateFormat={"dd/MM/yyyy"}
                                  name="requisition_no"
                                  selected={
                                    resultValue.find(
                                      (item) =>
                                        Number(item?.protocol_drug_id) ===
                                        Number(it?.id)
                                    )?.date_to
                                      ? new Date(
                                          resultValue.find(
                                            (item) =>
                                              Number(item?.protocol_drug_id) ===
                                              Number(it?.id)
                                          )?.date_to
                                        )
                                      : new Date()
                                  }
                                  style={{ padding: "20px" }}
                                  onChange={(d) =>
                                    handleChange(d, it, "date_to")
                                  }
                                  autoComplete="off"
                                />
                              </div>
                            </td>
                            <td className="text-start">
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY"
                                dateFormat={"dd/MM/yyyy"}
                                name="requisition_no"
                                style={{ padding: "20px" }}
                                autoComplete="off"
                                selected={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.date
                                    ? new Date(
                                        resultValue.find(
                                          (item) =>
                                            Number(item?.protocol_drug_id) ===
                                            Number(it?.id)
                                        )?.date
                                      )
                                    : new Date()
                                }
                                onChange={(d) => handleChange(d, it, "date")}
                              />
                            </td>
                            <td className="text-start">
                              <input
                                //   defaultValue={it?.dose}
                                type="text"
                                className="form-control form-control-sm"
                                name="dose"
                                defaultValue={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.nurse || ""
                                }
                                onBlur={(e) =>
                                  handleChange(e.target.value, it, "nurse")
                                }
                              />
                            </td>
                            <td className="text-start">
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY HH:mm AM/PM"
                                dateFormat="dd/MM/yyyy h:mm aa" // AM/PM format
                                maxDate={new Date()}
                                showTimeSelect
                                timeIntervals={10} // 15-minute intervals
                                style={{ padding: "20px" }}
                                autoComplete="off"
                                onChange={(d) =>
                                  handleChange(d, it, "given_date_time")
                                }
                                selected={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.given_date_time
                                    ? new Date(
                                        resultValue.find(
                                          (item) =>
                                            Number(item?.protocol_drug_id) ===
                                            Number(it?.id)
                                        )?.given_date_time
                                      )
                                    : new Date()
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan={10} className="text-start">
                          <h6
                            style={{
                              fontSize: "13px",
                              marginBottom: "0px",
                              lineHeight: "0.9rem",
                            }}
                          >
                            Post Medications
                          </h6>
                        </td>
                      </tr>
                      {item?.drugs
                        ?.filter((drug) => drug?.type === "post")
                        ?.map((it) => (
                          <tr key={it?.id}>
                            <td className="text-start">{it?.drug_name}</td>
                            <td className="text-start">{it?.dose}</td>
                            <td className="text-start">
                              {it?.route?.route_name}
                            </td>
                            <td className="text-start">
                              <textarea
                                name="instruction"
                                id=""
                                rows={3}
                                defaultValue={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.instruction
                                    ? resultValue.find(
                                        (item) =>
                                          Number(item?.protocol_drug_id) ===
                                          Number(it?.id)
                                      )?.instruction
                                    : it?.instruction
                                }
                                className="form-control form-control-sm"
                                onBlur={(e) =>
                                  handleChange(
                                    e.target.value,
                                    it,
                                    "instruction"
                                  )
                                }
                              ></textarea>
                            </td>
                            <td className="text-start">
                              {it?.trigger_dose_change}
                            </td>
                            <td className="text-start">{` ${
                              it?.day ? "Day" : ""
                            } ${it?.day ? it?.day : ""}  ${
                              it?.day_to ? `- ${it?.day_to}` : ""
                            }`}</td>
                            <td className="text-start">
                              <div>
                                <ReactDatePicker
                                  id="patient_dob"
                                  placeholderText="DD/MM/YYYY"
                                  dateFormat={"dd/MM/yyyy"}
                                  name="requisition_no"
                                  selected={
                                    resultValue.find(
                                      (item) =>
                                        Number(item?.protocol_drug_id) ===
                                        Number(it?.id)
                                    )?.date_to
                                      ? new Date(
                                          resultValue.find(
                                            (item) =>
                                              Number(item?.protocol_drug_id) ===
                                              Number(it?.id)
                                          )?.date_to
                                        )
                                      : new Date()
                                  }
                                  style={{ padding: "20px" }}
                                  onChange={(d) =>
                                    handleChange(d, it, "date_to")
                                  }
                                  autoComplete="off"
                                />
                              </div>
                            </td>
                            <td className="text-start">
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY"
                                dateFormat={"dd/MM/yyyy"}
                                name="requisition_no"
                                style={{ padding: "20px" }}
                                autoComplete="off"
                                selected={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.date
                                    ? new Date(
                                        resultValue.find(
                                          (item) =>
                                            Number(item?.protocol_drug_id) ===
                                            Number(it?.id)
                                        )?.date
                                      )
                                    : new Date()
                                }
                                onChange={(d) => handleChange(d, it, "date")}
                              />
                            </td>
                            <td className="text-start">
                              <input
                                //   defaultValue={it?.dose}
                                type="text"
                                className="form-control form-control-sm"
                                name="dose"
                                defaultValue={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.nurse || ""
                                }
                                onBlur={(e) =>
                                  handleChange(e.target.value, it, "nurse")
                                }
                              />
                            </td>
                            <td className="text-start">
                              <ReactDatePicker
                                id="patient_dob"
                                placeholderText="DD/MM/YYYY HH:mm AM/PM"
                                dateFormat="dd/MM/yyyy h:mm aa" // AM/PM format
                                maxDate={new Date()}
                                showTimeSelect
                                timeIntervals={10} // 15-minute intervals
                                style={{ padding: "20px" }}
                                autoComplete="off"
                                onChange={(d) =>
                                  handleChange(d, it, "given_date_time")
                                }
                                selected={
                                  resultValue.find(
                                    (item) =>
                                      Number(item?.protocol_drug_id) ===
                                      Number(it?.id)
                                  )?.given_date_time
                                    ? new Date(
                                        resultValue.find(
                                          (item) =>
                                            Number(item?.protocol_drug_id) ===
                                            Number(it?.id)
                                        )?.given_date_time
                                      )
                                    : new Date()
                                }
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ))}
              <div className="row mt-2">
                <div className="col-6">
                  <div className="row">
                    <div className="col-2">
                      <label className="fw-bold" htmlFor="">
                        Frequency
                      </label>
                    </div>
                    <div className="col-10">: {cycleData?.frequency}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-2 ">
                      <label className="fw-bold" htmlFor="">
                        Cycle
                      </label>
                    </div>
                    <div className="col-10 ">: {cycleData?.cycle}</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{ height: "200px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <FaSpinner size={26} className="fa-spin" />
            </div>
          )}
        </div>
      </NewModal.Body>
      <NewModal.Footer>
        <Button
          onClick={handlePrint}
          disabled={btnLoading}
          isLoading={btnLoading}
        >
          Print
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={btnLoading}
          isLoading={btnLoading}
        >
          Update
        </Button>
      </NewModal.Footer>
    </NewModal>
  );
}
