/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "../../common/components/Button";
import { NewModal as Modal } from "../../common/components/NewModal";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { LineChart, Line, Tooltip } from "recharts";
import { Button as MuiButton } from "@mui/material";
const totalTransaction = {
  appointment_model: {
    total_appointment: 0,
    data: [
      {
        name: "Jan",
        data: 0,
      },
      {
        name: "Feb",
        data: 0,
      },
      {
        name: "Mar",
        data: 0,
      },
      {
        name: "Apr",
        data: 0,
      },
      {
        name: "May",
        data: 0,
      },
      {
        name: "Jun",
        data: 0,
      },
      {
        name: "Jul",
        data: 0,
      },
      {
        name: "Aug",
        data: 0,
      },
      {
        name: "Sep",
        data: 0,
      },
      {
        name: "Oct",
        data: 0,
      },
      {
        name: "Nov",
        data: 0,
      },
      {
        name: "Dec",
        data: 0,
      },
    ],
  },
  prescription_model: {
    total_prescription: 0,
    data: [
      {
        name: "Jan",
        data: 0,
      },
      {
        name: "Feb",
        data: 0,
      },
      {
        name: "Mar",
        data: 0,
      },
      {
        name: "Apr",
        data: 0,
      },
      {
        name: "May",
        data: 0,
      },
      {
        name: "Jun",
        data: 0,
      },
      {
        name: "Jul",
        data: 0,
      },
      {
        name: "Aug",
        data: 0,
      },
      {
        name: "Sep",
        data: 0,
      },
      {
        name: "Oct",
        data: 0,
      },
      {
        name: "Nov",
        data: 0,
      },
      {
        name: "Dec",
        data: 0,
      },
    ],
  },
  invoice_model: {
    total_invoice: 0,
    data: [
      {
        name: "Jan",
        data: 0,
      },
      {
        name: "Feb",
        data: 0,
      },
      {
        name: "Mar",
        data: 0,
      },
      {
        name: "Apr",
        data: 0,
      },
      {
        name: "May",
        data: 0,
      },
      {
        name: "Jun",
        data: 0,
      },
      {
        name: "Jul",
        data: 0,
      },
      {
        name: "Aug",
        data: 0,
      },
      {
        name: "Sep",
        data: 0,
      },
      {
        name: "Oct",
        data: 0,
      },
      {
        name: "Nov",
        data: 0,
      },
      {
        name: "Dec",
        data: 0,
      },
    ],
  },
  doctor_model: {
    total_doctor: 0,
    data: [
      {
        name: "Jan",
        data: 0,
      },
      {
        name: "Feb",
        data: 0,
      },
      {
        name: "Mar",
        data: 0,
      },
      {
        name: "Apr",
        data: 0,
      },
      {
        name: "May",
        data: 0,
      },
      {
        name: "Jun",
        data: 0,
      },
      {
        name: "Jul",
        data: 0,
      },
      {
        name: "Aug",
        data: 0,
      },
      {
        name: "Sep",
        data: 0,
      },
      {
        name: "Oct",
        data: 0,
      },
      {
        name: "Nov",
        data: 0,
      },
      {
        name: "Dec",
        data: 0,
      },
    ],
  },
};
const animatedComponents = makeAnimated();

const customTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          borderRadius: "5px",
          border: `1px solid ${payload[0].color}`,
          padding: "5px",
          background: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p>{`${payload[0]?.payload?.name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Summary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [branchSummary, setBranchSummary] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchDetails, setBranchDetails] = useState([]);
  const [selectBranchForDetails, setSelectBranchForDetails] = useState([]);
  const [allTransaction, setAllTransaction] = useState(totalTransaction);
  const [refetch, setRefetch] = useState(false);
  const [pendingStates, setPendingStates] = useState({
    summary: false,
    summaryDetails: false,
    searchingBranch: false,
  });

  useEffect(() => {
    setPendingStates({ ...pendingStates, summary: true });
    (async function fetchData() {
      const res = await axios.get("admin-summary");
      if (res.status === 200) {
        setBranchSummary(res.data);
      }
      setPendingStates({ ...pendingStates, summary: false });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedBranch(null);
  };

  useEffect(() => {
    if (selectedBranch) {
      setPendingStates({ ...pendingStates, summaryDetails: true });
      (async function fetchData() {
        const res = await axios.get(`admin-summary/${selectedBranch.id}`);
        if (res.status === 200) {
          setBranchDetails(res.data);
        }
        setPendingStates({ ...pendingStates, summaryDetails: false });
      })();
    } else {
      setBranchDetails([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBranch]);

  const handleOpen = (branch) => {
    setSelectedBranch(branch);
    setIsOpen(true);
  };

  const fetchBranchSummaryData = async () => {
    setPendingStates({ ...pendingStates, searchingBranch: true });
    try {
      const branches = selectBranchForDetails.map((branch) => branch.id);

      const res = await axios.post("admin-summary-details-for-chart", {
        branches,
      });
      if (res.status === 200) {
        setAllTransaction(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPendingStates({ ...pendingStates, searchingBranch: false });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchBranchSummaryData();
    }, 0);
    return () => {};
  }, [refetch]);

  const handleChangeBranchSelection = (selectedBranch) => {
    if (selectedBranch) {
      setSelectBranchForDetails(selectedBranch);
    } else {
      setSelectBranchForDetails([]);
    }
  };

  const Loader = () => (
    <div
      style={{ height: "200px" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="spinner-border  text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return (
    <div className="m-2">
      <div className="row">
        <div className="col-12 card">
          <div
            className="card-header cns-container"
            style={{ background: "white" }}
          >
            <div
              id="v-pills-tab"
              role="tablist"
              className="nav nav-pills d-flex align-items-center"
              aria-orientation="horizontal"
            >
              <button
                class="nav-link text-start  active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                Summary
              </button>
              <button
                class="nav-link text-start"
                id="v-pills-details-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-details"
                type="button"
                role="tab"
                aria-controls="v-pills-details"
                aria-selected="true"
              >
                Details
              </button>
            </div>
          </div>
          <div className="card-body">
            <div id="v-pills-tabContent" class="tab-content">
              <div
                class="tab-pane fade show active"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">SL.</th>
                      <th scope="col">Branch Name</th>
                      <th scope="col">Appointments</th>
                      <th scope="col">Doctors</th>
                      <th scope="col">Consultation</th>
                      <th scope="col">Invoices</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingStates.summary ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          <Loader />
                        </td>
                      </tr>
                    ) : branchSummary.length ? (
                      branchSummary.map((branch, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{branch.name}</td>
                          <td>{branch.total_appointment}</td>
                          <td>{branch.total_doctor}</td>
                          <td>{branch.total_prescription}</td>
                          <td>{branch.total_invoice}</td>
                          <td>
                            <Button onClick={() => handleOpen(branch)}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div
                class="tab-pane fade"
                id="v-pills-details"
                role="tabpanel"
                aria-labelledby="v-pills-details-tab"
              >
                <div className="row">
                  <div className="col-md-12 my-2 row">
                    <Select
                      components={animatedComponents}
                      isMulti
                      className="col-md-8"
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                      options={branchSummary}
                      isClearable={false}
                      onChange={handleChangeBranchSelection}
                      value={selectBranchForDetails}
                      formatOptionLabel={(option) => (
                        <div className="d-flex align-items-center">
                          <div className="d-flex w-100 justify-content-between align-items-center">
                            <p className="fs-5 my-0 pb-1">{option.name}</p>
                          </div>
                        </div>
                      )}
                      placeholder="Select Branches"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: "700px",
                          height: "auto",
                          "&:hover": {
                            borderColor: "#ced4da",
                          },
                        }),
                        menuPortal: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          "& ::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "& ::-webkit-scrollbar-thumb": {
                            backgroundColor: "#888",
                            borderRadius: "4px",
                          },
                          "& ::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#555",
                          },
                          "& ::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 1000,
                        }),
                        multiValue: (base) => {
                          return {
                            ...base,
                            backgroundColor: "#F3F2EF",
                            borderRadius: "5px",
                          };
                        },
                      }}
                    />
                    <div className=" col-md-4 d-flex align-items-center justify-content-end gap-2">
                      <Button
                        isDisabled={
                          pendingStates.searchingBranch ||
                          !selectBranchForDetails.length
                        }
                        onClick={fetchBranchSummaryData}
                      >
                        Search
                      </Button>
                      <MuiButton
                        disabled={
                          pendingStates.searchingBranch ||
                          !selectBranchForDetails.length
                        }
                        onClick={() => {
                          setSelectBranchForDetails([]);
                          setRefetch(!refetch);
                        }}
                      >
                        Clear All
                      </MuiButton>
                    </div>
                  </div>
                  {pendingStates.searchingBranch ? (
                    <Loader />
                  ) : (
                    <>
                      <div className="col-md-3 grid-margin stretch-card">
                        <div
                          className="card"
                          style={{
                            background: "white !important",
                          }}
                        >
                          <div className="card-body position-relative">
                            <div className="d-flex justify-content-between align-items-baseline">
                              <h6 className="card-title mb-2">Appointments</h6>
                            </div>
                            <div className="row">
                              <div className="col-4 d-flex align-items-center">
                                <h3
                                  style={{
                                    fontSize: "18px",
                                    margin: "0",
                                    padding: "0",
                                  }}
                                >
                                  {allTransaction?.appointment_model
                                    ?.total_appointment || 0}
                                  +
                                </h3>
                              </div>

                              <div className="col-8 ml-0">
                                <LineChart
                                  width={150}
                                  height={50}
                                  data={
                                    allTransaction?.appointment_model?.data ||
                                    []
                                  }
                                >
                                  <Tooltip content={customTooltip} />
                                  <Line
                                    type="monotone"
                                    dataKey="data"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                  />
                                </LineChart>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 grid-margin stretch-card">
                        <div
                          className="card"
                          style={{
                            background: "white !important",
                          }}
                        >
                          <div className="card-body position-relative">
                            <div className="d-flex justify-content-between align-items-baseline">
                              <h6 className="card-title mb-2">Doctors</h6>
                            </div>
                            <div className="row">
                              <div className="col-4 d-flex align-items-center">
                                <h3
                                  style={{
                                    fontSize: "18px",
                                    margin: "0",
                                    padding: "0",
                                  }}
                                >
                                  {allTransaction?.doctor_model?.total_doctor ||
                                    0}
                                  +
                                </h3>
                              </div>

                              <div className="col-8 ml-0">
                                <LineChart
                                  width={150}
                                  height={50}
                                  data={
                                    allTransaction?.doctor_model?.data || []
                                  }
                                >
                                  <Tooltip content={customTooltip} />
                                  <Line
                                    type="monotone"
                                    dataKey="data"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                  />
                                </LineChart>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 grid-margin stretch-card">
                        <div
                          className="card"
                          style={{
                            background: "white !important",
                          }}
                        >
                          <div className="card-body position-relative">
                            <div className="d-flex justify-content-between align-items-baseline">
                              <h6 className="card-title mb-2">
                                Consultations{" "}
                              </h6>
                            </div>
                            <div className="row">
                              <div className="col-4 d-flex align-items-center">
                                <h3
                                  style={{
                                    fontSize: "18px",
                                    margin: "0",
                                    padding: "0",
                                  }}
                                >
                                  {allTransaction?.prescription_model
                                    ?.total_prescription || 0}
                                  +
                                </h3>
                              </div>

                              <div className="col-8 ml-0">
                                <LineChart
                                  width={150}
                                  height={50}
                                  data={
                                    allTransaction?.prescription_model?.data ||
                                    []
                                  }
                                >
                                  <Tooltip content={customTooltip} />
                                  <Line
                                    type="monotone"
                                    dataKey="data"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                  />
                                </LineChart>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 grid-margin stretch-card">
                        <div
                          className="card"
                          style={{
                            background: "white !important",
                          }}
                        >
                          <div className="card-body position-relative">
                            <div className="d-flex justify-content-between align-items-baseline">
                              <h6 className="card-title mb-2">Invoices </h6>
                            </div>
                            <div className="row">
                              <div className="col-4 d-flex align-items-center">
                                <h3
                                  style={{
                                    fontSize: "18px",
                                    margin: "0",
                                    padding: "0",
                                  }}
                                >
                                  {allTransaction?.invoice_model
                                    ?.total_invoice || 0}
                                  +
                                </h3>
                              </div>

                              <div className="col-8 ml-0">
                                <LineChart
                                  width={150}
                                  height={50}
                                  data={
                                    allTransaction?.invoice_model?.data || []
                                  }
                                >
                                  <Tooltip content={customTooltip} />
                                  <Line
                                    type="monotone"
                                    dataKey="data"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                  />
                                </LineChart>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Modal size="md" isOpen={isOpen} onClose={handleClose}>
            <Modal.Header onClose={handleClose}>
              <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="my-2">
              <div style={{ minHeight: "400px" }}>
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">SL.</th>
                      <th scope="col">Doctor Name</th>
                      <th scope="col">Appointments</th>
                      <th scope="col">Consultation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingStates.summaryDetails ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <Loader />
                        </td>
                      </tr>
                    ) : branchDetails.length ? (
                      branchDetails.map((branch, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{branch.fullName}</td>
                          <td>{branch.total_appointment}</td>
                          <td>{branch.total_prescription}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Summary;
