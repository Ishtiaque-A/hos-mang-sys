import React, { useRef, useState } from 'react'
import { NewModal } from '../../../common/components/NewModal'
import { VscPreview } from 'react-icons/vsc';
import { AiFillPrinter } from 'react-icons/ai';
import axios from 'axios';
import Button from '../../../common/components/Button';
import moment from 'moment';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import PrintGreatLabInvoice from './PrintGreatLabInvoice';

export default function Find({ isOpen, onClose }) {

    const [searchInput, setsearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [data, setdata] = useState([])
    const [selectedData, setselectedData] = useState({})
    const [dueAmount, setdueAmount] = useState(0)

    const handleSearch = (searchTerm) => {
        if (searchTerm == "") {
            Swal.fire("Error", "Please enter search value", "error");
            return;
        }
        setIsLoading(true)
        axios.get(`/great-lab-invoice-search-by-phone/${searchTerm}`).then(res => {
            setIsLoading(false)
            setdata(res.data.invoice)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }
    const columns = [
        {
            title: "Invoice",
            field: `invoiceNo`,

            cellStyle: {
                width: "2%",
            },
        },
        {
            title: "Date",
            field: `invoiceNo`,
            render: (row) => {
                return moment(row?.created_at)?.format("DD/MM/YYYY");
            },

            cellStyle: {
                width: "2%",
            },
        },
        {
            title: "Name",
            field: `patient_first_name`,
        },
        {
            title: "Branch",
            field: `saas_branch_name`,
        },
        {
            title: "Total Amount",
            field: `totalBill`,
            render: (row) => {
                return parseFloat(row.totalBill).toFixed(2);
            },
            headerStyle: {
                whiteSpace: "nowrap",
            },
        },
        {
            title: "Paid Amount",
            field: `paidAmount`,
            render: (row) => {
                return parseFloat(row.paidAmount).toFixed(2);
            },
            headerStyle: {
                whiteSpace: "nowrap",
            },
        },
        {
            title: "Refund Amount",
            field: `paidAmount`,
            render: (row) => {
                return parseFloat(row.refundAmount).toFixed(2);
            },
            headerStyle: {
                whiteSpace: "nowrap",
            },
        },
        {
            title: "Due",
            field: `due`,
            render: (row) => {
                return parseFloat(row.due).toFixed(2);
            },
        },
        {
            title: "Discount",
            field: `discount`,
            render: (row) => {
                const totalDiscount =
                    parseFloat(row?.specialDiscount || 0) +
                    parseFloat(row?.discount || 0);
                return `${parseFloat(totalDiscount).toFixed(2)}`;
            },
        },
        {
            title: "Payment Method",
            field: "paymentMethod",
            headerStyle: {
                whiteSpace: "nowrap",
            },
        },
        {
            title: "Action",
            field: "patient",
            render: (row) => (
                <div className="d-flex align-items-center  gap-2  justify-content-center">
                    <button
                        data-bs-toggle="tooltip"
                        title="Print Invoice"
                        onClick={() => handleInvoice(row)}
                        className={`new-action-btn `}
                    >
                        <AiFillPrinter />
                    </button>
                    <button
                        data-bs-toggle="tooltip"
                        title="Payment History"
                        onClick={() => {
                            setselectedData(row)
                            setmoneyReceiptModal(true)
                        }}
                        className={`new-action-btn `}
                    >
                        <VscPreview />
                    </button>

                </div>
            ),
            cellStyle: {
                textAlign: "center",
            },
        },
    ];

    const handleInvoice = (row) => {
        setdueAmount(row.due)
        setselectedData(row)
        setTimeout(() => handleLabAgentInfoPrint(), 1000);
    }
    const clearData = () => {
        setsearchInput("")
        setdata([])
        onClose()
    }
    const componentRef = useRef();
    const handleLabAgentInfoPrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [moneyReceiptModal, setmoneyReceiptModal] = useState(false);
    const closeMoneyReceiptModal = () => {
        setmoneyReceiptModal(false);
    }
    const columnMoneyReceipt = [
        // {
        //     title: "Money Receipt No",
        //     field: `money_receipt_number`,
        //     headerStyle: {
        //         whiteSpace: "nowrap",
        //     },
        // },
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
        {
            title: "Action",
            field: "payment_method",
            render: (row) => (
                <div className="d-flex align-items-center  gap-2  justify-content-center">
                    <button
                        data-bs-toggle="tooltip"
                        title="Print Invoice"
                        onClick={() => {
                            setdueAmount(row.due_amount)
                            setTimeout(() => handleLabAgentInfoPrint(), 1000);
                        }}
                        className={`new-action-btn `}
                    >
                        <AiFillPrinter />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <>
            <NewModal isOpen={isOpen} onClose={clearData} size="lg">
                <NewModal.Header onClose={clearData}>
                    <NewModal.Title>Invoice</NewModal.Title>
                </NewModal.Header>
                <NewModal.Body>
                    <div className="d-flex gap-2 align-items-center mb-2 w-50">
                        <input onChange={(e) => setsearchInput(e.target.value)} value={searchInput} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e.target.value)
                            }
                        }} className='form-control form-control-sm' placeholder='Search by name , phone or invoice number' ></input>
                        {
                            isLoading ? <Button style={{ background: "grey" }}>loading...</Button> : <Button style={{ background: "rgb(105, 177, 40)" }} onClick={() => handleSearch(searchInput)}>Search</Button>
                        }
                    </div>

                    <MaterialTable
                        title={'Invoice List'}
                        columns={columns}
                        data={data}
                        isLoading={isLoading}
                        options={{
                            search: false
                        }}
                    />
                </NewModal.Body>
            </NewModal>

            <NewModal isOpen={moneyReceiptModal} onClose={closeMoneyReceiptModal} size="md">
                <NewModal.Header onClose={closeMoneyReceiptModal}>
                    <NewModal.Title>Money Receipt</NewModal.Title>
                </NewModal.Header>
                <NewModal.Body>
                    <MaterialTable
                        title={'Money Receipt List'}
                        columns={columnMoneyReceipt}
                        data={selectedData?.money_recipts}
                        isLoading={isLoading}

                    />
                </NewModal.Body>
            </NewModal>

            <div ref={componentRef}>
                <PrintGreatLabInvoice
                    userInfo={selectedData?.patient}
                    tests={selectedData?.tests}
                    date={selectedData}
                    time={selectedData?.deliveryDate}
                    specialDiscount={selectedData?.specialDiscount}
                    discount_percentage={selectedData?.discount_percentage}
                    grandTotal={selectedData?.totalBill}
                    dueAmount={dueAmount}
                    moneyReceipt={selectedData?.invoiceNo}
                    selected={
                        selectedData?.referredBy === "doctor" ?
                            selectedData?.doctor :
                            selectedData?.referrer
                    }
                    invoiceNo={selectedData?.invoiceNo}
                    paymentOptionSelected={selectedData?.paymentMethod}
                // center={center}
                // preview={ispreview}
                />
            </div>
        </>
    )
}



