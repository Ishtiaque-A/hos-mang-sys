import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NewModal as Modal } from "../../common/components/NewModal";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import useUserData from "../../hooks/useUserData";
import ReactDatePicker from "react-datepicker";

export default function EditGreatLabRequisition({
  isOpen,
  setIsOpen,
  refetch,
  setRefetch,
  stockItems,
  setStockItems,
  requisitionNo,
  productInfo,
  setProductInfo,
}) {
  console.log(productInfo, "productInfo");
  const handleChange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setStockItems([]);
    setProductInfo({});
    setSearchText("");
  };
  const handleSave = (status) => {
    setLoading(true);
    const data = {
      remarks: productInfo?.remarks,
      requisition_no: requisitionNo,
      requisitor: userData?.name,
      status: status,
      date: productInfo?.date,
      booth_id: productInfo?.booth_id,
      products: stockItems?.filter((item) => item?.quantity > 0),
    };
    axios
      .put(`great-lab-requisition/${productInfo?.id}`, data)
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
  };
  const user = useUserData();
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios.get(`/great-lab-inventory`).then((res) => {
      setProducts(res.data?.products);
    });
    axios.get(`/get-user/${user?.id}`).then((res) => {
      setUserData(res?.data?.user);
    });
  }, [user]);
  const clearBillingSearch = () => {
    setSearchText("");
  };
  const addProduct = (product) => {
    let temp = [...stockItems];
    let exist = temp.find((item) => Number(item?.id) === Number(product?.id));
    if (!exist) {
      temp.push({
        ...product,
        quantity: 0,
        bonus_quantity: 0,
        purchase_price: 0,
        vat: 0,
        tax: 0,
      });
      setStockItems([...temp]);
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
  const total = stockItems.reduce(
    (total, item) =>
      total +
      parseFloat(item?.mrp || item?.price || 0) *
        parseFloat(item?.quantity || 0),
    0
  );
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
        axios
          .delete(`/great-lab-requisition-details-delete/${id}`)
          .then((res) => {
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
  console.log(stockItems, "total");
  return (
    <Modal size="md" isOpen={isOpen} onClose={closeModal}>
      <Modal.Header onClose={closeModal}>
        <Modal.Title>Edit Requisition</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSave}>
        <Modal.Body styles={{ height: "450px" }}>
          <div className="row custom-card p-2">
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="name">
                  Requisition No <span className="text-danger">*</span>
                </label>
                <input
                  value={requisitionNo}
                  readOnly
                  required
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="expiry_date"> Date</label>
                <ReactDatePicker
                  placeholderText="Date"
                  selected={
                    productInfo?.date ? new Date(productInfo?.date) : new Date()
                  }
                  dateFormat={"dd/MM/yyyy"}
                  name="date"
                  onChange={(d) =>
                    setProductInfo({
                      ...productInfo,
                      date: d ? d : new Date(),
                    })
                  }
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="name">
                  Requisitor <span className="text-danger">*</span>
                </label>
                <input
                  value={userData?.name}
                  readOnly
                  onChange={handleChange}
                  required
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="form-control form-control-sm"
                />
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
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div>
              <label htmlFor="">Select Product</label>
              <div className="lab-agent-search">
                <ReactSearchAutocomplete
                  showIcon={false}
                  placeholder={"Search Product "}
                  items={products}
                  onClear={clearBillingSearch}
                  inputSearchString={searchText || ""}
                  onSearch={(value) => setSearchText(value)}
                  formatResult={(item) => {
                    return (
                      <div
                        style={{
                          padding: "3px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontWeight: "normal",
                                fontSize: "14px",
                                margin: "0px",
                                padding: "0px",
                              }}
                            >
                              <span className="me-1">{item?.name}</span>
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontWeight: "normal",
                                fontSize: "14px",
                                margin: "0px",
                                padding: "0px",
                              }}
                            >
                              <span className="me-1">{item?.manufacturer}</span>
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontWeight: "normal",
                                fontSize: "14px",
                                margin: "0px",
                                padding: "0px",
                              }}
                            >
                              <span className="me-1">{item?.mrp}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                  resultStringKeyName="name"
                  onSelect={(item) => {
                    addProduct(item);
                  }}
                  maxResults={3}
                  fuseOptions={{
                    keys: ["name", "manufacturer"],
                  }} // Search in the description text as well
                  styling={{
                    borderRadius: "5px !important",
                    zIndex: "auto",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <table className="cart-table border bg-white rounded">
              <tbody>
                <tr className="cart-table-head">
                  <td className="fw-bold">Item Code</td>
                  <td width={"35%"} className="fw-bold">
                    Product Name
                  </td>
                  {/* <td className="fw-bold">Manufacturer</td> */}
                  <td className="fw-bold">MRP</td>
                  <td className="fw-bold text-center">Qty</td>
                  <td className="fw-bold">Total Price</td>
                  <td className="fw-bold">Act</td>
                </tr>
                {stockItems?.length > 0 &&
                  stockItems?.map((test, i) => {
                    // const amount =
                    //     (Number(test.fee) * Number(test.discount)) / 100;
                    // const total = test.fee - amount;

                    return (
                      <tr key={test.item_code}>
                        <td>{test?.item_code || test?.product?.item_code}</td>
                        <td width={"25%"}>
                          {test?.name || test?.product?.name}
                        </td>
                        {/* <td>{test?.manufacturer}</td> */}
                        <td>{test?.mrp || test?.price}</td>

                        <td>
                          <div className="mx-a">
                            <input
                              name="quantity"
                              onChange={(e) => purchasePriceHandler(e, i)}
                              value={test?.quantity}
                              style={{ width: "80px", margin: "auto" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>
                          {parseFloat(test?.quantity || 0) *
                            parseFloat(test?.mrp || test?.price || 0)}
                        </td>
                        <td>
                          {test?.requisition_id ? (
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
                <tr className="border-top ">
                  <td colSpan={5} className="text-end pe-4 fw-bold">
                    Grand Total
                  </td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-2 rx-one-button-group">
            <button
              type="button"
              onClick={() => handleSave("Pending")}
              disabled={loading || total < 1}
              className="btn float-end"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => handleSave("Approved")}
              disabled={loading || total < 1}
              className="btn float-end me-2"
            >
              Approve
            </button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
