import React, { useEffect, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";

export default function KpsModal({
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
        kps: item,
        kps_scale: `${item.grade} = ${item.name} `,
      });
    } else {
      setResult({});
      setDoctorRoundData({ ...doctorRoundData, kps: "", kps_scale: "" });
    }
  };
  const [data, setData] = useState([
    { id: 1, name: "Normal no complaints", grade: 100 },
    {
      id: 2,
      name: "Able to carry on normal activity; minor signs or symptoms of disease",
      grade: 90,
    },
    {
      id: 3,
      name: "Normal activity with effort; some signs or symptoms of disease",
      grade: 80,
    },
    {
      id: 4,
      name: "Cares for self; unable to carry on normal activity or to do active work",
      grade: 70,
    },
    {
      id: 5,
      name: "Requires occasional assistance, but is able to care for most of his personal needs",
      grade: 60,
    },
    {
      id: 6,
      name: "Requires considerable assistance and frequent medical care",
      grade: 50,
    },
    {
      id: 7,
      name: "Disabled; requires special care and assistance",
      grade: 40,
    },
    {
      id: 8,
      name: "Severely disabled; hospital admission is indicated although death not imminent",
      grade: 30,
    },
    {
      id: 9,
      name: "Very sick; hospital admission necessary; active supportive treatment necessary",
      grade: 20,
    },
    {
      id: 10,
      name: "Moribund; fatal processes progressing rapidly",
      grade: 10,
    },
    { id: 11, name: "Dead", grade: 0 },
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
    <NewModal size="full" isOpen={isOpen} onClose={handleCloseModal}>
      <NewModal.Header onClose={handleCloseModal}>
        <NewModal.Title>KPS SCALE</NewModal.Title>
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
                <th style={{ fontSize: "14px" }}>Condition</th>
                <th style={{ fontSize: "14px" }}>SELECT</th>
                <th style={{ fontSize: "14px" }}>GRADE</th>
                <th style={{ fontSize: "14px" }}>
                  KARNOFSKY PERFORMANCE STATUS SCALE DEFINITIONS RATING (%)
                  CRITERIA
                </th>
              </tr>
              {data?.map((item, i) => (
                <tr>
                  {i === 0 && (
                    <td
                      className="text-start"
                      rowSpan={3}
                      style={{ fontSize: "13px" }}
                    >
                      Able to carry on normal activity and to work; no special
                      care needed.
                    </td>
                  )}
                  {i === 3 && (
                    <td
                      className="text-start"
                      rowSpan={3}
                      style={{ fontSize: "13px" }}
                    >
                      Unable to work; able to live at home and care for most
                      personal needs; varying amount of assistance needed.
                    </td>
                  )}
                  {i === 6 && (
                    <td
                      className="text-start"
                      rowSpan={5}
                      style={{ fontSize: "13px" }}
                    >
                      Unable to care for self; requires equivalent of
                      institutional or hospital care; disease may be progressing
                      rapidly.
                    </td>
                  )}

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
