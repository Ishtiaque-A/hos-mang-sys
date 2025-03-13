import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import useUserData from '../../../hooks/useUserData';
import MaterialTable from 'material-table';
import { NewModal } from '../../../common/components/NewModal';
import axios from 'axios';
import moment from 'moment';
import { AiFillPrinter } from 'react-icons/ai';
import PrintGreatLabInvoice from './PrintGreatLabInvoice';
import Button from '../../../common/components/Button';

export default function GreatLabInvoiceDetails({ data = null, isOpen, onClose, refundSlip = false }) {
    const invoiceRef = useRef();
    const [loading, setLoading] = useState(false);
    const [moneyReceipts, setMoneyReceipts] = useState([]);
    const [moneyReceiptData, setmoneyReceiptData] = useState(null);
    const user = useUserData();

    const handleMoneyPrint = useReactToPrint({
        content: () => invoiceRef.current,
    });
    const handleMoney = (data) => {
        setmoneyReceiptData(data);
        setTimeout(() => handleMoneyPrint(), 1000);
    };

    useEffect(() => {
        if (data) {
            (async () => {
                setLoading(true);
                const res = await axios.get(
                    `/great-lab-money-receipt-preview/${data?.id}`
                );
                if (res.data.status === 200) {
                    setLoading(false);
                    setMoneyReceipts(res?.data?.receipt);
                }
            })();
        }
    }, [data]);

    const AllColumns = [

        {
            title: "Invoice No",
            field: `invoice_number`,
        },
        {
            title: "Date & Time",
            render: (row) => moment(row?.created_at).format("DD/MM/YYYY - hh A"),
        },
        {
            title: "Paid Amount",
            field: "paid_amount",
            render: (row) => parseFloat(row?.paid_amount).toFixed(2),
        },
        {
            title: "Due Amount",
            field: "due_amount",
            render: (row) => parseFloat(row?.due_amount).toFixed(2),
        },

    ];

    const moneyReceiptColumns = [
        ...AllColumns,
        {
            title: "Money Receipt No",
            field: `money_receipt_number`,
            headerStyle: {
                whiteSpace: "nowrap",
            },
        },
        {
            title: "Action",
            field: "payment_method",
            render: (row) => (
                <div className="d-flex align-items-center  gap-2  justify-content-center">
                    <button
                        data-bs-toggle="tooltip"
                        title="Print Invoice"
                        onClick={() => {
                            setslipTitle("Money Receipt");
                            handleMoney(row)
                        }}
                        className={`new-action-btn `}
                    >
                        <AiFillPrinter />
                    </button>
                </div>
            ),
        },
    ]

    const refundColumns = [
        ...AllColumns,
        {
            title: "Action",
            field: "payment_method",
            render: (row) => (
                <div className="d-flex align-items-center  gap-2  justify-content-center">
                    <button
                        data-bs-toggle="tooltip"
                        title="Print Invoice"
                        onClick={() => {
                            const modifiedObject = {
                                ...row,
                                invoice: {
                                    ...row.invoice,
                                    tests: row?.invoice?.tests.filter(item => item?.is_refund === 1)
                                }
                            };
                            setslipTitle("Refund Slip");
                            handleMoney(modifiedObject)
                        }}
                        className={`new-action-btn `}
                    >
                        <AiFillPrinter />
                    </button>
                </div>
            ),
        },
    ]

    const [slipTitle, setslipTitle] = useState('Money Receipt');
    const [searchInput, setsearchInput] = useState('');

    const handleSearch = (searchTerm) => {
        setLoading(true)
        axios.get(`/great-lab-money-receipt-preview-by-invoice/${searchTerm}`).then(res => {
            setLoading(false)
            setMoneyReceipts(res?.data?.receipt);
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }
    return (
        <NewModal isOpen={isOpen} onClose={onClose} size="lg">
            <NewModal.Header onClose={onClose}>
                <NewModal.Title>Invoice Summary</NewModal.Title>
            </NewModal.Header>
            <NewModal.Body>
                <div className="d-flex gap-2 align-items-center mb-2 w-50">
                    <input onChange={(e) => setsearchInput(e.target.value)} value={searchInput} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e.target.value)
                        }
                    }} className='form-control form-control-sm' placeholder='Search by name , phone or invoice number' ></input>
                    {
                        loading ? <Button style={{ background: "grey" }}>loading...</Button> : <Button style={{ background: "rgb(105, 177, 40)" }} onClick={() => handleSearch(searchInput)}>Search</Button>
                    }
                </div>
                <div className="d-flex gap-2">
                    <MaterialTable
                        title={"Money Receipts"}
                        columns={moneyReceiptColumns}
                        data={moneyReceipts.filter((item) => item?.money_receipt_type !== "refund")}
                        isLoading={loading}
                    />
                    <MaterialTable
                        title={"Refund Slip"}
                        columns={refundColumns}
                        data={moneyReceipts.filter((item) => item?.money_receipt_type === "refund")}
                        isLoading={loading}
                    />
                </div>
                <div ref={invoiceRef}>
                    <PrintGreatLabInvoice
                        userInfo={moneyReceiptData?.invoice?.patient}
                        tests={moneyReceiptData?.invoice?.tests}
                        date={moneyReceiptData?.invoice?.deliveryDate}
                        time={moneyReceiptData?.invoice?.deliveryTime}
                        discount_percentage={moneyReceiptData?.invoice?.discount_percentage}
                        grandTotal={moneyReceiptData?.invoice?.totalBill}
                        dueAmount={moneyReceiptData?.due_amount}
                        moneyReceipt={moneyReceiptData}
                        selected={
                            moneyReceiptData?.invoice?.referrer
                        }
                        slipTitle={slipTitle}

                    />
                </div>
            </NewModal.Body>
        </NewModal>
    );
}
