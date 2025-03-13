import { Grid } from "@mui/material";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { toast } from "react-toastify";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode/lib/react-barcode";
import { formateHN, numHelper } from "../../utils/numberHelper";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import ReactSelect from "react-select";
import SimpleSelect from "../../common/components/SimpleSelect";
import Button from "../../common/components/Button";
const MoneyReceiptList = () => {
  const [loading, setLoading] = useState(true);
  const [totalInvoice, setTotalInvoice] = useState([]);
  const [totalInvoiceSort, setTotalInvoiceSort] = useState([]);

  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  useEffect(() => {
    if (selectedBranch && totalInvoiceSort.length > 0) {
      setTotalInvoice(
        totalInvoiceSort.filter(
          (data) => data.saas_branch_id === selectedBranch?.id
        )
      );
    } else {
      setTotalInvoice(totalInvoiceSort);
    }
    return () => {};
  }, [selectedBranch, totalInvoiceSort]);

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
        setTotalInvoice(res.data.invoice);
        setTotalInvoiceSort(res.data.invoice);
        setLoading(false);
      }
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      title: "Invoice No",
      render: (row) => numHelper(row?.invoiceNo),
    },
    {
      title: "HN",
      render: (rowData) => (
        <div>
          {console.log(rowData)}
          {formateHN(rowData?.patient?.patient_hn_number)}
        </div>
      ),
    },
    {
      title: "Branch",
      field: "saas_branch_name",
    },
    {
      title: "Name",
      render: (rowData) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {rowData?.patient?.fullName}
        </span>
      ),
    },
    {
      title: "Total Amount",
      field: `totalBill`,
    },
    {
      title: "Paid Amount",
      field: `paidAmount`,
    },
    {
      title: "Due",
      field: `due`,
    },
    {
      title: "Payment Method",
      field: "paymentMethod",
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          <button
            data-bs-toggle="tooltip"
            title="Print Invoice"
            onClick={() => handleInvoice(row)}
            className={`btn btn-sm action-btn `}
          >
            {" "}
            <AiFillPrinter />{" "}
          </button>
          &nbsp;
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((column) => column.field !== "saas_branch_name");
    }
  }, [columns, user?.isSuperAdmin]);
  const handleFilterBranch = (selectedBranch) => {
    if (selectedBranch) {
      setSelectedBranch(selectedBranch);
    } else {
      setSelectedBranch(null);
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
            setTotalInvoice(res.data.data);
            setTotalInvoiceSort(res.data.data);
          }
        });
    } else {
      toast.error("Please enter start and end date!");
    }
  };
  // print test List
  const [selectedTest, setSelectedTest] = useState([]);
  const [moneyReceiptData, setMoneyReceiptData] = useState({});
  const invoiceRef = useRef();
  const handleInvoicePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const handleInvoice = (item) => {
    setMoneyReceiptData(item);
    setTimeout(() => handleInvoicePrint(), 1000);
  };
  const totalBill = moneyReceiptData?.tests?.reduce(
    (total, current) => total + Number(current.fee),
    0
  );
  const discountTotal = moneyReceiptData?.tests?.reduce(
    (total, current) =>
      total + (Number(current.discount) * Number(current.fee)) / 100,
    0
  );
  const handleDue = () => {
    const filtered = totalInvoice.filter((item) => Number(item.due) > 0);
    setTotalInvoiceSort(filtered);
  };
  const handlePaid = () => {
    const filtered = totalInvoice.filter((item) => Number(item.paidAmount) > 0);
    setTotalInvoiceSort(filtered);
  };
  return (
    <div className="ms-2 lab-agent all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card d-flex justify-content-between align-items-center">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Lab Agent
            </h5>
            {user?.isSuperAdmin ? (
              <div className="filter me-2">
                <SimpleSelect
                  options={orgBranch}
                  value={selectedBranch}
                  onChange={handleFilterBranch}
                  placeholder="Select Branch"
                />
              </div>
            ) : null}
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
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <label className="fw-bold my-0">Date</label>
                  <input
                    style={{ maxWidth: "200px" }}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, startDate: e.target.value })
                    }
                    type="date"
                    className="form-control form-control-sm"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <label className="fw-bold my-0"> To</label>
                  <input
                    style={{ maxWidth: "200px" }}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, endDate: e.target.value })
                    }
                    type="date"
                    className="form-control form-control-sm"
                  />
                </div>
                <Button onClick={searchByDateRange}>Search</Button>
              </div>
            </div>
          </div>
          <div className="mx- my-2">
            <div className="row">
              <div onClick={handlePaid} className="col-4">
                <div className="transaction-card tran__card_1 p-4">
                  <div className="d-flex">
                    <i className="fa-solid fa-file-invoice me-2"></i>
                    <h6>Total Invoice : {totalInvoice.length}</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    {" "}
                    <span style={{ fontSize: "22px" }} className="me-2">
                      {" "}
                      &#2547;
                    </span>
                    {totalInvoice.reduce(
                      (total, current) => total + Number(current.totalBill),
                      0
                    )}
                  </p>
                </div>
              </div>
              <div onClick={handlePaid} className="col-4">
                <div className=" transaction-card tran__card_2 p-4">
                  <div className="d-flex">
                    <i className="fa-solid fa-file-invoice me-2"></i>
                    <h6>Total Received</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    {" "}
                    <span style={{ fontSize: "22px" }} className="me-2">
                      {" "}
                      &#2547;
                    </span>
                    {totalInvoice.reduce(
                      (total, current) => total + Number(current.paidAmount),
                      0
                    )}
                  </p>
                </div>
              </div>
              <div onClick={handleDue} className="col-4">
                <div className="transaction-card tran__card_3 p-4">
                  <div className="d-flex">
                    <i className="fa-solid fa-file-invoice me-2"></i>
                    <h6>Total Due</h6>
                  </div>
                  <hr />
                  <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                    {" "}
                    <span style={{ fontSize: "22px" }} className="me-2">
                      {" "}
                      &#2547;
                    </span>
                    {totalInvoice.reduce(
                      (total, current) => total + Number(current.due),
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-table mt-2">
            <MaterialTable
              columns={filterColumns}
              data={totalInvoice}
              isLoading={loading === true ? true : false}
              options={{
                search: true,
                // filtering: filter,
                showTitle: false,
                searchFieldAlignment: "left",
                pageSize: 10,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [5, 10, 20, 50, 100],
                // selection: true
              }}
              components={{
                Toolbar: (props) => (
                  <div>
                    <Grid style={{}}>
                      {/* <Tooltip title="Print test list" placement="bottom"><PrintIcon className="float-end export-icon pe-auto me-3 mt-1" onClick={printTestList} /></Tooltip> */}
                    </Grid>
                    <MTableToolbar
                      style={{ width: 80, fontSize: 14 }}
                      {...props}
                    />
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
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.money_receipt_number}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  HN
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.hn_number}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Name
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.name}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Invoice Number
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.invoice_number}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Requested Amount
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.requested_amount}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Amount Paid
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.paid_amount}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Payment Date
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.payment_date}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Payment Time
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.payment_time}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Channel
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.payment_method}
                </span>
              </p>
              <p>
                <span className="d-inline-block" style={{ width: "200px" }}>
                  Total Amount Paid
                </span>{" "}
                :{" "}
                <span className="receipt-details-value">
                  {moneyReceiptData?.total_amount_paid}
                </span>
              </p>
            </div>
            <div className="my-3">
              <p>
                If you have any questions or need help, please 'Reply all' to
                this email and we will reply as quickly as possible{" "}
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

      <div className="print-invoice">
        <div ref={invoiceRef} className="sales-invoice">
          {moneyReceiptData && (
            <div style={{ padding: "60px" }} className="invoice-print">
              <div className="invoice-pharmacy-details d-flex justify-content-center">
                <div className="text-center">
                  <h5>Al Shifa Pharmacy</h5>
                  <p>Location : Lalbagh</p>
                  <p>Tel : 0171238765</p>
                  <p>Vat Reg No :534565 </p>
                </div>
              </div>
              <div className="row agent-details mb-3">
                <div className="col-6">
                  <p>Agent Name : Mr X</p>
                  <p>Agent Phone : 01700001234</p>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <div>
                    <p>Patient Name : {moneyReceiptData?.patient_first_name}</p>
                    <p>
                      Patient Phone : {moneyReceiptData?.patient_mobile_phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="invoice-date d-flex justify-content-between invoice-border-dashed">
                <p>Invoice No : {moneyReceiptData?.invoiceNo} </p>
                <p>Date : {new Date().toLocaleDateString("en-GB")} </p>
              </div>
              <div className="invoice-item-table">
                <table>
                  <tr className="invoice-border-dashed">
                    <td>Code</td>
                    <td>Name</td>
                    <td>Rate</td>
                    <td className="text-end">Total</td>
                  </tr>
                  {moneyReceiptData?.tests?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.code}</td>
                      <td className="text-start">{item.testName}</td>
                      <td className="text-start">{item.fee}</td>
                      <td className="text-end">{Number(item.fee)}</td>
                    </tr>
                  ))}
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={3} className="text-end">
                      Sub Total :{" "}
                    </td>
                    <td className="text-end">{moneyReceiptData.totalBill} </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-end">
                      VAT / TAX :{" "}
                    </td>
                    <td className="text-end">0</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-end">
                      Discount :{" "}
                    </td>
                    <td className="text-end">{discountTotal}</td>
                  </tr>

                  <tr className="invoice-border-dashed-top">
                    <td colSpan={3} className="text-end">
                      Bill Total :{" "}
                    </td>
                    <td className="text-end">{totalBill - discountTotal} </td>
                  </tr>
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={3} className="text-end">
                      Paid :{" "}
                    </td>
                    <td className="text-end">
                      {moneyReceiptData?.paidAmount}{" "}
                    </td>
                  </tr>
                  {moneyReceiptData?.due && (
                    <tr className="invoice-border-dashed-top">
                      <td colSpan={3} className="text-end">
                        Due :{" "}
                      </td>
                      <td className="text-end">{moneyReceiptData?.due} </td>
                    </tr>
                  )}
                </table>
              </div>
              <div className="d-flex invoice-creator justify-content-between mt-1">
                <p>Provided By: Cashier</p>
                <p>Time : {new Date().toLocaleTimeString()}</p>
              </div>
              <div className="invoice-greeting d-flex justify-content-center align-items-center">
                <Barcode
                  displayValue="false"
                  height="30"
                  width="2"
                  value={moneyReceiptData?.invoiceNo}
                />
              </div>
              <div className="d-flex justify-content-center branding-section">
                <p>Thank You</p>
              </div>
              <div className="branding-section">
                <p>Technology Partner Zaimah Technologies Ltd.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoneyReceiptList;
