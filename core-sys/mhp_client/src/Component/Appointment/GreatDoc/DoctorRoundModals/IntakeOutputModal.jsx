import React, { useEffect, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

export default function IntakeOutputModal({
  isOpen,
  onClose,
  appId,
  doctorId,
  admissionId,
  patientId,
}) {
  const [date, setDate] = useState(new Date());
  const [result, setResult] = useState([]);
  const [data, setData] = useState({});
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (isOpen) {
      if (admissionId) {
        axios
          .post("date-intake-output", { date: date, admission_id: admissionId })
          .then((res) => {
            setResult(res?.data?.data?.details || []);
            setData(res?.data || {});
          });
      }
    }
  }, [isOpen, date, update, admissionId]);
  const handleCloseModal = () => {
    onClose();
    setDate(new Date());
    setIntakeOutput({
      inputDate: "",
      inputTime: new Date(),
      oral: "",
      ivFluid: "",
      fluidTime: "",
      injection: "",
      totalIntake: "",
      totalOutput: "",
      outputDate: "",
      outputTime: new Date(),
      urine: "",
      drain: "",
      drain_two: "",
      drain_three: "",
      drain_four: "",
      vomit: "",
      others: "",
      balance: "",
    });
  };

  const [intakeOutput, setIntakeOutput] = useState({
    inputDate: "",
    inputTime: new Date(),
    oral: "",
    ivFluid: "",
    fluidTime: "",
    injection: "",
    totalIntake: "",
    totalOutput: "",
    outputDate: "",
    outputTime: new Date(),
    urine: "",
    drain: "",
    drain_two: "",
    drain_three: "",
    drain_four: "",
    vomit: "",
    others: "",
    balance: "",
  });
  const handleIntake = (e) => {
    const { name, value } = e.target;
    setIntakeOutput({
      ...intakeOutput,
      [name]: value,
    });
  };
  const [loading, setLoading] = useState(false);

  console.log(data, "result");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = {
      ...intakeOutput,
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_id: appId,
      admission_id: admissionId,
      date: date,
    };
    axios
      .post(`save-intake-output`, postData)
      .then((res) => {
        setLoading(false);
        toast.success("Saved Successfully");
        setUpdate(!update);
        setIntakeOutput({
          inputDate: "",
          inputTime: new Date(),
          oral: "",
          ivFluid: "",
          fluidTime: "",
          injection: "",
          totalIntake: "",
          totalOutput: "",
          outputDate: "",
          outputTime: new Date(),
          urine: "",
          drain: "",
          vomit: "",
          others: "",
          balance: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };

  return (
    <NewModal size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Intake Output</NewModal.Title>
        {/* <Button type="button" onClick={startRegister}>
          Add
        </Button> */}
      </NewModal.Header>
      <form onSubmit={handleSubmit}>
        <NewModal.Body
          styles={{
            minHeight: "400px",
          }}
        >
          <div className="">
            <table style={{ tableLayout: "auto" }} className="past_rx_table">
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center fw-bold">
                    Daily Input
                  </td>
                  <td colSpan={8} className="text-center fw-bold">
                    Daily Output
                  </td>
                  <td className="text-center fw-bold">Balance</td>
                </tr>
                <tr>
                  <td className="fw-bold">Date</td>
                  <td className="fw-bold">Time</td>
                  <td className="fw-bold">Oral</td>
                  <td className="fw-bold">Iv fluids</td>
                  <td className="fw-bold">Injection</td>
                  <td className="fw-bold">Total Intake</td>
                  {/* <td>Time</td> */}
                  <td className="fw-bold">Urine</td>
                  <td className="fw-bold">Stool</td>
                  <td className="fw-bold">Drain 1</td>
                  <td className="fw-bold">Drain 2</td>
                  <td className="fw-bold">Drain 3</td>
                  <td className="fw-bold">Vomit</td>
                  <td className="fw-bold">Others</td>
                  <td className="fw-bold">Total Output</td>
                  <td></td>
                </tr>
                {result?.length > 0 &&
                  result?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {index === 0 && (
                          <ReactDatePicker
                            id="patient_dob"
                            placeholderText="DD/MM/YYYY"
                            dateFormat={"dd/MM/yyyy"}
                            name="requisition_no"
                            maxDate={new Date()}
                            style={{ padding: "10px" }}
                            autoComplete="off"
                            selected={date || new Date()}
                            onChange={(d) => setDate(d)}
                            tabIndex={-1}
                          />
                        )}
                      </td>
                      <td>{moment(item?.time).format("hh:mm A")}</td>
                      <td>{item?.oral}</td>
                      <td>{item?.ivFluid}</td>
                      <td>{item?.injection}</td>
                      <td>{item?.totalIntake}</td>
                      {/* <td>{moment(item?.outputTime).format("hh:mm A")}</td> */}
                      <td>{item?.urine}</td>
                      <td>{item?.drain}</td>
                      <td>{item?.drain_two}</td>
                      <td>{item?.drain_three}</td>
                      <td>{item?.drain_four}</td>
                      <td>{item?.vomit}</td>
                      <td>{item?.others}</td>
                      <td>{item?.totalOutput}</td>
                      <td></td>
                    </tr>
                  ))}
                <tr>
                  <td style={{ width: "100px" }}>
                    {result?.length === 0 && (
                      <ReactDatePicker
                        id="patient_dob"
                        placeholderText="DD/MM/YYYY"
                        dateFormat={"dd/MM/yyyy"}
                        name="requisition_no"
                        maxDate={new Date()}
                        style={{ padding: "10px" }}
                        autoComplete="off"
                        selected={date || new Date()}
                        onChange={(d) => setDate(d)}
                        tabIndex={-1}
                      />
                    )}
                  </td>
                  <td style={{ width: "100px" }}>
                    <ReactDatePicker
                      id="time_picker"
                      placeholderText="Select Time"
                      name="time"
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="hh:mm aa"
                      timeIntervals={15}
                      dateFormat="hh:mm aa"
                      selected={intakeOutput?.inputTime || new Date()}
                      onChange={(t) =>
                        setIntakeOutput({ ...intakeOutput, inputTime: t })
                      }
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="oral"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.oral}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="ivFluid"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.ivFluid}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="injection"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.injection}
                    />
                  </td>
                  <td></td>
                  <td>
                    <input
                      type="number"
                      name="urine"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.urine}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="drain"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.drain}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="drain_two"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.drain_two}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="drain_three"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.drain_three}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="drain_four"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.drain_four}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="vomit"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.vomit}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="others"
                      className="form-control form-control-sm"
                      onChange={handleIntake}
                      value={intakeOutput?.others}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="fw-bold" colSpan={5}>
                    Final
                  </td>
                  <td className="fw-bold">{data?.input} mls</td>
                  <td className="fw-bold" colSpan={7}></td>
                  <td className="fw-bold">{data?.output} mls</td>
                  <td className="fw-bold">{data?.balance} mls</td>
                </tr>
              </tbody>
            </table>
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
          <Button isDisabled={loading}>Save</Button>
        </NewModal.Footer>
      </form>
    </NewModal>
  );
}
