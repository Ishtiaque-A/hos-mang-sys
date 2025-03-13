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
import { subscriptionCreateApiCall } from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, SUBSCRIPTION } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import {
  fetchFeatureAPIGet,
  fetchValidityLimitAPIGet,
  fetchStorageLimitAPIGet,
} from "../../../common/apiCall/api";
import Divider from "@mui/material/Divider";
import Loading from "src/components/Loading";
import { neutral, success } from "src/theme/colors";

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

  const [featureList, setFeatureList] = useState([]);

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
  const initialValues = {
    name: "",
    user_limit: "",
    validity_id: null,
    price: null,
    status: "1",
    features: [],
    storage_limit_id: null,
    details: "",
    type: 1,
  };

  const handleSubmit = (data) => {
    setButtonloading(true);
    subscriptionCreateApiCall({ ...data, token: props.userProfile?.token })
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SUBSCRIPTION.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setButtonloading(false);
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
    //features: Yup.string().required(SUBSCRIPTION.REQUIRED.FEATURES),
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
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [options2, setOptions2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [options3, setOptions3] = useState([]);
  const [selectedOption5, setSelectedOption5] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonloading, setButtonloading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const fetchData = async () => {
      setOptions(type);

      const data2 = await fetchValidityLimitAPIGet();
      setOptions2(data2?.data?.validity);
      const data3 = await fetchStorageLimitAPIGet();
      setOptions3(data3?.data?.validity);
    };
    fetchData();
  }, []);

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
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        <Head>
          <title>{SUBSCRIPTION.ADD_SUBSCRIPTION}</title>
        </Head>
        {loading === false ? (
          <>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                mt: "2%",
              }}
            >
              <Container maxWidth="xl">
                <Stack spacing={3}>
                  <Stack direction="row" justifyContent="space-between" spacing={4}>
                    <Stack spacing={1}>
                      <Typography variant="h5" sx={{ padding: "8px", pt: "40px" }}>
                        {SUBSCRIPTION.ADD_NEW_SUBSCRIPTION_PLAN}
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
                <Card sx={{ border: "1px solid #eee", borderRadius: "10px", mb: "40px" }}>
                  <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Formik
                          initialValues={initialValues}
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
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.TITLE} <span style={{ color: "red" }}>*</span>
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
                                      <div
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                          marginTop: "-20px",
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {errors.name}
                                      </div>
                                    )}
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.USER_LIMIT}{" "}
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
                                      name="user_limit"
                                      as={TextField}
                                      type="number"
                                      fullWidth
                                      inputProps={{
                                        min: 0, // Set the minimum value to 0 to prevent negative values
                                      }}
                                    />
                                    {touched.user_limit && errors.user_limit && (
                                      <div
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                          marginTop: "-20px",
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {errors.user_limit}
                                      </div>
                                    )}
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.VALIDITY_IN_DAYS}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>

                                    <Field name="validity_id" as={Autocomplete}>
                                      {({ field, form }) => (
                                        <Autocomplete
                                          {...field}
                                          value={selectedOption2}
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
                                              error={
                                                form.errors.validity_id && form.touched.validity_id
                                              }
                                              helperText={
                                                form.errors.validity_id &&
                                                form.touched.validity_id &&
                                                form.errors.validity_id
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
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.STORAGE_LIMIT}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>

                                    <Field name="storage_limit_id" as={Autocomplete}>
                                      {({ field, form }) => (
                                        <Autocomplete
                                          {...field}
                                          value={selectedOption3}
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
                                              error={
                                                form.errors.storage_limit_id &&
                                                form.touched.storage_limit_id
                                              }
                                              helperText={
                                                form.errors.storage_limit_id &&
                                                form.touched.storage_limit_id &&
                                                form.errors.storage_limit_id
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
                                  </div>
                                </Grid>
                                <Grid item xs={12}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.SELECT_MULTIPLE_FEATURE}{" "}
                                      <span style={{ color: "red" }}></span>
                                    </label>

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
                                              "featuresName",
                                              newValue ? newValue.name : ""
                                            );
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              size="small"
                                              variant="outlined"
                                              error={form.errors.features && form.touched.features}
                                              helperText={
                                                form.errors.features &&
                                                form.touched.features &&
                                                form.errors.features
                                              }
                                              sx={{
                                                mb: 2,
                                                "& input": {
                                                  color: "#4F4D4D", // Replace "blue" with your desired color value
                                                },
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
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.PRICE}({props.currency})
                                      <span style={{ color: "red" }}>*</span>
                                    </label>

                                    <Field
                                      size="small"
                                      sx={{
                                        mb: 2,
                                        "& input": {
                                          color: "#4F4D4D", // Replace "blue" with your desired color value
                                        },
                                      }}
                                      name="price"
                                      as={TextField}
                                      variant="outlined"
                                      type="number"
                                      fullWidth
                                      inputProps={{
                                        min: 0, // Set the minimum value to 0 to prevent negative values
                                      }}
                                    />
                                    {touched.price && errors.price && (
                                      <div
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                          marginTop: "-20px",
                                          marginLeft: "15px",
                                        }}
                                      >
                                        {errors.price}
                                      </div>
                                    )}
                                  </div>
                                </Grid>
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
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
                                                  color: "#4F4D4D", // Replace "blue" with your desired color value
                                                },
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
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {SUBSCRIPTION.DETAILS}
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
                                      rows={2}
                                      type="text"
                                      fullWidth
                                    />
                                    {touched.details && errors.details && (
                                      <div
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                          marginTop: "-20px",
                                          marginLeft: "15px",
                                        }}
                                      >
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
                                          // background: "white",
                                          // color: "#70b42c",
                                         
                                          // borderRadius: "10px",
                                          
                                          // padding: "3px",
                                          // "&:hover": {
                                          //   background: "white",
                                          //   color: "#70b42c",
                                          // },
                                          border: "1px solid #eee",
                                          mb: 2,
                                          backgroundColor: success.white,
                                          color: success.primary,
                                          "&:hover": {
                                            backgroundColor: success.white,
                                            color: success.primary, // Change hover color
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
                                        // background: "#70b42c",
                                        // color: "white",
                                        // mb: 2,
                                        
                                        // padding: "3px",
                                        // borderRadius:"10px",
                                        // "&:hover": {
                                        //   background: "#70b42c",
                                        // },
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
              </Container>
            </Box>
          </>
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
