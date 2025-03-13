import React, { useRef, useState } from "react";
import { NewModal as ReactModal } from "../../../common/components/NewModal";
import moment from "moment";
import { getAge } from "../../../utils/getAge";
import { useReactToPrint } from "react-to-print";
import pal from "../../../Images/pal.png";
import executive from "../../../Images/executive.png";
import univis from "../../../Images/univis.png";
import kryptop from "../../../Images/kryptop.png";
export default function EyePrescription({
  eyePrescription,
  prescriptionTemplate,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({});
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const storageData = JSON.parse(localStorage.getItem("userData"));
  console.log(data, "datafff");
  const distLeft = data?.dist_left ? JSON.parse(data.dist_left) : null;
  const distRight = data?.dist_right ? JSON.parse(data.dist_right) : null;
  const nearLeft = data?.near_left ? JSON.parse(data.near_left) : null;
  const nearRight = data?.near_right ? JSON.parse(data.near_right) : null;

  console.log(prescriptionTemplate, "datafff");
  return (
    <>
      <div className="past-history-table past-visit-table g-doc-scroll">
        {eyePrescription?.length > 0 ? (
          <table className="past_rx_table">
            <thead>
              <tr>
                <th width={"20%"} scope="col">
                  Date
                </th>
                <th scope="col">Doctor</th>
                <th width={"15%"} scope="col">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {eyePrescription?.length > 0 &&
                eyePrescription?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{moment(item?.created_at).format("DD/MM/YYYY")}</td>
                      <td>{item?.doctor?.fullName}</td>
                      <td>
                        <i
                          onClick={(e) => {
                            setData(item);
                            setModalIsOpen(true);
                          }}
                          className="fa-solid fa-eye"
                          style={{
                            cursor: "pointer",
                            color: "#69B128",
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-lg-5 mt-lg-2 text-danger">
            Records are not available
          </p>
        )}
        <ReactModal size="md" isOpen={modalIsOpen} onClose={closeModal}>
          <ReactModal.Header onClose={closeModal}>
            <ReactModal.Title>Optical Prescription</ReactModal.Title>
          </ReactModal.Header>
          <ReactModal.Body>
            <div
              style={{ display: "block" }}
              className="procedure-report-container-print"
              ref={componentRef}
            >
              <div
                // style={{ minHeight: "11in" }}
                className="procedure-main-content1"
              >
                <div className="eye-prescription-header">
                  <div className="d-flex justify-content-center ">
                    <div className="invoice-pharmacy-details d-flex gap-2 align-items-center justify-content-start">
                      <img
                        src={storageData?.organization_logo}
                        alt=""
                        style={{ width: "80px", height: "80px" }}
                      />
                      <div className="text-start">
                        <h5>{storageData?.organization_name}</h5>
                        <p>
                          {storageData?.organization_address}{" "}
                          <span>Tel : {storageData?.organization_mobile}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row  mt-3 mb-1">
                  <div className="row col-8">
                    <div className="col-6 d-flex align-items-center">
                      <p className="p-0 m-0">
                        M.R No: <span>{data?.prescription_no || 10001}</span>
                      </p>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <h4
                        className="text-center py-1 px-4  m-0"
                        style={{
                          border: "1px dashed gray",
                          borderRadius: "20px",
                          display: "inline-block",
                          fontSize: "16px",
                        }}
                      >
                        Optical Advice
                      </h4>
                    </div>
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    <div className="d-flex justify-content-end align-items-center">
                      Date{" "}
                      <span style={{ width: "60px", display: "inline-block" }}>
                        :
                        {moment(data?.created_at || new Date()).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{ borderBottom: "none" }}
                  className="procedure-patient-head-container d-flex justify-content-between"
                >
                  <div>
                    <p>
                      <span className="procedure-patient-head">Name</span>
                      <span>: {data?.patient?.fullName}</span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">DOB</span>
                      <span>
                        :{" "}
                        {moment(data?.patient?.patient_dob).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">HN No</span>
                      <span>: {data?.patient?.patient_hn_number}</span>
                    </p>
                    {/* <p>
                <span className="procedure-patient-head">Ward</span>
                <span>: {data?.ward}</span>
              </p> */}
                  </div>
                  <div>
                    <p>
                      <span className="procedure-patient-head">Sex</span>
                      <span>
                        : {data?.patient?.patient_birth_sex?.birth_sex_name}
                      </span>
                    </p>
                    <p>
                      <span className="procedure-patient-head">Age</span>
                      <span>: {getAge(data?.patient?.patient_dob)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="eye-prescription-table mt-2">
                <table className="past_rx_table">
                  <tbody>
                    <tr>
                      <td colSpan={6}>OD (RE)</td>
                      <td colSpan={5}>OS (LE)</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>SPH</td>
                      <td>CYL</td>
                      <td>AXIS</td>
                      <td>V/A</td>
                      <td>PRISM</td>
                      <td>SPH</td>
                      <td>CYL</td>
                      <td>AXIS</td>
                      <td>V/A</td>
                      <td>PRISM</td>
                    </tr>
                    <tr>
                      <td>DV</td>
                      <td>{distLeft?.sphere}</td>
                      <td>{distLeft?.cyl}</td>
                      <td>{distLeft?.axis}</td>
                      <td>{distLeft?.VA}</td>
                      <td>{distLeft?.prism}</td>
                      <td>{distRight?.sphere}</td>
                      <td>{distRight?.cyl}</td>
                      <td>{distRight?.axis}</td>
                      <td>{distRight?.VA}</td>
                      <td>{distRight?.prism}</td>
                    </tr>
                    <tr>
                      <td>NV</td>
                      <td>{nearLeft?.sphere}</td>
                      <td>{nearLeft?.cyl}</td>
                      <td>{nearLeft?.axis}</td>
                      <td>{nearLeft?.VA}</td>
                      <td>{nearLeft?.prism}</td>
                      <td>{nearRight?.sphere}</td>
                      <td>{nearRight?.cyl}</td>
                      <td>{nearRight?.axis}</td>
                      <td>{nearRight?.VA}</td>
                      <td>{nearRight?.prism}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row mt-2">
                <div className="col-6">
                  <div className="row">
                    <div className="col-3">
                      <p className="fw-bold">Dist PD</p>
                    </div>
                    <div className="col-9 row">
                      <div className="col-6">
                        <p className="fw-bold">
                          RE:{" "}
                          <span
                            style={{
                              width: "70px",
                              borderBottom: "1px dashed black",
                            }}
                            className="d-inline-block"
                          >
                            <span className="ms-3">{data?.dist_pd_right}</span>
                          </span>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="fw-bold">
                          LE:
                          <span
                            style={{
                              width: "70px",
                              borderBottom: "1px dashed black",
                            }}
                            className="d-inline-block"
                          >
                            <span className="ms-3">{data?.dist_pd_left}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-3">
                      <p className="fw-bold">Near PD</p>
                    </div>
                    <div className="col-9 row">
                      <div className="col-6">
                        <p className="fw-bold">
                          RE:
                          <span
                            style={{
                              width: "70px",
                              borderBottom: "1px dashed black",
                            }}
                            className="d-inline-block"
                          >
                            <span className="ms-3">{data?.near_pd_right}</span>
                          </span>
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="fw-bold">
                          LE:
                          <span
                            style={{
                              width: "70px",
                              borderBottom: "1px dashed black",
                            }}
                            className="d-inline-block"
                          >
                            <span className="ms-3">{data?.near_pd_left}</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 eye-rx-container">
                <div className="row p-1">
                  <div className="col-2">
                    <label htmlFor="">Lens</label>
                  </div>
                  <div className="col-10">
                    <div className="d-flex">
                      :
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="glass"
                          id="glass"
                          value="Glass"
                          style={{ height: "16px" }}
                          defaultChecked={data?.lens?.includes("Glass")}
                          className="mt-1"
                        />
                        <label htmlFor="glass">Glass</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="plastic"
                          id="plastic"
                          style={{ height: "16px" }}
                          className="mt-1"
                          value="Plastic"
                          defaultChecked={data?.lens?.includes("Plastic")}
                        />
                        <label htmlFor="plastic">Plastic</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="white"
                          id="white"
                          value="White"
                          style={{ height: "16px" }}
                          defaultChecked={data?.lens?.includes("White")}
                          className="mt-1"
                        />
                        <label htmlFor="white">White</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="tint"
                          id="tint"
                          value="Tint"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.lens?.includes("Tint")}
                        />
                        <label htmlFor="tint">Tint</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="photocromic"
                          id="photocromic"
                          value="Photocromic"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.lens?.includes("Photocromic")}
                        />
                        <label htmlFor="photocromic">Photocromic</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="arCoat"
                          id="arCoat"
                          value="Ar Coat"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.lens?.includes("Ar Coat")}
                        />
                        <label htmlFor="arCoat">Ar Coat</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col-2">
                    <label style={{ marginTop: "15px" }} htmlFor="">
                      Multifocal
                    </label>
                  </div>
                  <div className="col-10">
                    <div className="d-flex">
                      <span
                        style={{ marginTop: "15px" }}
                        className="d-inline-block"
                      >
                        :
                      </span>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="pal"
                          id="pal"
                          value="PAL"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.multifocal?.includes("PAL")}
                        />
                        <label htmlFor="pal">
                          <img className="eye-glass-img" src={pal} alt="" />
                        </label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="kryptop"
                          id="kryptop"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.multifocal?.includes("Kryptop")}
                        />
                        <label htmlFor="kryptop">
                          <img className="eye-glass-img" src={kryptop} alt="" />
                        </label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="executive"
                          id="executive"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.multifocal?.includes(
                            "Executive"
                          )}
                        />
                        <label htmlFor="executive">
                          <img
                            className="eye-glass-img"
                            src={executive}
                            alt=""
                          />
                        </label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="univis"
                          id="univis"
                          value="Univis-D"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.multifocal?.includes(
                            "Univis-D"
                          )}
                        />
                        <label htmlFor="univis">
                          <img className="eye-glass-img" src={univis} alt="" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row p-1">
                  <div className="col-2">
                    <label htmlFor="">Instruction</label>
                  </div>
                  <div className="col-10">
                    <div className="d-flex">
                      :
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="distanceOnly"
                          id="distanceOnly"
                          value="Distance Only"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.instruction?.includes(
                            "Distance Only"
                          )}
                        />
                        <label htmlFor="distanceOnly">Distance Only</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="nvOnly"
                          id="nvOnly"
                          style={{ height: "16px" }}
                          className="mt-1"
                          value="NV Only"
                          defaultChecked={data?.instruction?.includes(
                            "NV Only"
                          )}
                        />
                        <label htmlFor="nvOnly">NV Only</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="constantWear"
                          id="constantWear"
                          value="Constant Wear"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.instruction?.includes(
                            "Constant Wear"
                          )}
                        />
                        <label htmlFor="constantWear">Constant Wear</label>
                      </div>
                      <div className="ms-1 d-flex align-items-center me-1">
                        <input
                          type="checkbox"
                          name="vocationalUse"
                          id="vocationalUse"
                          value="Vocational Use"
                          style={{ height: "16px" }}
                          className="mt-1"
                          defaultChecked={data?.instruction?.includes(
                            "Vocational Use"
                          )}
                        />
                        <label htmlFor="vocationalUse">Vocational Use</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <img
                      style={{
                        height: "30px",
                        width: "100px",
                      }}
                      src={`${global.img_url}/${prescriptionTemplate?.doctor_signature}`}
                      alt="img"
                    />
                    <div
                      style={{
                        height: "1px",
                        width: "150px",
                        borderTop: "1px solid black",
                      }}
                    ></div>
                    <span className="fw-bold operation-details-header">
                      {data?.doctor?.fullName}
                    </span>
                    <p className="mt-2"></p>
                  </div>
                </div>
              </div>

              {/* procedure report  */}
            </div>
          </ReactModal.Body>
          <ReactModal.Footer>
            <button className="report-save-btn2" onClick={handlePrint}>
              Print
            </button>
          </ReactModal.Footer>
        </ReactModal>
      </div>
    </>
  );
}
