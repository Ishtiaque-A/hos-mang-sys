import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import Modal from "react-modal";
import SimpleSelect from "../../common/components/SimpleSelect";
import Button from "../../common/components/Button";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import { Button as MuiButton } from "@mui/material";

export default function GreatLabIncomeExpenseReport() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [accountsYear, setAccountsYear] = useState(null);
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
  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  const [refetch, setRefetch] = useState(false);
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
    axios.get("great-lab-all-invoice-by-month").then((res) => {
      console.log(res.data, "invoice");
      if (res.status === 200) {
        setInvoiceData(res.data.invoice);
      }
    });
    axios.get("great-lab-expense").then((res) => {
      console.log(res.data, "expense");
      if (res.status === 200) {
        setExpenseData(res.data.data);
      }
    });
    axios.get(`/new-test-group`).then((res) => {
      if (res.data.status === 200) {
        setallTestGroup(res.data.test_group);
      }
    });
    axios.get(`/new-test-name`).then((res) => {
      if (res.data.status === 200) {
        const modifiedData = res?.data?.test_name?.map((item) => ({
          ...item,
          value: item.id,
          label: item.test_name,
        }));
        setAllTest(modifiedData);
      }
    });
  }, [refetch]);
  let netProfit = 0;
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index - 1
  );
  const years = [currentYear, ...previousYears];
  const handleSearch = () => {
    if (accountsYear || testGroupId || testId || selectedBranch) {
      axios
        .get(
          `/great-lab-invoice-month-search/${
            accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
          }/${testGroupId ? testGroupId : "null"}/${
            user?.isSuperAdmin
              ? selectedBranch?.value
                ? selectedBranch?.value
                : "null"
              : user?.branch_id || "null"
          }/${testId ? testId.id : "null"}`
        )
        .then((res) => {
          console.log(res.data);
          setInvoiceData(res.data.all);
        });
      axios
        .get(
          `/great-lab-expense-by/${
            accountsYear?.value ? accountsYear?.value : "null"
          }/null/${
            user?.isSuperAdmin
              ? selectedBranch?.value
                ? selectedBranch?.value
                : "null"
              : user?.branch_id || "null"
          }`
        )
        .then((res) => {
          setExpenseData(res.data.data);
        });
    } else {
      toast.error("Please select  at least one filter");
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
  const [testId, setTestId] = useState(null);
  const handleModal = (data, month) => {
    axios
      .get(
        `/great-lab-invoice-month-data/${
          accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
        }/${data}/${testGroupId?.value ? testGroupId?.value : "null"}`
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
        `/great-lab-expense-by-month/${
          accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
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
  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  const handleClearFilter = () => {
    setAccountsYear(null);
    setTestGroupId(null);
    setTestId(null);
    setSelectedBranch(null);
    setRefetch(!refetch);
  };

  return (
    <div>
      <div className="custom-card d-flex align-items-center flex-wrap justify-content-between p-2 mb-2 mt-2 ms-2">
        <h5 className="m-0 p-0">Accounts Report</h5>
        <div className="d-flex">
          {user?.isSuperAdmin ? (
            <SimpleSelect
              options={orgBranch}
              value={selectedBranch}
              onChange={handleChangeBranch}
              placeholder="Select Branch"
              width="150px"
            />
          ) : null}
          <SimpleSelect
            options={years.map((year) => ({ value: year, label: year }))}
            value={accountsYear}
            onChange={(data) => {
              if (data) {
                setAccountsYear(data);
              } else {
                setAccountsYear(null);
              }
            }}
            placeholder="Select Year"
            width="150px"
          />
          <SimpleSelect
            options={
              allTestGroup?.map((item) => ({
                value: item.id,
                label: item.test_group_name,
              })) || []
            }
            placeholder="Select Test Group"
            onChange={(data) => {
              if (data) {
                setTestGroupId(data);
              } else {
                setTestGroupId(null);
              }
            }}
            width="150px"
            value={testGroupId}
          />
          <SimpleSelect
            options={allTest}
            placeholder="Select Test"
            onChange={(data) => {
              if (data) {
                setTestId(data);
              } else {
                setTestId(null);
              }
            }}
            value={testId}
            width="150px"
          />
          <Button onClick={handleSearch}>Search</Button>
          <MuiButton
            onClick={handleClearFilter}
            sx={{
              color: "#69B128",
            }}
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
                {invoiceData?.length > 0 &&
                  invoiceData?.map((item, index) => {
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
                {invoiceData?.length > 0 &&
                  invoiceData?.map((item, index) => {
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
                {expenseData?.map((item, index) => {
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
                {expenseData?.map((item, index) => {
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
                {expenseData?.map((item, index) => {
                  return <td key={index}>{item.name}</td>;
                })}
              </tr>
              <tr>
                {invoiceData?.length > 0 &&
                  invoiceData?.map((item, index) => {
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
        <div className="d-flex justify-content-between">
          <h6 className="ms-2 mt-2">Net Profit : {netProfit}</h6>
          <div className="rx-one-button-group">
            <Button onClick={prinIncomeExpense}>Print</Button>
          </div>
        </div>
      </div>
      <div className="print-accounts-report">
        <div ref={componentRef}>
          <div className="text-center">
            <h6>
              Accounts Income & Expense Report :{" "}
              {accountsYear?.value
                ? accountsYear?.value
                : new Date().getFullYear()}
            </h6>
          </div>
          <h6 className="ms-2">Income</h6>
          <div className="mt-2 accounts-income-table mx-2">
            <table>
              <tbody>
                <tr className="accounts-head">
                  {invoiceData?.length > 0 &&
                    invoiceData?.map((item, index) => {
                      return <td key={index}>{item.name}</td>;
                    })}
                </tr>
                <tr>
                  {invoiceData?.length > 0 &&
                    invoiceData?.map((item, index) => {
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
                  {expenseData?.map((item, index) => {
                    return <td key={index}>{item.name}</td>;
                  })}
                </tr>
                <tr>
                  {expenseData?.map((item, index) => {
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
                  {expenseData?.map((item, index) => {
                    return <td key={index}>{item.name}</td>;
                  })}
                </tr>
                <tr>
                  {invoiceData?.length > 0 &&
                    invoiceData?.map((item, index) => {
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
            {accountsYear?.value
              ? accountsYear?.value
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

              {modalData?.length > 0 ? (
                modalData?.map((item, index) => {
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
            {accountsYear ? accountsYear : new Date().getFullYear()}
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
