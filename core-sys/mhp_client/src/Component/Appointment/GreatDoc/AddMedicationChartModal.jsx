import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { NewModal } from "../../../common/components/NewModal";
import Button from "../../../common/components/Button";
import ReactDatePicker from "react-datepicker";
export default function AddMedicationChartModal({
  isOpen,
  onClose,
  appId,
  doctorId,
  patientId,
  data,
}) {
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    date: new Date(),
    nurse: "",
    mobile_number: "",
  });
  const handleCloseModal = () => {
    onClose();
    setDate(new Date());
    setForm({
      date: new Date(),
      nurse: "",
      mobile_number: "",
    });
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      patient_id: patientId,
      doctor_id: doctorId,
      admission_id: "",
      date: date,
      rx_id: data?.id,
      nurse: form?.nurse,
      mobile_number: form?.mobile_number,
    };
    axios
      .post(`save-given-medication`, postData)
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <NewModal size="md" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Drug Name : {data?.brand_name}</NewModal.Title>
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
          <div className="form-group mb-1">
            <label htmlFor="name" className="form-label mb-0">
              Nurse
            </label>
            <input
              type="text"
              className="form-control mb-2 form"
              id="name"
              placeholder="Enter Name"
              name="nurse"
              value={form?.nurse || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group mb-1">
                <label htmlFor="contact" className="form-label mb-0">
                  Contact
                </label>
                <input
                  type="number"
                  className="form-control mb-2 form"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="mobile_number"
                  value={form?.mobile_number || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="contact" className="form-label mb-0">
                  Dose
                </label>
                <input
                  type="text"
                  className="form-control mb-2 form"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="mobile_number"
                  value={data?.dose || ""}
                  readOnly
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="contact" className="form-label mb-0">
                  Frequency
                </label>
                <input
                  type="text"
                  className="form-control mb-2 form"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="mobile_number"
                  value={data?.frequency || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group mb-1">
                <label htmlFor="contact" className="form-label mb-0">
                  Given Date Time
                </label>
                <ReactDatePicker
                  id="patient_dob"
                  placeholderText="DD/MM/YYYY HH:mm AM/PM"
                  dateFormat="dd/MM/yyyy h:mm aa" // AM/PM format
                  maxDate={new Date()}
                  showTimeSelect
                  timeIntervals={10} // 15-minute intervals
                  style={{ padding: "20px" }}
                  autoComplete="off"
                  onChange={(d) => setDate(d)}
                  selected={date ? new Date(date) : new Date()}
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="contact" className="form-label mb-0">
                  Route
                </label>
                <input
                  type="text"
                  className="form-control mb-2 form"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="mobile_number"
                  value={data?.route || ""}
                  readOnly
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="contact" className="form-label mb-0">
                  Food
                </label>
                <input
                  type="text"
                  className="form-control mb-2 form"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="mobile_number"
                  value={data?.food || ""}
                  readOnly
                />
              </div>
            </div>
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
