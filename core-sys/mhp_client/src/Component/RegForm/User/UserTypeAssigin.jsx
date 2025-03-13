/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, DialogContentText, TextField } from "@mui/material";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import useUserData from "../../../hooks/useUserData";
import useCredentialURL from "../../../hooks/useCredentialURL";
import { getAllBranch } from "../../../utils/getAllBranch";
import SimpleSelect from "../../../common/components/SimpleSelect";

export default function UserTypeAssigin() {
  const [isLoading, setisLoading] = useState(false);
  const [userData, setuserData] = useState();
  const [filterUserData, setFilterUserData] = useState();
  const [stateUpdate, setstateUpdate] = useState();

  const [userArray, setuserArray] = useState([]);
  const [userType, setuserType] = useState({});
  const [userSelectedVaule, setuserSelectedVaule] = useState(null);
  const user = useUserData();
  const [orgBranch, setOrgBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const { SaasAuthURL } = useCredentialURL();
  useEffect(() => {
    const getBranch = async () => {
      const branches = await getAllBranch(
        SaasAuthURL + "/branch/service/find-branch-by-organizationId"
      );
      if (branches.status === 200) {
        const updatedBranches = branches?.data?.data?.map((branch) => ({
          ...branch,
          value: branch.id,
          label: branch.name,
        }));
        setOrgBranch(updatedBranches);
      }
    };
    getBranch();
    return () => {};
  }, [SaasAuthURL]);
  useEffect(() => {
    let filteredData = userData;
    if (selectedBranch) {
      filteredData = userData.filter(
        (data) => Number(data?.saas_branch_id) === Number(selectedBranch.value)
      );
    }
    setFilterUserData(filteredData);
  }, [selectedBranch]);
  useEffect(() => {
    setisLoading(true);
    const controller = new AbortController();
    axios
      .get(`/user-list`, {
        signal: controller.signal,
      })
      .then((res) => {
        console.log("res", res.data);
        setuserData(res.data.users);
        setFilterUserData(res.data.users);
        setisLoading(false);
      })
      .catch((err) => setisLoading(false));

    return () => {
      controller.abort();
    };
  }, [stateUpdate]);

  useEffect(() => {
    const controller = new AbortController();
    if (userType.name === "Doctor" || userType.name === "Super_Admin") {
      axios
        .get(`/doctors`, {
          signal: controller.signal,
        })
        .then((res) => {
          setuserArray(res.data.doctors);
          console.log("doc", res.data.doctors);
        })
        .catch((err) => console.log(err));
    }

    if (userType.name === "Employee") {
      axios
        .get(`/employee`, {
          signal: controller.signal,
        })
        .then((res) => {
          setuserArray(res.data.employee);
        })
        .catch((err) => console.log(err));
    }
    if (userType.name === "Patient") {
      axios
        .get(`/patients`, {
          signal: controller.signal,
        })
        .then((res) => {
          setuserArray(res.data.patients);
        })
        .catch((err) => console.log(err));
    }

    return () => {
      controller.abort();
    };
  }, [userType]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Mobile", field: "mobile" },
    {
      title: "Branch",
      field: "saas_branch_name",
      render: (row) => (row.saas_branch_name ? row.saas_branch_name : ""),
    },
    {
      title: "User Type",
      field: "user_type",
      render: (row) => (
        <select
          style={{ padding: "6px", borderRadius: "7px" }}
          value={row.user_type}
          onChange={(e) => {
            console.log("userTy", e.target.value);

            if (
              e.target.value === "Super_Admin" ||
              e.target.value === "empty"
            ) {
              axios
                .post(`/user-type-update`, {
                  id: row.id,
                  user_type: e.target.value,
                  user_id: "",
                  user_email: "",
                })
                .then((res) => {
                  setstateUpdate(Math.random);
                  toast.success("Role assign sucessfully");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setuserType({ id: row.id, name: e.target.value });
              setuserSelectedVaule(null);
              setOpen(true);
              setuserArray([]);
            }
          }}
        >
          <option value="Super_Admin">Super Admin</option>
          <option value="empty">Has no Role</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
          <option value="Employee">Employee</option>
        </select>
      ),
    },
    { title: "Assign User", field: "user_email" },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((item) => item.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);

  return (
    <>
      <div className="ms-2 all-patients mt-2">
        <div className="custom-card patients-head ">
          <h5 className="fw-normal py-2 px-2  text-start mb-2 text-login">
            User list and assigning user type
          </h5>
        </div>

        <div className="custom-card patient-table mt-2">
          <MaterialTable
            title="Basic Sorting Preview"
            columns={filterColumns}
            data={filterUserData}
            isLoading={isLoading}
            components={{
              Toolbar: (props) => (
                <div className="d-flex justify-content-between align-items-center">
                  <MTableToolbar {...props} />
                  {user?.isSuperAdmin && (
                    <SimpleSelect
                      options={orgBranch}
                      value={selectedBranch}
                      onChange={(data) => {
                        if (data) {
                          setSelectedBranch(data);
                        } else {
                          setSelectedBranch(null);
                        }
                      }}
                      placeholder="Select Branch"
                    />
                  )}
                </div>
              ),
            }}
            options={{
              sorting: true,
              showTitle: false,
              searchFieldAlignment: "left",
              searchFieldStyle: { borderRadius: 16 },
              pageSize: 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [5, 10, 20, 50, 100],
              headerStyle: {
                textAlign: "center",
              },
              cellStyle: {
                textAlign: "center",
              },
            }}
          />
        </div>
      </div>
      {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Assign user"}
                </DialogTitle>
                <DialogContent>
                    {
                        userType.name === 'Doctor' &&
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size='small'
                            options={userArray}
                            onChange={(e, v) => {
                                console.log("e", v)
                                if (v) {
                                    setuserSelectedVaule({
                                        id: v.id,
                                        identity: v.dr_identity_no,
                                        name: `${v.dr_given_name}`,
                                        email: v.dr_email
                                    })
                                }

                            }}
                            getOptionLabel={(option) => option?.dr_given_name}
                            sx={{ width: 300, marginBottom: "10px", marginTop: "5px" }}
                            renderInput={(params) => <TextField {...params} label={userType.name} />}
                        />
                    }

                    {
                        userType.name === 'Employee' &&
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size='small'
                            options={userArray}
                            onChange={(e, v) => {
                                console.log("e", v)
                                if (v) {
                                    setuserSelectedVaule({
                                        id: v.id,
                                        identity: v.identity_no,
                                        name: `${v.given_name}`,
                                        email: v.email
                                    })
                                }

                            }}
                            getOptionLabel={(option) => option?.given_name}
                            sx={{ width: 300, marginBottom: "10px", marginTop: "5px" }}
                            renderInput={(params) => <TextField {...params} label={userType.name} />}
                        />
                    }
                    {
                        userType.name === 'Patient' &&
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size='small'
                            options={userArray}
                            onChange={(e, v) => {
                                console.log("e", v)
                                if (v) {
                                    setuserSelectedVaule({
                                        id: v.id,
                                        identity: v.patient_hn_number,
                                        name: `${v.patient_first_name} ${v.patient_last_name}`,
                                        email: v.patient_email
                                    })
                                }

                            }}
                            getOptionLabel={(option) => `${option?.patient_first_name} ${option?.patient_last_name}`}
                            sx={{ width: 300, marginBottom: "10px", marginTop: "5px" }}
                            renderInput={(params) => <TextField {...params} label={userType.name} />}
                        />
                    }


                    {
                        userSelectedVaule && <>
                            <DialogContentText>
                                Identity :{userSelectedVaule?.identity}
                            </DialogContentText>
                            <DialogContentText>
                                Name : {userSelectedVaule?.name}
                            </DialogContentText>
                            <DialogContentText>
                                Email : {userSelectedVaule?.email}
                            </DialogContentText>
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={() => {
                        axios.post(`/user-type-update`, { id: userType.id, user_type: userType.name, user_id: userSelectedVaule.id, user_email: userSelectedVaule.email }).then(res => {
                            setstateUpdate(Math.random)
                            handleClose()
                            toast.success("Role assign sucessfully")
                        }).catch(err => {
                            console.log(err)
                        })
                    }} autoFocus>
                        Assign
                    </Button>
                </DialogActions>
            </Dialog> */}
      <Modal
        open={open}
        onClose={handleClose}
        contentLabel="Example Modal"
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <div style={{ minHeight: "300px" }}>
            {userType.name === "Doctor" && (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={userArray}
                onChange={(e, v) => {
                  console.log("e", v);
                  if (v) {
                    setuserSelectedVaule({
                      id: v.id,
                      identity: v.dr_identity_no,
                      name: `${v.fullName}`,
                      email: v.dr_email,
                    });
                  }
                }}
                getOptionLabel={(option) => option?.fullName}
                sx={{ width: 400, marginBottom: "10px", marginTop: "5px" }}
                renderInput={(params) => (
                  <TextField {...params} label={userType.name} />
                )}
              />
            )}

            {userType.name === "Employee" && (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={userArray}
                onChange={(e, v) => {
                  console.log("e", v);
                  if (v) {
                    setuserSelectedVaule({
                      id: v.id,
                      identity: v.identity_no,
                      name: `${v.given_name}`,
                      email: v.email,
                    });
                  }
                }}
                getOptionLabel={(option) => option?.given_name}
                sx={{ width: 400, marginBottom: "10px", marginTop: "5px" }}
                renderInput={(params) => (
                  <TextField {...params} label={userType.name} />
                )}
              />
            )}
            {userType.name === "Patient" && (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={userArray}
                onChange={(e, v) => {
                  console.log("e", v);
                  if (v) {
                    setuserSelectedVaule({
                      id: v.id,
                      identity: v.patient_hn_number,
                      name: `${v.fullName}`,
                      email: v.patient_email,
                    });
                  }
                }}
                getOptionLabel={(option) => `${option?.fullName}`}
                sx={{ width: 400, marginBottom: "10px", marginTop: "5px" }}
                renderInput={(params) => (
                  <TextField {...params} label={userType.name} />
                )}
              />
            )}

            {userSelectedVaule && (
              <>
                <p>Identity :{userSelectedVaule?.identity}</p>
                <p>Name : {userSelectedVaule?.name}</p>
                <p>Email : {userSelectedVaule?.email}</p>
              </>
            )}
            <div className="mt-2">
              <Button onClick={handleClose}>Cancle</Button>
              <Button
                onClick={() => {
                  axios
                    .post(`/user-type-update`, {
                      id: userType.id,
                      user_type: userType.name,
                      user_id: userSelectedVaule.id,
                      user_email: userSelectedVaule.email,
                    })
                    .then((res) => {
                      setstateUpdate(Math.random);
                      handleClose();
                      toast.success("Role assign sucessfully");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                autoFocus
              >
                Assign
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
