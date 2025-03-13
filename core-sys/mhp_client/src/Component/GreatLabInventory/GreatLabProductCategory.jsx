import React, { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import axios from 'axios';
import AddGreatLabProductCategory from './AddGreatLabProductCategory';

function GreatLabProductCategory() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`/great-lab-product-category`)
            .then((res) => {
                setData(res.data?.categories)
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
                axios.delete(`/great-lab-product-category/${id}`).then((res) => {
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
    const emptyData = {
        name: '',
        status: '',
    }
    const [supplierInfo, setSupplierInfo] = useState({
        name: '',
        status: '',
    })
    const columns = [
        {
            title: 'SL',
            field: `supplier_code`,
            render: (row) => <div>{row?.tableData?.id + 1}</div>,
            width: "2%"
        },
        {
            title: 'Name',
            field: `name`,
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
                width: "3%"
            },
        },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
        setSupplierInfo(emptyData)
    }
    const openModal = (pd) => {
        setIsOpen(true);
        setSupplierInfo(pd);
    }
    return (
        <div className='page-content'>
            <div className='d-flex justify-content-between rx-one-button-group custom-card p-2 mb-2'>
                <h6> Product Category List </h6>
                <button type="button" onClick={() => openModal(emptyData)} className='btn float-end'>
                    Add
                </button>
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
                        pageSize: 5,
                        emptyRowsWhenPaging: false,
                        pageSizeOptions: [5, 10, 20, 50, 100],
                    }}
                />
            </div>
            <AddGreatLabProductCategory refetch={refetch} setRefetch={setRefetch} supplierInfo={supplierInfo} setSupplierInfo={setSupplierInfo} isOpen={isOpen} closeModal={closeModal} />
        </div>
    );
}

export default GreatLabProductCategory;
