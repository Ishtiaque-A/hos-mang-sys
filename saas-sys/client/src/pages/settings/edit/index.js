import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Grid, Typography, TextField, Card, Switch } from "@mui/material";
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
  fetchGlobalSettingAPIGet,
  settingsDetailsAPIGet,
  settingUpdateApiCall,
} from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { SETTING, SUBMIT } from "../../../common/constantData/language";
import Loading from "src/components/Loading";
import { userRole } from "../../../common/helpers";
import { Button, message, Upload } from "antd";
import { setGlobalSettingToReducer } from "../../../stateManagement/global/GlobalActionCreators";
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
  setGlobalSettingToReducerProp: (data) => dispatch(setGlobalSettingToReducer(data)),
});

const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedData, setConvertedData] = useState("");
  const [previewImage, setPreviewImage] = useState(details?.logo);

  useEffect(() => {
    setTimeout(() => {
      setLoading(2);
    }, 3000);
  }, []);

  const fetchData = () => {
    settingsDetailsAPIGet()
      .then((respons) => {
        console.log(respons);
        if (respons?.code == 200) {
          setDetails(respons?.data?.setting);
        }
        setLoading(2);
      })
      .catch((error) => {
        setLoading(2);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleImageChange = (info, setFieldValue) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      console.log("file:", file);

      const reader = new FileReader();
      reader.onload = () => {
        console.log("reader.result:", reader.result);
        setConvertedData(reader.result);
        setFieldValue("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("userProfile", props.userProfile);

  const handleSubmit = (data) => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setConvertedData(reader.result);
      };
    }

    for (const key in data) {
      if (data.hasOwnProperty(key) && (data[key] == "" || data[key] == null)) {
        delete data[key];
      }
      if (key === "logo" && data[key].startsWith("http")) {
        delete data[key];
      }
    }
    setLoading(1);
    settingUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SETTING.UPDATE_SUCCESS_MESSAGE);
          setOpenAlert1(true);
        } else {
          if (Object.keys(res?.errors).length > 0) {
            for (let field in res?.errors) {
              if (res.errors[field]) {
                let errorMessages = res.errors[field];
                for (let i = 0; i < errorMessages.length; i++) {
                  let errorMessage = errorMessages[i];
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
        return fetchGlobalSettingAPIGet();
      })
      .then((response) => {
        if (response.code == 200) {
          props.setGlobalSettingToReducerProp(response?.data);
        }
      })
      .catch((err) => {
        setResponseMessage(SETTING.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      })
      .finally(() => {
        fetchData();
      });
  };

  const validationSchema = Yup.object().shape({
    //currency: Yup.string().required(SETTING.REQUIRED.CURRENCY),
    contact_mail: Yup.string()
      .email("Invalid email format")
      .required(SETTING.REQUIRED.EMAIL)
      .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format"),
    contact_number: Yup.string()
      .matches(/^01[0-9]{9}$/, "Invalid phone number")
      .required(SETTING.REQUIRED.PHONE),
  });

  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const handleSwitchChange = (fieldName, setFieldValue, values) => {
    // Toggle the value of the specified field when the switch is changed
    let updatedValue = values?.[fieldName] == "1" ? "0" : "1";
    setFieldValue(fieldName, updatedValue);
  };

  const value = () => {
    if (userRole("SUPER_ADMIN", props.userProfile?.user_type)) {
      return {
        id: details?.id,
        currency: details?.currency || "",
        contact_mail: details?.contact_mail || "",
        contact_number: details?.contact_number || "",
        is_2fa: details?.is_2fa || "",
        is_social_login: details?.is_social_login || "",
        is_api_key: details?.is_api_key || null,
        is_notification: details?.is_notification || null,
        is_push_notification: details?.is_push_notification || null,
        is_sms_notification: details?.is_sms_notification || null,
        is_email_notification: details?.is_email_notification || null,
        is_sso: details?.is_sso || null,
        is_direct_purchase: details?.is_direct_purchase || null,
        logo: details?.logo || convertedData,
      };
    }

    return {
      id: details?.id,
      contact_mail: details?.contact_mail || "",
      contact_number: details?.contact_number || "",
      is_push_notification: details?.is_push_notification || null,
      logo: details?.logo || convertedData,
    };
  };

  return (
    <>
      <Box
        sx={{ backgroundColor: "white", mx: "10px", my: "20px", borderRadius: "30px", py: "40px" }}
      >
        <Head>
          <title>{SETTING.TITLE}</title>
        </Head>

        {loading == 2 ? (
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
                        {SETTING.TITLE}
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
                <Card sx={{ border: "1px solid #eee", borderRadius: "10px" }}>
                  <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Formik
                          initialValues={{
                            ...value(),
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
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_2fa" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_2fa == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_2fa",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">
                                        Two factor authentication
                                      </Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        Two-factor authentication (2FA) is a security measure that
                                        provides an additional layer of protection to your online
                                        accounts by requiring two different types of identification
                                        before granting access.{" "}
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_social_login" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_social_login == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_social_login",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Social Login</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        Social Login authentication is an easy way of authentication
                                        using third party service like google, Linkedin.
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_api_key" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_api_key == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_api_key",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Api key</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        An API key, also known as an application programming
                                        interface key, is a unique code or token provided by an
                                        application or service that grants access to its API.{" "}
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_notification" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_notification == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_notification",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Notification</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        Notification is a easy and popular way of communication with
                                        system and users.
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("ADMIN", props.userProfile?.user_type) && false && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_push_notification" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_push_notification == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_push_notification",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Push notification</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        In the midst of a vibrant city, where tall buildings touched
                                        the sky and the streets hummed with activity, there existed
                                        a world within a world.{" "}
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_sms_notification" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_sms_notification == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_sms_notification",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Sms notification</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        This will enable sms notification for real time
                                        communication with customer.
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_email_notification" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_email_notification == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_email_notification",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Email notification</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        This will enable email notification for specific purpose.
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_sso" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_sso == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_sso",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">SSO</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        Single Sign of is a feature to visit it's sister app without
                                        any other authentication.
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && false && (
                                  <>
                                    <Grid item xs={1.5}>
                                      <Field name="is_direct_purchase" type="checkbox">
                                        {({ field, form }) => (
                                          <Switch
                                            {...field}
                                            checked={form.values.is_direct_purchase == "1"}
                                            onChange={() =>
                                              handleSwitchChange(
                                                "is_direct_purchase",
                                                form.setFieldValue,
                                                form.values
                                              )
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Grid>
                                    <Grid item xs={10}>
                                      <Typography variant="h6">Direct Purchase</Typography>
                                      <label style={{ fontSize: "12px", color: "#636f73" }}>
                                        User will able to purchases any subscription directly.
                                      </label>
                                    </Grid>
                                  </>
                                )}
                                {userRole("SUPER_ADMIN", props.userProfile?.user_type) && (
                                  <Grid item xs={6}>
                                    <div>
                                      <label style={{ fontSize: "16px" }}>
                                        {SETTING.CURRENCY} <span style={{ color: "red" }}>*</span>
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
                                        name="currency"
                                        as={TextField}
                                        type="text"
                                        fullWidth
                                      />
                                      {touched.currency && errors.currency && (
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                            marginTop: "-20px",
                                            marginLeft: "15px",
                                          }}
                                        >
                                          {errors.currency}
                                        </div>
                                      )}
                                    </div>
                                  </Grid>
                                )}
                                {userRole("ADMIN", props.userProfile?.user_type) && (
                                  <Grid item xs={6}>
                                    <div>
                                      <label style={{ fontSize: "16px" }}>
                                        {SETTING.EMAIL} <span style={{ color: "red" }}>*</span>
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
                                        name="contact_mail"
                                        as={TextField}
                                        type="text"
                                        fullWidth
                                      />
                                      {touched.contact_mail && errors.contact_mail && (
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                            marginTop: "-20px",
                                            marginLeft: "15px",
                                          }}
                                        >
                                          {errors.contact_mail}
                                        </div>
                                      )}
                                    </div>
                                  </Grid>
                                )}{" "}
                                {userRole("ADMIN", props.userProfile?.user_type) && (
                                  <Grid item xs={6}>
                                    <div>
                                      <label style={{ fontSize: "16px" }}>
                                        {SETTING.PHONE} <span style={{ color: "red" }}>*</span>
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
                                        name="contact_number"
                                        as={TextField}
                                        type="text"
                                        fullWidth
                                      />
                                      {touched.contact_number && errors.contact_number && (
                                        <div
                                          style={{
                                            color: "red",
                                            fontSize: "12px",
                                            marginTop: "-20px",
                                            marginLeft: "15px",
                                          }}
                                        >
                                          {errors.contact_number}
                                        </div>
                                      )}
                                    </div>
                                  </Grid>
                                )}
                                <Grid container rowSpacing={1} marginLeft={4}>
                                  <Grid item xs={6}>
                                    <label style={{ fontSize: "16px" }}>Logo</label>
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

                                  {!previewImage && details?.logo != "" && details?.logo != null ? (
                                    <Grid item xs={6}>
                                      <img
                                        src={details?.logo}
                                        alt="Preview"
                                        style={{ width: "70px", height: "70px", marginTop: "10px" }}
                                      />
                                    </Grid>
                                  ) : (
                                    <Grid item xs={6}>
                                      {previewImage && (
                                        <img
                                          src={previewImage}
                                          alt="Preview"
                                          style={{
                                            width: "70px",
                                            height: "70px",
                                            marginTop: "10px",
                                          }}
                                        />
                                      )}
                                    </Grid>
                                  )}
                                </Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={6}>
                                  <div style={{ width: "100%" }}>
                                    <LoadingButton
                                      type="submit"
                                      color="primary"
                                      // loading={loading}
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
