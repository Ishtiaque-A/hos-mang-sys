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
import { storageDetailsAPIGet, storageUpdateApiCall } from "../../../common/apiCall/api";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import { useRouter } from "next/router";
import { BACK, SUBMIT, USER ,STORAGE} from "../../../common/constantData/language";
import { ADMIN } from "../../../common/constantData/screenUrl";
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
  const [buttonloading, setButtonloading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(2);
    }, 1100);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await storageDetailsAPIGet(id);
        setDetails(data?.data?.subscription_plan);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(details?.size,"details>>>>>>>>")

  const handleImageChange = (info,setFieldValue) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      console.log('file:', file);
  
      const reader = new FileReader();
      reader.onload = () => {
        console.log('reader.result:', reader.result);
        setConvertedData(reader.result);
        setFieldValue('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data) => {
    setButtonloading(true)
    if (selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = () => {
        setConvertedData(reader.result);
      };
    }
    storageUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(STORAGE.UPDATE_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setButtonloading(false)
          setTimeout(() => {
            router.push(ADMIN.STORAGE_LIST_URL);
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
        setResponseMessage(STORAGE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(STORAGE.REQUIRED.NAME),
    size: Yup.string().required(STORAGE.REQUIRED.SIZE),
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
      <Head>
        <title>{STORAGE.UPDATE_TITLE}</title>
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
             {STORAGE.UPDATE_TITLE}
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
                        size: details?.size || "",
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
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {STORAGE.NAME} <span style={{ color: "red" }}>*</span>
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
                                  {STORAGE.SIZE} <span style={{ fontSize:"10px" }}>(Megabyte)</span><span style={{ color: "red" }}>*</span>
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
                                  name="size"
                                  as={TextField}
                                  type="number"
                                fullWidth
                                inputProps={{
                                  min: 0 // Set the minimum value to 0 to prevent negative values
                                }}
                                />
                                {touched.size && errors.size && (
                                  <div
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      marginTop: "-20px",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    {errors.size}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            
                            <Grid item xs={6}>
                              <div style={{ width: "100%" }}>
                                <Link href={ADMIN.STORAGE_LIST_URL}>
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
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps, mapDispatchToProps)(Page);
