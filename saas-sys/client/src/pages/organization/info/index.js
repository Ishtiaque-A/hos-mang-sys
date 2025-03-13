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
import { organizationCreateApiCall } from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, USER, ORGANIZATION } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import { fetchFeatureAPIGet } from "../../../common/apiCall/api";
import Divider from "@mui/material/Divider";
import { PLAN_DURATION, PLAN_STORAGE } from "../../../common/constantData/constants";

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

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    contact_person_name: "",
    contact_person_mobile: "",
    contact_person_email: "",
    contact_person_designation: "",
  };

  const handleSubmit = (data) => {
    organizationCreateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(ORGANIZATION.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setTimeout(() => {
            router.push(ADMIN.ORGANIZATION_LIST);
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

          //
        }
      })
      .catch((err) => {
        setResponseMessage(ORGANIZATION.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(ORGANIZATION.REQUIRED.NAME),
    email: Yup.string().required(ORGANIZATION.REQUIRED.EMAIL),
    mobile: Yup.string().required(ORGANIZATION.REQUIRED.PHONE),
    contact_person_name: Yup.string().required(ORGANIZATION.REQUIRED.CONTACT_PERSON_NAME),
    contact_person_mobile: Yup.string().required(ORGANIZATION.REQUIRED.CONTACT_PERSON_PHONE),
    contact_person_email: Yup.string().required(ORGANIZATION.REQUIRED.CONTACT_PERSON_EMAIL),
    contact_person_designation: Yup.string().required(USER.REQUIRED.CONTACT_PERSON_DESINGNATION),
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [features, setFeatures] = useState([]);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
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
        <title>{USER.ADD_USER_TITLE}</title>
      </Head>
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
                  {ORGANIZATION.ADD_TITLE}
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
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.NAME} <span style={{ color: "red" }}>*</span>
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
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.EMAIL} <span style={{ color: "red" }}>*</span>
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
                                name="email"
                                as={TextField}
                                type="email"
                                fullWidth
                              />
                              {touched.email && errors.email && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.PHONE} <span style={{ color: "red" }}>*</span>
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
                                name="mobile"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.mobile && errors.mobile && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.mobile}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.ADDRESS} <span style={{ color: "red" }}>*</span>
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
                                name="address"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.address && errors.address && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.address}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.CONTACT_PERSON_NAME}{" "}
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
                                name="contact_person_name"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.contact_person_name && errors.contact_person_name && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.contact_person_name}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.CONTACT_PERSON_PHONE}{" "}
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
                                name="contact_person_mobile"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.contact_person_mobile && errors.contact_person_mobile && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.contact_person_mobile}
                                </div>
                              )}
                            </div>
                          </Grid>

                          <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.CONTACT_PERSON_EMAIL}{" "}
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
                                name="contact_person_email"
                                as={TextField}
                                type="email"
                                fullWidth
                              />
                              {touched.contact_person_email && errors.contact_person_email && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.contact_person_email}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ORGANIZATION.CONTACT_PERSON_DESINGNATION}{" "}
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
                                name="contact_person_designation"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.contact_person_designation &&
                                errors.contact_person_designation && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      marginTop: "-20px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {errors.contact_person_designation}
                                  </div>
                                )}
                            </div>
                          </Grid>

                          <Grid item xs={6}>
                            <div style={{ width: "100%" }}>
                              <Link href={ADMIN.ORGANIZATION_LIST}>
                                <LoadingButton
                                  // loading={loading}
                                  variant="contained"
                                  sx={{
                                    background: "white",
                                    color: "#4287DA",
                                    mb: 2,
                                    float: "",
                                    padding: "3px",
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
                                // loading={loading}
                                variant="contained"
                                sx={{
                                  background: "#089B1A",
                                  color: "white",
                                  mb: 2,
                                  float: "right",
                                  padding: "3px",
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
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
