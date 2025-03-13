import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  TextField,
  Card,
  Autocomplete,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { setUserProfileToReducer } from "../../stateManagement/auth/AuthActionCreators";
import { connect } from "react-redux";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, ADD_FEATURE } from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import {
  fetchFeatureDetailsAPIGet,
  featurUpdateApiCall,
  fetchFeatureAPIGet,
} from "../../common/apiCall/api";
import Divider from "@mui/material/Divider";
import Loading from "src/components/Loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  userProfile: getAuthState(state)?.userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
});

const Page = (props) => {
  const [featureData, setFeatureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFeatureAPIGet();
        const FeatureList = response?.data?.features || [];
        setFeatureData(FeatureList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const [buttonloading, setButtonloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeatureDetailsAPIGet(id);
        if (data?.data) {
          setDetails(data?.data?.feature);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredFeatureData1 = featureData.filter((item) => item.id != id);
  const defaultFeatureData = filteredFeatureData1;

  const filteredFeatureData2 = featureData.filter((item) => item.id === details?.parent?.id);
  const defaultFeatureData2 = filteredFeatureData2[0];

  console.log(featureData, "featureData");
  console.log(details, "details");

  const handleSubmit = (data) => {
    setButtonloading(true);
    const requestData = {
      id: parseInt(data.id), // Convert id to integer
      name: data.name,
      details: data.details,
      status: data.status,
      parent_id: parseInt(data.parent_id),
    };

    featurUpdateApiCall(requestData)
      .then((res) => {
        console.log(res,"res>>>>")
        if (res.code === 200) {
          setResponseMessage(ADD_FEATURE.ADD_SUCCESS_MESSAGE2);
          setOpenAlert1(true);
          setButtonloading(false);
          setTimeout(() => {
            router.push(ADMIN.FEATURE_PLAN_LIST);
          }, 3000);
        } else {
          setButtonloading(false);
          if (Object.keys(res?.errors).length > 0) {
            for (let field in res?.errors) {
              if (res.errors[field]) {
                let errorMessages = res.errors[field];
                for (let i = 0; i < errorMessages.length; i++) {
                  let errorMessage = errorMessages[i];
                  console.log("Error: " + errorMessage);
                  setResponseMessage(errorMessage);
                  setOpenAlert2(true);
                }
              }
            }
          } else {
            setButtonloading(false);
            setResponseMessage(res.message);
            setOpenAlert2(true);
          }
        }
      })
      .catch((err) => {
        setResponseMessage(ADD_FEATURE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
        setButtonloading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(ADD_FEATURE.ERROR_NAME),
    status: Yup.string().required(ADD_FEATURE.ERROR_NAME),
    details: Yup.string().required(ADD_FEATURE.ERROR_DETAILS),
  });

  const status_type = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];

  const filteredFeatureData = status_type.filter(
    (item) => item.value === parseInt(details?.status)
  );
  const defaultPaymentType = filteredFeatureData[0];

  const [options2, setOptions2] = useState([]);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [options, setOptions] = useState([]);

  // useEffect(()=>{
  //   const filteredData = featureList.filter(dataItem =>
  //     details?.features?.some(featureItem => featureItem.id === dataItem.id)
  //   );
  //   setSelectedOption5(filteredData);
  // }, [details, featureList])

  useEffect(() => {
    const fetchData = async () => {
      setOptions(defaultFeatureData);
      setSelectedOption(defaultFeatureData2);
      setOptions2(status_type);
      setSelectedOption2(defaultPaymentType);
    };
    fetchData();
  }, [details]);

  console.log(selectedOption2, "selectedOption2");

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };
  return (
    <>
      <Head>
        <title>{ADD_FEATURE.TITLE2}</title>
      </Head>
      {loading === false && selectedOption2? (
        <>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Container maxWidth="xl">
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ padding: "8px", marginLeft: "" }}>
                      {ADD_FEATURE.TITLE2}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Container>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 1,
            }}
          >
            <Container maxWidth="xl">
              <Card>
                <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto", marginTop: "2rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Formik
                        initialValues={{
                          id: id,
                          name: details?.name || "",
                          status: details?.status || 0,
                          parent_id: details?.parent_id || 0,
                          details: details?.details || "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                      >
                        {({ values, errors, touched, setFieldValue }) => (
                          <Form encType="multipart/form-data">
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              sx={{ marginTop: "2rem" }}
                            >
                              <Grid item xs={12}>
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {ADD_FEATURE.MAME}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>

                                  <Field
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      mb: 2,
                                      "& input": {
                                        color: "#4F4D4D", // Replace "blue" with your desired color value
                                      },
                                    }}
                                    name="name"
                                    as={TextField}
                                    type="text"
                                    fullWidth
                                  />
                                  {touched.name && errors.name && (
                                    <div style={{ color: "red", fontSize: "12px" }}>
                                      {errors.name}
                                    </div>
                                  )}
                                </div>
                              </Grid>

                              <Grid item xs={6}>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  Select parent
                                </label>
                                <Field name="parent_id" as={Autocomplete}>
                                  {({ field, form }) => (
                                    <Autocomplete
                                      {...field}
                                      value={defaultFeatureData2}
                                      onChange={(event, newValue) => {
                                        setSelectedOption(newValue);
                                        form.setFieldValue(
                                          "parent_id",
                                          newValue ? Number(newValue.id) : null
                                        );
                                      }}
                                      options={options}
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
                              <Grid item xs={6}>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {ADD_FEATURE.STATUS}
                                  <span style={{ color: "red" }}>*</span>
                                </label>
                                <Field name="status" as={Autocomplete}>
                                  {({ field, form }) => (
                                    <Autocomplete
                                      {...field}
                                      value={selectedOption2}
                                      onChange={(event, newValue) => {
                                        setSelectedOption2(newValue);
                                        form.setFieldValue(
                                          "status",
                                          newValue ? Number(newValue.value) : null
                                        );
                                      }}
                                      options={options2}
                                      getOptionLabel={(option) => option.label}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          variant="outlined"
                                          error={form.errors.status && form.touched.status}
                                          helperText={
                                            form.errors.status &&
                                            form.touched.status &&
                                            form.errors.status
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
                              <Grid item xs={12}>
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {ADD_FEATURE.DETAILS}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>

                                  <Field
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      mb: 2,
                                      "& input": {
                                        color: "#4F4D4D", // Replace "blue" with your desired color value
                                      },
                                    }}
                                    name="details"
                                    as={TextField}
                                    multiline
                                    rows={4}
                                    type="text"
                                    fullWidth
                                  />
                                  {touched.storage_limit && errors.storage_limit && (
                                    <div style={{ color: "red", fontSize: "12px" }}>
                                      {errors.storage_limit}
                                    </div>
                                  )}
                                </div>
                              </Grid>

                              <Grid item xs={6}>
                                <Divider />
                                <div style={{ width: "100%" }}>
                                  <Link href={ADMIN.FEATURE_PLAN_LIST}>
                                    <Button
                                      // loading={loading}
                                      variant="contained"
                                      sx={{
                                        background: "white",
                                        padding: "3px",
                                        color: "#4287DA",
                                        mt: 2,
                                        ml: -3,
                                        float: "",
                                        "&:hover": {
                                          background: "#10741C",
                                          color: "white",
                                        },
                                      }}
                                    >
                                      {BACK}
                                    </Button>
                                  </Link>
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                <Divider />
                                <div style={{ width: "100%" }}>
                                  <LoadingButton
                                    type="submit"
                                    color="primary"
                                    loading={buttonloading}
                                    variant="contained"
                                    sx={{
                                      background: "#089B1A",
                                      padding: "3px",
                                      color: "white",
                                      mb: 2,
                                      float: "right",
                                      "&:hover": {
                                        background: "#10741C",
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
            </Container>
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
