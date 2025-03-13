import React, { useState, useEffect, useRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

import { red, green, purple, yellow, grey } from "@material-ui/core/colors";
import "./ListPatientAdmission.css";
import { GrSettingsOption } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import TaskDoctorModal from "./TaskDoctorModal";
import { GoDotFill } from "react-icons/go";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import TaskNurseModal from "./TaskNurseModal";
import { FaListCheck } from "react-icons/fa6";
import doctor from "../../../Images/doctorChecklist.png";
import nurse from "../../../Images/nurseChecklist.png";
import useUserData from "../../../hooks/useUserData";

const ListPatientAdmission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpentDoctorModal, setIsOpentDoctorModal] = useState(false);

  const [isOpentNurseModal, setIsOpentNurseModal] = useState(false);
  const user = useUserData();
  const [admission, setAdmission] = useState();
  const [showTable, setShowTable] = useState(false);
  const handleDoctorModalOpen = (row) => {
    setAdmission(row);
    setIsOpentDoctorModal(true);
  };

  const handleDoctorModalClose = () => {
    setIsOpentDoctorModal(false);
  };
  const comeInSoon = () => {
    Swal.fire({
      title: "Coming Soon!",
      text: "We are working on it.",
      imageUrl:
        "https://www.pngall.com/wp-content/uploads/8/Work-PNG-Clipart.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Work in progress",
    });
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleNurseModalOpen = (row) => {
    setIsOpentNurseModal(true);
    setAdmission(row);
  };

  const handleNurseModalClose = () => {
    setIsOpentNurseModal(false);
  };

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await axios.get("/get-admit");
        setAdmissions(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);

  const handleDelete = async (id) => {
    // SweetAlert2 confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/patient-admission/${id}`);

        setAdmissions((currentAdmissions) =>
          currentAdmissions.filter((admission) => admission.id !== id)
        );

        Swal.fire(
          "Deleted!",
          "The admission record has been deleted.",
          "success"
        );
      } catch (error) {
        console.error("Error deleting admission:", error);
        Swal.fire(
          "Failed!",
          "An error occurred while deleting the record.",
          "error"
        );
      }
    }
  };

  const columns = [
    {
      title: "Name",
      field: "patient.fullName",
      render: (row) => (
        <div
          style={{ minWidth: "150px" }}
          className="d-flex align-items-center"
        >
          <img
            className="me-2 rounded-circle"
            src={
              row.patient?.patient_images
                ? `${global.img_url}/images/files/${row.patient.patient_images}`
                : "https://static.thenounproject.com/png/363640-200.png"
            }
            width="35"
            height="35"
            alt="patient"
          />
          <div>
            {row.patient?.fullName || "N/A"}
            <br />
            <span style={{ fontSize: "10px", color: "#888" }}>
              {row.patient?.patient_hn_number || "N/A"}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Admission Date",
      field: "admission_date",
      render: (row) => moment(row.admission_date).format("DD/MM/YYYY"),
    },
    {
      title: "Doctor",
      field: "doctor.fullName",
      render: (row) => (
        <div>
          {`${row.doctor?.title?.title_name || ""} ${
            row.doctor?.fullName || "N/A"
          }`}
          <br />
          <span style={{ fontSize: "10px", color: "#888" }}>
            {row.specialist?.specialists_name || "N/A"}
          </span>
        </div>
      ),
    },
    {
      title: "Location",
      field: "block",
      render: ({ block, level, unit, ward, bed, cabin }) => (
        <div style={{ fontSize: "12px", color: "#888" }}>
          Block: {block || "N/A"}, Level: {level || "N/A"}, Unit:{" "}
          {unit || "N/A"}, Ward: {ward || "N/A"}, Bed: {bed || "N/A"}, Cabin:{" "}
          {cabin || "N/A"}
        </div>
      ),
    },
    {
      title: "Reason",
      field: "reason_for_admission",
      render: (row) => (
        <>
          <span style={{ fontSize: "12px", color: "#888" }}>
            {row?.reason_for_admission?.slice(0, 40)} ...{" "}
          </span>
        </>
      ),
    },
    {
      title: "Doctor's Task",
      field: "task",
      render: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <span
            onClick={() => handleDoctorModalOpen(row)}
            style={{
              // backgroundColor: "#69B128",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
              color: "white",
              padding: "4px",
              cursor: "pointer",
              fontSize: "22px",
            }}
          >
            <img src={doctor} alt="" className="img-fluid" />
          </span>
        </div>
      ),
    },
    {
      title: "Nurse's Task",
      field: "task",
      render: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <span
            onClick={() => handleNurseModalOpen(row)}
            style={{
              // backgroundColor: "#69B128",
              borderRadius: "5px",
              display: "flex",
              fontWeight: "bold",
              color: "white",
              padding: "4px",
              cursor: "pointer",
              fontSize: "22px",
            }}
          >
            <img src={nurse} alt="" className="img-fluid" />
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      field: "action",
      render: (row) => (
        <div className="d-flex gap-2 align-items-center">
          <Link to={`/patient-admission-edit/${row.id}`}>
            <button className="btn  ">
              <FiEdit />
            </button>
          </Link>

          <button className="btn" onClick={() => handleDelete(row.id)}>
            <MdDeleteOutline />
          </button>
        </div>
      ),
    },
    {
      title: "Status",
      field: "status",
      render: (row) => {
        return (
          <>
            {row.status === 0 && (
              <span style={{ color: "grey" }}>
                <GoDotFill />
                Admitted
              </span>
            )}
            {row.status == 1 && (
              <span style={{ color: "grey" }}>
                <GoDotFill />
                Admitted
              </span>
            )}
            {row.status == 2 && (
              <span style={{ color: green[500] }}>
                <GoDotFill />
                Discharged
              </span>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="ms-2">
      <div className="custom-card p-2 mt-2">
        <div className="d-flex justify-content-between align-items-center custom-card-header">
          <h5 className="fw-normal py-1 mt-1 px-2">Patients Admission List</h5>
          <Link to="/patient-admission">
            <button className="patient-card-booking-app p-1 px-2">
              Admission
            </button>
          </Link>
        </div>

        <div className="mt-2">
          <MaterialTable
            className=" "
            columns={columns}
            data={admissions}
            isLoading={loading}
            options={{
              search: true,
              showTitle: false,
              searchFieldAlignment: "left",
              pageSize: 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20, 50],
            }}
            components={{
              Toolbar: (props) => (
                <div className="d-flex justify-content-between align-items-center w-100">
                  <MTableToolbar {...props} />
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="row d-flex  "
                  >
                    <div
                      className="status-indicator"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                      }}
                    >
                      {/* <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: red[500],
                          marginRight: "8px",
                        }}
                      ></span>
                      Ext. hospitalization */}
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: green[500],
                          marginRight: "8px",
                          marginLeft: "10px",
                        }}
                      ></span>
                      Discharged
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: grey[500],
                          marginRight: "8px",
                          marginLeft: "10px",
                        }}
                      ></span>
                      Admitted
                      {/* <p className="me-4"></p>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: purple[500],
                          marginRight: "8px",
                          marginLeft: "10px",
                        }}
                      ></span>
                      Surgical intervention{" "}
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: yellow[500],
                          marginRight: "8px",
                          marginLeft: "10px",
                        }}
                      ></span>
                      In surgery */}
                      <MdOutlineLocalPrintshop
                        onClick={handlePrint}
                        style={{
                          fontSize: "30px ",
                          margin: " 0 20px",
                          backgroundColor: "#6AB129",
                          color: "#fff",
                          padding: "4px",
                          borderRadius: "20% ",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ),
            }}
          />
        </div>
        <div ref={componentRef} className="print-only">
          <div className="print-report-header mt-1">
            <div className="d-flex justify-content-center">
              <div className="d-flex align-items-center">
                {/* <img style={{ width: "60px" }} src={user?.organization_logo || 'data:image/jpeg;base64,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'} alt="" /> */}
                <div className="ms-2 text-center fw-bold">
                  <h6 className="">{user?.organization_name}</h6>
                  <p>
                    {user?.organization_address ||
                      "House 35 East Rampura, Dhaka 1210"}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between"></div>
          </div>

          {loading ? (
            <div
              style={{ height: "400px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <div class="spinner-border  text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table>
              <tr className="report-header-bg">
                <th>Name</th>
                <th>Admission Date</th>
                <th>Doctor</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
              <tbody>
                {admissions?.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div
                        className="d-flex align-items-center"
                        style={{ minWidth: "130px" }}
                      >
                        <img
                          className="me-2 rounded-circle"
                          src={
                            row.patient?.patient_images
                              ? `${global.img_url}/images/files/${row.patient.patient_images}`
                              : "https://static.thenounproject.com/png/363640-200.png"
                          }
                          width="35"
                          height="35"
                          alt="patient"
                        />
                        <div>
                          {row.patient?.fullName || "N/A"}
                          <br />
                          <span style={{ fontSize: "10px", color: "#888" }}>
                            {row.patient?.patient_hn_number || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{moment(row.admission_date).format("DD/MM/YYYY")}</td>
                    <td>
                      <div>
                        {`${row.doctor?.title?.title_name || ""} ${
                          row.doctor?.fullName || "N/A"
                        }`}
                        <br />
                        <span style={{ fontSize: "10px", color: "#888" }}>
                          {row.specialist?.specialists_name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        Block: {row.block || "N/A"}, Level: {row.level || "N/A"}
                        , Unit: {row.unit || "N/A"}, Ward: {row.ward || "N/A"},
                        Bed: {row.bed || "N/A"}, Cabin: {row.cabin || "N/A"}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: "12px", color: "#888" }}>
                        {row?.reason_for_admission?.slice(0, 40) || "N/A"} ...
                      </span>
                    </td>
                    <td>
                      {row.status === 0 && <span>Admitted</span>}
                      {row.status === 1 && <span>Admitted</span>}
                      {row.status === 2 && <span>Discharged</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <TaskDoctorModal
        isOpen={isOpentDoctorModal}
        onClose={handleDoctorModalClose}
        admission={admission}
        setAdmission={setAdmission}
        // sendDataToParent={setChildData}
      />
      <TaskNurseModal
        isOpen={isOpentNurseModal}
        onClose={handleNurseModalClose}
        admission={admission}
        setAdmission={setAdmission}
        // sendDataToParent={setChildData}
      />
    </div>
  );
};

export default ListPatientAdmission;
