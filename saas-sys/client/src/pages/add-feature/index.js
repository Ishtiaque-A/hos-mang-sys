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
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { connect } from "react-redux";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import { featureCreateApiCall } from "../../common/apiCall/api";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, ADD_FEATURE } from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import { fetchFeatureAPIGet } from "../../common/apiCall/api";
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
});

const mapDispatchToProps = (dispatch) => ({});

const Page = (props) => {
  const router = useRouter();
  const [featureData, setFeatureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption2, setSelectedOption2] = useState({ value: 1, label: "Active" });
  const [buttonloading, setButtonloading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  const initialValues = {
    name: "",
    status: selectedOption2.value || null,
    parent_id: 0,
    details: "",
  };

  const handleSubmit = (data) => {
    setButtonloading(true);
    featureCreateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(ADD_FEATURE.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setButtonloading(false);
          setTimeout(() => {
            router.push(ADMIN.FEATURE_PLAN_LIST);
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
        setResponseMessage(ADD_FEATURE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
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

  const [options2, setOptions2] = useState([]);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setOptions(featureData);
      setOptions2(status_type);
    };
    fetchData();
  }, featureData);

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
          <title>{ADD_FEATURE.TITLE}</title>
        </Head>
        {loading === false ? (
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
                      <Typography variant="h5" sx={{ padding: "8px", pt: "40px" }}>
                        {ADD_FEATURE.TITLE}
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
                <Card sx={{ border: "1px solid #eee", mb: "40px", borderRadius: "10px" }}>
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
                                <Grid item xs={12}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {ADD_FEATURE.MAME} <span style={{ color: "red" }}>*</span>
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
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {ADD_FEATURE.PARENT}
                                  </label>
                                  <Field name="parent_id" as={Autocomplete}>
                                    {({ field, form }) => (
                                      <Autocomplete
                                        {...field}
                                        value={selectedOption}
                                        onChange={(event, newValue) => {
                                          setSelectedOption(newValue);
                                          form.setFieldValue(
                                            "parent_id",
                                            newValue ? Number(newValue.id) : null
                                          );
                                        }}
                                        options={featureData}
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
                                    {ADD_FEATURE.STATUS} <span style={{ color: "red" }}>*</span>
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
                                            error={
                                              Boolean(form.errors.status) && form.touched.status
                                            }
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
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      {ADD_FEATURE.DETAILS} <span style={{ color: "red" }}>*</span>
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
                                    <Link href={ADMIN.FEATURE_PLAN_LIST}>
                                      <LoadingButton
                                        // loading={loading}
                                        variant="contained"
                                        sx={{
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
