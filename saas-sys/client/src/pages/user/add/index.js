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
} from "@mui/material";
// import type { UploadProps } from 'antd';
import { Button, message, Upload } from "antd";
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
import {
  fetchBranchByOrganization,
  fetchOrganizationAPIGet,
  fetchOrganizationGet,
  fetchValidityLimitAPIGet,
  userCreateApiCall,
} from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, SUBSCRIPTION, USER } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import Loading from "../../../components/Loading";
import * as React from "react";
import { useAuth } from "src/hooks/use-auth";
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

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
});

const Page = (props) => {
  const router = useRouter();
  const [userType, setUserType] = useState({ id: 2, name: "System Admin" });
  const [organization, setOrganization] = useState({ id: 0, name: "Select" });
  const [organizationList, setOrganizationList] = useState({ id: 0, name: "Select" });

  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedData, setConvertedData] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState({ id: 0, name: "Select" });

  const [loading, setLoading] = useState(false);

  const [buttonloading, setButtonloading] = useState(false);
  const auth = useAuth();

  console.log(auth?.user?.user, "auth");

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    photo: convertedData,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(USER.REQUIRED.NAME),
    email: Yup.string()
      .email("Invalid email format")
      .required(USER.REQUIRED.EMAIL)
      .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format"),
    mobile: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required(USER.REQUIRED.PHONE),
    password: Yup.string().required(USER.REQUIRED.PASSWORD),
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };
  useEffect(() => {
    fetchOrganizationGet().then((data) => {
      if (data?.code == 200) {
        setOrganizationList(data?.data?.organizations);
      }
    });
  }, []);

  console.log(organization, "organization");

  const fetchOrganization = () => {
    const organizationId =
      auth?.user?.user?.user_type === 0 ? organization?.id : auth?.user?.user?.organization_id;
    fetchBranchByOrganization(organizationId)
      .then((res) => {
        console.log(res, "res");
        if (res?.code == 200) {
          setBranchList(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchOrganization();
    return () => {};
  }, [organization?.id]);

  console.log(branchList);
  const handleImageChange = (info, setFieldValue) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setConvertedData(reader.result);
        setFieldValue("photo", reader.result);
      };
      reader.onerror = () => {
        // Handle error if the FileReader fails to read the file.
        console.error("Error reading the selected image.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data) => {
    setButtonloading(true);
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setConvertedData(reader.result);
      };
    }
    setLoading(true);
    userCreateApiCall({ ...data, branch_name: selectedBranch?.name, branch_id: selectedBranch?.id })
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          setResponseMessage(USER.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setButtonloading(false);
          setTimeout(() => {
            router.push(ADMIN.USER_REQUEST);
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
        setLoading(false);

        setResponseMessage(USER.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
        setButtonloading(false);
      });
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px" }}>
        {loading && <Loading />}
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
                  <Typography variant="h5" sx={{ padding: "8px", pt: "40px" }}>
                    {USER.ADD_USER_TITLE}
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
            <Card sx={{ border: "1px solid #eee", mb: "40px" }}>
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
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {USER.PHOTO}
                              </label>
                              <div>
                                <Upload
                                  beforeUpload={() => false}
                                  onChange={(info) => handleImageChange(info, setFieldValue)}
                                  accept="image/*"
                                  listType="picture-card"
                                  maxCount={1}
                                >
                                  <Button
                                    style={{
                                      backgroundColor: "#70b42c",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Pick File
                                  </Button>
                                </Upload>
                              </div>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {USER.NAME} <span style={{ color: "red" }}>*</span>
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
                                  {USER.EMAIL} <span style={{ color: "red" }}>*</span>
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
                                  {USER.PHONE} <span style={{ color: "red" }}>*</span>
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
                                  {USER.PASSWORD} <span style={{ color: "red" }}>*</span>
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
                                  name="password"
                                  as={TextField}
                                  type="password"
                                  fullWidth
                                />
                                {touched.password && errors.password && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      marginTop: "-20px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            {props?.userProfile?.user_type == 0 && (
                              <Grid item xs={6}>
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    User Type
                                    <span style={{ color: "red" }}>*</span>
                                  </label>

                                  <Field name="use_type" as={Autocomplete}>
                                    {({ field, form }) => (
                                      <Autocomplete
                                        {...field}
                                        value={userType}
                                        onChange={(event, newValue) => {
                                          setUserType(newValue);
                                          form.setFieldValue(
                                            "user_type",
                                            newValue ? Number(newValue.id) : null
                                          );
                                        }}
                                        options={[
                                          {
                                            id: 2,
                                            name: "System Admin",
                                          },
                                          {
                                            id: 3,
                                            name: "Organization Admin",
                                          },
                                        ]}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            error={form.errors.type && form.touched.user_type}
                                            helperText={
                                              form.errors.type &&
                                              form.touched.user_type &&
                                              form.errors.user_type
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
                            )}

                            {userType?.id == 3 && (
                              <Grid item xs={6}>
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    Organization
                                    <span style={{ color: "red" }}>*</span>
                                  </label>

                                  <Field name="organization_id" as={Autocomplete}>
                                    {({ field, form }) => (
                                      <Autocomplete
                                        {...field}
                                        value={organization}
                                        onChange={(event, newValue) => {
                                          setOrganization(newValue);
                                          form.setFieldValue(
                                            "organization_id",
                                            newValue ? Number(newValue.id) : null
                                          );
                                        }}
                                        options={organizationList}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            error={
                                              form.errors.organization_id &&
                                              form.touched.organization_id
                                            }
                                            helperText={
                                              form.errors.organization_id &&
                                              form.touched.organization_id &&
                                              form.errors.organization_id
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
                            )}
                            {auth?.user?.user && auth?.user?.user?.user_type !== 0 && (
                              <Grid item xs={6}>
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    Select Branch
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <Field name="branch_id" as={Autocomplete}>
                                    {({ field, form }) => (
                                      <Autocomplete
                                        {...field}
                                        value={selectedBranch}
                                        onChange={(event, newValue) => {
                                          setSelectedBranch(newValue);
                                          form.setFieldValue(
                                            "branch_id",
                                            newValue ? Number(newValue.id) : null
                                          );
                                        }}
                                        options={branchList}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            error={form.errors.branch_id && form.touched.branch_id}
                                            helperText={
                                              form.errors.branch_id &&
                                              form.touched.branch_id &&
                                              form.errors.branch_id
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
                            )}
                            {auth?.user?.user?.user_type === 0 &&
                              userType?.id == 3 &&
                              organization?.id > 0 && (
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
                                      Select Branch
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                  </div>
                                  <Field name="branch_id" as={Autocomplete}>
                                    {({ field, form }) => (
                                      <Autocomplete
                                        {...field}
                                        value={selectedBranch}
                                        onChange={(event, newValue) => {
                                          setSelectedBranch(newValue);
                                          form.setFieldValue(
                                            "branch_id",
                                            newValue ? Number(newValue.id) : null
                                          );
                                        }}
                                        options={branchList}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            error={form.errors.branch_id && form.touched.branch_id}
                                            helperText={
                                              form.errors.branch_id &&
                                              form.touched.branch_id &&
                                              form.errors.branch_id
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
                              )}

                            <Grid container direction="row">
                              <Grid item xs={6}>
                                <div style={{ width: "100%" }}>
                                  <Link href={ADMIN.USER_REQUEST}>
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
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
