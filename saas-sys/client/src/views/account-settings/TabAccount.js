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
  CardContent
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { setUserProfileToReducer } from "../../stateManagement/auth/AuthActionCreators";
import { connect } from "react-redux";
import getAuthState from "../../stateManagement/auth/AuthSelector";
import {ownProfileDetailsAPIGet, ownProfileUpdateApiCall,fetchUserProfileAPIGet } from "../../common/apiCall/api";
import Alert from "../../components/Alert";
import { useRouter } from "next/router";
import { BACK, UPDATE, USER } from "../../common/constantData/language";
import { LOGIN_SCREEN_URL ,DASHBOARD_SCREEN_URL} from "../../common/constantData/screenUrl";
import { fetchFeatureAPIGet } from "../../common/apiCall/api";
import Divider from "@mui/material/Divider";
import { PLAN_DURATION, PLAN_STORAGE } from "../../common/constantData/constants";
import { Button, message, Upload } from "antd";
import Loading from "src/components/Loading";
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


const TabAccount = (props) => {
  // ** State
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState(props?.userProfile);
  const [loading2, setLoading2] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedData, setConvertedData] = useState("");
  const [previewImage, setPreviewImage] = useState(details?.photo);

  useEffect(() => {
    setTimeout(() => {
      setLoading2(2);
    }, 2000);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ownProfileDetailsAPIGet();
        setDetails(data?.data?.user);
        setPreviewImage(data?.data?.user?.photo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [loading]);



  const handleSubmit = (data) => {
    
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
      } if (key === 'photo' && data[key].startsWith('http')) {
        delete data[key];
      }
    }
    
    ownProfileUpdateApiCall(data )
      .then((res) => {
        console.log('.......cc...props?.userProfile.........sdfdsfsfsfsf....', res)
        props.setUserProfileToReducerProp(res?.data);

        setResponseMessage(USER.UPDATE_SUCCESS_MESSAGE);
        setOpenAlert(true);
        setLoading(true)
        setTimeout(()=>{
          setLoading(false);
        },2000)

      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(()=>{
    console.log('...................props?.userProfile....', props?.userProfile)

  },[props?.userProfile])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(USER.REQUIRED.NAME),
    email: Yup.string()
    .email("Invalid email format")
    .required(USER.REQUIRED.EMAIL)
    .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format"),
    mobile: Yup.string()
    .matches(/^01[0-9]{9}$/, "Invalid phone number")
    .required(USER.REQUIRED.PHONE),

  });


  const [openAlert, setOpenAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");





  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert(false);
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
    {loading2 === 2?(
      <CardContent>
      <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Formik
                    initialValues={{
                      id: id,
                      name: details?.name || "",
                      email: details?.email || "",
                      mobile: details?.mobile || "",
                      photo: details?.photo || convertedData,
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
                                  backgroundColor: '#69B128',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '5px',
                                }}>Pick File</Button>
                              </Upload>

                            </div>
                          </Grid>
                          <Grid item xs={6}>
                          {previewImage && (
                            <>
                              <img
                                src={previewImage}
                                alt="Preview"
                                style={{ width: "70px",height:"70px", marginTop: "10px" }}
                              />
                              </>
                            )}
                            </Grid>
                          <Grid item xs={12}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {USER.NAME} <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                name="name"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {USER.EMAIL} <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                name="email"
                                as={TextField}
                                type="email"
                                fullWidth
                              />
                              {touched.email && errors.email && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.email}</div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {USER.PHONE} <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                name="mobile"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.mobile && errors.mobile && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.mobile}</div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div style={{ width: "100%" }}>
                              <Link href={"/"}>
                                <LoadingButton
                                   //loading={loading}
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
                                 loading={loading}
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
                                {UPDATE}
                              </LoadingButton>
                              <Alert
                                open={openAlert}
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
    ):(<Loading/>)}


    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TabAccount);
