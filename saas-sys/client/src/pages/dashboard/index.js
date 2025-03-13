import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid, Stack, Typography, Card } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTasksnewrequest } from "src/sections/overview/overview-tasks-newrequest";
import { OverviewTasksnewusers } from "src/sections/overview/overview-tasks-newusers";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";

import { dashboardApiCall } from "../../common/apiCall/api";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import getGlobalState from "../../stateManagement/global/globalSelector";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import { setGlobalSettingToReducer } from "../../stateManagement/global/GlobalActionCreators";
import { connect } from "react-redux";
import { APP_URL } from "../../common/constantData/constants";
import BarChart from "src/components/BarChart";
import { Col, Slider } from "antd";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false }); // Use dynamic import with ssr: false

const now = new Date();

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({});

const Page = (props) => {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];
  const [data, setData] = useState([]);
  const [pdata, setPData] = useState([]);
  const [udata, setUData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await dashboardApiCall();
      const data = response?.data;
      setData(data);
      const sellData = data?.sell;

      if (sellData) {
        const parsedPData = data?.purchases?.count.map((value) => parseInt(value, 10));
        setPData(parsedPData);
        const parsedUData = sellData?.amount.map((value) => parseInt(value, 10));
        setUData(parsedUData);

        // Update the x-axis categories and series data in the chartData state
        setChartData((prevChartData) => ({
          ...prevChartData,
          xaxis: {
            ...prevChartData.xaxis,
            categories: sellData?.month || [],
          },
          series: [
            {
              ...prevChartData.series[0],
              data: parsedUData,
            },
          ],
        }));
      } else {
        console.error("Invalid or missing sell data structure:", data);
        // Handle the error or set a default value for pdata
        setPData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.userProfile?.user_type > 2) {
      window.location.href = APP_URL + "billing-&-subscriptions";
    }
    fetchData();
  }, []);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "sell",
        data: udata, // Update this line to use the udata variable
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "Last year sales count",
        align: "left",
        style: {
          fontSize: "16px", 
          fontWeight: "900", 
      }
      },
      legend: {
        tooltipHoverFormatter: (val, opts) => {
          return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "";
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: (val) => {
                return val;
              },
            },
          },
          {
            title: {
              formatter: (val) => {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: (val) => {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  });

  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <>
      {pdata && udata ? (
        <>
          <Head>
            <title>Overview | SmartHealth</title>
          </Head>
          {/* <Stack direction="row" justifyContent="space-between" spacing={1} sx={{ mt: "2%" }}>
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                Dashboard Overview
              </Typography>
            </Stack>
          </Stack> */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py:"20px"
            }}
          >
            <div>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewBudget
                    difference={12}
                    positive
                    sx={{ height: "100%" }}
                    value={data?.summaries?.total_sell}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTotalCustomers
                    difference={16}
                    positive={false}
                    sx={{ height: "100%" }}
                    value={data?.summaries?.total_purchases}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <OverviewTasksProgress
                    sx={{ height: "100%" }}
                    value={data?.summaries?.organizations}
                  />
                </Grid>

                <Grid xs={12} sm={6} lg={4} >
                  <Grid xs={12} sm={12} lg={12} sx={{ mb: 2 }}>
                    <OverviewTasksnewrequest
                      sx={{ height: "100%"}}
                      value={data?.summaries?.new_request}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} lg={12}  >
                    <OverviewTasksnewusers
                      sx={{ height: "100%"}}
                      value={data?.summaries?.new_users}
                    />
                  </Grid>
                  <Grid
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      backgroundColor: "white",
                      paddingX: "15px",
                      borderRadius: "15px",
                    }}
                  >
                    <p variant="h6">Benefaction</p>
                    <Box>
                      <div
                        style={{
                          display: "flex",

                          justifyContent: "end",
                          alignItems: "end",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "20px",
                            fontWeight: "bold",

                            margin: "0px",
                            padding: "0px",
                          }}
                        >
                          {inputValue} %
                        </p>
                      </div>

                      <Slider
                        min={1}
                        max={100}
                        defaultValue={40}
                        onChange={onChange}
                        value={typeof inputValue === "number" ? inputValue : 40}
                      />
                    </Box>

                    <Box>
                      <Box
                        sx={{
                          display: "flex",

                          justifyContent: "end",
                          alignItems: "end",
                        }}
                      >
                        <p
                          style={{
                            marginBottom: "0px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            margin: "0px",
                            padding: "0px",
                          }}
                        >
                          {inputValue} %
                        </p>
                      </Box>
                      <Col>
                        <Slider
                          min={1}
                          max={100}
                          defaultValue={40}
                          onChange={onChange}
                          value={typeof inputValue === "number" ? inputValue : 40}
                        />
                      </Col>
                    </Box>
                  </Grid>
                </Grid>
                
                <Grid xs={12} sm={12} lg={8} >
                  {/* Conditionally render the chart only on the client side */}
                  {typeof window !== "undefined" && (
                    <Card sx={{padding:"10px", paddingTop: "30px"}}>
                    <BarChart />
                    {/*
                      <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="line"
                        height={350}
                        
                      />
                      */}
                    </Card>
                  )}
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  {/* <OverviewTasksnewusers
                    sx={{ height: "100%" }}
                    value={data?.summaries?.new_users}
                  /> */}
                </Grid>
                <Grid xs={12} sm={12} lg={8} sx={{ position: "relative", top: "-175px" }}>
                  <OverviewSales
                    chartSeries={[
                      {
                        name: "This year",
                        data: pdata,
                      },
                    ]}
                    sx={{ height: "100%", mt:"-100px" }}
                  />
                </Grid>
                

                

                

                {/* <Grid xs={12} lg={12}>
                    <Modal />
                  </Grid> */}
                {/* <Grid xs={12} md={6} lg={4}>
                <BarChart
                width={500}
                height={300}
                series={[
                  { data: pData, label: "pv", id: "pvId" },
                  { data: pData, label: "uv", id: "uvId" },
                ]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
                   />
                 </Grid> */}

                {/*<Grid xs={12} md={6} lg={6}>*/}
                {/*  <OverviewTraffic*/}
                {/*    chartSeries={[63, 15, 22]}*/}
                {/*    labels={["Desktop", "Tablet", "Phone"]}*/}
                {/*    sx={{ height: "100%" }}*/}
                {/*  />*/}
                {/*</Grid>*/}

                {/* <Grid xs={12} md={6} lg={4}>
                  <OverviewLatestProducts
                    products={[
                      {
                  id: "5ece2c077e39da27658aa8a9",
                  image: "/assets/products/product-1.png",
                  name: "Healthcare Erbology",
                  updatedAt: subHours(now, 6).getTime(),
                },
                {
                  id: "5ece2c0d16f70bff2cf86cd8",
                  image: "/assets/products/product-2.png",
                  name: "Makeup Lancome Rouge",
                  updatedAt: subDays(subHours(now, 8), 2).getTime(),
                },
                {
                  id: "b393ce1b09c1254c3a92c827",
                  image: "/assets/products/product-5.png",
                  name: "Skincare Soja CO",
                  updatedAt: subDays(subHours(now, 1), 1).getTime(),
                },
                {
                  id: "a6ede15670da63f49f752c89",
                  image: "/assets/products/product-6.png",
                  name: "Makeup Lipstick",
                  updatedAt: subDays(subHours(now, 3), 3).getTime(),
                },
                {
                  id: "bcad5524fe3a2f8f8620ceda",
                  image: "/assets/products/product-7.png",
                  name: "Healthcare Ritual",
                  updatedAt: subDays(subHours(now, 5), 6).getTime(),
                },
              ]}
              sx={{ height: "100%" }}
                  />
                </Grid> */}
                {/* <Grid xs={12} md={12} lg={8}>
                  <OverviewLatestOrders
                    orders={[
                      {
                        id: "f69f88012978187a6c12897f",
                        ref: "DEV1049",
                        amount: 30.5,
                  customer: {
                    name: "Ekaterina Tankova",
                  },
                  createdAt: 1555016400000,
                  status: "pending",
                },
                {
                  id: "9eaa1c7dd4433f413c308ce2",
                  ref: "DEV1048",
                  amount: 25.1,
                  customer: {
                    name: "Cao Yu",
                  },
                  createdAt: 1555016400000,
                  status: "delivered",
                },
                {
                  id: "01a5230c811bd04996ce7c13",
                  ref: "DEV1047",
                  amount: 10.99,
                  customer: {
                    name: "Alexa Richardson",
                  },
                  createdAt: 1554930000000,
                  status: "refunded",
                },
                {
                  id: "1f4e1bd0a87cea23cdb83d18",
                  ref: "DEV1046",
                  amount: 96.43,
                  customer: {
                    name: "Anje Keizer",
                  },
                  createdAt: 1554757200000,
                  status: "pending",
                },
                {
                  id: "9f974f239d29ede969367103",
                  ref: "DEV1045",
                  amount: 32.54,
                  customer: {
                    name: "Clarke Gillebert",
                  },
                  createdAt: 1554670800000,
                  status: "delivered",
                },
                {
                  id: "ffc83c1560ec2f66a1c05596",
                  ref: "DEV1044",
                  amount: 16.76,
                  customer: {
                    name: "Adam Denisov",
                          },
                          createdAt: 1554670800000,
                          status: "delivered",
                        },
                      ]}
                      sx={{ height: "100%" }}
                    />
                  </Grid> */}
              </Grid>
            </div>
          </Box>
        </>
      ) : null}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);