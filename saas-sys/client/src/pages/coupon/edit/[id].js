import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Card,
  Chip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Alert from "../../../components/Alert";
import Alert2 from "../../../components/Alert2";
import {
  CouponUpdateApiCall,
  fetchUserAPIGet,
  fetchCouponDetailsAPIGet,
  fetchSubscriptionAPIGet,
} from "../../../common/apiCall/api";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {BACK, UPDATE, ADD_COUPON, USER} from "../../../common/constantData/language";
import { useRouter } from "next/router";
import { ADMIN } from "../../../common/constantData/screenUrl";
import Link from "next/link";
import Loading from "src/components/Loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState([{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }]);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [buttonloading, setButtonloading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCouponDetailsAPIGet(id);
        if (data?.code ==200) {
          setDetails(data?.data?.coupon);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const [userTypes, setUserTypes] = useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserAPIGet();
        const data = response?.data?.users;
        setUserTypes(data);
        const response2 = await fetchSubscriptionAPIGet();
        const data2 = response2?.data?.subscription_plans;
        setSubscriptionPlans(data2);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // form field validation schema
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("code is required!"),
    amount: Yup.string().required("Amount is required!"),
    discount_type: Yup.string().required("Discount Typeis required!"),
    start_date: Yup.string().required("Start Date is required!"),
    end_date: Yup.string().required("End Date is required!"),
    user_type: Yup.string().required("User Type is required!"),
    subscription_plan_type: Yup.string().required("Subscription Plan Type is required!"),
    // plan_ids: Yup.string().required("Plan Ids is required!"),
    // user_ids: Yup.string().required("User Idsis required!"),
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [selectedOption3, setSelectedOption3] = useState([]);
  const [subscriptionPlanTypeId, setSubscriptionPlanTypeId] = useState(null);
  const [options4, setOptions4] = useState([]);
  const [selectedOption5, setSelectedOption5] = useState([]);
  const [defaultAmountType, setDefaultAmountType] = useState(0);


  const handleSelect = (event, values) => {
    setSelectedOption3(values);
  };

  const handleRemove = (valueToRemove) => {
    setSelectedOption3((prevSelectedValues) =>
      prevSelectedValues.filter((value) => value.label !== valueToRemove.label)
    );
  };

  const handleSelect2 = (event, values) => {
    setSelectedOption5(values);
  };

  const handleRemove2 = (valueToRemove) => {
    setSelectedOption5((prevSelectedValues) =>
      prevSelectedValues.filter((value) => value.label !== valueToRemove.label)
    );
  };

  const amount_type = [
    {
      id: "1",
      name: "Percentage",
    },
    {
      id: "0",
      name: "Flat",
    },
  ];

  const user_type = [
    {
      id: "0",
      name: "All user",
    },
    {
      id: "1",
      name: "Specific user",
    },
  ];

  const subscription_plan = [
    {
      id: "0",
      name: "All subscription",
    },
    {
      id: "1",
      name: "Specific subscription",
    },
  ];

  useEffect(()=>{
    const filteredUserTypeData = user_type.filter((item) => item.id == details?.user_type);
    setSelectedOption2(filteredUserTypeData[0])
    const filteredPlanTypeData = subscription_plan.filter((item) => item.id == details?.subscription_plan_type);
    setSubscriptionPlanTypeId(filteredPlanTypeData[0])
    const filteredAmountTypeData = amount_type.filter((item) => item.id == details?.discount_type);
    setDefaultAmountType(filteredAmountTypeData[0]);
  },[details])

  useEffect(() => {
    const filteredData = userTypes.filter((dataItem) =>
      details?.users?.some((featureItem) => featureItem.id === dataItem.id)
    );
    setSelectedOption5(filteredData);

    const filteredData2 = subscriptionPlans.filter((dataItem) =>
      details?.subscription_plans?.some((featureItem) => featureItem.id === dataItem.id)
    );

    setSelectedOption3(filteredData2);
  }, [details, userTypes, subscriptionPlans]);


  useEffect(() => {
      setOptions(amount_type);
      setOptions2(user_type);
      setOptions4(subscription_plan);

  }, [details]);

  const handleSubmit = (data) => {
    setButtonloading(true)
    CouponUpdateApiCall(data)
      .then((res) => {
        if (res.code === 200) {
          setResponseMessage(ADD_COUPON.ADD_SUCCESS_MESSAGE);
          setOpenAlert1(true);
          setButtonloading(false)
          setTimeout(() => {
            router.push(ADMIN.COUPON_PLAN_LIST);
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
        setResponseMessage(ADD_COUPON.ADD_ERROR_MESSAGE);
        setOpenAlert2(true);
      });
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [openAlert1, setOpenAlert1] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);

  const handleAlertClose = () => {
    setResponseMessage("");
    setOpenAlert1(false);
    setOpenAlert2(false);
  };

  const test = details?.users?.map((user) => user.id)
  console.log(test,"kldsf>>>")
  return (
    <>
      <Head>
        <title>{ADD_COUPON.TITLE2}</title>
      </Head>
      {selectedOption2 !== undefined ? (
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
            {ADD_COUPON.TITLE2}
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
              <Box sx={{ flexGrow: 1, width: "90%", margin: "0 auto",}}>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={{
                        id: id,
                        code: details?.code || "",
                        amount: details?.amount || "",
                        status: details?.status || "",
                        discount_type: details?.discount_type || null,
                        start_date: details?.start_date || "",
                        end_date: details?.end_date || "",
                        user_type: details?.user_type || null,
                        subscription_plan_type: details?.subscription_plan_type || null,
                        plan_ids: details?.subscription_plans?.map((plan) => plan.id) || [],
                        user_ids: details?.users?.map((user) => user.id) || [],
                      }}
                      onSubmit={handleSubmit}
                      // validationSchema={validationSchema}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form enctype="multipart/form-data">
                          <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{ marginTop: "2rem" }}
                          >
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {ADD_COUPON.CODE} <span style={{ color: "red" }}>*</span>
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
                                  name="code"
                                  as={TextField}
                                  type="text"
                                  fullWidth
                                />
                                {touched.code && errors.code && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.code}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {ADD_COUPON.AMOUNT}
                                  <span style={{ color: "red" }}>*</span>
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
                                  name="amount"
                                  as={TextField}
                                  type="number"
                                  fullWidth
                                  inputProps={{
                                    min: 0 // Set the minimum value to 0 to prevent negative values
                                  }}
                                />
                                {touched.amount && errors.amount && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.amount}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ADD_COUPON.DISCOUNT_TYPE}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <Field name="discount_type">
                                {({ field, form }) => (
                                  <Autocomplete
                                    {...field}
                                    value={defaultAmountType}
                                    onChange={(event, newValue) => {
                                      setSelectedOption(newValue);
                                      form.setFieldValue(
                                        "discount_typeName",
                                        newValue ? newValue.name : ""
                                      );
                                      form.setFieldValue(
                                        "discount_type",
                                        newValue ? newValue.id : ""
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
                                          form.errors.discount_type && form.touched.discount_type
                                        }
                                        helperText={
                                          form.errors.discount_type &&
                                          form.touched.discount_type &&
                                          form.errors.discount_type
                                        }
                                        sx={{
                                          mb: 2,
                                          "& input": {
                                            color: "#4F4D4D" // Replace "blue" with your desired color value
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              </Field>

                              {/* {error && <div>{error}</div>} */}
                            </Grid>

                              <Grid item xs={6}>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                      {USER.STATUS}
                                      <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <Field name="status" as={Autocomplete}>
                                      {({ field, form }) => (
                                          <Autocomplete
                                              {...field}
                                              value={status.filter((item) =>{ return item.value == details.status})[0]}
                                              onChange={(event, newValue) => {
                                                  setSelectedOption(newValue);
                                                  form.setFieldValue(
                                                      "status",
                                                      newValue ? Number(newValue.value) : null
                                                  );
                                              }}
                                              options={status}
                                              getOptionLabel={(option) => option.label}
                                              renderInput={(params) => (
                                                  <TextField
                                                      {...params}
                                                      size='small'
                                                      variant="outlined"
                                                      error={form.errors.status && form.touched.status}
                                                      helperText={
                                                          form.errors.status &&
                                                          form.touched.status &&
                                                          form.errors.status
                                                      }
                                                      sx={{
                                                          mb: 2,
                                                          "& input": {
                                                              color: "#4F4D4D" // Replace "blue" with your desired color value
                                                          }
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
                                  {ADD_COUPON.START_DATE}
                                  <span style={{ color: "red" }}>*</span>
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
                                  name="start_date"
                                  as={TextField}
                                  type="Date"
                                  fullWidth
                                />
                                {touched.start_date && errors.start_date && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.start_date}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <div>
                                <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                  {ADD_COUPON.EXPIRE_DATE}
                                  <span style={{ color: "red" }}>*</span>
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
                                  name="end_date"
                                  as={TextField}
                                  type="date"
                                  fullWidth
                                />
                                {touched.end_date && errors.end_date && (
                                  <div style={{ color: "red", fontSize: "12px" }}>
                                    {errors.end_date}
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item xs={6}>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ADD_COUPON.USER_TYPE}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <Field name="user_type">
                                {({ field, form }) => (
                                  <Autocomplete
                                    {...field}
                                    value={selectedOption2}
                                    onChange={(event, newValue) => {
                                      localStorage.setItem(
                                        "user_type",
                                        JSON.stringify(newValue.name)
                                      );
                                      setSelectedOption2(newValue);
                                      form.setFieldValue("user_type", newValue ? newValue.id : "");
                                      form.setFieldValue(
                                        "user_typeName",
                                        newValue ? newValue.name : ""
                                      );
                                    }}
                                    options={options2}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        variant="outlined"
                                        error={form.errors.user_type && form.touched.user_type}
                                        helperText={
                                          form.errors.user_type &&
                                          form.touched.user_type &&
                                          form.errors.user_type
                                        }
                                        sx={{
                                          mb: 2,
                                          "& input": {
                                            color: "#4F4D4D" // Replace "blue" with your desired color value
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              </Field>

                              {/* {error && <div>{error}</div>} */}

                              {selectedOption2?.name === "Specific user" ? (
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {ADD_COUPON.USERS}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <Field name="user_ids">
                                    {({ field, form }) => (
                                      <Autocomplete
                                        multiple
                                        options={userTypes}
                                        getOptionLabel={(option) => option.name}
                                        value={selectedOption5}
                                        onChange={(event, newValue) => {
                                          setSelectedOption5(newValue);
                                          form.setFieldValue(
                                            "user_ids",
                                            newValue.map((option) => option.id)
                                          );
                                          form.setFieldValue(
                                            "user_typeName",
                                            newValue ? newValue.name : ""
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                              mb: 2,
                                              "& input": {
                                                color: "#4F4D4D" // Replace "blue" with your desired color value
                                              }
                                            }}
                                          />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip
                                              key={index}
                                              label={option.name}
                                              onDelete={() => handleRemove2(option)}
                                              {...getTagProps({ index })}
                                            />
                                          ))
                                        }
                                      />
                                    )}
                                  </Field>
                                </div>
                              ) : (
                                <></>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                {ADD_COUPON.SUBSCRIPTION_PLAN_TYPE}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <Field name="subscription_plan_type">
                                {({ field, form }) => (
                                  <Autocomplete
                                    {...field}
                                    value={subscriptionPlanTypeId}
                                    onChange={(event, newValue) => {
                                      localStorage.setItem(
                                        "subscription_plan",
                                        JSON.stringify(newValue.name)
                                      );
                                      setSubscriptionPlanTypeId(newValue);
                                      form.setFieldValue(
                                        "subscription_plan",
                                        newValue ? newValue.name : ""
                                      );
                                      form.setFieldValue(
                                        "subscription_plan_type",
                                        newValue ? newValue.id : ""
                                      );
                                    }}
                                    options={options4}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        size="small"
                                        variant="outlined"
                                        error={
                                          form.errors.subscription_plan_type &&
                                          form.touched.subscription_plan_type
                                        }
                                        helperText={
                                          form.errors.subscription_plan_type &&
                                          form.touched.subscription_plan_type &&
                                          form.errors.subscription_plan_type
                                        }
                                        sx={{
                                          mb: 2,
                                          "& input": {
                                            color: "#4F4D4D" // Replace "blue" with your desired color value
                                          }
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              </Field>

                              {/* {error && <div>{error}</div>} */}

                              {subscriptionPlanTypeId?.name === "Specific subscription" ? (
                                <div>
                                  <label style={{ fontSize: "16px", fontFamily: "-apple-system" }}>
                                    {ADD_COUPON.SUBSCRIPTIONS}
                                    <span style={{ color: "red" }}>*</span>
                                  </label>
                                  <Field name="plan_ids">
                                    {({ field, form }) => (
                                      <Autocomplete
                                        multiple
                                        options={subscriptionPlans}
                                        getOptionLabel={(option) => option.name}
                                        value={selectedOption3}
                                        onChange={(event, newValue) => {
                                          setSelectedOption3(newValue);
                                          form.setFieldValue(
                                            "plan_ids",
                                            newValue.map((option) => option.id)
                                          );
                                          form.setFieldValue(
                                            "plan_Name",
                                            newValue ? newValue.name : ""
                                          );
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                              mb: 2,
                                              "& input": {
                                                color: "#4F4D4D" // Replace "blue" with your desired color value
                                              }
                                            }}
                                          />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip
                                              key={index}
                                              label={option.name}
                                              onDelete={() => handleRemove(option)}
                                              {...getTagProps({ index })}
                                            />
                                          ))
                                        }
                                      />
                                    )}
                                  </Field>
                                </div>
                              ) : (
                                <></>
                              )}
                            </Grid>

                            <Grid item xs={6}>
                              <div style={{ width: "100%" }}>
                                <Link href={ADMIN.COUPON_PLAN_LIST}>
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
                                  {UPDATE}
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

export default Page;
