import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import MaterialTable, { MTableToolbar } from 'material-table';
import axios from 'axios';
import { FaEye, FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditGreatLabRequisition from './EditGreatLabRequisition';
import useCredentialURL from '../../hooks/useCredentialURL';
import useUserData from '../../hooks/useUserData';
import { NewModal as Modal } from '../../common/components/NewModal'
import AddGreatLabRequisition from './AddGreatLabRequisition';

function GreatLabBoothRequisitions() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [branches, setBranches] = useState([]);
    const { SaasAuthURL } = useCredentialURL();
    const user = useUserData();
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-requisition`)
            .then((res) => {
                setData(res.data?.booths)
                setLoading(false)
            })
        axios
            .get(`${SaasAuthURL}/branch/organization/${user?.organization_id}`)
            .then((res) => {
                if (res.status === 200) {
                    setBranches(res.data.data);
                }
            })
            .catch((err) => console.log(err));
    }, [refetch])

    const deleteRowData = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/great-lab-requisition/${id}`).then((res) => {
                    if (res.data.status === 200) {
                        thisClicked.closest('tr').remove();
                    }
                });
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    timer: 2500,
                });
            }
        });
    };


    const columns = [
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
            render: (row) => <div>{branches.find(item => Number(item?.id) === Number(row?.branch_id))?.name}</div>,
        },
        {
            title: 'Booth',
            field: `name`,
            render: (row) => <div>{(row?.booth?.name)}</div>,
        },

        // {
        //     title: 'Booth No',
        //     field: `name`,
        //     render: (row) => <div>{(row?.booth?.booth_no)}</div>,
        // },
        {
            title: 'Requisitor',
            field: `requisitor_name`,
        },
        {
            title: 'Status',
            field: `status`,
            render: (row) => <div>{
                row?.status === "Approved" ?
                    <span className="badge badge-info">Approved</span>
                    : row?.status === "Partially Delivered" ?
                        <span className="badge badge-warning">Partially Delivered</span>
                        : row?.status === "Delivered" ?
                            <span className="badge badge-success">Delivered</span>
                            : <span className="badge badge-danger">{row?.status}</span>
            }</div>,

        },
        {
            title: 'Action',
            field: 'patient',
            render: (row) => (
                <div>
                    {
                        row?.status === 'Pending' &&
                        <button onClick={() => openModal(row, "edit")} class='btn btn-sm action-btn'>
                            <i className='far fa-edit'></i>
                        </button>
                    }

                    &nbsp;
                    {
                        (row?.status === 'Approved' || row?.status === 'Delivered') &&
                        <button onClick={() => openModal(row, "view")} className='btn btn-sm action-btn'>
                            <FaEye />
                        </button>
                    }
                    {
                        row?.status === 'Pending' &&
                        <button
                            onClick={(e) => deleteRowData(e, row.id)}
                            className='btn btn-sm action-btn'
                        >

                            <i className='far fa-trash'></i>
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
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenView, setIsOpenView] = useState(false);

    const [requisitionNo, setRequisitionNo] = useState('');
    const openModal = (pd, type) => {
        if (type === 'view') {
            setIsOpenView(true);
        } else {
            setIsOpen(true);
        }
        setProductInfo(pd);
        setStockItems(pd?.details || []);
        setRequisitionNo(pd?.requisition_no);
    }
    const closeModal = () => {
        setIsOpenView(false);
        setStockItems([]);
        setProductInfo({});
    }
    console.log(stockItems, "stockItems")
    let dispatched = 0;
    const handleApprove = () => {
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
                axios.post(`/great-lab-booth-stock-in/${productInfo?.id}`).then((res) => {
                    if (res.data.status === 200) {
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Stock in success!',
                            // text: 'Your data has been deleted.',
                            timer: 2500,
                        });
                        closeModal();
                        setRefetch(!refetch)
                    }
                });

            }
        });
    }
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
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    components={{
                        Toolbar: (props) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <MTableToolbar {...props} />
                                </div>
                                <div className="me-1">
                                    <button style={{
                                        backgroundColor: '#69B128',
                                        color: 'white',
                                        fontWeight: 'medium',
                                        border: 'none',
                                        borderRadius: '7px',
                                        padding: '3px 15px',
                                    }} onClick={() => setIsOpenAdd(true)} className="btn btn-primary btn-sm me-2">Add Requisition</button>
                                </div>
                            </div>
                        ),
                    }}
                    options={{
                        search: true,
                        showTitle: false,
                        searchFieldAlignment: 'left',
                        pageSize: 5,
                        emptyRowsWhenPaging: false,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                    }}
                />
            </div>
            <EditGreatLabRequisition
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                productInfo={productInfo}
                setProductInfo={setProductInfo}
                refetch={refetch}
                setRefetch={setRefetch}
                stockItems={stockItems}
                setStockItems={setStockItems}
                requisitionNo={requisitionNo}
            />
            <AddGreatLabRequisition isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} refetch={refetch} setRefetch={setRefetch} />
            <Modal size='md' isOpen={isOpenView} onClose={closeModal}>
                <Modal.Header onClose={closeModal} >
                    <Modal.Title>Edit Requisition</Modal.Title>
                </Modal.Header>
                <form >
                    <Modal.Body styles={{ height: "450px" }} >
                        <div className="row custom-card p-2">
                            <div className="col-6">
                                <div className="mb-2">
                                    <label htmlFor="name">Requisition No <span className='text-danger'>*</span></label>
                                    <input value={requisitionNo} readOnly required type="text" id="supplier" name='supplier' className="form-control form-control-sm" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="expiry_date"> Date</label>
                                    <input type="text" value={productInfo?.date ? moment(productInfo?.date).format('DD/MM/YYYY') : moment(new Date()).format('DD/MM/YYYY')} readOnly className="form-control form-control-sm" />
                                </div>

                            </div>
                            <div className="col-6">
                                <div className="mb-2">
                                    <label htmlFor="name">Requisitor <span className='text-danger'>*</span></label>
                                    <input value={productInfo?.requisitor_name} readOnly required type="text" id="supplier" name='supplier' className="form-control form-control-sm" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="remarks">Remarks </label>
                                    <textarea value={productInfo?.remarks} readOnly type="text" id="remarks" name='remarks' className="form-control form-control-sm" rows="3"></textarea>
                                </div>
                            </div>

                            <table className="cart-table border bg-white rounded">
                                <tbody>
                                    <tr className="cart-table-head">
                                        <td className="fw-bold">Item Code</td>
                                        <td width={"35%"} className="fw-bold">
                                            Product Name
                                        </td>
                                        {/* <td className="fw-bold">Manufacturer</td> */}
                                        <td className="fw-bold">MRP</td>
                                        <td className="fw-bold">Qty</td>
                                        <td className="fw-bold">Dispatched Qty</td>
                                        <td className="fw-bold">Total Price</td>
                                    </tr>
                                    {stockItems?.length > 0 &&
                                        stockItems?.map((test, i) => {
                                            // const amount =
                                            //     (Number(test.fee) * Number(test.discount)) / 100;
                                            // const total = test.fee - amount;
                                            dispatched = dispatched + Number(test?.dispatched_quantity);
                                            return (
                                                <tr key={test.item_code}>
                                                    <td>{test?.item_code || test?.product?.item_code}</td>
                                                    <td width={"25%"}>{test?.name || test?.product?.name}</td>
                                                    {/* <td>{test?.manufacturer}</td> */}
                                                    <td>
                                                        {test?.mrp || test?.price}
                                                    </td>

                                                    <td>
                                                        {test?.quantity}
                                                    </td>
                                                    <td>
                                                        {test?.dispatched_quantity}
                                                    </td>
                                                    <td>
                                                        {parseFloat(test?.quantity || 0) * parseFloat(test?.mrp || test?.price || 0)}
                                                    </td>

                                                </tr>
                                            );
                                        })}
                                    {/* <tr className='border-top '>
                                        <td colSpan={5} className="text-end pe-4 fw-bold">
                                            Grand Total
                                        </td>
                                        <td>{total}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="mb-2 rx-one-button-group">
                            <button type='button' onClick={closeModal} className="btn float-end">Close</button>
                            <button type='button' onClick={handleApprove} disabled={loading || dispatched < 1} className="btn float-end me-2">Stock In</button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal >
        </div>
    );
}

export default GreatLabBoothRequisitions;
