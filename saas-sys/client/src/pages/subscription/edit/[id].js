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
import { subscriptionUpdateApiCall ,fetchValidityLimitAPIGet,fetchStorageLimitAPIGet} from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, UPDATE, SUBSCRIPTION } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import { fetchSubscriptionDetailsAPIGet, fetchFeatureAPIGet } from "../../../common/apiCall/api";
import Divider from "@mui/material/Divider";
import Loading from "src/components/Loading";
import Link from "next/link";

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
  currency: getGlobalState(state)?.currency,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
});

const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [featureList, setFeatureList] = useState([]);
  const [PLAN_DURATION,SetPLAN_DURATION] = useState([]);
  const [PLAN_STORAGE,SetPLAN_STORAGE] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [buttonloading, setButtonloading] = useState(false);


  useEffect(() => {
    fetchSubscriptionDetailsAPIGet(id)
    .then((response)=>{
      setDetails(response?.data?.subscription_plan);
      setLoading(false)
      
    }).catch (()=> {
      setResponseMessage('Unable to fetch data');
      setOpenAlert2(true);
    })
    const fetchData = async () => {
      try {
        const data = await fetchSubscriptionDetailsAPIGet(id);
        
        const data2 = await fetchValidityLimitAPIGet();
        SetPLAN_DURATION(data2?.data?.validity);
        const data3 = await fetchStorageLimitAPIGet();
        SetPLAN_STORAGE(data3?.data?.validity)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFeatureAPIGet();
        setFeatureList(data?.data?.features);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

 

  const handleSubmit = (data) => {
    setButtonloading(true)
    subscriptionUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SUBSCRIPTION.UPDATE_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setButtonloading(false)
          setTimeout(() => {
            router.push(ADMIN.SUBSCRIPTION_PLAN_LIST);
          }, 3000);
        } else {
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
            setResponseMessage(res.message);
            setOpenAlert2(true);
          }
        }
      })
      .catch((err) => {
        setResponseMessage(SUBSCRIPTION.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(SUBSCRIPTION.REQUIRED.TITLE),
    user_limit: Yup.string().required(SUBSCRIPTION.REQUIRED.USER_LIMIT),
    price: Yup.string().required(SUBSCRIPTION.REQUIRED.PRICE),
    // features: Yup.string().required(SUBSCRIPTION.REQUIRED.FEATURES),
    validity_id: Yup.string().required(SUBSCRIPTION.REQUIRED.DURATION),
    storage_limit_id: Yup.string().required(SUBSCRIPTION.REQUIRED.STORAGE),
    details: Yup.string().required(SUBSCRIPTION.REQUIRED.DETAILS),
    type: Yup.string().required(SUBSCRIPTION.REQUIRED.TYPE),
  });
  const type = [
    {
      id: 1,
      name: "Regular",
    },
    {
      id: 2,
      name: "Special",
    },
  ];
  const [selectedOption, setSelectedOption] = useState({ id: 1, name: "Regular" });
  const [options, setOptions] = useState([]);
  
  const [options2, setOptions2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [options3, setOptions3] = useState([]);
  const [selectedOption5, setSelectedOption5] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const filteredData = featureList.filter((dataItem) =>
      details?.features?.some((featureItem) => featureItem.id === dataItem.id)
    );
    setSelectedOption5(filteredData);
  }, [details, featureList]);

  const filteredFeatureData1 = PLAN_DURATION.filter(
    (item) => item.days === details?.validity?.days
  );
  const defaultFeatureData = filteredFeatureData1[0];

  const filteredFeatureData2 = PLAN_STORAGE.filter(
    (item) => item.id === details?.storage_limit?.id
  );
  const defaultFeatureData2 = filteredFeatureData2[0];

  console.log( details,"details>>>")
  useEffect(() => {
    const fetchData = () => {
      setOptions(type);
      setOptions2(PLAN_DURATION);
      setSelectedOption2(defaultFeatureData);
      setSelectedOption3(defaultFeatureData2);
      setOptions3(PLAN_STORAGE);
    };
    fetchData();
  }, [details,PLAN_STORAGE,PLAN_DURATION,selectedOption,defaultFeatureData2]);

  console.log(defaultFeatureData2,"defaultFeatureData2")

  const handleSelect2 = (event, values) => {
    setFeatures(values);
  };

  const handleRemove2 = (valueToRemove) => {
    setFeatures((prevSelectedValues) =>
      prevSelectedValues.filter((value) => value.label !== valueToRemove.label)
    );
  };

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
        <title>{SUBSCRIPTION.EDIT_NEW_SUBSCRIPTION_PLAN}</title>
      </Head>
      {defaultFeatureData !== undefined && defaultFeatureData2 !== undefined ? (
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
            <Card>
              <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto", marginTop: "2rem" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={{
                        id: id,
                        name: details?.name || "",
                        user_limit: details?.user_limit || "",
                        validity_id: details?.validity?.id || "",
                        price: details?.price || 0,
                        status: "1",
                        features: details?.features?.map((feature) => feature.id) || [],
                        storage_limit_id: details?.storage_limit?.id ||  "",
                        details: details?.details || "",
                        type: details?.type || 0,
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

                                <Field
                                  size="small"
                                  variant="outlined"
                                  name="name"
                                  as={TextField}
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
                                  }}
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
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIPTION.USER_LIMIT} <span style={{ color: "red" }}>*</span>
                                </label>

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
                              {touched.user_limit && errors.user_limit && (
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  {errors.user_limit}
                                </div>
                              )}
                            </Grid>

                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIPTION.VALIDITY_IN_DAYS}
                                  <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field name="validity_id" as={Autocomplete}>
                                  {({ field, form }) => (
                                    <Autocomplete
                                      {...field}
                                      value={defaultFeatureData}
                                      onChange={(event, newValue) => {
                                        setSelectedOption2(newValue);
                                        form.setFieldValue(
                                          "validity_id",
                                          newValue ? Number(newValue.id) : null
                                        );
                                      }}
                                      options={options2}
                                      getOptionLabel={(option) => option.name}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          variant="outlined"
                                          color="error"
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

                                <Field name="storage_limit_id" as={Autocomplete}>
                                  {({ field, form }) => (
                                    <Autocomplete
                                      {...field}
                                      value={defaultFeatureData2}
                                      onChange={(event, newValue) => {
                                        setSelectedOption3(newValue);
                                        form.setFieldValue(
                                          "storage_limit_id",
                                          newValue ? Number(newValue.id) : null
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
                                  {SUBSCRIPTION.SELECT_MULTIPLE_FEATURE}
                                  <span style={{ color: "red" }}>*</span>
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
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIPTION.PRICE}({props.currency })
                                  <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
                                  }}
                                  name="price"
                                  as={TextField}
                                  type="number"
                                  fullWidth
                                />
                                {touched.price && errors.price && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.price}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {SUBSCRIPTION.TYPE}
                                  <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field name="type" as={Autocomplete}>
                                  {({ field, form }) => (
                                    <Autocomplete
                                      {...field}
                                      value={selectedOption}
                                      onChange={(event, newValue) => {
                                        setSelectedOption(newValue);
                                        form.setFieldValue(
                                          "type",
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
                                          error={form.errors.type && form.touched.type}
                                          helperText={
                                            form.errors.type &&
                                            form.touched.type &&
                                            form.errors.type
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
                                  {SUBSCRIPTION.DETAILS}
                                  <span style={{ color: "red" }}>*</span>
                                </label>

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
                                {touched.details && errors.details && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.details}
                                  </div>
                                )}
                              </div>
                            </Grid>

                            <Grid item xs={6}>
                              <div style={{ width: "100%" }}>
                                <Link href={ADMIN.SUBSCRIPTION_PLAN_LIST}>
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
                                    {BACK}
                                  </LoadingButton>
                                </Link>
                              </div>
                            </Grid>
                            <Grid item xs={6}>
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
                                  {UPDATE}
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
        <Loading/>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
