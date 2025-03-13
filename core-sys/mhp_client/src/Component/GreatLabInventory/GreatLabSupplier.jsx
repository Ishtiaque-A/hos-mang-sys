import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import axios from 'axios';
import AddSupplier from './AddSupplier';

function GreatLabSupplier() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-supplier`)
            .then((res) => {
                setData(res.data?.suppliers)
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
                axios.delete(`/great-lab-supplier/${id}`).then((res) => {
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
    const emptySupplier = {
        name: '',
        address: '',
        phone: '',
        mobile: '',
        email: '',
        type: '',
    }
    const [supplierInfo, setSupplierInfo] = useState({
        name: '',
        address: '',
        phone: '',
        mobile: '',
        email: '',
        type: '',
    })
    const columns = [
        {
            title: 'Code',
            field: `supplier_code`,
        },
        {
            title: 'Name',
            field: `name`,
        },
        {
            title: 'Mobile',
            field: `mobile`,
        },
        {
            title: 'Phone',
            field: `phone`,
        },
        {
            title: 'Email',
            field: `email`,
        },
        // {
        //     title: 'Status',
        //     field: `status`,
        // },
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
        setSupplierInfo(emptySupplier)
    }
    const openModal = (pd) => {
        setIsOpen(true);
        setSupplierInfo(pd);
    }
    return (
        <div className='page-content'>
            <div className='d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2'>
                <h6>
                    Supplier List
                </h6>
                {/* <Link className='text-decoration-none' to='/great-lab-inventory/add-lab-inventory-products'> */}
                <button type="button" onClick={() => openModal(emptySupplier)} className='btn float-end'>
                    Add Supplier
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
            <AddSupplier refetch={refetch} setRefetch={setRefetch} supplierInfo={supplierInfo} setSupplierInfo={setSupplierInfo} isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
}

export default GreatLabSupplier;
