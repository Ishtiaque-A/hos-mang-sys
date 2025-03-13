import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { toast } from 'react-toastify';
import useUserData from '../../../hooks/useUserData';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import { NewModal as ReactModal } from '../../../common/components/NewModal';
import moment from 'moment';
import { FaEye } from "react-icons/fa";
import Select from 'react-select';

export default function LabPointsRedeem() {
    const [searchText, setSearchText] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [doctor, setDoctor] = useState({});
    const [pointReport, setPointReport] = useState({});
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const user = useUserData();
    useEffect(() => {
        setLoading(true)
        axios.get('assigned-doctors').then((res) => {
            setDoctors(res?.data?.doctors || [])
        })
        axios.get('lab-point-redeem')
            .then((res) => {
                setData(res?.data || [])
                setFiltered(res?.data || [])
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        axios.get(`/get-user/${user?.id}`)
            .then((res) => {
                setUserData(res?.data?.user)
            })
    }, [user])
    const clearBillingSearch = () => {
        setSearchText('');
    }
    const handleDoctorSelect = (item) => {
        setDoctor(item);
        setSearchText('');
        axios.get(`individual-doctor-point-report/${item.id}`)
            .then((res) => {
                setPointReport(res?.data)
            })
    }
    const [point, setPoint] = useState('');
    const handleChange = (e) => {
        const { value } = e.target;
        if (value <= (parseFloat(pointReport?.available) + parseFloat(pointReport?.due))) {
            setPoint(value);
        } else {
            toast.error('Point should be less than or equal to available point');
        }
    }

    const handleRedeem = () => {
        if (!doctor?.id) {
            toast.error('Please select doctor');
            return;
        }
        if (!point) {
            toast.error('Please enter point');
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Redeem it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.post('lab-point-redeem', {
                        user_id: doctor?.id,
                        total_point: pointReport?.all_last_month,
                        current_month_point: pointReport?.current,
                        due_point: parseFloat(pointReport?.available) - parseFloat(point),
                        previous_due: pointReport?.available,
                        redeem_amount: point,
                        billing_month: pointReport?.month,
                        redeem_by: userData?.fullName,
                        details: pointReport?.history
                    })
                        .then((res) => {
                            Swal.fire({
                                title: "Success!",
                                text: "Point Redeemed Successfully!",
                                icon: "success"
                            });
                            setPoint('');
                            setDoctor({});
                            setPointReport({});
                        })
                        .catch((err) => {
                            toast.error('Something went wrong !');
                        })
                }
            })

    }
    const columns = [
        {
            title: 'Txn Id',
            field: '',
            render: (row) => <div>{row?.redeem_no}</div>,

            width: '40 !important',
        },
        {
            title: 'Date',
            field: '',
            render: (row) => <div>{moment(row?.created_at).format('DD-MM-YYYY')}</div>,

            width: '40 !important',
        },
        {
            title: 'Name',
            field: `test_name`,
            render: (row) => <div>
                <span className='me-1'>{row?.doctor?.title?.title_name}</span>
                {row?.doctor?.fullName}
                <span className='ms-1'>{row?.doctor?.specialist?.specialists_name ? `(${row?.doctor?.specialist?.specialists_name})` : ''}</span>
            </div>,
        },
        {
            title: 'Billing Month',
            field: `test_name`,
            render: (row) => <div>{row?.billing_month}</div>,
        },
        {
            title: 'Redeem',
            field: ``,
            render: (row) => <div>{row?.redeem_amount}</div>,
        },
        {
            title: 'Action',
            field: ``,
            render: (row) => <div>
                <FaEye cursor={'pointer'} size={18} onClick={() => modalOpenReport(row)} />
                {/* <FaEye cursor={'pointer'} size={18} onClick={() => modalOpenStatement(row)} /> */}
            </div>,
        },

    ];

    const [isOpen, setIsOpen] = useState(false);
    const modalOpen = () => {
        setIsOpen(true);
        setDoctor({});
    }
    const closeModal = () => {
        setIsOpen(false);
        setPoint('');
        setDoctor({});
        setPointReport({});
    }
    const [reportData, setReportData] = useState({});
    const [isOpenReport, setIsOpenReport] = useState(false);
    const modalOpenReport = (row) => {
        setIsOpenReport(true);
        setReportData(row);
    }
    const closeModalReport = () => {
        setIsOpenReport(false);
    }
    const [reportStatement, setReportStatement] = useState([]);
    const [isOpenStatement, setIsOpenStatement] = useState(false);
    const modalOpenStatement = (row) => {
        setIsOpenStatement(true);
        axios.get(`lab-point-redeem/${row?.user_id}`)
            .then(res => setReportStatement(res?.data))
    }
    const closeModalStatement = () => {
        setIsOpenStatement(false);
    }
    function filterUnique(array, property) {
        return array.filter((obj, index, self) =>
            index === self.findIndex((t) => (
                t[property] === obj[property]
            ))
        );
    }
    const filteredData = filterUnique(filtered, 'user_id');
    const handleDoctorFilter = (e) => {
        if (e?.id === 'all') {
            setFiltered(data);
        } else {
            const filtered = data.filter((item) => item?.user_id === e?.id);
            setFiltered(filtered);
            setDoctor(e);
        }
    }

    console.log(reportData, "dddf")
    return (
        <div>
            <MaterialTable
                columns={columns}
                data={filtered}
                isLoading={loading}
                components={{
                    Toolbar: (props) => (
                        <div className='my-2 pt-2' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="ms-1" style={{ width: '200px' }}>
                                    <Select
                                        options={[{ id: 'all', fullName: 'All' }, ...doctors]}
                                        onChange={(e) => handleDoctorFilter(e)}
                                        getOptionLabel={(data) => `${data?.fullName || ''}`}
                                        getOptionValue={(data) => `${data?.fullName}`}
                                        placeholder="Search doctor"
                                        value={doctor?.fullName ? doctor : { id: 'all', fullName: 'All' }}
                                        styles={{
                                            menu: (provided) => ({
                                                ...provided,
                                                maxHeight: '200px', // Set a maximum height for the dropdown menu
                                                overflowY: 'auto',  // Enable vertical scrolling
                                                '::-webkit-scrollbar': {
                                                    width: '6px',
                                                },
                                                '::-webkit-scrollbar-thumb': {
                                                    background: 'gray',
                                                    borderRadius: '10px',
                                                },
                                                zIndex: "100"
                                            }),
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="me-1">
                                <button style={{
                                    backgroundColor: '#69B128',
                                    color: 'white',
                                    fontWeight: 'medium',
                                    border: 'none',
                                    borderRadius: '7px',
                                    padding: '3px 15px',
                                }} onClick={modalOpen} className="btn btn-primary btn-sm me-2">Redeem Point</button>
                            </div>
                        </div>
                    ),
                }}
                options={{
                    search: false,
                    showTitle: false,
                    searchFieldAlignment: 'left',
                    pageSize: 10,
                    emptyRowsWhenPaging: false,
                    pageSizeOptions: [10, 20, 50, 100],
                }}
            />
            <div className="d-flex mt-2">
                <h6 className='me-3'>Total Point : {filteredData?.reduce((a, b) => a + b?.total_point, 0)}</h6>
                <h6 className='me-3'>Redeemed Point : {filtered?.reduce((a, b) => a + b?.redeem_amount, 0)}</h6>
                <h6 className='me-3'>Due Point : {filteredData?.reduce((a, b) => a + b?.due_point, 0)}</h6>
            </div>
            <ReactModal size='md' isOpen={isOpen} onClose={closeModal}>
                <ReactModal.Header onClose={closeModal}>
                    <ReactModal.Title>Point Redeem</ReactModal.Title>
                </ReactModal.Header>
                <ReactModal.Body >
                    <div className="">
                        <ReactSearchAutocomplete
                            showIcon={false}
                            placeholder={
                                "Search Doctor with ID or Name "
                            }
                            items={doctors}
                            onClear={clearBillingSearch}
                            inputSearchString={searchText || ""}
                            onSearch={(value) => setSearchText(value)}
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
                                                    <span className='me-1'>{item?.title?.title_name}</span>
                                                    {item?.fullName}
                                                    <span className='ms-2'>{item?.dr_identity_no}</span>
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
                                                    <span className='ms-1'>
                                                        {
                                                            item?.academic?.map((item) => <span className='me-1'>{item?.degree_id},</span>)
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                );
                            }}
                            resultStringKeyName="fullName"
                            onSelect={(item) => handleDoctorSelect(item)}
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
                                zIndex: "1",
                                width: "100%",
                            }}
                        />
                        <div className="custom-card p-2 my-2">
                            <div className="row doc-redeem-info">
                                <div className="col-6">
                                    <p><span>ID</span> : {doctor?.dr_identity_no}</p>
                                    <p><span>Name</span> : {doctor?.fullName}</p>
                                    <p><span>Email</span> : {doctor?.dr_email}</p>
                                </div>
                                <div className="col-6">
                                    <p><span>Specialist</span> : {doctor?.specialist?.specialists_name}</p>
                                    <p><span>Mobile</span> : {doctor?.dr_mobile}</p>
                                    <p><span>Address</span> : {doctor?.dr_address_line_1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 ">
                                <div className="custom-card p-2">
                                    <h6>Total :</h6>
                                    <h6>{pointReport?.invoice?.total_point}</h6>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="custom-card p-2">
                                    <h6>Total as of {pointReport?.month_only} :</h6>
                                    <h6>{pointReport?.all_last_month}</h6>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="custom-card p-2">
                                    <h6>Redeemed :</h6>
                                    <h6>{pointReport?.redeem}</h6>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="custom-card p-2">
                                    <h6>Available :</h6>
                                    <h6>{pointReport?.available}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="custom-card p-2 my-2">
                            <div className="d-flex justify-content-between">
                                <h6>Billing Month : {pointReport?.month}</h6>
                                <h6>Points Received : {pointReport?.current}</h6>
                            </div>
                            <div className="mt-3">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td className='text-end' style={{ fontWeight: '500' }} colSpan={5}>Total Point : </td>
                                            <td className='text-end'>{pointReport?.available}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end' style={{ fontWeight: '500' }} colSpan={5}>Previous Due : </td>
                                            <td className='text-end'>{pointReport?.due}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end' style={{ fontWeight: '500' }} colSpan={5}>To Paid : </td>
                                            <td style={{ width: '120px' }}>
                                                <div className='d-flex ms-1 justify-content-end'>
                                                    <div className='ms-1' style={{ maxWidth: '80px' }}>
                                                        <input value={point} onChange={handleChange} type="number" className="form-control form-control-sm text-end" />
                                                    </div>
                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="rx-one-button-group d-flex justify-content-end mt-3">
                                <button onClick={handleRedeem} className="btn">Redeem</button>
                            </div>
                        </div>
                    </div>
                </ReactModal.Body>
            </ReactModal>

            <ReactModal size='md' isOpen={isOpenReport} onClose={closeModalReport}>
                <ReactModal.Header onClose={closeModalReport}>
                    <ReactModal.Title>Redeem Details</ReactModal.Title>
                </ReactModal.Header>
                <ReactModal.Body >
                    <div className="">
                        <div className="custom-card p-2 my-2">
                            <div className="row doc-redeem-info">
                                <div className="col-6">
                                    <p><span>ID</span> : {reportData?.doctor?.dr_identity_no}</p>
                                    <p><span>Name</span> : {reportData?.doctor?.fullName}</p>
                                    <p><span>Email</span> : {reportData?.doctor?.dr_email}</p>
                                </div>
                                <div className="col-6">
                                    <p><span>Specialist</span> : {reportData?.doctor?.specialist?.specialists_name}</p>
                                    <p><span>Mobile</span> : {reportData?.doctor?.dr_mobile}</p>
                                    <p><span>Address</span> : {reportData?.doctor?.dr_address_line_1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="custom-card p-2 my-2">
                            <div className="d-flex justify-content-between">
                                <h6>Billing Month : {reportData?.billing_month}</h6>
                                <h6>Points Received : {reportData?.current_month_point}</h6>
                            </div>
                            <div className='plan-report mt-3'>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr className='report-header-bg'>
                                            <td>Txn</td>
                                            <td>Date</td>
                                            <td>Invoice</td>
                                            <td>Total Bill</td>
                                            <td className=''>Name</td>
                                            <td className='text-end'>Rate</td>
                                            <td className='text-end'>Discount</td>
                                            <td className='text-end'>Point %</td>
                                            <td className='text-end'>Point</td>
                                            <td className='text-end'>Total Point</td>
                                        </tr>
                                        {
                                            reportData?.details?.map((item) => <>
                                                <tr>
                                                    <td>{reportData?.redeem_no}</td>
                                                    <td>{moment(reportData?.created_at).format('DD-MM-YYYY')}</td>
                                                    <td>{item?.invoice_no}</td>
                                                    <td className='text-end'>{item?.invoice?.totalBill}</td>
                                                    <td className='text-end'></td>
                                                    <td className='text-end'></td>
                                                    <td className='text-end'></td>

                                                    <td className='text-end'></td>
                                                    <td className='text-end'></td>
                                                    <td className='text-end'>{item?.invoice?.point_amount}</td>
                                                </tr>
                                                {
                                                    item?.invoice?.details?.map((detail) => <>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{detail?.testName}</td>
                                                            <td className='text-end'>{detail?.fee}</td>
                                                            <td className='text-end'>{detail?.discount}</td>
                                                            <td className='text-end'>{detail?.point_percent}</td>
                                                            <td className='text-end'>{detail?.point}</td>
                                                            <td></td>
                                                        </tr>
                                                    </>)
                                                }

                                            </>)

                                        }
                                        <tr>
                                            <td className='text-end' colSpan={9}>Total Points</td>
                                            <td className='text-end'>{reportData?.total_point}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end' colSpan={9}>Previous Due</td>
                                            <td className='text-end'>{reportData?.previous_due}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end' colSpan={9}>Redeemed Points</td>
                                            <td className='text-end'>{reportData?.redeem_amount}</td>
                                        </tr>
                                        <tr>
                                            <td className='text-end' colSpan={9}>Due Points</td>
                                            <td className='text-end'>{reportData?.due_point}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ReactModal.Body>
            </ReactModal>
            <ReactModal size='md' isOpen={isOpenStatement} onClose={closeModalStatement}>
                <ReactModal.Header onClose={closeModalReport}>
                    <ReactModal.Title>Point Redeem Statement</ReactModal.Title>
                </ReactModal.Header>
                <ReactModal.Body >
                    <div className="">
                        <div className="custom-card p-2 my-2">
                            <div className="row doc-redeem-info">
                                <div className="col-6">
                                    <p><span>ID</span> : {reportData?.doctor?.dr_identity_no}</p>
                                    <p><span>Name</span> : {reportData?.doctor?.fullName}</p>
                                    <p><span>Email</span> : {reportData?.doctor?.dr_email}</p>
                                </div>
                                <div className="col-6">
                                    <p><span>Specialist</span> : {reportData?.doctor?.specialist?.specialists_name}</p>
                                    <p><span>Mobile</span> : {reportData?.doctor?.dr_mobile}</p>
                                    <p><span>Address</span> : {reportData?.doctor?.dr_address_line_1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="custom-card p-2 my-2">
                            <div className="d-flex justify-content-between">
                                <h6>Billing Month : {reportData?.billing_month}</h6>
                                <h6>Points Received : {reportData?.current_month_point}</h6>
                            </div>
                            <div className='plan-report mt-3'>
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr className='report-header-bg'>
                                            <td>Txn</td>
                                            <td>Date</td>
                                            <td>Invoice</td>
                                            <td>Total Bill</td>
                                            <td className='text-end'>Point %</td>
                                            <td className=''>Name</td>
                                            <td className='text-end'>Rate</td>
                                            <td className='text-end'>Point</td>
                                            <td className='text-end'>Total Point</td>
                                        </tr>
                                        {
                                            reportData?.details?.map((item) => <>
                                                <tr>
                                                    <td>{reportData?.redeem_no}</td>
                                                    <td>{moment(reportData?.created_at).format('DD-MM-YYYY')}</td>
                                                    <td>{item?.invoice_no}</td>
                                                    <td className='text-end'>{item?.invoice?.totalBill}</td>
                                                    <td className='text-end'>{item?.invoice?.point_share}</td>
                                                    <td className='text-end'></td>
                                                    <td className='text-end'></td>
                                                    <td className='text-end'></td>
                                                    <td className='text-end'>{item?.invoice?.point_amount}</td>
                                                </tr>
                                                {
                                                    item?.invoice?.details?.map((detail) => <>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{detail?.testName}</td>
                                                            <td className='text-end'>{detail?.fee}</td>
                                                            <td className='text-end'>{parseFloat(detail?.fee) * parseFloat(item?.invoice?.point_share) / 100}</td>
                                                            <td className='text-end'>{detail?.point}</td>
                                                        </tr>
                                                    </>)
                                                }
                                                <tr>
                                                    <td className='text-end' colSpan={8}>Total Points</td>
                                                    <td className='text-end'>{reportData?.total_point}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end' colSpan={8}>Previous Due</td>
                                                    <td className='text-end'>{reportData?.previous_due}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end' colSpan={8}>Redeemed Points</td>
                                                    <td className='text-end'>{reportData?.redeem_amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className='text-end' colSpan={8}>Due Points</td>
                                                    <td className='text-end'>{reportData?.due_point}</td>
                                                </tr>
                                            </>)
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="rx-one-button-group d-flex justify-content-end mt-3">
                                <button onClick={handleRedeem} className="btn">Redeem</button>
                            </div>
                        </div>
                    </div>
                </ReactModal.Body>
            </ReactModal>
        </div>
    )
}
