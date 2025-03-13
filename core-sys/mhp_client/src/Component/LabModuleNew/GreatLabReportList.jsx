import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from "react-modal";
import moment from "moment";
import { FaDollarSign, FaSms } from "react-icons/fa";
import { Grid, Tooltip } from "@material-ui/core";
import Select from "react-select";
import { toast } from "react-toastify";
import swal from "sweetalert";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { BiEdit } from "react-icons/bi";
import useSendSMSAPI from "../../hooks/useSendSMSAPI";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import SimpleSelect from "../../common/components/SimpleSelect";
import { formateHN, numHelper } from "../../utils/numberHelper";
import { formatPhoneNumber } from "react-phone-number-input";
const GreatLabReportList = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [invoiceListSort, setInvoiceListSort] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportSMSTemplate, setReportSMSTemplate] = useState("");
  const { sendSMSAPI, status } = useSendSMSAPI();
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

  console.log(status);

  useEffect(() => {
    axios.get("lab-report-sms").then((res) => {
      setReportSMSTemplate(res?.data?.sms?.sms_value);
    });
    axios.get(`/great-lab-all-invoice-without-page`).then((res) => {
      if (res.data.status === 200) {
        setInvoiceList(
          res.data.invoice.filter(
            (invoice) =>
              invoice.tests.reduce(
                (total, current) =>
                  total + Number(current.report_confiremd_status),
                0
              ) > 0
          )
        );
        setInvoiceListSort(
          res.data.invoice.filter(
            (invoice) =>
              invoice.tests.reduce(
                (total, current) =>
                  total + Number(current.report_confiremd_status),
                0
              ) > 0
          )
        );
        setLoading(false);
      }
    });
  }, []);
  const [testInfo, setTestInfo] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Invoice",
      field: `invoiceNo`,
      render: (row) => numHelper(row.invoiceNo),
      cellStyle: {
        width: "2%",
      },
    },
    {
      title: "Patient",
      render: (row) => (
        <div>
          <span style={{ whiteSpace: "nowrap" }}>
            {row.patient === "null"
              ? ""
              : formateHN(row.patient?.patient_hn_number)}
          </span>{" "}
          <br />
          <span style={{ whiteSpace: "nowrap" }}>
            {console.log(row)}
            {row.patient === "null" ? "" : row?.patient?.fullName}
          </span>
        </div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Bill Date",
      headerStyle: {
        whiteSpace: "nowrap",
      },
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
      headerStyle: {
        whiteSpace: "nowrap",
      },
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
                  )}{" "}
                </>
              ))}
        </div>
      ),
      cellStyle: {
        width: 300,
      },
    },
    { title: " Total", field: "totalBill" },
    { title: " Received", field: "paidAmount" },
    {
      title: " Due",
      field: "due",
      cellStyle: {
        width: 50,
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
          <div style={{ padding: "0px 5px" }}>
            {result === testLength ? (
              <span style={{ whiteSpace: "nowrap" }}>
                <i
                  style={{ fontSize: "10px" }}
                  className="fa-solid fa-circle text-success me-1"
                ></i>{" "}
                Delivered
              </span>
            ) : result !== testLength && result > 0 ? (
              <span>
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
          <Link
            to={`/great-lab-report-delivery/${row.id}`}
            className="btn action-btn  btn-sm"
            data-bs-toggle="tooltip"
            title="Report Delivery"
          >
            <BiEdit size={18} />
          </Link>
          <Link
            to={`/great-lab-payment-receive/${row.id}`}
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
    axios.get(`great-lab-test-edit/${item.id}`).then((res) => {
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
            .post(`great-lab-report-collection-from-lab/${test.id}`, updateData)
            .then((res) => {
              if (res.status === 200) {
                swal("Success", res.data.message, "success");
              }
            });
        });

      if (testInfo.id) {
        axios
          .post(`great-lab-update-date-invoice/${testInfo.id}`, {
            sampleCollectionDate: testInfo.sampleCollectionDate,
            remarkForSampleCollection: testInfo.remark,
            sampleReceiverToLabRemark: testInfo.sampleReceiverToLabRemark,
            reportReceiverFromLabRemark: updateData.reportReceiverFromLabRemark,
          })
          .then((res) => {
            if (res.status === 200) {
              axios.get(`/great-lab-all-invoice-without-page`).then((res) => {
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
            (total, current) => total + Number(current.deliveryStatus),
            0
          ) > 0
      );
      setInvoiceList(filteredBySent);
    } else if (value === "pending") {
      const filteredByPending = invoiceListSort.filter(
        (invoice) =>
          invoice.tests.reduce(
            (total, current) => total + Number(current.deliveryStatus),
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

  const sendSingleSms = (test) => {
    const sms = `${reportSMSTemplate} (Invoice Number : ${test.invoiceNo})`;
    return sendSMSAPI(test?.patient?.patient_mobile_phone, sms);
  };
  const sendMultipleSms = (item) => {
    if (selectedTest.length > 0) {
      const smsPromises = selectedTest.map((test) => sendSingleSms(test));

      Promise.all(smsPromises)
        .then((results) => {
          // Check if all promises were successful (status === 200)
          const allSuccessful = results.every((res) => res.status === 200);
          if (allSuccessful) {
            swal("Success", "Sms send successfully", "success");
            setSelectedTest([]);
          } else {
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } else {
      toast.error("Please select test to send sms");
    }
  };

  const sendSms = async (item) => {
    const sms = ` ${reportSMSTemplate} (Invoice Number : ${item.invoiceNo})`;
    await sendSMSAPI(item?.patient?.patient_mobile_phone, sms);
  };
  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((item) => item.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);
  return (
    <div className="ms-2 all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Report List
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
                  <div className="d-flex justify-content-between align-items-center">
                    <MTableToolbar
                      style={{ width: 80, fontSize: 14 }}
                      {...props}
                    />
                    <Grid
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
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
                        <Tooltip title="Send sms" placement="bottom">
                          <TextsmsIcon
                            className="float-end export-icon pe-auto me-3 mt-1"
                            onClick={sendMultipleSms}
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
                Not Ready
              </span>
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "#FFD600" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Partially Ready
              </span>
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "#69B128" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Report ready
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

export default GreatLabReportList;
