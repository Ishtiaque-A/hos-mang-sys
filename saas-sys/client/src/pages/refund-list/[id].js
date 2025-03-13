import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import DialogTitle from '@mui/material/DialogTitle';
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
  statusUpdateApiCall,
  refoundDetailsAPIGet,
} from '../../common/apiCall/api';
import { SUBSCRIBE, SUBSCRIPTION_PLAN_REQUEST,CANCEL_REQUEST,REFOUND } from '../../common/constantData/language';
import { ADMIN } from "../../common/constantData/screenUrl";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Loading from "src/components/Loading";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([
    {id:0,name:"Rejected"},
    {id:1,name:"Initiate"},
    {id:2,name:"In progress"},
    {id:3,name:"Closed"},
  ]);
  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    //Promise Chain
    refoundDetailsAPIGet(id)
      .then((response)=>{
        if (response?.code==200){
          setDetails(response?.data);
          setLoading(false)
        }
        
      }).catch (()=> {
      setResponseMessage('Unable to fetch data');
      setOpenAlert2(true);
    })
  }, [open]);




  const initialValues = {
    id:id,
    account_details:"",
    refund_note: "",
    refund_reference:details?.refund_reference || "",
    status: null,
  };

  console.log(initialValues,"initialValues")
  const validationSchema = Yup.object().shape({
   
  });

  const status = (status) => {
    if (status == 0) return SUBSCRIPTION_PLAN_REQUEST.PENDING;
    if (status == 1) return SUBSCRIPTION_PLAN_REQUEST.REVIEWING;
    if (status == 2) return SUBSCRIPTION_PLAN_REQUEST.ACCEPTED;
    if (status == 3) return SUBSCRIPTION_PLAN_REQUEST.REJECTED;
  };

  const handleSubmit = (data) => {
    statusUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(SUBSCRIBE.ADD_SUCCESS_MESSAGE);
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
  };

  

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  return (
    <>
      <Head>
        <title>{REFOUND.DETAILS_TITLE} </title>
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
                {REFOUND.DETAILS_TITLE}
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
              <Grid container spacing={2} sx={{ color: "#545353" , marginBottom: "20px"}}>
                <Grid xs={4} sx={{ fontWeight: "bold" }}>
                  {REFOUND.NAME} :
                </Grid>
                <Grid xs={8}>{details?.cancel_request?.purchase?.organization?.name}</Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={4} sx={{  fontWeight: "bold" }}>
                  {REFOUND.SUBSCRIPTION_PLAN} :
                </Grid>
                <Grid xs={8} >
                {details?.cancel_request?.purchase?.subscription_plan?.name}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={4} sx={{  fontWeight: "bold" }}>
                  {REFOUND.AMOUNT} :
                </Grid>
                <Grid xs={8} >
                {details?.amount}
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={4} sx={{  fontWeight: "bold" }}>
                  {REFOUND.STATUS} :
                </Grid>
                <Grid xs={8}>
                {details?.status === "0" ?(<>Rejected</>):details?.status === "1" ?(<>Initiate</>):details?.status === "2" ?(<>In progress</>):(<>Closed</>)}
                </Grid>
              </Grid>
              {/* <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={4} sx={{ fontWeight: "bold" }}>
                  {REFOUND.ACCOUNT_DETAILS} :
                </Grid>
                <Grid xs={8} >
                {details?.account_details}
                </Grid>
              </Grid> */}
              <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={4} sx={{  fontWeight: "bold" }}>
                  {REFOUND.REFOUND_REFERENCE} :
                </Grid>
                <Grid xs={8}>
                {details?.refund_reference}
                </Grid>
              </Grid>
              {/* <Grid container spacing={2} sx={{ color: "#545353", marginTop: "20px" }}>
                <Grid xs={4} sx={{  fontWeight: "bold" }}>
                  {REFOUND.REFOUND_NOTE} :
                </Grid>
                <Grid xs={8}>
                {details?.refund_note}
                </Grid>
              </Grid> */}
              
              

              {details?.status == "1"  && 
                <>
                   <Button
                     variant="contained"
                     onClick={()=>setOpen(true)}
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
                     {REFOUND.STATUS_UPDATE}
                   </Button>

                  
              </>
               } 
              <Grid item xs={6}>
                <div style={{ width: "100%" }}>
                  <Link href={ADMIN.REFUND_LIST}>
                    <Button
                      // loading={loading}
                      variant="contained"
                      sx={{
                        background: "white",
                        padding: "3px",
                        color: "#4287DA",
                        mt: 2,
                        ml:-3,
                        float: "",
                        "&:hover": {
                          background: "#10741C",
                          color:"white",
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
                onClose={()=>setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth= {true}
              >
                <DialogTitle> {CANCEL_REQUEST.ACCEPT_Request}</DialogTitle>
                <Box
                  sx={{
                    width:"90%",
                    justifyContent:"center",
                    margin:"0 auto",
                    mt:"-40px",
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
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {REFOUND.ACCOUNT_DETAILS} <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field
                                size="small"
                                variant="outlined"
                                sx={{
                                  mb: 2,
                                  background:"rgb(246, 247, 247)",
                                  "& input": {
                                    color: "#4F4D4D" // Replace "blue" with your desired color value
                                  }
                                }}
                                name="account_details"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.account_details && errors.account_details && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.account_details}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {REFOUND.NOTE} <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field
                                size="small"
                                variant="outlined"
                                sx={{
                                  mb: 2,
                                  background:"rgb(246, 247, 247)",
                                  "& input": {
                                    color: "#4F4D4D" // Replace "blue" with your desired color value
                                  }
                                }}
                                name="refund_note"
                                as={TextField}
                                type="text"
                                rows={4} 
                                fullWidth
                                multiline
                              />
                              {touched.refund_note && errors.refund_note && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.refund_note}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {REFOUND.REFOUND_REFERENCE} <span style={{ color: "red" }}>*</span>
                              </label>

                              <Field
                                size="small"
                                variant="outlined"
                                sx={{
                                  mb: 2,
                                  background:"rgb(246, 247, 247)",
                                  "& input": {
                                    color: "#4F4D4D" // Replace "blue" with your desired color value
                                  }
                                }}
                                name="refund_reference"
                                as={TextField}
                                type="text"
                                fullWidth
                              />
                              {touched.refund_reference && errors.refund_reference && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    marginTop: "-20px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  {errors.refund_reference}
                                </div>
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                              {REFOUND.STATUS} <span style={{ color: "red" }}>*</span>
                            </label>
                            <Field name="status" as={Autocomplete}>
                              {({ field, form }) => (
                                <Autocomplete
                                  {...field}
                                  value={selectedOption}
                                  onChange={(event, newValue) => {
                                    setSelectedOption(newValue);
                                    form.setFieldValue(
                                      "status",
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
                                        background:"rgb(246, 247, 247)",
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
                              <DialogActions sx={{marginLeft:"150px"}}>
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
      ): (
        <Loading/>
      )}

    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
