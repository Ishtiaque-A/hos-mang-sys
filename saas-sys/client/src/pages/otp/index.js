import {  useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { LOGIN } from "../../common/constantData/language";

import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { setIsAuthenticated } from "../../stateManagement/global/GlobalActionCreators";
import { connect } from "react-redux";
import { Grid, Card, Box, Button, Link, CardContent, CardMedia, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { fetchGlobalSettingAPIGet, otploginApiCall } from "../../common/apiCall/api";
import { setUserProfileToReducer } from "../../stateManagement/auth/AuthActionCreators";
import { setHeaders } from "../../common/apiCall/axiosSetup";

const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  testData: getGlobalState(state)?.testData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
});

const Page = (props) => {
  const router = useRouter();
  const auth = useAuth();

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required(LOGIN.REQUIRED.OTP),
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
      <div
        className="loginPaseLogo"
        style={{ textAlign: "center", marginTop: "4rem", marginBottom: "3rem" }}
      >
        <div>
          <Image src="/assets/logos/logo.jpeg" alt="logo" width={250} height={150} />
        </div>
      </div>

      <div className="loginPageCardSection">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <Grid container columns={12} spacing={1} sx={{ width: "75%" }} className="temImage">
            <Grid item xs={12} md={7} sm={12} sx={{ marginRight: "15px" }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", fontWeight: "bold", letterSpacing: ".01em" }}
                  >
                    {LOGIN.OTP}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16, textAlign: "center", padding: "5px" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Submit Your Otp Here
                  </Typography>

                  <Formik
                    validationSchema={validationSchema}
                    initialValues={{ email: localStorage.getItem('UserEmail'), otp: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log(values,"values")
                      otploginApiCall(values)
                        .then((response) => {
                          console.log(response,"response")
                          if (response?.code == 200) {
                            props.setUserProfileToReducerProp(response?.data);
                            //props.setValidityToReducerProp(response?.data?.expire_within ?? 100);
                            props.setIsAuthenticatedProp({ status: true });
                            console.log('token......', response?.data)
                            if (response?.data?.user?.token) {
                              //alert(response?.data?.user?.token)
                              localStorage.setItem("token", response?.data?.user?.token);
                            }

                            setResponseMessage(LOGIN.ADD_SUCCESS_MESSAGE);
                            setOpenAlert1(true);
                            setHeaders(response?.data?.user?.token);
                            auth
                              .signIn(response?.data?.user)
                              .then((r) => {
                                setTimeout(() => {
                                  router.push("/");
                                }, 3000);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          } else {
                            setResponseMessage(response.message);
                            setOpenAlert2(true);
                          }

                        })
                        .catch((err) => {
                          setResponseMessage(LOGIN.ADD_ERROR_MESSAGE);
                          setOpenAlert2(true);
                        });
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div style={{ marginTop: "1rem" }}>
                          <label></label>
                          <div>
                            <input
                              type="number"
                              name="otp"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.otp}
                              style={{
                                width: "100%",
                                fontSize: "18px",
                                padding: "10px",
                                border: ".5px solid #9C9B9B",
                                marginBottom: "1rem",
                              }}
                            />
                          </div>
                        </div>
                        <div style={{ textAlign: "right", marginTop: "-1rem" }}>
                          <Link href="" sx={{ textDecoration: "none" }}>

                          </Link>
                        </div>

                        <div>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                              background: "#0fb860",
                              borderRadius: "4px",
                              marginTop: "2rem",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                          >
                            {LOGIN.SUBMIT}
                          </Button>
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
                      </form>
                    )}
                  </Formik>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4.5} sm={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <div>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ letterSpacing: ".01em", marginTop: "-1.5rem" }}
                    >
                      What's New
                    </Typography>
                  </div>
                  <div>
                    <CardMedia
                      sx={{ height: 240, marginTop: "10px" }}
                      image="/assets/aaa.jpeg"
                      title="green iguana"
                    />
                    {/* <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0" }}
                      >
                        Detect and Address Maintenance Trends quickly with these Widgets
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent> */}

                    <Divider />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
