import axios from "axios";
import { setDate } from "date-fns";
import MaterialTable from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import "./CameraFile.css";
// import { Modal as NewModal } from "../../../../common/components/Modal";
import image from "../../../../Images/pic1.jpg";
import { NewModal } from "../../../../common/components/NewModal";
import Button from "../../../../common/components/Button";

export default function CameraFile(props) {
  const cameraModelStyles = {
    content: {
      top: "33%",
      left: "23%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "70%",
      height: "78%",
      background: "#F3F2EF",
      padding: "10px",
      marginLeft: "38%",
    },
  };
  const Styles = {
    content: {
      top: "36%",
      left: "30%",
      height: "80vh",
      width: "36%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
    },
  };

  const [cameraModel, setcameraModel] = useState(false);
  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user",
  };

  const [data, setdata] = useState({
    patient_id: null,
    doctor_id: null,
    desc: null,
    image: null,
  });
  const [cameraData, setcameraData] = useState();

  const [loding, setloding] = useState(false);
  const [imageModel, setimageModel] = useState(false);
  const [singleitem, setsingleitem] = useState();
  const [stateUpdate, setstateUpdate] = useState();

  useEffect(() => {
    if (!loding) {
      setloding(true);
      const storageData = JSON.parse(localStorage.getItem("userData"));
      setdata({
        ...data,
        doctor_id: parseInt(storageData.user_id),
        patient_id: parseInt(props.patient_id),
      });

      axios
        .get(`camera/${storageData.user_id}/${props.patient_id}`)
        .then((res) => {
          setcameraData(res.data);
          setloding(false);
        })
        .catch((err) => {
          setloding(false);
        });
    }

    return () => {
      setloding(false);
    };
  }, [props.patient_id, stateUpdate]);
  const [camera, setCamera] = useState(false);
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const cameras = devices.filter(
          (device) => device.kind === "videoinput"
        );

        if (cameras.length > 0) {
          console.log("Camera(s) detected.");
          setCamera(true);
          // You can perform further actions here, like starting a video stream or enabling camera-related features.
        } else {
          console.log("No camera detected.");
          // Handle the case where no camera is available.
          setCamera(false);
        }
      })
      .catch((error) => {
        console.error("Error enumerating devices:", error);
        setCamera(false);
        // Handle the error, such as showing an error message to the user.
      });
  }, []);
  const openCamera = () => {
    if (camera) {
      setcameraModel(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Camera is not available!",
      });
    }
  };
  const closeCamera = () => {
    setcameraModel(false);
  };
  return (
    <>
      <div>
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
          onClick={() => props.setcamFileModel(false)}
        >
          <i className="fal fa-times"></i>
        </span>

        <h6 style={{ fontSize: "14px" }}>Image File</h6>
        <div className="camera"></div>
      </div>
      <hr />
      <div>
        <div className="d-flex justify-content-between rx-one-button-group mb-2">
          <h6>All data</h6>
          <button className="btn" onClick={openCamera}>
            <i
              style={{
                fontSize: "1rem",
                marginRight: "9px",
              }}
              class="fa-solid fa-camera"
            ></i>
            Open camera
          </button>
        </div>
        {loding ? (
          <i
            style={{
              fontSize: "70px",
              marginLeft: "45%",
              marginTop: "15%",
              color: "gray",
            }}
            className="fas fa-spinner fa-spin"
          ></i>
        ) : (
          <MaterialTable
            columns={[
              {
                title: "SL",
                field: "SL",
                render: (item) => <div>{item.tableData.id + 1}</div>,
                cellStyle: {
                  width: "10%",
                },
              },

              {
                title: "Date",
                field: "created_at",
                render: (item) => (
                  <div>{moment(item.created_at).format("DD.MM.YYYY")}</div>
                ),
                cellStyle: {
                  width: "25%",
                },
              },
              {
                title: "Description",
                field: "desc",
                cellStyle: {
                  width: "25%",
                },
              },
              {
                title: "Image",
                render: (row) => (
                  <div
                    style={row.image && { cursor: "pointer" }}
                    onClick={() => {
                      setsingleitem(row.image);
                      if (row.image) {
                        setimageModel(true);
                      }
                    }}
                  >
                    {row.image && (
                      <img
                        src={row.image}
                        width="100px"
                        height="100px"
                        alt="Image"
                      />
                    )}
                  </div>
                ),
              },

              {
                title: "Act",
                render: (item) => (
                  <>
                    <i
                      onClick={() => {
                        Swal.fire({
                          title: "Remove Data",
                          text: "Are you sure?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, update it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            axios.delete(`/camera/${item.id}`).then((res) => {
                              setstateUpdate(Math.random());
                            });
                            Swal.fire(
                              "Deleted!",
                              "Data delete successfully",
                              "success"
                            );
                          }
                        });
                      }}
                      class="fa fa-trash PrescribedRxDelete"
                      aria-hidden="true"
                    ></i>
                  </>
                ),
                cellStyle: {
                  width: "10%",
                  alignContent: "center",
                },
              },
            ]}
            data={cameraData}
            options={{
              search: true,
              emptyRowsWhenPaging: false,
              showTitle: false,
              headerStyle: {
                backgroundColor: "#EEE",
                zIndex: -1,
              },
            }}
          />
        )}
      </div>

      <Modal isOpen={imageModel} style={Styles}>
        <span className="float-end">
          <i
            className="fal fa-times"
            onClick={() => setimageModel(false)}
            style={{ cursor: "pointer" }}
          ></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Image Preview</h6>
        <hr />
        {singleitem && <img src={singleitem} alt="pedi_image" sizes="500" />}
      </Modal>
      <NewModal
        size="full"
        className="full"
        isOpen={cameraModel}
        onClose={closeCamera}
      >
        <NewModal.Header onClose={closeCamera}>
          <NewModal.Title>Camera</NewModal.Title>
        </NewModal.Header>
        <NewModal.Body className="modal-body-full">
          <div className="row">
            <div className="col-sm-8">
              <Webcam
                audio={false}
                height={400}
                screenshotFormat="image/jpeg"
                width={400}
                videoConstraints={videoConstraints}
              >
                {({ getScreenshot }) => (
                  <div className="row">
                    <div className="col-8">
                      <input
                        type="text"
                        onBlur={(e) =>
                          setdata({ ...data, desc: e.target.value })
                        }
                        placeholder="Write Image Description"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-3 rx-one-button-group">
                      <button
                        className="btn"
                        onClick={() => {
                          const imageSrc = getScreenshot();
                          setdata({ ...data, image: imageSrc });
                        }}
                      >
                        Capture photo
                      </button>
                      {/* <button
                        disabled={data.image ? false : true}
                        onClick={() => {
                          axios
                            .post("camera", data)
                            .then((res) => {
                              toast.success("Data save successfully");
                              setstateUpdate(Math.random());
                              setcameraModel(false);
                              setdata({ ...data, image: null });
                            })
                            .catch((err) => {
                              toast.error("Something is wrong !");
                            });
                        }}
                        // style={{ padding: "0 24px" }}
                        className="btn ms-2"
                      >
                        Save
                      </button> */}
                    </div>
                  </div>
                )}
              </Webcam>
            </div>
            <div className="col-sm-4">
              <div
                style={{
                  minHeight: "380px",
                }}
                className="d-flex justify-content-center"
              >
                {data.image ? (
                  // <img src={data.image} alt="webcame image" />
                  <img
                    style={{ width: "100%", height: "380px" }}
                    src={data.image}
                    alt="webcame"
                  />
                ) : (
                  <h6>Image Preview</h6>
                )}
              </div>
              <div className="rx-one-button-group mt-4">
                <button
                  disabled={data.image ? false : true}
                  onClick={() => {
                    axios
                      .post("camera", data)
                      .then((res) => {
                        toast.success("Data save successfully");
                        setstateUpdate(Math.random());
                        setcameraModel(false);
                        setdata({ ...data, image: null });
                      })
                      .catch((err) => {
                        toast.error("Something is wrong !");
                      });
                  }}
                  // style={{ padding: "0 24px" }}
                  className="btn ms-2 float-end px-4"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </NewModal.Body>
      </NewModal>
      {/* <Modal
        isOpen={cameraModel}
        onRequestClose={cameraModel}
        style={cameraModelStyles}
        contentLabel="Example Modal"
      >
        <div style={{ backgroundColor: "#F3F2EF" }}>
          <span
            className="float-end"
            style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
            onClick={() => {
              setcameraModel(false);
              setdata({ ...data, image: null });
            }}
          >
            <i className="fal fa-times"></i>
          </span>

          <h6 style={{ fontSize: "14px" }}>Camera</h6>

          <div className="row">
            <div className="col-sm-6">
              <Webcam
                audio={false}
                height={500}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={videoConstraints}
              >
                {({ getScreenshot }) => (
                  <div className="d-flex rx-one-button-group">
                    <button
                      className="btn"
                      onClick={() => {
                        const imageSrc = getScreenshot();
                        setdata({ ...data, image: imageSrc });
                      }}
                    >
                      Capture photo
                    </button>
                    <input
                      type="text"
                      onBlur={(e) => setdata({ ...data, desc: e.target.value })}
                      placeholder="Write Image Description"
                      className="cameraInputBox"
                    />
                    <button
                      onClick={() => {
                        axios
                          .post("camera", data)
                          .then((res) => {
                            toast.success("Data save successfully");
                            setstateUpdate(Math.random());
                            setcameraModel(false);
                            setdata({ ...data, image: null });
                          })
                          .catch((err) => {
                            toast.error("Something is wrong !");
                          });
                      }}
                      style={{ padding: "0 24px" }}
                      className="btn"
                    >
                      Save
                    </button>
                  </div>
                )}
              </Webcam>
            </div>
            <div className="col-sm-6 d-flex justify-content-center">
              {data.image ? (
                <img src={data.image} alt="webcame image" />
              ) : (
                <h6>Image Preview</h6>
              )}
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
}
