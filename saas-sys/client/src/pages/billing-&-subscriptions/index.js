import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { connect } from "react-redux";
import { Box, Button, Container, Stack, Typography, Card, Grid, TextField } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {
  couponApiCall,
  fetchUpgradeableAPIGet,
  subscriptionUpgradeApiCall,
  cancelApiCall,
  paymentSuccessApiCall,
} from "../../common/apiCall/api";
import { LoadingButton } from "@mui/lab";
import { BILLING, SUBSCRIPTIONS, SUBSCRIPTION_DETAILS } from "../../common/constantData/language";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import Alert from "../../components/Alert";
import Alert2 from "../../components/Alert2";
import Alert3 from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Divider from "@mui/material/Divider";
import LensIcon from "@mui/icons-material/Lens";
import * as Yup from "yup";
import getGlobalState from "../../stateManagement/global/globalSelector";

const now = new Date();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const mapStateToProps = (state) => ({
  currency: getGlobalState(state)?.currency,
});

const Page = (props) => {
  const [specialPlan, setSpacialPlan] = useState(null);
  const [data, setData] = useState([]);
  const [primaryPlan, setPrimaryPlan] = useState([]);
  const [seeMore, setSeeMore] = useState(0);
  const [modal, setModal] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [details, setDetails] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [purchaseData2, setPurchaseData2] = useState(null);
  const [coupon, setCoupon] = useState();
  const [loading, setLoading] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const router = useRouter();
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const option = { weekday: "short", year: "numeric", month: "short", day: "2-digit" };
  console.log(selectedData, "selectedData");

  useEffect(() => {
    fetchUpgradeableAPIGet().then((response) => {
      setData(response?.data?.subscription_plans);
      setSpacialPlan(response?.data?.special_plans ?? null);
      setPrimaryPlan(response?.data?.current_plan);
    });
  }, []);

  const initialValues = {
    coupon_id: "",
    plan_id: details.id || null,
  };

  const cancelinitialValues = {
    reason: "",
  };

  const validationSchema = Yup.object().shape({
    coupon_id: Yup.string().required(SUBSCRIPTIONS.REQUIRED.COUPON),
  });

  const cancelvalidationSchema = Yup.object().shape({
    reason: Yup.string().required(SUBSCRIPTIONS.REQUIRED.REASON),
  });

  const handleSubmit = (data) => {
    setLoading(true);
    couponApiCall(data)
      .then((res) => {
        console.log(res, "res");
        if (res.code === 200) {
          setLoading(false);
          setCoupon(res.data);
          if (res?.data?.discount == 0) {
            setResponseMessage("Coupon is not valid");
            setOpenAlert2(true);
          } else {
            setResponseMessage("Coupon is not valid");
            setOpenAlert1(true);
          }
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
            // setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
            setOpenAlert2(true);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        // setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const cancelhandleSubmit = (value) => {
    const cancelData = {
      purchase_id: purchaseData2,
      reason: value.reason,
    };
    setLoading(true);
    cancelApiCall(cancelData)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(res.message);
          setOpenAlert1(true);

          setTimeout(() => {
            setLoading(false);
            setOpen3(false);
          }, 3000);
        } else if (res.code === 422) {
          setResponseMessage(res.message);
          setOpenAlert1(true);

          setTimeout(() => {
            setOpen3(false);
            setLoading(false);
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
            setLoading(false);
          } else {
            // setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
            setOpenAlert2(true);
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        // setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const handleClose = () => {
    setModal(false);
    setDeletingCouponId(null);
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const handlePurchasePlanButton = () => {
    const data = {
      purchase_attempt_id: purchaseData?.id,
      amount: selectedData?.price,
      status: "1",
    };
    paymentSuccessApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(res.message);
          setOpenAlert1(true);

          setTimeout(() => {
            setOpen2(false);
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
            setOpenAlert2(true);
          }
        }
      })
      .catch((err) => {
        setOpenAlert2(true);
      });
  };

  const handlePurchasePlan = () => {
    const data = {
      subscription_id: details?.id,
      actual_price: details?.price,
      sell_price: coupon?.price || details?.price,
      coupon_id: coupon?.is_valid?.id || null,
    };
    setLoading(true);
    subscriptionUpgradeApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          console.log(res, "res>>>>>");
          setResponseMessage(res.message);
          setOpenAlert1(true);
          router.push(res.data.url);
          setTimeout(() => {
            setOpen(false);
            setLoading(false);
          }, 3000);
        } else if (res.code === 442) {
          setResponseMessage(res.message);
          setOpenAlert1(true);

          setTimeout(() => {
            setOpen(false);
            setLoading(false);
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
            // setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
            setOpenAlert2(true);
          }
        }
      })
      .catch((err) => {
        // setResponseMessage(SUBSCRIBE.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };
  console.log(coupon, "coupon>>>>>");
  console.log(details, "details>>>>>");
  const label = { inputProps: { "aria-label": "I agree with the terms & conditions" } };
  return (
    <>
      <Head>
        <title>
          <title>{BILLING.TITLE}</title>
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop: "1%",
          bgcolor: "#F6F7F7",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                  {BILLING.TITLE}
                </Typography>
              </Stack>
            </Stack>

            {primaryPlan?.end_date ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                {new Date(primaryPlan?.end_date) > new Date(formattedDate) ? (
                  <></>
                ) : (
                  <Alert3
                    severity="error"
                    sx={{ background: "#fcedee", borderTop: "4px solid red", fontSize: "17px" }}
                  >
                    <AlertTitle>Your subscription plan has expired</AlertTitle>
                  </Alert3>
                )}
              </Stack>
            ) : (
              <></>
            )}

            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                    Primary Plan
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <div>
              <Card key={primaryPlan?.subscription_plan?.id} sx={{ mb: "1%" }}>
                <Box sx={{ flexGrow: 1, width: "95%", margin: "0 auto" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        sx={{ mt: "18px" }}
                      >
                        <Stack spacing={1}>
                          <Typography
                            variant="h5"
                            sx={{
                              marginLeft: "10px",
                              fontWeight: 500,
                            }}
                          >
                            {primaryPlan?.subscription_plan?.name}
                          </Typography>
                          <label style={{ marginLeft: "15px" }}>
                            Price :{" "}
                            {primaryPlan?.subscription_plan?.price
                              ? primaryPlan?.subscription_plan?.price
                              : 0}{" "}
                            {props.currency} for {primaryPlan?.subscription_plan?.validity?.name}{" "}
                            Validity with {specialPlan?.user_limit} users
                          </label>
                          {new Date(primaryPlan?.end_date) > new Date(formattedDate) ? (
                            <label style={{ marginLeft: "15px" }}>
                              Expired date :{" "}
                              {new Date(primaryPlan?.end_date).toLocaleDateString("en-US", option)}{" "}
                            </label>
                          ) : (
                            <label style={{ marginLeft: "15px", color: "red" }}>
                              Expired date : Expired{" "}
                            </label>
                          )}
                        </Stack>
                        <div style={{ display: "flex" }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setOpen3(true);
                                setPurchaseData2(primaryPlan?.purchase?.id);
                                console.log(primaryPlan, "primaryPlan>>>>");
                                // const data = { subscription_id: primaryPlan.subscription_plan.id };
                                // upgradeSubscriptionApiCall(data).then((response) => {
                                //   setPurchaseData(response.data.purchase);
                                // });
                              }}
                              sx={{
                                background: "red",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {BILLING.CANCEL}
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setOpen(true);
                                setDetails(primaryPlan?.subscription_plan);
                                // const data = { subscription_id: primaryPlan?.subscription_plan?.id };
                                // console.log(data,"data>>>>>")
                                // upgradeSubscriptionApiCall(data).then((response) => {
                                //   setPurchaseData(response.data.purchase);
                                // });
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {BILLING.BILLING_Button}
                            </Button>
                          </div>
                        </div>
                      </Stack>
                      <Divider sx={{ mt: "28px" }} />
                    </Grid>

                    <Grid item xs={12} sx={{ marginBottom: "28px" }}>
                      <label style={{ fontWeight: "bold" }}>Details</label> <br />
                      <label>
                        {/* Assuming LensIcon is an icon component */}
                        <LensIcon sx={{ fontSize: "10px", color: "red" }} />{" "}
                        {primaryPlan?.subscription_plan?.details}
                      </label>
                      <br />
                      <br />
                      {seeMore === primaryPlan?.subscription_plan?.id ? (
                        <div>
                          <label style={{ fontWeight: "bold" }}>Features</label> <br />
                          <div>
                            <label>
                              {/* Assuming LensIcon is an icon component */}
                              <LensIcon sx={{ fontSize: "10px", color: "red" }} /> Name :{" "}
                              {primaryPlan?.subscription_plan?.name}
                            </label>
                            <br />
                            <label style={{ marginLeft: "15px" }}>
                              {/* Assuming LensIcon is an icon component */}
                              Details :{primaryPlan?.subscription_plan?.details}
                            </label>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: "28px" }}>
                      <div>
                        {seeMore !== primaryPlan?.id ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              setSeeMore(primaryPlan?.subscription_plan?.id);
                            }}
                            sx={{
                              background: "#089B1A",
                              color: "white",
                              borderRadius: "5px",
                              fontSize: "12px",
                              padding: "3px",
                              marginRight: "20px",
                              float: "Right",
                              border: "1px solid #7e7e7e",
                              "&:hover": {
                                background: "#10741C",
                              },
                            }}
                          >
                            {/* Assuming BILLING.BILLING_Button2 is a string */}
                            {BILLING.SEE_MORE_Button}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => {
                              setSeeMore(0);
                            }}
                            sx={{
                              background: "#089B1A",
                              color: "white",
                              borderRadius: "5px",
                              fontSize: "12px",
                              padding: "3px",
                              marginRight: "20px",
                              float: "Right",
                              border: "1px solid #7e7e7e",
                              "&:hover": {
                                background: "#10741C",
                              },
                            }}
                          >
                            {/* Assuming BILLING.BILLING_Button2 is a string */}
                            {BILLING.LESS_Button}
                          </Button>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </div>

            {specialPlan && (
              <Stack spacing={3}>
                <Stack direction="row" justifyContent="space-between" spacing={4}>
                  <Stack spacing={1}>
                    <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                      Special Plan For You
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            )}

            {specialPlan && (
              <div>
                <Card key={specialPlan.id} sx={{ mb: "1%" }}>
                  <Box sx={{ flexGrow: 1, width: "95%", margin: "0 auto" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={4}
                          sx={{ mt: "18px" }}
                        >
                          <Stack spacing={1}>
                            <Typography
                              variant="h5"
                              sx={{
                                marginLeft: "10px",
                                fontWeight: 500,
                              }}
                            >
                              {specialPlan?.name}
                            </Typography>
                            <label style={{ marginLeft: "15px" }}>
                              Price : {specialPlan?.price} {props.currency} for{" "}
                              {specialPlan?.validity?.name} Validity with {specialPlan?.user_limit}{" "}
                              users
                            </label>
                          </Stack>
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setOpen(true);
                                setSelectedData(specialPlan);
                                setDetails(specialPlan);
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {BILLING.BILLING_Button}
                            </Button>
                          </div>
                        </Stack>
                        <Divider sx={{ mt: "28px" }} />
                      </Grid>

                      <Grid item xs={12} sx={{ marginBottom: "28px" }}>
                        <label style={{ fontWeight: "bold" }}>Details</label> <br />
                        <label>
                          {/* Assuming LensIcon is an icon component */}
                          <LensIcon sx={{ fontSize: "10px", color: "red" }} /> {details?.details}
                        </label>
                        <br />
                        <br />
                        {seeMore === specialPlan.id ? (
                          <div>
                            <label style={{ fontWeight: "bold" }}>Features</label> <br />
                            {specialPlan?.features.map((feature) => (
                              <div>
                                <label>
                                  {/* Assuming LensIcon is an icon component */}
                                  <LensIcon sx={{ fontSize: "10px", color: "red" }} /> Name :{" "}
                                  {feature?.name}
                                </label>
                                <br />
                                <label style={{ marginLeft: "15px" }}>
                                  {/* Assuming LensIcon is an icon component */}
                                  specialPlan :{feature?.details}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: "28px" }}>
                        <div>
                          {seeMore !== specialPlan.id ? (
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSeeMore(specialPlan.id);
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                float: "Right",
                                border: "1px solid #7e7e7e",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {/* Assuming BILLING.BILLING_Button2 is a string */}
                              {BILLING.SEE_MORE_Button}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSeeMore(0);
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                float: "Right",
                                border: "1px solid #7e7e7e",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {/* Assuming BILLING.BILLING_Button2 is a string */}
                              {BILLING.LESS_Button}
                            </Button>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </div>
            )}

            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                    Add-Ons
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            <div>
              {data?.map((details) => (
                <Card key={details.id} sx={{ mb: "1%" }}>
                  <Box sx={{ flexGrow: 1, width: "95%", margin: "0 auto" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          spacing={4}
                          sx={{ mt: "18px" }}
                        >
                          <Stack spacing={1}>
                            <Typography
                              variant="h5"
                              sx={{
                                marginLeft: "10px",
                                fontWeight: 500,
                              }}
                            >
                              {details?.name}
                            </Typography>
                            <label style={{ marginLeft: "15px" }}>
                              Price : {details?.price} {props.currency} for{" "}
                              {details?.validity?.name} Validity with {specialPlan?.user_limit}{" "}
                              users
                            </label>
                          </Stack>
                          <div>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setOpen(true);
                                setSelectedData(details);
                                setDetails(details);
                                // console.log(details, "details>>>>");
                                // const data = { subscription_id: details?.id };
                                // upgradeSubscriptionApiCall(data).then((response) => {
                                //   setPurchaseData(response.data.purchase);
                                // });
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {BILLING.BILLING_Button}
                            </Button>
                          </div>
                        </Stack>
                        <Divider sx={{ mt: "28px" }} />
                      </Grid>

                      <Grid item xs={12} sx={{ marginBottom: "28px" }}>
                        <label style={{ fontWeight: "bold" }}>Details</label> <br />
                        <label>
                          {/* Assuming LensIcon is an icon component */}
                          <LensIcon sx={{ fontSize: "10px", color: "red" }} /> {details?.details}
                        </label>
                        <br />
                        <br />
                        {seeMore === details.id ? (
                          <div>
                            <label style={{ fontWeight: "bold" }}>Features</label> <br />
                            {details?.features.map((feature) => (
                              <div>
                                <label>
                                  {/* Assuming LensIcon is an icon component */}
                                  <LensIcon sx={{ fontSize: "10px", color: "red" }} /> Name :{" "}
                                  {feature?.name}
                                </label>
                                <br />
                                <label style={{ marginLeft: "15px" }}>
                                  {/* Assuming LensIcon is an icon component */}
                                  Details :{feature?.details}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: "28px" }}>
                        <div>
                          {seeMore !== details.id ? (
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSeeMore(details.id);
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                float: "Right",
                                border: "1px solid #7e7e7e",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {/* Assuming BILLING.BILLING_Button2 is a string */}
                              {BILLING.SEE_MORE_Button}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSeeMore(0);
                              }}
                              sx={{
                                background: "#089B1A",
                                color: "white",
                                borderRadius: "5px",
                                fontSize: "12px",
                                padding: "3px",
                                marginRight: "20px",
                                float: "Right",
                                border: "1px solid #7e7e7e",
                                "&:hover": {
                                  background: "#10741C",
                                },
                              }}
                            >
                              {/* Assuming BILLING.BILLING_Button2 is a string */}
                              {BILLING.LESS_Button}
                            </Button>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              ))}
            </div>

            <AlertTitle>Need to cancel your account?</AlertTitle>
            <label style={{ marginTop: "-5px" }}>
              {" "}
              Please contact <Link href="#">help@saas.com </Link> or your customer success manager
              to cancel your subscription and close your account.{" "}
            </label>

            <Dialog
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
              maxWidth="xl"
            >
              <DialogTitle>Purchase Plan </DialogTitle>
              <Divider />
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
                <Grid container spacing={2} sx={{ mt: "-.5rem" }}>
                  <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item xs={8} sx={{ background: "#f0f0f0" }}>
                        <Box
                          sx={{
                            flexGrow: 1,
                            width: "80%",
                            margin: "0 auto",
                            marginTop: "4rem",
                          }}
                        >
                          {details ? (
                            <>
                              <Grid container spacing={2} sx={{ color: "#545353" }}>
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.MAME} :
                                </Grid>
                                <Grid xs={8}>{details.name}</Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={2}
                                sx={{ color: "#545353", marginTop: "20px" }}
                              >
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.DURATION} :
                                </Grid>
                                <Grid xs={8}>
                                  {/* {durationHelper(details?.duration)} */}
                                  {details?.validity?.name}
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={2}
                                sx={{ color: "#545353", marginTop: "20px" }}
                              >
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.PRICE} :
                                </Grid>
                                <Grid xs={8}>
                                  {details?.price != 0 ? details.price + props.currency : "FREE"}
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={2}
                                sx={{ color: "#545353", marginTop: "20px" }}
                              >
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.STORAGE} :
                                </Grid>
                                <Grid xs={8}>
                                  {/* {storageHelper(details?.storage_limit?.name)} */}
                                  {details?.storage_limit?.name}
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={2}
                                sx={{ color: "#545353", marginTop: "20px" }}
                              >
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.USER_LIMIT} :
                                </Grid>
                                <Grid xs={8}>
                                  {details?.user_limit}{" "}
                                  {details?.user_limit == 1 ? "User" : "Users"}
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={2}
                                sx={{ color: "#545353", marginTop: "20px" }}
                              >
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.FEATURES} :
                                </Grid>

                                <Grid xs={8}>
                                  {details?.features?.map((item) => {
                                    return <Grid xs={12}>{item?.name}</Grid>;
                                  })}
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                spacing={2}
                                sx={{ color: "#545353", marginTop: "20px" }}
                              >
                                <Grid xs={3} sx={{ fontWeight: "bold" }}>
                                  {SUBSCRIPTION_DETAILS?.DETAILS} :
                                </Grid>
                                <Grid xs={8} sx={{ marginBottom: "20px" }}>
                                  {details?.details}
                                </Grid>
                              </Grid>
                            </>
                          ) : (
                            <Loading />
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <div style={{ background: "#f2f2f2", width: "100%", margin: "0 auto" }}>
                          <div style={{ padding: "10px", background: "#6d6e70" }}>
                            <Typography
                              sx={{ fontSize: "20px", fontWeight: "bold", color: "#FFFFFF" }}
                            >
                              Your Subtotal
                            </Typography>
                          </div>
                          <div style={{ padding: "10px" }}>
                            <Typography>
                              Subtotal : {details.price + " " + props.currency}
                            </Typography>
                          </div>
                          {coupon ? (
                            <>
                              <div style={{ padding: "10px" }}>
                                <Typography>
                                  Discount : {coupon?.discount + " " + props.currency}
                                </Typography>
                              </div>
                              <div style={{ padding: "10px", borderTop: "1px solid white" }}>
                                <Typography>
                                  Total : {coupon.price + " " + props.currency}
                                </Typography>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <Grid item xs={12}>
                            <ul
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              <li>
                                Refund or return requests must be made within 7-10 days of purchase
                                or service delivery.
                              </li>
                              <li>
                                Please Review our &nbsp;
                                <a href="">terms & conditions</a>
                                &nbsp; and &nbsp;
                                <a target="_blank" href="">
                                  privacy policy
                                </a>
                              </li>
                            </ul>
                            <Checkbox
                              {...label}
                              id="checkbox"
                              value={isTermsChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setIsTermsChecked(true);
                                } else {
                                  setIsTermsChecked(false);
                                }
                              }}
                            />
                            <label htmlFor="checkbox">I agree with the terms & conditions</label>
                          </Grid>
                          <div style={{ padding: "10px", borderTop: "1px solid white" }}>
                            <LoadingButton
                              fullWidth
                              type="submit"
                              disabled={!isTermsChecked}
                              color={!isTermsChecked ? "secondary" : "primary"}
                              onClick={handlePurchasePlan}
                              loading={loading}
                              variant="contained"
                              // variant={!isTermsChecked ? "contained" : "outlined"}
                              sx={{
                                background: !isTermsChecked
                                  ? "gray"
                                  : "#f14c2e linear-gradient(#f14c2e,#d8452e)",
                                borderColor: "#e0452f",
                                padding: "6px",
                                cursor: !isTermsChecked ? "not-allowed" : "pointer",
                                color: "white",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                textShadow: "0 -1px 1px #d8452e",
                                lineHeight: "46px",
                                borderRadius: "0",
                                "&:hover": {
                                  background: "#f14c2e",
                                },
                              }}
                            >
                              PLACE ORDER
                            </LoadingButton>
                          </div>
                        </div>
                        <div style={{ width: "100%", margin: "0 auto", marginTop: "20px" }}>
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
                                <div>
                                  <div style={{ padding: "10px" }}>
                                    <Typography
                                      sx={{
                                        fontSize: "1.125rem",
                                        color: "#6d6e70",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Promo Code
                                    </Typography>
                                  </div>
                                  <div>
                                    <Field
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        backgroundColor: "#ffffff",
                                        "& .MuiOutlinedInput-root": {
                                          "& fieldset": {
                                            borderColor: "#c2c2c2",
                                          },
                                          "&:hover fieldset": {
                                            borderColor: "#4F4D4D",
                                          },
                                          "&.Mui-focused fieldset": {
                                            borderColor: "#4F4D4D",
                                          },
                                        },
                                        "& input": {
                                          color: "#4F4D4D",
                                        },
                                      }}
                                      name="coupon_id"
                                      as={TextField}
                                      type="text"
                                      fullWidth
                                    />
                                    {touched.coupon_id && errors.coupon_id && (
                                      <div style={{ color: "red", fontSize: "12px" }}>
                                        {errors.coupon_id}
                                      </div>
                                    )}
                                  </div>
                                  <div sx={{ padding: "10px" }}>
                                    <LoadingButton
                                      type="submit"
                                      width="100%"
                                      loading={loading}
                                      sx={{
                                        ml: "10px",
                                        mt: "20px",
                                        background: "#f14c2e linear-gradient(#f14c2e,#d8452e)",
                                        borderColor: "#e0452f",
                                        padding: "4px 20px 4px 20px",
                                        color: "white",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        textShadow: "0 -1px 1px #d8452e",
                                        lineHeight: "46px",
                                        borderRadius: "0",
                                        "&:hover": {
                                          background: "#f14c2e",
                                        },
                                      }}
                                    >
                                      Apply
                                    </LoadingButton>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </Grid>

                      <Grid item xs={12}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </Box>
            </Dialog>

            <Dialog
              open={open2}
              onClose={() => setOpen2(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle>Purchase Plan </DialogTitle>
              <Divider />
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
                <Grid container spacing={2} sx={{ mt: "-.5rem" }}>
                  <Grid item xs={12}>
                    <div>
                      <DialogActions sx={{ marginLeft: "150px" }}>
                        <Button
                          type="submit"
                          onClick={handlePurchasePlanButton}
                          sx={{
                            background: "#089B1A",
                            padding: "6px",
                            color: "white",
                            float: "right",
                            "&:hover": {
                              background: "#10741C",
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </div>
                  </Grid>
                  <Grid item xs={5}></Grid>
                </Grid>
              </Box>
            </Dialog>

            <Dialog
              open={open3}
              onClose={() => setOpen3(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
            >
              <DialogTitle>Cancel Plan </DialogTitle>
              <Divider />
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
                  initialValues={cancelinitialValues}
                  onSubmit={cancelhandleSubmit}
                  validationSchema={cancelvalidationSchema}
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
                        sx={{ mt: "1rem" }}
                      >
                        <Grid item xs={12}>
                          <label
                            style={{
                              fontSize: "20px",
                              fontWeight: "500",
                              color: "#262c2d",
                            }}
                          >
                            What the reason? <span style={{ color: "red" }}>*</span>
                          </label>
                          <div>
                            <Field
                              multiple
                              colum={4}
                              size="small"
                              variant="outlined"
                              sx={{
                                mb: 2,
                                backgroundColor: "#ffffff",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "#c2c2c2",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "#4F4D4D",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "#4F4D4D",
                                  },
                                },
                                "& input": {
                                  color: "#4F4D4D",
                                },
                              }}
                              name="reason"
                              as={TextField}
                              type="text"
                              fullWidth
                            />
                            {touched.reason && errors.reason && (
                              <div style={{ color: "red", fontSize: "12px" }}>{errors.reason}</div>
                            )}
                          </div>
                        </Grid>

                        <Grid item xs={12}>
                          <div>
                            <DialogActions sx={{ marginLeft: "150px" }}>
                              <LoadingButton
                                type="submit"
                                color="primary"
                                loading={loading}
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
                                Submit
                              </LoadingButton>
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
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default connect(mapStateToProps)(Page);