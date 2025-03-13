import React, { useEffect, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function PathologyResultModal({
  isOpen,
  onClose,
  appId,
  doctorId,
  patientId,
}) {
  const [date, setDate] = useState(new Date());
  const handleCloseModal = () => {
    onClose();
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    if (isOpen) {
      axios.get("round-pathology").then((res) => {
        console.log(res.data);
        setData(res?.data);
      });
    }
  }, [isOpen]);
  const [result, setResult] = useState([]);

  const handleChange = (e, item) => {
    const { value } = e.target;
    setResult((prev) => {
      if (value) {
        const exist = prev.find((it) => it.id === item.id);
        if (exist) {
          return prev.map((it) => (it.id === item.id ? { ...it, value } : it));
        } else {
          return [...prev, { name: item.name, id: item.id, value }];
        }
      } else {
        return prev.filter((it) => it.id !== item.id);
      }
    });
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const resultArr = data.map((item) => {
      const exist = result.find((it) => it.id === item.id);
      if (exist) {
        return { id: item?.id, name: item.name, value: exist.value };
      } else {
        return { id: item?.id, name: item.name, value: "" };
      }
    });
    const postData = {
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_id: appId,
      date: date,
      result: resultArr,
    };
    axios
      .post(`doctor-round-save-radiology`, postData)
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
  return (
    <NewModal size="lg" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>Pathology Result</NewModal.Title>
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
            <div className="col-4 mb-2">
              <div className="row custom-card p-2 mx-1">
                <div className="col-6">
                  <label className="form-label">Date</label>
                </div>
                <div className="col-6">
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    value={date}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
            {data?.map((item) => {
              return (
                <div key={item?.id} className="col-4 mb-2">
                  <div className="row custom-card p-2 mx-1">
                    <div className="col-6">
                      <label className="form-label">{item?.name}</label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        onBlur={(e) => handleChange(e, item)}
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
