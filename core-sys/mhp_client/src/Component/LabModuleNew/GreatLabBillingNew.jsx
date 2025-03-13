import React, { useState, useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { AiOutlinePlus } from "react-icons/ai";
import doctorIcon from "../../Images/doctor-icon.png";
import { toast } from "react-toastify";
// import NoImages from '../../../Images/dummy_images.svg';
import NoImages from "../../Images/dummy_images.svg";
// payment icon import
import cashIcon from "../../Images/money.png";
import creditDebitCard from "../../Images/credit-debit-card.png";
import digitalPayment from "../../Images/digital-payment.png";

import closeFull from "../../Images/close_full_Screen.png";
import openFull from "../../Images/open_full_Screen.png";

// import PrintLabAgentBilling from "./PrintLabAgentBilling";
import { useReactToPrint } from "react-to-print";
//for QR code user info
import QRCode from "react-qr-code";
import ReactModal from "react-modal";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import swal from "sweetalert";
import PrintLabAgentBilling from "../LabAgent/PrintLabAgentBilling";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import Button from "../../common/components/Button";
import useUserData from "../../hooks/useUserData";
import { getAllBranch } from "../../utils/getAllBranch";
import useCredentialURL from "../../hooks/useCredentialURL";
import ReactDatePicker from "react-datepicker";
import SimpleSelect from "../../common/components/SimpleSelect";
import "./GreatLabBilling.css";
import { NewModal } from "../../common/components/NewModal";
import Select from "react-select";
import { he, is } from "date-fns/locale";
import { set } from "date-fns";
import GreatLabDueCollection from "./components/GreatLabDueCollection";
import Find from "./components/Find";
import GreatLabInvoiceRefund from "./components/GreatLabInvoiceRefund";
import PrintGreatLabInvoice from "./components/PrintGreatLabInvoice";
import GreatLabInvoiceDetails from "./components/GreatLabInvoiceDetails";
const GreatLabBilling = () => {
  const [selected, setSelected] = useState("Self");
  const [referrer, setReferrer] = useState("Self");
  const [selectedPayment, setSelectedPayment] = useState("Cash");
  const [paymentOptionSelected, setPaymentOptionSelected] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [digitalPaymentNumber, setDigitalPaymentNumber] = useState("");
  const [isOpenForPaymentModal, setIsOpenForPaymentModal] = useState(false);
  const [moneyReceipt, setMoneyReceipt] = useState();
  const [newPatientInfo, setNewPatientInfo] = useState({
    hnNumber: "",
    firstName: "",
    mobileNo: "",
    email: "",
    patient_dob: "",
    bloodGroup: "",
    gender: "",
    address: "",
    image: "",
    saas_branch_id: "",
    saas_branch_name: "",
    age: "",
    days: "",
    months: "",
    years: "",
  });
  const [marketerDetails, setMarketerDetails] = useState({});
  const [marketerActive, setMarketerActive] = useState(false);

  const [testArr, setTestArr] = useState([]);
  const closeModalForPaymentModal = () => setIsOpenForPaymentModal(false);
  // Add Doctor

  //date and time
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  // const [time, setTime] = useState(moment().format("HH:mm:ss"));
  const [time, setTime] = useState(moment("19:00", "HH:mm").format("HH:mm:ss"));

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
  const [inventoryItems, setInventoryItems] = useState([]);
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const [selectedBranch, setSelectedBranch] = useState(null);
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

  //handle keydown
  const handleAddTest = (e, type) => {
    if (type === "test") {
      let alreadyExist = false;
      const newTest = [...testArr];

      newTest.map((item) => {
        if (item.id === e.id) {
          alreadyExist = true;
        }
      });
      if (!alreadyExist) {
        // something happened
        newTest.push({ ...e, code: "test" });
      } else {
        toast.error("Test already added!");
      }
      setTestArr(newTest);
    } else {
      let alreadyExist = false;
      const newItems = [...inventoryItems];

      newItems.map((item) => {
        if (item.id === e.id) {
          alreadyExist = true;
        }
      });
      if (!alreadyExist) {
        // something happened
        newItems.push({ ...e, discount: 0, quantity: 1 });
      }
      setInventoryItems(newItems);
    }
  };
  const handleQty = (e, i) => {
    const value = e.target.value;
    const newItems = [...inventoryItems];
    if (parseFloat(value) > -1) {
      newItems[i].quantity = value;
      setInventoryItems(newItems);
    }
  };
  //get sub total balance
  let subTotal = 0;

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      height: "450px",
      top: "0%",
      zIndex: 99,
    },
  };
  // patient details
  const [patientDetails, setPatientDetails] = useState({
    patient_first_name: "",
    patient_middle_name: "",
    patient_last_name: "",
    patient_hn_number: "",
    patient_phone_number: "",
  });
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
    setNewPatientInfo(
      {
        hnNumber: "",
        firstName: "",
        mobileNo: "",
        email: "",
        patient_dob: "",
        bloodGroup: "",
        gender: "",
        address: "",
        image: "",
        saas_branch_id: "",
        saas_branch_name: "",
        age: "",
        days: "",
        months: "",
        years: "",
      }
    );
    setSelected("Self");
    setReferrer("");
    setTestName("");
    setSearchPatientName("");
    setSelectedPayment("Cash");
    setPaymentOptionSelected("");
    setCardNumber("");
    setExpireDate("");
    setDigitalPaymentNumber("");
    setTestArr([]);
    setReturnAmount(0);
    setDueAmount(0);
    setPaidAmount(0);
    setSpecialDiscount(0);
    setIsSpecialDiscount(false);
    setInventoryItems([]);
    setMarketerActive(false);
    setMarketerDetails({});
    setSearchTextMarketer("");
    setPhoneNumber("");
    clearBillingSearch();
    clearBillingSearchDoctor();
    clearBillingSearchMarketer();
  };
  // new patient registration
  const [genderList, setGenderList] = useState([]);
  const [bloodGroupList, setBloodGroupList] = useState([]);
  const [testList, setTestList] = useState([]);
  const [testListSorted, setTestListSorted] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [inventoryList, setInventoryList] = useState([]);
  const [userData, setUserData] = useState({});
  const [testCategory, setTestCategory] = useState([]);
  const [marketer, setMarketer] = useState([]);
  const [center, setCenter] = useState({});
  const user = useUserData();

  useEffect(() => {
    let sub = false;
    if (!sub && user) {
      axios.get(`/great-lab-master-setup-data/${user?.id}`).then((res) => {
        setGenderList(res.data.gender);
        setBloodGroupList(res.data.blood_group);
        setInventoryList(res.data.inventories);
        setTestList(res.data.test_name);
        setTestListSorted(res.data.test_name);
        setDoctorList(res.data.doctors);
        setUserData(res?.data?.user);
        setTestCategory(res?.data?.test_category);
        setCenter(res?.data?.center);
      });
      patientList();
    }
    ReactModal.setAppElement("body");

    return () => {
      sub = true;
    }
  }, [user]);

  const patientList = () => {
    axios.get(`/patients-list-for-lab`).then(async (res) => {
      setAllPatients(res.data.patients);
    });
  }

  const reactSearchPatientRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmitForPatient = () => {

    if (!newPatientInfo.firstName) {
      toast.error("Please enter patient name");
      return;
    } else if (!phoneNumber) {
      toast.error("Please enter phone number");
      return;
    } else if (!newPatientInfo.gender) {
      toast.error("Please select gender");
      return;
    }

    const formData = new FormData();
    formData.append(
      "patient_first_name", newPatientInfo.firstName
    );
    formData.append("patient_mobile_phone", phoneNumber);
    formData.append("patient_dob", newPatientInfo.patient_dob || new Date());
    formData.append("age", newPatientInfo.age || 0);
    formData.append("ptn_blood_group_id", newPatientInfo.bloodGroup);
    formData.append("patient_birth_sex_id", newPatientInfo.gender);
    formData.append("patient_address1", newPatientInfo.address);
    formData.append("day", newPatientInfo.days || 0);
    formData.append("month", newPatientInfo.months || 0);
    formData.append("patient_status", "1");
    if (user?.isSuperAdmin) {
      formData.append("saas_branch_id", newPatientInfo.saas_branch_id);
      formData.append(
        "saas_branch_name",
        orgBranch?.find(
          (branch) =>
            Number(branch?.value) === Number(newPatientInfo?.saas_branch_id)
        )?.name
      );
    }
    axios.post(`/save-patients-for-lab`, formData).then((res) => {
      // Swal.fire("Patient Registration Successfully", "Success..!", "success");
      setNewPatientInfo({
        hnNumber: "",
        firstName: "",
        mobileNo: "",
        email: "",
        patient_dob: "",
        bloodGroup: "",
        gender: "",
        address: "",
        image: "",
        age: "",
      });
      setPhoneNumber("");
      setPatientDetails(res?.data?.patients)
      let patientDetails = res?.data?.patients;
      saveInvoice(patientDetails);
      patientList();

    });

  };
  // Patient Search and select
  const [suggestedPatients, setSuggestedPatients] = useState([]);
  const [patientActiveId, setPatientActiveId] = useState(0);
  const [searchPatientName, setSearchPatientName] = useState("");
  const [testName, setTestName] = useState("");
  const [focusHighlightId, setFocusHighlightId] = useState("addNewPatient");

  const [activeBtn, setactiveBtn] = useState("addNew");

  useEffect(() => {
    if (suggestedPatients.length > 0) {
      setPatientDetails(suggestedPatients[patientActiveId]);
    }
  }, [patientActiveId, suggestedPatients]);
  const [searchTextMarketer, setSearchTextMarketer] = useState("");
  const clearBillingSearchDoctor = () => {
    setReferrer("");
    setSearchText("");
  };
  const clearBillingSearchMarketer = () => {
    setMarketerDetails({});
    setSearchTextMarketer("");
  };
  const clearBillingSearch = () => {
    setPatientDetails({
      patient_images: "",
      patient_first_name: "",
      patient_middle_name: "",
      patient_last_name: "",
      patient_hn_number: "",
      patient_phone_number: "",
    });
    setactiveBtn("addNew");
  };

  const removeTest = (test, type) => {
    const existTest = [...testArr];
    const existInventory = [...inventoryItems];
    if (type === "test") {
      const filtered = existTest.filter((item) => item.id !== test.id);
      setTestArr(filtered);
    } else {
      const filtered = existInventory.filter((item) => item.id !== test.id);
      setInventoryItems(filtered);
    }
  };

  const [grandTotal, setGrandTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [specialDiscountType, setSpecialDiscountType] = useState("Percentage");
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);
  const [specialDiscount, setSpecialDiscount] = useState("");
  let totalInventory = inventoryItems.reduce((total, item) => {
    return total + parseFloat(item?.mrp) * parseFloat(item?.quantity);
  }, 0);

  const [discountPercentage, setdiscountPercentage] = useState(0)
  const handleSpecialPercentage = (e) => {
    if (specialDiscountType === "Fixed" && e.target.value.length > 0) {
      setSpecialDiscount(e.target.value);
      const v = (e.target.value / grandTotal) * 100;
      setdiscountPercentage(v)

    } else if (
      specialDiscountType === "Percentage" &&
      e.target.value.length > 0
    ) {
      setSpecialDiscount(
        ((grandTotal - totalInventory) * e.target.value) / 100
      );
      setdiscountPercentage(e.target.value)
    } else {
      setSpecialDiscount(0);
    }
  };
  const [paidAmount, setPaidAmount] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const discount = testArr.reduce(
    (total, current) =>
      total + (Number(current.fee) * Number(current.discount)) / 100,
    0
  );
  useEffect(() => {
    let inventoryTotal = inventoryItems.reduce((total, item) => {
      return total + parseFloat(item?.mrp) * parseFloat(item?.quantity);
    }, 0);
    const total = testArr.reduce(
      (total, current) => total + Number(current.fee),
      0
    );
    setGrandTotal(total + inventoryTotal - discount);
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
  }, [
    testArr,
    specialDiscount,
    paidAmount,
    grandTotal,
    allTotal,
    inventoryItems,
  ]);
  const getError = () => {
    if (!patientDetails.patient_first_name) {
      toast.error("Please select patient !");
    } else if (!selected) {
      toast.error("Please select referred by !");
    } else if (!testArr.length > 0) {
      toast.error("Please add test !");
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
  const [loading, setLoading] = useState(false);
  const saveInvoice = (patientDetails) => {
    setLoading(true);
    const data = {
      patient_id: patientDetails.id,
      patient_first_name: patientDetails.fullName,
      patient_mobile_phone: patientDetails.patient_mobile_phone,
      referredBy: selected,
      referrer: referrer,
      paymentMethod: selectedPayment,
      paymentOption: paymentOptionSelected,
      cardNumber: cardNumber,
      expireDate: expireDate,
      digitalPaymentNumber: digitalPaymentNumber,
      totalBill: grandTotal + discount,
      deliveryDate: date,
      deliveryTime: time,
      due: dueAmount,
      paidAmount: paidAmount,
      specialDiscount: specialDiscount,
      discount_percentage: discountPercentage,
      deliveryStatus: "",
      reportReadyStatus: "",
      reportCollectionStatus: "",
      sampleCollectionStatus: "",
      sampleCollectionDate: "",
      inventoryItems: inventoryItems,
      created_by: userData?.name,
      created_by_id: user?.id,
      tests: testArr,
      discount: discount,
      marketer: marketerDetails?.id,
      returnAmount: returnAmount,
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
    if (selected === "doctor" && !data?.referrer) {
      setLoading(false);
      return toast.error("Please select doctor or select self");
    }
    if (
      patientDetails.patient_first_name &&
      data.patient_id !== null &&
      testArr.length > 0 &&
      data.deliveryDate &&
      data.deliveryTime &&
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
        axios.post("great-lab-invoice-add", data).then((res) => {
          //create money receipt
          if (res.status === 200) {
            setInvoiceNo(res?.data?.invoice?.invoiceNo);
            const info = {
              invoice_id: res?.data?.invoice?.id,
              due_amount: res?.data?.invoice?.due,
              age: moment().diff(patientDetails?.patient_dob, "years"),
              referredBy: res?.data?.invoice?.referrer,
              hn_number: patientDetails.patient_hn_number,
              name: patientDetails.fullName,
              invoice_number: res?.data?.invoice?.invoiceNo,
              requested_amount: grandTotal - specialDiscount,
              paid_amount: paidAmount,
              payment_date: new Date().toJSON().slice(0, 10),
              payment_time: new Date().toLocaleTimeString(),
              payment_method: selectedPayment,
              total_amount_paid: paidAmount,
              created_by: userData?.name,
              created_by_id: userData?.id,
            };

            axios.post("great-lab-save-money-receipt", info).then((res) => {
              setMoneyReceipt(res?.data?.receipt);
              handleLabAgentInfoPrint();
              setTimeout(() => {
                clearBilling();
              }, 100);
            });

            setLoading(false);
            swal("Success", res.data.message, "success").then((event) => {
              if (event) {
                setFocusHighlightId("searchPatientName");
                setIsOpenForPaymentModal(false);
              }
            });
            // setSearchPatientFocus(true);
            setIsOpenForPaymentModal(false);
          }
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
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchItems] = useState("test");
  const searchInputRef = useRef(null);
  useEffect(() => {
    if (focusHighlightId === "searchPatientName") {
      if (reactSearchPatientRef.current) {
        reactSearchPatientRef.current.focus();
        searchInputRef.current.focus();
      }
    }
  }, [focusHighlightId]);

  const calculateDateFromAge = (days = 0, months = 0, years = 0) => {
    const currentDate = new Date();

    // Subtract the provided values from the current date
    const calculatedDate = new Date(
      currentDate.getFullYear() - years,
      currentDate.getMonth() - months,
      currentDate.getDate() - days
    );

    // Check for invalid date
    if (isNaN(calculatedDate.getTime())) {
      return { error: "Invalid date input" };
    }

    return { date: calculatedDate };
  };
  const calculateAgeFromDate = (inputDate) => {
    const givenDate = new Date(inputDate);
    const currentDate = new Date();

    // Check for invalid date input
    if (isNaN(givenDate.getTime())) {
      return { error: "Invalid date input" };
    }

    // Calculate differences
    let years = currentDate.getFullYear() - givenDate.getFullYear();
    let months = currentDate.getMonth() - givenDate.getMonth();
    let days = currentDate.getDate() - givenDate.getDate();

    // Adjust for negative values in months and days
    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const previousMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  const handleAge = (days, months, years) => {
    const { date, error } = calculateDateFromAge(days, months, years);
    if (!error) {
      setNewPatientInfo({
        ...newPatientInfo,
        patient_dob: date,
        age: `${years || 0}`,
        days: days,
        months: months,
        years: years,
      });
    } else {
      console.error(error);
    }
  };
  const handleDate = (inputDate) => {
    const { years, months, days, error } = calculateAgeFromDate(inputDate);
    if (!error) {
      handleAge(days, months, years);
    }
  };
  const handleChangeCategory = async (category) => {
    if (category) {
      const sorted = testList.filter(
        (item) => Number(item?.test_category_id) === Number(category?.id)
      );
      setTestListSorted(sorted);
    } else {
      setTestListSorted(testList);
    }
  };
  const ReactSelectStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      borderRadius: "10px",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
      margin: "0px",
      padding: "0px",
      overflowX: "hidden",
      overflowY: "auto",
      maxHeight: "150px",
      // padding: "5px",
      "&::-webkit-scrollbar": {
        width: "7px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#cccccc",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#fcfcfc",
      },
      scrollbarWidth: "thin",
      scrollbarColor: "#cccccc #fcfcfc",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected || state.isFocused ? "#69B128" : provided.color,
      backgroundColor:
        state.isSelected || state.isFocused
          ? " #fcfcfc"
          : provided.backgroundColor,
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#69B128" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #69B128" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "#69B128" : provided.borderColor,
      },
    }),
  };

  const [showFullScreen, setShowFullScreen] = useState(true);
  const [ispreview, setispreview] = useState(false);
  const [dueCollectionModal, setdueCollectionModal] = useState(false)
  const [findModal, setfindModal] = useState(false)

  const [refundModal, setrefundModal] = useState(false)

  const handleCloserefundModal = () => {
    setrefundModal(false);
  };

  const handleCloseDueModal = () => {
    setdueCollectionModal(false);
  };
  const handleCloseFindModal = () => {
    setfindModal(false);
  };
  const [invoiceDetailsModals, setinvoiceDetailsModals] = useState(false)
  const handleCloseInvoiceDetailsModal = () => {
    setinvoiceDetailsModals(false);
  }
  return (
    <section className="m-2">
      <Row className="p-1 ">
        <div className=" patients-head custom-card mb-2 d-flex justify-content-between align-items-center">
          <h6 className="ml]s-3 text-start mb-1 text-login py-2">
            Smart Lab Billing
          </h6>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <Button onClick={() => window.open(window.location.href, "_blank")} style={{ padding: "3px 8px" }}>
              <AiOutlinePlus style={{ fontSize: "21px" }} />
            </Button>
            {showFullScreen ? (
              <img
                style={{ width: "21px", height: "21px", cursor: "pointer" }}
                onClick={() => {
                  document.body.requestFullscreen();
                  setShowFullScreen(!showFullScreen);
                }}
                src={openFull}
                alt=""
              />
            ) : (
              <img
                style={{ width: "21px", height: "21px", cursor: "pointer" }}
                width={"20px"}
                onClick={() => {
                  document.exitFullscreen();
                  setShowFullScreen(!showFullScreen);
                }}
                src={closeFull}
                alt=""
              />
            )}
          </div>
        </div>

        <div className="row mb-2">

          <div className="col-md-8 custom-card">
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between my-2 gap-2 p-2">

              <div className="row">
                <div className="col-md-3">

                  {
                    activeBtn === "addNew" ? <p className="text-muted info-head">Name <span className="text-danger">*</span> </p> : <p className="text-muted info-head">Name </p>

                  }

                  {
                    activeBtn === "addNew" ? (
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
                    ) : (
                      <p className="info-text font-size">
                        {patientDetails?.fullName || "N/A"}
                      </p>
                    )
                  }
                </div>
                <div className="col-md-3">
                  {
                    activeBtn === "addNew" ? <p className="text-muted info-head">Phone Number <span className="text-danger">*</span></p> : <p className="text-muted info-head">Phone Number</p>
                  }
                  {
                    activeBtn === "addNew" ? (
                      <PhoneInput
                        className="form-control"
                        defaultCountry="BD"
                        placeholder="Enter Mobile"
                        name="patient_mobile_phone"
                        required
                        style={{
                          width: "100%",
                          fontSize: "13px",
                        }}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                    ) : (
                      <p className="info-text font-size">
                        {patientDetails?.patient_mobile_phone || "N/A"}
                      </p>
                    )
                  }
                </div>

                <div className="col-md-3">
                  {
                    activeBtn === "addNew" ? <p className="text-muted info-head">Age <span className="text-danger">*</span></p> : <p className="text-muted info-head">Age</p>
                  }
                  {
                    activeBtn === "addNew" ? (
                      <div className="row">
                        <div className="col-sm-5">
                          <input
                            type="number"
                            name="age"
                            max={200}
                            className="form-control form-control-sm"
                            placeholder="Year"
                            value={newPatientInfo?.years}
                            onChange={(e) =>
                              handleAge(
                                newPatientInfo?.days || 0,
                                newPatientInfo?.months || 0,
                                e.target.value
                              )
                            }
                          />

                        </div>
                        <div className="col-sm-4">
                          <input
                            type="number"
                            name="age"
                            max={200}
                            className="form-control form-control-sm"
                            placeholder="Month"
                            value={newPatientInfo?.months}
                            onChange={(e) =>
                              handleAge(
                                newPatientInfo?.days || 0,
                                e.target.value,
                                newPatientInfo?.years || 0
                              )
                            }
                          />
                        </div>
                        <div className="col-sm-3 ">
                          <input
                            type="number"
                            name="age"
                            max={200}
                            className="form-control form-control-sm"
                            placeholder="Days"
                            value={newPatientInfo?.days}
                            onChange={(e) =>
                              handleAge(
                                e.target.value,
                                newPatientInfo?.months || 0,
                                newPatientInfo?.years || 0
                              )
                            }
                          />
                        </div>


                      </div>
                    ) : (
                      <p className="info-text font-size">
                        {moment().diff(patientDetails?.patient_dob, "years") || "N/A"}
                      </p>
                    )}
                </div>
                <div className="col-md-3">
                  <p className="text-muted info-head">Date of Birth</p>
                  {
                    activeBtn === "addNew" ? (
                      <ReactDatePicker
                        id="patient_dob"
                        placeholderText="DD/MM/YYYY"
                        selected={
                          newPatientInfo?.patient_dob
                            ? newPatientInfo?.patient_dob
                            : new Date()
                        }
                        dateFormat={"dd/MM/yyyy"}
                        name="requisition_no"
                        style={{ padding: "20px" }}
                        // onChange={(date) => {
                        //   calculateYearsFromDate(date);
                        // }}
                        onChange={(date) => {
                          handleDate(date);
                        }}
                      />
                    ) : (
                      <p className="info-text font-size">

                        {moment(patientDetails?.patient_dob).format("DD/MM/YYYY") == "Invalid date" ? "N/A" : moment(patientDetails?.patient_dob).format("DD/MM/YYYY")}
                      </p>
                    )
                  }
                </div>
                <div className="col-md-3 mt-2">
                  {
                    activeBtn === "addNew" ? <p className="text-muted info-head">Gender <span className="text-danger">*</span></p> : <p className="text-muted info-head">Gender</p>
                  }
                  {
                    activeBtn === "addNew" ? (
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
                              <option value={item.id} key={item?.id}>
                                {item?.birth_sex_name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    ) : (
                      <p className="info-text font-size">
                        {patientDetails?.patient_birth_sex?.birth_sex_name || "N/A"}
                      </p>
                    )
                  }
                </div>

                <div className="col-md-3 mt-2">
                  <p className="text-muted info-head">Blood Group</p>
                  {
                    activeBtn === "addNew" ? (
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
                    ) : (
                      <p className="info-text font-size">
                        {patientDetails?.blood_group?.blood_group_name || "N/A"}
                      </p>
                    )



                  }
                </div>


                <div className="col-md-6 mt-2">
                  <p className="text-muted info-head">Address</p>
                  {
                    activeBtn === "addNew" ? (
                      <textarea
                        name="patient_address1"
                        value={newPatientInfo.address}
                        onChange={(e) =>
                          setNewPatientInfo({
                            ...newPatientInfo,
                            address: e.target.value,
                          })
                        }
                        className="form-control form-control-sm"
                        rows="2"
                        placeholder="Enter Address"
                      />
                    ) : (
                      <p className="info-text font-size">
                        {patientDetails?.patient_address1 || "N/A"}
                      </p>
                    )
                  }
                </div>

              </div>
              <div className="img-container">
                <QRCode
                  size={256}
                  style={{ height: "90px", maxWidth: "100%", width: "100%" }}
                  value={`${patientDetails?.fullName} - ${patientDetails?.patient_hn_number} `}
                  level={"Q"}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
          <div style={{
            width: "32.72%", marginLeft: "10px", padding: "0px 15px"
          }} className=" custom-card">

            <div className="mt-2 row ">
              <div
                className={user?.isSuperAdmin ? "col-8" : "col-12"}

              >
                <ReactSearchAutocomplete
                  showIcon={false}
                  ref={reactSearchPatientRef}
                  inputRef={searchInputRef}
                  placeholder={
                    "Search Patients with HN Number, Name or Mobile Number"
                  }
                  items={allPatients}
                  onClear={clearBillingSearch}
                  // autoFocus
                  inputSearchString={searchPatientName || ""}
                  onSearch={(value) => {
                    if (value === "") {
                      clearBillingSearch("")
                    }
                    setSearchPatientName(value)
                  }}
                  // autoFocus={searchPatientFocus}
                  onFocus={(e) => {
                    if (e.type === "focus") {

                      setFocusHighlightId("searchPatientName");
                    } else {
                      setFocusHighlightId("");
                    }
                  }}
                  className="form__control"
                  formatResult={(item) => {
                    return (
                      <div
                        // ref={searchRef}
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
                              {item?.fullName}
                            </p>
                            <p
                              style={{
                                fontSize: "10px",
                                margin: "0px",
                                fontWeight: "600",
                                padding: "0px",
                              }}
                            >
                              {item?.patient_mobile_phone}
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
                          {item?.patient_hn_number}
                        </p>
                      </div>
                    );
                  }}
                  resultStringKeyName="fullName"
                  onHover={(item) => setPatientDetails(item)}
                  onSelect={(item) => {
                    setactiveBtn("search");
                    setPatientDetails(item);
                  }}
                  maxResults={5}
                  fuseOptions={{
                    keys: [
                      "patient_hn_number",
                      "patient_mobile_phone",
                      "patient_first_name",
                      "patient_hn_number",
                      "patient_middle_name",
                      "patient_last_name",
                      "fullName",
                    ],
                  }} // Search in the description text as well
                  styling={{
                    borderRadius: "5px !important",
                    zIndex:
                      modalIsOpen || isOpenForPaymentModal ? "auto" : "20",
                    width: "100%",
                    height: "45px",
                    boxShadow: "0 0 0 1px grey",
                    border:
                      focusHighlightId === "searchPatientName"
                        ? "2px solid #69b128"
                        : "2px solid grey",
                  }}
                >
                  {(inputProps, inputRef) => (
                    <input
                      {...inputProps}
                      className="react__search__input"
                      ref={(el) => {
                        inputRef(el);
                        searchInputRef.current = el;
                      }}
                    />
                  )}
                </ReactSearchAutocomplete>
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
                    style={{
                      padding: "10px 10px",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <p className="fw-bold info-head pt-1">Referred by: </p>
                <select
                  className="form-select form-select-sm"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="self" selected>Self</option>
                  <option value="doctor">Doctor</option>
                  <option value="other">Other</option>

                </select>
              </div>
              <div className="col-md-8">

                {selected === "doctor" && (
                  <div style={{ width: "331px", marginTop: "20px" }}>
                    <ReactSearchAutocomplete
                      showIcon={false}
                      placeholder={"Search Doctor with ID or Name "}
                      items={doctorList}
                      onClear={clearBillingSearchDoctor}
                      inputSearchString={searchText || ""}
                      onSearch={(value) => setSearchText(value)}
                      onFocus={(e) => {
                        if (e.type === "focus") {
                          setFocusHighlightId("searchDoctor");
                        } else {
                          setFocusHighlightId("");
                        }
                      }}
                      //autoFocus
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
                      }} // Search in the description text as well
                      styling={{
                        borderRadius: "5px !important",
                        zIndex:
                          focusHighlightId === "searchPatientName" || modalIsOpen || isOpenForPaymentModal ? "0" : "100",
                        width: "50%",
                        border:
                          focusHighlightId === "searchDoctor"
                            ? "2px solid #69b128"
                            : "1px solid #dedede",
                      }}
                    />
                  </div>
                )}
                {
                  selected === "other" && (
                    <div style={{ width: "331px", marginTop: "20px" }}>
                      <textarea
                        name="non_coded_doctor"
                        onChange={(e) => setReferrer(e.target.value)}
                        className="form-control form-control-sm"
                        rows="4"
                        placeholder="Enter doctor details like  Dr. Emrul Hasan Jim MBBS, MACP (AMERICA),PGT (MEDICINE)"
                      />
                    </div>
                  )
                }
              </div>
            </div>


          </div>
        </div>

        <Col lg={12} className="">

          {/* test area */}
          <div>
            <div className="row">
              <div className="custom-card p-1">
                <div className="d-flex mb-1">
                  <div className="radio-container mx-3">
                    <div
                      style={{
                        border:
                          focusHighlightId === "searchType"
                            ? "2px solid green"
                            : "none",
                      }}
                      className="d-flex"
                    >
                      <input
                        type="radio"
                        name="searchType"
                        value="test"
                        id="searchType"
                        onFocus={(e) => {
                          if (e.type === "focus") {
                            setFocusHighlightId("searchType");
                          } else {
                            setFocusHighlightId("");
                          }
                        }}
                        checked={searchItems === "test"}
                        onChange={(e) => {
                          setSearchItems(e.target.value);
                          setTestName("");
                        }}
                      />
                      <label className="pt-1 pl-2" htmlFor="searchType">
                        Test Item
                      </label>
                    </div>
                  </div>
                  <div className="radio-container">
                    <div
                      style={{
                        border:
                          focusHighlightId === "inventory"
                            ? "2px solid green"
                            : "none",
                      }}
                      className="d-flex"
                    >
                      <input
                        type="radio"
                        name="searchType"
                        value="inventory"
                        onFocus={(e) => {
                          if (e.type === "focus") {
                            setFocusHighlightId("inventory");
                          } else {
                            setFocusHighlightId("");
                          }
                        }}
                        id="inventory"
                        checked={searchItems === "inventory"}
                        onChange={(e) => {
                          setSearchItems(e.target.value);
                          setTestName("");
                        }}
                      />
                      <label className="pt-1 pl-2" htmlFor="inventory">
                        Inventory Item
                      </label>
                    </div>
                  </div>
                </div>
                <div className="lab-agent-search col-12">
                  <div className="row">
                    <div className="col-8">
                      {searchItems === "test" ? (
                        <ReactSearchAutocomplete
                          showIcon={true}
                          placeholder={"Search Test"}
                          items={testListSorted}
                          resultStringKeyName="test_name"
                          inputSearchString={testName || ""}
                          onSearch={(value) => setTestName(value)}
                          onSelect={(item, type = "test") => {
                            handleAddTest(item, type);
                            setTestName("");
                          }}
                          formatResult={(item) => {
                            return (
                              <div
                                style={{ height: "25px" }}
                                className="d-flex me-4 justify-content-between align-items-center"
                              >
                                <p className="mt-3">{item?.test_name}</p>
                                <p className="mt-3">{item?.item_code}</p>
                                <p className="mt-3">{item?.fee}</p>
                              </div>
                            );
                          }}
                          maxResults={10}
                          onFocus={(e) => {
                            if (e.type === "focus") {
                              setFocusHighlightId("searchTest");
                            } else {
                              setFocusHighlightId("");
                            }
                          }}
                          fuseOptions={{ keys: ["test_name", "item_code"] }} // Search in the description text as well
                          styling={{
                            borderRadius: "5px !important",
                            zIndex:
                              modalIsOpen || isOpenForPaymentModal
                                ? "auto"
                                : "auto",
                            width: "100%",
                            border:
                              focusHighlightId === "searchTest"
                                ? "2px solid #69b128"
                                : "1px solid #dedede",
                          }}
                        />
                      ) : (
                        <ReactSearchAutocomplete
                          showIcon={true}
                          placeholder={"Search Inventory"}
                          items={inventoryList}
                          resultStringKeyName="name"
                          onFocus={(e) => {
                            if (e.type === "focus") {
                              setFocusHighlightId("searchInventory");
                            } else {
                              setFocusHighlightId("");
                            }
                          }}
                          inputSearchString={testName || ""}
                          onSearch={(value) => setTestName(value)}
                          onSelect={(item, type = "inventory") => {
                            handleAddTest(item, type);
                            setTestName("");
                          }}
                          formatResult={(item) => {
                            return (
                              <div
                                style={{ height: "25px" }}
                                className="d-flex me-4 justify-content-between align-items-center"
                              >
                                <p className="mt-3">{item?.name}</p>
                                <p className="mt-3">{item?.mrp}</p>
                              </div>
                            );
                          }}
                          maxResults={5}
                          fuseOptions={{ keys: ["name", "item_code"] }} // Search in the description text as well
                          styling={{
                            borderRadius: "5px !important",
                            zIndex:
                              modalIsOpen || isOpenForPaymentModal
                                ? "auto"
                                : "0",
                            width: "100%",
                            border:
                              focusHighlightId === "searchInventory"
                                ? "2px solid #69b128"
                                : "1px solid #dedede",
                          }}
                        />
                      )}
                    </div>
                    <div className="col-4">
                      <Select
                        options={testCategory}
                        getOptionLabel={(option) => option?.test_category_name}
                        getOptionValue={(option) => option?.id}
                        onChange={handleChangeCategory}
                        isDisabled={searchItems !== "test" ? true : false}
                        isClearable
                        placeholder="Select Category"
                        styles={ReactSelectStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* test table */}
          <div style={{
            maxHeight: "520px",
            overflow: "hidden",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse"
          }}
            className="g-doc-scroll">
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
                  <td className="fw-bold">Qty</td>
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
                        <td>{test?.item_code}</td>
                        <td width={"45%"}>{test?.test_name}</td>
                        <td>{test?.fee}</td>
                        <td>
                          {test?.discount} <span>%</span>
                        </td>
                        <td>{amount}</td>
                        <td></td>
                        <td>{total}</td>
                        <td>
                          <button
                            tabIndex={-1}
                            onClick={() => removeTest(test, "test")}
                            className="btn  btn-sm action-btn"
                          >
                            <i className="far fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {inventoryItems.length > 0 &&
                  inventoryItems.map((item, i) => {
                    const total = item?.mrp * item?.quantity;
                    subTotal = subTotal + total;
                    return (
                      <tr key={item.id}>
                        <td>{item?.item_code}</td>
                        <td width={"45%"}>{item?.name}</td>
                        <td>{item?.mrp}</td>
                        <td>
                          {item?.discount} <span>%</span>
                        </td>
                        <td>0</td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="purchase_price"
                              onChange={(e) => handleQty(e, i)}
                              value={item?.quantity}
                              style={{ width: "60px", margin: "auto" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>{total}</td>
                        <td>
                          <button
                            tabIndex={-1}
                            onClick={() => removeTest(item, "inventory")}
                            className="btn  btn-sm action-btn"
                          >
                            <i className="far fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                <tr className="border-top">
                  <td colSpan={6} className="fw-bold text-end">
                    <span className="me-3">Sub Total</span>:
                  </td>
                  <td className="fw-bold">{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <h6 style={{ fontWeight: "bold", margin: "0px" }}>{user?.name}</h6>

            </div>
            <div className="d-flex gap-2 align-items-center">
              <h6 style={{ margin: "0px", color: "green", border: "1px solid green", padding: "5px 10px", borderRadius: "5px", background: "white", fontSize: "18px", fontWeight: "bold" }}>{testArr.length}</h6>

              <textarea style={{ margin: "0px", width: "218px", height: "34px", border: "1px solid green", padding: "4px 10px", borderRadius: "5px", background: "white", }} placeholder="Enter Your Comments"></textarea>

              <Button onClick={() => alert("UpComing Feature")} style={{ backgroundColor: "grey" }}>Summary</Button>
              <Button onClick={() => setfindModal(true)} style={{ backgroundColor: "tomato" }}>Find</Button>
              <Button onClick={() => setinvoiceDetailsModals(true)} style={{ backgroundColor: "orange" }}>Refund Slip</Button>
              <Button onClick={() => setrefundModal(true)} style={{ backgroundColor: "blue" }}>Refund</Button>
              <Button onClick={() => setdueCollectionModal(true)} style={{ backgroundColor: "black" }}>Due Collection</Button>
            </div>
            <div className="d-flex gap-2">
              <Button onClick={() => {
                clearBilling()
              }} style={{ backgroundColor: "red" }}>Clear</Button>
              <Button onClick={() => {
                setispreview(true)
                setTimeout(() => {
                  handleLabAgentInfoPrint()
                }, 1000);
              }} style={{ backgroundColor: "maroon" }}>Preview</Button>
              <Button
                onFocus={(e) => {
                  if (e.type === "focus") {
                    setFocusHighlightId("payment");
                  } else {
                    setFocusHighlightId("");
                  }
                }}
                onClick={() => {
                  if (testArr.length === 0) {
                    toast.error("Please add test !")
                    return;
                  }
                  setispreview(false)
                  setIsOpenForPaymentModal(true)
                }}
                style={{
                  backgroundColor: "#69b128",
                  color: "#fff",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border:
                    focusHighlightId === "payment"
                      ? "2px solid green"
                      : "none",
                }}
              >
                Payment
              </Button>
            </div>
          </div>

        </Col>
      </Row>
      {/* print lab agent billing info */}
      <div ref={componentRef}>
        <PrintGreatLabInvoice
          userInfo={patientDetails}
          tests={testArr}
          date={date}
          time={time}
          specialDiscount={specialDiscount}
          discount_percentage={discountPercentage}
          grandTotal={grandTotal}
          dueAmount={dueAmount}
          moneyReceipt={moneyReceipt}
          selected={
            selected === "doctor" ?
              doctorList?.find((item) => Number(item.id) === Number(referrer)) :
              referrer
          }
          invoiceNo={invoiceNo}
          paymentOptionSelected={paymentOptionSelected}
          center={center}
          slipTitle={ispreview ? "Preview Mode" : "Money Receipt"}
        />
      </div>
      {/* For Payment Modal */}
      <ReactModal
        style={{
          content: {
            ...customStyles?.content,
            height: "518px",
            marginTop: "5.5rem",
          },
        }}
        isOpen={isOpenForPaymentModal}
        // onRequestClose={closeModalForPaymentModal}
        onRequestClose={() => { }}
        appElement={document.getElementById("app")}
        contentLabel="Example Modal"
      >
        {/* payment and total balance calculation area */}
        <div>
          <Row>
            {/* payment area */}
            <Col lg={12}>
              <div className="custom-card p-2 my-2">
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
                      tabIndex={-1}
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
                        tabIndex={-1}
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
                              name="credit-debit"
                              value="Visa Card"
                              id="VisaCard"
                              checked={paymentOptionSelected === "Visa Card"}
                              onChange={changePaymentOptionSeleted}
                            />
                            <label className="pt-1 pl-2" htmlFor="VisaCard">
                              Visa
                            </label>
                          </div>
                        </div>
                        {/* master card */}
                        <div className="radio-container">
                          <div className="d-flex">
                            <input
                              type="radio"
                              name="credit-debit"
                              value="Master Card"
                              id="MasterCard"
                              checked={paymentOptionSelected === "Master Card"}
                              onChange={changePaymentOptionSeleted}
                            />
                            <label className="pt-1 pl-2" htmlFor="MasterCard">
                              Master Card
                            </label>
                          </div>
                        </div>
                        <div className="radio-container">
                          <div className="d-flex">
                            <input
                              type="radio"
                              name="credit-debit"
                              value="American Express"
                              id="AmericanExpress"
                              checked={
                                paymentOptionSelected === "American Express"
                              }
                              onChange={changePaymentOptionSeleted}
                            />
                            <label
                              className="pt-1 pl-2"
                              htmlFor="AmericanExpress"
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
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label for="card-expire-date">Expired Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="card-expire-date"
                            onChange={(e) => setExpireDate(e.target.value)}
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
                        name="method"
                        value="digital-payment"
                        id="digital-payment"
                        checked={selectedPayment === "digital-payment"}
                        onChange={changeSelectedHandler}
                      />
                      <label className="pt-1 pl-2" htmlFor="digital-payment">
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
                              name="digital-payment"
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
                              name="digital-payment"
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
                              name="digital-payment"
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
              </div>
            </Col>
            <Row>
              <Col lg={6}>
                {/* sub total */}
                <div className="custom-card p-2 mb-2">
                  <ul className="pl-0">
                    <li className="d-flex justify-content-between align-items-center px-2">
                      <span className="text-muted ">Sub Total</span>
                      <span>{grandTotal}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center px-2">
                      <div className="d-flex">
                        <span className="invoice-sub-item">
                          Special Discount
                          <input
                            type="checkbox"
                            onChange={() => {
                              setIsSpecialDiscount(!isSpecialDiscount);
                              setSpecialDiscount(0);
                            }}
                            className="form-check-input ms-1 mt-1"
                          />
                        </span>
                        {specialDiscountType === "Fixed" && <p className="ms-5">{discountPercentage}%</p>}
                      </div>

                      <span className="invoice-item-price text-end w-50">
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
                                  setSpecialDiscountType("Percentage");
                                  setSpecialDiscount(0);
                                  setdiscountPercentage(0)
                                }}
                                type="radio"
                                name="disc"
                                defaultChecked={
                                  specialDiscountType === "Percentage" && true
                                }
                              />
                              <label>Percentage</label>
                            </div>
                            <div>
                              <input
                                onChange={() => {
                                  setSpecialDiscountType("Fixed");
                                  setSpecialDiscount(0);
                                  setdiscountPercentage(0)
                                }}
                                type="radio"

                                name="disc"
                              />
                              <label>Fixed</label>
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
                            onChange={(e) => {
                              const { value } = e.target;
                              if (parseFloat(value) <= parseFloat(grandTotal - specialDiscount)) {
                                setPaidAmount(e.target.value)
                              } else {
                                toast.error("Paid amount should not be greater than due amount");
                              }
                            }}
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
              </Col>
              <Col lg={6}>
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
                <div className="d-flex flex-grow justify-content-end align-items-end gap-1 mt-2">
                  <Button onClick={() => setIsOpenForPaymentModal
                    (false)} style={{ backgroundColor: "red" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (activeBtn === "addNew") {
                        handleSubmitForPatient();
                      } else {
                        saveInvoice(patientDetails)
                      }
                    }}
                    disabled={loading}
                    onFocus={(e) => {
                      if (e.type === "focus") {
                        setFocusHighlightId("print");
                      } else {
                        setFocusHighlightId("");
                      }
                    }}
                    style={{
                      backgroundColor: loading ? "gray" : "#69b128",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: loading ? "not-allowed" : "pointer",
                      border:
                        focusHighlightId === "print"
                          ? "2px solid green"
                          : "none",
                    }}
                  // className="custom-bg-color text-white border-0 px-2 py-1 rounded"
                  >
                    {loading ? "Loading..." : " Save & Print"}
                  </Button>

                </div>
              </Col>
            </Row>
          </Row>
        </div>
        {/* button container */}
      </ReactModal>

      <GreatLabDueCollection
        search={true}
        isOpen={dueCollectionModal}
        onClose={handleCloseDueModal}

      />
      <Find isOpen={findModal} onClose={handleCloseFindModal} />
      <GreatLabInvoiceRefund
        isOpen={refundModal}
        onClose={handleCloserefundModal}
        search={true}
      />


      <GreatLabInvoiceDetails
        isOpen={invoiceDetailsModals}
        onClose={handleCloseInvoiceDetailsModal}
      />
    </section >
  );
};

export default GreatLabBilling;
