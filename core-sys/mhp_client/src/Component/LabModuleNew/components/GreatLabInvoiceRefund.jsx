import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NewModal } from '../../../common/components/NewModal';
import { toast } from "react-toastify";
import moment from "moment";
import Swal from "sweetalert2";
import Button, { Loading } from '../../../common/components/Button';



export default function GreatLabInvoiceRefund({ invoice = null, setUpdateData, onClose, isOpen, search = false }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (invoice) {
            setData(invoice);
        }
    }, [invoice]);

    const getInvoiceData = (invoiceNo) => {
        if (!invoiceNo) {
            toast.error("Please enter invoice number");
            return;
        }
        setLoading(true)
        axios.get(`/great-lab-invoice-search/${invoiceNo}`).then(res => {
            if (res.data.invoice === null) {
                toast.error('Invoice not found');

            }
            setData(res.data.invoice)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
            toast.error('Something went wrong. Please try again')
        })
    }
    const discount = data?.tests?.reduce(
        (totalDiscount, current) =>
            totalDiscount + parseFloat(current.discount || 0),
        0
    );
    const totalBill = data?.tests?.reduce(
        (totalBill, current) => totalBill + parseFloat(current?.fee || 0),
        0
    );

    const totalDiscount = discount + parseFloat(data?.specialDiscount || 0);
    const dueAmount =
        totalBill - (parseFloat(data?.paidAmount || 0) + totalDiscount);
    const subTotal = parseFloat(totalBill || 0) - totalDiscount;
    const refundAmount = parseFloat(data?.paidAmount || 0) - (subTotal || 0);
    const removeTest = (test) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                axios
                    .post(`/great-lab-refund-invoice-item/${test.id}`, {
                        discount: data.specialDiscount,
                        totalBill: totalBill,
                        percentage: (data.specialDiscount / totalBill) * 100
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            toast.success(res.data.message);
                        }

                        setData(res.data.invoice);
                        setUpdateData(Math.random());
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                        toast.error("Something went wrong. Please try again");
                    });
            }
        });
    };

    const handleSpecialDiscount = (e) => {
        const { value, name } = e.target;
        if (name === "refundAmount") {
            if (value) {
                if (refundAmount >= parseFloat(value)) {
                    setData({
                        ...data,
                        refundAmount: parseFloat(value) || 0,
                    });
                } else {
                    toast.error(
                        "Refund amount should be less than or equal to paid amount !"
                    );
                    return;
                }
            } else {
                setData({
                    ...data,
                    refundAmount: 0,
                });
            }
        } else {
            setData({ ...data, [name]: parseFloat(value) || 0 });
        }
    };

    const handleFullRefund = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund it!",
        }).then((result) => {
            setLoading(true);
            if (result.isConfirmed) {
                axios
                    .post(`/great-lab-invoice-full-refund/${data?.invoiceNo}`)
                    .then((res) => {
                        if (res.status === 200) {
                            toast.success(res.data.message);
                        }
                        if (res.status === 400) {
                            toast.error(res.data.message);
                        }
                        setData(res.data.invoice);
                        setUpdateData(Math.random());
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                        toast.error("Something went wrong. Please try again");
                    });
            }
        });
    };

    const [searchInput, setsearchInput] = useState()

    return (
        <NewModal isOpen={isOpen} onClose={onClose} size="md">
            <NewModal.Header onClose={onClose}>
                <NewModal.Title>Smart Lab Invoice Refund</NewModal.Title>
            </NewModal.Header>
            <NewModal.Body>

                {
                    search && <div className="d-flex gap-2 align-items-center mb-2 w-50">
                        <input onChange={(e) => setsearchInput(e.target.value)} value={searchInput} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                getInvoiceData(e.target.value)
                            }
                        }} className='form-control form-control-sm' placeholder='Enter invoice number' ></input>
                        {
                            loading ? <Button style={{ background: "grey" }}>loading...</Button> : <Button style={{ background: "rgb(105, 177, 40)" }} onClick={() => getInvoiceData(searchInput)}>Search</Button>
                        }
                    </div>
                }
                {data?.invoiceNo ? <>
                    <div className="row">
                        <div className="col-4">
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Invoice No
                                </span>
                                <span className="ms-1">: {data?.invoiceNo}</span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Name
                                </span>
                                <span className="ms-1">: {data?.patient?.fullName}</span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Created By
                                </span>
                                <span className="ms-1">: {data?.created_by}</span>
                            </p>
                        </div>
                        <div className="col-4">
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Date
                                </span>
                                <span className="ms-1">
                                    : {moment(data?.created_at).format("DD/MM/YYYY")}
                                </span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Delivery Date
                                </span>
                                <span className="ms-1">
                                    : {moment(data?.deliveryDate).format("DD/MM/YYYY")}
                                </span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Reference By
                                </span>
                                <span className="ms-1">: {data?.referredBy}</span>
                            </p>
                        </div>
                        <div className="col-4">
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Total Amount
                                </span>
                                <span className="ms-1">: {totalBill}</span>
                            </p>

                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Discount
                                </span>
                                <span className="ms-1">: {totalDiscount} ({data?.discount_percentage}%)</span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Sub Total
                                </span>
                                <span className="ms-1">: {subTotal}</span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Refund Amount
                                </span>
                                <span className="ms-1">: {data?.refundAmount}</span>
                            </p>
                            <p className="mb-0">
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Paid Amount
                                </span>
                                <span className="ms-1">: {data?.paidAmount}</span>
                            </p>
                            <p className="mb-0" style={{ color: "red" }}>
                                <span
                                    className="d-inline-block"
                                    style={{ fontWeight: "bold", width: "110px" }}
                                >
                                    Due Amount
                                </span>
                                {/* <span className="ms-1">: {dueAmount > 0 ? dueAmount : 0}</span> */}
                                <span className="ms-1">: {data?.due}</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h6>Invoice Details</h6>
                        <div className="invoice-item-table">
                            <table>
                                <tr className="invoice-border-dashed">
                                    <td>Name</td>
                                    <td>Rate</td>
                                    <td className="text-end">Discount</td>
                                    <td className="text-end">Total</td>
                                    <td className="text-end">Action</td>
                                </tr>
                                {data?.tests?.map((item, i) => (
                                    <tr className={item?.is_refund === 1 ? 'text-danger' : ''} key={i}>
                                        <td className="text-start">{item?.testName}</td>
                                        <td className="text-start">{item?.fee}</td>
                                        <td className="text-end">{item?.discount}</td>
                                        <td className="text-end">

                                            {parseFloat(item?.fee || 0) -
                                                parseFloat(item?.discount || 0)}

                                        </td>
                                        <td className="text-end">
                                            {item?.is_refund === 1 ? <span style={{ background: "red", color: "white", borderRadius: "10px", padding: "2px 8px" }}> Refund</span> :
                                                loading ? <Loading /> :
                                                    <button
                                                        disabled={Number(item?.collectionStatus) === 1}
                                                        style={{
                                                            border: "none",
                                                        }}
                                                        onClick={() => removeTest(item)}
                                                        className="btn  btn-sm action-btn"
                                                    >
                                                        <i className="far fa-trash"></i>
                                                    </button>
                                            }
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={3} className="text-end">
                                        Special Discount :
                                    </td>
                                    <td className="text-end">
                                        <div className="d-flex justify-content-end">
                                            <div style={{ width: "80px" }}>
                                                <input
                                                    disabled
                                                    className="form-control form-control-sm text-end"
                                                    type="number"
                                                    name="specialDiscount"
                                                    onChange={handleSpecialDiscount}
                                                    value={data?.specialDiscount}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-end">
                                        Total :
                                    </td>
                                    <td className="text-end"> {subTotal}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="text-end">
                                        Refund Amount :
                                    </td>
                                    <td className="text-end">
                                        <div className="d-flex justify-content-end">
                                            <div style={{ width: "80px" }}>
                                                <input
                                                    className="form-control form-control-sm text-end"
                                                    type="number"
                                                    name="refundAmount"
                                                    onChange={handleSpecialDiscount}
                                                    disabled={
                                                        refundAmount < 1
                                                            ? true
                                                            : refundAmount <= parseFloat(data?.refundAmount)
                                                                ? true
                                                                : false
                                                    }
                                                    value={data?.refundAmount || ""}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </> : <p className="text-center text-danger">Invoice not found</p>}
            </NewModal.Body>
            <NewModal.Footer>
                <Button className="btn btn-sm btn-outline-primary" onClick={onClose}>
                    Close
                </Button>
                {
                    data?.invoiceNo && <>
                        {loading ? <Button className="btn btn-sm btn-outline-primary" > Loading <Loading color={"white"} /></Button> :
                            <Button className="btn btn-sm btn-outline-primary" onClick={handleFullRefund}>
                                Full Refund
                            </Button>}
                    </>
                }
            </NewModal.Footer>
        </NewModal>
    );
}
