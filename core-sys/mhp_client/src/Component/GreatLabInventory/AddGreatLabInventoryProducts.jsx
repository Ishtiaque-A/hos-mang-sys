import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { Modal } from "../../common/components/Modal";

export default function AddGreatLabInventoryProducts({
  productInfo,
  setProductInfo,
  isOpen,
  closeModal,
  refetch,
  setRefetch,
}) {
  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (productInfo?.id) {
      axios
        .put(`great-lab-inventory/${productInfo?.id}`, productInfo)
        .then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Product Updated Successfully",
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
        .post("great-lab-inventory", productInfo)
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
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    axios.get("great-lab-product-category").then((res) => {
      setCategory(res.data?.categories);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`great-lab-product-sub-category-by-id/${productInfo?.category_id}`)
      .then((res) => {
        setSubCategory(res.data?.categories);
      });
  }, [productInfo?.category_id]);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} style={{ minWidth: "900px" }}>
      <Modal.Header onClose={closeModal}>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <form style={{ width: "800px" }} onSubmit={handleSave}>
        <Modal.Body>
          <div className="row custom-card p-2">
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="name">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  value={productInfo?.name}
                  onChange={handleChange}
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="expiry_date">Expiry Date</label>
                <ReactDatePicker
                  placeholderText="From Date"
                  selected={
                    productInfo?.expiry_date
                      ? new Date(productInfo?.expiry_date)
                      : new Date()
                  }
                  dateFormat={"dd/MM/yyyy"}
                  name="expiry_date"
                  onChange={(d) =>
                    setProductInfo({
                      ...productInfo,
                      expiry_date: d ? d : new Date(),
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  value={productInfo?.category_id}
                  onChange={handleChange}
                  name="category_id"
                  required
                  id="category"
                  className="form-select form-select-sm"
                >
                  <option value="">Select</option>
                  {category?.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="description">Description </label>
                <textarea
                  value={productInfo?.description}
                  onChange={handleChange}
                  type="text"
                  id="description"
                  name="description"
                  className="form-control form-control-sm"
                  rows="1"
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="mrp">
                  MRP <span className="text-danger">*</span>
                </label>
                <input
                  value={productInfo?.mrp}
                  onChange={handleChange}
                  required
                  type="number"
                  step="any"
                  id="mrp"
                  name="mrp"
                  className="form-control form-control-sm"
                />
              </div>
              {/* <div className="mb-2">
                                <label htmlFor="opening_stock">Opening Stock</label>
                                <input value={productInfo?.opening_stock} onChange={handleChange} type="number" id="opening_stock" name='opening_stock' className="form-control form-control-sm" />
                            </div> */}
              <div className="mb-2">
                <label htmlFor="sub_category">Sub Category</label>
                <select
                  value={productInfo?.sub_category_id}
                  onChange={handleChange}
                  name="sub_category_id"
                  id="sub_category"
                  className="form-select form-select-sm"
                >
                  <option value="">Select</option>
                  {subCategory?.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-2 rx-one-button-group">
            <button type="submit" disabled={loading} className="btn float-end">
              {productInfo?.id ? "Update" : "Save"}
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
