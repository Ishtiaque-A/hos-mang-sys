import { useEffect, useState } from "react";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
// import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Grid,
  Autocomplete,
  CardContent,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Alert from "../../components/Alert";
import { subscriptionRequestCreateApiCall,subscriptionPlanListAPIGet } from "../../common/apiCall/api";
import {BACK,SUBMIT, SUBSCRIBE } from "../../common/constantData/language";
import { LOGIN_SCREEN_URL } from "../../common/constantData/screenUrl";

const Page = () => {
  const router = useRouter();
  const [subscriptionData, setSubscriptionData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await subscriptionPlanListAPIGet();
        const SubscriptionList = response?.data;
        setSubscriptionData(SubscriptionList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);



  const [openAlert, setOpenAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);


  useEffect(()=>{
    setOptions(subscriptionData)
  },[subscriptionData])

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert(false);
  };

  const initialValues = {
    name: "",
    email: "",
    subscription_plan_id: 0,
    mobile: "",
    country: "",
    message: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(SUBSCRIBE.ERROR_NAME),
    email: Yup.string().required(SUBSCRIBE.ERROR_EMAIL),
    mobile: Yup.string().required(SUBSCRIBE.ERROR_PHONE),
    country: Yup.string().required(SUBSCRIBE.ERROR_COUNTRY),
  });

  const handleSubmit = (data) => {
    subscriptionRequestCreateApiCall(data)
      .then((res) => {
        setResponseMessage(SUBSCRIBE.ADD_SUCCESS_MESSAGE);
        setOpenAlert(true);
        console.log('login..................')
        //router.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>{SUBSCRIBE.TITLE}</title>
      </Head>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            {SUBSCRIBE.COMPANY_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 950,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <Container maxWidth="xl">
            <Card sx={{marginTop: "-5rem"}}>
            <Stack spacing={3}>
                  <Stack direction="row" justifyContent="space-between" spacing={4}>
                    <Stack spacing={1} sx={{textAlign:"center"}}>
                      <Typography
                        variant="h6"
                        sx={{ borderBottom: "3px solid #006cb8", padding: "8px", color: "#006cb8", margin:'o auto',width:"400%",fontFamily: "-apple-system" ,fontSize:"2rem"}}
                      >
                        {SUBSCRIBE.TITLE}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "-2rem" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={initialValues}
                      onSubmit={handleSubmit}
                      validationSchema={validationSchema}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form>
                           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "2rem" }}>
                           <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.MAME} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="name"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.EMAIL} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="email"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={12}>
                          <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                          {SUBSCRIBE.SUBSCRIPTION_PLAN} <span style={{ color: "red" }}>*</span>
                              </label>
                            <Field name="subscription_plan_id" as={Autocomplete}>
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption}
                                  onChange={(event, newValue) => {
                                    setSelectedOption(newValue);
                                    form.setFieldValue(
                                      "subscription_plan_id",
                                      newValue ? Number(newValue.id) : null
                                    );
                                  }}
                                  options={options}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      size="small"
                                      variant="outlined"
                                      error={form.errors.status && form.touched.parent}
                                      helperText={
                                        form.errors.parent &&
                                        form.touched.parent &&
                                        form.errors.parent
                                      }
                                      sx={{
                                        width: "100%",
                                        marginBottom: "20px",
                                      }}
                                    />
                                  )}
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.PHONE} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="mobile"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.COUNTRY} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.country && errors.country && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.country}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="country"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={12}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.MESSAGE}  <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.details && errors.details && (
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  {errors.details}
                                </div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="message"
                                as={TextField}
                                multiline
                                rows={4}
                                type="text"
                                fullWidth
                              />
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <Divider />
                            <div style={{ width: "100%" }}>
                              <Link href={LOGIN_SCREEN_URL}>
                              <Button
                                // loading={loading}
                                variant="contained"
                                sx={{
                                  background: "white",
                                  color: "#4287DA",
                                  mb: 2,
                                  float: "",
                                }}
                              >
                                {BACK}
                              </Button>
                              </Link>
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <Divider />
                            <div style={{ width: "100%" }}>
                              <Button
                                type="submit"
                                color="primary"
                                // loading={loading}
                                variant="contained"
                                sx={{
                                  background: "#00467a",
                                  color: "white",
                                  mb: 2,
                                  float: "right",
                                }}
                              >
                                {SUBMIT}
                              </Button>
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
              </Box>
            </Card>
          </Container>
        </Box>
      </Box>
      <footer style={{ textAlign: "center", padding: "16px", background: "#4a4eea" }}>
        <Typography variant="body2" color="#FFFF">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
      </footer> */}


      <>
      <div
        className="loginPaseLogo"
        style={{ textAlign: "center", marginBottom: "1rem" }}
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
          <Grid item xs={12} md={5} sm={12}>
             
                <CardContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                           <Grid item xs={2}><GoogleIcon/></Grid>
                           <Grid item xs={10}>
                           <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0", fontWeight:600 }}
                      >
                        Save 48% on maintenance costs with Fleetio
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      -- SmartWatt Case Study
                      </Typography>
                           </Grid>
                           </Grid>
                           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop:"2rem"}}>
                           <Grid item xs={2}><GoogleIcon/></Grid>
                           <Grid item xs={10}>
                           <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0" ,fontWeight:600 }}
                      >
                        Reduce time spent on inspections by 83%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      -- SmartWatt Case Study
                      </Typography>
                           </Grid>
                           </Grid>

                           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginTop:"2rem"}}>
                           <Grid item xs={2}><GoogleIcon/></Grid>
                           <Grid item xs={10}>
                           <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0",fontWeight:600  }}
                      >
                       Run fleet reports 10x faster than before
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      -- SmartWatt Case Study
                      </Typography>
                           </Grid>
                           </Grid>
                  <div>
                    <Divider/>
                    <CardContent>

                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ margin: "-13px 0 8px 0" ,fontWeight:600 }}
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
              
            </Grid>

            <Grid item xs={12} md={6} sm={12} sx={{ marginRight: "15px" }}>
              <Card sx={{ minWidth: 275 }}>

                <CardContent>
                
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center", fontWeight: "bold", letterSpacing: ".01em" }}
                  >
                    Start your 14-day free trial of Fleetio
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16, textAlign: "center", padding: "5px" }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Already have an account?
                    <a href="/" style={{ textDecoration: "none", color: "#3498db" }}>
                    Log in
                    </a>
                  </Typography>

                  <Formik
                   initialValues={initialValues}
                      onSubmit={handleSubmit}
                      validationSchema={validationSchema}
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
                      <Form>
                           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "2rem" }}>
                           <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.MAME} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="name"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.EMAIL} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="email"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={12}>
                          <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                          {SUBSCRIBE.SUBSCRIPTION_PLAN} <span style={{ color: "red" }}>*</span>
                              </label>
                            <Field name="subscription_plan_id" as={Autocomplete}>
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption}
                                  onChange={(event, newValue) => {
                                    setSelectedOption(newValue);
                                    form.setFieldValue(
                                      "subscription_plan_id",
                                      newValue ? Number(newValue.id) : null
                                    );
                                  }}
                                  options={options}
                                  getOptionLabel={(option) => option.name}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      size="small"
                                      variant="outlined"
                                      error={form.errors.status && form.touched.parent}
                                      helperText={
                                        form.errors.parent &&
                                        form.touched.parent &&
                                        form.errors.parent
                                      }
                                      sx={{
                                        width: "100%",
                                        marginBottom: "20px",
                                      }}
                                    />
                                  )}
                                />
                              )}
                            </Field>
                          </Grid>
                          <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.PHONE} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.name && errors.name && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="mobile"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={6}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.COUNTRY} <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.country && errors.country && (
                                <div style={{ color: "red", fontSize: "12px" }}>{errors.country}</div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="country"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                            </div>
                           </Grid>
                           <Grid item xs={12}>
                            <div>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                            {SUBSCRIBE.MESSAGE}  <span style={{ color: "red" }}>*</span>
                              </label>
                              {touched.details && errors.details && (
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  {errors.details}
                                </div>
                              )}
                              <Field
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                name="message"
                                as={TextField}
                                multiline
                                rows={4}
                                type="text"
                                fullWidth
                              />
                            </div>
                          </Grid>
                         
                          <Grid item xs={12}>
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
                            {SUBMIT}
                          </Button>
                        </div>
                          </Grid>
                           </Grid>
                        </Form>
                    )}
                  </Formik>
                  
                </CardContent>
              </Card>
            </Grid>

            
          </Grid>
        </Box>
      </div>
    </>
    </>
  );
};

// Page.getLayout = (page) => (
//   <AuthLayout>
//     {page}
//   </AuthLayout>
// );

export default Page;
