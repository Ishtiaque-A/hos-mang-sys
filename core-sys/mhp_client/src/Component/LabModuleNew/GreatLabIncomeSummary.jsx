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
import CountUp from "react-countup";
import SimpleSelect from "../../common/components/SimpleSelect";
import Button from "../../common/components/Button";
import useUserData from "../../hooks/useUserData";
import useCredentialURL from "../../hooks/useCredentialURL";
import { getAllBranch } from "../../utils/getAllBranch";
import { Button as MuiButton } from "@mui/material";

export default function GreatLabIncomeSummary() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [allData, setAllData] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
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

  const handleChangeBranch = (data) => {
    if (data) {
      setSelectedBranch(data);
    } else {
      setSelectedBranch(null);
    }
  };
  useEffect(() => {
    axios.get("great-lab-all-invoice-by-month").then((res) => {
      if (res.status === 200) {
        setInvoiceData(res.data.invoice);
        setAllData(res.data.all);
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
    if (selectedYear || selectedBranch) {
      axios
        .get(
          `/great-lab-invoice-month-data-by-year/${
            selectedYear?.value ? selectedYear?.value : new Date().getFullYear()
          }/${selectedBranch?.value ? selectedBranch?.value : user?.branch_id}`
        )
        .then((res) => {
          setInvoiceData(res.data.invoice);
          setAllData(res.data.all);
        });
    } else {
      toast.error("Please select at least one field");
    }
  };

  const handleClearFilter = () => {
    setSelectedYear(null);
    setSelectedBranch(null);
    setRefetch(!refetch);
  };
  return (
    <div>
      <div className="custom-card d-flex justify-content-between align-items-center p-2 mb-2 mt-2 ms-2">
        <h5 className="">Income Summary</h5>
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
            placeholder="Select Year"
            options={years.map((year) => ({ value: year, label: year }))}
            value={selectedYear}
            onChange={(data) => {
              if (data) {
                setSelectedYear(data);
              } else {
                setSelectedYear(null);
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
      <div className="bg-white mt-2 pt-2 ms-2 custom-card">
        <div className="row">
          <div className="col-6">
            <div>
              <div className="custom-card p-1 m-2 text-center ">
                <h6>Total Income :</h6>
                <p>
                  <span
                    style={{ fontSize: "18px", fontWeight: 700 }}
                    className="me-1"
                  >
                    &#x9F3;
                  </span>{" "}
                  <CountUp
                    end={
                      invoiceData?.reduce(
                        (total, current) => total + Number(current.Income),
                        0
                      ) || 0
                    }
                    duration={2}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="custom-card p-1 m-2 text-center">
              <h6>Total Invoice :</h6>
              <p>
                <CountUp end={allData || 0} duration={2} />
              </p>
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
