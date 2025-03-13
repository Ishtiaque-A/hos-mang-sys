import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from "react-modal";
import { Grid, Tooltip } from "@material-ui/core";
import { toast } from "react-toastify";
import swal from "sweetalert";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import GreatLabTechnician from "./GreatLabTechnician";
import GreatLabTechnicainModal from "./GreatLabTechnicainModal";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import SimpleSelect from "../../common/components/SimpleSelect";
import { formateHN, numHelper } from "../../utils/numberHelper";
const GreatLabReportBackup = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListSort, setInvoiceListSort] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
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
    if (selectedBranch) {
      const filterData = invoiceListSort.filter((item) => {
        return item.saas_branch_id === selectedBranch?.value;
      });
      setInvoiceList(filterData);
    } else {
      setInvoiceList(invoiceListSort);
    }
    return () => {};
  }, [selectedBranch, invoiceListSort]);

  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  useEffect(() => {
    axios.get(`/great-lab-all-invoice`).then((res) => {
      if (res.data.status === 200) {
        setInvoiceList(res.data.invoice);
        setInvoiceListSort(res.data.invoice);
        setLoading(false);
      }
    });
  }, [update]);

  const [testInfo, setTestInfo] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Invoice No",
      field: `invoiceNo`,
      render: (row) => numHelper(row.invoiceNo),
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "HN",
      field: `name`,
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {row.patient === "null"
              ? ""
              : formateHN(row.patient?.patient_hn_number)}
          </span>
        </div>
      ),
    },
    {
      title: "Name",
      field: `patient_first_name`,
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {row?.patient_first_name === "null" ? "" : row?.fullName}
          </span>
        </div>
      ),
    },
    {
      title: "Branch",
      field: `saas_branch_name`,
    },
    {
      title: "Test Name",
      field: "",
      headerStyle: {
        whiteSpace: "nowrap",
      },
      render: (row) => (
        <div
          style={{
            backgroundColor: "#F4F4F4",
            borderRadius: "20px",
            padding: "7px 10px",
          }}
        >
          {row.tests === "null"
            ? ""
            : row.tests.map((item, i) => (
                <>
                  <span
                    onClick={() => handleTestSampleCollection(item, row)}
                    className="me-1 fw-bold"
                    style={{
                      color: `${
                        Number(item.report_add_status) === 1 &&
                        Number(item.report_confiremd_status) === 1
                          ? "#69B128"
                          : Number(item.report_add_status) === 1 &&
                            Number(item.report_confiremd_status) === 0
                          ? "#DAA520"
                          : "red"
                      } `,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.testName}
                  </span>
                  {row.tests.length - 1 !== i && (
                    <span
                      style={{
                        borderLeft: "2px solid #DEDEDE",
                        whiteSpace: "nowrap",
                      }}
                    ></span>
                  )}
                </>
              ))}
        </div>
      ),
    },
    {
      title: "Remarks",
      field: "reportReceiverFromLabRemark",
      render: (row) => {
        return (
          <span style={{ whiteSpace: "nowrap" }}>
            {row?.reportReceiverFromLabRemark === "null"
              ? ""
              : row?.reportReceiverFromLabRemark}
          </span>
        );
      },
    },
    {
      title: "Status",
      field: "collection_status",
      render: (row) => {
        const added = row.tests?.reduce(
          (total, current) => total + Number(current.report_add_status),
          0
        );
        const confirmed = row.tests?.reduce(
          (total, current) => total + Number(current.report_confiremd_status),
          0
        );
        const testLength = row.tests?.length;
        return (
          <div>
            {added === testLength && confirmed === testLength && (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-success me-1"
                ></i>
                Confirmed
              </span>
            )}
            {confirmed === 0 && added > 0 && (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-warning me-1"
                ></i>
                Pending
              </span>
            )}
            {confirmed !== testLength && confirmed > 0 && (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-warning me-1"
                ></i>
                Partial
              </span>
            )}
            {added === 0 && (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-danger me-1"
                ></i>
                Not added
              </span>
            )}
          </div>
        );
      },

      cellStyle: {
        textAlign: "center",
        width: "3%",
      },
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <button
            data-bs-toggle="tooltip"
            title="Report"
            onClick={() => handleReportView(row)}
            className="btn btn-sm action-btn"
          >
            <i className="fa-regular fa-eye text-dark mt-1"></i>
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
        width: "5%",
      },
    },
  ];
  const [modalIsOpenSampleEdit, setModalIsOpenSampleEdit] = useState(false);

  const customStylesSample = {
    content: {
      top: "37%",
      left: "21%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%",
      height: "550px",
      padding: "10px",
      marginLeft: "38%",
    },
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  // const handleEditSample = (item) => {
  //   setModalIsOpenSampleEdit(true);
  // };

  const [testDetails, setTestDetails] = useState({});
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [test, setTest] = useState({});

  const [patientDetails, setPatinetDetails] = useState({});
  const handleTestSampleCollection = (item, row) => {
    setInvoiceDetails(row);
    setTest(item);
    axios
      .get(`edit-patients/${row.patient_id}`)
      .then((res) => setPatinetDetails(res.data.patient));
    axios.get(`test-name-by-id/${item.testCode}`).then((res) => {
      if (res.status === 200) {
        setTestDetails(res.data.test_name);
        console.log("with Test config:", res.data.test_name);
      }
    });
    if (
      Number(item.collectionStatus) === 0 &&
      item.testCategory === "Pathology"
    ) {
      swal("Please collect sample first!", "", "info");
    } else {
      setModalIsOpenSampleEdit(true);
    }
  };

  // const reportCollectionApprove = (item) => {
  //   if (item.id) {
  //     axios
  //       .post(`great-lab-receive-from-lab-approve/${item.id}`, {
  //         isApprovedInReceiveFromLab: 1,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           swal("Success", res.data.message, "success");
  //           axios.get(`/great-lab-all-invoice`).then((res) => {
  //             if (res.data.status === 200) {
  //               setInvoiceList(res.data.invoice);
  //               setInvoiceListSort(res.data.invoice);
  //               setLoading(false);
  //             }
  //           });
  //         }
  //       });
  //   }
  // };
  // search with date range
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const searchByDateRange = () => {
    axios.post("great-lab-invoice-date-range-search", dateRange).then((res) => {
      if (res.status === 200) {
        setInvoiceList(res.data.invoice);
        setInvoiceListSort(res.data.invoice);
      }
    });
  };
  const filterByStatus = (e) => {
    const { value } = e.target;
    if (value === "sent") {
      const filteredBySent = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.reportCollectionStatus),
            0
          ) > 0
      );
      setInvoiceList(filteredBySent);
    } else if (value === "pending") {
      const filteredByPending = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.reportCollectionStatus),
            0
          ) === 0
      );
      setInvoiceList(filteredByPending);
    } else if (value === "all") {
      setInvoiceList(invoiceListSort);
    }
  };
  const [selectedTest, setSelectedTest] = useState([]);
  const [receiveMultipleReport, setReceiveMultipleReport] = useState(false);
  const receiveMultiple = () => {
    if (selectedTest.length > 0) {
      setReceiveMultipleReport(true);
      setModalIsOpenSampleEdit(true);
    } else {
      toast.error("Please select test to receive !");
    }
  };
  const closeModal = () => {
    setModalIsOpenSampleEdit(false);
    setInvoiceDetails({});
    setTestDetails({});
    setTest({});
    setUpdate(Math.random());
  };
  // report view modal
  const [reportViewModal, setReportViewModal] = useState(false);
  const handleReportView = (item) => {
    setTestInfo(item);
    setInvoiceDetails(item);
    console.log("item", item);
    setReportViewModal(true);
  };
  const closeReportViewModal = () => {
    setReportViewModal(false);
  };

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((item) => item.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);
  return (
    <div className="ms-2 all-patients lab-agent mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Lab Technician
            </h5>
          </div>
          <div className="custom-card p-2 mt-2">
            <div className="row">
              <div className="col-3">
                <h6>Report Generate for patient</h6>
              </div>
              <div className="col-9 row">
                <div className="col-4 row">
                  <div className="col-2">
                    <label className="fw-bold"> Date</label>
                  </div>
                  <div className="col-10">
                    <input
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          startDate: e.target.value,
                        })
                      }
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-4 row">
                  <div className="col-2">
                    <label className="fw-bold"> To</label>
                  </div>
                  <div className="col-10">
                    <input
                      onChange={(e) =>
                        setDateRange({ ...dateRange, endDate: e.target.value })
                      }
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-4 row">
                  <div className="col-3 rx-one-button-group">
                    <button onClick={searchByDateRange} className="btn">
                      Search
                    </button>
                  </div>
                  <div className="col-9 row">
                    <div className="col-3">
                      <label className="fw-bold"> Status</label>
                    </div>
                    <div className="col-9">
                      <select
                        onChange={filterByStatus}
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                      >
                        <option value="all">Select</option>
                        <option value="sent">Sent to Lab</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-table mt-2">
            <MaterialTable
              columns={filterColumns}
              data={invoiceList}
              isLoading={loading === true ? true : false}
              options={{
                search: true,
                showTitle: false,
                overflowX: "auto",
                searchFieldAlignment: "left",
                pageSize: 10,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [5, 10, 20, 50, 100],
                selection: true,
                selectionProps: (rowData) => ({
                  disabled:
                    rowData.tests?.reduce(
                      (total, current) =>
                        total + Number(current.collectionStatus),
                      0
                    ) === 0,
                }),
              }}
              onSelectionChange={(rows) => setSelectedTest(rows)}
              components={{
                Toolbar: (props) => (
                  <div className="d-flex justify-content-between align-items-center">
                    <MTableToolbar
                      style={{ width: 80, fontSize: 14 }}
                      {...props}
                    />
                    <Grid
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      {user?.isSuperAdmin && (
                        <SimpleSelect
                          placeholder="Select Branch"
                          options={orgBranch}
                          value={selectedBranch}
                          onChange={handleChangeBranch}
                        />
                      )}
                      {selectedTest.length > 0 && (
                        <Tooltip title="Receive multiple" placement="bottom">
                          <LibraryAddIcon
                            className="float-end export-icon pe-auto me-3 mt-1"
                            onClick={receiveMultiple}
                          />
                        </Tooltip>
                      )}
                    </Grid>
                  </div>
                ),
              }}
            />
            <div className="mt-2">
              <span className="me-2">
                <i
                  style={{ color: "red" }}
                  className="fa-solid fa-square me-1"
                ></i>
                Report Not Created
              </span>
              <span className="me-2">
                <i
                  style={{ color: "#FFD600" }}
                  className="fa-solid fa-square me-1"
                ></i>
                Partially Created
              </span>
              <span className="me-2">
                <i
                  style={{ color: "#69B128" }}
                  className="fa-solid fa-square me-1"
                ></i>
                Report Created
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpenSampleEdit}
        onRequestClose={closeModal}
        style={customStylesSample}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setModalIsOpenSampleEdit(false)}
        >
          <i className="fal fa-times mt-2 me-1"></i>
        </span>
        <GreatLabTechnician
          test={test}
          closeModal={closeModal}
          setUpdate={setUpdate}
          testDetails={testDetails}
          invoiceDetails={invoiceDetails}
          patientDetails={patientDetails}
        />
      </Modal>
      <GreatLabTechnicainModal
        invoiceDetails={invoiceDetails}
        patientDetails={patientDetails}
        testInfo={testInfo}
        reportViewModal={reportViewModal}
        closeReportViewModal={closeReportViewModal}
      />
    </div>
  );
};

export default GreatLabReportBackup;
