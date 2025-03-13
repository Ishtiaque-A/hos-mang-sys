import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Swal from "sweetalert2";
import "../../imageUrl";
import SimpleSelect from "../../common/components/SimpleSelect";
import { getAllBranch } from "../../utils/getAllBranch";
import useCredentialURL from "../../hooks/useCredentialURL";
import useUserData from "../../hooks/useUserData";

function Employee() {
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
    return () => {};
  }, [SaasAuthURL]);

  useEffect(() => {
    axios.get(`/employee`).then((res) => {
      console.log("Employee data", res.data.employee);
      if (res.data.status === 200) {
        setAllpatients(res.data.employee);
        setSortededData(res.data.employee);
        if (res.data.birth_sex.length > 0) {
          setBirthSex(res.data.birth_sex);
        }
        setLoading(false);
      }
    });
  }, []);
  //filters
  useEffect(() => {
    let filteredPatients = allpatients;

    if (sex !== null) {
      filteredPatients = filteredPatients?.filter(
        (doctor) =>
          doctor?.birth_sex?.birth_sex_name?.toLowerCase() ===
          sex.value.toLowerCase()
      );
    }

    if (selectedBranch) {
      filteredPatients = filteredPatients.filter(
        (doctor) =>
          Number(doctor.saas_branch_id) === Number(selectedBranch.value)
      );
    }

    setSortededData(filteredPatients);
  }, [sex, selectedBranch, allpatients]);

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
        axios.delete(`/delete-employee/${id}`).then((res) => {
          thisClicked.closest("tr").remove();
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Name",
      field: `given_name`,
      render: (row) => (
        <div>
          {row.image !== "" ? (
            <img
              className="me-2"
              src={`${global.img_url}/employee/images/${row.image}`}
              width="20px"
              alt="No Img"
            />
          ) : (
            <img
              className="me-2"
              src={`https://static.thenounproject.com/png/363640-200.png`}
              width="20px"
              alt="No Img"
            />
          )}
          {row.title == null ? "" : row.title.title_name}{" "}
          {row.given_name == "null" ? "" : row.given_name}
        </div>
      ),
    },
    {
      title: "Identity No.",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      field: "identity_no",
      render: (row) => (
        <div>{row.identity_no == "null" ? "" : row.identity_no}</div>
      ),
    },
    {
      title: "Designations",
      field: "user_type",
      render: (row) => (
        <div>{row.user_type == null ? "" : row.user_type.user_type_name}</div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Work Phone",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      field: "work_phone",
      render: (row) => (
        <div>{row.work_phone == "null" ? "" : row.work_phone}</div>
      ),
      cellStyle: {
        width: 150,
      },
    },

    {
      title: "Email",
      field: "email",
      render: (row) => <div>{row.email == "null" ? "" : row.email}</div>,
    },
    {
      title: "Birth Sex",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      field: "birth_sex_id",
      render: (row) => (
        <div>{row.birth_sex == null ? "" : row.birth_sex.birth_sex_name}</div>
      ),
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <Link to={`/edit-employee/${row.id}`} class="btn btn-sm action-btn">
            <i class="far fa-edit"></i>
          </Link>
          &nbsp;
          <button
            onClick={(e) => deleteDoctor(e, row.id)}
            className="btn  btn-sm action-btn"
          >
            {" "}
            <i class="far fa-trash"></i>{" "}
          </button>
          &nbsp;
          <Link
            to={`/employee-profile/${row.id}`}
            class="btn action-btn  btn-sm"
            data-bs-toggle="tooltip"
            title="Employee Profile"
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
      return columns.filter((item) => item.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);

  return (
    <>
      <div className="ms-2 all-patients mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="patients-head custom-card">
              <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
                Employee List
                <Link
                  to="/add-employee"
                  className="btn btn-primary me-3 btn-sm float-end"
                >
                  {" "}
                  Add Employee
                </Link>
              </h5>
            </div>
            <div className="patient-table mt-2">
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
                    <div className="d-flex gap-2 align-items-center">
                      <MTableToolbar
                        style={{ width: 80, fontSize: 14 }}
                        {...props}
                      />
                      <SimpleSelect
                        options={
                          birthsex?.map((item) => ({
                            ...item,
                            value: item.birth_sex_name,
                            label: item.birth_sex_name,
                          })) || []
                        }
                        onChange={(data) => {
                          if (data) {
                            setSex(data);
                          } else {
                            setSex(null);
                          }
                        }}
                        value={sex}
                        placeholder="Select Gender"
                        width="150px"
                      />
                      {user?.isSuperAdmin ? (
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
                          width="150px"
                        />
                      ) : null}
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

export default Employee;
