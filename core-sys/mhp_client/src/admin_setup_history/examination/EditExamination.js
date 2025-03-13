import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useReactToPrint } from "react-to-print";
import HistorySetupSidebar from "../history_setup_mainsidebar/HistorySetupSidebar";

function EditPatient(props) {
  const [statuslist, setStatusList] = useState([]);
  const [error, setError] = useState([]);
  let navigate = useNavigate();

  var url = window.location.href;
  var urlsplit = url.split("/");
  var lastpart = urlsplit[urlsplit.length - 1];
  if (lastpart === "") {
    lastpart = urlsplit[urlsplit.length - 2];
  }

  const [patientInput, setPatient] = useState({
    examination_code: "",
    examination_name: "",
    examination_status: "",
    description: "",
  });

  const [img, setImg] = useState({
    img: "",
    image: "",
  });

  const handleImage = (e) => {
    setImg({
      ...img,
      image: URL.createObjectURL(e.target.files[0]),
      [e.target.name]: e.target.files[0],
    });
  };

  const handleInput = (e) => {
    e.persist();
    setPatient({ ...patientInput, [e.target.name]: e.target.value });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    axios.get("/pstatus-dropdown").then((res) => {
      if (res.data.status === 200) {
        setStatusList(res.data.pstatus);
      }
    });

    axios.get(`/edit-examination/${lastpart}`).then((res) => {
      setImg(res.data.examination.image_icon);

      // setImg(res.data.image_icon);
      setPatient(res.data.examination);
    });
  }, []);

  // const navigate = useNavigate();
  const updatePatient = (e) => {
    e.preventDefault();

    var url = window.location.href;
    var urlsplit = url.split("/");
    var lastpart = urlsplit[urlsplit.length - 1];
    if (lastpart === "") {
      lastpart = urlsplit[urlsplit.length - 2];
    }

    const formData = new FormData();

    formData.append(
      "examination_code",
      patientInput.examination_code == null ? "" : patientInput.examination_code
    );
    formData.append(
      "examination_name",
      patientInput.examination_name == null ? "" : patientInput.examination_name
    );
    formData.append(
      "examination_status",
      patientInput.examination_status == null
        ? ""
        : patientInput.examination_status
    );
    formData.append(
      "description",
      patientInput.description == null ? "" : patientInput.description
    );

    axios.post(`/update-examination/${lastpart}`, formData).then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.message);
        swal("Success", res.data.message, "success");

        setPatient({
          ...patientInput,

          examination_code: "",
          examination_name: "",
          examination_status: "",
          description: "",
        });
        setError("");
        navigate("/examination");
      } else {
        setError(res.data.errors);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <HistorySetupSidebar></HistorySetupSidebar>
          </div>
          <div className="col-md-9 mt-2">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">
                  Edit Examination
                  <Link
                    to={"/examination"}
                    className="btn btn-primary btn-sm float-end"
                  >
                    {" "}
                    Back{" "}
                  </Link>
                </h6>
              </div>
              <div className="card-body">
                <form onSubmit={updatePatient}>
                  <div className="card-body">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="examination_code"
                          className="col-form-label-sm"
                        >
                          {" "}
                          Examination Code{" "}
                        </label>
                        <input
                          type="text"
                          onChange={handleInput}
                          value={patientInput?.examination_code}
                          className="form-control font-size-patient"
                          name="examination_code"
                        />
                        <span className="text-danger">
                          {error?.examination_code}
                        </span>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="examination_name"
                          className="col-form-label-sm"
                        >
                          {" "}
                          Examination Name{" "}
                        </label>
                        <input
                          type="text"
                          onChange={handleInput}
                          value={patientInput?.examination_name}
                          className="form-control font-size-patient"
                          name="examination_name"
                        />
                        <span className="text-danger">
                          {error?.examination_name}
                        </span>
                      </div>
                      <label
                        htmlFor="inputPassword4"
                        className="form-label  col-form-label col-form-label-sm"
                      >
                        {" "}
                        Status
                      </label>
                      <select
                        name="examination_status"
                        type="text"
                        onChange={handleInput}
                        value={patientInput?.examination_status}
                        id="inputState"
                        className="form-select  col-form-label-sm font-size-patient"
                      >
                        <option selected>Select</option>

                        {statuslist?.map((item) => {
                          return (
                            <option value={item?.id} key={item?.id}>
                              {item.status_name}
                            </option>
                          );
                        })}
                      </select>
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label col-form-label col-form-label-sm"
                      >
                        {" "}
                        Description{" "}
                      </label>
                      <textarea
                        name="description"
                        onChange={handleInput}
                        value={
                          patientInput?.description == "null"
                            ? ""
                            : patientInput?.description
                        }
                        className="form-control font-size-patient"
                        id="exampleFormControlTextarea1"
                        rows="4"
                      ></textarea>
                      <span className="text-danger">{error?.description}</span>
                      <div className="form-group">
                        <label
                          htmlFor="image"
                          className="col-form-label-sm d-block"
                        >
                          {" "}
                          Image{" "}
                        </label>

                        <input
                          type="file"
                          id="img"
                          name="img"
                          accept="image/*"
                          onChange={handleImage}
                        />
                        <img
                          src={img?.image || ""}
                          alt="img"
                          className="d-inline"
                          style={{ width: "140px", marginTop: "5px" }}
                        />
                        {/* <span className="text-danger">{error.description}</span> */}
                      </div>
                      <div className="float-right">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm text-uppercase float-end mt-2"
                        >
                          <i className="fas fa-save"></i> Update
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPatient;
