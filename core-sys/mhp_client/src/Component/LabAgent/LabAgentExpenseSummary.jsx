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
import { NewModal as Modal } from "../../common/components/NewModal";
import Button from "../../common/components/Button";
import SimpleSelect from "../../common/components/SimpleSelect";
import { Button as MuiButton } from "@mui/material";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import CountUp from "react-countup";
import { TbCurrencyTaka } from "react-icons/tb";

export default function LabAgentExpenseSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [allData, setAllData] = useState(0);
  const [accountsGroup, setAccountsGroup] = useState([]);
  const [selectedAccountsGroup, setSelectedAccountsGroup] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
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
    axios.get("lab-agent-expense").then((res) => {
      if (res.status === 200) {
        setInvoiceData(res.data.data);
        setAllData(res.data.all);
      }
    });
  }, [refetch]);

  useEffect(() => {
    axios.get(`/doctorFeeName`).then((res) => {
      if (res.data.status === 200) {
        setAccountsGroup(res.data.doctorFeeName);
      }
    });
  }, []);
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index
  );
  const handleSearch = () => {
    if (selectedAccountsGroup || selectedYear) {
      axios
        .get(
          `/lab-agent-expense-by/${
            selectedYear ? selectedYear.value : new Date().getFullYear()
          }/${
            selectedAccountsGroup?.value ? selectedAccountsGroup.value : "null"
          }/${
            user?.isSuperAdmin
              ? selectedBranch?.value
                ? selectedBranch?.value
                : "null"
              : user?.branch_id || "null"
          }`
        )
        .then((res) => {
          setInvoiceData(res.data.data);
          setAllData(res.data.all);
        });
    } else {
      toast.error("Please select year or group");
    }
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "30%",
      left: "25%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
      height: "230px",
      padding: "10px",
      zIndex: "3000",
    },
  };
  const [doctorFee, setdoctorFee] = useState({
    accounts_id: "",
    accounts_type_id: "",
    accounts_group_id: "",
    amount: "",
    description: "",
    saas_branch_id: "",
    saas_branch_name: "",
  });
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);
    const data = { ...doctorFee };
    if (!user?.isSuperAdmin) {
      data.saas_branch_id = user?.branch_id;
      data.saas_branch_name = user?.branch_name;
    } else {
      data.saas_branch_name = orgBranch.find(
        (branch) => Number(branch.id) === Number(data?.saas_branch_id)
      )?.name;
    }

    axios.post(`/lab-agent-save-expense`, data).then((res) => {
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setdoctorFee({
          accounts_id: "",
          accounts_type_id: "",
          accounts_group_id: "",
          amount: "",
          description: "",
          saas_branch_id: "",
          saas_branch_name: "",
        });
        axios.get("lab-agent-expense").then((res) => {
          if (res.status === 200) {
            setInvoiceData(res.data.data);
            setAllData(res.data.all);
          }
        });
        setRefetch(!refetch);
        setIsOpen(false);
        setIsSaving(false);
      } else {
        toast.error(res.data.message);
      }
    });
  };

  const handleChangeGroup = (data) => {
    if (data) {
      setSelectedAccountsGroup(data);
    } else {
      setSelectedAccountsGroup(null);
    }
  };

  const handleRefetch = () => {
    setRefetch(!refetch);
    setSelectedAccountsGroup(null);
    setSelectedYear(null);
    setSelectedBranch(null);
  };
  const handleChangeYear = (data) => {
    if (data) {
      setSelectedYear(data);
    } else {
      setSelectedYear(null);
    }
  };
  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  return (
    <div>
      <div
        className="custom-card p-2 d-flex justify-content-between mb-2 mt-2 ms-2"
        style={{ flexDirection: "column" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="">Expense Summary</h5>
          <Button onClick={() => setIsOpen(true)}>Add Expense</Button>
        </div>
      </div>
      <div className="bg-white mt-2 ms-2 custom-card">
        <div
          className="d-flex  flex-grow-1 gap-2 justify-content-end align-items-center"
          style={{ flexWrap: "wrap" }}
        >
          {user?.isSuperAdmin && (
            <SimpleSelect
              options={orgBranch}
              value={selectedBranch}
              onChange={handleChangeBranch}
              placeholder="Select Branch"
            />
          )}
          <SimpleSelect
            placeholder="Select Year"
            options={previousYears.map((year) => ({
              value: year,
              label: year,
            }))}
            onChange={handleChangeYear}
            value={selectedYear}
          />
          <SimpleSelect
            placeholder="Select Accounts Group"
            options={accountsGroup.map((item) => ({
              value: item.id,
              label: item.fee_name,
            }))}
            onChange={handleChangeGroup}
            value={selectedAccountsGroup}
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
        <div className="div my-2 p-2 row">
          <div className="col-12">
            <div className="row">
              <div className="col-6 px-1">
                <div className="div custom-card p-2 text-center me-2">
                  <h6>Total Expense :</h6>

                  <div className="d-flex justify-content-center align-items-center">
                    <TbCurrencyTaka size={16} />
                    <CountUp
                      start={0}
                      end={
                        invoiceData.reduce(
                          (total, current) => total + Number(current.Income),
                          0
                        ) || 0
                      }
                      duration={2}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 px-1">
                <div className="div custom-card p-2 text-center">
                  <h6>Total Invoice :</h6>
                  <CountUp start={0} end={allData} duration={2} />
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
            dataKey="Income"
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
                <label className="mb-1">
                  Account <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="accounts_id"
                  value={accounts.accounts_id}
                  onChange={handleInput}
                  required
                  className="form-select form-select-sm mb-2"
                  aria-label="Default select example"
                >
                  <option value={""}>Select</option>
                  {accounts.map((item, index) => {
                    return (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <label className="mb-1">
                  Accounts Type <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="accounts_type_id"
                  value={accounts.accounts_type_id}
                  onChange={handleInput}
                  required
                  className="form-select form-select-sm mb-2"
                  aria-label="Default select example"
                >
                  <option value={""}>Select</option>
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
                <label className="mb-1">
                  Accounts Group <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="accounts_group_id"
                  required
                  value={accounts.accounts_group_id}
                  onChange={handleInput}
                  className="form-select form-select-sm mb-2"
                  aria-label="Default select example"
                >
                  <option value={""}>Select</option>
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
                    <label className="mb-1">
                      Branch <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      name="saas_branch_id"
                      required
                      value={accounts.saas_branch_id}
                      onChange={handleInput}
                      className="form-select form-select-sm mb-2"
                      aria-label="Default select example"
                    >
                      <option selected>Select</option>
                      {orgBranch?.map((item, index) => {
                        return (
                          <option value={item.id} key={index}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}
                <label>
                  Amount <span style={{ color: "red" }}>*</span>
                </label>
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
            <div className="d-flex justify-content-end">
              <Button type="submit" isLoading={isSaving}>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
