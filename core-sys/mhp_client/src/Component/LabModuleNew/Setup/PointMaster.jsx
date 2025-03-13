import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';

function PointMaster() {
    const [modalIsOpenForEdit, setModalIsOpenForEdit] = useState(false);
    const [updateData, setUpdateData] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const [data, setData] = useState([]);
    const [modalIsOpenForAdd, setModalIsOpenForAdd] = useState(false);

    useEffect(() => {
        axios.get('doctors-point-master').then((res) => {
            setData(res.data.data || []);
        });
    }, [refetch]);
    const handleEdit = (item) => {
        setUpdateData(item);
        setModalIsOpenForEdit(true);
    };

    const handleDelete = (item) => {
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
                axios.delete(`doctors-point-master/${item.id}`).then((res) => {
                    if (res.status === 200) {
                        setRefetch(!refetch);
                        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
                    }
                });
            }
        });
    };

    const columns = [
        {
            title: 'ID',
            field: 'id',
            cellStyle: {
                width: '5%',
                textAlign: 'center !important',
            },
        },
        {
            title: 'Point Type',
            field: 'name',
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
                        <button
                            onClick={() => handleEdit(row)}
                            style={{
                                all: 'unset',
                                fontSize: '13px',
                                cursor: 'pointer',
                            }}
                        >

                            <i className='far fa-edit'></i>
                        </button>
                        <button
                            onClick={() => handleDelete(row)}
                            style={{
                                all: 'unset',
                                fontSize: '13px',
                                cursor: 'pointer',
                            }}
                        >

                            <i className='far fa-trash'></i>
                        </button>
                    </div>
                );
            },
        },
    ];

    const onRefetch = () => setRefetch(!refetch);

    return (
        <div className='shadow-sm p-2 mb-3 bg-body rounded mt-1'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h6 className='mt-1 mx-2'>Point Master Setup</h6>
                <button
                    style={{
                        backgroundColor: '#69B128',
                        color: 'white',
                        fontWeight: 'medium',
                        border: 'none',
                        borderRadius: '7px',
                        padding: '5px 15px',
                    }}
                    onClick={() => setModalIsOpenForAdd(true)}
                >
                    Add
                </button>
            </div>
            <hr />
            <div className='row'>
                <div className='col-md-12'>
                    <MaterialTable
                        columns={columns}
                        data={data}
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
            <AddSpecimen
                modalIsOpenForAdd={modalIsOpenForAdd}
                setModalIsOpenForAdd={setModalIsOpenForAdd}
                onRefetch={onRefetch}
            />
            <EditSpecimen
                onRefetch={onRefetch}
                data={updateData}
                modalIsOpenForEdit={modalIsOpenForEdit}
                setModalIsOpenForEdit={setModalIsOpenForEdit}
            />
        </div>
    );
}

export default PointMaster;

const customStyles = {
    content: {
        top: '30%',
        left: '30%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        height: '250px',
        transform: 'translate(-50%, -50%)',
    },
};

const AddSpecimen = ({
    modalIsOpenForAdd,
    setModalIsOpenForAdd,
    onRefetch,
}) => {
    const [btnLoading, setBtnLoading] = useState(false);

    const handleSubmit = async (e) => {
        setBtnLoading(true);
        try {
            e.preventDefault();
            const name = e.target.name.value;
            const res = await axios.post('doctors-point-master', { name });

            if (res.status === 200) {
                toast.success(res?.data?.message);
                onRefetch();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setModalIsOpenForAdd(false);
            setBtnLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpenForAdd}
                onRequestClose={() => setModalIsOpenForAdd(false)}
                style={customStyles}
                contentLabel='Example Modal'
            >
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <h5>Add point type</h5>
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }}
                    >
                        <span
                            className='ms-3'
                            style={{ fontSize: '15px', cursor: 'pointer' }}
                            onClick={() => setModalIsOpenForAdd(false)}
                        >
                            <i class='fal fa-times'></i>
                        </span>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-3'>
                        <div className='form-group'>
                            <label htmlFor='name' className='form-label'>
                                Point Type
                            </label>
                            <input
                                type='text'
                                className='form-control mb-2 form'
                                id='name'
                                name='name'
                                required
                            />
                        </div>
                        <div className='row'>
                            <div className='rx-one-button-group p-4'>
                                <button disabled={btnLoading} className='btn float-end'>
                                    {btnLoading ? 'Loading...' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

const EditSpecimen = ({
    data,
    modalIsOpenForEdit,
    setModalIsOpenForEdit,
    onRefetch,
}) => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [updateData, setUpdateData] = useState(data);
    useEffect(() => {
        setUpdateData(data);
    }, [data]);
    const handleSubmit = async (e) => {
        setBtnLoading(true);
        try {
            e.preventDefault();
            const name = e.target.name.value;
            const res = await axios.put(`doctors-point-master/${data?.id}`, {
                name,
            });

            if (res.status === 200) {
                toast.success(res?.data?.message);
                onRefetch();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setModalIsOpenForEdit(false);
            setBtnLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpenForEdit}
                onRequestClose={() => setModalIsOpenForEdit(false)}
                style={customStyles}
                contentLabel='Example Modal'
            >
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <h5>Update point type</h5>
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }}
                    >
                        <span
                            className='ms-3'
                            style={{ fontSize: '15px', cursor: 'pointer' }}
                            onClick={() => setModalIsOpenForEdit(false)}
                        >
                            <i class='fal fa-times'></i>
                        </span>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-3'>
                        <div className='form-group'>
                            <label htmlFor='name' className='form-label'>
                                Point Type
                            </label>
                            <input
                                type='text'
                                className='form-control mb-2 form'
                                id='name'
                                value={updateData?.name || ''}
                                onChange={(e) =>
                                    setUpdateData({ ...updateData, name: e.target.value })
                                }
                                name='name'
                                required
                            />
                        </div>
                        <div className='row'>
                            <div className='rx-one-button-group p-4'>
                                <button disabled={btnLoading} className='btn float-end'>
                                    {btnLoading ? 'Loading...' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};
