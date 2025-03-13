import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Box, Container, Stack, Grid, Typography, TextField, Card } from "@mui/material";
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
import { ownProfileDetailsAPIGet, ownOrganizationUpdateApiCall } from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, USER ,OWNORGANIZATION} from "../../../common/constantData/language";
import { DASHBOARD_SCREEN_URL } from "../../../common/constantData/screenUrl";
import Divider from "@mui/material/Divider";
import Loading from "src/components/Loading";
import { Button, message, Upload } from "antd";

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

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedData, setConvertedData] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(2);
    }, 1100);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ownProfileDetailsAPIGet();
        setDetails(data?.data?.user?.organization);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(details,"details>>>>>>>>>>>>>>>>")

  const handleImageChange = (info,setFieldValue) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      console.log('file:', file);
  
      const reader = new FileReader();
      reader.onload = () => {
        console.log('reader.result:', reader.result);
        setConvertedData(reader.result);
        setFieldValue('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data) => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setConvertedData(reader.result);
      };
    }
    console.log(data, "data>>>>>>");
    ownOrganizationUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(OWNORGANIZATION.UPDATE_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setTimeout(() => {
            router.push(DASHBOARD_SCREEN_URL);
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
        setResponseMessage(OWNORGANIZATION.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(OWNORGANIZATION.REQUIRED.NAME),
    email: Yup.string()
    .email("Invalid email format")
    .required(USER.REQUIRED.EMAIL)
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format"),
    mobile: Yup.string()
    .matches(/^01[0-9]{9}$/, "Invalid phone number")
    .required(USER.REQUIRED.PHONE),
    address: Yup.string().required(OWNORGANIZATION.REQUIRED.ADDRESS),
  });

  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  return (
    <>
      <Box sx={{backgroundColor:"white", mx:"10px", my:"20px", borderRadius:"30px"}}>
      <Head>
        <title>{OWNORGANIZATION.TITLE}</title>
      </Head>
       
      {loading === 2 ? (
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
             <Typography variant="h5" sx={{ padding: "8px" ,marginLeft:""}}>
             {OWNORGANIZATION.TITLE}
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
                        name: details?.name || "",
                        email: details?.email || "",
                        mobile: details?.mobile || "",
                        address: details?.address || "",
                        description: details?.description || "",
                        logo: details?.logo || convertedData,
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
                            <Grid item xs={12}>
                          <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {OWNORGANIZATION.LOGO} 
                              </label>
                            <div>
                              <Upload
                                beforeUpload={() => false}
                                onChange={(info) => handleImageChange(info, setFieldValue)}
                                accept="image/*"
                              >
                                <Button 
                                style={{
                                  backgroundColor: '#089B1A',
                                  color: 'white', 
                                  border: 'none', 
                                  borderRadius: '5px',
                                }}>Pick File</Button>
                              </Upload>
                              
                            </div>
                          </Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {OWNORGANIZATION.NAME} <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
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
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
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
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
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
                                  {OWNORGANIZATION.ADDRESS} <span style={{ color: "red" }}>*</span>
                                </label>

                                <Field
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    mb: 2,
                                    "& input": {
                                      color: "#4F4D4D" // Replace "blue" with your desired color value
                                    }
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
                            <Grid item xs={12}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {OWNORGANIZATION.DETAILS}  <span style={{ color: "red" }}>*</span>
                              </label>
                             
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{
                                  mb: 2,
                                  "& input": {
                                    color: "#4F4D4D" // Replace "blue" with your desired color value
                                  }
                                }}
                                name="description"
                                as={TextField}
                                multiline
                                rows={4}
                                type="text"
                                fullWidth
                              />
                               {touched.description && errors.description && (
                                <div style={{ color: "red", fontSize: "12px" ,marginTop:"-20px",marginLeft:"15px"}}>
                                  {errors.description}
                                </div>
                              )}
                            </div>
                          </Grid>
                            <Grid item xs={6}>
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
        <Loading/>
      )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
