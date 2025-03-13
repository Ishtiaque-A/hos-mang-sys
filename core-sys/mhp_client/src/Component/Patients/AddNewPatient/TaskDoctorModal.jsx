import React, { useEffect, useState } from "react";
import { NewModal } from "../../../common/components/NewModal";
import axios from "axios";
import { toast } from "react-toastify";
import useUserData from "../../../hooks/useUserData";
import Button from "../../../common/components/Button";
import "./SearchPatientModal.css";
import closeFull from "../../../Images/close_full_Screen.png";
import openFull from "../../../Images/open_full_Screen.png";

const TaskDoctorModal = ({
  isOpen,
  onClose,
  setUpdateSchedule,
  setAdmission,
  admission,
}) => {
  const [search, setSearch] = useState(null);
  const [selectedTask, setSelectedTask] = useState([]);

  const user = useUserData();
  const [data, setData] = useState([]);
  const [savedTask, setSavedTask] = useState([]);
  const [savedTaskAll, setSavedTaskAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (admission?.id) {
      setLoading(true);
      axios.get("doctor-tasklist").then((res) => {
        setData(res?.data || []);
      });
      axios.get(`doctor-saved-tasks/${admission?.id}`).then((res) => {
        setSavedTask(res?.data?.data || []);
        setSavedTaskAll(res?.data?.all || []);
        setLoading(false);
      });
    }
  }, [admission, updated]);
  const handleChange = (e, item) => {
    const { checked } = e.target;
    const exist = [...selectedTask];
    const existInSaved = savedTask?.find(
      (st) => Number(st?.task_id) === Number(item?.id)
    );
    if (checked) {
      exist.push(item);
      setSelectedTask([...exist]);
    } else {
      if (existInSaved) {
        axios.put(`doctor-task-save/${existInSaved?.id}`, { status: 0 });
        setSavedTask(savedTask.filter((st) => st.id !== existInSaved?.id));
        setUpdated(!updated);
      }
      setSelectedTask(exist.filter((it) => it.id !== item.id));
    }
  };
  const handleCloseModal = () => {
    setSelectedTask([]);
    setSearch(null);
    onClose();
    setSavedTask([]);
    setAdmission({});
  };
  console.log(savedTask, "ddd");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTask?.length > 0) {
      handleCloseModal();
      return;
    }
    const postData = {
      admission_id: admission?.id,
      patient_id: admission?.patient_id,
      tasks: selectedTask,
    };
    axios.post(`doctor-task-save`, postData).then((res) => {
      toast.success("Task saved successfully");
      handleCloseModal();
    });
  };
  const [showFullScreen, setShowFullScreen] = useState(true);
  const fullScreen = () => {
    document.body.requestFullscreen();
    setShowFullScreen(false);
  };
  const closeFullScreen = () => {
    document.exitFullscreen();
    setShowFullScreen(true);
  };
  return (
    <>
      <NewModal size="full" isOpen={isOpen} onClose={handleCloseModal}>
        <NewModal.Header isShowCloseIcon={false} onClose={handleCloseModal}>
          <NewModal.Title>Doctor's Task </NewModal.Title>
          <div>
            {showFullScreen ? (
              <img
                className="ms-3 screen-img"
                onClick={() => {
                  fullScreen();
                  setShowFullScreen(!showFullScreen);
                }}
                src={openFull}
                alt=""
              />
            ) : (
              <img
                className="ms-3 screen-img"
                onClick={() => {
                  closeFullScreen();
                  setShowFullScreen(!showFullScreen);
                }}
                src={closeFull}
                alt=""
              />
            )}
          </div>
        </NewModal.Header>
        <form onSubmit={handleSubmit}>
          <NewModal.Body styles={{ minHeight: "400px" }}>
            <div className="row">
              <div className="col-9">
                <div className="row">
                  {data?.map((item, i) => (
                    <div key={i} className="col-lg-4 col-md-6">
                      <div
                        className={`setup-card ${i > 3 ? "mt-2" : ""}`}
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
                          className=""
                          style={{
                            // height: "160px",
                            border: "none",
                          }}
                        >
                          <ul>
                            {item?.tasks?.map((linkItem, i) => (
                              <li>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "4px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    className="mt-2"
                                    onChange={(e) => handleChange(e, linkItem)}
                                    id={`task${linkItem.id}`}
                                    checked={
                                      savedTask?.find(
                                        (st) =>
                                          Number(st?.task_id) === linkItem.id
                                      )
                                        ? true
                                        : selectedTask?.find(
                                            (st) => st?.id === linkItem.id
                                          )
                                        ? true
                                        : false
                                    }
                                  />{" "}
                                  <label
                                    className="mt-1 cursor-pointer"
                                    htmlFor={`task${linkItem.id}`}
                                  >
                                    {linkItem.name}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-3">
                <div
                  className={`setup-card`}
                  style={{
                    // background: "whiteSmoke",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
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
                      Assigned Task
                    </h6>
                  </div>
                  <div
                    className=""
                    style={{
                      // height: "160px",
                      border: "none",
                    }}
                  >
                    <div className="past-history-table past-visit-table g-doc-scroll">
                      {savedTaskAll?.length > 0 && !loading ? (
                        <table className="past_rx_table">
                          <thead>
                            <tr>
                              <th
                                style={{ fontSize: "13px" }}
                                width={"10%"}
                                scope="col"
                              >
                                SL
                              </th>
                              <th
                                style={{ fontSize: "13px" }}
                                width={"70%"}
                                scope="col"
                              >
                                Task
                              </th>
                              <th style={{ fontSize: "13px" }} scope="col">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {savedTaskAll?.length > 0 &&
                              savedTaskAll?.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td style={{ fontSize: "13px" }}>
                                      {i + 1}
                                    </td>
                                    <td
                                      style={{ fontSize: "13px" }}
                                      className="text-start"
                                    >
                                      {item?.name}
                                    </td>
                                    <td style={{ fontSize: "12px" }}>
                                      {Number(item?.status) === 0
                                        ? `Done`
                                        : `Pending`}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      ) : (
                        !loading && (
                          <p className="text-center mt-lg-5 mt-lg-2 text-danger">
                            Records are not available
                          </p>
                        )
                      )}
                      {loading && (
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: "200px" }}
                        >
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
            <Button>Save</Button>
          </NewModal.Footer>
        </form>
      </NewModal>
    </>
  );
};

export default TaskDoctorModal;
