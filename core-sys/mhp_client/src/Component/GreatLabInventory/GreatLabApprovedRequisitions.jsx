import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import axios from 'axios';
import moment from 'moment';
import { NewModal as Modal } from '../../common/components/NewModal'
import { FaRegEye } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

function GreatLabApprovedRequisitions() {
    const [branchData, setBranchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [refetchStock, setRefetchStock] = useOutletContext();
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-branch-requisition`)
            .then((res) => {
                setBranchData(res.data?.booths.filter((item) => item?.status === "Approved" || item?.status === "Delivered" || item?.status === "Partially Delivered"))
                setLoading(false)
            })
    }, [refetch])
    const branchCheckout = () => {
        const selectedStock = stockItems.filter((item) => item?.deliver > 0);
        const delivered_qty = stockItems.reduce((total, item) => Number(item?.deliver || 0) + Number(item?.central_delivered || 0) + total, 0);
        const qty = stockItems.reduce((total, item) => Number(item?.quantity || 0) + total, 0);
        const status = delivered_qty === qty ? "Delivered" : "Partially Delivered";
        if (selectedStock.length === 0) {
            toast.error("Please enter dispatch quantity");
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, stock out!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`/great-lab-central-stock-out/${productInfo?.id}`, { stockItems: selectedStock, status: status }).then((res) => {
                    if (res.data.status === 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Stock out!',
                            // text: 'Your data has been deleted.',
                            timer: 2500,
                        });
                        setRefetchStock(!refetchStock);
                        closeModal();
                        setRefetch(!refetch)
                    }
                });

            }
        });
    };


    const columnsBranch = [
        {
            title: 'Requisition No',
            field: `supplier_code`,
            render: (row) => <div>{row?.requisition_no}</div>,
        },
        {
            title: 'Date',
            field: `name`,
            render: (row) => <div>{moment(row?.date).format('DD-MM-YYYY')}</div>,
        },
        {
            title: 'Branch',
            field: `name`,
            render: (row) => <div>{(row?.branch_name)}</div>,
        },
        {
            title: 'Requisitor',
            field: `requisitor_name`,
        },
        {
            title: 'Status',
            field: `status`,
            render: (row) => <div>{
                row?.status === "Approved" ?
                    <span className="badge badge-info">New</span>
                    : row?.status === "Partially Delivered" ?
                        <span className="badge badge-warning">{row?.status}</span>
                        : <span className="badge badge-success">{row?.status}</span>
            }</div>,
        },
        {
            title: 'Action',
            field: 'patient',
            render: (row) => (
                <div>
                    {
                        (row?.status === 'Approved' || row?.status === 'Delivered' || row?.status === 'Partially Delivered') &&
                        <button
                            onClick={(e) => openModal(row)}
                            className='btn btn-sm action-btn'
                        >
                            <FaRegEye />
                        </button>
                    }

                </div>
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
    ];

    const [productInfo, setProductInfo] = useState({
        supplier: '',
        remarks: '',
        delivery_date: '',
        location_id: '',
        date: '',
    })
    const [stockItems, setStockItems] = useState([]);

    const [requisitionNo, setRequisitionNo] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const openModal = (pd,) => {
        setProductInfo(pd);
        setStockItems(pd?.details || []);
        setRequisitionNo(pd?.requisition_no);
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const purchasePriceHandler = (e, index) => {
        let temp = [...stockItems];
        const { value, name } = e.target;
        if (value <= Number(temp[index]['dispatch'])) {
            temp[index][name] = value;
            setStockItems([...temp]);
        } else {
            toast.error("Enter Valid Quantity")
        }
    }
    console.log(stockItems, "stockItems")
    let outOfStock = false;
    return (
        <div className='page-content'>
            <div className='d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2'>
                <h6> Requisition List </h6>
                {/* <button type="button" onClick={() => openModal(emptyBooth)} className='btn float-end'>
                    Add Booth
                </button> */}
            </div>

            <div>
                <MaterialTable
                    columns={columnsBranch}
                    data={branchData}
                    isLoading={loading}
                    options={{
                        search: true,
                        showTitle: false,
                        searchFieldAlignment: 'left',
                        pageSize: 5,
                        emptyRowsWhenPaging: false,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                    }}

                />
                <Modal size='md' isOpen={isOpen} onClose={closeModal}>
                    <Modal.Header onClose={closeModal} >
                        <Modal.Title>Requisition Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body styles={{ height: "300px" }} >
                        <div className="row custom-card p-2">
                            <div className="col-6">
                                <div className="mb-2">
                                    <label htmlFor="name">Requisition <span className='text-danger'>*</span></label>
                                    <input value={productInfo?.requisition_no} readOnly required type="text" id="supplier" name='supplier' className="form-control form-control-sm" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="name">Date <span className='text-danger'>*</span></label>
                                    <input value={moment(productInfo?.created_at).format('DD/MM/YYYY')} readOnly required type="text" id="supplier" name='supplier' className="form-control form-control-sm" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-2">
                                    <label htmlFor="location_id">Branch <span className='text-danger'>*</span></label>
                                    <input value={productInfo?.branch_name} readOnly required type="text" id="supplier" name='supplier' className="form-control form-control-sm" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="remarks">Remarks </label>
                                    <textarea readOnly value={productInfo?.remarks} type="text" id="remarks" name='remarks' className="form-control form-control-sm" rows="3"></textarea>
                                </div>
                            </div>

                            <table className="cart-table border bg-white rounded">
                                <tbody>
                                    <tr className="cart-table-head">
                                        <td width={"10%"} className="fw-bold">Code</td>
                                        <td width={"35%"} className="fw-bold">
                                            Product Name
                                        </td>
                                        <td className="fw-bold text-end">Price</td>
                                        {/* <td className="fw-bold text-end">Vat</td> */}
                                        <td className="fw-bold text-end">Requested</td>
                                        <td className="fw-bold text-end">Delivered</td>
                                        <td className="fw-bold text-end">Pending</td>
                                        <td className="fw-bold text-end">Available</td>
                                        <td className="fw-bold ">Dispatch</td>
                                    </tr>
                                    {stockItems?.length > 0 &&
                                        stockItems?.map((test, i) => {
                                            outOfStock = Number(test?.stocks?.stock) > Number(test?.quantity) ? false : true;
                                            stockItems[i]['dispatch'] = Number(test?.stocks?.stock) > Number(test?.quantity) ? Number(test?.quantity) : Number(test?.stocks?.stock);
                                            return (
                                                <tr key={test?.product?.item_code}>
                                                    <td>{test?.product?.item_code}</td>
                                                    <td width={"20%"}>{test?.product?.name}</td>
                                                    <td className='text-end'>
                                                        {test?.price}
                                                    </td>
                                                    <td className='text-end'>
                                                        {test?.quantity}
                                                    </td>
                                                    <td className='text-end'>
                                                        {test?.central_delivered}
                                                    </td>
                                                    <td className='text-end'>
                                                        {test?.central_pending}
                                                    </td>
                                                    <td className={`${test?.stocks?.stock > test?.quantity ? "text-dark" : "text-danger"} text-end`} with={"15%"}>
                                                        {test?.stocks?.stock}
                                                    </td>
                                                    <td className='text-end'>
                                                        <input
                                                            name="deliver"
                                                            onChange={(e) => purchasePriceHandler(e, i)}
                                                            value={test?.deliver || ''}
                                                            style={{ width: '70px', }}
                                                            className='form-control form-control-sm text-center'
                                                            type='number'
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="mb-2 rx-one-button-group">
                            <button type='button' onClick={closeModal} className="btn float-end">Close</button>
                            {
                                (productInfo?.status === "Approved" || productInfo?.status === "Partially Delivered") &&
                                <button type='button' onClick={branchCheckout} disabled={loading} className="btn float-end me-2">Approve</button>
                            }
                        </div>
                    </Modal.Footer>
                </Modal >
            </div>
        </div >
    );
}

export default GreatLabApprovedRequisitions;
