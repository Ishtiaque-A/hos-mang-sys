import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CiFileOff } from "react-icons/ci";
import Swal from 'sweetalert2';
export default function LabPointsPlan() {
    const columns = [
        {
            title: 'ID',
            field: 'id',
            cellStyle: {
                width: '5%',
                textAlign: 'center',
            },
        },
        {
            title: 'Title',
            field: 'title',
        },
        {
            title: 'Status',
            field: '',
            render: (row) => {
                return `${row.status === 1 ? 'Active' : 'Inactive'}`;
            },
            cellStyle: {
                textAlign: 'center !important',
            },
        },
        {
            title: 'Action',
            field: 'action',
            cellStyle: {
                textAlign: 'center !important',
                width: '7%',
            },
            render: (row) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            gap: '5px',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Link className="text-decoration-none text-black" to={`/lab-module-new/lab-points-plan-details/${row.id}`}>
                            <button
                                //   onClick={() => handleEdit(row)}
                                style={{
                                    all: 'unset',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                }}
                            >

                                <i className='far fa-edit'></i>
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDisable(row.id)}
                            style={{
                                all: 'unset',
                                fontSize: '15px',
                                cursor: 'pointer',
                            }}
                        >

                            {/* <i className='far fa-trash'></i> */}
                            <CiFileOff />
                        </button>
                    </div>
                );
            },
        },
    ];
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get('doctors-point-plan').then((res) => {
            setData(res.data || [])
        })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])
    const handleDisable = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Disable it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`doctors-point-plan-disable/${id}`)
                    .then((res) => {
                        if (res.data.status === 200) {
                            setData(data.filter((item) => item.id !== id))
                        }
                        Swal.fire('Success!', res.data.message, 'success')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })

    }
    // axios
    //     .post(`doctors-point-plan-disable/${id}`)
    //     .then((res) => {
    //         if (res.data.status === 200) {
    //             setData(data.filter((item) => item.id !== id))
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

    return (
        <div>
            <div className='shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1'>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <h6 className='mt-1 mx-2'>Points Plan</h6>
                    <Link className='text-decoration-none' to='/lab-module-new/add-points-plan'>
                        <button
                            style={{
                                backgroundColor: '#69B128',
                                color: 'white',
                                fontWeight: 'medium',
                                border: 'none',
                                borderRadius: '7px',
                                padding: '5px 15px',
                            }}
                        //   onClick={() => setModalIsOpenForAdd(true)}
                        >
                            Add
                        </button>
                    </Link>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-md-12'>
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
                                pageSizeOptions: [10, 20, 50, 100],
                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
