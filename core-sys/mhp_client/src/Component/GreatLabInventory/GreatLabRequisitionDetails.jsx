import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NewModal as Modal } from "../../common/components/NewModal";

function GreatLabRequisitionDetails() {
  const [data, setData] = useState([]);
  const [reqData, setReqData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [temp, setTemp] = useState({});
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`/great-lab-requisition/${id}`).then((res) => {
      setData(res.data?.data?.details);
      setReqData(res.data?.data);
      setLoading(false);
    });
  }, [refetch]);

  const emptyBooth = {
    name: "",
    booth_no: "",
    status: "",
  };
  const [supplierInfo, setSupplierInfo] = useState({
    name: "",
    booth_no: "",
    status: "",
  });
  const [test, setTest] = useState([]);
  const handleChange = (e, row, p) => {
    const { value } = e.target;
    console.log(p, "ddf");
    const temp = [...data];
    const selectedStock = [...test];
    if (
      parseFloat(value) > 0 &&
      parseFloat(value) <= parseFloat(p?.stock) &&
      parseFloat(value) <= parseFloat(row?.pending_quantity)
    ) {
      let found = false; // Reset found to false for each iteration
      for (const item of selectedStock) {
        if (item.location === p?.location_id) {
          found = true;
          item.quantity = value;
          break;
        }
      }

      if (!found) {
        selectedStock.push({
          location: p?.location_id,
          quantity: value,
        });
      }
      setTest(selectedStock);
    } else if (
      parseFloat(value) > 0 &&
      parseFloat(value) > parseFloat(p?.stock)
    ) {
      toast.error("Not enough stock");
    } else if (
      parseFloat(value) > 0 &&
      parseFloat(value) > parseFloat(row?.pending_quantity)
    ) {
      toast.error("You can't add more stock than requested quantity");
      const filter = selectedStock.filter(
        (item) => Number(item.location) !== Number(p?.location_id)
      );
      setTest(filter);
    } else if (!value) {
      const filter = selectedStock.filter(
        (item) => Number(item.location) !== Number(p?.location_id)
      );
      setTest(filter);
    }
  };
  const handleAddStock = (row) => {
    const temp = [...data];
    const total = test?.reduce(
      (acc, item) => acc + Number(item?.quantity || 0),
      0
    );
    if (
      parseFloat(total) <= Number(row?.pending_quantity) &&
      parseFloat(total) > 0
    ) {
      const updatedData = temp.map((item) => {
        if (Number(item.id) === Number(row.id)) {
          return {
            ...item,
            locations: [...test],
          };
        }
        return item;
      });
      // Set the updated data array
      setTest([]);
      setData(updatedData);
      setIsOpen(false);
      toast.success("Stock added successfully");
    } else if (parseFloat(total) > Number(row?.pending_quantity)) {
      toast.error("You can't add more stock than required");
    } else if (!total) {
      toast.error("Please enter correct quantity");
    }
  };

  const columns = [
    {
      title: "SL",
      field: `supplier_code`,
      render: (row) => <div>{row?.tableData?.id + 1}</div>,
    },
    {
      title: "Name",
      field: `name`,
      render: (row) => <div>{row?.product?.name}</div>,
    },
    {
      title: "Qty",
      field: `quantity`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Price",
      field: `price`,
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Delivered Qty",
      field: `price`,
      render: (row) => (
        <div className="text-center">{row?.delivered_quantity}</div>
      ),
    },
    {
      title: "To Be Dispatched",
      field: `price`,
      render: (row) => (
        <div className="text-center">
          {row?.locations?.reduce((a, b) => a + parseInt(b?.quantity || 0), 0)}
        </div>
      ),
    },
    {
      title: "Pending Qty",
      field: `price`,
      render: (row) => (
        <div className="text-center">{row?.pending_quantity}</div>
      ),
      cellStyle: {
        textAlign: "center",
      },
    },
    {
      title: "Select Stock",
      render: (row) => (
        <div className="rx-one-button-group">
          <button
            disabled={Number(row?.pending_quantity) < 1}
            onClick={() => openModal(row)}
            className="btn"
          >
            Select Stock
          </button>
        </div>
      ),
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setSupplierInfo(emptyBooth);
  };
  const openModal = (pd) => {
    setTemp(pd);
    setIsOpen(true);
  };
  const validTotal = data?.filter((pd) => pd?.locations?.length > 0);
  const pending = data.reduce(
    (acc, item) => acc + Number(item?.pending_quantity || 0),
    0
  );
  const [refetchStock, setRefetchStock] = useOutletContext();
  const handleApprove = () => {
    const postData = {
      delivered:
        reqData?.delivered ||
        0 + test?.reduce((acc, item) => acc + Number(item?.quantity || 0), 0),
      pending_delivery:
        parseFloat(reqData?.delivered || 0) +
        test?.reduce((acc, item) => acc + Number(item?.quantity || 0), 0) -
        parseFloat(reqData?.quantity || 0),
      stockItems: validTotal,
    };
    if (validTotal?.length > 0) {
      setApproveLoading(true);
      axios
        .post(`great-lab-requisition-approve/${reqData?.id}`, postData)
        .then((res) => {
          if (res.data.status === 200) {
            toast.success(res.data.message);
            setRefetch(!refetch);
            setApproveLoading(false);
            setRefetchStock(!refetchStock);
          }
        })
        .catch((err) => {
          setApproveLoading(false);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Please select stock");
    }
  };

  return (
    <div className="page-content">
      <div className="custom-card p-2 mb-2">
        <h6> Requisition Details </h6>
        <div className="row">
          <div className="col-6">
            <div className="mb-2">
              <label htmlFor="name">
                Requisition No <span className="text-danger">*</span>
              </label>
              <input
                value={reqData?.requisition_no}
                readOnly
                required
                type="text"
                id="supplier"
                name="supplier"
                className="form-control form-control-sm"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="category">
                Status <span className="text-danger">*</span>
              </label>
              <input
                value={reqData?.status}
                readOnly
                type="text"
                className="form-control form-control-sm"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="mb-2">
              <label htmlFor="name">
                Requisitor <span className="text-danger">*</span>
              </label>
              <input
                value={reqData?.requisitor_name}
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
                value={reqData?.remarks}
                type="text"
                id="remarks"
                name="remarks"
                className="form-control form-control-sm"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
        {/* <div className="mb-3">
                    <div className="rx-one-button-group pt-2 pb-2">
                        <button onClick={() => closeModal()} className='btn float-end'>Approve</button>
                    </div>
                </div> */}
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
                    disabled={approveLoading || pending === 0}
                    onClick={handleApprove}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Save
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
      <Modal size="sm" isOpen={isOpen} onClose={closeModal}>
        <Modal.Header onClose={closeModal}>
          <Modal.Title>Select Stock Location</Modal.Title>
        </Modal.Header>
        <Modal.Body styles={{ minHeight: "250px" }}>
          <h6 className="mb-2">Name: {temp?.product?.name}</h6>
          <p> Requested Quantity : {temp?.pending_quantity}</p>
          {temp?.stocks?.length > 0 ? (
            temp?.stocks?.map((stock) => (
              <div>
                <label htmlFor="name">
                  {stock?.location?.name} - {stock?.stock}
                </label>
                <input
                  className="form-control form-control-sm"
                  onChange={(e) => handleChange(e, temp, stock)}
                />
              </div>
            ))
          ) : (
            <p>Out of stock</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="mb-2 rx-one-button-group">
            <button
              type="button"
              disabled={approveLoading}
              onClick={() => handleAddStock(temp)}
              className="btn float-end"
            >
              Add
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GreatLabRequisitionDetails;
