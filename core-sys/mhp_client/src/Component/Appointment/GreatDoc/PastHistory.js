import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import moment from "moment";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Button from "../../../common/components/Button";
import { NewModal as ReactModal } from "../../../common/components/NewModal";
const PastHistory = (props) => {
  const customStyles2 = {
    content: {
      top: "35%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "25%",
      height: "145px",
      background: "#ffffff",
      padding: "15px",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  function openModal1() {
    setIsOpen1(true);
  }
  function closeModal1() {
    setIsOpen1(false);
  }
  const [pastHistory, setPastHistory] = useState([]);
  const [diagnosis, setdiagnosis] = useState([]);
  const [procedure, setprocedure] = useState([]);
  const [valueUpdate, setValueUpdate] = useState();
  const [icdCode, setIcdCode] = useState([]);
  console.log(icdCode, "dde");
  useEffect(() => {
    const controller = new AbortController();
    if (props.patient_id !== null) {
      axios
        .get(`/past-history/${props.patient_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setPastHistory(res.data.past_history);
        });

      axios
        .get(`/great-doc-dignosis/${props.patient_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setdiagnosis(res.data.all_diagnosis);
        });

      axios
        .get(`/great-doc-procedure/${props.patient_id}`, {
          signal: controller.signal,
        })
        .then((res) => {
          setprocedure(res.data.all_procedures);
        });

      axios
        .get(`/diagnosis-procedure-reason/diagnosis`, {
          signal: controller.signal,
        })
        .then((res) => {
          setIcdCode(res.data.data);
        });

    }

    return () => {
      controller.abort();
    };
  }, [valueUpdate, props.diagAndPastHistoriyStateUpdate, props.patient_id]);

  const [pastHistoryData, setPastHistoryData] = useState({
    date: "",
    doctor_id: "",
    patient_id: props.patient_id,
    condition: "",
    code: "",
    saverty: "",
    description: "",
    summary: "",
    confidential: "",
    myHealthRecord: "",
    details: "",
  });

  const [editId, setEditId] = useState("");
  const handleSubmit = (e) => {
    const data = {
      date: pastHistoryData.date,
      doctor_id: pastHistoryData.doctor_id,
      patient_id: props.patient_id,
      condition: pastHistoryData.condition,
      code: pastHistoryData.code,
      saverty: pastHistoryData.saverty,
      description: pastHistoryData.description,
      summary: pastHistoryData.summary,
      confidential: pastHistoryData.confidential,
      myHealthRecord: pastHistoryData.myHealthRecord,
      details: pastHistoryData.details,
    };
    e.preventDefault();
    axios.post("/past-history-save", data).then((res) => {
      if (res.data.status === 200) {
        props.setdaignosisProps(`
                        <p className="MsoNormal" style="margin: 0in 0in 0px ; font-family: Arial, sans-serif; line-height: 180%; font-size: 15px;">
                            <span style="font-family: Roboto; color: rgb(54, 54, 54);"><strong>Diagnosis :</strong></span><br>
                            ${res.data.pastHistory
            .map((item, i) => {
              return item.condition;
            })
            .join(" , ")}
                        </p>
               `);
        Swal.fire(res.data.message, "Success..!", "success");
        e.target.reset();
        setValueUpdate(Math.random());
        props.setdiagAndPastHistoriyStateUpdate(Math.random());
        setIsOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.error_msg.email,
        });
      }
    });
  };
  const deleteHistory = (id, e) => {
    // const thisClicked = e.currentTarget;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/past-history-delete/${id}`).then((res) => {
          if (res.data.status === 200) {
            // thisClicked.closest("tr").remove();
            props.setdiagAndPastHistoriyStateUpdate(Math.random());
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };
  async function editHistory(id, e) {
    await axios
      .get(`/past-history-edit/${id}`)
      .then((res) => setPastHistoryData(res.data.past_history));
    openModal1();
    setEditId(id);
  }

  const updateHistory = (e) => {
    e.preventDefault();
    axios
      .post(`/past-history-update/${editId}`, pastHistoryData)
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire(res.data.message, "Success..!", "success");
          setValueUpdate(valueUpdate + 1);
          props.setdiagAndPastHistoriyStateUpdate(Math.random());
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.error_msg.email,
          });
        }
      });
  };

  const [procedureModel, setprocedureModel] = useState(false);
  const [proDate, setproDate] = useState();
  const [proId, setproId] = useState();
  return (
    <div className="mt-2 past-history-card g-doc-scroll">
      <div className="rx-one-button-group">
        <div className="d-flex justify-content-between">
          <h6>Past History</h6>
          <Button
            disabled={props?.patient_id ? false : true}
            onClick={openModal}
            className="me-2 mb-2"
          >
            Add Past History
          </Button>
        </div>
        <ReactModal size="md" isOpen={modalIsOpen} onClose={closeModal}>
          <ReactModal.Header onClose={closeModal}>
            <ReactModal.Title>
              Add Past History
            </ReactModal.Title>
          </ReactModal.Header>
          <ReactModal.Body>
            <form onSubmit={handleSubmit}>
              <div className="pastmodal_input row">
                <div className="col-md-6 mb-2">
                  <label for="inputEmail4" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        date: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label for="inputPassword4" className="form-label">
                    Condition
                  </label>

                  <ReactSearchAutocomplete
                    showIcon={false}
                    placeholder={"Search Condition"}
                    items={icdCode}
                    resultStringKeyName="DiagnosisProcedure_name"
                    onSelect={(e) => {
                      setPastHistoryData({
                        ...pastHistoryData,
                        condition: e.DiagnosisProcedure_name,
                        code: e.DiagnosisProcedure_code,
                      });
                    }}
                    fuseOptions={{ keys: ["DiagnosisProcedure_name"] }} // Search in the description text as well
                    styling={{
                      borderRadius: "5px !important",
                      zIndex: 3,
                    }}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label for="inputPassword4" className="form-label">
                    Severty
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        saverty: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label for="inputPassword4" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        description: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>

                <div className="col-6 mb-2">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      onChange={(e) =>
                        setPastHistoryData({
                          ...pastHistoryData,
                          details: e.target.value,
                        })
                      }
                      id="exampleFormControlTextarea1"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Doctor
                  </label>
                  {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={doctors}
                    loadingText="loading..."
                    size="small"
                    getOptionLabel={(option) => option.fullName}
                    onChange={(e, value) => {
                      setPastHistoryData({
                        ...pastHistoryData,
                        doctor_id: value.id,
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "100%", height: 10 }}
                        {...params}
                        label="Doctor"
                      />
                    )}
                  /> */}
                  <input
                    type="text"
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        doctor_id: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputPassword4"
                  />

                </div>
                <div className="col-md-6 mb-2">
                  <div className="row">
                    <div className="col-7">
                      <label>Summary : </label>
                    </div>
                    <div className="col-5">
                      <input
                        className="me-1  "
                        type="radio"
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            summary: "Yes",
                          })
                        }
                        name="rad"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        Yes
                      </label>
                      <input
                        className="mx-1 "
                        type="radio"
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            summary: "No",
                          })
                        }
                        name="rad"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="row">
                    <div className="col-7">
                      <label>Confidential : </label>
                    </div>
                    <div className="col-5">
                      <input
                        className="me-1 "
                        type="radio"
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            confidential: "Yes",
                          })
                        }
                        name="rad1"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        Yes
                      </label>
                      <input
                        className="mx-1"
                        type="radio"
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            confidential: "No",
                          })
                        }
                        name="rad1"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row rx-one-button-group">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-7">
                        <label>My Health Record : </label>
                      </div>
                      <div className="col-5">
                        <input
                          className="me-1"
                          type="radio"
                          onChange={(e) =>
                            setPastHistoryData({
                              ...pastHistoryData,
                              myHealthRecord: "Yes",
                            })
                          }
                          name="rad2"
                          id="gridCheck"
                        />
                        <label className="" for="gridCheck">
                          Yes
                        </label>
                        <input
                          className="mx-1"
                          type="radio"
                          onChange={(e) =>
                            setPastHistoryData({
                              ...pastHistoryData,
                              myHealthRecord: "No",
                            })
                          }
                          name="rad2"
                          id="gridCheck"
                        />
                        <label className="" for="gridCheck">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6  d-flex justify-content-end">
                    <Button className="mt-2" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </ReactModal.Body>
        </ReactModal>

      </div>

      <div className="past-history-table">
        {pastHistory.length > 0 && (
          <table className="past_rx_table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col" width="35%">
                  Condition
                </th>
                <th scope="col">Severty</th>
                <th scope="col">Description</th>
                {/* <th scope="col">Summary</th>
                                    <th scope="col">Confidential</th>
                                    <th scope="col">My Health Record</th>
                                    <th scope="col">Details</th> */}
                <th scope="col">Recorded By</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {pastHistory.length > 0 &&
                pastHistory.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {item.date !== null &&
                          moment(item.date).format("DD/MM/YYYY")}
                      </td>
                      <td>{item.condition}</td>
                      <td>{item.saverty}</td>
                      <td>{item.description}</td>
                      {/* <td>{item.summary}</td>
                                                <td>{item.confidential}</td>
                                                <td>{item.myHealthRecord}</td> 
                                                <td>{item.details}</td> */}
                      <td>{item.doctor_id}</td>
                      <td>
                        <i
                          onClick={(e) => editHistory(item.id, e)}
                          className="fal fa-edit me-1"
                        ></i>
                        <i
                          onClick={(e) => deleteHistory(item.id, e)}
                          className="fal fa-trash-alt me-1"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}

        {procedure.length > 0 && (
          <div>
            <h6>Procedure</h6>
            <table className="past_rx_table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col" width="50%">
                    Condition
                  </th>
                  <th scope="col">Description</th>
                  <th scope="col">Act</th>
                </tr>
              </thead>
              <tbody>
                {procedure.length > 0 &&
                  procedure.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          {item.created_at !== null &&
                            moment(item.created_at).format("DD/MM/YYYY")}
                        </td>
                        <td>{item.procedure_name}</td>
                        <td>{item.procedure_further_details}</td>
                        <td>
                          <i
                            onClick={(e) => {
                              setproDate(
                                moment(item.created_at).format("YYYY-MM-DD")
                              );
                              setproId(item.id);
                              setprocedureModel(true);
                            }}
                            className="fal fa-edit me-1"
                          ></i>
                          <i
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  axios
                                    .post(
                                      `/delete-great-doc-procedure/${item.id}`
                                    )
                                    .then((res) => {
                                      props.setprocedureStateUpdate(
                                        Math.random()
                                      );
                                      setValueUpdate(Math.random());
                                    });
                                  Swal.fire(
                                    "Deleted!",
                                    "Your data has been deleted.",
                                    "success"
                                  );
                                }
                              });
                            }}
                            className="fal fa-trash-alt me-1"
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        <ReactModal size="md" isOpen={modalIsOpen1} onClose={closeModal1}>
          <ReactModal.Header onClose={closeModal1}>
            <ReactModal.Title>
              Edit Past History
            </ReactModal.Title>
          </ReactModal.Header>
          <ReactModal.Body>
            <form onSubmit={updateHistory}>
              <div className="pastmodal_input row">
                <div className="col-md-6 mb-2">
                  <label for="inputEmail4" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    value={pastHistoryData.date}
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        date: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label for="inputPassword4" className="form-label">
                    Condition
                  </label>

                  <ReactSearchAutocomplete
                    showIcon={false}
                    placeholder={pastHistoryData.condition}
                    items={icdCode}
                    resultStringKeyName="DiagnosisProcedure_name"
                    onSelect={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        condition: e.DiagnosisProcedure_name,
                      })
                    }
                    fuseOptions={{ keys: ["DiagnosisProcedure_name"] }} // Search in the description text as well
                    styling={{
                      borderRadius: "5px !important",
                      zIndex: 3,
                    }}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label for="inputPassword4" className="form-label">
                    Severty
                  </label>
                  <input
                    type="text"
                    value={pastHistoryData.saverty}
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        saverty: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <label for="inputPassword4" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={pastHistoryData.description}
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        description: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>

                <div className="col-6 mb-2">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Details
                    </label>
                    <textarea
                      className="form-control"
                      value={pastHistoryData.details}
                      onChange={(e) =>
                        setPastHistoryData({
                          ...pastHistoryData,
                          details: e.target.value,
                        })
                      }
                      id="exampleFormControlTextarea1"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <label for="exampleFormControlTextarea1" className="form-label">
                    Doctor
                  </label>
                  <input
                    type="text"
                    value={pastHistoryData?.doctor_id}
                    onChange={(e) =>
                      setPastHistoryData({
                        ...pastHistoryData,
                        doctor_id: e.target.value,
                      })
                    }
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <div className="row">
                    <div className="col-7">
                      <label>Summary : </label>
                    </div>
                    <div className="col-5">
                      <input
                        className="me-1"
                        type="radio"
                        defaultChecked={pastHistoryData.summary === "Yes" && true}
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            summary: "Yes",
                          })
                        }
                        name="rad"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        Yes
                      </label>
                      <input
                        className="mx-1 "
                        type="radio"
                        defaultChecked={pastHistoryData.summary === "No" && true}
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            summary: "No",
                          })
                        }
                        name="rad"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="row">
                    <div className="col-7">
                      <label>Confidential : </label>
                    </div>
                    <div className="col-5">
                      <input
                        className="me-1 "
                        type="radio"
                        defaultChecked={
                          pastHistoryData.confidential === "Yes" && true
                        }
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            confidential: "Yes",
                          })
                        }
                        name="rad1"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        Yes
                      </label>
                      <input
                        className="mx-1"
                        type="radio"
                        defaultChecked={
                          pastHistoryData.confidential === "No" && true
                        }
                        onChange={(e) =>
                          setPastHistoryData({
                            ...pastHistoryData,
                            confidential: "No",
                          })
                        }
                        name="rad1"
                        id="gridCheck"
                      />
                      <label className="" for="gridCheck">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row rx-one-button-group">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-7">
                        <label>My Health Record : </label>
                      </div>
                      <div className="col-5">
                        <input
                          className="me-1"
                          type="radio"
                          defaultChecked={
                            pastHistoryData.myHealthRecord === "Yes"
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            setPastHistoryData({
                              ...pastHistoryData,
                              myHealthRecord: "Yes",
                            })
                          }
                          name="rad2"
                          id="gridCheck"
                        />
                        <label className="" for="gridCheck">
                          Yes
                        </label>
                        <input
                          className="mx-1"
                          type="radio"
                          defaultChecked={
                            pastHistoryData.myHealthRecord === "No" ? true : false
                          }
                          onChange={(e) =>
                            setPastHistoryData({
                              ...pastHistoryData,
                              myHealthRecord: "No",
                            })
                          }
                          name="rad2"
                          id="gridCheck"
                        />
                        <label className="" for="gridCheck">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <Button className="mt-2" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </ReactModal.Body>
        </ReactModal>

        <Modal
          isOpen={procedureModel}
          onRequestClose={procedureModel}
          style={customStyles2}
          contentLabel="Example Modal"
        >
          <span
            className="float-end"
            style={{ fontSize: "15px", marginTop: "-5px", cursor: "pointer" }}
            onClick={() => {
              setprocedureModel(false);
            }}
          >
            <i className="fal fa-times"></i>
          </span>
          <h6 style={{ marginBottom: "20px" }}>Update Procedure</h6>

          <div className="d-flex">
            <label for="inputEmail4" className="form-label mr-2">
              Date
            </label>
            <input
              type="date"
              value={proDate}
              onChange={(e) => setproDate(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              className=" mt-2"
              onClick={() => {
                const data = { date: proDate };
                axios
                  .put(`update-great-doc-procedure/${proId}`, data)
                  .then((res) => {
                    props.setprocedureStateUpdate(Math.random());
                    setValueUpdate(Math.random());
                    setprocedureModel(false);
                  });
              }}
            >
              Update
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PastHistory;
