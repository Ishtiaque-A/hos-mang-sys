import React, { useEffect, useState } from "react";
import EmailSMSGatewaySidebar from "./EmailSMSGatewaySidebar";
import CountUp from "react-countup";
import Button from "../../common/components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import useCredentialURL from "../../hooks/useCredentialURL";

const SMSDashboard = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [smsCounter, setSMSCounter] = useState({
    totalSMS: 0,
    totalUsed: 0,
    totalAvailable: 0,
  });
  const { SaasAuthURL } = useCredentialURL();
  const organization = JSON.parse(localStorage.getItem("userData"));

  const getTransaction = async (id) => {
    const { data } = await axios.get(
      `${SaasAuthURL}/sms/transaction-sms/${id}`
    );
    if (data) {
      console.log(data);
      const transactionWithExpireDate = data?.transactionWithExpireDate;
      const transactionWithoutExpireDate = data?.transactionWithoutExpireDate;
      const totalSMS = transactionWithoutExpireDate.reduce(
        (acc, transaction) => acc + transaction.buy_total_sms,
        0
      );
      const totalUsed = transactionWithoutExpireDate.reduce(
        (acc, transaction) => acc + transaction.total_use_sms,
        0
      );
      const totalAvailable = transactionWithoutExpireDate.reduce(
        (acc, transaction) => acc + transaction.total_available_sms,
        0
      );
      setSMSCounter({
        totalSMS,
        totalUsed,
        totalAvailable,
      });
      setTransaction(transactionWithExpireDate);
    }
  };
  useEffect(() => {
    if (organization?.organization_id) {
      getTransaction(organization?.organization_id);
    }
  }, [organization?.organization_id]);

  const columns = [
    {
      title: "Transaction ID",
      field: "transaction_id",
    },
    {
      title: "Purchase Date",
      field: "created_at",
      render: (row) => moment(row.created_at).format("DD/MM/YYYY"),
    },
    {
      title: "Package Name",
      field: "package_name",
    },
    {
      title: "Package SMS",
      field: "buy_total_sms",
    },
    {
      title: "Remaining SMS",
      field: "total_available_sms",
    },
    {
      title: "Consummation SMS",
      field: "total_use_sms",
    },
    {
      title: "Status",
      field: "expire_date",
      render: (row) => {
        const isExpired = new Date(row.expire_date) < new Date();
        return (
          <div className={`badge bg-${isExpired ? "danger" : "success"}`}>
            {isExpired ? "Expired" : "Active"}
          </div>
        );
      },
    },
    {
      title: "Price",
      field: "amount",
      render: (row) => {
        return `${row.currency} ${row.amount}`;
      },
    },
    {
      title: "Expiry Date & Time",
      field: "expire_date",
      render: (row) => {
        return moment(row.expire_date).format("DD/MM/YYYY hh:mm A");
      },
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <EmailSMSGatewaySidebar />
        </div>
        <div className="col-md-9 mt-2">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">SMS Dashboard</h6>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-start gap-3">
                <div className="card col-3 py-2 px-4">
                  <h6
                    className="card-title"
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={smsCounter.totalSMS || 0}
                      duration={2.75}
                    />
                  </h6>
                  <span className="card-text">Total SMS</span>
                </div>
                <div className="card col-3 py-2 px-4">
                  <h6
                    className="card-title"
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={smsCounter.totalUsed || 0}
                      duration={2.75}
                    />
                  </h6>
                  <span
                    style={{
                      whiteSpace: "nowrap",
                    }}
                    className="card-text"
                  >
                    Total Consummation SMS
                  </span>
                </div>
                <div className="card col-3 py-2 px-4">
                  <h6
                    className="card-title"
                    style={{
                      marginBottom: "0",
                    }}
                  >
                    <CountUp
                      start={0}
                      end={smsCounter.totalAvailable || 0}
                      duration={2.75}
                    />
                  </h6>
                  <span
                    className="card-text "
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Remaining SMS
                  </span>
                </div>
                <div className="d-flex align-items-start  justify-content-end">
                  <Button onClick={() => navigate("/sms-package")}>
                    Buy Package
                  </Button>
                </div>
              </div>
              <br />
              <div className="card">
                <div className="card-header">
                  <h6 className="card-title mb-0 text-center">
                    Balance Report
                  </h6>
                </div>
                <div className="card-body">
                  <SimpleTable
                    columns={columns || []}
                    data={[...transaction]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSDashboard;

export const SimpleTable = ({ columns = [], data = [], isSerially = true }) => {
  return (
    <div
      style={{
        maxHeight: "600px",
        overflow: "auto",
        borderRadius: "10px",
        border: "1px solid #d1cbcb",
        paddingBottom: "0px",
      }}
      className="table-responsive"
    >
      <table
        className="table table-striped"
        style={{
          // border: "none",
          borderColor: "#d1cbcb",
        }}
      >
        <thead
          style={{
            borderBottomColor: "#d1cbcb",
          }}
        >
          <tr>
            {isSerially && <th scope="col">#</th>}
            {columns.map((item, index) => (
              <th scope="col" key={index}>
                {item?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              {isSerially && <td scope="row">{index + 1}</td>}
              {columns.map((column, i) => (
                <td key={i}>
                  {column.render ? column.render(item) : item[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
