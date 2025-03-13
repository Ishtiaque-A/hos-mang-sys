import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const LabLetterHead = () => {
  const [labInchargeDetails, setLabInchargeDetails] = useState({
    lab_incharge_name: "",
    lab_incharge_designation: "",
    doctor_name: "",
    doctor_designation: "",
    preferred_name: "",
    preferred_designation: "",
  });
  const [inchargeImage, setInchargeImage] = useState("");
  const [inchargeImageUrl, setInchargeImageUrl] = useState("");
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorImageUrl, setDoctorImageUrl] = useState("");
  const [letterImage, setLetterImage] = useState("");
  const [letterImageUrl, setLetterImageUrl] = useState("");
  const [preferredImage, setPreferredImage] = useState("");
  const [preferredImageUrl, setPreferredImageUrl] = useState("");
  const [hideReportHeader, setHideReportHeader] = useState(false);
  const updateLetterHead = () => {
    const data = new FormData();
    data.append("lab_incharge_name", labInchargeDetails.lab_incharge_name);
    data.append(
      "lab_incharge_designation",
      labInchargeDetails.lab_incharge_designation
    );
    data.append(
      "lab_incharge_sign",
      inchargeImage ? inchargeImage : inchargeImageUrl
    );
    data.append("doctor_name", labInchargeDetails.doctor_name);
    data.append("doctor_designation", labInchargeDetails.doctor_designation);
    data.append("doctor_sign", doctorImage ? doctorImage : doctorImageUrl);
    data.append("preferred_name", labInchargeDetails.preferred_name);
    data.append(
      "preferred_designation",
      labInchargeDetails.preferred_designation
    );
    data.append(
      "preferred_sign",
      preferredImage ? preferredImage : preferredImageUrl
    );
    data.append("hide_report_header", hideReportHeader ? 1 : 0);
    data.append("letter_head_logo", letterImage ? letterImage : letterImageUrl);
    if (labInchargeDetails.id) {
      axios
        .post(`/update-lab-center-letter-head/${labInchargeDetails.id}`, data)
        .then((res) => {
          if (res.status === 200) {
            swal("Success", res.data.message, "success");
            axios.get(`lab-center-letter-head`).then((res) => {
              if (res.status === 200) {
                setLabInchargeDetails(res.data.letter_head);
                setDoctorImageUrl(res.data.letter_head.doctor_sign);
                setInchargeImageUrl(res.data.letter_head.lab_incharge_sign);
                setLetterImageUrl(res.data.letter_head.letter_head_logo);
                setHideReportHeader(
                  res.data.letter_head.hide_report_header?.toString() === "1"
                    ? true
                    : false
                );
                setDoctorImage("");
                setInchargeImage("");
                setLetterImage("");
              }
            });
          }
        });
    } else {
      axios.post("/save-lab-center-letter-head", data).then((res) => {
        if (res.status === 200) {
          swal("Success", res.data.message, "success");
        }
      });
    }
  };
  console.log(labInchargeDetails, "dde ");
  useEffect(() => {
    axios.get(`lab-center-letter-head`).then((res) => {
      if (res.status === 200 && res.data.letter_head) {
        setLabInchargeDetails(res.data.letter_head);
        setDoctorImageUrl(res.data.letter_head.doctor_sign);
        setInchargeImageUrl(res.data.letter_head.lab_incharge_sign);
        setPreferredImageUrl(res.data.letter_head.preferred_sign);
        setLetterImageUrl(res.data.letter_head.letter_head_logo);
        setHideReportHeader(
          res.data.letter_head.hide_report_header?.toString() === "1"
            ? true
            : false
        );
      }
    });
  }, []);
  return (
    <>
      <div className="shadow-sm p-2 mb-3 mt-2 bg-body rounded">
        <h5 className="mx-2">Letterhead & e-sigh</h5>
      </div>

      <div className="d-flex">
        <i className="fa-solid fa-circle-info mt-1"></i>
        <p className="mx-3">
          Please contact customer support for assistance in updating letterhead
          and signatures
        </p>
      </div>

      <div className="report-sec">
        <div className="row">
          <div className="col-md-12">
            <div className="shadow-sm p-2 mb-3 mt-2 bg-body rounded border border-dark">
              <div className="top-h">
                <h1 className="display-4 text-center mt-2">Report</h1>
              </div>
              <div className="bottom-h mt-3">
                {/* <div className="d-flex mt-3 ">
                                    <i className="fa-solid fa-pen-to-square mt-1"></i>
                                    <p className="mx-3">Show lab incharge signature:</p>
                                </div> */}
                <div className="mt-2 row">
                  {/* Checked By  fields  */}
                  <div className="col-3">
                    <label htmlFor="n">Checked by signature</label> <br />
                    <label htmlFor="n">Name</label>
                    <input
                      value={labInchargeDetails?.lab_incharge_name}
                      onChange={(e) =>
                        setLabInchargeDetails({
                          ...labInchargeDetails,
                          lab_incharge_name: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                    />
                    <label htmlFor="n">Designation</label>
                    <textarea
                      value={labInchargeDetails?.lab_incharge_designation}
                      onChange={(e) =>
                        setLabInchargeDetails({
                          ...labInchargeDetails,
                          lab_incharge_designation: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                    />
                    <label htmlFor="n">Signature</label>
                    <input
                      onChange={(e) => {
                        setInchargeImage(e.target.files[0]);
                        setInchargeImageUrl("");
                      }}
                      type="file"
                      className="form-control form-control-sm"
                    />
                    <div className="technician-sign-preview-letter mt-2">
                      {inchargeImageUrl && (
                        <img
                          src={`${global.img_url}/images/letterHead/${inchargeImageUrl}`}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      {inchargeImage && (
                        <img
                          src={URL.createObjectURL(inchargeImage)}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </div>
                  {/* Doctor by fields  */}
                  <div className="col-3">
                    <label htmlFor="n">Doctor signature</label> <br />
                    <label htmlFor="n">Name</label>
                    <input
                      value={labInchargeDetails?.doctor_name}
                      onChange={(e) =>
                        setLabInchargeDetails({
                          ...labInchargeDetails,
                          doctor_name: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                    />
                    <label htmlFor="n">Designation</label>
                    <textarea
                      value={labInchargeDetails?.doctor_designation}
                      onChange={(e) =>
                        setLabInchargeDetails({
                          ...labInchargeDetails,
                          doctor_designation: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                    />
                    <label htmlFor="n">Signature</label>
                    <input
                      onChange={(e) => {
                        setDoctorImage(e.target.files[0]);
                        setDoctorImageUrl("");
                      }}
                      type="file"
                      className="form-control form-control-sm"
                    />
                    <div className="technician-sign-preview-letter mt-2">
                      {doctorImageUrl && (
                        <img
                          src={`${global.img_url}/images/letterHead/${doctorImageUrl}`}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      {doctorImage && (
                        <img
                          src={URL.createObjectURL(doctorImage)}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </div>
                  {/* Preferred By fields  */}
                  <div className="col-3">
                    <label htmlFor="n">Prepared by signature</label> <br />
                    <label htmlFor="n">Name</label>
                    <input
                      value={labInchargeDetails?.preferred_name}
                      onChange={(e) =>
                        setLabInchargeDetails({
                          ...labInchargeDetails,
                          preferred_name: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                    />
                    <label htmlFor="n">Designation</label>
                    <textarea
                      value={labInchargeDetails?.preferred_designation}
                      onChange={(e) =>
                        setLabInchargeDetails({
                          ...labInchargeDetails,
                          preferred_designation: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control form-control-sm"
                    />
                    <label htmlFor="n">Signature</label>
                    <input
                      onChange={(e) => {
                        setPreferredImage(e.target.files[0]);
                        setPreferredImageUrl("");
                      }}
                      type="file"
                      className="form-control form-control-sm"
                    />
                    <div className="technician-sign-preview-letter mt-2">
                      {preferredImageUrl && (
                        <img
                          src={`${global.img_url}/images/letterHead/${preferredImageUrl}`}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      {preferredImage && (
                        <img
                          src={URL.createObjectURL(preferredImage)}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="mt-2">
                      <label htmlFor="n">Upload Letterhead</label>
                      <input
                        onChange={(e) => {
                          setLetterImage(e.target.files[0]);
                          setLetterImageUrl("");
                        }}
                        type="file"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="technician-sign-preview-letter mt-2">
                      {letterImageUrl && (
                        <img
                          src={`${global.img_url}/images/letterHead/${letterImageUrl}`}
                          alt=""
                          className="img-fluid"
                        />
                      )}
                      {letterImage && (
                        <img
                          src={URL.createObjectURL(letterImage)}
                          alt=""
                          className="img-fluid"
                        />
                      )}

                      <div className="d-flex mt-5 gap-2 justify-content-start align-items-center">
                        <input
                          type="checkbox"
                          name="report_header"
                          id="report_header"
                          checked={hideReportHeader}
                          onChange={(e) =>
                            setHideReportHeader(e.target.checked)
                          }
                        />
                        <label
                          className="form-label fw-bold m-0"
                          htmlFor="report_header"
                        >
                          Hide Report Header
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="footer-sign mt-2">
                    <button
                      onClick={updateLetterHead}
                      className="btns float-end"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LabLetterHead;
