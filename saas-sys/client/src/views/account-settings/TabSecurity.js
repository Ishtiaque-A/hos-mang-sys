import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Stack,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import Alert1 from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import { useAuth } from "../../hooks/use-auth";
import { ownPasswordUpdateApiCall, logoutApiGet } from "../../common/apiCall/api";
import { LOGIN_SCREEN_URL } from "../../common/constantData/screenUrl";
import { USER, UPDATE, BACK } from "../../common/constantData/language";
import Loading from "src/components/Loading";
import { neutral, success } from "src/theme/colors";

const TabSecurity = () => {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data) => {
    setLoading(true);
    ownPasswordUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(USER.UPDATE_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setTimeout(() => {
            logoutApiGet()
              .then((response) => {
                setLoading(false);
                localStorage.removeItem("token");
                auth.signOut();
                router.push(LOGIN_SCREEN_URL);
              })
              .catch((err) => {
                console.log(err);
              });
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
          setLoading(false);
        }
      })
      .catch((err) => {
        setResponseMessage(USER.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required(USER.REQUIRED.PASSWORD),
    new_password: Yup.string().required(USER.REQUIRED.NEW_PASSWORD),
    new_password_confirmation: Yup.string()
      .required(USER.REQUIRED.CONFIRM_PASSWORD)
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

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
      {loading === false ? (
        <CardContent>
          {auth?.user?.user?.is_tem_password === 1 && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{USER.DEFAULT_PASSWORD_CHANGE_MESSAGE}</Alert>
            </Stack>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  current_password: "",
                  new_password: "",
                  new_password_confirmation: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched }) => (
                  <Form encType="multipart/form-data">
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      <Grid item xs={12}>
                        <div>
                          <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {USER.CURRENT_PASSWORD} <span style={{ color: "red" }}>*</span>
                          </label>

                          <Field
                            size="small"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            name="current_password"
                            as={TextField}
                            type="password"
                            fullWidth
                          />
                          {touched.current_password && errors.current_password && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "-20px",
                                marginLeft: "15px",
                              }}
                            >
                              {errors.current_password}
                            </div>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {USER.NEW_PASSWORD} <span style={{ color: "red" }}>*</span>
                          </label>

                          <Field
                            size="small"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            name="new_password"
                            as={TextField}
                            type="password"
                            fullWidth
                          />
                          {touched.new_password && errors.new_password && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "-20px",
                                marginLeft: "15px",
                              }}
                            >
                              {errors.new_password}
                            </div>
                          )}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div>
                          <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {USER.CONFIRM_NEW_PASSWORD} <span style={{ color: "red" }}>*</span>
                          </label>

                          <Field
                            size="small"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            name="new_password_confirmation"
                            as={TextField}
                            type="password"
                            fullWidth
                          />
                          {touched.new_password_confirmation &&
                            errors.new_password_confirmation && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginTop: "-20px",
                                  marginLeft: "15px",
                                }}
                              >
                                {errors.new_password_confirmation}
                              </div>
                            )}
                        </div>
                      </Grid>

                      <Grid item xs={6}>
                        <Divider />
                        <div style={{ width: "100%" }}>
                          <Button
                            variant="contained"
                            color="primary"
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
                            onClick={() => router.push("/")}
                          >
                            {BACK}
                          </Button>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <Divider />
                        <div style={{ width: "100%" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
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
                            {UPDATE}
                          </Button>
                          <Alert1
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
        </CardContent>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TabSecurity;
