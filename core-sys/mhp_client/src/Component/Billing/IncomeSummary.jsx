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
import SimpleSelect from "../../common/components/SimpleSelect";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import Button from "../../common/components/Button";
import { Button as MuiButton } from "@mui/material";
import CountUp from "react-countup";
export default function IncomeSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [allData, setAllData] = useState(0);
  const [accountsGroup, setAccountsGroup] = useState([]);
  const [accountsYear, setAccountsYear] = useState(null);
  const [accountsGroupId, setAccountsGroupId] = useState(null);
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
    axios.get("accounts-invoice-month-data").then((res) => {
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
  console.log(accountsYear, accountsGroupId);
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index
  );
  const handleSearch = () => {
    if (accountsGroupId || accountsYear || selectedBranch) {
      axios
        .get(
          `/accounts-invoice-month-data-by-year/${
            accountsYear?.value ? accountsYear?.value : "null"
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
  const handleClearFilter = () => {
    setAccountsYear(null);
    setAccountsGroupId(null);
    setSelectedBranch(null);
    setRefetch(!refetch);
  };
  return (
    <div>
      <div className="custom-card p-2 mb-2 mt-2 ms-2">
        <h5 className="">Income Summary</h5>
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
                  placeholder="Select Branch"
                  width="150px"
                />
              )}
              <SimpleSelect
                options={previousYears.map((year) => ({
                  label: year,
                  value: year,
                }))}
                width="150px"
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
                onClick={handleClearFilter}
              >
                Clear Filter
              </MuiButton>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex row my-2">
              <div className="col-6">
                <div className="div custom-card p-2 text-center me-2">
                  <h6>Total Income :</h6>
                  <p>
                    <span
                      style={{ fontSize: "18px", fontWeight: 700 }}
                      className="me-1"
                    >
                      &#x9F3;
                    </span>{" "}
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
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div className="div custom-card p-2 text-center">
                  <h6>Total Invoice :</h6>
                  <p>
                    <CountUp start={0} end={allData || 0} duration={2} />
                  </p>
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
    </div>
  );
}
