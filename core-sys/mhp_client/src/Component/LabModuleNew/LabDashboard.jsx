import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import CountUp from "react-countup";
import bill from "../../Images/labBill.png";
import due from "../../Images/labDue.png";
import received from "../../Images/labReceived.png";
import patient from "../../Images/labPatient.png";
import taka from "../../Images/taka.png";
import patientIcon from "../../Images/labPatientIcon.png";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip as TT,
  YAxis,
} from "recharts";
export default function LabDashboard() {
  const [filter, setFilter] = useState("today");

  ChartJS.register(ArcElement, Tooltip, Legend);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        fontSize: "50px",
      },

      title: {
        display: true,
        text: "Billing Analytics",
        // position: "left"
        align: "start",
      },
    },
    maintainAspectRatio: false, // Add this
  };

  // pie chart
  const data = [
    { name: "Group A", value: 100, cl: "#00C49F" },
    { name: "Group B", value: 300, cl: "#0088FE" },
    { name: "Group C", value: 300, cl: "#6ED221" },
    { name: "Group D", value: 200, cl: "#7CA95B" },
  ];

  // lab
  const [updateData, setUpdate] = useState(false);

  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    axios
      .get(`/great-lab-dashboard/${filter}`)
      .then((res) => {
        setDashboardData(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    return () => {};
  }, [updateData, filter]);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const datas = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: dashboardData?.monthlyTotals || [],
        backgroundColor: "#7FC14D",
      },
      {
        label: "Due",
        data: dashboardData?.monthlyDues || [],
        backgroundColor: " #7CA95B",
      },
    ],
  };
  const handleFilter = (e) => {
    setFilter(e);
    // axios.get(`/great-lab-dashboard/${e}`).then((res) => {
    //   setDashboardData(res?.data);
    // });
  };
  // lab
  console.log(filter, "total");
  // pie chart
  return (
    // eslint-disable-next-line jsx-a11y/alt-text

    <>
      <div className="custom-card mt-2 ms-2 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-title">Lab Dashboard</h6>
          <div>
            <button
              className={`${
                filter === "today"
                  ? "vaital-setup-btn"
                  : "vaital-setup-btn-cancel"
              }`}
              onClick={() => handleFilter("today")}
            >
              Today
            </button>
            <button
              className={`${
                filter === "week"
                  ? "vaital-setup-btn"
                  : "vaital-setup-btn-cancel"
              }`}
              onClick={() => handleFilter("week")}
            >
              Week
            </button>
            <button
              className={`${
                filter === "month"
                  ? "vaital-setup-btn"
                  : "vaital-setup-btn-cancel"
              }`}
              onClick={() => handleFilter("month")}
            >
              Month
            </button>
            <button
              className={`${
                filter === "year"
                  ? "vaital-setup-btn"
                  : "vaital-setup-btn-cancel"
              }`}
              onClick={() => handleFilter("year")}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      <div className="ms-2 my-2">
        <div className="row">
          <div className="col-3">
            <div className="transaction-card tran__card_1 p-4">
              <div className="d-flex">
                {/* <i className="fa-solid fa-file-invoice me-2"></i> */}
                <img src={bill} alt="" className="me-2" />
                <h6>Total Invoice : {dashboardData?.totalInvoiceCount}</h6>
              </div>
              <hr />
              <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                <img src={taka} alt="" className="me-2" />
                <CountUp
                  start={0}
                  decimals={2}
                  end={
                    parseFloat(dashboardData?.totalInvoiceAmount || 0).toFixed(
                      2
                    ) || 0
                  }
                  duration={2}
                />
              </p>
            </div>
          </div>
          <div className="col-3">
            <div className=" transaction-card tran__card_2 p-4">
              <div className="d-flex">
                <img src={received} alt="" className="me-2" />
                <h6>Total Received</h6>
              </div>
              <hr />
              <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                <img src={taka} alt="" className="me-2" />
                <CountUp
                  start={0}
                  decimals={2}
                  end={
                    parseFloat(dashboardData?.totalReceived || 0).toFixed(2) ||
                    0
                  }
                  duration={2}
                />
              </p>
            </div>
          </div>
          <div className="col-3">
            <div className="transaction-card tran__card_3 p-4">
              <div className="d-flex">
                <img src={due} alt="" className="me-2" />
                <h6>Total Due</h6>
              </div>
              <hr />
              <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                <img src={taka} alt="" className="me-2" />
                <CountUp
                  start={0}
                  decimals={2}
                  end={parseFloat(dashboardData?.totalDue || 0).toFixed(2) || 0}
                  duration={2}
                />
              </p>
            </div>
          </div>
          <div className="col-3">
            <div className="transaction-card tran__card_4 p-4">
              <div className="d-flex">
                <img src={patient} alt="" className="me-2" />
                <h6>Total Patient</h6>
              </div>
              <hr />
              <p style={{ fontWeight: "500", marginBottom: "0rem" }}>
                <img src={patientIcon} alt="" className="me-2" />
                <CountUp
                  start={0}
                  decimals={2}
                  end={
                    parseFloat(dashboardData?.totalPatient || 0).toFixed(2) || 0
                  }
                  duration={2}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div style={{ height: "400px" }} className="custom-card p-2 ms-2 ">
            <Bar options={options} data={datas} />
          </div>
        </div>
        <div className="col-12 ">
          <div className="custom-card ms-2 mt-2 p-2">
            <div className="d-flex">
              <h6 className="ms-3 mt-2 mb -3">Registered Patient</h6>
            </div>
            <div>
              <AreaChart
                width={1000}
                height={300}
                data={dashboardData?.monthlyPatientCount}
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
                <TT />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
