import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import { useReactToPrint } from "react-to-print";
import { NewModal as Modal } from "../../common/components/NewModal";
import Barcode from "react-barcode/lib/react-barcode";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Avatar } from "@mui/material";
import NoImages from "../../Images/dummy_images.svg";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import Button from "../../common/components/Button";
import { Button as MuiButton } from "@mui/material";
import SimpleSelect from "../../common/components/SimpleSelect";
import "./greatLabBillingReport.css";
export default function LabTestWiseReport() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    startDate: moment().format("YYYY-MM-DD"), //new Date(),
    endDate: moment().format("YYYY-MM-DD"),
    group: "",
    test_id: "",
    category_id: "",
  });
  const [invoice, setInvoice] = useState({});
  const invoiceRef = useRef();
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  const [refetch, setRefetch] = useState(false);

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

  const [tests, setTests] = useState([]);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`great-lab-billing-report-test`, filter)
      .then((res) => {
        setData(res?.data?.invoice || []);
        setAllData(res?.data || {});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    axios.get(`/new-test-group`).then((res) => {
      if (res.data.status === 200) {
        const updatedGroup = res?.data?.test_group?.map((group) => ({
          ...group,
          value: group?.id,
          label: group?.test_group_name,
        }));
        setGroups(updatedGroup);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setTests(res.data.test_name);
      }
    });
  }, [refetch]);

  const handleFilter = () => {
    setLoading(true);
    const modifiedData = { ...filter, branch_id: filter?.branch_id?.value };

    axios
      .post(`great-lab-billing-report-test`, modifiedData)
      .then((res) => {
        setData(res?.data?.invoice || []);
        setAllData(res?.data || {});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setInvoice({});
  };
  const openModal = (item) => {
    setIsOpen(true);
    setInvoice(item);
  };
  const [searchPatientName, setSearchPatientName] = useState("");
  const [searchDoctorName, setSearchDoctorName] = useState("");

  const clearBillingSearch = () => {
    setSearchPatientName("");
    setFilter({ ...filter, test_id: "" });
  };
  const clearBillingSearchDoctor = () => {
    setSearchDoctorName("");
    setFilter({ ...filter, doctor_id: "" });
  };

  const isSuperAdmin = user?.isSuperAdmin;

  const handleFilterBranch = (data) => {
    if (data) {
      setFilter({ ...filter, branch_id: data });
    } else {
      setFilter({ ...filter, branch_id: null });
    }
  };
  const handleClearFilter = () => {
    setFilter({
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      group: "",
      test_id: "",
      category_id: null,
      group_id: "",
    });
    clearBillingSearch();
    setRefetch(!refetch);
  };
  const handleFilterGroup = (data) => {
    if (data) {
      setFilter({ ...filter, group: data?.label, group_id: data });
    } else {
      setFilter({ ...filter, group: null });
    }
  };
  console.log(filter, "new date");
  return (
    <div className="ms-2 mt-2">
      <div className="shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1">
        <div className="custom-card p-2">
          <div className="row">
            <div className={isSuperAdmin ? "col-4 d-flex" : "col-5 d-flex"}>
              <h6 className="mt-2 mx-2" style={{ whiteSpace: "nowrap" }}>
                Test Report
              </h6>
              <div
                style={{ width: isSuperAdmin ? "200px" : "200px" }}
                className="lab-agent-search ms-2 mt-1"
              >
                <ReactSearchAutocomplete
                  showIcon={false}
                  placeholder={"Search Test"}
                  items={tests}
                  onClear={clearBillingSearch}
                  inputSearchString={searchPatientName || ""}
                  onSearch={(value) => setSearchPatientName(value)}
                  searchInputProps={{
                    className: "form-control",
                    placeholder: "Search",
                  }}
                  formatResult={(item) => {
                    return (
                      <div
                        style={{ height: "25px" }}
                        className="d-flex me-4 justify-content-between align-items-center"
                      >
                        <p className="mt-3">{item?.test_name}</p>
                      </div>
                    );
                  }}
                  resultStringKeyName="test_name"
                  onSelect={(item) => {
                    setFilter({ ...filter, test_id: item?.id });
                  }}
                  maxResults={3}
                  fuseOptions={{
                    keys: ["test_name"],
                  }} // Search in the description text as well
                  styling={{
                    borderRadius: "10px !important",
                    // zIndex: modalIsOpen || isOpenForPaymentModal ? "auto" : "20",
                    width: "100%",
                  }}
                ></ReactSearchAutocomplete>
              </div>
              <SimpleSelect
                value={filter?.group_id || null}
                onChange={handleFilterGroup}
                options={groups || []}
                width="150px"
                placeholder="Select Group"
              />
            </div>
            <div className={isSuperAdmin ? "col-8" : "col-7"}>
              <div className="row">
                <div className="col-3 d-flex align-items-center gap-1">
                  <ReactDatePicker
                    id="fromDate"
                    placeholderText="From Date"
                    selected={
                      filter.startDate ? new Date(filter.startDate) : null
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="requisition_no"
                    style={{ padding: "20px" }}
                    onChange={(d) =>
                      setFilter({
                        ...filter,
                        startDate: d
                          ? moment(d).format("YYYY-MM-DD")
                          : new Date(),
                      })
                    }
                  />
                </div>
                <div className="col-3 d-flex align-items-center gap-1">
                  <ReactDatePicker
                    id="toDate"
                    placeholderText="To Date"
                    selected={filter.endDate ? new Date(filter.endDate) : null}
                    dateFormat={"dd/MM/yyyy"}
                    name="requisition_no"
                    onChange={(d) =>
                      setFilter({
                        ...filter,
                        endDate: d
                          ? moment(d).format("YYYY-MM-DD")
                          : new Date(),
                      })
                    }
                  />
                </div>
                <div className="col-6 d-flex align-items-center justify-content-between">
                  {isSuperAdmin ? (
                    <SimpleSelect
                      value={filter?.branch_id || null}
                      onChange={handleFilterBranch}
                      options={orgBranch || []}
                      width="150px"
                      placeholder="Select Branch"
                    />
                  ) : null}
                  <div className="d-flex flex-grow-1 align-items-center gap-1 justify-content-end">
                    <Button onClick={handleFilter}>Search</Button>
                    <MuiButton
                      sx={{
                        color: "#69B128",
                      }}
                      onClick={handleClearFilter}
                    >
                      Clear
                    </MuiButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={componentRef} className="plan-report">
          <div className="print-report-header mt-1">
            <div className="d-flex justify-content-center">
              <div className="d-flex align-items-center">
                {/* <img style={{ width: "60px" }} src={user?.organization_logo || 'data:image/jpeg;base64,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'} alt="" /> */}
                <div className="ms-2 text-center fw-bold">
                  <h6 className="">{user?.organization_name}</h6>
                  <p>
                    {user?.organization_address ||
                      "House 35 East Rampura, Dhaka 1210"}
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="">Billing Report</h6>
              <p className="">
                For the period of :{" "}
                {moment(data[0]?.created_at).format("DD-MM-YYYY")} to{" "}
                {moment(data[data?.length - 1]?.created_at).format(
                  "DD-MM-YYYY"
                )}
              </p>
            </div>
          </div>
          <div className="rx-one-button-group point-report-print-btn mt-2">
            <button onClick={handlePrint} className="btn float-end mb-2">
              Print
            </button>
          </div>
          {loading ? (
            <div
              style={{ height: "400px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <div class="spinner-border  text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <table>
              <tr className="report-header-bg">
                <td>SL</td>
                <td>Name</td>
                {isSuperAdmin && <td>Branch</td>}
                <td>Group</td>
                {/* <td>Category</td> */}
                <td className="text-end">Total Count</td>
                <td className="text-end">Total Discount</td>
                <td className="text-end">Total Amount</td>
                {/* <td className='text-end'>Point</td>
                            <td className='text-end'>Total Point</td> */}
              </tr>
              {data?.map((item, index) => {
                return (
                  <>
                    <tr key={item?.id}>
                      <td>{index + 1}</td>
                      <td>{item?.testName}</td>

                      {isSuperAdmin && <td>{item?.saas_branch_name}</td>}
                      <td>{item?.testCategory}</td>
                      <td className="text-right">{item?.total_count}</td>
                      <td className="text-right">{item?.discount || 0}</td>
                      <td className="text-right">{item?.total_fee}</td>
                      {/* <td className="text-right">{item?.refundAmount}</td>
                      <td className="text-right">{item?.due}</td> */}
                    </tr>
                  </>
                );
              })}
              <tr>
                <td
                  colSpan={isSuperAdmin ? 4 : 3}
                  className="text-right fw-bold"
                >
                  Grand Total :
                </td>
                <td className="text-right fw-bold">{allData?.totalCount}</td>
                <td className="text-right fw-bold">{allData?.discount}</td>
                <td className="text-right fw-bold">{allData?.total}</td>
              </tr>
            </table>
          )}
        </div>
      </div>
      <Modal size="md" isOpen={isOpen} onClose={closeModal}>
        <Modal.Header onClose={closeModal}>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body styles={{ height: "450px" }}>
          <div className="row custom-card p-2">
            <div className="print-invoice1">
              <div
                style={{ display: "block" }}
                ref={invoiceRef}
                className="sales-invoice"
              >
                {invoice && (
                  <div className="invoice-print">
                    <div className="invoice-pharmacy-details d-flex justify-content-center">
                      <div className="text-center">
                        <h5>{user?.organization_name}</h5>
                        <p>
                          Location :{" "}
                          {user?.organization_address ||
                            "House 35 East Rampura, Dhaka 1210"}
                        </p>
                      </div>
                    </div>
                    <div className="row agent-details mb-3">
                      <div className="col-6">
                        <p>Patient Name : {invoice?.patient_first_name}</p>
                      </div>
                      <div className="col-6 d-flex justify-content-end">
                        <div>
                          <p>Patient Phone : {invoice?.patient_mobile_phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="invoice-date d-flex justify-content-between invoice-border-dashed">
                      <p>Invoice No : {invoice?.invoiceNo} </p>
                      <p>
                        Date :{" "}
                        {moment(invoice?.created_at).format("DD-MM-YYYY")}{" "}
                      </p>
                    </div>
                    <div className="invoice-item-table">
                      <table>
                        <tr className="invoice-border-dashed">
                          <td>Code</td>
                          <td>Name</td>
                          <td>Rate</td>
                          <td>Qty</td>
                          <td className="text-end">Total</td>
                        </tr>
                        {invoice?.details?.map((item, i) => (
                          <tr key={i}>
                            <td>{item.code}</td>
                            <td className="text-start">{item.testName}</td>
                            <td className="text-start">{item.fee}</td>
                            <td></td>
                            <td className="text-end">{Number(item.fee)}</td>
                          </tr>
                        ))}
                        {invoice?.inventory?.map((item, i) => (
                          <tr key={i}>
                            <td>{item.code}</td>
                            <td className="text-start">{item.name}</td>
                            <td className="text-start">{item.price}</td>
                            <td className="text-start">{item?.quantity}</td>
                            <td className="text-end">
                              {parseFloat(item.price) *
                                parseFloat(item?.quantity)}
                            </td>
                          </tr>
                        ))}
                        <tr className="invoice-border-dashed-top">
                          <td colSpan={4} className="text-end">
                            Sub Total :
                          </td>
                          <td className="text-end">{invoice?.totalBill} </td>
                        </tr>
                        <tr>
                          <td colSpan={4} className="text-end">
                            VAT / TAX :
                          </td>
                          <td className="text-end">0</td>
                        </tr>
                        <tr>
                          <td colSpan={4} className="text-end">
                            Discount :
                          </td>
                          <td className="text-end">{invoice?.totalDiscount}</td>
                        </tr>

                        <tr className="invoice-border-dashed-top">
                          <td colSpan={4} className="text-end">
                            Bill Total :
                          </td>
                          <td className="text-end">
                            {parseFloat(invoice?.totalBill) -
                              parseFloat(invoice?.totalDiscount)}{" "}
                          </td>
                        </tr>
                        <tr className="invoice-border-dashed-top">
                          <td colSpan={4} className="text-end">
                            Paid :
                          </td>
                          <td className="text-end">{invoice?.paidAmount} </td>
                        </tr>
                        {invoice?.due && (
                          <tr className="invoice-border-dashed-top">
                            <td colSpan={4} className="text-end">
                              Due :
                            </td>
                            <td className="text-end">{invoice?.due} </td>
                          </tr>
                        )}
                      </table>
                    </div>
                    <div className="d-flex invoice-creator justify-content-between mt-1">
                      <p>Provided By: {invoice?.created_by}</p>
                      <p>
                        Time : {moment(invoice?.createdAt).format("hh:mm A")}
                      </p>
                    </div>
                    <div className="invoice-greeting d-flex justify-content-center align-items-center">
                      <Barcode
                        displayValue="false"
                        height="30"
                        width="2"
                        value={invoice?.invoiceNo}
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
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-2 rx-one-button-group">
            <button
              type="button"
              onClick={closeModal}
              className="btn float-end"
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
