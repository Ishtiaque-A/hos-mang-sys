import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Typography, Box } from "@mui/material";
import { indigo } from "src/theme/colors";

// Dynamically import react-apexcharts for client-side rendering
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top", // Place the data labels on top of the bars
        },
        borderRadius: 10, // Apply border radius to the top of the bars
        borderRadiusApplication: "end", // Apply the radius to the end of the bars (top in vertical bar charts)
        borderRadiusWhenStacked: "all", // Ensures border radius is applied in stacked bars
        colors: {
          ranges: [
            {
              from: 0,
              to: 10,
              color: indigo.main, // Set the color for all bars
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: [indigo.dark],
      },
    },
    xaxis: {
      categories: [
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
      ],
      position: "top",
      labels: {
        offsetY: -18,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
        offsetY: -35,
      },
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100, 100],
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        },
      },
    },
    title: {
      text: "Monthly Inflation in Argentina, 2002",
      floating: true,
      offsetY: 320,
      align: "center",
      style: {
        color: "#444",
      },
    },
    colors: [indigo.main], // Set the color for all bars
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 10.1, 9.0, 6.0, 5.0, 6.0, 3.0, 2.0, 4.0, 5.0],
    },
  ]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "5px" }}>
        UserChart
      </Typography>
      <Chart options={chartOptions} series={chartSeries} type="bar" height={250} />
    </Box>
  );
};

export default UserChart;