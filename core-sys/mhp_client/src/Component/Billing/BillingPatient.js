import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import "jspdf-autotable";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import ExistingInvoPreview from "./ExistingInvoPreview";
import Modal from "react-modal";
import useUserData from "../../hooks/useUserData";
import SimpleSelect from "../../common/components/SimpleSelect";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import { nullParser } from "../../utils/null-parser";
import { NewModal } from "../../common/components/NewModal";

function AllPatients() {
  const [loading, setLoading] = useState(true);
  const [allpatients, setAllpatients] = useState([]);
  const [filterAllPatients, setAllFitlerPatients] = useState([]);
  const [savedBillng, setsavedBillng] = useState([]);
  const [filterSavedBillng, setFilterSavedBillng] = useState([]);
  const [patientList, setpatientList] = useState([]);
  const [filterPatientList, setFilterPatientList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const user = useUserData();
  useEffect(() => {
    let filteredPatientsList = patientList;
    let filteredAllPatients = allpatients;
    let filteredSavedBilling = savedBillng;
    if (selectedBranch) {
      filteredPatientsList = patientList?.filter((item) => {
        return item.saas_branch_id === selectedBranch.value;
      });
      filteredAllPatients = allpatients?.filter((item) => {
        return item.saas_branch_id === selectedBranch.value;
      });
      filteredSavedBilling = savedBillng?.filter((item) => {
        return item.saas_branch_id === selectedBranch.value;
      });
    }
    setFilterPatientList(filteredPatientsList);
    setAllFitlerPatients(filteredAllPatients);
    setFilterSavedBillng(filteredSavedBilling);
  }, [selectedBranch, patientList, allpatients, savedBillng]);
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
    axios.get(`/billingPatient`).then((res) => {
      console.log("appointment patients", res.data.billingPatients);

      if (res.data.status === 200) {
        setAllpatients(res.data.billingPatients);
        setLoading(false);
      }
    });

    axios.get(`/get-all-billing`).then((res) => {
      console.log("billings", res.data.invoice);
      setsavedBillng(res.data.invoice);
      setLoading(false);
    });

    axios.get(`/patients`).then((res) => {
      setpatientList(res.data.patients);
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Name",
      field: "patient_first_name",
      render: (row) => (
        <div>
          {row?.patient_images !== "" ? (
            <img
              className="me-2"
              src={`${global.img_url}/images/files/${row?.patient_appionment?.patient_images}`}
              width="20px"
              alt="No img"
            />
          ) : (
            <img
              className="me-2"
              src={`https://static.thenounproject.com/png/363640-200.png`}
              width="20px"
              alt="No img"
            />
          )}
          {row?.patient_appionment?.fullName}
        </div>
      ),
      cellStyle: {
        width: 300,
      },
    },
    {
      title: "HI No",
      field: "patient_hn_number",
      render: (row) => (
        <div>
          {row?.patient_appionment?.patient_hn_number == null
            ? ""
            : row?.patient_appionment?.patient_hn_number}
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
        <div>
          {row?.patient_appionment?.patient_mobile_phone == null
            ? ""
            : row?.patient_appionment?.patient_mobile_phone}
        </div>
      ),
    },
    {
      title: "Email",
      field: "patient_email",
      render: (row) => (
        <div>
          {row?.patient_appionment?.patient_email == null
            ? ""
            : row?.patient_appionment?.patient_email}
        </div>
      ),
    },
    {
      title: "DOB",
      field: "patient_dob",
      render: (row) => (
        <div>
          {row?.patient_appionment?.patient_dob == null
            ? ""
            : moment(row?.patient_appionment?.patient_dob)?.format("MM/DD/YYYY")}
        </div>
      ),
    },

    {
      title: "Sex",
      field: "patient_birth_sex_id",
      render: (row) => (
        <div>
          {nullParser(
            row?.patient_appionment?.patient_birth_sex?.birth_sex_name
          )
            ? row?.patient_appionment?.patient_birth_sex?.birth_sex_name
            : ""}
        </div>
      ),
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <Link
            to={`/billing/${row?.patient_id}`}
            className="btn"
            data-bs-toggle="tooltip"
            title="Edit Patients"
          >
            <i
              style={{ fontSize: "20px" }}
              className="fa-regular fa-circle-right"
            ></i>
          </Link>
          &nbsp;
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsPatents = [
    {
      title: "Name",
      field: "patient_first_name",
      render: (row) => (
        <div>
          {row?.patient_images !== "" ? (
            <img
              className="me-2"
              src={`${global?.img_url}/images/files/${row?.patient_images}`}
              width="20px"
              alt="No"
            />
          ) : (
            <img
              className="me-2"
              src={`https://static.thenounproject.com/png/363640-200.png`}
              width="20px"
              alt="No"
            />
          )}
          {row?.patient_title_id == null ? "" : row?.title?.title_name}{" "}
          {row?.patient_first_name == null ? "" : row?.patient_first_name}{" "}
          {row?.patient_middle_name == null ? "" : row?.patient_middle_name}{" "}
          {row?.patient_last_name == null ? "" : row?.patient_last_name}
        </div>
      ),
      cellStyle: {
        width: 300,
      },
    },
    {
      title: "HI No",
      field: "patient_hn_number",
      render: (row) => (
        <div>{row?.patient_hn_number == null ? "" : row?.patient_hn_number}</div>
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
        <div>
          {row?.patient_mobile_phone == null ? "" : row?.patient_mobile_phone}
        </div>
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
            : moment(row?.patient_dob)?.format("MM/DD/YYYY")}
        </div>
      ),
    },

    {
      title: "Sex",
      field: "patient_birth_sex_id",
      render: (row) => (
        <div>{row?.patient_birth_sex_id == null ? "" : row?.birth_sex_name}</div>
      ),
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <Link
            to={`/billing/${row?.id}`}
            className="btn"
            data-bs-toggle="tooltip"
            title="Edit Patients"
          >
            <i
              style={{ fontSize: "20px" }}
              className="fa-regular fa-circle-right"
            ></i>
          </Link>
          &nbsp;
        </div>
      ),
    },
  ];

  const filterPatientColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columnsPatents;
    } else {
      return columnsPatents.filter((col) => col.field !== "saas_branch_name");
    }
  }, [columnsPatents, user?.isSuperAdmin]);

  const [patientInvoiceData, setpatientInvoiceData] = useState();
  const [invoiceBilling, setinvoiceBilling] = useState([]);
  const [printLoding, setprintLoding] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsForBillng = [
    {
      title: "Name",
      field: "patient_id",
      render: (row) => (
        <div>
          {" "}
          {row?.patient_id == null ? (
            ""
          ) : row?.patient_id?.patient_images !== "" ? (
            <img
              className="me-2"
              src={`${global?.img_url}/images/files/${row?.patient_id?.patient_images}`}
              width="20px"
              alt="No img"
            />
          ) : (
            <img
              className="me-2"
              src={`https://static.thenounproject.com/png/363640-200.png`}
              width="20px"
              alt="No img"
            />
          )}{" "}
          {row?.patient_id == null ? "" : row?.patient_id?.patient_first_name}{" "}
          {row?.patient_id == null ? "" : row?.patient_id?.patient_middle_name}{" "}
          {row?.patient_id == null ? "" : row?.patient_id?.patient_last_name}
        </div>
      ),
      cellStyle: {
        width: 100,
      },
    },
    {
      title: "HI No",
      field: "patient_id",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <div>
          {row?.patient_id == null ? "" : row?.patient_id?.patient_hn_number}
        </div>
      ),
    },
    {
      title: "Invoice Number",
      field: "invoice_number",
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Email",
      render: (row) => (
        <div>{row?.patient_id == null ? "" : row?.patient_id?.patient_email}</div>
      ),
    },

    {
      title: "Issued Date",
      field: "issued_date",
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Preview",
      render: (row) => (
        <div>
          <span
            onClick={() => {
              setprintLoding(true);
              axios
                .get(`/get-billing-invoice/${row.invoice_number}`)
                .then((res) => {
                  setpatientInvoiceData(res.data.invoice);
                  axios
                    .get(
                      `getBilling/${res.data.invoice.patient_id.id}/${res.data.invoice.invoice_number}`
                    )
                    .then((res) => {
                      setinvoiceBilling(res.data.allbilling);
                      handlePeview();
                    });
                });
            }}
            className="btn"
            data-bs-toggle="tooltip"
            title="Invoice Preview"
          >
            <i
              style={{ fontSize: "20px" }}
              className="fa fa-eye invoPreview"
            ></i>
          </span>
          &nbsp;
        </div>
      ),
    },
  ];
  const filterForBillngColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columnsForBillng;
    } else {
      return columnsForBillng.filter((col) => col.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columnsForBillng]);

  const componentRef = useRef();
  const handlePeview = useReactToPrint({
    content: () => componentRef.current,
  });

  const [modelShowForPatient, setmodelShowForPatient] = useState(false);

  return (
    <>
      {patientInvoiceData && invoiceBilling.length > 0 && (
        <div className="invoicePreviw" ref={componentRef}>
          <ExistingInvoPreview
            setprintLoding={setprintLoding}
            invoiceBilling={invoiceBilling}
            patientInvoiceData={patientInvoiceData}
          />
        </div>
      )}
      <NewModal
        size="lg"
        isOpen={modelShowForPatient}
        onClose={() => setmodelShowForPatient(false)}
      >
        <NewModal.Header onClose={() => setmodelShowForPatient(false)}>
          <NewModal.Title>Register Patient List</NewModal.Title>
        </NewModal.Header>
        <NewModal.Body>
          <MaterialTable
            columns={filterPatientColumns}
            data={filterPatientList}
            isLoading={loading == true ? true : false}
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
                <div className="d-flex align-items-center justify-content-between">
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
          />
        </NewModal.Body>
      </NewModal>
      <div className="ms-2 mt-2 all-patients ">
        <div className="ms-1 row cns-container">
          <div className="custom-card flex-grow-1">
            <h5 className="fw-normal  text-start py-2 px-1 mb-2 text-login">
              Billing && Invoice
            </h5>
          </div>
          <div className="billing custom-card mt-2">
            <div className="BillingHeader">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Todays App. Patients
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Existing Invoice
                  </button>
                </li>
              </ul>
              <i
                onClick={() => setmodelShowForPatient(true)}
                className="fa-solid fa-circle-plus addBilling"
              >
                Add Billing
              </i>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="card-body patient-table">
                  <MaterialTable
                    columns={filterColumns}
                    data={filterAllPatients}
                    isLoading={loading === true ? true : false}
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
                        <div className="d-flex align-items-center justify-content-between">
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
                  />
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="card-body patient-table">
                  {printLoding ? (
                    <div className="divLoaderBilling">
                      <svg
                        className="svgLoader"
                        viewBox="0 0 100 100"
                        width="10em"
                        height="10em"
                      >
                        <path
                          ng-attr-d="{{config.pathCmd}}"
                          ng-attr-fill="{{config.color}}"
                          stroke="none"
                          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                          fill="#51CACC"
                          transform="rotate(179.719 50 51)"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            calcMode="linear"
                            values="0 50 51;360 50 51"
                            keyTimes="0;1"
                            dur="1s"
                            begin="0s"
                            repeatCount="indefinite"
                          ></animateTransform>
                        </path>
                      </svg>
                    </div>
                  ) : (
                    <MaterialTable
                      columns={filterForBillngColumns}
                      data={filterSavedBillng}
                      isLoading={loading === true ? true : false}
                      components={{
                        Toolbar: (props) => (
                          <div className="d-flex align-items-center justify-content-between">
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
                        search: true,
                        showTitle: false,
                        searchFieldAlignment: "left",
                        searchFieldStyle: { borderRadius: 16 },
                        pageSize: 10,
                        emptyRowsWhenPaging: false,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPatients;
