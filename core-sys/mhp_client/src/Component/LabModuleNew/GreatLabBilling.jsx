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
import PrintGreatLabInvoice from "./components/PrintGreatLabInvoice";
const GreatLabBilling = () => {
  const [selected, setSelected] = useState("Self");
  const [referrer, setReferrer] = useState("");
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
    patient_images: "",
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
    axios.get(`/great-lab-inventory`).then((res) => {
      if (res.data.status === 200) {
        setInventoryList(res.data.products);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        setTestList(res.data.test_name);
        setTestListSorted(res.data.test_name);
      }
    });
    axios.get(`/doctors`).then((res) => {
      if (res.data.status === 200) {
        setDoctorList(res.data.doctors);
      }
    });
    axios.get(`/get-user/${user?.id}`).then((res) => {
      setUserData(res?.data?.user);
    });
    axios.get(`/patients`).then(async (res) => {
      // setNewPatientInfo({
      //   ...newPatientInfo,
      // });
      setAllPatients(res.data.patients);
    });
    axios.get(`/new-test-category`).then(async (res) => {
      setTestCategory(res?.data?.test_category);
    });
    axios.get(`/marketers`).then(async (res) => {
      setMarketer(res?.data);
    });
    axios.get(`/lab-center-details`).then(async (res) => {
      setCenter(res?.data?.center);
    });

    ReactModal.setAppElement("body");
  }, [user]);
  const [patientImageUrl, setPatientImageUrl] = useState("");
  const [patientImageError, setPatientImageError] = useState("");
  const reactSearchPatientRef = useRef();
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

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmitForPatient = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newPatientInfo.image);
    formData.append("patient_hn_number", newPatientInfo.hnNumber);
    formData.append(
      "patient_first_name",
      patientDetails.fullName || newPatientInfo.firstName
    );
    formData.append("patient_mobile_phone", phoneNumber);
    formData.append("patient_email", newPatientInfo.email);
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

    if (newPatientInfo.gender) {
      axios.post(`/save-patients-for-lab`, formData).then((res) => {
        Swal.fire("Patient Registration Successfully", "Success..!", "success");
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
        axios
          .get(`/patients-profile/${res?.data?.patients?.id}`)
          .then((patientRes) =>
            setPatientDetails(patientRes?.data?.patients_details)
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
  const [searchPatientName, setSearchPatientName] = useState("");
  const [testName, setTestName] = useState("");
  const [focusHighlightId, setFocusHighlightId] = useState("");

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
  const [specialDiscountType, setSpecialDiscountType] = useState("Fixed");
  const [isSpecialDiscount, setIsSpecialDiscount] = useState(false);
  const [specialDiscount, setSpecialDiscount] = useState("");
  let totalInventory = inventoryItems.reduce((total, item) => {
    return total + parseFloat(item?.mrp) * parseFloat(item?.quantity);
  }, 0);
  const handleSpecialPercentage = (e) => {
    if (specialDiscountType === "Fixed" && e.target.value.length > 0) {
      setSpecialDiscount(e.target.value);
    } else if (
      specialDiscountType === "Percentage" &&
      e.target.value.length > 0
    ) {
      setSpecialDiscount(
        ((grandTotal - totalInventory) * e.target.value) / 100
      );
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
  console.log("testArr", returnAmount);
  const [loading, setLoading] = useState(false);
  const saveInvoice = () => {
    // alert("save invoice");
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
      console.log(paymentOptionSelected);
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
              console.log(res.data, "money receipt saved");
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

  // const handleBlur = () => {
  //   setSearchPatientFocus(false);
  // };
  //console.log(discount, "discount");
  useEffect(() => {
    if (focusHighlightId === "searchPatientName") {
      if (reactSearchPatientRef.current) {
        reactSearchPatientRef.current.focus();
        searchInputRef.current.focus();
      }
    }
  }, [focusHighlightId]);

  const calculateAge = (age) => {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    setNewPatientInfo({
      ...newPatientInfo,
      patient_dob: new Date(birthYear, 0, 1),
      age: age,
    });
  };

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
  console.log(newPatientInfo, "selected");
  return (
    <section className="m-2">
      <Row className="p-1 ">
        {/* <Col className="custom-card p-3 sidebar-link" lg={2}>
          <p className="text-login list-head">Pathology</p>
          <ul className="list-unstyled">
            <li>Blood Sample</li>
            <li>Diabetics Check</li>
            <li>Blood Pressure</li>
          </ul>
        </Col> */}
        <div className=" patients-head custom-card mb-2">
          <h6 className="ml]s-3 text-start mb-1 text-login py-2">
            Smart Lab Billing
          </h6>

        </div>

        <Col lg={12} className="">
          {/* search bar */}
          <div className="row ">
            <div className="lab-agent-search col-10 row">
              <div
                className={user?.isSuperAdmin ? "col-8" : "col-12"}
                style={{ paddingBottom: "-10px !important" }}
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
                  autoFocus
                  inputSearchString={searchPatientName || ""}
                  onSearch={(value) => setSearchPatientName(value)}
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
                    border:
                      focusHighlightId === "searchPatientName"
                        ? "2px solid #69b128"
                        : "",
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
                  />
                </div>
              )}
            </div>
            <div className="col-2">
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  onFocus={(e) => {
                    if (e.type === "focus") {
                      setFocusHighlightId("addNewPatient");
                    } else {
                      setFocusHighlightId("");
                    }
                  }}
                  style={{
                    backgroundColor: "#69b128",
                    color: "#fff",
                    padding: "10px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border:
                      focusHighlightId === "addNewPatient"
                        ? "2px solid green"
                        : "none",
                  }}
                  onClick={() => setModalIsOpen(true)}
                >
                  <AiOutlinePlus /> <span>Add New Patient</span>
                </Button>
              </div>
            </div>
          </div>
          {/* suggestion */}

          {/* user profile */}

          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between  custom-card my-2 gap-2 p-2">
            <div className="img-container">
              {patientDetails?.patient_images === "" ? (
                <img
                  src={NoImages}
                  className="mb-3 img-fluid"
                  alt="avatar-img"
                />
              ) : (
                <img
                  className="mb-2 img-fluid"
                  src={`${global.img_url}/images/files/${patientDetails?.patient_images}`}
                  alt="avatar-img"
                />
              )}
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              <div className="col">
                <p className="text-muted info-head">Phone Number</p>
                <p className="info-text">
                  {patientDetails?.patient_mobile_phone || "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Name</p>
                <p className="info-text">{patientDetails?.fullName || "N/A"}</p>
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
                  {patientDetails?.blood_group?.blood_group_name || "N/A"}
                </p>
              </div>
              <div className="col">
                <p className="text-muted info-head">Gender</p>
                <p className="info-text">
                  {patientDetails?.patient_birth_sex?.birth_sex_name || "N/A"}
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
              <div
                style={{
                  border:
                    focusHighlightId === "self" ? "2px solid green" : "none",
                }}
                className="d-flex"
              >
                <input
                  type="radio"
                  name="self"
                  value="Self"
                  onFocus={(e) => {
                    if (e.type === "focus") {
                      setFocusHighlightId("self");
                    } else {
                      setFocusHighlightId("");
                    }
                  }}
                  id="self"
                  style={{
                    "&:focus": {
                      boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  checked={selected === "Self"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label className="pt-1 pl-2" htmlFor="self">
                  Self
                </label>
              </div>
            </div>
            <div className="radio-container">
              <div
                style={{
                  border:
                    focusHighlightId === "doctor" ? "2px solid green" : "none",
                  borderRadius: "3px",
                }}
                className="d-flex"
              >
                <input
                  type="radio"
                  name="self"
                  value="doctor"
                  id="doctor"
                  onFocus={(e) => {
                    if (e.type === "focus") {
                      setFocusHighlightId("doctor");
                    } else {
                      setFocusHighlightId("");
                    }
                  }}
                  style={{
                    ":focus": {
                      boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  checked={selected === "doctor"}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label className="pt-1 pl-2" htmlFor="doctor">
                  Doctor
                </label>
              </div>

              {selected === "doctor" && (
                <div
                  className="mt-1"
                  style={{ display: "flex", gap: "10px", width: "370px" }}
                >
                  <div className="lab-agent-search " style={{ width: "400px" }}>
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
                          modalIsOpen || isOpenForPaymentModal ? "auto" : "100",
                        width: "100%",
                        border:
                          focusHighlightId === "searchDoctor"
                            ? "2px solid #69b128"
                            : "1px solid #dedede",
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
            <div className="radio-container">
              <div
                style={{
                  border:
                    focusHighlightId === "marketer"
                      ? "2px solid green"
                      : "none",
                  borderRadius: "3px",
                }}
                className="d-flex"
              >
                <input
                  type="radio"
                  name="marketer"
                  value="marketer"
                  id="marketer"
                  onFocus={(e) => {
                    if (e.type === "focus") {
                      setFocusHighlightId("marketer");
                      setMarketerActive(true);
                    } else {
                      setFocusHighlightId("");
                    }
                  }}
                  style={{
                    ":focus": {
                      boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  checked={marketerActive}
                  onChange={(e) => setMarketerActive(e.target.checked)}
                />
                <label className="pt-1 pl-2" htmlFor="marketer">
                  Marketer
                </label>
              </div>

              {marketerActive && (
                <div
                  className="mt-1"
                  style={{ display: "flex", gap: "10px", width: "370px" }}
                >
                  <div className="lab-agent-search " style={{ width: "370px" }}>
                    <ReactSearchAutocomplete
                      showIcon={false}
                      placeholder={"Search Marketer"}
                      items={marketer || []}
                      onClear={clearBillingSearchMarketer}
                      inputSearchString={searchTextMarketer || ""}
                      onSearch={(value) => setSearchTextMarketer(value)}
                      onFocus={(e) => {
                        if (e.type === "focus") {
                          setFocusHighlightId("searchMarketer");
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
                                  <span className="me-1">{item?.name}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                      resultStringKeyName="name"
                      onSelect={(item) => {
                        setMarketerDetails(item);
                      }}
                      maxResults={1}
                      fuseOptions={{
                        keys: ["name"],
                      }} // Search in the description text as well
                      styling={{
                        borderRadius: "5px !important",
                        zIndex:
                          modalIsOpen || isOpenForPaymentModal ? "auto" : "1",
                        width: "100%",
                        border:
                          focusHighlightId === "searchMarketer"
                            ? "2px solid #69b128"
                            : "1px solid #dedede",
                      }}
                    />
                  </div>

                  {/* <Link tabIndex={-1} to={"/new-doctors"}>
                    <img
                      className="icon pe-auto"
                      src={doctorIcon}
                      alt="doctor-icon"
                    />
                  </Link> */}
                </div>
              )}
            </div>
          </div>
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
                                : "5",
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
          {patientDetails?.patient_hn_number &&
            patientDetails?.patient_hn_number !== "" &&
            testArr.length > 0 && (
              <div className="my-3 d-flex justify-content-end">
                <Button
                  onFocus={(e) => {
                    if (e.type === "focus") {
                      setFocusHighlightId("payment");
                    } else {
                      setFocusHighlightId("");
                    }
                  }}
                  onClick={() => setIsOpenForPaymentModal(true)}
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
            )}
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
          grandTotal={grandTotal}
          dueAmount={dueAmount}
          moneyReceipt={moneyReceipt}
          selected={
            doctorList?.find((item) => Number(item.id) === Number(referrer)) ||
            null
          }
          invoiceNo={invoiceNo}
          paymentOptionSelected={paymentOptionSelected}
          center={center}
        />
      </div>
      {/* For Payment Modal */}
      <ReactModal
        style={{
          content: {
            ...customStyles?.content,
            height: "500px",
            marginTop: "5.5rem",
          },
        }}
        isOpen={isOpenForPaymentModal}
        onRequestClose={closeModalForPaymentModal}
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
                      <span className="invoice-sub-item">
                        Special Discount
                        <input
                          type="checkbox"
                          onChange={() => {
                            setIsSpecialDiscount(!isSpecialDiscount);
                            setSpecialDiscount(0);
                          }}
                          className="form-check-input ms-1"
                        />
                      </span>
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
                <div className="d-flex flex-grow justify-content-end align-items-end gap-4 mt-2">
                  <Button
                    onClick={saveInvoice}
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
      <NewModal
        size="md"
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <NewModal.Header onClose={() => setModalIsOpen(false)}>
          <NewModal.Title>Patient Registration</NewModal.Title>
        </NewModal.Header>
        <form onSubmit={handleSubmitForPatient} className="mx-0">
          <div className="col-md-12 mt-3 mx-0 px-0">
            <NewModal.Body>
              <div className="row mb-3">
                {/* <label for="colFormLabelSm" className="col-sm-2">
                  HN No.{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    value={newPatientInfo.hnNumber}
                    required
                    readOnly
                    className="form-control form-control-sm"
                    placeholder="Enter HN No"
                  />
                </div> */}
                <label for="colFormLabelSm" className="col-sm-2">
                  Name{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </label>
                <div className="col-sm-10">
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
                  Mobile No.{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </label>
                <div className="col-sm-4">
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
                </div>
                <label
                  for="colFormLabelSm"
                  className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                >
                  Email
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
                    //required
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
                  Date Of Birth{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </label>
                <div className="col-sm-4">
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
                </div>
                <label
                  for="colFormLabelSm"
                  className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                >
                  Blood Group
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
                <label
                  for="app-reg-label"
                  className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm"
                >
                  Age
                </label>
                <div className="col-sm-10">
                  <div className="row">
                    <div className="col-sm-4 row">
                      <div className="col-3">Day</div>
                      <div className="col-9">
                        <input
                          type="number"
                          name="age"
                          max={200}
                          className="form-control form-control-sm"
                          placeholder="Enter Days"
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
                    <div className="col-sm-4 row">
                      <div className="col-3">Month</div>
                      <div className="col-9">
                        <input
                          type="number"
                          name="age"
                          max={200}
                          className="form-control form-control-sm"
                          placeholder="Enter Month"
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
                    </div>
                    <div className="col-sm-4 row">
                      <div className="col-3">Year</div>
                      <div className="col-9">
                        <input
                          type="number"
                          name="age"
                          max={200}
                          className="form-control form-control-sm"
                          placeholder="Enter Year"
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label
                  for="colFormLabelSm"
                  className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                >
                  Gender{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    *
                  </span>
                </label>
                <div className={`col-sm-${user?.isSuperAdmin ? "4" : "10"}`}>
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
                </div>
                {user?.isSuperAdmin && (
                  <>
                    <label
                      for="colFormLabelSm"
                      className="col-sm-2 vital-setup-lebel col-form-label col-form-label-sm "
                    >
                      Branch{" "}
                      <span
                        style={{
                          color: "red",
                          fontSize: "22px",
                          fontWeight: "bold",
                        }}
                      >
                        *
                      </span>
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
                        id="autoSizingSelect"
                      >
                        <option selected value={""}>
                          Select
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
                  Address
                </label>
                <div className="col-sm-4">
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
                        alt="preview"
                      />
                      <i
                        onClick={closeImage}
                        className="far fa-times-circle"
                      ></i>
                    </div>
                  )}
                </div>
              </div>
            </NewModal.Body>
            <NewModal.Footer>
              <button
                onClick={() => setModalIsOpen(false)}
                className="vaital-setup-btn-cancel float-end mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="vaital-setup-btn float-end">
                Save
              </button>
            </NewModal.Footer>
          </div>
        </form>
      </NewModal>
    </section>
  );
};

export default GreatLabBilling;
