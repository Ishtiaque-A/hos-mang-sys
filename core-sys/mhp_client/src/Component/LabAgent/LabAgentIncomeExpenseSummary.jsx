import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useReactToPrint } from "react-to-print";
import Modal from "react-modal";
import SimpleSelect from "../../common/components/SimpleSelect";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import Button from "../../common/components/Button";
import { Button as MuiButton } from "@mui/material";

export default function LabAgentIncomeExamSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  //   const [accountsYear, setAccountsYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [allTestGroup, setallTestGroup] = useState([]);
  const [allTest, setAllTest] = useState([]);
  const customStyles = {
    content: {
      top: "32%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "400px",
      padding: "10px",
      zIndex: "3000",
    },
  };
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
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
    axios.get("lab-agent-all-invoice-by-month").then((res) => {
      if (res.status === 200) {
        setInvoiceData(res.data.invoice);
      }
    });
    axios.get("lab-agent-expense").then((res) => {
      if (res.status === 200) {
        setExpenseData(res.data.data);
      }
    });
  }, [refetch]);
  useEffect(() => {
    axios.get(`/new-test-group`).then((res) => {
      if (res.data.status === 200) {
        const data = res?.data?.test_group?.map((item) => ({
          label: item.test_group_name,
          value: item.id,
        }));
        setallTestGroup(data);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data, "test");
        setAllTest(res.data.test_name);
      }
    });
  }, []);
  let netProfit = 0;
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index
  );
  const handleSearch = () => {
    if (selectedYear || testGroupId || selectedTest || selectedBranch) {
      axios
        .get(
          `/lab-agent-invoice-month-search/${
            selectedYear?.value ? selectedYear?.value : new Date().getFullYear()
          }/${testGroupId ? testGroupId : "null"}/${
            selectedTest ? selectedTest?.value : "null"
          }/${selectedBranch ? selectedBranch?.value : "null"}`
        )
        .then((res) => {
          setInvoiceData(res.data.all);
        });
      axios
        .get(
          `/lab-agent-expense-by/${
            selectedYear?.value ? selectedYear?.value : "null"
          }`
        )
        .then((res) => {
          setExpenseData(res.data.data);
        });
    } else {
      toast.error("Please select at least one filter");
    }
  };
  const componentRef = useRef();
  const prinIncomeExpense = useReactToPrint({
    content: () => componentRef.current,
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenExpense, setIsOpenExpense] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [month, setMonth] = useState("");
  const [testGroupId, setTestGroupId] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const handleModal = (data, month) => {
    axios
      .get(
        `/lab-agent-invoice-month-data/${
          selectedYear?.value ? selectedYear?.value : new Date().getFullYear()
        }/${data}/${testGroupId ? testGroupId : "null"}`
      )
      .then((res) => {
        if (res.status === 200) {
          setModalData(res.data.all);
          setMonth(month);
          setIsOpen(true);
        }
      });
  };
  const handleExpenseModal = (data, month) => {
    axios
      .get(
        `/lab-agent-expense-by-month/${
          selectedYear?.value ? selectedYear?.value : new Date().getFullYear()
        }/${data}`
      )
      .then((res) => {
        if (res.status === 200) {
          setModalData(res.data.all);
          setMonth(month);
          setIsOpenExpense(true);
        }
      });
  };

  const handleChangeYear = (data) => {
    if (data) {
      setSelectedYear(data);
    } else {
      setSelectedYear(null);
    }
  };

  const handleBranchChange = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };

  const handleClearFilter = () => {
    setSelectedYear(null);
    setSelectedBranch(null);
    setTestGroupId("");
    setSelectedTest(null);
    setRefetch(!refetch);
  };
  return (
    <div>
      <div className="custom-card d-flex justify-content-between p-2 mb-2 mt-2 ms-2">
        <h5 className="">Accounts Report</h5>
        <div className="d-flex">
          {user?.isSuperAdmin ? (
            <SimpleSelect
              options={orgBranch}
              placeholder="Select Branch"
              value={selectedBranch}
              width="150px"
              onChange={handleBranchChange}
            />
          ) : null}
          <SimpleSelect
            placeholder="Select Year"
            options={previousYears.map((year) => ({
              value: year,
              label: year,
            }))}
            width="150px"
            onChange={handleChangeYear}
            value={selectedYear}
          />
          <SimpleSelect
            options={allTestGroup}
            placeholder="Select Test Group"
            width="150px"
            value={
              allTestGroup?.find(
                (item) => Number(item?.value) === Number(testGroupId)
              ) || null
            }
            onChange={(data) => {
              if (data) {
                setTestGroupId(data?.value);
              } else {
                setTestGroupId("");
              }
            }}
          />
          <SimpleSelect
            options={
              allTest?.map((item) => ({
                label: item.test_name,
                value: item.id,
              })) || []
            }
            placeholder="Select Test"
            value={selectedTest}
            onChange={(data) => {
              if (data) {
                setSelectedTest(data);
              } else {
                setSelectedTest(null);
              }
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
          <MuiButton
            sx={{
              color: "#69B128",
            }}
            onClick={handleClearFilter}
          >
            Clear Filter
          </MuiButton>
        </div>
      </div>
      <div className="custom-card ms-2 p-1">
        <h6 className="ms-2">Income</h6>
        <div className="mt-2 accounts-income-table mx-2">
          <table>
            <tbody>
              <tr className="accounts-head">
                {invoiceData.map((item, index) => {
                  return (
                    <td
                      onClick={() => handleModal(index + 1, item.name)}
                      key={index}
                    >
                      {item.name}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {invoiceData.map((item, index) => {
                  return (
                    <td key={index}>
                      <span
                        style={{ fontSize: "18px", fontWeight: 700 }}
                        className="me-1"
                      >
                        &#x9F3;
                      </span>{" "}
                      {item.Income}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <h6 className="ms-2 mt-2">Expense</h6>
        <div className="mt-2 accounts-income-table mx-2">
          <table>
            <tbody>
              <tr className="accounts-head">
                {expenseData.map((item, index) => {
                  return (
                    <td
                      onClick={() => handleExpenseModal(index + 1, item.name)}
                      key={index}
                    >
                      {item.name}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {expenseData.map((item, index) => {
                  return (
                    <td key={index}>
                      <span
                        style={{ fontSize: "18px", fontWeight: 700 }}
                        className="me-1"
                      >
                        &#x9F3;
                      </span>{" "}
                      {item.Income}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <h6 className="ms-2 mt-2">Profit</h6>
        <div className="mt-2 accounts-income-table mx-2">
          <table>
            <tbody>
              <tr className="accounts-head">
                {expenseData.map((item, index) => {
                  return <td key={index}>{item.name}</td>;
                })}
              </tr>
              <tr>
                {invoiceData.map((item, index) => {
                  netProfit +=
                    parseInt(item?.Income) -
                    parseInt(expenseData[index]?.Income);
                  return (
                    <td key={index}>
                      <span
                        style={{ fontSize: "18px", fontWeight: 700 }}
                        className="me-1"
                      >
                        &#x9F3;
                      </span>{" "}
                      {Number(item.Income) - Number(expenseData[index]?.Income)}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          <h6 className="ms-2 mt-2">Net Profit : {netProfit}</h6>
          <div className="rx-one-button-group">
            <button onClick={prinIncomeExpense} className="btn">
              Print
            </button>
          </div>
        </div>
      </div>
      <div className="print-accounts-report">
        <div ref={componentRef}>
          <div className="text-center">
            <h6>
              Accounts Income & Expense Report :{" "}
              {selectedYear?.value
                ? selectedYear?.value
                : new Date().getFullYear()}
            </h6>
          </div>
          <h6 className="ms-2">Income</h6>
          <div className="mt-2 accounts-income-table mx-2">
            <table>
              <tbody>
                <tr className="accounts-head">
                  {invoiceData.map((item, index) => {
                    return <td key={index}>{item.name}</td>;
                  })}
                </tr>
                <tr>
                  {invoiceData.map((item, index) => {
                    return (
                      <td key={index}>
                        <span
                          style={{ fontSize: "18px", fontWeight: 700 }}
                          className="me-1"
                        >
                          &#x9F3;
                        </span>{" "}
                        {item.Income}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
          <h6 className="ms-2 mt-2">Expense</h6>
          <div className="mt-2 accounts-income-table mx-2">
            <table>
              <tbody>
                <tr className="accounts-head">
                  {expenseData.map((item, index) => {
                    return <td key={index}>{item.name}</td>;
                  })}
                </tr>
                <tr>
                  {expenseData.map((item, index) => {
                    return (
                      <td key={index}>
                        <span
                          style={{ fontSize: "18px", fontWeight: 700 }}
                          className="me-1"
                        >
                          &#x9F3;
                        </span>{" "}
                        {item.Income}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
          <h6 className="ms-2 mt-2">Profit</h6>
          <div className="mt-2 accounts-income-table mx-2">
            <table>
              <tbody>
                <tr className="accounts-head">
                  {expenseData.map((item, index) => {
                    return <td key={index}>{item.name}</td>;
                  })}
                </tr>
                <tr>
                  {invoiceData.map((item, index) => {
                    netProfit +=
                      parseInt(item?.Income) -
                      parseInt(expenseData[index]?.Income);
                    return (
                      <td key={index}>
                        <span
                          style={{ fontSize: "18px", fontWeight: 700 }}
                          className="me-1"
                        >
                          &#x9F3;
                        </span>{" "}
                        {Number(item.Income) -
                          Number(expenseData[index]?.Income)}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setIsOpen(false)}
        >
          <i class="fal fa-times"></i>
        </span>
        <div className="text-center">
          <h5>Smart Lab</h5>
          <h6>
            {" "}
            Income Report : {month},{" "}
            {selectedYear?.value
              ? selectedYear?.value
              : new Date().getFullYear()}
          </h6>
        </div>
        <div className="accounts-income-table">
          <table>
            <tbody>
              <tr className="accounts-head">
                <td>Invoice No</td>
                <td>Test Group</td>
                <td>Test Name</td>
                <td>Amount</td>
              </tr>

              {modalData.length > 0 ? (
                modalData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.invoiceNo}</td>
                      <td> {item.testCategory}</td>
                      <td> {item.testName}</td>
                      <td>
                        <span
                          style={{ fontSize: "18px", fontWeight: 700 }}
                          className="me-1"
                        >
                          &#x9F3;
                        </span>{" "}
                        {Number(item.fee) -
                          (Number(item.fee) * Number(item.discount)) / 100}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    {" "}
                    No Data Found{" "}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={3} className="text-end">
                  Total
                </td>
                <td>
                  <span
                    style={{ fontSize: "18px", fontWeight: 700 }}
                    className="me-1"
                  >
                    &#x9F3;
                  </span>{" "}
                  {modalData.reduce(
                    (total, current) =>
                      total +
                      (Number(current.fee) -
                        (Number(current.fee) * Number(current.discount)) / 100),
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenExpense}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span
          className="float-end"
          style={{ fontSize: "15px", cursor: "pointer" }}
          onClick={() => setIsOpenExpense(false)}
        >
          <i className="fal fa-times"></i>
        </span>
        <div className="text-center">
          <h5>Smart Lab</h5>
          <h6>
            {" "}
            Expense Report : {month},{" "}
            {selectedYear?.value
              ? selectedYear?.value
              : new Date().getFullYear()}
          </h6>
        </div>
        <div className="accounts-income-table">
          <table>
            <tbody>
              <tr className="accounts-head">
                <td>Accounts Type</td>
                <td>Accounts Group</td>
                <td>Amount</td>
              </tr>

              {modalData.length > 0 ? (
                modalData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.accounts_type?.name}</td>
                      <td> {item.accounts_group?.fee_name}</td>
                      <td>
                        <span
                          style={{ fontSize: "18px", fontWeight: 700 }}
                          className="me-1"
                        >
                          &#x9F3;
                        </span>{" "}
                        {item.amount}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    {" "}
                    No Data Found{" "}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="text-end">
                  Total
                </td>
                <td>
                  <span
                    style={{ fontSize: "18px", fontWeight: 700 }}
                    className="me-1"
                  >
                    &#x9F3;
                  </span>{" "}
                  {modalData.reduce(
                    (total, current) => total + Number(current.amount),
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
