import React, { useEffect, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import { set } from "date-fns";

export default function DiabeticChartModal({
  isOpen,
  onClose,
  appId,
  doctorId,
  patientId,
}) {
  const [date, setDate] = useState(new Date());
  const handleCloseModal = () => {
    onClose();
    setDate(new Date());
    setResult([]);
  };

  const [data, setData] = useState([
    { id: 1, name: "Before Breakfast" },
    { id: 2, name: "2 Hours after breakfast" },
    { id: 3, name: "Before lunch" },
    { id: 4, name: "2 Hours after lunch" },
    { id: 5, name: "Before Dinner" },
    { id: 6, name: "2 Hours after dinner" },
  ]);
  // useEffect(() => {
  //   if (isOpen) {
  //     axios.get("round-pathology").then((res) => {
  //       console.log(res.data);
  //       setData(res?.data);
  //     });
  //   }
  // }, [isOpen]);
  const [result, setResult] = useState([]);

  const handleChange = (e, item) => {
    const { value, name } = e.target;
    setResult((prev) => {
      if (value) {
        const exist = prev.find((it) => it.id === item.id);
        if (exist) {
          return prev.map((it) =>
            it.id === item.id ? { ...it, [name]: value } : it
          );
        } else {
          return [
            ...prev,
            {
              name: item.name,
              id: item.id,
              time: new Date(),
              result: "",
              insulin_type: "",
              insulin_unit: "",
              food: "",
              signature: "",
              [name]: value,
            },
          ];
        }
      } else {
        return prev;
      }
    });
  };
  const handleTimeChange = (e, item) => {
    setResult((prev) => {
      if (e) {
        const exist = prev.find((it) => it.id === item.id);
        if (exist) {
          return prev.map((it) =>
            it?.id === item?.id ? { ...it, time: e } : it
          );
        } else {
          return [
            ...prev,
            {
              name: item.name,
              id: item.id,
              result: "",
              insulin_type: "",
              insulin_unit: "",
              food: "",
              signature: "",
              time: e,
            },
          ];
        }
      } else {
        return prev;
      }
    });
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_id: appId,
      date: date,
      details: result,
    };
    axios
      .post(`save-doctor-round-diabetic-chart`, postData)
      .then((res) => {
        setLoading(false);
        handleCloseModal();
        toast.success("Saved Successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Something went wrong");
      });
  };
  console.log(result, "result");
  return (
    <NewModal size="md" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Diabetic Chart</NewModal.Title>
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
          <div className="row g-2">
            <div className="col-6 mb-1">
              <div className="row custom-card p-2 mx-1">
                <div className="col-4">
                  <label className="form-label">Date</label>
                </div>
                <div className="col-8">
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
                </div>
              </div>
            </div>
            <table style={{ tableLayout: "auto" }} className="past_rx_table">
              <tbody>
                <tr>
                  <th>Meal</th>
                  <th>Time</th>
                  <th>Result (mmol/L)</th>
                  <th>Insulin Type</th>
                  <th>Insulin Unit</th>
                  <th>Food</th>
                  <th>Signature</th>
                </tr>
                {data?.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>
                      {/* <input
                        type="text"
                        name="time"
                        onBlur={(e) => handleChange(e, item)}
                        className="form-control form-control-sm"
                      /> */}
                      <ReactDatePicker
                        id="time_picker"
                        placeholderText="Select Time"
                        name="time"
                        showTimeSelect
                        showTimeSelectOnly
                        timeFormat="hh:mm aa"
                        timeIntervals={15}
                        dateFormat="hh:mm aa"
                        selected={
                          result?.find((it) => it.id === item.id)?.time ||
                          new Date()
                        }
                        onChange={(t) => handleTimeChange(t, item)}
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="result"
                        onBlur={(e) => handleChange(e, item)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="insulin_type"
                        onBlur={(e) => handleChange(e, item)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="insulin_unit"
                        onBlur={(e) => handleChange(e, item)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="food"
                        onBlur={(e) => handleChange(e, item)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="signature"
                        onBlur={(e) => handleChange(e, item)}
                      />
                    </td>
                  </tr>
                ))}
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
