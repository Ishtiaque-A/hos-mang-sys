import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./ReportDelivery.css";
import Barcode from "react-barcode";
import { BiSearch } from "react-icons/bi";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import QRCode from "react-qr-code";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import PrintReportDelivery from "./PrintReportDelivery";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import SimpleSelect from "../../common/components/SimpleSelect";
const ReportDelivery = () => {
  const [reportDeliveryInfo, setReportDeliveryInfo] = useState({
    deliveryTime: moment().format("HH:mm:ss"),
    deliveryDate: new Date().toJSON().slice(0, 10),
    fileUpload: "",
    followUpDate: "",
    followUpComment: "",
    testList: [],
    collectedBy: "",
    remark: "",
  });
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
  const handleReportDelivery = (e) => {
    const { name, value } = e.target;
    setReportDeliveryInfo({ ...reportDeliveryInfo, [name]: value });
  };
  const actionList = [
    { _id: "4v5fse", name: "Send to Hospital" },
    { _id: "94d4ds", name: "Send to Doctor" },
    { _id: "910lsduj", name: "Send to Patient" },
  ];
  const [invoiceDetails, setInvoiceDetails] = useState({
    deliveryTime: "",
    deliveryDate: "",
    patient_first_name: "",
    patient: { patient_dob: new Date() },
    due: 0,
    invoiceNo: "00000000",
    totalBill: 0,
    created_at: "",
    paymentMethod: "",
    patient_id: "",
  });
  //print lab agent billing info
  const componentRef = useRef();
  const handleLabAgentDeliveryPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [allInvoice, setAllInvoice] = useState([]);
  const [allTest, setAllTest] = useState([]);
  useEffect(() => {
    axios.get("lab-agent-all-invoice").then((res) => {
      if (res.status === 200) {
        setAllInvoice(res.data.invoice);
      }
    });
  }, []);
  useEffect(() => {
    if (invoiceDetails.invoiceNo) {
      axios
        .get(`lab-agent-invoice-details/${invoiceDetails.invoiceNo}`)
        .then((res) => {
          if (res.status === 200) {
            setAllTest(res.data.invoice);
          }
        });
    }
  }, [invoiceDetails]);
  const clearInvoice = () => {
    setInvoiceDetails({
      deliveryTime: "",
      deliveryDate: "",
      patient_first_name: "",
      patient_id: "",
      patient: { patient_dob: new Date() },
      due: 0,
      invoiceNo: "00000000",
    });
    setAllTest([]);
  };
  const getError = () => {
    if (invoiceDetails.due > 0) {
      toast.error("Please make full payment first !");
    } else if (!reportDeliveryInfo.deliveryTime) {
      toast.error("Please enter delivery time !");
    } else if (!reportDeliveryInfo.deliveryDate) {
      toast.error("Please enter delivery date !");
    } else if (!reportDeliveryInfo.testList.length > 0) {
      toast.error("Please select test !");
    } else if (!reportDeliveryInfo.collectedBy) {
      toast.error("Please enter collected by !");
    }
  };
  const [selectedTest, setSelectedTest] = useState([]);
  const deliveryData = new FormData();
  deliveryData.append("invoiceNo", invoiceDetails.invoiceNo);
  deliveryData.append("patient_id", invoiceDetails.patient_id);
  deliveryData.append("deliveryTime", reportDeliveryInfo.deliveryTime);
  deliveryData.append("deliveryDate", reportDeliveryInfo.deliveryDate);
  deliveryData.append("fileUpload", reportDeliveryInfo.fileUpload);
  deliveryData.append("followUpDate", reportDeliveryInfo.followUpDate);
  deliveryData.append("followUpComment", reportDeliveryInfo.followUpComment);
  deliveryData.append("testList", reportDeliveryInfo.testList.toString());
  deliveryData.append("remark", reportDeliveryInfo.remark);
  deliveryData.append("collectedBy", reportDeliveryInfo.collectedBy);
  const handleSubmit = () => {
    if (
      invoiceDetails.patient_first_name &&
      reportDeliveryInfo.deliveryTime &&
      reportDeliveryInfo.deliveryDate &&
      reportDeliveryInfo.testList.length > 0 &&
      reportDeliveryInfo.collectedBy
    ) {
      if (user?.isSuperAdmin) {
        if (selectedBranch) {
          deliveryData.append("saas_branch_id", selectedBranch?.value);
          deliveryData.append("saas_branch_name", selectedBranch?.label);
        } else {
          toast.error("Please select branch !");
          return;
        }
      }
      axios.post("save-delivery-info", deliveryData).then((res) => {
        console.log(res, "delivery res");
        if (res.status === 200) {
          swal("Success", res.data.message, "success");
          selectedTest.map((test) => {
            axios
              .post(`lab-agent-report-delivery/${test.id}`, {
                deliveryStatus: 1,
              })
              .then((res) => console.log(res));
          });
          clearInvoice();
        }
      });
    } else {
      getError();
    }
  };
  const handlePrint = () => {
    if (
      invoiceDetails.patient_first_name &&
      reportDeliveryInfo.deliveryTime &&
      reportDeliveryInfo.deliveryDate &&
      reportDeliveryInfo.testList.length > 0 &&
      reportDeliveryInfo.collectedBy
    ) {
      handleLabAgentDeliveryPrint();
      handleSubmit();
    } else {
      getError();
    }
  };

  console.log(selectedTest, "selected");
  return (
    <section className="m-2">
      <div className="patients-head custom-card d-flex justify-content-between align-items-center">
        <h6 className="ml-3 text-start mb-1 text-login py-2">
          Report Delivery
        </h6>
        {Number(invoiceDetails.due) > 0 && (
          <Link to={`/lab-agent-payment-receive/${invoiceDetails.id}`}>
            <button
              style={{ maxHeight: "30px" }}
              className="custom-bg-color text-white float-end border-0 px-2 py-1 rounded me-2"
            >
              Pay Now
            </button>
          </Link>
        )}
      </div>
      <Row className="mt-2">
        {/* bar code and other info upload pannel */}
        <Col lg={9}>
          <div className="custom-card p-2">
            {/* bar code and searchbar */}
            <div className="d-flex justify-content-between align-center">
              <Barcode
                value={invoiceDetails.invoiceNo}
                height="30"
                fontSize="13"
                width="1"
              />
              <div className="main-parent-searchbar-container">
                <div className="">
                  <ReactSearchAutocomplete
                    showIcon={true}
                    placeholder={"Search Invoice"}
                    items={allInvoice}
                    maxResults={3}
                    resultStringKeyName="patient_first_name"
                    onClear={clearInvoice}
                    onSelect={(item) => {
                      setInvoiceDetails(item);
                    }}
                    fuseOptions={{
                      keys: ["invoiceNo", "patient_mobile_phone"],
                    }} // Search in the description text as well
                    styling={{
                      borderRadius: "5px !important",
                      zIndex: 3,
                      width: "100%",
                    }}
                  />
                </div>
                {/* show suggesstion  */}
                {/* <div className='suggestion-container'>
                                   <>You can show serach data list[user].implement map</>
                                </div> */}
              </div>
            </div>
            {/* user information*/}
            <div className="row row-cols-2">
              <p className="mb-0">
                PRN : <span>123-456-789</span>{" "}
              </p>
              <p className="mb-0">
                Age :{" "}
                <span>
                  {moment().diff(invoiceDetails?.patient?.patient_dob, "years")}
                </span>{" "}
              </p>
              <p className="mb-0">
                Name : <span>{invoiceDetails.patient_first_name}</span>{" "}
              </p>
              <p className="mb-0">
                Allergy : <span>N/L</span>{" "}
              </p>
              <p className="mb-0">
                Report Delivery Date :{" "}
                <span>{invoiceDetails.deliveryDate}</span>{" "}
              </p>
              <p className="mb-0">
                Time :{" "}
                <span>
                  {moment(`${invoiceDetails.deliveryTime}`, "HH:mm:ss").format(
                    "hh:mm:ss A"
                  )}
                </span>{" "}
              </p>
            </div>
          </div>
          <Row className="mt-2">
            {/* delivery date and time and also upload file */}
            <Col lg={6}>
              <form>
                {/* delivery date & time */}
                <div className="custom-card p-2">
                  {user?.isSuperAdmin && (
                    <div className=" mb-2">
                      <div className="row">
                        <div className="col-4">
                          <label
                            htmlFor="delivery-date"
                            className="form-label text-nowrap d-block pe-3 mt-2"
                          >
                            Branch :{" "}
                          </label>
                        </div>
                        <div className="col-8">
                          <SimpleSelect
                            placeholder="Select Branch"
                            options={orgBranch}
                            value={selectedBranch}
                            width="100%"
                            onChange={(data) => {
                              if (data) {
                                setSelectedBranch(data);
                              } else {
                                setSelectedBranch(null);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-4">
                        <label
                          htmlFor="delivery-date"
                          className="form-label text-nowrap d-block pe-3"
                        >
                          Delivery Date :{" "}
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="date"
                          name="deliveryDate"
                          onChange={handleReportDelivery}
                          id="delivery-date"
                          value={reportDeliveryInfo.deliveryDate}
                          className="form-control w-100 d-block"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <label
                        htmlFor="delivery-time"
                        className="form-label text-nowrap d-block pe-3"
                      >
                        Delivery Time :{" "}
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="time"
                        name="deliveryTime"
                        onChange={handleReportDelivery}
                        id="delivery-time"
                        value={reportDeliveryInfo.deliveryTime}
                        className="form-control w-100 d-block"
                      />
                    </div>
                  </div>
                </div>
                {/* file uploads and others*/}
                <div className="custom-card p-2 mt-2">
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-4">
                        <label
                          htmlFor="file-upload"
                          className="form-label text-nowrap d-block pe-3"
                        >
                          File Upload :{" "}
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="file"
                          id="file-upload"
                          onChange={(e) =>
                            setReportDeliveryInfo({
                              ...reportDeliveryInfo,
                              fileUpload: e.target.files[0],
                            })
                          }
                          className="form-control w-100 d-block"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-4">
                        <label
                          htmlFor="follow-up-date"
                          className="form-label text-nowrap d-block pe-3"
                        >
                          Next Follow Up Date :{" "}
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="date"
                          name="followUpDate"
                          onChange={handleReportDelivery}
                          id="follow-up-date"
                          className="form-control w-100 d-block"
                          placeholder="Example input placeholder"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-4">
                        <label
                          htmlFor="follow-up-date"
                          className="form-label text-nowrap d-block pe-3"
                        >
                          Collected By:{" "}
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          name="collectedBy"
                          onChange={handleReportDelivery}
                          id="follow-up-date"
                          className="form-control w-100 d-block"
                          placeholder="Enter collected by"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="row">
                      <div className="col-4">
                        <label
                          htmlFor="follow-up-date"
                          className="form-label text-nowrap d-block pe-3"
                        >
                          Remark:{" "}
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          name="remark"
                          onChange={handleReportDelivery}
                          id="follow-up-date"
                          className="form-control w-100 d-block"
                          placeholder="Enter remark"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" mb-2">
                    <div className="row">
                      <div className="col-4">
                        <label
                          htmlFor="follow-up"
                          className="form-label text-nowrap d-block pe-3"
                        >
                          Next Follow Up :{" "}
                        </label>
                      </div>
                      <div className="col-8">
                        <textarea
                          className="form-control"
                          name="followUpComment"
                          onChange={handleReportDelivery}
                          id="follow-up"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Col>
            {/* test and action */}
            <Col lg={6}>
              {/* test name */}
              <div className="custom-card p-2 ">
                <p className="text-center pb-1 mb-0 fw-bold">Test Name</p>
                <hr className="m-0" />
                {/* list down testlist */}
                <div className="test-down g-doc-scroll">
                  {allTest.map((test) => (
                    <div className="row">
                      <div className="col-10">
                        <div className="form-check chckbox-control">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={test.testName}
                            id={test.id}
                            disabled={
                              Number(invoiceDetails.due) > 0 ||
                              Number(test.deliveryStatus) === 1
                            }
                            onChange={(e) => {
                              const { value, checked } = e.target;
                              const newArr = [...reportDeliveryInfo.testList];
                              const selected = [...selectedTest];
                              if (checked) {
                                newArr.push(value);
                                selected.push(test);
                                setReportDeliveryInfo({
                                  ...reportDeliveryInfo,
                                  testList: newArr,
                                });
                                setSelectedTest(selected);
                              } else {
                                const filtered = newArr.filter(
                                  (item) => item !== value
                                );
                                const selectedFilter = selected.filter(
                                  (item) => item.id !== test.id
                                );
                                setReportDeliveryInfo({
                                  ...reportDeliveryInfo,
                                  testList: filtered,
                                });
                                setSelectedTest(selectedFilter);
                              }
                            }}
                          />
                          <label
                            className="form-check-label text-nowrap mx-0"
                            htmlFor={test.id}
                          >
                            {test.testName}
                          </label>
                        </div>
                      </div>
                      <div className="col-2">
                        <span className="float-end mt-2">
                          {Number(test.reportCollectionStatus) === 1 &&
                          Number(test.deliveryStatus) === 0 ? (
                            <span> Ready</span>
                          ) : (
                            Number(test.deliveryStatus) === 1 && (
                              <span> Delivered</span>
                            )
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action List */}
              {/* <div className='custom-card px-2 mt-2'>
                                <p className="text-center pb-1 mb-0 fw-bold">Action</p>
                                <hr className="m-0" />
                                {actionList.map((action) => (
                                    <div className="form-check chckbox-control">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={action.name}
                                            id={action._id}
                                        />
                                        <label
                                            className="form-check-label text-nowrap mx-0"
                                            htmlFor={action._id}
                                        >
                                            {action.name}
                                        </label>
                                    </div>
                                ))}

                            </div> */}
            </Col>
          </Row>
        </Col>
        {/* QR code & payment & collection details */}
        <Col lg={3}>
          {/* QR code Generate */}
          <div className="custom-card p-2 py-3 text-center">
            <div className="qr-container-patinet-details">
              <QRCode
                size={100}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={"Bilcolpo Clinic ,3-Dhakeshwari road"}
                level={"Q"}
                viewBox={`0 0 256 256`}
              />
            </div>
            <p className="fw-bold mb-0 text-center">Bilcolpo Clinic</p>
            <p className="text-center mb-0">3,Dhakeshwari road</p>
          </div>
          {/* payment details */}
          <div className="custom-card p-2 mt-2 py-3">
            <p className="text-center fw-bold mb-0">Payment Details</p>
            <hr className="m-0" />
            <>
              <p className="d-flex justify-content-between align-items-center mb-0 total-bill">
                <span>Total Bill -</span>
                <span>{invoiceDetails.totalBill}</span>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">
                  <span className="d-block">
                    {invoiceDetails.created_at?.slice(0, 10)}
                  </span>
                  <span className="d-block payment-name">
                    {invoiceDetails.paymentMethod}
                  </span>
                </p>
                <p className="mb-0">{invoiceDetails.paidAmount}</p>
              </div>
              <hr className="m-0" />
              <p className="d-flex justify-content-between align-items-center mb-0">
                <span>Due</span>
                <span>{Number(invoiceDetails.due)}</span>
              </p>
            </>
          </div>
          {/* collection Detail */}
          <div className="custom-card p-2 py-3 mt-2">
            <p className="fw-bold mb-0 text-center">Collection Detail</p>
            <hr className="m-0" />
            <p className="d-flex justify-content-between align-items-center mb-0">
              <span>Agent Name : </span>
              <span>Carter Gouse</span>
            </p>
            <p className="d-flex justify-content-between align-items-center mb-0">
              <span>Agent ID : </span>
              <span>A-100-500</span>
            </p>
            <p className="d-flex justify-content-between align-items-center mb-0">
              <span>Collection By : </span>
              <span>Jaylon Saris</span>
            </p>
            <p className="d-flex justify-content-between align-items-center mb-0">
              <span>Collection Date : </span>
              <span>{new Date().toJSON().slice(0, 10)}</span>
            </p>
            <p className="d-flex justify-content-between align-items-center mb-0">
              <span>Collection Time : </span>
              <span>{moment().format("HH:mm:ss")}</span>
            </p>
          </div>
          <div className="d-flex justify-content-end align-items-center gap-2 mt-2">
            <button
              onClick={() => {
                handlePrint();
              }}
              type="button"
              className="custom-bg-color text-white border-0 px-2 py-1 rounded"
            >
              Print
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="custom-bg-color text-white border-0 px-2 py-1 rounded"
            >
              Save
            </button>
          </div>
        </Col>
      </Row>
      <div ref={componentRef} className="delivery-print-slip">
        <PrintReportDelivery tests={allTest} invoice={invoiceDetails} />
      </div>
    </section>
  );
};

export default ReportDelivery;
