import React, { useState } from "react";
import { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import AddGreatLabStock from "./AddGreatLabStock";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { NewModal as Modal } from "../../common/components/NewModal";
import { FaRegEye } from "react-icons/fa6";

function GreatLabStockIn() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [purchase, setPurchase] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .post(`great-lab-stock-in-report`, filter)
      .then((res) => {
        setData(res?.data?.stock || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    axios.get(`purchase-for-stock-in`).then((res) => {
      console.log(res, "dfdfd");
      setPurchase(res?.data?.stock || []);
    });
  }, [refetch]);

  console.log(data, "dde");
  const handleFilter = () => {
    axios.post(`great-lab-stock-in-report`, filter).then((res) => {
      setData(res?.data?.stock || []);
    });
  };
  const columns = [
    {
      title: "Txn Id",
      field: `txn_id`,
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Supplier",
      field: `name`,
      render: (row) => <div className="">{row?.supplier_details?.name}</div>,
    },
    {
      title: "Purchase No",
      field: `name`,
      render: (row) => <div className="">{row?.reference_invoice_no}</div>,
    },

    {
      title: "Date",
      field: `status`,
      render: (row) => (
        <div className="">{moment(row?.created_at).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Created By",
      field: `status`,
      render: (row) => <div className="">{row?.stock_in_by}</div>,
    },
    {
      title: "Status",
      field: `status`,
      render: (row) => (
        <div className="">
          {row?.status === "Pending" ? (
            <span className="badge bg-danger">Pending</span>
          ) : row?.status === "Approved" ? (
            <span className="badge bg-info">Approved</span>
          ) : row?.status === "Stocked In" ? (
            <span className="badge bg-success">Stocked In</span>
          ) : (
            <span className="badge bg-danger">{row?.status}</span>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      field: "patient",
      render: (row) => (
        <div>
          {row?.status === "Pending" && (
            <button
              onClick={() => openModal(row)}
              class="btn btn-sm action-btn"
            >
              <i className="far fa-edit"></i>
            </button>
          )}

          <button
            onClick={() => openModalDetails(row)}
            class="btn btn-sm action-btn"
          >
            <FaRegEye />
          </button>
        </div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [productInfo, setProductInfo] = useState({
    supplier: "",
    remarks: "",
    delivery_date: "",
    location_id: "",
    reference_order_no: "",
  });
  const [stockItems, setStockItems] = useState([]);

  const openModal = (pd) => {
    setIsOpen(true);
    setProductInfo(pd);
    setStockItems(pd?.details || []);
  };
  console.log(productInfo, "dddd");
  const [modalIsOpenDetails, setIsOpenDetails] = useState(false);
  const closeModal = () => {
    setIsOpenDetails(false);
  };
  const [details, setDetails] = useState({});
  const openModalDetails = (pd) => {
    setIsOpenDetails(true);
    setDetails(pd);
  };
  const handlePurchase = (pd) => {
    setProductInfo(pd);
    setStockItems(pd?.details || []);
  };
  console.log(purchase, "dd");
  return (
    <div className="page-content">
      <div className="custom-card p-2 mb-2">
        <div className="row">
          <div className="col-5">
            <h6 className="mt-1 mx-2">Stock In</h6>
          </div>
          <div className="col-7">
            <div className="row">
              <div className="col-5 row">
                <div className="col-3">
                  <label htmlFor="">From</label>
                </div>
                <div className="col-9">
                  <ReactDatePicker
                    placeholderText="From Date"
                    selected={
                      filter.startDate ? new Date(filter.startDate) : new Date()
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="requisition_no"
                    onChange={(d) =>
                      setFilter({
                        ...filter,
                        startDate: d
                          ? moment(d).format("YYYY-MM-DD")
                          : new Date(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-5 row">
                <div className="col-3">
                  <label htmlFor="" className="ms-3">
                    To
                  </label>
                </div>
                <div className="col-9">
                  <ReactDatePicker
                    placeholderText="To Date"
                    selected={
                      filter.endDate ? new Date(filter.endDate) : new Date()
                    }
                    dateFormat={"dd/MM/yyyy"}
                    name="requisition_no"
                    onChange={(d) =>
                      setFilter({
                        ...filter,
                        endDate: d
                          ? moment(d).format("YYYY-MM-DD")
                          : new Date(),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-2 rx-one-button-group">
                <button onClick={handleFilter} className="btn">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MaterialTable
          columns={columns}
          data={data}
          isLoading={loading}
          components={{
            Toolbar: (props) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <MTableToolbar {...props} />
                </div>
                <div className="me-1">
                  <button
                    style={{
                      backgroundColor: "#69B128",
                      color: "white",
                      fontWeight: "medium",
                      border: "none",
                      borderRadius: "7px",
                      padding: "3px 15px",
                    }}
                    onClick={() => openModal({})}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Stock In
                  </button>
                </div>
              </div>
            ),
          }}
          options={{
            search: true,
            showTitle: false,
            searchFieldAlignment: "left",
            pageSize: 5,
            emptyRowsWhenPaging: false,
            pageSizeOptions: [5, 10, 20, 50, 100],
          }}
        />
      </div>
      <AddGreatLabStock
        handlePurchase={handlePurchase}
        refetch={refetch}
        setRefetch={setRefetch}
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        stockItems={stockItems}
        setStockItems={setStockItems}
        purchase={purchase.filter((pd) => pd?.status === "Approved")}
      />
      <Modal size="md" isOpen={modalIsOpenDetails} onClose={closeModal}>
        <Modal.Header onClose={closeModal}>
          <Modal.Title>Stock In Details</Modal.Title>
        </Modal.Header>
        <Modal.Body styles={{ height: "300px" }}>
          <div className="row custom-card p-2">
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="name">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  value={moment(details?.created_at).format("DD/MM/YYYY")}
                  readOnly
                  required
                  type="text"
                  id="supplier"
                  name="supplier"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="supplier">
                  Supplier <span className="text-danger">*</span>
                </label>
                <select
                  disabled
                  name="supplier"
                  required
                  id="supplier"
                  className="form-select form-select-sm"
                >
                  <option value="">{details?.supplier_details?.name}</option>
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-2">
                <label htmlFor="location_id">
                  Purchase <span className="text-danger">*</span>
                </label>
                <input
                  value={details?.reference_invoice_no}
                  readOnly
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
                  readOnly
                  value={details?.remarks}
                  type="text"
                  id="remarks"
                  name="remarks"
                  className="form-control form-control-sm"
                  rows="3"
                ></textarea>
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
                  {/* <td className="fw-bold">MRP</td> */}
                  <td className="fw-bold">PP</td>
                  <td className="fw-bold">Vat</td>
                  <td className="fw-bold">Qty</td>
                  <td className="fw-bold">Bonus Qty</td>
                </tr>
                {details.details?.length > 0 &&
                  details.details?.map((test, i) => {
                    // const amount =
                    //     (Number(test.fee) * Number(test.discount)) / 100;
                    // const total = test.fee - amount;

                    return (
                      <tr key={test?.product?.item_code}>
                        <td>{test?.product?.item_code}</td>
                        <td width={"25%"}>{test?.product?.name}</td>
                        {/* <td>{test?.manufacturer}</td> */}
                        {/* <td>
                                                    {test?.product?.mrp}
                                                </td> */}
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="purchase_price"
                              readOnly
                              value={test?.purchase_price}
                              style={{ width: "60px", margin: "auto" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="vat"
                              readOnly
                              value={test?.vat}
                              style={{ width: "60px", margin: "auto" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="quantity"
                              readOnly
                              value={test?.quantity}
                              style={{ width: "60px", margin: "auto" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="w-[40%] mx-auto">
                            <input
                              name="bonus_quantity"
                              readOnly
                              value={test?.bonus_quantity}
                              style={{ width: "60px", margin: "auto" }}
                              className="form-control form-control-sm text-center"
                              type="number"
                            />
                          </div>
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
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="btn float-end"
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GreatLabStockIn;
