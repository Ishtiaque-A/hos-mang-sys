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
import CountUp from "react-countup";
import SimpleSelect from "../../common/components/SimpleSelect";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import { TbCurrencyTaka } from "react-icons/tb";
import Button from "../../common/components/Button";
import { Button as MuiButton } from "@mui/material";

export default function GreatLabExpenseSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [allData, setAllData] = useState(0);
  const [accountsGroup, setAccountsGroup] = useState([]);
  const [accountsYear, setAccountsYear] = useState("");
  const [accountsGroupId, setAccountsGroupId] = useState("");
  // const [selectedYear, setSelectedYear] = useState(null);
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
    axios.get("great-lab-expense").then((res) => {
      if (res.status === 200) {
        setInvoiceData(res.data.data);
        setAllData(res.data.all);
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
    (_, index) => currentYear - index - 1
  );
  const years = [currentYear, ...previousYears];
  const handleSearch = () => {
    if (accountsGroupId || accountsYear || selectedBranch) {
      axios
        .get(
          `/great-lab-expense-by/${
            accountsYear?.value ? accountsYear?.value : "null"
          }/${accountsGroupId?.value ? accountsGroupId?.value : "null"}/${
            user?.isSuperAdmin
              ? selectedBranch?.value
                ? selectedBranch?.value
                : "null"
              : user?.branch_id || "null"
          }`
        )
        .then((res) => {
          console.log(res.data);
          setInvoiceData(res.data.data);
          setAllData(res.data.all.length);
        });
    } else {
      toast.error("Please Select at least one filter");
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
  const [isSaving, setIsSaving] = useState(false);
  const [doctorFee, setdoctorFee] = useState({
    accounts_id: "",
    accounts_type_id: "",
    accounts_group_id: "",
    amount: "",
    description: "",
    saas_branch_id: "",
    saas_branch_name: "",
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
    axios.post(`/great-lab-save-expense`, data).then((res) => {
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
        axios.get("great-lab-expense").then((res) => {
          if (res.status === 200) {
            setInvoiceData(res.data.data);
            setAllData(res.data.all);
          }
        });
        setIsSaving(false);
        setIsOpen(false);
      } else {
        toast.error(res.data.message);
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
    setSelectedBranch(null);
    setAccountsYear(null);
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
              {user?.isSuperAdmin ? (
                <SimpleSelect
                  options={orgBranch}
                  value={selectedBranch}
                  onChange={handleChangeBranch}
                  placeholder="Select Branch "
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
              />
              <SimpleSelect
                options={accountsGroup?.map((item) => ({
                  ...item,
                  value: item.id,
                  label: item.fee_name,
                }))}
                placeholder="Select Accounts Group"
                value={accountsGroupId}
                onChange={(data) => {
                  if (data) {
                    setAccountsGroupId(data);
                  } else {
                    setAccountsGroupId(null);
                  }
                }}
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
        </div>
        <div className="row p-2">
          <div className="col-6">
            <div className="custom-card p-2 text-center me-2">
              <h6>Total Expense :</h6>
              <div className="d-flex align-items-center justify-content-center">
                <TbCurrencyTaka size={16} />
                <CountUp
                  end={
                    invoiceData?.reduce(
                      (total, current) => total + Number(current.Income),
                      0
                    ) || 0
                  }
                  duration={2}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="custom-card p-2 text-center">
              <h6>Total Invoice :</h6>

              <CountUp end={allData || 0} duration={2} />
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
                  Account <span style={{ color: "red" }}>*</span>{" "}
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
                      value={accounts.saas_branch_id}
                      onChange={handleInput}
                      className="form-select form-select-sm mb-2"
                      aria-label="Default select example"
                    >
                      <option value={""}>Select</option>
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
                <label>
                  Amount <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  name="amount"
                  onChange={handleInput}
                  type="number"
                  required
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
