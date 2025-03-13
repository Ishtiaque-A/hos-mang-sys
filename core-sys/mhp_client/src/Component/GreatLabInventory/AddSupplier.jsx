import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Modal } from '../../common/components/Modal'

export default function AddSupplier({ supplierInfo, setSupplierInfo, isOpen, closeModal, refetch, setRefetch }) {
    const handleChange = (e) => {
        setSupplierInfo({ ...supplierInfo, [e.target.name]: e.target.value })
    }
    const [loading, setLoading] = useState(false);
    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (supplierInfo?.id) {
            axios.put(`great-lab-supplier/${supplierInfo?.id}`, supplierInfo)
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
            axios.post('great-lab-supplier', supplierInfo)
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
        <Modal isOpen={isOpen} style={{ minWidth: '900px' }}>
            <Modal.Header onClose={closeModal}>
                <Modal.Title>Add Supplier</Modal.Title>
            </Modal.Header>
            <form style={{ width: "800px" }} onSubmit={handleSave}>
                <Modal.Body >
                    <div className="row custom-card p-2">
                        <div className="col-6">
                            <div className="mb-2">
                                <label htmlFor="name">Name <span className='text-danger'>*</span></label>
                                <input value={supplierInfo?.name} onChange={handleChange} required type="text" id="name" name='name' className="form-control form-control-sm" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="mobile">Mobile <span className='text-danger'>*</span></label>
                                <input value={supplierInfo?.mobile} onChange={handleChange} required type="number" id="mobile" name='mobile' className="form-control form-control-sm" />
                            </div>

                        </div>
                        <div className="col-6">
                            <div className="mb-2">
                                <label htmlFor="phone">Phone</label>
                                <input value={supplierInfo?.phone} onChange={handleChange} type="text" id="phone" name='phone' className="form-control form-control-sm" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="Email">Email</label>
                                <input value={supplierInfo?.email} onChange={handleChange} type="email" id="Email" name='email' className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address">Address <span className='text-danger'>*</span> </label>
                            <textarea value={supplierInfo?.address} required onChange={handleChange} type="text" id="address" name='address' className="form-control form-control-sm" rows="3"></textarea>
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
