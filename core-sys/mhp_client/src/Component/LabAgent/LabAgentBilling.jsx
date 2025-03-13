import React, { useState, useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AiOutlinePlus } from "react-icons/ai";
import doctorIcon from "../../Images/doctor-icon.png";
import "./LabAgentBilling.css";
import { toast } from "react-toastify";
import NoImages from "../../Images/dummy_images.svg";
import Avatar from "@mui/material/Avatar";
// payment icon import
import cashIcon from "../../Images/money.png";
import creditDebitCard from "../../Images/credit-debit-card.png";
import digitalPayment from "../../Images/digital-payment.png";
import ePayment from "../../Images/e-payment.png";
import eWallet from "../../Images/e-wallet.png";
import PrintLabAgentBilling from "./PrintLabAgentBilling";
import { useReactToPrint } from "react-to-print";
//for QR code user info
import QRCode from "react-qr-code";
import ReactModal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { nullParser } from "../../utils/null-parser";
import { NewModal } from "../../common/components/NewModal";
import Button from "../../common/components/Button";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import useUserData from "../../hooks/useUserData";
import SimpleSelect from "../../common/components/SimpleSelect";
import ReactDatePicker from "react-datepicker";
const LabAgentBilling = () => {
  const [selected, setSelected] = useState("Self");
  const [referrer, setReferrer] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("Cash");
  const [testSuggestion, setTestSuggestion] = useState([]);
  const [paymentOptionSelected, setPaymentOptionSelected] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [digitalPaymentNumber, setDigitalPaymentNumber] = useState("");
  const [doctorSearchText, setDoctorSearchText] = useState("");
  const [isOpenForPaymentModal, setIsOpenForPaymentModal] = useState(false);
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [newPatientInfo, setNewPatientInfo] = useState({
    hnNumber: "",
    firstName: "",
    mobileNo: "",
    email: "",
    dob: "",
    bloodGroup: "",
    gender: "",
    address: "",
    image: "",
    saas_branch_id: "",
  });
  const user = useUserData();
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

  const [testArr, setTestArr] = useState([]);
  //date and time
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [time, setTime] = useState(moment().format("HH:mm:ss"));
  //print lab agent billing info
  const componentRef = useRef();
  const handleLabAgentInfoPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const changeSelectedHandler = (e) => {
    setSelectedPayment(e.target.value);
    setPaymentOptionSelected("");
  };

  const changePaymentOptionSeleted = (e) => {
    setPaymentOptionSelected(e.target.value);
  };
  //handle keydown
  const handleAddTest = (e) => {
    let alreadyExist = false;
    const newTest = [...testArr];

    newTest.map((item) => {
      if (item.id === e.id) {
        alreadyExist = true;
      }
    });
    if (!alreadyExist) {
      // something happened
      newTest.push({ ...e, discount: 10, code: "test" });
    }
    setTestArr(newTest);
  };
  //get sub total balance
  let subTotal = 0;

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      height: "450px",
      zIndex: 99,
    },
  };
  // patient details
  const [patientDetails, setPatientDetails] = useState({
    patient_images: "",
    patient_first_name: "",
    patient_middle_name: "",
    patient_last_name: "",
    patient_hn_number: "",
    patient_phone_number: "",
  });
  const [loading, setLoading] = useState(false);
  // clear billing page
  const clearBilling = () => {
    setPatientDetails({
      patient_images: "",
      patient_first_name: "",
      patient_middle_name: "",
      patient_last_name: "",
      patient_hn_number: "",
      patient_phone_number: "",
    });
    setTestName("");
    setSearchPatientName("");
    setSelected("");
    setReferrer("");
    setSelectedPayment("");
    setPaymentOptionSelected("");
    setCardNumber("");
    setExpireDate("");
    setDigitalPaymentNumber("");
    setTestSuggestion([]);
    setTestArr([]);
    setReturnAmount(0);
    setDueAmount(0);
    setPaidAmount(0);
    setSpecialDiscount(0);
    axios.get(`/lab-agent-all-invoice`).then(async (res) => {
      const randomNumber = `${res.data.invoice[0].id + 100001}`;
      setInvoiceNo(randomNumber);
    });
    axios.get(`/all-money-receipt`).then(async (res) => {
      if (res.status === 200) {
        const randomNumber = await `${res.data.receipt[0].id + 10001}`;
        setReceiptNo(randomNumber);
      }
    });
    setLoading(false);
  };
  // new patient registration
  const [genderList, setGenderList] = useState([]);
  const [bloodGroupList, setBloodGroupList] = useState([]);
  const [usualProviderList, setUsualProviderList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const [searchPatientName, setSearchPatientName] = useState("");
  useEffect(() => {
    axios.get(`/gender-dropdown`).then((res) => {
      if (res.data.status === 200) {
        setGenderList(res.data.gender);
      }
    });
    axios.get(`/blood-group`).then((res) => {
      if (res.data.status === 200) {
        setBloodGroupList(res.data.blood_group);
      }
    });
    axios.get(`/usual-provider`).then((res) => {
      if (res.data.status === 200) {
        setUsualProviderList(res.data.usual_provider);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setTestList(res.data.test_name);
      }
      axios.get(`/doctors`).then((res) => {
        if (res.data.status === 200) {
          setDoctorList(res.data.doctors);
        }
      });
    });

    axios.get(`/patients`).then(async (res) => {
      setNewPatientInfo({
        ...newPatientInfo,
      });
      setAllPatients(res.data.patients);
    });

    axios.get(`/lab-agent-all-invoice`).then(async (res) => {
      const randomNumber = `${res.data.invoice[0].id + 100001}`;
      setInvoiceNo(randomNumber);
    });

    axios.get(`/all-money-receipt`).then(async (res) => {
      if (res.status === 200) {
        const randomNumber = await `${res.data.receipt[0].id + 10001}`;
        setReceiptNo(randomNumber);
      }
    });
    ReactModal.setAppElement("body");
    return () => { };
  }, []);
  const [patientImageUrl, setPatientImageUrl] = useState("");
  const [patientImageError, setPatientImageError] = useState("");
  const handleImage = (event) => {
    if (event.target.files[0].size < 2000048) {
      setNewPatientInfo({ ...newPatientInfo, image: event.target.files[0] });
      setPatientImageError(null);
    } else {
      setPatientImageError("File size must be less than 2 mb !");
    }
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].size < 2000048
    ) {
      setPatientImageUrl(URL.createObjectURL(event.target.files[0]));
    } else {
      setPatientImageError("File size must be less than 2 mb !");
    }
  };
  const closeImage = () => {
    setPatientImageUrl("");
    document.getElementById("patientImage").value = "";
  };

  const handleSubmitForPatient = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newPatientInfo.image);
    formData.append("patient_hn_number", newPatientInfo.hnNumber);
    formData.append("patient_first_name", newPatientInfo.firstName);
    formData.append("patient_mobile_phone", newPatientInfo.mobileNo);
    formData.append("patient_email", newPatientInfo.email);
    formData.append("patient_dob", newPatientInfo.dob);
    formData.append("ptn_blood_group_id", newPatientInfo.bloodGroup);
    formData.append("patient_birth_sex_id", newPatientInfo.gender);
    formData.append("patient_address1", newPatientInfo.address);
    formData.append("patient_status", "1");

    if (user?.isSuperAdmin) {
      formData.append("saas_branch_id", newPatientInfo.saas_branch_id);
      formData.append(
        "saas_branch_name",
        orgBranch?.find(
          (branch) =>
            Number(branch.value) === Number(newPatientInfo?.saas_branch_id)
        )?.label
      );
    }

    if (newPatientInfo.gender && newPatientInfo.bloodGroup) {
      axios.post(`/save-patients`, formData).then((res) => {
        Swal.fire("Patient Registration Successfully", "Success..!", "success");
        setNewPatientInfo({
          hnNumber: "",
          firstName: "",
          mobileNo: "",
          email: "",
          dob: "",
          bloodGroup: "",
          gender: "",
          address: "",
          image: "",
        });
        axios
          .get(`/patients-profile/${res.data.patients?.id}`)
          .then((patientRes) =>
            setPatientDetails(patientRes.data.patients_details)
          );
      });

      closeImage();
      setModalIsOpen(false);
    } else {
      toast.error("Please fill out required fields!");
    }
  };
  // Patient Search and select
  const [suggestedPatients, setSuggestedPatients] = useState([]);
  const [patientActiveId, setPatientActiveId] = useState(0);
  useEffect(() => {
    if (suggestedPatients.length > 0) {
      setPatientDetails(suggestedPatients[patientActiveId]);
    }
  }, [patientActiveId, suggestedPatients]);
  const clearBillingSearch = () => {
    setPatientDetails({
      patient_images: "",
      patient_first_name: "",
      patient_middle_name: "",
      patient_last_name: "",
      patient_hn_number: "",
      patient_phone_number: "",
    });
  };
  const handlePrint = () => {
    setLoading(true);
    const data = {
      patient_id: patientDetails.id,
      patient_first_name: patientDetails.patient_first_name,
      patient_mobile_phone: patientDetails.patient_mobile_phone,
      referredBy: selected,
      referrer: referrer,
      paymentMethod: selectedPayment,
      paymentOption: paymentOptionSelected,
      cardNumber: cardNumber,
      expireDate: expireDate,
      digitalPaymentNumber: digitalPaymentNumber,
      totalBill: grandTotal,
      deliveryDate: date,
      deliveryTime: time,
      invoiceNo: invoiceNo ? invoiceNo : 100001,
      due: dueAmount,
      paidAmount: paidAmount,
      specialDiscount: specialDiscount,
      deliveryStatus: "",
      reportReadyStatus: "",
      reportCollectionStatus: "",
      sampleCollectionStatus: "",
      sampleCollectionDate: "",
      tests: testArr,
    };
    if (
      patientDetails.patient_first_name &&
      data.patient_id !== null &&
      testArr.length > 0 &&
      data.deliveryDate &&
      data.deliveryTime &&
      data.paidAmount > 0 &&
      data.paymentMethod
    ) {
      if (
        (selectedPayment === "credit-debit" &&
          paymentOptionSelected &&
          cardNumber &&
          expireDate) ||
        (selectedPayment === "digital-payment" &&
          paymentOptionSelected &&
          digitalPaymentNumber) ||
        selectedPayment === "Cash"
      ) {
        axios.post("lab-agent-invoice-add", data).then((res) => {
          //create money receipt
          if (res.status === 200) {
            const data = {
              money_receipt_number: receiptNo ? receiptNo : 10001,
              hn_number: patientDetails.patient_hn_number,
              name: patientDetails.patient_first_name,
              invoice_number: invoiceNo ? invoiceNo : 100001,
              requested_amount: grandTotal,
              paid_amount: paidAmount,
              payment_date: new Date().toJSON().slice(0, 10),
              payment_time: new Date().toLocaleTimeString(),
              payment_method: selectedPayment,
              total_amount_paid: paidAmount,
            };
            axios.post("save-money-receipt", data).then((res) => {
              if (res.data.status === 200) {
                // console.log(res.data.receipt)
              }
            });
          }
          if (res.status === 200 && testArr.length > 0) {
            // testArr.map((item) => {
            //   const testData = new FormData();
            //   testData.append("invoiceNo", invoiceNo ? invoiceNo : 100001);
            //   testData.append("testName", item.test_name);
            //   testData.append("testCode", item.id);
            //   testData.append("fee", item.fee);
            //   testData.append("discount", item.discount);
            //   testData.append("collectionDate", date);
            //   testData.append("testCategory", item.group?.test_group_name);
            //   testData.append("test_category_id", item.test_group_id);

            //   axios
            //     .post("lab-agent-invoice-detail-add", testData)
            //     .then((res) => {});
            // });
            handleLabAgentInfoPrint();
            clearBilling();
          }
          swal("Success", res.data.message, "success");
        });
      } else {
        getError();
      }
    } else {
      getError();
    }
  };
  const removeTest = (test) => {
    const existTest = [...testArr];
    const filtered = existTest.filter((item) => item.id !== test.id);
    setTestArr(filtered);
  };

  const [grandTotal, setGrandTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [specialDiscountType, setSpecialDiscountType] = useState("Fixed");
  const [isSpecialDiscount, setIsSpecialDiscount] = useState("");
  const [specialDiscount, setSpecialDiscount] = useState("");
  const handleSpecialPercentage = (e) => {
    if (specialDiscountType === "Fixed" && e.target.value.length > 0) {
      setSpecialDiscount(e.target.value);
    } else if (
      specialDiscountType === "Percentage" &&
      e.target.value.length > 0
    ) {
      setSpecialDiscount((grandTotal * e.target.value) / 100);
    } else {
      setSpecialDiscount(0);
    }
  };
  const [paidAmount, setPaidAmount] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [testName, setTestName] = useState("");

  useEffect(() => {
    const total = testArr.reduce(
      (total, current) => total + Number(current.fee),
      0
    );
    const discount = testArr.reduce(
      (total, current) =>
        total + (Number(current.fee) * Number(current.discount)) / 100,
      0
    );
    setGrandTotal(total - discount);
    setAllTotal(grandTotal - specialDiscount);
    setReturnAmount(grandTotal - specialDiscount);
    if (paidAmount >= allTotal) {
      setReturnAmount(paidAmount - allTotal);
      setDueAmount(0);
    }
    if (paidAmount <= allTotal) {
      setDueAmount(allTotal - paidAmount);
      setReturnAmount(0);
    }
  }, [testArr, specialDiscount, paidAmount, grandTotal, allTotal]);
  const getError = () => {
    if (!patientDetails.patient_first_name) {
      toast.error("Please select patient !");
    } else if (!selected) {
      toast.error("Please select referred by !");
    } else if (!testArr.length > 0) {
      toast.error("Please add test !");
    } else if (!paidAmount > 0) {
      toast.error("Please add paid amount !");
    } else if (!selectedPayment) {
      toast.error("Please select payment method !");
    } else if (selectedPayment === "credit-debit" && !paymentOptionSelected) {
      toast.error("Please select card !");
    } else if (
      selectedPayment === "credit-debit" &&
      paymentOptionSelected &&
      !cardNumber
    ) {
      toast.error("Please enter card number!");
    } else if (
      selectedPayment === "credit-debit" &&
      paymentOptionSelected &&
      cardNumber &&
      !expireDate
    ) {
      toast.error("Please enter card expire date!");
    } else if (
      selectedPayment === "digital-payment" &&
      !paymentOptionSelected
    ) {
      toast.error("Please select digital payment method !");
    } else if (
      selectedPayment === "digital-payment" &&
      paymentOptionSelected &&
      !digitalPaymentNumber
    ) {
      toast.error("Please enter digital payment method number!");
    }
  };
  const saveInvoice = () => {
    setLoading(true);
    const data = {
      patient_id: patientDetails?.id,
      patient_first_name: patientDetails?.fullName,
      patient_mobile_phone: patientDetails?.patient_mobile_phone,
      referredBy: selected,
      referrer: referrer,
      paymentMethod: selectedPayment,
      paymentOption: paymentOptionSelected,
      cardNumber: cardNumber,
      expireDate: expireDate,
      digitalPaymentNumber: digitalPaymentNumber,
      totalBill: allTotal,
      deliveryDate: date,
      deliveryTime: time,
      invoiceNo: invoiceNo ? invoiceNo : 100001,
      due: dueAmount,
      paidAmount: paidAmount,
      specialDiscount: specialDiscount,
      deliveryStatus: "",
      reportReadyStatus: "",
      reportCollectionStatus: "",
      sampleCollectionStatus: "",
      sampleCollectionDate: "",
      tests: testArr,
    };
    if (user?.isSuperAdmin) {
      if (selectedBranch?.value && selectedBranch?.label) {
        data.saas_branch_id = selectedBranch?.value;
        data.saas_branch_name = selectedBranch?.label;
      } else {
        setLoading(false);
        return toast.error("Please select branch");
      }
    }
    if (
      patientDetails.patient_first_name &&
      data.patient_id !== null &&
      testArr.length > 0 &&
      data.deliveryDate &&
      data.deliveryTime &&
      data.paidAmount > 0 &&
      data.paymentMethod
    ) {
      if (
        (selectedPayment === "credit-debit" &&
          paymentOptionSelected &&
          cardNumber &&
          expireDate) ||
        (selectedPayment === "digital-payment" &&
          paymentOptionSelected &&
          digitalPaymentNumber) ||
        selectedPayment === "Cash"
      ) {
        axios.post("lab-agent-invoice-add", data).then((res) => {
          //create money receipt
          if (res.status === 200) {
            const data = {
              money_receipt_number: receiptNo ? receiptNo : 10001,
              hn_number: patientDetails.patient_hn_number,
              name: patientDetails.patient_first_name,
              invoice_number: invoiceNo ? invoiceNo : 100001,
              requested_amount: allTotal,
              paid_amount: paidAmount,
              payment_date: new Date().toJSON().slice(0, 10),
              payment_time: new Date().toLocaleTimeString(),
              payment_method: selectedPayment,
              total_amount_paid: paidAmount,
            };
            axios.post("save-money-receipt", data).then((res) => {
              if (res.data.status === 200) {
                setLoading(false);
                setIsOpenForPaymentModal(false);
              }
            });
          }
          if (res.status === 200 && testArr.length > 0) {
            // testArr.map((item) => {
            //   const testData = new FormData();
            //   testData.append("invoiceNo", invoiceNo ? invoiceNo : 100001);
            //   testData.append("testName", item.test_name);
            //   testData.append("testCode", item.id);
            //   testData.append("fee", item.fee);
            //   testData.append("discount", item.discount);
            //   testData.append("collectionDate", date);
            //   testData.append("testCategory", item.group?.test_group_name);
            //   testData.append("test_category_id", item.test_group_id);

            //   axios
            //     .post("lab-agent-invoice-detail-add", testData)
            //     .then((res) => {
            //       setIsOpenForPaymentModal(false);
            //     });
            // });
            clearBilling();
          }
          swal("Success", res.data.message, "success");
        });
      } else {
        setLoading(false);
        getError();
      }
    } else {
      setLoading(false);
      getError();
    }
  };

  return (
    <section className="m-2">
      <div className="patients-head custom-card">
        <h6 className="ml-3 text-start mb-1 text-login py-2">
          Lab Agent Billing
        </h6>
      </div>
      <Row className="p-1 ">
        <Col className="custom-card p-3 sidebar-link" lg={2}>
          <p className="text-login list-head">Pathology</p>
          <ul className="list-unstyled">
            <li>Blood Sample</li>
            <li>Diabetics Check</li>
            <li>Blood Pressure</li>
          </ul>
        </Col>
        <Col lg={10} className="pl-3">
          {/* search bar */}
          <div className="row ">
            <div className="lab-agent-search col-9 row">
              <div className={user?.isSuperAdmin ? "col-8" : "col-12"}>
                <ReactSearchAutocomplete
                  showIcon={false}
                  placeholder={
                    "Search Patients with HN Number, Name or Mobile Number"
                  }
                  items={allPatients}
                  inputSearchString={searchPatientName || ""}
                  onSearch={(value) => setSearchPatientName(value)}
                  onClear={clearBillingSearch}
                  resultStringKeyName="fullName"
                  onHover={(item) => setPatientDetails(item)}
                  onSelect={(item) => {
                    setPatientDetails(item);
                  }}
                  autoFocus
                  formatResult={(item) => {
                    return (
                      <div
                        style={{
                          padding: "3px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {item?.patient_images?.length > 0 ? (
                            <Avatar
                              src={`${global.img_url}/images/files/${item?.patient_images}`}
                              alt="avatar-img"
                            />
                          ) : (
                            <Avatar src={NoImages} alt="avatar-img" />
                          )}

                          <div>
                            <p
                              style={{
                                fontWeight: "normal",
                                fontSize: "14px",
                                margin: "0px",
                                padding: "0px",
                              }}
                            >
                              {item.fullName}
                            </p>
                            <p
                              style={{
                                fontSize: "10px",
                                margin: "0px",
                                fontWeight: "600",
                                padding: "0px",
                              }}
                            >
                              {item.patient_mobile_phone}
                            </p>
                          </div>
                        </div>
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: "600",
                            padding: "0px",
                            margin: "0px 7px 0px 0px",
                          }}
                        >
                          {item.patient_hn_number}
                        </p>
                      </div>
                    );
                  }}
                  maxResults={5}
                  fuseOptions={{
                    keys: [
                      "patient_hn_number",
                      "fullName",
                      "patient_mobile_phone",
                      "patient_first_name",
                      "patient_middle_name",
                      "patient_last_name",
                    ],
                  }} // Search in the description text as well
                  styling={{
                    borderRadius: "5px !important",
                    zIndex:
                      modalIsOpen || isOpenForPaymentModal ? "auto" : "20",
                    width: "100%",
                    height: "40px",
                  }}
                />
              </div>
              {user?.isSuperAdmin && (
                <div className="col-4 ">
                  <SimpleSelect
                    options={orgBranch || []}
                    value={selectedBranch}
                    onChange={(data) => {
                      if (data) {
                        setSelectedBranch(data);
                      } else {
                        setSelectedBranch(null);
                      }
                    }}
                    placeholder="Select Branch"
                    width="100%"
                  />
                </div>
              )}
            </div>
            <div className="col-3">
              <div className="d-flex  align-items-center justify-content-end">
                <Button
                  tabIndex={-1}
                  onClick={() => setModalIsOpen(true)}
                  className="d-flex align-items-center custom-bg-color text-white border-0 px-2 py-1 rounded"
                >
                  <AiOutlinePlus /> <span>Add New Patient</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between  custom-card my-2 gap-2 p-2">
            <div className="img-container">
              {patientDetails?.patient_images === "" ? (
                <img
                  src={NoImages}
                  className="mb-3 img-fluid"
                  tabIndex={-1}
                  alt="patient-img"
                />
              ) : (
                <img
                  tabIndex={-1}
                  className="mb-2 img-fluid"
                  alt="patient-img"
                  src={`${global.img_url}/images/files/${patientDetails.patient_images}`}
                />
              )}
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              <div className="col">
                <p className="text-muted info-head">Phone Number</p>
                <p className="info-text">
                  {nullParser(patientDetails?.patient_mobile_phone)
                    ? patientDetails?.patient_mobile_phone
                    : "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Name</p>
                <p className="info-text">
                  {nullParser(patientDetails?.fullName)
                    ? patientDetails.fullName
                    : "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Age</p>
                <p className="info-text">
                  {moment().diff(patientDetails?.patient_dob, "years") || "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Blood Group</p>
                <p className="info-text">
                  {nullParser(patientDetails?.blood_group?.blood_group_name)
                    ? patientDetails?.blood_group?.blood_group_name
                    : "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Gender</p>
                <p className="info-text">
                  {nullParser(patientDetails?.patient_birth_sex?.birth_sex_name)
                    ? patientDetails?.patient_birth_sex?.birth_sex_name
                    : "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Known Allergy</p>
                <p className="info-text">N/A</p>
              </div>
            </div>
            <div className="img-container">
              <QRCode
                size={256}
                tabIndex={-1}
                style={{ height: "90px", maxWidth: "100%", width: "100%" }}
                value={`${patientDetails?.fullName} - ${patientDetails?.patient_hn_number} `}
                level={"Q"}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
          {/* Refer section */}
          <div className="p-2 custom-card mb-2 d-flex gap-2">
            <p className="fw-bold info-head pt-1">Referred by: </p>
            {/* self */}
            <div className="radio-container">
              <div className="d-flex">
                <input
                  type="radio"
                  name="self"
                  value="Self"
                  id="self"
                  checked={selected === "Self"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label className="pt-1 pl-2" htmlFor="self">
                  Self
                </label>
              </div>
            </div>
            {/* doctors area */}

            <div className="radio-container">
              <div className="d-flex">
                <input
                  type="radio"
                  name="self"
                  value="doctor"
                  id="doctor"
                  checked={selected === "doctor"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label className="pt-1 pl-2" htmlFor="doctor">
                  Doctor
                </label>
              </div>
              {selected === "doctor" && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="lab-agent-search" style={{ width: "400px" }}>
                    <ReactSearchAutocomplete
                      showIcon={false}
                      placeholder={"Search Doctor with ID or Name "}
                      items={doctorList}
                      onClear={clearBillingSearch}
                      inputSearchString={doctorSearchText || ""}
                      onSearch={(value) => setDoctorSearchText(value)}
                      autoFocus
                      formatResult={(item) => {
                        return (
                          <div
                            style={{
                              padding: "3px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <div>
                                <p
                                  style={{
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                    margin: "0px",
                                    padding: "0px",
                                  }}
                                >
                                  <span className="me-1">
                                    {item?.title?.title_name}
                                  </span>
                                  {item?.fullName}
                                  <span className="ms-2">
                                    {item?.dr_identity_no}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    fontSize: "10px",
                                    margin: "0px",
                                    fontWeight: "600",
                                    padding: "0px",
                                  }}
                                >
                                  {item?.specialist?.specialists_name}
                                  <span className="ms-1">
                                    {item?.academic?.map((item) => (
                                      <span className="me-1">
                                        {item?.degree_id},
                                      </span>
                                    ))}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                      resultStringKeyName="fullName"
                      onSelect={(item) => {
                        setReferrer(item?.id);
                      }}
                      maxResults={1}
                      fuseOptions={{
                        keys: [
                          "dr_identity_no",
                          "dr_middle_name",
                          "dr_given_name",
                          "fullName",
                        ],
                      }}
                      styling={{
                        borderRadius: "5px !important",
                        zIndex:
                          modalIsOpen || isOpenForPaymentModal ? "auto" : "1",
                        width: "100%",
                      }}
                    />
                  </div>
                  <Link tabIndex={-1} to={"/new-doctors"}>
                    <img
                      className="icon pe-auto"
                      src={doctorIcon}
                      alt="doctor-icon"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
          {/* test area */}
          <div>
            <div className="row">
              <div className="lab-agent-search col-12">
                <ReactSearchAutocomplete
                  showIcon={true}
                  placeholder={"Search Test"}
                  items={testList}
                  resultStringKeyName="test_name"
                  onSelect={(item) => {
                    handleAddTest(item);
                  }}
                  maxResults={5}
                  formatResult={(item) => {
                    return (
                      <div
                        style={{ height: "25px" }}
                        className="d-flex me-4 justify-content-between align-items-center"
                      >
                        <p className="mt-3">{item?.test_name}</p>
                        <p className="mt-3">{item?.fee}</p>
                      </div>
                    );
                  }}
                  inputSearchString={testName || ""}
                  onSearch={(value) => setTestName(value)}
                  fuseOptions={{ keys: ["test_name"] }}
                  styling={{
                    borderRadius: "5px !important",
                    zIndex: modalIsOpen || isOpenForPaymentModal ? "auto" : "0",
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* test table */}
          <table className="cart-table border bg-white rounded">
            <tbody>
              <tr className="cart-table-head">
                <td className="fw-bold">Item Code</td>
                <td width={"35%"} className="fw-bold">
                  Test Name
                </td>
                <td className="fw-bold">Rate</td>
                <td className="fw-bold">Discount</td>
                <td className="fw-bold">Amount</td>
                <td className="fw-bold">Total</td>
                <td className="fw-bold">Action</td>
              </tr>
              {testArr.length > 0 &&
                testArr.map((test, i) => {
                  const amount =
                    (Number(test.fee) * Number(test.discount)) / 100;
                  const total = test.fee - amount;

                  // subTotal += total;
                  subTotal = subTotal + total;

                  return (
                    <tr key={test.id}>
                      <td>{test?.code}</td>
                      <td width={"45%"}>{test?.test_name}</td>
                      <td>{test?.fee}</td>
                      <td>
                        {test?.discount} <span>%</span>
                      </td>
                      <td>{amount}</td>
                      <td>{total}</td>
                      <td>
                        <button
                          tabIndex={-1}
                          onClick={() => removeTest(test)}
                          className="btn  btn-sm action-btn"
                        >
                          {" "}
                          <i className="far fa-trash"></i>{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="d-flex justify-content-end my-3">
            {testArr.length > 0 && patientDetails?.id && (
              <Button onClick={() => setIsOpenForPaymentModal(true)}>
                Payment
              </Button>
            )}
          </div>
          <NewModal
            isOpen={isOpenForPaymentModal}
            onClose={() => setIsOpenForPaymentModal(false)}
          >
            <NewModal.Header onClose={() => setIsOpenForPaymentModal(false)}>
              <NewModal.Title>Payment</NewModal.Title>
            </NewModal.Header>
            <NewModal.Body>
              {/* payment and total balance calculation area */}
              <div className="payment-area-lab-billing">
                <Row>
                  {/* payment area */}
                  <Col lg={8}>
                    <div className="custom-card p-2">
                      <h6>Payment</h6>
                      {/* cash */}
                      <div className="d-flex justify-content-between align-items-center payment-container rounded mb-1">
                        <div className="d-flex">
                          <input
                            type="radio"
                            name="method"
                            value="Cash"
                            id="cash"
                            checked={selectedPayment === "Cash"}
                            onChange={changeSelectedHandler}
                          />
                          <label className="pt-1 pl-2" htmlFor="cash">
                            Cash
                          </label>
                        </div>
                        <div className="d-flex justify-content-end align-items-center gap-1">
                          <img
                            className="cash-icon"
                            src={cashIcon}
                            alt="cash-icon"
                          />
                        </div>
                      </div>
                      {/* credit/debit */}
                      <div className="payment-container mb-1 pt-1 rounded">
                        <div className="d-flex justify-content-between align-items-center   mb-1">
                          <div className="d-flex">
                            <input
                              type="radio"
                              name="method"
                              value="credit-debit"
                              id="credit-debit"
                              checked={selectedPayment === "credit-debit"}
                              onChange={changeSelectedHandler}
                            />
                            <label className="pt-1 pl-2" htmlFor="credit-debit">
                              Credit / Debit Card
                            </label>
                          </div>
                          <div className="d-flex justify-content-end align-items-center gap-1">
                            <img
                              className="debit-credit-icon"
                              src={creditDebitCard}
                              alt="credit-debit-icon"
                            />
                          </div>
                        </div>
                        {/* payment option */}
                        {selectedPayment === "credit-debit" && (
                          <>
                            <div className="p-2  mb-2 d-flex gap-2">
                              <div className="radio-container">
                                <div className="d-flex">
                                  <input
                                    type="radio"
                                    name="visa"
                                    value="Visa Card"
                                    id="visa"
                                    checked={
                                      paymentOptionSelected === "Visa Card"
                                    }
                                    onChange={changePaymentOptionSeleted}
                                  />
                                  <label
                                    className="pt-1 pl-2"
                                    htmlFor="Visa Card"
                                  >
                                    Visa
                                  </label>
                                </div>
                              </div>
                              {/* master card */}
                              <div className="radio-container">
                                <div className="d-flex">
                                  <input
                                    type="radio"
                                    name="MasterCard"
                                    value="Master Card"
                                    id="MasterCard"
                                    checked={
                                      paymentOptionSelected === "Master Card"
                                    }
                                    onChange={changePaymentOptionSeleted}
                                  />
                                  <label
                                    className="pt-1 pl-2"
                                    htmlFor="Master Card"
                                  >
                                    Master Card
                                  </label>
                                </div>
                              </div>
                              <div className="radio-container">
                                <div className="d-flex">
                                  <input
                                    type="radio"
                                    name="AmericanExpress"
                                    value="American Express"
                                    id="AmericanExpress"
                                    checked={
                                      paymentOptionSelected ===
                                      "American Express"
                                    }
                                    onChange={changePaymentOptionSeleted}
                                  />
                                  <label
                                    className="pt-1 pl-2"
                                    htmlFor="American Express"
                                  >
                                    American Express
                                  </label>
                                </div>
                              </div>
                            </div>
                            {/* card form */}
                            <form className="d-flex justify-content-start gap-3">
                              <div className="form-group">
                                <label for="card-number">
                                  {paymentOptionSelected} Number
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="card-number"
                                  placeholder="Enter Card Number"
                                  onChange={(e) =>
                                    setCardNumber(e.target.value)
                                  }
                                />
                              </div>
                              <div className="form-group">
                                <label for="card-expire-date">
                                  Expired Date
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="card-expire-date"
                                  onChange={(e) =>
                                    setExpireDate(e.target.value)
                                  }
                                />
                              </div>
                            </form>
                          </>
                        )}
                      </div>

                      {/* digital payment */}
                      <div className="payment-container mb-1 pt-1 rounded">
                        <div className="d-flex justify-content-between align-items-center  mb-1">
                          <div className="d-flex">
                            <input
                              type="radio"
                              name="digital-payment"
                              value="digital-payment"
                              id="digital-payment"
                              checked={selectedPayment === "digital-payment"}
                              onChange={changeSelectedHandler}
                            />
                            <label
                              className="pt-1 pl-2"
                              htmlFor="digital-payment"
                            >
                              Digital Payment
                            </label>
                          </div>
                          <div className="d-flex justify-content-end align-items-center gap-1">
                            <img
                              className="payment-icon"
                              src={digitalPayment}
                              alt="digital-payment"
                            />
                          </div>
                        </div>
                        {/* payment option */}
                        {selectedPayment === "digital-payment" && (
                          <>
                            <div className="p-2  mb-2 d-flex gap-2">
                              <div className="radio-container">
                                <div className="d-flex">
                                  <input
                                    type="radio"
                                    name="method"
                                    value="Rocket"
                                    id="Rocket"
                                    checked={paymentOptionSelected === "Rocket"}
                                    onChange={changePaymentOptionSeleted}
                                  />
                                  <label className="pt-1 pl-2" htmlFor="Rocket">
                                    Rocket
                                  </label>
                                </div>
                              </div>
                              {/* master card */}
                              <div className="radio-container">
                                <div className="d-flex">
                                  <input
                                    type="radio"
                                    name="method"
                                    value="Nagad"
                                    id="Nagad"
                                    checked={paymentOptionSelected === "Nagad"}
                                    onChange={changePaymentOptionSeleted}
                                  />
                                  <label className="pt-1 pl-2" htmlFor="Nagad">
                                    Nagad
                                  </label>
                                </div>
                              </div>
                              <div className="radio-container">
                                <div className="d-flex">
                                  <input
                                    type="radio"
                                    name="method "
                                    value="BKash"
                                    id="BKash"
                                    checked={paymentOptionSelected === "BKash"}
                                    onChange={changePaymentOptionSeleted}
                                  />
                                  <label className="pt-1 pl-2" htmlFor="BKash">
                                    BKash
                                  </label>
                                </div>
                              </div>
                            </div>
                            {/*  form */}
                            <form className="d-flex justify-content-start gap-3">
                              <div className="form-group">
                                <label for="card-number">
                                  {paymentOptionSelected} {""}
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="card-number"
                                  placeholder="Payment Number"
                                  onChange={(e) =>
                                    setDigitalPaymentNumber(e.target.value)
                                  }
                                />
                              </div>
                            </form>
                          </>
                        )}
                      </div>
                      {/* e-wallet*/}
                      <div className="d-flex justify-content-between align-items-center payment-container rounded mb-1">
                        <div className="d-flex">
                          <input
                            type="radio"
                            name="e-wallet"
                            value="e-wallet"
                            id="e-wallet"
                            disabled
                            checked={selected === "e-wallet"}
                          />
                          <label className="pt-1 pl-2" htmlFor="e-wallet">
                            e-Wallet
                          </label>
                        </div>
                        <div className="d-flex justify-content-end align-items-center gap-1">
                          <img
                            className="payment-icon"
                            src={eWallet}
                            alt="e-wallet"
                          />
                        </div>
                      </div>
                      {/* e-payment*/}
                      <div className="d-flex justify-content-between align-items-center payment-container rounded mb-1">
                        <div className="d-flex">
                          <input
                            type="radio"
                            name="e-payment"
                            value="e-payment"
                            id="e-payment"
                            disabled
                            checked={selected === "e-payment"}
                          // onChange={changeHandler}
                          />
                          <label className="pt-1 pl-2" htmlFor="e-payment">
                            e-Payment
                          </label>
                        </div>
                        <div className="d-flex justify-content-end align-items-center gap-1">
                          <img
                            className="payment-icon"
                            src={ePayment}
                            alt="e-payment"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                  {/* balance calculation && time && date */}
                  <Col lg={4}>
                    {/* sub total */}
                    <div className="custom-card p-2 mb-2">
                      <ul className="pl-0">
                        <li className="d-flex justify-content-between align-items-center px-2">
                          <span className="text-muted ">Sub Total</span>
                          <span>{grandTotal}</span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center px-2">
                          <span className="invoice-sub-item">
                            Special Discount{" "}
                            <input
                              type="checkbox"
                              onChange={() => {
                                setIsSpecialDiscount(!isSpecialDiscount);
                                setSpecialDiscount(0);
                              }}
                              className="form-check-input ms-1"
                            />
                          </span>{" "}
                          <span className="invoice-item-price text-end w-50">
                            {" "}
                            {specialDiscount > 0
                              ? Math.round(specialDiscount)
                              : "0.00"}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center px-2">
                          {isSpecialDiscount && (
                            <div className="ms-1 special-discount-container p-1 row">
                              <div className="col-9">
                                <div>
                                  <input
                                    onChange={() => {
                                      setSpecialDiscountType("Fixed");
                                      setSpecialDiscount(0);
                                    }}
                                    type="radio"
                                    defaultChecked={
                                      specialDiscountType === "Fixed" && true
                                    }
                                    name="disc"
                                  />
                                  <label>Fixed</label>
                                </div>
                                <div>
                                  <input
                                    onChange={() => {
                                      setSpecialDiscountType("Percentage");
                                      setSpecialDiscount(0);
                                    }}
                                    type="radio"
                                    name="disc"
                                  />
                                  <label>Percentage</label>
                                </div>
                              </div>
                              <div className="col-3">
                                {specialDiscountType === "Fixed" && (
                                  <input
                                    type="number"
                                    value={specialDiscount}
                                    onChange={(e) => handleSpecialPercentage(e)}
                                    className="form-control form-control-sm mt-1"
                                  />
                                )}
                                {specialDiscountType === "Percentage" && (
                                  <input
                                    type="number"
                                    defaultValue={0}
                                    onChange={(e) => handleSpecialPercentage(e)}
                                    className="form-control form-control-sm mt-1"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </li>
                        <hr className="mb-0" />
                        <li className="d-flex justify-content-between align-items-center px-2 fw-bold mb-0">
                          <span>Total</span>
                          <span>{grandTotal - specialDiscount}</span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center px-2 fw-bold mb-0">
                          <div className="row">
                            <div className="col-9">
                              <span>Paid Amount</span>
                            </div>
                            <div className="col-3">
                              <input
                                type="number"
                                value={paidAmount}
                                onChange={(e) => setPaidAmount(e.target.value)}
                                className="form-control form-control-sm mt-1"
                              />
                            </div>
                          </div>
                        </li>
                        <hr className="mb-0" />
                        {dueAmount > 0 && (
                          <li className="d-flex justify-content-between align-items-center px-2 fw-bold mb-0">
                            <span>Due</span>
                            <span>{dueAmount}</span>
                          </li>
                        )}
                        {returnAmount >= 0 && dueAmount < 1 && (
                          <li className="d-flex justify-content-between align-items-center px-2 fw-bold mb-0">
                            <span>Return Amount</span>
                            <span>{returnAmount}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* Delivery Report  */}
                    <div className="custom-card p-2">
                      <Form>
                        <Form.Group
                          className="mb-1"
                          controlId="Delivery Report Date"
                        >
                          <Form.Label>Delivery Report Date</Form.Label>
                          <Form.Control
                            defaultValue={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-1"
                          controlId="Delivery Report Time"
                        >
                          <Form.Label>Delivery Report Time</Form.Label>
                          <Form.Control
                            defaultValue={time}
                            onChange={(e) => setTime(e.target.value)}
                            type="time"
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </NewModal.Body>
            <NewModal.Footer>
              {/* button container */}
              <div className="d-flex justify-content-end align-items-center gap-4 mt-2">
                {loading ? (
                  <>
                    <button className="custom-bg-color text-white border-0 px-2 py-1 rounded">
                      <i className="fas fa-check-circle"></i>
                    </button>

                    <button className="custom-bg-color text-white border-0 px-2 py-1 rounded">
                      Print
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={saveInvoice}
                      className="custom-bg-color text-white border-0 px-2 py-1 rounded"
                    >
                      Save Invoice
                    </button>

                    <button
                      onClick={handlePrint}
                      className="custom-bg-color text-white border-0 px-2 py-1 rounded"
                    >
                      Print
                    </button>
                  </>
                )}
              </div>
            </NewModal.Footer>
          </NewModal>
        </Col>
      </Row>
      {/* print lab agent billing info */}
      <div ref={componentRef}>
        <PrintLabAgentBilling
          userInfo={patientDetails}
          tests={testArr}
          date={date}
          time={time}
          selected={selected}
          grandTotal={grandTotal}
          invoiceNo={invoiceNo}
          paymentOptionSelected={paymentOptionSelected}
        />
      </div>
      <ReactModal
        style={customStyles}
        isOpen={modalIsOpen}
        appElement={document.getElementById("app")}
        contentLabel="Example Modal"
      >
        <div className="ml-1">
          <div className="card">
            <div className="vital-header patient_header ml-2 mt-3 px-3 ">
              <h5 className="card-title">Patient Registration</h5>
              <a onClick={() => setModalIsOpen(false)}>
                <i className="fas fa-times"></i>
              </a>
            </div>
            <div
              className="vital-setup-container row p-1 m-1 mt-3"
              style={{ backgrondColor: "#D4D4D4" }}
            >
              <div className="col-md-12 mt-3">
                <form onSubmit={handleSubmitForPatient}>
                  <div className="row mb-3">
                    <label for="colFormLabelSm" className="col-sm-2">
                      HN No. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        value={newPatientInfo.hnNumber}
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            hnNumber: e.target.value,
                          })
                        }
                        required
                        readOnly
                        className="form-control form-control-sm"
                        placeholder="Enter HN No"
                      />
                    </div>
                    <label for="colFormLabelSm" className="col-sm-2">
                      Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        value={newPatientInfo.firstName}
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            firstName: e.target.value,
                          })
                        }
                        required
                        className="form-control form-control-sm"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Mobile No. <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        name="patient_mobile_phone"
                        value={newPatientInfo.mobileNo}
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            mobileNo: e.target.value,
                          })
                        }
                        required
                        className="form-control form-control-sm"
                        placeholder="Enter Mobile No."
                      />
                    </div>
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="email"
                        name="patient_email"
                        value={newPatientInfo.email}
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            email: e.target.value,
                          })
                        }
                        required
                        className="form-control form-control-sm"
                        placeholder="Enter Email"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Date Of Birth <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <ReactDatePicker
                        id="patient_dob"
                        placeholderText="DD/MM/YYYY"
                        selected={
                          newPatientInfo.dob
                            ? new Date(newPatientInfo.dob)
                            : null
                        }
                        dateFormat={"dd/MM/yyyy"}
                        name="requisition_no"
                        style={{ padding: "20px" }}
                        onChange={(d) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            dob: d
                              ? moment(d).format("YYYY-MM-DD")
                              : new Date(),
                          })
                        }
                      />
                    </div>
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Blood Group <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="col-sm-4">
                      <select
                        className="form-select form-select-sm"
                        value={newPatientInfo.bloodGroup}
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            bloodGroup: e.target.value,
                          })
                        }
                        required
                        name="ptn_blood_group_id"
                        id="autoSizingSelect"
                      >
                        <option selected>Select Blood Group</option>

                        {bloodGroupList?.map((i) => {
                          return (
                            <option value={i.id} key={i.id}>
                              {i.blood_group_name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Gender <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className={`col-sm-${user?.isSuperAdmin ? "4" : "10"}`}
                    >
                      <select
                        className="form-select form-select-sm"
                        name="patient_birth_sex_id"
                        value={newPatientInfo.gender}
                        required
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            gender: e.target.value,
                          })
                        }
                        id="autoSizingSelect"
                      >
                        <option selected>Select Gender</option>
                        {genderList?.map((item) => {
                          return (
                            <>
                              <option value={item.id} key={item.id}>
                                {item.birth_sex_name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    {user?.isSuperAdmin && (
                      <>
                        <label
                          for="colFormLabelSm"
                          className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                        >
                          Branch <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-4">
                          <select
                            className="form-select form-select-sm"
                            name="patient_birth_sex_id"
                            value={newPatientInfo.saas_branch_id}
                            required
                            onChange={(e) =>
                              setNewPatientInfo({
                                ...newPatientInfo,
                                saas_branch_id: e.target.value,
                              })
                            }
                            id="saas_branch_id"
                          >
                            <option selected value={""}>
                              Select Branch
                            </option>
                            {orgBranch?.map((item) => {
                              return (
                                <>
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="row mb-2 P_Image">
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Address{" "}
                    </label>
                    <div className="col-sm-4">
                      <textarea
                        name="patient_address1"
                        value={newPatientInfo.address}
                        required
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            address: e.target.value,
                          })
                        }
                        className="form-control form-control-sm"
                        rows="3"
                        placeholder="Enter Address"
                      />
                    </div>
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Image
                    </label>
                    <div className="col-sm-4">
                      <input
                        className="form-control"
                        id="patientImage"
                        onChange={handleImage}
                        type="file"
                      />

                      {patientImageError === "" ? (
                        <p className="doc_image_size">
                          Image size must be less than 2 mb
                        </p>
                      ) : (
                        <p className="docimage_error">{patientImageError}</p>
                      )}
                    </div>
                    <div className="col-sm-4">
                      {patientImageUrl === "" ? (
                        ""
                      ) : (
                        <div className="docImage">
                          <img
                            src={patientImageUrl}
                            className="schedulePaitimage"
                            alt="preview image"
                          />
                          <i
                            onClick={closeImage}
                            className="far fa-times-circle"
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="submit" className="vaital-setup-btn float-end">
                    Save
                  </button>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="vaital-setup-btn-cancel float-end mr-2"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </section>
  );
};

export default LabAgentBilling;
