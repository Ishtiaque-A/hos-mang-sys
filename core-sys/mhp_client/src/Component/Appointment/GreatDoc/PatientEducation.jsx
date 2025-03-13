import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import useResizeObserver from "../../../hooks/useResizeObserver";
import { FaTrash } from "react-icons/fa";
import { LiaTimesCircle } from "react-icons/lia";

export default function PatientEducation() {
  const [pfileName, setpfileName] = useState();
  const [name, setname] = useState();
  const [headingId, setheadingId] = useState();
  const [pedictrictArray, setpedictrictArray] = useState([]);
  const [pdfPreview, setpdfPreview] = useState();

  const [pdfPreviewModelShow, setpdfPreviewModelShow] = useState(false);
  const [headingModelShow, setheadingModelShow] = useState(false);

  const [randerData, setranderData] = useState();

  const [headingName, setheadingName] = useState();

  const [headName, setHeadName] = useState([]);

  const [groupData, setGroupData] = useState(null);
  const [patientEducationCategory, setPatientEducationCategory] = useState([]);

  useEffect(() => {
    axios
      .get("https://server.macrohealthplus.org/group/get")
      .then((res) => {
        setGroupData(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (groupData?.length > 0) {
      axios
        .get(`https://server.macrohealthplus.org/group/get/${groupData[0]?.id}`)
        .then((res) => {
          setHeadName(res?.data?.data);
          setPatientEducationCategory(
            res?.data?.data?.categories[0]?.subCategories
          );
        })
        .catch((err) => console.log(err));
    }
  }, [groupData]);

  console.log(groupData, "patient education");
  console.log(headName, "patient education head name");
  // useEffect(() => {
  //   setloading(true);
  //   axios.get("/peditric-bangla").then((res) => {
  //     setpedictrictArray(res.data.pData);
  //     setloading(false);
  //   });
  // }, [randerData]);
  const { width } = useResizeObserver();
  const StylesPdfPreview = {
    content: {
      top: width > 900 ? "35%" : "35%",
      left: width > 900 ? "21%" : "16%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: width > 900 ? "79%" : "90%",
      height: width > 900 ? "85%" : "75%",
      marginLeft: "38%",
      overflow: "hidden",
      borderRadius: "10px",
    },
  };
  const headingModel = {
    content: {
      top: "35%",
      left: "34%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "32%",
      height: "50%",
      overflow: "hidden",
      padding: "10px",
      borderRadius: "10px",
    },
  };

  const [headingdata, setheadingdata] = useState([]);
  const [dataByHeading, setdataByHeading] = useState([]);
  const [stateupdate, setstateupdate] = useState();
  const [loading, setloading] = useState(false);
  // useEffect(() => {
  //   setloading(true);
  //   axios.get("/heading").then((res) => {
  //     setheadingdata(res.data.data);
  //     axios.get(`peditric-bangla/${res.data.data[0].id}`).then((res) => {
  //       setdataByHeading(res.data.Data);
  //     });
  //     setloading(false);
  //   });
  // }, [stateupdate]);

  if (loading) {
    return <h6>Loading...</h6>;
  }
  const loadPatientEducation = (e, item) => {
    e.preventDefault();
    setPatientEducationCategory(item?.subCategories);
  };
  console.log(pdfPreview, "pdfPreview");
  return (
    <>
      {/* <div className="row">
        <div className="col-sm-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter File Name"
            className="form-control"
          />
        </div>
        <div className="col-sm-4 d-flex">
          <select
            name="cars"
            id="cars"
            className="form-control"
            onChange={(e) => setheadingId(e.target.value)}
          >
            <option>Select</option>
            {headingdata.length > 0 &&
              headingdata.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>

          <span
            onClick={() => setheadingModelShow(true)}
            style={{
              cursor: "pointer",
            }}
          >
            <FaTrash
              size={15}
              className="PrescribedRxDelete"
              style={{
                margin: "0px 10px",
              }}
            />
          </span>
        </div>

        <div className="col-sm-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setpfileName(e.target.files[0])}
            className="form-control"
          />
        </div>
        {pfileName ? (
          <button
            className="col-sm-2 btn btn-outline-success"
            onClick={() => {
              const formData = new FormData();
              formData.append("pfileName", pfileName);
              formData.append("name", name);
              formData.append("headingId", parseInt(headingId));
              axios.post("save-peditric-bangla", formData).then((res) => {
                setpfileName();
                setname("");
                setranderData(Math.random());
                toast.success("Data save successfully");
              });
            }}
            style={{ padding: "1px" }}
          >
            save
          </button>
        ) : (
          <button
            className="col-sm-2 btn btn-outline-secondary"
            style={{ padding: "1px" }}
            onClick={() => {
              toast.warning("Please attach file");
            }}
          >
            upload
          </button>
        )}
      </div> */}

      <div className="cns-container mt-4">
        <ul class="nav nav-pills" id="pills-tab" role="tablist">
          {headName?.categories?.length > 0 &&
            headName?.categories?.map((item, i) => {
              return (
                <li
                  key={i}
                  class="nav-item"
                  role="presentation"
                  onClick={(e) => loadPatientEducation(e, item)}
                >
                  <button
                    class={`nav-link ${i === 0 ? "active" : ""}`}
                    id={`pills-${item.id}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${item.id}`}
                    type="button"
                    role="tab"
                    aria-controls={`pills-${item.id}`}
                    aria-selected="true"
                  >
                    {item?.categoryName}
                  </button>
                </li>
              );
            })}
        </ul>
        <div
          style={{
            height: "300px",
            overflowY: "auto",
          }}
          className="simple-scrollbar"
        >
          <div class="tab-content" id="pills-tabContent">
            {/* {headingdata.length > 0 &&
              headingdata.map((item, i) => {
                return (
                  <div
                    class={`tab-pane fade show ${i === 0 ? "active" : ""}`}
                    id={`pills-${item.id}`}
                    role="tabpanel"
                    aria-labelledby={`pills-${item.id}-tab`}
                  >
                    {dataByHeading.length > 0 ? ( */}
            <>
              <ul
                className="mt-3"
                style={{
                  width: "100%",
                  listStyle: "none",
                  margin: "0",
                  padding: "0",
                }}
              >
                {patientEducationCategory?.map((item, i) => {
                  return (
                    <div
                      className="border resource-hover-able-class-patient-education"
                      style={{
                        padding: "10px 15px",
                        margin: "10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <li
                        key={i}
                        onClick={() => {
                          setpdfPreviewModelShow(true);
                          setpdfPreview(item?.resources[0]);
                        }}
                      >
                        {item?.subCategoryName}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </>

            {/* )}
                  </div> */}
            {/* );
              })} */}
          </div>
        </div>
      </div>

      <Modal
        isOpen={pdfPreviewModelShow}
        onRequestClose={pdfPreviewModelShow}
        style={StylesPdfPreview}
        contentLabel="Example Modal"
      >
        <span className="float-end">
          <span
            onClick={() => setpdfPreviewModelShow(false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "5px",
              right: "5px",
            }}
          >
            <LiaTimesCircle size={20} className="PrescribedRxDelete" />
          </span>
          {/* <i
            className="fal fa-times"
            onClick={() => setpdfPreviewModelShow(false)}
            style={{ cursor: "pointer" }}
          ></i> */}
        </span>
        <h6 style={{ fontSize: "14px" }}>{pdfPreview?.title}</h6>
        {/* <hr /> */}
        {pdfPreview != null && (
          // eslint-disable-next-line jsx-a11y/iframe-has-title
          <iframe
            width="100%"
            height="100%"
            className="pdfPreview"
            src={`https://server.macrohealthplus.org/uploads/${pdfPreview.file}`}
          ></iframe>
        )}
      </Modal>

      <Modal
        isOpen={headingModelShow}
        onRequestClose={headingModelShow}
        style={headingModel}
        contentLabel="Example Modal"
      >
        <span className="float-end">
          <span
            onClick={() => setheadingModelShow(false)}
            style={{
              cursor: "pointer",
            }}
          >
            <FaTrash size={15} className="PrescribedRxDelete" />
          </span>
          {/* <i
            className="fal fa-times"
            onClick={() => setheadingModelShow(false)}
            style={{ cursor: "pointer" }}
          ></i> */}
        </span>
        <h6 style={{ fontSize: "12px" }}>Add Heading</h6>
        <hr />

        <div className="row">
          <div className="col-sm-10">
            <input
              type="text"
              value={headingName}
              onChange={(e) => setheadingName(e.target.value)}
              placeholder="Enter Name"
              className="form-control"
            />
          </div>
          <button
            onClick={() => {
              const data = {
                name: headingName,
              };
              axios.post("save-heading", data).then((res) => {
                toast.success("data save successfully");
                setstateupdate(Math.random());
                setheadingName("");
              });
            }}
            className="col-sm-2 btn btn-outline-secondary"
            style={{ padding: "1px" }}
          >
            Add
          </button>

          {headingdata.length > 0 && (
            <>
              <h6 className="pediatric-exam-heading">Heading</h6>
              <ul className="ml-4" style={{ width: "93%" }}>
                {headingdata.map((item, i) => {
                  return (
                    <div className="d-flex justify-content-between">
                      <li key={i}>{item.name}</li>

                      <span
                        onClick={() => {
                          axios
                            .delete(`peditric-bangla-delete/${item.id}`)
                            .then((res) => {
                              setranderData(Math.random());
                              toast.success(res.data.message);
                            });
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash size={15} className="PrescribedRxDelete" />
                      </span>
                      {/* <i
                       
                        class="fa fa-trash PrescribedRxDelete"
                        aria-hidden="true"
                      ></i> */}
                    </div>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
