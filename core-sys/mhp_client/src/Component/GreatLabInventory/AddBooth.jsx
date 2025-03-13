import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal } from "../../common/components/Modal";

export default function AddBooth({
  supplierInfo,
  branch,
  setSupplierInfo,
  isOpen,
  closeModal,
  refetch,
  setRefetch,
}) {
  const handleChange = (e) => {
    setSupplierInfo({ ...supplierInfo, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (supplierInfo?.id) {
      axios
        .put(`great-lab-booth/${supplierInfo?.id}`, supplierInfo)
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Data Updated Successfully",
            });
            closeModal();
            setLoading(false);
            setRefetch(!refetch);
          }
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err?.response?.data?.message}`,
          });
        });
    } else {
      axios
        .post("great-lab-booth", supplierInfo)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Data Added Successfully",
            });
            setLoading(false);
            closeModal();
            setRefetch(!refetch);
          }
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err?.response?.data?.message}`,
          });
        });
    }
  };
  return (
    <Modal isOpen={isOpen} style={{ minWidth: "600px" }}>
      <Modal.Header onClose={closeModal}>
        <Modal.Title>{supplierInfo?.id ? "Update" : "Add"} Booth</Modal.Title>
      </Modal.Header>
      <form style={{ width: "600px" }} onSubmit={handleSave}>
        <Modal.Body>
          <div className="row custom-card p-2">
            <div className="mb-2">
              <label htmlFor="category">
                Branch <span className="text-danger">*</span>
              </label>
              <select
                disabled={supplierInfo?.branch_id ? true : false}
                value={supplierInfo?.branch_id}
                onChange={handleChange}
                name="branch_id"
                required
                id="category"
                className="form-select form-select-sm"
              >
                <option value="">Select</option>
                {branch?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="name">
                Name <span className="text-danger">*</span>
              </label>
              <input
                value={supplierInfo?.name}
                onChange={handleChange}
                required
                type="text"
                id="name"
                name="name"
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="booth_no">
                Booth No <span className="text-danger">*</span>
              </label>
              <input
                value={supplierInfo?.booth_no}
                onChange={handleChange}
                required
                type="number"
                id="booth_no"
                name="booth_no"
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="category">
                Status <span className="text-danger">*</span>
              </label>
              <select
                value={supplierInfo?.status}
                onChange={handleChange}
                name="status"
                required
                id="category"
                className="form-select form-select-sm"
              >
                <option value="">Select</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-2 rx-one-button-group">
            <button type="submit" disabled={loading} className="btn float-end">
              {supplierInfo?.id ? "Update" : "Save"}
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
