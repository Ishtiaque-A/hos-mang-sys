import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NoImages from "../../Images/dummy_images.svg";
// payment icon import
import cashIcon from "../../Images/cash.png";
import creditDebitCard from "../../Images/credit-debit-card.png";
import digitalPayment from "../../Images/digital-payment.png";
import ePayment from "../../Images/e-payment.png";
import eWallet from "../../Images/e-wallet.png";
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
const LabAgentPaymentReceive = () => {
    const [invoice, setInvoice] = useState({
        patient_images: "",
    })
    const params = useParams();
    const navigate = useNavigate();
    const [receiptNo, setReceiptNo] = useState('')
    const [moneyReceiptData, setMoneyReceiptData] = useState({})
    useEffect(() => {
        axios.get(`lab-agent-invoice/${params.id}`)
            .then(res => {
                if (res.status === 200) {
                    setInvoice(res.data.invoice)
                }
            })
        axios.get(`/all-money-receipt`).then(async (res) => {
            if (res.status === 200) {
                const randomNumber = await `${res.data.receipt[0].id + 10001}`
                setReceiptNo(randomNumber)
            }

        })
    }, [params, moneyReceiptData]);
    // payment state
    // const [selected, setSelected] = useState("");
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
    const [payAmount, setPayAmount] = useState('')
    const [active, setActive] = useState(false)

    const handleDueAmount = (e) => {
        const { value } = e.target;
        if (value > 0 && value <= Number(invoice.due)) {
            setPayAmount(value)
        } else {
            toast.error("Please provide valid input !")
        }
    }



    const handlePayDue = () => {
        if (selectedPayment) {
            Swal.fire({
                title: 'Have you received the due amount?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, pay it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = {
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
                    }
                    axios.post('save-money-receipt', data)
                        .then(res => {
                            if (res.data.status === 200) {
                                setMoneyReceiptData(res.data.receipt)
                            }
                        })
                    axios.post(`lab-agent-update-payment/${params.id}`, { paidAmount: payAmount ? Number(invoice.paidAmount) + Number(payAmount) : Number(invoice.paidAmount) + Number(invoice.due), due: payAmount ? Number(invoice.due) - Number(payAmount) : 0 })
                        .then(res => {
                            if (res.data.status === 200) {
                                Swal.fire(
                                    'Paid!',
                                    'Your payment has been received.',
                                    'success'
                                )
                                axios.get(`lab-agent-invoice/${params.id}`)
                                    .then(res => {
                                        if (res.status === 200) {
                                            setInvoice(res.data.invoice)
                                            if (Number(res.data.invoice.due) === 0) {
                                                navigate(`/report-delivery/${params.id}`)
                                            }
                                        }
                                    })
                                setActive(false)
                                setPayAmount('')

                            }
                        });

                }
            })

        } else {
            toast.error("Please select the payment info!")
        }
    }
    //print lab agent billing info
    const componentRef = useRef();
    const handleReceiptPrint = useReactToPrint({
        content: () => componentRef.current,
    });
    console.log(moneyReceiptData, "dd")
    return (
        <div className='m-2'>
            <div className="patients-head custom-card">
                <h6 className="ml-3 text-start mb-1 text-login py-2">
                    Lab Agent Billing
                </h6>
            </div>
            <div className="custom-card mt-2 p-2">
                <div className="row">
                    <div className="col-3 d-flex align-items-center justify-content-center">
                        <div className="img-container">
                            {
                                invoice?.patient?.patient_images === "" ? <img src={NoImages} className='mb-3 img-fluid' /> :
                                    <img className='mb-2 img-fluid' src={`${global.img_url}/images/files/${invoice.patient?.patient_images}`} />
                            }
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="mb-2">
                            <span className="text-muted info-head me-3">HN Number : </span>
                            <span className="info-text">{invoice?.patient?.patient_hn_number}</span>
                        </div>
                        <div className="">
                            <span className="text-muted info-head me-3">Name : </span>
                            <span className="info-text">{invoice?.patient_first_name}</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div>
                            <span className="text-muted info-head me-3">Date of Birth : </span>
                            <span className="info-text">{invoice?.patient_mobile_phone}</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-muted info-head me-3">Age : </span>
                            <span className="info-text">{moment().diff(invoice?.patient?.patient_dob, "years")}</span>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="mb-2">
                            <span className="text-muted info-head me-3">Phone Number : </span>
                            <span className="info-text">{invoice?.patient_mobile_phone}</span>
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
                                                    checked={
                                                        paymentOptionSelected === "American Express"
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
                                                onChange={(e) => setDigitalPaymentNumber(e.target.value)}
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
                <Col lg={6}>
                    <div className="custom-card p-3 mt-2 pt-4">
                        <h6>Payment Request</h6>
                        <p>A request has been made for you to submit payment for medical experience of the patient listed below.</p>
                        <div className="mt-2">
                            <label>Required Payment Amount</label>
                            <div className="row">
                                <div className="col-4">
                                    {
                                        !active && !payAmount ?
                                            <>
                                                <span>BDT</span>
                                                <span onClick={() => setActive(true)} className='money-amount-box d-inline-block ms-4'>{invoice?.due}</span>
                                            </>

                                            :
                                            <div className="row">
                                                <div className="col-3">
                                                    <span>BDT</span>
                                                </div>
                                                <div className="col-9">
                                                    <input autoFocus onBlur={() => setActive(false)} onChange={handleDueAmount} defaultValue={invoice?.due} type="number" className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                    }


                                </div>
                                <div className="col-3">
                                    <button disabled={Number(invoice.due) === 0} onClick={handlePayDue} className="vaital-setup-btn">Pay Now</button>

                                </div>
                                <div className="col-4">
                                    {/* <button disabled className="vaital-setup-btn ms-2">Payment Link</button> */}
                                    <a className='text-decoration-none' disabled href="#">Payment Link</a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h6>Remark</h6>
                            <div className="row mt-2">
                                <div className="col-5">
                                    <span>Deposit for</span> <span className="fw-bold ms-2">Due</span>
                                </div>
                                <div className="col-5">
                                    <div className="row">
                                        <div className="col-3">
                                            <label>Other</label>
                                        </div>
                                        <div className="col-9">
                                            <input type="text" className="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>If you have any question or need help, please contact us.</p>
                    </div>
                    <div className="mt-2">
                        <Link to="/lab-agent-report-delivery">
                            <button className="vaital-setup-btn-cancel float-end ms-2">Cancel</button>
                        </Link>
                        <button disabled={moneyReceiptData.name ? false : true} onClick={handleReceiptPrint} className="vaital-setup-btn float-end">Print</button>
                    </div>
                </Col>
                {/* balance calculation && time && date */}
            </Row>
            <div className="print-money-receipt">
                <div ref={componentRef} className="money-receipt-container px-4 py-2 mt-4">
                    <span className='money-receipt-head'>Online Payment Confirmation Or  Offline Payment Confirmation</span>
                    <div className="receipt-welcome-section mt-3">
                        <p>Dear Sir / Madam</p>
                        <p>Thank You</p>
                        <p>For your payment for medical expense</p>
                    </div>
                    <div className="mt-3 receipt-pay-info">
                        <h6>Payment Confirmation</h6>
                        <hr />
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Money Receipt Number</span> : <span className='receipt-details-value'>{moneyReceiptData?.money_receipt_number}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>HN</span> : <span className='receipt-details-value'>{moneyReceiptData?.hn_number}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Name</span> : <span className='receipt-details-value'>{moneyReceiptData?.name}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Invoice Number</span> : <span className='receipt-details-value'>{moneyReceiptData?.invoice_number}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Requested Amount</span> : <span className='receipt-details-value'>{moneyReceiptData?.requested_amount}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Amount Paid</span> : <span className='receipt-details-value'>{moneyReceiptData?.paid_amount}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Payment Date</span> : <span className='receipt-details-value'>{moneyReceiptData?.payment_date}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Payment Time</span> : <span className='receipt-details-value'>{moneyReceiptData?.payment_time}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Channel</span> : <span className='receipt-details-value'>{moneyReceiptData?.payment_method}</span></p>
                        <p><span className='d-inline-block' style={{ width: "200px" }}>Total Amount Paid</span> : <span className='receipt-details-value'>{moneyReceiptData?.total_amount_paid}</span></p>
                    </div>
                    <div className="my-3">
                        <p>If you have any questions or need help, please 'Reply all' to this email and we will reply as quickly as possible </p>
                    </div>
                    <div>
                        <p>Sincerely,</p>
                        <p>Al-Shifa Hospital</p>
                        <p>Phone +66 2066 8888</p>
                    </div>
                    <div className="mt-5">
                        <span className="bottom-nb">
                            This e-mail message (and attachments) may contain information that is confidential to Bumiungrad International. If you are not the intended recipient you cannot use, dismbute or copy the message or attachments, In such a case, please nobfy the sender by return e-mail immedately and erase all copies of the message and attachments. Opinions, conclusions and other information in this message and attachments that do not relate to the official business of Bumningrad International are nether given no' endorsed by it.
                        </span>
                    </div>
                    <div className='mt-2'>
                        <span className="receipt-end-line">Save the Environment — Think before you print this e-man</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LabAgentPaymentReceive;