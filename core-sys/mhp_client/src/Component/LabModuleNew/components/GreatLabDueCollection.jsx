import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import useUserData from '../../../hooks/useUserData';
import moment from 'moment';
import { NewModal } from '../../../common/components/NewModal';
import Button from '../../../common/components/Button';

export default function GreatLabDueCollection({ search = false, invoice = {}, setUpdateData = false, onClose, isOpen }) {
    const [data, setData] = useState();
    const [searchInput, setsearchInput] = useState("")

    useEffect(() => {
        if (!search) {
            setData(invoice);
        }
    }, [invoice]);

    const [isLoading, setisLoading] = useState(false)
    const handleSearch = (invoiceNo) => {
        setisLoading(true)
        axios.get(`/great-lab-invoice-search/${invoiceNo}`).then(res => {
            if (res.data.invoice === null) {
                toast.error('Invoice not found');
            }
            setData(res.data.invoice)
            setisLoading(false)
        }).catch(err => {
            setisLoading(false)
            console.log(err)
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
    const paidAmount =
        parseFloat(data?.paidAmount || 0) + parseFloat(data?.duePaid || 0);
    const dueAmount = parseFloat(data?.due || 0) - parseFloat(data?.duePaid || 0);

    const handlePaidAmount = (e) => {
        const { value } = e.target;
        if (value <= parseFloat(data?.due)) {
            setData({ ...data, duePaid: value });
        } else {
            toast.error("Paid amount should not be greater than due amount");
        }
    };
    const userData = useUserData();

    const [isLoadingDue, setisLoadingDue] = useState(false)
    const handleSubmit = () => {
        if (Number(data?.duePaid) === 0 || data?.duePaid === "" || data?.duePaid === null || data?.duePaid === undefined) {
            toast.error("Paid amount should be  greater than zero");
            return;
        }
        setisLoadingDue(true)

        const invoiceData = {
            totalBill,
            dueAmount: dueAmount > 0 ? dueAmount : 0,
            paidAmount: paidAmount,
            refundAmount: data?.refundAmount,
            specialDiscount: data?.specialDiscount,
        };
        axios
            .post(`/great-lab-update-invoice/${data?.id}`, invoiceData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    const info = {
                        invoice_id: data?.id,
                        due_amount: dueAmount > 0 ? dueAmount : 0,
                        age: moment().diff(data?.patient?.patient_dob, "years"),
                        referredBy: data?.referrer,
                        hn_number: data?.patient.patient_hn_number,
                        name: data?.patient.fullName,
                        invoice_number: data?.invoiceNo,
                        requested_amount: data?.due,
                        paid_amount: data?.duePaid,
                        payment_date: new Date().toJSON().slice(0, 10),
                        payment_time: new Date().toLocaleTimeString(),
                        payment_method: "Cash",
                        total_amount_paid: paidAmount,
                        created_by: userData?.name,
                        created_by_id: userData?.id,
                        money_receipt_type: "due",
                    };

                    axios.post("great-lab-save-money-receipt", info).then((res) => {
                        console.log(res.data, "money receipt saved");
                    });
                    if (!search) {
                        setUpdateData(Math.random());
                        clearBtn();
                    }

                    handleSearch(res.data?.invoice?.invoiceNo)

                    // clearBtn();
                }
                setisLoadingDue(false)
            })
            .catch((err) => {
                toast.error("Something went wrong. Please try again");
                setisLoadingDue(false)
            });
    };

    const clearBtn = () => {
        setData()
        setsearchInput("")
        onClose()
    }
    return (
        <NewModal isOpen={isOpen} onClose={clearBtn} size="md">
            <NewModal.Header onClose={clearBtn}>
                <NewModal.Title>Invoice Due Collection</NewModal.Title>
            </NewModal.Header>
            <NewModal.Body>

                {
                    search &&
                    <div className="d-flex gap-2 align-items-center mb-2 w-50">
                        <input onChange={(e) => setsearchInput(e.target.value)} value={searchInput} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(searchInput)
                            }
                        }} className='form-control form-control-sm' placeholder='Seach by invoice no' ></input>
                        {
                            isLoading ? <Button style={{ background: "grey" }}>loading...</Button> : <Button style={{ background: "rgb(105, 177, 40)" }} onClick={() => handleSearch(searchInput)}>Search</Button>
                        }
                    </div>
                }
                {
                    data &&
                    <>
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
                                    <span className="ms-1">: {totalDiscount}</span>
                                </p>
                                <p className="mb-0 g-doc-scroll" style={{ overflowY: "auto" }}>
                                    <span
                                        className="d-inline-block"
                                        style={{ fontWeight: "bold", width: "110px" }}
                                    >
                                        Paid Amount
                                    </span>
                                    <span className="ms-1">: {paidAmount} {data?.money_recipts?.length > 1 && `= ${data?.money_recipts?.filter(receipt => receipt.money_receipt_type === 'due' || receipt.money_receipt_type === 'add')?.map(receipt => receipt.paid_amount).join('+')}`}  </span>
                                </p>
                                <p className="mb-0">
                                    <span
                                        className="d-inline-block"
                                        style={{ fontWeight: "bold", width: "110px" }}
                                    >
                                        Due Amount
                                    </span>
                                    <span className="ms-1">: {dueAmount > 0 ? dueAmount : 0}</span>
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
                                    </tr>
                                    {data?.tests?.map((item, i) => (
                                        <tr key={i}>
                                            <td className="text-start">{item?.testName}</td>
                                            <td className="text-start">{item?.fee}</td>
                                            <td className="text-end">{item?.discount}</td>
                                            <td className="text-end">
                                                {parseFloat(item?.fee || 0) -
                                                    parseFloat(item?.discount || 0)}
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colSpan={3} className="text-end">
                                            Collection Amount :
                                        </td>
                                        <td className="text-end">
                                            <div className="d-flex justify-content-end">
                                                <div style={{ width: "80px" }}>
                                                    <input
                                                        className="form-control form-control-sm text-end"
                                                        type="number"
                                                        name="paidDue"
                                                        onChange={handlePaidAmount}
                                                        value={data?.duePaid || ""}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                handleSubmit();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </>
                }
            </NewModal.Body>
            <NewModal.Footer>
                <Button className="btn btn-sm btn-outline-primary" onClick={clearBtn}>
                    Close
                </Button>
                {data && isLoadingDue ? <Button style={{ background: "grey" }}>
                    loading...
                </Button> : <Button className="btn btn-sm btn-primary" onClick={handleSubmit}>
                    Save
                </Button>}
            </NewModal.Footer>
        </NewModal>
    );
}
