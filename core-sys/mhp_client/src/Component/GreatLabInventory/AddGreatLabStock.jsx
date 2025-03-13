import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { NewModal as Modal } from "../../common/components/NewModal";
import useUserData from "../../hooks/useUserData";
import Select from "react-select";
import { useOutletContext } from "react-router-dom";
export default function AddGreatLabStock({
  isOpen,
  setIsOpen,
  productInfo,
  refetch,
  setRefetch,
  setProductInfo,
  stockItems,
  setStockItems,
  purchase,
  handlePurchase,
}) {
  const [refetchStock, setRefetchStock] = useOutletContext();
  const user = useUserData();
  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    setIsOpen(false);
    setProductInfo({});
    setStockItems([]);
  };
  const [loading, setLoading] = useState(false);
  const handleSave = (status) => {
    setLoading(true);
    let totalPrice = stockItems.reduce((total, item) => {
      return (
        total +
        (parseFloat(item?.purchase_price) +
          parseFloat(item?.vat ? item?.vat : 0)) *
          parseFloat(item?.quantity)
      );
    }, 0);
    const data = {
      ...productInfo,
      totalPrice: totalPrice,
      stock_in_by: user?.name,
      status: status,
      stock_items: stockItems?.filter((item) => item?.quantity > 0),
    };
    if (productInfo?.txn_id) {
      axios
        .post(`great-lab-stock-in-update/${productInfo?.id}`, data)
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
            setRefetchStock(!refetchStock);
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
        .post("great-lab-stock-in", data)
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
            setRefetchStock(!refetchStock);
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

  const purchasePriceHandler = (e, index) => {
    let temp = [...stockItems];
    temp[index][e.target.name] = e.target.value;
    setStockItems([...temp]);
  };
  const removeTest = (index) => {
    let temp = [...stockItems];
    temp.splice(index, 1);
    setStockItems([...temp]);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/great-lab-stock-in-details-delete/${id}`).then((res) => {
          if (res.data.status === 200) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Deleted!",
              text: "Your data has been deleted.",
              timer: 2500,
            });
            setStockItems(stockItems.filter((item) => item?.id !== id));
            setRefetch(!refetch);
          }
        });
      }
    });
  };
  return (
    <Modal size="md" isOpen={isOpen} onClose={closeModal}>
      <Modal.Header onClose={closeModal}>
        <Modal.Title>Stock In</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSave}>
        <Modal.Body styles={{ height: "450px" }}>
          <div className="row custom-card p-2">
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="supplier">
                  Purchase Order No <span className="text-danger">*</span>
                </label>
                {productInfo?.reference_invoice_no ? (
                  <input
                    type="text"
                    readOnly
                    value={productInfo?.reference_invoice_no}
                    id="supplier"
                    name="supplier"
                    className="form-control form-control-sm"
                  />
                ) : (
                  <Select
                    options={purchase}
                    onChange={(e) => handlePurchase(e)}
                    getOptionLabel={(data) => `${data?.purchase_no}`}
                    getOptionValue={(data) => `${data?.id}`}
                    value={purchase?.find(
                      (item) =>
                        Number(item?.purchase_no) ===
                        Number(productInfo?.reference_invoice_no)
                    )}
                    styles={{
                      menu: (provided) => ({
                        ...provided,
                        maxHeight: "200px", // Set a maximum height for the dropdown menu
                        overflowY: "auto", // Enable vertical scrolling
                        "::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "::-webkit-scrollbar-thumb": {
                          background: "gray",
                          borderRadius: "10px",
                        },
                      }),
                    }}
                  />
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="supplier">
                  Supplier <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  value={
                    productInfo?.supplier?.name ||
                    productInfo?.supplier_details?.name
                  }
                  id="supplier"
                  name="supplier"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="delivery_date">Stock In Date</label>
                <ReactDatePicker
                  placeholderText="Delivery Date"
                  selected={
                    productInfo?.delivery_date
                      ? new Date(productInfo?.delivery_date)
                      : new Date()
                  }
                  dateFormat={"dd/MM/yyyy"}
                  name="delivery_date"
                  autoFocus={false}
                  onChange={(d) =>
                    setProductInfo({
                      ...productInfo,
                      delivery_date: d ? d : new Date(),
                    })
                  }
                />
              </div>
              <div className="mb-2">
                <label htmlFor="remarks">Reference No </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={productInfo?.reference_order_no}
                  id="supplier"
                  name="reference_order_no"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="remarks">Remarks </label>
              <textarea
                value={productInfo?.remarks}
                onChange={handleChange}
                type="text"
                id="remarks"
                name="remarks"
                className="form-control form-control-sm"
                rows="2"
              ></textarea>
            </div>
            <table className="cart-table border bg-white rounded">
              <tbody>
                <tr className="cart-table-head">
                  <td className="fw-bold">Code</td>
                  <td width={"35%"} className="fw-bold">
                    Product Name
                  </td>
                  {/* <td className="fw-bold">Manufacturer</td> */}
                  {/* <td className="fw-bold">MRP</td> */}
                  <td className="fw-bold">PP</td>
                  <td className="fw-bold">Vat</td>
                  <td className="fw-bold">Approved Qty</td>
                  <td className="fw-bold">Received Qty</td>
                  <td className="fw-bold">Bonus Qty</td>
                  <td className="fw-bold">Action</td>
                </tr>
                {stockItems?.length > 0 &&
                  stockItems?.map((test, i) => {
                    return (
                      <tr key={test.item_code}>
                        <td>{test.item_code || test?.product?.item_code}</td>
                        <td width={"20%"}>
                          {test?.name || test?.product?.name}
                        </td>

                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="purchase_price"
                              onChange={(e) => purchasePriceHandler(e, i)}
                              value={test?.purchase_price}
                              style={{ width: "50px" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                              readOnly
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="vat"
                              onChange={(e) => purchasePriceHandler(e, i)}
                              value={test?.vat}
                              style={{ width: "50px" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                              readOnly
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="quantity"
                              value={test?.quantity}
                              style={{ width: "60px" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                              readOnly
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="quantity"
                              onChange={(e) => purchasePriceHandler(e, i)}
                              value={test?.quantity}
                              style={{ width: "60px" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="bonus_quantity"
                              onChange={(e) => purchasePriceHandler(e, i)}
                              value={test?.bonus_quantity}
                              style={{ width: "60px" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>
                          {test?.stock_in_id ? (
                            <button
                              type="button"
                              onClick={() => handleDelete(test?.id)}
                              className="btn  btn-sm action-btn"
                            >
                              <i className="far fa-trash"></i>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => removeTest(i)}
                              className="btn  btn-sm action-btn"
                            >
                              <i className="far fa-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-2 rx-one-button-group">
            <>
              <button
                type="button"
                onClick={() => handleSave("Pending")}
                disabled={loading}
                className="btn float-end"
              >
                {productInfo?.reference_invoice_no ? "Update" : "Save"}
              </button>
            </>
            {productInfo?.reference_invoice_no && (
              <>
                <button
                  type="button"
                  onClick={() => handleSave("Approved")}
                  disabled={loading}
                  className="btn float-end me-2"
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
