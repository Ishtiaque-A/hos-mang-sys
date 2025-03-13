import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import Modal from 'react-modal';
import moment from "moment";
import { FaPlusCircle } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Barcode from "react-barcode/lib/react-barcode";
import { Grid, Tooltip } from "@material-ui/core";
import PrintIcon from '@mui/icons-material/Print';
import Select from 'react-select';
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useReactToPrint } from "react-to-print";
import NoImages from '../../../Images/dummy_images.svg';
import './MhpInvoice.css';
const MhpInvoice = () => {
    const [invoiceList, setInvoiceList] = useState([]);
    const [invoiceListSort, setInvoiceListSort] = useState([]);
    const [stickers, setStickers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/lab-agent-all-invoice`).then(res => {
            if (res.data.status === 200) {
                setInvoiceList(res.data.invoice)
                setInvoiceListSort(res.data.invoice)
                setLoading(false);
            }
        });

    }, []);
    const [testInfo, setTestInfo] = useState("")
    const columns = [

        {
            title: "Invoice No", field: `invoiceNo`

        },

        {
            title: "Name", field: `patient_first_name`

            , cellStyle: {
                // width: 400,
                // marginLeft:50
            },
        },


        {
            title: "Issue Date", field: "created_at", type: "numeric",
            render: (row) => <div>{row.created_at === 'null' ? '' : row.created_at.slice(0, 10)}</div>,
            cellStyle: {
                width: 150
            },
        },
        {
            title: "Due Date", field: "collectionDate", type: "numeric",
            render: (row) => <div>{row?.sampleCollectionDate === 'null' ? '' : row?.sampleCollectionDate}</div>,
            cellStyle: {
                width: 150
            },
        },
        { title: "Due Amount", field: "", render: (row) => <div style={{ backgroundColor: "#F4F4F4", borderRadius: "20px", padding: "3px 2px" }}>{row.tests === 'null' ? '' : row.tests.map((item, i) => <><span onClick={() => handleTestSampleCollection(item)} className="me-1 fw-bold" style={{ color: `${Number(item.collectionStatus) === 1 ? "#69B128" : 'red'} `, cursor: "pointer" }}>{item.testName}</span>{row.tests.length - 1 !== i && <span style={{ borderLeft: "2px solid #DEDEDE" }}></span>} </>)}</div>, },

        {
            title: "Status", field: "collection_status", render: (row) => {
                const result = row.tests?.reduce((total, current) => total + Number(current.collectionStatus), 0)
                const testLength = row.tests?.length
                return <div>
                    {result === testLength ? <span><i style={{ fontSize: "10px" }} className="fa-solid fa-circle text-success me-1"></i> Collected</span> : result !== testLength && result > 0 ? <span><i style={{ fontSize: "10px" }} className="fa-solid fa-circle text-warning me-1"></i> Partial</span> : <span><i style={{ fontSize: "10px" }} className="fa-solid fa-circle text-danger me-1"></i>Not Collected</span>}
                </div>
            },

            cellStyle: {
                textAlign: "center"
            },
        },

        {
            title: "Action", field: "patient", render: (row) =>
                <div>

                    {/* <button data-bs-toggle="tooltip" title="Edit Sample" disabled={Number(row.isApprovedInSampleCollection) === 1} onClick={() => handleEditSample(row)} className="btn btn-sm action-btn"> <i className="far fa-edit"></i></button>&nbsp; */}
                    <button data-bs-toggle="tooltip" title="Create Sticker" disabled={Number(row.isApprovedInSampleCollection) === 1} onClick={() => { handleSticker(row); handleTestSampleCollection(row.tests[0]) }} className="btn btn-sm action-btn"> <i className="fa-regular fa-note-sticky"></i></button>&nbsp;
                    <button data-bs-toggle="tooltip" title="Print Invoice" onClick={() => handleInvoice(row)} className={`btn btn-sm action-btn `}> <AiFillPrinter /> </button>&nbsp;
                    {/* <Link to={`/employee-profile/${row.id}`} className="btn action-btn  btn-sm" data-bs-toggle="tooltip" title="Employee Profile"><i className="far fa-user-alt"></i></Link> */}
                </div>,
            cellStyle: {
                textAlign: "center"
            },
        },
    ];
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const customStyles = {
        content: {
            top: '32%',
            left: '25%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "72%",
            height: "450px",
            padding: "20px",
            zIndex: "3000"

        },

    };

    const [allPatients, setAllPatients] = useState([]);
    const [patient, setPatient] = useState([]);
    useEffect(() => {
        Modal.setAppElement('body');
        axios.get(`/patients`).then(async (res) => {
            setAllPatients(res.data.patients)
        })
    }, []);
    console.log(patient, "patient")
    const handleSticker = (item) => {
        console.log(item, "sticker info")
        setTestInfo(item)
        setModalIsOpen(true)
    }

    const [testDetails, setTestDetails] = useState({});

    const handleTestSampleCollection = (item) => {
        console.log(item)
        axios.get(`lab-agent-test-edit/${item.id}`)
            .then(res => {
                if (res.status === 200) {
                    setTestDetails(res.data.test)
                }
            })
    }


    //print lab agent billing info
    const componentRef = useRef();


    const invoiceRef = useRef();
    const handleInvoicePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });
    const handleInvoice = (item) => {
        setTestInfo(item)
        setTimeout(() => handleInvoicePrint(), 1000)
    }
    const totalBill = testInfo?.tests?.reduce((total, current) => total + Number(current.fee), 0)
    const discountTotal = testInfo?.tests?.reduce((total, current) => total + (Number(current.discount) * Number(current.fee)) / 100, 0)
    // print test List
    const [selectedTest, setSelectedTest] = useState([])
    const testRef = useRef();
    const handlePrintTest = useReactToPrint({
        content: () => testRef.current,
    });
    const printTestList = () => {
        if (selectedTest.length > 0) {
            handlePrintTest()
        } else {
            toast.error("Please select test for print!")
        }
    }
    console.log(testDetails, "dde")
    // search with date range
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: ""
    })
    const searchByDateRange = () => {
        if (dateRange.startDate && dateRange.endDate) {
            axios.post('lab-agent-invoice-date-range-search', dateRange)
                .then(res => {
                    if (res.status === 200) {
                        setInvoiceList(res.data.invoice)
                        setInvoiceListSort(res.data.invoice)
                    }
                })
        } else {
            toast.error("Please enter start and end date!")
        }
    }
    const filterByStatus = (e) => {
        const { value } = e.target;
        if (value === "collected") {
            const filtered = invoiceListSort.filter(invoice => invoice.tests.reduce((total, current) => total + Number(current.collectionStatus), 0) === invoice.tests.length)
            setInvoiceList(filtered)
        } else if (value === "partial") {
            const filtered = invoiceListSort.filter(invoice => invoice.tests.reduce((total, current) => total + Number(current.collectionStatus), 0) > 0 && invoice.tests.reduce((total, current) => total + Number(current.collectionStatus), 0) < invoice.tests.length)
            setInvoiceList(filtered)
        } else if (value === "notCollected") {
            const filtered = invoiceListSort.filter(invoice => invoice.tests.reduce((total, current) => total + Number(current.collectionStatus), 0) === 0)
            setInvoiceList(filtered)
        } else if (value === "all") {
            setInvoiceList(invoiceListSort)
        }
    }
    const addInvoice = () => {
        setModalIsOpen(true)
    }
    const [tableData, setTableData] = useState([
        {
            item_id: "",
            qty: "",
            discount: '',
            amount: "",
            price: "",
        }
    ])
    const addTableData = () => {
        const existTable = [...tableData];
        existTable.push({
            item_id: "",
            qty: "",
            discount: '',
            amount: "",
            price: ""
        })
        setTableData(existTable)
    }
    const removeInvoiceItem = (index) => {
        const existTable = [...tableData];
        existTable.splice(index, 1);
        setTableData(existTable)
    }
    const handleChange = (e, index) => {
        const existTable = [...tableData];
        existTable[index][e.target.name] = e.target.value;
        setTableData(existTable)
    }
    const closeModal = () => {
        setModalIsOpen(false)
        setTableData([{
            item_id: "",
            qty: "",
            discount: '',
            amount: "",
            price: "",
        }])
    }
    console.log(tableData, "tableData")
    return (
        <div className="ms-2 lab-agent all-patients mt-2">
            <div className="row">
                <div className="col-md-12">
                    <div className="patients-head custom-card">
                        <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">Manage Invoices
                            {/* <Link to='/application' className="btn btn-primary me-3 btn-sm float-end"> Add Lab Agent</Link> */}
                        </h5>
                    </div>
                    <div className="custom-card p-2 mt-2">
                        <div className="row">
                            <div className="col-3">
                                <h6>Invoice List</h6>
                            </div>
                            <div className="col-9 row">
                                <div className="col-4 row">
                                    <div className="col-2">
                                        <label className="fw-bold"> Date</label>
                                    </div>
                                    <div className="col-10">
                                        <input onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })} type="date" className="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div className="col-4 row">
                                    <div className="col-2">
                                        <label className="fw-bold"> To</label>
                                    </div>
                                    <div className="col-10">
                                        <input onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })} type="date" className="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div className="col-4 row">
                                    <div className="col-3 rx-one-button-group">
                                        <button onClick={searchByDateRange} className="btn">Search</button>
                                    </div>
                                    <div className="col-9 row">
                                        <div className="col-3">
                                            <label className="fw-bold"> Status</label>
                                        </div>
                                        <div className="col-9">
                                            <select onChange={filterByStatus} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="all" >Select</option>
                                                <option value="collected">Collected</option>
                                                <option value="partial">Partial</option>
                                                <option value="notCollected">Not Collected</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="patient-table mt-2">
                        <MaterialTable
                            columns={columns}
                            data={invoiceList}
                            isLoading={loading === true ? true : false}
                            options={{
                                search: true,
                                // filtering: filter,
                                showTitle: false,
                                searchFieldAlignment: "left",
                                pageSize: 10,
                                emptyRowsWhenPaging: false,
                                pageSizeOptions: [5, 10, 20, 50, 100],
                                selection: true
                            }}
                            components={{
                                Toolbar: (props) => <div>
                                    <Grid style={{}}>
                                        <Tooltip title="Print test list" placement="bottom"><PrintIcon className="float-end export-icon pe-auto me-3 mt-1" onClick={printTestList} /></Tooltip>
                                        <Tooltip title="Add Invoice" placement="bottom"><AddCircleIcon className="float-end export-icon pe-auto me-3 mt-1" onClick={addInvoice} /></Tooltip>
                                    </Grid>
                                    <MTableToolbar style={{ width: 80, fontSize: 14 }} {...props} />
                                </div>
                            }}
                            onSelectionChange={(rows) => setSelectedTest(rows)}
                        />
                        <div className="mt-2">
                            <span className="me-2"> <i style={{ color: "red" }} className="fa-solid fa-square me-1"></i> Sample Not Collected Yet</span>
                            <span className="me-2"> <i style={{ color: "#FFD600" }} className="fa-solid fa-square me-1"></i> Partial Sample Collected</span>
                            <span className="me-2"> <i style={{ color: "#69B128" }} className="fa-solid fa-square me-1"></i> Sample Collected Done</span>
                        </div>
                    </div>

                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"

            >
                <span className='float-end' style={{ fontSize: "15px", cursor: "pointer" }} onClick={closeModal}><i class="fal fa-times"></i></span>
                <div className="d-flex sticker-modal-lab">
                    <h6 className="card-title me-3">Invoice Create</h6>

                </div>
                <hr />
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <Select
                                options={allPatients}
                                onChange={(e) => setPatient(e)}
                                getOptionLabel={(pati) => `${pati.patient_first_name}`}
                                getOptionValue={(pati) => `${pati.patient_first_name}`}
                            />
                            {
                                patient?.patient_first_name &&
                                <div className="mhp-invoice-patient-detais">
                                    <div className="row custom-card m-1 mt-2">
                                        <div className="col-3">
                                            {
                                                patient?.patient_images === "" ? <img src={NoImages} className='mb-3 img-fluid' alt="Patient" /> :
                                                    <img className='mb-2 img-fluid' src={`${global.img_url}/images/files/${patient.patient_images}`} alt="Patient" />
                                            }
                                        </div>
                                        <div className="col-9">
                                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                                                <div className="col">
                                                    <p className="text-muted info-head">Phone Number</p>
                                                    <p className="info-text">{patient?.patient_mobile_phone}</p>
                                                </div>
                                                <div className="col">
                                                    <p className="text-muted info-head">Name</p>
                                                    <p className="info-text">{patient?.patient_first_name}</p>
                                                </div>
                                                <div className="col">
                                                    <p className="text-muted info-head">Gender</p>
                                                    <p className="info-text">{patient?.patient_birth_sex?.birth_sex_name}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            }

                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    <div className="mb-2">
                                        <label htmlFor="date">Issue Date</label>
                                        <input type="date" className="form-control form-control-sm" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="invoiceNo">Invoice No</label>
                                        <input readOnly type="number" className="form-control form-control-sm" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-2">
                                        <label htmlFor="dat">Due Date</label>
                                        <input type="date" className="form-control form-control-sm" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="dat">Category</label>
                                        <select className="form-select form-slect-sm" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="d-flex justify-content-between mb-2">
                            <h6 >Services</h6>
                            <div className="rx-one-button-group">
                                <button onClick={addTableData} className="btn">Add</button>
                            </div>
                        </div>
                        <div className="mhp-invoice-table mt-2">
                            <table>
                                <tbody>
                                    <tr className="mhp-invoice-table-head">
                                        <td className="">ITEMS</td>
                                        <td className="">QUANTITY</td>
                                        <td className="">PRICE</td>
                                        <td className="">DISCOUNT</td>
                                        <td className="">AMOUNT</td>
                                    </tr>
                                    {
                                        tableData.map((item, index) => <>
                                            <tr className="my-2">
                                                <td>
                                                    <div style={{ width: "200px" }}>
                                                        <Select
                                                            options={allPatients}
                                                            onChange={(e) => setPatient(e)}
                                                            getOptionLabel={(pati) => `${pati.patient_first_name}`}
                                                            getOptionValue={(pati) => `${pati.patient_first_name}`}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: "100px" }}>
                                                        <input value={item.qty} name="qty" onChange={(e) => handleChange(e, index)} type="number" placeholder="Qty" className="form-control form-control-sm" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: "100px" }}>
                                                        <input value={item.price} name="price" onChange={(e) => handleChange(e, index)} type="number" placeholder="Price" className="form-control form-control-sm" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ width: "100px" }}>
                                                        <input value={item.discount} name="discount" onChange={(e) => handleChange(e, index)} type="number" placeholder="Discount" className="form-control form-control-sm" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="me-1">00.00</span>
                                                        {
                                                            index > 0 &&
                                                            <i onClick={() => removeInvoiceItem(index)} className="fa-solid invoice-item-remov-icon fa-trash-can me-1"></i>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid #F1F1F1" }}>
                                                <td colSpan={2}>
                                                    <textarea className="form-control" rows="3" placeholder="Description"></textarea>
                                                </td>
                                            </tr>
                                        </>)
                                    }
                                    <tr style={{ borderBottom: "1px solid #F1F1F1" }}>
                                        <td colSpan={3}></td>
                                        <td className="">Sub Total </td>
                                        <td className=""> <span className="me-1">00.00</span></td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #F1F1F1" }}>
                                        <td colSpan={3}></td>
                                        <td className="">Discount </td>
                                        <td className=""> <span className="me-1">00.00</span></td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #F1F1F1" }}>
                                        <td colSpan={3}></td>
                                        <td className="">Tax </td>
                                        <td className=""> <span className="me-1">00.00</span></td>
                                    </tr>
                                    <tr style={{ borderBottom: "1px solid #F1F1F1" }}>
                                        <td colSpan={3}></td>
                                        <td className="">Total Amount </td>
                                        <td className=""> <span className="me-1">00.00</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="rx-one-button-group mt-2 me-2">
                            <button onClick={closeModal} className="btn float-end">Cancel</button>
                            <button className="btn float-end me-2">Save</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div ref={componentRef} className="lab-sample-sticker-container m-3">
                {
                    stickers.length > 1 &&
                    stickers?.map((sticker, i) => <div key={i} className="lab-sample-sticker mb-2 p-2">
                        <div className="invoice-print">
                            <div className="d-flex justify-content-between ">
                                <p>{testInfo.patient?.patient_first_name}</p>
                                <p className="me-3">{sticker.testName}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>{testInfo.patient?.patient_hn_number}</p>
                                <p>{testInfo.patient?.patient_dob} <span className="ms-2">M</span> <span className="ms-2">{moment().diff(testInfo.patient?.patient_dob, "years")}</span></p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Barcode displayValue="false" height="20" width='2' value={sticker.id} />
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Col : {moment(sticker.updated_at).format('DD/MM/YYYY hh: mm: ss A')}</p>
                                <p>By : Collector</p>
                            </div>
                        </div>
                    </div>)
                }
                {
                    stickers.length === 1 &&
                    <div className="lab-sample-sticker mb-2 p-2">
                        <div className="invoice-print">
                            <div className="d-flex justify-content-between ">
                                <p>{testInfo.patient?.patient_first_name}</p>
                                <p className="me-3">{testDetails.testName}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>{testInfo.patient?.patient_hn_number}</p>
                                <p>{testInfo.patient?.patient_dob} <span className="ms-2">M</span> <span className="ms-2">{moment().diff(testInfo.patient?.patient_dob, "years")}</span></p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Barcode displayValue="true" height="20" width='2' value={testInfo?.invoiceNo} />
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Col : {moment(testDetails.updated_at).format('DD/MM/YYYY hh: mm: ss A')}</p>
                                <p>By : Collector</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="print-invoice">
                <div ref={invoiceRef} className="sales-invoice">
                    {
                        testInfo &&
                        <div style={{ padding: '60px' }} className='invoice-print'>
                            <div className="invoice-pharmacy-details d-flex justify-content-center">

                                <div className="text-center">

                                    <h5>Al Shifa Pharmacy</h5>
                                    <p>Location : Lalbagh</p>
                                    <p>Tel : 0171238765</p>
                                    <p>Vat Reg No :534565 </p>
                                </div>
                            </div>
                            <div className="row agent-details mb-3">
                                <div className="col-6">
                                    <p>Agent Name : Mr X</p>
                                    <p>Agent Phone : 01700001234</p>
                                </div>
                                <div className="col-6 d-flex justify-content-end">
                                    <div>
                                        <p>Patient Name : {testInfo?.patient_first_name}</p>
                                        <p>Patient Phone : {testInfo?.patient_mobile_phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="invoice-date d-flex justify-content-between invoice-border-dashed">
                                <p>Invoice No : {testInfo?.invoiceNo} </p>
                                <p>Date : {new Date().toLocaleDateString('en-GB')} </p>
                            </div>
                            <div className="invoice-item-table">
                                <table>
                                    <tr className='invoice-border-dashed'>
                                        <td >Code</td>
                                        <td >Name</td>
                                        <td >Rate</td>
                                        <td className='text-end' >Total</td>
                                    </tr>
                                    {
                                        testInfo?.tests?.map((item, i) => <tr key={i}>
                                            <td  >{item.code}</td>
                                            <td className='text-start'>{item.testName}</td>
                                            <td className='text-start'>{item.fee}</td>
                                            <td className='text-end'>{Number(item.fee)}</td>
                                        </tr>)
                                    }
                                    <tr className='invoice-border-dashed-top'>
                                        <td colSpan={3} className='text-end'>Sub Total : </td>
                                        <td className='text-end'>{totalBill} </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className='text-end'>VAT / TAX : </td>
                                        <td className='text-end'>0</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className='text-end'>Discount : </td>
                                        <td className='text-end'>{discountTotal}</td>
                                    </tr>


                                    <tr className='invoice-border-dashed-top'>
                                        <td colSpan={3} className='text-end'>Bill Total : </td>
                                        <td className='text-end'>{totalBill - discountTotal} </td>
                                    </tr>
                                    <tr className='invoice-border-dashed-top'>
                                        <td colSpan={3} className='text-end'>Paid : </td>
                                        <td className='text-end'>{testInfo?.paidAmount} </td>
                                    </tr>
                                    {
                                        testInfo?.due &&
                                        <tr className='invoice-border-dashed-top'>
                                            <td colSpan={3} className='text-end'>Due : </td>
                                            <td className='text-end'>{testInfo?.due} </td>
                                        </tr>
                                    }

                                </table>
                            </div>
                            <div className="d-flex invoice-creator justify-content-between mt-1">
                                <p>Provided By: Cashier</p>
                                <p>Time : {new Date().toLocaleTimeString()}</p>
                            </div>
                            <div className="invoice-greeting d-flex justify-content-center align-items-center">
                                <Barcode displayValue="false" height="30" width='2' value={testInfo?.invoiceNo} />
                            </div>
                            <div className="d-flex justify-content-center branding-section">
                                <p>Thank You</p>
                            </div>
                            <div className="branding-section">
                                <p>Technology Partner Zaimah Technologies Ltd.</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                selectedTest.length > 0 &&
                <div ref={testRef}>
                    <div className="print-send-test-to-lab">
                        <div className="invoice-pharmacy-details d-flex justify-content-center">
                            <div className="text-center">
                                <h5>Al Shifa Pharmacy</h5>
                                <p>Location : Lalbagh</p>
                                <p>Tel : 0171238765</p>
                                <p>Vat Reg No :534565 </p>
                            </div>
                        </div>
                        <h6 className="my-3 text-center">Test List</h6>
                        <div className="d-flex justify-content-between mx-3">
                            <p>To : IBN Sina Hospital</p>
                            <p>Date : {moment(new Date().toJSON().slice(0, 10)).format('DD-MM-YYYY')}</p>
                        </div>
                        <div className="mx-3">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>HN</td>
                                        <td>Name</td>
                                        <td>Dob</td>
                                        <td>Mobile Number</td>
                                        <td>Test</td>
                                        <td>Collection Date</td>
                                        {/* <td>Collection Time</td> */}
                                    </tr>
                                    {
                                        selectedTest.map((test, i) => <tr key={i}>
                                            <td>{test.patient?.patient_hn_number}</td>
                                            <td>{test.patient?.patient_first_name}</td>
                                            <td>{moment(test.patient?.patient_dob).format("DD-MM-YYYY")}</td>
                                            <td>{test.patient?.patient_mobile_phone}</td>
                                            <td>{test.tests?.filter(ts => ts.collectionStatus > 0).map((item, i) => <span>{item.testName} , </span>)}</td>
                                            <td>{moment(test.sampleCollectionDate).format("DD-MM-YYYY")}</td>
                                            {/* <td>Collection Time</td> */}
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-5 mx-5">
                            <div className="col-4 text-center">
                                <span className="d-inline-block border-top">Prepared By</span>
                            </div>
                            <div className="col-4 text-center">
                                <span className="d-inline-block border-top">Checked By</span>
                            </div>
                            <div className="col-4 text-center">
                                <span className="d-inline-block border-top">Approved By</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MhpInvoice;