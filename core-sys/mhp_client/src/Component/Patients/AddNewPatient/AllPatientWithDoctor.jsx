import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Patients/AddNewPatient/AddNewPatient.css";
import MaterialTable, { MTableToolbar } from "material-table";
import "jspdf-autotable";
import moment from "moment";
import Swal from "sweetalert2";
import "../../../imageUrl";
import useUserData from "../../../hooks/useUserData";
import useCredentialURL from "../../../hooks/useCredentialURL";
import { getAllBranch } from "../../../utils/getAllBranch";
import SimpleSelect from "../../../common/components/SimpleSelect";
import { formatPhoneNumber, formateHN } from "../../../utils/numberHelper";
import { nullParser } from "../../../utils/null-parser";

function AllPatientWithDoctor() {
  const [loading, setLoading] = useState(true);
  const [sortedData, setSortededData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [filterData, setFilterData] = useState([]);
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
    let filteredData = sortedData;
    if (selectedBranch) {
      filteredData = sortedData?.filter(
        (data) => data?.saas_branch_id === selectedBranch?.value
      );
    }
    setFilterData(filteredData);
    return () => { };
  }, [selectedBranch, sortedData]);
  useEffect(() => {
    axios.get("patients").then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        setSortededData(res?.data?.patients);
        setLoading(false);
      }
    });
  }, []);

  const deletePatient = (e, id) => {
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
        axios.delete(`/delete-patients/${id}`).then((res) => {
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
      field: "fullName",
      render: (row) => (
        <div>
          {nullParser(row?.patient_images) ? (
            <img
              className="me-2"
              src={`${global.img_url}/images/files/${row?.patient_images}`}
              width="20px"
              alt="no_img"
            />
          ) : (
            <img
              className="me-2"
              src={`https://static.thenounproject.com/png/363640-200.png`}
              width="20px"
              alt="No Image1"
            />
          )}
          {row?.fullName}
        </div>
      ),
      cellStyle: {
        width: 300,
      },
    },
    {
      title: "HN No",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      field: "patient_hn_number",
      render: (row) => (
        <div>
          <span style={{ whiteSpace: "nowrap" }}>
            {" "}
            {row?.patient_hn_number == null
              ? ""
              : formateHN(row?.patient_hn_number)}
          </span>
        </div>
      ),
      cellStyle: {
        width: 150,
      },
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },

    {
      title: "Mobile",
      field: "patient_mobile_phone",
      render: (row) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {row?.patient_mobile_phone == null
            ? ""
            : row?.patient_mobile_phone?.startsWith("0") ? formatPhoneNumber(`+88${row?.patient_mobile_phone}`) : formatPhoneNumber(row?.patient_mobile_phone)}
        </span>
      ),
    },
    {
      title: "Email",
      field: "patient_email",
      render: (row) => (
        <div>{row?.patient_email == null ? "" : row?.patient_email}</div>
      ),
    },
    {
      title: "DOB",
      field: "patient_dob",
      render: (row) => (
        <div>
          {row?.patient_dob == null
            ? ""
            : moment(row?.patient_dob).format("MM/DD/YYYY")}
        </div>
      ),
    },
    {
      title: "Status",
      field: "patient_status",
      render: (row) => (
        <div>{row?.statuses == null ? "" : row?.statuses?.status_name}</div>
      ),
    },
    {
      title: "Sex",
      field: "patient_birth_sex_id",
      render: (row) => (
        <div>
          {row?.patient_birth_sex_id == null
            ? ""
            : row?.patient_birth_sex?.birth_sex_name}
        </div>
      ),
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div className="text-center" style={{ fontSize: "3px" }}>
          <Link
            to={`/edit-patients/${row?.id}`}
            className="btn action-btn btn-sm"
            data-bs-toggle="tooltip"
            title="Edit Patients"
          >
            <i className="far fa-edit"></i>
          </Link>
          &nbsp;
          <button
            onClick={(e) => deletePatient(e, row?.id)}
            className="btn action-btn btn-sm"
          >
            {" "}
            <i className="far fa-trash"></i>{" "}
          </button>
          &nbsp;
          <Link
            to={`/patients-profile/${row?.id}`}
            className="btn action-btn btn-sm"
            data-bs-toggle="tooltip"
            title="Patients Profile"
          >
            <i className="far fa-user-alt"></i>
          </Link>
        </div>
      ),
    },
  ];

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((col) => col.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);

  return (
    <div className="ms-2 all-patients mt-2">
      <div className="custom-card patients-head">
        <h5 className="fw-normal py-2 px-2  text-start mb-2 text-login">
          Patients List
          <Link
            to="/newpatient"
            className="btn btn-primary me-1 btn-sm float-end"
          >

            Add Patients{" "}
          </Link>
        </h5>
      </div>

      <div className="custom-card patient-table mt-2">
        <MaterialTable
          columns={filterColumns}
          data={filterData}
          isLoading={loading}
          options={{
            search: true,
            showTitle: false,
            searchFieldAlignment: "left",
            searchFieldStyle: { borderRadius: 16 },
            pageSize: 10,
            emptyRowsWhenPaging: false,
            pageSizeOptions: [5, 10, 20, 50, 100],
          }}
          components={{
            Toolbar: (props) => (
              <div className="d-flex justify-content-between align-items-center">
                <MTableToolbar {...props} />
                {user?.isSuperAdmin && (
                  <div className="filter me-2">
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
                  </div>
                )}
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default AllPatientWithDoctor;
