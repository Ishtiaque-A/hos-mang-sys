import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NoImages from "../../Images/dummy_images.svg";
// payment icon import
import cashIcon from "../../Images/cash.png";
import creditDebitCard from "../../Images/credit-debit-card.png";
import digitalPayment from "../../Images/digital-payment.png";
import ePayment from "../../Images/e-payment.png";
import eWallet from "../../Images/e-wallet.png";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import useUserData from "../../hooks/useUserData";

const GreatLabPaymentRecieve = () => {
  const [invoice, setInvoice] = useState({
    patient_images: "",
  });
  const user = useUserData();
  const params = useParams();
  const navigate = useNavigate();
  const [receiptNo, setReceiptNo] = useState("");
  const [moneyReceiptData, setMoneyReceiptData] = useState({});
  useEffect(() => {
    axios.get(`great-lab-invoice/${params.id}`).then((res) => {
      if (res.status === 200) {
        setInvoice(res.data.invoice);
      }
    });
    axios.get(`/great-lab-all-money-receipt`).then(async (res) => {
      if (res.status === 200) {
        const randomNumber = await `${res.data.receipt[0].id + 10001}`;
        setReceiptNo(randomNumber);
      }
    });
  }, [params, moneyReceiptData]);
  console.log(invoice, "invoice:::::::::");
  // payment state
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentOptionSelected, setPaymentOptionSelected] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [digitalPaymentNumber, setDigitalPaymentNumber] = useState("");
  const changeSelectedHandler = (e) => {
    setSelectedPayment(e.target.value);
  };

  const changePaymentOptionSeleted = (e) => {
    setPaymentOptionSelected(e.target.value);
  };
  const [payAmount, setPayAmount] = useState("");
  const [active, setActive] = useState(false);

  const handleDueAmount = (e) => {
    const { value } = e.target;
    if (value > 0 && value <= Number(invoice.due)) {
      setPayAmount(value);
    } else {
      toast.error("Please provide valid input !");
    }
  };

  const handlePayDue = () => {
    if (selectedPayment) {
      Swal.fire({
        title: "Have you received the due amount?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, pay it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            invoice_id: params.id,
            age: moment().diff(invoice.patient.patient_dob, "years"),
            referredBy: invoice?.referrer,
            money_receipt_number: receiptNo ? receiptNo : 10001,
            hn_number: invoice.patient.patient_hn_number,
            name: invoice.patient_first_name,
            invoice_number: invoice.invoiceNo,
            requested_amount: invoice.due,
            paid_amount: payAmount > 0 ? payAmount : invoice.due,
            payment_date: new Date().toJSON().slice(0, 10),
            payment_time: new Date().toLocaleTimeString(),
            payment_method: selectedPayment,
            total_amount_paid: Number(invoice.paidAmount) + Number(payAmount),
            due_amount: payAmount ? Number(invoice.due) - Number(payAmount) : 0,
          };
          axios.post("great-lab-save-money-receipt", data).then((res) => {
            if (res.data.status === 200) {
              setMoneyReceiptData(res.data.receipt);
            }
          });
          axios
            .post(`great-lab-update-payment/${params.id}`, {
              paidAmount: payAmount
                ? Number(invoice.paidAmount) + Number(payAmount)
                : Number(invoice.paidAmount) + Number(invoice.due),
              due: payAmount ? Number(invoice.due) - Number(payAmount) : 0,
            })
            .then((res) => {
              if (res.data.status === 200) {
                Swal.fire(
                  "Paid!",
                  "Your payment has been received.",
                  "success"
                );
                axios.get(`great-lab-invoice/${params.id}`).then((res) => {
                  if (res.status === 200) {
                    setInvoice(res.data.invoice);
                    if (Number(res.data.invoice.due) === 0) {
                      navigate(`/great-lab-report-delivery/${params.id}`);
                    }
                  }
                });
                setActive(false);
                setPayAmount("");
              }
            });
        }
      });
    } else {
      toast.error("Please select the payment info!");
    }
  };
  //print lab agent billing info
  const componentRef = useRef();
  const handleReceiptPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(invoice, "invoice:::::::::");

  console.log(moneyReceiptData, "moneyReceiptData:::::::::");
  return (
    <div className="m-2">
      <div className="patients-head custom-card">
        <h6 className="ml-3 text-start mb-1 text-login py-2">
          Smart Lab Billing
        </h6>
      </div>
      <div className="custom-card mt-2 p-2">
        <div className="row">
          <div className="col-3 d-flex align-items-center justify-content-center">
            <div className="img-container">
              {invoice?.patient?.patient_images === "" ||
              invoice?.patient?.patient_images === null ? (
                <img src={NoImages} className="mb-3 img-fluid" alt="patient" />
              ) : (
                <img
                  className="mb-2 img-fluid"
                  alt="patient"
                  src={`${global.img_url}/images/files/${invoice.patient?.patient_images}`}
                />
              )}
            </div>
          </div>
          <div className="col-3">
            <div className="mb-2">
              <span className="text-muted info-head me-3">HN Number : </span>
              <span className="info-text">
                {invoice?.patient?.patient_hn_number}
              </span>
            </div>
            <div className="">
              <span className="text-muted info-head me-3">Name : </span>
              <span className="info-text">{invoice?.patient?.fullName}</span>
            </div>
          </div>
          <div className="col-3">
            <div>
              <span className="text-muted info-head me-3">
                Date of Birth :{" "}
              </span>
              <span className="info-text">
                {invoice?.patient?.patient_birth_sex?.birth_sex_name}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-muted info-head me-3">Age : </span>
              <span className="info-text">
                {moment().diff(invoice?.patient?.patient_dob, "years")}
              </span>
            </div>
          </div>
          <div className="col-3">
            <div className="mb-2">
              <span className="text-muted info-head me-3">Phone Number : </span>
              <span className="info-text">
                {invoice?.patient?.patient_mobile_phone}
              </span>
            </div>
            <div>
              <span className="text-muted info-head me-3">Known Allergy: </span>
              <span className="info-text">N/A</span>
            </div>
          </div>
        </div>
      </div>

      <Row>
        {/* payment area */}
        <Col lg={6}>
          <div className="custom-card p-3 mt-2 pt-4">
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
                <label className="pt-1 pl-2" htmlFor="Cash">
                  Cash
                </label>
              </div>
              <div className="d-flex justify-content-end align-items-center gap-1">
                <img className="cash-icon" src={cashIcon} alt="cash-icon" />
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
                          checked={paymentOptionSelected === "Visa Card"}
                          onChange={changePaymentOptionSeleted}
                        />
                        <label className="pt-1 pl-2" htmlFor="Visa Card">
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
                          checked={paymentOptionSelected === "Master Card"}
                          onChange={changePaymentOptionSeleted}
                        />
                        <label className="pt-1 pl-2" htmlFor="Master Card">
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
                          checked={paymentOptionSelected === "American Express"}
                          onChange={changePaymentOptionSeleted}
                        />
                        <label className="pt-1 pl-2" htmlFor="American Express">
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
                    name="digital-payment"
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
                  // onChange={changeHandler}
                />
                <label className="pt-1 pl-2" htmlFor="e-wallet">
                  e-Wallet
                </label>
              </div>
              <div className="d-flex justify-content-end align-items-center gap-1">
                <img className="payment-icon" src={eWallet} alt="e-wallet" />
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
                  // onChange={changeHandler}
                />
                <label className="pt-1 pl-2" htmlFor="e-payment">
                  e-Payment
                </label>
              </div>
              <div className="d-flex justify-content-end align-items-center gap-1">
                <img className="payment-icon" src={ePayment} alt="e-payment" />
              </div>
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className="custom-card p-3 mt-2 pt-4">
            <h6>Payment Request</h6>
            <p>
              A request has been made for you to submit payment for medical
              experience of the patient listed below.
            </p>
            <div className="mt-2">
              <label>Required Payment Amount</label>
              <div className="row">
                <div className="col-4">
                  {!active && !payAmount ? (
                    <>
                      <span>BDT</span>
                      <span
                        onClick={() => setActive(true)}
                        className="money-amount-box d-inline-block ms-4"
                      >
                        {invoice?.due}
                      </span>
                    </>
                  ) : (
                    <div className="row">
                      <div className="col-3">
                        <span>BDT</span>
                      </div>
                      <div className="col-9">
                        <input
                          autoFocus
                          onBlur={() => setActive(false)}
                          onChange={handleDueAmount}
                          defaultValue={invoice?.due}
                          type="number"
                          className="form-control form-control-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-3">
                  <button
                    disabled={Number(invoice.due) === 0}
                    onClick={handlePayDue}
                    className="vaital-setup-btn"
                  >
                    Pay Now
                  </button>
                </div>
                <div className="col-4">
                  {/* <button disabled className="vaital-setup-btn ms-2">Payment Link</button> */}
                  <a className="text-decoration-none" disabled href="#">
                    Payment Link
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h6>Remark</h6>
              <div className="row mt-2">
                <div className="col-5">
                  <span>Deposit for</span>{" "}
                  <span className="fw-bold ms-2">Due</span>
                </div>
                <div className="col-5">
                  <div className="row">
                    <div className="col-3">
                      <label>Other</label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p>If you have any question or need help, please contact us.</p>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate(-1)}
              className="vaital-setup-btn-cancel float-end ms-2"
            >
              Cancel
            </button>
            <button
              disabled={moneyReceiptData.name ? false : true}
              onClick={handleReceiptPrint}
              className="vaital-setup-btn float-end"
            >
              Print
            </button>
          </div>
        </Col>
        {/* balance calculation && time && date */}
        {/* money-receipt-container */}
      </Row>

      <div className="print-invoice">
        <div ref={componentRef} className="sales-invoice">
          {moneyReceiptData && (
            <div style={{ padding: "60px" }} className="invoice-print">
              <div className="invoice-pharmacy-details d-flex gap-2 align-items-center justify-content-start">
                <img
                  src={user?.organization_logo}
                  // src="https://gdsaasbackend.macrohealthplus.org/logo10240861-846c-4d2c-a8b6-aee9020f0337.jpeg"
                  alt="logo"
                  style={{ width: "80px", height: "80px" }}
                />
                <div className="text-start">
                  <h5>{user?.organization_name}</h5>
                  <p>
                    {user?.organization_address}{" "}
                    <span>Tel : {user?.organization_mobile}</span>
                  </p>
                  <p>(A Computerized Diagnostic and Consultation Centre)</p>
                </div>
              </div>
              <div className="row  mt-3 mb-1">
                <div className="row col-8">
                  <div className="col-6 d-flex align-items-center">
                    <p className="p-0 m-0">
                      Received No:{" "}
                      <span>
                        {moneyReceiptData?.money_receipt_number || 10001}
                      </span>
                    </p>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    <h4
                      className="text-center py-1 px-4  m-0"
                      style={{
                        border: "1px dashed gray",
                        borderRadius: "20px",
                        display: "inline-block",
                        fontSize: "16px",
                      }}
                    >
                      Cash Memo
                    </h4>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <div className="d-flex justify-content-end align-items-center">
                    Date{" "}
                    <span style={{ width: "60px", display: "inline-block" }}>
                      :
                      {moment(moneyReceiptData?.created_at).format(
                        "DD/MM/YYYY"
                      )}
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
                        // whiteSpace: "nowrap",
                      }}
                    >
                      Patient Name
                    </span>{" "}
                    : {moneyReceiptData?.name}
                  </p>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <div className="d-flex justify-content-end">
                    Age{" "}
                    <span
                      style={{ paddingLeft: "15px", display: "inline-block" }}
                    >
                      : {moneyReceiptData?.age} Years
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <p className="m-0 p-0">
                    <span
                      style={{
                        width: "104px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Prof./Dr.
                    </span>
                    : {moneyReceiptData?.referredBy}
                  </p>
                </div>
              </div>
              <div className="invoice-item-table">
                <table>
                  <tr className="invoice-border-dashed">
                    <td>Examination</td>
                    <td>Rate</td>
                    <td colSpan={5} className="text-end">
                      Total
                    </td>
                  </tr>
                  {moneyReceiptData?.invoice?.tests?.map((item, i) => (
                    <tr key={i}>
                      <td className="text-start">{item.testName}</td>
                      <td className="text-start">{item.fee}</td>
                      <td colSpan={5} className="text-end">
                        {parseFloat(item.fee).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="invoice-border-dashed-top">
                    <td rowSpan={5} colSpan={2}>
                      {Number(moneyReceiptData?.due_amount) > 0 && (
                        <div className=" d-flex justify-content-center align-items-center">
                          <p
                            style={{
                              fontSize: "22px",
                              whiteSpace: "nowrap",
                              margin: "0",
                              padding: "0",
                            }}
                          >
                            Due Amount:{" "}
                            {parseFloat(moneyReceiptData?.due_amount).toFixed(
                              2
                            )}
                          </p>
                        </div>
                      )}
                    </td>
                    <td colSpan={3} className="text-end">
                      Sub Total :{" "}
                    </td>
                    <td className="text-end">
                      {parseFloat(moneyReceiptData?.invoice?.totalBill).toFixed(
                        2
                      )}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-end">
                      Discount :{" "}
                    </td>
                    <td className="text-end">
                      {parseFloat(
                        parseFloat(invoice?.discount || 0) +
                          parseFloat(invoice?.specialDiscount || 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={3} className="text-end">
                      Bill Total :{" "}
                    </td>
                    <td className="text-end">
                      {" "}
                      {parseFloat(
                        parseFloat(moneyReceiptData?.invoice?.totalBill) -
                          parseFloat(moneyReceiptData?.invoice?.discount)
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="invoice-border-dashed-top">
                    <td colSpan={3} className="text-end">
                      Paid :{" "}
                    </td>
                    <td className="text-end">
                      {parseFloat(moneyReceiptData?.paid_amount).toFixed(2)}{" "}
                    </td>
                  </tr>
                  {moneyReceiptData?.due_amount && (
                    <tr className="invoice-border-dashed-top">
                      <td colSpan={3} className="text-end">
                        Due :{" "}
                      </td>
                      <td className="text-end">
                        {parseFloat(moneyReceiptData?.due_amount).toFixed(2)}{" "}
                      </td>
                    </tr>
                  )}
                </table>
              </div>
              <br />
              <div className="d-flex invoice-creator justify-content-between mt-4">
                <p>
                  Delivery Date:{" "}
                  {moment(moneyReceiptData?.invoice?.deliveryDate).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  -{" "}
                  {moment(
                    moneyReceiptData?.invoice?.deliveryTime,
                    "HH:mm:ss"
                  ).format("hh: A")}
                </p>
                <p>Posted : {user?.name}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-2">
                <Barcode
                  displayValue="false"
                  lineColor="#333333"
                  width={2}
                  height={20}
                  value={moneyReceiptData?.money_receipt_number || 10001}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GreatLabPaymentRecieve;
