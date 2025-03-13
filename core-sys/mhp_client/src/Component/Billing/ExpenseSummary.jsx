import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { toast } from "react-toastify";
// import Modal from 'react-modal';
import { NewModal as Modal } from "../../common/components/NewModal";
import Button from "../../common/components/Button";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import useUserData from "../../hooks/useUserData";
import CountUp from "react-countup";
import { TbCurrencyTaka } from "react-icons/tb";
import SimpleSelect from "../../common/components/SimpleSelect";
import { Button as MuiButton } from "@mui/material";
export default function ExpenseSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [allData, setAllData] = useState(0);
  const [accountsGroup, setAccountsGroup] = useState([]);
  const [accountsYear, setAccountsYear] = useState("");
  const [accountsGroupId, setAccountsGroupId] = useState("");
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

  useEffect(() => {
    axios.get("accounts-expense-month").then((res) => {
      if (res.status === 200) {
        setInvoiceData(res.data.data);
        setAllData(res.data.all.length);
      }
    });
    axios.get(`/doctorFeeName`).then((res) => {
      if (res.data.status === 200) {
        setAccountsGroup(res.data.doctorFeeName);
      }
    });
  }, [refetch]);
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index
  );
  const handleSearch = () => {
    if (accountsGroupId || accountsYear || selectedBranch) {
      axios
        .get(
          `/accounts-expense-by/${
            accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
          }/${accountsGroupId?.value ? accountsGroupId?.value : "null"}/${
            user?.branch_id ? user?.branch_id : selectedBranch?.id || "null"
          }`
        )
        .then((res) => {
          console.log(res.data);
          setInvoiceData(res.data.data);
          setAllData(res.data.all.length);
        });
    } else {
      toast.error("Please select at least one field");
    }
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  const [doctorFee, setdoctorFee] = useState({
    accounts_id: "",
    accounts_type_id: "",
    accounts_group_id: "",
    amount: "",
    description: "",
    saas_branch_id: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [accountsType, setAccountsType] = useState([]);
  const [accountsGroupDropDown, setAccountsGroupDropDown] = useState([]);
  useEffect(() => {
    axios.get(`/all-accounts`).then((res) => {
      if (res.data.status === 200) {
        setAccounts(res.data.accounts);
      }
    });
  }, []);
  useEffect(() => {
    if (doctorFee.accounts_id) {
      axios.get(`/accounts-type-by-id/${doctorFee.accounts_id}`).then((res) => {
        if (res.data.status === 200) {
          setAccountsType(res.data.accounts);
        }
      });
    }
  }, [doctorFee.accounts_id]);
  useEffect(() => {
    if (doctorFee.accounts_type_id) {
      axios
        .get(`/accounts-group-by-id/${doctorFee.accounts_type_id}`)
        .then((res) => {
          console.log(res.data, "dde");
          if (res.data.status === 200) {
            setAccountsGroupDropDown(res.data.accounts);
          }
        });
    }
  }, [doctorFee.accounts_type_id]);

  const handleInput = (e) => {
    setdoctorFee({
      ...doctorFee,
      [e.target.name]: e.target.value,
    });
  };
  const saveExpense = (e) => {
    e.preventDefault();
    if (
      !doctorFee.accounts_id ||
      !doctorFee.accounts_type_id ||
      !doctorFee.accounts_group_id ||
      !doctorFee.amount
    ) {
      toast.error("Please fill all fields");
      return;
    }
    const data = {
      ...doctorFee,
      saas_branch_name: orgBranch?.find(
        (branch) => Number(branch.id) === Number(doctorFee.saas_branch_id)
      )?.name,
    };
    if (!user?.isSuperAdmin) {
      data.saas_branch_id = user?.branch_id;
      data.saas_branch_name = user?.branch_name;
    }
    axios.post(`/save-accounts-expense`, data).then((res) => {
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setdoctorFee({
          accounts_id: "",
          accounts_type_id: "",
          accounts_group_id: "",
          amount: "",
          description: "",
          saas_branch_id: "",
        });
        setRefetch(!refetch);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleRefetch = () => {
    setAccountsYear(null);
    setSelectedBranch(null);
    setAccountsGroupId(null);
    setRefetch(!refetch);
  };
  return (
    <div>
      <div className="custom-card p-2 d-flex justify-content-between mb-2 mt-2 ms-2">
        <h5 className="">Expense Summary</h5>
        <div className="rx-one-button-group">
          <button onClick={() => setIsOpen(true)} className="btn">
            Add Expense
          </button>
        </div>
      </div>
      <div className="bg-white mt-2 ms-2 custom-card">
        <div className="div my-2 p-2 row">
          <div className="col-12">
            <div className="d-flex justify-content-end">
              {user?.isSuperAdmin && (
                <SimpleSelect
                  options={orgBranch}
                  value={selectedBranch}
                  onChange={(data) => {
                    if (data) {
                      setSelectedBranch(data);
                    } else {
                      setSelectedBranch(null);
                    }
                  }}
                  width="150px"
                  placeholder="Select Branch"
                />
              )}

              <SimpleSelect
                options={previousYears.map((year) => ({
                  value: year,
                  label: year,
                }))}
                value={accountsYear}
                width="150px"
                onChange={(data) => {
                  if (data) {
                    setAccountsYear(data);
                  } else {
                    setAccountsYear(null);
                  }
                }}
                placeholder="Select Year"
              />
              <SimpleSelect
                options={accountsGroup?.map((group) => ({
                  value: group.id,
                  label: group.fee_name,
                }))}
                value={accountsGroupId}
                onChange={(data) => {
                  if (data) {
                    setAccountsGroupId(data);
                  } else {
                    setAccountsGroupId(null);
                  }
                }}
                placeholder="Select Group"
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
          <div className="col-12 my-2">
            <div className="row">
              <div className="col-6">
                <div className="div custom-card p-2 text-center me-2">
                  <h6>Total Expense :</h6>
                  <div className="d-flex justify-content-center align-items-center">
                    <TbCurrencyTaka />
                    <CountUp
                      end={
                        invoiceData.reduce(
                          (total, current) => total + Number(current.Expense),
                          0
                        ) || 0
                      }
                      duration={2}
                      start={0}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="div custom-card p-2 text-center">
                  <h6>Total Invoice :</h6>
                  <CountUp end={allData || 0} duration={2} start={0} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AreaChart
          width={1100}
          height={400}
          data={invoiceData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Expense"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </div>
      <Modal isOpen={modalIsOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header onClose={() => setIsOpen(false)}>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <form onSubmit={saveExpense}>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <label className="mb-1">Account</label>
                <select
                  required
                  name="accounts_id"
                  value={accounts.accounts_id}
                  onChange={handleInput}
                  className="form-select form-select-sm mb-2"
                  aria-label="Default select example"
                >
                  <option selected value={""}>
                    Select
                  </option>
                  {accounts.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <label className="mb-1">Accounts Type</label>
                <select
                  required
                  name="accounts_type_id"
                  value={accounts.accounts_type_id}
                  onChange={handleInput}
                  className="form-select form-select-sm mb-2"
                  aria-label="Default select example"
                >
                  <option selected value={""}>
                    Select
                  </option>
                  {accountsType.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6">
                <label className="mb-1">Accounts Group</label>
                <select
                  required
                  name="accounts_group_id"
                  value={accounts.accounts_group_id}
                  onChange={handleInput}
                  className="form-select form-select-sm mb-2"
                  aria-label="Default select example"
                >
                  <option selected value={""}>
                    Select
                  </option>
                  {accountsGroupDropDown.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.fee_name}
                      </option>
                    );
                  })}
                </select>
                {user?.isSuperAdmin && (
                  <>
                    <label className="mb-1">Branch</label>
                    <select
                      name="saas_branch_id"
                      value={doctorFee.saas_branch_id}
                      onChange={handleInput}
                      className="form-select form-select-sm mb-2"
                      aria-label="Default select example"
                      required
                    >
                      <option selected value={""}>
                        Select
                      </option>
                      {orgBranch.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}
                <label>Amount</label>
                <input
                  required
                  name="amount"
                  onChange={handleInput}
                  type="number"
                  className="form-control form-control-sm"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
