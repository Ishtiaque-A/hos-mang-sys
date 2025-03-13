import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "react-responsive-modal/styles.css";
import { Modal as RModal } from "react-responsive-modal";
import { toast } from "react-toastify";

export default function AddLabPointsPlan() {
  const columns = [
    {
      title: "SL",
      field: "",
      render: (row) => <div>{row.tableData.id + 1}</div>,

      width: "40 !important",
    },
    {
      title: "Test Name",
      field: `test_name`,
    },
    {
      title: "Test Group",
      cellStyle: {
        width: "15%",
        textAlign: "center !important",
      },
      render: (row) => <div>{row.group?.test_group_name}</div>,
    },

    {
      title: "Test Category",
      field: ``,

      render: (row) => <div>{row.category?.test_category_name}</div>,
    },
    {
      title: "Fee",
      field: `fee`,
    },
    {
      title: "Point %",
      field: ``,
      render: (row) => (
        <div>
          {row?.point_amount} {row?.point_amount ? "%" : ""}
        </div>
      ),
    },
    {
      title: "Total Point",
      field: ``,
      render: (row) => <div>{row?.total_point_amount}</div>,
    },
    {
      title: "Action",
      field: "patient",
      cellStyle: {
        textAlign: "center !important",
      },
      render: (row) => (
        <div
          style={{
            width: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: "13px",
              color: "black",
            }}
            onClick={() => handleEdit(row)}
          >
            <i className="fa-solid fa-circle-plus"></i>
          </button>
          <button
            // onClick={(e) => deleteallTestName(e, row.id)}
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            <i className="far fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [testGroup, setTestGroup] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [pointMaster, setPointMaster] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get("new-test-group").then((res) => {
      setTestGroup(res.data.test_group || []);
      console.log(res?.data);
    });
    axios
      .get("/new-test-name")
      .then((res) => {
        setData(res.data.test_name || []);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    axios.get("doctors-point-master").then((res) => {
      setPointMaster(res.data.data || []);
      console.log(res?.data);
    });
  }, []);
  const filterByGroup = (e) => {
    const { value } = e.target;
    if (value) {
      setLoading(true);
      setCategories([]);
      axios
        .get(`new-test-name-by-group-id/${value}`)
        .then((res) => {
          setData(res?.data?.test_name || []);
          setCategories(res?.data?.category || []);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

      setPointsData({
        id: "",
        point_amount: "",
        total_point_amount: "",
        apply_all: false,
      });
      setPointPercentage(0);
    }
  };
  const filterByCategory = (e) => {
    if (e.target.value) {
      setLoading(true);
      axios
        .get(`new-test-name-by-category-id/${e.target.value}`)
        .then((res) => {
          setData(res.data.test_name || []);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setPointsData({
        id: "",
        point_amount: "",
        total_point_amount: "",
        apply_all: false,
      });
      setPointPercentage(0);
    }
  };
  const customStyles = {
    content: {
      top: "30%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      height: "270px",
      transform: "translate(-50%, -50%)",
      width: "30%",
    },
  };

  const [pointsData, setPointsData] = useState({
    id: "",
    point_amount: "",
    total_point_amount: "",
    apply_all: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "point_amount") {
      const amount = parseFloat(value);
      const total = (amount * parseFloat(pointsData?.fee || 0)) / 100;
      setPointsData({
        ...pointsData,
        point_amount: amount,
        total_point_amount: total,
      });
    } else if (name === "total_point_amount") {
      const amount = parseFloat(value);
      const total = (amount * 100) / parseFloat(pointsData?.fee || 0);
      setPointsData({
        ...pointsData,
        total_point_amount: amount,
        point_amount: total,
      });
    }
  };
  const handleEdit = (row) => {
    setOpen(true);
    if (row?.point_amount && row?.total_point_amount) {
      setPointsData({
        ...row,
        apply_all: false,
      });
    } else {
      setPointsData({
        ...row,
        point_amount: "",
        total_point_amount: "",
        apply_all: false,
      });
    }
  };
  const [pointPercentage, setPointPercentage] = useState(0);
  const handleSavePoint = (e) => {
    e.preventDefault();
    const newData = [...data];
    if (pointsData?.apply_all) {
      newData.map((item) => {
        item.point_amount = pointsData?.point_amount;
        item.total_point_amount =
          (parseFloat(pointsData?.point_amount || 0) *
            parseFloat(item?.fee || 0)) /
          100;
      });
      setData(newData);
      setPointPercentage(pointsData?.point_amount || 0);
    } else {
      setData((prevData) =>
        prevData.map((item) =>
          Number(item.id) === Number(pointsData?.id) ? { ...pointsData } : item
        )
      );
    }

    setOpen(false);
  };
  const handlePointShare = (e) => {
    e.preventDefault();
    setShareOpen(false);
  };
  const totalSharedPoint =
    pointMaster?.reduce(
      (total, item) => total + parseFloat(item?.share || 0),
      0
    ) || 0;

  const handleChangeShare = (e, i) => {
    const { name, value } = e.target;
    console.log(value, "value");
    // Calculate available points for sharing
    let availablePoint =
      parseFloat(pointPercentage) - parseFloat(totalSharedPoint);
    console.log(value, "availablePoint");
    if (parseFloat(value) === parseFloat(pointPercentage)) {
      const newData = [...pointMaster];
      newData.map((item) => (item.share = ""));
      newData[i][name] = value;
      setPointMaster(newData);
      return;
    }
    if (value > availablePoint) {
      toast.error("You can't share more than total point");
      // Reset the value in the pointMaster array
      const newData = [...pointMaster];
      newData[i][name] = "";
      setPointMaster(newData);
      return;
    }

    // Update the value in the pointMaster array
    const newData = [...pointMaster];
    newData[i][name] = value;
    setPointMaster(newData);
  };

  const shareModalClose = () => {
    setShareOpen(false);
    axios.get("doctors-point-master").then((res) => {
      setPointMaster(res.data.data || []);
    });
  };
  const shareModalOpen = () => {
    if (pointPercentage > 0) {
      setShareOpen(true);
    } else {
      toast.error("Please add points");
    }
  };
  const [submitLoading, setSubmitLoading] = useState(false);
  const [planInfo, setPlanInfo] = useState({
    title: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const form = {
      title: planInfo?.title,
      details: data,
      share: pointMaster.filter((item) => item?.share !== ""),
      total_percentage: pointPercentage,
    };
    if (!form?.title) {
      toast.error("Please enter plan title");
      return;
    } else if (!form?.details?.length > 0) {
      toast.error("Please add plan details");
      return;
    } else if (pointPercentage < 1) {
      toast.error("Please add percentage");
      return;
    } else if (totalSharedPoint < 1) {
      toast.error("You can't save without sharing");
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await axios.post("doctors-point-plan", form);
      if (res.status === 200) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitLoading(false);
      navigate("/lab-module-new/points-plan");
    }
  };
  console.log(categories, "pointMaster");
  return (
    <div className="shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="mt-1 mx-2">Add Lab Points Plan</h6>
        <Link to="/lab-module-new/points-plan">
          <button
            style={{
              backgroundColor: "#69B128",
              color: "white",
              fontWeight: "medium",
              border: "none",
              borderRadius: "7px",
              padding: "5px 15px",
            }}
            //   onClick={() => setModalIsOpenForAdd(true)}
          >
            Back
          </button>
        </Link>
      </div>
      <hr />
      <div className="row mb-2">
        <div className="col-4">
          <label htmlFor="none">Title</label>
          <input
            type="text"
            onChange={(e) =>
              setPlanInfo({ ...planInfo, title: e.target.value })
            }
            className="form-control form-control-sm"
          />
        </div>
        <div className="col-4">
          <label htmlFor="none">Test Group</label>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={filterByGroup}
          >
            <option value="">Select</option>
            {testGroup?.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.test_group_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-4">
          <label htmlFor="none">Test Category</label>
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={filterByCategory}
          >
            <option value="">Select</option>
            {categories?.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.test_category_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
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
                      onClick={shareModalOpen}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Point Share
                    </button>
                    <button
                      style={{
                        backgroundColor: "#69B128",
                        color: "white",
                        fontWeight: "medium",
                        border: "none",
                        borderRadius: "7px",
                        padding: "3px 15px",
                      }}
                      onClick={handleSubmit}
                      disabled={submitLoading}
                      className="btn btn-primary btn-sm"
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
              pageSize: 10,
              emptyRowsWhenPaging: false,
              pageSizeOptions: [10, 20, 50, 100],
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <h5>Add point type</h5>
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <span
              className="ms-3"
              style={{ fontSize: "15px", cursor: "pointer" }}
              onClick={() => setOpen(false)}
            >
              <i className="fal fa-times"></i>
            </span>
          </div>
          <form onSubmit={handleSavePoint} className="mt-3">
            <div className="mb-2">
              <label htmlFor="amount" className="form-label">
                Point Amount (%)
              </label>
              <input
                type="number"
                className="form-control mb-2 form"
                id="name"
                name="point_amount"
                value={pointsData?.point_amount || ""}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="total_amount" className="form-label">
                Total Amount
              </label>
              <input
                type="number"
                className="form-control mb-2 form"
                id="name"
                value={pointsData?.total_point_amount || ""}
                name="total_point_amount"
                onChange={handleChange}
                required
              />
            </div>
            <div className="ms-4">
              <input
                className="form-check-input"
                name="all"
                onChange={(e) =>
                  setPointsData({ ...pointsData, apply_all: e.target.checked })
                }
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label className="form-check-label" for="defaultCheck1">
                Apply to all
              </label>
            </div>
            <div className="row">
              <div className="rx-one-button-group">
                <button className="btn float-end">Apply</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <RModal
        open={shareOpen}
        onClose={shareModalClose}
        contentLabel="Example Modal"
        center
        classNames={{
          modal: "customModal",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <div className="d-flex justify-content-between">
            <h6>Add point share</h6>
            <h6 className="">Total Shared:{totalSharedPoint} %</h6>
            <h6 className="me-5">Total:{pointPercentage} %</h6>
          </div>

          <form onSubmit={handlePointShare} className="mt-3">
            {pointMaster?.map((item, i) => (
              <div key={item?.id} className="mb-2">
                <label htmlFor="amount" className="form-label">
                  {item?.name} (%)
                </label>
                <input
                  type="number"
                  className="form-control mb-2 form"
                  id="name"
                  name="share"
                  value={item?.share || ""}
                  onChange={(e) => handleChangeShare(e, i)}
                />
              </div>
            ))}
            <div className="row">
              <div className="rx-one-button-group">
                <button className="btn float-end">Apply</button>
                <button
                  type="button"
                  onClick={shareModalClose}
                  className="btn float-end me-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </RModal>
    </div>
  );
}
