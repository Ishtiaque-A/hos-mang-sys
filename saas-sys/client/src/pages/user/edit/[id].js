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
  fetchOrganizationGet,
  userDetailsAPIGet,
  userUpdateApiCall,
} from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, USER } from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
import Divider from "@mui/material/Divider";
import Loading from "src/components/Loading";
import { Button, message, Upload } from "antd";
import * as React from "react";

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
  const [userType, setUserType] = useState();
  const [organization, setOrganization] = useState();
  const [organizationList, setOrganizationList] = useState({ id: 0, name: "Select" });

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedData, setConvertedData] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [buttonloading, setButtonloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userDetailsAPIGet(id);
        setDetails(data?.data?.user);
        setPreviewImage(data?.data?.user?.photo);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchOrganizationGet().then((data) => {
      if (data?.code == 200) {
        setOrganizationList(data?.data?.organizations);
      }
    });
  }, []);

  const handleImageChange = (info, setFieldValue) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      console.log("file:", file);

      const reader = new FileReader();
      reader.onload = () => {
        console.log("reader.result:", reader.result);
        setPreviewImage(reader.result);
        setConvertedData(reader.result);
        setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data) => {
    setButtonloading(true);
    setTimeout(() => {
      setButtonloading(false);
    }, 1000);
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setConvertedData(reader.result);
      };
    }
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === "") {
        delete data[key];
      }
      if (key === "photo" && data[key].startsWith("http")) {
        delete data[key];
      }
    }
    console.log(data);
    userUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(USER.UPDATE_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setTimeout(() => {
            router.push(ADMIN.USER_REQUEST);
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
        setResponseMessage(USER.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(USER.REQUIRED.NAME),
    email: Yup.string().required(USER.REQUIRED.EMAIL),
    mobile: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required(USER.REQUIRED.PHONE),
  });

  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const status_type = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
  ];

  const usersType = [
    {
      id: 2,
      name: "System Admin",
    },
    {
      id: 3,
      name: "Organization Admin",
    },
  ];

  const filterUserType = usersType.filter(userType => userType.id == details?.user_type)

   

  useEffect(() => {
    setUserType(filterUserType[0])
  }, [details])

  useEffect(() => {
    if(organizationList.length > 0) {
      const filterOrganizationList = organizationList.filter(organizationList => organizationList.id == details?.organization?.id)
      setOrganization(filterOrganizationList[0])
    }
   
  }, [details,organizationList])

  console.log(organization,"users")

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setOptions(status_type);
      setSelectedOption({ value: 1, label: "Active" });
    };
    fetchData();
  }, [details]);

  return (
    
    <>
      <Head>
        <title>{USER.UPDATE_USER_TITLE}</title>
      </Head>

      {loading === false && userType !== undefined && organization !== undefined ? (
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
                      {USER.UPDATE_USER_TITLE}
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
                          email: details?.email || "",
                          mobile: details?.mobile || "",
                          photo: details?.photo || convertedData,
                          status: details?.status || "",
                          user_type: details?.user_type || "",
                          organization_id: details?.organization_id || "",
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
                                        backgroundColor: "#089B1A",
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
                              <Grid item xs={6}>
                                {previewImage && (
                                  <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{ width: "70px", height: "70px", marginTop: "10px" }}
                                  />
                                )}
                              </Grid>
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
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {USER.STATUS}
                                  <span style={{ color: "red" }}>*</span>
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
                                          newValue ? Number(newValue.value) : null
                                        );
                                      }}
                                      options={options}
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
                              {props?.userProfile?.user_type == 0 && (
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
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
                                          options={usersType}
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
                              {props?.userProfile?.user_type == 0 && userType.id == 3 && (
                                <Grid item xs={6}>
                                  <div>
                                    <label
                                      style={{ fontSize: "16px", fontFamily: "-apple-system" }}
                                    >
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
                              <Grid container direction="row">
                                <Grid item xs={6}>
                                  <div style={{ width: "100%" }}>
                                    <Link href={ADMIN.USER_REQUEST}>
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
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
