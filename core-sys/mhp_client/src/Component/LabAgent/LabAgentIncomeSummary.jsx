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
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import Button from "../../common/components/Button";
import { Button as MuiButton } from "@mui/material";
import SimpleSelect from "../../common/components/SimpleSelect";
import CountUp from "react-countup";

export default function LabAgentIncomeSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [allData, setAllData] = useState(0);
  const [accountsYear, setAccountsYear] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const user = useUserData();
  const { SaasAuthURL } = useCredentialURL();
  const [orgBranch, setOrgBranch] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
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
        setAllData(res.data.all);
      }
    });
  }, [refetch]);

  const handleRefetch = () => {
    setAccountsYear(null);
    setSelectedBranch(null);
    setRefetch(!refetch);
  };

  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 30 },
    (_, index) => currentYear - index
  );
  const handleSearch = () => {
    if (selectedBranch?.id || accountsYear) {
      axios
        .get(
          `/lab-agent-invoice-month-data-by-year/${
            accountsYear?.value ? accountsYear?.value : new Date().getFullYear()
          }/${user?.branch_id ? user?.branch_id : selectedBranch?.id || "null"}`
        )
        .then((res) => {
          setInvoiceData(res.data.data);
          setAllData(res.data.all);
        });
    } else {
      toast.error("Please select year or branch");
    }
  };

  const handleFilterBranch = (selectedBranch) => {
    if (selectedBranch) {
      setSelectedBranch(selectedBranch);
    } else {
      setSelectedBranch(null);
    }
  };
  const handleFilterYear = (selectedYear) => {
    if (selectedYear) {
      setAccountsYear(selectedYear);
    } else {
      setAccountsYear(null);
    }
  };
  return (
    <div>
      <div className="custom-card d-flex justify-content-between align-items-center p-2 mb-2 mt-2 ms-2">
        <h5 className="">Income Summary</h5>
        <div className="d-flex justify-content-end gap-2 align-items-center">
          {user?.isSuperAdmin ? (
            <div className="filter me-2">
              <SimpleSelect
                value={selectedBranch}
                options={orgBranch}
                onChange={handleFilterBranch}
                placeholder="Select Branch"
              />
            </div>
          ) : null}
          <SimpleSelect
            value={accountsYear}
            options={previousYears.map((year) => ({
              label: year,
              value: year,
            }))}
            onChange={handleFilterYear}
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
      <div className="bg-white mt-2 ms-2 custom-card">
        <div className="div my-2 p-2 row">
          <div className="col-12">
            <div className="row">
              <div className="col-6 px-1">
                <div className="custom-card p-2 text-center me-2">
                  <h6>Total Income :</h6>
                  <p>
                    <span
                      style={{ fontSize: "18px", fontWeight: 700 }}
                      className="me-1"
                    >
                      &#x9F3;
                    </span>
                    <CountUp
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

              <div className="col-6 px-1">
                <div className="div custom-card p-2 text-center">
                  <h6>Total Invoice :</h6>
                  <p>
                    <CountUp end={allData || 0} duration={2} />
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
