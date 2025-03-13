import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from "react-modal";
import moment from "moment";
import { Grid, TextField, Tooltip } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "react-select";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { DateRange } from "@material-ui/icons";
import PrintIcon from "@mui/icons-material/Print";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ScreenShareOutlinedIcon from "@mui/icons-material/ScreenShareOutlined";
import { BiEdit } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import ReactSelect from "react-select";
import { formateHN, numHelper } from "../../utils/numberHelper";
import SimpleSelect from "../../common/components/SimpleSelect";
const LabAgentReportSendToLab = () => {
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
      render: (row) => numHelper(row.invoiceNo),
      headerStyle: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "HN",
      field: `name`,
      render: (row) => (
        <div>
          <span style={{ whiteSpace: "nowrap" }}>
            {" "}
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
          {" "}
          <span style={{ whiteSpace: "nowrap" }}>
            {row?.patient_first_name === "null" ? "" : row?.patient_first_name}
          </span>
        </div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Collection Date",
      field: "collectionDate",
      type: "numeric",
      render: (row) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {row?.sampleCollectionDate === "null"
            ? ""
            : row?.sampleCollectionDate}
        </span>
      ),
      headerStyle: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
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
      headerStyle: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
    },
    { title: "Remarks", field: "remarkForSampleCollection" },
    {
      title: "Status",
      field: "collection_status",
      render: (row) => {
        const result = row.tests?.reduce(
          (total, current) => total + Number(current.sentToLabStatus),
          0
        );
        return (
          <div>
            {result > 0 ? (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-success me-1"
                ></i>{" "}
                Sent to Lab
              </span>
            ) : (
              <span>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-warning me-1"
                ></i>{" "}
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
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <button
            data-bs-toggle="tooltip"
            title="Send to lab"
            disabled={
              Number(row.isApprovedInSendToLab) === 1 ||
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
              Number(row.isApprovedInSendToLab) === 1 ||
              row.tests?.reduce(
                (total, current) => total + Number(current.collectionStatus),
                0
              ) === 0
            }
            onClick={() => sendSampleApprove(row)}
            className={`btn btn-sm action-btn ${
              Number(row.isApprovedInSendToLab) === 1 && "text-success"
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
  const [modalIsOpenSamplePrint, setModalIsOpenSamplePrint] = useState(false);

  const customStylesSample = {
    content: {
      top: "32%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "500px",
      padding: "20px",
      zIndex: "3000",
    },
  };
  const customStylesSamplePrint = {
    content: {
      top: "32%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "450px",
      height: "250px",
      padding: "20px",
      zIndex: "3000",
    },
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  const [carrier, setCarrier] = useState("");
  const [multipleSampleSend, setMultipleSampleSend] = useState(false);

  const handleEditSample = (item) => {
    setTestInfo(item);
    setModalIsOpenSampleEdit(true);
    setMultipleSampleSend(false);
  };
  const collectorList = [
    { label: "Mr Mohsin" },
    { label: "Mr Micle" },
    { label: "Mr Jhon" },
    { label: "Mr Doe" },
  ];
  const [testDetails, setTestDetails] = useState({});
  const [updateData, setUpdateData] = useState({
    sampleReceiverToLab: "",
    sampleReceiverToLabRemark: "",
    sampleReceiverToLabDate: new Date().toJSON().slice(0, 10),
    sampleReceiverToLabTime: moment().format("HH:mm:ss"),
    sampleReceiverToLabPhoneNo: "",
    sentToLabStatus: 1,
    sampleCarrierToLab: carrier,
  });
  const handleTestSampleCollection = (item) => {
    axios.get(`lab-agent-test-edit/${item.id}`).then((res) => {
      if (res.status === 200) {
        setTestDetails(res.data.test);
      }
    });
  };
  const sendSample = () => {
    if (
      updateData.sampleReceiverToLab &&
      updateData.sampleReceiverToLabTime &&
      updateData.sampleReceiverToLabDate &&
      updateData.sampleReceiverToLabPhoneNo &&
      updateData.sampleCarrierToLab
    ) {
      testInfo?.tests
        ?.filter((test) => Number(test.collectionStatus) === 1)
        .map((test) => {
          axios
            .post(`lab-agent-send-sample-lab/${test.id}`, updateData)
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
                setModalIsOpenSampleEdit(false);
              }
            });
        });
      if (testInfo.id) {
        axios
          .post(`lab-agent-update-date-invoice/${testInfo.id}`, {
            sampleCollectionDate: testInfo.sampleCollectionDate,
            remarkForSampleCollection: testInfo.remark,
            sampleReceiverToLabRemark: updateData.sampleReceiverToLabRemark,
            reportReceiverFromLabRemark: testInfo.reportReceiverFromLabRemark,
          })
          .then((res) => {});
      }
    } else {
      toast.error("Please fill all the required field !");
    }
  };
  const sendSampleAll = () => {
    if (
      updateData.sampleReceiverToLab &&
      updateData.sampleReceiverToLabTime &&
      updateData.sampleReceiverToLabDate &&
      updateData.sampleReceiverToLabPhoneNo
    ) {
      selectedTest.map((item) => {
        item?.tests
          ?.filter((test) => Number(test.collectionStatus) === 1)
          .map((test) => {
            axios
              .post(`lab-agent-send-sample-lab/${test.id}`, updateData)
              .then((res) => {
                if (res.status === 200) {
                  console.log(res);
                  swal("Success", res.data.message, "success");
                  axios.get(`/lab-agent-all-invoice`).then((res) => {
                    if (res.data.status === 200) {
                      setInvoiceList(res.data.invoice);
                      setInvoiceListSort(res.data.invoice);
                      setLoading(false);
                    }
                  });
                  setModalIsOpenSampleEdit(false);
                }
              });
          });
        if (item.id) {
          axios
            .post(`lab-agent-update-date-invoice/${item.id}`, {
              sampleCollectionDate: item.sampleCollectionDate,
              remarkForSampleCollection: item.remark,
              sampleReceiverToLabRemark: updateData.sampleReceiverToLabRemark,
              reportReceiverFromLabRemark: item.reportReceiverFromLabRemark,
            })
            .then((res) => {
              // console.log(res)
            });
        }
      });
    } else {
      toast.error("Please fill all the required field !");
    }
  };
  const sendSampleApprove = (item) => {
    if (item.id) {
      axios
        .post(`lab-agent-send-to-lab-approve/${item.id}`, {
          isApprovedInSendToLab: 1,
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
    if (dateRange.startDate && dateRange.endDate) {
      axios
        .post("lab-agent-invoice-date-range-search", dateRange)
        .then((res) => {
          if (res.status === 200) {
            setInvoiceList(res.data.data);
            setInvoiceListSort(res.data.data);
          }
        });
    } else {
      toast.error("Please enter start and end date!");
    }
  };
  const filterByStatus = (e) => {
    const { value } = e.target;
    if (value === "sent") {
      const filteredBySent = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.sentToLabStatus),
            0
          ) > 0
      );
      setInvoiceList(filteredBySent);
    } else if (value === "pending") {
      const filteredByPending = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.sentToLabStatus),
            0
          ) === 0
      );
      setInvoiceList(filteredByPending);
    } else if (value === "all") {
      setInvoiceList(invoiceListSort);
    }
  };
  // print test List
  const [selectedTest, setSelectedTest] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const printTestList = () => {
    if (selectedTest.length > 0) {
      setModalIsOpenSamplePrint(true);
    } else {
      toast.error("Please select test for print!");
    }
  };

  const sendToLabMultiple = () => {
    if (selectedTest.length > 0) {
      setMultipleSampleSend(true);
      setModalIsOpenSampleEdit(true);
    } else {
      toast.error("Please select test for send !");
    }
  };

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((column) => column.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);

  const handleFilterBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  return (
    <div className="ms-2 lab-agent all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Lab Agent
            </h5>
          </div>
          <div className="custom-card p-2 mt-2">
            <div className="row">
              <div className="col-3">
                <h6>Sample Delivery to Lab</h6>
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
                        justifyContent: "flex-end",
                        alignItems: "center",
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
                      {selectedTest.length > 0 ? (
                        <>
                          <Tooltip title="Print test list" placement="bottom">
                            <PrintIcon
                              className="float-end export-icon pe-auto me-3 mt-1"
                              onClick={printTestList}
                            />
                          </Tooltip>
                          <Tooltip title="Send to lab" placement="bottom">
                            <ScreenShareOutlinedIcon
                              className="float-end export-icon pe-auto me-3 mt-1"
                              onClick={sendToLabMultiple}
                            />
                          </Tooltip>
                        </>
                      ) : null}
                    </Grid>
                  </div>
                ),
              }}
              onSelectionChange={(rows) => setSelectedTest(rows)}
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
            Sample Collection for -{" "}
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
          </h6>
        </div>
        <hr />

        <div className="card-body">
          <div className="px-3">
            <div className="row mb-2">
              <div className="col-6">
                <label style={{ fontWeight: "500" }}>
                  {" "}
                  Received By <span>*</span>{" "}
                </label>
              </div>
              <div className="col-6">
                <Select
                  options={collectorList}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      sampleReceiverToLab: e.label,
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
                <label style={{ fontWeight: "500" }}>
                  {" "}
                  Carried By <span>*</span>{" "}
                </label>
              </div>
              <div className="col-6">
                <Select
                  options={collectorList}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      sampleCarrierToLab: e.label,
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
                <label style={{ fontWeight: "500" }}>
                  Phone Number <span>*</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  onBlur={(e) =>
                    setUpdateData({
                      ...updateData,
                      sampleReceiverToLabPhoneNo: e.target.value,
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
                  Collection Date <span>*</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  value={updateData.sampleReceiverToLabDate}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      sampleReceiverToLabDate: e.target.value,
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
                  Collection Time <span>*</span>
                </label>
              </div>
              <div className="col-6">
                <input
                  value={updateData.sampleReceiverToLabTime}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      sampleReceiverToLabTime: e.target.value,
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
                      sampleReceiverToLabRemark: e.target.value,
                    })
                  }
                  className="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="d-flex mt-2 justify-content-end">
              {multipleSampleSend ? (
                <button
                  onClick={sendSampleAll}
                  className="vaital-setup-btn me-2"
                >
                  Save
                </button>
              ) : (
                <button onClick={sendSample} className="vaital-setup-btn me-2">
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
      <Modal
        isOpen={modalIsOpenSamplePrint}
        onRequestClose={() => setModalIsOpenSamplePrint(false)}
        style={customStylesSamplePrint}
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
          <h6 className="card-title me-3">Please select a carrier</h6>
        </div>
        <hr />
        <div className="card-body">
          <Select
            options={collectorList}
            onChange={(e) => setCarrier(e.label)}
            getOptionLabel={(collector) => `${collector.label}`}
            getOptionValue={(collector) => `${collector.label}`}
          />
          <div className="d-flex mt-2 justify-content-end mt-5">
            <button onClick={handlePrint} className="vaital-setup-btn me-2">
              Print
            </button>
            <button
              onClick={() => setModalIsOpenSamplePrint(false)}
              className="vaital-setup-btn-cancel me-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {selectedTest.length > 0 && (
        <div ref={componentRef}>
          <div className="print-send-test-to-lab">
            <div className="invoice-pharmacy-details d-flex justify-content-center">
              <div className="text-center">
                <h5>Al Shifa Pharmacy</h5>
                <p>Location : Lalbagh</p>
                <p>Tel : 0171238765</p>
                <p>Vat Reg No :534565 </p>
              </div>
            </div>
            <h6 className="my-3 text-center">Test List</h6>
            <div className="d-flex justify-content-between mx-3">
              <p>To : IBN Sina Hospital</p>
              <p>
                Date :{" "}
                {moment(new Date().toJSON().slice(0, 10)).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="mx-3">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>HN</td>
                    <td>Name</td>
                    <td>Dob</td>
                    <td>Mobile Number</td>
                    <td>Test</td>
                    <td>Collection Date</td>
                    {/* <td>Collection Time</td> */}
                  </tr>
                  {selectedTest
                    .filter((tst) => tst.sampleCollectionDate)
                    .map((test, i) => (
                      <tr key={i}>
                        <td>{test.patient?.patient_hn_number}</td>
                        <td>{test.patient?.patient_first_name}</td>
                        <td>
                          {moment(test.patient?.patient_dob).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td>{test.patient?.patient_mobile_phone}</td>
                        <td>
                          {test.tests
                            ?.filter((ts) => ts.collectionStatus > 0)
                            .map((item, i) => (
                              <span>{item.testName} , </span>
                            ))}
                        </td>
                        <td>
                          {moment(test.sampleCollectionDate).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        {/* <td>Collection Time</td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mx-3">
              <p>
                <span className="d-inline-block" style={{ width: "130px" }}>
                  Carrier{" "}
                </span>
                : {carrier}
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "130px" }}>
                  Date & Time{" "}
                </span>
                :{" "}
                <span className="me-2">
                  {moment(new Date().toJSON().slice(0, 10)).format(
                    "DD-MM-YYYY"
                  )}
                </span>{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>
            <div className="row mt-5 mx-5">
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Prepared By</span>
              </div>
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Checked By</span>
              </div>
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Approved By</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabAgentReportSendToLab;
