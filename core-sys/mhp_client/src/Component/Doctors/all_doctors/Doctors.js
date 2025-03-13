import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Patients/AddNewPatient/AddNewPatient.css";
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import Swal from "sweetalert2";
import "../../../imageUrl";
import useCredentialURL from "../../../hooks/useCredentialURL";
import useUserData from "../../../hooks/useUserData";
import { getAllBranch } from "../../../utils/getAllBranch";
import SimpleSelect from "../../../common/components/SimpleSelect";

function AllDoctors() {
  const [allpatients, setAllpatients] = useState([]);
  const [sortedData, setSortededData] = useState([]);
  const [birthsex, setBirthSex] = useState([{ birth_sex_name: "" }]);
  const [sex, setSex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const user = useUserData();
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
    return () => { };
  }, [SaasAuthURL]);

  useEffect(() => {
    let filteredData = allpatients;
    if (selectedBranch) {
      filteredData = allpatients?.filter(
        (data) => Number(data?.saas_branch_id) === Number(selectedBranch.value)
      );
    }
    setSortededData(filteredData);
  }, [selectedBranch, allpatients]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData")).user_type === "Doctor") {
      axios
        .get(`/doctors/${JSON.parse(localStorage.getItem("userData")).user_id}`)
        .then((res) => {
          console.log("doc", res.data.doctors);
          setLoading(false);

          setAllpatients(res.data.doctors);
          setSortededData(res.data.doctors);
          if (res.data.birth_sex.length > 0) {
            const modifiedData = res?.data?.birth_sex?.map((d) => ({
              ...d,
              label: d.birth_sex_name,
              value: d.id,
            }));
            setBirthSex(modifiedData);
          }
        });
    } else {
      axios.get(`/doctors`).then((res) => {
        console.log(res.data.doctors);
        if (res.data.status === 200) {
          setAllpatients(res.data.doctors);
          setSortededData(res.data.doctors);
          if (res.data.birth_sex.length > 0) {
            const modifiedData = res?.data?.birth_sex?.map((d) => ({
              ...d,
              label: d.birth_sex_name,
              value: d.id,
            }));
            setBirthSex(modifiedData);
          }
          setLoading(false);
        }
      });
    }
  }, []);
  //filters
  useEffect(() => {
    if (sex === null) {
      setSortededData(allpatients);
    } else {
      setSortededData(
        allpatients.filter(
          (doctor) =>
            doctor?.birth_sex?.birth_sex_name?.toLowerCase() ===
            sex?.label?.toLowerCase()
        )
      );
    }
  }, [sex, allpatients]);
  //filters

  const deleteDoctor = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-doctors/${id}`).then((res) => {
          if (res.data.status === 200) {
            thisClicked.closest("tr").remove();
          }
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Name",
      field: `fullName`,
      render: (row) => (
        <div>
          {row.dr_images !== "" ? (
            <img
              className="me-2"
              src={`${global.img_url}/doctors/images/${row.dr_images}`}
              width="20px"
              alt="dr_images"
            />
          ) : (
            <img
              className="me-2"
              src={`https://static.thenounproject.com/png/363640-200.png`}
              width="20px"
              alt="dr_images"
            />
          )}
          {row.title == null ? "" : row.title?.title_name} {row?.fullName}
        </div>
      ),
      cellStyle: {
        width: 300,
      },
    },
    {
      title: "ID No.",
      field: "dr_identity_no",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <div>{row.dr_identity_no == "null" ? "" : row.dr_identity_no}</div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "DOB",
      field: "dr_dob",
      type: "numeric",
      render: (row) => (
        <div>
          {row.dr_dob == "null" ? "" : moment(row.dr_dob).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      title: "Work Phone",
      field: "dr_work_phone",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <div>{row.dr_work_phone == "null" ? "" : row.dr_work_phone}</div>
      ),
      cellStyle: {
        width: 150,
      },
    },

    {
      title: "Email",
      field: "dr_email",
      render: (row) => <div>{row.dr_email == "null" ? "" : row.dr_email}</div>,
    },
    {
      title: "Birth Sex",
      field: "dr_birth_sex_id",
      render: (row) => (
        <div>
          {row.dr_birth_sex_id == null ? "" : row.birth_sex?.birth_sex_name}
        </div>
      ),
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <Link to={`/edit-doctors/${row.id}`} class="btn  btn-sm action-btn">
            <i class="far fa-edit"></i>
          </Link>
          &nbsp;
          {user?.isSuperAdmin && (
            <button
              onClick={(e) => deleteDoctor(e, row.id)}
              className="btn btn-sm action-btn"
            >
              {" "}
              <i class="fas fa-trash"></i>{" "}
            </button>
          )}
          &nbsp;
          <Link
            to={`/doctors-profile/${row.id}`}
            class="btn action-btn btn-sm"
            data-bs-toggle="tooltip"
            title="Doctors Profile"
          >
            <i class="far fa-user-alt"></i>
          </Link>
        </div>
      ),
    },
  ];

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((column) => column.field !== "saas_branch_name");
    }
  }, [columns, user?.isSuperAdmin]);

  return (
    <>
      <div className="ms-2 all-patients mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="custom-card patients-head ">
              <h5 className="fw-normal py-2 px-2  text-start mb-2 text-login">
                Doctors List
                {user?.isSuperAdmin && (
                  <Link
                    to="/new-doctors"
                    className="btn btn-primary btn-sm float-end"
                  >
                    {" "}
                    Add Doctors{" "}
                  </Link>
                )}
              </h5>
            </div>
            <div className="patient-table">
              <MaterialTable
                columns={filterColumns}
                data={sortedData}
                isLoading={loading == true ? true : false}
                options={{
                  search: true,
                  showTitle: false,
                  searchFieldAlignment: "left",
                  pageSize: 10,
                  emptyRowsWhenPaging: false,
                  pageSizeOptions: [5, 10, 20, 50, 100],
                }}
                components={{
                  Toolbar: (props) => (
                    <div className="d-flex justify-content-between align-items-center">
                      <MTableToolbar {...props} />
                      <div className="filter me-2">
                        {user?.isSuperAdmin && (
                          <>
                            <SimpleSelect
                              value={sex}
                              options={birthsex}
                              onChange={(data) => {
                                if (data) {
                                  setSex(data);
                                } else {
                                  setSex(null);
                                }
                              }}
                              placeholder="Select Sex"
                            />
                            <SimpleSelect
                              value={selectedBranch}
                              options={orgBranch}
                              onChange={(data) => {
                                if (data) {
                                  setSelectedBranch(data);
                                } else {
                                  setSelectedBranch(null);
                                }
                              }}
                              placeholder="Select Branch"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDoctors;
