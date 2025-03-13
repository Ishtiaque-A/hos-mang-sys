import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./dashboard_sidebar.css";

import axios from "axios";
import { Sector } from "recharts";
import CountUp from "react-countup";
import useUserData from "../../hooks/useUserData";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const [appointment, setAppointment] = useState(null);
  const user = useUserData();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          patientsResponse,
          doctorsResponse,
          incomeResponse,
          expenseResponse,
          appointmentResponse,
        ] = await Promise.all([
          axios.get(`/patients`),
          axios.get("/doctors"),
          axios.get("/accounts-invoice-amount-by-month"),
          axios.get("/expense-monthly-amount"),
          axios.get("appointment-count-for-dasboard"),
        ]);

        if (patientsResponse.status === 200) {
          setPatients(patientsResponse.data.patients.length);
        }

        if (doctorsResponse.status === 200) {
          setDoctors(doctorsResponse.data.doctors);
        }

        if (incomeResponse.status === 200) {
          setIncome(incomeResponse.data.income);
        }

        if (expenseResponse.status === 200) {
          setExpense(expenseResponse.data.expense);
        }

        if (appointmentResponse.status === 200) {
          setAppointment(appointmentResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchAllData();
    }
    return () => {};
  }, [user?.user_id, user]);

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
        label: "Income",
        data: income,
        backgroundColor: "#7FC14D",
      },
      {
        label: "Expense",
        data: expense,
        backgroundColor: " #7CA95B",
      },
    ],
  };

  // pie chart
  const data = [
    { name: "Group A", value: 100, cl: "#00C49F" },
    { name: "Group B", value: 300, cl: "#0088FE" },
    { name: "Group C", value: 300, cl: "#6ED221" },
    { name: "Group D", value: 200, cl: "#7CA95B" },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // pie chart
  return (
    // eslint-disable-next-line jsx-a11y/alt-text

    <>
      <div className="my-2 ms-1 row">
        {user?.isSuperAdmin ? (
          <div className="col-3">
            <div className="custom-card p-lg-3 p-1">
              <div className="d-flex justify-content-between align-items-center">
                <span className="dashboard-title">Doctors</span>
                <span className=" text-danger"></span>
              </div>
              <div className="d-flex mt-2">
                <div className="dashboard-icon d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div>
                  <span className="ms-3 dashboard-value">
                    <CountUp
                      start={0}
                      end={doctors?.length || 0}
                      duration={2.75}
                      suffix="+"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className={`${user?.branch_id ? "col-4" : "col-3"}`}>
          <div className="custom-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <span className="dashboard-title">Patients</span>
              <span className=" text-success"></span>
            </div>
            <div className="d-flex mt-2">
              <div className="dashboard-icon d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-bed-pulse"></i>
              </div>
              <div>
                <span className="ms-3 dashboard-value">
                  <CountUp
                    start={0}
                    end={patients || 0}
                    duration={2.75}
                    suffix="+"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${user?.branch_id ? "col-4" : "col-3"}`}>
          <div className="custom-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <span className="te dashboard-title">Monthly Appointments</span>
              <span className="text-danger"></span>
            </div>
            <div className="d-flex mt-2">
              <div className="dashboard-icon d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <div>
                <span className="ms-3 dashboard-value">
                  <CountUp
                    start={0}
                    end={appointment?.allAppointmentCount}
                    duration={2.75}
                    suffix="+"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${user?.branch_id ? "col-4" : "col-3"}`}>
          <div className="custom-card p-3">
            <div className="d-flex justify-content-between align-items-center">
              <span className="dashboard-title">Today's Appointment</span>
              <span className="text-success"></span>
            </div>
            <div className="d-flex mt-2">
              <div className="dashboard-icon d-flex justify-content-center align-items-center">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <span className="ms-3 dashboard-value">
                  <CountUp
                    start={0}
                    end={appointment?.todayAppointmentCount}
                    duration={2.75}
                    suffix="+"
                  />
                </span>
              </div>
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
      </div>
    </>
  );
}
