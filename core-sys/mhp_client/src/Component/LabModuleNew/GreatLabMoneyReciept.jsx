import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { AiFillPrinter } from "react-icons/ai";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import SimpleSelect from "../../common/components/SimpleSelect";
import CountUp from "react-countup";
import { VscPreview } from "react-icons/vsc";
import Input from "../../common/components/Input";
import moment from "moment";
import Pagination from "../../common/components/Pagination";
import { QueryContext } from "../../context/Query-conext";
import { BiEdit } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import { getAge } from "../../utils/getAge";
import bill from "../../Images/labBill.png";
import due from "../../Images/labDue.png";
import dueC from "../../Images/duec.png";
import received from "../../Images/labReceived.png";
import taka from "../../Images/taka.png";
import GreatLabDueCollection from "./components/GreatLabDueCollection";
import GreatLabInvoiceRefund from "./components/GreatLabInvoiceRefund";
import PrintGreatLabInvoice from "./components/PrintGreatLabInvoice";
import GreatLabInvoiceDetails from "./components/GreatLabInvoiceDetails";
export const debounce = (func, delay = 400) => {
  let debounceTimer;
  // Ensure the delay is at least 300ms
  const adjustedDelay = Math.max(300, delay);

  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), adjustedDelay);
  };
};

const GreatLabMoneyReciept = () => {
  const [loading, setLoading] = useState(true);
  const [totalInvoice, setTotalInvoice] = useState([]);
  const [totalInvoiceSort, setTotalInvoiceSort] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [previewModal, setPreviewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [refundModal, setrefundModal] = useState(false);
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [center, setCenter] = useState({});
  const [dueCollection, setDueCollection] = useState(0);
  // Start Pagination logic
  const [totalCount, setTotalCount] = useState(0);
  const { query, setQuery, resetQuery, refreshQuery } =
    useContext(QueryContext);

  const page = useMemo(() => {
    return query.get("page") || 1;
  }, [query]);

  const limit = useMemo(() => {
    return query.get("limit") || 10;
  }, [query]);
  const search = useMemo(() => {
    return query.get("search") || "";
  }, [query]);

  const handleChangePage = (newPage) => {
    setQuery({ page: newPage, limit });
  };

  const handleChangeRowsPerPage = (newLimit) => {
    setQuery({ limit: newLimit, page: 1 }); // Reset to page 1 when page size changes
  };

  const handleSearch = (e) => {
    setQuery({ search: e.target.value });
  };

  const pageOptions = [10, 20, 50, 100];
  // End Pagination logic
  const [updateData, setUpdateData] = useState("");
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
    if (selectedBranch) {
      const filterData = totalInvoice.filter((item) => {
        return item.saas_branch_id === selectedBranch?.value;
      });
      setTotalInvoiceSort(filterData);
    } else {
      setTotalInvoiceSort(totalInvoice);
    }
    return () => { };
  }, [selectedBranch, totalInvoice]);

  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };

  useEffect(() => {
    axios
      .get(`/great-lab-all-invoice`, { params: { page, limit, search } })
      .then((res) => {
        if (res?.status === 200) {
          setTotalInvoice(res?.data?.data);
          setTotalInvoiceSort(res?.data?.data);
          setTotalCount(res?.data?.total);
          setLoading(false);
        }
      });
    return () => { };
  }, [page, limit, search, updateData]);

  useEffect(() => {
    axios
      .get("/great-lab-transactions")
      .then((res) => {
        setTransaction(res?.data);
        setDueCollection(res?.data?.due_collection);
      })
      .catch((err) => {
        console.log("err", err);
      });
    axios.get(`/lab-center-details`).then(async (res) => {
      setCenter(res?.data?.center);
    });
    return () => { };
  }, [updateData]);

  const handleInvoicePreview = (data) => {
    setSelectedInvoice(data);
    setPreviewModal(true);
  };
  const handleInvoiceEdit = (data) => {
    setSelectedInvoice(data);
    setEditModal(true);
  };
  const handleInvoiceDue = (data) => {
    setSelectedInvoice(data);
    setrefundModal(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Invoice",
      field: `invoiceNo`,

      cellStyle: {
        width: "2%",
      },
    },
    {
      title: "Date",
      field: `invoiceNo`,
      render: (row) => {
        return moment(row?.created_at)?.format("DD/MM/YYYY");
      },

      cellStyle: {
        width: "2%",
      },
    },
    {
      title: "Name",
      field: `patient_first_name`,
    },
    {
      title: "Branch",
      field: `saas_branch_name`,
    },
    {
      title: "Total Amount",
      field: `totalBill`,
      render: (row) => {
        return parseFloat(row.totalBill).toFixed(2);
      },
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Paid Amount",
      field: `paidAmount`,
      render: (row) => {
        return parseFloat(row.paidAmount).toFixed(2);
      },
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Refund Amount",
      field: `paidAmount`,
      render: (row) => {
        return parseFloat(row.refundAmount).toFixed(2);
      },
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Due",
      field: `due`,
      render: (row) => {
        return parseFloat(row.due).toFixed(2);
      },
    },
    {
      title: "Discount",
      field: `discount`,
      render: (row) => {
        const totalDiscount =
          parseFloat(row?.specialDiscount || 0) +
          parseFloat(row?.discount || 0);
        return `${parseFloat(totalDiscount).toFixed(2)}`;
      },
    },
    {
      title: "Payment Method",
      field: "paymentMethod",
      headerStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div className="d-flex align-items-center  gap-2  justify-content-center">
          <button
            data-bs-toggle="tooltip"
            title="Print Invoice"
            onClick={() => handleInvoice(row)}
            className={`new-action-btn `}
          >
            <AiFillPrinter />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Payment History"
            onClick={() => handleInvoicePreview(row)}
            className={`new-action-btn `}
          >
            <VscPreview />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Edit Invoice"
            onClick={() => handleInvoiceEdit(row)}
            className={`new-action-btn `}
          >
            <BiEdit size={18} />
          </button>
          <button
            data-bs-toggle="tooltip"
            title="Due Collection"
            onClick={() => handleInvoiceDue(row)}
            className={`new-action-btn `}
            disabled={parseFloat(row.due) < 1}
          >
            <FaDollarSign size={18} />
          </button>
          &nbsp;
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  // search with date range
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const searchByDateRange = () => {
    if (dateRange?.startDate && dateRange.endDate) {
      axios
        .post("great-lab-invoice-date-range-search", dateRange)
        .then((res) => {
          if (res.status === 200) {
            setTotalInvoice(res.data?.invoice);
            setTotalInvoiceSort(res.data.invoice);
            setTransaction(res.data.totals);
            setTotalCount(res.data.count || 0);
            setDueCollection(res?.data?.dueCollection);
          }
        });
    } else {
      toast.error("Please enter start and end date!");
    }
  };
  // print test List
  const [selectedTest, setSelectedTest] = useState([]);
  // const testRef = useRef();

  const [moneyReceiptData, setMoneyReceiptData] = useState({});
  const invoiceRef = useRef();
  const handleInvoicePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const handleInvoice = (item) => {
    setMoneyReceiptData(item);
    console.log("item", item);
    setTimeout(() => handleInvoicePrint(), 1000);
  };
  // const totalBill = moneyReceiptData?.tests?.reduce(
  //   (total, current) => total + Number(current.fee),
  //   0
  // );
  // const discountTotal = moneyReceiptData?.tests?.reduce(
  //   (total, current) => total + Number(current.discount),
  //   0
  // );
  const handleDue = () => {
    const filtered = totalInvoice.filter((item) => Number(item.due) > 0);
    setTotalInvoiceSort(filtered);
  };
  const handlePaid = () => {
    const filtered = totalInvoice.filter((item) => Number(item.paidAmount) > 0);
    setTotalInvoiceSort(filtered);
  };

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((item) => item.field !== "saas_branch_name");
    }
  }, [columns, user?.isSuperAdmin]);

  const handleCloseModal = () => {
    setPreviewModal(false);
    setSelectedInvoice(null);
  };
  const handleCloseEditModal = () => {
    setEditModal(false);
    setSelectedInvoice(null);
  };
  const handleCloserefundModal = () => {
    setrefundModal(false);
    setSelectedInvoice(null);
  };

  const formatNumber = (num) => {
    return typeof num === "number" && !isNaN(num)
      ? new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num)
      : "0.00";
  };
  const age = getAge(moneyReceiptData?.patient?.patient_dob);

  console.log("moneyReceiptData 1", moneyReceiptData);
  return (
    <div className="ms-2 lab-agent all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card d-flex justify-content-between align-items-center">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Smart Lab
            </h5>
            {user?.isSuperAdmin && (
              <SimpleSelect
                options={orgBranch}
                value={selectedBranch}
                placeholder="Select Branch"
                onChange={handleChangeBranch}
              />
            )}
          </div>
          <div className="custom-card p-2 mt-2">
            <div className="row">
              <div className="col-3 d-flex align-items-center">
                <h6 className="my-0">Invoice List</h6>
              </div>
              <div
                className="col-9 d-flex justify-content-end align-items-center"
                style={{ gap: "15px" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <label className="fw-bold my-0"> Date</label>
                  <input
                    onChange={(e) =>
                      setDateRange({ ...dateRange, startDate: e.target.value })
                    }
                    type="date"
                    className="form-control form-control-sm"
                  />
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "10px" }}
                >
                  <label className="fw-bold my-0"> To</label>
                  <input
                    onChange={(e) =>
                      setDateRange({ ...dateRange, endDate: e.target.value })
                    }
                    type="date"
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="rx-one-button-group">
                  <button onClick={searchByDateRange} className="btn">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx- my-2">
            <div className="row">
              <div onClick={handlePaid} className="col-2">
                <div className="transaction-card tran__card_1 p-4">
                  <div className="d-flex">
                    <img src={bill} alt="" className="me-2" />
                    <h6>Total Invoice : {totalCount}</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    <img src={taka} alt="" className="me-2" />
                    <CountUp
                      start={0}
                      decimals={2}
                      end={
                        parseFloat(transaction?.total_invoice).toFixed(2) || 0
                      }
                      duration={2}
                    />
                  </p>
                </div>
              </div>
              <div onClick={handlePaid} className="col-2">
                <div className=" transaction-card tran__card_2 p-4">
                  <div className="d-flex">
                    <img src={received} alt="" className="me-2" />
                    <h6>Total Received</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    {/* <span style={{ fontSize: "22px" }} className="me-2">
                      &#2547;
                    </span> */}
                    <img src={taka} alt="" className="me-2" />
                    <CountUp
                      start={0}
                      decimals={2}
                      end={
                        parseFloat(transaction?.total_received).toFixed(2) || 0
                      }
                      duration={2}
                    />
                  </p>
                </div>
              </div>
              <div className="col-2">
                <div className="transaction-card tran__card_3 p-4">
                  <div className="d-flex">
                    <img src={due} alt="" className="me-2" />
                    <h6>Total Refaund</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    <img src={taka} alt="" className="me-2" />
                    <CountUp
                      start={0}
                      decimals={2}
                      end={parseFloat(transaction?.total_refund_amount).toFixed(2) || 0}
                      duration={2}
                    />
                  </p>
                </div>
              </div>
              <div onClick={handleDue} className="col-2">
                <div className="transaction-card tran__card_3 p-4">
                  <div className="d-flex">
                    <img src={due} alt="" className="me-2" />
                    <h6>Total Due</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    <img src={taka} alt="" className="me-2" />
                    <CountUp
                      start={0}
                      decimals={2}
                      end={parseFloat(transaction?.total_due).toFixed(2) || 0}
                      duration={2}
                    />
                  </p>
                </div>
              </div>
              <div className="col-2">
                <div className="transaction-card tran__card_4 p-4">
                  <div className="d-flex">
                    <img src={dueC} alt="" className="me-2" />
                    <h6>Due Collection</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    <img src={taka} alt="" className="me-2" />
                    <CountUp
                      start={0}
                      decimals={2}
                      end={parseFloat(dueCollection || 0).toFixed(2) || 0}
                      duration={2}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="patient-table my-2"
            style={{
              overflowX: "auto",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <div className="d-flex align-items-center justify-content-between m-4">
              <Input
                placeholder="Search Name, Phone, Invoice No"
                style={{
                  width: "250px",
                  padding: "0.5rem 1rem",
                }}
                value={search}
                onChange={handleSearch}
              />
              <div className="d-flex align-items-center gap-1">
                <div className="rx-one-button-group">
                  <button
                    onClick={() => {
                      resetQuery();
                    }}
                    className="btn"
                  >
                    Clear
                  </button>
                </div>
                <div className="rx-one-button-group">
                  <button
                    onClick={() => {
                      refreshQuery();
                    }}
                    className="btn"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  {filterColumns.map((item, i) => (
                    <th scope="col" key={i}>
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {totalInvoiceSort.length > 0 ? (
                  <>
                    {totalInvoiceSort.map((item, i) => (
                      <tr key={i}>
                        {filterColumns.map((col, index) => (
                          <td key={index}>
                            {col.render ? col.render(item) : item[col.field]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* <tr>
                      <td className="font-weight-bold">Total:</td>
                      <td></td>
                      <td></td>
                      <td className="font-weight-bold"> {totalInvoiceSort.reduce((acc, item) => acc + parseFloat(item.totalBill), 0).toFixed(2)}</td>
                      <td className="font-weight-bold">  {totalInvoiceSort.reduce((acc, item) => acc + parseFloat(item.paidAmount), 0).toFixed(2)}</td>
                      <td></td>
                      <td className="font-weight-bold"> {totalInvoiceSort.reduce((acc, item) => acc + parseFloat(item.due), 0).toFixed(2)}</td>
                      <td className="font-weight-bold"> {totalInvoiceSort.reduce((acc, item) => acc + parseFloat(item.discount || 0) + parseFloat(item.specialDiscount || 0), 0).toFixed(2)}</td>
                      <td></td>
                      <td></td>
                    </tr> */}
                  </>
                ) : (
                  <tr>
                    <td colSpan={filterColumns.length} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div>
              <div className="d-flex justify-content-end">
                <Pagination
                  limit={Number(limit)}
                  onChangePerPage={handleChangeRowsPerPage}
                  onPageChange={handleChangePage}
                  totalCount={Number(totalCount || 0)}
                  page={Number(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedTest.length > 0 && (
        <div className="print-money-receipt">
          <div
            ref={invoiceRef}
            className="money-receipt-container px-4 py-2 mt-4"
          >
            <span className="money-receipt-head">
              Online Payment Confirmation Or Offline Payment Confirmation
            </span>
            <div className="receipt-welcome-section mt-3">
              <p>Dear Sir / Madam</p>
              <p>Thank You</p>
              <p>For your payment for medical expense</p>
            </div>
            <div className="mt-3 receipt-pay-info">
              <h6>Payment Confirmation</h6>
              <hr />
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Money Receipt Number
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.money_receipt_number}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  HN
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.hn_number}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Name
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.name}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Invoice Number
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.invoice_number}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Requested Amount
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.requested_amount}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Amount Paid
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.paid_amount}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Payment Date
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.payment_date}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Payment Time
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.payment_time}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Channel
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.payment_method}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Total Amount Paid
                </span>
                :
                <span className="receipt-details-value">
                  {moneyReceiptData?.total_amount_paid}
                </span>
              </p>
            </div>
            <div className="my-3">
              <p>
                If you have any questions or need help, please 'Reply all' to
                this email and we will reply as quickly as possible
              </p>
            </div>
            <div>
              <p>Sincerely,</p>
              <p>Al-Shifa Hospital</p>
              <p>Phone +66 2066 8888</p>
            </div>
            <div className="mt-5">
              <span className="bottom-nb">
                This e-mail message (and attachments) may contain information
                that is confidential to Bumiungrad International. If you are not
                the intended recipient you cannot use, dismbute or copy the
                message or attachments, In such a case, please nobfy the sender
                by return e-mail immedately and erase all copies of the message
                and attachments. Opinions, conclusions and other information in
                this message and attachments that do not relate to the official
                business of Bumningrad International are nether given no'
                endorsed by it.
              </span>
            </div>
            <div className="mt-2">
              <span className="receipt-end-line">
                Save the Environment — Think before you print this e-man
              </span>
            </div>
          </div>
        </div>
      )}

      {/* <div className="print-invoice">
        <div ref={invoiceRef} className="sales-invoice">
          {moneyReceiptData && (
            <div style={{ margin: "25px" }} className="invoice-print">
              <div className="invoice-pharmacy-details d-flex gap-2 align-items-center justify-content-start">
                <img
                  src={user?.organization_logo}
                  alt="logo"
                  style={{ width: "80px", height: "80px" }}
                />
                <div className="text-center w-100">
                  <h5 className="fw-bold">{user?.organization_name}</h5>
                  <p className="text-justify text-center">
                    {user?.organization_address}

                    <span className="ms-2">
                      Contact : {center?.mobile || ""}, {center?.phone || ""}
                    </span>
                  </p>
                  <p>(A Computerized Diagnostic and Consultation Centre)</p>
                </div>
              </div>
              <div className="row  mt-3 mb-1">
                <div className="row col-8">
                  <div className="col-6 d-flex align-items-center">
                    <p className="p-0 m-0">
                      Received No:
                      <span>{moneyReceiptData?.invoiceNo || 10001}</span>
                    </p>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <h4
                      className="text-center py-1 px-3  m-0"
                      style={{
                        border: "1px dashed gray",
                        borderRadius: "20px",
                        display: "inline-block",
                        fontSize: "14px",
                      }}
                    >
                      Money Receipt
                    </h4>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <div className="d-flex justify-content-end align-items-center">
                    <span className="me-1">Date </span>
                    <span
                      style={{
                        width: "133px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      :
                      <span>
                        {" "}
                        {moment(moneyReceiptData?.created_at).format(
                          "DD/MM/YYYY hh:mm A"
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row" style={{ borderBottom: "1px dashed gray" }}>
                <div className="col-8">
                  <p className="m-0 p-0">
                    <span
                      style={{
                        width: "100px",
                        display: "inline-block",
                      }}
                    >
                      Patient Name
                    </span>
                    : {moneyReceiptData?.patient?.fullName || "N/A"}
                  </p>
                  <p className="m-0 p-0">
                    <span
                      style={{
                        width: "100px",
                        display: "inline-block",
                      }}
                    >
                      Phone Number
                    </span>
                    :{" "}
                    {moneyReceiptData?.patient?.patient_mobile_phone ||
                      "N/A"}
                  </p>
                </div>
                <div className="col-4 ">
                  <div className="d-flex justify-content-end">
                    <div>
                      <p className="m-0 p-0">
                        <span
                          style={{
                            width: "40px",
                            display: "inline-block",
                          }}
                        >
                          Age
                        </span>
                        : {age}
                      </p>
                      <p className="m-0 p-0">
                        <span
                          style={{
                            width: "40px",
                            display: "inline-block",
                          }}
                        >
                          Sex
                        </span>
                        :{" "}
                        {moneyReceiptData?.patient?.patient_birth_sex
                          ?.birth_sex_name || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" d-flex w-100">
                  <div>
                    <p style={{ width: "105px" }}>
                      <span
                        style={{ width: "100px" }}
                        className="d-inline-block"
                      >
                        Referred By
                      </span>
                      :
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="">
                        {moneyReceiptData?.doctor?.fullName
                          ? `${moneyReceiptData?.doctor?.title?.title_name ||
                          ""
                          } ${moneyReceiptData?.doctor?.fullName || ""
                          }  ${moneyReceiptData?.doctor?.academic
                            ?.map((item) => item?.degree_id)
                            ?.join(", ")}`
                          : moneyReceiptData?.referredBy === "other" ? moneyReceiptData?.referrer : "self"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="invoice-item-table">
                <table>
                  <tr className="invoice-border-dashed">
                    <td colSpan={1}>SL</td>
                    <td colSpan={4}>Test Name</td>
                    <td className="text-end">Test Cost</td>
                  </tr>
                  {moneyReceiptData?.tests?.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td colSpan={4} className="text-start">
                        {item?.testName}
                      </td>
                      <td className="text-end">
                        {formatNumber(parseFloat(item?.fee))}
                      </td>
                    </tr>
                  ))}
                  <tr className="invoice-border-dashed-top">
                    <td rowSpan={5} colSpan={4}>
                      <p
                        style={{ marginTop: "-25px", fontSize: "13px" }}
                        className="p-0"
                      >
                        In Words :{" "}
                        {numberToWordsTaka(
                          parseFloat(moneyReceiptData?.paidAmount || 0)
                        )}
                        <span className=""> Only</span>
                      </p>
                      {Number(moneyReceiptData?.due) > 0 && (
                        <div className=" d-flex justify-content-center align-items-center">
                          <p
                            style={{
                              fontSize: "20px",
                              whiteSpace: "nowrap",
                              margin: "0",
                              padding: "0",
                              marginTop: "27px",
                            }}
                          >
                            Due Amount :
                            <span className="ms-1">
                              {formatNumber(
                                parseFloat(moneyReceiptData?.due)
                              )}
                            </span>
                          </p>
                        </div>
                      )}
                    </td>
                    <td colSpan={1} className="text-end">
                      Sub Total :
                    </td>
                    <td className="text-end">
                      {formatNumber(parseFloat(moneyReceiptData?.totalBill))}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={1} className="text-end">
                      Discount :
                    </td>
                    <td className="text-end">
                      {formatNumber(
                        parseFloat(
                          parseFloat(moneyReceiptData?.discount || 0) +
                          parseFloat(moneyReceiptData?.specialDiscount || 0)
                        )
                      )}
                    </td>
                  </tr>
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={1} className="text-end">
                      Bill Total :
                    </td>
                    <td className="text-end">
                      {formatNumber(
                        parseFloat(
                          parseFloat(moneyReceiptData?.totalBill) -
                          (parseFloat(moneyReceiptData?.discount || 0) +
                            parseFloat(moneyReceiptData?.specialDiscount) ||
                            0)
                        )
                      )}
                    </td>
                  </tr>
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={1} className="text-end">
                      Paid :
                    </td>
                    <td className="text-end">
                      {formatNumber(
                        parseFloat(moneyReceiptData?.paidAmount)
                      )}
                    </td>
                  </tr>
                  {Number(moneyReceiptData?.refundAmount) > 0 && (
                    <tr className="invoice-border-dashed-top">
                      <td colSpan={1} className="text-end">
                        Refund :
                      </td>
                      <td className="text-end">
                        {formatNumber(
                          parseFloat(moneyReceiptData?.refundAmount)
                        )}
                      </td>
                    </tr>
                  )}

                  {Number(moneyReceiptData?.due) > 0 && (
                    <tr className="invoice-border-dashed-top">
                      <td colSpan={1} className="text-end">
                        Due :
                      </td>
                      <td className="text-end">
                        {formatNumber(parseFloat(moneyReceiptData?.due))}
                      </td>
                    </tr>
                  )}
                </table>
              </div>
              <br />
              <div className="d-flex invoice-creator justify-content-between mt-4">
                <p>
                  Delivery Date:
                  {moment(moneyReceiptData?.deliveryDate).format("DD/MM/YYYY")}-
                  {moment(moneyReceiptData?.deliveryTime, "HH:mm:ss").format(
                    "hh A"
                  )}
                </p>
                <p>Posted : {moneyReceiptData?.created_by}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-2">
                <Barcode
                  displayValue="false"
                  lineColor="#333333"
                  width={2}
                  height={20}
                  value={moneyReceiptData?.invoiceNo || 10001}
                />
              </div>
            </div>
          )}
        </div>
      </div> */}

      <div ref={invoiceRef} >
        <PrintGreatLabInvoice
          userInfo={moneyReceiptData?.patient}
          tests={moneyReceiptData?.tests?.filter(item => item?.is_refund === 0)}
          date={moneyReceiptData?.deliveryDate}
          time={moneyReceiptData?.deliveryTime}
          discount_percentage={moneyReceiptData?.discount_percentage}
          grandTotal={moneyReceiptData?.totalBill}
          dueAmount={moneyReceiptData?.due}
          moneyReceipt={moneyReceiptData}
          selected={
            moneyReceiptData?.referrer
          }
        />
      </div>


      <GreatLabInvoiceDetails
        data={selectedInvoice}
        isOpen={previewModal}
        onClose={handleCloseModal}
      />

      <GreatLabInvoiceRefund
        invoice={selectedInvoice}
        isOpen={editModal}
        onClose={handleCloseEditModal}
        setUpdateData={setUpdateData}
      />
      <GreatLabDueCollection
        invoice={selectedInvoice}
        isOpen={refundModal}
        onClose={handleCloserefundModal}
        setUpdateData={setUpdateData}
      />
    </div>
  );
};

export default GreatLabMoneyReciept;





