import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { LOGIN } from "../../common/constantData/language";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import { connect } from "react-redux";
import { Grid, Card, Box, Button, Link, CardContent, CardMedia, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import {
  ForgetPasswordApiCall,
  loginApiCall,
  googleLoginApiCall,
} from "../../common/apiCall/api";
import { setHeaders } from "../../common/apiCall/axiosSetup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Page = (props) => {
  const router = useRouter();
  const auth = useAuth();


  const validationSchema = Yup.object().shape({
    email: Yup.string().required(LOGIN.REQUIRED.PASSWORD),
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [buttonloading, setButtonloading] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };


  const handleSubmit = (data) => {
    setButtonloading(true)
    localStorage.setItem('email', data.email);
    ForgetPasswordApiCall(data)
      .then((res) => {
        if (res.code === 201) {
          setResponseMessage(res?.message);
          setOpenAlert1(true);
          setButtonloading(false)
          setTimeout(() => {
            router.push("/auth/reset-password");
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
        setResponseMessage(LOGIN.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
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
          <Grid container columns={12} spacing={1} >
            <Grid item xs={12} md={12} sm={12} sx={{  display:"flex",justifyContent:"center" }}>
              <Grid container columns={12} spacing={1} sx={{ width: "75%", display:"flex",justifyContent:"center" }} className="temImage">
                <Grid item xs={12} md={8} sm={12} sx={{ marginRight: "15px" }}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ textAlign: "center", fontWeight: "bold", letterSpacing: ".01em" }}
                      >
                        Reset password in to Saas
                      </Typography>
                      {/* <Typography
                    sx={{ fontSize: 16, textAlign: "center", padding: "5px" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Don't have an account?
                    <a href="/register" style={{ textDecoration: "none", color: "#3498db" }}>
                      Start a free trial
                    </a>
                  </Typography> */}

                      <Formik
                        validationSchema={validationSchema}
                        initialValues={{ email: "" }}
                        validate={(values) => {
                          const errors = {};
                          if (!values.email) {
                            errors.email = "Required";
                          } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                          ) {
                            errors.email = "Invalid email address";
                          }
                          return errors;
                        }}
                        onSubmit={handleSubmit}
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

                              
                            </div>
                            <div style={{ textAlign: "right", marginTop: "1rem" }}>
                              <Link href="/auth/login" sx={{ textDecoration: "none" }}>
                                {LOGIN.GoBACK}
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
                                {LOGIN.SEND}
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
                                          localStorage.setItem(
                                            "token",
                                            response?.data?.user?.token
                                          );
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
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Page;