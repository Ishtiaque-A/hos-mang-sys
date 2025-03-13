import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Autocomplete,
  Card,
  Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import { LoadingButton } from "@mui/lab";
import { Formik, Form, Field } from "formik";
import { fetchUsersPlanAPIGet } from "../../common/apiCall/api";
import * as React from "react";
import * as XLSX from "xlsx";
import { UsersPlanTable } from "../../sections/usersplan/users-plan-table";
import { ORGANIZATION_PLAN, SUBMIT, USERS_PLAN } from "../../common/constantData/language";
import getGlobalState from "../../stateManagement/global/globalSelector";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import {
  setUserProfileToReducer,
  userOrganizationSetToReducer,
} from "../../stateManagement/auth/AuthActionCreators";
import { connect } from "react-redux";
import { setIsAuthenticated } from "../../stateManagement/global/GlobalActionCreators";
import Loading from "src/components/Loading";
import { neutral, success } from "src/theme/colors";

const now = new Date();

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  testData: getGlobalState(state)?.testData,
  userOrganization: getAuthState(state)?.userOrganization,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
  userOrganizationSetToReducerProp: (data) => dispatch(userOrganizationSetToReducer(data)),
});

const Page = (props) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonloading, setButtonloading] = useState(false);
  const [userLeft, setUserLeft] = useState(1);
  const [activeQueryparam, setActiveQueryparam] = useState("");
  const [StatusData, setStatusData] = useState([
    { id: 1, name: "Active" },
    { id: 0, name: "Inactive" },
  ]);
  const [selectedOption, setSelectedOption] = useState();

  const fetchActivity = (queryparam = null) => {
    fetchUsersPlanAPIGet(queryparam)
      .then((response) => {
        if (response?.code == 200) {
          setData(response?.data);
          setLoading(false);
        }
      })
      .catch((e) => {});
  };

  console.log(data, "data>>>>>>");

  useEffect(() => {
    let query = "per_page=" + rowsPerPage;
    if (searchQuery && searchQuery.length > 3) {
      query = query + "&search=" + searchQuery;
    }
    if (page) {
      query = query + "&page=" + page;
    }

    fetchActivity(query);
  }, [rowsPerPage, page]);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  }, []);

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const initialValues = {
    per_page: rowsPerPage,
    search: "",
    min_created_count: null,
    min_updated_count: null,
    status: null,
  };

  const handleSubmit = (data) => {
    setActiveQueryparam(data);
    setButtonloading(true);
    const filledFields = Object.keys(data).filter((key) => {
      const value = data[key];
      return value !== "" && value !== null && value !== undefined;
    });

    console.log("Filled fields:", filledFields);

    const queryParams = filledFields
      .map((field) => `${field}=${encodeURIComponent(data[field])}`)
      .join("&");
    // setActiveQueryparam(queryParams)
    try {
      fetchActivity(queryParams);
      setTimeout(() => {
        setButtonloading(false);
      }, 500);
    } catch (error) {
      console.error("An error occurred:", error);
      setTimeout(() => {
        setButtonloading(false);
      }, 500);
    }
  };

  const exportToExcel = () => {
    const searchValues = {
      per_page: null,
      search: activeQueryparam.search,
      min_created_count: activeQueryparam.min_created_count,
      min_updated_count: activeQueryparam.min_updated_count,
      status: activeQueryparam.status,
    };
    console.log(searchValues, "searchValues");
    // Fetch all the data without pagination
    const filledFields = Object.keys(searchValues).filter((key) => {
      const value = searchValues[key];
      return value !== "" && value !== null && value !== undefined;
    });

    console.log("Filled fields:", filledFields);

    const queryParams = filledFields
      .map((field) => `${field}=${encodeURIComponent(searchValues[field])}`)
      .join("&");
    fetchUsersPlanAPIGet(queryParams)
      .then((response) => {
        if (response?.code === 200) {
          const allData = response?.data?.data;
          console.log("allData:", allData);
          if (allData && allData.length > 0) {
            // Create the worksheet and workbook as before
            const worksheet = XLSX.utils.json_to_sheet(allData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "SubscriptionPlans");

            // Download the Excel file
            XLSX.writeFile(workbook, "users_plan.xlsx");
          } else {
            // Handle the case where there is no data to export
            console.log("No data to export.");
          }
        }
      })
      .catch((e) => {
        // Handle any errors that occur during the API call
        console.error("An error occurred:", e);
      });
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        <Head>
          <title>
            <title>{USERS_PLAN.TITLE}</title>
          </title>
          <div></div>
        </Head>
        {loading === false ? (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
              //change
              marginTop: "1%",
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                      {USERS_PLAN.TITLE}
                    </Typography>
                  </Stack>
                  <div>
                    <Button
                      startIcon={
                        <SvgIcon fontSize="12px">
                          <ArrowCircleDownIcon />
                        </SvgIcon>
                      }
                      variant="contained"
                      sx={{
                        // background: "#70b42c",
                        // color: "white",
                        // borderRadius: "10px",
                        // fontSize: "12px",
                        // padding: "10px",
                        // px:"10px",
                        // marginRight: "0px",
                        // "&:hover": {
                        //   background: "#70b42c",
                        // },
                        backgroundColor: success.primary,
                        "&:hover": {
                          backgroundColor: success.primary, // Change hover color
                        },
                        "&:active": {
                          backgroundColor: success.primary, // Change active color
                        },
                      }}
                      onClick={() => exportToExcel()}
                    >
                      {USERS_PLAN.DOWNLOAD_BUTTON}
                    </Button>

                    <Typography inline variant="body1" align="right" color="tomato">
                      {props.userOrganization?.user?.organization_id &&
                        userLeft > 0 &&
                        userLeft + " User left"}
                      {props.userOrganization?.user?.organization_id &&
                        userLeft <= 0 &&
                        "User limit exceed, If you want to create user contact admin"}
                    </Typography>
                  </div>
                </Stack>

                <>
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      py: 1,
                    }}
                  >
                    <Card sx={{ border: "1px solid #eee", borderRadius: "10px" }}>
                      <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto" }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                              {({ values, errors, touched, setFieldValue }) => (
                                <Form enctype="multipart/form-data">
                                  <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    sx={{ marginTop: "2rem" }}
                                  >
                                    <Grid item xs={3}>
                                      <div>
                                        <label
                                          style={{ fontSize: "16px", fontFamily: "system-ui" }}
                                        >
                                          {USERS_PLAN.NAME}
                                        </label>

                                        <Field
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            mb: 2,
                                            "& input": {
                                              color: "#4F4D4D",
                                            },
                                          }}
                                          name="search"
                                          as={TextField}
                                          type="text"
                                          fullWidth
                                          // parse={parseDate}
                                          // format={formatDate}
                                        />
                                      </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <div>
                                        <label style={{ fontSize: "16px" }}>
                                          {USERS_PLAN.MIN_CREATED}
                                        </label>

                                        <Field
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            mb: 2,
                                            "& input": {
                                              color: "#4F4D4D",
                                            },
                                          }}
                                          name="min_created_count"
                                          as={TextField}
                                          type="text"
                                          fullWidth
                                        />
                                      </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                      <label style={{ fontSize: "16px" }}>
                                        {USERS_PLAN.MIN_UPDATED}
                                      </label>
                                      <Field
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                          mb: 2,
                                          "& input": {
                                            color: "#4F4D4D",
                                          },
                                        }}
                                        name="min_updated_count"
                                        as={TextField}
                                        type="text"
                                        fullWidth
                                      />

                                      {/* {error && <div>{error}</div>} */}
                                    </Grid>
                                    <Grid item xs={3}>
                                      <label
                                        style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                      >
                                        {USERS_PLAN.STATUS}
                                      </label>
                                      <Field name="status" as={Autocomplete}>
                                        {({ field, form }) => (
                                          <Autocomplete
                                            {...field}
                                            value={selectedOption}
                                            onChange={(event, newValue) => {
                                              setSelectedOption(newValue);
                                              form.setFieldValue(
                                                "status",
                                                newValue ? Number(newValue.id) : null
                                              );
                                            }}
                                            options={StatusData}
                                            getOptionLabel={(option) => option.name}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                size="small"
                                                variant="outlined"
                                                error={form.errors.status && form.touched.parent}
                                                helperText={
                                                  form.errors.parent &&
                                                  form.touched.parent &&
                                                  form.errors.parent
                                                }
                                                sx={{
                                                  mb: 2,
                                                  "& input": {
                                                    color: "#4F4D4D", // Replace "blue" with your desired color value
                                                  },
                                                }}
                                              />
                                            )}
                                          />
                                        )}
                                      </Field>
                                    </Grid>

                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={12}>
                                      <div style={{ width: "100%" }}>
                                        <LoadingButton
                                          type="submit"
                                          color="primary"
                                          loading={buttonloading}
                                          variant="contained"
                                          sx={{
                                            mb: 2,
                                            float: "right",
                                            backgroundColor: success.primary,
                                            "&:hover": {
                                              backgroundColor: success.primary, // Change hover color
                                            },
                                            "&:active": {
                                              backgroundColor: success.primary, // Change active color
                                            },
                                          }}
                                        >
                                          {SUBMIT}
                                        </LoadingButton>
                                        <Alert
                                          open={openAlert1}
                                          onClose={handleAlertClose}
                                          message={responseMessage}
                                        />
                                        <Alert2
                                          open={openAlert2}
                                          onClose={handleAlertClose}
                                          message={responseMessage}
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                </Form>
                              )}
                            </Formik>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Box>
                </>

                <UsersPlanTable
                  data={data}
                  onPageChange={(pageno) => {
                    setPage(pageno);
                  }}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  selectedRows={selectedRows}
                  setSelectedRows={(item) => setSelectedRows(item)}
                />
                <Alert open={openAlert1} onClose={handleAlertClose} message={responseMessage} />
                <Alert2 open={openAlert2} onClose={handleAlertClose} message={responseMessage} />
              </Stack>
            </Container>
          </Box>
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
