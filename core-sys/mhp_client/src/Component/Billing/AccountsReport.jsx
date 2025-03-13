import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import Modal from "react-modal";
import useCredentialURL from "../../hooks/useCredentialURL";
import useUserData from "../../hooks/useUserData";
import { getAllBranch } from "../../utils/getAllBranch";
import SimpleSelect from "../../common/components/SimpleSelect";
import Button from "../../common/components/Button";
import { Button as MuiButton } from "@mui/material";
export default function AccountsReport() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [accountsYear, setAccountsYear] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [orgBranch, setOrgBranch] = useState([]);
  const { SaasAuthURL } = useCredentialURL();
  const [refetch, setRefetch] = useState(false);
  const user = useUserData();
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
  useEffect(() => {
    axios.get("accounts-invoice-month-data").then((res) => {
      if (res.status === 200) {
        setInvoiceData(res.data.data);
      }
    });
    axios.get("accounts-expense-month").then((res) => {
      if (res.status === 200) {
        setExpenseData(res.data.data);
      }
    });
  }, [refetch]);
  let netProfit = 0;
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index
  );
  const handleSearch = () => {
    if (accountsYear || selectedBranch) {
      axios
        .get(
          `/accounts-invoice-month-data-by-year/${
            accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
          }/null/${
            user?.branch_id ? user?.branch_id : selectedBranch?.id || "null"
          }`
        )
        .then((res) => {
          setInvoiceData(res.data.data);
        });
      axios
        .get(
          `/accounts-expense-by/${
            accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
          }/null/${
            user?.branch_id ? user?.branch_id : selectedBranch?.id || "null"
          }`
        )
        .then((res) => {
          setExpenseData(res.data.data);
        });
    } else {
      toast.error("Please select at least one field");
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
  const handleModal = (data, month) => {
    axios
      .get(
        `/income-month-data-by-year/${
          accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
        }/${data}`
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
        `/expense-month-data-by-year/${
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
  const handleRefetch = () => {
    setAccountsYear(null);
    setSelectedBranch(null);
    setRefetch(!refetch);
  };
  return (
    <div>
      <div className="custom-card d-flex justify-content-between p-2 mb-2 mt-2 ms-2">
        <h5 className="">Accounts Report</h5>
        <div className="d-flex">
          {user?.isSuperAdmin && (
            <SimpleSelect
              options={orgBranch}
              onChange={(data) => {
                if (data) {
                  setSelectedBranch(data);
                } else {
                  setSelectedBranch(null);
                }
              }}
              placeholder="Select Branch"
              value={selectedBranch}
            />
          )}
          <SimpleSelect
            options={previousYears?.map((year) => ({
              value: year,
              label: year,
            }))}
            value={accountsYear}
            onChange={(data) => {
              if (data) {
                setAccountsYear(data);
              } else {
                setAccountsYear(null);
              }
            }}
            placeholder="Select Year"
          />
          <Button onClick={handleSearch}>Search</Button>
          <MuiButton
            sx={{
              color: "#69B128",
            }}
            onClick={handleRefetch}
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
                      {item.Expense}
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
                    parseInt(expenseData[index]?.Expense);
                  return (
                    <td key={index}>
                      <span
                        style={{ fontSize: "18px", fontWeight: 700 }}
                        className="me-1"
                      >
                        &#x9F3;
                      </span>{" "}
                      {Number(item.Income) -
                        Number(expenseData[index]?.Expense)}
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
                        {item.Expense}
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
                      parseInt(expenseData[index]?.Expense);
                    return (
                      <td key={index}>
                        <span
                          style={{ fontSize: "18px", fontWeight: 700 }}
                          className="me-1"
                        >
                          &#x9F3;
                        </span>{" "}
                        {Number(item.Income) -
                          Number(expenseData[index]?.Expense)}
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
          <h5>Macrohealth Plus</h5>
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
                <td>Name</td>
                <td>Accounts Group</td>
                <td>Amount</td>
              </tr>

              {modalData.length > 0 ? (
                modalData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.patient_first_name}</td>
                      <td> {item.fee_name}</td>
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
          <h5>Macrohealth Plus</h5>
          <h6>
            {" "}
            Expense Report : {month},{" "}
            {accountsYear?.value
              ? accountsYear?.value
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
                      <td> {item.name}</td>
                      <td> {item.fee_name}</td>
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
