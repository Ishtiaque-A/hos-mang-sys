import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  TextField,
  Card,
  Autocomplete,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import getGlobalState from "../../../stateManagement/global/globalSelector";
import { setUserProfileToReducer } from "../../../stateManagement/auth/AuthActionCreators";
import { connect } from "react-redux";
import getAuthState from "../../../stateManagement/auth/AuthSelector";
import { subscriptionUpdateApiCall } from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import { useRouter } from "next/router";
import { UPDATE, SUBSCRIPTION } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import { fetchSubscriptionDetailsAPIGet, fetchFeatureAPIGet } from "../../../common/apiCall/api";
import { PLAN_DURATION, PLAN_STORAGE } from "../../../common/constantData/constants";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { Loading } from "mdi-material-ui";

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
  const router = useRouter();
  const { id } = router.query;

  const [featureList, setFeatureList] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setLoading(2);
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubscriptionDetailsAPIGet(id);
        setDetails(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(details, "details data==============================>>>>");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeatureAPIGet();
        setFeatureList(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const featuresData = [
    {
      id: "1",
      name: "EN",
    },
    {
      id: "2",
      name: "BN",
    },
  ];

  const handleSubmit = (data) => {
    console.log(data, "handleSubmit");
    subscriptionUpdateApiCall(data)
      .then((res) => {
        setResponseMessage(SUBSCRIPTION.ADD_SUCCESS_MESSAGE);
        setOpenAlert(true);
        router.push(ADMIN.SUBSCRIPTION_PLAN_LIST);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(SUBSCRIPTION.REQUIRED.TITLE),
    user_limit: Yup.string().required(SUBSCRIPTION.REQUIRED.USER_LIMIT),
    price: Yup.string().required(SUBSCRIPTION.REQUIRED.PRICE),
    //  features: Yup.string().required("features is required!"),
    duration: Yup.string().required(SUBSCRIPTION.REQUIRED.DURATION),
    storage_limit: Yup.string().required(SUBSCRIPTION.REQUIRED.STORAGE),
    details: Yup.string().required(SUBSCRIPTION.REQUIRED.DETAILS),
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(featuresData || []);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [options2, setOptions2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [options3, setOptions3] = useState([]);
  const [selectedOption5, setSelectedOption5] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const filteredData = featureList.filter((dataItem) =>
      details?.features?.some((featureItem) => featureItem.id === dataItem.id)
    );
    setSelectedOption5(filteredData);
  }, [details, featureList]);

  const filteredFeatureData1 = PLAN_DURATION.filter(item => item.day === parseInt(details?.duration) );
const defaultFeatureData = filteredFeatureData1[0];

const filteredFeatureData2 = PLAN_STORAGE.filter(item => item.limit === parseInt(details?.storage_limit) );
const defaultFeatureData2 = filteredFeatureData2[0];

  useEffect(() => {
    const fetchData = () => {
      setOptions(featuresData || []);
      setOptions2(PLAN_DURATION);
      setSelectedOption2(defaultFeatureData);
      setSelectedOption3(defaultFeatureData2);
      setOptions3(PLAN_STORAGE);
    };
    fetchData();
  }, [details]);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert(false);
  };

  const handleSelect2 = (event, values) => {
    setFeatures(values);
  };

  const handleRemove2 = (valueToRemove) => {
    setFeatures((prevSelectedValues) =>
      prevSelectedValues.filter((value) => value.label !== valueToRemove.label)
    );
  };
  return (
    <>
      <Head>
        <title>{SUBSCRIPTION.EDIT_NEW_SUBSCRIPTION_PLAN}</title>
      </Head>
      {loading === 2 ? (
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
             <Typography variant="h5" sx={{ padding: "8px" ,marginLeft:""}}>
             {SUBSCRIPTION.EDIT_NEW_SUBSCRIPTION_PLAN}
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
            <Card sx={{ marginTop: "3rem" }}>
              <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto",  }}>
              
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={{
                        id: id,
                        name: details?.name || "",
                        user_limit: details?.user_limit || "",
                        duration: details?.duration || "",
                        price: details?.price || 0,
                        status: "1",
                        features: selectedOption5?.map((feature) => feature.id) || [],
                        storage_limit: details?.storage_limit || "",
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
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIPTION.TITLE} <span style={{ color: "red" }}>*</span>
                                </label>
                                {touched.name && errors.name && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.name}
                                  </div>
                                )}
                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
                                  }}
                                  name="name"
                                  as={TextField}
                                  type="text"
                                  fullWidth
                                />
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIPTION.USER_LIMIT} <span style={{ color: "red" }}>*</span>
                                </label>
                                {touched.user_limit && errors.user_limit && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.user_limit}
                                  </div>
                                )}
                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
                                  }}
                                  name="user_limit"
                                  as={TextField}
                                  type="number"
                                  fullWidth
                                />
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {SUBSCRIPTION.VALIDITY_IN_DAYS}
                                <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field name="duration" as={Autocomplete}>
                                {({ field, form }) => (
                                  <Autocomplete
                                    {...field}
                                    value={selectedOption2}
                                    onChange={(event, newValue) => {
                                      setSelectedOption2(newValue);
                                      form.setFieldValue(
                                        "duration",
                                        newValue ? Number(newValue.day) : null
                                      );
                                    }}
                                    options={options2}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        variant="outlined"
                                        error={form.errors.duration && form.touched.duration}
                                        helperText={
                                          form.errors.duration &&
                                          form.touched.duration &&
                                          form.errors.duration
                                        }
                                        sx={{
                                          mb: 2,
                                          "& input": {
                                            color: "#4F4D4D" // Replace "blue" with your desired color value
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              </Field>
                            </div>
                            </Grid>
                            <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {SUBSCRIPTION.STORAGE_LIMIT}
                                <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field name="storage_limit" as={Autocomplete}>
                                {({ field, form }) => (
                                  <Autocomplete
                                    {...field}
                                    value={selectedOption3}
                                    onChange={(event, newValue) => {
                                      setSelectedOption3(newValue);
                                      form.setFieldValue(
                                        "storage_limit",
                                        newValue ? Number(newValue.limit) : null
                                      );
                                    }}
                                    options={options3}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        variant="outlined"
                                        error={form.errors.duration && form.touched.duration}
                                        helperText={
                                          form.errors.duration &&
                                          form.touched.duration &&
                                          form.errors.duration
                                        }
                                        sx={{
                                          mb: 2,
                                          "& input": {
                                            color: "#4F4D4D" // Replace "blue" with your desired color value
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              </Field>
                            </div>
                          </Grid>
                            
                            <Grid item xs={12}>
                              <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                Select Multiple Feature <span style={{ color: "red" }}>*</span>
                              </label>
                                {selectedOption5 ? (
                                  <Field name="features">
                                    {({ field, form }) => (
                                      <Autocomplete
                                        multiple
                                        options={featureList}
                                        getOptionLabel={(option) => option.name}
                                        value={selectedOption5}
                                        onChange={(event, newValue) => {
                                          setSelectedOption5(newValue);
                                          form.setFieldValue(
                                            "features",
                                            newValue.map((option) => option.id)
                                          );
                                          form.setFieldValue(
                                            "features",
                                            newValue.map((value) => value.id)
                                          );
                                          form.setFieldValue(
                                            "featuresName",
                                            newValue ? newValue.name : ""
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                              mb: 2,
                                              "& input": {
                                                color: "#4F4D4D" // Replace "blue" with your desired color value
                                              }
                                            }}
                                          />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip
                                              key={index}
                                              label={option.name}
                                              onDelete={() => handleRemove2(option)}
                                              {...getTagProps({ index })}
                                            />
                                          ))
                                        }
                                      />
                                    )}
                                  </Field>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </Grid>

                            
                            
                            
                            <Grid item xs={12}>
                              <div>

                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {SUBSCRIPTION.DETAILS}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                                {touched.details && errors.details && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.details}
                                  </div>
                                )}
                                <Field
                                  size="small"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
                                  }}
                                  name="details"
                                  as={TextField}
                                  multiline
                                  rows={2}
                                  type="text"
                                  fullWidth
                                />
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {SUBSCRIPTION.PRICE}
                                <span style={{ color: "red" }}>*</span>
                              </label>

                                {touched.price && errors.price && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.price}
                                  </div>
                                )}
                                <Field
                                  size="small"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
                                  }}
                                  name="price"
                                  as={TextField}
                                  label={SUBSCRIPTION.PRICE}
                                  type="number"
                                  fullWidth
                                />
                              </div>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                            <Divider />
                            <div style={{ width: "100%" }}>
                              <Link href="/subscription">
                              <LoadingButton
                                    // loading={loading}
                                    variant="contained"
                                    sx={{
                                      background: "white",
                                      padding: "3px",
                                      color: "#4287DA",
                                      mb: 2,
                                      float: "",
                                      "&:hover": {
                                        background: "#10741C",
                                        color: "white",
                                      },
                                    }}
                                  >
                                Back
                              </LoadingButton>
                              </Link>
                            </div>
                            </Grid>
                            <Grid item xs={6}>
                            <Divider />
                          <div style={{ width: "100%" }}>
                          <LoadingButton
                                  type="submit"
                                  color="primary"
                                  // loading={loading}
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
                              {UPDATE}
                            </LoadingButton>
                            <Alert
                              open={openAlert}
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
        <Loading/>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
