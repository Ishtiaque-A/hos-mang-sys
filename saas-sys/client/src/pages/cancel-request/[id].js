import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
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
import { acceptCancelRequestApiCall, cancelRequestDataAPIGet } from "../../common/apiCall/api";
import {
  SUBSCRIBE,
  SUBSCRIPTION_PLAN_REQUEST,
  CANCEL_REQUEST,
} from "../../common/constantData/language";
import { ADMIN } from "../../common/constantData/screenUrl";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Loading from "src/components/Loading";
import { connect } from "react-redux";
import getGlobalState from "../../stateManagement/global/globalSelector";
import { format } from "date-fns";

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});
const Page = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Promise Chain
    cancelRequestDataAPIGet(id)
      .then((response) => {
        if (response?.code == 200) {
          setDetails(response?.data);
          setLoading(false);
        }
      })
      .catch(() => {
        // setResponseMessage("Unable to fetch data");
        // setOpenAlert2(true);
        console.error("Unable to fetch data");
      });
  }, []);

  const initialValues = {
    id: id,
    note: "",
    amount: null,
    status: 1,
  };

  console.log(details, "initialValues");
  const validationSchema = Yup.object().shape({
    note: Yup.string().required(CANCEL_REQUEST.REQUIRED.NOTE),
    amount: Yup.string().required(CANCEL_REQUEST.REQUIRED.AMOUNT),
  });

  const status = (status) => {
    if (status == 0) return SUBSCRIPTION_PLAN_REQUEST.PENDING;
    if (status == 1) return SUBSCRIPTION_PLAN_REQUEST.REVIEWING;
    if (status == 2) return SUBSCRIPTION_PLAN_REQUEST.ACCEPTED;
    if (status == 3) return SUBSCRIPTION_PLAN_REQUEST.REJECTED;
  };

  const handleSubmit = (data) => {
    console.log(data,"data")
    if(details?.purchase?.sell_price >= data.amount){
      acceptCancelRequestApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SUBSCRIBE.GENERIC_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setOpen(false);
          // setTimeout(() => {
          //   router.push(ADMIN.SUBSCRIPTION_REQUEST);
          // }, 3000);
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
      })
      .catch((err) => {
        setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
    }else {
              setResponseMessage("Invalid amount");
              setOpenAlert2(true);
            }
    
  };

  const handleSubmit2 = () => {
    const data = {
      id: id,
      status: 0,
      amount: 0,
    };
    acceptCancelRequestApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SUBSCRIBE.ADD_SUCCESS_MESSAGE2);
          setOpenAlert1(true);
          setOpen(false);
          // setTimeout(() => {
          //   router.push(ADMIN.SUBSCRIPTION_REQUEST);
          // }, 3000);
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
      })
      .catch((err) => {
        setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
      setOpen2(false)
  };

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const startDate = details?.purchase?.subscription_detail?.start_date
    ? format(new Date(details?.purchase?.subscription_detail?.start_date), "MMMM dd, yyyy")
    : "N/A";
  const endDate = details?.purchase?.subscription_detail?.end_date
    ? format(new Date(details?.purchase?.subscription_detail?.end_date), "MMMM dd, yyyy")
    : "N/A";

  return (
    <>
      <Head>
        <title>{SUBSCRIBE.SUBSCRIBE_DETAILS} </title>
      </Head>

      {loading === false ? (
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
                      {CANCEL_REQUEST.NAME} :
                    </Grid>
                    <Grid xs={8}>{details?.purchase?.organization?.name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.ADDRESS} :
                    </Grid>
                    <Grid xs={8}>{details?.purchase?.organization?.address}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.CONTUCT_P_NAME} :
                    </Grid>
                    <Grid xs={8}>{details?.purchase?.organization?.contact_person_name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.CONTUCT_P_MOBAILE} :
                    </Grid>
                    <Grid xs={8}>{details?.purchase?.organization?.contact_person_mobile}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.CONTUCT_P_EMAIL} :
                    </Grid>
                    <Grid xs={8}>{details?.purchase?.organization?.contact_person_email}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.SUBSCRIPTION_PLAN} :
                    </Grid>
                    <Grid xs={8}>{details?.purchase?.subscription_plan?.name}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.START_DATE} :
                    </Grid>
                    <Grid xs={8}>{startDate}</Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.END_DATE} :
                    </Grid>
                    <Grid xs={8}>{endDate}</Grid>
                  </Grid>

                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.PAID_AMOUNT} :
                    </Grid>
                    <Grid xs={8}>
                      {details?.purchase?.sell_price ? details?.purchase?.sell_price : 0}{" "}
                      {props.currency}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                    <Grid xs={4} sx={{ fontWeight: "bold" }}>
                      {CANCEL_REQUEST.STATUS} :
                    </Grid>
                    <Grid xs={8}>
                      {details?.status == "0" ? (
                        <>Rejected</>
                      ) : details?.status == "1" ? (
                        <>Accepted</>
                      ) : (
                        <>Pending</>
                      )}
                    </Grid>
                  </Grid>

                  {details?.status == "2" && (
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
                        {CANCEL_REQUEST.ACCEPT}
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => setOpen2(true)}
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
                        {CANCEL_REQUEST.REJECT}
                      </Button>
                    </>
                  )}
                  <Grid item xs={6}>
                    <div style={{ width: "100%" }}>
                      <Link href={ADMIN.CANCEL_REQUEST_LIST}>
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
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <DialogTitle> {CANCEL_REQUEST.ACCEPT_Request}</DialogTitle>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          marginTop: "10px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <CloseIcon onClick={() => setOpen(false)} />
                      </div>
                    </div>

                    <Box
                      sx={{
                        width: "90%",
                        justifyContent: "center",
                        margin: "0 auto",
                        mt: "-40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "& > *": {},
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
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {CANCEL_REQUEST.NOTE} <span style={{ color: "red" }}>*</span>
                                  </label>

                                  <Field
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      mb: 2,
                                      background: "rgb(246, 247, 247)",
                                      "& input": {
                                        background: "rgb(246, 247, 247)",
                                        color: "#4F4D4D", // Replace "blue" with your desired color value
                                      },
                                    }}
                                    name="note"
                                    as={TextField}
                                    type="text"
                                    rows={4}
                                    fullWidth
                                    multiline
                                  />
                                  {touched.note && errors.note && (
                                    <div
                                      style={{
                                        color: "red",
                                        fontSize: "12px",
                                        marginTop: "-20px",
                                        marginLeft: "15px",
                                      }}
                                    >
                                      {errors.note}
                                    </div>
                                  )}
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {CANCEL_REQUEST.AMOUNT} <span style={{ color: "red" }}>*</span>
                                  </label>

                                  <Field
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      mb: 2,
                                      "& input": {
                                        background: "rgb(246, 247, 247)",
                                        color: "#4F4D4D", // Replace "blue" with your desired color value
                                      },
                                    }}
                                    name="amount"
                                    as={TextField}
                                    type="number"
                                    inputProps={{
                                      min: 0 // Set the minimum value to 0 to prevent negative values
                                    }}
                                    fullWidth
                                  />
                                  {touched.amount && errors.amount && (
                                    <div
                                      style={{
                                        color: "red",
                                        fontSize: "12px",
                                        marginTop: "-20px",
                                        marginLeft: "15px",
                                      }}
                                    >
                                      {errors.amount}
                                    </div>
                                  )}
                                </div>
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
                  <Dialog
                    open={open2}
                    onClose={() => setOpen2(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <DialogTitle> {CANCEL_REQUEST.REJECT_Request}</DialogTitle>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          width: "50%",
                          marginTop: "10px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <CloseIcon onClick={() => setOpen2(false)} />
                      </div>
                    </div>

                    <Box
                      sx={{
                        width: "90%",
                        justifyContent: "center",
                        margin: "0 auto",
                        mt: "-40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "& > *": {},
                      }}
                    >
                      
                      
                      <Grid item xs={5}>
                        <div>
                        <Typography sx={{fontSize:"24px",marginTop:"20px"}}>Are you want reject request?</Typography>
                          <DialogActions sx={{ marginLeft: "120px",width:"100%" }}>
                            <Button onClick={handleSubmit2} type="submit">
                              SUBMIT
                            </Button>
                          </DialogActions>
                        </div>
                      </Grid>
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

export default connect(mapStateToProps)(Page);
