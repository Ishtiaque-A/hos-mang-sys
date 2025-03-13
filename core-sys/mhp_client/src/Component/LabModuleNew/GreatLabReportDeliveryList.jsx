import { Tooltip } from "@material-ui/core";
import { Grid } from "@mui/material";
import axios from "axios";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { toast } from "react-toastify";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import SimpleSelect from "../../common/components/SimpleSelect";
import {
  formatPhoneNumber,
  formateHN,
  numHelper,
} from "../../utils/numberHelper";
const GreatLabReportDeliveryList = () => {
  const [deliveryList, setDeliveryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orgBranch, setOrgBranch] = useState([]);
  const [fitlerDeliveryList, setFilterDeliveryList] = useState([]);
  const user = useUserData();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const { SaasAuthURL } = useCredentialURL();
  useEffect(() => {
    const getBranch = async () => {
      const branches = await getAllBranch(
        SaasAuthURL + "/branch/service/find-branch-by-organizationId"
      );
      if (branches.status === 200) {
        const updatedBranches = branches?.data?.data?.map((branch) => ({
          ...branch,
          value: branch.id,
          label: branch.name,
        }));
        setOrgBranch(updatedBranches);
      }
    };
    getBranch();
    return () => {};
  }, [SaasAuthURL]);

  useEffect(() => {
    if (selectedBranch) {
      const filterData = deliveryList.filter((item) => {
        return item.saas_branch_id === selectedBranch?.value;
      });
      setFilterDeliveryList(filterData);
    } else {
      setFilterDeliveryList(deliveryList);
    }
    return () => {};
  }, [selectedBranch, deliveryList]);

  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  useEffect(() => {
    axios.get(`/great-lab-all-delivery-info`).then((res) => {
      if (res.data.status === 200) {
        setDeliveryList(res.data.delivery);
        setLoading(false);
      }
    });
  }, []);
  const columns = useMemo(
    () => [
      {
        title: "Invoice No",
        field: `invoiceNo`,
        render: (row) => numHelper(row.invoiceNo),
        headerStyle: {
          whiteSpace: "nowrap",
        },
      },
      {
        title: "HN",
        field: `name`,
        render: (row) => (
          <div style={{ padding: "0px 5px" }}>
            <span style={{ whiteSpace: "nowrap" }}>
              {row.patient === "null"
                ? ""
                : formateHN(row.patient?.patient_hn_number)}
            </span>
          </div>
        ),
      },
      {
        title: "Branch",
        field: "saas_branch_name",
      },
      {
        title: "Name",
        field: `patient_first_name`,
        render: (row) => (
          <div>
            <span style={{ whiteSpace: "nowrap" }}>
              {row.patient === "null" ? "" : row.patient?.fullName}
            </span>
          </div>
        ),
      },
      {
        title: "Phone No",
        headerStyle: {
          whiteSpace: "nowrap",
        },
        field: `patient_mobile_phone`,
        render: (row) => (
          <div style={{ padding: "0px 5px" }}>
            <span style={{ whiteSpace: "nowrap" }}>
              {row.patient === "null"
                ? ""
                : formatPhoneNumber(row.patient?.patient_mobile_phone)}
            </span>
          </div>
        ),
      },
      {
        title: "DOB",
        field: `patient_mobile_phone`,
        render: (row) => (
          <div style={{ padding: "0px 5px" }}>
            <span style={{ whiteSpace: "nowrap" }}>
              {moment(`${row.patient?.patient_dob}`).format("DD-MM-YYYY") ===
              "Invalid date"
                ? ""
                : moment(`${row.patient?.patient_dob}`).format("DD/MM/YYYY")}
            </span>
          </div>
        ),
      },

      {
        title: "Delivery Date",
        headerStyle: {
          whiteSpace: "nowrap",
        },
        field: "created_at",
        render: (row) => (
          <div style={{ padding: "0px 5px" }}>
            <span style={{ whiteSpace: "nowrap" }}>
              {moment(`${row.deliveryDate}`).format("DD-MM-YYYY") ===
              "Invalid date"
                ? ""
                : moment(`${row.deliveryDate}`).format("DD/MM/YYYY")}
            </span>
          </div>
        ),
      },
      {
        title: "Collected By",
        field: "collectedBy",
        headerStyle: {
          whiteSpace: "nowrap",
        },
        render: (row) => (
          <span style={{ whiteSpace: "nowrap" }}>{row?.collectedBy}</span>
        ),
      },
      {
        title: "Test",
        field: "testList",
        render: (row) => (
          <span style={{ whiteSpace: "nowrap" }}>{row?.testList}</span>
        ),
      },

      {
        title: "Total Bill",
        headerStyle: {
          whiteSpace: "nowrap",
        },
        field: "created_at",
        render: (row) => (
          <div style={{ padding: "0px 5px" }}>
            <span style={{ whiteSpace: "nowrap" }}>
              {row.invoice?.totalBill}
            </span>
          </div>
        ),
        cellStyle: {
          textAlign: "center",
        },
      },
    ],
    []
  );

  const filterColumns = useMemo(() => {
    if (user?.isSuperAdmin) {
      return columns;
    } else {
      return columns.filter((col) => col.field !== "saas_branch_name");
    }
  }, [user?.isSuperAdmin, columns]);

  // search with date range
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const searchByDateRange = () => {
    if (dateRange.startDate && dateRange.endDate) {
      axios.post("great-lab-delivery-info-by-date", dateRange).then((res) => {
        if (res.status === 200) {
          setDeliveryList(res.data.delivery);
          setFilterDeliveryList(res.data.delivery);
        }
      });
    } else {
      toast.error("Please enter start and end date!");
    }
  };
  // print test List
  const [selectedTest, setSelectedTest] = useState([]);
  const testRef = useRef();
  const handlePrintTest = useReactToPrint({
    content: () => testRef.current,
  });
  const printTestList = () => {
    if (selectedTest.length > 0) {
      handlePrintTest();
    } else {
      toast.error("Please select test for print!");
    }
  };
  return (
    <div className="ms-2 lab-agent all-patients mt-2">
      <div className="row">
        <div className="col-md-12">
          <div className="patients-head custom-card">
            <h5 className="fw-normal ml-3 text-start mb-1 text-login py-2">
              Smart Lab
              {/* <Link to='/application' className="btn btn-primary me-3 btn-sm float-end"> Add Lab Agent</Link> */}
            </h5>
          </div>
          <div className="custom-card p-2 mt-2">
            <div className="row">
              <div className="col-3">
                <h6>Report Delivery List</h6>
              </div>
              <div className="col-9 row">
                <div className="col-4 row">
                  <div className="col-2">
                    <label className="fw-bold"> Date</label>
                  </div>
                  <div className="col-10">
                    <input
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          startDate: e.target.value,
                        })
                      }
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-4 row">
                  <div className="col-2">
                    <label className="fw-bold"> To</label>
                  </div>
                  <div className="col-10">
                    <input
                      onChange={(e) =>
                        setDateRange({ ...dateRange, endDate: e.target.value })
                      }
                      type="date"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div className="col-4 row">
                  <div className="col-3 rx-one-button-group">
                    <button onClick={searchByDateRange} className="btn">
                      Search
                    </button>
                  </div>
                  <div className="col-9 row"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-table mt-2">
            <MaterialTable
              columns={filterColumns}
              data={fitlerDeliveryList}
              isLoading={loading === true ? true : false}
              options={{
                search: true,
                showTitle: false,
                overflowX: "auto",
                searchFieldAlignment: "left",
                pageSize: 10,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [5, 10, 20, 50, 100],
                selection: true,
              }}
              components={{
                Toolbar: (props) => (
                  <div className="d-flex justify-content-between align-items-center">
                    <MTableToolbar
                      style={{ width: 80, fontSize: 14 }}
                      {...props}
                    />
                    <Grid
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {user?.isSuperAdmin && (
                        <SimpleSelect
                          placeholder="Select Branch"
                          options={orgBranch}
                          value={selectedBranch}
                          onChange={handleChangeBranch}
                        />
                      )}
                      {selectedTest.length > 0 && (
                        <Tooltip title="Print test list" placement="bottom">
                          <PrintIcon
                            className="float-end export-icon pe-auto me-3 mt-1"
                            onClick={printTestList}
                          />
                        </Tooltip>
                      )}
                    </Grid>
                  </div>
                ),
              }}
              onSelectionChange={(rows) => setSelectedTest(rows)}
            />
            <div className="mt-2">
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "red" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Sample Not Collected Yet
              </span>
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "#FFD600" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Partial Sample Collected
              </span>
              <span className="me-2">
                {" "}
                <i
                  style={{ color: "#69B128" }}
                  className="fa-solid fa-square me-1"
                ></i>{" "}
                Sample Collected Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {selectedTest.length > 0 && (
        <div ref={testRef}>
          <div className="print-send-test-to-lab">
            <div className="invoice-pharmacy-details d-flex justify-content-center">
              <div className="text-center">
                <h5>Al Shifa Pharmacy</h5>
                <p>Location : Lalbagh</p>
                <p>Tel : 0171238765</p>
                <p>Vat Reg No :534565 </p>
              </div>
            </div>
            <h6 className="my-3 text-center">Report Delivery List</h6>
            <div className="d-flex justify-content-between mx-3">
              <p>To : IBN Sina Hospital</p>
              <p>
                Date :{" "}
                {moment(new Date().toJSON().slice(0, 10)).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="mx-3">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>HN</td>
                    <td>Name</td>
                    <td>Dob</td>
                    <td>Mobile Number</td>
                    <td>Test</td>
                    <td>Delivery Date</td>
                    <td>Total Bill</td>
                  </tr>
                  {selectedTest.map((test, i) => (
                    <tr key={i}>
                      <td>{test.patient?.patient_hn_number}</td>
                      <td>{test.patient?.patient_first_name}</td>
                      <td>
                        {moment(test.patient?.patient_dob).format("DD-MM-YYYY")}
                      </td>
                      <td>{test.patient?.patient_mobile_phone}</td>
                      <td>
                        <span>{test.testList} , </span>
                      </td>
                      <td>{moment(test.deliveryDate).format("DD-MM-YYYY")}</td>
                      <td>{test.invoice?.totalBill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row mt-5 mx-5">
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Prepared By</span>
              </div>
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Checked By</span>
              </div>
              <div className="col-4 text-center">
                <span className="d-inline-block border-top">Approved By</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreatLabReportDeliveryList;
