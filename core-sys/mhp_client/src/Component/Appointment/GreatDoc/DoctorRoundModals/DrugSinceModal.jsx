import React, { useEffect, useState } from "react";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function DrugSinceModal({
  isOpen,
  onClose,
  appId,
  doctorId,
  admissionId,
  patientId,
}) {
  const [date, setDate] = useState(new Date());
  const handleCloseModal = () => {
    onClose();
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    if (isOpen) {
      axios.get("drug-since-list").then((res) => {
        setData(res?.data);
      });
      if (admissionId) {
        axios.get(`drug-since-entries/${admissionId}`).then((res) => {
          setResult(res?.data?.drugs || []);
        });
      }
    }
  }, [isOpen, admissionId]);
  const [result, setResult] = useState([]);

  const handleChange = (e, item) => {
    const { value, name } = e.target;
    setResult((prev) => {
      const exist = prev.find((it) => Number(it.drug_id) === Number(item.id));
      if (exist) {
        return prev.map((it) =>
          Number(it.drug_id) === Number(item.id) ? { ...it, [name]: value } : it
        );
      } else {
        return [...prev, { name: item.name, drug_id: item.id, [name]: value }];
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
      admission_id: admissionId,
      date: date,
      drugs: result,
    };
    axios
      .post(`drug-since-save`, postData)
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
        <NewModal.Title>
          Drugs, Please indicate the number of days since antibiotics began:
        </NewModal.Title>
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
          <div
            className="card-header cns-container"
            style={{ background: "white" }}
          >
            <div
              id="v-pills-tab"
              role="tablist"
              className="nav nav-pills d-flex align-items-center"
              aria-orientation="horizontal"
            >
              <button
                class="nav-link text-start active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Input
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-details-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-details"
                type="button"
                role="tab"
                aria-controls="v-pills-details"
                aria-selected="true"
              >
                Output
              </button>
            </div>
          </div>
          <div id="v-pills-tabContent" class="tab-content">
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <div className="row g-2 drug-since">
                {data?.map((item, i) => {
                  return (
                    <div key={item?.id} className="col-lg-2 col-md-6">
                      <div
                        className={`setup-card ${i > 6 ? "mt-2" : ""}`}
                        style={{
                          // background: "whiteSmoke",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid #ccc",
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
                          className="scroll-sidebar g-doc-scroll"
                          style={{
                            height: "280px",
                            border: "none",
                          }}
                        >
                          <ul>
                            {item?.drugs?.map((linkItem, i) => (
                              <li key={i}>
                                <div className="drug-since-input">
                                  <label
                                    className=" cursor-pointer"
                                    style={{
                                      lineHeight: "12px",
                                      fontSize: "14px",
                                    }}
                                    htmlFor={`task${linkItem.id}`}
                                  >
                                    {linkItem.name}
                                  </label>
                                  <div className="input-group input-group-sm">
                                    <input
                                      type="text"
                                      aria-label="Last name"
                                      className="form-control form-control-sm"
                                      placeholder="Days"
                                      name="days"
                                      defaultValue={
                                        result?.find(
                                          (it) =>
                                            Number(it.drug_id) ===
                                            Number(linkItem.id)
                                        )?.days
                                      }
                                      onBlur={(e) => handleChange(e, linkItem)}
                                    />
                                    <input
                                      type="text"
                                      aria-label="First name"
                                      className="form-control form-control-sm"
                                      placeholder="Dose"
                                      name="dose"
                                      defaultValue={
                                        result?.find(
                                          (it) =>
                                            Number(it.drug_id) ===
                                            Number(linkItem.id)
                                        )?.dose
                                      }
                                      onBlur={(e) => handleChange(e, linkItem)}
                                    />
                                    <input
                                      type="text"
                                      aria-label="Last name"
                                      className="form-control form-control-sm"
                                      placeholder="Route"
                                      name="route"
                                      defaultValue={
                                        result?.find(
                                          (it) =>
                                            Number(it.drug_id) ===
                                            Number(linkItem.id)
                                        )?.route
                                      }
                                      onBlur={(e) => handleChange(e, linkItem)}
                                    />
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-details"
              role="tabpanel"
              aria-labelledby="v-pills-details-tab"
            >
              <div className="row g-2 drug-since">
                {data?.map((item, i) => {
                  return (
                    <div key={item?.id} className="col-lg-2 col-md-6">
                      <div
                        className={`setup-card ${i > 6 ? "mt-2" : ""}`}
                        style={{
                          // background: "whiteSmoke",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid #ccc",
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
                          className="scroll-sidebar g-doc-scroll"
                          style={{
                            height: "280px",
                            border: "none",
                          }}
                        >
                          <table className="past_rx_table mt-2">
                            <tbody>
                              {result
                                ?.filter(
                                  (it) =>
                                    Number(it?.drug?.category_id) ===
                                    Number(item.id)
                                )
                                ?.map((res, j) => (
                                  <>
                                    <tr>
                                      <td className="text-start" colSpan={3}>
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
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-employee"
              role="tabpanel"
              aria-labelledby="v-pills-employee-tab"
            >
              <div className="row g-2 drug-since">
                {data?.map((item, i) => {
                  return (
                    <div key={item?.id} className="col-lg-2 col-md-6">
                      <div
                        className={`setup-card ${i > 6 ? "mt-2" : ""}`}
                        style={{
                          // background: "whiteSmoke",
                          boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            borderBottom: "1px solid #ccc",
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
                          className="scroll-sidebar g-doc-scroll"
                          style={{
                            height: "280px",
                            border: "none",
                          }}
                        >
                          <table className="past_rx_table mt-2">
                            <tbody>
                              {result
                                ?.filter(
                                  (it) =>
                                    Number(it?.drug?.category_id) ===
                                    Number(item.id)
                                )
                                ?.map((res) => (
                                  <>
                                    <tr>
                                      <td className="text-start" colSpan={3}>
                                        {res?.drug?.name}
                                      </td>
                                    </tr>
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
                    </div>
                  );
                })}
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
