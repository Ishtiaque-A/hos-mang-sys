import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./UserRoleManagement.css";
import pic from "../../Images/crush.jpg";
import doc from "../../Images/doc-icon.png";
import emp from "../../Images/employee-icon.png";
import patient from "../../Images/patient-icon.png";
import axios from "axios";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
toast.configure();

const UserRoleManagement = () => {
  const [allUsers, setallUsers] = useState([]);
  const [userRole, setuserRole] = useState([]);
  const [slectedUser, setslectedUser] = useState();
  const [userType, setuserType] = useState("Doctor");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/user-list/${userType}`).then((res) => {
      console.log("users", res.data.users);
      setallUsers(res.data.users);
    });
    return () => { };
  }, [userType]);

  useEffect(() => {
    axios.get(`/user-role`).then((res) => {
      if (res.data.status === 200) {
        setuserRole(res.data.userRole);
      }
    });
  }, []);

  const [roleId, setroleId] = useState();
  const [userId, setuserId] = useState();

  const permissionArray = [
    {
      main: "Appointment",
      slug: "appointment",
      sub: [
        { name: "Appointment Schedule", slug: "schedule" },
        { name: "Online Appointment", slug: "online-appointment" },
        { name: "Patient Card", slug: "patient-card" },
        { name: "Appointment list", slug: "appointment-list" },
        { name: "Doctor list", slug: "doctor-list" },
        { name: "Appointment Status", slug: "appointment-status" }
      ],
    },
    {
      main: "Digi Patients",
      slug: "digipatients",
      sub: [
        { name: " All Patients", slug: "patients" },
        { name: "Add Patients", slug: "newpatient" },
        { name: "Vital Sign Setup", slug: "vital-sign-setup" },
        { name: "Allergy Setup", slug: "allergy-setup" },
        { name: "EHR", slug: "ehr" },
      ],
    },
    {
      main: "Nurse Station",
      slug: "nursestation",
      sub: [{ name: "Vital Reading", slug: "patient-vital-reading" }],
    },
    {
      main: "Smart Doc",
      slug: "greatdoc",
      sub: [
        { name: "All Doctors", slug: "doctors" },
        { name: "Add Doctors", slug: "new-doctors" },
        { name: "Doctor Inbox", slug: "doctors-inbox" },
        { name: "Doctor Chamber", slug: "doctors-chamber" },
        { name: "Prescription", slug: "great-doc" },
      ],
    },
    {
      main: "Smart Lab",
      slug: "greatlab",
      sub: [
        { name: "Lab panel", slug: "lab-center-details" },
        { name: "Billing", slug: "great-lab-billing" },
        { name: "Sample Collection", slug: "great-lab-sample-collection" },
        { name: "Lab Technician", slug: "great-lab-technician" },
        { name: "Lab Agent", slug: "great-lab-report-list" },
        { name: "Report List", slug: "great-lab-report-list" },
        { name: "Report Delivery", slug: "great-lab-report-deivery" },
        { name: "Report Delivery List", slug: "great-lab-report-deivery-list" },
        { name: "Transactions", slug: "great-lab-money-receipt" },
        { name: "Income Summary", slug: "great-lab-income-summary" },
        { name: "Expense Summary", slug: "great-lab-expense-summary" },
        {
          name: "Income & Expense Summary",
          slug: "great-lab-income-expense-report",
        },
      ],
    },
    {
      main: "Lab Agent",
      slug: "labagent",
      sub: [
        { name: "Lab Agents", slug: "lab-agent-list" },
        { name: "Add lab Agent", slug: "application" },
        { name: "Billing", slug: "lab-agent" },
        { name: "Sample Collection", slug: "lab-agent-sample-collection" },
        { name: "Sample Send To Lab", slug: "lab-agent-sample-send" },
        { name: "Report Collection", slug: "lab-agent-report-collection" },
        { name: "Report List", slug: "lab-agent-report-collection" },
        { name: "Rate List", slug: "lab-agent-report-collection" },
        { name: "Report Delivery", slug: "report-delivery" },
        { name: "Report Delivery List", slug: "report-delivery-list" },

        { name: "Transactions", slug: "money-receipt-list" },
        { name: "Income Summary", slug: "lab-agent-income-summary" },
        { name: "Expense Summary", slug: "lab-agent-expense-summary" },
        { name: "Accounts Report", slug: "lab-agent-income-expense-report" },
      ],
    },
    {
      main: "HR",
      slug: "hr",
      sub: [
        { name: "ALL Employee", slug: "employee" },
        { name: "Add Employees", slug: "add-employee" },
        { name: "Role", slug: "role-setup" },
        { name: "User list & assigning", slug: "users" },
        { name: "User Role Managment", slug: "user-role-system" },
      ],
    },
    {
      main: "Accounts",
      slug: "accounts",
      sub: [
        { name: "Billing & Invoice", slug: "billingPatient" },
        { name: "Income Summary", slug: "income-summary" },
        { name: "Expense Summary", slug: "expense-summary" },
        { name: "Accounts Report", slug: "income-expense-report" },
      ],
    },
    {
      main: "Setup",
      slug: "setup",
      sub: [
        { name: "Admin Setup", slug: "all-setup" },
      ],
    },
  ];

  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [btnIsLoading, setbtnIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setisLoading(true);
      axios
        .get(`user-role-permission/${userId}`)
        .then((res) => {
          const newObj = res.data.permission?.reduce((acc, item) => {
            acc[item.name] = item.value.split(",");
            return acc;
          }, {});

          setroleId(res.data.permission[0]?.role_id);
          setSelectedPermissions(newObj);
          setisLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setisLoading(false);
        });
    }

    return () => { };
  }, [userId]);

  const handleCheckboxAll = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setSelectedPermissions({
        ...selectedPermissions,
        [name]: permissionArray[value]?.sub?.map((item) => item.slug),
      });
    } else {
      setSelectedPermissions({ ...selectedPermissions, [name]: [] });
    }
  };
  const handlePermissionChange = (
    event,
    mainPermissionSlug,
    subPermissionSlug
  ) => {
    setSelectedPermissions((prevSelectedPermissions) => {
      const updatedPermissions = { ...prevSelectedPermissions };

      if (event.target.checked) {
        if (!updatedPermissions[mainPermissionSlug]) {
          updatedPermissions[mainPermissionSlug] = [];
        }
        updatedPermissions[mainPermissionSlug].push(subPermissionSlug);
      } else {
        updatedPermissions[mainPermissionSlug] = updatedPermissions[
          mainPermissionSlug
        ].filter((slug) => slug !== subPermissionSlug);
      }

      return updatedPermissions;
    });
  };

  const submitPermission = () => {
    if (roleId && userId) {
      const data = [];
      selectedPermissions &&
        Object.entries(selectedPermissions).forEach(([key, value]) => {
          data.push({
            user_id: userId,
            role_id: roleId,
            name: key,
            value: value.toString(),
            validity_date: "null",
          });
        });
      setbtnIsLoading(true);
      axios
        .post("create-user-role-permission", { permission_array: data })
        .then((res) => {
          console.log("res", res.data);
          setSelectedPermissions({});
          setuserId();
          setroleId();
          toast.success(res.data.message);
          setbtnIsLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setbtnIsLoading(false);
        });
    } else {
      Swal.fire("Warning!", "You have to select User and Role", "warning");
    }
  };

  console.log("selected", allUsers)
  return (
    <div className="ms-2 mt-2">
      <div className="custom-card flex-grow-1">
        <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
          User Roles, Permissions and Access
        </h5>
      </div>
      <div className="custom-card overflow-hidden">
        <div className="row user-role-header m-2 p-2">
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <label className="col-sm-4 col-form-label">
                    Module - User
                  </label>
                  <div className="col-8">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      value={slectedUser?.name}
                      options={allUsers}
                      loadingText="loading..."
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        if (value != null) {
                          setuserId(value.id);
                          setslectedUser(value);
                        } else {
                          setuserId();
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: "100%", height: 10 }}
                          {...params}
                          label={userType}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-2">
                    <label className="col-form-label">Role </label>
                  </div>
                  <div className="col-8">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      options={userRole}
                      value={userRole.find((opt) => opt.id == roleId) || null}
                      loadingText="loading..."
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        setroleId(value.id);

                      }}
                      renderInput={(params) => (
                        <TextField
                          sx={{ width: "100%", height: 10 }}
                          {...params}
                          label="Role"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 user-role-header-user d-flex justify-content-end">
            <div className="me-2">
              <img src={pic} alt="" className="me-1" />

              <span>{slectedUser && `${slectedUser.name} || ${slectedUser.email}`}</span>

            </div>
          </div>
        </div>
        <div className="row m-2 p-2">
          <div className="col-2 new-rx-container user-role-sidebar">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                onClick={() => {
                  setuserType("Doctor");
                  setSelectedPermissions({});
                }}
                className="nav-link active mb-2"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <img src={doc} alt="" className="me-2" /> Doctor
              </button>
              <button
                onClick={() => {
                  setuserType("Patient");
                  setSelectedPermissions({});
                }}
                className="nav-link mb-2"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                <img src={patient} alt="" className="me-2" /> Patient
              </button>
              <button
                onClick={() => {
                  setuserType("Employee");
                  setSelectedPermissions({});
                }}
                className="nav-link mb-2"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                <img src={emp} alt="" className="me-2" />
                Employee
              </button>
            </div>
          </div>
          <div className="col-10 user-role-container">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="user-role-content-head d-flex justify-content-between align-items-center mb-2 p-2">
                  <div>
                    <h6>{userType} permission</h6>
                    <span className="text-muted">
                      Select the role for each feature
                    </span>
                  </div>
                  <div className="rx-one-button-group d-flex align-items-end">
                    {btnIsLoading ? (
                      <button className="btn float-end me-2">
                        <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    ) : (
                      <button
                        onClick={submitPermission}
                        className="btn float-end me-2"
                      >
                        Save
                      </button>
                    )}

                    <button
                      onClick={() => navigate("/main")}
                      className="btn float-end me-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="user-role-content-table custom-card mt-2 p-2">
                  <div className="row">
                    {isLoading ? (
                      <div className="col-6">
                        <i
                          style={{ fontSize: "17px" }}
                          className="fas fa-spinner fa-spin"
                        ></i>
                      </div>
                    ) : (
                      permissionArray?.map((item, i) => (
                        <div key={i} className="col-3 ">
                          <div
                            style={{
                              height: "220px",
                              overflow: "hidden",
                              overflowY: "auto",
                            }}
                            className="g-doc-scroll custom-card m-2 p-1"
                          >
                            <div
                              class="form-check pb-2"
                              style={{
                                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                              }}
                            >
                              <input
                                class="form-check-input mt-1"
                                type="checkbox"
                                value={i}
                                checked={
                                  selectedPermissions[item.slug] &&
                                  selectedPermissions[item.slug].length ===
                                  item.sub.length
                                }
                                name={item.slug}
                                onChange={handleCheckboxAll}
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                {item.main}
                              </label>
                            </div>

                            <div className="ms-3">
                              {item?.sub?.map((sub, i) => (
                                <div key={i} class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value={sub.slug}
                                    onChange={(event) =>
                                      handlePermissionChange(
                                        event,
                                        item.slug,
                                        sub.slug
                                      )
                                    }
                                    checked={
                                      selectedPermissions[item.slug] &&
                                      selectedPermissions[item.slug].includes(
                                        sub.slug
                                      )
                                    }
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexCheckDefault"
                                  >
                                    {sub.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoleManagement;
