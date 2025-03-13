import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Modal } from '../../common/components/Modal'

export default function AddGreatLabProductSubCategory({ supplierInfo, setSupplierInfo, isOpen, closeModal, refetch, setRefetch }) {
    const handleChange = (e) => {
        setSupplierInfo({ ...supplierInfo, [e.target.name]: e.target.value })
    }
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get('great-lab-product-category')
            .then((res) => {
                setCategory(res.data?.categories)
            })
    }, [])
    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (supplierInfo?.id) {
            axios.put(`great-lab-product-sub-category/${supplierInfo?.id}`, supplierInfo)
                .then((res) => {
                    if (res.data.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "Data Updated Successfully",
                        })
                        closeModal();
                        setLoading(false)
                        setRefetch(!refetch)
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `${err?.response?.data?.message}`,
                    })
                })
        } else {
            axios.post('great-lab-product-sub-category', supplierInfo)
                .then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "Data Added Successfully",
                        })
                        setLoading(false)
                        closeModal();
                        setRefetch(!refetch)
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `${err?.response?.data?.message}`,
                    })
                })


        }

    }
    return (
        <Modal isOpen={isOpen} style={{ minWidth: '500px' }}>
            <Modal.Header onClose={closeModal}>
                <Modal.Title>Add Sub Category</Modal.Title>
            </Modal.Header>
            <form style={{ width: "500px" }} onSubmit={handleSave}>
                <Modal.Body >
                    <div className="row custom-card p-2">
                        <div className="mb-2">
                            <label htmlFor="category">Category <span className='text-danger'>*</span></label>
                            <select value={supplierInfo?.category_id} onChange={handleChange} name="category_id" required id="category" className="form-select form-select-sm">
                                <option value="">Select</option>
                                {
                                    category?.map((item, index) => (
                                        <option key={index} value={item?.id}>{item?.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="name">Name <span className='text-danger'>*</span></label>
                            <input value={supplierInfo?.name} onChange={handleChange} required type="text" id="name" name='name' className="form-control form-control-sm" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="mb-2 rx-one-button-group">
                        <button type='submit' disabled={loading} className="btn float-end">{supplierInfo?.id ? 'Update' : 'Save'}</button>
                    </div>
                </Modal.Footer>
            </form>
        </Modal >

    )
}
