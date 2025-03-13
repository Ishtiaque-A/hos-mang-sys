import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  Container,
  Card,
  Typography,
  Stack,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  subscriptionRequestDetailsAPIGet,
  subscriptionAcceptApiCall,
  subscriptionPlanListAPIGet,
  subscriptionRequestMultipleStatusChanteApiCall,
} from "../../common/apiCall/api";
import {
  SUBSCRIBE,
  SUBSCRIPTION_PLAN,
  SUBSCRIPTION_PLAN_REQUEST,
} from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Loading from "src/components/Loading";

const businessOptions = [
  { name: "B2B", value: "B2B", id: 1 },
  { name: "B2C", value: "B2C", id: 2 },
];

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(businessOptions[0]);

  useEffect(() => {
    //Promise Chain
    subscriptionPlanListAPIGet(id)
      .then((response) => {
        if (response?.code == 200) {
          setOptions(response?.data?.subscription_plans);
        }
        return subscriptionRequestDetailsAPIGet(id);
      })
      .then((response) => {
        if (response?.code == 200) {
          setDetails(response?.data?.subscription_request);
          setLoading(false);
          setSelectedOption(response?.data?.subscription_request?.subscription_plan);
        }
      })
      .catch(() => {
        setResponseMessage("Unable to fetch data");
        setOpenAlert2(true);
      });
  }, [refresh]);

  const initialValues = {
    subscription_plan_id: selectedOption?.id || null,
    subscription_request_id: details?.id,
    business_type: businessOptions[0].name,
    status: 2,
  };

  console.log(details, "initialValues");
  const validationSchema = Yup.object().shape({
    subscription_plan_id: Yup.string().required(SUBSCRIBE.ERROR_SUBSCRIPTION_PLAN),
    business_type: Yup.string().required("This field is required"),
  });

  const status = (status) => {
    if (status == 0) return SUBSCRIPTION_PLAN_REQUEST.PENDING;
    if (status == 1) return SUBSCRIPTION_PLAN_REQUEST.REVIEWING;
    if (status == 2) return SUBSCRIPTION_PLAN_REQUEST.ACCEPTED;
    if (status == 3) return SUBSCRIPTION_PLAN_REQUEST.REJECTED;
  };

  const handleSubmit = (data) => {
    setLoading(true);
    subscriptionAcceptApiCall(data)
      .then((res) => {
        setLoading(false);
        if (res.code == 200) {
          setResponseMessage(SUBSCRIBE.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setOpen(false);
          setTimeout(() => {
            router.push(ADMIN.SUBSCRIPTION_REQUEST);
          }, 3000);
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
            setResponseMessage(res?.message ?? SUBSCRIBE.ADD_ERROR_MESSAGE);
            setOpenAlert2(true);
          }
        }
        setLoading(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setLoading(false);

        setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
        setRefresh(!refresh);
      });
  };

  const handleMultipleStatusChange = (status) => {
    subscriptionRequestMultipleStatusChanteApiCall({ id: [id], status: status })
      .then((res) => {
        if (res.code == 200) {
          setResponseMessage(SUBSCRIPTION_PLAN_REQUEST.ADD_DELETE_MESSAGE);
          setOpenAlert1(true);
        } else {
          if (Object.keys(res?.errors).length > 0) {
            for (let field in res?.errors) {
              if (res.errors[field]) {
                let errorMessages = res.errors[field];
                for (let i = 0; i < errorMessages.length; i++) {
                  let errorMessage = errorMessages[i];
                  setResponseMessage(errorMessage);
                  location.reload();
                }
              }
            }
          } else {
            setResponseMessage(res.message);
            setOpenAlert2(true);
          }
        }
      })
      .catch((error) => {
        setResponseMessage(SUBSCRIPTION_PLAN.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
    setRefresh(!refresh);
  };

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  return (
    <>
      <Head>
        <title>{SUBSCRIBE.SUBSCRIBE_DETAILS} </title>
      </Head>

      {loading == false ? (
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
                      {SUBSCRIBE.SUBSCRIBE_DETAILS}
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
                <Box sx={{ flexGrow: 1, width: "80%", margin: "0 auto", marginTop: "2rem" }}>
                  <Grid container spacing={2} sx={{ color: "#545353", marginBottom: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {SUBSCRIBE.MAME} :
                    </Grid>
                    <Grid xs={8}>{details.name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {SUBSCRIBE.EMAIL} :
                    </Grid>
                    <Grid xs={8}>{details?.email}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {SUBSCRIBE.PHONE} :
                    </Grid>
                    <Grid xs={8}>{details?.mobile}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {SUBSCRIBE.SUBSCRIPTION_PLAN} :
                    </Grid>
                    <Grid xs={8}>
                      {details?.subscription_plan?.name}{" "}
                      <Link
                        href={`${ADMIN.SUBSCRIPTION_PLAN_LIST}/${details?.subscription_plan?.id}}`}
                      >
                        <Button
                          style={{ border: "1px solid #5BAD91", padding: "6px", color: "#5BAD91" }}
                        >
                          Show more
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {SUBSCRIBE.COUNTRY} :
                    </Grid>
                    <Grid xs={8}>{details?.country}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {SUBSCRIBE.MESSAGE} :
                    </Grid>
                    <Grid xs={8}>{details?.message}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      Status :
                    </Grid>
                    <Grid xs={8}>{status(details?.status)}</Grid>
                  </Grid>

                  {[0, 1, 3].includes(parseInt(details?.status)) && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{
                          background: "#089B1A",
                          color: "white",
                          border: "",
                          marginTop: "1rem",
                          float: "right",
                          marginBottom: "1rem",
                          padding: "3px",
                          "&:hover": {
                            background: "#10741C",
                          },
                        }}
                      >
                        {SUBSCRIBE.ACCEPT}
                      </Button>

                      {details?.status != 3 && (
                        <Button
                          variant="contained"
                          onClick={() => handleMultipleStatusChange(3)}
                          sx={{
                            background: "red",
                            color: "white",
                            border: "",
                            marginTop: "1rem",
                            float: "right",
                            marginBottom: "1rem",
                            marginLeft: "10px",
                            marginRight: "10px",
                            padding: "3px",
                            "&:hover": {
                              background: "#10741C",
                            },
                          }}
                        >
                          {SUBSCRIBE.CANCEL}
                        </Button>
                      )}
                    </>
                  )}
                  <Grid item xs={6}>
                    <div style={{ width: "100%" }}>
                      <Link href={ADMIN.SUBSCRIPTION_REQUEST_LIST}>
                        <Button
                          // loading={loading}
                          variant="contained"
                          sx={{
                            background: "white",
                            padding: "3px",
                            color: "#4287DA",
                            mt: 2,
                            ml: -3,
                            float: "",
                            "&:hover": {
                              background: "#10741C",
                              color: "white",
                            },
                          }}
                        >
                          BACK
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                  >
                    <DialogTitle>Select {SUBSCRIBE.SUBSCRIPTION_PLAN}</DialogTitle>
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
                            <Grid
                              container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              sx={{ marginTop: "2rem" }}
                            >
                              <Grid item xs={12}>
                                {/* <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                              {SUBSCRIBE.SUBSCRIPTION_PLAN} <span style={{ color: "red" }}>*</span>
                            </label> */}
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
                                          error={
                                            form.errors.subscription_plan_id &&
                                            form.touched.subscription_plan_id
                                          }
                                          helperText={
                                            form.errors.subscription_plan_id &&
                                            form.touched.subscription_plan_id &&
                                            form.errors.subscription_plan_id
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
                                <Field name="business_type" as={Autocomplete}>
                                  {({ field, form }) => (
                                    <Autocomplete
                                      {...field}
                                      value={selectedBusiness}
                                      onChange={(event, newValue) => {
                                        setSelectedBusiness(newValue);
                                        form.setFieldValue(
                                          "business_type",
                                          newValue ? newValue.name : null
                                        );
                                      }}
                                      options={businessOptions}
                                      getOptionLabel={(option) => option.name}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          size="small"
                                          variant="outlined"
                                          error={
                                            form.errors.business_type && form.touched.business_type
                                          }
                                          helperText={
                                            form.errors.business_type &&
                                            form.touched.business_type &&
                                            form.errors.business_type
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

                              <Grid item xs={12}>
                                <div>
                                  <DialogActions sx={{ marginLeft: "150px" }}>
                                    <Button type="submit">SUBMIT</Button>
                                  </DialogActions>
                                </div>
                              </Grid>
                            </Grid>
                          </Form>
                        )}
                      </Formik>
                    </Box>
                  </Dialog>
                  <Alert open={openAlert1} onClose={handleAlertClose} message={responseMessage} />
                  <Alert2 open={openAlert2} onClose={handleAlertClose} message={responseMessage} />
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

export default Page;