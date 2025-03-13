import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import MaterialTable from "material-table";
import Modal from "react-modal";
import { toast } from "react-toastify";

function PatientLabReport() {
  const { id } = useParams();

  const [addModal, setaddModal] = useState(false);
  const [modalShow, setmodalShow] = useState(false);
  const [name, setname] = useState();
  const [stateupdate, setstateupdate] = useState();
  const [labReport, setlabReport] = useState([]);
  const [singleFIle, setsingleFIle] = useState([]);

  useEffect(() => {
    axios.get(`get-patient-report-file/${id}`).then((res) => {
      console.log("res", res.data);
      setlabReport(res.data.data);
    });
  }, [stateupdate]);

  const customStyles = {
    content: {
      top: "30%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      // overflowY: 'hidden',
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "80%",
      padding: "10px",
      marginLeft: "38%",
    },
  };
  const customStylesModel = {
    content: {
      top: "35%",
      left: "20%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "90%",
      padding: "10px",
      overflowY: "hidden",
      marginLeft: "38%",
    },
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageArray, setimageArray] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setimageArray(files);
    if (files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        dataURL: URL.createObjectURL(file),
        type: file.type,
      }));

      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const saveData = () => {
    const formData = new FormData();
    formData.append("patient_id", id);
    formData.append("name", name);

    Array.from(imageArray).forEach((item) => {
      formData.append("images[]", item);
    });

    axios
      .post("upload-patient-report-file", formData)
      .then((res) => {
        toast.success("Report upload sucessfulley");
        setaddModal(false);
        setSelectedFiles([]);
        setstateupdate(Math.random());
      })
      .catch((err) => console.log("err", err));
  };

  const tableColumns = [
    { title: "Name", field: "name" },
    {
      title: "Report",
      render: (row) => (
        <div
          style={{
            height: "100px",
            width: "100px",
            padding: "7px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {row?.file ? (
            <embed
              className="img-fluid"
              src={`${global.img_url}/images/patients_reports/${row.file}`}
              alt="Labreport"
            />
          ) : null}
        </div>
      ),
    },
    {
      title: "upload date",
      render: (row) => moment(row.created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Act",
      render: (row) => (
        <i
          style={{ cursor: "pointer" }}
          onClick={() => {
            setmodalShow(true);
            setsingleFIle(row?.file);
          }}
          class="fa-regular fa-eye"
        ></i>
      ),
      cellStyle: {
        width: "5%",
      },
    },
  ];
  return (
    <>
      <div className="custom-card flex-grow-1">
        <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
          Lab report for patient
          <button
            onClick={() => setaddModal(true)}
            className="btn btn-success btn-sm  float-end"
          >
            Add
          </button>
        </h5>
      </div>
      <div className="custom-card">
        <div className="card-body">
          <MaterialTable
            columns={tableColumns}
            data={labReport}
            options={{
              search: true,
              showTitle: false,
              searchFieldAlignment: "left",
              pageSize: 5,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20, 50, 100],
            }}
          />
        </div>
      </div>

      <Modal isOpen={addModal} style={customStyles}>
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
          onClick={() => {
            setSelectedFiles([]);
            setaddModal(false);
          }}
        >
          <i className="fal fa-times"></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Upload lab report</h6>
        <hr className="top-hr" />

        <div className="row mt-2">
          <div className="col-5">
            <div class="form-group">
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="write your report name"
              />
            </div>
          </div>
          <div className="col-5">
            <div class="form-group">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </div>
          <div className="col-2">
            <button
              type="button"
              onClick={saveData}
              class="btn btn-outline-success btn-sm"
            >
              Save
            </button>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div>
            <h6>Preview:</h6>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  style={{ marginRight: "10px", marginBottom: "10px" }}
                >
                  {file.type.startsWith("image") ? (
                    <img
                      src={file.dataURL}
                      alt={`Selected ${index + 1}`}
                      style={{ height: "350px", width: "100%" }}
                    />
                  ) : file.type === "application/pdf" ? (
                    <div
                      style={{
                        height: "350px",
                        width: "100%",
                      }}
                    >
                      <embed
                        className="img-fluid"
                        src={file.dataURL}
                        type="application/pdf"
                      />
                    </div>
                  ) : (
                    <p>Preview not available for this file type</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
      <Modal isOpen={modalShow} style={customStylesModel}>
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer", marginTop: "-5px" }}
          onClick={() => {
            setsingleFIle();
            setmodalShow(false);
          }}
        >
          <i className="fal fa-times"></i>
        </span>
        <h6 style={{ fontSize: "14px" }}>Preview lab report</h6>
        <hr className="top-hr" />
        <embed
          style={{
            height: "450px",
            width: "100%",
          }}
          src={`${global.img_url}/images/patients_reports/${singleFIle}`}
          alt="Labreport"
          className="Labreport"
        />
      </Modal>
    </>
  );
}

export default PatientLabReport;
