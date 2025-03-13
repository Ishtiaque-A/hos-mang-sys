/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Swal from "sweetalert2";
import useUserData from "../../hooks/useUserData";
import ReactSelect from "react-select";
import { getAllBranch } from "../../utils/getAllBranch";
import useCredentialURL from "../../hooks/useCredentialURL";
import { formatPhoneNumber } from "../../utils/numberHelper";
import SimpleSelect from "../../common/components/SimpleSelect";
const LabAgentList = () => {
  const [allpatients, setAllpatients] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [sortedData, setSortededData] = useState([]);
  const [sex, setSex] = useState("sex");
  const [loading, setLoading] = useState(true);
  const [filterTableData, setFilterTableData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);

  useEffect(() => {
    axios.get(`/lab-agent-list`).then((res) => {
      if (res.data.status === 200) {
        setAgentList(res.data.agent);
        setFilterTableData(res.data.agent);
        setLoading(false);
      }
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (selectedBranch && agentList.length > 0) {
      setFilterTableData(
        agentList.filter((data) => data.saas_branch_id === selectedBranch?.id)
      );
    } else {
      setFilterTableData(agentList);
    }
    return () => {};
  }, [selectedBranch, agentList]);

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
  //filters
  useEffect(() => {
    if (sex == "sex") {
      setSortededData(allpatients);
    } else {
      setSortededData(
        allpatients.filter(
          (doctor) =>
            doctor.birth_sex.birth_sex_name.toLowerCase() === sex.toLowerCase()
        )
      );
    }
    return () => {};
  }, [sex, allpatients]);
  //filters

  const deleteAgent = (e, id) => {
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
        axios.delete(`/lab-agent-delete/${id}`).then((res) => {
          thisClicked.closest("tr").remove();
        });
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
      }
    });
  };

  const columns = [
    {
      title: "Name",
      field: `name`,
      render: (row) => (
        <div>
          {row.title === "null" ? "" : row.title_name?.title_name}{" "}
          {row.name === "null" ? "" : row.name}
        </div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Work Phone",
      field: "workPhone",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <div>
          {row.workPhone === "null" ? "" : formatPhoneNumber(row?.workPhone)}
        </div>
      ),
      cellStyle: {
        width: 150,
        textAlign: "left",
      },
    },
    {
      title: "Mobile Phone",
      field: "mobilePhone",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      type: "numeric",
      render: (row) => (
        <div>
          {row.mobilePhone === "null"
            ? ""
            : formatPhoneNumber(row?.mobilePhone)}
        </div>
      ),
      cellStyle: {
        width: 150,
        textAlign: "left",
      },
    },

    {
      title: "Email",
      field: "email",
      render: (row) => <div>{row.email === "null" ? "" : row.email}</div>,
    },
    {
      title: "Birth Sex",
      field: "birth_sex_id",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <div>
          {row.gender_name === "null" ? "" : row.gender_name?.birth_sex_name}
        </div>
      ),

      cellStyle: {
        textAlign: "start",
      },
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <Link
            to={`/edit-lab-agent/${row.id}`}
            className="btn btn-sm action-btn"
          >
            <i className="far fa-edit"></i>
          </Link>
          &nbsp;
          <button
            onClick={(e) => deleteAgent(e, row.id)}
            className="btn  btn-sm action-btn"
          >
            {" "}
            <i className="far fa-trash"></i>{" "}
          </button>
          &nbsp;
          {/* <Link to={`/employee-profile/${row.id}`} className="btn action-btn  btn-sm" data-bs-toggle="tooltip" title="Employee Profile"><i className="far fa-user-alt"></i></Link> */}
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const isSuperAdmin = user?.isSuperAdmin;
  const filterColumn = useMemo(() => {
    if (isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((column) => column.field !== "saas_branch_name");
    }
  }, [isSuperAdmin, columns]);

  const handleFilterBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  return (
    <div className="ms-2 all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Lab Agent List
              <Link
                to="/application"
                className="btn btn-primary me-3 btn-sm float-end"
              >
                {" "}
                Add Lab Agent
              </Link>
            </h5>
          </div>
          <div className="patient-table mt-2">
            <MaterialTable
              columns={filterColumn}
              data={filterTableData}
              isLoading={loading === true ? true : false}
              components={{
                Toolbar: (props) => {
                  return (
                    <div className="d-flex justify-content-between align-items-center">
                      <MTableToolbar {...props} />
                      {user?.isSuperAdmin ? (
                        <div className="filter me-2">
                          <SimpleSelect
                            placeholder="Select Branch"
                            value={selectedBranch}
                            onChange={handleFilterBranch}
                            options={orgBranch || []}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                },
              }}
              options={{
                search: true,
                showTitle: false,
                searchFieldAlignment: "left",
                pageSize: 10,
                textAlign: "left",
                emptyRowsWhenPaging: false,
                pageSizeOptions: [5, 10, 20, 50, 100],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabAgentList;
