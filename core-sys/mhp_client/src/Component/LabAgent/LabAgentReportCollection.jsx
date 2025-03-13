import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from "react-modal";
import moment from "moment";
import { Grid, Tooltip } from "@material-ui/core";
import Select from "react-select";
import { toast } from "react-toastify";
import swal from "sweetalert";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { BiEdit } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import ReactSelect from "react-select";
import { formateHN, numHelper } from "../../utils/numberHelper";
import SimpleSelect from "../../common/components/SimpleSelect";
const LabAgentReportCollection = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListSort, setInvoiceListSort] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  useEffect(() => {
    if (selectedBranch && invoiceListSort.length > 0) {
      setInvoiceList(
        invoiceListSort.filter(
          (data) => data.saas_branch_id === selectedBranch?.id
        )
      );
    } else {
      setInvoiceList(invoiceListSort);
    }
    return () => {};
  }, [selectedBranch, invoiceListSort]);

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
    axios.get(`/lab-agent-all-invoice`).then((res) => {
      if (res.data.status === 200) {
        setInvoiceList(res.data.invoice);
        setInvoiceListSort(res.data.invoice);
        setLoading(false);
      }
    });
  }, []);
  const [testInfo, setTestInfo] = useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Invoice No",
      field: `invoiceNo`,
      render: (row) =>
        row.invoiceNo === "null" ? "" : numHelper(row.invoiceNo),
    },
    {
      title: "HN",
      field: `name`,
      render: (row) => {
        return (
          <div>
            <span style={{ whiteSpace: "nowrap" }}>
              {" "}
              {row.patient === "null"
                ? ""
                : formateHN(row.patient?.patient_hn_number)}
            </span>
          </div>
        );
      },
    },
    {
      title: "Name",
      field: `patient_first_name`,
      render: (row) => (
        <div>
          <span style={{ whiteSpace: "nowrap" }}>
            {" "}
            {row.patient_first_name === "null" ? "" : row.patient_first_name}
          </span>
        </div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Test Name",
      field: "",
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
                    onClick={() => handleTestSampleCollection(item)}
                    className="me-1 fw-bold"
                    style={{
                      color: `${
                        Number(item.collectionStatus) === 1 ? "#69B128" : "red"
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
                  )}{" "}
                </>
              ))}
        </div>
      ),
    },
    { title: "Remarks", field: "reportReceiverFromLabRemark" },
    {
      title: "Status",
      field: "collection_status",
      render: (row) => {
        const result = row.tests?.reduce(
          (total, current) => total + Number(current.reportCollectionStatus),
          0
        );
        const testLength = row.tests?.length;
        return (
          <div>
            {result === testLength ? (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-success me-1"
                ></i>{" "}
                Received
              </span>
            ) : result !== testLength && result > 0 ? (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-warning me-1"
                ></i>{" "}
                Partial
              </span>
            ) : (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-danger me-1"
                ></i>
                Pending
              </span>
            )}
          </div>
        );
      },

      cellStyle: {
        textAlign: "center",
      },
    },

    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            padding: "0px 5px",
          }}
        >
          <button
            data-bs-toggle="tooltip"
            title="Receive report"
            disabled={
              Number(row.isApprovedInReceiveFromLab) === 1 ||
              row.tests?.reduce(
                (total, current) => total + Number(current.collectionStatus),
                0
              ) === 0
            }
            onClick={() => handleEditSample(row)}
            className="btn btn-sm action-btn"
          >
            <BiEdit size={18} />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Approve"
            disabled={
              Number(row.isApprovedInReceiveFromLab) === 1 ||
              row.tests?.reduce(
                (total, current) => total + Number(current.collectionStatus),
                0
              ) === 0
            }
            onClick={() => reportCollectionApprove(row)}
            className={`btn btn-sm action-btn ${
              Number(row.isApprovedInReceiveFromLab) === 1 && "text-success"
            }`}
          >
            <BsCheckCircleFill size={18} />
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const [modalIsOpenSampleEdit, setModalIsOpenSampleEdit] = useState(false);

  const customStylesSample = {
    content: {
      top: "32%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "450px",
      padding: "20px",
      zIndex: "3000",
    },
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const handleEditSample = (item) => {
    setTestInfo(item);
    setModalIsOpenSampleEdit(true);
  };
  const collectorList = [
    { label: "Mr Mohsin" },
    { label: "Mr Micle" },
    { label: "Mr Jhon" },
    { label: "Mr Doe" },
  ];
  const [testDetails, setTestDetails] = useState({});
  const [updateData, setUpdateData] = useState({
    reportReceiverFromLab: "",
    reportReceiverFromLabRemark: "",
    reportReceiverFromLabDate: new Date().toJSON().slice(0, 10),
    reportReceiverFromLabTime: moment().format("HH:mm:ss"),
    reportReceiverFromLabPhoneNo: "",
    reportCollectionStatus: 1,
  });
  const handleTestSampleCollection = (item) => {
    axios.get(`lab-agent-test-edit/${item.id}`).then((res) => {
      if (res.status === 200) {
        setTestDetails(res.data.test);
      }
    });
  };
  const receiveReport = () => {
    if (
      updateData.reportReceiverFromLab &&
      updateData.reportReceiverFromLabTime &&
      updateData.reportReceiverFromLabDate &&
      updateData.reportReceiverFromLabPhoneNo
    ) {
      testInfo?.tests
        ?.filter((test) => Number(test.collectionStatus) === 1)
        .map((test) => {
          axios
            .post(`lab-agent-report-collection-from-lab/${test.id}`, updateData)
            .then((res) => {
              if (res.status === 200) {
                swal("Success", res.data.message, "success");
              }
            });
        });

      if (testInfo.id) {
        axios
          .post(`lab-agent-update-date-invoice/${testInfo.id}`, {
            sampleCollectionDate: testInfo.sampleCollectionDate,
            remarkForSampleCollection: testInfo.remark,
            sampleReceiverToLabRemark: testInfo.sampleReceiverToLabRemark,
            reportReceiverFromLabRemark: updateData.reportReceiverFromLabRemark,
          })
          .then((res) => {
            if (res.status === 200) {
              axios.get(`/lab-agent-all-invoice`).then((res) => {
                if (res.data.status === 200) {
                  setInvoiceList(res.data.invoice);
                  setInvoiceListSort(res.data.invoice);
                  setLoading(false);
                }
              });
            }
          });
      }

      setModalIsOpenSampleEdit(false);
    } else {
      toast.error("Please select collector !");
    }
  };
  const reportCollectionApprove = (item) => {
    if (item.id) {
      axios
        .post(`lab-agent-receive-from-lab-approve/${item.id}`, {
          isApprovedInReceiveFromLab: 1,
        })
        .then((res) => {
          if (res.status === 200) {
            swal("Success", res.data.message, "success");
            axios.get(`/lab-agent-all-invoice`).then((res) => {
              if (res.data.status === 200) {
                setInvoiceList(res.data.invoice);
                setInvoiceListSort(res.data.invoice);
                setLoading(false);
              }
            });
          }
        });
    }
  };
  // search with date range
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const searchByDateRange = () => {
    axios.post("lab-agent-invoice-date-range-search", dateRange).then((res) => {
      if (res.status === 200) {
        setInvoiceList(res.data.data);
        setInvoiceListSort(res.data.data);
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
  const receiveAll = () => {
    if (
      updateData.reportReceiverFromLab &&
      updateData.reportReceiverFromLabTime &&
      updateData.reportReceiverFromLabDate &&
      updateData.reportReceiverFromLabPhoneNo
    ) {
      selectedTest.map((item) => {
        item?.tests
          ?.filter((test) => Number(test.collectionStatus) === 1)
          .map((test) => {
            axios
              .post(
                `lab-agent-report-collection-from-lab/${test.id}`,
                updateData
              )
              .then((res) => {
                if (res.status === 200) {
                  swal("Success", res.data.message, "success");
                }
              });
          });

        if (item.id) {
          axios
            .post(`lab-agent-update-date-invoice/${item.id}`, {
              sampleCollectionDate: item.sampleCollectionDate,
              remarkForSampleCollection: item.remark,
              sampleReceiverToLabRemark: item.sampleReceiverToLabRemark,
              reportReceiverFromLabRemark:
                updateData.reportReceiverFromLabRemark,
            })
            .then((res) => {
              if (res.status === 200) {
                axios.get(`/lab-agent-all-invoice`).then((res) => {
                  if (res.data.status === 200) {
                    setInvoiceList(res.data.invoice);
                    setInvoiceListSort(res.data.invoice);
                    setLoading(false);
                  }
                });
              }
            });
        }
      });
      setModalIsOpenSampleEdit(false);
      setSelectedTest([]);
    } else {
      toast.error("Please select collector !");
    }
  };

  const filterColumns = useMemo(() => {
    return columns.filter((column) => {
      if (user?.isSuperAdmin) {
        return column;
      } else {
        return column.field !== "saas_branch_name";
      }
    });
  }, [user?.isSuperAdmin, columns]);

  const handleFilterBranch = (selectedBranch) => {
    if (selectedBranch) {
      setSelectedBranch(selectedBranch);
    } else {
      setSelectedBranch(null);
    }
  };
  return (
    <div className="ms-2 all-patients lab-agent mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Lab Agent test
            </h5>
          </div>
          <div className="custom-card p-2 mt-2">
            <div className="row">
              <div className="col-3">
                <h6>Report Collection from Lab</h6>
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
                searchFieldAlignment: "left",
                overflowX: "auto",
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
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
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
                      {selectedTest.length > 0 && (
                        <Tooltip title="Receive multiple" placement="bottom">
                          <LibraryAddIcon
                            className="export-icon me-2"
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
                {" "}
                <i
                  style={{ color: "red" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Sample Not Collected Yet
              </span>
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "#FFD600" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Partial Sample Collected
              </span>
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "#69B128" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Sample Collected Done
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpenSampleEdit}
        onRequestClose={() => setModalIsOpenSampleEdit(false)}
        style={customStylesSample}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setModalIsOpenSampleEdit(false)}
        >
          <i class="fal fa-times"></i>
        </span>
        <div className="d-flex sticker-modal-lab">
          <h6 className="card-title me-3">
            Report Collection{" "}
            {!receiveMultipleReport && (
              <>
                for -{" "}
                {testInfo?.tests
                  ?.filter((test) => Number(test.collectionStatus) === 1)
                  .map((test, i) => (
                    <>
                      <span className="fw-bold" key={i}>
                        {test.testName}
                      </span>{" "}
                    </>
                  ))}{" "}
                <span style={{ color: "#69B128" }}>
                  {testInfo?.patient_first_name}
                </span>
              </>
            )}
          </h6>
        </div>
        <hr />

        <div className="card-body">
          <div className="px-3">
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}> Received By </label>
              </div>
              <div className="col-6">
                <Select
                  options={collectorList}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      reportReceiverFromLab: e.label,
                    })
                  }
                  getOptionLabel={(collector) => `${collector.label}`}
                  getOptionValue={(collector) => `${collector.label}`}
                  menuPortalTarget={document.body} // Use this to prevent z-index issues
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      maxHeight: "200px", // Set a maximum height for the dropdown menu
                      overflowY: "auto", // Enable vertical scrolling
                      "::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        background: "gray",
                        borderRadius: "10px",
                      },
                    }),
                  }}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}>Phone Number</label>
              </div>
              <div className="col-6">
                <input
                  onBlur={(e) =>
                    setUpdateData({
                      ...updateData,
                      reportReceiverFromLabPhoneNo: e.target.value,
                    })
                  }
                  type="text"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}>
                  Date <span>*</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  value={updateData.reportReceiverFromLabDate}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      reportReceiverFromLabDate: e.target.value,
                    })
                  }
                  type="date"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}>
                  Time <span>*</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  value={updateData.reportReceiverFromLabTime}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      reportReceiverFromLabTime: e.target.value,
                    })
                  }
                  type="time"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}> Remarks</label>
              </div>
              <div className="col-6">
                <textarea
                  onBlur={(e) =>
                    setUpdateData({
                      ...updateData,
                      reportReceiverFromLabRemark: e.target.value,
                    })
                  }
                  className="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="d-flex mt-2 justify-content-end">
              {receiveMultipleReport ? (
                <button onClick={receiveAll} className="vaital-setup-btn me-2">
                  Save
                </button>
              ) : (
                <button
                  onClick={receiveReport}
                  className="vaital-setup-btn me-2"
                >
                  Save
                </button>
              )}

              <button
                onClick={() => setModalIsOpenSampleEdit(false)}
                className="vaital-setup-btn-cancel me-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LabAgentReportCollection;
