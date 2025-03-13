import React, { useEffect, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";

export default function EcogModal({
  isOpen,
  onClose,
  doctorRoundData,
  setDoctorRoundData,
}) {
  const [result, setResult] = useState({});
  const handleCloseModal = () => {
    onClose();
  };
  const handleChange = (e, item) => {
    const { checked } = e.target;
    if (checked) {
      setResult(item);
      setDoctorRoundData({
        ...doctorRoundData,
        ecog: item,
        ecog_scale: `${item.grade} = ${item.name} `,
      });
    } else {
      setResult({});
      setDoctorRoundData({ ...doctorRoundData, ecog: "", ecog_scale: "" });
    }
  };
  const [data, setData] = useState([
    {
      id: 1,
      name: "Fully active, able to carry on all pre-disease performance without restriction",
      grade: 0,
    },
    {
      id: 2,
      name: "Restricted in physically strenuous activity but ambulatory and able to carry out work of a light or sedentary nature, e.g., light house work, office work",
      grade: 1,
    },
    {
      id: 3,
      name: "Ambulatory and capable of all selfcare but unable to carry out any work activities; up and about more than 50% of waking hours",
      grade: 2,
    },
    {
      id: 4,
      name: "Capable of only limited selfcare; confined to bed or chair more than 50% of waking hours",
      grade: 3,
    },
    {
      id: 5,
      name: "Completely disabled; cannot carry on any selfcare; totally confined to bed or chair",
      grade: 4,
    },
    { id: 6, name: "Dead", grade: 5 },
  ]);
  // useEffect(() => {
  //   if (isOpen) {
  //     axios.get("round-pathology").then((res) => {
  //       console.log(res.data);
  //       setData(res?.data);
  //     });
  //   }
  // }, [isOpen]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <NewModal size="md" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>ECOG SCALE</NewModal.Title>
      </NewModal.Header>
      <NewModal.Body
        styles={{
          minHeight: "200px",
        }}
      >
        <div className="row g-2">
          <table style={{ tableLayout: "auto" }} className="past_rx_table">
            <tbody>
              <tr>
                <th style={{ fontSize: "14px" }}>SELECT</th>
                <th style={{ fontSize: "14px" }}>GRADE</th>
                <th style={{ fontSize: "14px" }}>ECOG PERFORMANCE STATUS</th>
              </tr>
              {data?.map((item) => (
                <tr>
                  <td style={{ fontSize: "14px" }}>
                    <input
                      className=""
                      type="checkbox"
                      name="flexRadioDefault"
                      checked={result?.id === item?.id}
                      onChange={(e) => handleChange(e, item)}
                    />
                  </td>
                  <td style={{ fontSize: "14px" }}>{item?.grade}</td>
                  <td style={{ fontSize: "14px" }} className="text-start">
                    {item.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NewModal.Body>
      <NewModal.Footer>
        <Button onClick={handleCloseModal}>Save</Button>
      </NewModal.Footer>
    </NewModal>
  );
}
