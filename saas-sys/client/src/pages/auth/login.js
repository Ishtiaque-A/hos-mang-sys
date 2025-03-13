import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { LOGIN } from "../../common/constantData/language";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import getGlobalState from "../../stateManagement/global/globalSelector";
import {
  setIsAuthenticated,
  setValidityToReducer,
} from "../../stateManagement/global/GlobalActionCreators";
import { connect } from "react-redux";
import { Grid, Card, Box, Button, Link, CardContent, CardMedia, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import {
  fetchGlobalSettingAPIGet,
  loginApiCall,
  googleLoginApiCall,
} from "../../common/apiCall/api";
import { setUserProfileToReducer } from "../../stateManagement/auth/AuthActionCreators";
import { setHeaders } from "../../common/apiCall/axiosSetup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { VscEyeClosed } from "react-icons/vsc";
import { CgEye } from "react-icons/cg";
const mapStateToProps = (state) => ({
  isAuthenticated: getGlobalState(state)?.isAuthenticated,
  settings: getGlobalState(state)?.settings,
});

const mapDispatchToProps = (dispatch) => ({
  setUserProfileToReducerProp: (data) => dispatch(setUserProfileToReducer(data)),
  setValidityToReducerProp: (data) => dispatch(setValidityToReducer(data)),
  setIsAuthenticatedProp: (data) => dispatch(setIsAuthenticated(data)),
});

const Page = (props) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    // console.log(auth.isAuthenticated , props.isAuthenticated  )

    if (auth.isAuthenticated && props.isAuthenticated) {
      console.log("Authenticated", props.isAuthenticated);
      let url = window.location.href.split("Url=%2F")[1];
      if (url && url.length > 0) {
        router.push("/" + url);
      } else {
        router.push("/");
      }
    }
  }, [props.isAuthenticated, auth.isAuthenticated]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(LOGIN.REQUIRED.PASSWORD),
    password: Yup.string().required(LOGIN.REQUIRED.PASSWORD),
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const responseGoogle = (response) => {
    if (response.error === "popup_closed_by_user") {
      // Handle the popup closed by the user error
      console.log("Popup closed by user");
    } else {
      console.log(response.profileObj);
      // Handle the successful login response
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <>
      <div
        className="loginPaseLogo"
        style={{ textAlign: "center", marginTop: "4rem", marginBottom: "3rem" }}
      >
          <div style={{display: "flex", justifyContent: "center"}}>
<h5
                      style={{
                        color: "#089B1A",
                        lineHeight: "1.5",
                        cursor: "pointer",
                        height: 50,
                        width: 200,
                        display: "flex",
                        justifyItems: "center",
                        // marginLeft: "-7%",
                        marginTop: "4%",
                          marginLeft: "15px",
                        fontSize: "30px",
                        fontFamily: "system-ui",
                        // float: "center"
                      }}
                    >
    SmartHealth
                    </h5>
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
                    Log in to SAAS
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16, textAlign: "center", padding: "5px" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Don't have an account?
                    <a
                      href="/register"
                      style={{
                        textDecoration: "none",
                        color: "#3498db",
                        display: "inline-block",
                        marginLeft: "5px",
                      }}
                    >
                      Register
                    </a>
                  </Typography>

                  <Formik
                    validationSchema={validationSchema}
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      loginApiCall(values)
                        .then((response) => {
                          //console.log(response,">>>>>>>>")
                          if (response?.code == 201) {
                            localStorage.setItem("UserEmail", response?.data?.user?.email);
                            setTimeout(() => {
                              router.push("/otp");
                            }, 3000);
                            setResponseMessage(response?.message);
                            setOpenAlert1(true);
                          } else if (response?.code == 200) {
                            props.setUserProfileToReducerProp(response?.data);
                            props.setValidityToReducerProp(response?.data?.expire_within ?? 100);
                            props.setIsAuthenticatedProp({ status: true });
                            console.log("token......", response?.data);
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

                          //   return fetchGlobalSettingAPIGet();
                          // })
                          // .then((response) => {
                          //   if (response.code == 200) {
                          //     props.setGlobalSettingToReducerProp(response?.data);
                          //   }
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
                          <label>{LOGIN.EMAIL}</label>
                          <div>
                            <input
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              style={{
                                width: "100%",
                                fontSize: "18px",
                                padding: "10px",
                                border: ".5px solid #9C9B9B",
                                marginBottom: "1rem",
                              }}
                            />
                          </div>

                          <label>{LOGIN.PASSWORD}</label>
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <input
                              type={isShowPassword ? "text" : "password"}
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              style={{
                                width: "100%",
                                fontSize: "18px",
                                padding: "10px",
                                border: ".5px solid #9C9B9B",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: "12px",
                                right: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                              {isShowPassword ? <VscEyeClosed /> : <CgEye />}
                            </div>
                          </div>
                          {touched.password && errors.password && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                              }}
                            >
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
                          </FormGroup>
                        </div>
                        <div style={{ textAlign: "right", marginTop: "-2rem" }}>
                          <Link href="/auth/send-otp" sx={{ textDecoration: "none" }}>
                            {LOGIN.FORGET}
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
                            {LOGIN.LOGIN}
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
                        {props?.settings?.is_social_login == 1 && (
                          <Divider component="li" sx={{ marginTop: "10px" }}>
                            or
                          </Divider>
                        )}
                      </form>
                    )}
                  </Formik>
                  <div style={{ width: "80%", margin: "0 auto" }}>
                    {props?.settings?.is_social_login == 1 && (
                      <dev style={{ marginTop: "1rem", margin: "0 auto", background: "red" }}>
                        <GoogleOAuthProvider clientId="282631688833-de009hqrraso95r9341rora1ie0sej2a.apps.googleusercontent.com">
                          <GoogleLogin
                            onSuccess={(credentialResponse) => {
                              let details = jwt_decode(credentialResponse.credential);
                              googleLoginApiCall(details)
                                .then((response) => {
                                  if (response?.code == 200) {
                                    props.setUserProfileToReducerProp(response?.data);
                                    props.setValidityToReducerProp(
                                      response?.data?.expire_within ?? 100
                                    );
                                    props.setIsAuthenticatedProp({ status: true });
                                    if (response?.data?.user?.token) {
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

                                  return fetchGlobalSettingAPIGet();
                                })
                                .then((response) => {
                                  if (response.code == 200) {
                                    props.setGlobalSettingToReducerProp(response?.data);
                                  }
                                })
                                .catch((err) => {
                                  setResponseMessage(LOGIN.ADD_ERROR_MESSAGE);
                                  setOpenAlert2(true);
                                });
                            }}
                            onError={() => {
                              console.log("Login Failed");
                            }}
                            style={{ marginBottom: "1px" }}
                            width="500px"
                          />
                        </GoogleOAuthProvider>
                      </dev>
                    )}
                  </div>
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
                    <CardContent>
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
                    </CardContent>

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