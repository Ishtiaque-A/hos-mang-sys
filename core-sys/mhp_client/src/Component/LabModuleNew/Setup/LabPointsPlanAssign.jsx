import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Modal as ReactModal } from "../../../common/components/Modal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function LabPointsPlanAssign() {
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
      render: (row) => <div>{row.test_item?.test_name}</div>,
    },
    {
      title: "Test Group",
      cellStyle: {
        width: "15%",
        textAlign: "center !important",
      },
      render: (row) => <div>{row.test_item?.group?.test_group_name}</div>,
    },

    {
      title: "Test Category",
      field: ``,

      render: (row) => <div>{row.test_item?.category?.test_category_name}</div>,
    },
    {
      title: "Fee",
      field: `fee`,
      render: (row) => <div>{row.test_item?.fee}</div>,
    },
    {
      title: "Point %",
      field: ``,
      render: (row) => (
        <div>
          {row?.point_percentage} {row?.point_percentage ? "%" : ""}
        </div>
      ),
    },
    {
      title: "Total Point",
      field: ``,
      render: (row) => <div>{row?.point_amount}</div>,
    },
  ];
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [pointMaster, setPointMaster] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get("doctors-point-master").then((res) => {
      setPointMaster(res.data.data || []);
      console.log(res?.data);
    });
    axios
      .get(`doctors-point-plan/${id}`)
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    axios
      .get(`doctors`)
      .then((res) => {
        setDoctors(res.data.doctors || []);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`employee`)
      .then((res) => {
        setEmployee(res.data.employee || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const [pointsShareData, setPointsShareData] = useState({
    id: "",
    share_type: "doctor",
    share_user_id: "",
    plan_id: id,
    plan_master_id: "",
  });
  const [searchText, setSearchText] = useState("");
  const clearBillingSearch = () => {
    setSearchText("");
  };
  const shareModalClose = () => {
    setShareOpen(false);
    setSearchText("");
  };
  const shareModalOpen = () => {
    setShareOpen(true);
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  const handleSubmit = async () => {
    if (!pointsShareData?.plan_id) {
      toast.error("Please select plan");
      return;
    } else if (!pointsShareData?.share_user_id) {
      toast.error("Please select share user");
      return;
    } else if (!pointsShareData?.share_type) {
      toast.error("Please select share type");
      return;
    } else if (!pointsShareData?.plan_master_id) {
      toast.error("Please select plan master");
      return;
    }
    setSubmitLoading(true);
    await axios
      .post("assign-points-plan", pointsShareData)
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error",
          text: err.response.data.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };
  return (
    <div className="shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="mt-1 mx-2">{data?.title}</h6>
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
      <div className="mt-">
        <h6>Description</h6>
        <h6>
          {data?.shares?.map((item, i) => (
            <span className="me-2">
              {item?.plan_master?.name} : {item?.share_percentage}%{" "}
              {data?.shares?.length > 1 && i !== data?.shares?.length - 1
                ? " , "
                : ""}
            </span>
          ))}
        </h6>
      </div>
      <div className="row">
        <div className="col-md-12">
          <MaterialTable
            columns={columns}
            data={data?.details || []}
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
                    {Number(data?.status) === 1 && (
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
                        Assign Plan
                      </button>
                    )}
                    {/* <button style={{
                                            backgroundColor: '#69B128',
                                            color: 'white',
                                            fontWeight: 'medium',
                                            border: 'none',
                                            borderRadius: '7px',
                                            padding: '3px 15px',
                                        }} onClick={handleSubmit} disabled={submitLoading} className="btn btn-primary btn-sm">Save</button> */}
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
      <ReactModal isOpen={shareOpen} onClose={shareModalClose}>
        <ReactModal.Header onClose={shareModalClose}>
          <ReactModal.Title>Plan Assign</ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body>
          <div style={{ minWidth: "600px", minHeight: "200px" }}>
            <div className="">
              <div className="">
                <label className="me-2">Assign to </label>
                <input
                  type="radio"
                  name="assign"
                  className=""
                  value="doctor"
                  checked={pointsShareData?.share_type === "doctor"}
                  onChange={(e) =>
                    setPointsShareData({
                      ...pointsShareData,
                      share_type: e.target.value,
                    })
                  }
                />
                <label
                  className="me-2"
                  style={{ marginLeft: "5px", marginTop: "-5px" }}
                  htmlFor="assign"
                >
                  Doctor
                </label>
                <input
                  type="radio"
                  name="assign"
                  className=""
                  value="employee"
                  checked={pointsShareData?.share_type === "employee"}
                  onChange={(e) =>
                    setPointsShareData({
                      ...pointsShareData,
                      share_type: e.target.value,
                    })
                  }
                />
                <label
                  style={{ marginLeft: "5px", marginTop: "-5px" }}
                  htmlFor="assign"
                >
                  Employee
                </label>
              </div>
            </div>
            {pointsShareData?.share_type === "doctor" && (
              <ReactSearchAutocomplete
                showIcon={false}
                placeholder={"Search Doctor with ID or Name "}
                items={doctors}
                onClear={clearBillingSearch}
                inputSearchString={searchText || ""}
                onSearch={(value) => setSearchText(value)}
                autoFocus
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
                            <span className="me-1">
                              {item?.title?.title_name}
                            </span>
                            {item?.fullName}
                            <span className="ms-2">{item?.dr_identity_no}</span>
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              margin: "0px",
                              fontWeight: "600",
                              padding: "0px",
                            }}
                          >
                            {item?.specialist?.specialists_name}
                            <span className="ms-1">
                              {item?.academic?.map((item) => (
                                <span className="me-1">{item?.degree_id},</span>
                              ))}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
                resultStringKeyName="fullName"
                onSelect={(item) => {
                  setPointsShareData({
                    ...pointsShareData,
                    share_user_id: item?.id,
                  });
                }}
                maxResults={1}
                fuseOptions={{
                  keys: [
                    "dr_identity_no",
                    "dr_middle_name",
                    "dr_given_name",
                    "fullName",
                  ],
                }} // Search in the description text as well
                styling={{
                  borderRadius: "5px !important",
                  // zIndex: modalIsOpen || isOpenForPaymentModal ? "auto" : "1",
                  width: "100%",
                }}
              />
            )}
            {pointsShareData?.share_type === "employee" && (
              <ReactSearchAutocomplete
                showIcon={false}
                placeholder={"Search Employee with ID or Name "}
                items={employee}
                onClear={clearBillingSearch}
                inputSearchString={searchText || ""}
                onSearch={(value) => setSearchText(value)}
                autoFocus
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
                            {item?.fullName}
                            <span className="ms-2">{item?.dr_identity_no}</span>
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              margin: "0px",
                              fontWeight: "600",
                              padding: "0px",
                            }}
                          >
                            {item?.user_type?.user_type_name}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
                resultStringKeyName="fullName"
                onSelect={(item) => {
                  setPointsShareData({
                    ...pointsShareData,
                    share_user_id: item?.id,
                  });
                }}
                maxResults={1}
                fuseOptions={{
                  keys: [
                    "identity_no",
                    "middle_name",
                    "given_name",
                    "last_name",
                  ],
                }} // Search in the description text as well
                styling={{
                  borderRadius: "5px !important",
                  // zIndex: modalIsOpen || isOpenForPaymentModal ? "auto" : "1",
                  width: "100%",
                }}
              />
            )}
            <label htmlFor="">Share holder type</label>
            <select
              name=""
              onChange={(e) =>
                setPointsShareData({
                  ...pointsShareData,
                  plan_master_id: e.target.value,
                })
              }
              className="form-select form-select-sm"
              id=""
            >
              <option value="">Select </option>
              {pointMaster?.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
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
              className="btn btn-primary btn-sm mt-3 float-end"
            >
              Save
            </button>
          </div>
        </ReactModal.Body>
      </ReactModal>
    </div>
  );
}
