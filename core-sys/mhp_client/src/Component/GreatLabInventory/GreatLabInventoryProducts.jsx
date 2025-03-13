import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import axios from 'axios';
import AddGreatLabInventoryProducts from './AddGreatLabInventoryProducts';
import moment from 'moment';

function GreatLabInventoryProducts() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-inventory`)
            .then((res) => {
                setData(res.data?.products)
                setLoading(false)
            })
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
                axios.delete(`/great-lab-inventory/${id}`).then((res) => {
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
    const emptyProducts = {
        name: '',
        manufacturer: '',
        description: '',
        mrp: '',
        purchase_price: '',
        expiry_date: new Date(),
        category_id: '',
        sub_category_id: '',
        opening_stock: '',
    }
    const [productInfo, setProductInfo] = useState({
        name: '',
        manufacturer: '',
        description: '',
        mrp: '',
        purchase_price: '',
        expiry_date: new Date(),
        category_id: '',
        sub_category_id: '',
        opening_stock: '',
    })
    const columns = [
        {
            title: 'Item Code',
            field: `item_code`,

        },
        {
            title: 'Name',
            field: `name`,

        },
        {
            title: 'MRP Price',
            field: `price`,
            render: (row) => <div className='text-center'>{parseFloat(row.mrp ? row.mrp : 0).toFixed(2)} tk</div>,
        },
        {
            title: 'Expiry Date',
            field: ``,
            render: (row) => <div className='text-center'>{moment(row.expiry_date).format('DD-MM-YYYY')}</div>,
        },
        {
            title: 'Action',
            field: 'patient',
            render: (row) => (
                <div>
                    <button onClick={() => openModal(row)} class='btn btn-sm action-btn'>
                        <i className='far fa-edit'></i>
                    </button>
                    &nbsp;
                    <button
                        onClick={(e) => deleteRowData(e, row.id)}
                        className='btn btn-sm action-btn'
                    >

                        <i className='far fa-trash'></i>
                    </button>
                </div>
            ),
            cellStyle: {
                textAlign: 'center',
            },
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
        setProductInfo(emptyProducts)
    }
    const openModal = (pd) => {
        setIsOpen(true);
        setProductInfo(pd);
    }
    return (
        <div className='page-content'>
            <div className='d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2'>
                <h6>
                    Products List
                </h6>
                {/* <Link className='text-decoration-none' to='/great-lab-inventory/add-lab-inventory-products'> */}
                <button type="button" onClick={() => openModal(emptyProducts)} className='btn float-end'>
                    Add Product
                </button>
                {/* </Link> */}
            </div>
            <div>
                <MaterialTable
                    columns={columns}
                    data={data}
                    isLoading={loading}
                    options={{
                        search: true,
                        showTitle: false,
                        searchFieldAlignment: 'left',
                        pageSize: 10,
                        emptyRowsWhenPaging: false,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                    }}
                />
            </div>
            <AddGreatLabInventoryProducts refetch={refetch} setRefetch={setRefetch} productInfo={productInfo} setProductInfo={setProductInfo} isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
}

export default GreatLabInventoryProducts;
