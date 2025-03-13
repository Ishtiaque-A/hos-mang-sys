import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from "react-modal";
import moment from "moment";
import Swal from "sweetalert2";
import { FaDollarSign, FaSms } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Barcode from "react-barcode/lib/react-barcode";
import { Grid, TextField, Tooltip } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import Select from "react-select";
import { toast } from "react-toastify";
import swal from "sweetalert";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { BiEdit } from "react-icons/bi";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import ReactSelect from "react-select";
import { formateHN, numHelper } from "../../utils/numberHelper";
import SimpleSelect from "../../common/components/SimpleSelect";
const LabAgentReportDeliveryToPatient = () => {
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
            {row.patient === "null"
              ? ""
              : formateHN(row.patient?.patient_hn_number)}
          </span>{" "}
          <br />
          <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
            {row.patient === "null" ? "" : row?.patient?.fullName}
          </p>
        </div>
      ),
    },
    {
      title: "Branch",
      field: `saas_branch_name`,
    },
    {
      title: "Bill Date",
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {moment(row.created_at.slice(0, 10)).format("DD/MM/YYYY") ===
            "Invalid date"
              ? ""
              : moment(row.created_at.slice(0, 10)).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
    },
    {
      title: "Collection Date",
      render: (row) => (
        <div style={{ padding: "0px 5px" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            {moment(row.sampleCollectionDate).format("DD/MM/YYYY") ===
            "Invalid date"
              ? ""
              : moment(row.sampleCollectionDate).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
      headerStyle: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
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
    {
      title: " Total Bill",
      field: "totalBill",
      headerStyle: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
    },
    { title: " Received", field: "paidAmount" },
    {
      title: " Due",
      field: "due",
      cellStyle: {
        width: 50,
        // marginLeft:50
      },
    },

    {
      title: "Report Readiness",
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
                Ready
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
                Not Collected
              </span>
            )}
          </div>
        );
      },
      cellStyle: {
        textAlign: "center",
      },
      headerStyle: {
        textAlign: "center",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Status",
      field: "",
      render: (row) => {
        const result = row.tests?.reduce(
          (total, current) => total + Number(current.deliveryStatus),
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
                Delivered
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
                Not Collected
              </span>
            )}
          </div>
        );
      },
      cellStyle: {
        textAlign: "center",
        width: 350,
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
          {/* <button onClick={() => handleEditSample(row)} className="btn btn-sm action-btn"> <i className="far fa-edit"></i></button>&nbsp; */}
          <Link
            to={`/report-delivery/${row.id}`}
            className="btn action-btn  btn-sm"
            data-bs-toggle="tooltip"
            title="Report Delivery"
          >
            <BiEdit size={18} />
          </Link>
          <Link
            to={`/lab-agent-payment-receive/${row.id}`}
            className="btn action-btn  btn-sm"
            data-bs-toggle="tooltip"
            title="Make Payment"
          >
            <FaDollarSign size={18} />
          </Link>
          <button
            onClick={() => sendSms(row)}
            className={`btn btn-sm action-btn`}
            data-bs-toggle="tooltip"
            title="Send Sms"
          >
            <FaSms size={18} />
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
        width: 400,
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
      width: "450px",
      height: "310px",
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
    reportReceiverFromLabDateTime: "",
    reportReceiverFromLabPhoneNo: "",
    reportCollectionStatus: 1,
  });
  const handleTestSampleCollection = (item) => {
    console.log(item);
    axios.get(`lab-agent-test-edit/${item.id}`).then((res) => {
      if (res.status === 200) {
        setTestDetails(res.data.test);
      }
    });
  };
  const receiveReport = () => {
    if (
      updateData.reportReceiverFromLab &&
      updateData.reportReceiverFromLabDateTime &&
      updateData.reportReceiverFromLabPhoneNo
    ) {
      testInfo?.tests
        ?.filter((test) => Number(test.collectionStatus) === 1)
        .map((test) => {
          axios
            .post(`lab-agent-report-collection-from-lab/${test.id}`, updateData)
            .then((res) => {
              if (res.status === 200) {
                console.log(res);
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

  // search with date range
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const searchByDateRange = () => {
    axios.post("lab-agent-invoice-date-range-search", dateRange).then((res) => {
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
  // multiple select and sms send
  const [selectedTest, setSelectedTest] = useState([]);
  const sendMultipleSms = (item) => {
    const sms = `Dear Sir/Mam,
         Your report has been ready to deliver .
         For any queries, please call 09638 505 505.
         Thanks.`;
    if (selectedTest.length > 0) {
      selectedTest.map((test) => {
        axios
          .post(
            `https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver=${item.patient_mobile_phone}&message=${sms}`
          )
          .then((res) => {
            console.log("Sms Sent");
          });
      });
      swal("Success", "Sms send successfully", "success");
      setSelectedTest([]);
    } else {
      toast.error("Please select test to send sms");
    }
  };
  const sendSms = (item) => {
    const sms = `Dear Sir/Mam,
         Your report has been ready to deliver .
         For any queries, please call 09638 505 505.
         Thanks.`;
    axios
      .post(
        `https://api.boom-cast.com/boomcast/WebFramework/boomCastWebService/externalApiSendTextMessage.php?masking=NOMASK&userName=fauziaali2000@gmail.com&password=80f50e35f83130f022e78a2862aab390&MsgType=TEXT&receiver=${item.patient_mobile_phone}&message=${sms}`
      )
      .then((res) => {
        console.log(res.data[0].success);
        if (res.status === 200) {
          swal("Success", "Sms send successfully", "success");
        } else {
          toast.error("Failed to send sms");
        }
      });
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
    <div className="ms-2 all-patients mt-2">
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
                <h6>Report Delivery to Patient</h6>
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
                        <option value="sent">Delivered</option>
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
                // filtering: filter,
                overflowX: "auto",
                showTitle: false,
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
                  <div className="d-flex justify-content-between algin-items-center">
                    <MTableToolbar
                      style={{ width: 80, fontSize: 14 }}
                      {...props}
                    />
                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "center",
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
                      {selectedTest.length > 0 ? (
                        <Tooltip title="Send sms" placement="bottom">
                          <TextsmsIcon
                            className="export-icon me-2"
                            onClick={sendMultipleSms}
                          />
                        </Tooltip>
                      ) : null}
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
                <label style={{ fontWeight: "500" }}>Date & Time</label>
              </div>
              <div className="col-6">
                <input
                  onBlur={(e) =>
                    setUpdateData({
                      ...updateData,
                      reportReceiverFromLabDateTime: e.target.value,
                    })
                  }
                  type="datetime-local"
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
              <button onClick={receiveReport} className="vaital-setup-btn me-2">
                Save
              </button>
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

export default LabAgentReportDeliveryToPatient;
